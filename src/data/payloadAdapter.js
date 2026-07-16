// src/data/payloadAdapter.js

import { canonicalizeTicker, getTickerLookupKeys } from './tickerAliases.js';

const API_BASE = import.meta.env?.VITE_API_BASE || 'https://kw-terminal-api.myfootballplaces.workers.dev';
const V1_2_URL = `${API_BASE}/event-opportunity/radar-v1.2-latest`;
const V1_1_URL = `${API_BASE}/event-opportunity/radar-v1.1-latest`;
const PREOPEN_CATALYST_URL = `${API_BASE}/event-opportunity/preopen-catalyst-radar-latest`;
const STOCK_PERFORMANCE_URL = `${API_BASE}/event-opportunity/stock-performance-latest`;
const REFERENCE_PEER_MAP_URL = `${API_BASE}/event-opportunity/reference-peer-map-latest`;
const EARNINGS_REACTION_RETURN_URL = `${API_BASE}/event-study/earnings-reaction-return`;
const EARNINGS_RADAR_LIFECYCLE_URL = `${API_BASE}/event-study/earnings-radar-lifecycle`;
const EARNINGS_PRE_EVENT_REFERENCE_URL = `${API_BASE}/event-study/earnings-pre-event-reference`;
const LOCAL_ENRICHED_PAYLOAD_URL = 'http://127.0.0.1:5055/radar-v1.2-enriched.module.preview.json';
const PRE_EVENT_RETURN_FIELDS = [
  'pre_1_return', 'pre_3_return', 'pre_5_return',
  'pre_7_return', 'pre_10_return', 'pre_14_return'
];
const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;
const PRE_EVENT_REFERENCE_WINDOWS = new Set(['1y', '3y', '5y', 'max']);
const PRE_EVENT_REFERENCE_HORIZONS = [1, 3, 5, 7, 10, 14];
const PRE_EVENT_REFERENCE_STAT_FIELDS = [
  'median_return', 'mean_return', 'positive_rate', 'min_return', 'max_return'
];

export function getMomentumUniverseCoverage(payload) {
  const rankings = Array.isArray(payload?.momentum_universe?.rankings)
    ? payload.momentum_universe.rankings
    : [];
  const unavailable = Array.isArray(payload?.momentum_universe?.unavailable)
    ? payload.momentum_universe.unavailable
    : [];
  const rankedTickers = new Set(
    rankings.map((row) => canonicalizeTicker(row?.ticker)).filter(Boolean)
  );
  const unavailableTickers = new Set();

  unavailable.forEach((row) => {
    const ticker = canonicalizeTicker(row?.ticker);
    if (ticker && !rankedTickers.has(ticker)) unavailableTickers.add(ticker);
  });

  return {
    rankedCount: rankedTickers.size,
    unavailableCount: unavailableTickers.size,
    activeCount: rankedTickers.size + unavailableTickers.size
  };
}

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
  if (!payload.coverage || typeof payload.coverage !== 'object' || Array.isArray(payload.coverage)) return false;
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

  const eventTickers = new Set(Object.values(payload.events_detail).map((event) => event?.ticker).filter(Boolean));
  const noActiveEvents = payload.coverage.no_active_events;
  if (!Array.isArray(noActiveEvents)) return false;
  const noEventTickers = noActiveEvents.map((event) => event?.ticker);
  if (noEventTickers.some((ticker) => !ticker || eventTickers.has(ticker))) return false;
  if (new Set(noEventTickers).size !== noEventTickers.length) return false;
  if (Number(payload.coverage.event_ticker_count) !== eventTickers.size) return false;
  if (Number(payload.coverage.no_active_event_count) !== noActiveEvents.length) return false;
  if (Number(payload.coverage.active_ticker_count) !== eventTickers.size + noActiveEvents.length) return false;
  if (payload.coverage.content_enrichment?.contract_version !== 'earnings-content-enrichment-v1') return false;
  if (payload.coverage.content_enrichment?.missing_values_are_null !== true) return false;
  const enrichmentFields = payload.coverage.content_enrichment?.fields;
  if (!enrichmentFields || typeof enrichmentFields !== 'object') return false;
  const requiredEnrichmentFields = [
    'fiscal_period', 'eps_estimate', 'revenue_estimate', 'estimate_as_of', 'actual_eps',
    'actual_revenue', 'eps_surprise_pct', 'revenue_surprise_pct', 'guidance', 'r_plus_10'
  ];
  if (requiredEnrichmentFields.some((field) => {
    const stats = enrichmentFields[field];
    return !stats
      || !Number.isInteger(stats.available_count)
      || !Number.isInteger(stats.eligible_count)
      || stats.available_count < 0
      || stats.eligible_count < stats.available_count;
  })) return false;

  for (const event of Object.values(payload.events_detail)) {
    const performance = event?.pre_event_performance;
    if (!performance || typeof performance !== 'object' || Array.isArray(performance)) return false;
    if (!['live', 'final', 'unavailable'].includes(performance.status)) return false;
    if (performance.as_of_date !== null && !DATE_RE.test(String(performance.as_of_date))) return false;
    if (performance.status !== 'unavailable' && performance.as_of_date === null) return false;
    if (PRE_EVENT_RETURN_FIELDS.some((field) => (
      !Object.prototype.hasOwnProperty.call(performance, field)
      || (performance[field] !== null && (typeof performance[field] !== 'number' || !Number.isFinite(performance[field])))
    ))) return false;
  }

  return true;
}

