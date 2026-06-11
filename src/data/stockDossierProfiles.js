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
            question: 'What should I check first in this dossier?',
            answer: 'Start with Business Core to understand what creates value, then check Market Evidence for current support. After that, review Valuation, Thesis Risk, and Financial Health to see what still needs proof.'
          },
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
        ],
        valuation: [
          {
            question: 'Why does valuation matter even if growth is strong?',
            answer: 'Strong growth can still disappoint if the market already assumes years of durable expansion. This tab checks whether growth, margin, and dilution evidence are enough to support a demanding setup.'
          },
          {
            question: 'What would make the valuation case cleaner?',
            answer: 'The case becomes cleaner if growth stays above the mid-20%s, FCF margin holds near 30%, and SBC trends down as a share of revenue. Peer and consensus context are still needed before raising confidence.'
          }
        ],
        thesisRisk: [
          {
            question: 'What risk would change the thesis first?',
            answer: 'The first risk to watch is business durability: weaker retention, slower large-customer growth, or lower RPO support. Those signals would challenge the expansion engine before the headline story changes.'
          },
          {
            question: 'How should risk signals be read?',
            answer: 'Risk signals are evidence monitors, not instructions. They show what needs follow-up before the dossier read becomes stronger or weaker.'
          }
        ],
        financialHealth: [
          {
            question: 'What financial signal matters most for DDOG?',
            answer: 'The cleanest signal is whether revenue growth can convert into durable free cash flow while SBC becomes less burdensome. Cash generation is strong, but dilution discipline still needs monitoring.'
          },
          {
            question: 'Is cash flow enough by itself?',
            answer: 'No. FCF margin helps, but the quality of that cash flow depends on reinvestment needs, SBC, and whether growth remains broad-based. This tab keeps those items together.'
          }
        ]
      },
      phaseTwo: {
        valuation: {
          posture: {
            title: 'Premium assumptions',
            label: 'Valuation posture',
            note: 'Execution quality is visible, but revenue growth and cash margins need to stay strong.'
          },
          metricCards: [
            { label: 'EV / FY2026 Revenue', value: '16x', note: 'Premium revenue multiple' },
            { label: 'EV / FY2026 FCF', value: '55x', note: 'Cash-flow expectations are high' },
            { label: 'Rule of 40', value: '61', note: 'Growth plus FCF margin evidence' },
            { label: 'Base Case Support', value: 'Partial', note: 'Quality visible; valuation still demanding' }
          ],
          tensionCards: [
            { title: 'Growth vs multiple', state: 'Needs sustained growth', text: 'The setup depends on DDOG keeping revenue growth above the mid-20%s while the revenue multiple remains elevated.' },
            { title: 'Margin sensitivity', state: 'FCF must hold', text: 'A slip below high-20%s FCF margin would make the current valuation read less forgiving.' },
            { title: 'Peer context', state: 'Not verified', text: 'A current peer and consensus multiple set is still needed before the valuation read can be considered complete.' }
          ],
          checklist: [
            'Revenue growth remains above 25% for multiple years',
            'FCF margin stays near or above 30%',
            'NRR / DBNR stays around low-120%s',
            'SBC declines as a percentage of revenue',
            'RPO / cRPO supports forward revenue durability'
          ]
        },
        thesisRisk: {
          lead: 'The main risk is not balance-sheet stress; it is whether platform durability keeps matching a demanding valuation read.',
          riskMap: [
            { label: 'Growth deceleration', severity: 'High', watch: 'Revenue growth below 25% or weaker RPO support' },
            { label: 'Margin / efficiency', severity: 'Medium', watch: 'FCF margin below 25% or SBC staying elevated' },
            { label: 'Platform breadth', severity: 'Medium', watch: 'Large-customer expansion or multi-product adoption slows' },
            { label: 'AI / cloud spend sensitivity', severity: 'Medium', watch: 'Optimization cycle reduces workload expansion signal' }
          ],
          evidenceNeeded: [
            'NRR / DBNR trend',
            '$100k+ ARR customer growth',
            'RPO / cRPO growth',
            'FCF margin durability',
            'SBC as percentage of revenue',
            'AI-native workload adoption signal'
          ]
        },
        financialHealth: {
          qualityRead: 'Growth quality is strong when revenue expansion, FCF margin, and balance-sheet flexibility move together.',
          metricCards: [
            { label: 'Revenue Growth', value: '32.0%', note: 'Q1 year-over-year growth' },
            { label: 'FCF Margin', value: '29.0%', note: 'Strong cash conversion' },
            { label: 'Gross Margin', value: '79.0%', note: 'Software margin profile' },
            { label: 'Cash + Securities', value: '$4.8B', note: 'Liquidity cushion' },
            { label: 'Convertible Notes', value: '$1.0B', note: 'Balance-sheet item to monitor' },
            { label: 'SBC / Revenue', value: '19.6%', note: 'Dilution discipline still matters' }
          ],
          qualityCards: [
            { title: 'Scale and growth', state: 'Constructive', text: 'Revenue crossed the $1B quarterly run-rate threshold while growth remained above 30%.' },
            { title: 'Cash generation', state: 'Strong but needs quality check', text: 'FCF margin is strong, but the read should stay paired with SBC and reinvestment evidence.' },
            { title: 'Reinvestment balance', state: 'Monitor', text: 'The research question is whether DDOG can keep investing in platform breadth while improving shareholder economics.' }
          ]
        }
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
          upsideDownside: 'References the Valuation Core forward model; valuation range and median return are model-derived, not formal targets.',
          threeYearIrr: 'Scenario-level IRR is not separately modeled here; see Valuation Core 3Y IRR to median.',
          trigger: 'RPO, $100k+ ARR customers, net retention, FCF margin, and SBC discipline all improve together.'
        },
        {
          label: 'Base Case',
          text: 'Revenue decelerates from 32% toward the low/mid-20%s, FCF margin stays high-20%s, SBC improves gradually, and upside is mostly limited by multiple risk.',
          impliedOutcome: 'Business quality stays high, but expected return is capped because valuation already capitalizes much of the story.',
          upsideDownside: 'References the Valuation Core forward model; valuation range and median return are model-derived, not formal targets.',
          threeYearIrr: 'Scenario-level IRR is not separately modeled here; see Valuation Core 3Y IRR to median.',
          trigger: 'Growth moderates, FCF holds high-20%s, and the market keeps DDOG on a premium but less forgiving multiple.'
        },
        {
          label: 'Bear Case',
          text: 'Growth falls below 20%, cloud optimization or native tools pressure pricing, product expansion slows, or SBC stays elevated. Downside would be valuation-led.',
          impliedOutcome: 'Multiple compression becomes the main downside path if execution no longer supports priced-for-perfection assumptions.',
          upsideDownside: 'References the Valuation Core forward model; valuation range and median return are model-derived, not formal targets.',
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
  },
  NVDA: {
    ticker: 'NVDA',
    companyName: 'NVIDIA Corporation',
    exchange: 'NASDAQ',
    logoUrl: buildStockLogoUrl('NVDA'),
    overview:
      'NVIDIA is an accelerated computing platform company centered on data-center AI infrastructure, compute, networking, and edge computing platforms.',
    category: 'AI Compute / Accelerated Computing',
    analysisDate: '2026-06-10',
    latestFiscalPeriod: 'Q1 FY2027 ended 2026-04-26',
    dossierVerdict: {
      sourceType: 'curated',
      asOf: '2026-06-10',
      researchState: 'ai_infrastructure_watch',
      businessQuality: 'high',
      valuationState: 'not_verified',
      marketEvidence: 'not_verified',
      finalRead: 'Platform leader in accelerated computing, with thesis risk tied to AI capex durability and margin normalization.',
      keySupport: [
        'NVIDIA reported record Q1 FY2027 revenue and record Data Center revenue in its official earnings release.',
        'SEC filings describe accelerated computing, Data Center, and Edge Computing as core platform areas.',
        'The business is positioned around AI factories, hyperscale demand, AI clouds, industrial AI, enterprise AI, and edge AI.'
      ],
      keyRisk: [
        'AI data-center demand could slow after a large capex cycle.',
        'Gross margin could normalize if supply-demand balance becomes less favorable.',
        'Major customers may increase custom silicon or internal accelerator usage.',
        'Export controls and geopolitics can limit revenue opportunity in restricted markets.'
      ]
    },
    quickFacts: [
      { label: 'Business Model', value: 'Semiconductor platform / accelerated computing ecosystem' },
      { label: 'Primary Segment', value: 'Data Center' },
      { label: 'Current Evidence', value: 'Q1 FY2027 record revenue' },
      { label: 'Main Monitor', value: 'AI data-center demand durability' }
    ],
    marketEvidence: {
      title: 'AI infrastructure evidence is strong, but market expectations are demanding.',
      points: [
        'Data Center growth is the core evidence point to monitor.',
        'Networking attach and platform breadth matter beside GPU demand.',
        'Momentum is not the same as proof that future AI capex will keep accelerating.'
      ]
    },
    valueCore: {
      ticker: 'NVDA',
      value_core_type: 'AI compute / accelerated computing platform',
      company_stage_candidate: 'Platform leader',
      primary_value_driver: 'Data Center accelerated computing demand, networking attach, and AI platform ecosystem scale',
      thesis_break_trigger: 'AI data-center demand slows materially, gross margin normalizes faster than expected, major customers shift more spend to internal silicon, or export controls materially reduce growth',
      evidence_needed: [
        'Data Center revenue growth',
        'compute and networking demand',
        'gross margin durability',
        'hyperscaler / AI-cloud capex signal',
        'supply and capacity commitments',
        'export-control impact'
      ],
      evidence_quality: 'Partial',
      dossier_state: 'curated_profile_batch_1',
      frontend_label: 'Curated',
      coverage_status: 'Curated',
      needs_human_review: false,
      source: 'SEC 10-K / 10-Q and NVIDIA official earnings release'
    },
    visualPhaseOne: {
      faq: {
        overview: [
          {
            question: 'What does NVDA do?',
            answer: 'NVIDIA builds accelerated computing platforms for AI data centers, networking, and edge computing. CrowdRisk treats it as an AI compute platform rather than a simple chip-only company.'
          }
        ],
        thesisRisk: [
          {
            question: 'What would break the NVDA thesis?',
            answer: 'The thesis weakens if AI data-center demand slows, gross margin normalizes faster than expected, major customers move more spend to internal silicon, or export controls materially reduce growth.'
          }
        ]
      },
      phaseTwo: {
        thesisRisk: {
          lead: 'The main risk is whether AI infrastructure demand, margin durability, and customer dependence continue to justify platform-leader expectations.',
          riskMap: [
            { label: 'AI capex digestion', severity: 'High', watch: 'Data Center growth decelerates or order visibility weakens.' },
            { label: 'Margin normalization', severity: 'High', watch: 'Gross margin falls faster than platform mix can offset.' },
            { label: 'Customer concentration / custom silicon', severity: 'High', watch: 'Hyperscalers reduce NVIDIA share of incremental AI spend.' },
            { label: 'Export controls / geopolitics', severity: 'Medium', watch: 'Restricted-region revenue remains excluded or impaired.' }
          ],
          evidenceNeeded: [
            'Data Center revenue growth',
            'compute and networking demand',
            'gross margin durability',
            'hyperscaler / AI-cloud capex signal',
            'supply and capacity commitments',
            'export-control impact'
          ]
        }
      }
    }
  },
  AMZN: {
    ticker: 'AMZN',
    companyName: 'Amazon.com, Inc.',
    exchange: 'NASDAQ',
    logoUrl: buildStockLogoUrl('AMZN'),
    overview:
      'Amazon operates a multi-segment platform across North America retail, International retail, and AWS, serving consumers, sellers, developers, enterprises, content creators, advertisers, and employees.',
    category: 'Cloud / Commerce / Advertising Platform',
    analysisDate: '2026-06-10',
    latestFiscalPeriod: 'Q1 2026 ended 2026-03-31',
    dossierVerdict: {
      sourceType: 'curated',
      asOf: '2026-06-10',
      researchState: 'platform_watch',
      businessQuality: 'high',
      valuationState: 'not_verified',
      marketEvidence: 'not_verified',
      finalRead: 'Mega-cap platform where AWS growth, retail operating leverage, advertising monetization, and capex discipline need to move together.',
      keySupport: [
        'SEC filings organize Amazon around North America, International, and AWS segments.',
        'The business serves consumers, sellers, developers, enterprises, content creators, advertisers, and employees.',
        'AWS remains the cleanest economic engine to monitor beside retail scale and advertising monetization.'
      ],
      keyRisk: [
        'AWS growth or margins could weaken.',
        'Retail margin improvement could reverse.',
        'AI infrastructure and fulfillment capex can pressure free cash flow.',
        'Regulatory and antitrust pressure can limit platform economics.'
      ]
    },
    quickFacts: [
      { label: 'Business Model', value: 'Commerce platform + cloud infrastructure + advertising' },
      { label: 'Segments', value: 'North America / International / AWS' },
      { label: 'Primary Value Driver', value: 'AWS growth and platform operating leverage' },
      { label: 'Main Monitor', value: 'AWS growth, retail margin, capex intensity' }
    ],
    marketEvidence: {
      title: 'Amazon is a platform-quality story, but the evidence must be read by segment.',
      points: [
        'AWS economics should be separated from retail scale.',
        'Advertising monetization is an important layer on top of marketplace traffic.',
        'AI and logistics capex discipline matters for free-cash-flow quality.'
      ]
    },
    valueCore: {
      ticker: 'AMZN',
      value_core_type: 'Cloud + commerce + advertising platform',
      company_stage_candidate: 'Mega-cap platform',
      primary_value_driver: 'AWS growth and margins, advertising monetization, Prime / marketplace scale, and retail operating leverage',
      thesis_break_trigger: 'AWS growth or margin weakens, retail margin improvement reverses, AI / logistics capex overwhelms cash generation, or regulatory pressure materially limits platform economics',
      evidence_needed: [
        'AWS revenue growth and operating margin',
        'North America retail operating leverage',
        'International profitability',
        'advertising services growth',
        'AI and fulfillment capex intensity',
        'regulatory / antitrust exposure'
      ],
      evidence_quality: 'Partial',
      dossier_state: 'curated_profile_batch_1',
      frontend_label: 'Curated',
      coverage_status: 'Curated',
      needs_human_review: false,
      source: 'SEC 10-K / 10-Q'
    },
    visualPhaseOne: {
      faq: {
        overview: [
          {
            question: 'What does AMZN do?',
            answer: 'Amazon runs a large platform across retail, marketplace, advertising, subscriptions, and AWS cloud infrastructure. CrowdRisk reads it by segment, because AWS economics are different from retail scale.'
          }
        ],
        thesisRisk: [
          {
            question: 'What would break the AMZN thesis?',
            answer: 'The thesis weakens if AWS growth or margins slow, retail margin improvement reverses, AI and logistics capex overwhelm cash generation, or regulation limits platform economics.'
          }
        ]
      },
      phaseTwo: {
        thesisRisk: {
          lead: 'The main risk is whether AWS, retail margin, advertising, and capex discipline keep supporting one platform story.',
          riskMap: [
            { label: 'AWS deceleration', severity: 'High', watch: 'AWS revenue growth or operating income contribution weakens.' },
            { label: 'Retail margin reversal', severity: 'Medium', watch: 'North America and International operating leverage stalls.' },
            { label: 'Capex intensity', severity: 'Medium', watch: 'AI infrastructure and fulfillment investment pressure free cash flow.' },
            { label: 'Regulatory / antitrust', severity: 'Medium', watch: 'Platform remedies, marketplace rules, or cloud regulation pressure growth or margins.' }
          ],
          evidenceNeeded: [
            'AWS revenue growth and operating margin',
            'North America retail operating leverage',
            'International profitability',
            'advertising services growth',
            'AI and fulfillment capex intensity',
            'regulatory / antitrust exposure'
          ]
        }
      }
    }
  },
  MRVL: {
    ticker: 'MRVL',
    companyName: 'Marvell Technology, Inc.',
    exchange: 'NASDAQ',
    logoUrl: buildStockLogoUrl('MRVL'),
    overview:
      'Marvell is a data infrastructure semiconductor supplier with exposure to data center, cloud, communications, custom silicon, connectivity, and optical / interconnect demand.',
    category: 'Data Infrastructure Semiconductor',
    analysisDate: '2026-06-10',
    latestFiscalPeriod: 'Q1 FY2027 ended 2026-05-02',
    dossierVerdict: {
      sourceType: 'curated',
      asOf: '2026-06-10',
      researchState: 'ai_data_center_watch',
      businessQuality: 'medium_high',
      valuationState: 'not_verified',
      marketEvidence: 'not_verified',
      finalRead: 'AI data-center semiconductor ramp with meaningful upside if custom silicon and connectivity demand convert into durable revenue.',
      keySupport: [
        'SEC filings describe Marvell as a data infrastructure semiconductor supplier.',
        'Current filings reference data-center, AI, cloud, connectivity, and custom-silicon opportunities.',
        'The core research question is whether AI-related design wins convert into durable revenue.'
      ],
      keyRisk: [
        'AI custom-silicon ramps can slip or underdeliver.',
        'Customer concentration can reduce revenue visibility.',
        'Non-AI semiconductor cycles can offset data-center strength.',
        'Acquisitions and product transitions can pressure margins or execution.'
      ]
    },
    quickFacts: [
      { label: 'Business Model', value: 'Semiconductor supplier / data infrastructure silicon' },
      { label: 'Core Exposure', value: 'Data center / custom silicon / connectivity' },
      { label: 'Primary Value Driver', value: 'AI data-center silicon ramp' },
      { label: 'Main Monitor', value: 'Design-win conversion and customer concentration' }
    ],
    marketEvidence: {
      title: 'Marvell needs AI bookings and design wins to become durable revenue.',
      points: [
        'Data-center mix is the key evidence point.',
        'Custom silicon and optical connectivity are central to the AI infrastructure thesis.',
        'Non-AI cyclicality can still offset the headline AI story.'
      ]
    },
    valueCore: {
      ticker: 'MRVL',
      value_core_type: 'Data infrastructure semiconductor',
      company_stage_candidate: 'AI data-center ramp',
      primary_value_driver: 'AI data-center custom silicon, networking, optical connectivity, and cloud data infrastructure ramps',
      thesis_break_trigger: 'AI data-center ramp disappoints, custom silicon wins fail to convert into revenue, customer concentration hurts visibility, or non-AI cyclicality offsets AI growth',
      evidence_needed: [
        'data-center revenue mix',
        'AI custom silicon ramp',
        'optical / interconnect demand',
        'design-win conversion',
        'customer concentration',
        'inventory and non-data-center cycle'
      ],
      evidence_quality: 'Partial',
      dossier_state: 'curated_profile_batch_1',
      frontend_label: 'Curated',
      coverage_status: 'Curated',
      needs_human_review: false,
      source: 'SEC 10-K / 10-Q'
    },
    visualPhaseOne: {
      faq: {
        overview: [
          {
            question: 'What does MRVL do?',
            answer: 'Marvell supplies data infrastructure semiconductors for data-center, cloud, communications, custom silicon, connectivity, and optical interconnect use cases.'
          }
        ],
        thesisRisk: [
          {
            question: 'What would break the MRVL thesis?',
            answer: 'The thesis weakens if AI data-center ramps disappoint, custom silicon wins do not convert into revenue, customer concentration hurts visibility, or non-AI cycles offset AI growth.'
          }
        ]
      },
      phaseTwo: {
        thesisRisk: {
          lead: 'The main risk is whether AI custom silicon, networking, and optical connectivity demand becomes durable revenue rather than a short-cycle ramp.',
          riskMap: [
            { label: 'AI ramp timing', severity: 'High', watch: 'Data-center and custom silicon growth fails to match bookings or design-win expectations.' },
            { label: 'Customer concentration', severity: 'High', watch: 'Revenue depends too heavily on a small number of large cloud / infrastructure customers.' },
            { label: 'Cycle offset', severity: 'Medium', watch: 'Carrier, enterprise, or storage weakness offsets AI data-center strength.' },
            { label: 'Execution / integration', severity: 'Medium', watch: 'Acquisitions, product transitions, or supply constraints pressure margins or delivery.' }
          ],
          evidenceNeeded: [
            'data-center revenue mix',
            'AI custom silicon ramp',
            'optical / interconnect demand',
            'design-win conversion',
            'customer concentration',
            'inventory and non-data-center cycle'
          ]
        }
      }
    }
  },
  PLTR: {
    ticker: 'PLTR',
    companyName: 'Palantir Technologies Inc.',
    exchange: 'NASDAQ',
    logoUrl: buildStockLogoUrl('PLTR'),
    overview:
      'Palantir builds software platforms for data integration, operations, analytics, and AI workflows across government and commercial customers, including Gotham, Foundry, Apollo, and AIP.',
    category: 'AI Software / Data Operating System',
    analysisDate: '2026-06-10',
    latestFiscalPeriod: 'Q1 2026 ended 2026-03-31',
    dossierVerdict: {
      sourceType: 'curated',
      asOf: '2026-06-10',
      researchState: 'ai_software_watch',
      businessQuality: 'high',
      valuationState: 'not_verified',
      marketEvidence: 'not_verified',
      finalRead: 'AI software platform where the thesis depends on commercial expansion, government durability, and AIP monetization.',
      keySupport: [
        'SEC filings identify Gotham, Foundry, Apollo, and AIP as Palantir software platforms.',
        'The company serves both government and commercial customers.',
        'AIP adoption and workflow embedding are central evidence points for the current thesis.'
      ],
      keyRisk: [
        'Commercial expansion can slow after high-growth periods.',
        'Government contract timing and concentration can create volatility.',
        'AIP pilots need to convert into durable production revenue.',
        'Premium expectations require growth and margin evidence to keep improving.'
      ]
    },
    quickFacts: [
      { label: 'Business Model', value: 'Enterprise / government software platform' },
      { label: 'Core Platforms', value: 'Gotham / Foundry / Apollo / AIP' },
      { label: 'Primary Value Driver', value: 'AIP adoption and platform embedding' },
      { label: 'Main Monitor', value: 'Commercial expansion and government durability' }
    ],
    marketEvidence: {
      title: 'Palantir is an AI software platform thesis, but adoption must become durable revenue.',
      points: [
        'AIP is the central product evidence point.',
        'Commercial expansion and government durability should be monitored separately.',
        'Premium expectations make the evidence bar high.'
      ]
    },
    valueCore: {
      ticker: 'PLTR',
      value_core_type: 'AI software / data operating system',
      company_stage_candidate: 'Scaling platform',
      primary_value_driver: 'AIP adoption, commercial expansion, government durability, and platform embedding into mission-critical workflows',
      thesis_break_trigger: 'Commercial expansion slows, government contract growth weakens, AIP adoption fails to convert into durable revenue, or valuation expectations outrun evidence',
      evidence_needed: [
        'U.S. commercial revenue growth',
        'government contract durability',
        'AIP adoption and usage',
        'remaining deal value / contract conversion',
        'GAAP profitability and SBC discipline',
        'customer concentration and procurement timing'
      ],
      evidence_quality: 'Partial',
      dossier_state: 'curated_profile_batch_1',
      frontend_label: 'Curated',
      coverage_status: 'Curated',
      needs_human_review: false,
      source: 'SEC 10-K / 10-Q'
    },
    visualPhaseOne: {
      faq: {
        overview: [
          {
            question: 'What does PLTR do?',
            answer: 'Palantir provides data integration, operations, analytics, and AI workflow platforms for government and commercial customers through Gotham, Foundry, Apollo, and AIP.'
          }
        ],
        thesisRisk: [
          {
            question: 'What would break the PLTR thesis?',
            answer: 'The thesis weakens if commercial expansion slows, government contract growth weakens, AIP adoption fails to convert into durable revenue, or valuation expectations outrun evidence.'
          }
        ]
      },
      phaseTwo: {
        thesisRisk: {
          lead: 'The main risk is whether AIP adoption and platform embedding can keep converting into durable commercial and government revenue.',
          riskMap: [
            { label: 'Commercial durability', severity: 'High', watch: 'U.S. commercial growth slows or customer expansion weakens.' },
            { label: 'Government concentration', severity: 'Medium', watch: 'Large government contracts become less predictable or procurement slows.' },
            { label: 'AIP monetization', severity: 'High', watch: 'AIP demos and pilots fail to convert into durable production revenue.' },
            { label: 'Valuation / SBC tolerance', severity: 'Medium', watch: 'Growth and margin evidence fails to support premium expectations.' }
          ],
          evidenceNeeded: [
            'U.S. commercial revenue growth',
            'government contract durability',
            'AIP adoption and usage',
            'remaining deal value / contract conversion',
            'GAAP profitability and SBC discipline',
            'customer concentration and procurement timing'
          ]
        }
      }
    }
  },
  NOW: {
    ticker: 'NOW',
    companyName: 'ServiceNow, Inc.',
    exchange: 'NYSE',
    logoUrl: buildStockLogoUrl('NOW'),
    overview:
      'ServiceNow provides an AI platform and workflow software that helps organizations govern, secure, manage AI, and digitize workflows across enterprise functions.',
    category: 'Enterprise Workflow SaaS / AI Platform',
    analysisDate: '2026-06-10',
    latestFiscalPeriod: 'Q1 2026 ended 2026-03-31',
    dossierVerdict: {
      sourceType: 'curated',
      asOf: '2026-06-10',
      researchState: 'enterprise_software_watch',
      businessQuality: 'high',
      valuationState: 'not_verified',
      marketEvidence: 'not_verified',
      finalRead: 'Enterprise workflow platform where subscription durability, platform breadth, and AI workflow monetization need to keep compounding.',
      keySupport: [
        'SEC filings describe ServiceNow as helping organizations govern, secure, and manage AI while digitizing workflows.',
        'Subscription revenue is the core business model evidence point.',
        'The ServiceNow AI Platform is the central platform framing for current research.'
      ],
      keyRisk: [
        'Subscription growth or cRPO can decelerate.',
        'Large enterprise budget pressure can delay deals or weaken renewals.',
        'AI workflow monetization may not become material enough to support premium expectations.',
        'Workflow and platform competition can pressure pricing or win rates.'
      ]
    },
    quickFacts: [
      { label: 'Business Model', value: 'Subscription enterprise workflow SaaS' },
      { label: 'Platform', value: 'ServiceNow AI Platform' },
      { label: 'Primary Value Driver', value: 'Subscription growth and workflow expansion' },
      { label: 'Main Monitor', value: 'cRPO, renewal quality, AI monetization' }
    ],
    marketEvidence: {
      title: 'ServiceNow is a workflow platform thesis, not just a software growth screen.',
      points: [
        'Subscription growth is the core evidence point.',
        'Workflow expansion and AI monetization need to show up in durable demand.',
        'Enterprise budget pressure can matter even when product quality is high.'
      ]
    },
    valueCore: {
      ticker: 'NOW',
      value_core_type: 'Enterprise workflow SaaS / AI platform',
      company_stage_candidate: 'Scaling enterprise platform',
      primary_value_driver: 'Subscription revenue growth, renewal / expansion durability, workflow platform breadth, and AI workflow automation adoption',
      thesis_break_trigger: 'Subscription growth slows, renewal / expansion weakens, AI workflow monetization disappoints, or premium multiple compresses because enterprise IT demand softens',
      evidence_needed: [
        'subscription revenue growth',
        'current remaining performance obligations',
        'large-customer expansion',
        'workflow module adoption',
        'AI product monetization',
        'renewal rates and enterprise IT budget pressure'
      ],
      evidence_quality: 'Partial',
      dossier_state: 'curated_profile_batch_1',
      frontend_label: 'Curated',
      coverage_status: 'Curated',
      needs_human_review: false,
      source: 'SEC 10-K / 10-Q'
    },
    visualPhaseOne: {
      faq: {
        overview: [
          {
            question: 'What does NOW do?',
            answer: 'ServiceNow provides enterprise workflow software and an AI platform that helps organizations govern, secure, manage AI, and digitize work across business functions.'
          }
        ],
        thesisRisk: [
          {
            question: 'What would break the NOW thesis?',
            answer: 'The thesis weakens if subscription growth slows, renewal or expansion weakens, AI workflow monetization disappoints, or premium expectations compress because enterprise IT demand softens.'
          }
        ]
      },
      phaseTwo: {
        thesisRisk: {
          lead: 'The main risk is whether subscription growth, workflow expansion, and AI monetization remain durable enough for a premium enterprise-software platform.',
          riskMap: [
            { label: 'Subscription growth', severity: 'High', watch: 'Subscription revenue or cRPO growth decelerates.' },
            { label: 'Enterprise budget pressure', severity: 'Medium', watch: 'Large enterprise deals elongate or renewals weaken.' },
            { label: 'AI monetization', severity: 'Medium', watch: 'AI workflow products do not convert into material incremental demand.' },
            { label: 'Platform competition', severity: 'Medium', watch: 'Workflow, automation, or AI platform competition pressures win rates or pricing.' }
          ],
          evidenceNeeded: [
            'subscription revenue growth',
            'current remaining performance obligations',
            'large-customer expansion',
            'workflow module adoption',
            'AI product monetization',
            'renewal rates and enterprise IT budget pressure'
          ]
        }
      }
    }
  },
  AMD: {
    ticker: 'AMD',
    companyName: 'Advanced Micro Devices, Inc.',
    exchange: 'NASDAQ',
    logoUrl: buildStockLogoUrl('AMD'),
    overview:
      'AMD is a high-performance semiconductor company with data-center CPUs, GPUs, AI accelerators, adaptive computing products, embedded processors, and client / gaming semiconductor exposure.',
    category: 'AI Compute / Semiconductor Platform',
    analysisDate: '2026-06-10',
    latestFiscalPeriod: 'Q1 2026 ended 2026-03-28',
    dossierVerdict: {
      sourceType: 'curated',
      asOf: '2026-06-10',
      researchState: 'ai_compute_watch',
      businessQuality: 'medium_high',
      valuationState: 'not_verified',
      marketEvidence: 'not_verified',
      finalRead: 'AI compute and data-center semiconductor platform where the thesis depends on Instinct GPU ramp, EPYC server share, and margin durability.',
      keySupport: [
        'SEC filings identify AMD as a high-performance semiconductor company with Data Center, Client and Gaming, and Embedded segments.',
        'The Data Center segment includes server CPUs, GPUs, AI accelerators, DPUs, AI NICs, FPGAs, and adaptive SoCs.',
        'The research case centers on whether EPYC and Instinct can keep converting AI and cloud infrastructure demand into durable revenue.'
      ],
      keyRisk: [
        'AI accelerator ramp or customer deployments can disappoint.',
        'GPU software ecosystem gaps can limit adoption versus incumbent platforms.',
        'Client, gaming, and embedded cyclicality can offset data-center strength.',
        'Competition can pressure share gains, pricing, and gross margin.'
      ]
    },
    quickFacts: [
      { label: 'Business Model', value: 'Semiconductor platform' },
      { label: 'Core Exposure', value: 'Data center CPU / GPU / AI accelerator' },
      { label: 'Primary Value Driver', value: 'Instinct GPU ramp and EPYC share gains' },
      { label: 'Main Monitor', value: 'Data Center growth, gross margin, AI customer adoption' }
    ],
    marketEvidence: {
      title: 'AMD needs data-center AI demand to convert into durable platform revenue.',
      points: [
        'Instinct GPU adoption and customer deployment evidence matter more than headline AI excitement.',
        'EPYC server CPU share gains remain a separate durability signal.',
        'Client, gaming, and embedded cycles should be monitored beside the AI data-center story.'
      ]
    },
    valueCore: {
      ticker: 'AMD',
      value_core_type: 'AI compute / semiconductor platform',
      company_stage_candidate: 'Data-center AI ramp',
      primary_value_driver: 'Data Center CPU / GPU / AI accelerator demand, EPYC server share gains, Instinct GPU adoption, and embedded / adaptive computing contribution',
      thesis_break_trigger: 'AI data-center ramp disappoints, EPYC share gains stall, GPU software ecosystem remains a barrier, gross margin is pressured, or client / gaming cyclicality offsets data-center growth',
      evidence_needed: [
        'Data Center revenue growth and mix',
        'Instinct GPU shipment / customer adoption evidence',
        'EPYC server CPU share and cloud wins',
        'gross margin trend',
        'customer inventory and channel normalization signals',
        'client / gaming / embedded cycle evidence'
      ],
      evidence_quality: 'Partial',
      dossier_state: 'curated_profile_batch_2',
      frontend_label: 'Curated',
      coverage_status: 'Curated',
      needs_human_review: false,
      source: 'SEC 10-K / 10-Q'
    },
    visualPhaseOne: {
      faq: {
        overview: [
          {
            question: 'What does AMD do?',
            answer: 'AMD designs high-performance semiconductors, including server CPUs, GPUs, AI accelerators, adaptive computing products, embedded processors, and client / gaming chips. CrowdRisk reads AMD mainly through the data-center AI ramp and EPYC server share evidence.'
          }
        ],
        thesisRisk: [
          {
            question: 'What would break the AMD thesis?',
            answer: 'The thesis weakens if AI data-center demand disappoints, EPYC share gains stall, GPU software remains a barrier, gross margin is pressured, or client and gaming cycles offset data-center strength.'
          }
        ]
      },
      phaseTwo: {
        thesisRisk: {
          lead: 'The main risk is whether AMD can turn AI and cloud infrastructure demand into durable data-center revenue and margin expansion.',
          riskMap: [
            { label: 'AI accelerator ramp', severity: 'High', watch: 'Instinct deployments, customer adoption, and shipment evidence fail to build.' },
            { label: 'EPYC share gains', severity: 'High', watch: 'Server CPU share or cloud wins stall.' },
            { label: 'Software ecosystem', severity: 'Medium', watch: 'GPU software and developer ecosystem remain adoption barriers.' },
            { label: 'Cycle offset', severity: 'Medium', watch: 'Client, gaming, or embedded weakness offsets data-center growth.' }
          ],
          evidenceNeeded: [
            'Data Center revenue growth and mix',
            'Instinct GPU shipment / customer adoption evidence',
            'EPYC server CPU share and cloud wins',
            'gross margin trend',
            'customer inventory and channel normalization signals',
            'client / gaming / embedded cycle evidence'
          ]
        }
      }
    }
  },
  AVGO: {
    ticker: 'AVGO',
    companyName: 'Broadcom Inc.',
    exchange: 'NASDAQ',
    logoUrl: buildStockLogoUrl('AVGO'),
    overview:
      'Broadcom combines semiconductor solutions with infrastructure software, including AI networking, custom accelerator exposure, connectivity, storage, VMware-related private cloud, mainframe, cybersecurity, and enterprise software portfolios.',
    category: 'AI Networking / Infrastructure Software Platform',
    analysisDate: '2026-06-10',
    latestFiscalPeriod: 'Q2 FY2026 ended 2026-05-03',
    dossierVerdict: {
      sourceType: 'curated',
      asOf: '2026-06-10',
      researchState: 'ai_infrastructure_watch',
      businessQuality: 'high',
      valuationState: 'not_verified',
      marketEvidence: 'not_verified',
      finalRead: 'Infrastructure compounder where AI networking, custom silicon, and VMware software monetization need to keep supporting one platform story.',
      keySupport: [
        'SEC filings describe two reportable segments: semiconductor solutions and infrastructure software.',
        'Semiconductor revenue is supported by networking solutions, including custom AI accelerators and AI networking products.',
        'Infrastructure software includes private cloud, mainframe software, cybersecurity, enterprise software, FC SAN management, and VMware-related exposure.'
      ],
      keyRisk: [
        'AI networking or custom accelerator demand can slow.',
        'VMware integration or subscription transition can hurt customer retention.',
        'Semiconductor cyclicality can offset software resilience.',
        'Customer concentration and design-win timing can reduce revenue visibility.'
      ]
    },
    quickFacts: [
      { label: 'Business Model', value: 'Semiconductors + infrastructure software' },
      { label: 'Core Exposure', value: 'AI networking / custom accelerators / VMware' },
      { label: 'Primary Value Driver', value: 'AI semiconductor demand and software monetization' },
      { label: 'Main Monitor', value: 'AI networking growth, VMware retention, segment margins' }
    ],
    marketEvidence: {
      title: 'Broadcom is both an AI semiconductor and infrastructure software thesis.',
      points: [
        'AI networking and custom accelerator demand are the headline growth drivers.',
        'VMware / private cloud software gives the company a separate recurring infrastructure layer.',
        'The key question is whether both semiconductor and software engines stay durable together.'
      ]
    },
    valueCore: {
      ticker: 'AVGO',
      value_core_type: 'AI networking / infrastructure software platform',
      company_stage_candidate: 'Infrastructure compounder',
      primary_value_driver: 'AI networking and custom accelerator demand, semiconductor operating leverage, VMware / private cloud software monetization, and enterprise infrastructure renewal',
      thesis_break_trigger: 'AI networking or custom accelerator demand slows, VMware integration or subscription transition weakens retention, semiconductor cycle turns down faster than software can offset, or customer concentration reduces visibility',
      evidence_needed: [
        'AI semiconductor revenue growth',
        'networking and custom accelerator commentary',
        'infrastructure software renewal / subscription evidence',
        'VMware integration margin and retention signals',
        'semiconductor segment gross margin and backlog',
        'customer concentration and design-win timing'
      ],
      evidence_quality: 'Partial',
      dossier_state: 'curated_profile_batch_2',
      frontend_label: 'Curated',
      coverage_status: 'Curated',
      needs_human_review: false,
      source: 'SEC 10-K / 10-Q'
    },
    visualPhaseOne: {
      faq: {
        overview: [
          {
            question: 'What does AVGO do?',
            answer: 'Broadcom sells semiconductor solutions and infrastructure software. CrowdRisk reads AVGO through AI networking and custom silicon demand on one side, and VMware / private cloud software monetization on the other.'
          }
        ],
        thesisRisk: [
          {
            question: 'What would break the AVGO thesis?',
            answer: 'The thesis weakens if AI networking demand slows, custom accelerator wins do not convert, VMware retention or subscription transition disappoints, or semiconductor cyclicality overwhelms software resilience.'
          }
        ]
      },
      phaseTwo: {
        thesisRisk: {
          lead: 'The main risk is whether AI semiconductor demand and VMware-led software monetization both remain durable.',
          riskMap: [
            { label: 'AI networking demand', severity: 'High', watch: 'AI networking and custom accelerator demand slows.' },
            { label: 'VMware integration', severity: 'High', watch: 'Subscription transition or customer retention weakens.' },
            { label: 'Semiconductor cycle', severity: 'Medium', watch: 'Semiconductor downcycle offsets software strength.' },
            { label: 'Customer concentration', severity: 'Medium', watch: 'Large customer or design-win timing reduces visibility.' }
          ],
          evidenceNeeded: [
            'AI semiconductor revenue growth',
            'networking and custom accelerator commentary',
            'infrastructure software renewal / subscription evidence',
            'VMware integration margin and retention signals',
            'semiconductor segment gross margin and backlog',
            'customer concentration and design-win timing'
          ]
        }
      }
    }
  },
  CRWD: {
    ticker: 'CRWD',
    companyName: 'CrowdStrike Holdings, Inc.',
    exchange: 'NASDAQ',
    logoUrl: buildStockLogoUrl('CRWD'),
    overview:
      'CrowdStrike provides the Falcon cloud-native cybersecurity platform, delivered mainly through SaaS subscriptions across endpoint, cloud, identity, SIEM, exposure management, data protection, IT operations, and AI-related security workflows.',
    category: 'Cybersecurity Platform',
    analysisDate: '2026-06-10',
    latestFiscalPeriod: 'Q1 FY2027 ended 2026-04-30',
    dossierVerdict: {
      sourceType: 'curated',
      asOf: '2026-06-10',
      researchState: 'cybersecurity_platform_watch',
      businessQuality: 'high',
      valuationState: 'not_verified',
      marketEvidence: 'not_verified',
      finalRead: 'Cloud-native security platform where the thesis depends on Falcon trust, module expansion, retention, and large-customer growth.',
      keySupport: [
        'SEC filings describe Falcon as a cloud-native cybersecurity platform built around a single lightweight sensor and cloud data.',
        'Falcon spans multiple large security markets, including endpoint, cloud workload, identity, SIEM / log management, exposure management, and AI-related security.',
        'The land-and-expand model depends on module adoption, retention, and customer trust.'
      ],
      keyRisk: [
        'Platform reliability or security efficacy concerns can damage trust.',
        'Net retention, module adoption, or large-customer growth can slow.',
        'Competition can compress pricing or slow platform consolidation.',
        'Security incidents, outages, or reputational damage can affect renewals.'
      ]
    },
    quickFacts: [
      { label: 'Business Model', value: 'Cybersecurity SaaS platform' },
      { label: 'Platform', value: 'Falcon' },
      { label: 'Primary Value Driver', value: 'Module expansion and retention' },
      { label: 'Main Monitor', value: 'ARR, net retention, module adoption, trust' }
    ],
    marketEvidence: {
      title: 'CrowdStrike is a trust-sensitive cybersecurity platform thesis.',
      points: [
        'Falcon module expansion is the core business evidence point.',
        'Retention and large-customer growth show whether platform consolidation remains intact.',
        'Any trust or reliability issue should be monitored because cybersecurity vendors sell confidence as well as software.'
      ]
    },
    valueCore: {
      ticker: 'CRWD',
      value_core_type: 'Cybersecurity platform',
      company_stage_candidate: 'Scaling security platform',
      primary_value_driver: 'Falcon module expansion, cloud-native security data and AI network effect, dollar-based net retention, and security platform consolidation',
      thesis_break_trigger: 'Customer trust weakens after platform reliability or security efficacy concerns, net retention or module adoption slows, competition compresses pricing, or reputation damage persists',
      evidence_needed: [
        'ARR and subscription revenue growth',
        'dollar-based net retention',
        'module adoption per customer',
        'large customer count and expansion',
        'gross retention / customer churn commentary',
        'post-incident renewal and win-rate evidence'
      ],
      evidence_quality: 'Partial',
      dossier_state: 'curated_profile_batch_2',
      frontend_label: 'Curated',
      coverage_status: 'Curated',
      needs_human_review: false,
      source: 'SEC 10-K / 10-Q'
    },
    visualPhaseOne: {
      faq: {
        overview: [
          {
            question: 'What does CRWD do?',
            answer: 'CrowdStrike provides the Falcon cloud-native cybersecurity platform. It sells subscription modules across endpoint, cloud, identity, SIEM, exposure management, data protection, IT operations, and AI-related security workflows.'
          }
        ],
        thesisRisk: [
          {
            question: 'What would break the CRWD thesis?',
            answer: 'The thesis weakens if customer trust falls, platform reliability or security efficacy is questioned, retention or module expansion slows, competition pressures pricing, or reputation damage affects renewals.'
          }
        ]
      },
      phaseTwo: {
        thesisRisk: {
          lead: 'The main risk is whether Falcon keeps trust, retention, and module expansion strong enough to support the platform-consolidation thesis.',
          riskMap: [
            { label: 'Trust / reliability', severity: 'High', watch: 'Security efficacy, outage, or reliability concerns affect customer confidence.' },
            { label: 'Retention and module expansion', severity: 'High', watch: 'Dollar-based net retention or module adoption slows.' },
            { label: 'Competition', severity: 'Medium', watch: 'Platform and point-solution competition pressure pricing or win rates.' },
            { label: 'Reputation', severity: 'Medium', watch: 'Post-incident renewal or win-rate evidence weakens.' }
          ],
          evidenceNeeded: [
            'ARR and subscription revenue growth',
            'dollar-based net retention',
            'module adoption per customer',
            'large customer count and expansion',
            'gross retention / customer churn commentary',
            'post-incident renewal and win-rate evidence'
          ]
        }
      }
    }
  },
  MSFT: {
    ticker: 'MSFT',
    companyName: 'Microsoft Corporation',
    exchange: 'NASDAQ',
    logoUrl: buildStockLogoUrl('MSFT'),
    overview:
      'Microsoft is a broad software, cloud, AI, and devices platform across Productivity and Business Processes, Intelligent Cloud, and More Personal Computing, including Microsoft 365, LinkedIn, Dynamics, Azure, server products, Windows, gaming, search, and advertising.',
    category: 'Cloud / AI / Enterprise Software Platform',
    analysisDate: '2026-06-10',
    latestFiscalPeriod: 'Q3 FY2026 ended 2026-03-31',
    dossierVerdict: {
      sourceType: 'curated',
      asOf: '2026-06-10',
      researchState: 'mega_cap_ai_cloud_watch',
      businessQuality: 'high',
      valuationState: 'not_verified',
      marketEvidence: 'not_verified',
      finalRead: 'Mega-cap enterprise platform where Azure, Microsoft Cloud, AI infrastructure, Copilot monetization, and software distribution need to justify heavy AI investment.',
      keySupport: [
        'SEC filings describe Microsoft through Productivity and Business Processes, Intelligent Cloud, and More Personal Computing.',
        'Azure, Microsoft Cloud, Microsoft 365, Dynamics, LinkedIn, Windows, gaming, search, and advertising provide broad platform distribution.',
        'The current research case centers on cloud growth, AI infrastructure, Copilot adoption, and enterprise software durability.'
      ],
      keyRisk: [
        'Azure or Microsoft Cloud growth can slow while AI capex remains elevated.',
        'Copilot / AI monetization may not justify infrastructure investment.',
        'Enterprise software growth or retention can weaken.',
        'Cybersecurity, regulatory, privacy, antitrust, or competition pressure can affect trust and distribution.'
      ]
    },
    quickFacts: [
      { label: 'Business Model', value: 'Enterprise software + cloud + AI platform' },
      { label: 'Segments', value: 'Productivity / Intelligent Cloud / More Personal Computing' },
      { label: 'Primary Value Driver', value: 'Azure, Microsoft Cloud, and AI monetization' },
      { label: 'Main Monitor', value: 'Azure growth, AI capex ROI, Copilot adoption' }
    ],
    marketEvidence: {
      title: 'Microsoft is a cloud and enterprise AI platform thesis.',
      points: [
        'Azure and Microsoft Cloud growth are the central operating evidence points.',
        'Copilot and AI services need to convert infrastructure spend into monetization.',
        'The business has broad distribution, but that does not remove capex, competition, or regulatory risk.'
      ]
    },
    valueCore: {
      ticker: 'MSFT',
      value_core_type: 'Cloud / AI / enterprise software platform',
      company_stage_candidate: 'Mega-cap platform',
      primary_value_driver: 'Azure and Microsoft Cloud growth, AI infrastructure and Copilot monetization, enterprise software seat expansion, and operating leverage',
      thesis_break_trigger: 'Azure / Microsoft Cloud growth slows while AI capex remains elevated, Copilot monetization fails to justify infrastructure investment, enterprise software retention weakens, or regulatory / cybersecurity pressure affects trust and distribution',
      evidence_needed: [
        'Azure growth and cloud margin',
        'AI services revenue / usage evidence',
        'commercial remaining performance obligations',
        'capital expenditure and capacity commentary',
        'Microsoft 365 / Copilot adoption',
        'security and regulatory developments'
      ],
      evidence_quality: 'Partial',
      dossier_state: 'curated_profile_batch_2',
      frontend_label: 'Curated',
      coverage_status: 'Curated',
      needs_human_review: false,
      source: 'SEC 10-K / 10-Q'
    },
    visualPhaseOne: {
      faq: {
        overview: [
          {
            question: 'What does MSFT do?',
            answer: 'Microsoft sells enterprise software, cloud infrastructure, AI services, operating systems, gaming, search, and advertising products. CrowdRisk reads MSFT mainly through Azure, Microsoft Cloud, AI infrastructure, Copilot monetization, and enterprise software durability.'
          }
        ],
        thesisRisk: [
          {
            question: 'What would break the MSFT thesis?',
            answer: 'The thesis weakens if Azure or Microsoft Cloud growth slows while AI capex stays elevated, Copilot monetization fails to justify investment, enterprise software retention weakens, or regulatory / cybersecurity pressure damages trust and distribution.'
          }
        ]
      },
      phaseTwo: {
        thesisRisk: {
          lead: 'The main risk is whether Microsoft can turn AI infrastructure spend into durable cloud, Copilot, and enterprise software monetization.',
          riskMap: [
            { label: 'Azure / cloud growth', severity: 'High', watch: 'Azure or Microsoft Cloud growth slows.' },
            { label: 'AI capex ROI', severity: 'High', watch: 'AI infrastructure spend outpaces monetization evidence.' },
            { label: 'Copilot adoption', severity: 'Medium', watch: 'Copilot adoption or usage fails to convert into meaningful revenue.' },
            { label: 'Regulatory / security', severity: 'Medium', watch: 'Regulatory, antitrust, privacy, or cybersecurity issues pressure trust and distribution.' }
          ],
          evidenceNeeded: [
            'Azure growth and cloud margin',
            'AI services revenue / usage evidence',
            'commercial remaining performance obligations',
            'capital expenditure and capacity commentary',
            'Microsoft 365 / Copilot adoption',
            'security and regulatory developments'
          ]
        }
      }
    }
  },
  GOOGL: {
    ticker: 'GOOGL',
    companyName: 'Alphabet Inc.',
    exchange: 'NASDAQ',
    logoUrl: buildStockLogoUrl('GOOGL'),
    overview:
      'Alphabet operates Google Services, Google Cloud, and Other Bets, with CrowdRisk focus on Search and YouTube advertising durability, Google Cloud growth, AI integration, traffic acquisition costs, and regulatory pressure.',
    category: 'Search / Advertising / Cloud AI Platform',
    analysisDate: '2026-06-10',
    latestFiscalPeriod: 'Q1 2026 ended 2026-03-31',
    dossierVerdict: {
      sourceType: 'curated',
      asOf: '2026-06-10',
      researchState: 'mega_cap_ai_platform_watch',
      businessQuality: 'high',
      valuationState: 'not_verified',
      marketEvidence: 'not_verified',
      finalRead: 'Search, ads, YouTube, and Cloud platform where AI can be both product opportunity and disruption risk.',
      keySupport: [
        'SEC filings report Alphabet through Google Services, Google Cloud, and Other Bets.',
        'Google Services includes the advertising-led Search / YouTube ecosystem, subscriptions, platforms, and devices.',
        'Google Cloud provides infrastructure, platform services, collaboration tools, and AI-related cloud offerings.'
      ],
      keyRisk: [
        'AI search disruption can pressure commercial query monetization or traffic quality.',
        'Regulatory remedies can impair distribution, advertising economics, or product integration.',
        'Google Cloud growth or profitability can disappoint despite AI capex.',
        'YouTube or advertising growth can weaken while infrastructure costs rise.'
      ]
    },
    quickFacts: [
      { label: 'Business Model', value: 'Advertising + cloud + AI platform' },
      { label: 'Segments', value: 'Google Services / Google Cloud / Other Bets' },
      { label: 'Primary Value Driver', value: 'Search / YouTube ads and Google Cloud growth' },
      { label: 'Main Monitor', value: 'AI search, Cloud margin, regulation, TAC' }
    ],
    marketEvidence: {
      title: 'Alphabet is both an AI beneficiary and an AI disruption watch.',
      points: [
        'Search and YouTube advertising durability remain the core profit engine.',
        'Google Cloud growth and operating leverage show whether enterprise AI demand is converting.',
        'AI changes in search behavior and regulatory remedies are central thesis-risk monitors.'
      ]
    },
    valueCore: {
      ticker: 'GOOGL',
      value_core_type: 'Search / advertising / cloud AI platform',
      company_stage_candidate: 'Mega-cap platform',
      primary_value_driver: 'Search and YouTube advertising durability, Google Cloud growth and operating leverage, AI integration across Search / Cloud / productivity surfaces, and traffic acquisition cost efficiency',
      thesis_break_trigger: 'AI search disruption reduces monetization or traffic quality, regulatory remedies impair ads or distribution, Google Cloud growth / profitability disappoints, or infrastructure costs rise faster than monetization',
      evidence_needed: [
        'Search and YouTube ad revenue growth',
        'Google Cloud revenue growth and operating income',
        'AI product adoption and monetization evidence',
        'traffic acquisition cost trend and margin impact',
        'regulatory case outcomes and remedies',
        'capex / technical infrastructure commentary'
      ],
      evidence_quality: 'Partial',
      dossier_state: 'curated_profile_batch_2',
      frontend_label: 'Curated',
      coverage_status: 'Curated',
      needs_human_review: false,
      source: 'SEC 10-K / 10-Q'
    },
    visualPhaseOne: {
      faq: {
        overview: [
          {
            question: 'What does GOOGL do?',
            answer: 'Alphabet operates Google Services, Google Cloud, and Other Bets. CrowdRisk reads GOOGL through Search and YouTube advertising durability, Google Cloud growth, AI integration, traffic acquisition costs, and regulatory pressure.'
          }
        ],
        thesisRisk: [
          {
            question: 'What would break the GOOGL thesis?',
            answer: 'The thesis weakens if AI search disruption reduces monetization or traffic quality, regulatory remedies impair ads or distribution, Google Cloud growth or profitability disappoints, or infrastructure costs rise faster than monetization.'
          }
        ]
      },
      phaseTwo: {
        thesisRisk: {
          lead: 'The main risk is whether Alphabet can defend Search and ads economics while turning AI and Google Cloud investment into durable growth.',
          riskMap: [
            { label: 'AI search disruption', severity: 'High', watch: 'Commercial query monetization, traffic quality, or search usage changes.' },
            { label: 'Regulatory remedies', severity: 'High', watch: 'Ads, distribution, product integration, or data-use remedies impair economics.' },
            { label: 'Google Cloud execution', severity: 'Medium', watch: 'Cloud growth or operating income disappoints despite AI capex.' },
            { label: 'Infrastructure cost', severity: 'Medium', watch: 'Technical infrastructure and TAC pressure margins.' }
          ],
          evidenceNeeded: [
            'Search and YouTube ad revenue growth',
            'Google Cloud revenue growth and operating income',
            'AI product adoption and monetization evidence',
            'traffic acquisition cost trend and margin impact',
            'regulatory case outcomes and remedies',
            'capex / technical infrastructure commentary'
          ]
        }
      }
    }
  }
};

export function getStockDossierProfile(ticker) {
  return stockDossierProfiles[String(ticker || '').trim().toUpperCase()] || null;
}
