const TICKER_ALIASES = {
  BNY: 'BK'
};

export const normalizeRawTicker = (value) => String(value || '').trim().toUpperCase();

export const canonicalizeTicker = (value) => {
  const normalized = normalizeRawTicker(value);
  return TICKER_ALIASES[normalized] || normalized;
};

export const getTickerAliasTarget = (value) => {
  const normalized = normalizeRawTicker(value);
  return TICKER_ALIASES[normalized] || null;
};
