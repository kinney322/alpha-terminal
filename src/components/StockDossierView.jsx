import React from 'react';
import {
  buildDossierSummary,
  buildResearchKillSwitch,
  buildPriceTrendRisk,
  buildValuationCore,
  buildStockOverview,
  resolveTechnicalCockpit,
  resolveValueCore
} from './dossierHelpers';
import { getStockDossierProfile } from '../data/stockDossierProfiles';
import { resolveStockDossierContractModel } from '../data/stockDossierContractAdapter';
import { resolveReferencePeerEcosystemSnapshot } from '../data/referencePeerMapAdapter';
import { canonicalizeTicker, getTickerLookupKeys } from '../data/tickerAliases';
import StockLogo from './StockLogo';
import { displayLabel, frontendEmptyText, hasFrontendValue, optionalFrontendText, safeFrontendText } from './displayLabelHelpers.js';

const API_BASE = 'https://kw-terminal-api.myfootballplaces.workers.dev';

const formatPct = (value) => {
  if (value === undefined || value === null || Number.isNaN(Number(value))) return '—';
  const n = Number(value);
  return `${n > 0 ? '+' : ''}${n.toFixed(1)}%`;
};

const formatLabel = (value, locale = 'en') => displayLabel(value, locale, locale === 'zh' ? '未納入' : 'Not Included');

const formatFiscalPeriodLabel = (value, locale = 'en') => {
  if (!value) return value;
  if (locale !== 'zh') return value;
  const raw = String(value).trim();
  const fiscalMatch = raw.match(/^(Q\d)\s+(FY\d{4}|\d{4})\s+ended\s+(\d{4}-\d{2}-\d{2})$/i);
  if (fiscalMatch) return `${fiscalMatch[1].toUpperCase()} ${fiscalMatch[2].toUpperCase()}，截至 ${fiscalMatch[3]}`;
  const secMatch = raw.match(/^Latest SEC periodic filing report date\s+(\d{4}-\d{2}-\d{2})$/i);
  if (secMatch) return `最新 SEC 定期申報日期：${secMatch[1]}`;
  return displayLabel(raw, locale, raw);
};

const formatValuationMetric = (metric) => {
  if (metric.value === undefined || metric.value === null || Number.isNaN(Number(metric.value))) return '—';
  const numeric = Number(metric.value);
  if (metric.format === 'percent') return `${(numeric * 100).toFixed(1)}%`;
  if (metric.format === 'multiple') return `${numeric.toFixed(2)}x`;
  if (metric.format === 'billion') return `$${numeric.toFixed(1)}B`;
  return numeric.toFixed(1);
};

const formatTechnicalZone = (value) => {
  if (!value || String(value).toLowerCase() === 'null' || value === '$0-$0' || value === 'undefined') {
    return null;
  }
  if (Array.isArray(value)) {
    const nums = value.map(Number).filter(Number.isFinite);
    if (!nums.length || nums.every((num) => num === 0)) return null;
    if (nums.length >= 2) {
      return `$${nums[0].toFixed(2)}-$${nums[1].toFixed(2)}`;
    }
    return `$${nums[0].toFixed(2)}`;
  }
  return String(value);
};

const normalizeTechnicalZone = (value) => {
  if (!Array.isArray(value)) return null;
  const nums = value.map(Number).filter(Number.isFinite);
  if (!nums.length || nums.every((num) => num === 0)) return null;
  if (nums.length === 1) return [nums[0], nums[0]];
  return [Math.min(nums[0], nums[1]), Math.max(nums[0], nums[1])];
};

const formatUpsideRange = (basePrice, targetZone) => {
  const base = Number(basePrice);
  if (!Number.isFinite(base) || base <= 0 || !targetZone) return null;
  const [targetLow, targetHigh] = targetZone;
  const lowPct = ((targetLow - base) / base) * 100;
  const highPct = ((targetHigh - base) / base) * 100;
  if (!Number.isFinite(lowPct) || !Number.isFinite(highPct)) return null;
  const lowText = `${lowPct > 0 ? '+' : ''}${lowPct.toFixed(1)}%`;
  const highText = `${highPct > 0 ? '+' : ''}${highPct.toFixed(1)}%`;
  return lowText === highText ? lowText : `${lowText} to ${highText}`;
};

const formatTechnicalPrice = (value) => {
  const num = Number(value);
  if (!Number.isFinite(num) || num <= 0) return null;
  return `$${num.toFixed(2)}`;
};

const formatMarketPrice = (value) => {
  const num = Number(value);
  if (!Number.isFinite(num) || num <= 0) return null;
  return `$${num.toFixed(2)}`;
};

const findMomentumUniverseRow = (payload, ticker) => {
  const normalizedTicker = String(ticker || '').trim().toUpperCase();
  if (!normalizedTicker) return null;
  return (payload?.momentum_universe?.rankings || [])
    .find((row) => String(row?.ticker || '').trim().toUpperCase() === normalizedTicker) || null;
};

const resolveLatestMarketPrice = (eventDetail, payload, ticker) => {
  const normalizedTicker = String(ticker || eventDetail?.ticker || '').trim().toUpperCase();
  const matchingMomentumRow = findMomentumUniverseRow(payload, normalizedTicker);

  const sources = [
    eventDetail?.current_price,
    eventDetail?.latest_price,
    eventDetail?.price,
    eventDetail?.close,
    eventDetail?.trend_setup?.metrics?.latest_close,
    matchingMomentumRow?.price,
    matchingMomentumRow?.latest_close,
    matchingMomentumRow?.trend_setup?.metrics?.latest_close
  ];

  for (const source of sources) {
    const formatted = formatMarketPrice(source);
    if (formatted) return formatted;
  }

  return null;
};

const resolveLatestTechnicalPrice = (eventDetail, payload, ticker) => {
  const normalizedTicker = String(ticker || eventDetail?.ticker || '').trim().toUpperCase();
  const matchingMomentumRow = findMomentumUniverseRow(payload, normalizedTicker);
  const sources = [
    eventDetail?.current_price,
    eventDetail?.latest_price,
    eventDetail?.price,
    eventDetail?.close,
    eventDetail?.trend_setup?.metrics?.latest_close,
    eventDetail?.momentum_evidence?.evidence?.latest_close,
    matchingMomentumRow?.price,
    matchingMomentumRow?.latest_close,
    matchingMomentumRow?.trend_setup?.metrics?.latest_close
  ];

  for (const source of sources) {
    const numeric = toNumeric(source);
    if (numeric !== null && numeric > 0) return numeric;
  }

  return null;
};

const formatLiveMarketCap = (value) => {
  const numeric = toNumeric(value);
  if (numeric === null || numeric <= 0) return null;
  if (numeric >= 1_000_000_000_000) return `$${(numeric / 1_000_000_000_000).toFixed(1)}T`;
  if (numeric >= 1_000_000_000) return `$${(numeric / 1_000_000_000).toFixed(1)}B`;
  if (numeric >= 1_000_000) return `$${(numeric / 1_000_000).toFixed(1)}M`;
  return `$${numeric.toLocaleString('en-US', { maximumFractionDigits: 0 })}`;
};

const findStockPerformanceRow = (stockPerformancePayload, ticker) => {
  const row = getTickerLookupKeys(ticker).map((key) => stockPerformancePayload?.returns?.[key]).find(Boolean);
  return row && typeof row === 'object' && !Array.isArray(row) ? row : null;
};

const resolveLiveCapitalization = (stockPerformancePayload, ticker) => {
  const row = findStockPerformanceRow(stockPerformancePayload, ticker);
  const capitalization = row?.capitalization;
  if (!capitalization || typeof capitalization !== 'object' || Array.isArray(capitalization)) return null;
  if (capitalization.status !== 'available') return null;
  const marketCap = formatLiveMarketCap(capitalization.market_cap);
  if (!marketCap) return null;

  return {
    marketCap,
    sharesOutstanding: capitalization.shares_outstanding,
    sharesOutstandingAsOf: capitalization.shares_outstanding_as_of,
    qualityStatus: capitalization.quality_status || 'available'
  };
};

const buildLiveMarketSnapshot = (snapshot, eventDetail, payload, ticker, stockPerformancePayload) => {
  const stockPerformanceRow = findStockPerformanceRow(stockPerformancePayload, ticker);
  const latestPrice = formatMarketPrice(stockPerformanceRow?.price) || resolveLatestMarketPrice(eventDetail, payload, ticker);
  const liveCapitalization = resolveLiveCapitalization(stockPerformancePayload, ticker);
  if (!snapshot && latestPrice) {
    return {
      currentPrice: latestPrice,
      ...(liveCapitalization?.marketCap ? { marketCap: liveCapitalization.marketCap } : {})
    };
  }
  if (!snapshot) return null;
  if (!latestPrice && !liveCapitalization?.marketCap) return snapshot;
  return {
    ...snapshot,
    ...(latestPrice ? { currentPrice: latestPrice } : {}),
    ...(liveCapitalization?.marketCap ? { marketCap: liveCapitalization.marketCap } : {})
  };
};

const shouldShowTechnicalSupport = (setup) => (
  setup.action_family === 'support'
  || setup.action_family === 'downtrend'
  || setup.action_family === 'neutral'
);

const verdictStateLabels = {
  post_earnings_watch: 'Post-earnings watch',
  priced_for_perfection: 'Priced for perfection',
  constructive: 'Constructive',
  high: 'High'
};

const thesisStateLabels = {
  ai_risk: 'AI risk',
  ai_benefit: 'AI benefit',
  neutral: 'neutral',
  mixed: 'mixed'
};

const renderStructuredVerdict = (structuredVerdict, fallback, locale = 'en') => {
  if (!structuredVerdict) {
    return {
      reason: fallback.reason,
      verdict: fallback.verdict,
      support: [],
      risks: []
    };
  }

  const researchState = verdictStateLabels[structuredVerdict.researchState] || formatLabel(structuredVerdict.researchState);
  const marketEvidence = verdictStateLabels[structuredVerdict.marketEvidence] || formatLabel(structuredVerdict.marketEvidence);
  const shift = structuredVerdict.thesisShift;
  const shiftReason = localizedValue(shift, 'reason', locale) || shift?.reason;
  const shiftLine = shift?.from && shift?.to
    ? locale === 'zh'
      ? `工作論點由 ${thesisStateLabels[shift.from] || formatLabel(shift.from)} 轉向 ${thesisStateLabels[shift.to] || formatLabel(shift.to)}：${shiftReason}`
      : `The working thesis has shifted from ${thesisStateLabels[shift.from] || formatLabel(shift.from)} to ${thesisStateLabels[shift.to] || formatLabel(shift.to)}: ${shiftReason}`
    : '';
  const support = localizedArray(structuredVerdict, 'keySupport', locale);
  const risks = localizedArray(structuredVerdict, 'keyRisk', locale);

  return {
    reason: `${researchState}: ${marketEvidence.toLowerCase()} evidence keeps this stock on the research queue.`,
    verdict: localizedValue(structuredVerdict, 'finalRead', locale) || structuredVerdict.finalRead || fallback.verdict,
    thesisShift: shiftLine,
    support: support.length ? support : (structuredVerdict.keySupport || []),
    risks: risks.length ? risks : (structuredVerdict.keyRisk || [])
  };
};

const localizedValue = (source, key, locale) => {
  if (!source) return undefined;
  const localizedKey = locale === 'zh' ? `${key}_zh` : `${key}_en`;
  return source[localizedKey] || source[key];
};

const localizedArray = (source, key, locale) => {
  const value = localizedValue(source, key, locale);
  return Array.isArray(value) ? value : [];
};

const localizedFaqItems = (items, locale) => {
  if (!Array.isArray(items)) return [];
  return items.map((item) => ({
    ...item,
    question: localizedValue(item, 'question', locale) || item.question,
    answer: localizedValue(item, 'answer', locale) || item.answer
  }));
};

const localizedItems = (items, locale, keys) => {
  if (!Array.isArray(items)) return [];
  return items.map((item) => keys.reduce((next, key) => {
    const value = localizedValue(item, key, locale);
    if (value !== undefined) {
      next[key] = value;
    } else if (typeof next[key] === 'string') {
      next[key] = localizedStaticLabel(next[key], locale);
    }
    return next;
  }, { ...item }));
};

const localizedStaticLabel = (value, locale) => {
  if (!hasFrontendValue(value)) return '—';
  if (locale !== 'zh') return value;
  return {
    Above: '高於',
    Base: '基準',
    'Base Case': '基準情境',
    Bear: '悲觀',
    'Business Quality': '業務質素',
    'Between Catalysts': '催化事件之間',
    Bull: '樂觀',
    'Catalyst Watch': '催化觀察',
    'Crowding Risk': '擁擠風險',
    'Current curated read': '目前整理判斷',
    'Evidence status': '證據狀態',
    'Follow-through since the event': '事件後延續表現',
    'Financial health evidence': '財務健康證據',
    'Gap-up Rate': '高開機率',
    High: '高',
    'Latest reaction': '最新反應',
    'Live reference context': '同業參考已載入',
    'Long Term': '長期趨勢',
    'Margin of Safety': '安全邊際',
    'Market-derived': '市場推導',
    Medium: '中',
    'Measured Gaps': '已核實高低開',
    'Momentum Score': '動能分數',
    'Momentum Candidate': '動能候選',
    Negative: '負面',
    Neutral: '中性',
    None: '沒有',
    'No margin of safety': '沒有安全邊際',
    Percentile: '百分位',
    'Peer-Led Context': '同業帶動',
    'Post-Earnings Watch': '財報後觀察',
    'Priced for Perfection': '接近完美定價',
    Reaction: '反應',
    'Relative Strength': '相對強度',
    'Risk cushion': '風險緩衝',
    Scaling: '擴張期',
    'Software / SaaS': '軟件 / SaaS',
    Strength: '強度',
    'Strong trend': '強勢趨勢',
    'Strong trend, but extended': '趨勢強，但已偏伸延',
    Theme: '主題',
    Trend: '趨勢',
    'Constructive trend': '趨勢正面',
    'Trend needs confirmation': '趨勢仍待確認',
    Type: '類型',
    Valuation: '估值',
    'Valuation State': '估值狀態',
    'Valuation state': '估值狀態',
    'Valuation Judgment': '估值判斷',
    'Value Core Type': '價值核心類型',
    'Company Stage': '公司階段',
    'Primary Driver': '主要驅動因素',
    'Thesis Break Trigger': '論點破局觸發點',
    'Break Trigger': '破局觸發點',
    'Universe Rank': '全名單排名',
    'Theme Rank': '主題排名',
    'Trend Stack': '趨勢排列',
    'Overall scan': '全市場掃描',
    'vs SMA20 / 50 / 200': '相對 SMA20 / 50 / 200',
    '200D stretch / upper band': '200 日伸延 / 上軌日數'
  }[value] || value;
};

const toNumeric = (value) => {
  if (value === null || value === undefined || value === '') return null;
  const numeric = Number(value);
  return Number.isFinite(numeric) ? numeric : null;
};

const formatRatioReturn = (value, digits = 1) => {
  const numeric = toNumeric(value);
  if (numeric === null) return null;
  const percent = numeric * 100;
  const prefix = percent > 0 ? '+' : '';
  return `${prefix}${percent.toFixed(digits)}%`;
};

const returnToneClass = (value) => {
  const numeric = toNumeric(value);
  if (numeric === null) return 'pending';
  if (numeric > 0) return 'positive';
  if (numeric < 0) return 'negative';
  return 'neutral';
};

const rateToneClass = (value) => {
  const numeric = toNumeric(value);
  if (numeric === null) return 'pending';
  if (numeric >= 0.55) return 'positive';
  if (numeric <= 0.45) return 'negative';
  return 'neutral';
};

const RatioReturnValue = ({ value, digits = 1 }) => {
  const formatted = formatRatioReturn(value, digits);
  if (formatted === null) {
    return <em className="dossier-pending-value">—</em>;
  }
  return <span className={`dossier-return-value tone-${returnToneClass(value)}`}>{formatted}</span>;
};

const SummaryMetric = ({ label, summary, value, countLabel = 'measured' }) => (
  <div className="dossier-event-summary-metric">
    <span>{label}</span>
    <strong>
      {summary ? (
        <>
          <RatioReturnValue value={value ?? summary.avg_return} />
          <small>{summary.count ?? 0} {countLabel}</small>
        </>
      ) : (
        <em className="dossier-pending-value">—</em>
      )}
    </strong>
  </div>
);

const metricById = (valuationCore, id) => (
  (Array.isArray(valuationCore?.coreMetrics) ? valuationCore.coreMetrics : [])
    .find((metric) => metric.id === id) || null
);

const valuationMetricValue = (valuationCore, id) => {
  const metric = metricById(valuationCore, id);
  return metric ? formatValuationMetric(metric) : '—';
};

const marketSnapshotValue = (snapshot, key) => snapshot?.[key] || '—';

const parseDollarValue = (value) => {
  if (value === undefined || value === null) return null;
  const text = String(value).replace(/[$,]/g, '').trim();
  const match = text.match(/-?\d+(\.\d+)?/);
  if (!match) return null;
  const numeric = Number(match[0]);
  return Number.isFinite(numeric) ? numeric : null;
};

const formatBillionValue = (value) => (
  Number.isFinite(Number(value)) ? `$${Number(value).toFixed(1)}B` : '—'
);

const formatBillionRange = (low, high) => {
  if (!Number.isFinite(Number(low)) || !Number.isFinite(Number(high))) return '—';
  return `$${Number(low).toFixed(1)}B-$${Number(high).toFixed(1)}B`;
};

const formatWholePrice = (value) => (
  Number.isFinite(Number(value)) ? `$${Number(value).toFixed(0)}` : '—'
);

const formatWholePriceRange = (low, high) => {
  if (!Number.isFinite(Number(low)) || !Number.isFinite(Number(high))) return '—';
  return `$${Number(low).toFixed(0)}-$${Number(high).toFixed(0)}`;
};

const formatScenarioMultiple = (value, suffix) => (
  Number.isFinite(Number(value)) ? `${Number(value).toFixed(1)}x ${suffix}` : '—'
);

const formatMultipleRange = (low, high, suffix) => {
  if (!Number.isFinite(Number(low)) || !Number.isFinite(Number(high))) return '—';
  return `${Number(low).toFixed(1)}x-${Number(high).toFixed(1)}x ${suffix}`;
};

const formatScenarioPct = (value) => {
  if (value === undefined || value === null || value === '') return '—';
  const numeric = Number(value);
  if (!Number.isFinite(numeric)) return '—';
  return `${numeric > 0 ? '+' : ''}${numeric.toFixed(1)}%`;
};

const formatRangeMarkerPct = (value, low, high) => {
  const numeric = Number(value);
  const min = Number(low);
  const max = Number(high);
  if (!Number.isFinite(numeric) || !Number.isFinite(min) || !Number.isFinite(max) || max <= min) return '50%';
  const pct = ((numeric - min) / (max - min)) * 100;
  return `${Math.max(0, Math.min(100, pct)).toFixed(1)}%`;
};

const medianNumber = (values) => {
  const nums = values.map(Number).filter(Number.isFinite).sort((a, b) => a - b);
  if (!nums.length) return null;
  const mid = Math.floor(nums.length / 2);
  return nums.length % 2 ? nums[mid] : (nums[mid - 1] + nums[mid]) / 2;
};

const buildForwardValuationRange = (valuationCore, marketSnapshot) => {
  const range = valuationCore.forwardValuationRange;
  if (!range?.scenarios?.length) return null;

  const currentPrice = parseDollarValue(marketSnapshot?.currentPrice);
  const marketCap = parseDollarValue(marketSnapshot?.marketCap);
  const netCashAdjustment = Number.isFinite(Number(range.netCashAdjustment))
    ? Number(range.netCashAdjustment)
    : null;
  const explicitShareCount = Number.isFinite(Number(range.shareCountBillions))
    ? Number(range.shareCountBillions)
    : null;
  const estimatedShareCount = currentPrice && marketCap ? marketCap / currentPrice : null;
  const shareCountBillions = explicitShareCount || estimatedShareCount;

  const scenarioRows = range.scenarios.map((scenario) => {
    const fy28Revenue = Number(scenario.fy28Revenue);
    const evRevenueMultiple = Number(scenario.evRevenueMultiple);
    const impliedEv = Number.isFinite(fy28Revenue) && Number.isFinite(evRevenueMultiple)
      ? fy28Revenue * evRevenueMultiple
      : null;
    const impliedEquityValue = impliedEv !== null && netCashAdjustment !== null
      ? impliedEv + netCashAdjustment
      : null;
    const impliedPrice = impliedEquityValue !== null && shareCountBillions
      ? impliedEquityValue / shareCountBillions
      : null;
    const upsideDownside = impliedPrice !== null && currentPrice
      ? ((impliedPrice / currentPrice) - 1) * 100
      : null;
    const threeYearIrr = impliedPrice !== null && currentPrice
      ? ((Math.pow(impliedPrice / currentPrice, 1 / 3) - 1) * 100)
      : null;
    const irrDisplay = threeYearIrr === null
      ? '—'
      : formatScenarioPct(threeYearIrr);

    return {
      ...scenario,
      impliedEv,
      impliedEquityValue,
      impliedPrice,
      upsideDownside,
      threeYearIrr,
      irrDisplay
    };
  });

  const fy28Values = scenarioRows.map(row => row.fy28Revenue);
  const evRevenueMultiples = scenarioRows.map(row => row.evRevenueMultiple);
  const impliedEvs = scenarioRows.map(row => row.impliedEv);
  const equityValues = scenarioRows.map(row => row.impliedEquityValue);
  const impliedPrices = scenarioRows.map(row => row.impliedPrice);
  const rangeLowPrice = Math.min(...impliedPrices.filter(Number.isFinite));
  const rangeHighPrice = Math.max(...impliedPrices.filter(Number.isFinite));
  const medianPrice = medianNumber(impliedPrices);
  const medianUpsideDownside = medianPrice !== null && currentPrice
    ? ((medianPrice / currentPrice) - 1) * 100
    : null;
  const medianThreeYearIrr = medianPrice !== null && currentPrice
    ? ((Math.pow(medianPrice / currentPrice, 1 / 3) - 1) * 100)
    : null;

  return {
    valuationMethod: range.valuationMethod || 'Forecast revenue x EV / revenue range',
    forwardModelHorizon: range.forwardModelHorizon || 'FY2027 / FY2028 model assumption',
    forecastMetric: range.forecastMetric || 'Revenue',
    forecastMetricRange: formatBillionRange(Math.min(...fy28Values.filter(Number.isFinite)), Math.max(...fy28Values.filter(Number.isFinite))),
    multipleRange: formatMultipleRange(Math.min(...evRevenueMultiples.filter(Number.isFinite)), Math.max(...evRevenueMultiples.filter(Number.isFinite)), 'EV / Rev'),
    fy26RevenueGuide: range.fy26RevenueGuide || marketSnapshotValue(marketSnapshot, 'fiscalYearRevenueGuide'),
    fy27Fy28Assumption: range.methodNote || 'Model assumption, not live consensus.',
    fiscalYearNote: range.fiscalYearNote || 'Fiscal-year note: current company guide is FY2026. FY2027 and FY2028 figures below are model assumptions.',
    fiscalYearEndDisplay: range.fiscalYearEnd
      ? `Fiscal Year End: ${range.fiscalYearEnd}`
      : '',
    dataType: range.dataType || 'Model assumption, not live consensus',
    confidence: range.confidence || 'Medium-low until current full consensus model is added',
    missingEvidence: range.missingEvidence || valuationCore.missingEvidence,
    netCashAdjustment,
    currentPrice,
    currentPriceDisplay: currentPrice ? formatWholePrice(currentPrice) : '—',
    shareCountBillions,
    shareCountDisplay: shareCountBillions
      ? `${shareCountBillions.toFixed(3)}B ${explicitShareCount ? 'explicit shares' : 'estimated shares from market cap / current price'}`
      : '—',
    impliedEvRange: formatBillionRange(Math.min(...impliedEvs.filter(Number.isFinite)), Math.max(...impliedEvs.filter(Number.isFinite))),
    impliedEquityValueRange: formatBillionRange(Math.min(...equityValues.filter(Number.isFinite)), Math.max(...equityValues.filter(Number.isFinite))),
    impliedPriceRange: Number.isFinite(rangeLowPrice) && Number.isFinite(rangeHighPrice)
      ? formatWholePriceRange(rangeLowPrice, rangeHighPrice)
      : '—',
    medianPrice,
    medianPriceDisplay: medianPrice !== null ? formatWholePrice(medianPrice) : '—',
    medianUpsideDownside,
    medianUpsideDownsideDisplay: medianUpsideDownside !== null ? formatScenarioPct(medianUpsideDownside) : '—',
    medianThreeYearIrr,
    medianThreeYearIrrDisplay: medianThreeYearIrr !== null ? formatScenarioPct(medianThreeYearIrr) : '—',
    scenarios: scenarioRows
  };
};

