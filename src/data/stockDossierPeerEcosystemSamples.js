const peer = (ticker, label, layer, status = 'active') => ({
  ticker,
  label,
  layer,
  status
});

export const STOCK_DOSSIER_PEER_ECOSYSTEM_SAMPLES = {
  DDOG: {
    ecosystemName: 'Cloud / Observability Stack',
    position: {
      layer: 'Observability platform',
      role: 'Telemetry, log, infrastructure, security, and AI operations monitoring layer'
    },
    activeCoverage: [
      peer('CRWD', 'CrowdStrike', 'Security-adjacent platform'),
      peer('PANW', 'Palo Alto Networks', 'Security-adjacent platform'),
      peer('FTNT', 'Fortinet', 'Security-adjacent platform'),
      peer('ZS', 'Zscaler', 'Security-adjacent platform'),
      peer('SNOW', 'Snowflake', 'Data platform adjacency')
    ],
    referencePeers: [
      peer('DT', 'Dynatrace', 'Observability peer', 'reference'),
      peer('ESTC', 'Elastic', 'Search / observability data peer', 'reference'),
      peer('SPLK', 'Splunk', 'Observability / SIEM peer', 'reference'),
      peer('NEWR', 'New Relic', 'Observability peer', 'reference')
    ],
    candidateAdditions: []
  },
  MU: {
    ecosystemName: 'Memory Semiconductor Ecosystem',
    position: {
      layer: 'Memory manufacturer',
      role: 'Direct DRAM / NAND / HBM cycle exposure'
    },
    activeCoverage: [
      peer('SNDK', 'SanDisk', 'NAND / storage manufacturer'),
      peer('AMAT', 'Applied Materials', 'Semiconductor equipment'),
      peer('LRCX', 'Lam Research', 'Semiconductor equipment'),
      peer('ASML', 'ASML', 'Lithography equipment'),
      peer('KLAC', 'KLA', 'Inspection / metrology')
    ],
    referencePeers: [
      peer('ONTO', 'Onto Innovation', 'Metrology / inspection', 'reference'),
      peer('CAMT', 'Camtek', 'Inspection / metrology', 'reference'),
      peer('AMKR', 'Amkor', 'Advanced packaging / test', 'reference'),
      peer('RMBS', 'Rambus', 'Memory interface IP', 'reference')
    ],
    candidateAdditions: []
  },
  NVDA: {
    ecosystemName: 'AI Data Center Ecosystem',
    position: {
      layer: 'Accelerator platform',
      role: 'GPU compute, networking software, and AI systems anchor'
    },
    activeCoverage: [
      peer('AMD', 'AMD', 'Accelerator peer'),
      peer('AVGO', 'Broadcom', 'Networking silicon'),
      peer('MRVL', 'Marvell', 'Networking silicon'),
      peer('ANET', 'Arista', 'Networking / connectivity'),
      peer('DELL', 'Dell', 'Servers / systems'),
      peer('VRT', 'Vertiv', 'Power / cooling'),
      peer('APLD', 'Applied Digital', 'Compute infrastructure')
    ],
    referencePeers: [
      peer('VST', 'Vistra', 'Power generation', 'reference')
    ],
    candidateAdditions: [
      peer('ALAB', 'Astera Labs', 'AI connectivity', 'candidate'),
      peer('NVTS', 'Navitas', 'Power semiconductor', 'candidate'),
      peer('SMCI', 'Supermicro', 'AI servers', 'candidate'),
      peer('CLS', 'Celestica', 'AI hardware manufacturing', 'candidate'),
      peer('FLEX', 'Flex', 'Data-center manufacturing', 'candidate')
    ]
  }
};

export const resolvePeerEcosystemSnapshot = (ticker) => {
  const key = String(ticker || '').trim().toUpperCase();
  return STOCK_DOSSIER_PEER_ECOSYSTEM_SAMPLES[key] || null;
};
