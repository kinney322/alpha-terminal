import { useState } from 'react';
import PublicLeaderboardPreview from './PublicLeaderboardPreview.jsx';
import { getStockDossierProfile } from '../data/stockDossierProfiles.js';
import { resolveReferencePeerEcosystemSnapshot } from '../data/referencePeerMapAdapter.js';
import { answerAskCrowdRiskQuestion } from '../data/askCrowdRiskResponder.js';

const HOME_COPY = {
  en: {
    queue: "Today's Research Queue",
    title: "Today's Repricing Queue",
    body: 'Ranked names that need research attention now. Open the Dossier to judge valuation, momentum, and missing evidence before acting.',
    askLabel: 'Ask CrowdRisk',
    askButton: 'Ask',
    summaryKicker: 'Ask CrowdRisk Answer',
    valuationRange: 'Valuation-implied range',
    momentumRange: 'Momentum-implied range',
    overlap: 'Overlap',
    state: 'State',
    nextAction: 'Next action',
    openDossier: 'Open Dossier',
    openEventStudy: 'Open Event Study',
    openMomentum: 'Open Momentum Universe',
    notAvailable: 'Not available',
    notComputable: 'Not computable',
    researchQueue: 'Research Queue',
    needsValidation: 'Needs Validation',
    needsDossierReview: 'Needs Dossier Review',
    availableInDossier: 'Open Dossier for assumptions',
    stats: ['Radar hits', 'PEAD watch', 'Momentum ranks'],
    lifecycle: 'Earnings Lifecycle',
    lifecycleTitle: 'Pre, event day, and post-earnings work in one flow.',
    momentumTitle: 'Use trend strength as a separate routing signal.',
    watchTitle: 'Move names toward a research decision.',
    watchQueue: 'Decision Queue',
    technicalZone: 'Technical setup zone',
    supportResistance: 'Support / resistance',
    peerContext: 'Ecosystem / peers',
    unavailableReason: 'Current payload does not expose a formal valuation-implied price range.'
  },
  zh: {
    queue: '今日研究隊列',
    title: '今日重新定價隊列',
    body: '優先顯示今日值得研究的股票。進入股票檔案後，再判斷估值、動能與欠缺證據。',
    askLabel: '問 CrowdRisk',
    askButton: '生成摘要',
    summaryKicker: 'Ask CrowdRisk 回答',
    valuationRange: '估值推導區間',
    momentumRange: '動能推導區間',
    overlap: '重疊',
    state: '狀態',
    nextAction: '下一步',
    openDossier: '打開股票檔案',
    openEventStudy: '打開事件研究',
    openMomentum: '打開動能宇宙',
    notAvailable: '暫無',
    notComputable: '未能計算',
    researchQueue: '研究隊列',
    needsValidation: '需要驗證',
    needsDossierReview: '需要股票檔案審查',
    availableInDossier: '到股票檔案查看假設',
    stats: ['雷達命中', 'PEAD 觀察', '動能排名'],
    lifecycle: '財報生命週期',
    lifecycleTitle: '財報前、當日、財報後放在同一研究流程。',
    momentumTitle: '把趨勢強度作為獨立 routing signal。',
    watchTitle: '把股票推向研究判斷。',
    watchQueue: '研究判斷隊列',
    technicalZone: '技術形態區間',
    supportResistance: '支撐 / 阻力',
    unavailableReason: '目前 payload 未提供正式估值推導價格區間。',
    peerContext: '產業鏈 / 同行',
    valuationStates: {
      'Priced for Perfection': '反映高預期',
      'Valuation Stretched': '估值偏緊',
      'Valuation Needs Review': '估值待審查',
      'Insufficient Data': '資料不足',
      'Valuation Inputs Missing': '估值資料不足'
    }
  }
};

const countNestedItems = (value) => {
  if (!value || typeof value !== 'object') return 0;
  return Object.values(value).reduce((count, entry) => {
    if (Array.isArray(entry)) return count + entry.length;
    return count;
  }, 0);
};

