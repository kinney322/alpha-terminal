import { getStockDossierProfile } from './stockDossierProfiles.js';
import { resolveReferencePeerEcosystemSnapshot } from './referencePeerMapAdapter.js';
import { resolveAskCrowdRiskCatalogEntry } from './askCrowdRiskAnswerCatalog.js';

const MACRO_TICKERS = new Set(['SPY', 'QQQ']);
const NOT_VERIFIED_EN = 'CrowdRisk cannot answer this with verified data yet.';
const NOT_VERIFIED_ZH = 'CrowdRisk 目前未能用已驗證資料回答這個問題。';
const TICKER_STOPWORDS = new Set([
  'A', 'AN', 'AND', 'ARE', 'AS', 'CAP', 'CHEAP', 'CROWRISK', 'DAY', 'DAYS', 'DO', 'DOES',
  'BREAK', 'EARNINGS', 'EXPENSIVE', 'FOR', 'FROM', 'HOW', 'IN', 'IS', 'MARKET', 'MONTH',
  'MOMENTUM', 'OF', 'OR', 'OUTSTANDING', 'PRICE', 'RANK', 'REASONABLE', 'RETURN', 'RISK',
  'SHARE', 'SHARES', 'TARGET', 'THE', 'THESIS', 'TO', 'VALUATION', 'WEEK', 'WHAT', 'WOULD'
]);

const normalizeTicker = (value) => String(value || '').trim().toUpperCase();

const hasChinese = (value) => /[\u3400-\u9fff]/.test(String(value || ''));

const resolveLanguage = (question, locale = 'en') => {
  if (hasChinese(question)) return 'zh';
  if (String(question || '').trim()) return 'en';
  return locale === 'zh' ? 'zh' : 'en';
};

const notVerifiedText = (language) => (language === 'zh' ? NOT_VERIFIED_ZH : NOT_VERIFIED_EN);

const toFiniteNumber = (value) => {
  const numeric = Number(value);
  return Number.isFinite(numeric) ? numeric : null;
};

const formatCurrency = (value) => {
  const numeric = toFiniteNumber(value);
  if (numeric === null) return null;
  if (Math.abs(numeric) >= 1_000_000_000_000) return `$${(numeric / 1_000_000_000_000).toFixed(1)}T`;
  if (Math.abs(numeric) >= 1_000_000_000) return `$${(numeric / 1_000_000_000).toFixed(1)}B`;
  if (Math.abs(numeric) >= 1_000_000) return `$${(numeric / 1_000_000).toFixed(1)}M`;
  return `$${numeric.toFixed(2)}`;
};

const formatPrice = (value) => {
  const numeric = toFiniteNumber(value);
  if (numeric === null) return null;
  return `$${numeric.toFixed(numeric >= 100 ? 0 : 2)}`;
};

const formatShareCount = (value) => {
  const numeric = toFiniteNumber(value);
  if (numeric === null) return null;
  return Math.round(numeric).toLocaleString('en-US');
};

const formatPercent = (value) => {
  const numeric = toFiniteNumber(value);
  if (numeric === null) return null;
  const scaled = Math.abs(numeric) <= 1 ? numeric * 100 : numeric;
  return `${scaled > 0 ? '+' : ''}${scaled.toFixed(1)}%`;
};

const formatPercentileRank = (value, language = 'en') => {
  const numeric = toFiniteNumber(value);
  if (numeric === null) return null;
  if (language === 'zh') return `第 ${numeric.toFixed(1)} 百分位`;
  return `${numeric.toFixed(1)} percentile rank`;
};

const formatEventDate = (value, language) => {
  const raw = String(value || '');
  const match = raw.match(/^(20\d{2})-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/);
  if (!match) return raw || (language === 'zh' ? '這次' : 'the selected');
  const [, year, month, day] = match;
  if (language === 'zh') return `${year}年${Number(month)}月${Number(day)}日`;
  const date = new Date(`${raw}T00:00:00Z`);
  return new Intl.DateTimeFormat('en-US', { month: 'long', day: 'numeric', year: 'numeric', timeZone: 'UTC' }).format(date);
};

const formatOrdinal = (value) => {
  const number = Number(value);
  if (!Number.isInteger(number)) return String(value);
  const lastTwo = number % 100;
  if (lastTwo >= 11 && lastTwo <= 13) return `${number}th`;
  const last = number % 10;
  if (last === 1) return `${number}st`;
  if (last === 2) return `${number}nd`;
  if (last === 3) return `${number}rd`;
  return `${number}th`;
};

const returnVerb = (value, language) => {
  const numeric = toFiniteNumber(value);
  if (language === 'zh') {
    if (numeric === null) return '變動';
    if (numeric > 0) return '上升';
    if (numeric < 0) return '下跌';
    return '大致持平';
  }
  if (numeric === null) return 'moved';
  if (numeric > 0) return 'rose';
  if (numeric < 0) return 'fell';
  return 'was roughly flat';
};

const formatMoveAmount = (value, displayReturn) => {
  const numeric = toFiniteNumber(value);
  if (numeric !== null && numeric < 0) return String(displayReturn || '').replace(/^-/, '');
  return displayReturn;
};

const timingNarrative = ({ timingLabel, reactionDay, language }) => {
  const reactionDate = formatEventDate(reactionDay, language);
  const normalized = String(timingLabel || '').toLowerCase();
  if (language === 'zh') {
    if (normalized.includes('amc')) return `這次按盤後公布處理，下一個交易日 ${reactionDate} 是首個市場反應日。`;
    if (normalized.includes('bmo')) return `這次按盤前公布處理，${reactionDate} 是首個市場反應日。`;
    return reactionDay ? `首個市場反應日是 ${reactionDate}。` : '首個市場反應日目前未能核實。';
  }
  if (normalized.includes('amc')) return `The release is treated as after the close, so ${reactionDate} is the first market reaction session.`;
  if (normalized.includes('bmo')) return `The release is treated as before the open, so ${reactionDate} is the first market reaction session.`;
  return reactionDay ? `The first market reaction session is ${reactionDate}.` : 'The first market reaction session is not verified.';
};

const ratioToPercent = (value) => {
  const numeric = toFiniteNumber(value);
  if (numeric === null) return null;
  return formatPercent(numeric);
};

const parseDollarValue = (value) => {
  if (typeof value === 'number') return Number.isFinite(value) ? value : null;
  const raw = String(value || '').replace(/[$,\s]/g, '').toUpperCase();
  if (!raw) return null;
  const multiplier = raw.endsWith('T') ? 1_000 : raw.endsWith('B') ? 1 : raw.endsWith('M') ? 0.001 : 1;
  const numeric = Number(raw.replace(/[TBM]$/, ''));
  return Number.isFinite(numeric) ? numeric * multiplier : null;
};

const formatWholePrice = (value) => {
  const numeric = toFiniteNumber(value);
  if (numeric === null) return null;
  return `$${Math.round(numeric).toLocaleString('en-US')}`;
};

const medianNumber = (values) => {
  const nums = values.map(Number).filter(Number.isFinite).sort((a, b) => a - b);
  if (!nums.length) return null;
  const mid = Math.floor(nums.length / 2);
  return nums.length % 2 ? nums[mid] : (nums[mid - 1] + nums[mid]) / 2;
};

const includesAny = (value, terms) => {
  const text = String(value || '').toLowerCase();
  return terms.some((term) => text.includes(term));
};

const resolveExpectationGapFrame = (valuationCore) => {
  const verdict = valuationCore?.topVerdict || {};
  const businessQuality = String(verdict.businessQuality || '').toLowerCase();
  const valuationState = String(verdict.valuationState || '').toLowerCase();
  const baseCaseSupport = String(verdict.baseCaseSupport || '').toLowerCase();
  const marginOfSafety = String(verdict.marginOfSafety || '').toLowerCase();
  const why = String(verdict.why || '').toLowerCase();

  const businessEvidence = includesAny(businessQuality, ['high', 'strong'])
    || includesAny(why, ['executing well', 'strong free-cash-flow', 'revenue growth'])
    ? 'supportive'
    : includesAny(businessQuality, ['low', 'weak'])
      ? 'weakening'
      : 'not_verified';

  const marketExpectation = includesAny(valuationState, ['priced for perfection', 'expensive', 'premium'])
    || includesAny(why, ['already assumes', '16x', '55x', 'durable growth'])
    ? 'demanding'
    : includesAny(valuationState, ['cheap', 'undervalued'])
      ? 'low'
      : 'not_verified';

  const expectationGap = marketExpectation === 'demanding'
    ? (includesAny(baseCaseSupport, ['partial', 'not']) ? 'not_yet_proven_to_exceed' : 'meets_but_not_clearly_exceeds')
    : 'not_verified';

  const valuationTolerance = includesAny(marginOfSafety, ['none'])
    || includesAny(valuationState, ['priced for perfection'])
    ? 'low'
    : includesAny(marginOfSafety, ['high'])
      ? 'high'
      : 'not_verified';

  return {
    businessEvidence,
    marketExpectation,
    expectationGap,
    valuationTolerance
  };
};

const expectationLabel = (value, language) => {
  const labels = {
    supportive: language === 'zh' ? '有支持' : 'supportive',
    weakening: language === 'zh' ? '轉弱' : 'weakening',
    demanding: language === 'zh' ? '要求高' : 'demanding',
    low: language === 'zh' ? '低' : 'low',
    high: language === 'zh' ? '高' : 'high',
    not_yet_proven_to_exceed: language === 'zh' ? '尚未證明超越市場期待' : 'not yet proven to exceed expectations',
    meets_but_not_clearly_exceeds: language === 'zh' ? '符合但未明顯超越期待' : 'meets but not clearly exceeds expectations',
    not_verified: language === 'zh' ? '未驗證' : 'Not verified'
  };
  return labels[value] || labels.not_verified;
};

const expectationFactLabels = (language) => language === 'zh'
  ? {
    businessEvidence: '業務證據',
    marketExpectation: '市場期待',
    expectationGap: '期待差距',
    valuationTolerance: '估值容錯',
    valuationRange: '估值區間',
    median: '中位數'
  }
  : {
    businessEvidence: 'Business evidence',
    marketExpectation: 'Market expectation',
    expectationGap: 'Expectation gap',
    valuationTolerance: 'Valuation tolerance',
    valuationRange: 'Valuation range',
    median: 'Median implied price'
  };

