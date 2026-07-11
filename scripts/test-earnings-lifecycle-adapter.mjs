import assert from 'node:assert/strict';
import { isValidEarningsRadarLifecyclePayload } from '../src/data/payloadAdapter.js';

const event = {
  event_id: 'MU|2026-06-24',
  ticker: 'MU',
  phase: 'post_earnings',
  lifecycle: { state: 'measured_post_earnings', reason_codes: [] },
  schedule: { release_date: '2026-06-24', release_date_status: 'verified' },
  expectations: {},
  pre_event_performance: {
    status: 'final',
    as_of_date: '2026-06-24',
    pre_1_return: 0.01,
    pre_3_return: 0.03,
    pre_5_return: 0.05,
    pre_7_return: 0.07,
    pre_10_return: 0.1,
    pre_14_return: 0.14
  },
  actuals: {},
  market_reaction: {},
  historical_context: {},
  ranking: {},
  quality: {},
  links: {}
};

const emptyCoverage = { available_count: 0, eligible_count: 0, coverage_pct: null };
const enrichmentFields = Object.fromEntries([
  'fiscal_period', 'eps_estimate', 'revenue_estimate', 'estimate_as_of', 'actual_eps',
  'actual_revenue', 'eps_surprise_pct', 'revenue_surprise_pct', 'guidance', 'r_plus_10'
].map((field) => [field, { ...emptyCoverage }]));

const valid = {
  meta: {
    version: 'earnings-radar-lifecycle-v1',
    as_of_date: '2026-07-10',
    generated_at: '2026-07-11T02:00:00Z',
    event_count: 1
  },
  coverage: {
    active_ticker_count: 2,
    event_ticker_count: 1,
    no_active_event_count: 1,
    no_active_events: [{
      ticker: 'BNY',
      state: 'no_active_event',
      reason_code: 'NO_CURRENT_EARNINGS_DATE',
      historical_context: { sample_size: null },
      links: { event_study: false, momentum: true, stock_dossier: false }
    }],
    content_enrichment: {
      contract_version: 'earnings-content-enrichment-v1',
      missing_values_are_null: true,
      fields: enrichmentFields
    }
  },
  boards: {
    pre_earnings: { verified: [], estimated: [] },
    event_day: [],
    post_earnings: [event.event_id]
  },
  events_detail: { [event.event_id]: event }
};

assert.equal(isValidEarningsRadarLifecyclePayload(valid), true);
assert.equal(isValidEarningsRadarLifecyclePayload({ ...valid, meta: { ...valid.meta, version: '1.2' } }), false);
assert.equal(isValidEarningsRadarLifecyclePayload({ ...valid, boards: { ...valid.boards, post_earnings: ['MISSING|2026-01-01'] } }), false);
assert.equal(isValidEarningsRadarLifecyclePayload({ ...valid, boards: { ...valid.boards, pre_earnings: [] } }), false);
assert.equal(isValidEarningsRadarLifecyclePayload({ ...valid, meta: { ...valid.meta, event_count: 2 } }), false);
assert.equal(isValidEarningsRadarLifecyclePayload({ ...valid, coverage: undefined }), false);
assert.equal(isValidEarningsRadarLifecyclePayload({
  ...valid,
  events_detail: { [event.event_id]: { ...event, pre_event_performance: undefined } }
}), false);
assert.equal(isValidEarningsRadarLifecyclePayload({
  ...valid,
  events_detail: {
    [event.event_id]: {
      ...event,
      pre_event_performance: { ...event.pre_event_performance, pre_3_return: '0.03' }
    }
  }
}), false);
assert.equal(isValidEarningsRadarLifecyclePayload({
  ...valid,
  events_detail: {
    [event.event_id]: {
      ...event,
      pre_event_performance: { ...event.pre_event_performance, status: 'live', as_of_date: null }
    }
  }
}), false);
assert.equal(isValidEarningsRadarLifecyclePayload({
  ...valid,
  coverage: { ...valid.coverage, no_active_events: [{ ...valid.coverage.no_active_events[0], ticker: 'MU' }] }
}), false);
assert.equal(isValidEarningsRadarLifecyclePayload({
  ...valid,
  coverage: { ...valid.coverage, active_ticker_count: 3 }
}), false);

console.log('Earnings lifecycle adapter tests passed.');
