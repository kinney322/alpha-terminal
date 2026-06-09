import { getStockDossierProfile } from './stockDossierProfiles.js';
import { resolveReferencePeerEcosystemSnapshot } from './referencePeerMapAdapter.js';
import { resolveAskCrowdRiskCatalogEntry } from './askCrowdRiskAnswerCatalog.js';

const MACRO_TICKERS = new Set(['SPY', 'QQQ']);
const NOT_VERIFIED_EN = 'Not verified in current CrowdRisk backend context.';
const NOT_VERIFIED_ZH = '目前 CrowdRisk backend context 未驗證這個答案。';

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

const formatPercent = (value) => {
  const numeric = toFiniteNumber(value);
  if (numeric === null) return null;
  const scaled = Math.abs(numeric) <= 1 ? numeric * 100 : numeric;
  return `${scaled > 0 ? '+' : ''}${scaled.toFixed(1)}%`;
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
    supportive: language === 'zh' ? 'supportive / 支持' : 'supportive',
    weakening: language === 'zh' ? 'weakening / 轉弱' : 'weakening',
    demanding: language === 'zh' ? 'demanding / 要求高' : 'demanding',
    low: language === 'zh' ? 'low / 低' : 'low',
    high: language === 'zh' ? 'high / 高' : 'high',
    not_yet_proven_to_exceed: language === 'zh' ? 'not yet proven to exceed expectations / 尚未證明超越市場期待' : 'not yet proven to exceed expectations',
    meets_but_not_clearly_exceeds: language === 'zh' ? 'meets but not clearly exceeds expectations / 符合但未明顯超越期待' : 'meets but not clearly exceeds expectations',
    not_verified: language === 'zh' ? 'Not verified / 未驗證' : 'Not verified'
  };
  return labels[value] || labels.not_verified;
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
  const supportParts = [
    revenueGrowth ? `revenue growth ${revenueGrowth}` : null,
    fcfMargin ? `FCF margin ${fcfMargin}` : null
  ].filter(Boolean);
  const expectationParts = [
    evRevenue ? `${evRevenue} FY2026 revenue` : null,
    evFcf ? `${evFcf} FY2026 FCF` : null
  ].filter(Boolean);

  if (language === 'zh') {
    return `${ticker} 的 business evidence 仍然有支持${supportParts.length ? `：${supportParts.join('、')}` : ''}；但市場估值${expectationParts.length ? `大約是 ${expectationParts.join(' / ')}` : '已經偏高'}，已經反映多年增長和高 cash margin 的期待。`;
  }

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
  return tokens.find((token) => available.has(token) || MACRO_TICKERS.has(token)) || tokens[0] || '';
};

const detectIntent = (question) => {
  return resolveAskCrowdRiskCatalogEntry(question)?.intent || 'coverage_status';
};

export const resolveAskCrowdRiskRequest = ({ question, locale = 'en', payload = null, stockPerformancePayload = null, referencePeerMapPayload = null }) => {
  const language = resolveLanguage(question, locale);
  const payloads = { payload, stockPerformancePayload, referencePeerMapPayload };
  const ticker = extractTicker(question, payloads);
  const intent = detectIntent(question);
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
      reason || '目前沒有足夠 CrowdRisk context pack 支持這個回答，所以我不能補估。'
    ]
    : [
      `${ticker ? `${ticker}: ` : ''}${notVerifiedText(language)}`,
      reason || 'The current CrowdRisk context pack does not support this answer, so I cannot fill it in by guessing.'
    ]
});

