const NORMALIZED_ZH_LABELS = {
  ai_compute: 'AI 算力',
  ai_compute_infrastructure: 'AI 算力基建',
  banks_credit: '銀行 / 信貸',
  between_catalysts: '催化空窗',
  catalyst_watch: '催化觀察',
  cloud_ai_enterprise_software_platform: '雲端 / AI / 企業軟件平台',
  cloud_ai_platform: '雲端 AI 平台',
  cloud_commerce_advertising_platform: '雲端 / 電商 / 廣告平台',
  cloud_data_enterprise_software_ecosystem: '雲端 / 數據 / 企業軟件生態',
  cloud_data_enterprise_software_platform: '雲端 / 數據 / 企業軟件平台',
  consumer_discretionary: '非必需消費',
  consumer_staples: '必需消費',
  crypto_bitcoin_infra: '加密貨幣 / Bitcoin 基建',
  cybersecurity: '網絡安全',
  data_center_systems: '數據中心系統',
  event_day: '公布日',
  evidence_improving: '證據改善',
  energy: '能源',
  financials: '金融',
  fintech_payments: '金融科技 / 支付',
  high_runup: '升幅偏高',
  high_run_up: '升幅偏高',
  healthcare: '醫療',
  healthcare_pharma: '醫療 / 藥企',
  industrials: '工業',
  industrials_aerospace: '工業 / 航空航天',
  logistics_transport: '物流 / 運輸',
  market_data_only: '只有市場數據',
  market_evidence_available: '市場證據可用',
  memory_storage: '記憶體 / 儲存',
  momentum_candidate: '動能候選',
  neutral: '中性',
  options_data_unavailable: '期權數據未齊',
  peer_read_through_in: '同業讀穿流入',
  post_earnings: '財報後',
  post_earnings_watch: '財報後觀察',
  pre_earnings: '財報前',
  price_discovery: '新高延伸階段',
  reclaiming_20ma: '收復 20MA',
  reclaiming_50ma: '收復 50MA',
  retail: '零售',
  semiconductors: '半導體',
  semiconductor_equipment: '半導體設備',
  software_saas: 'SaaS 軟件',
  software_saas_scaling: 'SaaS 軟件 / 擴張期',
  stable: '穩定',
  strong_trend: '趨勢強',
  strong_trend_but_extended: '趨勢強但偏伸延',
  testing_old_highs: '挑戰歷史高位',
  trend_needs_confirmation: '趨勢需要確認',
  unmapped: '未分類',
  weak_momentum: '動能偏弱'
};

const DIRECT_ZH_LABELS = {
  'High Runup': '升幅偏高',
  'Options Data Unavailable': '期權數據未齊',
  'Peer Read-Through In': '同業讀穿流入',
  'Pre Earnings': '財報前',
  'Post Earnings': '財報後',
  'Cloud / Data / Enterprise Software Ecosystem': '雲端 / 數據 / 企業軟件生態',
  'Cloud / Data / Enterprise Software Platform': '雲端 / 數據 / 企業軟件平台',
  'Cloud & AI Platform': '雲端 AI 平台',
  'Q1 2026 ended 2026-03-31': 'Q1 2026，截至 2026-03-31',
  LONG: '做多',
  SHORT: '做空',
  NEUTRAL: '中性'
};

export const normalizeDisplayKey = (value) => (
  String(value || '')
    .trim()
    .replace(/([a-z])([A-Z])/g, '$1 $2')
    .replace(/[+/]/g, ' ')
    .replace(/&/g, ' ')
    .replace(/[^a-zA-Z0-9]+/g, '_')
    .replace(/^_+|_+$/g, '')
    .toLowerCase()
);

export const titleizeLabel = (value, fallback = '') => {
  if (value === undefined || value === null || value === '') return fallback;
  return String(value)
    .replace(/([a-z])([A-Z])/g, '$1 $2')
    .replace(/_/g, ' ')
    .replace(/\b\w/g, (char) => char.toUpperCase());
};

const INTERNAL_STATUS_KEYS = new Set([
  'coverage',
  'coverage_pending',
  'curated',
  'current_curated_read',
  'data_coverage',
  'data_partial',
  'date_pending',
  'direction_pending',
  'evidence_quality',
  'evidence_status',
  'external_move_check',
  'missing_evidence_pending',
  'not_verified',
  'partial',
  'pending',
  'pending_data',
  'review_pending',
  'source',
  'truth_coverage',
  'unverified',
  'value_core_pending',
  '已整理',
  '部分',
  '待補',
  '待補資料',
  '待補行情',
  '方向待補',
  '未核實',
  '覆蓋待補',
  '覆蓋狀態',
  '資料覆蓋',
  '證據質素'
]);

const INTERNAL_STATUS_PATTERNS = [
  /^pending\b/i,
  /^not verified\b/i,
  /^coverage pending\b/i,
  /^data partial\b/i,
  /feed pending/i,
  /needs confirmed .* evidence/i,
  /資料.*待補/,
  /需要.*證據確認/
];

export const isFrontendInternalStatus = (value) => {
  if (value === undefined || value === null) return true;
  const raw = String(value).trim();
  if (!raw) return true;
  if (raw === '-' || raw === '—') return true;
  const normalized = normalizeDisplayKey(raw);
  return INTERNAL_STATUS_KEYS.has(raw) ||
    INTERNAL_STATUS_KEYS.has(normalized) ||
    INTERNAL_STATUS_PATTERNS.some((pattern) => pattern.test(raw));
};

export const frontendEmptyText = (locale = 'en', context = 'default') => {
  if (locale === 'zh') {
    if (context === 'market') return '暫無足夠市場反應資料';
    if (context === 'financial') return '暫無足夠財務資料';
    if (context === 'valuation') return '暫無足夠估值資料';
    return '暫無足夠資料';
  }
  if (context === 'market') return 'Not enough market-reaction data yet';
  if (context === 'financial') return 'Not enough financial data yet';
  if (context === 'valuation') return 'Not enough valuation data yet';
  return 'Not enough data yet';
};

export const hasFrontendValue = (value) => !isFrontendInternalStatus(value);

export const safeFrontendText = (value, locale = 'en', fallback = '') => {
  if (!hasFrontendValue(value)) return fallback || frontendEmptyText(locale);
  return displayLabel(value, locale, fallback);
};

export const optionalFrontendText = (value, locale = 'en') => (
  hasFrontendValue(value) ? displayLabel(value, locale, '') : ''
);

export const displayLabel = (value, locale = 'en', fallback = '') => {
  if (value === undefined || value === null || value === '') return fallback;
  const raw = String(value).trim();
  if (locale === 'zh') {
    if (DIRECT_ZH_LABELS[raw]) return DIRECT_ZH_LABELS[raw];
    const normalized = normalizeDisplayKey(raw);
    if (NORMALIZED_ZH_LABELS[normalized]) return NORMALIZED_ZH_LABELS[normalized];
    const peerReadthroughMatch = raw.match(/^Peer Read-Through In:\s*(\d+)/i);
    if (peerReadthroughMatch) return `同業讀穿流入：${peerReadthroughMatch[1]}`;
  }
  return titleizeLabel(raw, fallback);
};