const buildValuationResearchGroups = (valuationCore, marketSnapshot) => ([
  {
    title: 'Current Valuation',
    note: 'Current price, market cap, enterprise value, and forward guide stay together with valuation multiples.',
    metrics: [
      { label: 'Current Price', value: marketSnapshotValue(marketSnapshot, 'currentPrice') },
      { label: 'Market Cap', value: marketSnapshotValue(marketSnapshot, 'marketCap') },
      { label: 'Enterprise Value', value: marketSnapshotValue(marketSnapshot, 'enterpriseValue') },
      { label: 'FY Revenue Guide', value: marketSnapshotValue(marketSnapshot, 'fiscalYearRevenueGuide') },
      { label: 'EV / Revenue', value: valuationMetricValue(valuationCore, 'ev_revenue') },
      { label: 'EV / FCF', value: valuationMetricValue(valuationCore, 'ev_fcf') }
    ]
  },
  {
    title: 'Future Growth',
    note: valuationCore.researchJudgment[0] || 'Forward growth assumptions are pending.',
    metrics: [
      { label: 'Revenue Growth', value: valuationMetricValue(valuationCore, 'revenue_growth') },
      { label: 'Rule of 40', value: valuationMetricValue(valuationCore, 'rule_of_40') },
      { label: 'Base Case Support', value: valuationCore.topVerdict.baseCaseSupport },
      { label: 'Margin of Safety', value: valuationCore.topVerdict.marginOfSafety }
    ]
  },
  {
    title: 'Past Performance Trend',
    note: 'Recent growth and margin evidence are grouped here before judging whether the forward case is realistic.',
    metrics: [
      { label: 'Revenue Growth', value: valuationMetricValue(valuationCore, 'revenue_growth') },
      { label: 'Gross Margin', value: valuationMetricValue(valuationCore, 'gross_margin') },
      { label: 'Operating Margin', value: valuationMetricValue(valuationCore, 'operating_margin') },
      { label: 'FCF Margin', value: valuationMetricValue(valuationCore, 'fcf_margin') }
    ]
  },
  {
    title: 'Financial Health',
    note: valuationCore.researchJudgment[2] || 'Financial health needs balance-sheet, cash-flow, and dilution context.',
    metrics: [
      { label: 'Cash + Securities', value: valuationMetricValue(valuationCore, 'cash_securities') },
      { label: 'Convertible Notes', value: valuationMetricValue(valuationCore, 'convertible_debt') },
      { label: 'Debt / Equity', value: valuationMetricValue(valuationCore, 'debt_equity') },
      { label: 'SBC / Revenue', value: valuationMetricValue(valuationCore, 'sbc_revenue') }
    ]
  },
  {
    title: 'Peer / Historical Multiple Check',
    note: valuationCore.missingEvidence.includes('Current full consensus model')
      ? 'Peer and historical multiple context still needs the current consensus model.'
      : 'Use EV / revenue, EV / FCF, and peer or historical bands before upgrading valuation confidence.',
    metrics: [
      { label: 'EV / Revenue', value: valuationMetricValue(valuationCore, 'ev_revenue') },
      { label: 'EV / FCF', value: valuationMetricValue(valuationCore, 'ev_fcf') },
      { label: 'Business Quality', value: valuationCore.topVerdict.businessQuality },
      { label: 'Valuation Judgment', value: valuationCore.topVerdict.valuationState }
    ]
  }
]);

const clamp = (value, min = 8, max = 96) => Math.max(min, Math.min(max, value));

const buildSparklinePath = (values, width = 220, height = 74, pad = 8) => {
  if (!Array.isArray(values) || values.length < 2) return '';
  const nums = values.map(toNumeric).filter(value => value !== null);
  if (nums.length < 2) return '';
  const min = Math.min(...nums);
  const max = Math.max(...nums);
  const range = max - min || 1;
  return nums.map((value, index) => {
    const x = pad + (index / (nums.length - 1)) * (width - pad * 2);
    const y = height - pad - ((value - min) / range) * (height - pad * 2);
    return `${index === 0 ? 'M' : 'L'} ${x.toFixed(1)} ${y.toFixed(1)}`;
  }).join(' ');
};

const extractPriceSeries = (eventDetail) => {
  const candidates = [
    eventDetail.price_series,
    eventDetail.price_history,
    eventDetail.trend_setup?.price_series,
    eventDetail.trend_setup?.metrics?.price_series,
    eventDetail.trend_setup?.metrics?.close_series,
    eventDetail.momentum_evidence?.evidence?.price_series,
    eventDetail.momentum_evidence?.evidence?.close_series
  ];

  for (const candidate of candidates) {
    if (!Array.isArray(candidate)) continue;
    const values = candidate
      .map(point => typeof point === 'object' ? (point.close ?? point.price ?? point.value) : point)
      .map(toNumeric)
      .filter(value => value !== null);
    if (values.length >= 2) return values;
  }
  return [];
};

const buildRadarAxes = ({ momentum, metrics, valuationCore, eventDetail }) => {
  const rsSpy = toNumeric(metrics.relative_strength_vs_spy_63d);
  const latestClose = toNumeric(metrics.latest_close);
  const ma200 = toNumeric(metrics.ma200);
  const ma200Slope = toNumeric(metrics.ma200_slope_pct);
  const currentPostReturn = toNumeric(eventDetail.pead_signal?.reaction?.current_post_return);
  const momentumScore = toNumeric(momentum.score);

  const momentumTone = momentumScore === null ? 'neutral' : momentumScore >= 70 ? 'hot' : momentumScore >= 50 ? 'warm' : 'cool';
  const rsTone = rsSpy === null ? 'neutral' : rsSpy > 0 ? 'hot' : 'cool';
  const smaConstructive = latestClose !== null && ma200 !== null ? latestClose >= ma200 : ma200Slope !== null ? ma200Slope > 0 : null;
  const eventTone = currentPostReturn === null ? 'neutral' : currentPostReturn > 0 ? 'hot' : 'cool';
  const valueTone = valuationCore.status === 'available'
    ? valuationCore.topVerdict.valuationState.includes('Stretched') || valuationCore.topVerdict.valuationState.includes('Perfection') ? 'warm' : 'hot'
    : 'neutral';
  const valueScore = valuationCore.status === 'available'
    ? valuationCore.topVerdict.valuationState.includes('Perfection') ? 25
    : valuationCore.topVerdict.valuationState.includes('Stretched') ? 38
    : 62
    : 18;

  return [
    { label: 'Trend', value: momentumScore === null ? '—' : `${momentumScore}/100`, score: momentumScore ?? 18, tone: momentumTone },
    { label: 'Strength', value: rsSpy === null ? '—' : formatPct(rsSpy), score: rsSpy === null ? 18 : clamp(50 + rsSpy * 2.2), tone: rsTone },
    { label: 'Long Term', value: smaConstructive === null ? '—' : smaConstructive ? 'Above' : 'Below', score: smaConstructive === null ? 18 : smaConstructive ? 76 : 24, tone: smaConstructive === null ? 'neutral' : smaConstructive ? 'hot' : 'cool' },
    { label: 'Reaction', value: currentPostReturn === null ? '—' : formatPct(currentPostReturn), score: currentPostReturn === null ? 18 : clamp(50 + currentPostReturn * 3), tone: eventTone },
    { label: 'Valuation', value: valuationCore.status === 'available' ? valuationCore.topVerdict.valuationState : '—', score: valueScore, tone: valueTone }
  ];
};

const formatRank = (rank, count) => {
  const numericRank = toNumeric(rank);
  const numericCount = toNumeric(count);
  if (numericRank === null) return '—';
  return numericCount === null ? `#${numericRank}` : `#${numericRank} / ${numericCount}`;
};

const formatPercentile = (value, locale = 'en') => {
  const numeric = toNumeric(value);
  if (numeric === null) return '—';
  if (locale === 'zh') return `第 ${numeric.toFixed(0)} 百分位`;
  return `${numeric.toFixed(0)}th percentile`;
};

const formatZScore = (value) => {
  const numeric = toNumeric(value);
  if (numeric === null) return '—';
  return `Z ${numeric.toFixed(2)}`;
};

const formatUpperBandDays = (value) => {
  const numeric = toNumeric(value);
  if (numeric === null) return '—';
  return `${numeric.toFixed(0)} days`;
};

const metricTone = (value, positiveCutoff, warningCutoff = null) => {
  const numeric = toNumeric(value);
  if (numeric === null) return 'pending';
  if (warningCutoff !== null && numeric >= warningCutoff) return 'warning';
  return numeric >= positiveCutoff ? 'positive' : 'neutral';
};

const formatPerformanceReturn = (value) => {
  const numeric = toNumeric(value);
  if (numeric === null) return '—';
  return `${numeric > 0 ? '+' : ''}${numeric.toFixed(1)}%`;
};

const performanceTone = (value) => {
  const numeric = toNumeric(value);
  if (numeric === null) return 'pending';
  if (numeric > 0) return 'positive';
  if (numeric < 0) return 'negative';
  return 'neutral';
};

const formatTechnicalMoney = (value) => {
  const numeric = toNumeric(value);
  if (numeric === null) return '—';
  return `$${numeric.toFixed(2)}`;
};

const formatTechnicalVolume = (value) => {
  const numeric = toNumeric(value);
  if (numeric === null) return '—';
  if (numeric >= 1_000_000) return `${(numeric / 1_000_000).toFixed(1)}M`;
  if (numeric >= 1_000) return `${(numeric / 1_000).toFixed(0)}K`;
  return numeric.toLocaleString('en-US', { maximumFractionDigits: 0 });
};

const formatTechnicalRangePosition = (range) => {
  if (!range) return '—';
  const low = formatTechnicalMoney(range.low);
  const high = formatTechnicalMoney(range.high);
  const position = toNumeric(range.position);
  if (low === '—' || high === '—') return '—';
  return position === null ? `${low}-${high}` : `${low}-${high} / ${(position * 100).toFixed(0)}%`;
};

const technicalLabel = (value, locale = 'en') => {
  const normalized = String(value || '').trim().toLowerCase();
  const en = {
    up: 'Up',
    down: 'Down',
    flat: 'Flat',
    above: 'Above',
    below: 'Below',
    rising: 'Rising',
    falling: 'Falling',
    overbought: 'Extended',
    strong_trend: 'Strong trend',
    elevated: 'Elevated',
    liquid: 'Liquid',
    near_breakout_zone: 'Near breakout zone'
  };
  const zh = {
    up: '向上',
    down: '向下',
    flat: '橫行',
    above: '高於',
    below: '低於',
    rising: '上升',
    falling: '下降',
    overbought: '偏熱',
    strong_trend: '趨勢強',
    elevated: '偏高',
    liquid: '流動性足夠',
    near_breakout_zone: '接近突破區'
  };
  return (locale === 'zh' ? zh[normalized] : en[normalized]) || displayLabel(value, locale, value || '—');
};

const formatTechnicalTrendState = (cockpit, locale = 'en') => {
  if (!cockpit) return null;
  const longTrend = technicalLabel(cockpit.trend?.longTermTrend, locale);
  const shortTrend = technicalLabel(cockpit.trend?.shortTermTrend, locale);
  const rsiRead = cockpit.indicators?.rsiRead ? technicalLabel(cockpit.indicators.rsiRead, locale) : null;
  const trendText = locale === 'zh'
    ? `長線${longTrend} / 短線${shortTrend}`
    : `Long ${longTrend} / Short ${shortTrend}`;
  return rsiRead && rsiRead !== '—' ? `${trendText} / ${rsiRead}` : trendText;
};

const formatTechnicalZoneValue = (zone) => {
  if (!zone) return '—';
  if (Array.isArray(zone.area) && zone.area.length >= 2) {
    return `${formatTechnicalMoney(zone.area[0])}-${formatTechnicalMoney(zone.area[1])}`;
  }
  return formatTechnicalMoney(zone.price);
};

const formatTechnicalZoneNote = (zone, locale = 'en') => {
  if (!zone) return '—';
  const distance = toNumeric(zone.distancePct);
  const distanceText = distance === null ? '' : `${distance > 0 ? '+' : ''}${distance.toFixed(1)}%`;
  const read = locale === 'zh' ? zone.readZh : zone.readEn;
  return [distanceText, read].filter(Boolean).join(' · ') || '—';
};

const selectPrimaryTechnicalZone = (zones = []) => (
  zones.find((zone) => zone.role === 'breakout_zone')
  || zones.find((zone) => zone.role === 'short_term_support')
  || zones.find((zone) => zone.displayRole !== 'deep_context_only')
  || zones[0]
  || null
);

const formatTechnicalSmaValue = (row) => {
  if (!row) return '—';
  const distance = toNumeric(row.priceDistancePct);
  const distanceText = distance === null ? '—' : `${distance > 0 ? '+' : ''}${distance.toFixed(1)}%`;
  return `${formatTechnicalMoney(row.value)} / ${distanceText}`;
};

const technicalObservationTone = (severity) => {
  const normalized = String(severity || '').toLowerCase();
  if (normalized === 'positive') return 'positive';
  if (normalized === 'warning' || normalized === 'monitor') return 'warning';
  if (normalized === 'negative') return 'negative';
  return 'neutral';
};

const buildLiveStockPerformanceGrid = (ticker, fallbackGrid, stockPerformancePayload, copy) => {
  const row = findStockPerformanceRow(stockPerformancePayload, ticker);
  if (!row || typeof row !== 'object' || Array.isArray(row)) {
    return fallbackGrid || null;
  }

  const asOfDate = row.as_of_date || stockPerformancePayload?.meta?.as_of_date || null;
  const asOfLabel = asOfDate ? copy.asOfDate(asOfDate) : copy.returnFeedAvailable;

  return {
    source: asOfLabel,
    feedSource: 'dedicated',
    periods: copy.stockPerformancePeriods.map((period) => ({
      label: period.label,
      value: toNumeric(row[period.key]),
      note: asOfLabel
    }))
  };
};

const normalizeNotVerified = (value, locale = 'en') => {
  return safeFrontendText(value, locale, '—');
};

const ContextualFaq = ({ heading = 'Contextual FAQ', title, items }) => {
  if (!Array.isArray(items) || items.length === 0) return null;
  return (
    <div className="dossier-contextual-faq" aria-label={title}>
      <div className="dossier-contextual-faq__heading">
        <span>{heading}</span>
        <strong>{title}</strong>
      </div>
      <div className="dossier-contextual-faq__rows">
        {items.map((item) => (
          <details key={item.question}>
            <summary>{item.question}</summary>
            <p>{item.answer}</p>
          </details>
        ))}
      </div>
    </div>
  );
};

const DOSSIER_INTERNAL_TABS = [
  { id: 'overview', label: 'Overview' },
  { id: 'business-core', label: 'Business Core' },
  { id: 'market-evidence', label: 'Market Evidence' },
  { id: 'valuation', label: 'Valuation' },
  { id: 'thesis-risk', label: 'Thesis Risk' },
  { id: 'financial-health', label: 'Financial Health' }
];

