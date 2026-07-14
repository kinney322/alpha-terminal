import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { buildDossierRecords, buildDossierSummary } from '../src/components/dossierHelpers.js';

const pendingCoverage = () => ({
  identity: 'partial',
  earnings: 'pending',
  fundamentals: 'pending',
  valuation: 'pending',
  peer_context: 'pending'
});

const company = (ticker, companyName) => ({
  ticker,
  company_name: companyName,
  sector: null,
  primary_theme: null,
  secondary_themes: [],
  active: true,
  coverage_tier: 'standard',
  identity_status: 'partial',
  earnings: null,
  coverage: pendingCoverage(),
  fundamental_evidence: {
    snapshot_count: 0,
    latest_knowledge_timestamp: null
  }
});

const truth = {
  schema_version: 'dossier-shared-truth-v1',
  generated_at: '2026-07-13T14:00:00Z',
  as_of_date: '2026-07-13',
  universe_count: 3,
  companies: [
    company('AAPL', 'Apple Inc.'),
    company('FAST', 'Fastenal Company'),
    company('SPCX', 'SpaceX')
  ]
};

const payload = {
  dossier_shared_truth: truth,
  events_detail: {
    'AAPL-Upcoming': {
      event_id: 'AAPL-Upcoming',
      ticker: 'AAPL',
      event_phase: 'pre_earnings',
      status: 'pre_earnings',
      trust_layer: { missing_fields: [] }
    },
    'DEAD-Stale': {
      event_id: 'DEAD-Stale',
      ticker: 'DEAD',
      event_phase: 'post_earnings',
      status: 'post_earnings',
      trust_layer: { missing_fields: [] }
    }
  },
  momentum_universe: {
    ranked_count: 5,
    rankings: [
      {
        ticker: 'FAST',
        rank: 1,
        score: 88,
        momentum_evidence: { status: 'available', evidence: {} },
        trend_setup: { status: 'available', metrics: {} }
      },
      { ticker: 'SPY', rank: 2, score: 99 },
      { ticker: 'QQQ', rank: 3, score: 98 },
      { ticker: 'DEAD', rank: 4, score: 97 }
    ]
  },
  stock_performance: {
    returns: {
      SPY: { return_1d: 0.1 },
      QQQ: { return_1d: 0.2 }
    }
  },
  radar_lists: {}
};

const records = buildDossierRecords(payload);
assert.equal(records.length, truth.universe_count);
assert.deepEqual(new Set(records.map((record) => record.ticker)), new Set(['AAPL', 'FAST', 'SPCX']));
assert.equal(records.filter((record) => record.ticker === 'SPCX').length, 1);
assert.equal(records.some((record) => ['SPY', 'QQQ', 'DEAD'].includes(record.ticker)), false);
assert.deepEqual(records.map((record) => record.ticker), ['FAST', 'AAPL', 'SPCX']);

const spcx = records.find((record) => record.ticker === 'SPCX');
assert.equal(spcx.primaryEventDetail.event_phase, 'tracked_coverage');
assert.equal(spcx.primaryEventDetail.status, 'coverage_pending');
assert.equal(spcx.primaryEventDetail.event_category, 'Tracked Coverage');
assert.equal(spcx.primaryEventDetail.release_date, undefined);
assert.equal(spcx.primaryEventDetail.pead_signal, undefined);
assert.equal(spcx.primaryEventDetail.momentum_evidence.score, undefined);
assert.equal(spcx.derivedState.researchState, 'Coverage Pending');
assert.equal(spcx.derivedState.moveType, 'Coverage Pending');
assert.equal(spcx.derivedState.pulseState, 'Unavailable');
assert.ok(spcx.primaryEventDetail.trust_layer.missing_fields.includes('market_evidence'));
const spcxSummary = buildDossierSummary(spcx.primaryEventDetail, payload);
assert.match(spcxSummary.verdict, /Coverage is pending/);
assert.doesNotMatch(`${spcxSummary.reason} ${spcxSummary.verdict}`, /catalyst/i);
const spcxSummaryZh = buildDossierSummary(spcx.primaryEventDetail, payload, 'zh');
assert.match(spcxSummaryZh.reason, /active 公司名單/);
assert.match(spcxSummaryZh.verdict, /資料覆蓋仍待補/);
assert.doesNotMatch(`${spcxSummaryZh.reason} ${spcxSummaryZh.verdict}`, /Coverage is pending/);

const evidenceOnlyTruth = {
  ...truth,
  universe_count: 2,
  companies: truth.companies.filter((row) => row.ticker !== 'SPCX')
};
const evidenceOnlyOrder = buildDossierRecords({
  ...payload,
  dossier_shared_truth: evidenceOnlyTruth
}).map((record) => record.ticker);
assert.deepEqual(records.filter((record) => record.ticker !== 'SPCX').map((record) => record.ticker), evidenceOnlyOrder);

const truthOnlyRecords = buildDossierRecords({ dossier_shared_truth: truth });
assert.equal(truthOnlyRecords.length, 3);
assert.deepEqual(truthOnlyRecords.map((record) => record.ticker), ['AAPL', 'FAST', 'SPCX']);
assert.ok(truthOnlyRecords.every((record) => record.derivedState.researchState === 'Coverage Pending'));

assert.deepEqual(buildDossierRecords({
  momentum_universe: { rankings: [{ ticker: 'FAST', score: 88 }] }
}), []);

const dossierIndexSource = await readFile(
  new URL('../src/components/StockDossierIndex.jsx', import.meta.url),
  'utf8'
);
assert.doesNotMatch(
  dossierIndexSource,
  /Identity verified|Identity partial|Identity coverage pending|公司身份已核實|公司身份部分齊備|公司身份待補|identityCoverageLabel/
);
for (const label of ['ticker', 'sectorTheme', 'researchState', 'moveType', 'thesisPulse', 'action']) {
  assert.match(dossierIndexSource, new RegExp(`data-label=\\{copy\\.${label}\\}`));
}

const catalystRadarCss = await readFile(
  new URL('../src/components/CatalystRadar.css', import.meta.url),
  'utf8'
);
assert.match(catalystRadarCss, /\.stock-dossier-index-table td::before\s*\{[^}]*content: attr\(data-label\)/s);
assert.doesNotMatch(catalystRadarCss, /content:\s*["']Coverage["']/);

const dossierViewSource = await readFile(
  new URL('../src/components/StockDossierView.jsx', import.meta.url),
  'utf8'
);
assert.match(dossierViewSource, /if \(!tickerForSummary \|\| isCoveragePending\)/);
assert.match(dossierViewSource, /const marketSnapshot = isCoveragePending\s*\? null/);
assert.match(dossierViewSource, /const performanceGrid = isCoveragePending\s*\? null/);
assert.match(dossierViewSource, /const momentumRanking = isCoveragePending \? null/);
assert.match(dossierViewSource, /stockPerformancePayload: isCoveragePending \? null : stockPerformancePayload/);

console.log('PASS dossier active membership');