const metricById = (metrics, id) => (metrics || []).find((metric) => metric.id === id);

const formatMetricValue = (metric) => {
  const numeric = toFiniteNumber(metric?.value);
  if (numeric === null) return null;
  if (metric.format === 'percent') return formatPercent(numeric);
  if (metric.format === 'multiple') return `${numeric.toFixed(numeric >= 10 ? 0 : 1)}x`;
  if (metric.format === 'billion') return `$${numeric.toFixed(1)}B`;
  return String(metric.value);
};

const buildExpectationEvidenceLine = (ticker, language, valuationCore) => {
  const revenueGrowth = formatMetricValue(metricById(valuationCore?.coreMetrics, 'revenue_growth'));
  const fcfMargin = formatMetricValue(metricById(valuationCore?.coreMetrics, 'fcf_margin'));
  const evRevenue = formatMetricValue(metricById(valuationCore?.coreMetrics, 'ev_revenue'));
  const evFcf = formatMetricValue(metricById(valuationCore?.coreMetrics, 'ev_fcf'));

  if (language === 'zh') {
    const supportParts = [
      revenueGrowth ? `收入增長 ${revenueGrowth}` : null,
      fcfMargin ? `自由現金流利潤率 ${fcfMargin}` : null
    ].filter(Boolean);
    const expectationParts = [
      evRevenue ? `${evRevenue} FY2026 收入` : null,
      evFcf ? `${evFcf} FY2026 自由現金流` : null
    ].filter(Boolean);
    return `${ticker} 的業務證據仍然有支持${supportParts.length ? `：${supportParts.join('、')}` : ''}；但市場估值${expectationParts.length ? `大約是 ${expectationParts.join(' / ')}` : '已經偏高'}，已經反映多年增長和高現金利潤率的期待。`;
  }

  const supportParts = [
    revenueGrowth ? `revenue growth ${revenueGrowth}` : null,
    fcfMargin ? `FCF margin ${fcfMargin}` : null
  ].filter(Boolean);
  const expectationParts = [
    evRevenue ? `${evRevenue} FY2026 revenue` : null,
    evFcf ? `${evFcf} FY2026 FCF` : null
  ].filter(Boolean);
  return `${ticker}'s business evidence is still supportive${supportParts.length ? `: ${supportParts.join(', ')}` : ''}; but valuation${expectationParts.length ? ` is roughly ${expectationParts.join(' / ')}` : ' is already demanding'}, so the market is already pricing in years of growth and high cash-margin execution.`;
};

const getAvailableTickers = ({ payload, stockPerformancePayload, referencePeerMapPayload }) => new Set([
  ...Object.values(payload?.events_detail || {}).map((detail) => normalizeTicker(detail?.ticker)),
  ...(payload?.momentum_universe?.rankings || []).map((row) => normalizeTicker(row?.ticker)),
  ...Object.keys(stockPerformancePayload?.returns || {}).map(normalizeTicker),
  ...Object.keys(referencePeerMapPayload?.ticker_index || {}).map(normalizeTicker),
].filter(Boolean));

const extractTicker = (question, payloads) => {
  const tokens = String(question || '').toUpperCase().match(/\b[A-Z]{1,6}\b/g) || [];
  const available = getAvailableTickers(payloads);
  return tokens.find((token) => available.has(token) || MACRO_TICKERS.has(token))
    || tokens.find((token) => !TICKER_STOPWORDS.has(token))
    || tokens[0]
    || '';
};

const detectIntent = (question) => {
  return resolveAskCrowdRiskCatalogEntry(question)?.intent || 'coverage_status';
};

export const resolveAskCrowdRiskRequest = ({ question, locale = 'en', payload = null, stockPerformancePayload = null, referencePeerMapPayload = null }) => {
  const language = resolveLanguage(question, locale);
  const payloads = { payload, stockPerformancePayload, referencePeerMapPayload };
  const intent = detectIntent(question);
  const ticker = intent === 'research_queue' ? '' : extractTicker(question, payloads);
  return { language, ticker, intent };
};

const sourceMeta = (feedName, payload) => ({
  feed: feedName,
  generated_at: payload?.meta?.generated_at || null,
  as_of: payload?.meta?.as_of_date || payload?.meta?.last_reviewed_at || null
});

const response = ({ intent, language, ticker, verifiedStatus, source, facts = {}, definitions = {}, lines, factsList = [], action = null, notVerifiedReason = null }) => ({
  intent,
  language,
  ticker,
  verifiedStatus,
  title: ticker ? `${ticker} · ${intent.replace(/_/g, ' ')}` : intent.replace(/_/g, ' '),
  lines,
  factsList,
  action,
  contextPack: {
    intent,
    language,
    ticker,
    verified_status: verifiedStatus,
    source,
    facts,
    definitions,
    not_verified_reason: notVerifiedReason,
    policy: {
      final_investment_decision: false,
      allow_research_judgment: true
    }
  }
});

const buildNotVerified = ({ intent, language, ticker, source = null, reason }) => response({
  intent,
  language,
  ticker,
  verifiedStatus: 'not_verified',
  source,
  notVerifiedReason: reason,
  facts: {},
  lines: language === 'zh'
    ? [
      `${ticker ? `${ticker}：` : ''}${notVerifiedText(language)}`,
      reason || '目前沒有足夠已驗證資料支持這個回答，所以不會用估算補上。'
    ]
    : [
      `${ticker ? `${ticker}: ` : ''}${notVerifiedText(language)}`,
      reason || 'CrowdRisk does not have enough verified data for this answer yet, so it will not fill it in by guessing.'
    ]
});

const tickerFromEventKey = (value) => {
  if (!value) return '';
  if (typeof value === 'string') return normalizeTicker(value.split('-')[0]);
  if (typeof value === 'object') return normalizeTicker(value.ticker || String(value.event_key || '').split('-')[0]);
  return '';
};

const uniqueTickers = (values, limit = 5) => {
  const seen = new Set();
  const tickers = [];
  values.forEach((value) => {
    const ticker = tickerFromEventKey(value);
    if (!ticker || seen.has(ticker)) return;
    seen.add(ticker);
    tickers.push(ticker);
  });
  return tickers.slice(0, limit);
};

const buildResearchQueueAnswer = ({ language, payload }) => {
  const radarLists = payload?.radar_lists || {};
  const preEarnings = radarLists.pre_earnings || {};
  const eventDay = radarLists.event_day || {};
  const postEarnings = radarLists.post_earnings || {};
  const momentum = radarLists.momentum || {};
  const rankings = payload?.momentum_universe?.rankings || [];

  const preNames = uniqueTickers([
    ...(preEarnings.top_opportunities || []),
    ...(preEarnings.near_term_opportunities || []),
    ...(preEarnings.deferred_upcoming || [])
  ], 5);
  const eventDayNames = uniqueTickers([
    ...(eventDay.top_opportunities || []),
    ...(eventDay.watchlist || []),
    ...(eventDay.top_risk_alerts || [])
  ], 5);
  const postNames = uniqueTickers([
    ...(postEarnings.pead_watch || []),
    ...(postEarnings.top_risk_alerts || []),
    ...(postEarnings.trend_pullbacks || [])
  ], 5);
  const momentumNames = uniqueTickers([
    ...(momentum.watch || []),
    ...rankings.map((row) => row?.ticker)
  ], 5);

  const hasAny = preNames.length || eventDayNames.length || postNames.length || momentumNames.length;
  if (!hasAny) {
    return buildNotVerified({
      intent: 'research_queue',
      language,
      ticker: '',
      source: sourceMeta('radar-v1.2-latest', payload),
      reason: language === 'zh'
        ? 'CrowdRisk 目前沒有已核實的研究隊列 payload。'
        : 'CrowdRisk does not currently have a verified research-queue payload.'
    });
  }

  const topLine = [
    eventDayNames.length ? `${language === 'zh' ? '事件當日' : 'Event day'}: ${eventDayNames.join(', ')}` : null,
    postNames.length ? `${language === 'zh' ? '財報後' : 'Post-earnings'}: ${postNames.join(', ')}` : null,
    preNames.length ? `${language === 'zh' ? '財報前' : 'Pre-earnings'}: ${preNames.join(', ')}` : null,
    momentumNames.length ? `${language === 'zh' ? '動能' : 'Momentum'}: ${momentumNames.join(', ')}` : null
  ].filter(Boolean);

  return response({
    intent: 'research_queue',
    language,
    ticker: '',
    verifiedStatus: 'verified',
    source: sourceMeta('radar-v1.2-latest', payload),
    facts: {
      pre_earnings: preNames,
      event_day: eventDayNames,
      post_earnings: postNames,
      momentum: momentumNames,
      momentum_ranked_count: payload?.momentum_universe?.ranked_count || rankings.length || null
    },
    definitions: {
      research_queue: 'Existing CrowdRisk routing context; not a final investment decision.'
    },
    factsList: [
      { label: language === 'zh' ? '事件當日' : 'Event day', value: eventDayNames.length ? eventDayNames.join(', ') : 'None' },
      { label: language === 'zh' ? '財報後' : 'Post-earnings', value: postNames.length ? postNames.join(', ') : 'None' },
      { label: language === 'zh' ? '財報前' : 'Pre-earnings', value: preNames.length ? preNames.join(', ') : 'None' },
      { label: language === 'zh' ? '動能排名' : 'Momentum ranks', value: String(payload?.momentum_universe?.ranked_count || rankings.length || 0) }
    ],
    lines: language === 'zh'
      ? [
        `今日 CrowdRisk 研究隊列可以先看：${topLine.join('；')}。`,
        '白話講，這是用現有 radar / momentum feed 做研究路由，幫你決定先打開哪些股票檔案。',
        '這不是最終買賣決定。'
      ]
      : [
        `Today's CrowdRisk research queue starts with: ${topLine.join('; ')}.`,
        'Plainly, this is research routing from the existing radar / momentum feeds, meant to decide what to inspect first.',
        'This is not a final investment decision.'
      ],
    action: { type: 'open_momentum', label: language === 'zh' ? '打開動能宇宙' : 'Open Momentum Universe' }
  });
};

