// src/data/payloadAdapter.js

import { canonicalizeTicker, getTickerLookupKeys } from './tickerAliases.js';

const API_BASE = 'https://kw-terminal-api.myfootballplaces.workers.dev';
const V1_2_URL = `${API_BASE}/event-opportunity/radar-v1.2-latest`;
const V1_1_URL = `${API_BASE}/event-opportunity/radar-v1.1-latest`;
const PREOPEN_CATALYST_URL = `${API_BASE}/event-opportunity/preopen-catalyst-radar-latest`;
const STOCK_PERFORMANCE_URL = `${API_BASE}/event-opportunity/stock-performance-latest`;
const REFERENCE_PEER_MAP_URL = `${API_BASE}/event-opportunity/reference-peer-map-latest`;
const EARNINGS_REACTION_RETURN_URL = `${API_BASE}/event-study/earnings-reaction-return`;
const EARNINGS_RADAR_LIFECYCLE_URL = `${API_BASE}/event-study/earnings-radar-lifecycle`;
const LOCAL_ENRICHED_PAYLOAD_URL = 'http://127.0.0.1:5055/radar-v1.2-enriched.module.preview.json';

function shouldUseLocalEnrichedPayload() {
  if (typeof window === 'undefined') return false;
  const isLocalhost = ['127.0.0.1', 'localhost', '::1'].includes(window.location.hostname);
  if (!isLocalhost) return false;
  const params = new URLSearchParams(window.location.search);
  if (params.get('payload') === 'local-enriched') return true;
  return window.localStorage?.getItem('crowdrisk_payload_override') === 'local-enriched';
}

function isValidV12Payload(payload) {
  if (!payload || typeof payload !== 'object' || Array.isArray(payload)) return false;
  if (!payload.meta || payload.meta.version !== "1.2") return false;
  if (!payload.events_detail || typeof payload.events_detail !== 'object') return false;
  if (!payload.radar_lists || typeof payload.radar_lists !== 'object') return false;
  return true;
}

function isValidV11Payload(payload) {
  if (!payload || typeof payload !== 'object' || Array.isArray(payload)) return false;
  // Ensure it's not the flat leaderboard (which might be an array or have a 'leaderboard' key)
  if (payload.leaderboard && Array.isArray(payload.leaderboard)) return false;
  if (payload.meta && payload.meta.version && payload.meta.version !== "1.1") return false;
  if (!payload.events_detail || typeof payload.events_detail !== 'object') return false;
  if (!payload.radar_lists || typeof payload.radar_lists !== 'object') return false;
  return true;
}

function isValidStockPerformancePayload(payload) {
  if (!payload || typeof payload !== 'object' || Array.isArray(payload)) return false;
  if (!payload.meta || typeof payload.meta !== 'object') return false;
  if (!payload.returns || typeof payload.returns !== 'object' || Array.isArray(payload.returns)) return false;
  return true;
}

function isValidReferencePeerMapPayload(payload) {
  if (!payload || typeof payload !== 'object' || Array.isArray(payload)) return false;
  if (!payload.meta || payload.meta.version !== '1.0') return false;
  if (!payload.ecosystems || typeof payload.ecosystems !== 'object' || Array.isArray(payload.ecosystems)) return false;
  if (!payload.ticker_index || typeof payload.ticker_index !== 'object' || Array.isArray(payload.ticker_index)) return false;
  return true;
}

function isValidEarningsGapSummaryPayload(payload) {
  if (!payload || typeof payload !== 'object' || Array.isArray(payload)) return false;
  if (!payload.ticker) return false;
  if (!Array.isArray(payload.quarter_log)) return false;
  return true;
}

function isValidEarningsReactionReturnPayload(payload) {
  if (!payload || typeof payload !== 'object' || Array.isArray(payload)) return false;
  if (payload.ok === true && payload.status === 'verified') {
    if (!payload.event || typeof payload.event !== 'object') return false;
    if (!payload.metrics || typeof payload.metrics !== 'object') return false;
    return true;
  }
  if (payload.ok === false && payload.status === 'not_verified') {
    if (!payload.reason) return false;
    return true;
  }
  return false;
}

