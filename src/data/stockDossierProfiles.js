const stockDossierProfiles = {
  DDOG: {
    ticker: 'DDOG',
    companyName: 'Datadog, Inc.',
    exchange: 'NASDAQ',
    logoUrl: 'https://pub-03e0405010774afe9ca6d569e0cb43b1.r2.dev/crowdrisk/logos/DDOG.png',
    overview:
      'Datadog is a cloud-based observability and security platform used by engineering and operations teams to monitor infrastructure, applications, logs, user experience, and cloud-security workflows.',
    category: 'Cloud & AI Platform',
    analysisDate: '2026-05-09',
    latestFiscalPeriod: 'Q1 2026 ended 2026-03-31',
    marketSnapshot: {
      currentPrice: '$200.16',
      marketCap: '$73.0B',
      enterpriseValue: '$69.2B',
      fiscalYearRevenueGuide: '$4.30B-$4.34B'
    },
    whyNow: {
      reason: 'DDOG is worth deeper research now because post-earnings evidence, platform execution, and momentum are lining up while valuation risk remains unusually demanding.',
      verdict: 'The business quality is high, but the current price already assumes durable 25%+ growth, near-30% FCF margins, and better SBC discipline.'
    },
    dossierVerdict: {
      sourceType: 'curated',
      asOf: '2026-05-09',
      researchState: 'post_earnings_watch',
      businessQuality: 'high',
      valuationState: 'priced_for_perfection',
      marketEvidence: 'constructive',
      finalRead: 'High-quality compounder, but priced for perfection.',
      thesisShift: {
        from: 'ai_risk',
        to: 'ai_benefit',
        confidence: 'medium_high',
        reason:
          'AI workload growth appears to increase the need for observability, security monitoring, and cloud infrastructure visibility rather than weaken Datadog\'s platform value.'
      },
      keySupport: [
        'Q1 revenue grew 32% year over year and crossed the $1B quarterly run-rate threshold.',
        'Free-cash-flow margin reached 29%, keeping Rule of 40 evidence strong.',
        'Large-customer expansion and low-120%s net retention support the platform expansion thesis.',
        'Post-earnings market evidence remains constructive enough to justify continued research.'
      ],
      keyRisk: [
        'The current valuation already assumes durable 25%+ growth and near-30% FCF margins.',
        'Stock-based compensation remains material and needs visible dilution discipline.',
        'There is no margin of safety if growth normalizes toward the low-20%s or below.'
      ]
    },
    quickFacts: [
      { label: 'Business Model', value: 'Subscription SaaS' },
      { label: 'Customer Base', value: '33,200 customers' },
      { label: '$100k+ ARR Customers', value: '4,550 / 90% of ARR' },
      { label: 'Net Retention', value: 'Low-120%s' }
    ],
    marketEvidence: {
      title: 'Post-earnings evidence is constructive, but it is not a valuation answer.',
      points: [
        'The stock remains in a post-earnings research window rather than a cold fundamental screen.',
        'Momentum and relative strength keep DDOG worth monitoring, but they do not solve valuation risk.',
        'The market is treating AI workloads as demand support for observability and security tooling.'
      ]
    },
    eventStudyRead: {
      title: 'The historical setup supports continued monitoring, not automatic entry.',
      interpretation:
        'Use the event-study matrix to judge whether the latest post-earnings move has historically followed through, faded, or required patience. The Dossier should treat this as market evidence beside valuation and fundamentals.',
      checkLabels: {
        baseRate: 'Comparable base rate',
        t1: 'T+1 reaction',
        t10: 'T+10 drift',
        risk: '5D risk budget'
      }
    },
    valuationCore: {
      status: 'available',
      topVerdict: {
        businessQuality: 'High',
        valuationState: 'Priced for Perfection',
        baseCaseSupport: 'Partial',
        marginOfSafety: 'None',
        overallRead: 'High quality compounder; valuation leaves no margin of safety.',
        why:
          'DDOG is executing well, with Q1 revenue growth of 32% and strong free-cash-flow conversion. At roughly 16x FY26 revenue guide and about 55x FY26 FCF if Q1 margin holds, the price already assumes years of durable growth and strong cash margins.'
      },
      coreMetrics: [
        { id: 'revenue_growth', label: 'Revenue Growth', value: 0.32, format: 'percent' },
        { id: 'fcf_margin', label: 'FCF Margin', value: 0.29, format: 'percent' },
        { id: 'rule_of_40', label: 'Rule of 40', value: 61, format: 'number' },
        { id: 'ev_revenue', label: 'EV / FY26 Revenue', value: 16, format: 'multiple' },
        { id: 'ev_fcf', label: 'EV / FY26 FCF', value: 55, format: 'multiple' },
        { id: 'sbc_revenue', label: 'SBC / Revenue', value: 0.196, format: 'percent' },
        { id: 'gross_margin', label: 'GAAP Gross Margin', value: 0.79, format: 'percent' },
        { id: 'cash_securities', label: 'Cash + Securities', value: 4.76, format: 'billion' },
        { id: 'convertible_debt', label: 'Convertible Notes', value: 1.0, format: 'billion' }
      ],
      researchJudgment: [
        'Only reasonable if revenue growth remains above 25% for multiple years while free-cash-flow margin holds near or above 30%.',
        'The base case is only partially supported because quality is high but valuation already capitalizes much of the growth story.',
        'The key shareholder cost is not liquidity risk; it is SBC and dilution discipline.'
      ],
      missingEvidence: [
        'Exact product-level revenue mix',
        'Current full consensus model',
        'Customer concentration detail',
        'Clean ROIC after excess cash and SBC adjustment'
      ],
      scenarios: [
        {
          label: 'Bull Case',
          text: 'Revenue compounds 25%-30%, net retention stays in the low-120%s or better, AI/security products expand wallet share, FCF margin moves above 30%, and SBC as a percentage of revenue declines.'
        },
        {
          label: 'Base Case',
          text: 'Revenue decelerates from 32% toward the low/mid-20%s, FCF margin stays high-20%s, SBC improves gradually, and upside is mostly limited by multiple risk.'
        },
        {
          label: 'Bear Case',
          text: 'Growth falls below 20%, cloud optimization or native tools pressure pricing, product expansion slows, or SBC stays elevated. Downside would be valuation-led.'
        }
      ],
      killData: [
        'Revenue growth drops below 25% without FCF margin expanding above 30%.',
        'Dollar-based net retention falls from low-120%s toward the mid/high-110%s.',
        '$100k+ ARR customer growth falls below 15%.',
        'FCF margin falls below 25% for more than one quarter.',
        'SBC remains above 18%-20% of revenue without a clear dilution offset.',
        'RPO growth stalls or fails to support forward revenue durability.',
        'Cloud-native or hyperscaler competition causes visible pricing pressure.',
        'GAAP operating margin fails to move meaningfully above low single digits.'
      ]
    },
    sections: [
      {
        id: 'business-engine',
        label: 'Business Engine',
        title: 'High-quality observability and security platform',
        points: [
          'Revenue is mainly subscription software, driven by land-and-expand adoption across infrastructure, APM, logs, security, and user-experience monitoring.',
          'Product adoption is deepening: multi-product customers are the core expansion engine.',
          'International revenue remains a growth runway but North America is still the larger base.'
        ]
      },
      {
        id: 'cash-flow-quality',
        label: 'Cash Flow Quality',
        title: 'Strong FCF, but SBC needs a haircut',
        points: [
          'Q1 operating cash flow was strong and FCF margin reached 29%.',
          'SBC was roughly 19.6% of revenue, so shareholder economics are not as clean as headline FCF suggests.',
          'The Dossier should treat cash conversion as constructive, but not ignore dilution.'
        ]
      },
      {
        id: 'competitive-position',
        label: 'Competitive Position',
        title: 'Strong platform moat, not a monopoly moat',
        points: [
          'Breadth, workflow embedding, ease of deployment, and product expansion support the moat.',
          'Competition remains intense from Dynatrace, Elastic, Microsoft, Cisco, IBM, cloud-native tooling, and hyperscaler platforms.',
          'The main risk is not current product quality; it is whether pricing and retention can stay strong at a premium valuation.'
        ]
      }
    ]
  }
};

export function getStockDossierProfile(ticker) {
  return stockDossierProfiles[String(ticker || '').trim().toUpperCase()] || null;
}
