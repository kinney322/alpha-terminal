import assert from 'node:assert/strict';
import { isValidEarningsRadarLifecyclePayload } from '../src/data/payloadAdapter.js';

const event = {
  event_id: 'MU|2026-06-24',
  ticker: 'MU',
  phase: 'post_earnings',
  lifecycle: { state: 'measured_post_earnings', reason_codes: [] },
  schedule: { release_date: '2026-06-24', release_date_status: 'verified' },
  expectations: {},
  actuals: {},
  market_reaction: {},
  historical_context: {},
  ranking: {},
  quality: {},
  links: {}
};

const valid = {
  meta: {
    version: 'earnings-radar-lifecycle-v1',
    as_of_date: '2026-07-10',
    generated_at: '2026-07-11T02:00:00Z',
    event_count: 1
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

console.log('Earnings lifecycle adapter tests passed.');