const buildPeerEcosystemAnswer = ({ ticker, language, referencePeerMapPayload }) => {
  const ecosystem = resolveReferencePeerEcosystemSnapshot(referencePeerMapPayload, ticker);
  if (!ecosystem) {
    return buildNotVerified({
      intent: 'peer_ecosystem',
      language,
      ticker,
      source: sourceMeta('reference-peer-map-latest', referencePeerMapPayload),
      reason: language === 'zh'
        ? 'CrowdRisk 目前沒有這個 ticker 的已核實產業鏈 / 同行資料。'
        : 'CrowdRisk does not currently have verified ecosystem or peer context for this ticker.'
    });
  }

  const covered = (ecosystem.activeCoverage || []).map((peer) => peer.ticker).filter(Boolean);
  const referenceOnly = (ecosystem.referencePeers || []).map((peer) => peer.ticker).filter(Boolean);
  const candidates = (ecosystem.candidateAdditions || []).map((peer) => peer.ticker).filter(Boolean);

  return response({
    intent: 'peer_ecosystem',
    language,
    ticker,
    verifiedStatus: 'verified',
    source: sourceMeta('reference-peer-map-latest', referencePeerMapPayload),
    facts: {
      ecosystem_name: ecosystem.ecosystemName,
      covered_ecosystem: covered,
      direct_reference_peers: referenceOnly,
      candidate_to_add: candidates
    },
    definitions: {
      covered_ecosystem: 'Company names already covered by CrowdRisk.',
      direct_reference_peers: 'Comparison names for peer and ecosystem context.'
    },
    factsList: [
      { label: language === 'zh' ? '產業鏈' : 'Ecosystem', value: ecosystem.ecosystemName },
      { label: language === 'zh' ? 'Covered Ecosystem' : 'Covered Ecosystem', value: covered.length ? covered.join(', ') : 'None' },
      { label: language === 'zh' ? 'Direct / Reference Peers' : 'Direct / Reference Peers', value: referenceOnly.length ? referenceOnly.join(', ') : 'None' }
    ],
    lines: language === 'zh'
      ? [
        `${ticker} 在 CrowdRisk 的產業鏈位置是：${ecosystem.ecosystemName}。`,
        covered.length ? `Covered Ecosystem，即已納入 CrowdRisk 的相關公司，包括：${covered.join(', ')}。` : '目前沒有其他已納入 CrowdRisk 的相關公司。',
        referenceOnly.length ? `Direct / Reference Peers，即用來比較的直接或參考同行，包括：${referenceOnly.join(', ')}。這些名字只作產業鏈對照，不代表已經有股票檔案、市值覆蓋或完整研究資料。` : '目前沒有已核實的直接或參考同行資料。',
        candidates.length ? `候選但未納入的公司包括：${candidates.join(', ')}。要加入 CrowdRisk 名單，需要另行批准和資料覆蓋。` : '目前沒有候選但未納入的公司。'
      ]
      : [
        `${ticker} sits in CrowdRisk's ${ecosystem.ecosystemName}.`,
        covered.length ? `Covered Ecosystem, meaning related names already covered by CrowdRisk: ${covered.join(', ')}.` : 'No other covered ecosystem names are available.',
        referenceOnly.length ? `Direct / Reference Peers, meaning comparison names for peer and ecosystem context: ${referenceOnly.join(', ')}. These names do not automatically have Stock Dossiers, market-cap coverage, or full research coverage.` : 'No verified direct or reference peer context is available.',
        candidates.length ? `Candidate names not yet included: ${candidates.join(', ')}. Adding them to CrowdRisk requires separate approval and data coverage.` : 'No candidate names are listed.'
      ],
    action: { type: 'open_dossier', label: language === 'zh' ? '打開股票檔案' : 'Open Dossier' }
  });
};

const buildCoverageStatusAnswer = ({ ticker, language, payload, stockPerformancePayload, referencePeerMapPayload }) => {
  if (MACRO_TICKERS.has(ticker)) {
    return response({
      intent: 'coverage_status',
      language,
      ticker,
      verifiedStatus: 'verified',
      source: { feed: 'CrowdRisk macro instrument rule' },
      facts: { status: 'macro_instrument' },
      factsList: [{ label: language === 'zh' ? '狀態' : 'Status', value: 'Macro instrument' }],
      lines: language === 'zh'
        ? [`${ticker} 是 macro instrument，不是 company Stock Dossier coverage。`, '它可以用作市場 / benchmark context，但不應當成公司 peer-map ticker。']
        : [`${ticker} is a macro instrument, not company Stock Dossier coverage.`, 'It can be used as market / benchmark context, but should not be treated as a company peer-map ticker.']
    });
  }

  const entries = referencePeerMapPayload?.ticker_index?.[ticker] || [];
  const relationships = entries.map((entry) => entry.relationship).filter(Boolean);
  const isMomentum = (payload?.momentum_universe?.rankings || []).some((row) => normalizeTicker(row?.ticker) === ticker);
  const hasReturns = Boolean(stockPerformancePayload?.returns?.[ticker]);

  if (relationships.includes('active_universe') || isMomentum || hasReturns) {
    return response({
      intent: 'coverage_status',
      language,
      ticker,
      verifiedStatus: 'verified',
      source: {
        reference_peer_map: sourceMeta('reference-peer-map-latest', referencePeerMapPayload),
        radar: sourceMeta('radar-v1.2-latest', payload),
        stock_performance: sourceMeta('stock-performance-latest', stockPerformancePayload)
      },
      facts: { relationships, is_momentum_universe: isMomentum, has_stock_performance: hasReturns },
      factsList: [
        { label: language === 'zh' ? '覆蓋狀態' : 'Coverage', value: 'Covered by CrowdRisk' },
        { label: language === 'zh' ? '回報資料' : 'Return data', value: hasReturns ? 'Available' : 'Not verified' }
      ],
      lines: language === 'zh'
        ? [`${ticker} 已納入 CrowdRisk 公司覆蓋。`, '如果相關資料可用，它可以出現在股票檔案、動能名單或股價走勢摘要。']
        : [`${ticker} is covered by CrowdRisk.`, 'When the relevant data is available, it can appear in the Stock Dossier, momentum list, or price-action summary.'],
      action: { type: 'open_dossier', label: language === 'zh' ? '打開股票檔案' : 'Open Dossier' }
    });
  }

  if (relationships.includes('candidate_to_add')) {
    const entry = entries.find((item) => item.relationship === 'candidate_to_add') || {};
    const ecosystemName = entry.ecosystem_name || referencePeerMapPayload?.ecosystems?.[entry.ecosystem_id]?.ecosystem_name;
    return response({
      intent: 'coverage_status',
      language,
      ticker,
      verifiedStatus: 'verified',
      source: sourceMeta('reference-peer-map-latest', referencePeerMapPayload),
      facts: { status: 'candidate_to_add', why_add: entry.why_add, risks: entry.risks || [] },
      factsList: [
        { label: language === 'zh' ? '狀態' : 'Status', value: language === 'zh' ? '候選，未納入' : 'Candidate, not yet included' },
        { label: language === 'zh' ? '產業鏈' : 'Ecosystem', value: ecosystemName || 'Not verified' }
      ],
      lines: language === 'zh'
        ? [
          `${ticker} 目前是候選公司，尚未納入 CrowdRisk 公司覆蓋。`,
          entry.why_add || '它目前只作產業鏈候選對照。',
          '要正式加入，仍需要 BOSS 批准、納入名單、股數 / 市值資料覆蓋、資料驗證、發布和前端檢查。'
        ]
        : [
          `${ticker} is a candidate name, not yet covered by CrowdRisk.`,
          entry.why_add || 'It is currently only candidate context for ecosystem comparison.',
          'Adding it requires BOSS approval, list inclusion, shares / market-cap coverage, data verification, publication, and frontend checks.'
        ]
    });
  }

  if (relationships.includes('reference_only')) {
    return response({
      intent: 'coverage_status',
      language,
      ticker,
      verifiedStatus: 'verified',
      source: sourceMeta('reference-peer-map-latest', referencePeerMapPayload),
      facts: { status: 'reference_only' },
      factsList: [{ label: language === 'zh' ? '狀態' : 'Status', value: 'Reference only' }],
      lines: language === 'zh'
        ? [`${ticker} 目前只作參考同行。`, '它可以幫助解釋產業鏈位置，但不代表已經納入 CrowdRisk 公司覆蓋，也不代表已有股票檔案或市值覆蓋。']
        : [`${ticker} is currently a reference peer only.`, 'It helps explain ecosystem context, but it is not covered by CrowdRisk and does not imply Stock Dossier or market-cap coverage.']
    });
  }

  return buildNotVerified({
    intent: 'coverage_status',
    language,
    ticker,
    reason: language === 'zh'
      ? 'CrowdRisk 目前沒有這個 ticker 的 active / reference / candidate coverage 狀態。'
      : 'CrowdRisk does not currently have active / reference / candidate coverage status for this ticker.'
  });
};

const firstFaqAnswer = (profile, group, matcher) => {
  const rows = profile?.visualPhaseOne?.faq?.[group] || [];
  return rows.find((item) => matcher(String(item?.question || '').toLowerCase()))?.answer || null;
};

const sentenceAfterName = (name) => (String(name || '').trim().endsWith('.') ? '' : '.');

const localizedBusinessOverview = ({ ticker, profile, overview, faqAnswer, language }) => {
  if (language === 'zh' && ticker === 'DDOG') {
    return `${ticker} 是 ${profile.companyName || ticker}。它是一個雲端 observability 和 security software platform，工程和營運團隊用它監察 infrastructure、applications、logs、user experience 和 cloud-security workflows。`;
  }
  if (language === 'zh') return `${ticker} 是 ${profile.companyName || ticker}。${overview || faqAnswer}`;
  return `${ticker} is ${profile.companyName || ticker}${sentenceAfterName(profile.companyName)} ${overview || faqAnswer}`;
};

const localizedThesisBreakTrigger = ({ ticker, breakTrigger, language }) => {
  if (language === 'zh' && ticker === 'DDOG') {
    return 'NRR 轉差、大客戶增長放慢，或者 FCF margin 持續受壓。';
  }
  return breakTrigger;
};

const localizedRiskWatch = ({ ticker, item, language }) => {
  if (language !== 'zh' || ticker !== 'DDOG') return `${item.label}：${item.watch}`;
  const map = {
    'Growth deceleration': '收入增長放慢：收入增長跌穿 25% 或 RPO 支撐變弱',
    'Margin / efficiency': '利潤率 / 效率：FCF margin 跌穿 25% 或 SBC 持續偏高',
    'Platform breadth': '平台廣度：大客戶擴張或多產品 adoption 放慢',
    'AI / cloud spend sensitivity': 'AI / cloud spending 敏感度：雲端成本優化令 workload 擴張訊號轉弱'
  };
  return map[item.label] || `${item.label}：${item.watch}`;
};

