import assert from 'node:assert/strict';
import { getMomentumUniverseCoverage } from '../src/data/payloadAdapter.js';

const rankings = Array.from({ length: 202 }, (_, index) => ({
  ticker: `T${index + 1}`
}));

const liveShapedPayload = {
  momentum_universe: {
    rankings,
    unavailable: [{ ticker: 'SPCX', reason: 'insufficient_ohlcv_history' }]
  }
};

assert.deepEqual(getMomentumUniverseCoverage(liveShapedPayload), {
  rankedCount: 202,
  unavailableCount: 1,
  activeCount: 203
});

assert.deepEqual(getMomentumUniverseCoverage({
  momentum_universe: {
    rankings: [...rankings, { ticker: 't1' }],
    unavailable: [
      { ticker: 'SPCX' },
      { ticker: 'spcx' },
      { ticker: 'T1' },
      { ticker: '' },
      null
    ]
  }
}), {
  rankedCount: 202,
  unavailableCount: 1,
  activeCount: 203
});

assert.deepEqual(getMomentumUniverseCoverage({
  momentum_universe: {
    rankings,
    unavailable: []
  }
}), {
  rankedCount: 202,
  unavailableCount: 0,
  activeCount: 202
});

assert.deepEqual(getMomentumUniverseCoverage(null), {
  rankedCount: 0,
  unavailableCount: 0,
  activeCount: 0
});

console.log('Momentum active coverage tests passed.');
