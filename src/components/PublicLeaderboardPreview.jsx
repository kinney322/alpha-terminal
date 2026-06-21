import { useState, useEffect } from 'react';
import { buildMomentumUniverseSyntheticDetail } from './dossierHelpers.js';
import { displayLabel } from './displayLabelHelpers.js';

const formatLabel = (val, locale = 'en') => {
  if (!val) return '';
  return displayLabel(val, locale, '');
};

const LEADERBOARD_COPY = {
  en: {
    title: 'Repricing Research Queue',
    subtitle: 'Ranked research tasks. Open the Dossier for assumptions before treating any range as actionable.',
    loading: 'Loading leaderboard...',
    error: 'Leaderboard unavailable',
    empty: 'No tickers currently in this list.',
    tabs: {
      new_radar_hits: 'New Radar Hits',
      post_earnings_breakouts: 'Post-Earnings Breakouts',
      momentum_breakouts: 'Momentum Breakouts',
      quality_compounders: 'Quality Compounders'
    },
    rank: 'Rank',
    whyNow: 'Why now',
    evidence: 'Evidence stack',
    valuationRange: 'Valuation range',
    momentumRange: 'Momentum range',
    missingProof: 'Missing proof',
    action: 'Action',
    openDossier: 'Open Dossier',
    notAvailable: 'Not available',
    needsDossier: 'Needs Dossier',
    valuationPending: 'Valuation assumptions',
    technicalPending: 'Technical zone',
    rangeSource: 'Technical setup',
    supportResistance: 'Support / resistance',
    noTags: 'Queued by active tab',
    inspectFirst: 'Inspect First',
    needsValidation: 'Needs Validation'
  },
  zh: {
    title: '重新定價研究隊列',
    subtitle: '已排名的研究任務。任何區間要先進股票檔案看假設，不能直接當成行動指令。',
    loading: '正在載入 leaderboard...',
    error: 'Leaderboard 暫時不可用',
    empty: '此列表暫時沒有 ticker。',
    tabs: {
      new_radar_hits: '新雷達命中',
      post_earnings_breakouts: '財報後突破',
      momentum_breakouts: '動能突破',
      quality_compounders: '質素候選'
    },
    rank: '排名',
    whyNow: '為何入隊',
    evidence: '證據組合',
    valuationRange: '估值區間',
    momentumRange: '動能區間',
    missingProof: '欠缺驗證',
    action: '行動',
    openDossier: '打開股票檔案',
    notAvailable: '暫無',
    needsDossier: '需看檔案',
    valuationPending: '估值假設',
    technicalPending: '技術區間',
    rangeSource: '技術形態',
    supportResistance: '支撐 / 阻力',
    noTags: '由目前分頁入隊',
    inspectFirst: '優先查看',
    needsValidation: '需要驗證'
  }
};

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

const formatZone = (zone) => zone ? `${formatPrice(zone[0])} - ${formatPrice(zone[1])}` : null;

const SetupBadge = ({ setup, locale }) => {
  if (!setup || setup.status === 'unavailable') {
    return <span className="crowdrisk-muted">—</span>;
  }
  const label = locale === 'zh'
    ? setup.status_label_zh || setup.status_label_en || setup.daily_action || '—'
    : setup.status_label_en || setup.status_label_zh || setup.daily_action || '—';
  if (String(label).toLowerCase() === 'neutral' || setup.daily_action === 'neutral' || setup.action_family === 'neutral') {
    return <span className="crowdrisk-muted">—</span>;
  }
  return <span className="momentum-setup-badge">{label}</span>;
};

const isMomentumBreakoutSetup = (setup) => (
  setup
  && setup.status !== 'unavailable'
  && (setup.action_family === 'breakout' || setup.action_family === 'price_discovery')
);

const buildMomentumRange = (setup, copy) => {
  const targetZone = normalizeZone(setup?.target_zone || setup?.targetRange || setup?.target_range);
  if (targetZone) {
    return { value: formatZone(targetZone), source: copy.rangeSource, missing: null };
  }
  const supportLevels = Array.isArray(setup?.support_levels) ? setup.support_levels : [];
  const resistanceLevels = Array.isArray(setup?.resistance_levels) ? setup.resistance_levels : [];
  const support = supportLevels.map(readLevelValue).filter((value) => value !== null).sort((a, b) => b - a)[0];
  const resistance = resistanceLevels.map(readLevelValue).filter((value) => value !== null).sort((a, b) => a - b)[0];
  if (support !== undefined || resistance !== undefined) {
    return {
      value: `${support !== undefined ? formatPrice(support) : copy.notAvailable} / ${resistance !== undefined ? formatPrice(resistance) : copy.notAvailable}`,
      source: copy.supportResistance,
      missing: null
    };
  }
  return { value: copy.notAvailable, source: copy.notAvailable, missing: copy.technicalPending };
};