const buildBusinessSummaryAnswer = ({ ticker, language }) => {
  const profile = getStockDossierProfile(ticker);
  const overview = profile?.overview;
  const valueCore = profile?.valueCore || {};
  const quickFacts = profile?.quickFacts || [];
  const businessModel = quickFacts.find((item) => item.label === 'Business Model')?.value || null;
  const customerBase = quickFacts.find((item) => item.label === 'Customer Base')?.value || null;
  const largeCustomers = quickFacts.find((item) => item.label === '$100k+ ARR Customers')?.value || null;
  const nrr = quickFacts.find((item) => item.label === 'Net Retention')?.value || null;
  const faqAnswer = firstFaqAnswer(profile, 'overview', (question) => question.includes('what does'));

  if (!profile || (!overview && !faqAnswer)) {
    return buildNotVerified({
      intent: 'business_summary',
      language,
      ticker,
      source: { feed: 'stockDossierProfiles.js' },
      reason: language === 'zh'
        ? 'CrowdRisk 目前沒有這隻股票的已核實 business summary。'
        : 'CrowdRisk does not currently have a verified business summary for this ticker.'
    });
  }

  const evidenceFocus = (valueCore.evidence_needed || []).slice(0, 4);

  return response({
    intent: 'business_summary',
    language,
    ticker,
    verifiedStatus: 'verified',
    source: { feed: 'stockDossierProfiles.js', profile: ticker },
    facts: {
      company_name: profile.companyName,
      overview,
      business_model: businessModel,
      company_stage: valueCore.company_stage_candidate || null,
      primary_value_driver: valueCore.primary_value_driver || null,
      customer_base: customerBase,
      large_customers: largeCustomers,
      net_retention: nrr,
      evidence_focus: evidenceFocus
    },
    factsList: [
      { label: language === 'zh' ? '公司' : 'Company', value: profile.companyName || ticker },
      { label: language === 'zh' ? '商業模式' : 'Business model', value: businessModel || 'Not verified' },
      { label: language === 'zh' ? '公司階段' : 'Company stage', value: valueCore.company_stage_candidate || 'Not verified' },
      { label: language === 'zh' ? '主要價值驅動' : 'Primary value driver', value: valueCore.primary_value_driver || 'Not verified' },
      { label: language === 'zh' ? '客戶基礎' : 'Customer base', value: customerBase || 'Not verified' }
    ],
    lines: language === 'zh'
      ? [
        localizedBusinessOverview({ ticker, profile, overview, faqAnswer, language }),
        businessModel ? `CrowdRisk 目前把它看成 ${businessModel}，公司階段是 ${valueCore.company_stage_candidate || '未驗證'}。` : `CrowdRisk 目前的 business model 標籤未完整驗證。`,
        valueCore.primary_value_driver ? `核心要看的是：${valueCore.primary_value_driver}${customerBase ? `；客戶基礎目前標記為 ${customerBase}` : ''}${largeCustomers ? `，$100k+ ARR 客戶資料是 ${largeCustomers}` : ''}${nrr ? `，net retention 是 ${nrr}` : ''}。` : '核心價值驅動目前未完整驗證。',
        evidenceFocus.length ? `要繼續驗證這間公司的質素，應主要看：${evidenceFocus.join('、')}。` : '目前沒有足夠已整理證據清單。',
        '這是業務證據整理，不是最終買賣決定。'
      ]
      : [
        localizedBusinessOverview({ ticker, profile, overview, faqAnswer, language }),
        businessModel ? `CrowdRisk currently frames it as ${businessModel}, with company stage marked as ${valueCore.company_stage_candidate || 'not verified'}.` : 'CrowdRisk does not yet have a complete verified business-model label.',
        valueCore.primary_value_driver ? `The core value driver to monitor is ${valueCore.primary_value_driver}${customerBase ? `; customer base is marked as ${customerBase}` : ''}${largeCustomers ? `, $100k+ ARR customer data is ${largeCustomers}` : ''}${nrr ? `, and net retention is ${nrr}` : ''}.` : 'The primary value driver is not fully verified yet.',
        evidenceFocus.length ? `To keep validating this business read, focus on: ${evidenceFocus.join(', ')}.` : 'CrowdRisk does not yet have a complete evidence checklist.',
        'This is business evidence, not a final investment decision.'
      ],
    action: { type: 'open_dossier', label: language === 'zh' ? '打開股票檔案' : 'Open Dossier' }
  });
};

const buildThesisRiskAnswer = ({ ticker, language }) => {
  const profile = getStockDossierProfile(ticker);
  const valueCore = profile?.valueCore || {};
  const thesisRisk = profile?.visualPhaseOne?.phaseTwo?.thesisRisk || {};
  const breakTrigger = valueCore.thesis_break_trigger || thesisRisk.lead || null;
  const displayedBreakTrigger = localizedThesisBreakTrigger({ ticker, breakTrigger, language });
  const evidenceNeeded = thesisRisk.evidenceNeeded || valueCore.evidence_needed || [];
  const riskMap = thesisRisk.riskMap || [];
  const faqAnswer = firstFaqAnswer(profile, 'thesisRisk', (question) => question.includes('risk') || question.includes('thesis'));

  if (!profile || (!breakTrigger && !riskMap.length && !evidenceNeeded.length)) {
    return buildNotVerified({
      intent: 'thesis_risk',
      language,
      ticker,
      source: { feed: 'stockDossierProfiles.js' },
      reason: language === 'zh'
        ? 'CrowdRisk 目前沒有這隻股票的已核實 thesis-risk 資料。'
        : 'CrowdRisk does not currently have verified thesis-risk data for this ticker.'
    });
  }

  const riskItems = riskMap.slice(0, 4);
  const evidenceItems = evidenceNeeded.slice(0, 5);

  return response({
    intent: 'thesis_risk',
    language,
    ticker,
    verifiedStatus: 'verified',
    source: { feed: 'stockDossierProfiles.js', profile: ticker },
    facts: {
      company_name: profile.companyName,
      thesis_break_trigger: breakTrigger,
      evidence_needed: evidenceItems,
      risk_map: riskItems
    },
    factsList: [
      { label: language === 'zh' ? '打破 thesis 的條件' : 'Break trigger', value: displayedBreakTrigger || 'Not verified' },
      { label: language === 'zh' ? '要監察的證據' : 'Evidence to monitor', value: evidenceItems.length ? evidenceItems.join(', ') : 'Not verified' },
      { label: language === 'zh' ? '風險項目' : 'Risk items', value: riskItems.length ? riskItems.map((item) => item.label).join(', ') : 'Not verified' }
    ],
    lines: language === 'zh'
      ? [
        `${ticker} 的 thesis 主要不是看單日股價，而是看業務耐久度有沒有變差。`,
        displayedBreakTrigger ? `CrowdRisk 目前看到的打破 thesis 條件是：${displayedBreakTrigger}` : (faqAnswer || '目前打破 thesis 的條件未完整驗證。'),
        riskItems.length ? `主要風險監察包括：${riskItems.map((item) => localizedRiskWatch({ ticker, item, language })).join('；')}。` : '目前沒有已整理風險清單。',
        evidenceItems.length ? `要降低這個判斷的風險，需要繼續驗證：${evidenceItems.join('、')}。` : '目前缺少已整理待驗證證據清單。',
        '這是風險和證據框架，不是最終買賣決定。'
      ]
      : [
        `${ticker}'s thesis is not mainly about one trading day. It depends on whether business durability weakens.`,
        breakTrigger ? `CrowdRisk's current break trigger is: ${breakTrigger}.` : (faqAnswer || 'The break trigger is not fully verified yet.'),
        riskItems.length ? `Main risk monitors include: ${riskItems.map((item) => `${item.label}: ${item.watch}`).join('; ')}.` : 'CrowdRisk does not yet have a structured risk map.',
        evidenceItems.length ? `To reduce thesis risk, keep verifying: ${evidenceItems.join(', ')}.` : 'CrowdRisk does not yet have a structured missing-evidence checklist.',
        'This is risk and evidence framing, not a final investment decision.'
      ],
    action: { type: 'open_dossier', label: language === 'zh' ? '打開股票檔案' : 'Open Dossier' }
  });
};

const buildMarketCapAnswer = ({ ticker, language, stockPerformancePayload }) => {
  const row = stockPerformancePayload?.returns?.[ticker];
  const capitalization = row?.capitalization;
  if (!capitalization || capitalization.status !== 'available') {
    return buildNotVerified({
      intent: 'market_cap',
      language,
      ticker,
      source: sourceMeta('stock-performance-latest', stockPerformancePayload),
      reason: language === 'zh'
        ? 'CrowdRisk 目前沒有這隻股票的已核實市值。'
        : 'CrowdRisk does not currently have a verified market cap for this ticker.'
    });
  }
  const marketCap = formatCurrency(capitalization.market_cap);
  if (!marketCap) {
    return buildNotVerified({ intent: 'market_cap', language, ticker, source: sourceMeta('stock-performance-latest', stockPerformancePayload) });
  }
  const latestPriceValue = row?.latest_price ?? row?.price;
  const latestPrice = formatPrice(latestPriceValue);
  const sharesOutstanding = formatShareCount(capitalization.shares_outstanding);
  const sharesAsOf = capitalization.shares_outstanding_as_of || 'Not verified';
  return response({
    intent: 'market_cap',
    language,
    ticker,
    verifiedStatus: 'verified',
    source: sourceMeta('stock-performance-latest', stockPerformancePayload),
    facts: {
      market_cap: capitalization.market_cap,
      latest_price: latestPriceValue,
      shares_outstanding: capitalization.shares_outstanding,
      shares_outstanding_as_of: capitalization.shares_outstanding_as_of
    },
    factsList: [
      { label: language === 'zh' ? '市值' : 'Market cap', value: marketCap },
      { label: language === 'zh' ? '最新價格' : 'Latest price', value: latestPrice || 'Not verified' },
      { label: language === 'zh' ? '已發行股份' : 'Shares outstanding', value: sharesOutstanding || 'Not verified' },
      { label: language === 'zh' ? '股份日期' : 'Shares as of', value: sharesAsOf }
    ],
    lines: language === 'zh'
      ? [
        `${ticker} 的 CrowdRisk 市值目前是 ${marketCap}。`,
        latestPrice && sharesOutstanding
          ? `這個數字是用最新公布價格 ${latestPrice} 乘以已發行股份 ${sharesOutstanding} 股計算。`
          : '最新價格或已發行股份其中一項目前未完整驗證。',
        capitalization.shares_outstanding_as_of ? `已發行股份日期是 ${capitalization.shares_outstanding_as_of}。` : '已發行股份日期目前未驗證。',
        '白話講，股價刷新後，市值會跟隨下一次 CrowdRisk 更新而改變；但已發行股份本身要等公司申報 / SEC 來源 refresh，並不是即時每秒更新。',
        '這是市值資料，不是「便宜 / 昂貴」的估值結論。'
      ]
      : [
        `${ticker}'s CrowdRisk market cap is currently ${marketCap}.`,
        latestPrice && sharesOutstanding
          ? `The figure is calculated from the latest published price of ${latestPrice} multiplied by ${sharesOutstanding} shares outstanding.`
          : 'The latest price or shares outstanding input is not fully verified.',
        capitalization.shares_outstanding_as_of ? `The share count is dated ${capitalization.shares_outstanding_as_of}.` : 'The shares outstanding as-of date is not verified.',
        'Plainly, market cap will move with the next CrowdRisk refresh when price changes; the share count itself refreshes only when company filing / SEC-source data is updated, not second by second.',
        'This is market-cap data, not a cheap-or-expensive valuation conclusion.'
      ],
    action: { type: 'open_dossier', label: language === 'zh' ? '打開股票檔案' : 'Open Dossier' }
  });
};

