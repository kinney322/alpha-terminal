import { canonicalizeTicker } from './tickerAliases.js';

export const DOSSIER_TRUTH_SCHEMA_VERSION = 'dossier-shared-truth-v1';

const API_BASE = import.meta.env?.VITE_API_BASE || 'https://kw-terminal-api.myfootballplaces.workers.dev';
const DOSSIER_TRUTH_URL = `${API_BASE}/event-opportunity/dossier-truth-latest`;
const COVERAGE_STATES = new Set(['verified', 'partial', 'pending']);
const IDENTITY_STATES = new Set(['verified', 'partial', 'coverage_pending']);
const DATE_CONFIDENCE_STATES = new Set(['verified', 'estimated', 'unknown']);

const truthIndexCache = new WeakMap();

const normalizeTruthTicker = (value) => canonicalizeTicker(value).replace(/\./g, '-');

const requiredText = (value, field) => {
  const text = String(value || '').trim();
  if (!text) throw new Error(`Dossier truth ${field} is required`);
  return text;
};

const validateCoverage = (coverage, ticker) => {
  if (!coverage || typeof coverage !== 'object' || Array.isArray(coverage)) {
    throw new Error(`Dossier truth coverage is invalid for ${ticker}`);
  }
  for (const field of ['identity', 'earnings', 'fundamentals', 'valuation', 'peer_context']) {
    if (!COVERAGE_STATES.has(coverage[field])) {
      throw new Error(`Dossier truth coverage.${field} is invalid for ${ticker}`);
    }
  }
};

const validateEarnings = (earnings, ticker) => {
  if (earnings === null || earnings === undefined) return;
  if (typeof earnings !== 'object' || Array.isArray(earnings)) {
    throw new Error(`Dossier truth earnings is invalid for ${ticker}`);
  }
  requiredText(earnings.event_id, `${ticker}.earnings.event_id`);
  requiredText(earnings.release_date, `${ticker}.earnings.release_date`);
  if (!DATE_CONFIDENCE_STATES.has(earnings.confidence)) {
    throw new Error(`Dossier truth earnings confidence is invalid for ${ticker}`);
  }
};

export function validateDossierTruthPayload(payload) {
  if (!payload || typeof payload !== 'object' || Array.isArray(payload)) {
    throw new Error('Dossier truth payload must be an object');
  }
  if (payload.schema_version !== DOSSIER_TRUTH_SCHEMA_VERSION) {
    throw new Error('Unsupported Dossier truth schema version');
  }
  if (!/^\d{4}-\d{2}-\d{2}$/.test(String(payload.as_of_date || ''))) {
    throw new Error('Dossier truth as_of_date is invalid');
  }
  if (!Array.isArray(payload.companies)) {
    throw new Error('Dossier truth companies must be an array');
  }
  if (Number(payload.universe_count) !== payload.companies.length) {
    throw new Error('Dossier truth universe_count does not match companies');
  }

  const seen = new Set();
  for (const company of payload.companies) {
    if (!company || typeof company !== 'object' || Array.isArray(company)) {
      throw new Error('Dossier truth company rows must be objects');
    }
    const ticker = normalizeTruthTicker(requiredText(company.ticker, 'company.ticker'));
    if (!ticker || seen.has(ticker)) {
      throw new Error(`Dossier truth ticker is invalid or duplicated: ${ticker}`);
    }
    seen.add(ticker);
    if (!IDENTITY_STATES.has(company.identity_status)) {
      throw new Error(`Dossier truth identity_status is invalid for ${ticker}`);
    }
    if (company.active !== true) {
      throw new Error(`Dossier truth company is not active: ${ticker}`);
    }
    validateCoverage(company.coverage, ticker);
    validateEarnings(company.earnings, ticker);
  }
  return payload;
}

export async function fetchDossierTruthPayload({ fetchImpl = fetch } = {}) {
  const response = await fetchImpl(DOSSIER_TRUTH_URL, {
    headers: { Accept: 'application/json' }
  });
  const json = await response.json();
  if (!response.ok) {
    throw new Error(json?.error || `Dossier truth request failed (${response.status})`);
  }
  return validateDossierTruthPayload(json);
}

export function buildDossierTruthIndex(payload) {
  if (!payload) return new Map();
  validateDossierTruthPayload(payload);
  if (truthIndexCache.has(payload)) return truthIndexCache.get(payload);

  const index = new Map(payload.companies.map((company) => [
    normalizeTruthTicker(company.ticker),
    company
  ]));
  truthIndexCache.set(payload, index);
  return index;
}

export function getDossierTruthCompany(payload, ticker) {
  const normalizedTicker = normalizeTruthTicker(ticker);
  if (!payload || !normalizedTicker) return null;
  return buildDossierTruthIndex(payload).get(normalizedTicker) || null;
}

export function attachDossierTruthToRadarPayload(radarPayload, dossierTruthPayload) {
  if (!radarPayload && !dossierTruthPayload) return radarPayload;
  return {
    ...(radarPayload || {}),
    dossier_shared_truth: dossierTruthPayload || null
  };
}

export function resolveDossierTruthFailureState(lastGoodPayload) {
  return {
    payload: lastGoodPayload || null,
    status: lastGoodPayload ? 'stale' : 'error'
  };
}