export function isValidEarningsRadarLifecyclePayload(payload) {
  if (!payload || typeof payload !== 'object' || Array.isArray(payload)) return false;
  if (payload.meta?.version !== 'earnings-radar-lifecycle-v1') return false;
  if (!payload.meta?.as_of_date || !payload.meta?.generated_at) return false;
  if (!payload.boards || typeof payload.boards !== 'object' || Array.isArray(payload.boards)) return false;
  if (!payload.events_detail || typeof payload.events_detail !== 'object' || Array.isArray(payload.events_detail)) return false;

  const pre = payload.boards.pre_earnings;
  if (!pre || !Array.isArray(pre.verified) || !Array.isArray(pre.estimated)) return false;
  if (!Array.isArray(payload.boards.event_day) || !Array.isArray(payload.boards.post_earnings)) return false;

  const ids = [
    ...pre.verified,
    ...pre.estimated,
    ...payload.boards.event_day,
    ...payload.boards.post_earnings
  ];
  if (ids.some((eventId) => typeof eventId !== 'string' || !payload.events_detail[eventId])) return false;
  if (payload.meta.event_count !== undefined && Number(payload.meta.event_count) !== Object.keys(payload.events_detail).length) return false;

  return true;
}

export async function fetchAndNormalizeRadarPayload() {
  let rawData = null;

  // Local QA only: never active on production hostnames.
  if (shouldUseLocalEnrichedPayload()) {
    try {
      const res = await fetch(LOCAL_ENRICHED_PAYLOAD_URL, { headers: { Accept: 'application/json' } });
      if (res.ok) {
        const data = await res.json();
        if (isValidV12Payload(data)) {
          return data;
        }
        console.warn(`[Schema Error] Local QA payload from ${LOCAL_ENRICHED_PAYLOAD_URL} is not valid v1.2.`);
      }
    } catch (error) {
      console.warn(`[Fetch Error] Failed to fetch local QA payload from ${LOCAL_ENRICHED_PAYLOAD_URL}:`, error);
    }
  }

  // 1. Primary Fetch: v1.2
  try {
    const res = await fetch(V1_2_URL, { headers: { Accept: 'application/json' } });
    if (res.ok) {
      const data = await res.json();
      if (isValidV12Payload(data)) {
        rawData = data;
      } else {
        console.warn(`[Schema Error] Payload from ${V1_2_URL} is not a valid v1.2 schema.`);
      }
    }
  } catch (error) {
    console.warn(`[Fetch Error] Failed to fetch from ${V1_2_URL}:`, error);
  }

  // 2. Fallback Fetch: v1.1
  if (!rawData) {
    try {
      const res = await fetch(V1_1_URL, { headers: { Accept: 'application/json' } });
      if (res.ok) {
        const data = await res.json();
        if (isValidV11Payload(data)) {
          rawData = data;
        } else {
          console.warn(`[Schema Error] Payload from ${V1_1_URL} is not a valid normalized schema.`);
        }
      }
    } catch (error) {
      console.warn(`[Fetch Error] Failed to fetch from ${V1_1_URL}:`, error);
    }
  }

  // 3. Terminal Error
  if (!rawData) {
    throw new Error('Radar Data Unavailable');
  }

  return rawData;
}

export async function fetchPreopenCatalystRadarPayload() {
  const res = await fetch(PREOPEN_CATALYST_URL, { headers: { Accept: 'application/json' } });
  if (!res.ok) {
    throw new Error(`Preopen catalyst payload unavailable (${res.status})`);
  }

  const data = await res.json();
  if (!isValidV12Payload(data)) {
    throw new Error('Preopen catalyst payload is not a valid v1.2 schema');
  }

  return data;
}