const PERFORMANCE_PERIODS = [
  {
    id: 'today',
    label: 'Today',
    zhLabel: '今日',
    keys: ['today_return', 'return_today', 'today'],
    enTriggers: ['today', 'daily'],
    zhTriggers: ['今日', '今天', '即日']
  },
  {
    id: '1w',
    label: '1W',
    zhLabel: '一星期',
    keys: ['return_1w', 'one_week_return', 'week_1', 'one_week'],
    enTriggers: ['1w', '1 week', 'one week', 'week'],
    zhTriggers: ['一個星期', '一星期', '一週', '一周', '1週', '1周']
  },
  {
    id: '1m',
    label: '1M',
    zhLabel: '一個月',
    keys: ['return_1m', 'one_month_return', 'month_1', 'one_month'],
    enTriggers: ['1m', '1 month', 'one month', 'month'],
    zhTriggers: ['一個月', '1個月', '一月']
  },
  {
    id: '3m',
    label: '3M',
    zhLabel: '三個月',
    keys: ['return_3m', 'three_month_return', 'month_3', 'three_month'],
    enTriggers: ['3m', '3 month', 'three month'],
    zhTriggers: ['三個月', '3個月']
  },
  {
    id: '6m',
    label: '6M',
    zhLabel: '六個月',
    keys: ['return_6m', 'six_month_return', 'month_6', 'six_month'],
    enTriggers: ['6m', '6 month', 'six month'],
    zhTriggers: ['六個月', '6個月', '半年']
  },
  {
    id: '1y',
    label: '1Y',
    zhLabel: '一年',
    keys: ['return_1y', 'one_year_return', 'year_1', 'one_year'],
    enTriggers: ['1y', '1 year', 'one year', 'year'],
    zhTriggers: ['一年', '1年']
  }
];

const performanceValue = (row, keys) => {
  for (const key of keys) {
    const value = row?.[key];
    if (value !== undefined && value !== null) return value;
  }
  return null;
};

const parseRequestedPerformancePeriods = (question) => {
  const raw = String(question || '');
  const text = raw.toLowerCase();
  const matches = PERFORMANCE_PERIODS.filter((period) => (
    period.enTriggers.some((trigger) => text.includes(trigger))
    || period.zhTriggers.some((trigger) => raw.includes(trigger))
  ));
  return matches;
};

const buildStockPerformanceAnswer = ({ question, ticker, language, stockPerformancePayload }) => {
  const row = stockPerformancePayload?.returns?.[ticker];
  if (!row) {
    return buildNotVerified({
      intent: 'stock_performance',
      language,
      ticker,
      source: sourceMeta('stock-performance-latest', stockPerformancePayload),
      reason: language === 'zh'
        ? 'CrowdRisk 目前沒有這隻股票的已核實股價表現資料。'
        : 'CrowdRisk does not currently have verified price-performance data for this ticker.'
    });
  }
  const requestedPeriods = parseRequestedPerformancePeriods(question);
  const periodSource = requestedPeriods.length ? requestedPeriods : PERFORMANCE_PERIODS;
  const periods = periodSource
    .map((period) => ({
      id: period.id,
      label: period.label,
      displayLabel: language === 'zh' ? period.zhLabel : period.label,
      value: performanceValue(row, period.keys)
    }))
    .map((period) => ({ ...period, formattedValue: formatPercent(period.value) }))
    .filter((period) => period.formattedValue);

  if (!periods.length) {
    return buildNotVerified({
      intent: 'stock_performance',
      language,
      ticker,
      source: sourceMeta('stock-performance-latest', stockPerformancePayload),
      reason: language === 'zh'
        ? 'CrowdRisk 目前沒有這個指定時間段的已核實回報。'
        : 'CrowdRisk does not currently have a verified return for the requested period.'
    });
  }

  const periodFacts = Object.fromEntries(periods.map((period) => [period.label, period.formattedValue]));
  const periodFactsList = periods.map((period) => ({ label: period.displayLabel, value: period.formattedValue }));
  const requestedDirectAnswer = requestedPeriods.length === 1 && periods.length === 1;
  const requestedPeriod = periods[0];
  const asOfDate = stockPerformancePayload?.meta?.as_of_date;
  const periodSummary = periods
    .map((period) => `${period.displayLabel} ${period.formattedValue}`)
    .join(language === 'zh' ? '，' : ', ');
  const asOfLine = language === 'zh'
    ? (asOfDate ? `資料日期是 ${asOfDate}。` : '資料日期目前未驗證。')
    : (asOfDate ? `Data as of ${asOfDate}.` : 'The as-of date is not verified.');

  return response({
    intent: 'stock_performance',
    language,
    ticker,
    verifiedStatus: 'verified',
    source: sourceMeta('stock-performance-latest', stockPerformancePayload),
    facts: periodFacts,
    factsList: periodFactsList,
    lines: language === 'zh'
      ? (requestedDirectAnswer ? [
        `${ticker} 的${requestedPeriod.displayLabel}回報是 ${requestedPeriod.formattedValue}。`,
        asOfLine,
        '白話講，這反映的是指定期間的股價走勢，不代表公司質素已被證明，也不是估值結論或最終買賣決定。'
      ] : [
        `${ticker} 的 CrowdRisk 股價表現：${periodSummary}。`,
        asOfLine,
        '白話講，這是不同期間的股價走勢摘要，不代表公司質素已被證明，也不是估值結論或最終買賣決定。'
      ])
      : (requestedDirectAnswer ? [
        `${ticker}'s ${requestedPeriod.label} return is ${requestedPeriod.formattedValue}.`,
        asOfLine,
        'Plainly, this reflects price action over the requested period. It is not proof of company quality, a valuation conclusion, or a final investment decision.'
      ] : [
        `${ticker}'s CrowdRisk price-performance summary: ${periodSummary}.`,
        asOfLine,
        'Plainly, this is a snapshot of price action across periods. It is not proof of company quality, a valuation conclusion, or a final investment decision.'
      ]),
    action: { type: 'open_dossier', label: language === 'zh' ? '打開股票檔案' : 'Open Dossier' }
  });
};

const buildMomentumRankAnswer = ({ ticker, language, payload }) => {
  const row = (payload?.momentum_universe?.rankings || []).find((item) => normalizeTicker(item?.ticker) === ticker);
  if (!row) {
    return buildNotVerified({
      intent: 'momentum_rank',
      language,
      ticker,
      source: sourceMeta('radar-v1.2-latest', payload),
      reason: language === 'zh'
        ? 'CrowdRisk 目前沒有這隻股票的已核實動能排名。'
        : 'CrowdRisk does not currently have a verified momentum rank for this ticker.'
    });
  }
  const rank = row.scanner_rank || row.rank || null;
  const rs = row.relative_strength_percentile;
  const rsDisplay = formatPercentileRank(rs, language);
  const themeRank = row.theme_rank || row.industry_theme_rank || null;
  return response({
    intent: 'momentum_rank',
    language,
    ticker,
    verifiedStatus: 'verified',
    source: sourceMeta('radar-v1.2-latest', payload),
    facts: { scanner_rank: rank, theme_rank: themeRank, relative_strength_percentile: rs },
    factsList: [
      { label: language === 'zh' ? 'CrowdRisk 動能排名' : 'CrowdRisk momentum rank', value: rank ? `#${rank}` : 'Not verified' },
      { label: language === 'zh' ? '同主題排名' : 'Theme rank', value: themeRank ? `#${themeRank}` : 'Not verified' },
      { label: language === 'zh' ? '相對強度' : 'Relative strength', value: rsDisplay || 'Not verified' }
    ],
    lines: language === 'zh'
      ? [
        `${ticker} 目前在 CrowdRisk 動能名單中排第 ${rank || '未驗證'}。`,
        rsDisplay ? `相對強度是 ${rsDisplay}。` : '相對強度目前未驗證。',
        '白話講，這只是股價趨勢和相對強弱的研究線索，不代表公司質素已被證明，也不是估值結論或最終買賣決定。'
      ]
      : [
        `${ticker}'s current CrowdRisk momentum rank is ${rank ? `#${rank}` : 'not verified'}.`,
        rsDisplay ? `Relative strength is ${rsDisplay}.` : 'The relative strength percentile is not verified.',
        'Plainly, this is a research signal from price trend and relative strength. It is not proof of company quality, a valuation conclusion, or a final investment decision.'
      ],
    action: { type: 'open_momentum', label: language === 'zh' ? '打開動能宇宙' : 'Open Momentum Universe' }
  });
};

