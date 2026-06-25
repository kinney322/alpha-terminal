import React from 'react';
import {
  buildDossierSummary,
  buildResearchKillSwitch,
  buildPriceTrendRisk,
  buildValuationCore,
  buildStockOverview,
  resolveValueCore
} from './dossierHelpers';
import { getStockDossierProfile } from '../data/stockDossierProfiles';
import { resolveReferencePeerEcosystemSnapshot } from '../data/referencePeerMapAdapter';
import { canonicalizeTicker, getTickerLookupKeys } from '../data/tickerAliases';
import StockLogo from './StockLogo';
import { displayLabel } from './displayLabelHelpers.js';

const API_BASE = 'https://kw-terminal-api.myfootballplaces.workers.dev';

const formatPct = (value) => {
  if (value === undefined || value === null || Number.isNaN(Number(value))) return 'Not Included';
  const n = Number(value);
  return `${n > 0 ? '+' : ''}${n.toFixed(1)}%`;
};

const formatLabel = (value, locale = 'en') => displayLabel(value, locale, locale === 'zh' ? '未納入' : 'Not Included');

const formatValuationMetric = (metric) => {
  if (metric.value === undefined || metric.value === null || Number.isNaN(Number(metric.value))) return 'Pending';
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

const renderStructuredVerdict = (structuredVerdict, fallback) => {
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
  const shiftLine = shift?.from && shift?.to
    ? `The working thesis has shifted from ${thesisStateLabels[shift.from] || formatLabel(shift.from)} to ${thesisStateLabels[shift.to] || formatLabel(shift.to)}: ${shift.reason}`
    : '';

  return {
    reason: `${researchState}: ${marketEvidence.toLowerCase()} evidence keeps this stock on the research queue.`,
    verdict: structuredVerdict.finalRead || fallback.verdict,
    thesisShift: shiftLine,
    support: structuredVerdict.keySupport || [],
    risks: structuredVerdict.keyRisk || []
  };
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
    return <em className="dossier-pending-value">Pending</em>;
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
        <em className="dossier-pending-value">Pending</em>
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
  return metric ? formatValuationMetric(metric) : 'Pending';
};

const marketSnapshotValue = (snapshot, key) => snapshot?.[key] || 'Pending';

const parseDollarValue = (value) => {
  if (value === undefined || value === null) return null;
  const text = String(value).replace(/[$,]/g, '').trim();
  const match = text.match(/-?\d+(\.\d+)?/);
  if (!match) return null;
  const numeric = Number(match[0]);
  return Number.isFinite(numeric) ? numeric : null;
};

const formatBillionValue = (value) => (
  Number.isFinite(Number(value)) ? `$${Number(value).toFixed(1)}B` : 'Pending'
);

const formatBillionRange = (low, high) => {
  if (!Number.isFinite(Number(low)) || !Number.isFinite(Number(high))) return 'Pending';
  return `$${Number(low).toFixed(1)}B-$${Number(high).toFixed(1)}B`;
};

const formatWholePrice = (value) => (
  Number.isFinite(Number(value)) ? `$${Number(value).toFixed(0)}` : 'Pending'
);

const formatWholePriceRange = (low, high) => {
  if (!Number.isFinite(Number(low)) || !Number.isFinite(Number(high))) return 'Pending';
  return `$${Number(low).toFixed(0)}-$${Number(high).toFixed(0)}`;
};

const formatScenarioMultiple = (value, suffix) => (
  Number.isFinite(Number(value)) ? `${Number(value).toFixed(1)}x ${suffix}` : 'Pending'
);

const formatMultipleRange = (low, high, suffix) => {
  if (!Number.isFinite(Number(low)) || !Number.isFinite(Number(high))) return 'Pending';
  return `${Number(low).toFixed(1)}x-${Number(high).toFixed(1)}x ${suffix}`;
};

const formatScenarioPct = (value) => {
  if (value === undefined || value === null || value === '') return 'Pending';
  const numeric = Number(value);
  if (!Number.isFinite(numeric)) return 'Pending';
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
      ? 'Pending: current price or share count is missing.'
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
    fiscalYearNote: range.fiscalYearNote || 'Fiscal-year note: current company guide is FY2026. FY2027 and FY2028 figures below are model assumptions, not live consensus. Datadog fiscal year-end is not verified in the current payload.',
    fiscalYearEndDisplay: range.fiscalYearEnd
      ? `Fiscal Year End: ${range.fiscalYearEnd}`
      : 'Fiscal Year End: Not verified in current payload',
    dataType: range.dataType || 'Model assumption, not live consensus',
    confidence: range.confidence || 'Medium-low until current full consensus model is added',
    missingEvidence: range.missingEvidence || valuationCore.missingEvidence,
    netCashAdjustment,
    currentPrice,
    currentPriceDisplay: currentPrice ? formatWholePrice(currentPrice) : 'Pending: current price missing',
    shareCountBillions,
    shareCountDisplay: shareCountBillions
      ? `${shareCountBillions.toFixed(3)}B ${explicitShareCount ? 'explicit shares' : 'estimated shares from market cap / current price'}`
      : 'Pending: explicit share count missing and market cap / current price unavailable',
    impliedEvRange: formatBillionRange(Math.min(...impliedEvs.filter(Number.isFinite)), Math.max(...impliedEvs.filter(Number.isFinite))),
    impliedEquityValueRange: formatBillionRange(Math.min(...equityValues.filter(Number.isFinite)), Math.max(...equityValues.filter(Number.isFinite))),
    impliedPriceRange: Number.isFinite(rangeLowPrice) && Number.isFinite(rangeHighPrice)
      ? formatWholePriceRange(rangeLowPrice, rangeHighPrice)
      : 'Pending',
    medianPrice,
    medianPriceDisplay: medianPrice !== null ? formatWholePrice(medianPrice) : 'Pending: scenario prices missing',
    medianUpsideDownside,
    medianUpsideDownsideDisplay: medianUpsideDownside !== null ? formatScenarioPct(medianUpsideDownside) : 'Pending: median price or current price missing',
    medianThreeYearIrr,
    medianThreeYearIrrDisplay: medianThreeYearIrr !== null ? formatScenarioPct(medianThreeYearIrr) : 'Pending: median price or current price missing',
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
    { label: 'Trend', value: momentumScore === null ? 'Pending' : `${momentumScore}/100`, score: momentumScore ?? 18, tone: momentumTone },
    { label: 'Strength', value: rsSpy === null ? 'Pending' : formatPct(rsSpy), score: rsSpy === null ? 18 : clamp(50 + rsSpy * 2.2), tone: rsTone },
    { label: 'Long Term', value: smaConstructive === null ? 'Pending' : smaConstructive ? 'Above' : 'Below', score: smaConstructive === null ? 18 : smaConstructive ? 76 : 24, tone: smaConstructive === null ? 'neutral' : smaConstructive ? 'hot' : 'cool' },
    { label: 'Reaction', value: currentPostReturn === null ? 'Pending' : formatPct(currentPostReturn), score: currentPostReturn === null ? 18 : clamp(50 + currentPostReturn * 3), tone: eventTone },
    { label: 'Valuation', value: valuationCore.status === 'available' ? valuationCore.topVerdict.valuationState : 'Pending', score: valueScore, tone: valueTone }
  ];
};

