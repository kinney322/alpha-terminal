import assert from 'node:assert/strict';
import {
  isValidEarningsPreEventReferencePayload,
  normalizeEarningsPreEventReferencePayload
} from '../src/data/payloadAdapter.js';

const stats = {
  sample_size: 12,
  median_return: 0.02,
  mean_return: 0.018,
  positive_rate: 0.5833,
  min_return: -0.12,
  max_return: 0.19,
  internal_source: 'must-not-reach-ui'
};
const raw = {
  contract_version: 'earnings-pre-event-reference-v1',
  meta: {
    as_of_date: '2026-07-12',
    generated_at: '2026-07-12T06:00:00Z',
    window: { id: '5y', start_date: '2021-07-12', end_date: '2026-07-12' },
    ticker_count: 1,
    observation_count: 12,
    low_sample_threshold: 8,
    horizons: [1, 3, 5, 7, 10, 14],
    source_table: 'must-not-reach-ui'
  },
  tickers: {
    BAC: {
      ticker: 'BAC',
      sample_size: 12,
      minimum_horizon_sample_size: 12,
      low_sample: false,
      horizons: Object.fromEntries([1, 3, 5, 7, 10, 14].map((horizon) => [String(horizon), stats])),
      calculation_version: 'must-not-reach-ui'
    }
  }
};

const normalized = normalizeEarningsPreEventReferencePayload(raw);
assert.equal(isValidEarningsPreEventReferencePayload(normalized), true);
assert.doesNotMatch(JSON.stringify(normalized), /source_table|internal_source|calculation_version/);
assert.equal(normalized.tickers.BAC.horizons['10'].median_return, 0.02);
assert.equal(isValidEarningsPreEventReferencePayload({
  ...normalized,
  meta: { ...normalized.meta, ticker_count: 2 }
}), false);
assert.equal(isValidEarningsPreEventReferencePayload({
  ...normalized,
  tickers: {
    BAC: {
      ...normalized.tickers.BAC,
      horizons: {
        ...normalized.tickers.BAC.horizons,
        '5': { ...normalized.tickers.BAC.horizons['5'], positive_rate: 1.2 }
      }
    }
  }
}), false);

console.log('Earnings pre-event reference adapter tests passed.');
