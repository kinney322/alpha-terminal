import assert from 'node:assert/strict';
import {
  attachDossierTruthToRadarPayload,
  buildDossierTruthIndex,
  fetchDossierTruthPayload,
  getDossierTruthCompany,
  resolveDossierTruthFailureState,
  validateDossierTruthPayload
} from '../src/data/dossierTruthAdapter.js';

const fixture = {
  schema_version: 'dossier-shared-truth-v1',
  generated_at: '2026-07-13T12:00:00Z',
  as_of_date: '2026-07-13',
  universe_count: 2,
  companies: [
    {
      ticker: 'FAST',
      company_name: 'Fastenal Company',
      sector: null,
      primary_theme: 'industrials_aerospace',
      secondary_themes: [],
      active: true,
      coverage_tier: 'standard',
      identity_status: 'partial',
      earnings: {
        event_id: 'FAST|Q2-2026|2026-07-14',
        fiscal_period: 'Q2 2026',
        release_date: '2026-07-14',
        timing: 'BMO',
        reaction_day: '2026-07-14',
        confidence: 'verified',
        timing_status: 'verified'
      },
      coverage: {
        identity: 'partial', earnings: 'verified', fundamentals: 'pending',
        valuation: 'pending', peer_context: 'pending'
      },
      fundamental_evidence: { snapshot_count: 0, latest_knowledge_timestamp: null }
    },
    {
      ticker: 'BRK-B',
      company_name: 'Berkshire Hathaway Inc.',
      sector: null,
      primary_theme: 'insurance_asset_management',
      secondary_themes: [],
      active: true,
      coverage_tier: 'standard',
      identity_status: 'partial',
      earnings: null,
      coverage: {
        identity: 'partial', earnings: 'pending', fundamentals: 'pending',
        valuation: 'pending', peer_context: 'pending'
      },
      fundamental_evidence: { snapshot_count: 0, latest_knowledge_timestamp: null }
    }
  ]
};

assert.equal(validateDossierTruthPayload(fixture), fixture);
assert.equal(buildDossierTruthIndex(fixture).size, 2);
assert.equal(getDossierTruthCompany(fixture, 'BRK.B').ticker, 'BRK-B');
assert.equal(getDossierTruthCompany(fixture, 'fast').earnings.fiscal_period, 'Q2 2026');

const radar = { momentum_universe: { rankings: [{ ticker: 'FAST' }] } };
const attached = attachDossierTruthToRadarPayload(radar, fixture);
assert.notEqual(attached, radar);
assert.equal(attached.dossier_shared_truth, fixture);
assert.equal(radar.dossier_shared_truth, undefined);
assert.equal(attached.momentum_universe.rankings.length, 1);

const truthOnly = attachDossierTruthToRadarPayload(null, fixture);
assert.equal(truthOnly.dossier_shared_truth, fixture);
assert.equal(attachDossierTruthToRadarPayload(null, null), null);

assert.deepEqual(resolveDossierTruthFailureState(fixture), {
  payload: fixture,
  status: 'stale'
});
assert.deepEqual(resolveDossierTruthFailureState(null), {
  payload: null,
  status: 'error'
});

const fetched = await fetchDossierTruthPayload({
  fetchImpl: async () => ({
    ok: true,
    status: 200,
    async json() { return fixture; }
  })
});
assert.equal(fetched.universe_count, 2);

assert.throws(() => validateDossierTruthPayload({
  ...fixture,
  companies: [fixture.companies[0], { ...fixture.companies[0], ticker: 'fast' }]
}), /duplicated/);

assert.throws(() => validateDossierTruthPayload({
  ...fixture,
  companies: [{ ...fixture.companies[0], active: false }, fixture.companies[1]]
}), /not active/);

console.log('PASS dossier truth frontend adapter');