const formatRank = (rank, count) => {
  const numericRank = toNumeric(rank);
  const numericCount = toNumeric(count);
  if (numericRank === null) return 'Pending';
  return numericCount === null ? `#${numericRank}` : `#${numericRank} / ${numericCount}`;
};

const formatPercentile = (value) => {
  const numeric = toNumeric(value);
  if (numeric === null) return 'Pending';
  return `${numeric.toFixed(0)}th percentile`;
};

const formatZScore = (value) => {
  const numeric = toNumeric(value);
  if (numeric === null) return 'Pending';
  return `Z ${numeric.toFixed(2)}`;
};

const formatUpperBandDays = (value) => {
  const numeric = toNumeric(value);
  if (numeric === null) return 'Pending';
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
  if (numeric === null) return 'Not verified';
  return `${numeric > 0 ? '+' : ''}${numeric.toFixed(1)}%`;
};

const performanceTone = (value) => {
  const numeric = toNumeric(value);
  if (numeric === null) return 'pending';
  if (numeric > 0) return 'positive';
  if (numeric < 0) return 'negative';
  return 'neutral';
};

const STOCK_PERFORMANCE_PERIODS = [
  { label: 'Today', key: 'today' },
  { label: '1 Week', key: 'one_week' },
  { label: '1 Month', key: 'one_month' },
  { label: '3 Months', key: 'three_month' },
  { label: '6 Months', key: 'six_month' },
  { label: '1 Year', key: 'one_year' }
];

const buildLiveStockPerformanceGrid = (ticker, fallbackGrid, stockPerformancePayload) => {
  const row = findStockPerformanceRow(stockPerformancePayload, ticker);
  if (!row || typeof row !== 'object' || Array.isArray(row)) {
    return fallbackGrid || null;
  }

  const asOfDate = row.as_of_date || stockPerformancePayload?.meta?.as_of_date || null;
  const asOfLabel = asOfDate ? `as of ${asOfDate}` : 'Return feed available';

  return {
    source: asOfLabel,
    feedSource: 'dedicated',
    periods: STOCK_PERFORMANCE_PERIODS.map((period) => ({
      label: period.label,
      value: toNumeric(row[period.key]),
      note: asOfLabel
    }))
  };
};

const normalizeNotVerified = (value) => {
  if (!value || value === 'Not Included' || value === 'Pending') return 'Not verified';
  return value;
};