const buildPeerEcosystemAnswer = ({ ticker, language, referencePeerMapPayload }) => {
  const ecosystem = resolveReferencePeerEcosystemSnapshot(referencePeerMapPayload, ticker);
  if (!ecosystem) {
    return buildNotVerified({
      intent: 'peer_ecosystem',
      language,
      ticker,
      source: sourceMeta('reference-peer-map-latest', referencePeerMapPayload),
      reason: language === 'zh'
        ? '目前 reference peer map 沒有這個 ticker 的 ecosystem context。'
        : 'The reference peer map does not contain ecosystem context for this ticker.'
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
      covered_ecosystem: 'Active CrowdRisk universe names.',
      direct_reference_peers: 'Context-only peers, not active coverage.'
    },
    factsList: [
      { label: language === 'zh' ? '產業鏈' : 'Ecosystem', value: ecosystem.ecosystemName },
      { label: language === 'zh' ? '已覆蓋' : 'Covered', value: covered.length ? covered.join(', ') : 'None' },
      { label: language === 'zh' ? '參考同行' : 'Reference peers', value: referenceOnly.length ? referenceOnly.join(', ') : 'None' }
    ],
    lines: language === 'zh'
      ? [
        `${ticker} 在 CrowdRisk 的位置是 ${ecosystem.ecosystemName}。`,
        covered.length ? `Covered Ecosystem 包括：${covered.join(', ')}。` : '目前沒有其他 covered ecosystem 名稱。',
        referenceOnly.length ? `Direct / Reference Peers 包括：${referenceOnly.join(', ')}。這些是 context only，不是 active coverage。` : '目前沒有 direct/reference peer context。',
        candidates.length ? `Candidate / not active：${candidates.join(', ')}。這些需要另行批准才可加入 universe。` : '目前沒有 candidate-to-add 名稱。'
      ]
      : [
        `${ticker} sits in the ${ecosystem.ecosystemName} in CrowdRisk.`,
        covered.length ? `Covered Ecosystem: ${covered.join(', ')}.` : 'No other covered ecosystem names are available.',
        referenceOnly.length ? `Direct / Reference Peers: ${referenceOnly.join(', ')}. These are context only, not active coverage.` : 'No direct/reference peer context is available.',
        candidates.length ? `Candidate / not active: ${candidates.join(', ')}. These require separate approval before universe promotion.` : 'No candidate-to-add names are listed.'
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
        { label: language === 'zh' ? '覆蓋狀態' : 'Coverage', value: 'Active CrowdRisk coverage' },
        { label: language === 'zh' ? '回報 feed' : 'Return feed', value: hasReturns ? 'Available' : 'Not verified' }
      ],
      lines: language === 'zh'
        ? [`${ticker} 是 active CrowdRisk coverage。`, '如果相關 feed 有資料，它可以出現在 Stock Dossier、Momentum Universe 或 stock-performance context。']
        : [`${ticker} is active CrowdRisk coverage.`, 'When the relevant feeds have data, it can appear in Stock Dossier, Momentum Universe, or stock-performance context.'],
      action: { type: 'open_dossier', label: language === 'zh' ? '打開股票檔案' : 'Open Dossier' }
    });
  }

  if (relationships.includes('candidate_to_add')) {
    const entry = entries.find((item) => item.relationship === 'candidate_to_add') || {};
    return response({
      intent: 'coverage_status',
      language,
      ticker,
      verifiedStatus: 'verified',
      source: sourceMeta('reference-peer-map-latest', referencePeerMapPayload),
      facts: { status: 'candidate_to_add', why_add: entry.why_add, risks: entry.risks || [] },
      factsList: [
        { label: language === 'zh' ? '狀態' : 'Status', value: 'Candidate / not active' },
        { label: language === 'zh' ? '產業鏈' : 'Ecosystem', value: entry.ecosystem_name || 'Not verified' }
      ],
      lines: language === 'zh'
        ? [
          `${ticker} 目前是 Candidate / not active，不是 active CrowdRisk coverage。`,
          entry.why_add || '它只是在 reference peer map 入面作為候選 context。',
          '要正式加入，仍需要 BOSS 批准、universe promotion、shares / market-cap coverage、dry-run、publish 和 frontend verification。'
        ]
        : [
          `${ticker} is Candidate / not active, not active CrowdRisk coverage.`,
          entry.why_add || 'It is currently only candidate context in the reference peer map.',
          'Promotion requires BOSS approval, universe promotion, shares / market-cap coverage, dry-run, publish, and frontend verification.'
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
        ? [`${ticker} 目前是 reference-only peer。`, '它可以幫助解釋產業鏈位置，但不是 active coverage，也不代表已有 Stock Dossier / market-cap coverage。']
        : [`${ticker} is currently a reference-only peer.`, 'It helps explain ecosystem context, but it is not active coverage and does not imply Stock Dossier / market-cap coverage.']
    });
  }

  return buildNotVerified({
    intent: 'coverage_status',
    language,
    ticker,
    reason: language === 'zh'
      ? '目前 CrowdRisk feeds 沒有這個 ticker 的 active / reference / candidate coverage 狀態。'
      : 'Current CrowdRisk feeds do not contain active / reference / candidate coverage status for this ticker.'
  });
};