const extractTicker = (item) => {
  if (!item) return '';
  if (typeof item === 'string') return item.split('-')[0];
  if (typeof item === 'object' && item.ticker) return item.ticker;
  if (typeof item === 'object' && item.event_key) return item.event_key.split('-')[0];
  return '';
};

const normalizeTicker = (value) => String(value || '').trim().toUpperCase();

const formatLabel = (value) => (
  String(value || '')
    .replace(/_/g, ' ')
    .replace(/\b\w/g, (char) => char.toUpperCase())
);

const toFiniteNumber = (value) => {
  const numeric = Number(value);
  return Number.isFinite(numeric) ? numeric : null;
};

const formatPrice = (value) => {
  const numeric = toFiniteNumber(value);
  if (numeric === null) return null;
  return `$${numeric.toFixed(numeric >= 100 ? 0 : 2)}`;
};

const readLevelValue = (level) => {
  if (typeof level === 'number') return level;
  if (!level || typeof level !== 'object') return null;
  return toFiniteNumber(level.price ?? level.value ?? level.level ?? level.high ?? level.low);
};

const normalizeZone = (zone) => {
  if (Array.isArray(zone)) {
    const values = zone.map(readLevelValue).filter((value) => value !== null);
    if (values.length >= 2) return [Math.min(...values), Math.max(...values)];
  }
  if (zone && typeof zone === 'object') {
    const low = toFiniteNumber(zone.low ?? zone.min ?? zone.from ?? zone.lower);
    const high = toFiniteNumber(zone.high ?? zone.max ?? zone.to ?? zone.upper);
    if (low !== null && high !== null) return [Math.min(low, high), Math.max(low, high)];
  }
  return null;
};

const formatZone = (zone) => {
  if (!zone) return null;
  return `${formatPrice(zone[0])} - ${formatPrice(zone[1])}`;
};

const findEventDetail = (payload, ticker) => (
  Object.values(payload?.events_detail || {}).find((detail) => normalizeTicker(detail?.ticker) === ticker) || null
);

const findMomentumRow = (payload, ticker) => (
  (payload?.momentum_universe?.rankings || []).find((row) => normalizeTicker(row?.ticker) === ticker) || null
);

const resolveAvailableTicker = (query, payload, fallbackTicker) => {
  const tickers = new Set([
    ...Object.values(payload?.events_detail || {}).map((detail) => normalizeTicker(detail?.ticker)),
    ...(payload?.momentum_universe?.rankings || []).map((row) => normalizeTicker(row?.ticker))
  ].filter(Boolean));
  const tokens = String(query || '').toUpperCase().match(/\b[A-Z]{1,5}\b/g) || [];
  return tokens.find((token) => tickers.has(token)) || fallbackTicker;
};

const buildMomentumRangeSummary = (ticker, payload, copy) => {
  const eventDetail = findEventDetail(payload, ticker);
  const momentumRow = findMomentumRow(payload, ticker);
  const setup = eventDetail?.trend_setup?.technical_setup
    || momentumRow?.trend_setup?.technical_setup
    || eventDetail?.trend_setup
    || momentumRow?.trend_setup
    || {};
  const targetZone = normalizeZone(setup.target_zone || setup.targetRange || setup.target_range);
  if (targetZone) {
    return { value: formatZone(targetZone), status: 'available', source: copy.technicalZone };
  }

  const supportLevels = Array.isArray(setup.support_levels) ? setup.support_levels : [];
  const resistanceLevels = Array.isArray(setup.resistance_levels) ? setup.resistance_levels : [];
  const support = supportLevels.map(readLevelValue).filter((value) => value !== null).sort((a, b) => b - a)[0];
  const resistance = resistanceLevels.map(readLevelValue).filter((value) => value !== null).sort((a, b) => a - b)[0];
  if (support !== undefined || resistance !== undefined) {
    return {
      value: `${support !== undefined ? formatPrice(support) : copy.notAvailable} / ${resistance !== undefined ? formatPrice(resistance) : copy.notAvailable}`,
      status: 'available',
      source: copy.supportResistance
    };
  }

  return { value: copy.notAvailable, status: 'missing', source: copy.notAvailable };
};

