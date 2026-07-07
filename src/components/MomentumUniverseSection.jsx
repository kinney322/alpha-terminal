import { useMemo, useState } from 'react';
import { buildMomentumUniverseSyntheticDetail, resolveTechnicalCockpit } from './dossierHelpers.js';
import { displayLabel } from './displayLabelHelpers.js';

const MOMENTUM_COPY = {
  en: {
    loading: 'Loading Momentum Universe...',
    error: 'Momentum Universe payload unavailable.',
    kicker: 'Momentum Universe',
    title: 'Trend follow-through candidates ranked for research.',
    body: 'This section reads the live momentum universe contract and keeps scanner rank, scanner score, relative strength, price, and SMA distance in one place.',
    rank: 'Rank',
    ticker: 'Ticker',
    theme: 'Theme',
    scannerScore: 'Scanner Score',
    rsPercentile: 'RS Percentile',
    price: 'Price',
    setup: 'Setup',
    action: 'Action',
    openDossier: 'View Dossier',
    rankedNames: 'Ranked names',
    leaders: 'Leaders',
    constructive: 'Constructive',
    crowded: 'Extended',
    weak: 'Weak',
    neutral: 'Neutral',
    pullback: 'Pullback / reclaim',
    themeWatch: 'Theme watch',
    all: 'All',
    strongTrend: 'Strong trend',
    overbought: 'Overbought',
    asOf: 'As of',
    leadership: 'Leadership',
    trendStack: 'Trend stack',
    heatCheck: 'Heat check',
    priceMap: 'Price map',
    support: 'Support',
    resistance: 'Resistance',
    noResistance: 'No nearby resistance detected',
    observations: 'Observations',
    noObservation: 'No cockpit observation available.',
    vsSpy: 'vs SPY',
    vsQqq: 'vs QQQ',
    rsi: 'RSI',
    adx: 'ADX',
    volatility: 'Volatility',
    volume: 'Avg volume',
    unavailableValue: 'n/a',
    empty: 'No momentum universe rankings available.',
    coverageWatch: 'Ranking Watch',
    notRankable: 'Not Yet Rankable',
    coverageBody: 'Names that need more price history or scanner inputs before they can be ranked.',
    nameSingular: 'name',
    namePlural: 'names',
    reason: 'Reason',
    source: 'Reason',
    unmapped: 'Unmapped',
    inputHistoryUnavailable: 'Input history unavailable',
    insufficientHistory: 'Insufficient OHLCV history',
    missingOhlcv: 'Missing OHLCV',
    missingPrice: 'Missing price history'
  },
  zh: {
    loading: '正在載入動能宇宙...',
    error: '動能宇宙資料暫時無法取得。',
    kicker: '動能宇宙',
    title: '按研究優先次序排列的趨勢延續候選名單。',
    body: '這裡集中顯示即時動能排名、掃描分數、相對強度、價格與均線距離。',
    rank: '排名',
    ticker: '股票',
    theme: '主題',
    scannerScore: '掃描分數',
    rsPercentile: '相對強度百分位',
    price: '價格',
    setup: '結構',
    action: '動作',
    openDossier: '查看股票檔案',
    rankedNames: '已排名股票',
    leaders: '領先股',
    constructive: '建設性轉強',
    crowded: '偏伸延',
    weak: '弱勢',
    neutral: '中性',
    pullback: '回調 / 收復',
    themeWatch: '主題待整理',
    all: '全部',
    strongTrend: '強趨勢',
    overbought: '偏熱',
    asOf: '截至',
    leadership: '相對強度',
    trendStack: '趨勢排列',
    heatCheck: '熱度檢查',
    priceMap: '價格地圖',
    support: '支撐',
    resistance: '阻力',
    noResistance: '暫未偵測到近端阻力',
    observations: '觀察',
    noObservation: '暫無技術觀察。',
    vsSpy: '相對 SPY',
    vsQqq: '相對 QQQ',
    rsi: 'RSI',
    adx: 'ADX',
    volatility: '波動',
    volume: '平均成交量',
    unavailableValue: '暫無',
    empty: '暫無動能宇宙排名。',
    coverageWatch: '排名觀察',
    notRankable: '暫未可排名',
    coverageBody: '部分股票仍需要更多價格歷史或掃描輸入，暫時未納入排名。',
    nameSingular: '隻股票',
    namePlural: '隻股票',
    reason: '原因',
    source: '原因',
    unmapped: '未分類',
    inputHistoryUnavailable: '輸入歷史不足',
    insufficientHistory: 'OHLCV 歷史不足',
    missingOhlcv: '缺少 OHLCV',
    missingPrice: '缺少價格歷史'
  }
};