export default function PublicLeaderboardPreview({ onOpenStockDossier, payload: fullRadarPayload, locale = 'en' }) {
  const copy = LEADERBOARD_COPY[locale] || LEADERBOARD_COPY.en;
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('new_radar_hits');

  useEffect(() => {
    fetch('https://kw-terminal-api.myfootballplaces.workers.dev/event-opportunity/leaderboard-compact-v1')
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch leaderboard data');
        return res.json();
      })
      .then(json => {
        setData(json);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="crowdrisk-panel-message fade-in">{copy.loading}</div>;
  if (error) return <div className="crowdrisk-panel-message error fade-in">{copy.error}: {error}</div>;
  if (!data || !data.tabs) return <div className="crowdrisk-panel-message fade-in">{copy.empty}</div>;

  const tabs = [
    { key: 'new_radar_hits', label: copy.tabs.new_radar_hits },
    { key: 'post_earnings_breakouts', label: copy.tabs.post_earnings_breakouts },
    { key: 'momentum_breakouts', label: copy.tabs.momentum_breakouts },
    { key: 'quality_compounders', label: copy.tabs.quality_compounders }
  ];

  const rowsByTicker = data.rows_by_ticker || {};
  const isMomentumBreakoutsTab = activeTab === 'momentum_breakouts';
  const momentumRankings = fullRadarPayload?.momentum_universe?.rankings || [];
  const momentumBreakoutRows = momentumRankings.filter(row => (
    isMomentumBreakoutSetup(row.trend_setup?.technical_setup)
  ));
  const rawTabTickers = data.tabs[activeTab] || [];
  const currentRows = isMomentumBreakoutsTab
    ? momentumBreakoutRows
    : rawTabTickers.map(ticker => rowsByTicker[ticker]).filter(Boolean);

  const resolveEventDetail = (row) => {
    const eventKey = row.dossier_target?.event_key;
    if (eventKey && fullRadarPayload?.events_detail?.[eventKey]) return fullRadarPayload.events_detail[eventKey];
    return Object.values(fullRadarPayload?.events_detail || {}).find((detail) => detail.ticker === row.ticker) || null;
  };

  const handleRowClick = (row) => {
    if (isMomentumBreakoutsTab) {
      const momentumDetail = buildMomentumUniverseSyntheticDetail(row.ticker, fullRadarPayload);
      if (momentumDetail) {
        onOpenStockDossier(row.ticker, momentumDetail);
        return;
      }
    }

    let resolvedEventDetail = null;
    const eventKey = row.dossier_target?.event_key;
    if (eventKey && fullRadarPayload?.events_detail?.[eventKey]) {
      resolvedEventDetail = fullRadarPayload.events_detail[eventKey];
    } else {
      resolvedEventDetail = { ticker: row.ticker, event_key: eventKey };
    }
    onOpenStockDossier(row.ticker, resolvedEventDetail);
  };

  return (
    <div className="crowdrisk-leaderboard-panel fade-in">
      <div className="crowdrisk-leaderboard-header">
        <div>
          <p className="crowdrisk-kicker">{copy.inspectFirst}</p>
          <h2>{copy.title}</h2>
          <p>{copy.subtitle}</p>
        </div>
      </div>

      <div className="crowdrisk-leaderboard-tabs">
        {tabs.map(t => (
          <button
            key={t.key}
            onClick={() => setActiveTab(t.key)}
            className={activeTab === t.key ? 'active' : ''}
          >
            {t.label} ({t.key === 'momentum_breakouts' ? momentumBreakoutRows.length : data.tabs[t.key]?.length || 0})
          </button>
        ))}
      </div>

      <div className="crowdrisk-research-queue">
        {currentRows.length === 0 ? (
          <div className="crowdrisk-empty-state">{copy.empty}</div>
        ) : (
          currentRows.map((row, idx) => {
            const eventDetail = resolveEventDetail(row);
            const setup = row.trend_setup?.technical_setup || eventDetail?.trend_setup?.technical_setup || {};
            const theme = isMomentumBreakoutsTab
              ? row.industry_theme_label || row.primary_theme || row.industry_theme || row.theme
              : row.primary_theme;
            const tags = isMomentumBreakoutsTab
              ? [row.regime, row.action_family].filter(Boolean)
              : row.compact_tags || [];
            const momentumRange = buildMomentumRange(setup, copy);
            const missingProof = [
              copy.valuationPending,
              momentumRange.missing
            ].filter(Boolean);
            const whyNow = tags[0] ? formatLabel(tags[0], locale) : copy.noTags;
            return (
              <article key={`${row.ticker}-${idx}`} className="crowdrisk-research-row" onClick={() => handleRowClick(row)}>
                <div className="crowdrisk-row-rank">
                  <span>{copy.rank}</span>
                  <strong>#{idx + 1}</strong>
                </div>
                <div className="crowdrisk-row-identity">
                  <strong>{row.ticker}</strong>
                  {theme ? <span>{formatLabel(theme, locale)}</span> : <span>{copy.notAvailable}</span>}
                  {isMomentumBreakoutsTab && <SetupBadge setup={setup} locale={locale} />}
                </div>
                <div className="crowdrisk-row-why">
                  <span>{copy.whyNow}</span>
                  <strong>{whyNow}</strong>
                  <div className="crowdrisk-evidence-chips" aria-label={copy.evidence}>
                    {tags.slice(0, 3).map((tag) => (
                      <em key={tag}>{formatLabel(tag, locale)}</em>
                    ))}
                    {!tags.length && <em>{copy.noTags}</em>}
                  </div>
                </div>
                <div className="crowdrisk-row-ranges">
                  <div>
                    <span>{copy.valuationRange}</span>
                    <strong>{copy.notAvailable}</strong>
                    <small>{copy.needsDossier}</small>
                  </div>
                  <div>
                    <span>{copy.momentumRange}</span>
                    <strong>{momentumRange.value}</strong>
                    <small>{momentumRange.source}</small>
                  </div>
                </div>
                <div className="crowdrisk-row-action">
                  <span>{copy.missingProof}</span>
                  <strong>{missingProof.join(' / ')}</strong>
                  <button
                    type="button"
                    onClick={(e) => { e.stopPropagation(); handleRowClick(row); }}
                  >
                    {copy.openDossier}
                  </button>
                </div>
              </article>
            );
          })
        )}
      </div>
    </div>
  );
}