const STOCK_DOSSIER_COPY = {
  en: {
    tabs: DOSSIER_INTERNAL_TABS,
    stockDossier: 'Stock Dossier',
    asOf: 'As of',
    curated: '',
    evidenceQualityPartial: '',
    contextualFaq: 'Contextual FAQ',
    faqOverviewTitle: (ticker) => `${ticker} overview questions`,
    faqBusinessCoreTitle: (ticker) => `${ticker} Business Core questions`,
    faqMarketEvidenceTitle: (ticker) => `${ticker} Market Evidence questions`,
    faqValuationTitle: (ticker) => `${ticker} Valuation questions`,
    faqThesisRiskTitle: (ticker) => `${ticker} Thesis Risk questions`,
    faqFinancialHealthTitle: (ticker) => `${ticker} Financial Health questions`,
    snapshot: 'Snapshot',
    whyNow: 'Why now',
    coreVerdict: 'Dossier core verdict',
    primaryRead: 'Primary read',
    context: 'Context',
    evidenceFocus: 'Evidence focus',
    researchPath: 'Research Path',
    researchPathHint: 'Read in this order',
    keyStatistics: 'Key Statistics',
    snapshotMetrics: 'Snapshot metrics',
    currentPrice: 'Current Price',
    latestMarketSnapshot: 'Latest market snapshot',
    marketCap: 'Market Cap',
    sharesAsOf: (date) => `Shares as of ${date}`,
    evRevenue: 'EV / Revenue',
    valuationMultiple: 'Valuation multiple',
    latestVerifiedPeriod: 'Latest verified period',
    fcfMargin: 'FCF Margin',
    cashFlowQuality: 'Cash-flow quality',
    relativeStrength: 'Relative Strength',
    percentile: 'Percentile',
    executiveHighlights: 'Executive Highlights',
    highlights: 'Highlights',
    businessEngineVerify: 'Business engine to verify first.',
    trendPrefix: 'Trend',
    eventSample: (count) => `Event sample N=${count}`,
    eventSamplePending: 'Not enough event history yet',
    marketEvidenceContextNote: 'Momentum and event evidence are supportive context, not proof of valuation.',
    marginOfSafety: (value) => `Margin of safety: ${value}`,
    valuationPressureHigh: 'Valuation pressure remains high.',
    breakTriggerMonitor: 'Break trigger monitor',
    durabilityEvidenceWeakens: 'Track whether business durability evidence weakens.',
    financialHealthGrowthFcf: (growth, fcfMargin) => `${growth} revenue growth / ${fcfMargin} FCF margin`,
    cashSecurities: (value) => `Cash + securities ${value}`,
    sbcRevenue: (value) => `SBC / Revenue ${value}`,
    stockPerformance: 'Stock Performance',
    stockPerformancePeriods: [
      { label: 'Today', key: 'today' },
      { label: '1 Week', key: 'one_week' },
      { label: '1 Month', key: 'one_month' },
      { label: '3 Months', key: 'three_month' },
      { label: '6 Months', key: 'six_month' },
      { label: '1 Year', key: 'one_year' }
    ],
    asOfDate: (date) => `as of ${date}`,
    returnFeedAvailable: 'Return feed available',
    returnPending: 'Returns unavailable',
    peerReadthrough: 'Peer Readthrough',
    peerReadthroughContext: 'Industry context',
    peerReadthroughSubtitle: (ticker) => `Use peer prints to decide whether ${ticker}'s move is sector-wide, demand-led, or company-specific.`,
    peerReadthroughSummary: 'Core lanes: software budget, observability demand, cloud workloads, and share shift.',
    strongPeerPrint: 'Strong peer print',
    weakPeerPrint: 'Weak peer print',
    ddogReadthroughGroups: [
      {
        title: 'Cloud software budget',
        signal: 'Budget pressure',
        peers: ['SNOW', 'MDB', 'CRM', 'WDAY'],
        primaryPeers: ['SNOW', 'CRM', 'WDAY'],
        read: 'Shows whether enterprise buyers are still expanding software and data-platform budgets.',
        strong: 'Strong usage, RPO, or guide supports DDOG demand durability.',
        weak: 'Weak guides point to budget pressure or delayed cloud expansion.'
      },
      {
        title: 'Observability / security demand',
        signal: 'Demand support',
        peers: ['DT', 'ESTC', 'CRWD', 'ZS'],
        primaryPeers: ['DT', 'ESTC'],
        read: 'Checks whether monitoring, security, and operational visibility demand is broad or company-specific.',
        strong: 'Strong peers support sector demand and platform expansion.',
        weak: 'Weak peers raise risk that demand is slowing, unless DDOG is clearly taking share.'
      },
      {
        title: 'Hyperscaler workload / cloud spend',
        signal: 'Cloud workload risk',
        peers: ['MSFT', 'AMZN', 'GOOGL', 'ORCL'],
        primaryPeers: ['MSFT', 'AMZN', 'GOOGL'],
        read: 'Cloud workload growth affects usage demand for monitoring and infrastructure tooling.',
        strong: 'Strong cloud growth supports DDOG usage volume and customer expansion.',
        weak: 'Cloud optimization or slower workload growth can pressure DDOG consumption.'
      },
      {
        title: 'Share shift / company-specific read',
        signal: 'Share gain check',
        peers: ['DT', 'ESTC'],
        primaryPeers: ['DT', 'ESTC'],
        read: 'Separates broad sector movement from DDOG-specific execution or share gain.',
        strong: 'DDOG strong while direct peers are weak may suggest share gain.',
        weak: 'DDOG weak with weak peers suggests sector pressure, not only company execution.'
      }
    ],
    peerEarningsContext: {
      title: 'Peer earnings context',
      signal: 'Sector context',
      read: 'Use peer earnings, guidance, and price reaction to judge whether the setup is company-specific or sector-wide.',
      strong: 'Strong peer evidence can support demand, sentiment, or valuation context.',
      weak: 'Weak peer evidence can flag sector pressure before the current company reports.'
    },
    signalScreens: 'Signal Screens / Evidence Tags',
    screenEvidence: 'Screen evidence, not a conclusion',
    marketEvidence: 'Market Evidence',
    evidenceOverview: 'Evidence overview',
    businessCore: 'Business Core',
    businessCoreQuestion: 'What creates company value?',
    businessCoreRead: 'Business Core Read',
    valueEngine: 'Value Engine',
    revenueEngine: 'Revenue engine',
    customerExpansion: 'Customer expansion',
    platformBreadth: 'Platform breadth',
    retentionDurability: 'Retention durability',
    operatingProof: 'Operating Proof',
    breakSignals: 'Break Signals',
    firstBreakSignal: 'First break signal',
    evidenceToMonitor: 'Evidence to monitor',
    measuredQuarters: 'Measured quarters',
    gapUpRate: 'Gap-up rate',
    postGap3: 'Post-gap 3D avg',
    postGap10: 'Post-gap 10D avg',
    postGap30: 'Post-gap 30D avg',
    pending: '—',
    notVerified: '—',
    valuation: 'Valuation',
    valuationPosture: 'Valuation posture',
    whatNeedTrue: 'What would need to be true?',
    evidenceChecklist: 'Evidence checklist',
    thesisRisk: 'Thesis Risk',
    thesisRiskQuestion: 'What could weaken the dossier read?',
    riskPosture: 'Risk posture',
    durabilityMonitor: 'Business durability monitor',
    reduceRisk: 'Evidence needed to reduce risk',
    watchSignals: 'Watch signals',
    financialHealth: 'Financial Health',
    financialHealthQuestion: 'Quality of growth and cash generation',
    qualityOfGrowth: 'Quality of growth',
    growthPlusFcf: 'Growth plus FCF, with SBC still monitored',
    financialHealthPending: 'Financial health needs cash flow, dilution, and balance-sheet context before the read is complete.',
    stockOverview: 'Stock Overview',
    finalRead: 'Final Read',
    atGlance: 'At a glance',
    priceTrend: 'Price Trend',
    recentTrend: 'Recent trend',
    researchMap: 'Research Map',
    researchMapBody: 'Quality, valuation, trend, and evidence',
    caseSummary: 'Case Summary',
    caseWorking: 'What has to keep working?',
    supportsCase: 'What supports the case',
    breaksCase: 'What can break the case',
    companyOverview: 'Company Overview',
    companyOverviewQuestion: 'Business, customers, and competitive position',
    howMoney: 'How it makes money',
    customerQuality: 'Customer quality',
    businessQuality: 'Business quality',
    peerCompetition: 'Peer competition',
    operatingNotes: 'Operating notes',
    operatingNotesBody: 'Business engine, cash-flow quality, and competitive position',
    valueCore: 'Value Core',
    humanReview: 'Human Review',
    valuationCore: 'Valuation Core',
    valuationCoreQuestion: 'Does the price still leave a medium-term research margin?',
    forwardValuationRange: 'Forward Valuation Range',
    forecastMultiple: 'Forecast metric x valuation multiple range',
    valuationMap: 'Valuation map',
    currentVsRange: 'Current price vs model range',
    range: 'Range',
    current: 'Current',
    median: 'Median',
    bull: 'Bull',
    bear: 'Bear',
    revenueGrowth: 'Revenue growth',
    appliedMultiple: 'Applied multiple',
    impliedEv: 'Implied EV',
    netCash: 'Net cash',
    equityValue: 'Equity value',
    upsideDownside: 'Upside / downside',
    researchJudgment: 'Research Judgment',
    missingEvidence: 'Missing Evidence',
    momentum: 'Momentum',
    structureExecution: 'Structure & Execution',
    unavailable: 'Unavailable',
    noTechnicalSetup: 'No technical setup context provided.',
    strengthRead: 'Strength read',
    executionMap: 'Execution map',
    latestPricePending: 'Latest price unavailable',
    latest: 'Latest',
    breakout: 'Breakout',
    target: 'Target',
    breakoutArea: 'Breakout Area',
    targetZone: 'Target Zone',
    potentialUpside: 'Potential Upside',
    holdZone: 'Hold Zone',
    supportArea: 'Support Area',
    invalidBelow: 'Invalid Below',
    eventStudyConnection: 'Event Study connection',
    loadingEarningsSummary: 'Loading earnings-event summary...',
    eventStudyDetail: 'Event Study Detail',
    openEventStudy: (ticker) => `View ${ticker} Event Study`,
    earningsSummary: 'Earnings summary',
    sampleNotIncluded: 'No usable sample',
    gapEvidencePending: 'Not enough earnings-reaction evidence yet.',
    scenarioRange: 'Scenario Range',
    scenarioQuestion: 'Bull / base / bear path: what must be true?',
    scenarioModelNote: 'References the Valuation Core forward model; valuation range and median return are model-derived, not formal targets.',
    impliedOutcome: 'Implied outcome',
    scenarioTrigger: 'Scenario trigger',
    thesisRiskMonitor: 'Thesis Risk Monitor',
    mediumTermRiskQuestion: 'What would weaken the medium-term dossier?',
    fundamentalTriggers: 'Fundamental risk triggers',
    marketTriggers: 'Price / market evidence triggers'
  },
  zh: {
    tabs: [
      { id: 'overview', label: '概覽' },
      { id: 'business-core', label: '業務核心' },
      { id: 'market-evidence', label: '市場證據' },
      { id: 'valuation', label: '估值' },
      { id: 'thesis-risk', label: '論點風險' },
      { id: 'financial-health', label: '財務健康' }
    ],
    stockDossier: '股票檔案',
    asOf: '截至',
    curated: '',
    evidenceQualityPartial: '',
    contextualFaq: '脈絡問答',
    faqOverviewTitle: (ticker) => `${ticker} 概覽問答`,
    faqBusinessCoreTitle: (ticker) => `${ticker} 業務核心問答`,
    faqMarketEvidenceTitle: (ticker) => `${ticker} 市場證據問答`,
    faqValuationTitle: (ticker) => `${ticker} 估值問答`,
    faqThesisRiskTitle: (ticker) => `${ticker} 論點風險問答`,
    faqFinancialHealthTitle: (ticker) => `${ticker} 財務健康問答`,
    snapshot: '快照',
    whyNow: '為何現在要看',
    coreVerdict: '檔案核心判斷',
    primaryRead: '主要判斷',
    context: '背景',
    evidenceFocus: '重點證據',
    researchPath: '研究路徑',
    researchPathHint: '建議閱讀次序',
    keyStatistics: '主要數據',
    snapshotMetrics: '快照指標',
    currentPrice: '現價',
    latestMarketSnapshot: '最新市場快照',
    marketCap: '市值',
    sharesAsOf: (date) => `股數截至 ${date}`,
    evRevenue: 'EV / 收入',
    valuationMultiple: '估值倍數',
    latestVerifiedPeriod: '最新已核實期間',
    fcfMargin: 'FCF 利潤率',
    cashFlowQuality: '現金流質素',
    relativeStrength: '相對強度',
    percentile: '百分位',
    executiveHighlights: '重點摘要',
    highlights: '摘要',
    businessEngineVerify: '先核實業務引擎。',
    trendPrefix: '趨勢',
    eventSample: (count) => `事件樣本 N=${count}`,
    eventSamplePending: '事件樣本暫時不足',
    marketEvidenceContextNote: '動能與事件資料只作輔助判斷，不是估值結論。',
    marginOfSafety: (value) => `安全邊際：${value}`,
    valuationPressureHigh: '估值壓力仍然高。',
    breakTriggerMonitor: '破局觸發點',
    durabilityEvidenceWeakens: '留意業務耐久度是否轉弱。',
    financialHealthGrowthFcf: (growth, fcfMargin) => `${growth} 收入增長 / ${fcfMargin} FCF 利潤率`,
    cashSecurities: (value) => `現金及證券 ${value}`,
    sbcRevenue: (value) => `SBC / 收入 ${value}`,
    stockPerformance: '股價表現',
    stockPerformancePeriods: [
      { label: '今日', key: 'today' },
      { label: '1 星期', key: 'one_week' },
      { label: '1 個月', key: 'one_month' },
      { label: '3 個月', key: 'three_month' },
      { label: '6 個月', key: 'six_month' },
      { label: '1 年', key: 'one_year' }
    ],
    asOfDate: (date) => `截至 ${date}`,
    returnFeedAvailable: '股價回報資料可用',
    returnPending: '暫無股價回報',
    peerReadthrough: '同業啟示',
    peerReadthroughContext: '行業脈絡',
    peerReadthroughSubtitle: (ticker) => `用同業業績判斷 ${ticker} 的股價反應是行業共振、需求帶動，還是公司自身因素。`,
    peerReadthroughSummary: '重點觀察：軟件預算、監控與可觀測性需求、雲端工作負載、份額變化。',
    strongPeerPrint: '同業業績強',
    weakPeerPrint: '同業業績弱',
    ddogReadthroughGroups: [
      {
        title: '雲端軟件預算',
        signal: '預算壓力',
        peers: ['SNOW', 'MDB', 'CRM', 'WDAY'],
        primaryPeers: ['SNOW', 'CRM', 'WDAY'],
        read: '觀察企業客戶是否仍在擴大軟件與數據平台預算。',
        strong: '用量、RPO 或指引強，代表 DDOG 需求仍有韌性。',
        weak: '指引轉弱，可能反映預算壓力或雲端擴張延後。'
      },
      {
        title: '可觀測性 / 安全需求',
        signal: '需求支持',
        peers: ['DT', 'ESTC', 'CRWD', 'ZS'],
        primaryPeers: ['DT', 'ESTC'],
        read: '判斷監控、安全與營運可視化需求，是整個行業轉強，還是 DDOG 自身表現。',
        strong: '同業強勁，代表行業需求和平台採用仍在擴張。',
        weak: '同業轉弱，會提高需求放慢風險；除非 DDOG 明顯提升市佔。'
      },
      {
        title: '雲端工作負載 / 雲支出',
        signal: '雲端工作負載風險',
        peers: ['MSFT', 'AMZN', 'GOOGL', 'ORCL'],
        primaryPeers: ['MSFT', 'AMZN', 'GOOGL'],
        read: '雲端工作負載增長，會影響監控和基建工具的使用需求。',
        strong: '雲端增長強，代表 DDOG 的使用量和客戶擴張仍有支持。',
        weak: '企業優化雲支出，或工作負載增長放慢，可能壓抑 DDOG 用量。'
      },
      {
        title: '市佔變化 / 公司自身判斷',
        signal: '市佔變化檢查',
        peers: ['DT', 'ESTC'],
        primaryPeers: ['DT', 'ESTC'],
        read: '分辨股價反應是行業因素，還是 DDOG 自己的營運表現和市佔提升。',
        strong: '直接同業弱而 DDOG 強，可能反映 DDOG 市佔提升。',
        weak: 'DDOG 弱、同業也弱，較可能是行業壓力，不只是公司執行問題。'
      }
    ],
    peerEarningsContext: {
      title: '同業業績脈絡',
      signal: '行業脈絡',
      read: '用同業業績、指引和股價反應，判斷這次股價反應是公司自身因素還是行業因素。',
      strong: '同業證據強，可支持需求、情緒或估值脈絡。',
      weak: '同業證據弱，可能在本公司公布前先提示行業壓力。'
    },
    signalScreens: '篩選線索 / 證據標籤',
    screenEvidence: '篩選證據，不是結論',
    marketEvidence: '市場證據',
    evidenceOverview: '證據概覽',
    businessCore: '業務核心',
    businessCoreQuestion: '公司靠甚麼創造價值？',
    businessCoreRead: '業務核心判斷',
    valueEngine: '價值引擎',
    revenueEngine: '收入引擎',
    customerExpansion: '客戶擴張',
    platformBreadth: '平台廣度',
    retentionDurability: '留存耐久度',
    operatingProof: '營運證據',
    breakSignals: '破局信號',
    firstBreakSignal: '第一破局信號',
    evidenceToMonitor: '需要監察的證據',
    measuredQuarters: '已核實季度',
    gapUpRate: '高開機率',
    postGap3: '高開後 3 日平均',
    postGap10: '高開後 10 日平均',
    postGap30: '高開後 30 日平均',
    pending: '—',
    notVerified: '—',
    valuation: '估值',
    valuationPosture: '估值狀態',
    whatNeedTrue: '需要哪些條件成立？',
    evidenceChecklist: '證據清單',
    thesisRisk: '論點風險',
    thesisRiskQuestion: '甚麼會削弱這份檔案的判斷？',
    riskPosture: '風險狀態',
    durabilityMonitor: '業務耐久度監察',
    reduceRisk: '降低風險需要的證據',
    watchSignals: '觀察信號',
    financialHealth: '財務健康',
    financialHealthQuestion: '增長質素與現金生成能力',
    qualityOfGrowth: '增長質素',
    growthPlusFcf: '增長加 FCF，同時監察 SBC',
    financialHealthPending: '需要現金流、攤薄與資產負債表資料，才能完整判斷財務健康。',
    stockOverview: '股票概覽',
    finalRead: '最終判斷',
    atGlance: '一眼概覽',
    priceTrend: '價格趨勢',
    recentTrend: '近期趨勢',
    researchMap: '研究地圖',
    researchMapBody: '質素、估值、趨勢與證據',
    caseSummary: '個案摘要',
    caseWorking: '哪些條件要繼續成立？',
    supportsCase: '支持個案的因素',
    breaksCase: '會破壞個案的因素',
    companyOverview: '公司概覽',
    companyOverviewQuestion: '業務、客戶與競爭位置',
    howMoney: '如何賺錢',
    customerQuality: '客戶質素',
    businessQuality: '業務質素',
    peerCompetition: '同業競爭',
    operatingNotes: '營運筆記',
    operatingNotesBody: '業務動力、現金流質素與競爭位置',
    valueCore: '價值核心',
    humanReview: '人手覆核',
    valuationCore: '估值核心',
    valuationCoreQuestion: '現價是否仍有中期研究空間？',
    forwardValuationRange: '前瞻估值區間',
    forecastMultiple: '預測指標 x 估值倍數區間',
    valuationMap: '估值地圖',
    currentVsRange: '現價相對模型區間',
    range: '區間',
    current: '現價',
    median: '中位數',
    bull: '樂觀',
    bear: '悲觀',
    revenueGrowth: '收入增長',
    appliedMultiple: '套用倍數',
    impliedEv: '隱含企業價值',
    netCash: '淨現金',
    equityValue: '股權價值',
    upsideDownside: '上行 / 下行',
    researchJudgment: '研究判斷',
    missingEvidence: '缺少證據',
    momentum: '動能',
    structureExecution: '技術結構',
    unavailable: '不可用',
    noTechnicalSetup: '暫無技術結構背景。',
    strengthRead: '強度判斷',
    executionMap: '走勢地圖',
    latestPricePending: '暫無最新價格',
    latest: '最新',
    breakout: '突破',
    target: '目標',
    breakoutArea: '突破區',
    targetZone: '目標區',
    potentialUpside: '潛在上行',
    holdZone: '守位區',
    supportArea: '支持區',
    invalidBelow: '跌穿失效',
    eventStudyConnection: '事件研究連結',
    loadingEarningsSummary: '正在載入財報事件摘要...',
    eventStudyDetail: '事件研究詳情',
    openEventStudy: (ticker) => `查看 ${ticker} 事件研究`,
    earningsSummary: '財報摘要',
    sampleNotIncluded: '暫無可用樣本',
    gapEvidencePending: '財報反應樣本暫時不足。',
    scenarioRange: '情境區間',
    scenarioQuestion: '樂觀 / 基準 / 悲觀路徑需要甚麼成立？',
    scenarioModelNote: '引用估值核心的前瞻模型；估值區間與中位回報屬模型推算，不是正式目標價。',
    impliedOutcome: '模型隱含結果',
    scenarioTrigger: '情境觸發條件',
    thesisRiskMonitor: '論點風險監察',
    mediumTermRiskQuestion: '甚麼會削弱中期判斷？',
    fundamentalTriggers: '基本面風險觸發點',
    marketTriggers: '價格 / 市場風險觸發點'
  }
};

const READTHROUGH_LABEL_OVERRIDES = {
  AMZN: 'Amazon',
  CRM: 'Salesforce',
  CRWD: 'CrowdStrike',
  DT: 'Dynatrace',
  ESTC: 'Elastic',
  GOOGL: 'Alphabet',
  MDB: 'MongoDB',
  MSFT: 'Microsoft',
  ORCL: 'Oracle',
  SNOW: 'Snowflake',
  WDAY: 'Workday',
  ZS: 'Zscaler'
};

const normalizeReadthroughTicker = (ticker) => String(ticker || '').trim().toUpperCase();

const buildPeerLookup = (ecosystem) => {
  const peers = [
    ...(ecosystem?.activeCoverage || []),
    ...(ecosystem?.referencePeers || []),
    ...(ecosystem?.candidateAdditions || [])
  ];
  return peers.reduce((lookup, peer) => {
    const key = normalizeReadthroughTicker(peer.ticker);
    if (key) lookup[key] = peer;
    return lookup;
  }, {});
};

const labelForReadthroughTicker = (ticker, peerLookup) => {
  const key = normalizeReadthroughTicker(ticker);
  return peerLookup[key]?.label || getStockDossierProfile(key)?.companyName || READTHROUGH_LABEL_OVERRIDES[key] || key;
};

const buildReadthroughGroups = (ecosystem, ticker, copy) => {
  const normalizedTicker = normalizeReadthroughTicker(ticker);
  const peerLookup = buildPeerLookup(ecosystem);
  if (normalizedTicker === 'DDOG') {
    return copy.ddogReadthroughGroups.map((group) => ({
      ...group,
      peers: group.peers.map((peerTicker) => ({
        ticker: peerTicker,
        label: labelForReadthroughTicker(peerTicker, peerLookup),
        isPrimary: (group.primaryPeers || []).includes(peerTicker)
      }))
    }));
  }

  const fallbackPeers = [
    ...(ecosystem?.activeCoverage || []),
    ...(ecosystem?.referencePeers || []),
    ...(ecosystem?.candidateAdditions || [])
  ].slice(0, 8).map((peer) => ({
    ticker: peer.ticker,
    label: peer.label
  }));

  if (!fallbackPeers.length) return [];
  return [
    {
      title: copy.peerEarningsContext.title,
      signal: copy.peerEarningsContext.signal,
      peers: fallbackPeers,
      read: copy.peerEarningsContext.read,
      strong: copy.peerEarningsContext.strong,
      weak: copy.peerEarningsContext.weak
    }
  ];
};

const ReadthroughGroup = ({ group, copy }) => {
  if (!group.peers.length) return null;
  return (
    <article className="dossier-readthrough-insight">
      <div className="dossier-readthrough-insight__head">
        <div>
          {group.signal && <em>{group.signal}</em>}
          <span>{group.title}</span>
        </div>
      </div>
      <p>{group.read}</p>
      <div className="dossier-readthrough-scenarios">
        <div>
          <strong>{copy.strongPeerPrint}</strong>
          <span>{group.strong}</span>
        </div>
        <div>
          <strong>{copy.weakPeerPrint}</strong>
          <span>{group.weak}</span>
        </div>
      </div>
      <div className="dossier-readthrough-peer-list" aria-label={`${group.title} peers`}>
        {group.peers.map((peer) => (
          <span key={`${group.title}-${peer.ticker}`} className={peer.isPrimary ? 'is-primary' : undefined}>
            <strong>{peer.ticker}</strong>
            <em>{peer.label}</em>
          </span>
        ))}
      </div>
    </article>
  );
};

const PeerEcosystemPanel = ({ ecosystem, ticker, copy, locale = 'en' }) => {
  if (!ecosystem) return null;
  const groups = buildReadthroughGroups(ecosystem, ticker, copy);
  if (!groups.length) return null;
  const ecosystemName = displayLabel(ecosystem.ecosystemName, locale, ecosystem.ecosystemName);

  return (
    <article className="dossier-cockpit-card dossier-cockpit-card--wide dossier-peer-ecosystem-panel">
      <div className="dossier-cockpit-card__heading">
        <span>{copy.peerReadthrough}</span>
        <em>{copy.peerReadthroughContext}</em>
      </div>
      <p className="dossier-peer-readthrough-subtitle">
        {copy.peerReadthroughSubtitle(ticker)}
      </p>
      <div className="dossier-readthrough-summary">
        <span>{ecosystemName}</span>
        <em>{copy.peerReadthroughSummary}</em>
      </div>
      <div className="dossier-readthrough-insight-grid">
        {groups.map((group) => (
          <ReadthroughGroup key={group.title} group={group} copy={copy} />
        ))}
      </div>
    </article>
  );
};

const PendingDossierPanel = ({ title, subtitle, rows, note }) => (
  <section className="dossier-tab-placeholder" aria-label={title}>
    <div className="dossier-tab-placeholder__head">
      <span>Research preview</span>
      <strong>{title}</strong>
      <p>{subtitle}</p>
    </div>
    <div className="dossier-tab-placeholder__grid">
      {rows.map((row) => (
        <div key={row.label}>
          <span>{row.label}</span>
          <strong>{row.value}</strong>
          {row.note && <em>{row.note}</em>}
        </div>
      ))}
    </div>
    <p className="dossier-tab-placeholder__note">{note}</p>
  </section>
);

const buildEventStudyDetail = (eventDetail, dossierProfile = null) => {
  return {
    hasBaseRate: false,
    title: dossierProfile?.eventStudyRead?.title || 'Historical post-event evidence is not yet complete.',
    interpretation: dossierProfile?.eventStudyRead?.interpretation || 'Use the event-study matrix as market evidence only; it does not replace valuation or company-level research.',
    setupLabel: 'Earnings summary',
    sampleSize: null,
    currentPostReturn: null,
    metrics: [],
    notes: []
  };
};