const TREND_FILTERS = [
  { key: 'all', labelKey: 'all' },
  { key: 'leaders', labelKey: 'leaders' },
  { key: 'constructive', labelKey: 'constructive' },
  { key: 'crowded', labelKey: 'crowded' },
  { key: 'pullback', labelKey: 'pullback' },
  { key: 'weak', labelKey: 'weak' },
  { key: 'themeWatch', labelKey: 'themeWatch' }
];

const formatNumber = (value, suffix = '') => {
  if (value === null || value === undefined || value === '') return '-';
  const num = Number(value);
  if (!Number.isFinite(num)) return String(value);
  return `${Math.round(num * 100) / 100}${suffix}`;
};

const formatPct = (value, digits = 1, fallback = '-') => {
  if (value === null || value === undefined || value === '') return fallback;
  const num = Number(value);
  if (!Number.isFinite(num)) return fallback;
  return `${num > 0 ? '+' : ''}${num.toFixed(digits)}%`;
};

const formatPlainNumber = (value, digits = 1, fallback = '-') => {
  if (value === null || value === undefined || value === '') return fallback;
  const num = Number(value);
  if (!Number.isFinite(num)) return fallback;
  return num.toFixed(digits);
};

const formatCompactNumber = (value, fallback = '-') => {
  if (value === null || value === undefined || value === '') return fallback;
  const num = Number(value);
  if (!Number.isFinite(num)) return fallback;
  if (num >= 1_000_000_000) return `${(num / 1_000_000_000).toFixed(1)}B`;
  if (num >= 1_000_000) return `${(num / 1_000_000).toFixed(1)}M`;
  if (num >= 1_000) return `${(num / 1_000).toFixed(1)}K`;
  return String(Math.round(num));
};

const formatPrice = (value, fallback = '-') => {
  if (value === null || value === undefined || value === '') return fallback;
  const num = Number(value);
  if (!Number.isFinite(num)) return fallback;
  return `$${num.toFixed(2)}`;
};

const normalizeRead = (value) => String(value || '').trim().toLowerCase();

const formatReadLabel = (value, locale, fallback = '-') => {
  const normalized = normalizeRead(value).replace(/_/g, ' ');
  if (!normalized) return fallback;
  const labels = {
    en: {
      'strong trend': 'Strong trend',
      'weak trend': 'Weak trend',
      neutral: 'Neutral',
      overbought: 'Overbought',
      oversold: 'Oversold',
      up: 'Up',
      down: 'Down',
      medium: 'Medium',
      high: 'High',
      low: 'Low'
    },
    zh: {
      'strong trend': '強趨勢',
      'weak trend': '弱趨勢',
      neutral: '中性',
      overbought: '偏熱',
      oversold: '偏冷',
      up: '向上',
      down: '向下',
      medium: '中等',
      high: '高',
      low: '低'
    }
  };
  return labels[locale]?.[normalized] || normalized.replace(/\b\w/g, (char) => char.toUpperCase());
};

const formatUnavailableReason = (value, copy) => {
  if (!value) return copy.inputHistoryUnavailable;
  const normalized = String(value).replace(/_/g, ' ').trim().toLowerCase();
  if (normalized === 'insufficient ohlcv history') return copy.insufficientHistory;
  if (normalized === 'missing ohlcv') return copy.missingOhlcv;
  if (normalized === 'missing price') return copy.missingPrice;
  return normalized.replace(/\b\w/g, (char) => char.toUpperCase());
};

