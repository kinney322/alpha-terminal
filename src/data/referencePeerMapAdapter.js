import { getStockDossierProfile } from './stockDossierProfiles';
import { resolvePeerEcosystemSnapshot } from './stockDossierPeerEcosystemSamples';
import { canonicalizeTicker } from './tickerAliases';

const normalizeTicker = canonicalizeTicker;

const formatLabel = (value) => (
  String(value || '')
    .replace(/_/g, ' ')
    .replace(/\b\w/g, (char) => char.toUpperCase())
);

const companyLabelForTicker = (ticker) => {
  const profile = getStockDossierProfile(ticker);
  return profile?.companyName || ticker;
};

const peerFromTicker = (ticker, layer = 'Active CrowdRisk universe coverage') => ({
  ticker,
  label: companyLabelForTicker(ticker),
  layer,
  status: 'active'
});

const peerFromRecord = (record, status) => ({
  ticker: normalizeTicker(record?.ticker),
  label: record?.company_name || companyLabelForTicker(record?.ticker),
  layer: record?.role_in_value_chain || formatLabel(record?.ecosystem_layer || record?.peer_group || status),
  status
});

export const isValidReferencePeerMapPayload = (payload) => (
  Boolean(payload)
    && typeof payload === 'object'
    && !Array.isArray(payload)
    && payload.meta?.version === '1.0'
    && payload.ecosystems
    && typeof payload.ecosystems === 'object'
    && payload.ticker_index
    && typeof payload.ticker_index === 'object'
);

export const resolveReferencePeerEcosystemSnapshot = (referencePeerMapPayload, ticker) => {
  const normalizedTicker = normalizeTicker(ticker);
  if (!normalizedTicker) return null;

  if (!isValidReferencePeerMapPayload(referencePeerMapPayload)) {
    return resolvePeerEcosystemSnapshot(normalizedTicker);
  }

  const tickerEntries = referencePeerMapPayload.ticker_index?.[normalizedTicker] || [];
  const activeEntry = tickerEntries.find((entry) => entry.relationship === 'active_universe') || tickerEntries[0];
  const ecosystem = referencePeerMapPayload.ecosystems?.[activeEntry?.ecosystem_id];

  if (!ecosystem) {
    return resolvePeerEcosystemSnapshot(normalizedTicker);
  }

  const activeCoverage = (ecosystem.active_universe_tickers || [])
    .map(normalizeTicker)
    .filter((peerTicker) => peerTicker && peerTicker !== normalizedTicker)
    .map((peerTicker) => peerFromTicker(peerTicker));

  const referencePeers = (ecosystem.reference_peers || [])
    .map((peer) => peerFromRecord(peer, 'reference'))
    .filter((peer) => peer.ticker);

  const candidateAdditions = (ecosystem.candidate_to_add || [])
    .map((peer) => peerFromRecord(peer, 'candidate'))
    .filter((peer) => peer.ticker);

  return {
    ecosystemId: ecosystem.ecosystem_id,
    ecosystemName: ecosystem.ecosystem_name,
    source: 'live_reference_peer_map',
    lastReviewedAt: ecosystem.last_reviewed_at || referencePeerMapPayload.meta?.last_reviewed_at,
    position: {
      layer: formatLabel(activeEntry?.ecosystem_layer || activeEntry?.peer_group || ecosystem.ecosystem_name),
      role: activeEntry?.role_in_value_chain || ecosystem.description || 'CrowdRisk ecosystem position context.'
    },
    activeCoverage,
    referencePeers,
    candidateAdditions
  };
};
