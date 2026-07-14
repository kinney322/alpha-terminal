import assert from 'node:assert/strict';
import { buildDossierDecisionBrief } from '../src/data/dossierDecisionBriefAdapter.js';

const fastTruth = {
  ticker: 'FAST',
  company_name: 'Fastenal Company',
  identity_status: 'partial',
  earnings: {
    event_id: 'FAST|Q2-2026|2026-07-14',
    fiscal_period: 'Q2 2026',
    release_date: '2026-07-14',
    timing: 'BMO',
    confidence: 'verified'
  },
  coverage: {
    identity: 'partial', earnings: 'verified', fundamentals: 'pending',
    valuation: 'pending', peer_context: 'pending'
  },
  fundamental_evidence: { snapshot_count: 0, latest_knowledge_timestamp: null }
};

const english = buildDossierDecisionBrief({
  companyTruth: fastTruth,
  eventDetail: { ticker: 'FAST', event_phase: 'pre_earnings' },
  momentumRanking: { ticker: 'FAST', rank: 42 },
  asOfDate: '2026-07-13',
  locale: 'en'
});

assert.equal(english.title, 'Decision Brief');
assert.equal(english.items.length, 6);
assert.equal('coverageLabel' in english, false);
assert.equal('coverageSummary' in english, false);
assert.match(english.items.find((item) => item.id === 'earnings-context').value, /Q2 2026.*2026-07-14.*BMO/);
assert.equal(english.items.find((item) => item.id === 'earnings-context').status, 'verified');
assert.equal(english.items.find((item) => item.id === 'business-evidence').status, 'pending');
const englishVisibleText = english.items.flatMap((item) => [item.label, item.value, item.detail]).join(' ');
assert.doesNotMatch(englishVisibleText, /\bverified\b|official_ir/i);
assert.doesNotMatch(JSON.stringify(english), /\b(buy|sell|hold)\b/i);

const chinese = buildDossierDecisionBrief({
  companyTruth: fastTruth,
  asOfDate: '2026-07-13',
  locale: 'zh'
});
assert.equal(chinese.title, '決策摘要');
assert.equal('coverageLabel' in chinese, false);
assert.equal('coverageSummary' in chinese, false);
assert.match(chinese.items.find((item) => item.id === 'earnings-context').value, /Q2 2026/);
const chineseVisibleText = chinese.items.flatMap((item) => [item.label, item.value, item.detail]).join(' ');
assert.doesNotMatch(chineseVisibleText, /\bverified\b|official_ir/i);

const pending = buildDossierDecisionBrief({
  companyTruth: {
    ticker: 'SPCX',
    earnings: null,
    coverage: {
      identity: 'pending', earnings: 'pending', fundamentals: 'pending',
      valuation: 'pending', peer_context: 'pending'
    },
    fundamental_evidence: { snapshot_count: 0 }
  },
  asOfDate: '2026-07-13',
  locale: 'en'
});
assert.equal(pending.items.find((item) => item.id === 'research-state').value, 'Coverage pending');

console.log('PASS dossier decision brief adapter');