export async function fetchEarningsRadarLifecyclePayload() {
  const res = await fetch(EARNINGS_RADAR_LIFECYCLE_URL, { headers: { Accept: 'application/json' } });
  if (!res.ok) {
    throw new Error(`Earnings lifecycle unavailable (${res.status})`);
  }

  const data = await res.json();
  if (!isValidEarningsRadarLifecyclePayload(data)) {
    throw new Error('Earnings lifecycle response does not match the required contract');
  }

  return data;
}

export async function fetchStockPerformancePayload() {
  const res = await fetch(STOCK_PERFORMANCE_URL, { headers: { Accept: 'application/json' } });
  if (!res.ok) {
    throw new Error(`Stock performance payload unavailable (${res.status})`);
  }

  const data = await res.json();
  if (!isValidStockPerformancePayload(data)) {
    throw new Error('Stock performance payload is not a valid schema');
  }

  return data;
}

export async function fetchReferencePeerMapPayload() {
  const res = await fetch(REFERENCE_PEER_MAP_URL, { headers: { Accept: 'application/json' } });
  if (!res.ok) {
    throw new Error(`Reference peer map payload unavailable (${res.status})`);
  }

  const data = await res.json();
  if (!isValidReferencePeerMapPayload(data)) {
    throw new Error('Reference peer map payload is not a valid schema');
  }

  return data;
}

export async function fetchEarningsGapSummaryPayload(ticker) {
  const normalizedTicker = String(ticker || '').trim().toUpperCase();
  if (!normalizedTicker) {
    throw new Error('Ticker is required for earnings gap summary');
  }

  const url = `${API_BASE}/event-study/earnings-gap-summary?symbol=${encodeURIComponent(normalizedTicker)}`;
  const res = await fetch(url, { headers: { Accept: 'application/json' } });
  if (!res.ok) {
    throw new Error(`Earnings gap summary unavailable for ${normalizedTicker} (${res.status})`);
  }

  const data = await res.json();
  if (!isValidEarningsGapSummaryPayload(data)) {
    throw new Error(`Earnings gap summary for ${normalizedTicker} is not a valid schema`);
  }

  return data;
}

export async function fetchEarningsReactionReturnPayload(request) {
  const normalizedTicker = canonicalizeTicker(request?.ticker);
  const horizon = Number(request?.horizon);
  if (!normalizedTicker) {
    throw new Error('Ticker is required for earnings reaction return');
  }
  if (!Number.isInteger(horizon) || horizon < 1 || horizon > 252) {
    throw new Error('A valid R+N horizon is required for earnings reaction return');
  }

  let lastError = null;

  for (const lookupTicker of getTickerLookupKeys(normalizedTicker)) {
    const params = new URLSearchParams({
      symbol: lookupTicker,
      horizon: String(horizon),
      metric: request?.metric || 'both'
    });

    if (request?.release_date) {
      params.set('release_date', request.release_date);
    } else if (request?.latest) {
      params.set('latest', 'true');
    } else {
      if (request?.year) params.set('year', String(request.year));
      if (request?.month) params.set('month', String(request.month));
      if (request?.calendar_quarter) params.set('calendar_quarter', String(request.calendar_quarter));
    }

    const res = await fetch(`${EARNINGS_REACTION_RETURN_URL}?${params.toString()}`, { headers: { Accept: 'application/json' } });
    const data = await res.json().catch(() => null);
    if (!res.ok) {
      lastError = data?.error || `Earnings reaction return unavailable for ${lookupTicker} (${res.status})`;
      continue;
    }
    if (!isValidEarningsReactionReturnPayload(data)) {
      lastError = `Earnings reaction return for ${lookupTicker} is not a valid verified schema`;
      continue;
    }

    return {
      ...data,
      requested_ticker: normalizedTicker,
      source_ticker: lookupTicker
    };
  }

  throw new Error(lastError || `Earnings reaction return unavailable for ${normalizedTicker}`);
}