export function normalizeEarningsPreEventReferencePayload(payload) {
  if (!payload || typeof payload !== 'object' || Array.isArray(payload)) return null;
  const rawMeta = payload.meta && typeof payload.meta === 'object' ? payload.meta : {};
  const rawTickers = payload.tickers && typeof payload.tickers === 'object' && !Array.isArray(payload.tickers)
    ? payload.tickers
    : {};
  const tickers = {};
  for (const [key, rawRow] of Object.entries(rawTickers)) {
    const ticker = String(rawRow?.ticker || key || '').trim().toUpperCase();
    const horizons = {};
    for (const horizon of PRE_EVENT_REFERENCE_HORIZONS) {
      const rawStats = rawRow?.horizons?.[String(horizon)] || {};
      horizons[String(horizon)] = {
        sample_size: rawStats.sample_size,
        median_return: rawStats.median_return,
        mean_return: rawStats.mean_return,
        positive_rate: rawStats.positive_rate,
        min_return: rawStats.min_return,
        max_return: rawStats.max_return
      };
    }
    tickers[ticker] = {
      ticker,
      sample_size: rawRow?.sample_size,
      minimum_horizon_sample_size: rawRow?.minimum_horizon_sample_size,
      low_sample: rawRow?.low_sample,
      horizons
    };
  }
  return {
    contract_version: payload.contract_version,
    meta: {
      as_of_date: rawMeta.as_of_date,
      generated_at: rawMeta.generated_at,
      window: {
        id: rawMeta.window?.id,
        start_date: rawMeta.window?.start_date ?? null,
        end_date: rawMeta.window?.end_date
      },
      ticker_count: rawMeta.ticker_count,
      observation_count: rawMeta.observation_count,
      low_sample_threshold: rawMeta.low_sample_threshold,
      horizons: Array.isArray(rawMeta.horizons) ? [...rawMeta.horizons] : []
    },
    tickers
  };
}

export function isValidEarningsPreEventReferencePayload(payload) {
  if (!payload || typeof payload !== 'object' || Array.isArray(payload)) return false;
  if (payload.contract_version !== 'earnings-pre-event-reference-v1') return false;
  if (!DATE_RE.test(String(payload.meta?.as_of_date || ''))) return false;
  if (!payload.meta?.generated_at || Number.isNaN(new Date(payload.meta.generated_at).getTime())) return false;
  if (!PRE_EVENT_REFERENCE_WINDOWS.has(payload.meta?.window?.id)) return false;
  if (payload.meta.window.start_date !== null && !DATE_RE.test(String(payload.meta.window.start_date))) return false;
  if (!DATE_RE.test(String(payload.meta.window.end_date || ''))) return false;
  if (!Number.isInteger(payload.meta?.ticker_count) || payload.meta.ticker_count < 0) return false;
  if (!Number.isInteger(payload.meta?.observation_count) || payload.meta.observation_count < 0) return false;
  if (!Number.isInteger(payload.meta?.low_sample_threshold) || payload.meta.low_sample_threshold < 1) return false;
  if (JSON.stringify(payload.meta?.horizons) !== JSON.stringify(PRE_EVENT_REFERENCE_HORIZONS)) return false;
  if (!payload.tickers || typeof payload.tickers !== 'object' || Array.isArray(payload.tickers)) return false;
  if (Object.keys(payload.tickers).length !== payload.meta.ticker_count) return false;

  for (const [ticker, row] of Object.entries(payload.tickers)) {
    if (!ticker || row?.ticker !== ticker) return false;
    if (!Number.isInteger(row.sample_size) || row.sample_size < 0) return false;
    if (!Number.isInteger(row.minimum_horizon_sample_size) || row.minimum_horizon_sample_size < 0) return false;
    if (row.minimum_horizon_sample_size > row.sample_size) return false;
    if (typeof row.low_sample !== 'boolean') return false;
    if (!row.horizons || typeof row.horizons !== 'object' || Array.isArray(row.horizons)) return false;
    for (const horizon of PRE_EVENT_REFERENCE_HORIZONS) {
      const stats = row.horizons[String(horizon)];
      if (!stats || !Number.isInteger(stats.sample_size) || stats.sample_size < 0) return false;
      for (const field of PRE_EVENT_REFERENCE_STAT_FIELDS) {
        if (stats[field] !== null && (typeof stats[field] !== 'number' || !Number.isFinite(stats[field]))) return false;
      }
      if (stats.sample_size === 0 && PRE_EVENT_REFERENCE_STAT_FIELDS.some((field) => stats[field] !== null)) return false;
      if (stats.positive_rate !== null && (stats.positive_rate < 0 || stats.positive_rate > 1)) return false;
      if (stats.min_return !== null && stats.max_return !== null && stats.min_return > stats.max_return) return false;
    }
  }
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

export async function fetchEarningsPreEventReferencePayload(window = '5y') {
  const normalizedWindow = String(window || '').toLowerCase();
  if (!PRE_EVENT_REFERENCE_WINDOWS.has(normalizedWindow)) {
    throw new Error('Unsupported pre-earnings history window');
  }
  const url = `${EARNINGS_PRE_EVENT_REFERENCE_URL}?window=${encodeURIComponent(normalizedWindow)}`;
  const res = await fetch(url, { headers: { Accept: 'application/json' } });
  if (!res.ok) {
    throw new Error(`Pre-earnings history unavailable (${res.status})`);
  }
  const rawData = await res.json();
  const data = normalizeEarningsPreEventReferencePayload(rawData);
  if (!isValidEarningsPreEventReferencePayload(data)) {
    throw new Error('Pre-earnings history response does not match the required contract');
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
