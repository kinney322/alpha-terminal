import { buildStockLogoUrl } from './stockLogoUrls';

const stockDossierProfiles = {
  DDOG: {
    ticker: 'DDOG',
    companyName: 'Datadog, Inc.',
    exchange: 'NASDAQ',
    logoUrl: buildStockLogoUrl('DDOG'),
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
        t1: 'Reaction evidence',
        t10: 'Forward drift evidence',
        risk: '5D risk budget'
      }
    },
    valueCore: {
      ticker: 'DDOG',
      value_core_type: 'Software / SaaS',
      company_stage_candidate: 'Scaling',
      primary_value_driver: 'Net retention and large customer expansion',
      thesis_break_trigger: 'NRR deterioration, large customer growth slowdown, or durable FCF margin compression',
      evidence_needed: [
        'NRR / DBNR trend',
        '$100k+ ARR customer growth',
        'RPO / cRPO growth',
        'FCF margin',
        'SBC as percentage of revenue',
        'AI-native workload adoption signal'
      ],
      evidence_quality: 'Partial',
      dossier_state: 'golden_sample',
      frontend_label: 'Golden Sample',
      coverage_status: 'Curated',
      needs_human_review: false,
      source: 'stockDossierProfiles.js'
    },
    visualPhaseOne: {
      performanceGrid: {
        source: 'Verified return series pending',
        periods: [
          { label: 'Today', value: null, note: 'Intraday return not verified' },
          { label: '1 Week', value: null, note: 'Short-term return feed pending' },
          { label: '1 Month', value: null, note: 'Monthly return feed pending' },
          { label: '3 Months', value: null, note: 'Quarter return feed pending' },
          { label: '6 Months', value: null, note: 'Half-year return feed pending' },
          { label: '1 Year', value: null, note: 'Annual return feed pending' }
        ]
      },
      signalScreens: [
        {
          title: 'Revenue Growth Leaders',
          explanation: 'Q1 revenue grew 32% year over year, so growth remains a core evidence point.',
          evidenceState: 'Curated'
        },
        {
          title: 'Strong Momentum Stocks',
          explanation: 'Momentum evidence keeps DDOG on the research queue, but it does not prove the business case.',
          evidenceState: 'Market-derived'
        },
        {
          title: 'RSI Stretch Check',
          explanation: 'RSI-specific evidence is not verified in the current dossier and should remain a stretch monitor.',
          evidenceState: 'Not verified'
        },
        {
          title: 'Cloud Observability Leader',
          explanation: 'Datadog remains a broad observability and security platform for cloud operations teams.',
          evidenceState: 'Curated'
        },
        {
          title: 'Growth Screen Signal',
          explanation: 'Revenue growth, large-customer expansion, and FCF margin make it suitable for a growth-quality screen review.',
          evidenceState: 'Curated'
        }
      ],
      faq: {
        overview: [
          {
            question: 'What does DDOG do?',
            answer: 'Datadog provides observability and security software for cloud infrastructure, applications, logs, and user experience. The dossier treats it as a subscription SaaS platform with land-and-expand economics.'
          },
          {
            question: 'Why does DDOG matter in AI/cloud operations?',
            answer: 'AI and cloud workloads can increase infrastructure complexity. That makes monitoring, security visibility, and operational telemetry more important evidence to track.'
          }
        ],
        businessCore: [
          {
            question: 'What creates value for DDOG?',
            answer: 'The main value driver is customer expansion after adoption. Net retention, larger customers, product breadth, and FCF margin show whether the platform keeps compounding.'
          },
          {
            question: 'Which metrics matter most?',
            answer: 'NRR or DBNR, $100k+ ARR customer growth, RPO or cRPO growth, FCF margin, and SBC as a percentage of revenue matter most. These metrics monitor durability rather than a short-term price move.'
          }
        ],
        marketEvidence: [
          {
            question: 'Does strong momentum mean the thesis is proven?',
            answer: 'No. Momentum is market evidence, not proof of company quality or valuation support. It helps decide whether the name deserves continued monitoring.'
          },
          {
            question: 'What would make the market evidence weaker?',
            answer: 'The market evidence weakens if relative strength fades, the post-earnings move retraces, or event follow-through data turns negative. Those signals should be monitored beside business and valuation evidence.'
          }
        ]
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
          'DDOG is executing well, with Q1 revenue growth of 32% and strong free-cash-flow conversion. At roughly 16x FY2026 revenue guide and about 55x FY2026 FCF if Q1 margin holds, the price already assumes years of durable growth and strong cash margins.'
      },
      coreMetrics: [
        { id: 'revenue_growth', label: 'Revenue Growth', value: 0.32, format: 'percent' },
        { id: 'fcf_margin', label: 'FCF Margin', value: 0.29, format: 'percent' },
        { id: 'rule_of_40', label: 'Rule of 40', value: 61, format: 'number' },
        { id: 'ev_revenue', label: 'EV / FY2026 Revenue', value: 16, format: 'multiple' },
        { id: 'ev_fcf', label: 'EV / FY2026 FCF', value: 55, format: 'multiple' },
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
      forwardValuationRange: {
        valuationMethod: 'FY2028 model revenue x EV / revenue range, with EV / FCF as cross-check',
        forwardModelHorizon: 'FY2027 / FY2028 model assumption',
        forecastMetric: 'Revenue',
        dataType: 'Model assumption, not live consensus',
        confidence: 'Medium-low until current full consensus model and clean FCF bridge are added',
        fy26RevenueGuide: '$4.30B-$4.34B',
        fy26RevenueMid: 4.32,
        netCashAdjustment: 3.8,
        methodNote: 'Model assumption, not live consensus. Current company guidance is FY2026; FY2027 and FY2028 are forward model years used for valuation only.',
        fiscalYearNote: 'Fiscal-year note: current company guide is FY2026. FY2027 and FY2028 figures below are model assumptions, not live consensus. Datadog fiscal year-end is not verified in the current payload.',
        missingEvidence: [
          'Current full consensus model',
          'Explicit diluted share count',
          'Clean FY2028 model FCF bridge for EV / FCF valuation'
        ],
        scenarios: [
          {
            label: 'Bear',
            fy27Revenue: 5.18,
            fy28Revenue: 5.9,
            revenueGrowth: 'FY2027 model +20% / FY2028 model +14%',
            evRevenueMultiple: 9,
            evFcfMultiple: 31
          },
          {
            label: 'Base',
            fy27Revenue: 5.36,
            fy28Revenue: 6.49,
            revenueGrowth: 'FY2027 model +24% / FY2028 model +21%',
            evRevenueMultiple: 13,
            evFcfMultiple: 43
          },
          {
            label: 'Bull',
            fy27Revenue: 5.53,
            fy28Revenue: 7.19,
            revenueGrowth: 'FY2027 model +28% / FY2028 model +30%',
            evRevenueMultiple: 16,
            evFcfMultiple: 52
          }
        ]
      },
      scenarios: [
        {
          label: 'Bull Case',
          text: 'Revenue compounds 25%-30%, net retention stays in the low-120%s or better, AI/security products expand wallet share, FCF margin moves above 30%, and SBC as a percentage of revenue declines.',
          impliedOutcome: 'Premium valuation can remain defensible if DDOG proves AI/security workload expansion is additive and margins stay above 30%.',
          upsideDownside: 'References the Valuation Core forward model; price range and median return are model-derived, not formal price targets.',
          threeYearIrr: 'Scenario-level IRR is not separately modeled here; see Valuation Core 3Y IRR to median.',
          trigger: 'RPO, $100k+ ARR customers, net retention, FCF margin, and SBC discipline all improve together.'
        },
        {
          label: 'Base Case',
          text: 'Revenue decelerates from 32% toward the low/mid-20%s, FCF margin stays high-20%s, SBC improves gradually, and upside is mostly limited by multiple risk.',
          impliedOutcome: 'Business quality stays high, but expected return is capped because valuation already capitalizes much of the story.',
          upsideDownside: 'References the Valuation Core forward model; price range and median return are model-derived, not formal price targets.',
          threeYearIrr: 'Scenario-level IRR is not separately modeled here; see Valuation Core 3Y IRR to median.',
          trigger: 'Growth moderates, FCF holds high-20%s, and the market keeps DDOG on a premium but less forgiving multiple.'
        },
        {
          label: 'Bear Case',
          text: 'Growth falls below 20%, cloud optimization or native tools pressure pricing, product expansion slows, or SBC stays elevated. Downside would be valuation-led.',
          impliedOutcome: 'Multiple compression becomes the main downside path if execution no longer supports priced-for-perfection assumptions.',
          upsideDownside: 'References the Valuation Core forward model; price range and median return are model-derived, not formal price targets.',
          threeYearIrr: 'Scenario-level IRR is not separately modeled here; see Valuation Core 3Y IRR to median.',
          trigger: 'Revenue growth drops below 20%-25%, retention weakens, margins slip, or dilution stays elevated.'
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