const ContextualFaq = ({ title, items }) => {
  if (!Array.isArray(items) || items.length === 0) return null;
  return (
    <div className="dossier-contextual-faq" aria-label={title}>
      <div className="dossier-contextual-faq__heading">
        <span>Contextual FAQ</span>
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
    curated: 'Curated',
    snapshot: 'Snapshot',
    whyNow: 'Why now',
    coreVerdict: 'Dossier core verdict',
    primaryRead: 'Primary read',
    context: 'Context',
    evidenceFocus: 'Evidence focus',
    keyStatistics: 'Key Statistics',
    snapshotMetrics: 'Snapshot metrics',
    executiveHighlights: 'Executive Highlights',
    highlights: 'Highlights',
    stockPerformance: 'Stock Performance',
    returnPending: 'Return feed pending',
    signalScreens: 'Signal Screens / Evidence Tags',
    screenEvidence: 'Screen evidence, not a conclusion',
    marketEvidence: 'Market Evidence',
    evidenceOverview: 'Evidence overview',
    businessCore: 'Business Core',
    businessCoreQuestion: 'What creates company value?',
    evidenceToMonitor: 'Evidence to monitor',
    measuredQuarters: 'Measured quarters',
    gapUpRate: 'Gap-up rate',
    postGap3: 'Post-gap 3D avg',
    postGap10: 'Post-gap 10D avg',
    postGap30: 'Post-gap 30D avg',
    pending: 'Pending',
    notVerified: 'Not verified',
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
    financialHealthPending: 'Financial health needs cash-flow, dilution, and balance-sheet context.',
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
    latestPricePending: 'Latest price pending',
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
    sampleNotIncluded: 'Sample not included',
    gapEvidencePending: 'Verified earnings gap evidence is pending.',
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
    curated: '已整理',
    snapshot: '快照',
    whyNow: '為何現在要看',
    coreVerdict: '檔案核心判斷',
    primaryRead: '主要判斷',
    context: '背景',
    evidenceFocus: '證據焦點',
    keyStatistics: '主要數據',
    snapshotMetrics: '快照指標',
    executiveHighlights: '重點摘要',
    highlights: '摘要',
    stockPerformance: '股價表現',
    returnPending: '回報資料待補',
    signalScreens: '篩選信號 / 證據標籤',
    screenEvidence: '篩選證據，不是結論',
    marketEvidence: '市場證據',
    evidenceOverview: '證據概覽',
    businessCore: '業務核心',
    businessCoreQuestion: '公司價值由甚麼創造？',
    evidenceToMonitor: '需要監察的證據',
    measuredQuarters: '已核實季度',
    gapUpRate: '高開機率',
    postGap3: '高開後 3 日平均',
    postGap10: '高開後 10 日平均',
    postGap30: '高開後 30 日平均',
    pending: '待補',
    notVerified: '未核實',
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
    financialHealthPending: '財務健康需要現金流、攤薄與資產負債表背景。',
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
    operatingNotesBody: '業務引擎、現金流質素與競爭位置',
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
    structureExecution: '結構與執行',
    unavailable: '不可用',
    noTechnicalSetup: '暫無技術結構背景。',
    strengthRead: '強度判斷',
    executionMap: '執行地圖',
    latestPricePending: '最新價格待補',
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
    sampleNotIncluded: '樣本未納入',
    gapEvidencePending: '已核實財報高低開證據待補。',
    scenarioRange: '情境區間',
    scenarioQuestion: '樂觀 / 基準 / 悲觀路徑需要甚麼成立？',
    scenarioModelNote: '引用估值核心的前瞻模型；估值區間與中位回報屬模型推算，不是正式目標價。',
    impliedOutcome: '隱含結果',
    scenarioTrigger: '情境觸發條件',
    thesisRiskMonitor: '論點風險監察',
    mediumTermRiskQuestion: '甚麼會削弱中期檔案判斷？',
    fundamentalTriggers: '基本面風險觸發',
    marketTriggers: '價格 / 市場證據觸發'
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

const DDOG_READTHROUGH_GROUPS = [
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
];

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

const buildReadthroughGroups = (ecosystem, ticker) => {
  const normalizedTicker = normalizeReadthroughTicker(ticker);
  const peerLookup = buildPeerLookup(ecosystem);
  if (normalizedTicker === 'DDOG') {
    return DDOG_READTHROUGH_GROUPS.map((group) => ({
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
      title: 'Peer earnings context',
      signal: 'Sector context',
      peers: fallbackPeers,
      read: 'Use peer earnings, guidance, and price reaction to judge whether the setup is company-specific or sector-wide.',
      strong: 'Strong peer evidence can support demand, sentiment, or valuation context.',
      weak: 'Weak peer evidence can flag sector pressure before the current company reports.'
    }
  ];
};

const ReadthroughGroup = ({ group }) => {
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
          <strong>Strong peer print</strong>
          <span>{group.strong}</span>
        </div>
        <div>
          <strong>Weak peer print</strong>
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

const PeerEcosystemPanel = ({ ecosystem, ticker }) => {
  if (!ecosystem) return null;
  const groups = buildReadthroughGroups(ecosystem, ticker);
  if (!groups.length) return null;

  return (
    <article className="dossier-cockpit-card dossier-cockpit-card--wide dossier-peer-ecosystem-panel">
      <div className="dossier-cockpit-card__heading">
        <span>Peer Readthrough</span>
        <em>Industry context</em>
      </div>
      <p className="dossier-peer-readthrough-subtitle">
        Use peer prints to decide whether {ticker}&apos;s move is sector-wide, demand-led, or company-specific.
      </p>
      <div className="dossier-readthrough-summary">
        <strong>{ticker}</strong>
        <span>{ecosystem.ecosystemName}</span>
        <em>Core lanes: software budget, observability demand, cloud workloads, and share shift.</em>
      </div>
      <div className="dossier-readthrough-insight-grid">
        {groups.map((group) => (
          <ReadthroughGroup key={group.title} group={group} />
        ))}
      </div>
    </article>
  );
};

const PendingDossierPanel = ({ title, subtitle, rows, note }) => (
  <section className="dossier-tab-placeholder" aria-label={title}>
    <div className="dossier-tab-placeholder__head">
      <span>Coverage Pending</span>
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
  const renderedVerdict = renderStructuredVerdict(dossierProfile?.dossierVerdict, {
    reason: dossierProfile?.whyNow?.reason || dossierSummary.reason,
    verdict: dossierProfile?.whyNow?.verdict || dossierSummary.verdict
  });
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
  const eventStudyDetail = buildEventStudyDetail(enrichedEventDetail, dossierProfile);
  const visualPhaseOne = dossierProfile?.visualPhaseOne || null;

  const momentumRanking = findMomentumUniverseRow(payload, tickerForSummary);
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
  const snapshotRows = [
    { label: 'Business Quality', value: valuationCore.topVerdict.businessQuality, tone: valuationCore.topVerdict.businessQuality === 'High' ? 'positive' : 'neutral' },
    { label: 'Valuation', value: valuationCore.topVerdict.valuationState, tone: valuationCore.topVerdict.valuationState.includes('Missing') ? 'warning' : 'neutral' },
    { label: 'Base Case', value: valuationCore.topVerdict.baseCaseSupport, tone: valuationCore.topVerdict.baseCaseSupport === 'Partial' ? 'warning' : 'neutral' },
    { label: 'Margin of Safety', value: valuationCore.topVerdict.marginOfSafety, tone: valuationCore.topVerdict.marginOfSafety === 'None' ? 'warning' : 'neutral' }
  ];
  const radarAxes = buildRadarAxes({ momentum, metrics, valuationCore, eventDetail: enrichedEventDetail });
  const latestMomentumPrice = priceSeries.length
    ? priceSeries[priceSeries.length - 1]
    : resolveLatestTechnicalPrice(enrichedEventDetail, payload, tickerForSummary);
  const momentumScore = toNumeric(momentum.score ?? momentumRanking?.score);
  const zScore = toNumeric(metrics.zscore_200d);
  const upperBandDays = toNumeric(metrics.days_above_upper_band_60d);
  const momentumStrengthRead = momentumScore === null
    ? 'Momentum evidence pending'
    : momentumScore >= 70 && zScore !== null && zScore >= 2.5
      ? 'Strong trend, but extended'
      : momentumScore >= 70
        ? 'Strong trend'
        : momentumScore >= 50
          ? 'Constructive trend'
          : 'Trend needs confirmation';
  const momentumStrengthRows = [
    {
      label: 'Momentum Score',
      value: momentumScore === null ? 'Pending' : `${momentumScore}/100`,
      detail: momentum.regime ? formatLabel(momentum.regime, locale) : formatLabel(momentumRanking?.regime, locale),
      tone: metricTone(momentumScore, 70)
    },
    {
      label: 'Universe Rank',
      value: formatRank(momentum.universe_rank ?? momentumRanking?.rank, momentum.universe_count ?? payload?.momentum_universe?.ranked_count),
      detail: 'Overall scan',
      tone: metricTone(momentumScore, 70)
    },
    {
      label: 'Theme Rank',
      value: formatRank(momentum.theme_rank ?? momentumRanking?.theme_rank),
      detail: displayLabel(momentum.industry_theme_label || momentumRanking?.industry_theme_label, locale, locale === 'zh' ? '主題' : 'Theme'),
      tone: toNumeric(momentum.theme_rank ?? momentumRanking?.theme_rank) === 1 ? 'positive' : 'neutral'
    },
    {
      label: 'Relative Strength',
      value: formatPercentile(momentumRanking?.relative_strength_percentile),
      detail: metrics.relative_strength_vs_spy_63d !== undefined ? `${formatPct(metrics.relative_strength_vs_spy_63d)} vs SPY 63D` : 'Percentile',
      tone: metricTone(momentumRanking?.relative_strength_percentile, 75)
    },
    {
      label: 'Trend Stack',
      value: [
        metrics.price_vs_sma20_pct ?? momentumRanking?.price_vs_sma20_pct,
        metrics.price_vs_sma50_pct ?? momentumRanking?.price_vs_sma50_pct,
        metrics.price_vs_sma200_pct ?? momentumRanking?.price_vs_sma200_pct
      ].map((value) => formatPct(value)).join(' / '),
      detail: 'vs SMA20 / 50 / 200',
      tone: 'positive'
    },
    {
      label: 'Crowding Risk',
      value: `${formatZScore(zScore)} / ${formatUpperBandDays(upperBandDays)}`,
      detail: '200D stretch / upper band',
      tone: zScore !== null && zScore >= 2.5 ? 'warning' : 'neutral'
    }
  ];
  const valuationGate = valuationCore.topVerdict.marginOfSafety === 'None'
    ? 'No margin of safety'
    : valuationCore.topVerdict.valuationState;
  const breakPoint = renderedVerdict.risks[0] || valuationCore.killData?.[0] || 'Needs updated evidence before conclusion changes.';
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
    [locale === 'zh' ? '資料類型' : 'Data type', forwardValuationRange.dataType],
    [locale === 'zh' ? '信心度' : 'Confidence', forwardValuationRange.confidence],
    [copy.missingEvidence, forwardValuationRange.missingEvidence.join('; ')]
  ] : [];
  const forwardRangePrimary = forwardValuationRange ? [
    { label: 'Implied Price Range', value: forwardValuationRange.impliedPriceRange, tone: 'primary' },
    { label: 'Median Price', value: forwardValuationRange.medianPriceDisplay, tone: 'primary' },
    { label: 'Upside / Downside to Median', value: forwardValuationRange.medianUpsideDownsideDisplay, tone: 'secondary' },
    { label: '3Y IRR to Median', value: forwardValuationRange.medianThreeYearIrrDisplay, tone: 'secondary' }
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
      label: 'Gap-up rate',
      value: formatRatioReturn(eventStudyDigest?.gap_up_rate) || 'Pending',
      score: eventStudyDigest?.gap_up_rate !== undefined ? Math.max(0, Math.min(100, Number(eventStudyDigest.gap_up_rate) * 100)) : 0,
      tone: rateToneClass(eventStudyDigest?.gap_up_rate)
    },
    {
      label: 'R+3 avg',
      value: formatRatioReturn(forwardGapUps?.r_plus_3?.avg_return) || 'Pending',
      score: forwardGapUps?.r_plus_3?.avg_return !== undefined ? clamp(50 + Number(forwardGapUps.r_plus_3.avg_return) * 180, 0, 100) : 0,
      tone: returnToneClass(forwardGapUps?.r_plus_3?.avg_return)
    },
    {
      label: 'R+10 avg',
      value: formatRatioReturn(forwardGapUps?.r_plus_10?.avg_return) || 'Pending',
      score: forwardGapUps?.r_plus_10?.avg_return !== undefined ? clamp(50 + Number(forwardGapUps.r_plus_10.avg_return) * 180, 0, 100) : 0,
      tone: returnToneClass(forwardGapUps?.r_plus_10?.avg_return)
    },
    {
      label: 'R+30 avg',
      value: formatRatioReturn(forwardGapUps?.r_plus_30?.avg_return) || 'Pending',
      score: forwardGapUps?.r_plus_30?.avg_return !== undefined ? clamp(50 + Number(forwardGapUps.r_plus_30.avg_return) * 180, 0, 100) : 0,
      tone: returnToneClass(forwardGapUps?.r_plus_30?.avg_return)
    }
  ];
  const latestReactionRows = [
    {
      label: 'Latest reaction',
      value: formatPct(enrichedEventDetail.pead_signal?.reaction?.t1_return),
      note: enrichedEventDetail.pead_signal?.direction || 'Direction pending'
    },
    {
      label: 'Current post-return',
      value: formatPct(enrichedEventDetail.pead_signal?.reaction?.current_post_return),
      note: 'Follow-through since the event'
    },
    {
      label: 'Volume / reaction quality',
      value: enrichedEventDetail.pead_signal?.reaction_quality || enrichedEventDetail.pead_signal?.volume_quality || 'Pending',
      note: 'Needs confirmed volume evidence'
    }
  ];
  const businessEvidenceQuality = valueCore.coverageStatus
    ? `${valueCore.evidenceQuality} / ${valueCore.coverageStatus}`
    : valueCore.evidenceQuality;
  const businessCoreRows = [
    { label: 'Type', value: valueCore.valueCoreType },
    { label: 'Stage', value: valueCore.companyStage },
    { label: 'Primary Driver', value: valueCore.primaryValueDriver },
    { label: 'Thesis Break Trigger', value: valueCore.thesisBreakTrigger },
    { label: 'Evidence Quality', value: businessEvidenceQuality },
    { label: 'Coverage', value: valueCore.frontendLabel }
  ];
  const legacyValueCoreRows = [
    { label: 'Value Core Type', value: valueCore.valueCoreType },
    { label: 'Company Stage', value: valueCore.companyStage },
    { label: 'Primary Driver', value: valueCore.primaryValueDriver },
    { label: 'Break Trigger', value: valueCore.thesisBreakTrigger },
    { label: 'Evidence Quality', value: valueCore.evidenceQuality },
    { label: 'Coverage', value: valueCore.frontendLabel }
  ];
  const performanceGrid = buildLiveStockPerformanceGrid(tickerForSummary, visualPhaseOne?.performanceGrid, stockPerformancePayload);
  const peerEcosystem = resolveReferencePeerEcosystemSnapshot(referencePeerMapPayload, tickerForSummary);
  const performanceRows = performanceGrid?.periods || [];
  const stockPerformanceFeedSource = performanceGrid?.feedSource === 'dedicated'
    ? 'dedicated'
    : 'fallback';
  const signalScreens = visualPhaseOne?.signalScreens || [];
  const overviewFaq = visualPhaseOne?.faq?.overview || [];
  const businessCoreFaq = visualPhaseOne?.faq?.businessCore || [];
  const marketEvidenceFaq = visualPhaseOne?.faq?.marketEvidence || [];
  const valuationFaq = visualPhaseOne?.faq?.valuation || [];
  const thesisRiskFaq = visualPhaseOne?.faq?.thesisRisk || [];
  const financialHealthFaq = visualPhaseOne?.faq?.financialHealth || [];
  const phaseTwo = visualPhaseOne?.phaseTwo || {};
  const coreSectionLabel = visualPhaseOne ? 'Business Core' : 'Value Core';
  const coreSectionHeading = visualPhaseOne ? 'What creates company value?' : 'What drives company value?';
  const coreSectionRows = visualPhaseOne ? businessCoreRows : legacyValueCoreRows;
  const marketEvidenceCards = visualPhaseOne ? [
    {
      label: 'Trend / momentum',
      value: momentumScore === null ? 'Not verified' : `${momentumScore}/100`,
      note: momentumStrengthRead,
      tone: metricTone(momentumScore, 70)
    },
    {
      label: 'Post-earnings reaction',
      value: normalizeNotVerified(formatPct(enrichedEventDetail.pead_signal?.reaction?.current_post_return)),
      note: 'Follow-through evidence',
      tone: metricTone(enrichedEventDetail.pead_signal?.reaction?.current_post_return, 0)
    },
    {
      label: 'Relative strength',
      value: momentumRanking?.relative_strength_percentile !== undefined ? formatPercentile(momentumRanking.relative_strength_percentile) : 'Not verified',
      note: metrics.relative_strength_vs_spy_63d !== undefined ? `${formatPct(metrics.relative_strength_vs_spy_63d)} vs SPY 63D` : 'Relative-strength feed pending',
      tone: metricTone(momentumRanking?.relative_strength_percentile, 75)
    },
    {
      label: 'Evidence freshness',
      value: dossierProfile?.analysisDate || 'Not verified',
      note: dossierProfile?.latestFiscalPeriod || 'Latest period pending',
      tone: 'neutral'
    }
  ] : [];
  const truthLayerMetrics = eventStudyDigest ? [
    { label: 'Gap-up Rate', value: formatRatioReturn(eventStudyDigest.gap_up_rate) || 'Pending', tone: rateToneClass(eventStudyDigest.gap_up_rate) },
    { label: 'Avg Gap Up', value: formatRatioReturn(eventStudyDigest.average_gap_up) || 'Pending', tone: returnToneClass(eventStudyDigest.average_gap_up) },
    { label: 'Avg Gap Down', value: formatRatioReturn(eventStudyDigest.average_gap_down) || 'Pending', tone: returnToneClass(eventStudyDigest.average_gap_down) },
    { label: 'Measured Gaps', value: measuredGapCount !== null ? `N=${measuredGapCount}` : 'Pending', tone: 'neutral' }
  ] : [
    { label: 'Gap-up Rate', value: 'Pending', tone: 'neutral' },
    { label: 'Avg Gap Up', value: 'Pending', tone: 'neutral' },
    { label: 'Avg Gap Down', value: 'Pending', tone: 'neutral' },
    { label: 'Measured Gaps', value: 'Pending', tone: 'neutral' }
  ];

  if (visualPhaseOne) {
    const valuationTab = phaseTwo.valuation || {};
    const valuationMetricCards = valuationTab.metricCards || [
      { label: 'Business Quality', value: valuationCore.topVerdict.businessQuality, note: 'Current curated read' },
      { label: 'Valuation', value: valuationCore.topVerdict.valuationState, note: 'Valuation state' },
      { label: 'Base Case', value: valuationCore.topVerdict.baseCaseSupport, note: 'Evidence status' },
      { label: 'Margin of Safety', value: valuationCore.topVerdict.marginOfSafety, note: 'Risk cushion' }
    ];
    const isPeerMapVerified = peerEcosystem?.source === 'live_reference_peer_map';
    const valuationTensionCards = (valuationTab.tensionCards || [
      { title: 'Growth vs multiple', state: 'Coverage pending', text: valuationCore.topVerdict.why },
      { title: 'Evidence gap', state: 'Not verified', text: valuationCore.missingEvidence.join('; ') || 'Missing evidence pending.' }
    ]).map((card) => {
      if (String(card.title || '').toLowerCase().includes('peer')) {
        return {
          ...card,
          state: isPeerMapVerified ? 'Live reference context' : 'Not verified',
          text: isPeerMapVerified
            ? 'Reference peer ecosystem context loaded successfully from reference peer map feed.'
            : card.text
        };
      }
      return card;
    });
    const valuationChecklist = valuationTab.checklist || valuationCore.researchJudgment;
    const thesisRiskTab = phaseTwo.thesisRisk || {};
    const thesisRiskMap = thesisRiskTab.riskMap || (renderedVerdict.risks.length ? renderedVerdict.risks : [
      'Risk monitor needs curated trigger thresholds before full tab release.'
    ]).slice(0, 4).map((risk, index) => ({
      label: `Risk ${index + 1}`,
      severity: index === 0 ? 'High' : 'Medium',
      watch: risk
    }));
    const thesisRiskEvidence = thesisRiskTab.evidenceNeeded || valueCore.evidenceNeeded;
    const financialHealthMetrics = valuationResearchGroups
      .find(group => group.title === 'Financial Health')?.metrics || [];
    const financialHealthTab = phaseTwo.financialHealth || {};
    const financialHealthMetricCards = financialHealthTab.metricCards || (financialHealthMetrics.length ? financialHealthMetrics : [
      { label: 'Cash + Securities', value: 'Not verified' },
      { label: 'Debt / Equity', value: 'Not verified' },
      { label: 'FCF Margin', value: 'Not verified' },
      { label: 'SBC / Revenue', value: 'Not verified' }
    ]).map((metric) => ({
      label: metric.label,
      value: metric.value,
      note: metric.note || 'Financial health evidence'
    }));
    const financialQualityCards = financialHealthTab.qualityCards || [
      { title: 'Quality of growth', state: 'Coverage pending', text: financialHealthTab.qualityRead || 'Growth quality needs cash-flow and dilution context.' }
    ];
    const overviewKeyStatistics = [
      {
        label: 'Current Price',
        value: marketSnapshotValue(marketSnapshot, 'currentPrice'),
        note: 'Latest market snapshot'
      },
      {
        label: 'Market Cap',
        value: marketSnapshotValue(marketSnapshot, 'marketCap'),
        note: liveCapitalization?.sharesOutstandingAsOf
          ? `Shares as of ${liveCapitalization.sharesOutstandingAsOf}`
          : 'Equity value'
      },
      {
        label: 'EV / Revenue',
        value: valuationMetricValue(valuationCore, 'ev_revenue'),
        note: 'Valuation multiple'
      },
      {
        label: 'Revenue Growth',
        value: valuationMetricValue(valuationCore, 'revenue_growth'),
        note: dossierProfile?.latestFiscalPeriod || 'Latest verified period'
      },
      {
        label: 'FCF Margin',
        value: valuationMetricValue(valuationCore, 'fcf_margin'),
        note: 'Cash-flow quality'
      },
      {
        label: 'Relative Strength',
        value: formatPercentile(momentumRanking?.relative_strength_percentile),
        note: metrics.relative_strength_vs_spy_63d !== undefined ? `${formatPct(metrics.relative_strength_vs_spy_63d)} vs SPY 63D` : 'Percentile'
      }
    ];
    const overviewMarketEvidenceRows = marketEvidenceCards.slice(0, 4);
    const overviewSignalChips = signalScreens.slice(0, 4);
    const overviewHighlightCards = [
      {
        label: 'Business Core',
        value: valueCore.primaryValueDriver,
        state: `${valueCore.valueCoreType} / ${valueCore.companyStage}`,
        note: 'Business engine to verify first.',
        tone: 'positive'
      },
      {
        label: 'Market Evidence',
        value: `Trend: ${momentumStrengthRead}`,
        state: measuredGapCount !== null ? `Event sample N=${measuredGapCount}` : 'Event sample pending',
        note: 'Momentum and event evidence are supportive context, not proof of valuation.',
        tone: momentumScore !== null && momentumScore >= 70 ? 'positive' : 'neutral'
      },
      {
        label: 'Valuation',
        value: valuationCore.topVerdict.valuationState,
        state: `Margin of safety: ${valuationCore.topVerdict.marginOfSafety}`,
        note: 'Valuation pressure remains high.',
        tone: 'warning'
      },
      {
        label: 'Thesis Risk',
        value: valueCore.thesisBreakTrigger,
        state: 'Break trigger monitor',
        note: 'Track whether business durability evidence weakens.',
        tone: 'warning'
      },
      {
        label: 'Financial Health',
        value: `${valuationMetricValue(valuationCore, 'revenue_growth')} revenue growth / ${valuationMetricValue(valuationCore, 'fcf_margin')} FCF margin`,
        state: `Cash + securities ${valuationMetricValue(valuationCore, 'cash_securities')}`,
        note: `SBC / Revenue ${valuationMetricValue(valuationCore, 'sbc_revenue')}`,
        tone: 'neutral'
      }
    ];
    const primaryRead = dossierProfile?.dossierVerdict?.finalRead || valuationCore.topVerdict.overallRead;
    const evidenceFocus = valueCore.evidenceNeeded.slice(0, 3).join(' / ') || 'Evidence checklist pending';

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
              <span>{valueCore.coverageStatus || copy.curated}</span>
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
                    <strong>{dossierProfile?.whyNow?.reason || renderedVerdict.reason}</strong>
                    <p style={{ marginTop: '0.5rem', opacity: 0.9 }}>{dossierProfile?.whyNow?.verdict || renderedVerdict.verdict}</p>
                  </article>

                  <article className="dossier-cockpit-card">
                    <span>{copy.primaryRead}</span>
                    <strong>{primaryRead}</strong>
                    <p>{copy.context}: {researchState}. {locale === 'zh' ? '檢查證據是否仍支持這個判斷。' : 'Check whether evidence still supports this read.'}</p>
                  </article>

                  <article className="dossier-cockpit-card">
                    <span>{copy.evidenceFocus}</span>
                    <strong>{valueCore.valueCoreType}</strong>
                    <p>{evidenceFocus}.</p>
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

                  <PeerEcosystemPanel ecosystem={peerEcosystem} ticker={tickerForSummary} />

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
                    <strong>{momentumStrengthRead}</strong>
                    <p>{marketEvidence.title}</p>
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

                <ContextualFaq title={`${ticker} overview questions`} items={overviewFaq} />
              </section>
            )}

            {activeInternalTab === 'business-core' && (
              <section className="dossier-tab-content" aria-label={`${ticker} Business Core`}>
                <div className="dossier-tab-content__header">
                  <p className="crowdrisk-kicker">{copy.businessCore}</p>
                  <h3>{copy.businessCoreQuestion}</h3>
                </div>
                <div className="dossier-valuation-verdict dossier-business-core-grid">
                  {businessCoreRows.map((row) => (
                    <div key={row.label}>
                      <span>{row.label}</span>
                      <strong>{row.value}</strong>
                    </div>
                  ))}
                </div>
                {valueCore.evidenceNeeded.length > 0 && (
                  <div className="dossier-business-evidence">
                    <span>{copy.evidenceToMonitor}</span>
                    <div className="dossier-evidence-chip-list">
                      {valueCore.evidenceNeeded.map((item) => (
                        <em key={item}>{item}</em>
                      ))}
                    </div>
                  </div>
                )}
                <ContextualFaq title={`${ticker} Business Core questions`} items={businessCoreFaq} />
              </section>
            )}

            {activeInternalTab === 'market-evidence' && (
              <section className="dossier-tab-content" aria-label={`${ticker} Market Evidence`}>
                <div className="dossier-tab-content__header">
                  <p className="crowdrisk-kicker">{copy.marketEvidence}</p>
                  <h3>{marketEvidence.title}</h3>
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
                      <strong>{normalizeNotVerified(row.value)}</strong>
                      <em>{row.note}</em>
                    </div>
                  ))}
                </div>
                <ContextualFaq title={`${ticker} Market Evidence questions`} items={marketEvidenceFaq} />
              </section>
            )}

            {activeInternalTab === 'valuation' && (
              <section className="dossier-tab-content" aria-label={`${ticker} Valuation`}>
                <div className="dossier-tab-content__header">
                  <p className="crowdrisk-kicker">{copy.valuation}</p>
                  <h3>{valuationTab.posture?.title || valuationCore.topVerdict.valuationState}</h3>
                </div>
                <div className="dossier-phase2-lead">
                  <span>{valuationTab.posture?.label || copy.valuationPosture}</span>
                  <strong>{valuationCore.topVerdict.valuationState}</strong>
                  <p>{valuationTab.posture?.note || valuationCore.topVerdict.why}</p>
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
                <ContextualFaq title={`${ticker} Valuation questions`} items={valuationFaq} />
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
                  <p>{thesisRiskTab.lead || valueCore.thesisBreakTrigger}</p>
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
                <ContextualFaq title={`${ticker} Thesis Risk questions`} items={thesisRiskFaq} />
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
                  <p>{financialHealthTab.qualityRead || copy.financialHealthPending}</p>
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
                <ContextualFaq title={`${ticker} Financial Health questions`} items={financialHealthFaq} />
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
              <span>{researchState}</span>
              {industryTheme && <span>{formatLabel(industryTheme, locale)}</span>}
            </div>
          </div>

          <p className="dossier-profile-line">{stockOverview.profileLine}</p>

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
            <PeerEcosystemPanel ecosystem={peerEcosystem} ticker={tickerForSummary} />
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
            <span>{valueCore.frontendLabel}</span>
          </div>

          <div className="dossier-visual-cockpit__grid">
            <article className="dossier-cockpit-card">
              <span>{locale === 'zh' ? '公司身份 / 階段' : 'Company identity / stage'}</span>
              <strong>{companyDisplayName}</strong>
              <p>{valueCore.companyStage}. {industryTheme ? formatLabel(industryTheme, locale) : (locale === 'zh' ? '業務分類待補' : 'Business classification pending')}.</p>
            </article>

            <article className="dossier-cockpit-card">
              <span>{copy.businessCore}</span>
              <strong>{valueCore.valueCoreType}</strong>
              <p>{valueCore.primaryValueDriver}</p>
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
                    <span>{signal.evidenceState}</span>
                  </div>
                ))}
              </div>
            </article>

            <article className="dossier-cockpit-card">
              <span>{copy.marketEvidence}</span>
              <strong>{momentumStrengthRead}</strong>
              <p>{marketEvidence.title}</p>
            </article>
          </div>

          <ContextualFaq title={`${ticker} overview questions`} items={overviewFaq} />
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
            <p>{stockOverview.profileLine}</p>
            <div className="dossier-quick-facts">
              {stockOverview.quickFacts.map((fact) => (
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
                <p>{dossierProfile.sections?.[0]?.points?.[0] || stockOverview.profileLine}</p>
              </article>
              <article>
                <span>{copy.customerQuality}</span>
                <strong>{stockOverview.quickFacts.find(fact => fact.label.includes('$100k'))?.value || stockOverview.quickFacts.find(fact => fact.label.includes('Customer'))?.value || 'Pending'}</strong>
                <p>{stockOverview.quickFacts.find(fact => fact.label.includes('Net Retention'))?.value ? `Net retention remains ${stockOverview.quickFacts.find(fact => fact.label.includes('Net Retention')).value}, so customer expansion stays central to the dossier.` : 'Customer quality needs retention, expansion, and concentration evidence.'}</p>
              </article>
              <article>
                <span>{copy.businessQuality}</span>
                <strong>{valuationCore.topVerdict.businessQuality}</strong>
                <p>{valuationCore.topVerdict.why}</p>
              </article>
              <article>
                <span>{copy.peerCompetition}</span>
                <strong>{dossierProfile.sections?.find(section => section.id === 'competitive-position')?.title || 'Peer context pending'}</strong>
                <p>{dossierProfile.sections?.find(section => section.id === 'competitive-position')?.points?.[1] || 'Competition and peer positioning need company-specific coverage.'}</p>
              </article>
            </div>
            {dossierProfile.sections?.length > 0 && (
              <div className="dossier-profile-section-heading">
                <span>{copy.operatingNotes}</span>
                <strong>{copy.operatingNotesBody}</strong>
              </div>
            )}
            {dossierProfile.sections?.length > 0 && (
              <div className="dossier-profile-sections">
                {dossierProfile.sections.map((section) => (
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
            <span>{valueCore.frontendLabel}</span>
            {valueCore.needsHumanReview && <span>{copy.humanReview}</span>}
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

        {visualPhaseOne && valueCore.evidenceNeeded.length > 0 && (
          <div className="dossier-business-evidence">
            <span>{copy.evidenceToMonitor}</span>
            <div className="dossier-evidence-chip-list">
              {valueCore.evidenceNeeded.map((item) => (
                <em key={item}>{item}</em>
              ))}
            </div>
          </div>
        )}

        {visualPhaseOne && <ContextualFaq title={`${ticker} Business Core questions`} items={businessCoreFaq} />}
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
            <strong>{valuationCore.topVerdict.businessQuality}</strong>
          </div>
          <div>
            <span>{locale === 'zh' ? '估值狀態' : 'Valuation State'}</span>
            <strong>{valuationCore.topVerdict.valuationState}</strong>
          </div>
          <div>
            <span>{locale === 'zh' ? '基準情境支持' : 'Base Case Support'}</span>
            <strong>{valuationCore.topVerdict.baseCaseSupport}</strong>
          </div>
          <div>
            <span>{locale === 'zh' ? '安全邊際' : 'Margin of Safety'}</span>
            <strong>{valuationCore.topVerdict.marginOfSafety}</strong>
          </div>
        </div>

        <div className="dossier-valuation-read">
          <strong>{valuationCore.topVerdict.overallRead}</strong>
          <p>{valuationCore.topVerdict.why}</p>
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
                      <dd>{scenario.revenueGrowth || 'Pending'}</dd>
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
              {valuationCore.researchJudgment.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <div>
            <h4>{copy.missingEvidence}</h4>
            <ul>
              {valuationCore.missingEvidence.map((item) => (
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
                <strong>{momentumStrengthRead}</strong>
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
        <h3>{copy.eventStudyConnection}: {marketEvidence.title}</h3>
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
              {marketEvidence.points.map((point) => (
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
        <ContextualFaq title={`${ticker} Market Evidence questions`} items={marketEvidenceFaq} />
      </div>

      {valuationCore.scenarios && (
        <div id="scenario-range" className="card dossier-scenario-card">
          <p className="crowdrisk-kicker">{copy.scenarioRange}</p>
          <h3>{copy.scenarioQuestion}</h3>
          <p className="dossier-scenario-model-note">
            {copy.scenarioModelNote}
          </p>
          <div className="dossier-scenario-grid">
            {valuationCore.scenarios.map((scenario) => (
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
                    <dd>{scenario.upsideDownside || 'Not modeled in current payload'}</dd>
                  </div>
                  <div>
                    <dt>3Y IRR</dt>
                    <dd>{scenario.threeYearIrr || 'Pending'}</dd>
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
              {(valuationCore.killData || killSwitch).map((item, i) => <li key={i}>{item}</li>)}
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