const buildValuationSnapshotAnswer = ({ ticker, language, stockPerformancePayload }) => {
  const profile = getStockDossierProfile(ticker);
  const valuationCore = profile?.valuationCore;
  if (!valuationCore || valuationCore.status !== 'available') {
    return buildNotVerified({
      intent: 'valuation_snapshot',
      language,
      ticker,
      source: { feed: 'stockDossierProfiles.js' },
      reason: language === 'zh'
        ? 'CrowdRisk 目前沒有足夠已核實估值輸入。'
        : 'CrowdRisk does not currently have enough verified valuation inputs.'
    });
  }
  const snapshot = {
    ...(profile.marketSnapshot || {})
  };
  const liveRow = stockPerformancePayload?.returns?.[ticker];
  if (liveRow?.latest_price) snapshot.currentPrice = formatPrice(liveRow.latest_price);
  if (liveRow?.capitalization?.status === 'available' && liveRow.capitalization.market_cap) {
    snapshot.marketCap = formatCurrency(liveRow.capitalization.market_cap);
  }

  const range = valuationCore.forwardValuationRange;
  const currentPrice = parseDollarValue(snapshot.currentPrice);
  const marketCap = parseDollarValue(snapshot.marketCap);
  const shareCountBillions = currentPrice && marketCap ? marketCap / currentPrice : null;
  const netCash = toFiniteNumber(range?.netCashAdjustment);
  const scenarioPrices = (range?.scenarios || []).map((scenario) => {
    const revenue = toFiniteNumber(scenario.fy28Revenue);
    const multiple = toFiniteNumber(scenario.evRevenueMultiple);
    if (revenue === null || multiple === null || netCash === null || !shareCountBillions) return null;
    return ((revenue * multiple) + netCash) / shareCountBillions;
  }).filter(Number.isFinite);
  const low = scenarioPrices.length ? Math.min(...scenarioPrices) : null;
  const high = scenarioPrices.length ? Math.max(...scenarioPrices) : null;
  const median = medianNumber(scenarioPrices);
  const rangeDisplay = low !== null && high !== null ? `${formatWholePrice(low)}-${formatWholePrice(high)}` : null;
  const medianDisplay = median !== null ? formatWholePrice(median) : null;
  const expectationFrame = resolveExpectationGapFrame(valuationCore);
  const labels = expectationFactLabels(language);
  const rangeLineZh = rangeDisplay && medianDisplay
    ? `如果你問的「目標價」是指 CrowdRisk 估值區間，根據 CrowdRisk model，目前 model-implied valuation range 是 ${rangeDisplay}，中位數 ${medianDisplay}。`
    : '目前 CrowdRisk model 的資料不足以產生完整估值區間。';
  const rangeLineEn = rangeDisplay && medianDisplay
    ? `If by price target you mean CrowdRisk's valuation range, the CrowdRisk model currently implies ${rangeDisplay}, with a median implied price of ${medianDisplay}.`
    : 'The current CrowdRisk model does not have enough verified inputs to produce a complete valuation range.';

  return response({
    intent: 'valuation_snapshot',
    language,
    ticker,
    verifiedStatus: rangeDisplay ? 'verified' : 'partial',
    source: {
      valuation_profile: 'stockDossierProfiles.js',
      stock_performance: sourceMeta('stock-performance-latest', stockPerformancePayload)
    },
    facts: {
      valuation_state: valuationCore.topVerdict?.valuationState,
      business_quality: valuationCore.topVerdict?.businessQuality,
      margin_of_safety: valuationCore.topVerdict?.marginOfSafety,
      model_implied_range: rangeDisplay,
      median_implied_price: medianDisplay,
      business_evidence: expectationFrame.businessEvidence,
      market_expectation: expectationFrame.marketExpectation,
      expectation_gap: expectationFrame.expectationGap,
      valuation_tolerance: expectationFrame.valuationTolerance
    },
    factsList: [
      { label: labels.businessEvidence, value: expectationLabel(expectationFrame.businessEvidence, language) },
      { label: labels.marketExpectation, value: expectationLabel(expectationFrame.marketExpectation, language) },
      { label: labels.expectationGap, value: expectationLabel(expectationFrame.expectationGap, language) },
      { label: labels.valuationTolerance, value: expectationLabel(expectationFrame.valuationTolerance, language) },
      { label: labels.valuationRange, value: rangeDisplay || 'Not verified' },
      { label: labels.median, value: medianDisplay || 'Not verified' }
    ],
    lines: language === 'zh'
      ? [
        `${ticker} 目前不是便宜股。CrowdRisk 的估值框架顯示，它屬於「高質素但高要求」的情況。`,
        `CrowdRisk 目前看到的是：業務證據${expectationLabel(expectationFrame.businessEvidence, language)}，市場期待${expectationLabel(expectationFrame.marketExpectation, language)}，期待差距${expectationLabel(expectationFrame.expectationGap, language)}，估值容錯${expectationLabel(expectationFrame.valuationTolerance, language)}。`,
        rangeLineZh,
        buildExpectationEvidenceLine(ticker, language, valuationCore),
        `白話講，問題不只是「${ticker} 好不好」，而是「${ticker} 是否好得超過市場已經相信的程度」。如果只是符合預期，估值未必有太多容錯；如果增長、NRR 或 FCF margin 放慢，重新定價風險會比較高。這不是最終買賣決定。`
      ]
      : [
        `${ticker} does not screen as cheap. CrowdRisk's valuation framework reads it as high quality, but high expectation.`,
        `Business evidence: ${expectationLabel(expectationFrame.businessEvidence, language)}. Market expectation: ${expectationLabel(expectationFrame.marketExpectation, language)}. Expectation gap: ${expectationLabel(expectationFrame.expectationGap, language)}. Valuation tolerance: ${expectationLabel(expectationFrame.valuationTolerance, language)}.`,
        rangeLineEn,
        buildExpectationEvidenceLine(ticker, language, valuationCore),
        `Plainly, the question is not only whether ${ticker} is good. It is whether ${ticker} can be good enough to exceed what the market already believes. If it merely meets expectations, valuation tolerance may stay low; if growth, NRR, or FCF margin slows, repricing risk rises. This is not a final investment decision.`
      ],
    action: { type: 'open_dossier', label: language === 'zh' ? '打開股票檔案' : 'Open Dossier' }
  });
};

const parseChineseNumber = (value) => {
  const map = { 一: 1, 二: 2, 三: 3, 四: 4, 五: 5, 六: 6, 七: 7, 八: 8, 九: 9, 十: 10 };
  return map[value] || null;
};

const ENGLISH_MONTHS = {
  jan: 1,
  january: 1,
  feb: 2,
  february: 2,
  mar: 3,
  march: 3,
  apr: 4,
  april: 4,
  may: 5,
  jun: 6,
  june: 6,
  jul: 7,
  july: 7,
  aug: 8,
  august: 8,
  sep: 9,
  sept: 9,
  september: 9,
  oct: 10,
  october: 10,
  nov: 11,
  november: 11,
  dec: 12,
  december: 12
};

const parseEnglishMonth = (value) => {
  const key = String(value || '').toLowerCase().replace(/\.$/, '');
  return ENGLISH_MONTHS[key] || null;
};

const parseRequestedHorizon = (question) => {
  const raw = String(question || '');
  const text = raw.toLowerCase();
  const explicit = text.match(/\br\s*\+\s*(\d{1,3})\b/);
  if (explicit) return Number(explicit[1]);

  const tradingDays = text.match(/(\d{1,3})\s*(?:trading\s*)?days?\b/);
  if (tradingDays) return Number(tradingDays[1]);

  const zhTradingDays = raw.match(/(\d{1,3})\s*(?:個)?(?:交易日|trading day)/i);
  if (zhTradingDays) return Number(zhTradingDays[1]);

  if (/一個星期|一星期|一週|一周|one week|1 week|\bweek\b/.test(text) || /一個星期|一星期|一週|一周/.test(raw)) {
    return 5;
  }
  if (/一個月|one month|1 month|\bmonth\b/.test(text) || /一個月/.test(raw)) {
    return 30;
  }

  return null;
};

const parseExplicitReleaseDate = (question) => {
  const raw = String(question || '');
  const isoMatch = raw.match(/\b(20\d{2})-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])\b/);
  if (isoMatch) return isoMatch[0];

  const enMatch = raw.match(/\b(jan(?:uary)?|feb(?:ruary)?|mar(?:ch)?|apr(?:il)?|may|jun(?:e)?|jul(?:y)?|aug(?:ust)?|sep(?:t)?(?:ember)?|oct(?:ober)?|nov(?:ember)?|dec(?:ember)?)\.?\s+(3[01]|[12]\d|[1-9])(?:st|nd|rd|th)?[,]?\s+(20\d{2})\b/i);
  if (enMatch) {
    const [, monthName, day, year] = enMatch;
    const month = parseEnglishMonth(monthName);
    if (month) return `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
  }

  const zhMatch = raw.match(/(20\d{2})\s*年\s*(1[0-2]|[1-9])\s*月\s*(3[01]|[12]\d|[1-9])\s*(?:日|號)/);
  if (!zhMatch) return null;
  const [, year, month, day] = zhMatch;
  return `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
};

const parseQuestionDateFilter = (question) => {
  const raw = String(question || '');
  const text = raw.toLowerCase();
  const yearMatch = raw.match(/(20\d{2})/);
  const year = yearMatch ? Number(yearMatch[1]) : null;
  const monthMatch = raw.match(/(?:20\d{2})\s*年\s*(\d{1,2})\s*月/) || raw.match(/\b(1[0-2]|[1-9])\/20\d{2}\b/);
  const englishMonthMatch = raw.match(/\b(jan(?:uary)?|feb(?:ruary)?|mar(?:ch)?|apr(?:il)?|may|jun(?:e)?|jul(?:y)?|aug(?:ust)?|sep(?:t)?(?:ember)?|oct(?:ober)?|nov(?:ember)?|dec(?:ember)?)\.?\s+(?:20\d{2})\b/i);
  const month = monthMatch ? Number(monthMatch[1]) : parseEnglishMonth(englishMonthMatch?.[1]);
  const quarterMatch = raw.match(/第([一二三四1234])季/) || text.match(/\bq([1-4])\b/);
  const quarterRaw = quarterMatch ? quarterMatch[1] : null;
  const quarter = quarterRaw ? (Number(quarterRaw) || parseChineseNumber(quarterRaw)) : null;
  const latest = /latest|recent|最近|最新/.test(text) || /最近|最新/.test(raw);
  return { year, month, quarter, latest };
};