const buildValuationRangeSummary = (ticker, payload, copy) => {
  const eventDetail = findEventDetail(payload, ticker);
  const profile = getStockDossierProfile(ticker);
  const candidates = [
    eventDetail?.valuation_implied_range,
    eventDetail?.valuation_range,
    eventDetail?.scenario_range,
    eventDetail?.fundamental_evidence?.valuation_implied_range,
    profile?.valuationImpliedRange
  ];
  const zone = candidates.map(normalizeZone).find(Boolean);
  if (zone) {
    return { value: formatZone(zone), status: 'available', source: copy.availableInDossier };
  }
  const valuationState = profile?.valuationCore?.topVerdict?.valuationState
    || eventDetail?.fundamental_evidence?.valuation_state
    || copy.notAvailable;
  return {
    value: copy.notAvailable,
    status: 'missing',
    source: copy.valuationStates?.[valuationState] || valuationState,
    note: copy.unavailableReason
  };
};

const buildConfluenceSummary = (ticker, payload, referencePeerMapPayload, copy) => {
  if (!ticker) {
    return {
      ticker: '',
      valuation: { value: copy.notAvailable, status: 'missing', source: copy.notAvailable },
      momentum: { value: copy.notAvailable, status: 'missing', source: copy.notAvailable },
      peerContext: null,
      overlap: copy.notComputable,
      state: copy.needsValidation,
      nextAction: copy.openDossier
    };
  }
  const valuation = buildValuationRangeSummary(ticker, payload, copy);
  const momentum = buildMomentumRangeSummary(ticker, payload, copy);
  const ecosystem = resolveReferencePeerEcosystemSnapshot(referencePeerMapPayload, ticker);
  const directPeers = ecosystem
    ? [
      ...(ecosystem.activeCoverage || []).slice(0, 4),
      ...(ecosystem.referencePeers || []).slice(0, 3)
    ].map((peer) => peer.ticker).filter(Boolean)
    : [];
  const overlap = valuation.status === 'available' && momentum.status === 'available'
    ? copy.needsDossierReview
    : copy.notComputable;
  return {
    ticker,
    valuation,
    momentum,
    peerContext: ecosystem ? {
      ecosystemName: ecosystem.ecosystemName,
      peers: directPeers
    } : null,
    overlap,
    state: momentum.status === 'available' ? copy.researchQueue : copy.needsValidation,
    nextAction: copy.openDossier
  };
};