const buildMarketCapAnswer = ({ ticker, language, stockPerformancePayload }) => {
  const capitalization = stockPerformancePayload?.returns?.[ticker]?.capitalization;
  if (!capitalization || capitalization.status !== 'available') {
    return buildNotVerified({
      intent: 'market_cap',
      language,
      ticker,
      source: sourceMeta('stock-performance-latest', stockPerformancePayload),
      reason: language === 'zh'
        ? 'stock-performance feed 目前沒有 verified market cap。'
        : 'The stock-performance feed does not currently expose a verified market cap.'
    });
  }
  const marketCap = formatCurrency(capitalization.market_cap);
  if (!marketCap) {
    return buildNotVerified({ intent: 'market_cap', language, ticker, source: sourceMeta('stock-performance-latest', stockPerformancePayload) });
  }
  return response({
    intent: 'market_cap',
    language,
    ticker,
    verifiedStatus: 'verified',
    source: sourceMeta('stock-performance-latest', stockPerformancePayload),
    facts: {
      market_cap: capitalization.market_cap,
      shares_outstanding: capitalization.shares_outstanding,
      shares_outstanding_as_of: capitalization.shares_outstanding_as_of
    },
    factsList: [
      { label: language === 'zh' ? 'Market Cap' : 'Market Cap', value: marketCap },
      { label: language === 'zh' ? '股份日期' : 'Shares as of', value: capitalization.shares_outstanding_as_of || 'Not verified' }
    ],
    lines: language === 'zh'
      ? [
        `${ticker} 的 CrowdRisk market cap 目前是 ${marketCap}。`,
        capitalization.shares_outstanding_as_of ? `這個數字使用 shares outstanding as of ${capitalization.shares_outstanding_as_of}。` : 'shares outstanding as-of date 目前未驗證。',
        '這是 CrowdRisk stock-performance feed 的 capitalization context，不是估值結論。'
      ]
      : [
        `${ticker}'s CrowdRisk market cap is currently ${marketCap}.`,
        capitalization.shares_outstanding_as_of ? `This uses shares outstanding as of ${capitalization.shares_outstanding_as_of}.` : 'The shares outstanding as-of date is not verified.',
        'This is capitalization context from the CrowdRisk stock-performance feed, not a valuation conclusion.'
      ],
    action: { type: 'open_dossier', label: language === 'zh' ? '打開股票檔案' : 'Open Dossier' }
  });
};

const performanceValue = (row, keys) => {
  for (const key of keys) {
    const value = row?.[key];
    if (value !== undefined && value !== null) return value;
  }
  return null;
};

