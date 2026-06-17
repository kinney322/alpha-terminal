const TICKER_ALIASES = {
  BK: 'BNY'
};

const TICKER_LOOKUP_FALLBACKS = {
  BNY: ['BK']
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

export const getTickerLookupKeys = (value) => {
  const normalized = normalizeRawTicker(value);
  const canonical = canonicalizeTicker(value);
  return [...new Set([
    canonical,
    normalized,
    ...(TICKER_LOOKUP_FALLBACKS[canonical] || [])
  ].filter(Boolean))];
};