const quarterForMonth = (month) => Math.floor((Number(month) - 1) / 3) + 1;

export const resolveEarningsReactionReturnRequest = ({ question, ticker }) => {
  const normalizedTicker = normalizeTicker(ticker);
  const horizon = parseRequestedHorizon(question);
  if (!normalizedTicker || !horizon) return null;

  const releaseDate = parseExplicitReleaseDate(question);
  const filter = parseQuestionDateFilter(question);
  const asksDrift = /post[-_ ]?reaction|drift|post earnings drift|漂移|延續/.test(String(question || '').toLowerCase())
    || /漂移|延續/.test(String(question || ''));

  const request = {
    ticker: normalizedTicker,
    horizon,
    metric: asksDrift ? 'post_reaction_drift' : 'both'
  };

  if (releaseDate) {
    request.release_date = releaseDate;
    return request;
  }
  if (filter.latest) {
    request.latest = true;
    return request;
  }
  if (filter.year && filter.month) {
    request.year = filter.year;
    request.month = filter.month;
    return request;
  }
  if (filter.year && filter.quarter) {
    request.year = filter.year;
    request.calendar_quarter = filter.quarter;
    return request;
  }

  return null;
};

const resolveEarningsEventRow = (question, earningsReactionPayload) => {
  const rows = Array.isArray(earningsReactionPayload?.quarter_log) ? earningsReactionPayload.quarter_log : [];
  if (!rows.length) return { status: 'missing_rows', row: null };

  const sortedRows = [...rows].sort((a, b) => String(b.release_date || '').localeCompare(String(a.release_date || '')));
  const filter = parseQuestionDateFilter(question);
  let candidates = sortedRows;

  if (filter.year) {
    candidates = candidates.filter((row) => String(row.release_date || '').startsWith(`${filter.year}-`));
  }
  if (filter.month) {
    candidates = candidates.filter((row) => {
      const rowMonth = Number(String(row.release_date || '').slice(5, 7));
      return rowMonth === filter.month;
    });
  }
  if (filter.quarter) {
    candidates = candidates.filter((row) => {
      const rowMonth = Number(String(row.release_date || '').slice(5, 7));
      return quarterForMonth(rowMonth) === filter.quarter;
    });
  }

  if (!filter.year && !filter.month && !filter.quarter && !filter.latest) {
    return { status: 'missing_event_filter', row: null };
  }
  if (!candidates.length) return { status: 'no_matching_event', row: null };
  if (candidates.length > 1 && (filter.year || filter.quarter) && !filter.month && !filter.latest) {
    return { status: 'ambiguous_event', row: null, candidates };
  }

  return { status: 'resolved', row: candidates[0] };
};

const inferReactionTiming = (row, language) => {
  const releaseDate = String(row?.release_date || '');
  const reactionDay = String(row?.reaction_day || '');
  if (!releaseDate || !reactionDay) {
    return {
      status: 'unknown',
      label: 'UNKNOWN',
      description: language === 'zh' ? 'reaction_day 未驗證。' : 'The reaction day is not verified.'
    };
  }
  if (releaseDate === reactionDay) {
    return {
      status: 'same_day',
      label: 'BMO-compatible',
      description: language === 'zh'
        ? 'release_date 與 reaction_day 相同，符合 BMO / same-session reaction logic。'
        : 'The release date and reaction day are the same, consistent with BMO / same-session reaction logic.'
    };
  }
  return {
    status: 'next_session',
    label: 'AMC-compatible',
    description: language === 'zh'
      ? 'reaction_day 是 release_date 之後的下一個已驗證交易日，符合 AMC / next-session reaction logic。'
      : 'The reaction day is the next verified trading session after the release date, consistent with AMC / next-session reaction logic.'
  };
};

const buildDynamicEarningsReactionAnswer = ({ question, ticker, language, earningsReactionReturnPayload }) => {
  if (!earningsReactionReturnPayload || earningsReactionReturnPayload.status !== 'verified') return null;

  const horizon = toFiniteNumber(earningsReactionReturnPayload?.metrics?.horizon) || parseRequestedHorizon(question);
  const asksDrift = /post[-_ ]?reaction|drift|post earnings drift|漂移|延續/.test(String(question || '').toLowerCase())
    || /漂移|延續/.test(String(question || ''));
  const value = asksDrift
    ? toFiniteNumber(earningsReactionReturnPayload?.metrics?.post_reaction_drift)
    : toFiniteNumber(earningsReactionReturnPayload?.metrics?.earnings_return);
  const displayReturn = ratioToPercent(value);
  if (!horizon || !displayReturn) return null;

  const event = earningsReactionReturnPayload.event || {};
  const prices = earningsReactionReturnPayload.prices || {};
  const definitions = earningsReactionReturnPayload.definitions || {};
  const timingLabel = event.timing_basis || event.verified_timing || 'Not verified';
  const definition = asksDrift
    ? definitions.post_reaction_drift || 'R+N close / reaction_day close - 1'
    : definitions.r_plus_n_earnings_return || 'R+N close / previous_close - 1';
  const eventDate = formatEventDate(event.release_date, language);
  const moveVerb = returnVerb(value, language);
  const moveAmount = formatMoveAmount(value, displayReturn);
  const timingText = timingNarrative({ timingLabel, reactionDay: event.reaction_day, language });

  return response({
    intent: 'earnings_reaction',
    language,
    ticker,
    verifiedStatus: 'verified',
    source: {
      feed: 'earnings-reaction-return',
      generated_at: earningsReactionReturnPayload?.source?.generated_at || null,
      as_of: event.release_date || null
    },
    facts: {
      release_date: event.release_date || null,
      reaction_day: event.reaction_day || null,
      timing_basis: timingLabel,
      horizon,
      metric: asksDrift ? 'post_reaction_drift' : 'r_plus_n_earnings_return',
      value,
      target_date: prices.target_date || null,
      previous_close: prices.previous_close ?? null,
      reaction_day_close: prices.reaction_day_close ?? null,
      target_close: prices.target_close ?? null,
      definition
    },
    definitions: {
      r_plus_n_earnings_return: definitions.r_plus_n_earnings_return || 'R+N close / previous_close - 1',
      post_reaction_drift: definitions.post_reaction_drift || 'R+N close / reaction_day close - 1',
      reaction_day: 'AMC uses the next trading day; BMO uses the same trading day.'
    },
    factsList: [
      { label: language === 'zh' ? '財報日期' : 'Earnings date', value: event.release_date || 'Not verified' },
      { label: language === 'zh' ? '首個市場反應日' : 'First reaction session', value: event.reaction_day || 'Not verified' },
      { label: language === 'zh' ? '公布時段口徑' : 'Release timing', value: timingLabel },
      { label: asksDrift ? (language === 'zh' ? `${horizon} 個交易日後續走勢` : `${horizon} trading-day follow-through`) : (language === 'zh' ? `${horizon} 個交易日回報` : `${horizon} trading-day return`), value: displayReturn }
    ],
    lines: language === 'zh'
      ? [
        asksDrift
          ? `${ticker} 在 ${eventDate} 財報首個市場反應日之後，到第 ${horizon} 個交易日再${moveVerb} ${moveAmount}。`
          : `${ticker} 在 ${eventDate} 財報後的 ${horizon} 個交易日內${moveVerb} ${moveAmount}。`,
        timingText,
        asksDrift
          ? `換句話說，這個數字看的是首個反應日收市後，股價到第 ${horizon} 個交易日收市時有沒有繼續向上或回吐。`
          : `這個回報是由財報公布前一個收市價，計到財報後第 ${horizon} 個交易日收市價。`,
        '這反映的是財報後股價走勢，不是最終買賣決定。'
      ]
      : [
        asksDrift
          ? `${ticker} ${moveVerb} ${moveAmount} from the first post-earnings reaction session to the ${formatOrdinal(horizon)} trading day after its ${eventDate} earnings release.`
          : `${ticker} ${moveVerb} ${moveAmount} over the ${horizon} trading days after its ${eventDate} earnings release.`,
        timingText,
        asksDrift
          ? `In plain English, this measures whether the stock kept moving or gave back gains after the first reaction-session close, through the ${formatOrdinal(horizon)} trading-day close.`
          : `The return is measured from the pre-earnings close to the close of the ${formatOrdinal(horizon)} trading day after the release.`,
        'This reflects how the stock traded after earnings, not a final investment decision.'
      ],
    action: { type: 'open_event_study', label: language === 'zh' ? '打開事件研究' : 'Open Event Study' }
  });
};

const buildDynamicEarningsReactionNotVerifiedAnswer = ({ question, ticker, language, earningsReactionReturnPayload }) => {
  if (!earningsReactionReturnPayload || earningsReactionReturnPayload.status !== 'not_verified') return null;

  const horizon = toFiniteNumber(earningsReactionReturnPayload?.horizon) || parseRequestedHorizon(question);
  const reason = String(earningsReactionReturnPayload?.reason || '');
  const event = earningsReactionReturnPayload.event || {};
  const eventDate = formatEventDate(event.release_date, language);
  const reasonText = reason === 'missing_target_close'
    ? (language === 'zh'
      ? `目前 CrowdRisk 未能核實 ${ticker} 這次 ${eventDate} 財報後第 ${horizon} 個交易日的收市價，所以不能回答 R+${horizon} 回報。`
      : `CrowdRisk cannot verify the ${formatOrdinal(horizon)} trading-day close after ${ticker}'s ${eventDate} earnings release yet, so it should not state an R+${horizon} return.`)
    : (language === 'zh'
      ? `CrowdRisk 目前未能核實這個回報，所以不會用估算補上。`
      : `CrowdRisk cannot verify this return yet, so it will not fill it in by guessing.`);

  return response({
    intent: 'earnings_reaction',
    language,
    ticker,
    verifiedStatus: 'not_verified',
    source: {
      feed: 'earnings-reaction-return',
      generated_at: null,
      as_of: event.release_date || null
    },
    facts: {
      release_date: event.release_date || null,
      reaction_day: event.reaction_day || null,
      timing_basis: event.verified_timing || null,
      horizon,
      reason
    },
    factsList: [
      { label: language === 'zh' ? '財報日期' : 'Earnings date', value: event.release_date || 'Not verified' },
      { label: language === 'zh' ? '首個市場反應日' : 'First reaction session', value: event.reaction_day || 'Not verified' },
      { label: language === 'zh' ? '狀態' : 'Status', value: reason || 'not_verified' }
    ],
    lines: language === 'zh'
      ? [
        `${ticker}：${NOT_VERIFIED_ZH}`,
        reasonText,
        '這反映的是資料邊界，不是最終買賣決定。'
      ]
      : [
        `${ticker}: ${NOT_VERIFIED_EN}`,
        reasonText,
        'This is a data-boundary answer, not a final investment decision.'
      ],
    notVerifiedReason: reasonText,
    action: { type: 'open_event_study', label: language === 'zh' ? '打開事件研究' : 'Open Event Study' }
  });
};