const findCockpitSmaDistance = (cockpit, period) => {
  const row = (cockpit?.trend?.smaRows || []).find((item) => Number(item.period) === Number(period));
  return row?.priceDistancePct ?? null;
};

const findZoneByRole = (cockpit, role) => {
  const zones = cockpit?.supportResistance?.zones || [];
  return zones.find((zone) => normalizeRead(zone.role || zone.type).includes(role)) || null;
};

const formatZone = (zone, copy) => {
  if (!zone) return copy.unavailableValue;
  if (Array.isArray(zone.area) && zone.area.length >= 2) {
    return `${formatPrice(zone.area[0], '')}-${formatPrice(zone.area[1], '')}`;
  }
  if (zone.price !== null && zone.price !== undefined) return formatPrice(zone.price, copy.unavailableValue);
  return zone.labelEn || zone.labelZh || copy.unavailableValue;
};

const getMomentumRegime = (row) => row?.momentum_evidence?.regime || row?.regime || 'neutral';

const getMomentumEvidence = (row) => row?.momentum_evidence?.evidence || {};

const getTechnicalSetupLabel = (row, locale) => {
  const setup = row?.trend_setup?.technical_setup || {};
  return (locale === 'zh' ? setup.status_label_zh : setup.status_label_en)
    || setup.status_label_en
    || setup.daily_action
    || row?.trend_setup?.stage
    || '';
};

const rowMatchesFilter = (row, cockpit, filterKey) => {
  if (filterKey === 'all') return true;
  const regime = normalizeRead(getMomentumRegime(row));
  const themeLabel = normalizeRead(row?.industry_theme_label);
  const setup = row?.trend_setup?.technical_setup || {};
  const actionFamily = normalizeRead(setup.action_family);
  const dailyAction = normalizeRead(setup.daily_action);
  const rsiRead = normalizeRead(cockpit?.indicators?.rsiRead);

  if (filterKey === 'leaders') {
    return regime === 'confirmed_momentum' || Number(row?.scanner_score) >= 85 || Number(cockpit?.performance?.relativeStrengthPercentile) >= 90;
  }
  if (filterKey === 'constructive') return regime === 'constructive_momentum';
  if (filterKey === 'crowded') return regime === 'crowded_momentum' || rsiRead === 'overbought';
  if (filterKey === 'weak') return regime === 'weak_momentum';
  if (filterKey === 'pullback') {
    return actionFamily.includes('reclaim')
      || actionFamily.includes('support')
      || dailyAction.includes('reclaim')
      || dailyAction.includes('pullback')
      || regime === 'pullback_watch';
  }
  if (filterKey === 'themeWatch') return themeLabel === 'unmapped';
  return true;
};

const getFilterCounts = (rows, payload) => TREND_FILTERS.reduce((acc, filter) => {
  acc[filter.key] = rows.filter((row) => rowMatchesFilter(row, resolveTechnicalCockpit(null, row, payload), filter.key)).length;
  return acc;
}, {});

const getMomentumToneClass = (regime) => {
  const normalized = normalizeRead(regime);
  if (normalized === 'confirmed_momentum' || normalized === 'constructive_momentum') return 'positive';
  if (normalized === 'crowded_momentum') return 'warning';
  if (normalized === 'weak_momentum') return 'negative';
  return 'neutral';
};

const getRegimeLabel = (regime, locale) => {
  const normalized = normalizeRead(regime);
  const labels = {
    en: {
      confirmed_momentum: 'Confirmed',
      constructive_momentum: 'Constructive',
      crowded_momentum: 'Extended',
      pullback_watch: 'Pullback watch',
      weak_momentum: 'Weak',
      neutral: 'Neutral'
    },
    zh: {
      confirmed_momentum: '已確認',
      constructive_momentum: '建設性',
      crowded_momentum: '偏伸延',
      pullback_watch: '回調觀察',
      weak_momentum: '弱勢',
      neutral: '中性'
    }
  };
  return labels[locale]?.[normalized] || formatReadLabel(regime, locale, locale === 'zh' ? '中性' : 'Neutral');
};

