// src/data/payloadAdapter.js

const API_BASE = 'https://kw-terminal-api.myfootballplaces.workers.dev';
const V1_2_URL = `${API_BASE}/event-opportunity/radar-v1.2-latest`;
const V1_1_URL = `${API_BASE}/event-opportunity/radar-v1.1-latest`;
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