const buildStockPerformanceAnswer = ({ ticker, language, stockPerformancePayload }) => {
  const row = stockPerformancePayload?.returns?.[ticker];
  if (!row) {
    return buildNotVerified({
      intent: 'stock_performance',
      language,
      ticker,
      source: sourceMeta('stock-performance-latest', stockPerformancePayload),
      reason: language === 'zh' ? 'stock-performance feed 沒有這個 ticker。' : 'The stock-performance feed does not contain this ticker.'
    });
  }
  const periods = [
    ['Today', performanceValue(row, ['today_return', 'return_today', 'today'])],
    ['1W', performanceValue(row, ['return_1w', 'one_week_return', 'week_1', 'one_week'])],
    ['1M', performanceValue(row, ['return_1m', 'one_month_return', 'month_1', 'one_month'])],
    ['3M', performanceValue(row, ['return_3m', 'three_month_return', 'month_3', 'three_month'])],
    ['6M', performanceValue(row, ['return_6m', 'six_month_return', 'month_6', 'six_month'])],
    ['1Y', performanceValue(row, ['return_1y', 'one_year_return', 'year_1', 'one_year'])]
  ].map(([label, value]) => [label, formatPercent(value)]).filter(([, value]) => value);

  if (!periods.length) {
    return buildNotVerified({ intent: 'stock_performance', language, ticker, source: sourceMeta('stock-performance-latest', stockPerformancePayload) });
  }

  return response({
    intent: 'stock_performance',
    language,
    ticker,
    verifiedStatus: 'verified',
    source: sourceMeta('stock-performance-latest', stockPerformancePayload),
    facts: Object.fromEntries(periods),
    factsList: periods.map(([label, value]) => ({ label, value })),
    lines: language === 'zh'
      ? [
        `${ticker} 的 CrowdRisk stock-performance context：${periods.map(([label, value]) => `${label} ${value}`).join('，')}。`,
        stockPerformancePayload?.meta?.as_of_date ? `資料 as of ${stockPerformancePayload.meta.as_of_date}。` : 'as-of date 目前未驗證。',
        '這是市場表現 context，不是最終買賣決定。'
      ]
      : [
        `${ticker}'s CrowdRisk stock-performance context: ${periods.map(([label, value]) => `${label} ${value}`).join(', ')}.`,
        stockPerformancePayload?.meta?.as_of_date ? `Data as of ${stockPerformancePayload.meta.as_of_date}.` : 'The as-of date is not verified.',
        'This is market-performance context, not a final investment decision.'
      ],
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
      reason: language === 'zh' ? 'momentum_universe.rankings 沒有這個 ticker。' : 'momentum_universe.rankings does not contain this ticker.'
    });
  }
  const rank = row.scanner_rank || row.rank || null;
  const rs = row.relative_strength_percentile;
  const themeRank = row.theme_rank || row.industry_theme_rank || null;
  return response({
    intent: 'momentum_rank',
    language,
    ticker,
    verifiedStatus: 'verified',
    source: sourceMeta('radar-v1.2-latest', payload),
    facts: { scanner_rank: rank, theme_rank: themeRank, relative_strength_percentile: rs },
    factsList: [
      { label: language === 'zh' ? 'Scanner Rank' : 'Scanner Rank', value: rank ? `#${rank}` : 'Not verified' },
      { label: language === 'zh' ? 'Theme Rank' : 'Theme Rank', value: themeRank ? `#${themeRank}` : 'Not verified' },
      { label: language === 'zh' ? 'Relative Strength' : 'Relative Strength', value: rs !== undefined ? `${rs}th percentile` : 'Not verified' }
    ],
    lines: language === 'zh'
      ? [
        `${ticker} 目前在 CrowdRisk Momentum Universe 的 scanner rank 是 ${rank ? `#${rank}` : '未驗證'}。`,
        rs !== undefined ? `Relative strength 是 ${rs}th percentile。` : 'relative strength percentile 目前未驗證。',
        '白話講，這是動能 / 相對強度 routing signal，不是公司質素或估值結論。'
      ]
      : [
        `${ticker}'s current CrowdRisk Momentum Universe scanner rank is ${rank ? `#${rank}` : 'not verified'}.`,
        rs !== undefined ? `Relative strength is ${rs}th percentile.` : 'The relative strength percentile is not verified.',
        'Plainly, this is a momentum / relative-strength routing signal, not a company-quality or valuation conclusion.'
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
      reason: language === 'zh' ? '目前沒有 verified CrowdRisk valuation model inputs。' : 'No verified CrowdRisk valuation model inputs are available.'
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
      { label: language === 'zh' ? 'Business Evidence' : 'Business Evidence', value: expectationLabel(expectationFrame.businessEvidence, language) },
      { label: language === 'zh' ? 'Market Expectation' : 'Market Expectation', value: expectationLabel(expectationFrame.marketExpectation, language) },
      { label: language === 'zh' ? 'Expectation Gap' : 'Expectation Gap', value: expectationLabel(expectationFrame.expectationGap, language) },
      { label: language === 'zh' ? 'Valuation Tolerance' : 'Valuation Tolerance', value: expectationLabel(expectationFrame.valuationTolerance, language) },
      { label: language === 'zh' ? '估值區間' : 'Valuation range', value: rangeDisplay || 'Not verified' },
      { label: language === 'zh' ? '中位數' : 'Median implied price', value: medianDisplay || 'Not verified' }
    ],
    lines: language === 'zh'
      ? [
        `${ticker} 目前不是便宜股。CrowdRisk 的估值框架顯示，它屬於「高質素但高要求」的情況。`,
        `Business evidence: ${expectationLabel(expectationFrame.businessEvidence, language)}。Market expectation: ${expectationLabel(expectationFrame.marketExpectation, language)}。Expectation gap: ${expectationLabel(expectationFrame.expectationGap, language)}。Valuation tolerance: ${expectationLabel(expectationFrame.valuationTolerance, language)}。`,
        rangeDisplay && medianDisplay
          ? `根據 CrowdRisk model，model-implied valuation range 是 ${rangeDisplay}，中位數 ${medianDisplay}。`
          : '目前 CrowdRisk model 未能產生完整 model-implied valuation range。',
        buildExpectationEvidenceLine(ticker, language, valuationCore),
        `白話講，問題不只是「${ticker} 好不好」，而是「${ticker} 是否好得超過市場已經相信的程度」。如果只是符合預期，估值未必有太多容錯；如果增長、NRR 或 FCF margin 放慢，重新定價風險會比較高。這不是最終買賣決定。`
      ]
      : [
        `${ticker} does not screen as cheap. CrowdRisk's valuation framework reads it as high quality, but high expectation.`,
        `Business evidence: ${expectationLabel(expectationFrame.businessEvidence, language)}. Market expectation: ${expectationLabel(expectationFrame.marketExpectation, language)}. Expectation gap: ${expectationLabel(expectationFrame.expectationGap, language)}. Valuation tolerance: ${expectationLabel(expectationFrame.valuationTolerance, language)}.`,
        rangeDisplay && medianDisplay
          ? `Based on the CrowdRisk model, the model-implied valuation range is ${rangeDisplay}, with a median implied price of ${medianDisplay}.`
          : 'The current CrowdRisk model does not produce a complete model-implied valuation range.',
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
  const month = monthMatch ? Number(monthMatch[1]) : null;
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
          ? `${ticker} ${moveVerb} ${moveAmount} from the first post-earnings reaction session to the ${horizon}th trading day after its ${eventDate} earnings release.`
          : `${ticker} ${moveVerb} ${moveAmount} over the ${horizon} trading days after its ${eventDate} earnings release.`,
        timingText,
        asksDrift
          ? `In plain English, this measures whether the stock kept moving or gave back gains after the first reaction-session close, through the ${horizon}th trading-day close.`
          : `The return is measured from the pre-earnings close to the close of the ${horizon}th trading day after the release.`,
        'This reflects how the stock traded after earnings, not a final investment decision.'
      ],
    action: { type: 'open_event_study', label: language === 'zh' ? '打開事件研究' : 'Open Event Study' }
  });
};

