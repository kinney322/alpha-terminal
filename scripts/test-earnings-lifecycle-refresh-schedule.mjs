import assert from 'node:assert/strict';
import {
  getNextEarningsLifecycleRefreshAt,
  getNextEarningsLifecycleRefreshDelayMs
} from '../src/data/earningsLifecycleRefreshSchedule.js';

const beforeFridayRefresh = new Date('2026-07-10T22:00:00Z');
assert.equal(getNextEarningsLifecycleRefreshAt(beforeFridayRefresh).toISOString(), '2026-07-10T22:30:00.000Z');
assert.equal(getNextEarningsLifecycleRefreshDelayMs(beforeFridayRefresh), 30 * 60 * 1000);

const afterFridayRefresh = new Date('2026-07-10T22:45:00Z');
assert.equal(getNextEarningsLifecycleRefreshAt(afterFridayRefresh).toISOString(), '2026-07-13T22:30:00.000Z');

const saturday = new Date('2026-07-11T15:00:00Z');
assert.equal(getNextEarningsLifecycleRefreshAt(saturday).toISOString(), '2026-07-13T22:30:00.000Z');

const winterWeekday = new Date('2026-12-07T22:00:00Z');
assert.equal(getNextEarningsLifecycleRefreshAt(winterWeekday).toISOString(), '2026-12-07T23:30:00.000Z');

console.log('Earnings lifecycle refresh schedule tests passed.');