const buildEarningsReactionAnswer = ({ question, ticker, language, earningsReactionPayload, earningsReactionReturnPayload }) => {
  const dynamicAnswer = buildDynamicEarningsReactionAnswer({ question, ticker, language, earningsReactionReturnPayload });
  if (dynamicAnswer) return dynamicAnswer;

  const dynamicNotVerifiedAnswer = buildDynamicEarningsReactionNotVerifiedAnswer({ question, ticker, language, earningsReactionReturnPayload });
  if (dynamicNotVerifiedAnswer) return dynamicNotVerifiedAnswer;

  if (!earningsReactionPayload) {
    return buildNotVerified({
      intent: 'earnings_reaction',
      language,
      ticker,
      reason: language === 'zh'
        ? '目前 CrowdRisk 未有足夠財報反應資料，所以不能補估這個回報。'
        : 'CrowdRisk does not currently have enough earnings-reaction data to answer this without guessing.'
    });
  }

  const horizon = parseRequestedHorizon(question);
  if (!horizon) {
    return buildNotVerified({
      intent: 'earnings_reaction',
      language,
      ticker,
      source: sourceMeta('earnings-gap-summary', earningsReactionPayload),
      reason: language === 'zh'
        ? '請指定清楚時間，例如 21 個交易日、30 個交易日，或一個星期。'
        : 'Please specify a clear time period, such as 21 trading days, 30 trading days, or one week.'
    });
  }

  const eventResolution = resolveEarningsEventRow(question, earningsReactionPayload);
  if (eventResolution.status !== 'resolved') {
    const reasonByStatus = {
      missing_rows: language === 'zh' ? '目前沒有這隻股票的財報反應紀錄。' : 'There is no earnings-reaction record for this stock yet.',
      missing_event_filter: language === 'zh' ? '請指定要查哪一次財報，例如 2023 年 5 月、2023 年第二季，或 latest。' : 'Please specify which earnings event to use, such as May 2023, Q2 2023, or latest.',
      no_matching_event: language === 'zh' ? '目前 CrowdRisk 找不到符合日期條件的財報事件。' : 'CrowdRisk does not currently have an earnings event matching that date filter.',
      ambiguous_event: language === 'zh' ? '日期條件對應多於一次財報，請指定月份或 release date。' : 'The date filter matches more than one earnings event; please specify the month or release date.'
    };
    return buildNotVerified({
      intent: 'earnings_reaction',
      language,
      ticker,
      source: sourceMeta('earnings-gap-summary', earningsReactionPayload),
      reason: reasonByStatus[eventResolution.status]
    });
  }

  const row = eventResolution.row;
  const field = `r_plus_${horizon}`;
  const totalReturn = toFiniteNumber(row?.[field]);
  const asksDrift = /post[-_ ]?reaction|drift|post earnings drift|漂移|延續/.test(String(question || '').toLowerCase())
    || /漂移|延續/.test(String(question || ''));
  const timing = inferReactionTiming(row, language);
  const previousClose = toFiniteNumber(row?.previous_close);
  const reactionClose = toFiniteNumber(row?.reaction_close);

  if (totalReturn === null) {
    return buildNotVerified({
      intent: 'earnings_reaction',
      language,
      ticker,
      source: sourceMeta('earnings-gap-summary', earningsReactionPayload),
      reason: language === 'zh'
        ? `目前 CrowdRisk 未有 ${ticker} 這次財報後 ${horizon} 個交易日回報的核實數字。`
        : `CrowdRisk does not currently have a verified ${horizon} trading-day return for this ${ticker} earnings event.`
    });
  }

  const targetClose = previousClose !== null ? previousClose * (1 + totalReturn) : null;
  const driftReturn = asksDrift && targetClose !== null && reactionClose !== null && reactionClose !== 0
    ? (targetClose / reactionClose) - 1
    : null;
  const displayReturn = asksDrift ? ratioToPercent(driftReturn) : ratioToPercent(totalReturn);

  if (!displayReturn) {
    return buildNotVerified({
      intent: 'earnings_reaction',
      language,
      ticker,
      source: sourceMeta('earnings-gap-summary', earningsReactionPayload),
      reason: language === 'zh'
        ? `目前資料不足以核實 ${ticker} 首個財報反應日後，到第 ${horizon} 個交易日的後續走勢。`
        : `The current data is insufficient to verify ${ticker}'s follow-through from the first reaction session to the ${formatOrdinal(horizon)} trading day.`
    });
  }

  const definition = asksDrift
    ? 'R+N close / reaction_day close - 1'
    : 'R+N close / previous_close - 1';
  const eventDate = formatEventDate(row.release_date, language);
  const moveVerb = returnVerb(asksDrift ? driftReturn : totalReturn, language);
  const moveAmount = formatMoveAmount(asksDrift ? driftReturn : totalReturn, displayReturn);
  const timingText = timingNarrative({ timingLabel: timing.label, reactionDay: row.reaction_day, language });

  return response({
    intent: 'earnings_reaction',
    language,
    ticker,
    verifiedStatus: 'verified',
    source: sourceMeta('earnings-gap-summary', earningsReactionPayload),
    facts: {
      release_date: row.release_date,
      reaction_day: row.reaction_day,
      timing_basis: timing.label,
      horizon,
      metric: asksDrift ? 'post_reaction_drift' : 'r_plus_n_earnings_return',
      value: asksDrift ? driftReturn : totalReturn,
      definition
    },
    definitions: {
      r_plus_n_earnings_return: 'R+N close / previous_close - 1',
      post_reaction_drift: 'R+N close / reaction_day close - 1',
      reaction_day: 'AMC uses the next trading day; BMO uses the same trading day.'
    },
    factsList: [
      { label: language === 'zh' ? '財報日期' : 'Earnings date', value: row.release_date || 'Not verified' },
      { label: language === 'zh' ? '首個市場反應日' : 'First reaction session', value: row.reaction_day || 'Not verified' },
      { label: language === 'zh' ? '公布時段口徑' : 'Release timing', value: timing.label },
      { label: asksDrift ? (language === 'zh' ? `${horizon} 個交易日後續走勢` : `${horizon} trading-day follow-through`) : (language === 'zh' ? `${horizon} 個交易日回報` : `${horizon} trading-day return`), value: displayReturn }
    ],
    lines: language === 'zh'
      ? [
        asksDrift
          ? `${ticker} 在 ${eventDate} 財報首個市場反應日之後，到第 ${horizon} 個交易日再${moveVerb} ${moveAmount}。`
          : `${ticker} 在 ${eventDate} 財報後的 ${horizon} 個交易日內${moveVerb} ${moveAmount}。`,
        timingText,
        asksDrift
          ? `換句話說，這個數字看的是首個反應日收市後，股價到第 ${horizon} 個交易日收市時有沒有繼續向上或回吐。`
          : `這個回報是由財報公布前一個收市價，計到財報後第 ${horizon} 個交易日收市價。`,
        '這反映的是財報後股價走勢，不是最終買賣決定。'
      ]
      : [
        asksDrift
          ? `${ticker} ${moveVerb} ${moveAmount} from the first post-earnings reaction session to the ${formatOrdinal(horizon)} trading day after its ${eventDate} earnings release.`
          : `${ticker} ${moveVerb} ${moveAmount} over the ${horizon} trading days after its ${eventDate} earnings release.`,
        timingText,
        asksDrift
          ? `In plain English, this measures whether the stock kept moving or gave back gains after the first reaction-session close, through the ${formatOrdinal(horizon)} trading-day close.`
          : `The return is measured from the pre-earnings close to the close of the ${formatOrdinal(horizon)} trading day after the release.`,
        'This reflects how the stock traded after earnings, not a final investment decision.'
      ],
    action: { type: 'open_event_study', label: language === 'zh' ? '打開事件研究' : 'Open Event Study' }
  });
};

export const answerAskCrowdRiskQuestion = ({ question, locale = 'en', payload = null, stockPerformancePayload = null, referencePeerMapPayload = null, earningsReactionPayload = null, earningsReactionReturnPayload = null }) => {
  const { language, ticker, intent } = resolveAskCrowdRiskRequest({ question, locale, payload, stockPerformancePayload, referencePeerMapPayload });

  if (intent === 'research_queue') return buildResearchQueueAnswer({ language, payload });

  if (!ticker) {
    return buildNotVerified({
      intent,
      language,
      ticker: '',
      reason: language === 'zh' ? '請在問題入面加入 ticker，例如 MU、DDOG 或 NVDA。' : 'Please include a ticker in the question, such as MU, DDOG, or NVDA.'
    });
  }

  if (intent === 'peer_ecosystem') return buildPeerEcosystemAnswer({ ticker, language, referencePeerMapPayload });
  if (intent === 'coverage_status') return buildCoverageStatusAnswer({ ticker, language, payload, stockPerformancePayload, referencePeerMapPayload });
  if (intent === 'business_summary') return buildBusinessSummaryAnswer({ ticker, language });
  if (intent === 'thesis_risk') return buildThesisRiskAnswer({ ticker, language });
  if (intent === 'market_cap') return buildMarketCapAnswer({ ticker, language, stockPerformancePayload });
  if (intent === 'stock_performance') return buildStockPerformanceAnswer({ question, ticker, language, stockPerformancePayload });
  if (intent === 'momentum_rank') return buildMomentumRankAnswer({ ticker, language, payload });
  if (intent === 'valuation_snapshot') return buildValuationSnapshotAnswer({ ticker, language, stockPerformancePayload });
  if (intent === 'earnings_reaction') return buildEarningsReactionAnswer({ question, ticker, language, earningsReactionPayload, earningsReactionReturnPayload });

  return buildCoverageStatusAnswer({ ticker, language, payload, stockPerformancePayload, referencePeerMapPayload });
};
