const includesAny = (text, terms) => terms.some((term) => text.includes(term));

const matchesWord = (text, pattern) => pattern.test(text);

export const DEFAULT_ASK_CROWDRISK_INTENT = 'coverage_status';

export const ASK_CROWDRISK_ANSWER_CATALOG = [
  {
    id: 'research_queue',
    intent: 'research_queue',
    label: 'Research queue',
    deterministic: true,
    sources: ['radar-v1.2-latest'],
    requiredSlots: [],
    requiredFacts: ['pre_earnings', 'post_earnings', 'momentum_universe'],
    verifiedRule: 'Radar payload must expose radar_lists or momentum_universe.rankings.',
    notVerifiedRule: 'Do not invent tickers when the active radar payload is missing.',
    allowedJudgment: ['research routing', 'inspect-first prioritization'],
    bannedWording: ['Buy', 'Sell', 'Hold', 'portfolio allocation'],
    trigger: {
      enPatterns: [/\bresearch queue\b/, /\binspect first\b/, /\bwatchlist\b/, /\bwhat should i (look at|inspect|research)\b/, /\bwhat to (look at|inspect|research)\b/],
      zhTerms: ['研究隊列', '今日研究', '今天研究', '值得睇', '睇咩', '看什麼', '留意邊', '關注邊']
    }
  },
  {
    id: 'peer_ecosystem',
    intent: 'peer_ecosystem',
    label: 'Peer ecosystem',
    deterministic: true,
    sources: ['reference-peer-map-latest'],
    requiredSlots: ['ticker'],
    requiredFacts: ['ecosystem_name', 'covered_ecosystem', 'direct_reference_peers', 'candidate_to_add'],
    verifiedRule: 'Ticker must exist in reference-peer-map-latest ticker_index.',
    notVerifiedRule: 'Do not infer peers when the ticker is absent from reference-peer-map-latest.',
    allowedJudgment: ['ecosystem position', 'context-only peer explanation'],
    bannedWording: ['active coverage for reference-only peers', 'candidate promoted without approval'],
    trigger: {
      enPatterns: [/\b(peer|peers|ecosystem|chain|competitor|competitors)\b/],
      zhTerms: ['同行', '產業鏈', '競爭', '同業']
    }
  },
  {
    id: 'coverage_status',
    intent: 'coverage_status',
    label: 'Coverage status',
    deterministic: true,
    sources: ['reference-peer-map-latest', 'radar-v1.2-latest', 'stock-performance-latest'],
    requiredSlots: ['ticker'],
    requiredFacts: ['coverage_relationship', 'macro_status', 'candidate_status'],
    verifiedRule: 'Ticker status must come from macro rule, reference-peer-map ticker_index, radar rankings, or stock-performance returns.',
    notVerifiedRule: 'Unknown tickers must return Not verified instead of being treated as coverage.',
    allowedJudgment: ['active coverage', 'reference only', 'candidate / not active', 'macro instrument'],
    bannedWording: ['Stock Dossier coverage for SPY or QQQ', 'active coverage for candidate-only tickers'],
    trigger: {
      enPatterns: [/\b(active|coverage|candidate|dossier|universe)\b/],
      zhTerms: ['加入', '覆蓋', '候選', '檔案', '名單']
    }
  },
  {
    id: 'market_cap',
    intent: 'market_cap',
    label: 'Market cap',
    deterministic: true,
    sources: ['stock-performance-latest'],
    requiredSlots: ['ticker'],
    requiredFacts: ['capitalization.status', 'capitalization.market_cap', 'capitalization.shares_outstanding_as_of'],
    verifiedRule: 'capitalization.status must be available.',
    notVerifiedRule: 'Missing, stale, or invalid capitalization cannot be converted into a market-cap answer.',
    allowedJudgment: ['capitalization context'],
    bannedWording: ['valuation conclusion from market cap alone'],
    trigger: {
      enPatterns: [/\b(market\s*cap|capitalization)\b/, /\bshares outstanding\b/, /\bshares as of\b/, /\bshare count\b/],
      zhTerms: ['市值', '股份日期', '股數', '流通股', '已發行股份', '股份數']
    }
  },
  {
    id: 'post_reaction_drift',
    intent: 'earnings_reaction',
    label: 'Post-reaction drift',
    deterministic: true,
    sources: ['earnings-reaction-return', 'earnings-gap-summary fallback'],
    requiredSlots: ['ticker', 'earnings_event_selector', 'horizon'],
    requiredFacts: ['release_date', 'reaction_day', 'timing_basis', 'horizon', 'post_reaction_drift'],
    verifiedRule: 'Dynamic earnings-reaction-return route must return status=verified, or fallback summary must contain the requested R+N field.',
    notVerifiedRule: 'Do not estimate post-reaction drift without verified OHLCV-backed route output.',
    allowedJudgment: ['continued repricing', 'fade / follow-through explanation'],
    bannedWording: ['calendar-month return when the question asks trading days', 'gap return mixed with R+N return'],
    trigger: {
      enPatterns: [/\b(post[-_ ]?reaction|drift|post earnings drift)\b/],
      zhTerms: ['漂移', '延續']
    }
  },
  {
    id: 'earnings_rplusn_return',
    intent: 'earnings_reaction',
    label: 'Earnings R+N return',
    deterministic: true,
    sources: ['earnings-reaction-return', 'earnings-gap-summary fallback'],
    requiredSlots: ['ticker', 'earnings_event_selector', 'horizon'],
    requiredFacts: ['release_date', 'reaction_day', 'timing_basis', 'horizon', 'earnings_return'],
    verifiedRule: 'Dynamic earnings-reaction-return route must return status=verified, or fallback summary must contain the requested R+N field.',
    notVerifiedRule: 'Do not estimate arbitrary R+N values without verified OHLCV-backed route output.',
    allowedJudgment: ['continued repricing', 'earnings reaction explanation'],
    bannedWording: ['calendar-month return when the question asks trading days', 'gap return mixed with R+N return'],
    trigger: {
      enPatterns: [/\bearnings\b/, /\br\s*\+\s*\d*\b/],
      zhTerms: ['財報', '業績']
    }
  },
  {
    id: 'stock_performance',
    intent: 'stock_performance',
    label: 'Stock performance',
    deterministic: true,
    sources: ['stock-performance-latest'],
    requiredSlots: ['ticker'],
    requiredFacts: ['returns row with at least one period value'],
    verifiedRule: 'Ticker must exist in stock-performance-latest returns with a verified period return.',
    notVerifiedRule: 'Do not infer period performance from price chart memory or UI text.',
    allowedJudgment: ['market-performance context'],
    bannedWording: ['company-quality conclusion from performance alone'],
    trigger: {
      enPatterns: [/\b(performance|price performance|return|1m|1 month|one month|1w|week|today|ytd)\b/],
      zhTerms: ['回報', '升咗', '跌咗', '表現', '股價走勢', '一個月', '一星期', '今日']
    }
  },
  {
    id: 'momentum_rank',
    intent: 'momentum_rank',
    label: 'Momentum rank',
    deterministic: true,
    sources: ['radar-v1.2-latest'],
    requiredSlots: ['ticker'],
    requiredFacts: ['scanner_rank', 'theme_rank', 'relative_strength_percentile'],
    verifiedRule: 'Ticker must exist in momentum_universe.rankings.',
    notVerifiedRule: 'Missing ticker rank must return Not verified.',
    allowedJudgment: ['routing signal', 'relative-strength context'],
    bannedWording: ['valuation conclusion', 'company-quality proof'],
    trigger: {
      enPatterns: [/\b(momentum|rank|ranking|relative strength|rs)\b/],
      zhTerms: ['動能', '排名', '相對強度']
    }
  },
  {
    id: 'valuation_expectation_gap',
    intent: 'valuation_snapshot',
    label: 'Valuation expectation gap',
    deterministic: true,
    sources: ['stockDossierProfiles.js', 'stock-performance-latest'],
    requiredSlots: ['ticker'],
    requiredFacts: ['business_evidence', 'market_expectation', 'expectation_gap', 'valuation_tolerance'],
    verifiedRule: 'Stock Dossier valuationCore.status must be available; live price and market cap may refine range math when available.',
    notVerifiedRule: 'No verified valuationCore means no valuation judgment.',
    allowedJudgment: ['偏貴', '不是便宜股', '容錯空間低', '市場要求高', 'evidence supportive, expectations demanding'],
    bannedWording: ['Buy', 'Sell', 'Hold', '必買', '必沽', 'backend model'],
    trigger: {
      enPatterns: [/\b(valuation|expensive|cheap|reasonable|price target|multiple)\b/],
      zhTerms: ['估值', '貴', '便宜', '合理', '目標價', '倍數']
    }
  }
];

export const resolveAskCrowdRiskCatalogEntry = (question) => {
  const raw = String(question || '');
  const text = raw.toLowerCase();

  return ASK_CROWDRISK_ANSWER_CATALOG.find((entry) => {
    const enMatch = (entry.trigger.enPatterns || []).some((pattern) => matchesWord(text, pattern));
    const zhMatch = includesAny(raw, entry.trigger.zhTerms || []);
    return enMatch || zhMatch;
  }) || ASK_CROWDRISK_ANSWER_CATALOG.find((entry) => entry.intent === DEFAULT_ASK_CROWDRISK_INTENT);
};