const formatCockpitSetupLabel = (cockpit, locale) => {
  if (!cockpit) return null;
  const longTrend = String(cockpit.trend?.longTermTrend || '').toLowerCase();
  const shortTrend = String(cockpit.trend?.shortTermTrend || '').toLowerCase();
  const rsiRead = String(cockpit.indicators?.rsiRead || '').toLowerCase();

  if (longTrend === 'up' && shortTrend === 'up' && rsiRead === 'overbought') {
    return locale === 'zh' ? '趨勢向上 / 偏熱' : 'Up trend / extended';
  }
  if (longTrend === 'up' && shortTrend === 'up') {
    return locale === 'zh' ? '趨勢向上' : 'Up trend';
  }
  if (longTrend === 'down' || shortTrend === 'down') {
    return locale === 'zh' ? '趨勢轉弱' : 'Trend weakening';
  }
  return locale === 'zh' ? '技術面可讀' : 'Technical read available';
};

const SetupBadge = ({ setup, cockpit, locale = 'en' }) => {
  const cockpitLabel = formatCockpitSetupLabel(cockpit, locale);
  if (cockpitLabel) {
    return <span className="momentum-setup-badge">{cockpitLabel}</span>;
  }
  if (!setup || setup.status === 'unavailable') {
    return <span className="crowdrisk-muted">—</span>;
  }
  const label = (locale === 'zh' ? setup.status_label_zh : setup.status_label_en) || setup.status_label_en || setup.status_label_zh || setup.daily_action || '—';
  return <span className="momentum-setup-badge">{label}</span>;
};