function CrowdRiskHome({ payload, loading, error, stockPerformancePayload, referencePeerMapPayload, onNavigate, onOpenStockDossier, locale = 'en' }) {
  const copy = HOME_COPY[locale] || HOME_COPY.en;
  const radarLists = payload?.radar_lists || {};
  const postEarnings = radarLists.post_earnings || {};
  const momentumRankings = payload?.momentum_universe?.rankings || [];
  const postWatch = [
    ...(postEarnings.pead_watch || []),
    ...(postEarnings.top_risk_alerts || [])
  ]
    .map(extractTicker)
    .filter(Boolean)
    .slice(0, 4);

  const [selectedTicker, setSelectedTicker] = useState('');
  const [askQuery, setAskQuery] = useState('');
  const [askResponse, setAskResponse] = useState(null);

  const confluence = buildConfluenceSummary(selectedTicker, payload, referencePeerMapPayload, copy);
  const hasAskResult = Boolean(askResponse || selectedTicker);

  const openSummaryDossier = () => {
    const ticker = normalizeTicker(askResponse?.ticker || selectedTicker);
    if (!ticker) {
      onNavigate('stock-dossier');
      return;
    }
    onOpenStockDossier(ticker, findEventDetail(payload, ticker) || { ticker });
  };

  const openAskAction = () => {
    if (askResponse?.action?.type === 'open_momentum') {
      onNavigate('momentum-universe');
      return;
    }
    openSummaryDossier();
  };

  const handleAskSubmit = (event) => {
    event.preventDefault();
    const resolvedTicker = resolveAvailableTicker(askQuery, payload, selectedTicker);
    const response = answerAskCrowdRiskQuestion({
      question: askQuery,
      locale,
      payload,
      stockPerformancePayload,
      referencePeerMapPayload
    });
    setAskResponse(response);
    if (response?.ticker || resolvedTicker) setSelectedTicker(response?.ticker || resolvedTicker);
  };

  const lifecycleCards = [
    {
      title: locale === 'zh' ? '財報前機會' : 'Pre-Earnings Opportunity',
      label: locale === 'zh' ? '催化前' : 'Before catalyst',
      count: countNestedItems(radarLists.pre_earnings) || countNestedItems(postEarnings),
      body: locale === 'zh' ? '找出事件前已值得研究的 setup。' : 'Surface names where the setup matters before the event hits.'
    },
    {
      title: locale === 'zh' ? '事件當日' : 'Event Day',
      label: locale === 'zh' ? '催化中' : 'During catalyst',
      count: countNestedItems(radarLists.event_day),
      body: locale === 'zh' ? '在市場重新定價時分辨反應與雜訊。' : 'Separate confirmed reaction from noise while the market reprices.'
    },
    {
      title: locale === 'zh' ? '財報後漂移' : 'Post-Earnings Drift',
      label: locale === 'zh' ? '催化後' : 'After catalyst',
      count: (postEarnings.pead_watch || []).length,
      body: locale === 'zh' ? '追蹤財報後走勢是否仍有延續。' : 'Track whether the post-earnings move still has follow-through.'
    }
  ];

  const watchQueue = [
    {
      label: locale === 'zh' ? '股票檔案審查' : 'Dossier Review',
      value: postWatch.length ? postWatch.join(', ') : loading ? 'Loading' : 'No priority names',
      action: copy.openDossier,
      target: 'stock-dossier'
    },
    {
      label: locale === 'zh' ? '動能延續' : 'Momentum Follow-Through',
      value: momentumRankings.length ? `${momentumRankings.length} ${locale === 'zh' ? '隻已排名' : 'ranked names'}` : locale === 'zh' ? '沒有動能 payload' : 'No momentum payload',
      action: copy.openMomentum,
      target: 'momentum-universe'
    },
    {
      label: locale === 'zh' ? '事件證據' : 'Event Evidence',
      value: error ? 'Radar payload unavailable' : locale === 'zh' ? 'Base-rate 與 crowding 檢查可用' : 'Base-rate and crowding checks ready',
      action: copy.openEventStudy,
      target: 'event-study'
    }
  ];

  return (
    <div className="crowdrisk-home">
      <section className="crowdrisk-workbench" aria-label={copy.queue}>
        <header className="crowdrisk-workbench-header">
          <div className="crowdrisk-workbench-title">
            <p className="crowdrisk-kicker">{copy.queue}</p>
            <h1>{copy.title}</h1>
            <p>{copy.body}</p>
          </div>

          <div className="crowdrisk-workbench-tools">
            <div className="crowdrisk-home-stats" aria-label="CrowdRisk queue summary">
            <span>
              <strong>{postEarnings.top_opportunities?.length || 0}</strong>
              {copy.stats[0]}
            </span>
            <span>
              <strong>{postEarnings.pead_watch?.length || 0}</strong>
              {copy.stats[1]}
            </span>
            <span>
              <strong>{payload?.momentum_universe?.ranked_count || momentumRankings.length || 0}</strong>
              {copy.stats[2]}
            </span>
            </div>

            <form className="crowdrisk-command-bar crowdrisk-command-bar--summary" onSubmit={handleAskSubmit}>
              <label htmlFor="crowdrisk-ask">{copy.askLabel}</label>
              <input
                id="crowdrisk-ask"
                type="text"
                value={askQuery}
                onChange={(event) => setAskQuery(event.target.value)}
                aria-label={copy.askLabel}
              />
              <button type="submit">{copy.askButton}</button>
            </form>
          </div>
        </header>

        {hasAskResult && (
          askResponse ? (
            <section className="crowdrisk-inline-summary crowdrisk-inline-summary--answer" aria-label={copy.summaryKicker}>
              <div className="crowdrisk-ask-answer-main">
                <strong>{askResponse.ticker || copy.summaryKicker}</strong>
                <div>
                  {askResponse.lines.map((line, index) => (
                    <p key={`${askResponse.intent}-${index}`}>{line}</p>
                  ))}
                </div>
              </div>
              {askResponse.factsList?.length > 0 && (
                <div className="crowdrisk-ask-facts" aria-label="Ask CrowdRisk facts">
                  {askResponse.factsList.slice(0, 4).map((fact) => (
                    <span key={`${fact.label}-${fact.value}`}>
                      <em>{fact.label}</em>
                      <strong>{fact.value}</strong>
                    </span>
                  ))}
                </div>
              )}
              {askResponse.action && (
                <button type="button" onClick={openAskAction}>
                  {askResponse.action.label}
                </button>
              )}
            </section>
          ) : (
            <section className="crowdrisk-inline-summary" aria-label={copy.summaryKicker}>
              <strong>{confluence.ticker}</strong>
              <span>{copy.valuationRange}: {confluence.valuation.value}</span>
              <span>{copy.momentumRange}: {confluence.momentum.value}</span>
              {confluence.peerContext && (
                <span>{copy.peerContext || 'Ecosystem / peers'}: {confluence.peerContext.ecosystemName} · {confluence.peerContext.peers.join(', ')}</span>
              )}
              <span>{copy.overlap}: {confluence.overlap}</span>
              <button type="button" onClick={openSummaryDossier}>
                {confluence.nextAction}
              </button>
            </section>
          )
        )}

        <section className="crowdrisk-home-leaderboard" aria-label="Priority leaderboard">
          <PublicLeaderboardPreview
            payload={payload}
            loading={loading}
            error={error}
            onOpenStockDossier={onOpenStockDossier}
            locale={locale}
          />
        </section>
      </section>

      <section className="crowdrisk-home-section">
        <div className="crowdrisk-section-heading">
          <p className="crowdrisk-kicker">{copy.lifecycle}</p>
          <h2>{copy.lifecycleTitle}</h2>
          <button type="button" onClick={() => onNavigate('earnings-radar')}>
            {locale === 'zh' ? '打開財報雷達' : 'Open Earnings Radar'}
          </button>
        </div>
        <div className="crowdrisk-card-grid three">
          {lifecycleCards.map((card) => (
            <article className="crowdrisk-queue-card" key={card.title}>
              <p>{card.label}</p>
              <h3>{card.title}</h3>
              <strong>{card.count}</strong>
              <span>{card.body}</span>
            </article>
          ))}
        </div>
      </section>

      <section className="crowdrisk-home-section split">
        <div>
          <div className="crowdrisk-section-heading compact">
            <p className="crowdrisk-kicker">{locale === 'zh' ? '動能延續' : 'Momentum Follow-Through'}</p>
            <h2>{copy.momentumTitle}</h2>
            <button type="button" onClick={() => onNavigate('momentum-universe')}>
              {copy.openMomentum}
            </button>
          </div>
          <div className="crowdrisk-momentum-strip">
            {momentumRankings.slice(0, 5).map((row) => (
              <button
                type="button"
                key={row.ticker}
                onClick={() => onNavigate('momentum-universe')}
              >
                <span>#{row.scanner_rank || row.rank || '-'}</span>
                <strong>{row.ticker}</strong>
                <small>RS {row.relative_strength_percentile ?? '-'}</small>
              </button>
            ))}
            {!momentumRankings.length && (
              <div className="crowdrisk-empty-state">Momentum payload not available.</div>
            )}
          </div>
        </div>

        <div>
          <div className="crowdrisk-section-heading compact">
            <p className="crowdrisk-kicker">{copy.watchQueue}</p>
            <h2>{copy.watchTitle}</h2>
          </div>
          <div className="crowdrisk-watch-list">
            {watchQueue.map((item) => (
              <button
                type="button"
                key={item.label}
                onClick={() => onNavigate(item.target)}
              >
                <span>{item.label}</span>
                <strong>{item.value}</strong>
                <small>{item.action}</small>
              </button>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default CrowdRiskHome;