const StockDossierView = ({ eventDetail, payload, stockPerformancePayload, referencePeerMapPayload, onOpenEventStudy, locale = 'en' }) => {
  const copy = STOCK_DOSSIER_COPY[locale] || STOCK_DOSSIER_COPY.en;
  const tickerForSummary = canonicalizeTicker(eventDetail?.ticker);
  const [eventStudySummary, setEventStudySummary] = React.useState(null);
  const [eventStudyLoading, setEventStudyLoading] = React.useState(false);
  const [eventStudyError, setEventStudyError] = React.useState(null);
  const [activeInternalTab, setActiveInternalTab] = React.useState('overview');

  React.useEffect(() => {
    if (!tickerForSummary) {
      setEventStudySummary(null);
      setEventStudyError(null);
      setEventStudyLoading(false);
      return undefined;
    }

    const controller = new AbortController();
    setEventStudyLoading(true);
    setEventStudyError(null);

    (async () => {
      let lastError = null;
      for (const lookupTicker of getTickerLookupKeys(tickerForSummary)) {
        const response = await fetch(`${API_BASE}/event-study/earnings-gap-summary?symbol=${encodeURIComponent(lookupTicker)}`, {
          signal: controller.signal,
          headers: { Accept: 'application/json' }
        });
        const json = await response.json();
        if (response.ok) {
          setEventStudySummary({
            ...json,
            ticker: tickerForSummary,
            source_ticker: json?.ticker
          });
          return;
        }
        lastError = json?.error || json?.dossier_digest?.reason || `Event study summary failed (${response.status})`;
      }
      throw new Error(lastError || 'Event study summary unavailable');
    })()
      .catch((error) => {
        if (error.name === 'AbortError') return;
        setEventStudySummary(null);
        setEventStudyError(error.message);
      })
      .finally(() => {
        if (!controller.signal.aborted) {
          setEventStudyLoading(false);
        }
      });

    return () => controller.abort();
  }, [tickerForSummary]);

  React.useEffect(() => {
    setActiveInternalTab('overview');
  }, [tickerForSummary]);

  if (!eventDetail) return null;

  const dossierProfile = getStockDossierProfile(eventDetail.ticker);
  const enrichedEventDetail = dossierProfile ? {
    ...eventDetail,
    company_name: eventDetail.company_name || dossierProfile.companyName,
    exchange: eventDetail.exchange || dossierProfile.exchange,
    company_logo_url: dossierProfile.logoUrl || eventDetail.company_logo_url,
    business_summary: eventDetail.business_summary || dossierProfile.overview
  } : eventDetail;

  const dossierSummary = buildDossierSummary(enrichedEventDetail, payload);
  const localizedWhyNowReason = localizedValue(dossierProfile?.whyNow, 'reason', locale) || dossierSummary.reason;
  const localizedWhyNowVerdict = localizedValue(dossierProfile?.whyNow, 'verdict', locale) || dossierSummary.verdict;
  const localizedFinalRead = localizedValue(dossierProfile?.dossierVerdict, 'finalRead', locale);
  const renderedVerdict = renderStructuredVerdict(dossierProfile?.dossierVerdict, {
    reason: localizedWhyNowReason,
    verdict: localizedWhyNowVerdict
  }, locale);
  const killSwitch = buildResearchKillSwitch(enrichedEventDetail, payload);
  const priceTrendRisk = buildPriceTrendRisk(enrichedEventDetail, payload);
  const valuationCore = buildValuationCore(enrichedEventDetail, dossierProfile);
  const stockOverview = buildStockOverview(enrichedEventDetail, payload, dossierProfile);
  const marketSnapshot = buildLiveMarketSnapshot(dossierProfile?.marketSnapshot, enrichedEventDetail, payload, tickerForSummary, stockPerformancePayload);
  const liveCapitalization = resolveLiveCapitalization(stockPerformancePayload, tickerForSummary);
  const marketEvidence = dossierProfile?.marketEvidence || {
    title: 'Market evidence requires more context before it can support a research conclusion.',
    points: [
      'Use event reaction, trend quality, and valuation context together before treating the setup as actionable.',
      'Do not infer company quality or margin of safety from momentum alone.'
    ]
  };
  const marketEvidenceTitle = localizedValue(marketEvidence, 'title', locale) || marketEvidence.title;
  const eventStudyDetail = buildEventStudyDetail(enrichedEventDetail, dossierProfile);
  const visualPhaseOne = dossierProfile?.visualPhaseOne || null;

  const momentumRanking = findMomentumUniverseRow(payload, tickerForSummary);
  const technicalCockpit = resolveTechnicalCockpit(enrichedEventDetail, momentumRanking, payload);
  const valueCore = resolveValueCore({
    ...enrichedEventDetail,
    value_core: enrichedEventDetail.value_core || momentumRanking?.value_core || null
  }, dossierProfile);
  const momentum = enrichedEventDetail.momentum_evidence || momentumRanking?.momentum_evidence || {};
  const metrics = {
    ...(enrichedEventDetail.trend_setup?.metrics || {}),
    ...(momentum.evidence || {}),
    ...(momentumRanking?.trend_setup?.metrics || {})
  };
  const priceSeries = extractPriceSeries(enrichedEventDetail);
  const sparklinePath = buildSparklinePath(priceSeries);

  const isMomentumUniverse = enrichedEventDetail.status === 'momentum_universe' || enrichedEventDetail.event_phase === 'off_cycle_universe';

  // Ticker Header variables
  const ticker = tickerForSummary || enrichedEventDetail.ticker;
  const companyName = enrichedEventDetail.company_name || '';
  const exchange = enrichedEventDetail.exchange || enrichedEventDetail.market || '';
  const companyLogoUrl = dossierProfile?.logoUrl || enrichedEventDetail.company_logo_url || enrichedEventDetail.logo_url || '';
  const companyDisplayName = companyName || ticker;
  const tickerLine = exchange ? `${exchange}:${ticker} ${copy.stockDossier}` : `${ticker} ${copy.stockDossier}`;
  const compactTickerLine = exchange ? `${exchange}:${ticker}` : ticker;
  const industryTheme = stockOverview.theme || momentum.industry_theme_label || momentum.industry_theme || enrichedEventDetail.trend_setup?.supply_chain_stage || '';
  const researchState = isMomentumUniverse ? 'Momentum Candidate'
                      : (enrichedEventDetail.status === 'off_cycle_watch' || enrichedEventDetail.event_phase === 'off_cycle') ? 'Between Catalysts'
                      : enrichedEventDetail.event_phase === 'post_earnings' ? 'Post-Earnings Watch'
                      : enrichedEventDetail.peer_readthrough?.incoming?.length > 0 ? 'Peer-Led Context'
                      : 'Catalyst Watch';
  const researchStateDisplay = optionalFrontendText(researchState, locale);
  const valueCoreTypeDisplay = localizedValue(dossierProfile?.valueCore, 'value_core_type', locale) || localizedStaticLabel(valueCore.valueCoreType, locale);
  const companyStageDisplay = localizedValue(dossierProfile?.valueCore, 'company_stage_candidate', locale) || localizedStaticLabel(valueCore.companyStage, locale);
  const primaryValueDriverDisplay = localizedValue(dossierProfile?.valueCore, 'primary_value_driver', locale) || valueCore.primaryValueDriver;
  const thesisBreakTriggerDisplay = localizedValue(dossierProfile?.valueCore, 'thesis_break_trigger', locale) || valueCore.thesisBreakTrigger;
  const localizedValueCoreEvidence = localizedArray(dossierProfile?.valueCore, 'evidence_needed', locale);
  const valueCoreEvidenceItems = localizedValueCoreEvidence.length ? localizedValueCoreEvidence : valueCore.evidenceNeeded;
  const valuationTopVerdict = {
    businessQuality: localizedValue(valuationCore.topVerdict, 'businessQuality', locale) || localizedStaticLabel(valuationCore.topVerdict.businessQuality, locale),
    valuationState: localizedValue(valuationCore.topVerdict, 'valuationState', locale) || localizedStaticLabel(valuationCore.topVerdict.valuationState, locale),
    baseCaseSupport: localizedValue(valuationCore.topVerdict, 'baseCaseSupport', locale) || localizedStaticLabel(valuationCore.topVerdict.baseCaseSupport, locale),
    marginOfSafety: localizedValue(valuationCore.topVerdict, 'marginOfSafety', locale) || localizedStaticLabel(valuationCore.topVerdict.marginOfSafety, locale),
    overallRead: localizedValue(valuationCore.topVerdict, 'overallRead', locale) || valuationCore.topVerdict.overallRead,
    why: localizedValue(valuationCore.topVerdict, 'why', locale) || valuationCore.topVerdict.why
  };
  const valuationStateDisplay = valuationTopVerdict.valuationState;
  const marginOfSafetyDisplay = valuationTopVerdict.marginOfSafety;
  const stockOverviewProfileLine = localizedValue(dossierProfile, 'overview', locale) || stockOverview.profileLine;
  const quickFactsDisplay = stockOverview.quickFacts.map((fact) => ({
    ...fact,
    label: localizedValue(fact, 'label', locale) || localizedStaticLabel(fact.label, locale),
    value: localizedValue(fact, 'value', locale) || localizedStaticLabel(fact.value, locale)
  }));
  const largeCustomerFact = quickFactsDisplay.find((fact, index) => (
    stockOverview.quickFacts[index]?.label?.includes('$100k')
    || fact.label.includes('10 萬美元')
  )) || quickFactsDisplay.find((fact, index) => (
    stockOverview.quickFacts[index]?.label?.includes('Customer')
    || fact.label.includes('客戶')
  ));
  const netRetentionFact = quickFactsDisplay.find((fact, index) => (
    stockOverview.quickFacts[index]?.label?.includes('Net Retention')
    || fact.label.includes('淨留存')
  ));
  const localizedDossierSections = localizedItems(dossierProfile?.sections || [], locale, ['label', 'title', 'points']);
  const businessEngineSection = localizedDossierSections.find(section => section.id === 'business-engine') || localizedDossierSections[0];
  const competitivePositionSection = localizedDossierSections.find(section => section.id === 'competitive-position');
  const localizedMarketEvidencePoints = localizedArray(marketEvidence, 'points', locale);
  const marketEvidencePoints = localizedMarketEvidencePoints.length ? localizedMarketEvidencePoints : marketEvidence.points;
  const localizedResearchJudgment = localizedArray(valuationCore, 'researchJudgment', locale);
  const valuationResearchJudgment = localizedResearchJudgment.length ? localizedResearchJudgment : valuationCore.researchJudgment;
  const localizedMissingEvidence = localizedArray(valuationCore, 'missingEvidence', locale);
  const valuationMissingEvidence = localizedMissingEvidence.length ? localizedMissingEvidence : valuationCore.missingEvidence;
  const localizedKillData = localizedArray(valuationCore, 'killData', locale);
  const valuationKillData = localizedKillData.length ? localizedKillData : valuationCore.killData;
  const valuationScenarios = localizedItems(valuationCore.scenarios || [], locale, ['label', 'text', 'impliedOutcome', 'upsideDownside', 'threeYearIrr', 'trigger', 'mustBeTrue']);
  const snapshotRows = [
    { label: localizedStaticLabel('Business Quality', locale), value: safeFrontendText(valuationTopVerdict.businessQuality, locale, frontendEmptyText(locale)), tone: valuationCore.topVerdict.businessQuality === 'High' ? 'positive' : 'neutral' },
    { label: localizedStaticLabel('Valuation', locale), value: safeFrontendText(valuationTopVerdict.valuationState, locale, frontendEmptyText(locale, 'valuation')), tone: valuationCore.topVerdict.valuationState.includes('Missing') ? 'warning' : 'neutral' },
    { label: localizedStaticLabel('Base Case', locale), value: safeFrontendText(valuationTopVerdict.baseCaseSupport, locale, locale === 'zh' ? '仍需更多支持' : 'Needs more support'), tone: valuationCore.topVerdict.baseCaseSupport === 'Partial' ? 'warning' : 'neutral' },
    { label: localizedStaticLabel('Margin of Safety', locale), value: safeFrontendText(valuationTopVerdict.marginOfSafety, locale, frontendEmptyText(locale, 'valuation')), tone: valuationCore.topVerdict.marginOfSafety === 'None' ? 'warning' : 'neutral' }
  ];
  const radarAxes = buildRadarAxes({ momentum, metrics, valuationCore, eventDetail: enrichedEventDetail }).map((axis) => ({
    ...axis,
    label: localizedStaticLabel(axis.label, locale),
    value: localizedStaticLabel(axis.value, locale),
    detail: localizedStaticLabel(axis.detail, locale)
  }));
  const latestMomentumPrice = priceSeries.length
    ? priceSeries[priceSeries.length - 1]
    : resolveLatestTechnicalPrice(enrichedEventDetail, payload, tickerForSummary);
  const momentumScore = toNumeric(momentum.score ?? momentumRanking?.score);
  const zScore = toNumeric(metrics.zscore_200d);
  const upperBandDays = toNumeric(metrics.days_above_upper_band_60d);
  const momentumStrengthRead = momentumScore === null
    ? frontendEmptyText(locale, 'market')
    : momentumScore >= 70 && zScore !== null && zScore >= 2.5
      ? 'Strong trend, but extended'
      : momentumScore >= 70
        ? 'Strong trend'
        : momentumScore >= 50
          ? 'Constructive trend'
          : 'Trend needs confirmation';
  const momentumStrengthRows = [
    {
      label: localizedStaticLabel('Momentum Score', locale),
      value: momentumScore === null ? copy.pending : `${momentumScore}/100`,
      detail: momentum.regime ? formatLabel(momentum.regime, locale) : formatLabel(momentumRanking?.regime, locale),
      tone: metricTone(momentumScore, 70)
    },
    {
      label: localizedStaticLabel('Universe Rank', locale),
      value: formatRank(momentum.universe_rank ?? momentumRanking?.rank, momentum.universe_count ?? payload?.momentum_universe?.ranked_count),
      detail: localizedStaticLabel('Overall scan', locale),
      tone: metricTone(momentumScore, 70)
    },
    {
      label: localizedStaticLabel('Theme Rank', locale),
      value: formatRank(momentum.theme_rank ?? momentumRanking?.theme_rank),
      detail: displayLabel(momentum.industry_theme_label || momentumRanking?.industry_theme_label, locale, locale === 'zh' ? '主題' : 'Theme'),
      tone: toNumeric(momentum.theme_rank ?? momentumRanking?.theme_rank) === 1 ? 'positive' : 'neutral'
    },
    {
      label: copy.relativeStrength,
      value: formatPercentile(momentumRanking?.relative_strength_percentile, locale),
      detail: metrics.relative_strength_vs_spy_63d !== undefined ? `${formatPct(metrics.relative_strength_vs_spy_63d)} vs SPY 63D` : 'Percentile',
      tone: metricTone(momentumRanking?.relative_strength_percentile, 75)
    },
    {
      label: localizedStaticLabel('Trend Stack', locale),
      value: [
        metrics.price_vs_sma20_pct ?? momentumRanking?.price_vs_sma20_pct,
        metrics.price_vs_sma50_pct ?? momentumRanking?.price_vs_sma50_pct,
        metrics.price_vs_sma200_pct ?? momentumRanking?.price_vs_sma200_pct
      ].map((value) => formatPct(value)).join(' / '),
      detail: localizedStaticLabel('vs SMA20 / 50 / 200', locale),
      tone: 'positive'
    },
    {
      label: localizedStaticLabel('Crowding Risk', locale),
      value: `${formatZScore(zScore)} / ${formatUpperBandDays(upperBandDays)}`,
      detail: localizedStaticLabel('200D stretch / upper band', locale),
      tone: zScore !== null && zScore >= 2.5 ? 'warning' : 'neutral'
    }
  ];
  const valuationGate = valuationCore.topVerdict.marginOfSafety === 'None'
    ? localizedStaticLabel('No margin of safety', locale)
    : valuationTopVerdict.valuationState;
  const breakPoint = renderedVerdict.risks[0] || valuationKillData?.[0] || (locale === 'zh' ? '需要更新證據後，才可改變判斷。' : 'Needs updated evidence before conclusion changes.');
  const eventStudyCoverage = eventStudySummary?.coverage || null;
  const eventStudyDigest = eventStudySummary?.dossier_digest || null;
  const forwardGapUps = eventStudySummary?.forward_returns?.after_all_gap_ups || null;
  const measuredGapCount = eventStudyDigest?.measured_gap_count ?? eventStudyCoverage?.measured_gap_count ?? null;
  const valuationResearchGroups = buildValuationResearchGroups(valuationCore, marketSnapshot);
  const forwardValuationRange = buildForwardValuationRange(valuationCore, marketSnapshot);
  const forwardMethodRows = forwardValuationRange ? [
    [locale === 'zh' ? '估值方法' : 'Valuation method', forwardValuationRange.valuationMethod],
    [locale === 'zh' ? '目前指引' : 'Current guide', 'FY2026 Revenue Guide'],
    [locale === 'zh' ? '模型年期' : 'Model horizon', forwardValuationRange.forwardModelHorizon],
    [locale === 'zh' ? '預測指標' : 'Forecast metric', `FY2028 model ${forwardValuationRange.forecastMetric}`],
    [locale === 'zh' ? '倍數區間' : 'Multiple range', forwardValuationRange.multipleRange],
    [locale === 'zh' ? '信心度' : 'Confidence', forwardValuationRange.confidence],
    [locale === 'zh' ? '仍要觀察' : 'What to watch', forwardValuationRange.missingEvidence.join('; ')]
  ] : [];
  const forwardRangePrimary = forwardValuationRange ? [
    { label: locale === 'zh' ? '隱含價格區間' : 'Implied price range', value: forwardValuationRange.impliedPriceRange, tone: 'primary' },
    { label: locale === 'zh' ? '中位價格' : 'Median price', value: forwardValuationRange.medianPriceDisplay, tone: 'primary' },
    { label: locale === 'zh' ? '相對中位數上行 / 下行' : 'Upside / downside to median', value: forwardValuationRange.medianUpsideDownsideDisplay, tone: 'secondary' },
    { label: locale === 'zh' ? '至中位數 3 年 IRR' : '3Y IRR to median', value: forwardValuationRange.medianThreeYearIrrDisplay, tone: 'secondary' }
  ] : [];
  const forwardRangeInputs = forwardValuationRange ? [
    ['FY2026 Revenue Guide', forwardValuationRange.fy26RevenueGuide],
    [locale === 'zh' ? 'FY2028 模型收入區間' : 'FY2028 Model Revenue Range', forwardValuationRange.forecastMetricRange],
    [locale === 'zh' ? '估值倍數區間' : 'Valuation Multiple Range', forwardValuationRange.multipleRange],
    [locale === 'zh' ? '隱含 EV 區間' : 'Implied EV Range', forwardValuationRange.impliedEvRange],
    [locale === 'zh' ? '淨現金調整' : 'Net Cash Adjustment', formatBillionValue(forwardValuationRange.netCashAdjustment)],
    [locale === 'zh' ? '隱含股權價值區間' : 'Implied Equity Value Range', forwardValuationRange.impliedEquityValueRange],
    [locale === 'zh' ? '現價' : 'Current Price', marketSnapshotValue(marketSnapshot, 'currentPrice')],
    [locale === 'zh' ? '股數' : 'Share Count', forwardValuationRange.shareCountDisplay]
  ] : [];
  const forwardRangeVisual = forwardValuationRange ? (() => {
    const impliedPrices = forwardValuationRange.scenarios
      .map(scenario => Number(scenario.impliedPrice))
      .filter(Number.isFinite);
    const low = impliedPrices.length ? Math.min(...impliedPrices) : null;
    const high = impliedPrices.length ? Math.max(...impliedPrices) : null;
    return {
      low,
      high,
      current: forwardValuationRange.currentPrice,
      median: forwardValuationRange.medianPrice,
      currentPct: formatRangeMarkerPct(forwardValuationRange.currentPrice, low, high),
      medianPct: formatRangeMarkerPct(forwardValuationRange.medianPrice, low, high)
    };
  })() : null;
  const forwardScenarioCards = forwardValuationRange ? (() => {
    const prices = forwardValuationRange.scenarios
      .map(scenario => Number(scenario.impliedPrice))
      .filter(Number.isFinite);
    const low = prices.length ? Math.min(...prices) : null;
    const high = prices.length ? Math.max(...prices) : null;

    return forwardValuationRange.scenarios.map((scenario) => {
      const impliedPrice = Number(scenario.impliedPrice);
      const marker = low !== null && high !== null && high !== low && Number.isFinite(impliedPrice)
        ? `${Math.max(0, Math.min(100, ((impliedPrice - low) / (high - low)) * 100)).toFixed(1)}%`
        : '50%';
      return {
        ...scenario,
        tone: String(scenario.label || '').toLowerCase(),
        marker
      };
    });
  })() : [];
  const eventEvidenceVisuals = [
    {
      label: copy.gapUpRate,
      value: formatRatioReturn(eventStudyDigest?.gap_up_rate) || copy.pending,
      score: eventStudyDigest?.gap_up_rate !== undefined ? Math.max(0, Math.min(100, Number(eventStudyDigest.gap_up_rate) * 100)) : 0,
      tone: rateToneClass(eventStudyDigest?.gap_up_rate)
    },
    {
      label: locale === 'zh' ? 'R+3 平均' : 'R+3 avg',
      value: formatRatioReturn(forwardGapUps?.r_plus_3?.avg_return) || copy.pending,
      score: forwardGapUps?.r_plus_3?.avg_return !== undefined ? clamp(50 + Number(forwardGapUps.r_plus_3.avg_return) * 180, 0, 100) : 0,
      tone: returnToneClass(forwardGapUps?.r_plus_3?.avg_return)
    },
    {
      label: locale === 'zh' ? 'R+10 平均' : 'R+10 avg',
      value: formatRatioReturn(forwardGapUps?.r_plus_10?.avg_return) || copy.pending,
      score: forwardGapUps?.r_plus_10?.avg_return !== undefined ? clamp(50 + Number(forwardGapUps.r_plus_10.avg_return) * 180, 0, 100) : 0,
      tone: returnToneClass(forwardGapUps?.r_plus_10?.avg_return)
    },
    {
      label: locale === 'zh' ? 'R+30 平均' : 'R+30 avg',
      value: formatRatioReturn(forwardGapUps?.r_plus_30?.avg_return) || copy.pending,
      score: forwardGapUps?.r_plus_30?.avg_return !== undefined ? clamp(50 + Number(forwardGapUps.r_plus_30.avg_return) * 180, 0, 100) : 0,
      tone: returnToneClass(forwardGapUps?.r_plus_30?.avg_return)
    }
  ];
  const latestReactionRows = [
    {
      label: localizedStaticLabel('Latest reaction', locale),
      value: formatPct(enrichedEventDetail.pead_signal?.reaction?.t1_return),
      note: safeFrontendText(enrichedEventDetail.pead_signal?.direction, locale, frontendEmptyText(locale, 'market'))
    },
    {
      label: locale === 'zh' ? '事件後股價表現' : 'Post-event stock move',
      value: formatPct(enrichedEventDetail.pead_signal?.reaction?.current_post_return),
      note: localizedStaticLabel('Follow-through since the event', locale)
    },
    {
      label: locale === 'zh' ? '成交量 / 反應質素' : 'Volume / reaction quality',
      value: hasFrontendValue(enrichedEventDetail.pead_signal?.reaction_quality || enrichedEventDetail.pead_signal?.volume_quality)
        ? safeFrontendText(enrichedEventDetail.pead_signal?.reaction_quality || enrichedEventDetail.pead_signal?.volume_quality, locale)
        : '',
      note: locale === 'zh' ? '成交量可輔助判斷反應是否有承接。' : 'Volume helps test whether the reaction had follow-through support.'
    }
  ].filter((row) => hasFrontendValue(row.value));
  const coverageStatusDisplay = optionalFrontendText(valueCore.coverageStatus, locale);
  const evidenceQualityDisplay = optionalFrontendText(valueCore.evidenceQuality, locale);
  const frontendDossierLabel = optionalFrontendText(valueCore.frontendLabel, locale);
  const businessCoreRows = [
    { label: copy.businessCore, value: valueCoreTypeDisplay },
    { label: copy.customerExpansion, value: companyStageDisplay },
    { label: copy.revenueEngine, value: primaryValueDriverDisplay },
    { label: copy.firstBreakSignal, value: thesisBreakTriggerDisplay }
  ];
  const legacyValueCoreRows = [
    { label: copy.businessCore, value: valueCoreTypeDisplay },
    { label: copy.customerExpansion, value: companyStageDisplay },
    { label: copy.revenueEngine, value: primaryValueDriverDisplay },
    { label: copy.firstBreakSignal, value: thesisBreakTriggerDisplay }
  ];
  const performanceGrid = buildLiveStockPerformanceGrid(tickerForSummary, visualPhaseOne?.performanceGrid, stockPerformancePayload, copy);
  const peerEcosystem = resolveReferencePeerEcosystemSnapshot(referencePeerMapPayload, tickerForSummary);
  const remainingTabsModel = resolveStockDossierContractModel({
    ticker: tickerForSummary,
    locale,
    stockPerformancePayload,
    technicalCockpit,
    marketSnapshot
  });
  const performanceRows = performanceGrid?.periods || [];
  const stockPerformanceFeedSource = performanceGrid?.feedSource === 'dedicated'
    ? 'dedicated'
    : 'fallback';
  const signalScreens = (visualPhaseOne?.signalScreens || []).map((signal) => ({
    ...signal,
    title: localizedValue(signal, 'title', locale) || signal.title,
    explanation: localizedValue(signal, 'explanation', locale) || signal.explanation,
    evidenceState: optionalFrontendText(localizedValue(signal, 'evidenceState', locale) || signal.evidenceState, locale)
  }));
  const overviewFaq = localizedFaqItems(visualPhaseOne?.faq?.overview, locale);
  const businessCoreFaq = localizedFaqItems(visualPhaseOne?.faq?.businessCore, locale);
  const marketEvidenceFaq = localizedFaqItems(visualPhaseOne?.faq?.marketEvidence, locale);
  const valuationFaq = localizedFaqItems(visualPhaseOne?.faq?.valuation, locale);
  const thesisRiskFaq = localizedFaqItems(visualPhaseOne?.faq?.thesisRisk, locale);
  const financialHealthFaq = localizedFaqItems(visualPhaseOne?.faq?.financialHealth, locale);
  const phaseTwo = visualPhaseOne?.phaseTwo || {};
  const coreSectionLabel = visualPhaseOne ? copy.businessCore : copy.valueCore;
  const coreSectionHeading = visualPhaseOne
    ? copy.businessCoreQuestion
    : (locale === 'zh' ? '公司靠甚麼創造價值？' : 'What drives company value?');
  const coreSectionRows = visualPhaseOne ? businessCoreRows : legacyValueCoreRows;
  const marketEvidenceCards = visualPhaseOne ? [
    {
      label: locale === 'zh' ? '趨勢 / 動能' : 'Trend / momentum',
      value: technicalCockpit ? formatTechnicalTrendState(technicalCockpit, locale) : momentumScore === null ? frontendEmptyText(locale, 'market') : `${momentumScore}/100`,
      note: technicalCockpit?.snapshot?.range52w ? `${locale === 'zh' ? '52 週區間' : '52W range'} ${formatTechnicalRangePosition(technicalCockpit.snapshot.range52w)}` : localizedStaticLabel(momentumStrengthRead, locale),
      tone: technicalCockpit ? 'positive' : metricTone(momentumScore, 70)
    },
    {
      label: locale === 'zh' ? '財報後反應' : 'Post-earnings reaction',
      value: hasFrontendValue(formatPct(enrichedEventDetail.pead_signal?.reaction?.current_post_return))
        ? formatPct(enrichedEventDetail.pead_signal?.reaction?.current_post_return)
        : frontendEmptyText(locale, 'market'),
      note: locale === 'zh' ? '後續反應證據' : 'Follow-through evidence',
      tone: metricTone(enrichedEventDetail.pead_signal?.reaction?.current_post_return, 0)
    },
    {
      label: locale === 'zh' ? '相對強度' : 'Relative strength',
      value: technicalCockpit?.performance?.relativeStrengthPercentile !== null && technicalCockpit?.performance?.relativeStrengthPercentile !== undefined
        ? formatPercentile(technicalCockpit.performance.relativeStrengthPercentile, locale)
        : momentumRanking?.relative_strength_percentile !== undefined ? formatPercentile(momentumRanking.relative_strength_percentile, locale) : frontendEmptyText(locale, 'market'),
      note: technicalCockpit?.performance?.vsSpy63d !== null && technicalCockpit?.performance?.vsSpy63d !== undefined
        ? `${formatPct(technicalCockpit.performance.vsSpy63d)} vs SPY 63D`
        : metrics.relative_strength_vs_spy_63d !== undefined ? `${formatPct(metrics.relative_strength_vs_spy_63d)} vs SPY 63D` : frontendEmptyText(locale, 'market'),
      tone: metricTone(technicalCockpit?.performance?.relativeStrengthPercentile ?? momentumRanking?.relative_strength_percentile, 75)
    },
    {
      label: locale === 'zh' ? '研究整理日期' : 'Research date',
      value: dossierProfile?.analysisDate || '—',
      note: formatFiscalPeriodLabel(dossierProfile?.latestFiscalPeriod, locale) || frontendEmptyText(locale),
      tone: 'neutral'
    }
  ] : [];
  const truthLayerMetrics = eventStudyDigest ? [
    { label: 'Gap-up Rate', value: formatRatioReturn(eventStudyDigest.gap_up_rate) || '—', tone: rateToneClass(eventStudyDigest.gap_up_rate) },
    { label: 'Avg Gap Up', value: formatRatioReturn(eventStudyDigest.average_gap_up) || '—', tone: returnToneClass(eventStudyDigest.average_gap_up) },
    { label: 'Avg Gap Down', value: formatRatioReturn(eventStudyDigest.average_gap_down) || '—', tone: returnToneClass(eventStudyDigest.average_gap_down) },
    { label: 'Measured Gaps', value: measuredGapCount !== null ? `N=${measuredGapCount}` : '—', tone: 'neutral' }
  ].filter((metric) => hasFrontendValue(metric.value)) : [];

  if (visualPhaseOne) {
    const valuationTab = phaseTwo.valuation || {};
    const valuationPosture = remainingTabsModel?.valuation?.posture || (valuationTab.posture ? {
      ...valuationTab.posture,
      title: localizedValue(valuationTab.posture, 'title', locale) || valuationTab.posture.title,
      label: localizedValue(valuationTab.posture, 'label', locale) || valuationTab.posture.label,
      note: localizedValue(valuationTab.posture, 'note', locale) || valuationTab.posture.note
    } : null);
    const valuationMetricCards = remainingTabsModel?.valuation?.metricCards || localizedItems(valuationTab.metricCards || [
      { label: 'Business Quality', value: valuationTopVerdict.businessQuality, note: 'Current research view' },
      { label: 'Valuation', value: valuationTopVerdict.valuationState, note: 'Valuation state' },
      { label: 'Base Case', value: valuationTopVerdict.baseCaseSupport, note: 'Research support' },
      { label: 'Margin of Safety', value: valuationTopVerdict.marginOfSafety, note: 'Risk cushion' }
    ], locale, ['label', 'value', 'note']).map((card) => ({
      ...card,
      value: safeFrontendText(card.value, locale, frontendEmptyText(locale, 'valuation')),
      note: optionalFrontendText(card.note, locale)
    }));
    const isPeerMapVerified = peerEcosystem?.source === 'live_reference_peer_map';
    const valuationTensionCards = remainingTabsModel?.valuation?.tensionCards || localizedItems((valuationTab.tensionCards || [
      { title: 'Growth vs multiple', state: 'Valuation pressure', text: valuationTopVerdict.why },
      { title: 'Evidence to watch', state: 'Research checklist', text: valuationMissingEvidence.join('; ') || frontendEmptyText(locale, 'valuation') }
    ]).map((card) => {
      if (String(card.title || '').toLowerCase().includes('peer')) {
        return {
          ...card,
          state: isPeerMapVerified ? 'Live reference context' : 'Research context',
          text: isPeerMapVerified
            ? (locale === 'zh' ? '同業參考資料已成功載入，可用作估值脈絡參考。' : 'Reference peer ecosystem context loaded successfully from reference peer map feed.')
            : card.text
        };
      }
      return card;
    }), locale, ['title', 'state', 'text']).map((card) => ({
      ...card,
      state: safeFrontendText(card.state, locale, frontendEmptyText(locale, 'valuation')),
      text: safeFrontendText(card.text, locale, frontendEmptyText(locale, 'valuation'))
    }));
    const localizedValuationChecklist = localizedArray(valuationTab, 'checklist', locale);
    const valuationChecklist = remainingTabsModel?.valuation?.checklist || (localizedValuationChecklist.length ? localizedValuationChecklist : (valuationTab.checklist || valuationResearchJudgment));
    const thesisRiskTab = phaseTwo.thesisRisk || {};
    const thesisRiskLead = remainingTabsModel?.thesisRisk?.lead || localizedValue(thesisRiskTab, 'lead', locale) || thesisRiskTab.lead || thesisBreakTriggerDisplay;
    const thesisRiskMap = remainingTabsModel?.thesisRisk?.riskMap || localizedItems(thesisRiskTab.riskMap || (renderedVerdict.risks.length ? renderedVerdict.risks : [
      locale === 'zh' ? '正式發布完整風險頁前，需要先整理觸發門檻。' : 'Risk monitor needs curated trigger thresholds before full tab release.'
    ]).slice(0, 4).map((risk, index) => ({
      label: `Risk ${index + 1}`,
      severity: index === 0 ? 'High' : 'Medium',
      watch: risk
    })), locale, ['label', 'severity', 'watch']);
    const localizedThesisRiskEvidence = localizedArray(thesisRiskTab, 'evidenceNeeded', locale);
    const thesisRiskEvidence = remainingTabsModel?.thesisRisk?.evidenceNeeded || (localizedThesisRiskEvidence.length
      ? localizedThesisRiskEvidence
      : (thesisRiskTab.evidenceNeeded || valueCoreEvidenceItems));
    const financialHealthMetrics = valuationResearchGroups
      .find(group => group.title === 'Financial Health')?.metrics || [];
    const financialHealthTab = phaseTwo.financialHealth || {};
    const financialHealthQualityRead = remainingTabsModel?.financialHealth?.qualityRead || localizedValue(financialHealthTab, 'qualityRead', locale) || financialHealthTab.qualityRead || copy.financialHealthPending;
    const financialHealthMetricCards = remainingTabsModel?.financialHealth?.metricCards || localizedItems(financialHealthTab.metricCards || (financialHealthMetrics.length ? financialHealthMetrics : [
      { label: 'Cash + Securities', value: frontendEmptyText(locale, 'financial') },
      { label: 'Debt / Equity', value: frontendEmptyText(locale, 'financial') },
      { label: 'FCF Margin', value: frontendEmptyText(locale, 'financial') },
      { label: 'SBC / Revenue', value: frontendEmptyText(locale, 'financial') }
    ]), locale, ['label', 'value', 'note']).map((metric) => ({
      label: metric.label,
      value: safeFrontendText(metric.value, locale, frontendEmptyText(locale, 'financial')),
      note: optionalFrontendText(metric.note, locale) || (locale === 'zh' ? '用來檢查增長質素' : 'Used to check growth quality')
    }));
    const financialQualityCards = remainingTabsModel?.financialHealth?.qualityCards || localizedItems(financialHealthTab.qualityCards || [
      { title: 'Quality of growth', state: 'Growth quality', text: financialHealthQualityRead || 'Growth quality needs cash-flow and dilution context.' }
    ], locale, ['title', 'state', 'text']).map((card) => ({
      ...card,
      state: safeFrontendText(card.state, locale, frontendEmptyText(locale, 'financial')),
      text: safeFrontendText(card.text, locale, frontendEmptyText(locale, 'financial'))
    }));
    const currentPostReturnValue = toNumeric(enrichedEventDetail.pead_signal?.reaction?.current_post_return);
    const t1ReturnValue = toNumeric(enrichedEventDetail.pead_signal?.reaction?.t1_return);
    const gapUpRateValue = toNumeric(eventStudyDigest?.gap_up_rate);
    const postEventDirection = currentPostReturnValue === null
      ? frontendEmptyText(locale, 'market')
      : currentPostReturnValue > 0
        ? (locale === 'zh' ? '事件後仍有承接' : 'Post-event follow-through is positive')
        : currentPostReturnValue < 0
          ? (locale === 'zh' ? '事件後股價回吐' : 'Post-event move has faded')
          : (locale === 'zh' ? '事件後走勢暫時中性' : 'Post-event move is neutral');
    const firstReactionRead = t1ReturnValue === null
      ? frontendEmptyText(locale, 'market')
      : t1ReturnValue > 0
        ? (locale === 'zh' ? '首日反應偏正面' : 'First reaction was constructive')
        : t1ReturnValue < 0
          ? (locale === 'zh' ? '首日反應偏負面' : 'First reaction was negative')
          : (locale === 'zh' ? '首日反應平淡' : 'First reaction was muted');
    const marketNarrativeCards = [
      {
        label: locale === 'zh' ? '市場先怎樣投票？' : 'How did the market vote first?',
        value: firstReactionRead,
        note: t1ReturnValue === null
          ? (locale === 'zh' ? '要等已核實反應日價格，才判斷首日方向。' : 'Use verified reaction-day prices before drawing a first-reaction direction.')
          : `${formatPct(t1ReturnValue)} ${locale === 'zh' ? '首日反應' : 'first reaction'}`,
        tone: t1ReturnValue !== null && t1ReturnValue > 0 ? 'positive' : t1ReturnValue !== null && t1ReturnValue < 0 ? 'warning' : 'neutral'
      },
      {
        label: locale === 'zh' ? '反應是否延續？' : 'Did the reaction persist?',
        value: postEventDirection,
        note: currentPostReturnValue === null
          ? (locale === 'zh' ? '沒有足夠後續價格資料時，不應硬判斷延續或回吐。' : 'Without enough follow-through prices, do not force a continuation or fade read.')
          : `${formatPct(currentPostReturnValue)} ${locale === 'zh' ? '事件後股價表現' : 'post-event move'}`,
        tone: currentPostReturnValue !== null && currentPostReturnValue > 0 ? 'positive' : currentPostReturnValue !== null && currentPostReturnValue < 0 ? 'warning' : 'neutral'
      },
      {
        label: locale === 'zh' ? '歷史樣本支持嗎？' : 'Does history support it?',
        value: measuredGapCount !== null ? copy.eventSample(measuredGapCount) : copy.eventSamplePending,
        note: gapUpRateValue === null ? frontendEmptyText(locale, 'market') : `${copy.gapUpRate}: ${formatRatioReturn(gapUpRateValue)}`,
        tone: gapUpRateValue !== null && gapUpRateValue >= 0.55 ? 'positive' : gapUpRateValue !== null && gapUpRateValue <= 0.45 ? 'warning' : 'neutral'
      }
    ];
    const valuationDepthCards = remainingTabsModel?.valuation?.depthCards || [
      {
        label: locale === 'zh' ? '市場已定價甚麼？' : 'What is priced in?',
        value: valuationTopVerdict.valuationState,
        note: valuationTopVerdict.why,
        tone: valuationTopVerdict.valuationState.includes('Perfection') || valuationTopVerdict.valuationState.includes('Stretched') ? 'warning' : 'neutral'
      },
      {
        label: locale === 'zh' ? '增長要求' : 'Growth requirement',
        value: valuationMetricValue(valuationCore, 'revenue_growth'),
        note: locale === 'zh'
          ? '估值能否成立，取決於收入增長是否能長期維持。'
          : 'The valuation only works if revenue growth can stay durable.',
        tone: 'neutral'
      },
      {
        label: locale === 'zh' ? '利潤率要求' : 'Margin requirement',
        value: valuationMetricValue(valuationCore, 'fcf_margin'),
        note: locale === 'zh'
          ? '高倍數需要現金流質素配合，否則估值承托會變弱。'
          : 'A premium multiple needs cash-flow quality, otherwise valuation support weakens.',
        tone: 'neutral'
      }
    ];
    const valuationWatchCards = remainingTabsModel?.valuation?.watchCards || [
      {
        label: locale === 'zh' ? '安全邊際' : 'Margin of safety',
        value: marginOfSafetyDisplay,
        note: locale === 'zh'
          ? '如果安全邊際不足，研究重點應轉向「公司能否交出市場要求」。'
          : 'If the cushion is thin, the key question becomes whether the company can meet market expectations.'
      },
      {
        label: locale === 'zh' ? '估值補充證據' : 'Evidence to add',
        value: valuationMissingEvidence.slice(0, 2).join(' / ') || frontendEmptyText(locale, 'valuation'),
        note: locale === 'zh'
          ? '需要用最新共識、倍數和股本資料更新判斷。'
          : 'Refresh the read with current consensus, multiples, and share-count evidence.'
      }
    ];
    const thesisAssumptionCards = remainingTabsModel?.thesisRisk?.assumptionCards || [
      {
        label: locale === 'zh' ? '核心假設' : 'Core assumption',
        value: primaryValueDriverDisplay,
        note: locale === 'zh'
          ? '論點成立，首先要證明這個業務引擎沒有轉弱。'
          : 'The thesis first has to prove this business engine is not weakening.',
        tone: 'positive'
      },
      {
        label: locale === 'zh' ? '第一破局點' : 'First break point',
        value: thesisBreakTriggerDisplay,
        note: locale === 'zh'
          ? '這是最早要觸發重新審視的位置。'
          : 'This is the first place to revisit the dossier read.',
        tone: 'warning'
      },
      {
        label: locale === 'zh' ? '價格警號' : 'Market warning',
        value: priceTrendRisk[0] || frontendEmptyText(locale, 'market'),
        note: locale === 'zh'
          ? '基本面未變之前，價格和相對強度會先反映市場懷疑。'
          : 'Before fundamentals change, price and relative strength often show doubt first.',
        tone: 'warning'
      }
    ];
    const thesisEvidenceCards = remainingTabsModel?.thesisRisk?.evidenceCards || [
      {
        label: locale === 'zh' ? '要繼續成立' : 'Needs to keep working',
        value: renderedVerdict.support[0] || primaryValueDriverDisplay,
        note: locale === 'zh'
          ? '支持因素要持續，不是只在單一季度出現。'
          : 'Support has to persist beyond one quarter.'
      },
      {
        label: locale === 'zh' ? '要降低風險' : 'To reduce risk',
        value: thesisRiskEvidence[0] || frontendEmptyText(locale),
        note: locale === 'zh'
          ? '下一次更新要優先補這些證據。'
          : 'These are the first evidence items to refresh next.'
      }
    ];
    const financialDepthCards = remainingTabsModel?.financialHealth?.depthCards || [
      {
        label: locale === 'zh' ? '增長質素' : 'Growth quality',
        value: valuationMetricValue(valuationCore, 'revenue_growth'),
        note: locale === 'zh'
          ? '收入增長是質素的入口，但需要現金流和攤薄一齊看。'
          : 'Revenue growth is the entry point, but it needs cash flow and dilution context.',
        tone: 'positive'
      },
      {
        label: locale === 'zh' ? '現金流轉化' : 'Cash conversion',
        value: valuationMetricValue(valuationCore, 'fcf_margin'),
        note: copy.cashFlowQuality,
        tone: 'positive'
      },
      {
        label: locale === 'zh' ? '股東攤薄' : 'Shareholder dilution',
        value: valuationMetricValue(valuationCore, 'sbc_revenue'),
        note: locale === 'zh'
          ? 'SBC 佔收入太高，會削弱高增長對股東的價值。'
          : 'High SBC can weaken how much growth accrues to shareholders.',
        tone: 'warning'
      },
      {
        label: locale === 'zh' ? '資產負債表' : 'Balance sheet',
        value: valuationMetricValue(valuationCore, 'cash_securities'),
        note: locale === 'zh'
          ? '現金和負債決定公司穿越周期的彈性。'
          : 'Cash and leverage define the company’s flexibility through a cycle.',
        tone: 'neutral'
      }
    ];
    const financialWatchCards = remainingTabsModel?.financialHealth?.watchCards || [
      {
        label: locale === 'zh' ? '質素結論' : 'Quality read',
        value: financialHealthQualityRead,
        note: locale === 'zh'
          ? '財務健康不是只看增長，而是看增長是否能轉成現金和股東價值。'
          : 'Financial health is not just growth; it is whether growth converts into cash and shareholder value.'
      },
      {
        label: locale === 'zh' ? '下一步要看' : 'Next evidence to check',
        value: financialHealthMetricCards.map((card) => card.label).slice(0, 3).join(' / '),
        note: locale === 'zh'
          ? '優先更新現金、SBC、FCF 和收入質素。'
          : 'Prioritize cash, SBC, FCF, and revenue-quality updates.'
      }
    ];
    const technicalSetup = enrichedEventDetail.trend_setup?.technical_setup || {};
    const hasLegacyTechnicalSetup = technicalSetup.status && technicalSetup.status !== 'unavailable';
    const hasTechnicalSetup = Boolean(technicalCockpit) || hasLegacyTechnicalSetup;
    const primaryTechnicalZone = selectPrimaryTechnicalZone(technicalCockpit?.supportResistance?.zones || []);
    const technicalTrendState = formatTechnicalTrendState(technicalCockpit, locale);
    const firstTechnicalObservation = technicalCockpit?.observations?.[0];
    const technicalSetupLabel = technicalTrendState
      || (locale === 'zh' ? technicalSetup.status_label_zh : technicalSetup.status_label_en)
      || technicalSetup.status_label_en
      || technicalSetup.status_label_zh
      || (hasTechnicalSetup
        ? (locale === 'zh' ? '技術結構可用' : 'Technical setup available')
        : (locale === 'zh' ? '價格結構需要補充圖表背景' : 'Price structure needs chart context'));
    const technicalSetupSentence = (locale === 'zh' ? firstTechnicalObservation?.textZh : firstTechnicalObservation?.textEn)
      || (locale === 'zh' ? technicalSetup.setup_sentence_zh : technicalSetup.setup_sentence_en)
      || technicalSetup.setup_sentence_en
      || technicalSetup.setup_sentence_zh
      || (locale === 'zh'
        ? '先看趨勢、相對強度和財報後反應是否同方向，再決定市場證據是否支持繼續研究。'
        : 'Read trend, relative strength, and post-earnings reaction together before treating market evidence as supportive.');
    const legacyTechnicalBreakout = formatTechnicalZone(technicalSetup.breakout_area);
    const legacyTechnicalTarget = formatTechnicalZone(technicalSetup.target_zone);
    const legacyTechnicalHold = formatTechnicalZone(technicalSetup.hold_zone);
    const legacyTechnicalSupport = shouldShowTechnicalSupport(technicalSetup) ? formatTechnicalZone(technicalSetup.support_area) : null;
    const legacyTechnicalInvalid = !shouldShowTechnicalSupport(technicalSetup) ? formatTechnicalPrice(technicalSetup.invalid_below) : null;
    const technicalLevels = technicalCockpit
      ? (technicalCockpit.supportResistance?.zones || []).slice(0, 4).map((zone) => ({
        label: (locale === 'zh' ? zone.labelZh : zone.labelEn) || zone.role,
        value: formatTechnicalZoneValue(zone),
        note: formatTechnicalZoneNote(zone, locale)
      })).filter((row) => hasFrontendValue(row.value))
      : [
        { label: locale === 'zh' ? '突破區' : 'Breakout area', value: legacyTechnicalBreakout },
        { label: locale === 'zh' ? '目標區' : 'Target zone', value: legacyTechnicalTarget },
        { label: locale === 'zh' ? '守位區' : 'Hold zone', value: legacyTechnicalHold },
        { label: locale === 'zh' ? '支持區' : 'Support area', value: legacyTechnicalSupport },
        { label: locale === 'zh' ? '跌穿失效' : 'Invalid below', value: legacyTechnicalInvalid }
      ].filter((row) => hasFrontendValue(row.value));
    const technicalSmaCards = technicalCockpit ? (technicalCockpit.trend?.smaRows || []).map((row) => ({
      label: `SMA ${row.period}`,
      value: formatTechnicalSmaValue(row),
      note: `${technicalLabel(row.read, locale)} / ${technicalLabel(row.slope, locale)}`,
      tone: row.read === 'above' ? 'positive' : row.read === 'below' ? 'warning' : 'neutral'
    })) : [];
    const technicalIndicatorCards = technicalCockpit ? [
      {
        label: 'RSI 14',
        value: technicalCockpit.indicators?.rsi14 === null ? '—' : technicalCockpit.indicators.rsi14.toFixed(1),
        note: technicalCockpit.indicators?.rsiRead ? technicalLabel(technicalCockpit.indicators.rsiRead, locale) : (locale === 'zh' ? '動能溫度' : 'Momentum temperature'),
        tone: technicalCockpit.indicators?.rsiRead === 'overbought' ? 'warning' : 'neutral'
      },
      {
        label: 'MACD',
        value: technicalCockpit.indicators?.macd?.histogram === null || technicalCockpit.indicators?.macd?.histogram === undefined ? '—' : technicalCockpit.indicators.macd.histogram.toFixed(2),
        note: technicalCockpit.indicators?.macd?.line === null || technicalCockpit.indicators?.macd?.line === undefined
          ? '—'
          : `${locale === 'zh' ? 'MACD 線' : 'MACD line'} ${technicalCockpit.indicators.macd.line.toFixed(2)}`,
        tone: technicalCockpit.indicators?.macd?.histogram > 0 ? 'positive' : technicalCockpit.indicators?.macd?.histogram < 0 ? 'warning' : 'neutral'
      },
      {
        label: 'ADX 14',
        value: technicalCockpit.indicators?.adx14 === null ? '—' : technicalCockpit.indicators.adx14.toFixed(1),
        note: technicalCockpit.indicators?.adxRead ? technicalLabel(technicalCockpit.indicators.adxRead, locale) : (locale === 'zh' ? '趨勢強度' : 'Trend strength'),
        tone: technicalCockpit.indicators?.adxRead === 'strong_trend' ? 'positive' : 'neutral'
      },
      {
        label: locale === 'zh' ? '波幅' : 'Volatility',
        value: `${formatPct(technicalCockpit.indicators?.atrPct)} / ${formatPct(technicalCockpit.indicators?.adrPct)}`,
        note: technicalCockpit.indicators?.volatilityRead ? technicalLabel(technicalCockpit.indicators.volatilityRead, locale) : 'ATR / ADR',
        tone: technicalCockpit.indicators?.volatilityRead === 'elevated' ? 'warning' : 'neutral'
      }
    ].filter((card) => hasFrontendValue(card.value)) : [];
    const technicalObservationCards = technicalCockpit ? (technicalCockpit.observations || []).slice(0, 3).map((observation) => ({
      label: locale === 'zh' ? '技術面觀察' : 'Technical observation',
      value: locale === 'zh' ? observation.textZh : observation.textEn,
      tone: technicalObservationTone(observation.severity)
    })) : [];
    const technicalBoardCards = [
      {
        label: locale === 'zh' ? '趨勢狀態' : 'Trend state',
        value: technicalSetupLabel || localizedStaticLabel(momentumStrengthRead, locale),
        note: technicalCockpit?.snapshot?.close
          ? `${locale === 'zh' ? '收市價' : 'Close'} ${formatTechnicalMoney(technicalCockpit.snapshot.close)}`
          : momentumScore === null
          ? (locale === 'zh' ? '用相對強度和均線資料補充趨勢判斷。' : 'Use relative strength and moving-average context to complete the trend read.')
          : `${locale === 'zh' ? '動能分數' : 'Momentum score'} ${momentumScore}/100`,
        tone: technicalCockpit ? 'positive' : metricTone(momentumScore, 70)
      },
      {
        label: locale === 'zh' ? '相對強度' : 'Relative strength',
        value: technicalCockpit?.performance?.relativeStrengthPercentile !== null && technicalCockpit?.performance?.relativeStrengthPercentile !== undefined
          ? formatPercentile(technicalCockpit.performance.relativeStrengthPercentile, locale)
          : momentumRanking?.relative_strength_percentile !== undefined ? formatPercentile(momentumRanking.relative_strength_percentile, locale) : frontendEmptyText(locale, 'market'),
        note: technicalCockpit?.performance?.vsSpy63d !== null && technicalCockpit?.performance?.vsSpy63d !== undefined
          ? `${formatPct(technicalCockpit.performance.vsSpy63d)} vs SPY 63D / ${formatPct(technicalCockpit.performance.vsQqq63d)} vs QQQ 63D`
          : metrics.relative_strength_vs_spy_63d !== undefined ? `${formatPct(metrics.relative_strength_vs_spy_63d)} vs SPY 63D` : (locale === 'zh' ? '和大市比較股價表現。' : 'Compare the stock move against the broad market.'),
        tone: metricTone(technicalCockpit?.performance?.relativeStrengthPercentile ?? momentumRanking?.relative_strength_percentile, 75)
      },
      {
        label: locale === 'zh' ? '價格結構' : 'Price structure',
        value: primaryTechnicalZone ? formatTechnicalZoneValue(primaryTechnicalZone) : technicalSetupLabel,
        note: primaryTechnicalZone ? formatTechnicalZoneNote(primaryTechnicalZone, locale) : technicalSetupSentence,
        tone: hasTechnicalSetup ? 'positive' : 'neutral'
      },
      {
        label: locale === 'zh' ? '財報反應' : 'Earnings reaction',
        value: firstReactionRead,
        note: t1ReturnValue === null
          ? (locale === 'zh' ? '等待已核實反應日價格後才判斷首日反應。' : 'Wait for verified reaction-day prices before judging the first move.')
          : `${formatPct(t1ReturnValue)} ${locale === 'zh' ? '首日反應' : 'first reaction'}`,
        tone: t1ReturnValue !== null && t1ReturnValue > 0 ? 'positive' : t1ReturnValue !== null && t1ReturnValue < 0 ? 'warning' : 'neutral'
      }
    ];
    const technicalBenchmarkReturns = technicalCockpit ? [
      technicalCockpit.performance?.vsSpy63d !== null && technicalCockpit.performance?.vsSpy63d !== undefined
        ? `${formatPct(technicalCockpit.performance.vsSpy63d)} SPY`
        : null,
      technicalCockpit.performance?.vsQqq63d !== null && technicalCockpit.performance?.vsQqq63d !== undefined
        ? `${formatPct(technicalCockpit.performance.vsQqq63d)} QQQ`
        : null
    ].filter(Boolean) : [];
    const technicalPerformanceSummaryCards = technicalCockpit ? [
      {
        label: locale === 'zh' ? '相對強度' : 'Relative strength',
        value: formatPercentile(technicalCockpit.performance?.relativeStrengthPercentile, locale),
        note: locale === 'zh' ? '和同市場股票比較的排名位置。' : 'Ranked against the broader stock universe.',
        tone: metricTone(technicalCockpit.performance?.relativeStrengthPercentile, 75)
      },
      {
        label: locale === 'zh' ? '相對大市' : 'Market comparison',
        value: technicalBenchmarkReturns.join(' / ') || '—',
        note: locale === 'zh' ? '63 日相對 SPY / QQQ 表現。' : '63D return versus SPY / QQQ.',
        tone: technicalCockpit.performance?.vsSpy63d > 0 || technicalCockpit.performance?.vsQqq63d > 0 ? 'positive' : 'neutral'
      },
      {
        label: locale === 'zh' ? '收市價 / 流動性' : 'Close / liquidity',
        value: formatTechnicalMoney(technicalCockpit.snapshot?.close),
        note: technicalCockpit.snapshot?.averageVolume20d
          ? `${locale === 'zh' ? '20 日平均成交量' : '20D average volume'} ${formatTechnicalVolume(technicalCockpit.snapshot.averageVolume20d)}`
          : technicalLabel(technicalCockpit.snapshot?.liquidityRead, locale),
        tone: technicalCockpit.snapshot?.liquidityRead === 'liquid' ? 'positive' : 'neutral'
      },
      {
        label: locale === 'zh' ? '52 週位置' : '52W range position',
        value: formatTechnicalRangePosition(technicalCockpit.snapshot?.range52w),
        note: locale === 'zh' ? '低位至高位，以及現價所在位置。' : 'Low-to-high range and current position.',
        tone: technicalCockpit.snapshot?.range52w?.position >= 0.75 ? 'positive' : 'neutral'
      }
    ].filter((card) => hasFrontendValue(card.value)) : [];
    const technicalReturnCards = technicalCockpit ? [
      { label: locale === 'zh' ? '1 個月' : '1 Month', value: technicalCockpit.performance?.return1m },
      { label: locale === 'zh' ? '3 個月' : '3 Months', value: technicalCockpit.performance?.return3m },
      { label: locale === 'zh' ? '6 個月' : '6 Months', value: technicalCockpit.performance?.return6m },
      { label: locale === 'zh' ? '1 年' : '1 Year', value: technicalCockpit.performance?.return12m },
      { label: locale === 'zh' ? '2 年' : '2 Years', value: technicalCockpit.performance?.return2y }
    ].filter((card) => toNumeric(card.value) !== null) : [];
    const valuationWorkbenchCards = remainingTabsModel?.valuation?.workbenchCards || [
      {
        label: locale === 'zh' ? '現價相對區間' : 'Current price vs range',
        value: forwardValuationRange?.medianUpsideDownsideDisplay || marginOfSafetyDisplay,
        note: forwardValuationRange
          ? (locale === 'zh' ? '先看現價在悲觀 / 基準 / 樂觀區間的位置。' : 'Start with where current price sits inside the bear / base / bull range.')
          : valuationTopVerdict.why,
        tone: String(marginOfSafetyDisplay || '').toLowerCase().includes('none') || marginOfSafetyDisplay === '沒有' ? 'warning' : 'neutral'
      },
      {
        label: locale === 'zh' ? '收入倍數' : 'Revenue multiple',
        value: valuationMetricValue(valuationCore, 'ev_revenue'),
        note: locale === 'zh' ? '高收入倍數需要長期增長支持。' : 'A high revenue multiple needs durable growth support.',
        tone: 'warning'
      },
      {
        label: locale === 'zh' ? '現金流倍數' : 'Cash-flow multiple',
        value: valuationMetricValue(valuationCore, 'ev_fcf'),
        note: locale === 'zh' ? '用 FCF 倍數檢查收入倍數是否有現金流承托。' : 'Use FCF multiple to cross-check whether the revenue multiple has cash-flow support.',
        tone: 'warning'
      },
      {
        label: locale === 'zh' ? '估值需要成立的條件' : 'What must be true',
        value: valuationChecklist[0] || valuationTopVerdict.baseCaseSupport,
        note: locale === 'zh' ? '這是估值工作台的第一個檢查條件。' : 'This is the first condition the valuation workbench needs to test.',
        tone: 'neutral'
      }
    ];
    const riskTriggerGroups = remainingTabsModel?.thesisRisk?.triggerGroups || [
      {
        label: locale === 'zh' ? '業務破局' : 'Business break',
        value: thesisBreakTriggerDisplay,
        note: locale === 'zh'
          ? '留存、客戶擴張或 RPO 轉弱，會先打擊業務核心。'
          : 'Retention, customer expansion, or RPO weakness would hit the business core first.',
        tone: 'warning'
      },
      {
        label: locale === 'zh' ? '估值破局' : 'Valuation break',
        value: valuationKillData?.[0] || valuationTopVerdict.valuationState,
        note: locale === 'zh'
          ? '增長或 FCF 利潤率守不住，高估值容錯會快速下降。'
          : 'If growth or FCF margin slips, the premium valuation loses tolerance quickly.',
        tone: 'warning'
      },
      {
        label: locale === 'zh' ? '市場破局' : 'Market break',
        value: priceTrendRisk[0] || localizedStaticLabel(momentumStrengthRead, locale),
        note: locale === 'zh'
          ? '相對強度和財報後延續表現轉弱，是市場先行警號。'
          : 'Relative-strength and post-earnings follow-through weakness are early market warnings.',
        tone: 'neutral'
      }
    ];
    const financialDashboardCards = remainingTabsModel?.financialHealth?.dashboardCards || [
      {
        label: locale === 'zh' ? '增長' : 'Growth',
        value: valuationMetricValue(valuationCore, 'revenue_growth'),
        note: locale === 'zh' ? '先看增長速度是否仍足以支持估值。' : 'First check whether growth still supports the valuation.',
        tone: 'positive'
      },
      {
        label: locale === 'zh' ? '利潤率' : 'Margins',
        value: `${valuationMetricValue(valuationCore, 'gross_margin')} / ${valuationMetricValue(valuationCore, 'fcf_margin')}`,
        note: locale === 'zh' ? '毛利率反映軟件模型，FCF 反映現金轉化。' : 'Gross margin shows the software model; FCF margin shows cash conversion.',
        tone: 'positive'
      },
      {
        label: locale === 'zh' ? '資產負債表' : 'Balance sheet',
        value: valuationMetricValue(valuationCore, 'cash_securities'),
        note: locale === 'zh' ? '現金彈性支持再投資和週期承受力。' : 'Cash flexibility supports reinvestment and cycle resilience.',
        tone: 'neutral'
      },
      {
        label: locale === 'zh' ? '股東成本' : 'Shareholder cost',
        value: valuationMetricValue(valuationCore, 'sbc_revenue'),
        note: locale === 'zh' ? 'SBC 會攤薄股東分享增長的程度。' : 'SBC affects how much growth accrues to shareholders.',
        tone: 'warning'
      }
    ];
    const businessCoreRead = remainingTabsModel?.businessCore?.headline || localizedFinalRead || primaryValueDriverDisplay;
    const businessCoreReadBody = remainingTabsModel?.businessCore?.body || stockOverviewProfileLine;
    const valueEngineCards = remainingTabsModel?.businessCore?.valueEngineCards || [
      {
        label: copy.revenueEngine,
        value: quickFactsDisplay.find((fact) => fact.label === copy.businessCore || fact.label.includes('業務模式'))?.value || quickFactsDisplay.find((fact) => fact.label.includes('Business Model'))?.value || (locale === 'zh' ? '訂閱制平台收入' : 'Subscription platform revenue'),
        note: businessEngineSection?.points?.[0] || stockOverviewProfileLine,
        tone: 'positive'
      },
      {
        label: copy.customerExpansion,
        value: largeCustomerFact?.value || primaryValueDriverDisplay,
        note: netRetentionFact?.value
          ? (locale === 'zh' ? `淨留存率 ${netRetentionFact.value}，反映客戶採用後仍在擴張。` : `Net retention at ${netRetentionFact.value} shows expansion after adoption.`)
          : primaryValueDriverDisplay,
        tone: 'positive'
      },
      {
        label: copy.platformBreadth,
        value: competitivePositionSection?.title || (locale === 'zh' ? '可觀測性與安全平台' : 'Observability and security platform'),
        note: competitivePositionSection?.points?.[0] || (locale === 'zh' ? '平台廣度要靠多產品採用和雲端工作負載增長支持。' : 'Platform breadth needs multi-product adoption and cloud workload growth.'),
        tone: 'neutral'
      },
      {
        label: copy.retentionDurability,
        value: netRetentionFact?.value || primaryValueDriverDisplay,
        note: locale === 'zh'
          ? '核心問題是客戶是否繼續增加用量、採用更多產品，並把 DDOG 留在雲端營運流程內。'
          : 'The core question is whether customers keep expanding usage, adopting more products, and embedding DDOG in cloud operations.',
        tone: 'positive'
      }
    ];
    const operatingProofCards = remainingTabsModel?.businessCore?.operatingProofCards || [
      {
        label: copy.revenueGrowth,
        value: valuationMetricValue(valuationCore, 'revenue_growth'),
        note: formatFiscalPeriodLabel(dossierProfile?.latestFiscalPeriod, locale) || copy.latestVerifiedPeriod,
        tone: 'positive'
      },
      {
        label: locale === 'zh' ? '大型客戶' : 'Large customers',
        value: largeCustomerFact?.value || copy.pending,
        note: locale === 'zh' ? '大型客戶擴張是平台價值最直接的證據之一。' : 'Large-customer expansion is one of the cleanest platform-value signals.',
        tone: 'positive'
      },
      {
        label: copy.fcfMargin,
        value: valuationMetricValue(valuationCore, 'fcf_margin'),
        note: copy.cashFlowQuality,
        tone: 'positive'
      },
      {
        label: locale === 'zh' ? 'RPO / cRPO' : 'RPO / cRPO',
        value: valueCoreEvidenceItems.find((item) => item.includes('RPO')) || copy.pending,
        note: locale === 'zh' ? '用來檢查未來收入和需求韌性。' : 'Used to check forward revenue and demand durability.',
        tone: 'neutral'
      }
    ];
    const businessBreakCards = remainingTabsModel?.businessCore?.breakSignalCards || [
      {
        label: copy.firstBreakSignal,
        value: thesisBreakTriggerDisplay,
        note: locale === 'zh' ? '這是業務核心最先需要防守的地方。' : 'This is the first area the business core needs to defend.',
        tone: 'warning'
      },
      {
        label: locale === 'zh' ? 'SBC 佔收入' : 'SBC / Revenue',
        value: valuationMetricValue(valuationCore, 'sbc_revenue'),
        note: locale === 'zh' ? '高增長要同時改善股權激勵佔比，否則股東經濟會被削弱。' : 'Growth needs better SBC discipline, otherwise shareholder economics weaken.',
        tone: 'warning'
      }
    ];
    const overviewKeyStatistics = [
      {
        label: copy.currentPrice,
        value: marketSnapshotValue(marketSnapshot, 'currentPrice'),
        note: copy.latestMarketSnapshot
      },
      {
        label: copy.marketCap,
        value: marketSnapshotValue(marketSnapshot, 'marketCap'),
        note: liveCapitalization?.sharesOutstandingAsOf
          ? copy.sharesAsOf(liveCapitalization.sharesOutstandingAsOf)
          : copy.equityValue
      },
      {
        label: copy.evRevenue,
        value: valuationMetricValue(valuationCore, 'ev_revenue'),
        note: copy.valuationMultiple
      },
      {
        label: copy.revenueGrowth,
        value: valuationMetricValue(valuationCore, 'revenue_growth'),
        note: formatFiscalPeriodLabel(dossierProfile?.latestFiscalPeriod, locale) || copy.latestVerifiedPeriod
      },
      {
        label: copy.fcfMargin,
        value: valuationMetricValue(valuationCore, 'fcf_margin'),
        note: copy.cashFlowQuality
      },
      {
        label: copy.relativeStrength,
        value: formatPercentile(technicalCockpit?.performance?.relativeStrengthPercentile ?? momentumRanking?.relative_strength_percentile, locale),
        note: technicalCockpit?.performance?.vsSpy63d !== null && technicalCockpit?.performance?.vsSpy63d !== undefined
          ? `${formatPct(technicalCockpit.performance.vsSpy63d)} vs SPY 63D`
          : metrics.relative_strength_vs_spy_63d !== undefined ? `${formatPct(metrics.relative_strength_vs_spy_63d)} vs SPY 63D` : copy.percentile
      }
    ];
    const overviewMarketEvidenceRows = marketEvidenceCards.slice(0, 4);
    const overviewSignalChips = signalScreens.slice(0, 4);
    const overviewHighlightCards = [
      {
        label: copy.businessCore,
        value: primaryValueDriverDisplay,
        state: `${valueCoreTypeDisplay} / ${companyStageDisplay}`,
        note: copy.businessEngineVerify,
        tone: 'positive'
      },
      {
        label: copy.marketEvidence,
        value: `${copy.trendPrefix}: ${localizedStaticLabel(momentumStrengthRead, locale)}`,
        state: measuredGapCount !== null ? copy.eventSample(measuredGapCount) : copy.eventSamplePending,
        note: copy.marketEvidenceContextNote,
        tone: momentumScore !== null && momentumScore >= 70 ? 'positive' : 'neutral'
      },
      {
        label: copy.valuation,
        value: valuationStateDisplay,
        state: copy.marginOfSafety(marginOfSafetyDisplay),
        note: copy.valuationPressureHigh,
        tone: 'warning'
      },
      {
        label: copy.thesisRisk,
        value: thesisBreakTriggerDisplay,
        state: copy.breakTriggerMonitor,
        note: copy.durabilityEvidenceWeakens,
        tone: 'warning'
      },
      {
        label: copy.financialHealth,
        value: copy.financialHealthGrowthFcf(valuationMetricValue(valuationCore, 'revenue_growth'), valuationMetricValue(valuationCore, 'fcf_margin')),
        state: copy.cashSecurities(valuationMetricValue(valuationCore, 'cash_securities')),
        note: copy.sbcRevenue(valuationMetricValue(valuationCore, 'sbc_revenue')),
        tone: 'neutral'
      }
    ];
    const primaryRead = localizedFinalRead || valuationTopVerdict.overallRead;
    const evidenceFocusItems = remainingTabsModel?.businessCore?.evidenceToMonitor || valueCoreEvidenceItems;
    const evidenceFocus = evidenceFocusItems.slice(0, 3).join(' / ') || frontendEmptyText(locale);
    const researchPathCards = [
      {
        tabId: 'business-core',
        label: copy.businessCore,
        value: primaryValueDriverDisplay,
        note: copy.businessEngineVerify,
        tone: 'positive'
      },
      {
        tabId: 'market-evidence',
        label: copy.marketEvidence,
        value: `${copy.trendPrefix}: ${localizedStaticLabel(momentumStrengthRead, locale)}`,
        note: copy.marketEvidenceContextNote,
        tone: momentumScore !== null && momentumScore >= 70 ? 'positive' : 'neutral'
      },
      {
        tabId: 'valuation',
        label: copy.valuation,
        value: valuationStateDisplay,
        note: copy.marginOfSafety(marginOfSafetyDisplay),
        tone: 'warning'
      },
      {
        tabId: 'thesis-risk',
        label: copy.thesisRisk,
        value: thesisBreakTriggerDisplay,
        note: copy.durabilityEvidenceWeakens,
        tone: 'warning'
      }
    ];

    return (
      <div className="stock-dossier-view stock-dossier-view--internal-tabs">
        <section className="card dossier-tab-shell" aria-label={`${ticker} Stock Dossier internal tabs`}>
          <div className="dossier-tab-shell__header">
            <div className="dossier-tab-shell__identity">
              <StockLogo
                ticker={ticker}
                companyName={companyDisplayName}
                logoUrl={companyLogoUrl}
                size="side"
                className="dossier-tab-shell__logo"
              />
              <div>
                <p className="crowdrisk-kicker">{copy.stockDossier}</p>
                <h2>{companyDisplayName}</h2>
                <span>{compactTickerLine}</span>
              </div>
            </div>
            <div className="dossier-hero-pills">
              {dossierProfile?.analysisDate && <span>{copy.asOf} {dossierProfile.analysisDate}</span>}
            </div>
          </div>

          <div className="dossier-internal-tabs" role="tablist" aria-label={`${ticker} Stock Dossier tabs`}>
            {copy.tabs.map((tab) => (
              <button
                key={tab.id}
                type="button"
                role="tab"
                aria-selected={activeInternalTab === tab.id}
                className={activeInternalTab === tab.id ? 'active' : ''}
                onClick={() => setActiveInternalTab(tab.id)}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="dossier-internal-tab-panel">
            {activeInternalTab === 'overview' && (
              <section className="dossier-visual-cockpit" aria-label={`${ticker} dossier snapshot`}>
                <div className="dossier-visual-cockpit__header">
                  <div>
                    <h3>{copy.snapshot}</h3>
                  </div>
                </div>

                <div className="dossier-visual-cockpit__grid">
                  <article className="dossier-cockpit-card dossier-cockpit-card--wide">
                    <div className="dossier-cockpit-card__heading">
                      <span>{copy.whyNow}</span>
                      <em>{copy.coreVerdict}</em>
                    </div>
                    <strong>{localizedWhyNowReason || renderedVerdict.reason}</strong>
                    <p style={{ marginTop: '0.5rem', opacity: 0.9 }}>{localizedWhyNowVerdict || renderedVerdict.verdict}</p>
                    <div className="dossier-why-now-briefs">
                      <div>
                        <span>{copy.primaryRead}</span>
                        <strong>{primaryRead}</strong>
                        {researchStateDisplay && <em>{copy.context}: {researchStateDisplay}</em>}
                      </div>
                      <div>
                        <span>{copy.evidenceFocus}</span>
                        <strong>{valueCoreTypeDisplay}</strong>
                        <em>{evidenceFocus}</em>
                      </div>
                    </div>
                  </article>

                  <article className="dossier-cockpit-card dossier-cockpit-card--wide dossier-research-path-card">
                    <div className="dossier-cockpit-card__heading">
                      <span>{copy.researchPath}</span>
                      <em>{copy.researchPathHint}</em>
                    </div>
                    <div className="dossier-research-path-grid">
                      {researchPathCards.map((card, index) => (
                        <button
                          key={card.tabId}
                          type="button"
                          className={`tone-${card.tone}`}
                          onClick={() => setActiveInternalTab(card.tabId)}
                        >
                          <span>{index + 1}. {card.label}</span>
                          <strong>{card.value}</strong>
                          <em>{card.note}</em>
                        </button>
                      ))}
                    </div>
                  </article>

                  <article className="dossier-cockpit-card dossier-cockpit-card--wide" data-stock-performance-feed-source={stockPerformanceFeedSource}>
                    <div className="dossier-cockpit-card__heading">
                      <span>{copy.stockPerformance}</span>
                      <em>{performanceGrid?.source || copy.returnPending}</em>
                    </div>
                    <div className="dossier-stock-performance-grid">
                      {performanceRows.map((period) => (
                        <div key={period.label} className={`dossier-performance-cell tone-${performanceTone(period.value)}`}>
                          <span>{period.label}</span>
                          <strong>{formatPerformanceReturn(period.value)}</strong>
                          <em>{period.note || copy.returnPending}</em>
                        </div>
                      ))}
                    </div>
                  </article>

                  <article className="dossier-cockpit-card dossier-cockpit-card--wide">
                    <div className="dossier-cockpit-card__heading">
                      <span>{copy.keyStatistics}</span>
                      <em>{copy.snapshotMetrics}</em>
                    </div>
                    <div className="dossier-overview-key-stat-grid">
                      {overviewKeyStatistics.map((stat) => (
                        <div key={stat.label}>
                          <span>{stat.label}</span>
                          <strong>{stat.value}</strong>
                          <em>{stat.note}</em>
                        </div>
                      ))}
                    </div>
                  </article>

                  <PeerEcosystemPanel ecosystem={peerEcosystem} ticker={tickerForSummary} copy={copy} locale={locale} />

                  <article className="dossier-cockpit-card dossier-cockpit-card--wide">
                    <div className="dossier-cockpit-card__heading">
                      <span>{copy.executiveHighlights}</span>
                      <em>{copy.highlights}</em>
                    </div>
                    <div className="dossier-overview-highlight-grid">
                      {overviewHighlightCards.map((card) => (
                        <div key={card.label} className={`tone-${card.tone}`}>
                          <span>{card.label}</span>
                          <strong>{card.value}</strong>
                          <em>{card.state}</em>
                          <p>{card.note}</p>
                        </div>
                      ))}
                    </div>
                  </article>

                  <article className="dossier-cockpit-card">
                    <div className="dossier-cockpit-card__heading">
                      <span>{copy.signalScreens}</span>
                      <em>{copy.screenEvidence}</em>
                    </div>
                    <div className="dossier-signal-tag-list">
                      {signalScreens.map((signal) => (
                        <div key={signal.title} className="dossier-signal-tag">
                          <div>
                            <strong>{signal.title}</strong>
                            <p>{signal.explanation}</p>
                          </div>
                          <span>{signal.evidenceState}</span>
                        </div>
                      ))}
                    </div>
                  </article>

                  <article className="dossier-cockpit-card dossier-cockpit-card--evidence-board">
                    <div className="dossier-cockpit-card__heading">
                      <span>{copy.marketEvidence}</span>
                      <em>{copy.evidenceOverview}</em>
                    </div>
                    <strong>{localizedStaticLabel(momentumStrengthRead, locale)}</strong>
                    <p>{marketEvidenceTitle}</p>
                    <div className="dossier-overview-evidence-metrics">
                      {overviewMarketEvidenceRows.map((item) => (
                        <div key={item.label} className={`tone-${item.tone}`}>
                          <span>{item.label}</span>
                          <strong>{item.value}</strong>
                          <em>{item.note}</em>
                        </div>
                      ))}
                    </div>
                    {overviewSignalChips.length > 0 && (
                      <div className="dossier-overview-screen-chips" aria-label={`${ticker} overview screen tags`}>
                        {overviewSignalChips.map((signal) => (
                          <span key={signal.title}>{signal.title}</span>
                        ))}
                      </div>
                    )}
                  </article>
                </div>

                <ContextualFaq heading={copy.contextualFaq} title={copy.faqOverviewTitle(ticker)} items={overviewFaq} />
              </section>
            )}

            {activeInternalTab === 'business-core' && (
              <section className="dossier-tab-content" aria-label={`${ticker} Business Core`}>
                <div className="dossier-tab-content__header">
                  <p className="crowdrisk-kicker">{copy.businessCore}</p>
                  <h3>{copy.businessCoreQuestion}</h3>
                </div>
                <div className="dossier-business-core-read">
                  <span>{copy.businessCoreRead}</span>
                  <strong>{businessCoreRead}</strong>
                  <p>{businessCoreReadBody}</p>
                </div>
                <div className="dossier-business-section-heading">
                  <span>{copy.valueEngine}</span>
                  <strong>{primaryValueDriverDisplay}</strong>
                </div>
                <div className="dossier-business-engine-grid">
                  {valueEngineCards.map((card) => (
                    <article key={card.label} className={`tone-${card.tone}`}>
                      <span>{card.label}</span>
                      <strong>{card.value}</strong>
                      <p>{card.note}</p>
                    </article>
                  ))}
                </div>
                <div className="dossier-business-section-heading">
                  <span>{copy.operatingProof}</span>
                  <strong>{locale === 'zh' ? '用數據檢查業務是否仍在複利式增長' : 'Evidence that checks whether the business is still compounding'}</strong>
                </div>
                <div className="dossier-business-proof-grid">
                  {operatingProofCards.map((card) => (
                    <div key={card.label} className={`tone-${card.tone}`}>
                      <span>{card.label}</span>
                      <strong>{card.value}</strong>
                      <em>{card.note}</em>
                    </div>
                  ))}
                </div>
                <div className="dossier-business-section-heading">
                  <span>{copy.breakSignals}</span>
                  <strong>{locale === 'zh' ? '業務核心失效前，先看這些信號' : 'Signals to watch before the business core breaks'}</strong>
                </div>
                <div className="dossier-business-break-grid">
                  {businessBreakCards.map((card) => (
                    <article key={card.label} className={`tone-${card.tone}`}>
                      <span>{card.label}</span>
                      <strong>{card.value}</strong>
                      <p>{card.note}</p>
                    </article>
                  ))}
                </div>
                {evidenceFocusItems.length > 0 && (
                  <div className="dossier-business-evidence">
                    <span>{copy.evidenceToMonitor}</span>
                    <div className="dossier-evidence-chip-list">
                      {evidenceFocusItems.map((item) => (
                        <em key={item}>{item}</em>
                      ))}
                    </div>
                  </div>
                )}
                <ContextualFaq heading={copy.contextualFaq} title={copy.faqBusinessCoreTitle(ticker)} items={businessCoreFaq} />
              </section>
            )}

            {activeInternalTab === 'market-evidence' && (
              <section className="dossier-tab-content" aria-label={`${ticker} Market Evidence`}>
                <div className="dossier-tab-content__header">
                  <p className="crowdrisk-kicker">{copy.marketEvidence}</p>
                  <h3>{marketEvidenceTitle}</h3>
                </div>
                <div className="dossier-evidence-board dossier-evidence-board--market">
                  <div className="dossier-evidence-board__lead">
                    <span>{locale === 'zh' ? '趨勢與反應面板' : 'Trend and reaction board'}</span>
                    <strong>{localizedStaticLabel(momentumStrengthRead, locale)}</strong>
                    <p>{technicalSetupSentence}</p>
                  </div>
                  {technicalPerformanceSummaryCards.length > 0 && (
                    <div className="dossier-performance-cockpit" aria-label={`${ticker} performance and relative strength cockpit`}>
                      <div className="dossier-performance-cockpit__head">
                        <span>{locale === 'zh' ? '股價表現與相對強度' : 'Performance and relative strength'}</span>
                        <strong>{locale === 'zh' ? '先看股價本身有多強，再看是否跑贏大市。' : 'Start with price performance, then test whether it is leading the market.'}</strong>
                      </div>
                      <div className="dossier-performance-cockpit__summary">
                        {technicalPerformanceSummaryCards.map((card) => (
                          <article key={card.label} className={`tone-${card.tone}`}>
                            <span>{card.label}</span>
                            <strong>{card.value}</strong>
                            <p>{card.note}</p>
                          </article>
                        ))}
                      </div>
                      {technicalReturnCards.length > 0 && (
                        <div className="dossier-performance-cockpit__returns" aria-label={`${ticker} technical cockpit performance horizons`}>
                          {technicalReturnCards.map((card) => (
                            <div key={card.label} className={`tone-${performanceTone(card.value)}`}>
                              <span>{card.label}</span>
                              <strong>{formatPerformanceReturn(card.value)}</strong>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                  <div className="dossier-evidence-board__grid">
                    {technicalBoardCards.map((card) => (
                      <article key={card.label} className={`tone-${card.tone}`}>
                        <span>{card.label}</span>
                        <strong>{card.value}</strong>
                        <p>{card.note}</p>
                      </article>
                    ))}
                  </div>
                  {technicalLevels.length > 0 && (
                    <div className="dossier-level-strip" aria-label={`${ticker} market evidence price levels`}>
                      {technicalLevels.map((level) => (
                        <div key={level.label}>
                          <span>{level.label}</span>
                          <strong>{level.value}</strong>
                          {level.note && <em>{level.note}</em>}
                        </div>
                      ))}
                    </div>
                  )}
                  {technicalSmaCards.length > 0 && (
                    <div className="dossier-technical-grid" aria-label={`${ticker} moving average structure`}>
                      <div className="dossier-technical-grid__heading">
                        <span>{locale === 'zh' ? '均線結構' : 'Moving-average structure'}</span>
                        <strong>{locale === 'zh' ? '價格相對主要均線的位置' : 'Price distance versus key moving averages'}</strong>
                      </div>
                      <div className="dossier-technical-grid__cells">
                        {technicalSmaCards.map((card) => (
                          <div key={card.label} className={`tone-${card.tone}`}>
                            <span>{card.label}</span>
                            <strong>{card.value}</strong>
                            <em>{card.note}</em>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  {technicalIndicatorCards.length > 0 && (
                    <div className="dossier-technical-grid" aria-label={`${ticker} technical indicators`}>
                      <div className="dossier-technical-grid__heading">
                        <span>{locale === 'zh' ? '技術指標' : 'Technical indicators'}</span>
                        <strong>{locale === 'zh' ? '用來分辨趨勢強度、偏熱程度與波動' : 'Checks trend strength, extension, and volatility'}</strong>
                      </div>
                      <div className="dossier-technical-grid__cells dossier-technical-grid__cells--compact">
                        {technicalIndicatorCards.map((card) => (
                          <div key={card.label} className={`tone-${card.tone}`}>
                            <span>{card.label}</span>
                            <strong>{card.value}</strong>
                            <em>{card.note}</em>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  {technicalObservationCards.length > 0 && (
                    <div className="dossier-technical-observations" aria-label={`${ticker} technical observations`}>
                      {technicalObservationCards.map((card, index) => (
                        <article key={`${card.label}-${index}`} className={`tone-${card.tone}`}>
                          <span>{card.label}</span>
                          <p>{card.value}</p>
                        </article>
                      ))}
                    </div>
                  )}
                </div>
                <div className="dossier-tab-depth-grid">
                  {marketNarrativeCards.map((card) => (
                    <article key={card.label} className={`dossier-tab-depth-card tone-${card.tone}`}>
                      <span>{card.label}</span>
                      <strong>{card.value}</strong>
                      <p>{card.note}</p>
                    </article>
                  ))}
                </div>
                <div className="dossier-market-visual-grid" aria-label={`${ticker} market evidence visual cards`}>
                  {marketEvidenceCards.map((item) => (
                    <div key={item.label} className={`tone-${item.tone}`}>
                      <span>{item.label}</span>
                      <strong>{item.value}</strong>
                      <em>{item.note}</em>
                    </div>
                  ))}
                </div>
                <div className="dossier-event-study-summary-strip" aria-label={`${ticker} earnings event summary`}>
                  <div>
                    <span>{copy.measuredQuarters}</span>
                    <strong>
                      {measuredGapCount ?? <em className="dossier-pending-value">{copy.pending}</em>}
                    </strong>
                  </div>
                  <div>
                    <span>{copy.gapUpRate}</span>
                    <strong>{formatRatioReturn(eventStudyDigest?.gap_up_rate) || <em className="dossier-pending-value">{copy.pending}</em>}</strong>
                  </div>
                  <SummaryMetric label={copy.postGap3} summary={forwardGapUps?.r_plus_3} countLabel={locale === 'zh' ? '個季度' : 'measured'} />
                  <SummaryMetric label={copy.postGap10} summary={forwardGapUps?.r_plus_10} countLabel={locale === 'zh' ? '個季度' : 'measured'} />
                  <SummaryMetric label={copy.postGap30} summary={forwardGapUps?.r_plus_30} countLabel={locale === 'zh' ? '個季度' : 'measured'} />
                </div>
                <div className="dossier-reaction-quality-grid">
                  {latestReactionRows.map((row) => (
                    <div key={row.label}>
                      <span>{row.label}</span>
                      <strong>{normalizeNotVerified(row.value, locale)}</strong>
                      <em>{row.note}</em>
                    </div>
                  ))}
                </div>
                <ContextualFaq heading={copy.contextualFaq} title={copy.faqMarketEvidenceTitle(ticker)} items={marketEvidenceFaq} />
              </section>
            )}

            {activeInternalTab === 'valuation' && (
              <section className="dossier-tab-content" aria-label={`${ticker} Valuation`}>
                <div className="dossier-tab-content__header">
                  <p className="crowdrisk-kicker">{copy.valuation}</p>
                  <h3>{valuationPosture?.title || valuationTopVerdict.valuationState}</h3>
                </div>
                <div className="dossier-phase2-lead">
                  <span>{valuationPosture?.label || copy.valuationPosture}</span>
                  <strong>{valuationTopVerdict.valuationState}</strong>
                  <p>{valuationPosture?.note || valuationTopVerdict.why}</p>
                </div>
                <div className="dossier-evidence-board dossier-evidence-board--valuation">
                  <div className="dossier-evidence-board__lead">
                    <span>{locale === 'zh' ? '估值工作台' : 'Valuation workbench'}</span>
                    <strong>{forwardValuationRange?.impliedPriceRange || valuationTopVerdict.valuationState}</strong>
                    <p>{locale === 'zh'
                      ? '先看現價在情境區間的位置，再問市場已經要求公司交出甚麼。'
                      : 'Start with current price inside the scenario range, then ask what the market already requires.'}</p>
                  </div>
                  <div className="dossier-evidence-board__grid">
                    {valuationWorkbenchCards.map((card) => (
                      <article key={card.label} className={`tone-${card.tone}`}>
                        <span>{card.label}</span>
                        <strong>{card.value}</strong>
                        <p>{card.note}</p>
                      </article>
                    ))}
                  </div>
                  {forwardRangeVisual?.low !== null && forwardRangeVisual?.high !== null && (
                    <div className="dossier-forward-range-visual" aria-label={`${ticker} internal valuation range visual`}>
                      <div className="dossier-forward-range-visual__head">
                        <div>
                          <span>{copy.valuationMap}</span>
                          <strong>{copy.currentVsRange}</strong>
                        </div>
                        <div>
                          <span>{copy.range}</span>
                          <strong>{formatWholePrice(forwardRangeVisual.low)} - {formatWholePrice(forwardRangeVisual.high)}</strong>
                        </div>
                      </div>
                      <div
                        className="dossier-forward-value-rail"
                        style={{
                          '--current-marker': forwardRangeVisual.currentPct,
                          '--median-marker': forwardRangeVisual.medianPct
                        }}
                      >
                        <i className="marker-current" />
                        <i className="marker-median" />
                      </div>
                      <div className="dossier-forward-range-legend">
                        <span>{copy.bear} {formatWholePrice(forwardRangeVisual.low)}</span>
                        <span>{copy.current} {formatWholePrice(forwardRangeVisual.current)}</span>
                        <span>{copy.median} {formatWholePrice(forwardRangeVisual.median)}</span>
                        <span>{copy.bull} {formatWholePrice(forwardRangeVisual.high)}</span>
                      </div>
                    </div>
                  )}
                </div>
                {forwardScenarioCards.length > 0 && (
                  <div className="dossier-scenario-mini-grid" aria-label={`${ticker} valuation scenarios`}>
                    {forwardScenarioCards.map((scenario) => {
                      const scenarioLabel = scenario.label === 'Bear'
                        ? copy.bear
                        : scenario.label === 'Bull'
                          ? copy.bull
                          : scenario.label === 'Base'
                            ? (locale === 'zh' ? '基準' : 'Base')
                            : scenario.label;
                      const scenarioGrowth = locale === 'zh'
                        ? String(scenario.revenueGrowth || '')
                          .replace('FY2027 model', 'FY2027 模型')
                          .replace('FY2028 model', 'FY2028 模型')
                        : scenario.revenueGrowth;
                      return (
                        <article key={scenario.label} className={`tone-${scenario.tone}`}>
                          <span>{scenarioLabel}</span>
                          <strong>{formatWholePrice(scenario.impliedPrice)}</strong>
                          <p>{scenarioGrowth || frontendEmptyText(locale, 'valuation')}</p>
                          <em>{formatScenarioMultiple(scenario.evRevenueMultiple, 'EV / Rev')} / {scenario.irrDisplay}</em>
                        </article>
                      );
                    })}
                  </div>
                )}
                <div className="dossier-tab-depth-grid">
                  {valuationDepthCards.map((card) => (
                    <article key={card.label} className={`dossier-tab-depth-card tone-${card.tone}`}>
                      <span>{card.label}</span>
                      <strong>{card.value}</strong>
                      <p>{card.note}</p>
                    </article>
                  ))}
                </div>
                <div className="dossier-phase2-metric-grid">
                  {valuationMetricCards.map((card) => (
                    <div key={card.label}>
                      <span>{card.label}</span>
                      <strong>{card.value}</strong>
                      <em>{card.note}</em>
                    </div>
                  ))}
                </div>
                <div className="dossier-phase2-card-grid">
                  {valuationTensionCards.map((card) => (
                    <article key={card.title}>
                      <span>{card.title}</span>
                      <strong>{card.state}</strong>
                      <p>{card.text}</p>
                    </article>
                  ))}
                </div>
                <div className="dossier-analysis-lane">
                  <div>
                    <span>{locale === 'zh' ? '估值讀法' : 'Valuation read'}</span>
                    <strong>{locale === 'zh' ? '估值不是便宜與否，而是市場要求有多高' : 'Valuation is about what the market already requires'}</strong>
                  </div>
                  <div className="dossier-analysis-list">
                    {valuationWatchCards.map((card) => (
                      <article key={card.label}>
                        <span>{card.label}</span>
                        <strong>{card.value}</strong>
                        <p>{card.note}</p>
                      </article>
                    ))}
                  </div>
                </div>
                <div className="dossier-phase2-checklist">
                  <div>
                    <span>{copy.whatNeedTrue}</span>
                    <strong>{copy.evidenceChecklist}</strong>
                  </div>
                  <ul>
                    {valuationChecklist.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
                <ContextualFaq heading={copy.contextualFaq} title={copy.faqValuationTitle(ticker)} items={valuationFaq} />
              </section>
            )}

            {activeInternalTab === 'thesis-risk' && (
              <section className="dossier-tab-content" aria-label={`${ticker} Thesis Risk`}>
                <div className="dossier-tab-content__header">
                  <p className="crowdrisk-kicker">{copy.thesisRisk}</p>
                  <h3>{copy.thesisRiskQuestion}</h3>
                </div>
                <div className="dossier-phase2-lead">
                  <span>{copy.riskPosture}</span>
                  <strong>{copy.durabilityMonitor}</strong>
                  <p>{thesisRiskLead}</p>
                </div>
                <div className="dossier-evidence-board dossier-evidence-board--risk">
                  <div className="dossier-evidence-board__lead">
                    <span>{locale === 'zh' ? '破局監察' : 'Kill-switch monitor'}</span>
                    <strong>{thesisBreakTriggerDisplay}</strong>
                    <p>{locale === 'zh'
                      ? '這個 tab 只回答一件事：哪些證據會令原本的研究判斷失效或需要降級。'
                      : 'This tab answers one question: which evidence would break or downgrade the dossier read.'}</p>
                  </div>
                  <div className="dossier-evidence-board__grid dossier-evidence-board__grid--three">
                    {riskTriggerGroups.map((card) => (
                      <article key={card.label} className={`tone-${card.tone}`}>
                        <span>{card.label}</span>
                        <strong>{card.value}</strong>
                        <p>{card.note}</p>
                      </article>
                    ))}
                  </div>
                </div>
                <div className="dossier-tab-depth-grid">
                  {thesisAssumptionCards.map((card) => (
                    <article key={card.label} className={`dossier-tab-depth-card tone-${card.tone}`}>
                      <span>{card.label}</span>
                      <strong>{card.value}</strong>
                      <p>{card.note}</p>
                    </article>
                  ))}
                </div>
                <div className="dossier-risk-map-grid">
                  {thesisRiskMap.map((risk) => (
                    <article key={risk.label}>
                      <div>
                        <span>{risk.label}</span>
                        <strong>{risk.severity}</strong>
                      </div>
                      <p>{risk.watch}</p>
                    </article>
                  ))}
                </div>
                <div className="dossier-analysis-lane">
                  <div>
                    <span>{locale === 'zh' ? '風險讀法' : 'Risk read'}</span>
                    <strong>{locale === 'zh' ? '風險不是列清單，而是找最早會破壞論點的信號' : 'Risk is about the earliest signal that can break the thesis'}</strong>
                  </div>
                  <div className="dossier-analysis-list">
                    {thesisEvidenceCards.map((card) => (
                      <article key={card.label}>
                        <span>{card.label}</span>
                        <strong>{card.value}</strong>
                        <p>{card.note}</p>
                      </article>
                    ))}
                  </div>
                </div>
                <div className="dossier-phase2-checklist">
                  <div>
                    <span>{copy.reduceRisk}</span>
                    <strong>{copy.watchSignals}</strong>
                  </div>
                  <ul>
                    {thesisRiskEvidence.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
                <ContextualFaq heading={copy.contextualFaq} title={copy.faqThesisRiskTitle(ticker)} items={thesisRiskFaq} />
              </section>
            )}

            {activeInternalTab === 'financial-health' && (
              <section className="dossier-tab-content" aria-label={`${ticker} Financial Health`}>
                <div className="dossier-tab-content__header">
                  <p className="crowdrisk-kicker">{copy.financialHealth}</p>
                  <h3>{copy.financialHealthQuestion}</h3>
                </div>
                <div className="dossier-phase2-lead">
                  <span>{copy.qualityOfGrowth}</span>
                  <strong>{copy.growthPlusFcf}</strong>
                  <p>{financialHealthQualityRead}</p>
                </div>
                <div className="dossier-evidence-board dossier-evidence-board--financial">
                  <div className="dossier-evidence-board__lead">
                    <span>{locale === 'zh' ? '財務質素儀表板' : 'Financial quality dashboard'}</span>
                    <strong>{locale === 'zh' ? '增長、現金、負債表與攤薄一起看' : 'Read growth, cash, balance sheet, and dilution together'}</strong>
                    <p>{locale === 'zh'
                      ? '不是只看收入增長，而是看增長是否能轉成現金、維持資產負債表彈性，並控制股東攤薄。'
                      : 'Do not stop at revenue growth; check whether growth converts into cash, preserves balance-sheet flexibility, and controls dilution.'}</p>
                  </div>
                  <div className="dossier-evidence-board__grid">
                    {financialDashboardCards.map((card) => (
                      <article key={card.label} className={`tone-${card.tone}`}>
                        <span>{card.label}</span>
                        <strong>{card.value}</strong>
                        <p>{card.note}</p>
                      </article>
                    ))}
                  </div>
                </div>
                <div className="dossier-phase2-metric-grid dossier-phase2-metric-grid--six">
                  {financialHealthMetricCards.map((card) => (
                    <div key={card.label}>
                      <span>{card.label}</span>
                      <strong>{card.value}</strong>
                      <em>{card.note}</em>
                    </div>
                  ))}
                </div>
                <div className="dossier-phase2-card-grid">
                  {financialQualityCards.map((card) => (
                    <article key={card.title}>
                      <span>{card.title}</span>
                      <strong>{card.state}</strong>
                      <p>{card.text}</p>
                    </article>
                  ))}
                </div>
                <div className="dossier-analysis-lane">
                  <div>
                    <span>{locale === 'zh' ? '財務讀法' : 'Financial read'}</span>
                    <strong>{locale === 'zh' ? '好公司要把收入增長轉成現金和股東價值' : 'A strong company has to turn growth into cash and shareholder value'}</strong>
                  </div>
                  <div className="dossier-analysis-list">
                    {financialWatchCards.map((card) => (
                      <article key={card.label}>
                        <span>{card.label}</span>
                        <strong>{card.value}</strong>
                        <p>{card.note}</p>
                      </article>
                    ))}
                  </div>
                </div>
                <ContextualFaq heading={copy.contextualFaq} title={copy.faqFinancialHealthTitle(ticker)} items={financialHealthFaq} />
              </section>
            )}
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="stock-dossier-view">
      {/* 1. Stock Overview */}
      <section className="dossier-hero-card">
        <div className="dossier-hero-main">
          <div className="dossier-hero-identity">
            <p className="crowdrisk-kicker">{copy.stockOverview}</p>
            <h2>{companyDisplayName}</h2>
            <p className="dossier-ticker-line">{tickerLine}</p>
            <div className="dossier-hero-pills">
              {researchStateDisplay && <span>{researchStateDisplay}</span>}
              {industryTheme && <span>{formatLabel(industryTheme, locale)}</span>}
            </div>
          </div>

          <p className="dossier-profile-line">{stockOverviewProfileLine}</p>

          <div className="dossier-hero-read" aria-label={`${ticker} executive summary`}>
            <span>{copy.finalRead}</span>
            <strong>{renderedVerdict.verdict}</strong>
            <p>{valuationGate}. {breakPoint}</p>
          </div>

          {marketSnapshot && (
            <div className="dossier-market-strip" aria-label={`${ticker} market snapshot`}>
              {Object.entries(marketSnapshot).map(([key, value]) => (
                <div key={key}>
                  <span>{formatLabel(key, locale)}</span>
                  <strong>{value}</strong>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="dossier-snapshot-board" aria-label={`${ticker} dossier snapshot`}>
          <p className="crowdrisk-kicker">{copy.atGlance}</p>
          <div className="dossier-snapshot-list">
            {snapshotRows.map((row) => (
              <div key={row.label} className={`dossier-snapshot-row tone-${row.tone}`}>
                <span>{row.label}</span>
                <strong>{row.value}</strong>
              </div>
            ))}
          </div>
          <div className="dossier-market-visuals">
            {sparklinePath && (
              <div className="dossier-mini-chart">
                <div>
                  <span>{copy.priceTrend}</span>
                  <strong>{copy.recentTrend}</strong>
                </div>
                <svg viewBox="0 0 220 74" role="img" aria-label={`${ticker} price trend`}>
                  <path d={sparklinePath} />
                </svg>
              </div>
            )}
            <div className="dossier-radar-panel" aria-label={`${ticker} quick situation map`}>
              <div className="dossier-radar-heading">
                <span>{copy.researchMap}</span>
                <strong>{copy.researchMapBody}</strong>
              </div>
              <div className="dossier-research-bars">
                {radarAxes.map((axis) => (
                  <div key={axis.label} className={`dossier-research-bar tone-${axis.tone}`}>
                    <div>
                      <span>{axis.label}</span>
                      <strong>{axis.value}</strong>
                    </div>
                    <i style={{ '--score': `${clamp(axis.score, 0, 100)}%` }} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="dossier-why-now">
          <span>{copy.whyNow}</span>
          <strong>{renderedVerdict.reason}</strong>
          {renderedVerdict.thesisShift && <p>{renderedVerdict.thesisShift}</p>}
        </div>
      </section>

      {!visualPhaseOne && peerEcosystem && (
        <section className="card dossier-visual-cockpit" aria-label={`${ticker} peer ecosystem`}>
          <div className="dossier-visual-cockpit__grid">
            <PeerEcosystemPanel ecosystem={peerEcosystem} ticker={tickerForSummary} copy={copy} locale={locale} />
          </div>
        </section>
      )}

      {!visualPhaseOne && performanceGrid && (
        <section className="card dossier-visual-cockpit" aria-label={`${ticker} stock performance`}>
          <div className="dossier-visual-cockpit__header">
            <div>
              <p className="crowdrisk-kicker">{copy.marketEvidence}</p>
              <h3>{copy.stockPerformance}</h3>
            </div>
            <span>{performanceGrid.source || copy.returnPending}</span>
          </div>

          <div className="dossier-stock-performance-grid" data-stock-performance-feed-source={stockPerformanceFeedSource}>
            {performanceRows.map((period) => (
              <div key={period.label} className={`dossier-performance-cell tone-${performanceTone(period.value)}`}>
                <span>{period.label}</span>
                <strong>{formatPerformanceReturn(period.value)}</strong>
                <em>{period.note || copy.returnPending}</em>
              </div>
            ))}
          </div>
        </section>
      )}

      {visualPhaseOne && (
        <section id="overview" className="card dossier-visual-cockpit" aria-label={`${ticker} dossier snapshot`}>
          <div className="dossier-visual-cockpit__header">
            <div>
              <p className="crowdrisk-kicker">{copy.tabs[0]?.label || 'Overview'}</p>
              <h3>{copy.snapshot}</h3>
            </div>
            {frontendDossierLabel && <span>{frontendDossierLabel}</span>}
          </div>

          <div className="dossier-visual-cockpit__grid">
            <article className="dossier-cockpit-card">
              <span>{locale === 'zh' ? '公司身份 / 階段' : 'Company identity / stage'}</span>
              <strong>{companyDisplayName}</strong>
              <p>{companyStageDisplay}. {industryTheme ? formatLabel(industryTheme, locale) : frontendEmptyText(locale)}.</p>
            </article>

            <article className="dossier-cockpit-card">
              <span>{copy.businessCore}</span>
              <strong>{valueCoreTypeDisplay}</strong>
              <p>{primaryValueDriverDisplay}</p>
            </article>

            <article className="dossier-cockpit-card dossier-cockpit-card--wide" data-stock-performance-feed-source={stockPerformanceFeedSource}>
              <div className="dossier-cockpit-card__heading">
                <span>{copy.stockPerformance}</span>
                <em>{performanceGrid?.source || copy.returnPending}</em>
              </div>
              <div className="dossier-stock-performance-grid">
                {performanceRows.map((period) => (
                  <div key={period.label} className={`dossier-performance-cell tone-${performanceTone(period.value)}`}>
                    <span>{period.label}</span>
                    <strong>{formatPerformanceReturn(period.value)}</strong>
                    <em>{period.note || copy.returnPending}</em>
                  </div>
                ))}
              </div>
            </article>

            <article className="dossier-cockpit-card">
              <div className="dossier-cockpit-card__heading">
                <span>{copy.signalScreens}</span>
                <em>{copy.screenEvidence}</em>
              </div>
              <div className="dossier-signal-tag-list">
                {signalScreens.map((signal) => (
                  <div key={signal.title} className="dossier-signal-tag">
                    <div>
                      <strong>{signal.title}</strong>
                      <p>{signal.explanation}</p>
                    </div>
                    {signal.evidenceState && <span>{signal.evidenceState}</span>}
                  </div>
                ))}
              </div>
            </article>

            <article className="dossier-cockpit-card">
              <span>{copy.marketEvidence}</span>
              <strong>{localizedStaticLabel(momentumStrengthRead, locale)}</strong>
              <p>{marketEvidenceTitle}</p>
            </article>
          </div>

          <ContextualFaq heading={copy.contextualFaq} title={copy.faqOverviewTitle(ticker)} items={overviewFaq} />
        </section>
      )}

      {(renderedVerdict.support.length > 0 || renderedVerdict.risks.length > 0) && (
        <section id="case-summary" className="card dossier-case-summary" aria-label={`${ticker} verdict summary`}>
          <div>
            <p className="crowdrisk-kicker">{copy.caseSummary}</p>
            <h3>{copy.caseWorking}</h3>
          </div>
          <div className="dossier-verdict-grid">
            {renderedVerdict.support.length > 0 && (
              <div>
                <em>{copy.supportsCase}</em>
                <ul>
                  {renderedVerdict.support.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            )}
            {renderedVerdict.risks.length > 0 && (
              <div>
                <em>{copy.breaksCase}</em>
                <ul>
                  {renderedVerdict.risks.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </section>
      )}

      {dossierProfile && (
        <section id="company-overview" className="dossier-company-overview-card card">
          <div className="dossier-company-overview">
            <p className="crowdrisk-kicker">{copy.companyOverview}</p>
            <h3>{copy.companyOverviewQuestion}</h3>
            <p>{stockOverviewProfileLine}</p>
            <div className="dossier-quick-facts">
              {quickFactsDisplay.map((fact) => (
                <div key={fact.label}>
                  <span>{fact.label}</span>
                  <strong>{fact.value}</strong>
                </div>
              ))}
            </div>
            <div className="dossier-overview-lens-grid">
              <article>
                <span>{copy.howMoney}</span>
                <strong>{stockOverview.theme}</strong>
                <p>{businessEngineSection?.points?.[0] || stockOverviewProfileLine}</p>
              </article>
              <article>
                <span>{copy.customerQuality}</span>
                <strong>{largeCustomerFact?.value || copy.pending}</strong>
                <p>{netRetentionFact?.value ? (locale === 'zh' ? `淨留存率維持在 ${netRetentionFact.value}，所以客戶擴張仍是這份檔案的核心。` : `Net retention remains ${netRetentionFact.value}, so customer expansion stays central to the dossier.`) : (locale === 'zh' ? '客戶質素仍需要留存率、擴張和集中度證據。' : 'Customer quality needs retention, expansion, and concentration evidence.')}</p>
              </article>
              <article>
                <span>{copy.businessQuality}</span>
                <strong>{valuationTopVerdict.businessQuality}</strong>
                <p>{valuationTopVerdict.why}</p>
              </article>
              <article>
                <span>{copy.peerCompetition}</span>
                <strong>{competitivePositionSection?.title || frontendEmptyText(locale)}</strong>
                <p>{competitivePositionSection?.points?.[1] || (locale === 'zh' ? '競爭位置仍需要公司層面的證據支持。' : 'Competition and peer positioning need company-specific coverage.')}</p>
              </article>
            </div>
            {localizedDossierSections.length > 0 && (
              <div className="dossier-profile-section-heading">
                <span>{copy.operatingNotes}</span>
                <strong>{copy.operatingNotesBody}</strong>
              </div>
            )}
            {localizedDossierSections.length > 0 && (
              <div className="dossier-profile-sections">
                {localizedDossierSections.map((section) => (
                  <article key={section.id}>
                    <span>{section.label}</span>
                    <h4>{section.title}</h4>
                    <ul>
                      {section.points.map((point) => (
                        <li key={point}>{point}</li>
                      ))}
                    </ul>
                  </article>
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      <section id="value-core" className="dossier-valuation-core dossier-value-core" style={{ marginBottom: '24px', padding: '18px 0 0 16px' }} aria-label={`${ticker} ${coreSectionLabel.toLowerCase()}`}>
        <div className="dossier-valuation-core__header">
          <div>
            <p className="crowdrisk-kicker">{coreSectionLabel}</p>
            <h3>{coreSectionHeading}</h3>
          </div>
          <div className="dossier-hero-pills">
            {(coverageStatusDisplay || frontendDossierLabel) && <span>{coverageStatusDisplay || frontendDossierLabel}</span>}
          </div>
        </div>

        <div className="dossier-valuation-verdict">
          {coreSectionRows.map((row) => (
            <div key={row.label}>
              <span>{row.label}</span>
              <strong>{row.value}</strong>
            </div>
          ))}
        </div>

        {visualPhaseOne && valueCoreEvidenceItems.length > 0 && (
          <div className="dossier-business-evidence">
            <span>{copy.evidenceToMonitor}</span>
            <div className="dossier-evidence-chip-list">
              {valueCoreEvidenceItems.map((item) => (
                <em key={item}>{item}</em>
              ))}
            </div>
          </div>
        )}

        {visualPhaseOne && <ContextualFaq heading={copy.contextualFaq} title={copy.faqBusinessCoreTitle(ticker)} items={businessCoreFaq} />}
      </section>

      {/* 5b. Fundamentals Summary / Valuation Core */}
      <div id="valuation-core" className="card dossier-valuation-core" style={{ marginBottom: '24px' }}>
        <div className="dossier-valuation-core__header">
          <div>
            <p className="crowdrisk-kicker">{copy.valuationCore}</p>
            <h3>{copy.valuationCoreQuestion}</h3>
          </div>
        </div>

        <div className="dossier-valuation-verdict">
          <div>
            <span>{copy.businessQuality}</span>
            <strong>{valuationTopVerdict.businessQuality}</strong>
          </div>
          <div>
            <span>{locale === 'zh' ? '估值狀態' : 'Valuation State'}</span>
            <strong>{valuationTopVerdict.valuationState}</strong>
          </div>
          <div>
            <span>{locale === 'zh' ? '基準情境支持' : 'Base Case Support'}</span>
            <strong>{valuationTopVerdict.baseCaseSupport}</strong>
          </div>
          <div>
            <span>{locale === 'zh' ? '安全邊際' : 'Margin of Safety'}</span>
            <strong>{valuationTopVerdict.marginOfSafety}</strong>
          </div>
        </div>

        <div className="dossier-valuation-read">
          <strong>{valuationTopVerdict.overallRead}</strong>
          <p>{valuationTopVerdict.why}</p>
        </div>

        {forwardValuationRange && (
          <section className="dossier-forward-valuation-range" aria-label={`${ticker} forward valuation range`}>
            <div className="dossier-forward-range-header">
              <div>
                <span>{copy.forwardValuationRange}</span>
                <h4>{copy.forecastMultiple}</h4>
              </div>
            </div>
            <div className="dossier-forward-fiscal-note">
              <strong>{forwardValuationRange.fiscalYearNote}</strong>
              <span>{forwardValuationRange.fiscalYearEndDisplay}</span>
            </div>
            <div className="dossier-forward-result-grid">
              {forwardRangePrimary.map((item) => (
                <div key={item.label} className={`tone-${item.tone}`}>
                  <span>{item.label}</span>
                  <strong>{item.value}</strong>
                </div>
              ))}
            </div>
            {forwardRangeVisual?.low !== null && forwardRangeVisual?.high !== null && (
              <div className="dossier-forward-range-visual" aria-label={`${ticker} implied valuation range visual`}>
                <div className="dossier-forward-range-visual__head">
                  <div>
                    <span>{copy.valuationMap}</span>
                    <strong>{copy.currentVsRange}</strong>
                  </div>
                  <div>
                    <span>{copy.range}</span>
                    <strong>{formatWholePrice(forwardRangeVisual.low)} - {formatWholePrice(forwardRangeVisual.high)}</strong>
                  </div>
                </div>
                <div
                  className="dossier-forward-value-rail"
                  style={{
                    '--current-marker': forwardRangeVisual.currentPct,
                    '--median-marker': forwardRangeVisual.medianPct
                  }}
                >
                  <i className="marker-current" />
                  <i className="marker-median" />
                </div>
                <div className="dossier-forward-range-legend">
                  <span>{copy.bear} {formatWholePrice(forwardRangeVisual.low)}</span>
                  <span>{copy.current} {formatWholePrice(forwardRangeVisual.current)}</span>
                  <span>{copy.median} {formatWholePrice(forwardRangeVisual.median)}</span>
                  <span>{copy.bull} {formatWholePrice(forwardRangeVisual.high)}</span>
                </div>
              </div>
            )}
            <div className="dossier-forward-detail-layout">
              <dl className="dossier-forward-method-list">
                {forwardMethodRows.map(([label, value]) => (
                  <div key={label}>
                    <dt>{label}</dt>
                    <dd>{value}</dd>
                  </div>
                ))}
              </dl>
              <div className="dossier-forward-range-summary" aria-label={`${ticker} forward valuation inputs`}>
                {forwardRangeInputs.map(([label, value]) => (
                  <div key={label}>
                    <span>{label}</span>
                    <strong>{value}</strong>
                  </div>
                ))}
              </div>
            </div>
            <div className="dossier-forward-scenario-board" aria-label={`${ticker} forward valuation scenario range`}>
              {forwardScenarioCards.map((scenario) => (
                <article key={scenario.label} className={`dossier-forward-scenario-card tone-${scenario.tone}`}>
                  <div className="dossier-forward-scenario-head">
                    <div>
                      <span>{scenario.label}</span>
                      <strong>{formatWholePrice(scenario.impliedPrice)}</strong>
                    </div>
                    <div>
                      <span>3Y IRR</span>
                      <strong>{scenario.irrDisplay}</strong>
                    </div>
                  </div>
                  <div className="dossier-forward-range-rail" aria-hidden="true">
                    <i style={{ '--marker': scenario.marker }} />
                  </div>
                  <dl className="dossier-forward-scenario-facts">
                    <div>
                      <dt>FY2027 / FY2028 model</dt>
                      <dd>{formatBillionValue(scenario.fy27Revenue)} / {formatBillionValue(scenario.fy28Revenue)}</dd>
                    </div>
                    <div>
                      <dt>{copy.revenueGrowth}</dt>
                      <dd>{scenario.revenueGrowth || '—'}</dd>
                    </div>
                    <div>
                      <dt>{copy.appliedMultiple}</dt>
                      <dd>{formatScenarioMultiple(scenario.evRevenueMultiple, 'EV / Rev')} / {formatScenarioMultiple(scenario.evFcfMultiple, 'EV / FCF')}</dd>
                    </div>
                    <div>
                      <dt>{copy.impliedEv}</dt>
                      <dd>{formatBillionValue(scenario.impliedEv)}</dd>
                    </div>
                    <div>
                      <dt>{copy.netCash}</dt>
                      <dd>{formatBillionValue(forwardValuationRange.netCashAdjustment)}</dd>
                    </div>
                    <div>
                      <dt>{copy.equityValue}</dt>
                      <dd>{formatBillionValue(scenario.impliedEquityValue)}</dd>
                    </div>
                    <div>
                      <dt>{copy.upsideDownside}</dt>
                      <dd>{formatScenarioPct(scenario.upsideDownside)}</dd>
                    </div>
                  </dl>
                </article>
              ))}
            </div>
          </section>
        )}

        <div className="dossier-valuation-research-stack">
          {valuationResearchGroups.map((group) => (
            <section key={group.title} className="dossier-valuation-research-block">
              <div>
                <span>{group.title}</span>
                <p>{group.note}</p>
              </div>
              <div className="dossier-valuation-research-metrics">
                {group.metrics.map((metric) => (
                  <div key={`${group.title}-${metric.label}`}>
                    <em>{metric.label}</em>
                    <strong>{metric.value}</strong>
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>

        {valuationCore.coreMetrics.length > 0 && (
          <div className="dossier-valuation-metrics">
            {valuationCore.coreMetrics.map((metric) => (
              <div key={metric.id}>
                <span>{metric.label}</span>
                <strong>{formatValuationMetric(metric)}</strong>
              </div>
            ))}
          </div>
        )}

        <div className="dossier-valuation-judgment">
          <div>
            <h4>{copy.researchJudgment}</h4>
            <ul>
              {valuationResearchJudgment.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <div>
            <h4>{copy.missingEvidence}</h4>
            <ul>
              {valuationMissingEvidence.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>

      </div>

      <div id="momentum" className="card dossier-scenario-card" style={{ marginBottom: '24px' }}>
        <p className="crowdrisk-kicker">{copy.momentum}</p>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
          <h3 style={{ margin: 0 }}>{copy.structureExecution}</h3>
          {(() => {
            const ts = enrichedEventDetail.trend_setup?.technical_setup || {};
            const hasSetup = ts.status && ts.status !== 'unavailable';
            const label = (locale === 'zh' ? ts.status_label_zh : ts.status_label_en) || ts.status_label_en || ts.status_label_zh || ts.daily_action || copy.unavailable;
            return <span className={hasSetup ? 'momentum-setup-badge' : 'crowdrisk-muted'}>{label}</span>;
          })()}
        </div>
        <div className="dossier-scenario-grid" style={{ gridTemplateColumns: '1fr' }}>
          <div>
            {(() => {
              const ts = enrichedEventDetail.trend_setup?.technical_setup || {};
              const hasSetup = ts.status && ts.status !== 'unavailable';
              const sentence = (locale === 'zh' ? ts.setup_sentence_zh : ts.setup_sentence_en) || ts.setup_sentence_en || ts.setup_sentence_zh || copy.noTechnicalSetup;
              return <p className={hasSetup ? '' : 'crowdrisk-muted'}>{sentence}</p>;
            })()}
          </div>
          {momentumStrengthRows.length > 0 && (
            <div className="dossier-momentum-strength-panel" aria-label={`${ticker} momentum strength`}>
              <div className="dossier-momentum-strength-head">
                <span>{copy.strengthRead}</span>
                <strong>{localizedStaticLabel(momentumStrengthRead, locale)}</strong>
              </div>
              <div className="dossier-momentum-strength-grid">
                {momentumStrengthRows.map((row) => (
                  <div key={row.label} className={`tone-${row.tone}`}>
                    <span>{row.label}</span>
                    <strong>{row.value}</strong>
                    {row.detail && <small>{row.detail}</small>}
                  </div>
                ))}
              </div>
            </div>
          )}
          {(() => {
             const ts = enrichedEventDetail.trend_setup?.technical_setup || {};
             const hasSetup = ts.status && ts.status !== 'unavailable';
             if (!hasSetup) return null;

             const breakout = formatTechnicalZone(ts.breakout_area);
             const target = formatTechnicalZone(ts.target_zone);
             const hold = formatTechnicalZone(ts.hold_zone);
             const latestPrice = latestMomentumPrice;
             const breakoutZone = normalizeTechnicalZone(ts.breakout_area);
             const targetZone = normalizeTechnicalZone(ts.target_zone);
             const upsideBase = latestPrice || breakoutZone?.[1];
             const potentialUpside = formatUpsideRange(upsideBase, targetZone);

             const typedSupportLevels = Array.isArray(ts.support_levels) ? ts.support_levels : [];
             const typedResistanceLevels = Array.isArray(ts.resistance_levels) ? ts.resistance_levels : [];
             const typedLevels = [...typedSupportLevels, ...typedResistanceLevels];
             const hasTypedLevels = typedLevels.length > 0;
             const fallbackSupport = shouldShowTechnicalSupport(ts) ? formatTechnicalZone(ts.support_area) : null;
             const fallbackInvalid = !shouldShowTechnicalSupport(ts) ? formatTechnicalPrice(ts.invalid_below) : null;
             const numericLevels = [
               latestPrice,
               ...(breakoutZone || []),
               ...(targetZone || []),
               ...(normalizeTechnicalZone(ts.hold_zone) || []),
               ...typedLevels.map(level => toNumeric(level.price)).filter(value => value !== null),
               toNumeric(ts.invalid_below)
             ].filter(Number.isFinite);
             const visualLow = numericLevels.length ? Math.min(...numericLevels) : null;
             const visualHigh = numericLevels.length ? Math.max(...numericLevels) : null;
             const zonePct = (value) => formatRangeMarkerPct(value, visualLow, visualHigh);
             const breakoutLeft = breakoutZone ? zonePct(breakoutZone[0]) : null;
             const breakoutRight = breakoutZone ? zonePct(breakoutZone[1]) : null;
             const targetLeft = targetZone ? zonePct(targetZone[0]) : null;
             const targetRight = targetZone ? zonePct(targetZone[1]) : null;

             if (!breakout && !target && !hold && !potentialUpside && !hasTypedLevels && !fallbackSupport && !fallbackInvalid) return null;

             return (
               <>
                 {visualLow !== null && visualHigh !== null && visualHigh > visualLow && (
                   <div className="dossier-momentum-zone-visual">
                     <div className="dossier-momentum-zone-head">
                       <span>{copy.executionMap}</span>
                       <strong>{latestPrice ? `${copy.latest} ${formatTechnicalPrice(latestPrice)}` : copy.latestPricePending}</strong>
                     </div>
                     <div
                       className="dossier-momentum-zone-track"
                       style={{
                         '--latest-marker': zonePct(latestPrice),
                         '--breakout-left': breakoutLeft || '0%',
                         '--breakout-width': breakoutLeft && breakoutRight ? `${Math.max(0, parseFloat(breakoutRight) - parseFloat(breakoutLeft)).toFixed(1)}%` : '0%',
                         '--target-left': targetLeft || '0%',
                         '--target-width': targetLeft && targetRight ? `${Math.max(0, parseFloat(targetRight) - parseFloat(targetLeft)).toFixed(1)}%` : '0%'
                       }}
                     >
                       {breakoutZone && <b className="zone-breakout" />}
                       {targetZone && <b className="zone-target" />}
                       {latestPrice && <i />}
                     </div>
                     <div className="dossier-momentum-zone-legend">
                       <span>{formatTechnicalPrice(visualLow)}</span>
                       <span>{copy.breakout}</span>
                       <span>{copy.target}</span>
                       <span>{formatTechnicalPrice(visualHigh)}</span>
                     </div>
                   </div>
                 )}
                 <div className="dossier-market-strip" style={{ marginTop: '16px', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))' }}>
                   {breakout && <div><span>{copy.breakoutArea}</span><strong>{breakout}</strong></div>}
                   {target && <div><span>{copy.targetZone}</span><strong>{target}</strong></div>}
                   {potentialUpside && <div><span>{copy.potentialUpside}</span><strong>{potentialUpside}</strong></div>}
                   {hold && <div><span>{copy.holdZone}</span><strong>{hold}</strong></div>}
                   {hasTypedLevels ? (
                     typedLevels.map((lvl, index) => {
                       // Hide deep context support if we already have a primary execution level
                       if (lvl.display_role === 'deep_context_only' && typedLevels.some(l => l.display_role === 'primary_execution')) {
                         return null;
                       }
                       const formattedPrice = lvl.price ? formatTechnicalPrice(lvl.price) : formatTechnicalZone(lvl.area);
                       return formattedPrice ? (
                         <div key={`${lvl.type}-${lvl.source || 'level'}-${index}`}>
                           <span>{(locale === 'zh' ? lvl.label_zh : lvl.label_en) || lvl.label_en || formatLabel(lvl.type, locale)}</span>
                           <strong>{formattedPrice}</strong>
                         </div>
                       ) : null;
                     })
                   ) : (
                     <>
                       {fallbackSupport && <div><span>{copy.supportArea}</span><strong>{fallbackSupport}</strong></div>}
                       {fallbackInvalid && <div><span>{copy.invalidBelow}</span><strong>{fallbackInvalid}</strong></div>}
                     </>
                   )}
                 </div>
               </>
             );
          })()}
        </div>
      </div>

      <div id="market-evidence" className="card dossier-market-evidence-card" style={{ marginBottom: '24px' }}>
        <p className="crowdrisk-kicker">{copy.marketEvidence}</p>
        <h3>{copy.eventStudyConnection}: {marketEvidenceTitle}</h3>
        {marketEvidenceCards.length > 0 && (
          <div className="dossier-market-visual-grid" aria-label={`${ticker} market evidence visual cards`}>
            {marketEvidenceCards.map((item) => (
              <div key={item.label} className={`tone-${item.tone}`}>
                <span>{item.label}</span>
                <strong>{item.value}</strong>
                <em>{item.note}</em>
              </div>
            ))}
          </div>
        )}
        <div className="dossier-event-study-summary-strip" aria-label={`${ticker} earnings event summary`}>
          <div>
            <span>{copy.measuredQuarters}</span>
            <strong>
              {measuredGapCount ?? <em className="dossier-pending-value">{copy.pending}</em>}
              {eventStudyCoverage?.excluded_count !== undefined && <small>{eventStudyCoverage.excluded_count} excluded</small>}
            </strong>
          </div>
          <div>
            <span>{copy.gapUpRate}</span>
            <strong>
              {formatRatioReturn(eventStudyDigest?.gap_up_rate) || <em className="dossier-pending-value">{copy.pending}</em>}
            </strong>
          </div>
          <SummaryMetric label={copy.postGap3} summary={forwardGapUps?.r_plus_3} countLabel={locale === 'zh' ? '個季度' : 'measured'} />
          <SummaryMetric label={copy.postGap10} summary={forwardGapUps?.r_plus_10} countLabel={locale === 'zh' ? '個季度' : 'measured'} />
          <SummaryMetric label={copy.postGap30} summary={forwardGapUps?.r_plus_30} countLabel={locale === 'zh' ? '個季度' : 'measured'} />
        </div>
        <div className="dossier-event-evidence-visual" aria-label={`${ticker} earnings evidence visual`}>
          {eventEvidenceVisuals.map((item) => (
            <div key={item.label} className={`tone-${item.tone}`}>
              <div>
                <span>{item.label}</span>
                <strong>{item.value}</strong>
              </div>
              <i style={{ '--score': `${item.score}%` }} />
            </div>
          ))}
        </div>
        <div className="dossier-reaction-quality-grid">
          {latestReactionRows.map((row) => (
            <div key={row.label}>
              <span>{row.label}</span>
              <strong>{row.value}</strong>
              <em>{row.note}</em>
            </div>
          ))}
        </div>
        {eventStudyDigest?.summary_line && (
          <p className="dossier-event-study-summary-line">{eventStudyDigest.summary_line}</p>
        )}
        {eventStudyLoading && <p className="dossier-event-study-status">{copy.loadingEarningsSummary}</p>}
        {eventStudyError && <p className="dossier-event-study-status dossier-event-study-status--error">{eventStudyError}</p>}
        <div className="dossier-event-study-detail">
          <div className="dossier-event-study-copy">
            <span>{copy.eventStudyDetail}</span>
            <strong>{eventStudyDetail.title}</strong>
            <p>{eventStudyDetail.interpretation}</p>
            {onOpenEventStudy && (
              <button
                type="button"
                className="dossier-section-link-button"
                onClick={() => onOpenEventStudy(ticker)}
              >
                {copy.openEventStudy(ticker)}
              </button>
            )}
            <ul>
              {marketEvidencePoints.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
          </div>
          <div className="dossier-event-study-board" aria-label={`${ticker} event study evidence`}>
            <div className="dossier-event-study-meta">
              <span>{copy.earningsSummary}</span>
              <strong>
                {measuredGapCount !== null
                  ? `N=${measuredGapCount}`
                  : copy.sampleNotIncluded}
              </strong>
            </div>
            <div className="dossier-event-study-metrics">
              {truthLayerMetrics.map((metric) => (
                <div key={metric.label} className={`tone-${metric.tone}`}>
                  <span>{metric.label}</span>
                  <strong>{metric.value}</strong>
                </div>
              ))}
            </div>
            <ul className="dossier-event-study-notes">
              {[
                eventStudyDigest?.summary_line || copy.gapEvidencePending
              ].map((note) => (
                <li key={note}>{note}</li>
              ))}
            </ul>
          </div>
        </div>
        <ContextualFaq heading={copy.contextualFaq} title={copy.faqMarketEvidenceTitle(ticker)} items={marketEvidenceFaq} />
      </div>

      {valuationScenarios.length > 0 && (
        <div id="scenario-range" className="card dossier-scenario-card">
          <p className="crowdrisk-kicker">{copy.scenarioRange}</p>
          <h3>{copy.scenarioQuestion}</h3>
          <p className="dossier-scenario-model-note">
            {copy.scenarioModelNote}
          </p>
          <div className="dossier-scenario-grid">
            {valuationScenarios.map((scenario) => (
              <div key={scenario.label} className="dossier-scenario-path">
                <span>{scenario.label}</span>
                <p>{scenario.text}</p>
                <dl>
                  <div>
                    <dt>{copy.impliedOutcome}</dt>
                    <dd>{scenario.impliedOutcome || (scenario.label.includes('Bull') ? 'Premium multiple can persist if growth and margins stay exceptional.' : scenario.label.includes('Bear') ? 'Downside becomes valuation-led if growth or dilution evidence worsens.' : 'Expected return is capped unless execution improves faster than the multiple compresses.')}</dd>
                  </div>
                  <div>
                    <dt>{copy.upsideDownside}</dt>
                    <dd>{scenario.upsideDownside || '—'}</dd>
                  </div>
                  <div>
                    <dt>3Y IRR</dt>
                    <dd>{scenario.threeYearIrr || '—'}</dd>
                  </div>
                  <div>
                    <dt>{copy.scenarioTrigger}</dt>
                    <dd>{scenario.trigger || scenario.mustBeTrue || 'Needs updated growth, margin, multiple, and event-follow-through evidence.'}</dd>
                  </div>
                </dl>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 6. Thesis Risk Monitor */}
      <div id="thesis-risk-monitor" className="card dossier-pulse-watch dossier-kill-card" style={{ marginBottom: '24px' }}>
        <p className="crowdrisk-kicker">{copy.thesisRiskMonitor}</p>
        <h3>{copy.mediumTermRiskQuestion}</h3>
        <div className="dossier-risk-monitor-grid">
          <div>
            <span>{copy.fundamentalTriggers}</span>
            <ul>
              {(valuationKillData || killSwitch).map((item, i) => <li key={i}>{item}</li>)}
            </ul>
          </div>
          <div>
            <span>{copy.marketTriggers}</span>
            <ul>
              {priceTrendRisk.map((item, i) => <li key={i}>{item}</li>)}
            </ul>
          </div>
        </div>
      </div>

    </div>
  );
};

export default StockDossierView;