function MomentumUniverseSection({ payload, loading, error, onOpenStockDossier, locale = 'en' }) {
  const copy = MOMENTUM_COPY[locale] || MOMENTUM_COPY.en;
  const [activeFilter, setActiveFilter] = useState('all');
  const rankings = payload?.momentum_universe?.rankings || [];
  const unavailableRows = payload?.momentum_universe?.unavailable || [];
  const asOfDate = payload?.meta?.as_of_date || payload?.meta?.brief_as_of_date || payload?.meta?.generated_at?.slice(0, 10);
  const filterCounts = useMemo(() => getFilterCounts(rankings, payload), [rankings, payload]);
  const filteredRankings = useMemo(() => (
    rankings.filter((row) => rowMatchesFilter(row, resolveTechnicalCockpit(null, row, payload), activeFilter))
  ), [rankings, payload, activeFilter]);
  const cockpitRows = useMemo(() => rankings.map((row) => ({
    row,
    cockpit: resolveTechnicalCockpit(null, row, payload)
  })), [rankings, payload]);
  const summary = useMemo(() => {
    const leaders = cockpitRows.filter(({ row, cockpit }) => rowMatchesFilter(row, cockpit, 'leaders')).length;
    const crowded = cockpitRows.filter(({ row, cockpit }) => rowMatchesFilter(row, cockpit, 'crowded')).length;
    const weak = cockpitRows.filter(({ row, cockpit }) => rowMatchesFilter(row, cockpit, 'weak')).length;
    const strongTrend = cockpitRows.filter(({ cockpit }) => normalizeRead(cockpit?.indicators?.adxRead) === 'strong_trend').length;
    const overbought = cockpitRows.filter(({ cockpit }) => normalizeRead(cockpit?.indicators?.rsiRead) === 'overbought').length;
    return { leaders, crowded, weak, strongTrend, overbought };
  }, [cockpitRows]);

  const openDossier = (row) => {
    const detail = buildMomentumUniverseSyntheticDetail(row.ticker, payload);
    if (detail) onOpenStockDossier(row.ticker, detail);
  };

  if (loading) {
    return <div className="crowdrisk-panel-message">{copy.loading}</div>;
  }

  if (error) {
    return <div className="crowdrisk-panel-message error">{copy.error}</div>;
  }

  return (
    <section className="momentum-universe-panel">
      <div className="crowdrisk-section-heading">
        <p className="crowdrisk-kicker">{copy.kicker}</p>
        <h1>{copy.title}</h1>
        <p>
          {copy.body}
        </p>
      </div>

      <div className="momentum-cockpit-summary">
        <div className="momentum-cockpit-summary__lead">
          <span>{copy.rankedNames}</span>
          <strong>{rankings.length}</strong>
          {asOfDate && <small>{copy.asOf} {asOfDate}</small>}
        </div>
        <div className="momentum-cockpit-summary__grid">
          <div><span>{copy.leaders}</span><strong>{summary.leaders}</strong></div>
          <div><span>{copy.crowded}</span><strong>{summary.crowded}</strong></div>
          <div><span>{copy.weak}</span><strong>{summary.weak}</strong></div>
          <div><span>{copy.strongTrend}</span><strong>{summary.strongTrend}</strong></div>
          <div><span>{copy.overbought}</span><strong>{summary.overbought}</strong></div>
        </div>
      </div>

      <div className="momentum-cockpit-filters" aria-label="Trend cockpit filters">
        {TREND_FILTERS.map((filter) => (
          <button
            key={filter.key}
            type="button"
            className={activeFilter === filter.key ? 'active' : ''}
            onClick={() => setActiveFilter(filter.key)}
          >
            <span>{copy[filter.labelKey]}</span>
            <strong>{filterCounts[filter.key] || 0}</strong>
          </button>
        ))}
      </div>

      <div className="momentum-cockpit-list">
        {filteredRankings.map((row, idx) => {
          const cockpit = resolveTechnicalCockpit(null, row, payload);
          const momentumEvidence = getMomentumEvidence(row);
          const sma20Distance = findCockpitSmaDistance(cockpit, 20) ?? row.price_vs_sma20_pct;
          const sma50Distance = findCockpitSmaDistance(cockpit, 50) ?? row.price_vs_sma50_pct;
          const sma200Distance = findCockpitSmaDistance(cockpit, 200) ?? row.price_vs_sma200_pct;
          const rsPercentile = cockpit?.performance?.relativeStrengthPercentile ?? row.relative_strength_percentile;
          const price = cockpit?.snapshot?.close ?? row.price;
          const supportZone = findZoneByRole(cockpit, 'support');
          const resistanceZone = findZoneByRole(cockpit, 'resistance');
          const observations = cockpit?.observations || [];
          const regime = getMomentumRegime(row);
          const theme = displayLabel(row.industry_theme_label || row.primary_theme || row.industry_theme || row.theme, locale, copy.unmapped);
          const setupLabel = getTechnicalSetupLabel(row, locale);

          return (
            <article className="momentum-cockpit-card" key={`${row.ticker}-${idx}`}>
              <div className="momentum-cockpit-card__header">
                <div>
                  <span className="momentum-cockpit-rank">#{row.scanner_rank || row.rank || idx + 1}</span>
                  <h2>{row.ticker}</h2>
                  <p>{theme}</p>
                </div>
                <div className="momentum-cockpit-card__actions">
                  <span className={`momentum-cockpit-regime momentum-cockpit-regime--${getMomentumToneClass(regime)}`}>
                    {getRegimeLabel(regime, locale)}
                  </span>
                  <button type="button" onClick={() => openDossier(row)}>
                    {copy.openDossier} →
                  </button>
                </div>
              </div>

              <div className="momentum-cockpit-card__metrics">
                <div className="momentum-cockpit-metric">
                  <span>{copy.scannerScore}</span>
                  <strong>{formatNumber(row.scanner_score || row.leaderboard_score)}</strong>
                  <small>{setupLabel || formatCockpitSetupLabel(cockpit, locale)}</small>
                </div>
                <div className="momentum-cockpit-metric">
                  <span>{copy.leadership}</span>
                  <strong>{formatPlainNumber(rsPercentile, 0)}%</strong>
                  <small>{copy.vsSpy} {formatPct(cockpit?.performance?.vsSpy63d ?? momentumEvidence.relative_strength_vs_spy_63d)} · {copy.vsQqq} {formatPct(cockpit?.performance?.vsQqq63d ?? momentumEvidence.relative_strength_vs_qqq_63d)}</small>
                </div>
                <div className="momentum-cockpit-metric">
                  <span>{copy.trendStack}</span>
                  <strong>{formatPrice(price, copy.unavailableValue)}</strong>
                  <small>20D {formatPct(sma20Distance)} · 50D {formatPct(sma50Distance)} · 200D {formatPct(sma200Distance)}</small>
                </div>
                <div className="momentum-cockpit-metric">
                  <span>{copy.heatCheck}</span>
                  <strong>{copy.rsi} {formatPlainNumber(cockpit?.indicators?.rsi14, 1)}</strong>
                  <small>{formatReadLabel(cockpit?.indicators?.rsiRead, locale)} · {copy.adx} {formatPlainNumber(cockpit?.indicators?.adx14, 1)} {formatReadLabel(cockpit?.indicators?.adxRead, locale, '')}</small>
                </div>
                <div className="momentum-cockpit-metric">
                  <span>{copy.volatility}</span>
                  <strong>{formatPct(cockpit?.indicators?.atrPct, 1, copy.unavailableValue)}</strong>
                  <small>ADR {formatPct(cockpit?.indicators?.adrPct, 1, copy.unavailableValue)} · {copy.volume} {formatCompactNumber(cockpit?.snapshot?.averageVolume20d, copy.unavailableValue)}</small>
                </div>
                <div className="momentum-cockpit-metric">
                  <span>{copy.priceMap}</span>
                  <strong>{copy.support} {formatZone(supportZone, copy)}</strong>
                  <small>{resistanceZone ? `${copy.resistance} ${formatZone(resistanceZone, copy)}` : copy.noResistance}</small>
                </div>
              </div>

              <div className="momentum-cockpit-observations">
                <span>{copy.observations}</span>
                {observations.length ? (
                  observations.slice(0, 2).map((item, observationIdx) => (
                    <p key={observationIdx}>{locale === 'zh' ? item.textZh : item.textEn}</p>
                  ))
                ) : (
                  <p>{copy.noObservation}</p>
                )}
              </div>
            </article>
          );
        })}
        {!filteredRankings.length && (
          <div className="crowdrisk-empty-state">{copy.empty}</div>
        )}
      </div>

      {!!unavailableRows.length && (
        <div className="momentum-unavailable-panel" aria-label="Momentum names not yet rankable">
          <div className="momentum-unavailable-heading">
            <div>
              <p className="crowdrisk-kicker">{copy.coverageWatch}</p>
              <h2>{copy.notRankable}</h2>
              <p>{copy.coverageBody}</p>
            </div>
            <span>{unavailableRows.length} {unavailableRows.length === 1 ? copy.nameSingular : copy.namePlural}</span>
          </div>

          <div className="momentum-unavailable-list">
            {unavailableRows.map((row) => (
              <div className="momentum-unavailable-row" key={row.ticker}>
                <div>
                  <strong>{row.ticker}</strong>
                  <span>{displayLabel(row.industry_theme_label || row.industry_theme || row.theme, locale, copy.unmapped)}</span>
                </div>
                <div>
                  <span className="momentum-unavailable-label">{copy.reason}</span>
                  <strong>{formatUnavailableReason(row.unavailable_reason || row.reason, copy)}</strong>
                </div>
                <button type="button" onClick={() => openDossier(row)}>
                  {copy.openDossier} →
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}

export default MomentumUniverseSection;