const buildEarningsReactionAnswer = ({ question, ticker, language, earningsReactionPayload, earningsReactionReturnPayload }) => {
  const dynamicAnswer = buildDynamicEarningsReactionAnswer({ question, ticker, language, earningsReactionReturnPayload });
  if (dynamicAnswer) return dynamicAnswer;

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
        : `The current data is insufficient to verify ${ticker}'s follow-through from the first reaction session to the ${horizon}th trading day.`
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
          ? `${ticker} ${moveVerb} ${moveAmount} from the first post-earnings reaction session to the ${horizon}th trading day after its ${eventDate} earnings release.`
          : `${ticker} ${moveVerb} ${moveAmount} over the ${horizon} trading days after its ${eventDate} earnings release.`,
        timingText,
        asksDrift
          ? `In plain English, this measures whether the stock kept moving or gave back gains after the first reaction-session close, through the ${horizon}th trading-day close.`
          : `The return is measured from the pre-earnings close to the close of the ${horizon}th trading day after the release.`,
        'This reflects how the stock traded after earnings, not a final investment decision.'
      ],
    action: { type: 'open_event_study', label: language === 'zh' ? '打開事件研究' : 'Open Event Study' }
  });
};

export const answerAskCrowdRiskQuestion = ({ question, locale = 'en', payload = null, stockPerformancePayload = null, referencePeerMapPayload = null, earningsReactionPayload = null, earningsReactionReturnPayload = null }) => {
  const { language, ticker, intent } = resolveAskCrowdRiskRequest({ question, locale, payload, stockPerformancePayload, referencePeerMapPayload });

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
  if (intent === 'market_cap') return buildMarketCapAnswer({ ticker, language, stockPerformancePayload });
  if (intent === 'stock_performance') return buildStockPerformanceAnswer({ ticker, language, stockPerformancePayload });
  if (intent === 'momentum_rank') return buildMomentumRankAnswer({ ticker, language, payload });
  if (intent === 'valuation_snapshot') return buildValuationSnapshotAnswer({ ticker, language, stockPerformancePayload });
  if (intent === 'earnings_reaction') return buildEarningsReactionAnswer({ question, ticker, language, earningsReactionPayload, earningsReactionReturnPayload });

  return buildCoverageStatusAnswer({ ticker, language, payload, stockPerformancePayload, referencePeerMapPayload });
};
