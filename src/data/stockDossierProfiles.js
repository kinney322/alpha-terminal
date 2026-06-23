import { buildStockLogoUrl } from './stockLogoUrls';
import { canonicalizeTicker } from './tickerAliases';

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
      marketCap: null,
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
          },
          {
            question: 'Who can affect DDOG’s market readthrough?',
            answer: 'DDOG should be read beside direct observability peers such as DT and ESTC, cloud and data-platform names such as SNOW and MDB, security-adjacent platforms such as CRWD and ZS, and hyperscaler/cloud-spend proxies such as MSFT, AMZN, and GOOGL. Peer earnings do not replace DDOG’s own analysis, but they help show whether the setup is company-specific or part of a broader software, cloud, or security budget cycle.'
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
  },
  AAPL: {
    ticker: 'AAPL',
    companyName: 'Apple Inc.',
    exchange: 'NASDAQ',
    logoUrl: buildStockLogoUrl('AAPL'),
    overview: 'Apple sells iPhone, Mac, iPad, wearables, accessories, and services through a global hardware, software, and services ecosystem.',
    category: 'Hardware / Services Ecosystem',
    analysisDate: '2026-06-11',
    latestFiscalPeriod: 'Latest SEC periodic filing report date 2026-03-28',
    dossierVerdict: {
      sourceType: 'curated',
      asOf: '2026-06-11',
      researchState: 'business_evidence_watch',
      businessQuality: 'high',
      valuationState: 'not_verified',
      marketEvidence: 'not_verified',
      finalRead: 'Hardware / Services Ecosystem where the thesis depends on Services revenue, installed base engagement, hardware upgrade cycles, and platform retention are central evidence points.',
      keySupport: [
        'SEC source pack identifies Apple Inc. as Hardware / Services Ecosystem.',
        'Apple sells iPhone, Mac, iPad, wearables, accessories, and services through a global hardware, software, and services ecosystem.',
        'Services revenue, installed base engagement, hardware upgrade cycles, and platform retention are central evidence points.',
        'Latest primary-source filing reviewed: SEC 10-Q.'
      ],
      keyRisk: [
        'Hardware replacement cycles can slow.',
        'China demand, regulation, App Store economics, AI feature adoption, and gross margin mix can affect the thesis.'
      ]
    },
    valueCore: {
      ticker: 'AAPL',
      value_core_type: 'Hardware / Services Ecosystem',
      company_stage_candidate: 'Hardware / Services Ecosystem',
      primary_value_driver: 'Services revenue, installed base engagement, hardware upgrade cycles, and platform retention are central evidence points.',
      thesis_break_trigger: 'The thesis weakens if hardware replacement cycles can slow. China demand, regulation, App Store economics, AI feature adoption, and gross margin mix can affect the thesis.',
      evidence_needed: [
        'revenue growth',
        'segment performance',
        'customer demand',
        'margin',
        'cash flow',
        'risk factor changes'
      ],
      evidence_quality: 'Partial',
      dossier_state: 'curated_profile_batch_3',
      frontend_label: 'Curated',
      coverage_status: 'Curated',
      needs_human_review: false,
      source: 'SEC 10-K / 10-Q'
    },
    visualPhaseOne: {
      faq: {
        overview: [
          {
            question: 'What does AAPL do?',
            answer: 'Apple sells iPhone, Mac, iPad, wearables, accessories, and services through a global hardware, software, and services ecosystem.'
          }
        ],
        thesisRisk: [
          {
            question: 'What would break the AAPL thesis?',
            answer: 'The thesis weakens if hardware replacement cycles can slow. China demand, regulation, App Store economics, AI feature adoption, and gross margin mix can affect the thesis.'
          }
        ]
      },
      phaseTwo: {
        thesisRisk: {
          lead: 'The main risk is whether Apple Inc. can keep hardware / services ecosystem evidence strong while the key risk factors stay contained.',
          riskMap: [
            {
              label: 'Demand / growth',
              severity: 'High',
              watch: 'Hardware replacement cycles can slow.'
            },
            {
              label: 'Margin / economics',
              severity: 'High',
              watch: 'China demand, regulation, App Store economics, AI feature adoption, and gross margin mix can affect the thesis.'
            }
          ],
          evidenceNeeded: [
            'revenue growth',
            'segment performance',
            'customer demand',
            'margin',
            'cash flow',
            'risk factor changes'
          ]
        }
      }
    }
  },
  META: {
    ticker: 'META',
    companyName: 'Meta Platforms, Inc.',
    exchange: 'NASDAQ',
    logoUrl: buildStockLogoUrl('META'),
    overview: 'Meta operates social, messaging, creator, advertising, and AI-driven discovery platforms across Family of Apps and Reality Labs.',
    category: 'Social / Advertising / AI Platform',
    analysisDate: '2026-06-11',
    latestFiscalPeriod: 'Latest SEC periodic filing report date 2026-03-31',
    dossierVerdict: {
      sourceType: 'curated',
      asOf: '2026-06-11',
      researchState: 'business_evidence_watch',
      businessQuality: 'high',
      valuationState: 'not_verified',
      marketEvidence: 'not_verified',
      finalRead: 'Social / Advertising / AI Platform where the thesis depends on Advertising engagement, monetization, AI infrastructure, and Reality Labs investment discipline drive the research frame.',
      keySupport: [
        'SEC source pack identifies Meta Platforms, Inc. as Social / Advertising / AI Platform.',
        'Meta operates social, messaging, creator, advertising, and AI-driven discovery platforms across Family of Apps and Reality Labs.',
        'Advertising engagement, monetization, AI infrastructure, and Reality Labs investment discipline drive the research frame.',
        'Latest primary-source filing reviewed: SEC 10-Q.'
      ],
      keyRisk: [
        'Ad demand, privacy rules, regulation, AI capex, youth-safety issues, and Reality Labs losses can pressure the thesis.'
      ]
    },
    valueCore: {
      ticker: 'META',
      value_core_type: 'Social / Advertising / AI Platform',
      company_stage_candidate: 'Social / Advertising / AI Platform',
      primary_value_driver: 'Advertising engagement, monetization, AI infrastructure, and Reality Labs investment discipline drive the research frame.',
      thesis_break_trigger: 'The thesis weakens if ad demand, privacy rules, regulation, AI capex, youth-safety issues, and Reality Labs losses can pressure the thesis.',
      evidence_needed: [
        'revenue growth',
        'customer demand',
        'gross margin',
        'inventory and backlog',
        'capex or R&D execution',
        'free cash flow'
      ],
      evidence_quality: 'Partial',
      dossier_state: 'curated_profile_batch_3',
      frontend_label: 'Curated',
      coverage_status: 'Curated',
      needs_human_review: false,
      source: 'SEC 10-K / 10-Q'
    },
    visualPhaseOne: {
      faq: {
        overview: [
          {
            question: 'What does META do?',
            answer: 'Meta operates social, messaging, creator, advertising, and AI-driven discovery platforms across Family of Apps and Reality Labs.'
          }
        ],
        thesisRisk: [
          {
            question: 'What would break the META thesis?',
            answer: 'The thesis weakens if ad demand, privacy rules, regulation, AI capex, youth-safety issues, and Reality Labs losses can pressure the thesis.'
          }
        ]
      },
      phaseTwo: {
        thesisRisk: {
          lead: 'The main risk is whether Meta Platforms, Inc. can keep social / advertising / ai platform evidence strong while the key risk factors stay contained.',
          riskMap: [
            {
              label: 'Demand / growth',
              severity: 'High',
              watch: 'Ad demand, privacy rules, regulation, AI capex, youth-safety issues, and Reality Labs losses can pressure the thesis.'
            }
          ],
          evidenceNeeded: [
            'revenue growth',
            'customer demand',
            'gross margin',
            'inventory and backlog',
            'capex or R&D execution',
            'free cash flow'
          ]
        }
      }
    }
  },
  TSLA: {
    ticker: 'TSLA',
    companyName: 'Tesla, Inc.',
    exchange: 'NASDAQ',
    logoUrl: buildStockLogoUrl('TSLA'),
    overview: 'Tesla designs and sells electric vehicles, energy generation and storage products, software, services, and autonomous / AI-related capabilities.',
    category: 'Electric Vehicles / Energy / AI Robotics',
    analysisDate: '2026-06-11',
    latestFiscalPeriod: 'Latest SEC periodic filing report date 2026-03-31',
    dossierVerdict: {
      sourceType: 'curated',
      asOf: '2026-06-11',
      researchState: 'business_evidence_watch',
      businessQuality: 'high',
      valuationState: 'not_verified',
      marketEvidence: 'not_verified',
      finalRead: 'Electric Vehicles / Energy / AI Robotics where the thesis depends on Vehicle volume, gross margin, energy storage growth, autonomy progress, and pricing power are central evidence points.',
      keySupport: [
        'SEC source pack identifies Tesla, Inc. as Electric Vehicles / Energy / AI Robotics.',
        'Tesla designs and sells electric vehicles, energy generation and storage products, software, services, and autonomous / AI-related capabilities.',
        'Vehicle volume, gross margin, energy storage growth, autonomy progress, and pricing power are central evidence points.',
        'Latest primary-source filing reviewed: SEC 10-Q.'
      ],
      keyRisk: [
        'EV demand, price competition, margins, autonomy execution, regulatory scrutiny, and management distraction can affect the thesis.'
      ]
    },
    valueCore: {
      ticker: 'TSLA',
      value_core_type: 'Electric Vehicles / Energy / AI Robotics',
      company_stage_candidate: 'Electric Vehicles / Energy / AI Robotics',
      primary_value_driver: 'Vehicle volume, gross margin, energy storage growth, autonomy progress, and pricing power are central evidence points.',
      thesis_break_trigger: 'The thesis weakens if eV demand, price competition, margins, autonomy execution, regulatory scrutiny, and management distraction can affect the thesis.',
      evidence_needed: [
        'revenue growth',
        'customer demand',
        'gross margin',
        'inventory and backlog',
        'capex or R&D execution',
        'free cash flow'
      ],
      evidence_quality: 'Partial',
      dossier_state: 'curated_profile_batch_3',
      frontend_label: 'Curated',
      coverage_status: 'Curated',
      needs_human_review: false,
      source: 'SEC 10-K / 10-Q'
    },
    visualPhaseOne: {
      faq: {
        overview: [
          {
            question: 'What does TSLA do?',
            answer: 'Tesla designs and sells electric vehicles, energy generation and storage products, software, services, and autonomous / AI-related capabilities.'
          }
        ],
        thesisRisk: [
          {
            question: 'What would break the TSLA thesis?',
            answer: 'The thesis weakens if eV demand, price competition, margins, autonomy execution, regulatory scrutiny, and management distraction can affect the thesis.'
          }
        ]
      },
      phaseTwo: {
        thesisRisk: {
          lead: 'The main risk is whether Tesla, Inc. can keep electric vehicles / energy / ai robotics evidence strong while the key risk factors stay contained.',
          riskMap: [
            {
              label: 'Demand / growth',
              severity: 'High',
              watch: 'EV demand, price competition, margins, autonomy execution, regulatory scrutiny, and management distraction can affect the thesis.'
            }
          ],
          evidenceNeeded: [
            'revenue growth',
            'customer demand',
            'gross margin',
            'inventory and backlog',
            'capex or R&D execution',
            'free cash flow'
          ]
        }
      }
    }
  },
  ORCL: {
    ticker: 'ORCL',
    companyName: 'Oracle Corporation',
    exchange: 'NYSE',
    logoUrl: buildStockLogoUrl('ORCL'),
    overview: 'Oracle sells cloud infrastructure, cloud applications, database, middleware, hardware, and related services.',
    category: 'Enterprise Software / Cloud Infrastructure',
    analysisDate: '2026-06-11',
    latestFiscalPeriod: 'Latest SEC periodic filing report date 2026-02-28',
    dossierVerdict: {
      sourceType: 'curated',
      asOf: '2026-06-11',
      researchState: 'business_evidence_watch',
      businessQuality: 'high',
      valuationState: 'not_verified',
      marketEvidence: 'not_verified',
      finalRead: 'Enterprise Software / Cloud Infrastructure where the thesis depends on OCI growth, database franchise durability, applications growth, remaining performance obligations, and AI infrastructure demand are key evidence points.',
      keySupport: [
        'SEC source pack identifies Oracle Corporation as Enterprise Software / Cloud Infrastructure.',
        'Oracle sells cloud infrastructure, cloud applications, database, middleware, hardware, and related services.',
        'OCI growth, database franchise durability, applications growth, remaining performance obligations, and AI infrastructure demand are key evidence points.',
        'Latest primary-source filing reviewed: SEC 10-Q.'
      ],
      keyRisk: [
        'Large cloud capex, debt, execution risk, hyperscaler competition, and slower cloud bookings can weaken the thesis.'
      ]
    },
    valueCore: {
      ticker: 'ORCL',
      value_core_type: 'Enterprise Software / Cloud Infrastructure',
      company_stage_candidate: 'Enterprise Software / Cloud Infrastructure',
      primary_value_driver: 'OCI growth, database franchise durability, applications growth, remaining performance obligations, and AI infrastructure demand are key evidence points.',
      thesis_break_trigger: 'The thesis weakens if large cloud capex, debt, execution risk, hyperscaler competition, and slower cloud bookings can weaken the thesis.',
      evidence_needed: [
        'revenue growth',
        'segment performance',
        'customer demand',
        'margin',
        'cash flow',
        'risk factor changes'
      ],
      evidence_quality: 'Partial',
      dossier_state: 'curated_profile_batch_3',
      frontend_label: 'Curated',
      coverage_status: 'Curated',
      needs_human_review: false,
      source: 'SEC 10-K / 10-Q'
    },
    visualPhaseOne: {
      faq: {
        overview: [
          {
            question: 'What does ORCL do?',
            answer: 'Oracle sells cloud infrastructure, cloud applications, database, middleware, hardware, and related services.'
          }
        ],
        thesisRisk: [
          {
            question: 'What would break the ORCL thesis?',
            answer: 'The thesis weakens if large cloud capex, debt, execution risk, hyperscaler competition, and slower cloud bookings can weaken the thesis.'
          }
        ]
      },
      phaseTwo: {
        thesisRisk: {
          lead: 'The main risk is whether Oracle Corporation can keep enterprise software / cloud infrastructure evidence strong while the key risk factors stay contained.',
          riskMap: [
            {
              label: 'Demand / growth',
              severity: 'High',
              watch: 'Large cloud capex, debt, execution risk, hyperscaler competition, and slower cloud bookings can weaken the thesis.'
            }
          ],
          evidenceNeeded: [
            'revenue growth',
            'segment performance',
            'customer demand',
            'margin',
            'cash flow',
            'risk factor changes'
          ]
        }
      }
    }
  },
  CRM: {
    ticker: 'CRM',
    companyName: 'Salesforce, Inc.',
    exchange: 'NYSE',
    logoUrl: buildStockLogoUrl('CRM'),
    overview: 'Salesforce provides customer relationship management software across sales, service, marketing, commerce, data, integration, analytics, and AI workflows.',
    category: 'Enterprise SaaS / CRM',
    analysisDate: '2026-06-11',
    latestFiscalPeriod: 'Latest SEC periodic filing report date 2026-04-30',
    dossierVerdict: {
      sourceType: 'curated',
      asOf: '2026-06-11',
      researchState: 'business_evidence_watch',
      businessQuality: 'high',
      valuationState: 'not_verified',
      marketEvidence: 'not_verified',
      finalRead: 'Enterprise SaaS / CRM where the thesis depends on Subscription growth, remaining performance obligations, margin discipline, Data Cloud, and Agentforce / AI adoption drive the frame.',
      keySupport: [
        'SEC source pack identifies Salesforce, Inc. as Enterprise SaaS / CRM.',
        'Salesforce provides customer relationship management software across sales, service, marketing, commerce, data, integration, analytics, and AI workflows.',
        'Subscription growth, remaining performance obligations, margin discipline, Data Cloud, and Agentforce / AI adoption drive the frame.',
        'Latest primary-source filing reviewed: SEC 10-Q.'
      ],
      keyRisk: [
        'Seat growth can slow, enterprise IT spending can soften, AI monetization can disappoint, and competition can pressure renewal or expansion.'
      ]
    },
    valueCore: {
      ticker: 'CRM',
      value_core_type: 'Enterprise SaaS / CRM',
      company_stage_candidate: 'Enterprise SaaS / CRM',
      primary_value_driver: 'Subscription growth, remaining performance obligations, margin discipline, Data Cloud, and Agentforce / AI adoption drive the frame.',
      thesis_break_trigger: 'The thesis weakens if seat growth can slow, enterprise IT spending can soften, AI monetization can disappoint, and competition can pressure renewal or expansion.',
      evidence_needed: [
        'revenue growth',
        'segment performance',
        'customer demand',
        'margin',
        'cash flow',
        'risk factor changes'
      ],
      evidence_quality: 'Partial',
      dossier_state: 'curated_profile_batch_3',
      frontend_label: 'Curated',
      coverage_status: 'Curated',
      needs_human_review: false,
      source: 'SEC 10-K / 10-Q'
    },
    visualPhaseOne: {
      faq: {
        overview: [
          {
            question: 'What does CRM do?',
            answer: 'Salesforce provides customer relationship management software across sales, service, marketing, commerce, data, integration, analytics, and AI workflows.'
          }
        ],
        thesisRisk: [
          {
            question: 'What would break the CRM thesis?',
            answer: 'The thesis weakens if seat growth can slow, enterprise IT spending can soften, AI monetization can disappoint, and competition can pressure renewal or expansion.'
          }
        ]
      },
      phaseTwo: {
        thesisRisk: {
          lead: 'The main risk is whether Salesforce, Inc. can keep enterprise saas / crm evidence strong while the key risk factors stay contained.',
          riskMap: [
            {
              label: 'Demand / growth',
              severity: 'High',
              watch: 'Seat growth can slow, enterprise IT spending can soften, AI monetization can disappoint, and competition can pressure renewal or expansion.'
            }
          ],
          evidenceNeeded: [
            'revenue growth',
            'segment performance',
            'customer demand',
            'margin',
            'cash flow',
            'risk factor changes'
          ]
        }
      }
    }
  },
  SNOW: {
    ticker: 'SNOW',
    companyName: 'Snowflake Inc.',
    exchange: 'NYSE',
    logoUrl: buildStockLogoUrl('SNOW'),
    overview: 'Snowflake provides a cloud data platform for data warehousing, data lakes, data engineering, analytics, collaboration, applications, and AI / ML workloads.',
    category: 'Data Cloud / Analytics',
    analysisDate: '2026-06-11',
    latestFiscalPeriod: 'Latest SEC periodic filing report date 2026-04-30',
    dossierVerdict: {
      sourceType: 'curated',
      asOf: '2026-06-11',
      researchState: 'business_evidence_watch',
      businessQuality: 'high',
      valuationState: 'not_verified',
      marketEvidence: 'not_verified',
      finalRead: 'Data Cloud / Analytics where the thesis depends on Consumption growth, net revenue retention, large customer expansion, platform workload breadth, and AI data use cases drive the frame.',
      keySupport: [
        'SEC source pack identifies Snowflake Inc. as Data Cloud / Analytics.',
        'Snowflake provides a cloud data platform for data warehousing, data lakes, data engineering, analytics, collaboration, applications, and AI / ML workloads.',
        'Consumption growth, net revenue retention, large customer expansion, platform workload breadth, and AI data use cases drive the frame.',
        'Latest primary-source filing reviewed: SEC 10-Q.'
      ],
      keyRisk: [
        'Consumption can slow, optimization can pressure growth, competition from hyperscalers can intensify, and AI features need durable monetization.'
      ]
    },
    valueCore: {
      ticker: 'SNOW',
      value_core_type: 'Data Cloud / Analytics',
      company_stage_candidate: 'Data Cloud / Analytics',
      primary_value_driver: 'Consumption growth, net revenue retention, large customer expansion, platform workload breadth, and AI data use cases drive the frame.',
      thesis_break_trigger: 'The thesis weakens if consumption can slow, optimization can pressure growth, competition from hyperscalers can intensify, and AI features need durable monetization.',
      evidence_needed: [
        'revenue growth',
        'segment performance',
        'customer demand',
        'margin',
        'cash flow',
        'risk factor changes'
      ],
      evidence_quality: 'Partial',
      dossier_state: 'curated_profile_batch_3',
      frontend_label: 'Curated',
      coverage_status: 'Curated',
      needs_human_review: false,
      source: 'SEC 10-K / 10-Q'
    },
    visualPhaseOne: {
      faq: {
        overview: [
          {
            question: 'What does SNOW do?',
            answer: 'Snowflake provides a cloud data platform for data warehousing, data lakes, data engineering, analytics, collaboration, applications, and AI / ML workloads.'
          }
        ],
        thesisRisk: [
          {
            question: 'What would break the SNOW thesis?',
            answer: 'The thesis weakens if consumption can slow, optimization can pressure growth, competition from hyperscalers can intensify, and AI features need durable monetization.'
          }
        ]
      },
      phaseTwo: {
        thesisRisk: {
          lead: 'The main risk is whether Snowflake Inc. can keep data cloud / analytics evidence strong while the key risk factors stay contained.',
          riskMap: [
            {
              label: 'Demand / growth',
              severity: 'High',
              watch: 'Consumption can slow, optimization can pressure growth, competition from hyperscalers can intensify, and AI features need durable monetization.'
            }
          ],
          evidenceNeeded: [
            'revenue growth',
            'segment performance',
            'customer demand',
            'margin',
            'cash flow',
            'risk factor changes'
          ]
        }
      }
    }
  },
  MU: {
    ticker: 'MU',
    companyName: 'Micron Technology, Inc.',
    exchange: 'NASDAQ',
    logoUrl: buildStockLogoUrl('MU'),
    overview: 'Micron manufactures memory and storage products, including DRAM, NAND, HBM, and SSD-related solutions.',
    category: 'Memory Semiconductor',
    analysisDate: '2026-06-11',
    latestFiscalPeriod: 'Latest SEC periodic filing report date 2026-02-26',
    dossierVerdict: {
      sourceType: 'curated',
      asOf: '2026-06-11',
      researchState: 'semiconductor_cycle_watch',
      businessQuality: 'high',
      valuationState: 'not_verified',
      marketEvidence: 'not_verified',
      finalRead: 'Memory Semiconductor where the thesis depends on HBM demand, DRAM/NAND pricing, bit supply discipline, gross margin, and AI data-center memory content are core evidence points.',
      keySupport: [
        'SEC source pack identifies Micron Technology, Inc. as Memory Semiconductor.',
        'Micron manufactures memory and storage products, including DRAM, NAND, HBM, and SSD-related solutions.',
        'HBM demand, DRAM/NAND pricing, bit supply discipline, gross margin, and AI data-center memory content are core evidence points.',
        'Latest primary-source filing reviewed: SEC 10-Q.'
      ],
      keyRisk: [
        'Memory is highly cyclical; pricing, inventory, capex, customer demand, and supply discipline can change quickly.'
      ]
    },
    valueCore: {
      ticker: 'MU',
      value_core_type: 'Memory Semiconductor',
      company_stage_candidate: 'Memory Semiconductor',
      primary_value_driver: 'HBM demand, DRAM/NAND pricing, bit supply discipline, gross margin, and AI data-center memory content are core evidence points.',
      thesis_break_trigger: 'The thesis weakens if memory is highly cyclical; pricing, inventory, capex, customer demand, and supply discipline can change quickly.',
      evidence_needed: [
        'revenue growth',
        'customer demand',
        'gross margin',
        'inventory and backlog',
        'capex or R&D execution',
        'free cash flow'
      ],
      evidence_quality: 'Partial',
      dossier_state: 'curated_profile_batch_3',
      frontend_label: 'Curated',
      coverage_status: 'Curated',
      needs_human_review: false,
      source: 'SEC 10-K / 10-Q'
    },
    visualPhaseOne: {
      faq: {
        overview: [
          {
            question: 'What does MU do?',
            answer: 'Micron manufactures memory and storage products, including DRAM, NAND, HBM, and SSD-related solutions.'
          }
        ],
        thesisRisk: [
          {
            question: 'What would break the MU thesis?',
            answer: 'The thesis weakens if memory is highly cyclical; pricing, inventory, capex, customer demand, and supply discipline can change quickly.'
          }
        ]
      },
      phaseTwo: {
        thesisRisk: {
          lead: 'The main risk is whether Micron Technology, Inc. can keep memory semiconductor evidence strong while the key risk factors stay contained.',
          riskMap: [
            {
              label: 'Demand / growth',
              severity: 'High',
              watch: 'Memory is highly cyclical; pricing, inventory, capex, customer demand, and supply discipline can change quickly.'
            }
          ],
          evidenceNeeded: [
            'revenue growth',
            'customer demand',
            'gross margin',
            'inventory and backlog',
            'capex or R&D execution',
            'free cash flow'
          ]
        }
      }
    }
  },
  INTC: {
    ticker: 'INTC',
    companyName: 'Intel Corporation',
    exchange: 'NASDAQ',
    logoUrl: buildStockLogoUrl('INTC'),
    overview: 'Intel operates across client computing, data center and AI, network and edge, and foundry / manufacturing ambitions.',
    category: 'Semiconductors / Foundry / Client and Data Center',
    analysisDate: '2026-06-11',
    latestFiscalPeriod: 'Latest SEC periodic filing report date 2026-03-28',
    dossierVerdict: {
      sourceType: 'curated',
      asOf: '2026-06-11',
      researchState: 'semiconductor_cycle_watch',
      businessQuality: 'high',
      valuationState: 'not_verified',
      marketEvidence: 'not_verified',
      finalRead: 'Semiconductors / Foundry / Client and Data Center where the thesis depends on The thesis depends on process execution, product competitiveness, foundry traction, margin recovery, and AI / data-center relevance.',
      keySupport: [
        'SEC source pack identifies Intel Corporation as Semiconductors / Foundry / Client and Data Center.',
        'Intel operates across client computing, data center and AI, network and edge, and foundry / manufacturing ambitions.',
        'The thesis depends on process execution, product competitiveness, foundry traction, margin recovery, and AI / data-center relevance.',
        'Latest primary-source filing reviewed: SEC 10-Q.'
      ],
      keyRisk: [
        'Foundry losses, product delays, competitive pressure, weak margins, capex burden, and share loss can weaken the thesis.'
      ]
    },
    valueCore: {
      ticker: 'INTC',
      value_core_type: 'Semiconductors / Foundry / Client and Data Center',
      company_stage_candidate: 'Semiconductors / Foundry / Client and Data Center',
      primary_value_driver: 'The thesis depends on process execution, product competitiveness, foundry traction, margin recovery, and AI / data-center relevance.',
      thesis_break_trigger: 'The thesis weakens if foundry losses, product delays, competitive pressure, weak margins, capex burden, and share loss can weaken the thesis.',
      evidence_needed: [
        'revenue growth',
        'customer demand',
        'gross margin',
        'inventory and backlog',
        'capex or R&D execution',
        'free cash flow'
      ],
      evidence_quality: 'Partial',
      dossier_state: 'curated_profile_batch_3',
      frontend_label: 'Curated',
      coverage_status: 'Curated',
      needs_human_review: false,
      source: 'SEC 10-K / 10-Q'
    },
    visualPhaseOne: {
      faq: {
        overview: [
          {
            question: 'What does INTC do?',
            answer: 'Intel operates across client computing, data center and AI, network and edge, and foundry / manufacturing ambitions.'
          }
        ],
        thesisRisk: [
          {
            question: 'What would break the INTC thesis?',
            answer: 'The thesis weakens if foundry losses, product delays, competitive pressure, weak margins, capex burden, and share loss can weaken the thesis.'
          }
        ]
      },
      phaseTwo: {
        thesisRisk: {
          lead: 'The main risk is whether Intel Corporation can keep semiconductors / foundry / client and data center evidence strong while the key risk factors stay contained.',
          riskMap: [
            {
              label: 'Demand / growth',
              severity: 'High',
              watch: 'Foundry losses, product delays, competitive pressure, weak margins, capex burden, and share loss can weaken the thesis.'
            }
          ],
          evidenceNeeded: [
            'revenue growth',
            'customer demand',
            'gross margin',
            'inventory and backlog',
            'capex or R&D execution',
            'free cash flow'
          ]
        }
      }
    }
  },
  ASML: {
    ticker: 'ASML',
    companyName: 'ASML Holding N.V.',
    exchange: 'NASDAQ',
    logoUrl: buildStockLogoUrl('ASML'),
    overview: 'ASML supplies lithography systems and related services for semiconductor manufacturing, including EUV and DUV systems.',
    category: 'Semiconductor Equipment / Lithography',
    analysisDate: '2026-06-11',
    latestFiscalPeriod: 'Latest SEC periodic filing report date 2025-12-31',
    dossierVerdict: {
      sourceType: 'curated',
      asOf: '2026-06-11',
      researchState: 'semiconductor_cycle_watch',
      businessQuality: 'high',
      valuationState: 'not_verified',
      marketEvidence: 'not_verified',
      finalRead: 'Semiconductor Equipment / Lithography where the thesis depends on Semiconductor node transitions, EUV demand, installed base service, China/export restrictions, and customer capex drive the frame.',
      keySupport: [
        'SEC source pack identifies ASML Holding N.V. as Semiconductor Equipment / Lithography.',
        'ASML supplies lithography systems and related services for semiconductor manufacturing, including EUV and DUV systems.',
        'Semiconductor node transitions, EUV demand, installed base service, China/export restrictions, and customer capex drive the frame.',
        'Latest primary-source filing reviewed: SEC 20-F.'
      ],
      keyRisk: [
        'Semiconductor capex cycles, export controls, customer concentration, supply chain complexity, and lithography demand timing can affect the thesis.'
      ]
    },
    valueCore: {
      ticker: 'ASML',
      value_core_type: 'Semiconductor Equipment / Lithography',
      company_stage_candidate: 'Semiconductor Equipment / Lithography',
      primary_value_driver: 'Semiconductor node transitions, EUV demand, installed base service, China/export restrictions, and customer capex drive the frame.',
      thesis_break_trigger: 'The thesis weakens if semiconductor capex cycles, export controls, customer concentration, supply chain complexity, and lithography demand timing can affect the thesis.',
      evidence_needed: [
        'revenue growth',
        'customer demand',
        'gross margin',
        'inventory and backlog',
        'capex or R&D execution',
        'free cash flow'
      ],
      evidence_quality: 'Partial',
      dossier_state: 'curated_profile_batch_3',
      frontend_label: 'Curated',
      coverage_status: 'Curated',
      needs_human_review: false,
      source: 'SEC 10-K / 10-Q'
    },
    visualPhaseOne: {
      faq: {
        overview: [
          {
            question: 'What does ASML do?',
            answer: 'ASML supplies lithography systems and related services for semiconductor manufacturing, including EUV and DUV systems.'
          }
        ],
        thesisRisk: [
          {
            question: 'What would break the ASML thesis?',
            answer: 'The thesis weakens if semiconductor capex cycles, export controls, customer concentration, supply chain complexity, and lithography demand timing can affect the thesis.'
          }
        ]
      },
      phaseTwo: {
        thesisRisk: {
          lead: 'The main risk is whether ASML Holding N.V. can keep semiconductor equipment / lithography evidence strong while the key risk factors stay contained.',
          riskMap: [
            {
              label: 'Demand / growth',
              severity: 'High',
              watch: 'Semiconductor capex cycles, export controls, customer concentration, supply chain complexity, and lithography demand timing can affect the thesis.'
            }
          ],
          evidenceNeeded: [
            'revenue growth',
            'customer demand',
            'gross margin',
            'inventory and backlog',
            'capex or R&D execution',
            'free cash flow'
          ]
        }
      }
    }
  },
  AMAT: {
    ticker: 'AMAT',
    companyName: 'Applied Materials, Inc.',
    exchange: 'NASDAQ',
    logoUrl: buildStockLogoUrl('AMAT'),
    overview: 'Applied Materials provides semiconductor manufacturing equipment, services, and display / adjacent equipment across materials engineering, deposition, etch, inspection, and process control.',
    category: 'Semiconductor Equipment / Materials Engineering',
    analysisDate: '2026-06-11',
    latestFiscalPeriod: 'Latest SEC periodic filing report date 2026-04-26',
    dossierVerdict: {
      sourceType: 'curated',
      asOf: '2026-06-11',
      researchState: 'semiconductor_cycle_watch',
      businessQuality: 'high',
      valuationState: 'not_verified',
      marketEvidence: 'not_verified',
      finalRead: 'Semiconductor Equipment / Materials Engineering where the thesis depends on WFE demand, memory and foundry/logic capex, advanced packaging, services, and China/export restrictions drive the frame.',
      keySupport: [
        'SEC source pack identifies Applied Materials, Inc. as Semiconductor Equipment / Materials Engineering.',
        'Applied Materials provides semiconductor manufacturing equipment, services, and display / adjacent equipment across materials engineering, deposition, etch, inspection, and process control.',
        'WFE demand, memory and foundry/logic capex, advanced packaging, services, and China/export restrictions drive the frame.',
        'Latest primary-source filing reviewed: SEC 10-Q.'
      ],
      keyRisk: [
        'Wafer-fab equipment cycles, memory capex swings, customer concentration, export controls, and order timing can affect growth and margins.'
      ]
    },
    valueCore: {
      ticker: 'AMAT',
      value_core_type: 'Semiconductor Equipment / Materials Engineering',
      company_stage_candidate: 'Semiconductor Equipment / Materials Engineering',
      primary_value_driver: 'WFE demand, memory and foundry/logic capex, advanced packaging, services, and China/export restrictions drive the frame.',
      thesis_break_trigger: 'The thesis weakens if wafer-fab equipment cycles, memory capex swings, customer concentration, export controls, and order timing can affect growth and margins.',
      evidence_needed: [
        'revenue growth',
        'customer demand',
        'gross margin',
        'inventory and backlog',
        'capex or R&D execution',
        'free cash flow'
      ],
      evidence_quality: 'Partial',
      dossier_state: 'curated_profile_batch_3',
      frontend_label: 'Curated',
      coverage_status: 'Curated',
      needs_human_review: false,
      source: 'SEC 10-K / 10-Q'
    },
    visualPhaseOne: {
      faq: {
        overview: [
          {
            question: 'What does AMAT do?',
            answer: 'Applied Materials provides semiconductor manufacturing equipment, services, and display / adjacent equipment across materials engineering, deposition, etch, inspection, and process control.'
          }
        ],
        thesisRisk: [
          {
            question: 'What would break the AMAT thesis?',
            answer: 'The thesis weakens if wafer-fab equipment cycles, memory capex swings, customer concentration, export controls, and order timing can affect growth and margins.'
          }
        ]
      },
      phaseTwo: {
        thesisRisk: {
          lead: 'The main risk is whether Applied Materials, Inc. can keep semiconductor equipment / materials engineering evidence strong while the key risk factors stay contained.',
          riskMap: [
            {
              label: 'Demand / growth',
              severity: 'High',
              watch: 'Wafer-fab equipment cycles, memory capex swings, customer concentration, export controls, and order timing can affect growth and margins.'
            }
          ],
          evidenceNeeded: [
            'revenue growth',
            'customer demand',
            'gross margin',
            'inventory and backlog',
            'capex or R&D execution',
            'free cash flow'
          ]
        }
      }
    }
  },
  LRCX: {
    ticker: 'LRCX',
    companyName: 'Lam Research Corporation',
    exchange: 'NASDAQ',
    logoUrl: buildStockLogoUrl('LRCX'),
    overview: 'Lam Research Corporation operates in Semiconductor Equipment / Etch and Deposition.',
    category: 'Semiconductor Equipment / Etch and Deposition',
    analysisDate: '2026-06-11',
    latestFiscalPeriod: 'Q3 FY2026 ended 2026-03-29',
    dossierVerdict: {
      sourceType: 'curated',
      asOf: '2026-06-11',
      researchState: 'semiconductor_cycle_watch',
      businessQuality: 'high',
      valuationState: 'not_verified',
      marketEvidence: 'not_verified',
      finalRead: 'Semiconductor Equipment / Etch and Deposition where the thesis depends on Semiconductor Equipment / Etch and Deposition execution, customer demand, margin, and cash flow.',
      keySupport: [
        'SEC source pack identifies Lam Research Corporation as Semiconductor Equipment / Etch and Deposition.',
        'Latest primary-source filing reviewed: SEC latest periodic filing.'
      ],
      keyRisk: [
        'Semiconductor Equipment / Etch and Deposition demand can slow.',
        'Margins can compress if cost, competition, or execution pressure rises.',
        'The business thesis can weaken if cash flow evidence deteriorates.'
      ]
    },
    valueCore: {
      ticker: 'LRCX',
      value_core_type: 'Semiconductor Equipment / Etch and Deposition',
      company_stage_candidate: 'Semiconductor Equipment / Etch and Deposition',
      primary_value_driver: 'Semiconductor Equipment / Etch and Deposition execution, customer demand, margin, and cash flow',
      thesis_break_trigger: 'The thesis weakens if semiconductor equipment / etch and deposition demand slows, margins compress, execution disappoints, or cash flow weakens.',
      evidence_needed: [
        'revenue growth',
        'customer demand',
        'gross margin',
        'inventory and backlog',
        'capex or R&D execution',
        'free cash flow'
      ],
      evidence_quality: 'Partial',
      dossier_state: 'curated_profile_batch_4',
      frontend_label: 'Curated',
      coverage_status: 'Curated',
      needs_human_review: false,
      source: 'SEC 10-K / 10-Q'
    },
    visualPhaseOne: {
      faq: {
        overview: [
          {
            question: 'What does LRCX do?',
            answer: 'Lam Research Corporation operates in Semiconductor Equipment / Etch and Deposition.'
          }
        ],
        thesisRisk: [
          {
            question: 'What would break the LRCX thesis?',
            answer: 'The thesis weakens if semiconductor equipment / etch and deposition demand slows, margins compress, execution disappoints, or cash flow weakens.'
          }
        ]
      },
      phaseTwo: {
        thesisRisk: {
          lead: 'The main risk is whether Lam Research Corporation can keep semiconductor equipment / etch and deposition evidence strong while the key risk factors stay contained.',
          riskMap: [
            {
              label: 'Demand / growth',
              severity: 'High',
              watch: 'Semiconductor Equipment / Etch and Deposition demand can slow.'
            },
            {
              label: 'Margin / economics',
              severity: 'High',
              watch: 'Margin can compress.'
            },
            {
              label: 'Execution',
              severity: 'Medium',
              watch: 'Execution can disappoint.'
            },
            {
              label: 'Cash flow / risk',
              severity: 'Medium',
              watch: 'Cash flow can weaken.'
            }
          ],
          evidenceNeeded: [
            'revenue growth',
            'customer demand',
            'gross margin',
            'inventory and backlog',
            'capex or R&D execution',
            'free cash flow'
          ]
        }
      }
    }
  },
  KLAC: {
    ticker: 'KLAC',
    companyName: 'KLA Corporation',
    exchange: 'NASDAQ',
    logoUrl: buildStockLogoUrl('KLAC'),
    overview: 'KLA Corporation operates in Semiconductor Process Control / Inspection.',
    category: 'Semiconductor Process Control / Inspection',
    analysisDate: '2026-06-11',
    latestFiscalPeriod: 'Q3 FY2026 ended 2026-03-31',
    dossierVerdict: {
      sourceType: 'curated',
      asOf: '2026-06-11',
      researchState: 'semiconductor_cycle_watch',
      businessQuality: 'high',
      valuationState: 'not_verified',
      marketEvidence: 'not_verified',
      finalRead: 'Semiconductor Process Control / Inspection where the thesis depends on Semiconductor Process Control / Inspection execution, customer demand, margin, and cash flow.',
      keySupport: [
        'SEC source pack identifies KLA Corporation as Semiconductor Process Control / Inspection.',
        'Latest primary-source filing reviewed: SEC latest periodic filing.'
      ],
      keyRisk: [
        'Semiconductor Process Control / Inspection demand can slow.',
        'Margins can compress if cost, competition, or execution pressure rises.',
        'The business thesis can weaken if cash flow evidence deteriorates.'
      ]
    },
    valueCore: {
      ticker: 'KLAC',
      value_core_type: 'Semiconductor Process Control / Inspection',
      company_stage_candidate: 'Semiconductor Process Control / Inspection',
      primary_value_driver: 'Semiconductor Process Control / Inspection execution, customer demand, margin, and cash flow',
      thesis_break_trigger: 'The thesis weakens if semiconductor process control / inspection demand slows, margins compress, execution disappoints, or cash flow weakens.',
      evidence_needed: [
        'revenue growth',
        'customer demand',
        'gross margin',
        'inventory and backlog',
        'capex or R&D execution',
        'free cash flow'
      ],
      evidence_quality: 'Partial',
      dossier_state: 'curated_profile_batch_4',
      frontend_label: 'Curated',
      coverage_status: 'Curated',
      needs_human_review: false,
      source: 'SEC 10-K / 10-Q'
    },
    visualPhaseOne: {
      faq: {
        overview: [
          {
            question: 'What does KLAC do?',
            answer: 'KLA Corporation operates in Semiconductor Process Control / Inspection.'
          }
        ],
        thesisRisk: [
          {
            question: 'What would break the KLAC thesis?',
            answer: 'The thesis weakens if semiconductor process control / inspection demand slows, margins compress, execution disappoints, or cash flow weakens.'
          }
        ]
      },
      phaseTwo: {
        thesisRisk: {
          lead: 'The main risk is whether KLA Corporation can keep semiconductor process control / inspection evidence strong while the key risk factors stay contained.',
          riskMap: [
            {
              label: 'Demand / growth',
              severity: 'High',
              watch: 'Semiconductor Process Control / Inspection demand can slow.'
            },
            {
              label: 'Margin / economics',
              severity: 'High',
              watch: 'Margin can compress.'
            },
            {
              label: 'Execution',
              severity: 'Medium',
              watch: 'Execution can disappoint.'
            },
            {
              label: 'Cash flow / risk',
              severity: 'Medium',
              watch: 'Cash flow can weaken.'
            }
          ],
          evidenceNeeded: [
            'revenue growth',
            'customer demand',
            'gross margin',
            'inventory and backlog',
            'capex or R&D execution',
            'free cash flow'
          ]
        }
      }
    }
  },
  QCOM: {
    ticker: 'QCOM',
    companyName: 'QUALCOMM Incorporated',
    exchange: 'NASDAQ',
    logoUrl: buildStockLogoUrl('QCOM'),
    overview: 'QUALCOMM Incorporated operates in Mobile / Edge AI Semiconductor Platform.',
    category: 'Mobile / Edge AI Semiconductor Platform',
    analysisDate: '2026-06-11',
    latestFiscalPeriod: 'Q2 FY2026 ended 2026-03-29',
    dossierVerdict: {
      sourceType: 'curated',
      asOf: '2026-06-11',
      researchState: 'semiconductor_cycle_watch',
      businessQuality: 'high',
      valuationState: 'not_verified',
      marketEvidence: 'not_verified',
      finalRead: 'Mobile / Edge AI Semiconductor Platform where the thesis depends on Mobile / Edge AI Semiconductor Platform execution, customer demand, margin, and cash flow.',
      keySupport: [
        'SEC source pack identifies QUALCOMM Incorporated as Mobile / Edge AI Semiconductor Platform.',
        'Latest primary-source filing reviewed: SEC latest periodic filing.'
      ],
      keyRisk: [
        'Mobile / Edge AI Semiconductor Platform demand can slow.',
        'Margins can compress if cost, competition, or execution pressure rises.',
        'The business thesis can weaken if cash flow evidence deteriorates.'
      ]
    },
    valueCore: {
      ticker: 'QCOM',
      value_core_type: 'Mobile / Edge AI Semiconductor Platform',
      company_stage_candidate: 'Mobile / Edge AI Semiconductor Platform',
      primary_value_driver: 'Mobile / Edge AI Semiconductor Platform execution, customer demand, margin, and cash flow',
      thesis_break_trigger: 'The thesis weakens if mobile / edge ai semiconductor platform demand slows, margins compress, execution disappoints, or cash flow weakens.',
      evidence_needed: [
        'revenue growth',
        'customer demand',
        'gross margin',
        'inventory and backlog',
        'capex or R&D execution',
        'free cash flow'
      ],
      evidence_quality: 'Partial',
      dossier_state: 'curated_profile_batch_4',
      frontend_label: 'Curated',
      coverage_status: 'Curated',
      needs_human_review: false,
      source: 'SEC 10-K / 10-Q'
    },
    visualPhaseOne: {
      faq: {
        overview: [
          {
            question: 'What does QCOM do?',
            answer: 'QUALCOMM Incorporated operates in Mobile / Edge AI Semiconductor Platform.'
          }
        ],
        thesisRisk: [
          {
            question: 'What would break the QCOM thesis?',
            answer: 'The thesis weakens if mobile / edge ai semiconductor platform demand slows, margins compress, execution disappoints, or cash flow weakens.'
          }
        ]
      },
      phaseTwo: {
        thesisRisk: {
          lead: 'The main risk is whether QUALCOMM Incorporated can keep mobile / edge ai semiconductor platform evidence strong while the key risk factors stay contained.',
          riskMap: [
            {
              label: 'Demand / growth',
              severity: 'High',
              watch: 'Mobile / Edge AI Semiconductor Platform demand can slow.'
            },
            {
              label: 'Margin / economics',
              severity: 'High',
              watch: 'Margin can compress.'
            },
            {
              label: 'Execution',
              severity: 'Medium',
              watch: 'Execution can disappoint.'
            },
            {
              label: 'Cash flow / risk',
              severity: 'Medium',
              watch: 'Cash flow can weaken.'
            }
          ],
          evidenceNeeded: [
            'revenue growth',
            'customer demand',
            'gross margin',
            'inventory and backlog',
            'capex or R&D execution',
            'free cash flow'
          ]
        }
      }
    }
  },
  TXN: {
    ticker: 'TXN',
    companyName: 'Texas Instruments Incorporated',
    exchange: 'NASDAQ',
    logoUrl: buildStockLogoUrl('TXN'),
    overview: 'Texas Instruments Incorporated operates in Analog / Embedded Semiconductor.',
    category: 'Analog / Embedded Semiconductor',
    analysisDate: '2026-06-11',
    latestFiscalPeriod: 'Q1 2026 ended 2026-03-31',
    dossierVerdict: {
      sourceType: 'curated',
      asOf: '2026-06-11',
      researchState: 'semiconductor_cycle_watch',
      businessQuality: 'high',
      valuationState: 'not_verified',
      marketEvidence: 'not_verified',
      finalRead: 'Analog / Embedded Semiconductor where the thesis depends on Analog / Embedded Semiconductor execution, customer demand, margin, and cash flow.',
      keySupport: [
        'SEC source pack identifies Texas Instruments Incorporated as Analog / Embedded Semiconductor.',
        'Latest primary-source filing reviewed: SEC latest periodic filing.'
      ],
      keyRisk: [
        'Analog / Embedded Semiconductor demand can slow.',
        'Margins can compress if cost, competition, or execution pressure rises.',
        'The business thesis can weaken if cash flow evidence deteriorates.'
      ]
    },
    valueCore: {
      ticker: 'TXN',
      value_core_type: 'Analog / Embedded Semiconductor',
      company_stage_candidate: 'Analog / Embedded Semiconductor',
      primary_value_driver: 'Analog / Embedded Semiconductor execution, customer demand, margin, and cash flow',
      thesis_break_trigger: 'The thesis weakens if analog / embedded semiconductor demand slows, margins compress, execution disappoints, or cash flow weakens.',
      evidence_needed: [
        'revenue growth',
        'customer demand',
        'gross margin',
        'inventory and backlog',
        'capex or R&D execution',
        'free cash flow'
      ],
      evidence_quality: 'Partial',
      dossier_state: 'curated_profile_batch_4',
      frontend_label: 'Curated',
      coverage_status: 'Curated',
      needs_human_review: false,
      source: 'SEC 10-K / 10-Q'
    },
    visualPhaseOne: {
      faq: {
        overview: [
          {
            question: 'What does TXN do?',
            answer: 'Texas Instruments Incorporated operates in Analog / Embedded Semiconductor.'
          }
        ],
        thesisRisk: [
          {
            question: 'What would break the TXN thesis?',
            answer: 'The thesis weakens if analog / embedded semiconductor demand slows, margins compress, execution disappoints, or cash flow weakens.'
          }
        ]
      },
      phaseTwo: {
        thesisRisk: {
          lead: 'The main risk is whether Texas Instruments Incorporated can keep analog / embedded semiconductor evidence strong while the key risk factors stay contained.',
          riskMap: [
            {
              label: 'Demand / growth',
              severity: 'High',
              watch: 'Analog / Embedded Semiconductor demand can slow.'
            },
            {
              label: 'Margin / economics',
              severity: 'High',
              watch: 'Margin can compress.'
            },
            {
              label: 'Execution',
              severity: 'Medium',
              watch: 'Execution can disappoint.'
            },
            {
              label: 'Cash flow / risk',
              severity: 'Medium',
              watch: 'Cash flow can weaken.'
            }
          ],
          evidenceNeeded: [
            'revenue growth',
            'customer demand',
            'gross margin',
            'inventory and backlog',
            'capex or R&D execution',
            'free cash flow'
          ]
        }
      }
    }
  },
  CSCO: {
    ticker: 'CSCO',
    companyName: 'Cisco Systems, Inc.',
    exchange: 'NASDAQ',
    logoUrl: buildStockLogoUrl('CSCO'),
    overview: 'Cisco Systems, Inc. operates in Networking / Security / Observability Platform.',
    category: 'Networking / Security / Observability Platform',
    analysisDate: '2026-06-11',
    latestFiscalPeriod: 'Q3 FY2026 ended 2026-04-25',
    dossierVerdict: {
      sourceType: 'curated',
      asOf: '2026-06-11',
      researchState: 'business_evidence_watch',
      businessQuality: 'high',
      valuationState: 'not_verified',
      marketEvidence: 'not_verified',
      finalRead: 'Networking / Security / Observability Platform where the thesis depends on Networking / Security / Observability Platform execution, customer demand, margin, and cash flow.',
      keySupport: [
        'SEC source pack identifies Cisco Systems, Inc. as Networking / Security / Observability Platform.',
        'Latest primary-source filing reviewed: SEC latest periodic filing.'
      ],
      keyRisk: [
        'Networking / Security / Observability Platform demand can slow.',
        'Margins can compress if cost, competition, or execution pressure rises.',
        'The business thesis can weaken if cash flow evidence deteriorates.'
      ]
    },
    valueCore: {
      ticker: 'CSCO',
      value_core_type: 'Networking / Security / Observability Platform',
      company_stage_candidate: 'Networking / Security / Observability Platform',
      primary_value_driver: 'Networking / Security / Observability Platform execution, customer demand, margin, and cash flow',
      thesis_break_trigger: 'The thesis weakens if networking / security / observability platform demand slows, margins compress, execution disappoints, or cash flow weakens.',
      evidence_needed: [
        'revenue growth',
        'customer demand',
        'gross margin',
        'inventory and backlog',
        'capex or R&D execution',
        'free cash flow'
      ],
      evidence_quality: 'Partial',
      dossier_state: 'curated_profile_batch_4',
      frontend_label: 'Curated',
      coverage_status: 'Curated',
      needs_human_review: false,
      source: 'SEC 10-K / 10-Q'
    },
    visualPhaseOne: {
      faq: {
        overview: [
          {
            question: 'What does CSCO do?',
            answer: 'Cisco Systems, Inc. operates in Networking / Security / Observability Platform.'
          }
        ],
        thesisRisk: [
          {
            question: 'What would break the CSCO thesis?',
            answer: 'The thesis weakens if networking / security / observability platform demand slows, margins compress, execution disappoints, or cash flow weakens.'
          }
        ]
      },
      phaseTwo: {
        thesisRisk: {
          lead: 'The main risk is whether Cisco Systems, Inc. can keep networking / security / observability platform evidence strong while the key risk factors stay contained.',
          riskMap: [
            {
              label: 'Demand / growth',
              severity: 'High',
              watch: 'Networking / Security / Observability Platform demand can slow.'
            },
            {
              label: 'Margin / economics',
              severity: 'High',
              watch: 'Margin can compress.'
            },
            {
              label: 'Execution',
              severity: 'Medium',
              watch: 'Execution can disappoint.'
            },
            {
              label: 'Cash flow / risk',
              severity: 'Medium',
              watch: 'Cash flow can weaken.'
            }
          ],
          evidenceNeeded: [
            'revenue growth',
            'customer demand',
            'gross margin',
            'inventory and backlog',
            'capex or R&D execution',
            'free cash flow'
          ]
        }
      }
    }
  },
  IBM: {
    ticker: 'IBM',
    companyName: 'International Business Machines Corporation',
    exchange: 'NYSE',
    logoUrl: buildStockLogoUrl('IBM'),
    overview: 'International Business Machines Corporation operates in Hybrid Cloud / AI / Consulting Platform.',
    category: 'Hybrid Cloud / AI / Consulting Platform',
    analysisDate: '2026-06-11',
    latestFiscalPeriod: 'Q1 2026 ended 2026-03-31',
    dossierVerdict: {
      sourceType: 'curated',
      asOf: '2026-06-11',
      researchState: 'business_evidence_watch',
      businessQuality: 'high',
      valuationState: 'not_verified',
      marketEvidence: 'not_verified',
      finalRead: 'Hybrid Cloud / AI / Consulting Platform where the thesis depends on Hybrid Cloud / AI / Consulting Platform execution, customer demand, margin, and cash flow.',
      keySupport: [
        'SEC source pack identifies International Business Machines Corporation as Hybrid Cloud / AI / Consulting Platform.',
        'Latest primary-source filing reviewed: SEC latest periodic filing.'
      ],
      keyRisk: [
        'Hybrid Cloud / AI / Consulting Platform demand can slow.',
        'Margins can compress if cost, competition, or execution pressure rises.',
        'The business thesis can weaken if cash flow evidence deteriorates.'
      ]
    },
    valueCore: {
      ticker: 'IBM',
      value_core_type: 'Hybrid Cloud / AI / Consulting Platform',
      company_stage_candidate: 'Hybrid Cloud / AI / Consulting Platform',
      primary_value_driver: 'Hybrid Cloud / AI / Consulting Platform execution, customer demand, margin, and cash flow',
      thesis_break_trigger: 'The thesis weakens if hybrid cloud / ai / consulting platform demand slows, margins compress, execution disappoints, or cash flow weakens.',
      evidence_needed: [
        'revenue growth',
        'customer demand',
        'gross margin',
        'inventory and backlog',
        'capex or R&D execution',
        'free cash flow'
      ],
      evidence_quality: 'Partial',
      dossier_state: 'curated_profile_batch_4',
      frontend_label: 'Curated',
      coverage_status: 'Curated',
      needs_human_review: false,
      source: 'SEC 10-K / 10-Q'
    },
    visualPhaseOne: {
      faq: {
        overview: [
          {
            question: 'What does IBM do?',
            answer: 'International Business Machines Corporation operates in Hybrid Cloud / AI / Consulting Platform.'
          }
        ],
        thesisRisk: [
          {
            question: 'What would break the IBM thesis?',
            answer: 'The thesis weakens if hybrid cloud / ai / consulting platform demand slows, margins compress, execution disappoints, or cash flow weakens.'
          }
        ]
      },
      phaseTwo: {
        thesisRisk: {
          lead: 'The main risk is whether International Business Machines Corporation can keep hybrid cloud / ai / consulting platform evidence strong while the key risk factors stay contained.',
          riskMap: [
            {
              label: 'Demand / growth',
              severity: 'High',
              watch: 'Hybrid Cloud / AI / Consulting Platform demand can slow.'
            },
            {
              label: 'Margin / economics',
              severity: 'High',
              watch: 'Margin can compress.'
            },
            {
              label: 'Execution',
              severity: 'Medium',
              watch: 'Execution can disappoint.'
            },
            {
              label: 'Cash flow / risk',
              severity: 'Medium',
              watch: 'Cash flow can weaken.'
            }
          ],
          evidenceNeeded: [
            'revenue growth',
            'customer demand',
            'gross margin',
            'inventory and backlog',
            'capex or R&D execution',
            'free cash flow'
          ]
        }
      }
    }
  },
  JPM: {
    ticker: 'JPM',
    companyName: 'JPMorgan Chase & Co.',
    exchange: 'NYSE',
    logoUrl: buildStockLogoUrl('JPM'),
    overview: 'JPMorgan Chase & Co. operates in Diversified Bank / Financial Services.',
    category: 'Diversified Bank / Financial Services',
    analysisDate: '2026-06-11',
    latestFiscalPeriod: 'Q1 2026 ended 2026-03-31',
    dossierVerdict: {
      sourceType: 'curated',
      asOf: '2026-06-11',
      researchState: 'financial_cycle_watch',
      businessQuality: 'medium',
      valuationState: 'not_verified',
      marketEvidence: 'not_verified',
      finalRead: 'Diversified Bank / Financial Services where the thesis depends on Diversified Bank / Financial Services execution, customer demand, margin, and cash flow.',
      keySupport: [
        'SEC source pack identifies JPMorgan Chase & Co. as Diversified Bank / Financial Services.',
        'Latest primary-source filing reviewed: SEC latest periodic filing.'
      ],
      keyRisk: [
        'Diversified Bank / Financial Services demand can slow.',
        'Margins can compress if cost, competition, or execution pressure rises.',
        'The business thesis can weaken if cash flow evidence deteriorates.'
      ]
    },
    valueCore: {
      ticker: 'JPM',
      value_core_type: 'Diversified Bank / Financial Services',
      company_stage_candidate: 'Diversified Bank / Financial Services',
      primary_value_driver: 'Diversified Bank / Financial Services execution, customer demand, margin, and cash flow',
      thesis_break_trigger: 'The thesis weakens if diversified bank / financial services demand slows, margins compress, execution disappoints, or cash flow weakens.',
      evidence_needed: [
        'revenue and net interest income',
        'credit quality',
        'fee income',
        'capital and liquidity',
        'operating leverage',
        'cash flow'
      ],
      evidence_quality: 'Partial',
      dossier_state: 'curated_profile_batch_4',
      frontend_label: 'Curated',
      coverage_status: 'Curated',
      needs_human_review: false,
      source: 'SEC 10-K / 10-Q'
    },
    visualPhaseOne: {
      faq: {
        overview: [
          {
            question: 'What does JPM do?',
            answer: 'JPMorgan Chase & Co. operates in Diversified Bank / Financial Services.'
          }
        ],
        thesisRisk: [
          {
            question: 'What would break the JPM thesis?',
            answer: 'The thesis weakens if diversified bank / financial services demand slows, margins compress, execution disappoints, or cash flow weakens.'
          }
        ]
      },
      phaseTwo: {
        thesisRisk: {
          lead: 'The main risk is whether JPMorgan Chase & Co. can keep diversified bank / financial services evidence strong while the key risk factors stay contained.',
          riskMap: [
            {
              label: 'Demand / growth',
              severity: 'High',
              watch: 'Diversified Bank / Financial Services demand can slow.'
            },
            {
              label: 'Margin / economics',
              severity: 'High',
              watch: 'Margin can compress.'
            },
            {
              label: 'Execution',
              severity: 'Medium',
              watch: 'Execution can disappoint.'
            },
            {
              label: 'Cash flow / risk',
              severity: 'Medium',
              watch: 'Cash flow can weaken.'
            }
          ],
          evidenceNeeded: [
            'revenue and net interest income',
            'credit quality',
            'fee income',
            'capital and liquidity',
            'operating leverage',
            'cash flow'
          ]
        }
      }
    }
  },
  V: {
    ticker: 'V',
    companyName: 'Visa Inc.',
    exchange: 'NYSE',
    logoUrl: buildStockLogoUrl('V'),
    overview: 'Visa Inc. operates in Global Payments Network.',
    category: 'Global Payments Network',
    analysisDate: '2026-06-11',
    latestFiscalPeriod: 'Q2 FY2026 ended 2026-03-31',
    dossierVerdict: {
      sourceType: 'curated',
      asOf: '2026-06-11',
      researchState: 'business_evidence_watch',
      businessQuality: 'high',
      valuationState: 'not_verified',
      marketEvidence: 'not_verified',
      finalRead: 'Global Payments Network where the thesis depends on Global Payments Network execution, customer demand, margin, and cash flow.',
      keySupport: [
        'SEC source pack identifies Visa Inc. as Global Payments Network.',
        'Latest primary-source filing reviewed: SEC latest periodic filing.'
      ],
      keyRisk: [
        'Global Payments Network demand can slow.',
        'Margins can compress if cost, competition, or execution pressure rises.',
        'The business thesis can weaken if cash flow evidence deteriorates.'
      ]
    },
    valueCore: {
      ticker: 'V',
      value_core_type: 'Global Payments Network',
      company_stage_candidate: 'Global Payments Network',
      primary_value_driver: 'Global Payments Network execution, customer demand, margin, and cash flow',
      thesis_break_trigger: 'The thesis weakens if global payments network demand slows, margins compress, execution disappoints, or cash flow weakens.',
      evidence_needed: [
        'revenue and net interest income',
        'credit quality',
        'fee income',
        'capital and liquidity',
        'operating leverage',
        'cash flow'
      ],
      evidence_quality: 'Partial',
      dossier_state: 'curated_profile_batch_4',
      frontend_label: 'Curated',
      coverage_status: 'Curated',
      needs_human_review: false,
      source: 'SEC 10-K / 10-Q'
    },
    visualPhaseOne: {
      faq: {
        overview: [
          {
            question: 'What does V do?',
            answer: 'Visa Inc. operates in Global Payments Network.'
          }
        ],
        thesisRisk: [
          {
            question: 'What would break the V thesis?',
            answer: 'The thesis weakens if global payments network demand slows, margins compress, execution disappoints, or cash flow weakens.'
          }
        ]
      },
      phaseTwo: {
        thesisRisk: {
          lead: 'The main risk is whether Visa Inc. can keep global payments network evidence strong while the key risk factors stay contained.',
          riskMap: [
            {
              label: 'Demand / growth',
              severity: 'High',
              watch: 'Global Payments Network demand can slow.'
            },
            {
              label: 'Margin / economics',
              severity: 'High',
              watch: 'Margin can compress.'
            },
            {
              label: 'Execution',
              severity: 'Medium',
              watch: 'Execution can disappoint.'
            },
            {
              label: 'Cash flow / risk',
              severity: 'Medium',
              watch: 'Cash flow can weaken.'
            }
          ],
          evidenceNeeded: [
            'revenue and net interest income',
            'credit quality',
            'fee income',
            'capital and liquidity',
            'operating leverage',
            'cash flow'
          ]
        }
      }
    }
  },
  COST: {
    ticker: 'COST',
    companyName: 'Costco Wholesale Corporation',
    exchange: 'NASDAQ',
    logoUrl: buildStockLogoUrl('COST'),
    overview: 'Costco Wholesale Corporation operates in Membership Warehouse Retail.',
    category: 'Membership Warehouse Retail',
    analysisDate: '2026-06-11',
    latestFiscalPeriod: 'Q3 FY2026 ended 2026-05-10',
    dossierVerdict: {
      sourceType: 'curated',
      asOf: '2026-06-11',
      researchState: 'consumer_demand_watch',
      businessQuality: 'high',
      valuationState: 'not_verified',
      marketEvidence: 'not_verified',
      finalRead: 'Membership Warehouse Retail where the thesis depends on Membership Warehouse Retail execution, customer demand, margin, and cash flow.',
      keySupport: [
        'SEC source pack identifies Costco Wholesale Corporation as Membership Warehouse Retail.',
        'Latest primary-source filing reviewed: SEC latest periodic filing.'
      ],
      keyRisk: [
        'Membership Warehouse Retail demand can slow.',
        'Margins can compress if cost, competition, or execution pressure rises.',
        'The business thesis can weaken if cash flow evidence deteriorates.'
      ]
    },
    valueCore: {
      ticker: 'COST',
      value_core_type: 'Membership Warehouse Retail',
      company_stage_candidate: 'Membership Warehouse Retail',
      primary_value_driver: 'Membership Warehouse Retail execution, customer demand, margin, and cash flow',
      thesis_break_trigger: 'The thesis weakens if membership warehouse retail demand slows, margins compress, execution disappoints, or cash flow weakens.',
      evidence_needed: [
        'revenue growth',
        'customer demand',
        'gross margin',
        'inventory and backlog',
        'capex or R&D execution',
        'free cash flow'
      ],
      evidence_quality: 'Partial',
      dossier_state: 'curated_profile_batch_4',
      frontend_label: 'Curated',
      coverage_status: 'Curated',
      needs_human_review: false,
      source: 'SEC 10-K / 10-Q'
    },
    visualPhaseOne: {
      faq: {
        overview: [
          {
            question: 'What does COST do?',
            answer: 'Costco Wholesale Corporation operates in Membership Warehouse Retail.'
          }
        ],
        thesisRisk: [
          {
            question: 'What would break the COST thesis?',
            answer: 'The thesis weakens if membership warehouse retail demand slows, margins compress, execution disappoints, or cash flow weakens.'
          }
        ]
      },
      phaseTwo: {
        thesisRisk: {
          lead: 'The main risk is whether Costco Wholesale Corporation can keep membership warehouse retail evidence strong while the key risk factors stay contained.',
          riskMap: [
            {
              label: 'Demand / growth',
              severity: 'High',
              watch: 'Membership Warehouse Retail demand can slow.'
            },
            {
              label: 'Margin / economics',
              severity: 'High',
              watch: 'Margin can compress.'
            },
            {
              label: 'Execution',
              severity: 'Medium',
              watch: 'Execution can disappoint.'
            },
            {
              label: 'Cash flow / risk',
              severity: 'Medium',
              watch: 'Cash flow can weaken.'
            }
          ],
          evidenceNeeded: [
            'revenue growth',
            'customer demand',
            'gross margin',
            'inventory and backlog',
            'capex or R&D execution',
            'free cash flow'
          ]
        }
      }
    }
  },
  HD: {
    ticker: 'HD',
    companyName: 'The Home Depot, Inc.',
    exchange: 'NYSE',
    logoUrl: buildStockLogoUrl('HD'),
    overview: 'The Home Depot, Inc. operates in Home Improvement Retail.',
    category: 'Home Improvement Retail',
    analysisDate: '2026-06-11',
    latestFiscalPeriod: 'Q1 FY2026 ended 2026-05-03',
    dossierVerdict: {
      sourceType: 'curated',
      asOf: '2026-06-11',
      researchState: 'consumer_demand_watch',
      businessQuality: 'high',
      valuationState: 'not_verified',
      marketEvidence: 'not_verified',
      finalRead: 'Home Improvement Retail where the thesis depends on Home Improvement Retail execution, customer demand, margin, and cash flow.',
      keySupport: [
        'SEC source pack identifies The Home Depot, Inc. as Home Improvement Retail.',
        'Latest primary-source filing reviewed: SEC latest periodic filing.'
      ],
      keyRisk: [
        'Home Improvement Retail demand can slow.',
        'Margins can compress if cost, competition, or execution pressure rises.',
        'The business thesis can weaken if cash flow evidence deteriorates.'
      ]
    },
    valueCore: {
      ticker: 'HD',
      value_core_type: 'Home Improvement Retail',
      company_stage_candidate: 'Home Improvement Retail',
      primary_value_driver: 'Home Improvement Retail execution, customer demand, margin, and cash flow',
      thesis_break_trigger: 'The thesis weakens if home improvement retail demand slows, margins compress, execution disappoints, or cash flow weakens.',
      evidence_needed: [
        'revenue growth',
        'customer demand',
        'gross margin',
        'inventory and backlog',
        'capex or R&D execution',
        'free cash flow'
      ],
      evidence_quality: 'Partial',
      dossier_state: 'curated_profile_batch_4',
      frontend_label: 'Curated',
      coverage_status: 'Curated',
      needs_human_review: false,
      source: 'SEC 10-K / 10-Q'
    },
    visualPhaseOne: {
      faq: {
        overview: [
          {
            question: 'What does HD do?',
            answer: 'The Home Depot, Inc. operates in Home Improvement Retail.'
          }
        ],
        thesisRisk: [
          {
            question: 'What would break the HD thesis?',
            answer: 'The thesis weakens if home improvement retail demand slows, margins compress, execution disappoints, or cash flow weakens.'
          }
        ]
      },
      phaseTwo: {
        thesisRisk: {
          lead: 'The main risk is whether The Home Depot, Inc. can keep home improvement retail evidence strong while the key risk factors stay contained.',
          riskMap: [
            {
              label: 'Demand / growth',
              severity: 'High',
              watch: 'Home Improvement Retail demand can slow.'
            },
            {
              label: 'Margin / economics',
              severity: 'High',
              watch: 'Margin can compress.'
            },
            {
              label: 'Execution',
              severity: 'Medium',
              watch: 'Execution can disappoint.'
            },
            {
              label: 'Cash flow / risk',
              severity: 'Medium',
              watch: 'Cash flow can weaken.'
            }
          ],
          evidenceNeeded: [
            'revenue growth',
            'customer demand',
            'gross margin',
            'inventory and backlog',
            'capex or R&D execution',
            'free cash flow'
          ]
        }
      }
    }
  },
  UNH: {
    ticker: 'UNH',
    companyName: 'UnitedHealth Group Incorporated',
    exchange: 'NYSE',
    logoUrl: buildStockLogoUrl('UNH'),
    overview: 'UnitedHealth Group Incorporated operates in Managed Care / Health Services.',
    category: 'Managed Care / Health Services',
    analysisDate: '2026-06-11',
    latestFiscalPeriod: 'Q1 2026 ended 2026-03-31',
    dossierVerdict: {
      sourceType: 'curated',
      asOf: '2026-06-11',
      researchState: 'healthcare_evidence_watch',
      businessQuality: 'high',
      valuationState: 'not_verified',
      marketEvidence: 'not_verified',
      finalRead: 'Managed Care / Health Services where the thesis depends on Managed Care / Health Services execution, customer demand, margin, and cash flow.',
      keySupport: [
        'SEC source pack identifies UnitedHealth Group Incorporated as Managed Care / Health Services.',
        'Latest primary-source filing reviewed: SEC latest periodic filing.'
      ],
      keyRisk: [
        'Managed Care / Health Services demand can slow.',
        'Margins can compress if cost, competition, or execution pressure rises.',
        'The business thesis can weaken if cash flow evidence deteriorates.'
      ]
    },
    valueCore: {
      ticker: 'UNH',
      value_core_type: 'Managed Care / Health Services',
      company_stage_candidate: 'Managed Care / Health Services',
      primary_value_driver: 'Managed Care / Health Services execution, customer demand, margin, and cash flow',
      thesis_break_trigger: 'The thesis weakens if managed care / health services demand slows, margins compress, execution disappoints, or cash flow weakens.',
      evidence_needed: [
        'revenue growth',
        'pipeline or product adoption',
        'regulatory progress',
        'margin',
        'cash flow',
        'safety or reimbursement evidence'
      ],
      evidence_quality: 'Partial',
      dossier_state: 'curated_profile_batch_5',
      frontend_label: 'Curated',
      coverage_status: 'Curated',
      needs_human_review: false,
      source: 'SEC 10-K / 10-Q'
    },
    visualPhaseOne: {
      faq: {
        overview: [
          {
            question: 'What does UNH do?',
            answer: 'UnitedHealth Group Incorporated operates in Managed Care / Health Services.'
          }
        ],
        thesisRisk: [
          {
            question: 'What would break the UNH thesis?',
            answer: 'The thesis weakens if managed care / health services demand slows, margins compress, execution disappoints, or cash flow weakens.'
          }
        ]
      },
      phaseTwo: {
        thesisRisk: {
          lead: 'The main risk is whether UnitedHealth Group Incorporated can keep managed care / health services evidence strong while the key risk factors stay contained.',
          riskMap: [
            {
              label: 'Demand / growth',
              severity: 'High',
              watch: 'Managed Care / Health Services demand can slow.'
            },
            {
              label: 'Margin / economics',
              severity: 'High',
              watch: 'Margin can compress.'
            },
            {
              label: 'Execution',
              severity: 'Medium',
              watch: 'Execution can disappoint.'
            },
            {
              label: 'Cash flow / risk',
              severity: 'Medium',
              watch: 'Cash flow can weaken.'
            }
          ],
          evidenceNeeded: [
            'revenue growth',
            'pipeline or product adoption',
            'regulatory progress',
            'margin',
            'cash flow',
            'safety or reimbursement evidence'
          ]
        }
      }
    }
  },
  LLY: {
    ticker: 'LLY',
    companyName: 'Eli Lilly and Company',
    exchange: 'NYSE',
    logoUrl: buildStockLogoUrl('LLY'),
    overview: 'Eli Lilly and Company operates in Pharmaceuticals / GLP-1 / Diabetes / Obesity.',
    category: 'Pharmaceuticals / GLP-1 / Diabetes / Obesity',
    analysisDate: '2026-06-11',
    latestFiscalPeriod: 'Q1 2026 ended 2026-03-31',
    dossierVerdict: {
      sourceType: 'curated',
      asOf: '2026-06-11',
      researchState: 'healthcare_evidence_watch',
      businessQuality: 'high',
      valuationState: 'not_verified',
      marketEvidence: 'not_verified',
      finalRead: 'Pharmaceuticals / GLP-1 / Diabetes / Obesity where the thesis depends on Pharmaceuticals / GLP-1 / Diabetes / Obesity execution, customer demand, margin, and cash flow.',
      keySupport: [
        'SEC source pack identifies Eli Lilly and Company as Pharmaceuticals / GLP-1 / Diabetes / Obesity.',
        'Latest primary-source filing reviewed: SEC latest periodic filing.'
      ],
      keyRisk: [
        'Pharmaceuticals / GLP-1 / Diabetes / Obesity demand can slow.',
        'Margins can compress if cost, competition, or execution pressure rises.',
        'The business thesis can weaken if cash flow evidence deteriorates.'
      ]
    },
    valueCore: {
      ticker: 'LLY',
      value_core_type: 'Pharmaceuticals / GLP-1 / Diabetes / Obesity',
      company_stage_candidate: 'Pharmaceuticals / GLP-1 / Diabetes / Obesity',
      primary_value_driver: 'Pharmaceuticals / GLP-1 / Diabetes / Obesity execution, customer demand, margin, and cash flow',
      thesis_break_trigger: 'The thesis weakens if pharmaceuticals / glp-1 / diabetes / obesity demand slows, margins compress, execution disappoints, or cash flow weakens.',
      evidence_needed: [
        'revenue growth',
        'pipeline or product adoption',
        'regulatory progress',
        'margin',
        'cash flow',
        'safety or reimbursement evidence'
      ],
      evidence_quality: 'Partial',
      dossier_state: 'curated_profile_batch_5',
      frontend_label: 'Curated',
      coverage_status: 'Curated',
      needs_human_review: false,
      source: 'SEC 10-K / 10-Q'
    },
    visualPhaseOne: {
      faq: {
        overview: [
          {
            question: 'What does LLY do?',
            answer: 'Eli Lilly and Company operates in Pharmaceuticals / GLP-1 / Diabetes / Obesity.'
          }
        ],
        thesisRisk: [
          {
            question: 'What would break the LLY thesis?',
            answer: 'The thesis weakens if pharmaceuticals / glp-1 / diabetes / obesity demand slows, margins compress, execution disappoints, or cash flow weakens.'
          }
        ]
      },
      phaseTwo: {
        thesisRisk: {
          lead: 'The main risk is whether Eli Lilly and Company can keep pharmaceuticals / glp-1 / diabetes / obesity evidence strong while the key risk factors stay contained.',
          riskMap: [
            {
              label: 'Demand / growth',
              severity: 'High',
              watch: 'Pharmaceuticals / GLP-1 / Diabetes / Obesity demand can slow.'
            },
            {
              label: 'Margin / economics',
              severity: 'High',
              watch: 'Margin can compress.'
            },
            {
              label: 'Execution',
              severity: 'Medium',
              watch: 'Execution can disappoint.'
            },
            {
              label: 'Cash flow / risk',
              severity: 'Medium',
              watch: 'Cash flow can weaken.'
            }
          ],
          evidenceNeeded: [
            'revenue growth',
            'pipeline or product adoption',
            'regulatory progress',
            'margin',
            'cash flow',
            'safety or reimbursement evidence'
          ]
        }
      }
    }
  },
  JNJ: {
    ticker: 'JNJ',
    companyName: 'Johnson & Johnson',
    exchange: 'NYSE',
    logoUrl: buildStockLogoUrl('JNJ'),
    overview: 'Johnson & Johnson operates in Pharmaceuticals / MedTech.',
    category: 'Pharmaceuticals / MedTech',
    analysisDate: '2026-06-11',
    latestFiscalPeriod: 'Q1 2026 ended 2026-03-29',
    dossierVerdict: {
      sourceType: 'curated',
      asOf: '2026-06-11',
      researchState: 'healthcare_evidence_watch',
      businessQuality: 'high',
      valuationState: 'not_verified',
      marketEvidence: 'not_verified',
      finalRead: 'Pharmaceuticals / MedTech where the thesis depends on Pharmaceuticals / MedTech execution, customer demand, margin, and cash flow.',
      keySupport: [
        'SEC source pack identifies Johnson & Johnson as Pharmaceuticals / MedTech.',
        'Latest primary-source filing reviewed: SEC latest periodic filing.'
      ],
      keyRisk: [
        'Pharmaceuticals / MedTech demand can slow.',
        'Margins can compress if cost, competition, or execution pressure rises.',
        'The business thesis can weaken if cash flow evidence deteriorates.'
      ]
    },
    valueCore: {
      ticker: 'JNJ',
      value_core_type: 'Pharmaceuticals / MedTech',
      company_stage_candidate: 'Pharmaceuticals / MedTech',
      primary_value_driver: 'Pharmaceuticals / MedTech execution, customer demand, margin, and cash flow',
      thesis_break_trigger: 'The thesis weakens if pharmaceuticals / medtech demand slows, margins compress, execution disappoints, or cash flow weakens.',
      evidence_needed: [
        'revenue growth',
        'pipeline or product adoption',
        'regulatory progress',
        'margin',
        'cash flow',
        'safety or reimbursement evidence'
      ],
      evidence_quality: 'Partial',
      dossier_state: 'curated_profile_batch_5',
      frontend_label: 'Curated',
      coverage_status: 'Curated',
      needs_human_review: false,
      source: 'SEC 10-K / 10-Q'
    },
    visualPhaseOne: {
      faq: {
        overview: [
          {
            question: 'What does JNJ do?',
            answer: 'Johnson & Johnson operates in Pharmaceuticals / MedTech.'
          }
        ],
        thesisRisk: [
          {
            question: 'What would break the JNJ thesis?',
            answer: 'The thesis weakens if pharmaceuticals / medtech demand slows, margins compress, execution disappoints, or cash flow weakens.'
          }
        ]
      },
      phaseTwo: {
        thesisRisk: {
          lead: 'The main risk is whether Johnson & Johnson can keep pharmaceuticals / medtech evidence strong while the key risk factors stay contained.',
          riskMap: [
            {
              label: 'Demand / growth',
              severity: 'High',
              watch: 'Pharmaceuticals / MedTech demand can slow.'
            },
            {
              label: 'Margin / economics',
              severity: 'High',
              watch: 'Margin can compress.'
            },
            {
              label: 'Execution',
              severity: 'Medium',
              watch: 'Execution can disappoint.'
            },
            {
              label: 'Cash flow / risk',
              severity: 'Medium',
              watch: 'Cash flow can weaken.'
            }
          ],
          evidenceNeeded: [
            'revenue growth',
            'pipeline or product adoption',
            'regulatory progress',
            'margin',
            'cash flow',
            'safety or reimbursement evidence'
          ]
        }
      }
    }
  },
  MRK: {
    ticker: 'MRK',
    companyName: 'Merck & Co., Inc.',
    exchange: 'NYSE',
    logoUrl: buildStockLogoUrl('MRK'),
    overview: 'Merck & Co., Inc. operates in Pharmaceuticals / Oncology / Vaccines.',
    category: 'Pharmaceuticals / Oncology / Vaccines',
    analysisDate: '2026-06-11',
    latestFiscalPeriod: 'Q1 2026 ended 2026-03-31',
    dossierVerdict: {
      sourceType: 'curated',
      asOf: '2026-06-11',
      researchState: 'healthcare_evidence_watch',
      businessQuality: 'high',
      valuationState: 'not_verified',
      marketEvidence: 'not_verified',
      finalRead: 'Pharmaceuticals / Oncology / Vaccines where the thesis depends on Pharmaceuticals / Oncology / Vaccines execution, customer demand, margin, and cash flow.',
      keySupport: [
        'SEC source pack identifies Merck & Co., Inc. as Pharmaceuticals / Oncology / Vaccines.',
        'Latest primary-source filing reviewed: SEC latest periodic filing.'
      ],
      keyRisk: [
        'Pharmaceuticals / Oncology / Vaccines demand can slow.',
        'Margins can compress if cost, competition, or execution pressure rises.',
        'The business thesis can weaken if cash flow evidence deteriorates.'
      ]
    },
    valueCore: {
      ticker: 'MRK',
      value_core_type: 'Pharmaceuticals / Oncology / Vaccines',
      company_stage_candidate: 'Pharmaceuticals / Oncology / Vaccines',
      primary_value_driver: 'Pharmaceuticals / Oncology / Vaccines execution, customer demand, margin, and cash flow',
      thesis_break_trigger: 'The thesis weakens if pharmaceuticals / oncology / vaccines demand slows, margins compress, execution disappoints, or cash flow weakens.',
      evidence_needed: [
        'revenue growth',
        'pipeline or product adoption',
        'regulatory progress',
        'margin',
        'cash flow',
        'safety or reimbursement evidence'
      ],
      evidence_quality: 'Partial',
      dossier_state: 'curated_profile_batch_5',
      frontend_label: 'Curated',
      coverage_status: 'Curated',
      needs_human_review: false,
      source: 'SEC 10-K / 10-Q'
    },
    visualPhaseOne: {
      faq: {
        overview: [
          {
            question: 'What does MRK do?',
            answer: 'Merck & Co., Inc. operates in Pharmaceuticals / Oncology / Vaccines.'
          }
        ],
        thesisRisk: [
          {
            question: 'What would break the MRK thesis?',
            answer: 'The thesis weakens if pharmaceuticals / oncology / vaccines demand slows, margins compress, execution disappoints, or cash flow weakens.'
          }
        ]
      },
      phaseTwo: {
        thesisRisk: {
          lead: 'The main risk is whether Merck & Co., Inc. can keep pharmaceuticals / oncology / vaccines evidence strong while the key risk factors stay contained.',
          riskMap: [
            {
              label: 'Demand / growth',
              severity: 'High',
              watch: 'Pharmaceuticals / Oncology / Vaccines demand can slow.'
            },
            {
              label: 'Margin / economics',
              severity: 'High',
              watch: 'Margin can compress.'
            },
            {
              label: 'Execution',
              severity: 'Medium',
              watch: 'Execution can disappoint.'
            },
            {
              label: 'Cash flow / risk',
              severity: 'Medium',
              watch: 'Cash flow can weaken.'
            }
          ],
          evidenceNeeded: [
            'revenue growth',
            'pipeline or product adoption',
            'regulatory progress',
            'margin',
            'cash flow',
            'safety or reimbursement evidence'
          ]
        }
      }
    }
  },
  ABBV: {
    ticker: 'ABBV',
    companyName: 'AbbVie Inc.',
    exchange: 'NYSE',
    logoUrl: buildStockLogoUrl('ABBV'),
    overview: 'AbbVie Inc. operates in Biopharma / Immunology / Neuroscience / Aesthetics.',
    category: 'Biopharma / Immunology / Neuroscience / Aesthetics',
    analysisDate: '2026-06-11',
    latestFiscalPeriod: 'Q1 2026 ended 2026-03-31',
    dossierVerdict: {
      sourceType: 'curated',
      asOf: '2026-06-11',
      researchState: 'healthcare_evidence_watch',
      businessQuality: 'high',
      valuationState: 'not_verified',
      marketEvidence: 'not_verified',
      finalRead: 'Biopharma / Immunology / Neuroscience / Aesthetics where the thesis depends on Biopharma / Immunology / Neuroscience / Aesthetics execution, customer demand, margin, and cash flow.',
      keySupport: [
        'SEC source pack identifies AbbVie Inc. as Biopharma / Immunology / Neuroscience / Aesthetics.',
        'Latest primary-source filing reviewed: SEC latest periodic filing.'
      ],
      keyRisk: [
        'Biopharma / Immunology / Neuroscience / Aesthetics demand can slow.',
        'Margins can compress if cost, competition, or execution pressure rises.',
        'The business thesis can weaken if cash flow evidence deteriorates.'
      ]
    },
    valueCore: {
      ticker: 'ABBV',
      value_core_type: 'Biopharma / Immunology / Neuroscience / Aesthetics',
      company_stage_candidate: 'Biopharma / Immunology / Neuroscience / Aesthetics',
      primary_value_driver: 'Biopharma / Immunology / Neuroscience / Aesthetics execution, customer demand, margin, and cash flow',
      thesis_break_trigger: 'The thesis weakens if biopharma / immunology / neuroscience / aesthetics demand slows, margins compress, execution disappoints, or cash flow weakens.',
      evidence_needed: [
        'revenue growth',
        'pipeline or product adoption',
        'regulatory progress',
        'margin',
        'cash flow',
        'safety or reimbursement evidence'
      ],
      evidence_quality: 'Partial',
      dossier_state: 'curated_profile_batch_5',
      frontend_label: 'Curated',
      coverage_status: 'Curated',
      needs_human_review: false,
      source: 'SEC 10-K / 10-Q'
    },
    visualPhaseOne: {
      faq: {
        overview: [
          {
            question: 'What does ABBV do?',
            answer: 'AbbVie Inc. operates in Biopharma / Immunology / Neuroscience / Aesthetics.'
          }
        ],
        thesisRisk: [
          {
            question: 'What would break the ABBV thesis?',
            answer: 'The thesis weakens if biopharma / immunology / neuroscience / aesthetics demand slows, margins compress, execution disappoints, or cash flow weakens.'
          }
        ]
      },
      phaseTwo: {
        thesisRisk: {
          lead: 'The main risk is whether AbbVie Inc. can keep biopharma / immunology / neuroscience / aesthetics evidence strong while the key risk factors stay contained.',
          riskMap: [
            {
              label: 'Demand / growth',
              severity: 'High',
              watch: 'Biopharma / Immunology / Neuroscience / Aesthetics demand can slow.'
            },
            {
              label: 'Margin / economics',
              severity: 'High',
              watch: 'Margin can compress.'
            },
            {
              label: 'Execution',
              severity: 'Medium',
              watch: 'Execution can disappoint.'
            },
            {
              label: 'Cash flow / risk',
              severity: 'Medium',
              watch: 'Cash flow can weaken.'
            }
          ],
          evidenceNeeded: [
            'revenue growth',
            'pipeline or product adoption',
            'regulatory progress',
            'margin',
            'cash flow',
            'safety or reimbursement evidence'
          ]
        }
      }
    }
  },
  PFE: {
    ticker: 'PFE',
    companyName: 'Pfizer Inc.',
    exchange: 'NYSE',
    logoUrl: buildStockLogoUrl('PFE'),
    overview: 'Pfizer Inc. operates in Pharmaceuticals / Vaccines / Oncology.',
    category: 'Pharmaceuticals / Vaccines / Oncology',
    analysisDate: '2026-06-11',
    latestFiscalPeriod: 'Q1 2026 ended 2026-03-29',
    dossierVerdict: {
      sourceType: 'curated',
      asOf: '2026-06-11',
      researchState: 'healthcare_evidence_watch',
      businessQuality: 'high',
      valuationState: 'not_verified',
      marketEvidence: 'not_verified',
      finalRead: 'Pharmaceuticals / Vaccines / Oncology where the thesis depends on Pharmaceuticals / Vaccines / Oncology execution, customer demand, margin, and cash flow.',
      keySupport: [
        'SEC source pack identifies Pfizer Inc. as Pharmaceuticals / Vaccines / Oncology.',
        'Latest primary-source filing reviewed: SEC latest periodic filing.'
      ],
      keyRisk: [
        'Pharmaceuticals / Vaccines / Oncology demand can slow.',
        'Margins can compress if cost, competition, or execution pressure rises.',
        'The business thesis can weaken if cash flow evidence deteriorates.'
      ]
    },
    valueCore: {
      ticker: 'PFE',
      value_core_type: 'Pharmaceuticals / Vaccines / Oncology',
      company_stage_candidate: 'Pharmaceuticals / Vaccines / Oncology',
      primary_value_driver: 'Pharmaceuticals / Vaccines / Oncology execution, customer demand, margin, and cash flow',
      thesis_break_trigger: 'The thesis weakens if pharmaceuticals / vaccines / oncology demand slows, margins compress, execution disappoints, or cash flow weakens.',
      evidence_needed: [
        'revenue growth',
        'pipeline or product adoption',
        'regulatory progress',
        'margin',
        'cash flow',
        'safety or reimbursement evidence'
      ],
      evidence_quality: 'Partial',
      dossier_state: 'curated_profile_batch_5',
      frontend_label: 'Curated',
      coverage_status: 'Curated',
      needs_human_review: false,
      source: 'SEC 10-K / 10-Q'
    },
    visualPhaseOne: {
      faq: {
        overview: [
          {
            question: 'What does PFE do?',
            answer: 'Pfizer Inc. operates in Pharmaceuticals / Vaccines / Oncology.'
          }
        ],
        thesisRisk: [
          {
            question: 'What would break the PFE thesis?',
            answer: 'The thesis weakens if pharmaceuticals / vaccines / oncology demand slows, margins compress, execution disappoints, or cash flow weakens.'
          }
        ]
      },
      phaseTwo: {
        thesisRisk: {
          lead: 'The main risk is whether Pfizer Inc. can keep pharmaceuticals / vaccines / oncology evidence strong while the key risk factors stay contained.',
          riskMap: [
            {
              label: 'Demand / growth',
              severity: 'High',
              watch: 'Pharmaceuticals / Vaccines / Oncology demand can slow.'
            },
            {
              label: 'Margin / economics',
              severity: 'High',
              watch: 'Margin can compress.'
            },
            {
              label: 'Execution',
              severity: 'Medium',
              watch: 'Execution can disappoint.'
            },
            {
              label: 'Cash flow / risk',
              severity: 'Medium',
              watch: 'Cash flow can weaken.'
            }
          ],
          evidenceNeeded: [
            'revenue growth',
            'pipeline or product adoption',
            'regulatory progress',
            'margin',
            'cash flow',
            'safety or reimbursement evidence'
          ]
        }
      }
    }
  },
  AMGN: {
    ticker: 'AMGN',
    companyName: 'Amgen Inc.',
    exchange: 'NASDAQ',
    logoUrl: buildStockLogoUrl('AMGN'),
    overview: 'Amgen Inc. operates in Biotechnology / Therapeutics.',
    category: 'Biotechnology / Therapeutics',
    analysisDate: '2026-06-11',
    latestFiscalPeriod: 'Q1 2026 ended 2026-03-31',
    dossierVerdict: {
      sourceType: 'curated',
      asOf: '2026-06-11',
      researchState: 'healthcare_evidence_watch',
      businessQuality: 'medium',
      valuationState: 'not_verified',
      marketEvidence: 'not_verified',
      finalRead: 'Biotechnology / Therapeutics where the thesis depends on Biotechnology / Therapeutics execution, customer demand, margin, and cash flow.',
      keySupport: [
        'SEC source pack identifies Amgen Inc. as Biotechnology / Therapeutics.',
        'Latest primary-source filing reviewed: SEC latest periodic filing.'
      ],
      keyRisk: [
        'Biotechnology / Therapeutics demand can slow.',
        'Margins can compress if cost, competition, or execution pressure rises.',
        'The business thesis can weaken if cash flow evidence deteriorates.'
      ]
    },
    valueCore: {
      ticker: 'AMGN',
      value_core_type: 'Biotechnology / Therapeutics',
      company_stage_candidate: 'Biotechnology / Therapeutics',
      primary_value_driver: 'Biotechnology / Therapeutics execution, customer demand, margin, and cash flow',
      thesis_break_trigger: 'The thesis weakens if biotechnology / therapeutics demand slows, margins compress, execution disappoints, or cash flow weakens.',
      evidence_needed: [
        'revenue growth',
        'pipeline or product adoption',
        'regulatory progress',
        'margin',
        'cash flow',
        'safety or reimbursement evidence'
      ],
      evidence_quality: 'Partial',
      dossier_state: 'curated_profile_batch_5',
      frontend_label: 'Curated',
      coverage_status: 'Curated',
      needs_human_review: false,
      source: 'SEC 10-K / 10-Q'
    },
    visualPhaseOne: {
      faq: {
        overview: [
          {
            question: 'What does AMGN do?',
            answer: 'Amgen Inc. operates in Biotechnology / Therapeutics.'
          }
        ],
        thesisRisk: [
          {
            question: 'What would break the AMGN thesis?',
            answer: 'The thesis weakens if biotechnology / therapeutics demand slows, margins compress, execution disappoints, or cash flow weakens.'
          }
        ]
      },
      phaseTwo: {
        thesisRisk: {
          lead: 'The main risk is whether Amgen Inc. can keep biotechnology / therapeutics evidence strong while the key risk factors stay contained.',
          riskMap: [
            {
              label: 'Demand / growth',
              severity: 'High',
              watch: 'Biotechnology / Therapeutics demand can slow.'
            },
            {
              label: 'Margin / economics',
              severity: 'High',
              watch: 'Margin can compress.'
            },
            {
              label: 'Execution',
              severity: 'Medium',
              watch: 'Execution can disappoint.'
            },
            {
              label: 'Cash flow / risk',
              severity: 'Medium',
              watch: 'Cash flow can weaken.'
            }
          ],
          evidenceNeeded: [
            'revenue growth',
            'pipeline or product adoption',
            'regulatory progress',
            'margin',
            'cash flow',
            'safety or reimbursement evidence'
          ]
        }
      }
    }
  },
  MDT: {
    ticker: 'MDT',
    companyName: 'Medtronic plc',
    exchange: 'NYSE',
    logoUrl: buildStockLogoUrl('MDT'),
    overview: 'Medtronic plc operates in Medical Devices.',
    category: 'Medical Devices',
    analysisDate: '2026-06-11',
    latestFiscalPeriod: 'Q3 FY2026 ended 2026-01-23',
    dossierVerdict: {
      sourceType: 'curated',
      asOf: '2026-06-11',
      researchState: 'business_evidence_watch',
      businessQuality: 'high',
      valuationState: 'not_verified',
      marketEvidence: 'not_verified',
      finalRead: 'Medical Devices where the thesis depends on Medical Devices execution, customer demand, margin, and cash flow.',
      keySupport: [
        'SEC source pack identifies Medtronic plc as Medical Devices.',
        'Latest primary-source filing reviewed: SEC latest periodic filing.'
      ],
      keyRisk: [
        'Medical Devices demand can slow.',
        'Margins can compress if cost, competition, or execution pressure rises.',
        'The business thesis can weaken if cash flow evidence deteriorates.'
      ]
    },
    valueCore: {
      ticker: 'MDT',
      value_core_type: 'Medical Devices',
      company_stage_candidate: 'Medical Devices',
      primary_value_driver: 'Medical Devices execution, customer demand, margin, and cash flow',
      thesis_break_trigger: 'The thesis weakens if medical devices demand slows, margins compress, execution disappoints, or cash flow weakens.',
      evidence_needed: [
        'revenue growth',
        'pipeline or product adoption',
        'regulatory progress',
        'margin',
        'cash flow',
        'safety or reimbursement evidence'
      ],
      evidence_quality: 'Partial',
      dossier_state: 'curated_profile_batch_5',
      frontend_label: 'Curated',
      coverage_status: 'Curated',
      needs_human_review: false,
      source: 'SEC 10-K / 10-Q'
    },
    visualPhaseOne: {
      faq: {
        overview: [
          {
            question: 'What does MDT do?',
            answer: 'Medtronic plc operates in Medical Devices.'
          }
        ],
        thesisRisk: [
          {
            question: 'What would break the MDT thesis?',
            answer: 'The thesis weakens if medical devices demand slows, margins compress, execution disappoints, or cash flow weakens.'
          }
        ]
      },
      phaseTwo: {
        thesisRisk: {
          lead: 'The main risk is whether Medtronic plc can keep medical devices evidence strong while the key risk factors stay contained.',
          riskMap: [
            {
              label: 'Demand / growth',
              severity: 'High',
              watch: 'Medical Devices demand can slow.'
            },
            {
              label: 'Margin / economics',
              severity: 'High',
              watch: 'Margin can compress.'
            },
            {
              label: 'Execution',
              severity: 'Medium',
              watch: 'Execution can disappoint.'
            },
            {
              label: 'Cash flow / risk',
              severity: 'Medium',
              watch: 'Cash flow can weaken.'
            }
          ],
          evidenceNeeded: [
            'revenue growth',
            'pipeline or product adoption',
            'regulatory progress',
            'margin',
            'cash flow',
            'safety or reimbursement evidence'
          ]
        }
      }
    }
  },
  ISRG: {
    ticker: 'ISRG',
    companyName: 'Intuitive Surgical, Inc.',
    exchange: 'NASDAQ',
    logoUrl: buildStockLogoUrl('ISRG'),
    overview: 'Intuitive Surgical, Inc. operates in Robotic Surgery / MedTech.',
    category: 'Robotic Surgery / MedTech',
    analysisDate: '2026-06-11',
    latestFiscalPeriod: 'Q1 2026 ended 2026-03-31',
    dossierVerdict: {
      sourceType: 'curated',
      asOf: '2026-06-11',
      researchState: 'business_evidence_watch',
      businessQuality: 'high',
      valuationState: 'not_verified',
      marketEvidence: 'not_verified',
      finalRead: 'Robotic Surgery / MedTech where the thesis depends on Robotic Surgery / MedTech execution, customer demand, margin, and cash flow.',
      keySupport: [
        'SEC source pack identifies Intuitive Surgical, Inc. as Robotic Surgery / MedTech.',
        'Latest primary-source filing reviewed: SEC latest periodic filing.'
      ],
      keyRisk: [
        'Robotic Surgery / MedTech demand can slow.',
        'Margins can compress if cost, competition, or execution pressure rises.',
        'The business thesis can weaken if cash flow evidence deteriorates.'
      ]
    },
    valueCore: {
      ticker: 'ISRG',
      value_core_type: 'Robotic Surgery / MedTech',
      company_stage_candidate: 'Robotic Surgery / MedTech',
      primary_value_driver: 'Robotic Surgery / MedTech execution, customer demand, margin, and cash flow',
      thesis_break_trigger: 'The thesis weakens if robotic surgery / medtech demand slows, margins compress, execution disappoints, or cash flow weakens.',
      evidence_needed: [
        'revenue growth',
        'segment performance',
        'customer demand',
        'margin',
        'cash flow',
        'risk factor changes'
      ],
      evidence_quality: 'Partial',
      dossier_state: 'curated_profile_batch_5',
      frontend_label: 'Curated',
      coverage_status: 'Curated',
      needs_human_review: false,
      source: 'SEC 10-K / 10-Q'
    },
    visualPhaseOne: {
      faq: {
        overview: [
          {
            question: 'What does ISRG do?',
            answer: 'Intuitive Surgical, Inc. operates in Robotic Surgery / MedTech.'
          }
        ],
        thesisRisk: [
          {
            question: 'What would break the ISRG thesis?',
            answer: 'The thesis weakens if robotic surgery / medtech demand slows, margins compress, execution disappoints, or cash flow weakens.'
          }
        ]
      },
      phaseTwo: {
        thesisRisk: {
          lead: 'The main risk is whether Intuitive Surgical, Inc. can keep robotic surgery / medtech evidence strong while the key risk factors stay contained.',
          riskMap: [
            {
              label: 'Demand / growth',
              severity: 'High',
              watch: 'Robotic Surgery / MedTech demand can slow.'
            },
            {
              label: 'Margin / economics',
              severity: 'High',
              watch: 'Margin can compress.'
            },
            {
              label: 'Execution',
              severity: 'Medium',
              watch: 'Execution can disappoint.'
            },
            {
              label: 'Cash flow / risk',
              severity: 'Medium',
              watch: 'Cash flow can weaken.'
            }
          ],
          evidenceNeeded: [
            'revenue growth',
            'segment performance',
            'customer demand',
            'margin',
            'cash flow',
            'risk factor changes'
          ]
        }
      }
    }
  },
  DHR: {
    ticker: 'DHR',
    companyName: 'Danaher Corporation',
    exchange: 'NYSE',
    logoUrl: buildStockLogoUrl('DHR'),
    overview: 'Danaher Corporation operates in Life Sciences / Diagnostics / Bioprocessing.',
    category: 'Life Sciences / Diagnostics / Bioprocessing',
    analysisDate: '2026-06-11',
    latestFiscalPeriod: 'Q1 2026 ended 2026-03-27',
    dossierVerdict: {
      sourceType: 'curated',
      asOf: '2026-06-11',
      researchState: 'business_evidence_watch',
      businessQuality: 'high',
      valuationState: 'not_verified',
      marketEvidence: 'not_verified',
      finalRead: 'Life Sciences / Diagnostics / Bioprocessing where the thesis depends on Life Sciences / Diagnostics / Bioprocessing execution, customer demand, margin, and cash flow.',
      keySupport: [
        'SEC source pack identifies Danaher Corporation as Life Sciences / Diagnostics / Bioprocessing.',
        'Latest primary-source filing reviewed: SEC latest periodic filing.'
      ],
      keyRisk: [
        'Life Sciences / Diagnostics / Bioprocessing demand can slow.',
        'Margins can compress if cost, competition, or execution pressure rises.',
        'The business thesis can weaken if cash flow evidence deteriorates.'
      ]
    },
    valueCore: {
      ticker: 'DHR',
      value_core_type: 'Life Sciences / Diagnostics / Bioprocessing',
      company_stage_candidate: 'Life Sciences / Diagnostics / Bioprocessing',
      primary_value_driver: 'Life Sciences / Diagnostics / Bioprocessing execution, customer demand, margin, and cash flow',
      thesis_break_trigger: 'The thesis weakens if life sciences / diagnostics / bioprocessing demand slows, margins compress, execution disappoints, or cash flow weakens.',
      evidence_needed: [
        'revenue growth',
        'segment performance',
        'customer demand',
        'margin',
        'cash flow',
        'risk factor changes'
      ],
      evidence_quality: 'Partial',
      dossier_state: 'curated_profile_batch_5',
      frontend_label: 'Curated',
      coverage_status: 'Curated',
      needs_human_review: false,
      source: 'SEC 10-K / 10-Q'
    },
    visualPhaseOne: {
      faq: {
        overview: [
          {
            question: 'What does DHR do?',
            answer: 'Danaher Corporation operates in Life Sciences / Diagnostics / Bioprocessing.'
          }
        ],
        thesisRisk: [
          {
            question: 'What would break the DHR thesis?',
            answer: 'The thesis weakens if life sciences / diagnostics / bioprocessing demand slows, margins compress, execution disappoints, or cash flow weakens.'
          }
        ]
      },
      phaseTwo: {
        thesisRisk: {
          lead: 'The main risk is whether Danaher Corporation can keep life sciences / diagnostics / bioprocessing evidence strong while the key risk factors stay contained.',
          riskMap: [
            {
              label: 'Demand / growth',
              severity: 'High',
              watch: 'Life Sciences / Diagnostics / Bioprocessing demand can slow.'
            },
            {
              label: 'Margin / economics',
              severity: 'High',
              watch: 'Margin can compress.'
            },
            {
              label: 'Execution',
              severity: 'Medium',
              watch: 'Execution can disappoint.'
            },
            {
              label: 'Cash flow / risk',
              severity: 'Medium',
              watch: 'Cash flow can weaken.'
            }
          ],
          evidenceNeeded: [
            'revenue growth',
            'segment performance',
            'customer demand',
            'margin',
            'cash flow',
            'risk factor changes'
          ]
        }
      }
    }
  },
  BAC: {
    ticker: 'BAC',
    companyName: 'Bank of America Corporation',
    exchange: 'NYSE',
    logoUrl: buildStockLogoUrl('BAC'),
    overview: 'Bank of America Corporation operates in Diversified Bank / Consumer and Commercial Banking.',
    category: 'Diversified Bank / Consumer and Commercial Banking',
    analysisDate: '2026-06-11',
    latestFiscalPeriod: 'Q1 2026 ended 2026-03-31',
    dossierVerdict: {
      sourceType: 'curated',
      asOf: '2026-06-11',
      researchState: 'financial_cycle_watch',
      businessQuality: 'medium',
      valuationState: 'not_verified',
      marketEvidence: 'not_verified',
      finalRead: 'Diversified Bank / Consumer and Commercial Banking where the thesis depends on Diversified Bank / Consumer and Commercial Banking execution, customer demand, margin, and cash flow.',
      keySupport: [
        'SEC source pack identifies Bank of America Corporation as Diversified Bank / Consumer and Commercial Banking.',
        'Latest primary-source filing reviewed: SEC latest periodic filing.'
      ],
      keyRisk: [
        'Diversified Bank / Consumer and Commercial Banking demand can slow.',
        'Margins can compress if cost, competition, or execution pressure rises.',
        'The business thesis can weaken if cash flow evidence deteriorates.'
      ]
    },
    valueCore: {
      ticker: 'BAC',
      value_core_type: 'Diversified Bank / Consumer and Commercial Banking',
      company_stage_candidate: 'Diversified Bank / Consumer and Commercial Banking',
      primary_value_driver: 'Diversified Bank / Consumer and Commercial Banking execution, customer demand, margin, and cash flow',
      thesis_break_trigger: 'The thesis weakens if diversified bank / consumer and commercial banking demand slows, margins compress, execution disappoints, or cash flow weakens.',
      evidence_needed: [
        'revenue and net interest income',
        'credit quality',
        'fee income',
        'capital and liquidity',
        'operating leverage',
        'cash flow'
      ],
      evidence_quality: 'Partial',
      dossier_state: 'curated_profile_batch_6',
      frontend_label: 'Curated',
      coverage_status: 'Curated',
      needs_human_review: false,
      source: 'SEC 10-K / 10-Q'
    },
    visualPhaseOne: {
      faq: {
        overview: [
          {
            question: 'What does BAC do?',
            answer: 'Bank of America Corporation operates in Diversified Bank / Consumer and Commercial Banking.'
          }
        ],
        thesisRisk: [
          {
            question: 'What would break the BAC thesis?',
            answer: 'The thesis weakens if diversified bank / consumer and commercial banking demand slows, margins compress, execution disappoints, or cash flow weakens.'
          }
        ]
      },
      phaseTwo: {
        thesisRisk: {
          lead: 'The main risk is whether Bank of America Corporation can keep diversified bank / consumer and commercial banking evidence strong while the key risk factors stay contained.',
          riskMap: [
            {
              label: 'Demand / growth',
              severity: 'High',
              watch: 'Diversified Bank / Consumer and Commercial Banking demand can slow.'
            },
            {
              label: 'Margin / economics',
              severity: 'High',
              watch: 'Margin can compress.'
            },
            {
              label: 'Execution',
              severity: 'Medium',
              watch: 'Execution can disappoint.'
            },
            {
              label: 'Cash flow / risk',
              severity: 'Medium',
              watch: 'Cash flow can weaken.'
            }
          ],
          evidenceNeeded: [
            'revenue and net interest income',
            'credit quality',
            'fee income',
            'capital and liquidity',
            'operating leverage',
            'cash flow'
          ]
        }
      }
    }
  },
  GS: {
    ticker: 'GS',
    companyName: 'The Goldman Sachs Group, Inc.',
    exchange: 'NYSE',
    logoUrl: buildStockLogoUrl('GS'),
    overview: 'The Goldman Sachs Group, Inc. operates in Investment Banking / Global Markets / Asset Management.',
    category: 'Investment Banking / Global Markets / Asset Management',
    analysisDate: '2026-06-11',
    latestFiscalPeriod: 'Q1 2026 ended 2026-03-31',
    dossierVerdict: {
      sourceType: 'curated',
      asOf: '2026-06-11',
      researchState: 'financial_cycle_watch',
      businessQuality: 'medium',
      valuationState: 'not_verified',
      marketEvidence: 'not_verified',
      finalRead: 'Investment Banking / Global Markets / Asset Management where the thesis depends on Investment Banking / Global Markets / Asset Management execution, customer demand, margin, and cash flow.',
      keySupport: [
        'SEC source pack identifies The Goldman Sachs Group, Inc. as Investment Banking / Global Markets / Asset Management.',
        'Latest primary-source filing reviewed: SEC latest periodic filing.'
      ],
      keyRisk: [
        'Investment Banking / Global Markets / Asset Management demand can slow.',
        'Margins can compress if cost, competition, or execution pressure rises.',
        'The business thesis can weaken if cash flow evidence deteriorates.'
      ]
    },
    valueCore: {
      ticker: 'GS',
      value_core_type: 'Investment Banking / Global Markets / Asset Management',
      company_stage_candidate: 'Investment Banking / Global Markets / Asset Management',
      primary_value_driver: 'Investment Banking / Global Markets / Asset Management execution, customer demand, margin, and cash flow',
      thesis_break_trigger: 'The thesis weakens if investment banking / global markets / asset management demand slows, margins compress, execution disappoints, or cash flow weakens.',
      evidence_needed: [
        'revenue and net interest income',
        'credit quality',
        'fee income',
        'capital and liquidity',
        'operating leverage',
        'cash flow'
      ],
      evidence_quality: 'Partial',
      dossier_state: 'curated_profile_batch_6',
      frontend_label: 'Curated',
      coverage_status: 'Curated',
      needs_human_review: false,
      source: 'SEC 10-K / 10-Q'
    },
    visualPhaseOne: {
      faq: {
        overview: [
          {
            question: 'What does GS do?',
            answer: 'The Goldman Sachs Group, Inc. operates in Investment Banking / Global Markets / Asset Management.'
          }
        ],
        thesisRisk: [
          {
            question: 'What would break the GS thesis?',
            answer: 'The thesis weakens if investment banking / global markets / asset management demand slows, margins compress, execution disappoints, or cash flow weakens.'
          }
        ]
      },
      phaseTwo: {
        thesisRisk: {
          lead: 'The main risk is whether The Goldman Sachs Group, Inc. can keep investment banking / global markets / asset management evidence strong while the key risk factors stay contained.',
          riskMap: [
            {
              label: 'Demand / growth',
              severity: 'High',
              watch: 'Investment Banking / Global Markets / Asset Management demand can slow.'
            },
            {
              label: 'Margin / economics',
              severity: 'High',
              watch: 'Margin can compress.'
            },
            {
              label: 'Execution',
              severity: 'Medium',
              watch: 'Execution can disappoint.'
            },
            {
              label: 'Cash flow / risk',
              severity: 'Medium',
              watch: 'Cash flow can weaken.'
            }
          ],
          evidenceNeeded: [
            'revenue and net interest income',
            'credit quality',
            'fee income',
            'capital and liquidity',
            'operating leverage',
            'cash flow'
          ]
        }
      }
    }
  },
  MS: {
    ticker: 'MS',
    companyName: 'Morgan Stanley',
    exchange: 'NYSE',
    logoUrl: buildStockLogoUrl('MS'),
    overview: 'Morgan Stanley operates in Wealth Management / Investment Banking / Markets.',
    category: 'Wealth Management / Investment Banking / Markets',
    analysisDate: '2026-06-11',
    latestFiscalPeriod: 'Q1 2026 ended 2026-03-31',
    dossierVerdict: {
      sourceType: 'curated',
      asOf: '2026-06-11',
      researchState: 'financial_cycle_watch',
      businessQuality: 'medium',
      valuationState: 'not_verified',
      marketEvidence: 'not_verified',
      finalRead: 'Wealth Management / Investment Banking / Markets where the thesis depends on Wealth Management / Investment Banking / Markets execution, customer demand, margin, and cash flow.',
      keySupport: [
        'SEC source pack identifies Morgan Stanley as Wealth Management / Investment Banking / Markets.',
        'Latest primary-source filing reviewed: SEC latest periodic filing.'
      ],
      keyRisk: [
        'Wealth Management / Investment Banking / Markets demand can slow.',
        'Margins can compress if cost, competition, or execution pressure rises.',
        'The business thesis can weaken if cash flow evidence deteriorates.'
      ]
    },
    valueCore: {
      ticker: 'MS',
      value_core_type: 'Wealth Management / Investment Banking / Markets',
      company_stage_candidate: 'Wealth Management / Investment Banking / Markets',
      primary_value_driver: 'Wealth Management / Investment Banking / Markets execution, customer demand, margin, and cash flow',
      thesis_break_trigger: 'The thesis weakens if wealth management / investment banking / markets demand slows, margins compress, execution disappoints, or cash flow weakens.',
      evidence_needed: [
        'revenue and net interest income',
        'credit quality',
        'fee income',
        'capital and liquidity',
        'operating leverage',
        'cash flow'
      ],
      evidence_quality: 'Partial',
      dossier_state: 'curated_profile_batch_6',
      frontend_label: 'Curated',
      coverage_status: 'Curated',
      needs_human_review: false,
      source: 'SEC 10-K / 10-Q'
    },
    visualPhaseOne: {
      faq: {
        overview: [
          {
            question: 'What does MS do?',
            answer: 'Morgan Stanley operates in Wealth Management / Investment Banking / Markets.'
          }
        ],
        thesisRisk: [
          {
            question: 'What would break the MS thesis?',
            answer: 'The thesis weakens if wealth management / investment banking / markets demand slows, margins compress, execution disappoints, or cash flow weakens.'
          }
        ]
      },
      phaseTwo: {
        thesisRisk: {
          lead: 'The main risk is whether Morgan Stanley can keep wealth management / investment banking / markets evidence strong while the key risk factors stay contained.',
          riskMap: [
            {
              label: 'Demand / growth',
              severity: 'High',
              watch: 'Wealth Management / Investment Banking / Markets demand can slow.'
            },
            {
              label: 'Margin / economics',
              severity: 'High',
              watch: 'Margin can compress.'
            },
            {
              label: 'Execution',
              severity: 'Medium',
              watch: 'Execution can disappoint.'
            },
            {
              label: 'Cash flow / risk',
              severity: 'Medium',
              watch: 'Cash flow can weaken.'
            }
          ],
          evidenceNeeded: [
            'revenue and net interest income',
            'credit quality',
            'fee income',
            'capital and liquidity',
            'operating leverage',
            'cash flow'
          ]
        }
      }
    }
  },
  AXP: {
    ticker: 'AXP',
    companyName: 'American Express Company',
    exchange: 'NYSE',
    logoUrl: buildStockLogoUrl('AXP'),
    overview: 'American Express Company operates in Payments / Card Issuer / Closed-Loop Network.',
    category: 'Payments / Card Issuer / Closed-Loop Network',
    analysisDate: '2026-06-11',
    latestFiscalPeriod: 'Q1 2026 ended 2026-03-31',
    dossierVerdict: {
      sourceType: 'curated',
      asOf: '2026-06-11',
      researchState: 'business_evidence_watch',
      businessQuality: 'high',
      valuationState: 'not_verified',
      marketEvidence: 'not_verified',
      finalRead: 'Payments / Card Issuer / Closed-Loop Network where the thesis depends on Payments / Card Issuer / Closed-Loop Network execution, customer demand, margin, and cash flow.',
      keySupport: [
        'SEC source pack identifies American Express Company as Payments / Card Issuer / Closed-Loop Network.',
        'Latest primary-source filing reviewed: SEC latest periodic filing.'
      ],
      keyRisk: [
        'Payments / Card Issuer / Closed-Loop Network demand can slow.',
        'Margins can compress if cost, competition, or execution pressure rises.',
        'The business thesis can weaken if cash flow evidence deteriorates.'
      ]
    },
    valueCore: {
      ticker: 'AXP',
      value_core_type: 'Payments / Card Issuer / Closed-Loop Network',
      company_stage_candidate: 'Payments / Card Issuer / Closed-Loop Network',
      primary_value_driver: 'Payments / Card Issuer / Closed-Loop Network execution, customer demand, margin, and cash flow',
      thesis_break_trigger: 'The thesis weakens if payments / card issuer / closed-loop network demand slows, margins compress, execution disappoints, or cash flow weakens.',
      evidence_needed: [
        'revenue and net interest income',
        'credit quality',
        'fee income',
        'capital and liquidity',
        'operating leverage',
        'cash flow'
      ],
      evidence_quality: 'Partial',
      dossier_state: 'curated_profile_batch_6',
      frontend_label: 'Curated',
      coverage_status: 'Curated',
      needs_human_review: false,
      source: 'SEC 10-K / 10-Q'
    },
    visualPhaseOne: {
      faq: {
        overview: [
          {
            question: 'What does AXP do?',
            answer: 'American Express Company operates in Payments / Card Issuer / Closed-Loop Network.'
          }
        ],
        thesisRisk: [
          {
            question: 'What would break the AXP thesis?',
            answer: 'The thesis weakens if payments / card issuer / closed-loop network demand slows, margins compress, execution disappoints, or cash flow weakens.'
          }
        ]
      },
      phaseTwo: {
        thesisRisk: {
          lead: 'The main risk is whether American Express Company can keep payments / card issuer / closed-loop network evidence strong while the key risk factors stay contained.',
          riskMap: [
            {
              label: 'Demand / growth',
              severity: 'High',
              watch: 'Payments / Card Issuer / Closed-Loop Network demand can slow.'
            },
            {
              label: 'Margin / economics',
              severity: 'High',
              watch: 'Margin can compress.'
            },
            {
              label: 'Execution',
              severity: 'Medium',
              watch: 'Execution can disappoint.'
            },
            {
              label: 'Cash flow / risk',
              severity: 'Medium',
              watch: 'Cash flow can weaken.'
            }
          ],
          evidenceNeeded: [
            'revenue and net interest income',
            'credit quality',
            'fee income',
            'capital and liquidity',
            'operating leverage',
            'cash flow'
          ]
        }
      }
    }
  },
  MA: {
    ticker: 'MA',
    companyName: 'Mastercard Incorporated',
    exchange: 'NYSE',
    logoUrl: buildStockLogoUrl('MA'),
    overview: 'Mastercard Incorporated operates in Global Payments Network.',
    category: 'Global Payments Network',
    analysisDate: '2026-06-11',
    latestFiscalPeriod: 'Q1 2026 ended 2026-03-31',
    dossierVerdict: {
      sourceType: 'curated',
      asOf: '2026-06-11',
      researchState: 'business_evidence_watch',
      businessQuality: 'high',
      valuationState: 'not_verified',
      marketEvidence: 'not_verified',
      finalRead: 'Global Payments Network where the thesis depends on Global Payments Network execution, customer demand, margin, and cash flow.',
      keySupport: [
        'SEC source pack identifies Mastercard Incorporated as Global Payments Network.',
        'Latest primary-source filing reviewed: SEC latest periodic filing.'
      ],
      keyRisk: [
        'Global Payments Network demand can slow.',
        'Margins can compress if cost, competition, or execution pressure rises.',
        'The business thesis can weaken if cash flow evidence deteriorates.'
      ]
    },
    valueCore: {
      ticker: 'MA',
      value_core_type: 'Global Payments Network',
      company_stage_candidate: 'Global Payments Network',
      primary_value_driver: 'Global Payments Network execution, customer demand, margin, and cash flow',
      thesis_break_trigger: 'The thesis weakens if global payments network demand slows, margins compress, execution disappoints, or cash flow weakens.',
      evidence_needed: [
        'revenue and net interest income',
        'credit quality',
        'fee income',
        'capital and liquidity',
        'operating leverage',
        'cash flow'
      ],
      evidence_quality: 'Partial',
      dossier_state: 'curated_profile_batch_6',
      frontend_label: 'Curated',
      coverage_status: 'Curated',
      needs_human_review: false,
      source: 'SEC 10-K / 10-Q'
    },
    visualPhaseOne: {
      faq: {
        overview: [
          {
            question: 'What does MA do?',
            answer: 'Mastercard Incorporated operates in Global Payments Network.'
          }
        ],
        thesisRisk: [
          {
            question: 'What would break the MA thesis?',
            answer: 'The thesis weakens if global payments network demand slows, margins compress, execution disappoints, or cash flow weakens.'
          }
        ]
      },
      phaseTwo: {
        thesisRisk: {
          lead: 'The main risk is whether Mastercard Incorporated can keep global payments network evidence strong while the key risk factors stay contained.',
          riskMap: [
            {
              label: 'Demand / growth',
              severity: 'High',
              watch: 'Global Payments Network demand can slow.'
            },
            {
              label: 'Margin / economics',
              severity: 'High',
              watch: 'Margin can compress.'
            },
            {
              label: 'Execution',
              severity: 'Medium',
              watch: 'Execution can disappoint.'
            },
            {
              label: 'Cash flow / risk',
              severity: 'Medium',
              watch: 'Cash flow can weaken.'
            }
          ],
          evidenceNeeded: [
            'revenue and net interest income',
            'credit quality',
            'fee income',
            'capital and liquidity',
            'operating leverage',
            'cash flow'
          ]
        }
      }
    }
  },
  CVX: {
    ticker: 'CVX',
    companyName: 'Chevron Corporation',
    exchange: 'NYSE',
    logoUrl: buildStockLogoUrl('CVX'),
    overview: 'Chevron Corporation operates in Integrated Energy.',
    category: 'Integrated Energy',
    analysisDate: '2026-06-11',
    latestFiscalPeriod: 'Q1 2026 ended 2026-03-31',
    dossierVerdict: {
      sourceType: 'curated',
      asOf: '2026-06-11',
      researchState: 'business_evidence_watch',
      businessQuality: 'high',
      valuationState: 'not_verified',
      marketEvidence: 'not_verified',
      finalRead: 'Integrated Energy where the thesis depends on Integrated Energy execution, customer demand, margin, and cash flow.',
      keySupport: [
        'SEC source pack identifies Chevron Corporation as Integrated Energy.',
        'Latest primary-source filing reviewed: SEC latest periodic filing.'
      ],
      keyRisk: [
        'Integrated Energy demand can slow.',
        'Margins can compress if cost, competition, or execution pressure rises.',
        'The business thesis can weaken if cash flow evidence deteriorates.'
      ]
    },
    valueCore: {
      ticker: 'CVX',
      value_core_type: 'Integrated Energy',
      company_stage_candidate: 'Integrated Energy',
      primary_value_driver: 'Integrated Energy execution, customer demand, margin, and cash flow',
      thesis_break_trigger: 'The thesis weakens if integrated energy demand slows, margins compress, execution disappoints, or cash flow weakens.',
      evidence_needed: [
        'revenue growth',
        'segment performance',
        'customer demand',
        'margin',
        'cash flow',
        'risk factor changes'
      ],
      evidence_quality: 'Partial',
      dossier_state: 'curated_profile_batch_6',
      frontend_label: 'Curated',
      coverage_status: 'Curated',
      needs_human_review: false,
      source: 'SEC 10-K / 10-Q'
    },
    visualPhaseOne: {
      faq: {
        overview: [
          {
            question: 'What does CVX do?',
            answer: 'Chevron Corporation operates in Integrated Energy.'
          }
        ],
        thesisRisk: [
          {
            question: 'What would break the CVX thesis?',
            answer: 'The thesis weakens if integrated energy demand slows, margins compress, execution disappoints, or cash flow weakens.'
          }
        ]
      },
      phaseTwo: {
        thesisRisk: {
          lead: 'The main risk is whether Chevron Corporation can keep integrated energy evidence strong while the key risk factors stay contained.',
          riskMap: [
            {
              label: 'Demand / growth',
              severity: 'High',
              watch: 'Integrated Energy demand can slow.'
            },
            {
              label: 'Margin / economics',
              severity: 'High',
              watch: 'Margin can compress.'
            },
            {
              label: 'Execution',
              severity: 'Medium',
              watch: 'Execution can disappoint.'
            },
            {
              label: 'Cash flow / risk',
              severity: 'Medium',
              watch: 'Cash flow can weaken.'
            }
          ],
          evidenceNeeded: [
            'revenue growth',
            'segment performance',
            'customer demand',
            'margin',
            'cash flow',
            'risk factor changes'
          ]
        }
      }
    }
  },
  COP: {
    ticker: 'COP',
    companyName: 'ConocoPhillips',
    exchange: 'NYSE',
    logoUrl: buildStockLogoUrl('COP'),
    overview: 'ConocoPhillips operates in Exploration and Production / Upstream Energy.',
    category: 'Exploration and Production / Upstream Energy',
    analysisDate: '2026-06-11',
    latestFiscalPeriod: 'Q1 2026 ended 2026-03-31',
    dossierVerdict: {
      sourceType: 'curated',
      asOf: '2026-06-11',
      researchState: 'business_evidence_watch',
      businessQuality: 'high',
      valuationState: 'not_verified',
      marketEvidence: 'not_verified',
      finalRead: 'Exploration and Production / Upstream Energy where the thesis depends on Exploration and Production / Upstream Energy execution, customer demand, margin, and cash flow.',
      keySupport: [
        'SEC source pack identifies ConocoPhillips as Exploration and Production / Upstream Energy.',
        'Latest primary-source filing reviewed: SEC latest periodic filing.'
      ],
      keyRisk: [
        'Exploration and Production / Upstream Energy demand can slow.',
        'Margins can compress if cost, competition, or execution pressure rises.',
        'The business thesis can weaken if cash flow evidence deteriorates.'
      ]
    },
    valueCore: {
      ticker: 'COP',
      value_core_type: 'Exploration and Production / Upstream Energy',
      company_stage_candidate: 'Exploration and Production / Upstream Energy',
      primary_value_driver: 'Exploration and Production / Upstream Energy execution, customer demand, margin, and cash flow',
      thesis_break_trigger: 'The thesis weakens if exploration and production / upstream energy demand slows, margins compress, execution disappoints, or cash flow weakens.',
      evidence_needed: [
        'revenue growth',
        'segment performance',
        'customer demand',
        'margin',
        'cash flow',
        'risk factor changes'
      ],
      evidence_quality: 'Partial',
      dossier_state: 'curated_profile_batch_6',
      frontend_label: 'Curated',
      coverage_status: 'Curated',
      needs_human_review: false,
      source: 'SEC 10-K / 10-Q'
    },
    visualPhaseOne: {
      faq: {
        overview: [
          {
            question: 'What does COP do?',
            answer: 'ConocoPhillips operates in Exploration and Production / Upstream Energy.'
          }
        ],
        thesisRisk: [
          {
            question: 'What would break the COP thesis?',
            answer: 'The thesis weakens if exploration and production / upstream energy demand slows, margins compress, execution disappoints, or cash flow weakens.'
          }
        ]
      },
      phaseTwo: {
        thesisRisk: {
          lead: 'The main risk is whether ConocoPhillips can keep exploration and production / upstream energy evidence strong while the key risk factors stay contained.',
          riskMap: [
            {
              label: 'Demand / growth',
              severity: 'High',
              watch: 'Exploration and Production / Upstream Energy demand can slow.'
            },
            {
              label: 'Margin / economics',
              severity: 'High',
              watch: 'Margin can compress.'
            },
            {
              label: 'Execution',
              severity: 'Medium',
              watch: 'Execution can disappoint.'
            },
            {
              label: 'Cash flow / risk',
              severity: 'Medium',
              watch: 'Cash flow can weaken.'
            }
          ],
          evidenceNeeded: [
            'revenue growth',
            'segment performance',
            'customer demand',
            'margin',
            'cash flow',
            'risk factor changes'
          ]
        }
      }
    }
  },
  CAT: {
    ticker: 'CAT',
    companyName: 'Caterpillar Inc.',
    exchange: 'NYSE',
    logoUrl: buildStockLogoUrl('CAT'),
    overview: 'Caterpillar Inc. operates in Construction / Mining / Energy Equipment.',
    category: 'Construction / Mining / Energy Equipment',
    analysisDate: '2026-06-11',
    latestFiscalPeriod: 'Q1 2026 ended 2026-03-31',
    dossierVerdict: {
      sourceType: 'curated',
      asOf: '2026-06-11',
      researchState: 'business_evidence_watch',
      businessQuality: 'high',
      valuationState: 'not_verified',
      marketEvidence: 'not_verified',
      finalRead: 'Construction / Mining / Energy Equipment where the thesis depends on Construction / Mining / Energy Equipment execution, customer demand, margin, and cash flow.',
      keySupport: [
        'SEC source pack identifies Caterpillar Inc. as Construction / Mining / Energy Equipment.',
        'Latest primary-source filing reviewed: SEC latest periodic filing.'
      ],
      keyRisk: [
        'Construction / Mining / Energy Equipment demand can slow.',
        'Margins can compress if cost, competition, or execution pressure rises.',
        'The business thesis can weaken if cash flow evidence deteriorates.'
      ]
    },
    valueCore: {
      ticker: 'CAT',
      value_core_type: 'Construction / Mining / Energy Equipment',
      company_stage_candidate: 'Construction / Mining / Energy Equipment',
      primary_value_driver: 'Construction / Mining / Energy Equipment execution, customer demand, margin, and cash flow',
      thesis_break_trigger: 'The thesis weakens if construction / mining / energy equipment demand slows, margins compress, execution disappoints, or cash flow weakens.',
      evidence_needed: [
        'revenue growth',
        'segment performance',
        'customer demand',
        'margin',
        'cash flow',
        'risk factor changes'
      ],
      evidence_quality: 'Partial',
      dossier_state: 'curated_profile_batch_6',
      frontend_label: 'Curated',
      coverage_status: 'Curated',
      needs_human_review: false,
      source: 'SEC 10-K / 10-Q'
    },
    visualPhaseOne: {
      faq: {
        overview: [
          {
            question: 'What does CAT do?',
            answer: 'Caterpillar Inc. operates in Construction / Mining / Energy Equipment.'
          }
        ],
        thesisRisk: [
          {
            question: 'What would break the CAT thesis?',
            answer: 'The thesis weakens if construction / mining / energy equipment demand slows, margins compress, execution disappoints, or cash flow weakens.'
          }
        ]
      },
      phaseTwo: {
        thesisRisk: {
          lead: 'The main risk is whether Caterpillar Inc. can keep construction / mining / energy equipment evidence strong while the key risk factors stay contained.',
          riskMap: [
            {
              label: 'Demand / growth',
              severity: 'High',
              watch: 'Construction / Mining / Energy Equipment demand can slow.'
            },
            {
              label: 'Margin / economics',
              severity: 'High',
              watch: 'Margin can compress.'
            },
            {
              label: 'Execution',
              severity: 'Medium',
              watch: 'Execution can disappoint.'
            },
            {
              label: 'Cash flow / risk',
              severity: 'Medium',
              watch: 'Cash flow can weaken.'
            }
          ],
          evidenceNeeded: [
            'revenue growth',
            'segment performance',
            'customer demand',
            'margin',
            'cash flow',
            'risk factor changes'
          ]
        }
      }
    }
  },
  DE: {
    ticker: 'DE',
    companyName: 'Deere & Company',
    exchange: 'NYSE',
    logoUrl: buildStockLogoUrl('DE'),
    overview: 'Deere & Company operates in Agriculture / Construction Equipment.',
    category: 'Agriculture / Construction Equipment',
    analysisDate: '2026-06-11',
    latestFiscalPeriod: 'Q2 FY2026 ended 2026-05-03',
    dossierVerdict: {
      sourceType: 'curated',
      asOf: '2026-06-11',
      researchState: 'business_evidence_watch',
      businessQuality: 'high',
      valuationState: 'not_verified',
      marketEvidence: 'not_verified',
      finalRead: 'Agriculture / Construction Equipment where the thesis depends on Agriculture / Construction Equipment execution, customer demand, margin, and cash flow.',
      keySupport: [
        'SEC source pack identifies Deere & Company as Agriculture / Construction Equipment.',
        'Latest primary-source filing reviewed: SEC latest periodic filing.'
      ],
      keyRisk: [
        'Agriculture / Construction Equipment demand can slow.',
        'Margins can compress if cost, competition, or execution pressure rises.',
        'The business thesis can weaken if cash flow evidence deteriorates.'
      ]
    },
    valueCore: {
      ticker: 'DE',
      value_core_type: 'Agriculture / Construction Equipment',
      company_stage_candidate: 'Agriculture / Construction Equipment',
      primary_value_driver: 'Agriculture / Construction Equipment execution, customer demand, margin, and cash flow',
      thesis_break_trigger: 'The thesis weakens if agriculture / construction equipment demand slows, margins compress, execution disappoints, or cash flow weakens.',
      evidence_needed: [
        'revenue growth',
        'segment performance',
        'customer demand',
        'margin',
        'cash flow',
        'risk factor changes'
      ],
      evidence_quality: 'Partial',
      dossier_state: 'curated_profile_batch_6',
      frontend_label: 'Curated',
      coverage_status: 'Curated',
      needs_human_review: false,
      source: 'SEC 10-K / 10-Q'
    },
    visualPhaseOne: {
      faq: {
        overview: [
          {
            question: 'What does DE do?',
            answer: 'Deere & Company operates in Agriculture / Construction Equipment.'
          }
        ],
        thesisRisk: [
          {
            question: 'What would break the DE thesis?',
            answer: 'The thesis weakens if agriculture / construction equipment demand slows, margins compress, execution disappoints, or cash flow weakens.'
          }
        ]
      },
      phaseTwo: {
        thesisRisk: {
          lead: 'The main risk is whether Deere & Company can keep agriculture / construction equipment evidence strong while the key risk factors stay contained.',
          riskMap: [
            {
              label: 'Demand / growth',
              severity: 'High',
              watch: 'Agriculture / Construction Equipment demand can slow.'
            },
            {
              label: 'Margin / economics',
              severity: 'High',
              watch: 'Margin can compress.'
            },
            {
              label: 'Execution',
              severity: 'Medium',
              watch: 'Execution can disappoint.'
            },
            {
              label: 'Cash flow / risk',
              severity: 'Medium',
              watch: 'Cash flow can weaken.'
            }
          ],
          evidenceNeeded: [
            'revenue growth',
            'segment performance',
            'customer demand',
            'margin',
            'cash flow',
            'risk factor changes'
          ]
        }
      }
    }
  },
  UNP: {
    ticker: 'UNP',
    companyName: 'Union Pacific Corporation',
    exchange: 'NYSE',
    logoUrl: buildStockLogoUrl('UNP'),
    overview: 'Union Pacific Corporation operates in Railroad / Freight Transportation.',
    category: 'Railroad / Freight Transportation',
    analysisDate: '2026-06-11',
    latestFiscalPeriod: 'Q1 2026 ended 2026-03-31',
    dossierVerdict: {
      sourceType: 'curated',
      asOf: '2026-06-11',
      researchState: 'business_evidence_watch',
      businessQuality: 'high',
      valuationState: 'not_verified',
      marketEvidence: 'not_verified',
      finalRead: 'Railroad / Freight Transportation where the thesis depends on Railroad / Freight Transportation execution, customer demand, margin, and cash flow.',
      keySupport: [
        'SEC source pack identifies Union Pacific Corporation as Railroad / Freight Transportation.',
        'Latest primary-source filing reviewed: SEC latest periodic filing.'
      ],
      keyRisk: [
        'Railroad / Freight Transportation demand can slow.',
        'Margins can compress if cost, competition, or execution pressure rises.',
        'The business thesis can weaken if cash flow evidence deteriorates.'
      ]
    },
    valueCore: {
      ticker: 'UNP',
      value_core_type: 'Railroad / Freight Transportation',
      company_stage_candidate: 'Railroad / Freight Transportation',
      primary_value_driver: 'Railroad / Freight Transportation execution, customer demand, margin, and cash flow',
      thesis_break_trigger: 'The thesis weakens if railroad / freight transportation demand slows, margins compress, execution disappoints, or cash flow weakens.',
      evidence_needed: [
        'revenue growth',
        'customer demand',
        'gross margin',
        'inventory and backlog',
        'capex or R&D execution',
        'free cash flow'
      ],
      evidence_quality: 'Partial',
      dossier_state: 'curated_profile_batch_6',
      frontend_label: 'Curated',
      coverage_status: 'Curated',
      needs_human_review: false,
      source: 'SEC 10-K / 10-Q'
    },
    visualPhaseOne: {
      faq: {
        overview: [
          {
            question: 'What does UNP do?',
            answer: 'Union Pacific Corporation operates in Railroad / Freight Transportation.'
          }
        ],
        thesisRisk: [
          {
            question: 'What would break the UNP thesis?',
            answer: 'The thesis weakens if railroad / freight transportation demand slows, margins compress, execution disappoints, or cash flow weakens.'
          }
        ]
      },
      phaseTwo: {
        thesisRisk: {
          lead: 'The main risk is whether Union Pacific Corporation can keep railroad / freight transportation evidence strong while the key risk factors stay contained.',
          riskMap: [
            {
              label: 'Demand / growth',
              severity: 'High',
              watch: 'Railroad / Freight Transportation demand can slow.'
            },
            {
              label: 'Margin / economics',
              severity: 'High',
              watch: 'Margin can compress.'
            },
            {
              label: 'Execution',
              severity: 'Medium',
              watch: 'Execution can disappoint.'
            },
            {
              label: 'Cash flow / risk',
              severity: 'Medium',
              watch: 'Cash flow can weaken.'
            }
          ],
          evidenceNeeded: [
            'revenue growth',
            'customer demand',
            'gross margin',
            'inventory and backlog',
            'capex or R&D execution',
            'free cash flow'
          ]
        }
      }
    }
  },
  NFLX: {
    ticker: 'NFLX',
    companyName: 'Netflix, Inc.',
    exchange: 'NASDAQ',
    logoUrl: buildStockLogoUrl('NFLX'),
    overview: 'Netflix, Inc. operates in Streaming Entertainment / Advertising.',
    category: 'Streaming Entertainment / Advertising',
    analysisDate: '2026-06-11',
    latestFiscalPeriod: 'Q1 2026 ended 2026-03-31',
    dossierVerdict: {
      sourceType: 'curated',
      asOf: '2026-06-11',
      researchState: 'business_evidence_watch',
      businessQuality: 'high',
      valuationState: 'not_verified',
      marketEvidence: 'not_verified',
      finalRead: 'Streaming Entertainment / Advertising where the thesis depends on Streaming Entertainment / Advertising execution, customer demand, margin, and cash flow.',
      keySupport: [
        'SEC source pack identifies Netflix, Inc. as Streaming Entertainment / Advertising.',
        'Latest primary-source filing reviewed: SEC latest periodic filing.'
      ],
      keyRisk: [
        'Streaming Entertainment / Advertising demand can slow.',
        'Margins can compress if cost, competition, or execution pressure rises.',
        'The business thesis can weaken if cash flow evidence deteriorates.'
      ]
    },
    valueCore: {
      ticker: 'NFLX',
      value_core_type: 'Streaming Entertainment / Advertising',
      company_stage_candidate: 'Streaming Entertainment / Advertising',
      primary_value_driver: 'Streaming Entertainment / Advertising execution, customer demand, margin, and cash flow',
      thesis_break_trigger: 'The thesis weakens if streaming entertainment / advertising demand slows, margins compress, execution disappoints, or cash flow weakens.',
      evidence_needed: [
        'revenue growth',
        'customer demand',
        'gross margin',
        'inventory and backlog',
        'capex or R&D execution',
        'free cash flow'
      ],
      evidence_quality: 'Partial',
      dossier_state: 'curated_profile_batch_7',
      frontend_label: 'Curated',
      coverage_status: 'Curated',
      needs_human_review: false,
      source: 'SEC 10-K / 10-Q'
    },
    visualPhaseOne: {
      faq: {
        overview: [
          {
            question: 'What does NFLX do?',
            answer: 'Netflix, Inc. operates in Streaming Entertainment / Advertising.'
          }
        ],
        thesisRisk: [
          {
            question: 'What would break the NFLX thesis?',
            answer: 'The thesis weakens if streaming entertainment / advertising demand slows, margins compress, execution disappoints, or cash flow weakens.'
          }
        ]
      },
      phaseTwo: {
        thesisRisk: {
          lead: 'The main risk is whether Netflix, Inc. can keep streaming entertainment / advertising evidence strong while the key risk factors stay contained.',
          riskMap: [
            {
              label: 'Demand / growth',
              severity: 'High',
              watch: 'Streaming Entertainment / Advertising demand can slow.'
            },
            {
              label: 'Margin / economics',
              severity: 'High',
              watch: 'Margin can compress.'
            },
            {
              label: 'Execution',
              severity: 'Medium',
              watch: 'Execution can disappoint.'
            },
            {
              label: 'Cash flow / risk',
              severity: 'Medium',
              watch: 'Cash flow can weaken.'
            }
          ],
          evidenceNeeded: [
            'revenue growth',
            'customer demand',
            'gross margin',
            'inventory and backlog',
            'capex or R&D execution',
            'free cash flow'
          ]
        }
      }
    }
  },
  DIS: {
    ticker: 'DIS',
    companyName: 'The Walt Disney Company',
    exchange: 'NYSE',
    logoUrl: buildStockLogoUrl('DIS'),
    overview: 'The Walt Disney Company operates in Media / Parks / Streaming Entertainment.',
    category: 'Media / Parks / Streaming Entertainment',
    analysisDate: '2026-06-11',
    latestFiscalPeriod: 'Q2 FY2026 ended 2026-03-28',
    dossierVerdict: {
      sourceType: 'curated',
      asOf: '2026-06-11',
      researchState: 'business_evidence_watch',
      businessQuality: 'high',
      valuationState: 'not_verified',
      marketEvidence: 'not_verified',
      finalRead: 'Media / Parks / Streaming Entertainment where the thesis depends on Media / Parks / Streaming Entertainment execution, customer demand, margin, and cash flow.',
      keySupport: [
        'SEC source pack identifies The Walt Disney Company as Media / Parks / Streaming Entertainment.',
        'Latest primary-source filing reviewed: SEC latest periodic filing.'
      ],
      keyRisk: [
        'Media / Parks / Streaming Entertainment demand can slow.',
        'Margins can compress if cost, competition, or execution pressure rises.',
        'The business thesis can weaken if cash flow evidence deteriorates.'
      ]
    },
    valueCore: {
      ticker: 'DIS',
      value_core_type: 'Media / Parks / Streaming Entertainment',
      company_stage_candidate: 'Media / Parks / Streaming Entertainment',
      primary_value_driver: 'Media / Parks / Streaming Entertainment execution, customer demand, margin, and cash flow',
      thesis_break_trigger: 'The thesis weakens if media / parks / streaming entertainment demand slows, margins compress, execution disappoints, or cash flow weakens.',
      evidence_needed: [
        'revenue growth',
        'customer demand',
        'gross margin',
        'inventory and backlog',
        'capex or R&D execution',
        'free cash flow'
      ],
      evidence_quality: 'Partial',
      dossier_state: 'curated_profile_batch_7',
      frontend_label: 'Curated',
      coverage_status: 'Curated',
      needs_human_review: false,
      source: 'SEC 10-K / 10-Q'
    },
    visualPhaseOne: {
      faq: {
        overview: [
          {
            question: 'What does DIS do?',
            answer: 'The Walt Disney Company operates in Media / Parks / Streaming Entertainment.'
          }
        ],
        thesisRisk: [
          {
            question: 'What would break the DIS thesis?',
            answer: 'The thesis weakens if media / parks / streaming entertainment demand slows, margins compress, execution disappoints, or cash flow weakens.'
          }
        ]
      },
      phaseTwo: {
        thesisRisk: {
          lead: 'The main risk is whether The Walt Disney Company can keep media / parks / streaming entertainment evidence strong while the key risk factors stay contained.',
          riskMap: [
            {
              label: 'Demand / growth',
              severity: 'High',
              watch: 'Media / Parks / Streaming Entertainment demand can slow.'
            },
            {
              label: 'Margin / economics',
              severity: 'High',
              watch: 'Margin can compress.'
            },
            {
              label: 'Execution',
              severity: 'Medium',
              watch: 'Execution can disappoint.'
            },
            {
              label: 'Cash flow / risk',
              severity: 'Medium',
              watch: 'Cash flow can weaken.'
            }
          ],
          evidenceNeeded: [
            'revenue growth',
            'customer demand',
            'gross margin',
            'inventory and backlog',
            'capex or R&D execution',
            'free cash flow'
          ]
        }
      }
    }
  },
  BKNG: {
    ticker: 'BKNG',
    companyName: 'Booking Holdings Inc.',
    exchange: 'NASDAQ',
    logoUrl: buildStockLogoUrl('BKNG'),
    overview: 'Booking Holdings Inc. operates in Online Travel / Marketplace.',
    category: 'Online Travel / Marketplace',
    analysisDate: '2026-06-11',
    latestFiscalPeriod: 'Q1 2026 ended 2026-03-31',
    dossierVerdict: {
      sourceType: 'curated',
      asOf: '2026-06-11',
      researchState: 'business_evidence_watch',
      businessQuality: 'high',
      valuationState: 'not_verified',
      marketEvidence: 'not_verified',
      finalRead: 'Online Travel / Marketplace where the thesis depends on Online Travel / Marketplace execution, customer demand, margin, and cash flow.',
      keySupport: [
        'SEC source pack identifies Booking Holdings Inc. as Online Travel / Marketplace.',
        'Latest primary-source filing reviewed: SEC latest periodic filing.'
      ],
      keyRisk: [
        'Online Travel / Marketplace demand can slow.',
        'Margins can compress if cost, competition, or execution pressure rises.',
        'The business thesis can weaken if cash flow evidence deteriorates.'
      ]
    },
    valueCore: {
      ticker: 'BKNG',
      value_core_type: 'Online Travel / Marketplace',
      company_stage_candidate: 'Online Travel / Marketplace',
      primary_value_driver: 'Online Travel / Marketplace execution, customer demand, margin, and cash flow',
      thesis_break_trigger: 'The thesis weakens if online travel / marketplace demand slows, margins compress, execution disappoints, or cash flow weakens.',
      evidence_needed: [
        'revenue growth',
        'traffic or volume',
        'pricing and demand',
        'margin',
        'customer retention',
        'free cash flow'
      ],
      evidence_quality: 'Partial',
      dossier_state: 'curated_profile_batch_7',
      frontend_label: 'Curated',
      coverage_status: 'Curated',
      needs_human_review: false,
      source: 'SEC 10-K / 10-Q'
    },
    visualPhaseOne: {
      faq: {
        overview: [
          {
            question: 'What does BKNG do?',
            answer: 'Booking Holdings Inc. operates in Online Travel / Marketplace.'
          }
        ],
        thesisRisk: [
          {
            question: 'What would break the BKNG thesis?',
            answer: 'The thesis weakens if online travel / marketplace demand slows, margins compress, execution disappoints, or cash flow weakens.'
          }
        ]
      },
      phaseTwo: {
        thesisRisk: {
          lead: 'The main risk is whether Booking Holdings Inc. can keep online travel / marketplace evidence strong while the key risk factors stay contained.',
          riskMap: [
            {
              label: 'Demand / growth',
              severity: 'High',
              watch: 'Online Travel / Marketplace demand can slow.'
            },
            {
              label: 'Margin / economics',
              severity: 'High',
              watch: 'Margin can compress.'
            },
            {
              label: 'Execution',
              severity: 'Medium',
              watch: 'Execution can disappoint.'
            },
            {
              label: 'Cash flow / risk',
              severity: 'Medium',
              watch: 'Cash flow can weaken.'
            }
          ],
          evidenceNeeded: [
            'revenue growth',
            'traffic or volume',
            'pricing and demand',
            'margin',
            'customer retention',
            'free cash flow'
          ]
        }
      }
    }
  },
  UBER: {
    ticker: 'UBER',
    companyName: 'Uber Technologies, Inc.',
    exchange: 'NYSE',
    logoUrl: buildStockLogoUrl('UBER'),
    overview: 'Uber Technologies, Inc. operates in Mobility / Delivery / Logistics Platform.',
    category: 'Mobility / Delivery / Logistics Platform',
    analysisDate: '2026-06-11',
    latestFiscalPeriod: 'Q1 2026 ended 2026-03-31',
    dossierVerdict: {
      sourceType: 'curated',
      asOf: '2026-06-11',
      researchState: 'business_evidence_watch',
      businessQuality: 'medium',
      valuationState: 'not_verified',
      marketEvidence: 'not_verified',
      finalRead: 'Mobility / Delivery / Logistics Platform where the thesis depends on Mobility / Delivery / Logistics Platform execution, customer demand, margin, and cash flow.',
      keySupport: [
        'SEC source pack identifies Uber Technologies, Inc. as Mobility / Delivery / Logistics Platform.',
        'Latest primary-source filing reviewed: SEC latest periodic filing.'
      ],
      keyRisk: [
        'Mobility / Delivery / Logistics Platform demand can slow.',
        'Margins can compress if cost, competition, or execution pressure rises.',
        'The business thesis can weaken if cash flow evidence deteriorates.'
      ]
    },
    valueCore: {
      ticker: 'UBER',
      value_core_type: 'Mobility / Delivery / Logistics Platform',
      company_stage_candidate: 'Mobility / Delivery / Logistics Platform',
      primary_value_driver: 'Mobility / Delivery / Logistics Platform execution, customer demand, margin, and cash flow',
      thesis_break_trigger: 'The thesis weakens if mobility / delivery / logistics platform demand slows, margins compress, execution disappoints, or cash flow weakens.',
      evidence_needed: [
        'revenue growth',
        'segment performance',
        'customer demand',
        'margin',
        'cash flow',
        'risk factor changes'
      ],
      evidence_quality: 'Partial',
      dossier_state: 'curated_profile_batch_7',
      frontend_label: 'Curated',
      coverage_status: 'Curated',
      needs_human_review: false,
      source: 'SEC 10-K / 10-Q'
    },
    visualPhaseOne: {
      faq: {
        overview: [
          {
            question: 'What does UBER do?',
            answer: 'Uber Technologies, Inc. operates in Mobility / Delivery / Logistics Platform.'
          }
        ],
        thesisRisk: [
          {
            question: 'What would break the UBER thesis?',
            answer: 'The thesis weakens if mobility / delivery / logistics platform demand slows, margins compress, execution disappoints, or cash flow weakens.'
          }
        ]
      },
      phaseTwo: {
        thesisRisk: {
          lead: 'The main risk is whether Uber Technologies, Inc. can keep mobility / delivery / logistics platform evidence strong while the key risk factors stay contained.',
          riskMap: [
            {
              label: 'Demand / growth',
              severity: 'High',
              watch: 'Mobility / Delivery / Logistics Platform demand can slow.'
            },
            {
              label: 'Margin / economics',
              severity: 'High',
              watch: 'Margin can compress.'
            },
            {
              label: 'Execution',
              severity: 'Medium',
              watch: 'Execution can disappoint.'
            },
            {
              label: 'Cash flow / risk',
              severity: 'Medium',
              watch: 'Cash flow can weaken.'
            }
          ],
          evidenceNeeded: [
            'revenue growth',
            'segment performance',
            'customer demand',
            'margin',
            'cash flow',
            'risk factor changes'
          ]
        }
      }
    }
  },
  SHOP: {
    ticker: 'SHOP',
    companyName: 'Shopify Inc.',
    exchange: 'NYSE',
    logoUrl: buildStockLogoUrl('SHOP'),
    overview: 'Shopify Inc. operates in Commerce Infrastructure / Merchant Platform.',
    category: 'Commerce Infrastructure / Merchant Platform',
    analysisDate: '2026-06-11',
    latestFiscalPeriod: 'Q1 2026 ended 2026-03-31',
    dossierVerdict: {
      sourceType: 'curated',
      asOf: '2026-06-11',
      researchState: 'business_evidence_watch',
      businessQuality: 'high',
      valuationState: 'not_verified',
      marketEvidence: 'not_verified',
      finalRead: 'Commerce Infrastructure / Merchant Platform where the thesis depends on Commerce Infrastructure / Merchant Platform execution, customer demand, margin, and cash flow.',
      keySupport: [
        'SEC source pack identifies Shopify Inc. as Commerce Infrastructure / Merchant Platform.',
        'Latest primary-source filing reviewed: SEC latest periodic filing.'
      ],
      keyRisk: [
        'Commerce Infrastructure / Merchant Platform demand can slow.',
        'Margins can compress if cost, competition, or execution pressure rises.',
        'The business thesis can weaken if cash flow evidence deteriorates.'
      ]
    },
    valueCore: {
      ticker: 'SHOP',
      value_core_type: 'Commerce Infrastructure / Merchant Platform',
      company_stage_candidate: 'Commerce Infrastructure / Merchant Platform',
      primary_value_driver: 'Commerce Infrastructure / Merchant Platform execution, customer demand, margin, and cash flow',
      thesis_break_trigger: 'The thesis weakens if commerce infrastructure / merchant platform demand slows, margins compress, execution disappoints, or cash flow weakens.',
      evidence_needed: [
        'revenue growth',
        'segment performance',
        'customer demand',
        'margin',
        'cash flow',
        'risk factor changes'
      ],
      evidence_quality: 'Partial',
      dossier_state: 'curated_profile_batch_7',
      frontend_label: 'Curated',
      coverage_status: 'Curated',
      needs_human_review: false,
      source: 'SEC 10-K / 10-Q'
    },
    visualPhaseOne: {
      faq: {
        overview: [
          {
            question: 'What does SHOP do?',
            answer: 'Shopify Inc. operates in Commerce Infrastructure / Merchant Platform.'
          }
        ],
        thesisRisk: [
          {
            question: 'What would break the SHOP thesis?',
            answer: 'The thesis weakens if commerce infrastructure / merchant platform demand slows, margins compress, execution disappoints, or cash flow weakens.'
          }
        ]
      },
      phaseTwo: {
        thesisRisk: {
          lead: 'The main risk is whether Shopify Inc. can keep commerce infrastructure / merchant platform evidence strong while the key risk factors stay contained.',
          riskMap: [
            {
              label: 'Demand / growth',
              severity: 'High',
              watch: 'Commerce Infrastructure / Merchant Platform demand can slow.'
            },
            {
              label: 'Margin / economics',
              severity: 'High',
              watch: 'Margin can compress.'
            },
            {
              label: 'Execution',
              severity: 'Medium',
              watch: 'Execution can disappoint.'
            },
            {
              label: 'Cash flow / risk',
              severity: 'Medium',
              watch: 'Cash flow can weaken.'
            }
          ],
          evidenceNeeded: [
            'revenue growth',
            'segment performance',
            'customer demand',
            'margin',
            'cash flow',
            'risk factor changes'
          ]
        }
      }
    }
  },
  COIN: {
    ticker: 'COIN',
    companyName: 'Coinbase Global, Inc.',
    exchange: 'NASDAQ',
    logoUrl: buildStockLogoUrl('COIN'),
    overview: 'Coinbase Global, Inc. operates in Crypto Exchange / Digital Asset Infrastructure.',
    category: 'Crypto Exchange / Digital Asset Infrastructure',
    analysisDate: '2026-06-11',
    latestFiscalPeriod: 'Q1 2026 ended 2026-03-31',
    dossierVerdict: {
      sourceType: 'curated',
      asOf: '2026-06-11',
      researchState: 'business_evidence_watch',
      businessQuality: 'medium',
      valuationState: 'not_verified',
      marketEvidence: 'not_verified',
      finalRead: 'Crypto Exchange / Digital Asset Infrastructure where the thesis depends on Crypto Exchange / Digital Asset Infrastructure execution, customer demand, margin, and cash flow.',
      keySupport: [
        'SEC source pack identifies Coinbase Global, Inc. as Crypto Exchange / Digital Asset Infrastructure.',
        'Latest primary-source filing reviewed: SEC latest periodic filing.'
      ],
      keyRisk: [
        'Crypto Exchange / Digital Asset Infrastructure demand can slow.',
        'Margins can compress if cost, competition, or execution pressure rises.',
        'The business thesis can weaken if cash flow evidence deteriorates.'
      ]
    },
    valueCore: {
      ticker: 'COIN',
      value_core_type: 'Crypto Exchange / Digital Asset Infrastructure',
      company_stage_candidate: 'Crypto Exchange / Digital Asset Infrastructure',
      primary_value_driver: 'Crypto Exchange / Digital Asset Infrastructure execution, customer demand, margin, and cash flow',
      thesis_break_trigger: 'The thesis weakens if crypto exchange / digital asset infrastructure demand slows, margins compress, execution disappoints, or cash flow weakens.',
      evidence_needed: [
        'revenue growth',
        'segment performance',
        'customer demand',
        'margin',
        'cash flow',
        'risk factor changes'
      ],
      evidence_quality: 'Partial',
      dossier_state: 'curated_profile_batch_7',
      frontend_label: 'Curated',
      coverage_status: 'Curated',
      needs_human_review: false,
      source: 'SEC 10-K / 10-Q'
    },
    visualPhaseOne: {
      faq: {
        overview: [
          {
            question: 'What does COIN do?',
            answer: 'Coinbase Global, Inc. operates in Crypto Exchange / Digital Asset Infrastructure.'
          }
        ],
        thesisRisk: [
          {
            question: 'What would break the COIN thesis?',
            answer: 'The thesis weakens if crypto exchange / digital asset infrastructure demand slows, margins compress, execution disappoints, or cash flow weakens.'
          }
        ]
      },
      phaseTwo: {
        thesisRisk: {
          lead: 'The main risk is whether Coinbase Global, Inc. can keep crypto exchange / digital asset infrastructure evidence strong while the key risk factors stay contained.',
          riskMap: [
            {
              label: 'Demand / growth',
              severity: 'High',
              watch: 'Crypto Exchange / Digital Asset Infrastructure demand can slow.'
            },
            {
              label: 'Margin / economics',
              severity: 'High',
              watch: 'Margin can compress.'
            },
            {
              label: 'Execution',
              severity: 'Medium',
              watch: 'Execution can disappoint.'
            },
            {
              label: 'Cash flow / risk',
              severity: 'Medium',
              watch: 'Cash flow can weaken.'
            }
          ],
          evidenceNeeded: [
            'revenue growth',
            'segment performance',
            'customer demand',
            'margin',
            'cash flow',
            'risk factor changes'
          ]
        }
      }
    }
  },
  INTU: {
    ticker: 'INTU',
    companyName: 'Intuit Inc.',
    exchange: 'NASDAQ',
    logoUrl: buildStockLogoUrl('INTU'),
    overview: 'Intuit Inc. operates in Financial Software / Tax / SMB Platform.',
    category: 'Financial Software / Tax / SMB Platform',
    analysisDate: '2026-06-11',
    latestFiscalPeriod: 'Q3 FY2026 ended 2026-04-30',
    dossierVerdict: {
      sourceType: 'curated',
      asOf: '2026-06-11',
      researchState: 'financial_cycle_watch',
      businessQuality: 'high',
      valuationState: 'not_verified',
      marketEvidence: 'not_verified',
      finalRead: 'Financial Software / Tax / SMB Platform where the thesis depends on Financial Software / Tax / SMB Platform execution, customer demand, margin, and cash flow.',
      keySupport: [
        'SEC source pack identifies Intuit Inc. as Financial Software / Tax / SMB Platform.',
        'Latest primary-source filing reviewed: SEC latest periodic filing.'
      ],
      keyRisk: [
        'Financial Software / Tax / SMB Platform demand can slow.',
        'Margins can compress if cost, competition, or execution pressure rises.',
        'The business thesis can weaken if cash flow evidence deteriorates.'
      ]
    },
    valueCore: {
      ticker: 'INTU',
      value_core_type: 'Financial Software / Tax / SMB Platform',
      company_stage_candidate: 'Financial Software / Tax / SMB Platform',
      primary_value_driver: 'Financial Software / Tax / SMB Platform execution, customer demand, margin, and cash flow',
      thesis_break_trigger: 'The thesis weakens if financial software / tax / smb platform demand slows, margins compress, execution disappoints, or cash flow weakens.',
      evidence_needed: [
        'revenue and net interest income',
        'credit quality',
        'fee income',
        'capital and liquidity',
        'operating leverage',
        'cash flow'
      ],
      evidence_quality: 'Partial',
      dossier_state: 'curated_profile_batch_7',
      frontend_label: 'Curated',
      coverage_status: 'Curated',
      needs_human_review: false,
      source: 'SEC 10-K / 10-Q'
    },
    visualPhaseOne: {
      faq: {
        overview: [
          {
            question: 'What does INTU do?',
            answer: 'Intuit Inc. operates in Financial Software / Tax / SMB Platform.'
          }
        ],
        thesisRisk: [
          {
            question: 'What would break the INTU thesis?',
            answer: 'The thesis weakens if financial software / tax / smb platform demand slows, margins compress, execution disappoints, or cash flow weakens.'
          }
        ]
      },
      phaseTwo: {
        thesisRisk: {
          lead: 'The main risk is whether Intuit Inc. can keep financial software / tax / smb platform evidence strong while the key risk factors stay contained.',
          riskMap: [
            {
              label: 'Demand / growth',
              severity: 'High',
              watch: 'Financial Software / Tax / SMB Platform demand can slow.'
            },
            {
              label: 'Margin / economics',
              severity: 'High',
              watch: 'Margin can compress.'
            },
            {
              label: 'Execution',
              severity: 'Medium',
              watch: 'Execution can disappoint.'
            },
            {
              label: 'Cash flow / risk',
              severity: 'Medium',
              watch: 'Cash flow can weaken.'
            }
          ],
          evidenceNeeded: [
            'revenue and net interest income',
            'credit quality',
            'fee income',
            'capital and liquidity',
            'operating leverage',
            'cash flow'
          ]
        }
      }
    }
  },
  ADBE: {
    ticker: 'ADBE',
    companyName: 'Adobe Inc.',
    exchange: 'NASDAQ',
    logoUrl: buildStockLogoUrl('ADBE'),
    overview: 'Adobe Inc. operates in Creative / Document / Digital Experience Software.',
    category: 'Creative / Document / Digital Experience Software',
    analysisDate: '2026-06-11',
    latestFiscalPeriod: 'Q1 FY2026 ended 2026-02-27',
    dossierVerdict: {
      sourceType: 'curated',
      asOf: '2026-06-11',
      researchState: 'business_evidence_watch',
      businessQuality: 'high',
      valuationState: 'not_verified',
      marketEvidence: 'not_verified',
      finalRead: 'Creative / Document / Digital Experience Software where the thesis depends on Creative / Document / Digital Experience Software execution, customer demand, margin, and cash flow.',
      keySupport: [
        'SEC source pack identifies Adobe Inc. as Creative / Document / Digital Experience Software.',
        'Latest primary-source filing reviewed: SEC latest periodic filing.'
      ],
      keyRisk: [
        'Creative / Document / Digital Experience Software demand can slow.',
        'Margins can compress if cost, competition, or execution pressure rises.',
        'The business thesis can weaken if cash flow evidence deteriorates.'
      ]
    },
    valueCore: {
      ticker: 'ADBE',
      value_core_type: 'Creative / Document / Digital Experience Software',
      company_stage_candidate: 'Creative / Document / Digital Experience Software',
      primary_value_driver: 'Creative / Document / Digital Experience Software execution, customer demand, margin, and cash flow',
      thesis_break_trigger: 'The thesis weakens if creative / document / digital experience software demand slows, margins compress, execution disappoints, or cash flow weakens.',
      evidence_needed: [
        'revenue growth',
        'segment performance',
        'customer demand',
        'margin',
        'cash flow',
        'risk factor changes'
      ],
      evidence_quality: 'Partial',
      dossier_state: 'curated_profile_batch_7',
      frontend_label: 'Curated',
      coverage_status: 'Curated',
      needs_human_review: false,
      source: 'SEC 10-K / 10-Q'
    },
    visualPhaseOne: {
      faq: {
        overview: [
          {
            question: 'What does ADBE do?',
            answer: 'Adobe Inc. operates in Creative / Document / Digital Experience Software.'
          }
        ],
        thesisRisk: [
          {
            question: 'What would break the ADBE thesis?',
            answer: 'The thesis weakens if creative / document / digital experience software demand slows, margins compress, execution disappoints, or cash flow weakens.'
          }
        ]
      },
      phaseTwo: {
        thesisRisk: {
          lead: 'The main risk is whether Adobe Inc. can keep creative / document / digital experience software evidence strong while the key risk factors stay contained.',
          riskMap: [
            {
              label: 'Demand / growth',
              severity: 'High',
              watch: 'Creative / Document / Digital Experience Software demand can slow.'
            },
            {
              label: 'Margin / economics',
              severity: 'High',
              watch: 'Margin can compress.'
            },
            {
              label: 'Execution',
              severity: 'Medium',
              watch: 'Execution can disappoint.'
            },
            {
              label: 'Cash flow / risk',
              severity: 'Medium',
              watch: 'Cash flow can weaken.'
            }
          ],
          evidenceNeeded: [
            'revenue growth',
            'segment performance',
            'customer demand',
            'margin',
            'cash flow',
            'risk factor changes'
          ]
        }
      }
    }
  },
  ADSK: {
    ticker: 'ADSK',
    companyName: 'Autodesk, Inc.',
    exchange: 'NASDAQ',
    logoUrl: buildStockLogoUrl('ADSK'),
    overview: 'Autodesk, Inc. operates in Design / Engineering Software.',
    category: 'Design / Engineering Software',
    analysisDate: '2026-06-11',
    latestFiscalPeriod: 'Q1 FY2027 ended 2026-04-30',
    dossierVerdict: {
      sourceType: 'curated',
      asOf: '2026-06-11',
      researchState: 'business_evidence_watch',
      businessQuality: 'high',
      valuationState: 'not_verified',
      marketEvidence: 'not_verified',
      finalRead: 'Design / Engineering Software where the thesis depends on Design / Engineering Software execution, customer demand, margin, and cash flow.',
      keySupport: [
        'SEC source pack identifies Autodesk, Inc. as Design / Engineering Software.',
        'Latest primary-source filing reviewed: SEC latest periodic filing.'
      ],
      keyRisk: [
        'Design / Engineering Software demand can slow.',
        'Margins can compress if cost, competition, or execution pressure rises.',
        'The business thesis can weaken if cash flow evidence deteriorates.'
      ]
    },
    valueCore: {
      ticker: 'ADSK',
      value_core_type: 'Design / Engineering Software',
      company_stage_candidate: 'Design / Engineering Software',
      primary_value_driver: 'Design / Engineering Software execution, customer demand, margin, and cash flow',
      thesis_break_trigger: 'The thesis weakens if design / engineering software demand slows, margins compress, execution disappoints, or cash flow weakens.',
      evidence_needed: [
        'revenue growth',
        'segment performance',
        'customer demand',
        'margin',
        'cash flow',
        'risk factor changes'
      ],
      evidence_quality: 'Partial',
      dossier_state: 'curated_profile_batch_7',
      frontend_label: 'Curated',
      coverage_status: 'Curated',
      needs_human_review: false,
      source: 'SEC 10-K / 10-Q'
    },
    visualPhaseOne: {
      faq: {
        overview: [
          {
            question: 'What does ADSK do?',
            answer: 'Autodesk, Inc. operates in Design / Engineering Software.'
          }
        ],
        thesisRisk: [
          {
            question: 'What would break the ADSK thesis?',
            answer: 'The thesis weakens if design / engineering software demand slows, margins compress, execution disappoints, or cash flow weakens.'
          }
        ]
      },
      phaseTwo: {
        thesisRisk: {
          lead: 'The main risk is whether Autodesk, Inc. can keep design / engineering software evidence strong while the key risk factors stay contained.',
          riskMap: [
            {
              label: 'Demand / growth',
              severity: 'High',
              watch: 'Design / Engineering Software demand can slow.'
            },
            {
              label: 'Margin / economics',
              severity: 'High',
              watch: 'Margin can compress.'
            },
            {
              label: 'Execution',
              severity: 'Medium',
              watch: 'Execution can disappoint.'
            },
            {
              label: 'Cash flow / risk',
              severity: 'Medium',
              watch: 'Cash flow can weaken.'
            }
          ],
          evidenceNeeded: [
            'revenue growth',
            'segment performance',
            'customer demand',
            'margin',
            'cash flow',
            'risk factor changes'
          ]
        }
      }
    }
  },
  WDAY: {
    ticker: 'WDAY',
    companyName: 'Workday, Inc.',
    exchange: 'NASDAQ',
    logoUrl: buildStockLogoUrl('WDAY'),
    overview: 'Workday, Inc. operates in Human Capital / Finance Enterprise SaaS.',
    category: 'Human Capital / Finance Enterprise SaaS',
    analysisDate: '2026-06-11',
    latestFiscalPeriod: 'Q1 FY2027 ended 2026-04-30',
    dossierVerdict: {
      sourceType: 'curated',
      asOf: '2026-06-11',
      researchState: 'business_evidence_watch',
      businessQuality: 'high',
      valuationState: 'not_verified',
      marketEvidence: 'not_verified',
      finalRead: 'Human Capital / Finance Enterprise SaaS where the thesis depends on Human Capital / Finance Enterprise SaaS execution, customer demand, margin, and cash flow.',
      keySupport: [
        'SEC source pack identifies Workday, Inc. as Human Capital / Finance Enterprise SaaS.',
        'Latest primary-source filing reviewed: SEC latest periodic filing.'
      ],
      keyRisk: [
        'Human Capital / Finance Enterprise SaaS demand can slow.',
        'Margins can compress if cost, competition, or execution pressure rises.',
        'The business thesis can weaken if cash flow evidence deteriorates.'
      ]
    },
    valueCore: {
      ticker: 'WDAY',
      value_core_type: 'Human Capital / Finance Enterprise SaaS',
      company_stage_candidate: 'Human Capital / Finance Enterprise SaaS',
      primary_value_driver: 'Human Capital / Finance Enterprise SaaS execution, customer demand, margin, and cash flow',
      thesis_break_trigger: 'The thesis weakens if human capital / finance enterprise saas demand slows, margins compress, execution disappoints, or cash flow weakens.',
      evidence_needed: [
        'revenue growth',
        'segment performance',
        'customer demand',
        'margin',
        'cash flow',
        'risk factor changes'
      ],
      evidence_quality: 'Partial',
      dossier_state: 'curated_profile_batch_7',
      frontend_label: 'Curated',
      coverage_status: 'Curated',
      needs_human_review: false,
      source: 'SEC 10-K / 10-Q'
    },
    visualPhaseOne: {
      faq: {
        overview: [
          {
            question: 'What does WDAY do?',
            answer: 'Workday, Inc. operates in Human Capital / Finance Enterprise SaaS.'
          }
        ],
        thesisRisk: [
          {
            question: 'What would break the WDAY thesis?',
            answer: 'The thesis weakens if human capital / finance enterprise saas demand slows, margins compress, execution disappoints, or cash flow weakens.'
          }
        ]
      },
      phaseTwo: {
        thesisRisk: {
          lead: 'The main risk is whether Workday, Inc. can keep human capital / finance enterprise saas evidence strong while the key risk factors stay contained.',
          riskMap: [
            {
              label: 'Demand / growth',
              severity: 'High',
              watch: 'Human Capital / Finance Enterprise SaaS demand can slow.'
            },
            {
              label: 'Margin / economics',
              severity: 'High',
              watch: 'Margin can compress.'
            },
            {
              label: 'Execution',
              severity: 'Medium',
              watch: 'Execution can disappoint.'
            },
            {
              label: 'Cash flow / risk',
              severity: 'Medium',
              watch: 'Cash flow can weaken.'
            }
          ],
          evidenceNeeded: [
            'revenue growth',
            'segment performance',
            'customer demand',
            'margin',
            'cash flow',
            'risk factor changes'
          ]
        }
      }
    }
  },
  WMT: {
    ticker: 'WMT',
    companyName: 'Walmart Inc.',
    exchange: 'NYSE',
    logoUrl: buildStockLogoUrl('WMT'),
    overview: 'Walmart operates a global omnichannel retail business centered on stores, grocery, e-commerce, marketplace, membership, advertising, and supply-chain scale.',
    category: 'Retail / Consumer Staples',
    analysisDate: '2026-06-11',
    latestFiscalPeriod: 'Q1 FY2027 ended 2026-04-30',
    dossierVerdict: {
      sourceType: 'curated',
      asOf: '2026-06-11',
      researchState: 'consumer_demand_watch',
      businessQuality: 'high',
      valuationState: 'not_verified',
      marketEvidence: 'not_verified',
      finalRead: 'Retail / Consumer Staples where the thesis depends on Walmart operates a global omnichannel retail business centered on stores, grocery, e-commerce, marketplace, membership, advertising, and supply-chain scale.',
      keySupport: [
        'SEC source pack identifies Walmart Inc. as Retail / Consumer Staples.',
        'Walmart operates a global omnichannel retail business centered on stores, grocery, e-commerce, marketplace, membership, advertising, and supply-chain scale.',
        'Latest primary-source filing reviewed: SEC latest periodic filing.'
      ],
      keyRisk: [
        'Comparable sales.',
        'margin.',
        'inventory.',
        'wage and freight cost.'
      ]
    },
    valueCore: {
      ticker: 'WMT',
      value_core_type: 'Retail / Consumer Staples',
      company_stage_candidate: 'Retail / Consumer Staples',
      primary_value_driver: 'Walmart operates a global omnichannel retail business centered on stores, grocery, e-commerce, marketplace, membership, advertising, and supply-chain scale.',
      thesis_break_trigger: 'The thesis weakens if comparable sales. margin. inventory. wage and freight cost.',
      evidence_needed: [
        'revenue growth',
        'customer demand',
        'gross margin',
        'inventory and backlog',
        'capex or R&D execution',
        'free cash flow'
      ],
      evidence_quality: 'Partial',
      dossier_state: 'curated_profile_batch_8',
      frontend_label: 'Curated',
      coverage_status: 'Curated',
      needs_human_review: false,
      source: 'SEC 10-K / 10-Q'
    },
    visualPhaseOne: {
      faq: {
        overview: [
          {
            question: 'What does WMT do?',
            answer: 'Walmart operates a global omnichannel retail business centered on stores, grocery, e-commerce, marketplace, membership, advertising, and supply-chain scale.'
          }
        ],
        thesisRisk: [
          {
            question: 'What would break the WMT thesis?',
            answer: 'The thesis weakens if comparable sales. margin. inventory. wage and freight cost.'
          }
        ]
      },
      phaseTwo: {
        thesisRisk: {
          lead: 'The main risk is whether Walmart Inc. can keep retail / consumer staples evidence strong while the key risk factors stay contained.',
          riskMap: [
            {
              label: 'Demand / growth',
              severity: 'High',
              watch: 'Comparable sales.'
            },
            {
              label: 'Margin / economics',
              severity: 'High',
              watch: 'margin.'
            },
            {
              label: 'Execution',
              severity: 'Medium',
              watch: 'inventory.'
            },
            {
              label: 'Cash flow / risk',
              severity: 'Medium',
              watch: 'wage and freight cost.'
            }
          ],
          evidenceNeeded: [
            'revenue growth',
            'customer demand',
            'gross margin',
            'inventory and backlog',
            'capex or R&D execution',
            'free cash flow'
          ]
        }
      }
    }
  },
  MCD: {
    ticker: 'MCD',
    companyName: 'McDonald\'s Corporation',
    exchange: 'NYSE',
    logoUrl: buildStockLogoUrl('MCD'),
    overview: 'McDonald\'s operates a global franchised restaurant system driven by brand scale, comparable sales, unit economics, franchise economics, and menu value.',
    category: 'Restaurants / Franchised Consumer',
    analysisDate: '2026-06-11',
    latestFiscalPeriod: 'Q1 2026 ended 2026-03-31',
    dossierVerdict: {
      sourceType: 'curated',
      asOf: '2026-06-11',
      researchState: 'consumer_demand_watch',
      businessQuality: 'high',
      valuationState: 'not_verified',
      marketEvidence: 'not_verified',
      finalRead: 'Restaurants / Franchised Consumer where the thesis depends on McDonald\'s operates a global franchised restaurant system driven by brand scale, comparable sales, unit economics, franchise economics, and menu value.',
      keySupport: [
        'SEC source pack identifies McDonald\'s Corporation as Restaurants / Franchised Consumer.',
        'McDonald\'s operates a global franchised restaurant system driven by brand scale, comparable sales, unit economics, franchise economics, and menu value.',
        'Latest primary-source filing reviewed: SEC latest periodic filing.'
      ],
      keyRisk: [
        'Traffic.',
        'value perception.',
        'restaurant-level margins.',
        'franchisee economics.'
      ]
    },
    valueCore: {
      ticker: 'MCD',
      value_core_type: 'Restaurants / Franchised Consumer',
      company_stage_candidate: 'Restaurants / Franchised Consumer',
      primary_value_driver: 'McDonald\'s operates a global franchised restaurant system driven by brand scale, comparable sales, unit economics, franchise economics, and menu value.',
      thesis_break_trigger: 'The thesis weakens if traffic. value perception. restaurant-level margins. franchisee economics.',
      evidence_needed: [
        'revenue growth',
        'traffic or volume',
        'pricing and demand',
        'margin',
        'customer retention',
        'free cash flow'
      ],
      evidence_quality: 'Partial',
      dossier_state: 'curated_profile_batch_8',
      frontend_label: 'Curated',
      coverage_status: 'Curated',
      needs_human_review: false,
      source: 'SEC 10-K / 10-Q'
    },
    visualPhaseOne: {
      faq: {
        overview: [
          {
            question: 'What does MCD do?',
            answer: 'McDonald\'s operates a global franchised restaurant system driven by brand scale, comparable sales, unit economics, franchise economics, and menu value.'
          }
        ],
        thesisRisk: [
          {
            question: 'What would break the MCD thesis?',
            answer: 'The thesis weakens if traffic. value perception. restaurant-level margins. franchisee economics.'
          }
        ]
      },
      phaseTwo: {
        thesisRisk: {
          lead: 'The main risk is whether McDonald\'s Corporation can keep restaurants / franchised consumer evidence strong while the key risk factors stay contained.',
          riskMap: [
            {
              label: 'Demand / growth',
              severity: 'High',
              watch: 'Traffic.'
            },
            {
              label: 'Margin / economics',
              severity: 'High',
              watch: 'value perception.'
            },
            {
              label: 'Execution',
              severity: 'Medium',
              watch: 'restaurant-level margins.'
            },
            {
              label: 'Cash flow / risk',
              severity: 'Medium',
              watch: 'franchisee economics.'
            }
          ],
          evidenceNeeded: [
            'revenue growth',
            'traffic or volume',
            'pricing and demand',
            'margin',
            'customer retention',
            'free cash flow'
          ]
        }
      }
    }
  },
  KO: {
    ticker: 'KO',
    companyName: 'The Coca-Cola Company',
    exchange: 'NYSE',
    logoUrl: buildStockLogoUrl('KO'),
    overview: 'Coca-Cola is a global nonalcoholic beverage company with a concentrate and franchise bottling model across sparkling, water, sports, coffee, tea, juice, and other beverage categories.',
    category: 'Beverages / Consumer Staples',
    analysisDate: '2026-06-11',
    latestFiscalPeriod: 'Q1 2026 ended 2026-04-03',
    dossierVerdict: {
      sourceType: 'curated',
      asOf: '2026-06-11',
      researchState: 'consumer_demand_watch',
      businessQuality: 'high',
      valuationState: 'not_verified',
      marketEvidence: 'not_verified',
      finalRead: 'Beverages / Consumer Staples where the thesis depends on Coca-Cola is a global nonalcoholic beverage company with a concentrate and franchise bottling model across sparkling, water, sports, coffee, tea, juice, and other beverage categories.',
      keySupport: [
        'SEC source pack identifies The Coca-Cola Company as Beverages / Consumer Staples.',
        'Coca-Cola is a global nonalcoholic beverage company with a concentrate and franchise bottling model across sparkling, water, sports, coffee, tea, juice, and other beverage categories.',
        'Latest primary-source filing reviewed: SEC latest periodic filing.'
      ],
      keyRisk: [
        'Volume.',
        'price elasticity.',
        'bottler execution.',
        'foreign exchange.'
      ]
    },
    valueCore: {
      ticker: 'KO',
      value_core_type: 'Beverages / Consumer Staples',
      company_stage_candidate: 'Beverages / Consumer Staples',
      primary_value_driver: 'Coca-Cola is a global nonalcoholic beverage company with a concentrate and franchise bottling model across sparkling, water, sports, coffee, tea, juice, and other beverage categories.',
      thesis_break_trigger: 'The thesis weakens if volume. price elasticity. bottler execution. foreign exchange.',
      evidence_needed: [
        'revenue growth',
        'traffic or volume',
        'pricing and demand',
        'margin',
        'customer retention',
        'free cash flow'
      ],
      evidence_quality: 'Partial',
      dossier_state: 'curated_profile_batch_8',
      frontend_label: 'Curated',
      coverage_status: 'Curated',
      needs_human_review: false,
      source: 'SEC 10-K / 10-Q'
    },
    visualPhaseOne: {
      faq: {
        overview: [
          {
            question: 'What does KO do?',
            answer: 'Coca-Cola is a global nonalcoholic beverage company with a concentrate and franchise bottling model across sparkling, water, sports, coffee, tea, juice, and other beverage categories.'
          }
        ],
        thesisRisk: [
          {
            question: 'What would break the KO thesis?',
            answer: 'The thesis weakens if volume. price elasticity. bottler execution. foreign exchange.'
          }
        ]
      },
      phaseTwo: {
        thesisRisk: {
          lead: 'The main risk is whether The Coca-Cola Company can keep beverages / consumer staples evidence strong while the key risk factors stay contained.',
          riskMap: [
            {
              label: 'Demand / growth',
              severity: 'High',
              watch: 'Volume.'
            },
            {
              label: 'Margin / economics',
              severity: 'High',
              watch: 'price elasticity.'
            },
            {
              label: 'Execution',
              severity: 'Medium',
              watch: 'bottler execution.'
            },
            {
              label: 'Cash flow / risk',
              severity: 'Medium',
              watch: 'foreign exchange.'
            }
          ],
          evidenceNeeded: [
            'revenue growth',
            'traffic or volume',
            'pricing and demand',
            'margin',
            'customer retention',
            'free cash flow'
          ]
        }
      }
    }
  },
  PEP: {
    ticker: 'PEP',
    companyName: 'PepsiCo, Inc.',
    exchange: 'NASDAQ',
    logoUrl: buildStockLogoUrl('PEP'),
    overview: 'PepsiCo combines global snacks and beverages, with Frito-Lay, international expansion, pricing, volume, productivity, and brand portfolio execution as central evidence.',
    category: 'Snacks & Beverages / Consumer Staples',
    analysisDate: '2026-06-11',
    latestFiscalPeriod: 'Q1 2026 ended 2026-03-21',
    dossierVerdict: {
      sourceType: 'curated',
      asOf: '2026-06-11',
      researchState: 'consumer_demand_watch',
      businessQuality: 'high',
      valuationState: 'not_verified',
      marketEvidence: 'not_verified',
      finalRead: 'Snacks & Beverages / Consumer Staples where the thesis depends on PepsiCo combines global snacks and beverages, with Frito-Lay, international expansion, pricing, volume, productivity, and brand portfolio execution as central evidence.',
      keySupport: [
        'SEC source pack identifies PepsiCo, Inc. as Snacks & Beverages / Consumer Staples.',
        'PepsiCo combines global snacks and beverages, with Frito-Lay, international expansion, pricing, volume, productivity, and brand portfolio execution as central evidence.',
        'Latest primary-source filing reviewed: SEC latest periodic filing.'
      ],
      keyRisk: [
        'Volume pressure.',
        'pricing elasticity.',
        'commodity costs.',
        'foreign exchange.'
      ]
    },
    valueCore: {
      ticker: 'PEP',
      value_core_type: 'Snacks & Beverages / Consumer Staples',
      company_stage_candidate: 'Snacks & Beverages / Consumer Staples',
      primary_value_driver: 'PepsiCo combines global snacks and beverages, with Frito-Lay, international expansion, pricing, volume, productivity, and brand portfolio execution as central evidence.',
      thesis_break_trigger: 'The thesis weakens if volume pressure. pricing elasticity. commodity costs. foreign exchange.',
      evidence_needed: [
        'revenue growth',
        'traffic or volume',
        'pricing and demand',
        'margin',
        'customer retention',
        'free cash flow'
      ],
      evidence_quality: 'Partial',
      dossier_state: 'curated_profile_batch_8',
      frontend_label: 'Curated',
      coverage_status: 'Curated',
      needs_human_review: false,
      source: 'SEC 10-K / 10-Q'
    },
    visualPhaseOne: {
      faq: {
        overview: [
          {
            question: 'What does PEP do?',
            answer: 'PepsiCo combines global snacks and beverages, with Frito-Lay, international expansion, pricing, volume, productivity, and brand portfolio execution as central evidence.'
          }
        ],
        thesisRisk: [
          {
            question: 'What would break the PEP thesis?',
            answer: 'The thesis weakens if volume pressure. pricing elasticity. commodity costs. foreign exchange.'
          }
        ]
      },
      phaseTwo: {
        thesisRisk: {
          lead: 'The main risk is whether PepsiCo, Inc. can keep snacks & beverages / consumer staples evidence strong while the key risk factors stay contained.',
          riskMap: [
            {
              label: 'Demand / growth',
              severity: 'High',
              watch: 'Volume pressure.'
            },
            {
              label: 'Margin / economics',
              severity: 'High',
              watch: 'pricing elasticity.'
            },
            {
              label: 'Execution',
              severity: 'Medium',
              watch: 'commodity costs.'
            },
            {
              label: 'Cash flow / risk',
              severity: 'Medium',
              watch: 'foreign exchange.'
            }
          ],
          evidenceNeeded: [
            'revenue growth',
            'traffic or volume',
            'pricing and demand',
            'margin',
            'customer retention',
            'free cash flow'
          ]
        }
      }
    }
  },
  PG: {
    ticker: 'PG',
    companyName: 'The Procter & Gamble Company',
    exchange: 'NYSE',
    logoUrl: buildStockLogoUrl('PG'),
    overview: 'Procter & Gamble is a global branded consumer products company across beauty, grooming, health care, fabric and home care, baby, feminine, and family care.',
    category: 'Consumer Staples / Household Products',
    analysisDate: '2026-06-11',
    latestFiscalPeriod: 'Q3 FY2026 ended 2026-03-31',
    dossierVerdict: {
      sourceType: 'curated',
      asOf: '2026-06-11',
      researchState: 'consumer_demand_watch',
      businessQuality: 'high',
      valuationState: 'not_verified',
      marketEvidence: 'not_verified',
      finalRead: 'Consumer Staples / Household Products where the thesis depends on Procter & Gamble is a global branded consumer products company across beauty, grooming, health care, fabric and home care, baby, feminine, and family care.',
      keySupport: [
        'SEC source pack identifies The Procter & Gamble Company as Consumer Staples / Household Products.',
        'Procter & Gamble is a global branded consumer products company across beauty, grooming, health care, fabric and home care, baby, feminine, and family care.',
        'Latest primary-source filing reviewed: SEC latest periodic filing.'
      ],
      keyRisk: [
        'Organic volume.',
        'pricing elasticity.',
        'private label pressure.',
        'commodity and freight costs.'
      ]
    },
    valueCore: {
      ticker: 'PG',
      value_core_type: 'Consumer Staples / Household Products',
      company_stage_candidate: 'Consumer Staples / Household Products',
      primary_value_driver: 'Procter & Gamble is a global branded consumer products company across beauty, grooming, health care, fabric and home care, baby, feminine, and family care.',
      thesis_break_trigger: 'The thesis weakens if organic volume. pricing elasticity. private label pressure. commodity and freight costs.',
      evidence_needed: [
        'revenue growth',
        'traffic or volume',
        'pricing and demand',
        'margin',
        'customer retention',
        'free cash flow'
      ],
      evidence_quality: 'Partial',
      dossier_state: 'curated_profile_batch_8',
      frontend_label: 'Curated',
      coverage_status: 'Curated',
      needs_human_review: false,
      source: 'SEC 10-K / 10-Q'
    },
    visualPhaseOne: {
      faq: {
        overview: [
          {
            question: 'What does PG do?',
            answer: 'Procter & Gamble is a global branded consumer products company across beauty, grooming, health care, fabric and home care, baby, feminine, and family care.'
          }
        ],
        thesisRisk: [
          {
            question: 'What would break the PG thesis?',
            answer: 'The thesis weakens if organic volume. pricing elasticity. private label pressure. commodity and freight costs.'
          }
        ]
      },
      phaseTwo: {
        thesisRisk: {
          lead: 'The main risk is whether The Procter & Gamble Company can keep consumer staples / household products evidence strong while the key risk factors stay contained.',
          riskMap: [
            {
              label: 'Demand / growth',
              severity: 'High',
              watch: 'Organic volume.'
            },
            {
              label: 'Margin / economics',
              severity: 'High',
              watch: 'pricing elasticity.'
            },
            {
              label: 'Execution',
              severity: 'Medium',
              watch: 'private label pressure.'
            },
            {
              label: 'Cash flow / risk',
              severity: 'Medium',
              watch: 'commodity and freight costs.'
            }
          ],
          evidenceNeeded: [
            'revenue growth',
            'traffic or volume',
            'pricing and demand',
            'margin',
            'customer retention',
            'free cash flow'
          ]
        }
      }
    }
  },
  NKE: {
    ticker: 'NKE',
    companyName: 'NIKE, Inc.',
    exchange: 'NYSE',
    logoUrl: buildStockLogoUrl('NKE'),
    overview: 'Nike designs and sells athletic footwear, apparel, equipment, and accessories through wholesale, direct-to-consumer, digital, and global brand channels.',
    category: 'Athletic Apparel / Consumer Discretionary',
    analysisDate: '2026-06-11',
    latestFiscalPeriod: 'Q3 FY2026 ended 2026-02-28',
    dossierVerdict: {
      sourceType: 'curated',
      asOf: '2026-06-11',
      researchState: 'consumer_demand_watch',
      businessQuality: 'high',
      valuationState: 'not_verified',
      marketEvidence: 'not_verified',
      finalRead: 'Athletic Apparel / Consumer Discretionary where the thesis depends on Nike designs and sells athletic footwear, apparel, equipment, and accessories through wholesale, direct-to-consumer, digital, and global brand channels.',
      keySupport: [
        'SEC source pack identifies NIKE, Inc. as Athletic Apparel / Consumer Discretionary.',
        'Nike designs and sells athletic footwear, apparel, equipment, and accessories through wholesale, direct-to-consumer, digital, and global brand channels.',
        'Latest primary-source filing reviewed: SEC latest periodic filing.'
      ],
      keyRisk: [
        'Brand heat.',
        'product innovation.',
        'inventory.',
        'China demand.'
      ]
    },
    valueCore: {
      ticker: 'NKE',
      value_core_type: 'Athletic Apparel / Consumer Discretionary',
      company_stage_candidate: 'Athletic Apparel / Consumer Discretionary',
      primary_value_driver: 'Nike designs and sells athletic footwear, apparel, equipment, and accessories through wholesale, direct-to-consumer, digital, and global brand channels.',
      thesis_break_trigger: 'The thesis weakens if brand heat. product innovation. inventory. China demand.',
      evidence_needed: [
        'revenue growth',
        'traffic or volume',
        'pricing and demand',
        'margin',
        'customer retention',
        'free cash flow'
      ],
      evidence_quality: 'Partial',
      dossier_state: 'curated_profile_batch_8',
      frontend_label: 'Curated',
      coverage_status: 'Curated',
      needs_human_review: false,
      source: 'SEC 10-K / 10-Q'
    },
    visualPhaseOne: {
      faq: {
        overview: [
          {
            question: 'What does NKE do?',
            answer: 'Nike designs and sells athletic footwear, apparel, equipment, and accessories through wholesale, direct-to-consumer, digital, and global brand channels.'
          }
        ],
        thesisRisk: [
          {
            question: 'What would break the NKE thesis?',
            answer: 'The thesis weakens if brand heat. product innovation. inventory. China demand.'
          }
        ]
      },
      phaseTwo: {
        thesisRisk: {
          lead: 'The main risk is whether NIKE, Inc. can keep athletic apparel / consumer discretionary evidence strong while the key risk factors stay contained.',
          riskMap: [
            {
              label: 'Demand / growth',
              severity: 'High',
              watch: 'Brand heat.'
            },
            {
              label: 'Margin / economics',
              severity: 'High',
              watch: 'product innovation.'
            },
            {
              label: 'Execution',
              severity: 'Medium',
              watch: 'inventory.'
            },
            {
              label: 'Cash flow / risk',
              severity: 'Medium',
              watch: 'China demand.'
            }
          ],
          evidenceNeeded: [
            'revenue growth',
            'traffic or volume',
            'pricing and demand',
            'margin',
            'customer retention',
            'free cash flow'
          ]
        }
      }
    }
  },
  LOW: {
    ticker: 'LOW',
    companyName: 'Lowe\'s Companies, Inc.',
    exchange: 'NYSE',
    logoUrl: buildStockLogoUrl('LOW'),
    overview: 'Lowe\'s is a home improvement retailer serving DIY and Pro customers through stores, digital channels, merchandising, and supply-chain execution.',
    category: 'Home Improvement Retail',
    analysisDate: '2026-06-11',
    latestFiscalPeriod: 'Q1 FY2026 ended 2026-05-01',
    dossierVerdict: {
      sourceType: 'curated',
      asOf: '2026-06-11',
      researchState: 'consumer_demand_watch',
      businessQuality: 'high',
      valuationState: 'not_verified',
      marketEvidence: 'not_verified',
      finalRead: 'Home Improvement Retail where the thesis depends on Lowe\'s is a home improvement retailer serving DIY and Pro customers through stores, digital channels, merchandising, and supply-chain execution.',
      keySupport: [
        'SEC source pack identifies Lowe\'s Companies, Inc. as Home Improvement Retail.',
        'Lowe\'s is a home improvement retailer serving DIY and Pro customers through stores, digital channels, merchandising, and supply-chain execution.',
        'Latest primary-source filing reviewed: SEC latest periodic filing.'
      ],
      keyRisk: [
        'Comparable sales.',
        'Pro customer growth.',
        'housing turnover.',
        'repair and remodel demand.'
      ]
    },
    valueCore: {
      ticker: 'LOW',
      value_core_type: 'Home Improvement Retail',
      company_stage_candidate: 'Home Improvement Retail',
      primary_value_driver: 'Lowe\'s is a home improvement retailer serving DIY and Pro customers through stores, digital channels, merchandising, and supply-chain execution.',
      thesis_break_trigger: 'The thesis weakens if comparable sales. Pro customer growth. housing turnover. repair and remodel demand.',
      evidence_needed: [
        'revenue growth',
        'customer demand',
        'gross margin',
        'inventory and backlog',
        'capex or R&D execution',
        'free cash flow'
      ],
      evidence_quality: 'Partial',
      dossier_state: 'curated_profile_batch_8',
      frontend_label: 'Curated',
      coverage_status: 'Curated',
      needs_human_review: false,
      source: 'SEC 10-K / 10-Q'
    },
    visualPhaseOne: {
      faq: {
        overview: [
          {
            question: 'What does LOW do?',
            answer: 'Lowe\'s is a home improvement retailer serving DIY and Pro customers through stores, digital channels, merchandising, and supply-chain execution.'
          }
        ],
        thesisRisk: [
          {
            question: 'What would break the LOW thesis?',
            answer: 'The thesis weakens if comparable sales. Pro customer growth. housing turnover. repair and remodel demand.'
          }
        ]
      },
      phaseTwo: {
        thesisRisk: {
          lead: 'The main risk is whether Lowe\'s Companies, Inc. can keep home improvement retail evidence strong while the key risk factors stay contained.',
          riskMap: [
            {
              label: 'Demand / growth',
              severity: 'High',
              watch: 'Comparable sales.'
            },
            {
              label: 'Margin / economics',
              severity: 'High',
              watch: 'Pro customer growth.'
            },
            {
              label: 'Execution',
              severity: 'Medium',
              watch: 'housing turnover.'
            },
            {
              label: 'Cash flow / risk',
              severity: 'Medium',
              watch: 'repair and remodel demand.'
            }
          ],
          evidenceNeeded: [
            'revenue growth',
            'customer demand',
            'gross margin',
            'inventory and backlog',
            'capex or R&D execution',
            'free cash flow'
          ]
        }
      }
    }
  },
  MDLZ: {
    ticker: 'MDLZ',
    companyName: 'Mondelez International, Inc.',
    exchange: 'NASDAQ',
    logoUrl: buildStockLogoUrl('MDLZ'),
    overview: 'Mondelez is a global snacks company focused on biscuits, chocolate, gum, candy, cheese, grocery, and related packaged food brands.',
    category: 'Snacks / Consumer Staples',
    analysisDate: '2026-06-11',
    latestFiscalPeriod: 'Q1 2026 ended 2026-03-31',
    dossierVerdict: {
      sourceType: 'curated',
      asOf: '2026-06-11',
      researchState: 'consumer_demand_watch',
      businessQuality: 'high',
      valuationState: 'not_verified',
      marketEvidence: 'not_verified',
      finalRead: 'Snacks / Consumer Staples where the thesis depends on Mondelez is a global snacks company focused on biscuits, chocolate, gum, candy, cheese, grocery, and related packaged food brands.',
      keySupport: [
        'SEC source pack identifies Mondelez International, Inc. as Snacks / Consumer Staples.',
        'Mondelez is a global snacks company focused on biscuits, chocolate, gum, candy, cheese, grocery, and related packaged food brands.',
        'Latest primary-source filing reviewed: SEC latest periodic filing.'
      ],
      keyRisk: [
        'Volume elasticity.',
        'cocoa and other input costs.',
        'pricing.',
        'foreign exchange.'
      ]
    },
    valueCore: {
      ticker: 'MDLZ',
      value_core_type: 'Snacks / Consumer Staples',
      company_stage_candidate: 'Snacks / Consumer Staples',
      primary_value_driver: 'Mondelez is a global snacks company focused on biscuits, chocolate, gum, candy, cheese, grocery, and related packaged food brands.',
      thesis_break_trigger: 'The thesis weakens if volume elasticity. cocoa and other input costs. pricing. foreign exchange.',
      evidence_needed: [
        'revenue growth',
        'traffic or volume',
        'pricing and demand',
        'margin',
        'customer retention',
        'free cash flow'
      ],
      evidence_quality: 'Partial',
      dossier_state: 'curated_profile_batch_8',
      frontend_label: 'Curated',
      coverage_status: 'Curated',
      needs_human_review: false,
      source: 'SEC 10-K / 10-Q'
    },
    visualPhaseOne: {
      faq: {
        overview: [
          {
            question: 'What does MDLZ do?',
            answer: 'Mondelez is a global snacks company focused on biscuits, chocolate, gum, candy, cheese, grocery, and related packaged food brands.'
          }
        ],
        thesisRisk: [
          {
            question: 'What would break the MDLZ thesis?',
            answer: 'The thesis weakens if volume elasticity. cocoa and other input costs. pricing. foreign exchange.'
          }
        ]
      },
      phaseTwo: {
        thesisRisk: {
          lead: 'The main risk is whether Mondelez International, Inc. can keep snacks / consumer staples evidence strong while the key risk factors stay contained.',
          riskMap: [
            {
              label: 'Demand / growth',
              severity: 'High',
              watch: 'Volume elasticity.'
            },
            {
              label: 'Margin / economics',
              severity: 'High',
              watch: 'cocoa and other input costs.'
            },
            {
              label: 'Execution',
              severity: 'Medium',
              watch: 'pricing.'
            },
            {
              label: 'Cash flow / risk',
              severity: 'Medium',
              watch: 'foreign exchange.'
            }
          ],
          evidenceNeeded: [
            'revenue growth',
            'traffic or volume',
            'pricing and demand',
            'margin',
            'customer retention',
            'free cash flow'
          ]
        }
      }
    }
  },
  PM: {
    ticker: 'PM',
    companyName: 'Philip Morris International Inc.',
    exchange: 'NYSE',
    logoUrl: buildStockLogoUrl('PM'),
    overview: 'Philip Morris International is a global tobacco and smoke-free products company where the thesis centers on combustible transition, smoke-free adoption, and nicotine portfolio execution.',
    category: 'Tobacco / Smoke-Free Nicotine',
    analysisDate: '2026-06-11',
    latestFiscalPeriod: 'Q1 2026 ended 2026-03-31',
    dossierVerdict: {
      sourceType: 'curated',
      asOf: '2026-06-11',
      researchState: 'business_evidence_watch',
      businessQuality: 'medium',
      valuationState: 'not_verified',
      marketEvidence: 'not_verified',
      finalRead: 'Tobacco / Smoke-Free Nicotine where the thesis depends on Philip Morris International is a global tobacco and smoke-free products company where the thesis centers on combustible transition, smoke-free adoption, and nicotine portfolio execution.',
      keySupport: [
        'SEC source pack identifies Philip Morris International Inc. as Tobacco / Smoke-Free Nicotine.',
        'Philip Morris International is a global tobacco and smoke-free products company where the thesis centers on combustible transition, smoke-free adoption, and nicotine portfolio execution.',
        'Latest primary-source filing reviewed: SEC latest periodic filing.'
      ],
      keyRisk: [
        'Regulation.',
        'excise taxes.',
        'litigation.',
        'combustible volume decline.'
      ]
    },
    valueCore: {
      ticker: 'PM',
      value_core_type: 'Tobacco / Smoke-Free Nicotine',
      company_stage_candidate: 'Tobacco / Smoke-Free Nicotine',
      primary_value_driver: 'Philip Morris International is a global tobacco and smoke-free products company where the thesis centers on combustible transition, smoke-free adoption, and nicotine portfolio execution.',
      thesis_break_trigger: 'The thesis weakens if regulation. excise taxes. litigation. combustible volume decline.',
      evidence_needed: [
        'revenue growth',
        'segment performance',
        'customer demand',
        'margin',
        'cash flow',
        'risk factor changes'
      ],
      evidence_quality: 'Partial',
      dossier_state: 'curated_profile_batch_8',
      frontend_label: 'Curated',
      coverage_status: 'Curated',
      needs_human_review: false,
      source: 'SEC 10-K / 10-Q'
    },
    visualPhaseOne: {
      faq: {
        overview: [
          {
            question: 'What does PM do?',
            answer: 'Philip Morris International is a global tobacco and smoke-free products company where the thesis centers on combustible transition, smoke-free adoption, and nicotine portfolio execution.'
          }
        ],
        thesisRisk: [
          {
            question: 'What would break the PM thesis?',
            answer: 'The thesis weakens if regulation. excise taxes. litigation. combustible volume decline.'
          }
        ]
      },
      phaseTwo: {
        thesisRisk: {
          lead: 'The main risk is whether Philip Morris International Inc. can keep tobacco / smoke-free nicotine evidence strong while the key risk factors stay contained.',
          riskMap: [
            {
              label: 'Demand / growth',
              severity: 'High',
              watch: 'Regulation.'
            },
            {
              label: 'Margin / economics',
              severity: 'High',
              watch: 'excise taxes.'
            },
            {
              label: 'Execution',
              severity: 'Medium',
              watch: 'litigation.'
            },
            {
              label: 'Cash flow / risk',
              severity: 'Medium',
              watch: 'combustible volume decline.'
            }
          ],
          evidenceNeeded: [
            'revenue growth',
            'segment performance',
            'customer demand',
            'margin',
            'cash flow',
            'risk factor changes'
          ]
        }
      }
    }
  },
  MO: {
    ticker: 'MO',
    companyName: 'Altria Group, Inc.',
    exchange: 'NYSE',
    logoUrl: buildStockLogoUrl('MO'),
    overview: 'Altria is a U.S.-focused tobacco company across smokeable products, oral tobacco, and nicotine categories, with pricing, regulation, and volume decline as core evidence.',
    category: 'Tobacco / U.S. Nicotine',
    analysisDate: '2026-06-11',
    latestFiscalPeriod: 'Q1 2026 ended 2026-03-31',
    dossierVerdict: {
      sourceType: 'curated',
      asOf: '2026-06-11',
      researchState: 'business_evidence_watch',
      businessQuality: 'medium',
      valuationState: 'not_verified',
      marketEvidence: 'not_verified',
      finalRead: 'Tobacco / U.S. Nicotine where the thesis depends on Altria is a U.S.-focused tobacco company across smokeable products, oral tobacco, and nicotine categories, with pricing, regulation, and volume decline as core evidence.',
      keySupport: [
        'SEC source pack identifies Altria Group, Inc. as Tobacco / U.S. Nicotine.',
        'Altria is a U.S.-focused tobacco company across smokeable products, oral tobacco, and nicotine categories, with pricing, regulation, and volume decline as core evidence.',
        'Latest primary-source filing reviewed: SEC latest periodic filing.'
      ],
      keyRisk: [
        'Cigarette volume decline.',
        'regulation.',
        'litigation.',
        'excise taxes.'
      ]
    },
    valueCore: {
      ticker: 'MO',
      value_core_type: 'Tobacco / U.S. Nicotine',
      company_stage_candidate: 'Tobacco / U.S. Nicotine',
      primary_value_driver: 'Altria is a U.S.-focused tobacco company across smokeable products, oral tobacco, and nicotine categories, with pricing, regulation, and volume decline as core evidence.',
      thesis_break_trigger: 'The thesis weakens if cigarette volume decline. regulation. litigation. excise taxes.',
      evidence_needed: [
        'revenue growth',
        'segment performance',
        'customer demand',
        'margin',
        'cash flow',
        'risk factor changes'
      ],
      evidence_quality: 'Partial',
      dossier_state: 'curated_profile_batch_8',
      frontend_label: 'Curated',
      coverage_status: 'Curated',
      needs_human_review: false,
      source: 'SEC 10-K / 10-Q'
    },
    visualPhaseOne: {
      faq: {
        overview: [
          {
            question: 'What does MO do?',
            answer: 'Altria is a U.S.-focused tobacco company across smokeable products, oral tobacco, and nicotine categories, with pricing, regulation, and volume decline as core evidence.'
          }
        ],
        thesisRisk: [
          {
            question: 'What would break the MO thesis?',
            answer: 'The thesis weakens if cigarette volume decline. regulation. litigation. excise taxes.'
          }
        ]
      },
      phaseTwo: {
        thesisRisk: {
          lead: 'The main risk is whether Altria Group, Inc. can keep tobacco / u.s. nicotine evidence strong while the key risk factors stay contained.',
          riskMap: [
            {
              label: 'Demand / growth',
              severity: 'High',
              watch: 'Cigarette volume decline.'
            },
            {
              label: 'Margin / economics',
              severity: 'High',
              watch: 'regulation.'
            },
            {
              label: 'Execution',
              severity: 'Medium',
              watch: 'litigation.'
            },
            {
              label: 'Cash flow / risk',
              severity: 'Medium',
              watch: 'excise taxes.'
            }
          ],
          evidenceNeeded: [
            'revenue growth',
            'segment performance',
            'customer demand',
            'margin',
            'cash flow',
            'risk factor changes'
          ]
        }
      }
    }
  },
  TMUS: {
    ticker: 'TMUS',
    companyName: 'T-Mobile US, Inc.',
    exchange: 'NASDAQ',
    logoUrl: buildStockLogoUrl('TMUS'),
    overview: 'T-Mobile US is a wireless communications provider where postpaid phone growth, churn, ARPU, 5G network quality, and fixed wireless broadband are central evidence.',
    category: 'Telecom / Wireless',
    analysisDate: '2026-06-11',
    latestFiscalPeriod: 'Q1 2026 ended 2026-03-31',
    dossierVerdict: {
      sourceType: 'curated',
      asOf: '2026-06-11',
      researchState: 'communications_cashflow_watch',
      businessQuality: 'medium',
      valuationState: 'not_verified',
      marketEvidence: 'not_verified',
      finalRead: 'Telecom / Wireless where the thesis depends on T-Mobile US is a wireless communications provider where postpaid phone growth, churn, ARPU, 5G network quality, and fixed wireless broadband are central evidence.',
      keySupport: [
        'SEC source pack identifies T-Mobile US, Inc. as Telecom / Wireless.',
        'T-Mobile US is a wireless communications provider where postpaid phone growth, churn, ARPU, 5G network quality, and fixed wireless broadband are central evidence.',
        'Latest primary-source filing reviewed: SEC latest periodic filing.'
      ],
      keyRisk: [
        'Wireless competition.',
        'churn.',
        'ARPU.',
        'network spending.'
      ]
    },
    valueCore: {
      ticker: 'TMUS',
      value_core_type: 'Telecom / Wireless',
      company_stage_candidate: 'Telecom / Wireless',
      primary_value_driver: 'T-Mobile US is a wireless communications provider where postpaid phone growth, churn, ARPU, 5G network quality, and fixed wireless broadband are central evidence.',
      thesis_break_trigger: 'The thesis weakens if wireless competition. churn. ARPU. network spending.',
      evidence_needed: [
        'revenue growth',
        'segment performance',
        'customer demand',
        'margin',
        'cash flow',
        'risk factor changes'
      ],
      evidence_quality: 'Partial',
      dossier_state: 'curated_profile_batch_9',
      frontend_label: 'Curated',
      coverage_status: 'Curated',
      needs_human_review: false,
      source: 'SEC 10-K / 10-Q'
    },
    visualPhaseOne: {
      faq: {
        overview: [
          {
            question: 'What does TMUS do?',
            answer: 'T-Mobile US is a wireless communications provider where postpaid phone growth, churn, ARPU, 5G network quality, and fixed wireless broadband are central evidence.'
          }
        ],
        thesisRisk: [
          {
            question: 'What would break the TMUS thesis?',
            answer: 'The thesis weakens if wireless competition. churn. ARPU. network spending.'
          }
        ]
      },
      phaseTwo: {
        thesisRisk: {
          lead: 'The main risk is whether T-Mobile US, Inc. can keep telecom / wireless evidence strong while the key risk factors stay contained.',
          riskMap: [
            {
              label: 'Demand / growth',
              severity: 'High',
              watch: 'Wireless competition.'
            },
            {
              label: 'Margin / economics',
              severity: 'High',
              watch: 'churn.'
            },
            {
              label: 'Execution',
              severity: 'Medium',
              watch: 'ARPU.'
            },
            {
              label: 'Cash flow / risk',
              severity: 'Medium',
              watch: 'network spending.'
            }
          ],
          evidenceNeeded: [
            'revenue growth',
            'segment performance',
            'customer demand',
            'margin',
            'cash flow',
            'risk factor changes'
          ]
        }
      }
    }
  },
  VZ: {
    ticker: 'VZ',
    companyName: 'Verizon Communications Inc.',
    exchange: 'NYSE',
    logoUrl: buildStockLogoUrl('VZ'),
    overview: 'Verizon provides wireless, broadband, and business communications services, with postpaid trends, churn, network quality, fixed wireless, debt, and capex as key evidence.',
    category: 'Telecom / Wireless & Broadband',
    analysisDate: '2026-06-11',
    latestFiscalPeriod: 'Q1 2026 ended 2026-03-31',
    dossierVerdict: {
      sourceType: 'curated',
      asOf: '2026-06-11',
      researchState: 'communications_cashflow_watch',
      businessQuality: 'medium',
      valuationState: 'not_verified',
      marketEvidence: 'not_verified',
      finalRead: 'Telecom / Wireless & Broadband where the thesis depends on Verizon provides wireless, broadband, and business communications services, with postpaid trends, churn, network quality, fixed wireless, debt, and capex as key evidence.',
      keySupport: [
        'SEC source pack identifies Verizon Communications Inc. as Telecom / Wireless & Broadband.',
        'Verizon provides wireless, broadband, and business communications services, with postpaid trends, churn, network quality, fixed wireless, debt, and capex as key evidence.',
        'Latest primary-source filing reviewed: SEC latest periodic filing.'
      ],
      keyRisk: [
        'Wireless competition.',
        'churn.',
        'ARPU.',
        'consumer and business demand.'
      ]
    },
    valueCore: {
      ticker: 'VZ',
      value_core_type: 'Telecom / Wireless & Broadband',
      company_stage_candidate: 'Telecom / Wireless & Broadband',
      primary_value_driver: 'Verizon provides wireless, broadband, and business communications services, with postpaid trends, churn, network quality, fixed wireless, debt, and capex as key evidence.',
      thesis_break_trigger: 'The thesis weakens if wireless competition. churn. ARPU. consumer and business demand.',
      evidence_needed: [
        'revenue growth',
        'segment performance',
        'customer demand',
        'margin',
        'cash flow',
        'risk factor changes'
      ],
      evidence_quality: 'Partial',
      dossier_state: 'curated_profile_batch_9',
      frontend_label: 'Curated',
      coverage_status: 'Curated',
      needs_human_review: false,
      source: 'SEC 10-K / 10-Q'
    },
    visualPhaseOne: {
      faq: {
        overview: [
          {
            question: 'What does VZ do?',
            answer: 'Verizon provides wireless, broadband, and business communications services, with postpaid trends, churn, network quality, fixed wireless, debt, and capex as key evidence.'
          }
        ],
        thesisRisk: [
          {
            question: 'What would break the VZ thesis?',
            answer: 'The thesis weakens if wireless competition. churn. ARPU. consumer and business demand.'
          }
        ]
      },
      phaseTwo: {
        thesisRisk: {
          lead: 'The main risk is whether Verizon Communications Inc. can keep telecom / wireless & broadband evidence strong while the key risk factors stay contained.',
          riskMap: [
            {
              label: 'Demand / growth',
              severity: 'High',
              watch: 'Wireless competition.'
            },
            {
              label: 'Margin / economics',
              severity: 'High',
              watch: 'churn.'
            },
            {
              label: 'Execution',
              severity: 'Medium',
              watch: 'ARPU.'
            },
            {
              label: 'Cash flow / risk',
              severity: 'Medium',
              watch: 'consumer and business demand.'
            }
          ],
          evidenceNeeded: [
            'revenue growth',
            'segment performance',
            'customer demand',
            'margin',
            'cash flow',
            'risk factor changes'
          ]
        }
      }
    }
  },
  CMCSA: {
    ticker: 'CMCSA',
    companyName: 'Comcast Corporation',
    exchange: 'NASDAQ',
    logoUrl: buildStockLogoUrl('CMCSA'),
    overview: 'Comcast combines broadband, cable, media, streaming, film, theme parks, and connectivity assets, with broadband trends and media profitability as central evidence.',
    category: 'Connectivity / Media',
    analysisDate: '2026-06-11',
    latestFiscalPeriod: 'Q1 2026 ended 2026-03-31',
    dossierVerdict: {
      sourceType: 'curated',
      asOf: '2026-06-11',
      researchState: 'business_evidence_watch',
      businessQuality: 'high',
      valuationState: 'not_verified',
      marketEvidence: 'not_verified',
      finalRead: 'Connectivity / Media where the thesis depends on Comcast combines broadband, cable, media, streaming, film, theme parks, and connectivity assets, with broadband trends and media profitability as central evidence.',
      keySupport: [
        'SEC source pack identifies Comcast Corporation as Connectivity / Media.',
        'Comcast combines broadband, cable, media, streaming, film, theme parks, and connectivity assets, with broadband trends and media profitability as central evidence.',
        'Latest primary-source filing reviewed: SEC latest periodic filing.'
      ],
      keyRisk: [
        'Broadband subscriber losses.',
        'cord-cutting.',
        'streaming economics.',
        'advertising.'
      ]
    },
    valueCore: {
      ticker: 'CMCSA',
      value_core_type: 'Connectivity / Media',
      company_stage_candidate: 'Connectivity / Media',
      primary_value_driver: 'Comcast combines broadband, cable, media, streaming, film, theme parks, and connectivity assets, with broadband trends and media profitability as central evidence.',
      thesis_break_trigger: 'The thesis weakens if broadband subscriber losses. cord-cutting. streaming economics. advertising.',
      evidence_needed: [
        'revenue growth',
        'segment performance',
        'customer demand',
        'margin',
        'cash flow',
        'risk factor changes'
      ],
      evidence_quality: 'Partial',
      dossier_state: 'curated_profile_batch_9',
      frontend_label: 'Curated',
      coverage_status: 'Curated',
      needs_human_review: false,
      source: 'SEC 10-K / 10-Q'
    },
    visualPhaseOne: {
      faq: {
        overview: [
          {
            question: 'What does CMCSA do?',
            answer: 'Comcast combines broadband, cable, media, streaming, film, theme parks, and connectivity assets, with broadband trends and media profitability as central evidence.'
          }
        ],
        thesisRisk: [
          {
            question: 'What would break the CMCSA thesis?',
            answer: 'The thesis weakens if broadband subscriber losses. cord-cutting. streaming economics. advertising.'
          }
        ]
      },
      phaseTwo: {
        thesisRisk: {
          lead: 'The main risk is whether Comcast Corporation can keep connectivity / media evidence strong while the key risk factors stay contained.',
          riskMap: [
            {
              label: 'Demand / growth',
              severity: 'High',
              watch: 'Broadband subscriber losses.'
            },
            {
              label: 'Margin / economics',
              severity: 'High',
              watch: 'cord-cutting.'
            },
            {
              label: 'Execution',
              severity: 'Medium',
              watch: 'streaming economics.'
            },
            {
              label: 'Cash flow / risk',
              severity: 'Medium',
              watch: 'advertising.'
            }
          ],
          evidenceNeeded: [
            'revenue growth',
            'segment performance',
            'customer demand',
            'margin',
            'cash flow',
            'risk factor changes'
          ]
        }
      }
    }
  },
  NEE: {
    ticker: 'NEE',
    companyName: 'NextEra Energy, Inc.',
    exchange: 'NYSE',
    logoUrl: buildStockLogoUrl('NEE'),
    overview: 'NextEra Energy combines regulated utility operations at Florida Power & Light with renewable energy and infrastructure development through NextEra Energy Resources.',
    category: 'Utility / Renewable Power',
    analysisDate: '2026-06-11',
    latestFiscalPeriod: 'Q1 2026 ended 2026-03-31',
    dossierVerdict: {
      sourceType: 'curated',
      asOf: '2026-06-11',
      researchState: 'regulated_utility_watch',
      businessQuality: 'high',
      valuationState: 'not_verified',
      marketEvidence: 'not_verified',
      finalRead: 'Utility / Renewable Power where the thesis depends on NextEra Energy combines regulated utility operations at Florida Power & Light with renewable energy and infrastructure development through NextEra Energy Resources.',
      keySupport: [
        'SEC source pack identifies NextEra Energy, Inc. as Utility / Renewable Power.',
        'NextEra Energy combines regulated utility operations at Florida Power & Light with renewable energy and infrastructure development through NextEra Energy Resources.',
        'Latest primary-source filing reviewed: SEC latest periodic filing.'
      ],
      keyRisk: [
        'Rate cases.',
        'renewables execution.',
        'power demand.',
        'financing cost.'
      ]
    },
    valueCore: {
      ticker: 'NEE',
      value_core_type: 'Utility / Renewable Power',
      company_stage_candidate: 'Utility / Renewable Power',
      primary_value_driver: 'NextEra Energy combines regulated utility operations at Florida Power & Light with renewable energy and infrastructure development through NextEra Energy Resources.',
      thesis_break_trigger: 'The thesis weakens if rate cases. renewables execution. power demand. financing cost.',
      evidence_needed: [
        'revenue growth',
        'segment performance',
        'customer demand',
        'margin',
        'cash flow',
        'risk factor changes'
      ],
      evidence_quality: 'Partial',
      dossier_state: 'curated_profile_batch_9',
      frontend_label: 'Curated',
      coverage_status: 'Curated',
      needs_human_review: false,
      source: 'SEC 10-K / 10-Q'
    },
    visualPhaseOne: {
      faq: {
        overview: [
          {
            question: 'What does NEE do?',
            answer: 'NextEra Energy combines regulated utility operations at Florida Power & Light with renewable energy and infrastructure development through NextEra Energy Resources.'
          }
        ],
        thesisRisk: [
          {
            question: 'What would break the NEE thesis?',
            answer: 'The thesis weakens if rate cases. renewables execution. power demand. financing cost.'
          }
        ]
      },
      phaseTwo: {
        thesisRisk: {
          lead: 'The main risk is whether NextEra Energy, Inc. can keep utility / renewable power evidence strong while the key risk factors stay contained.',
          riskMap: [
            {
              label: 'Demand / growth',
              severity: 'High',
              watch: 'Rate cases.'
            },
            {
              label: 'Margin / economics',
              severity: 'High',
              watch: 'renewables execution.'
            },
            {
              label: 'Execution',
              severity: 'Medium',
              watch: 'power demand.'
            },
            {
              label: 'Cash flow / risk',
              severity: 'Medium',
              watch: 'financing cost.'
            }
          ],
          evidenceNeeded: [
            'revenue growth',
            'segment performance',
            'customer demand',
            'margin',
            'cash flow',
            'risk factor changes'
          ]
        }
      }
    }
  },
  AEP: {
    ticker: 'AEP',
    companyName: 'American Electric Power Company, Inc.',
    exchange: 'NASDAQ',
    logoUrl: buildStockLogoUrl('AEP'),
    overview: 'American Electric Power is a regulated electric utility holding company focused on transmission, distribution, generation, load growth, rate base, and reliability.',
    category: 'Regulated Electric Utility',
    analysisDate: '2026-06-11',
    latestFiscalPeriod: 'Q1 2026 ended 2026-03-31',
    dossierVerdict: {
      sourceType: 'curated',
      asOf: '2026-06-11',
      researchState: 'regulated_utility_watch',
      businessQuality: 'high',
      valuationState: 'not_verified',
      marketEvidence: 'not_verified',
      finalRead: 'Regulated Electric Utility where the thesis depends on American Electric Power is a regulated electric utility holding company focused on transmission, distribution, generation, load growth, rate base, and reliability.',
      keySupport: [
        'SEC source pack identifies American Electric Power Company, Inc. as Regulated Electric Utility.',
        'American Electric Power is a regulated electric utility holding company focused on transmission, distribution, generation, load growth, rate base, and reliability.',
        'Latest primary-source filing reviewed: SEC latest periodic filing.'
      ],
      keyRisk: [
        'Rate cases.',
        'regulatory outcomes.',
        'capex execution.',
        'interest rates.'
      ]
    },
    valueCore: {
      ticker: 'AEP',
      value_core_type: 'Regulated Electric Utility',
      company_stage_candidate: 'Regulated Electric Utility',
      primary_value_driver: 'American Electric Power is a regulated electric utility holding company focused on transmission, distribution, generation, load growth, rate base, and reliability.',
      thesis_break_trigger: 'The thesis weakens if rate cases. regulatory outcomes. capex execution. interest rates.',
      evidence_needed: [
        'revenue growth',
        'segment performance',
        'customer demand',
        'margin',
        'cash flow',
        'risk factor changes'
      ],
      evidence_quality: 'Partial',
      dossier_state: 'curated_profile_batch_9',
      frontend_label: 'Curated',
      coverage_status: 'Curated',
      needs_human_review: false,
      source: 'SEC 10-K / 10-Q'
    },
    visualPhaseOne: {
      faq: {
        overview: [
          {
            question: 'What does AEP do?',
            answer: 'American Electric Power is a regulated electric utility holding company focused on transmission, distribution, generation, load growth, rate base, and reliability.'
          }
        ],
        thesisRisk: [
          {
            question: 'What would break the AEP thesis?',
            answer: 'The thesis weakens if rate cases. regulatory outcomes. capex execution. interest rates.'
          }
        ]
      },
      phaseTwo: {
        thesisRisk: {
          lead: 'The main risk is whether American Electric Power Company, Inc. can keep regulated electric utility evidence strong while the key risk factors stay contained.',
          riskMap: [
            {
              label: 'Demand / growth',
              severity: 'High',
              watch: 'Rate cases.'
            },
            {
              label: 'Margin / economics',
              severity: 'High',
              watch: 'regulatory outcomes.'
            },
            {
              label: 'Execution',
              severity: 'Medium',
              watch: 'capex execution.'
            },
            {
              label: 'Cash flow / risk',
              severity: 'Medium',
              watch: 'interest rates.'
            }
          ],
          evidenceNeeded: [
            'revenue growth',
            'segment performance',
            'customer demand',
            'margin',
            'cash flow',
            'risk factor changes'
          ]
        }
      }
    }
  },
  AMT: {
    ticker: 'AMT',
    companyName: 'American Tower Corporation',
    exchange: 'NYSE',
    logoUrl: buildStockLogoUrl('AMT'),
    overview: 'American Tower is a communications real estate company whose tower leases depend on carrier network investment, tenant demand, contract escalators, and international execution.',
    category: 'Communications Real Estate',
    analysisDate: '2026-06-11',
    latestFiscalPeriod: 'Q1 2026 ended 2026-03-31',
    dossierVerdict: {
      sourceType: 'curated',
      asOf: '2026-06-11',
      researchState: 'communications_cashflow_watch',
      businessQuality: 'high',
      valuationState: 'not_verified',
      marketEvidence: 'not_verified',
      finalRead: 'Communications Real Estate where the thesis depends on American Tower is a communications real estate company whose tower leases depend on carrier network investment, tenant demand, contract escalators, and international execution.',
      keySupport: [
        'SEC source pack identifies American Tower Corporation as Communications Real Estate.',
        'American Tower is a communications real estate company whose tower leases depend on carrier network investment, tenant demand, contract escalators, and international execution.',
        'Latest primary-source filing reviewed: SEC latest periodic filing.'
      ],
      keyRisk: [
        'Carrier capex.',
        'tenant churn.',
        'interest rates.',
        'leverage.'
      ]
    },
    valueCore: {
      ticker: 'AMT',
      value_core_type: 'Communications Real Estate',
      company_stage_candidate: 'Communications Real Estate',
      primary_value_driver: 'American Tower is a communications real estate company whose tower leases depend on carrier network investment, tenant demand, contract escalators, and international execution.',
      thesis_break_trigger: 'The thesis weakens if carrier capex. tenant churn. interest rates. leverage.',
      evidence_needed: [
        'revenue growth',
        'segment performance',
        'customer demand',
        'margin',
        'cash flow',
        'risk factor changes'
      ],
      evidence_quality: 'Partial',
      dossier_state: 'curated_profile_batch_9',
      frontend_label: 'Curated',
      coverage_status: 'Curated',
      needs_human_review: false,
      source: 'SEC 10-K / 10-Q'
    },
    visualPhaseOne: {
      faq: {
        overview: [
          {
            question: 'What does AMT do?',
            answer: 'American Tower is a communications real estate company whose tower leases depend on carrier network investment, tenant demand, contract escalators, and international execution.'
          }
        ],
        thesisRisk: [
          {
            question: 'What would break the AMT thesis?',
            answer: 'The thesis weakens if carrier capex. tenant churn. interest rates. leverage.'
          }
        ]
      },
      phaseTwo: {
        thesisRisk: {
          lead: 'The main risk is whether American Tower Corporation can keep communications real estate evidence strong while the key risk factors stay contained.',
          riskMap: [
            {
              label: 'Demand / growth',
              severity: 'High',
              watch: 'Carrier capex.'
            },
            {
              label: 'Margin / economics',
              severity: 'High',
              watch: 'tenant churn.'
            },
            {
              label: 'Execution',
              severity: 'Medium',
              watch: 'interest rates.'
            },
            {
              label: 'Cash flow / risk',
              severity: 'Medium',
              watch: 'leverage.'
            }
          ],
          evidenceNeeded: [
            'revenue growth',
            'segment performance',
            'customer demand',
            'margin',
            'cash flow',
            'risk factor changes'
          ]
        }
      }
    }
  },
  LIN: {
    ticker: 'LIN',
    companyName: 'Linde plc',
    exchange: 'NASDAQ',
    logoUrl: buildStockLogoUrl('LIN'),
    overview: 'Linde is a global industrial gases company serving chemicals, manufacturing, metals, healthcare, electronics, energy, and other end markets through long-term supply models.',
    category: 'Industrial Gases',
    analysisDate: '2026-06-11',
    latestFiscalPeriod: 'Q1 2026 ended 2026-03-31',
    dossierVerdict: {
      sourceType: 'curated',
      asOf: '2026-06-11',
      researchState: 'business_evidence_watch',
      businessQuality: 'high',
      valuationState: 'not_verified',
      marketEvidence: 'not_verified',
      finalRead: 'Industrial Gases where the thesis depends on Linde is a global industrial gases company serving chemicals, manufacturing, metals, healthcare, electronics, energy, and other end markets through long-term supply models.',
      keySupport: [
        'SEC source pack identifies Linde plc as Industrial Gases.',
        'Linde is a global industrial gases company serving chemicals, manufacturing, metals, healthcare, electronics, energy, and other end markets through long-term supply models.',
        'Latest primary-source filing reviewed: SEC latest periodic filing.'
      ],
      keyRisk: [
        'Industrial demand.',
        'energy costs.',
        'project execution.',
        'pricing.'
      ]
    },
    valueCore: {
      ticker: 'LIN',
      value_core_type: 'Industrial Gases',
      company_stage_candidate: 'Industrial Gases',
      primary_value_driver: 'Linde is a global industrial gases company serving chemicals, manufacturing, metals, healthcare, electronics, energy, and other end markets through long-term supply models.',
      thesis_break_trigger: 'The thesis weakens if industrial demand. energy costs. project execution. pricing.',
      evidence_needed: [
        'revenue growth',
        'segment performance',
        'customer demand',
        'margin',
        'cash flow',
        'risk factor changes'
      ],
      evidence_quality: 'Partial',
      dossier_state: 'curated_profile_batch_9',
      frontend_label: 'Curated',
      coverage_status: 'Curated',
      needs_human_review: false,
      source: 'SEC 10-K / 10-Q'
    },
    visualPhaseOne: {
      faq: {
        overview: [
          {
            question: 'What does LIN do?',
            answer: 'Linde is a global industrial gases company serving chemicals, manufacturing, metals, healthcare, electronics, energy, and other end markets through long-term supply models.'
          }
        ],
        thesisRisk: [
          {
            question: 'What would break the LIN thesis?',
            answer: 'The thesis weakens if industrial demand. energy costs. project execution. pricing.'
          }
        ]
      },
      phaseTwo: {
        thesisRisk: {
          lead: 'The main risk is whether Linde plc can keep industrial gases evidence strong while the key risk factors stay contained.',
          riskMap: [
            {
              label: 'Demand / growth',
              severity: 'High',
              watch: 'Industrial demand.'
            },
            {
              label: 'Margin / economics',
              severity: 'High',
              watch: 'energy costs.'
            },
            {
              label: 'Execution',
              severity: 'Medium',
              watch: 'project execution.'
            },
            {
              label: 'Cash flow / risk',
              severity: 'Medium',
              watch: 'pricing.'
            }
          ],
          evidenceNeeded: [
            'revenue growth',
            'segment performance',
            'customer demand',
            'margin',
            'cash flow',
            'risk factor changes'
          ]
        }
      }
    }
  },
  UPS: {
    ticker: 'UPS',
    companyName: 'United Parcel Service, Inc.',
    exchange: 'NYSE',
    logoUrl: buildStockLogoUrl('UPS'),
    overview: 'United Parcel Service is a global package delivery and logistics company where volume, yield, labor cost, network efficiency, and e-commerce mix drive evidence.',
    category: 'Logistics / Parcel Delivery',
    analysisDate: '2026-06-11',
    latestFiscalPeriod: 'Q1 2026 ended 2026-03-31',
    dossierVerdict: {
      sourceType: 'curated',
      asOf: '2026-06-11',
      researchState: 'business_evidence_watch',
      businessQuality: 'medium',
      valuationState: 'not_verified',
      marketEvidence: 'not_verified',
      finalRead: 'Logistics / Parcel Delivery where the thesis depends on United Parcel Service is a global package delivery and logistics company where volume, yield, labor cost, network efficiency, and e-commerce mix drive evidence.',
      keySupport: [
        'SEC source pack identifies United Parcel Service, Inc. as Logistics / Parcel Delivery.',
        'United Parcel Service is a global package delivery and logistics company where volume, yield, labor cost, network efficiency, and e-commerce mix drive evidence.',
        'Latest primary-source filing reviewed: SEC latest periodic filing.'
      ],
      keyRisk: [
        'Package volume.',
        'pricing.',
        'labor costs.',
        'fuel.'
      ]
    },
    valueCore: {
      ticker: 'UPS',
      value_core_type: 'Logistics / Parcel Delivery',
      company_stage_candidate: 'Logistics / Parcel Delivery',
      primary_value_driver: 'United Parcel Service is a global package delivery and logistics company where volume, yield, labor cost, network efficiency, and e-commerce mix drive evidence.',
      thesis_break_trigger: 'The thesis weakens if package volume. pricing. labor costs. fuel.',
      evidence_needed: [
        'revenue growth',
        'segment performance',
        'customer demand',
        'margin',
        'cash flow',
        'risk factor changes'
      ],
      evidence_quality: 'Partial',
      dossier_state: 'curated_profile_batch_9',
      frontend_label: 'Curated',
      coverage_status: 'Curated',
      needs_human_review: false,
      source: 'SEC 10-K / 10-Q'
    },
    visualPhaseOne: {
      faq: {
        overview: [
          {
            question: 'What does UPS do?',
            answer: 'United Parcel Service is a global package delivery and logistics company where volume, yield, labor cost, network efficiency, and e-commerce mix drive evidence.'
          }
        ],
        thesisRisk: [
          {
            question: 'What would break the UPS thesis?',
            answer: 'The thesis weakens if package volume. pricing. labor costs. fuel.'
          }
        ]
      },
      phaseTwo: {
        thesisRisk: {
          lead: 'The main risk is whether United Parcel Service, Inc. can keep logistics / parcel delivery evidence strong while the key risk factors stay contained.',
          riskMap: [
            {
              label: 'Demand / growth',
              severity: 'High',
              watch: 'Package volume.'
            },
            {
              label: 'Margin / economics',
              severity: 'High',
              watch: 'pricing.'
            },
            {
              label: 'Execution',
              severity: 'Medium',
              watch: 'labor costs.'
            },
            {
              label: 'Cash flow / risk',
              severity: 'Medium',
              watch: 'fuel.'
            }
          ],
          evidenceNeeded: [
            'revenue growth',
            'segment performance',
            'customer demand',
            'margin',
            'cash flow',
            'risk factor changes'
          ]
        }
      }
    }
  },
  SBUX: {
    ticker: 'SBUX',
    companyName: 'Starbucks Corporation',
    exchange: 'NASDAQ',
    logoUrl: buildStockLogoUrl('SBUX'),
    overview: 'Starbucks operates company-operated and licensed coffee stores globally, with comparable sales, transactions, ticket, store economics, China, and brand strength as key evidence.',
    category: 'Restaurants / Coffee Retail',
    analysisDate: '2026-06-11',
    latestFiscalPeriod: 'Q2 FY2026 ended 2026-03-29',
    dossierVerdict: {
      sourceType: 'curated',
      asOf: '2026-06-11',
      researchState: 'consumer_demand_watch',
      businessQuality: 'high',
      valuationState: 'not_verified',
      marketEvidence: 'not_verified',
      finalRead: 'Restaurants / Coffee Retail where the thesis depends on Starbucks operates company-operated and licensed coffee stores globally, with comparable sales, transactions, ticket, store economics, China, and brand strength as key evidence.',
      keySupport: [
        'SEC source pack identifies Starbucks Corporation as Restaurants / Coffee Retail.',
        'Starbucks operates company-operated and licensed coffee stores globally, with comparable sales, transactions, ticket, store economics, China, and brand strength as key evidence.',
        'Latest primary-source filing reviewed: SEC latest periodic filing.'
      ],
      keyRisk: [
        'Traffic.',
        'value perception.',
        'China demand.',
        'labor and store operations.'
      ]
    },
    valueCore: {
      ticker: 'SBUX',
      value_core_type: 'Restaurants / Coffee Retail',
      company_stage_candidate: 'Restaurants / Coffee Retail',
      primary_value_driver: 'Starbucks operates company-operated and licensed coffee stores globally, with comparable sales, transactions, ticket, store economics, China, and brand strength as key evidence.',
      thesis_break_trigger: 'The thesis weakens if traffic. value perception. China demand. labor and store operations.',
      evidence_needed: [
        'revenue growth',
        'customer demand',
        'gross margin',
        'inventory and backlog',
        'capex or R&D execution',
        'free cash flow'
      ],
      evidence_quality: 'Partial',
      dossier_state: 'curated_profile_batch_9',
      frontend_label: 'Curated',
      coverage_status: 'Curated',
      needs_human_review: false,
      source: 'SEC 10-K / 10-Q'
    },
    visualPhaseOne: {
      faq: {
        overview: [
          {
            question: 'What does SBUX do?',
            answer: 'Starbucks operates company-operated and licensed coffee stores globally, with comparable sales, transactions, ticket, store economics, China, and brand strength as key evidence.'
          }
        ],
        thesisRisk: [
          {
            question: 'What would break the SBUX thesis?',
            answer: 'The thesis weakens if traffic. value perception. China demand. labor and store operations.'
          }
        ]
      },
      phaseTwo: {
        thesisRisk: {
          lead: 'The main risk is whether Starbucks Corporation can keep restaurants / coffee retail evidence strong while the key risk factors stay contained.',
          riskMap: [
            {
              label: 'Demand / growth',
              severity: 'High',
              watch: 'Traffic.'
            },
            {
              label: 'Margin / economics',
              severity: 'High',
              watch: 'value perception.'
            },
            {
              label: 'Execution',
              severity: 'Medium',
              watch: 'China demand.'
            },
            {
              label: 'Cash flow / risk',
              severity: 'Medium',
              watch: 'labor and store operations.'
            }
          ],
          evidenceNeeded: [
            'revenue growth',
            'customer demand',
            'gross margin',
            'inventory and backlog',
            'capex or R&D execution',
            'free cash flow'
          ]
        }
      }
    }
  },
  TMO: {
    ticker: 'TMO',
    companyName: 'Thermo Fisher Scientific Inc.',
    exchange: 'NYSE',
    logoUrl: buildStockLogoUrl('TMO'),
    overview: 'Thermo Fisher Scientific provides life sciences tools, analytical instruments, diagnostics, specialty diagnostics, laboratory products, and biopharma services.',
    category: 'Life Sciences Tools',
    analysisDate: '2026-06-11',
    latestFiscalPeriod: 'Q1 2026 ended 2026-03-28',
    dossierVerdict: {
      sourceType: 'curated',
      asOf: '2026-06-11',
      researchState: 'business_evidence_watch',
      businessQuality: 'high',
      valuationState: 'not_verified',
      marketEvidence: 'not_verified',
      finalRead: 'Life Sciences Tools where the thesis depends on Thermo Fisher Scientific provides life sciences tools, analytical instruments, diagnostics, specialty diagnostics, laboratory products, and biopharma services.',
      keySupport: [
        'SEC source pack identifies Thermo Fisher Scientific Inc. as Life Sciences Tools.',
        'Thermo Fisher Scientific provides life sciences tools, analytical instruments, diagnostics, specialty diagnostics, laboratory products, and biopharma services.',
        'Latest primary-source filing reviewed: SEC latest periodic filing.'
      ],
      keyRisk: [
        'Biopharma funding.',
        'customer destocking.',
        'diagnostics normalization.',
        'China demand.'
      ]
    },
    valueCore: {
      ticker: 'TMO',
      value_core_type: 'Life Sciences Tools',
      company_stage_candidate: 'Life Sciences Tools',
      primary_value_driver: 'Thermo Fisher Scientific provides life sciences tools, analytical instruments, diagnostics, specialty diagnostics, laboratory products, and biopharma services.',
      thesis_break_trigger: 'The thesis weakens if biopharma funding. customer destocking. diagnostics normalization. China demand.',
      evidence_needed: [
        'revenue growth',
        'segment performance',
        'customer demand',
        'margin',
        'cash flow',
        'risk factor changes'
      ],
      evidence_quality: 'Partial',
      dossier_state: 'curated_profile_batch_9',
      frontend_label: 'Curated',
      coverage_status: 'Curated',
      needs_human_review: false,
      source: 'SEC 10-K / 10-Q'
    },
    visualPhaseOne: {
      faq: {
        overview: [
          {
            question: 'What does TMO do?',
            answer: 'Thermo Fisher Scientific provides life sciences tools, analytical instruments, diagnostics, specialty diagnostics, laboratory products, and biopharma services.'
          }
        ],
        thesisRisk: [
          {
            question: 'What would break the TMO thesis?',
            answer: 'The thesis weakens if biopharma funding. customer destocking. diagnostics normalization. China demand.'
          }
        ]
      },
      phaseTwo: {
        thesisRisk: {
          lead: 'The main risk is whether Thermo Fisher Scientific Inc. can keep life sciences tools evidence strong while the key risk factors stay contained.',
          riskMap: [
            {
              label: 'Demand / growth',
              severity: 'High',
              watch: 'Biopharma funding.'
            },
            {
              label: 'Margin / economics',
              severity: 'High',
              watch: 'customer destocking.'
            },
            {
              label: 'Execution',
              severity: 'Medium',
              watch: 'diagnostics normalization.'
            },
            {
              label: 'Cash flow / risk',
              severity: 'Medium',
              watch: 'China demand.'
            }
          ],
          evidenceNeeded: [
            'revenue growth',
            'segment performance',
            'customer demand',
            'margin',
            'cash flow',
            'risk factor changes'
          ]
        }
      }
    }
  },
  ABNB: {
    ticker: 'ABNB',
    companyName: 'Airbnb, Inc.',
    exchange: 'NASDAQ',
    logoUrl: buildStockLogoUrl('ABNB'),
    overview: 'Airbnb operates a global travel marketplace that connects hosts and guests for lodging and experiences.',
    category: 'Travel & Lodging Platform',
    analysisDate: '2026-06-11',
    latestFiscalPeriod: 'Q1 2026 ended 2026-03-31',
    dossierVerdict: {
      sourceType: 'curated',
      asOf: '2026-06-11',
      researchState: 'platform_watch',
      businessQuality: 'high',
      valuationState: 'not_verified',
      marketEvidence: 'not_verified',
      finalRead: 'Travel booking marketplace where the thesis depends on nights booked growth, GBV, take rate stability, supply expansion, and regulatory limits.',
      keySupport: [
        'SEC filings describe Airbnb as a global marketplace for travel lodging and experiences.',
        'The company earns revenue through transaction service fees charged to hosts and guests on bookings.',
        'Growth in nights booked and Gross Booking Value are primary drivers of financial health.'
      ],
      keyRisk: [
        'Local regulations and restrictions on short-term rentals can limit supply growth in key cities.',
        'Macroeconomic factors or slower travel demand can compress booking volumes.',
        'Competition from traditional lodging and alternative online travel platforms can pressure take rates.'
      ]
    },
    valueCore: {
      ticker: 'ABNB',
      value_core_type: 'Travel booking marketplace',
      company_stage_candidate: 'Established marketplace',
      primary_value_driver: 'Nights booked expansion, Gross Booking Value (GBV), take rate stability, and host supply growth',
      thesis_break_trigger: 'Nights booked growth slows materially, GBV growth stalls, local regulations severely restrict short-term rental supply, or take rate compresses',
      evidence_needed: [
        'Nights and experiences booked growth',
        'Gross Booking Value',
        'average daily rate trends',
        'take rate sustainability',
        'host supply and retention metrics',
        'local regulatory changes'
      ],
      evidence_quality: 'Partial',
      dossier_state: 'curated_profile_batch_10',
      frontend_label: 'Curated',
      coverage_status: 'Curated',
      needs_human_review: false,
      source: 'SEC 10-K / 10-Q'
    },
    visualPhaseOne: {
      faq: {
        overview: [
          {
            question: 'What does ABNB do?',
            answer: 'Airbnb runs a global online travel marketplace connecting hosts and guests for lodging and experiences. It operates as a transaction fee business.'
          }
        ],
        thesisRisk: [
          {
            question: 'What would break the ABNB thesis?',
            answer: 'The thesis weakens if nights booked and GBV growth decelerate, local short-term rental regulations impair host supply, or ADR / take rates drop.'
          }
        ]
      },
      phaseTwo: {
        thesisRisk: {
          lead: 'The primary risk centers on regulatory restrictions limiting hosting supply and travel demand cyclicality.',
          riskMap: [
            {
              label: 'Regulatory constraints',
              severity: 'High',
              watch: 'New short-term rental regulations in key municipal markets.'
            },
            {
              label: 'Booking growth deceleration',
              severity: 'High',
              watch: 'Nights booked growth drops below double digits.'
            },
            {
              label: 'ADR & take rate compression',
              severity: 'Medium',
              watch: 'Average daily rate decreases or competitive fee pressures limit take rate.'
            }
          ],
          evidenceNeeded: [
            'Nights and experiences booked growth',
            'Gross Booking Value',
            'average daily rate trends',
            'take rate sustainability',
            'host supply and retention metrics',
            'local regulatory changes'
          ]
        }
      }
    }
  },
  ABT: {
    ticker: 'ABT',
    companyName: 'Abbott Laboratories',
    exchange: 'NYSE',
    logoUrl: buildStockLogoUrl('ABT'),
    overview: 'Abbott Laboratories is a diversified global healthcare company operating across medical devices, diagnostics, nutrition, and established pharmaceuticals.',
    category: 'Diversified Healthcare',
    analysisDate: '2026-06-11',
    latestFiscalPeriod: 'Q1 2026 ended 2026-03-31',
    dossierVerdict: {
      sourceType: 'curated',
      asOf: '2026-06-11',
      researchState: 'healthcare_watch',
      businessQuality: 'high',
      valuationState: 'not_verified',
      marketEvidence: 'not_verified',
      finalRead: 'Diversified healthcare platform where the thesis depends on medical device adoption, diagnostic sales normalization, and nutritional margin improvement.',
      keySupport: [
        'SEC filings structure Abbott across Medical Devices, Diagnostics, Nutritional, and Established Pharmaceutical segments.',
        'Medical Devices growth is heavily supported by the FreeStyle Libre continuous glucose monitoring system.',
        'The segment mix provides defensive healthcare cash flows and multiple product drivers.'
      ],
      keyRisk: [
        'Slowing medical device adoption or unfavorable structural heart market trends can impact growth.',
        'Nutritional product supply chain risks or recalls can damage brand reputation and margins.',
        'Diagnostics demand normalization post-pandemic and FX headwinds can create short-term volatility.'
      ]
    },
    valueCore: {
      ticker: 'ABT',
      value_core_type: 'Diversified healthcare platform',
      company_stage_candidate: 'Established compounder',
      primary_value_driver: 'Medical device growth (FreeStyle Libre), diagnostic sales stability, nutritional margins, and geographic expansion',
      thesis_break_trigger: 'Medical device adoption slows, nutritional margin recovery fails, product liability or recalls occur, or FX impacts offset segment growth',
      evidence_needed: [
        'Medical Devices segment organic sales growth',
        'FreeStyle Libre sales volume',
        'Diagnostics segment sales stability',
        'Nutritional segment gross margin',
        'FX currency impact disclosures',
        'Acquisition integration progress (Exact Sciences)'
      ],
      evidence_quality: 'Partial',
      dossier_state: 'curated_profile_batch_10',
      frontend_label: 'Curated',
      coverage_status: 'Curated',
      needs_human_review: false,
      source: 'SEC 10-K / 10-Q'
    },
    visualPhaseOne: {
      faq: {
        overview: [
          {
            question: 'What does ABT do?',
            answer: 'Abbott Laboratories operates a diversified healthcare business. It sells medical devices, diagnostics, nutritional products, and branded generic pharmaceuticals globally.'
          }
        ],
        thesisRisk: [
          {
            question: 'What would break the ABT thesis?',
            answer: 'The thesis weakens if core medical devices like FreeStyle Libre experience growth slowdown, nutritional margins fail to recover, or product safety issues emerge.'
          }
        ]
      },
      phaseTwo: {
        thesisRisk: {
          lead: 'The main risk relates to device pipeline adoption, diagnostic sales normalization, and product quality controls.',
          riskMap: [
            {
              label: 'Device adoption slowdown',
              severity: 'High',
              watch: 'Organic Medical Devices segment growth falls below expectations.'
            },
            {
              label: 'Nutritional recalls / brand damage',
              severity: 'Medium',
              watch: 'Quality control issues or regulatory audits of manufacturing facilities.'
            },
            {
              label: 'Diagnostics normalization / debt integration',
              severity: 'Medium',
              watch: 'Diagnostics revenue decline or leverage pressure from financing the Exact Sciences acquisition.'
            }
          ],
          evidenceNeeded: [
            'Medical Devices segment organic sales growth',
            'FreeStyle Libre sales volume',
            'Diagnostics segment sales stability',
            'Nutritional segment gross margin',
            'FX currency impact disclosures',
            'Acquisition integration progress (Exact Sciences)'
          ]
        }
      }
    }
  },
  ACN: {
    ticker: 'ACN',
    companyName: 'Accenture plc',
    exchange: 'NYSE',
    logoUrl: buildStockLogoUrl('ACN'),
    overview: 'Accenture is a global professional services company providing consulting, technology, and managed services.',
    category: 'Technology Consulting / Services',
    analysisDate: '2026-06-11',
    latestFiscalPeriod: 'Q2 FY2026 ended 2026-02-28',
    dossierVerdict: {
      sourceType: 'curated',
      asOf: '2026-06-11',
      researchState: 'enterprise_spend_watch',
      businessQuality: 'high',
      valuationState: 'not_verified',
      marketEvidence: 'not_verified',
      finalRead: 'Enterprise consulting platform where the thesis depends on bookings momentum, client discretionary spend, and utilization rates.',
      keySupport: [
        'SEC filings group Accenture by geographic markets and client industry groups.',
        'Managed services provide recurring revenue streams beside project-based consulting.',
        'The company is positioned as a primary integration partner for enterprise cloud, security, and GenAI transformation.'
      ],
      keyRisk: [
        'Slowing corporate IT budgets or deferral of discretionary consulting projects can impact bookings.',
        'Inability to monetize GenAI consulting rapidly enough to offset legacy IT consulting slowdown.',
        'Wage inflation and employee utilization volatility can pressure operating margins.'
      ]
    },
    valueCore: {
      ticker: 'ACN',
      value_core_type: 'IT consulting & managed services',
      company_stage_candidate: 'Established global platform',
      primary_value_driver: 'Consulting new bookings, billing rates, managed services backlog, and utilization rates',
      thesis_break_trigger: 'New bookings decelerate, client discretionary project spending cuts, utilization rates drop, or wage inflation compresses margins',
      evidence_needed: [
        'New bookings by segment (Consulting vs Managed Services)',
        'enterprise IT discretionary spending sentiment',
        'GenAI pipeline and booking conversion',
        'employee utilization rates',
        'consulting billing rates',
        'operating margin trends'
      ],
      evidence_quality: 'Partial',
      dossier_state: 'curated_profile_batch_10',
      frontend_label: 'Curated',
      coverage_status: 'Curated',
      needs_human_review: false,
      source: 'SEC 10-K / 10-Q'
    },
    visualPhaseOne: {
      faq: {
        overview: [
          {
            question: 'What does ACN do?',
            answer: 'Accenture provides professional services across consulting, strategy, digital, technology, and operations. It helps large organizations transform their operations and IT systems.'
          }
        ],
        thesisRisk: [
          {
            question: 'What would break the ACN thesis?',
            answer: 'The thesis weakens if corporate clients pull back on discretionary IT and digital transformation projects, or if labor costs increase faster than billing rates.'
          }
        ]
      },
      phaseTwo: {
        thesisRisk: {
          lead: 'The core risk is cyclicality in enterprise IT discretionary budgets and tech bookings conversion.',
          riskMap: [
            {
              label: 'IT spend slowdown',
              severity: 'High',
              watch: 'Consulting segment bookings deceleration or deal delay.'
            },
            {
              label: 'Margin pressure',
              severity: 'Medium',
              watch: 'Operating margin declines due to employee utilization drops or labor inflation.'
            },
            {
              label: 'GenAI monetization lag',
              severity: 'Medium',
              watch: 'GenAI-related bookings fail to translate into substantial revenue growth.'
            }
          ],
          evidenceNeeded: [
            'New bookings by segment (Consulting vs Managed Services)',
            'enterprise IT discretionary spending sentiment',
            'GenAI pipeline and booking conversion',
            'employee utilization rates',
            'consulting billing rates',
            'operating margin trends'
          ]
        }
      }
    }
  },
  ADI: {
    ticker: 'ADI',
    companyName: 'Analog Devices, Inc.',
    exchange: 'NASDAQ',
    logoUrl: buildStockLogoUrl('ADI'),
    overview: 'Analog Devices designs, manufactures, and markets high-performance analog, mixed-signal, and digital signal processing integrated circuits.',
    category: 'Analog Semiconductors',
    analysisDate: '2026-06-11',
    latestFiscalPeriod: 'Q2 FY2026 ended 2026-05-02',
    dossierVerdict: {
      sourceType: 'curated',
      asOf: '2026-06-11',
      researchState: 'semiconductor_cycle_watch',
      businessQuality: 'high',
      valuationState: 'not_verified',
      marketEvidence: 'not_verified',
      finalRead: 'Analog semiconductor provider where the thesis depends on industrial & automotive demand cycles, fab utilization, and gross margin durability.',
      keySupport: [
        'SEC filings describe ADI as a high-performance analog semiconductor provider with long product life cycles.',
        'Industrial and automotive applications represent the company\'s highest-margin segments.',
        'Custom design wins create high switching costs and customer integration.'
      ],
      keyRisk: [
        'Cyclical inventory corrections in industrial and automotive channels can depress volume.',
        'Fab capacity underutilization can quickly lead to gross margin contraction.',
        'Pricing pressure from competitors or design-win leakage can limit long-term profitability.'
      ]
    },
    valueCore: {
      ticker: 'ADI',
      value_core_type: 'Analog semiconductor provider',
      company_stage_candidate: 'Cyclical compounder',
      primary_value_driver: 'Industrial & automotive design wins, pricing stability, and gross margin durability',
      thesis_break_trigger: 'Industrial / automotive demand cyclical downturn, capacity underutilization compresses gross margin, or competitor pricing pressures ASPs',
      evidence_needed: [
        'Industrial segment revenue trends',
        'Automotive segment revenue trends',
        'gross margin and fab utilization rates',
        'channel inventory levels',
        'average selling prices (ASPs)',
        'design-win pipeline details'
      ],
      evidence_quality: 'Partial',
      dossier_state: 'curated_profile_batch_10',
      frontend_label: 'Curated',
      coverage_status: 'Curated',
      needs_human_review: false,
      source: 'SEC 10-K / 10-Q'
    },
    visualPhaseOne: {
      faq: {
        overview: [
          {
            question: 'What does ADI do?',
            answer: 'Analog Devices designs and builds analog, mixed-signal, and DSP chips that convert real-world signals (like temperature, pressure, sound, speed) into electrical signals.'
          }
        ],
        thesisRisk: [
          {
            question: 'What would break the ADI thesis?',
            answer: 'The thesis weakens if the industrial or automotive sectors undergo prolonged inventory corrections, causing lower fab utilization and compressing gross margins.'
          }
        ]
      },
      phaseTwo: {
        thesisRisk: {
          lead: 'The primary risk centers on macroeconomic semiconductor cycles and factory utilization operating leverage.',
          riskMap: [
            {
              label: 'Cyclical demand correction',
              severity: 'High',
              watch: 'Industrial and automotive segment revenue declines.'
            },
            {
              label: 'Gross margin compression',
              severity: 'High',
              watch: 'Gross margin falls below historic ranges due to capacity underutilization.'
            },
            {
              label: 'Competitor pricing / ASP pressure',
              severity: 'Medium',
              watch: 'Deterioration in ASPs or competitive displacement in major design wins.'
            }
          ],
          evidenceNeeded: [
            'Industrial segment revenue trends',
            'Automotive segment revenue trends',
            'gross margin and fab utilization rates',
            'channel inventory levels',
            'average selling prices (ASPs)',
            'design-win pipeline details'
          ]
        }
      }
    }
  },
  ADP: {
    ticker: 'ADP',
    companyName: 'Automatic Data Processing, Inc.',
    exchange: 'NASDAQ',
    logoUrl: buildStockLogoUrl('ADP'),
    overview: 'ADP provides cloud-based human capital management solutions, encompassing payroll, HR, and benefits administration.',
    category: 'HCM Solutions / Business Services',
    analysisDate: '2026-06-11',
    latestFiscalPeriod: 'Q3 FY2026 ended 2026-03-31',
    dossierVerdict: {
      sourceType: 'curated',
      asOf: '2026-06-11',
      researchState: 'employment_watch',
      businessQuality: 'high',
      valuationState: 'not_verified',
      marketEvidence: 'not_verified',
      finalRead: 'Payroll and HCM platform where the thesis depends on client retention, pays-per-control, and client fund float yield.',
      keySupport: [
        'SEC filings partition ADP into Employer Services and PEO Services segments.',
        'The business is highly recurring, driven by long-term customer relationships and payroll processing contracts.',
        'Cash balances held for client funds generate interest float income, enhancing earnings power.'
      ],
      keyRisk: [
        'Slowdown in employment growth or rising layoffs can reduce pays-per-control volume.',
        'Declining interest rates can decrease the yield earned on the client cash float.',
        'Security breaches or system outages in payroll infrastructure can lead to client churn and reputational harm.'
      ]
    },
    valueCore: {
      ticker: 'ADP',
      value_core_type: 'HCM software & services platform',
      company_stage_candidate: 'Established compounder',
      primary_value_driver: 'Employer Services client retention, pays-per-control growth, and client fund float yields',
      thesis_break_trigger: 'U.S. employment pays-per-control growth turns negative, interest rate cuts reduce client float yield, or key client retention deteriorates',
      evidence_needed: [
        'pays-per-control growth rate',
        'Employer Services client retention rate',
        'interest rate yield on client funds float',
        'PEO average worksite employees growth',
        'operating margin trends',
        'IT infrastructure and security spending'
      ],
      evidence_quality: 'Partial',
      dossier_state: 'curated_profile_batch_10',
      frontend_label: 'Curated',
      coverage_status: 'Curated',
      needs_human_review: false,
      source: 'SEC 10-K / 10-Q'
    },
    visualPhaseOne: {
      faq: {
        overview: [
          {
            question: 'What does ADP do?',
            answer: 'ADP is a global provider of cloud-based human capital management software and services, providing payroll, human resources, talent, and benefits administration.'
          }
        ],
        thesisRisk: [
          {
            question: 'What would break the ADP thesis?',
            answer: 'The thesis weakens if the employment market softens, causing a drop in payroll transaction volumes, or if interest rates fall, reducing float income.'
          }
        ]
      },
      phaseTwo: {
        thesisRisk: {
          lead: 'The primary risk is macroeconomic employment cyclicality and interest rate sensitivity of client funds float.',
          riskMap: [
            {
              label: 'Employment market slowdown',
              severity: 'High',
              watch: 'Identity of pays-per-control growth drops near or below zero.'
            },
            {
              label: 'Interest rate cuts / lower float yield',
              severity: 'Medium',
              watch: 'Interest income on client funds float falls due to central bank rate cuts.'
            },
            {
              label: 'Client retention deterioration',
              severity: 'Medium',
              watch: 'Employer Services retention rate falls below historic 90%+ averages.'
            }
          ],
          evidenceNeeded: [
            'pays-per-control growth rate',
            'Employer Services client retention rate',
            'interest rate yield on client funds float',
            'PEO average worksite employees growth',
            'operating margin trends',
            'IT infrastructure and security spending'
          ]
        }
      }
    }
  },
  ALNY: {
    ticker: 'ALNY',
    companyName: 'Alnylam Pharmaceuticals, Inc.',
    exchange: 'NASDAQ',
    logoUrl: buildStockLogoUrl('ALNY'),
    overview: 'Alnylam is a biopharmaceutical company focused on the discovery, development, and commercialization of RNA interference therapeutics.',
    category: 'Biotech Platform',
    analysisDate: '2026-06-11',
    latestFiscalPeriod: 'Q1 2026 ended 2026-03-31',
    dossierVerdict: {
      sourceType: 'curated',
      asOf: '2026-06-11',
      researchState: 'biotech_pipeline_watch',
      businessQuality: 'medium_high',
      valuationState: 'not_verified',
      marketEvidence: 'not_verified',
      finalRead: 'RNAi biotech platform where the thesis depends on commercial drug revenue growth, pipeline advancement, and regulatory milestones.',
      keySupport: [
        'SEC filings track Alnylam as an RNAi biotechnology platform with approved drugs (AMVUTTRA, ONPATTRO, etc.).',
        'Clinical pipeline programs target genetic, cardio-metabolic, and infectious diseases.',
        'Collaborations and royalty streams augment product sales revenue.'
      ],
      keyRisk: [
        'Clinical trial setbacks or safety signals can impair asset value and pipeline progress.',
        'Regulatory delays or failure to secure product approvals can restrict new market access.',
        'High R&D and commercial launch expenses can accelerate cash burn, requiring dilutive equity issues.'
      ]
    },
    valueCore: {
      ticker: 'ALNY',
      value_core_type: 'Biotech platform / RNAi therapeutics',
      company_stage_candidate: 'Scaling biotech',
      primary_value_driver: 'Net commercial product sales (AMVUTTRA), clinical trial progression, and regulatory approvals',
      thesis_break_trigger: 'Clinical trial failures or safety concerns, regulatory delays, commercial drug uptake underperforms, or cash burn forces dilutive financing',
      evidence_needed: [
        'commercial product revenue growth (especially AMVUTTRA)',
        'phase 3 clinical trial readouts',
        'FDA and international regulatory filing timelines',
        'R&D and SG&A cash burn rate',
        'cash runway and financing needs',
        'intellectual property and patent dispute outcomes'
      ],
      evidence_quality: 'Partial',
      dossier_state: 'curated_profile_batch_10',
      frontend_label: 'Curated',
      coverage_status: 'Curated',
      needs_human_review: false,
      source: 'SEC 10-K / 10-Q'
    },
    visualPhaseOne: {
      faq: {
        overview: [
          {
            question: 'What does ALNY do?',
            answer: 'Alnylam is a biotech company that pioneered RNA interference (RNAi) therapeutics, translating gene-silencing biology into commercial medicines for rare and chronic diseases.'
          }
        ],
        thesisRisk: [
          {
            question: 'What would break the ALNY thesis?',
            answer: 'The thesis weakens if commercial drug sales slow, clinical trials fail to meet primary endpoints, or drug development costs lead to dilutive capital raises.'
          }
        ]
      },
      phaseTwo: {
        thesisRisk: {
          lead: 'The main risk lies in clinical development execution, regulatory approvals, and commercial drug launch uptake.',
          riskMap: [
            {
              label: 'Clinical trial setbacks',
              severity: 'High',
              watch: 'Negative efficacy/safety data in pivotal phase 3 clinical programs.'
            },
            {
              label: 'Regulatory approval delays',
              severity: 'High',
              watch: 'FDA complete response letters (CRLs) or delayed filing reviews.'
            },
            {
              label: 'High cash burn & dilution',
              severity: 'Medium',
              watch: 'Cash runway shrinks faster than product sales can reach cash-flow break-even.'
            }
          ],
          evidenceNeeded: [
            'commercial product revenue growth (especially AMVUTTRA)',
            'phase 3 clinical trial readouts',
            'FDA and international regulatory filing timelines',
            'R&D and SG&A cash burn rate',
            'cash runway and financing needs',
            'intellectual property and patent dispute outcomes'
          ]
        }
      }
    }
  },
  ANET: {
    ticker: 'ANET',
    companyName: 'Arista Networks, Inc.',
    exchange: 'NYSE',
    logoUrl: buildStockLogoUrl('ANET'),
    overview: 'Arista Networks provides software-driven cognitive client-to-cloud networking solutions for data center environments.',
    category: 'Cloud Networking',
    analysisDate: '2026-06-11',
    latestFiscalPeriod: 'Q1 2026 ended 2026-03-31',
    dossierVerdict: {
      sourceType: 'curated',
      asOf: '2026-06-11',
      researchState: 'cloud_capex_watch',
      businessQuality: 'high',
      valuationState: 'not_verified',
      marketEvidence: 'not_verified',
      finalRead: 'Cloud networking platform where the thesis depends on hyperscaler capex, AI network switching adoption, and gross margin durability.',
      keySupport: [
        'SEC filings describe Arista as a supplier of software-driven networking switches using its EOS software.',
        'Major revenue is generated from cloud titans (Microsoft and Meta), who are key anchors of data center buildouts.',
        'AI network clustering increases demand for high-speed Ethernet switches and routers.'
      ],
      keyRisk: [
        'Hyperscaler capex consolidation or digestion cycles can lead to sudden order deceleration.',
        'Customer concentration creates vulnerability to changes in cloud titan procurement and supplier choices.',
        'Cisco competition or transition to custom white-box switches can compress gross margins.'
      ]
    },
    valueCore: {
      ticker: 'ANET',
      value_core_type: 'Cloud networking hardware & software',
      company_stage_candidate: 'Market leader',
      primary_value_driver: 'Hyperscaler cloud capex, AI network cluster Ethernet adoption, and gross margin durability',
      thesis_break_trigger: 'Hyperscaler capex slows materially, customer concentration shifts away from Arista, Ethernet AI networking adoption slows, or gross margin compresses',
      evidence_needed: [
        'hyperscaler cloud provider capex guidance',
        'customer concentration revenue disclosures (Microsoft/Meta)',
        'AI ethernet network switching volume',
        'gross margins and hardware/software mix',
        'supply chain purchase commitments',
        'Cisco / competitor market share trends'
      ],
      evidence_quality: 'Partial',
      dossier_state: 'curated_profile_batch_10',
      frontend_label: 'Curated',
      coverage_status: 'Curated',
      needs_human_review: false,
      source: 'SEC 10-K / 10-Q'
    },
    visualPhaseOne: {
      faq: {
        overview: [
          {
            question: 'What does ANET do?',
            answer: 'Arista Networks sells high-speed networking switches and routers powered by its EOS software, primarily used by cloud scale providers and large enterprise data centers.'
          }
        ],
        thesisRisk: [
          {
            question: 'What would break the ANET thesis?',
            answer: 'The thesis weakens if major cloud providers Meta or Microsoft cut data center networking capex, or if AI clusters use InfiniBand over Ethernet networking switches.'
          }
        ]
      },
      phaseTwo: {
        thesisRisk: {
          lead: 'The primary risk is heavy customer concentration and exposure to cloud provider capital expenditure cycles.',
          riskMap: [
            {
              label: 'Hyperscaler capex slowdown',
              severity: 'High',
              watch: 'Deceleration in IT capex guides from major cloud platforms.'
            },
            {
              label: 'Customer concentration shift',
              severity: 'High',
              watch: 'Microsoft or Meta reducing Arista spend or using internal custom solutions.'
            },
            {
              label: 'AI switching competition',
              severity: 'Medium',
              watch: 'InfiniBand capture of AI network connectivity or gross margin erosion.'
            }
          ],
          evidenceNeeded: [
            'hyperscaler cloud provider capex guidance',
            'customer concentration revenue disclosures (Microsoft/Meta)',
            'AI ethernet network switching volume',
            'gross margins and hardware/software mix',
            'supply chain purchase commitments',
            'Cisco / competitor market share trends'
          ]
        }
      }
    }
  },
  APLD: {
    ticker: 'APLD',
    companyName: 'Applied Digital Corporation',
    exchange: 'NASDAQ',
    logoUrl: buildStockLogoUrl('APLD'),
    overview: 'Applied Digital designs, builds, and operates data centers and digital infrastructure for high-performance computing and AI.',
    category: 'Data Center Infrastructure',
    analysisDate: '2026-06-11',
    latestFiscalPeriod: 'Q3 FY2026 ended 2026-02-28',
    dossierVerdict: {
      sourceType: 'curated',
      asOf: '2026-06-11',
      researchState: 'infrastructure_build_watch',
      businessQuality: 'medium',
      valuationState: 'not_verified',
      marketEvidence: 'not_verified',
      finalRead: 'AI infrastructure hosting provider where the thesis depends on power access, contracted capacity execution, and debt financing.',
      keySupport: [
        'SEC filings detail Applied Digital\'s focus on next-generation HPC and GPU hosting infrastructure.',
        'The company has contracts for GPU colocation services and runs a GPU cloud services segment.',
        'Securing long-term electrical power capacity at competitive prices is a critical asset.'
      ],
      keyRisk: [
        'Delays in power access or utility grid upgrades can defer data center commission dates and revenue.',
        'High capital requirements to build out data centers can require dilutive equity issues or high-cost debt.',
        'Concentrated customer base in GPU cloud and hosting creates credit default risk.'
      ]
    },
    valueCore: {
      ticker: 'APLD',
      value_core_type: 'NextGen data center hosting',
      company_stage_candidate: 'Infrastructure builder',
      primary_value_driver: 'Power capacity access, data center hosting buildout, GPU cloud revenue, and contract execution',
      thesis_break_trigger: 'Power utility connection delays, hosting contract execution delays, debt interest cost spikes, or GPU cloud customer credit defaults',
      evidence_needed: [
        'contracted megawatts (MW) power capacity',
        'data center facility buildout timeline',
        'GPU cloud capacity and pricing',
        'interest expense and debt financing terms',
        'major customer creditworthiness',
        'gross margins by hosting segment'
      ],
      evidence_quality: 'Partial',
      dossier_state: 'curated_profile_batch_10',
      frontend_label: 'Curated',
      coverage_status: 'Curated',
      needs_human_review: false,
      source: 'SEC 10-K / 10-Q'
    },
    visualPhaseOne: {
      faq: {
        overview: [
          {
            question: 'What does APLD do?',
            answer: 'Applied Digital builds and operates high-power density data centers designed for artificial intelligence, machine learning, and high-performance computing workloads.'
          }
        ],
        thesisRisk: [
          {
            question: 'What would break the APLD thesis?',
            answer: 'The thesis weakens if utility companies delay connecting power to Applied Digital facilities, or if the company fails to secure low-cost debt/equity to finance construction.'
          }
        ]
      },
      phaseTwo: {
        thesisRisk: {
          lead: 'The main risk centers on the execution of capital-intensive data center buildouts and securing power connectivity.',
          riskMap: [
            {
              label: 'Power connection delays',
              severity: 'High',
              watch: 'Grid capacity constraints or delayed substation construction by utility partners.'
            },
            {
              label: 'Financing & interest costs',
              severity: 'High',
              watch: 'High-interest debt issuances or share dilution to fund capital expenditures.'
            },
            {
              label: 'Customer concentration & default',
              severity: 'Medium',
              watch: 'Major GPU hosting tenants deferring payments or defaulting.'
            }
          ],
          evidenceNeeded: [
            'contracted megawatts (MW) power capacity',
            'data center facility buildout timeline',
            'GPU cloud capacity and pricing',
            'interest expense and debt financing terms',
            'major customer creditworthiness',
            'gross margins by hosting segment'
          ]
        }
      }
    }
  },
  APP: {
    ticker: 'APP',
    companyName: 'AppLovin Corporation',
    exchange: 'NASDAQ',
    logoUrl: buildStockLogoUrl('APP'),
    overview: 'AppLovin provides a software platform for mobile developers to monetize and market their apps, alongside owned mobile games.',
    category: 'Mobile Advertising / Software Platform',
    analysisDate: '2026-06-11',
    latestFiscalPeriod: 'Q1 2026 ended 2026-03-31',
    dossierVerdict: {
      sourceType: 'curated',
      asOf: '2026-06-11',
      researchState: 'software_platform_watch',
      businessQuality: 'high',
      valuationState: 'not_verified',
      marketEvidence: 'not_verified',
      finalRead: 'Mobile advertising platform where the thesis depends on AXON recommendation engine efficiency, advertising budgets, and mobile game margin stability.',
      keySupport: [
        'SEC filings structure AppLovin into Software Platform and Apps segments.',
        'Software Platform growth is driven by the AXON machine learning engine, which optimizes mobile ad campaigns.',
        'A highly recurring customer base consists of mobile app developers and advertisers.'
      ],
      keyRisk: [
        'AXON engine efficiency deterioration can reduce ad optimization, lowering ROI for developers.',
        'Slowing global digital advertising spend can compress software segment growth.',
        'App store policy changes regarding privacy (Apple/Google tracking rules) can restrict ad targeting.'
      ]
    },
    valueCore: {
      ticker: 'APP',
      value_core_type: 'Mobile ad software platform',
      company_stage_candidate: 'Scaling software platform',
      primary_value_driver: 'Software Platform revenue growth, AXON engine efficiency, and Apps segment EBITDA margins',
      thesis_break_trigger: 'AXON optimization performance degrades, mobile developer marketing budgets shrink, mobile game EBITDA decays, or App Store privacy rules restrict targeting',
      evidence_needed: [
        'Software Platform segment revenue growth',
        'Apps segment EBITDA margin',
        'AXON model update disclosures',
        'average revenue per active user trends',
        'operating cash flow margins',
        'mobile OS privacy / tracking policy changes'
      ],
      evidence_quality: 'Partial',
      dossier_state: 'curated_profile_batch_10',
      frontend_label: 'Curated',
      coverage_status: 'Curated',
      needs_human_review: false,
      source: 'SEC 10-K / 10-Q'
    },
    visualPhaseOne: {
      faq: {
        overview: [
          {
            question: 'What does APP do?',
            answer: 'AppLovin provides software to help mobile game and app developers market and monetize their products. It also operates a portfolio of free-to-play mobile games.'
          }
        ],
        thesisRisk: [
          {
            question: 'What would break the APP thesis?',
            answer: 'The thesis weakens if AppLovin\'s AXON AI engine loses attribution efficiency, or if OS privacy updates from Apple/Google disrupt mobile ad tracking and targeting.'
          }
        ]
      },
      phaseTwo: {
        thesisRisk: {
          lead: 'The core risk relates to AI attribution algorithms, advertiser demand, and mobile OS policy changes.',
          riskMap: [
            {
              label: 'AXON efficiency loss',
              severity: 'High',
              watch: 'Decline in Software Platform organic growth rate or ROI metrics.'
            },
            {
              label: 'OS privacy and tracking changes',
              severity: 'High',
              watch: 'New restrictions on user identifier data from Apple iOS or Google Android.'
            },
            {
              label: 'Ad budget contractions',
              severity: 'Medium',
              watch: 'Macro downturn in mobile gaming industry marketing expenditures.'
            }
          ],
          evidenceNeeded: [
            'Software Platform segment revenue growth',
            'Apps segment EBITDA margin',
            'AXON model update disclosures',
            'average revenue per active user trends',
            'operating cash flow margins',
            'mobile OS privacy / tracking policy changes'
          ]
        }
      }
    }
  },
  ARCC: {
    ticker: 'ARCC',
    companyName: 'Ares Capital Corporation',
    exchange: 'NASDAQ',
    logoUrl: buildStockLogoUrl('ARCC'),
    overview: 'Ares Capital is a specialty finance company operating as a business development company, providing debt and equity financing to middle-market companies.',
    category: 'Private Credit BDC',
    analysisDate: '2026-06-11',
    latestFiscalPeriod: 'Q1 2026 ended 2026-03-31',
    dossierVerdict: {
      sourceType: 'curated',
      asOf: '2026-06-11',
      researchState: 'credit_cycle_watch',
      businessQuality: 'high',
      valuationState: 'not_verified',
      marketEvidence: 'not_verified',
      finalRead: 'Private credit BDC where the thesis depends on Net Asset Value stability, non-accrual loan rates, and credit spreads.',
      keySupport: [
        'SEC filings identify ARCC as a Closed-End Business Development Company (BDC) managed by Ares Capital Management.',
        'The loan portfolio is primarily senior secured loans, mitigating credit default risk.',
        'Net investment income supports BDC dividend coverage and shareholder returns.'
      ],
      keyRisk: [
        'Deterioration in middle-market credit quality can lead to rising non-accrual loans and NAV write-downs.',
        'Credit spread compression can reduce net investment income yield.',
        'Interest rate fluctuations can impact borrower repayment ability and BDC net interest margins.'
      ]
    },
    valueCore: {
      ticker: 'ARCC',
      value_core_type: 'Private credit BDC',
      company_stage_candidate: 'Established income platform',
      primary_value_driver: 'Net Asset Value (NAV) stability, net investment income yield, and credit quality',
      thesis_break_trigger: 'Non-accruals increase materially, NAV decays, net investment income dividend coverage falls, or credit spreads compress sharply',
      evidence_needed: [
        'Net Asset Value (NAV) per share',
        'non-accrual loan percentage of portfolio',
        'net investment income (NII) dividend coverage ratio',
        'weighted average portfolio yield',
        'leverage ratio and debt-to-equity headroom',
        'portfolio mix (senior secured vs subordinated)'
      ],
      evidence_quality: 'Partial',
      dossier_state: 'curated_profile_batch_10',
      frontend_label: 'Curated',
      coverage_status: 'Curated',
      needs_human_review: false,
      source: 'SEC 10-K / 10-Q'
    },
    visualPhaseOne: {
      faq: {
        overview: [
          {
            question: 'What does ARCC do?',
            answer: 'Ares Capital Corporation is a closed-end business development company that acts as a lender, providing financing to private middle-market businesses in the US.'
          }
        ],
        thesisRisk: [
          {
            question: 'What would break the ARCC thesis?',
            answer: 'The thesis weakens if default rates rise among middle-market borrowers, causing non-accruals to spike and eroding Ares Capital\'s NAV per share.'
          }
        ]
      },
      phaseTwo: {
        thesisRisk: {
          lead: 'The main risk lies in credit default cycles within middle-market borrowers and leverage limit constraints.',
          riskMap: [
            {
              label: 'Credit quality decay / non-accruals',
              severity: 'High',
              watch: 'Non-accrual loans as a percentage of total portfolio rises above historical averages.'
            },
            {
              label: 'Net Asset Value contraction',
              severity: 'High',
              watch: 'Quarterly NAV per share writes down due to portfolio asset valuation impairments.'
            },
            {
              label: 'Dividend coverage erosion',
              severity: 'Medium',
              watch: 'Net investment income falls below declared dividends.'
            }
          ],
          evidenceNeeded: [
            'Net Asset Value (NAV) per share',
            'non-accrual loan percentage of portfolio',
            'net investment income (NII) dividend coverage ratio',
            'weighted average portfolio yield',
            'leverage ratio and debt-to-equity headroom',
            'portfolio mix (senior secured vs subordinated)'
          ]
        }
      }
    }
  },
  ARM: {
    ticker: 'ARM',
    companyName: 'Arm Holdings plc',
    exchange: 'NASDAQ',
    logoUrl: buildStockLogoUrl('ARM'),
    overview: 'Arm designs energy-efficient microprocessors and related semiconductor IP licensed globally.',
    category: 'Semiconductor IP',
    analysisDate: '2026-06-11',
    latestFiscalPeriod: 'FY2026 ended 2026-03-31',
    dossierVerdict: {
      sourceType: 'curated',
      asOf: '2026-06-11',
      researchState: 'semiconductor_ip_watch',
      businessQuality: 'high',
      valuationState: 'not_verified',
      marketEvidence: 'not_verified',
      finalRead: 'Processor IP platform where the thesis depends on royalty fee rate expansion, AI data center design wins, and smartphone market trends.',
      keySupport: [
        'SEC Form 20-F details Arm licensing and royalty models across CPU and GPU architectures.',
        'Royalty fees provide highly recurring, high-margin revenue streams from historical chip designs.',
        'AI workload acceleration drives demand for advanced v9 architecture licenses with premium royalty rates.'
      ],
      keyRisk: [
        'Slowing smartphone unit shipments can drag down core royalty fee volumes.',
        'Customer concentration makes revenues sensitive to decisions by major mobile and cloud chip designers.',
        'Arm China partnership complexities and geopolitical export rules present ongoing operational risks.'
      ]
    },
    valueCore: {
      ticker: 'ARM',
      value_core_type: 'Semiconductor IP licensing',
      company_stage_candidate: 'Established IP leader',
      primary_value_driver: 'Royalty fee rate expansion, licensing deal pipeline growth, and AI data center processor adoption',
      thesis_break_trigger: 'Royalty rates per chip decline, licensing deal signings slow, custom processor designs bypass Arm architecture, or export rules restrict key markets',
      evidence_needed: [
        'royalty revenue growth rate',
        'licensing backlog and bookings',
        'average royalty rate per chip',
        'v9 architecture adoption mix',
        'customer concentration revenue disclosures',
        'Arm China business performance updates'
      ],
      evidence_quality: 'Partial',
      dossier_state: 'curated_profile_batch_11',
      frontend_label: 'Curated',
      coverage_status: 'Curated',
      needs_human_review: false,
      source: 'SEC 20-F / 6-K'
    },
    visualPhaseOne: {
      faq: {
        overview: [
          {
            question: 'What does ARM do?',
            answer: 'Arm designs microprocessors and architectures and licenses them to semiconductor firms. It earns licensing fees and ongoing royalties per chip shipped.'
          }
        ],
        thesisRisk: [
          {
            question: 'What would break the ARM thesis?',
            answer: 'The thesis weakens if chip licensing momentum slows, mobile markets decline, customers bypass Arm for open-source architectures like RISC-V, or geopolitics disrupt China operations.'
          }
        ]
      },
      phaseTwo: {
        thesisRisk: {
          lead: 'The main risk centers on smartphone market dependency, customer architecture choices, and export rules.',
          riskMap: [
            {
              label: 'Client transition risk',
              severity: 'High',
              watch: 'Major clients design custom silicon bypassing Arm licensing.'
            },
            {
              label: 'Smartphone market decline',
              severity: 'Medium',
              watch: 'Slowing mobile device shipments reducing royalty volumes.'
            },
            {
              label: 'Export and China risks',
              severity: 'High',
              watch: 'Regulatory actions limiting IP sales to restricted regions.'
            }
          ],
          evidenceNeeded: [
            'royalty revenue growth rate',
            'licensing backlog and bookings',
            'average royalty rate per chip',
            'v9 architecture adoption mix',
            'customer concentration revenue disclosures',
            'Arm China business performance updates'
          ]
        }
      }
    }
  },
  AXON: {
    ticker: 'AXON',
    companyName: 'Axon Enterprise, Inc.',
    exchange: 'NASDAQ',
    logoUrl: buildStockLogoUrl('AXON'),
    overview: 'Axon provides public safety technology, including conducted energy devices, body-worn cameras, and cloud software.',
    category: 'Public Safety Technology',
    analysisDate: '2026-06-11',
    latestFiscalPeriod: 'Q1 2026 ended 2026-03-31',
    dossierVerdict: {
      sourceType: 'curated',
      asOf: '2026-06-11',
      researchState: 'public_safety_watch',
      businessQuality: 'high',
      valuationState: 'not_verified',
      marketEvidence: 'not_verified',
      finalRead: 'Public safety tech provider where the thesis depends on software recurring revenue expansion and agency retention.',
      keySupport: [
        'SEC filings partition Axon into Software and Sensors and TASER segments.',
        'Evidence.com cloud subscription platform creates high customer switching costs.',
        'TASER device upgrades provide stable hardware cash flows alongside camera software subscriptions.'
      ],
      keyRisk: [
        'Sensors segment product gross margins can compress during new hardware version rollouts.',
        'Slowing adoption of digital evidence management by smaller law enforcement agencies.',
        'Long public-sector procurement cycles and municipal budget constraints can delay bookings.'
      ]
    },
    valueCore: {
      ticker: 'AXON',
      value_core_type: 'Public safety tech & SaaS',
      company_stage_candidate: 'Established segment leader',
      primary_value_driver: 'Software recurring revenue growth, agency retention rates, and product gross margins',
      thesis_break_trigger: 'Software recurring revenue slows, agency customer churn increases, product margins compress, or public safety funding is reduced',
      evidence_needed: [
        'Annual Recurring Revenue (ARR) growth',
        'net software subscription retention rate',
        'Sensors segment product gross margin',
        'TASER device shipment volumes',
        'international booking metrics',
        'public agency budget trend indicators'
      ],
      evidence_quality: 'Partial',
      dossier_state: 'curated_profile_batch_11',
      frontend_label: 'Curated',
      coverage_status: 'Curated',
      needs_human_review: false,
      source: 'SEC 10-K / 10-Q'
    },
    visualPhaseOne: {
      faq: {
        overview: [
          {
            question: 'What does AXON do?',
            answer: 'Axon provides public safety tech, selling TASER devices, body-worn cameras, and cloud-based digital evidence management software to law enforcement agencies.'
          }
        ],
        thesisRisk: [
          {
            question: 'What would break the AXON thesis?',
            answer: 'The thesis weakens if SaaS recurring revenue decelerates, agency client retention drops, or hardware margins compress during new device rollouts.'
          }
        ]
      },
      phaseTwo: {
        thesisRisk: {
          lead: 'The primary risk relates to public sector funding cycles and hardware margin execution.',
          riskMap: [
            {
              label: 'Hardware margin compression',
              severity: 'Medium',
              watch: 'Sensors segment gross margin drops due to component costs.'
            },
            {
              label: 'Software growth deceleration',
              severity: 'High',
              watch: 'Evidence.com subscription ARR growth falls below double digits.'
            },
            {
              label: 'Public sector procurement delays',
              severity: 'Medium',
              watch: 'Municipal budget contractions delaying law enforcement tech upgrades.'
            }
          ],
          evidenceNeeded: [
            'Annual Recurring Revenue (ARR) growth',
            'net software subscription retention rate',
            'Sensors segment product gross margin',
            'TASER device shipment volumes',
            'international booking metrics',
            'public agency budget trend indicators'
          ]
        }
      }
    }
  },
  BA: {
    ticker: 'BA',
    companyName: 'The Boeing Company',
    exchange: 'NYSE',
    logoUrl: buildStockLogoUrl('BA'),
    overview: 'Boeing is a global aerospace and defense manufacturer supplying commercial airplanes, defense systems, and global services.',
    category: 'Aerospace & Defense',
    analysisDate: '2026-06-11',
    latestFiscalPeriod: 'Q1 2026 ended 2026-03-31',
    dossierVerdict: {
      sourceType: 'curated',
      asOf: '2026-06-11',
      researchState: 'aerospace_turnaround_watch',
      businessQuality: 'medium_low',
      valuationState: 'not_verified',
      marketEvidence: 'not_verified',
      finalRead: 'Aerospace duopolist with turnaround risk tied to production delivery rates, quality control, and cash flow generation.',
      keySupport: [
        'SEC filings partition Boeing into Commercial Airplanes, BDS, and BGS segments.',
        'A multi-year commercial backlog supports long-term revenue visibility once production normalizes.',
        'Global Services provides stable, higher-margin cash flows independent of new plane production.'
      ],
      keyRisk: [
        'FAA production rate limits and quality control audits can restrict commercial deliveries.',
        'Fixed-price development contracts in the defense segment are prone to cost overrun charges.',
        'Extended supply chain disruptions and labor relations issues can delay delivery schedules.'
      ]
    },
    valueCore: {
      ticker: 'BA',
      value_core_type: 'Aerospace manufacturing & services',
      company_stage_candidate: 'Turnaround candidate',
      primary_value_driver: 'Commercial airplane delivery rates, quality control execution, and free cash flow generation',
      thesis_break_trigger: 'Commercial airplane deliveries decline, regulatory audits impose further production limits, BDS segment losses expand, or free cash flow remains negative',
      evidence_needed: [
        'commercial airplane delivery count (737/787)',
        'FAA regulatory review and audit disclosures',
        'Defense segment operating margins',
        'free cash flow generation trend',
        'order backlog volume and pricing',
        'key supplier production rate compliance'
      ],
      evidence_quality: 'Partial',
      dossier_state: 'curated_profile_batch_11',
      frontend_label: 'Curated',
      coverage_status: 'Curated',
      needs_human_review: false,
      source: 'SEC 10-K / 10-Q'
    },
    visualPhaseOne: {
      faq: {
        overview: [
          {
            question: 'What does BA do?',
            answer: 'Boeing designs, builds, and services commercial airplanes, defense systems, satellites, and security systems globally as part of a global duopoly.'
          }
        ],
        thesisRisk: [
          {
            question: 'What would break the BA thesis?',
            answer: 'The thesis weakens if regulatory limits restrict plane deliveries, manufacturing quality issues persist, or fixed-price defense contracts incur additional losses.'
          }
        ]
      },
      phaseTwo: {
        thesisRisk: {
          lead: 'The primary risk is regulatory quality limits restricting delivery rate acceleration and defense cost overruns.',
          riskMap: [
            {
              label: 'Regulatory delivery constraints',
              severity: 'High',
              watch: 'FAA limits on monthly 737 MAX production remain in place.'
            },
            {
              label: 'Defense contract losses',
              severity: 'High',
              watch: 'BDS segment records additional write-downs on fixed-price projects.'
            },
            {
              label: 'Free cash flow deficits',
              severity: 'High',
              watch: 'High working capital requirements keep free cash flow negative.'
            }
          ],
          evidenceNeeded: [
            'commercial airplane delivery count (737/787)',
            'FAA regulatory review and audit disclosures',
            'Defense segment operating margins',
            'free cash flow generation trend',
            'order backlog volume and pricing',
            'key supplier production rate compliance'
          ]
        }
      }
    }
  },
  BE: {
    ticker: 'BE',
    companyName: 'Bloom Energy Corporation',
    exchange: 'NYSE',
    logoUrl: buildStockLogoUrl('BE'),
    overview: 'Bloom Energy designs and manufactures solid oxide fuel cell servers generating distributed on-site electricity.',
    category: 'Distributed Clean Energy',
    analysisDate: '2026-06-11',
    latestFiscalPeriod: 'Q1 2026 ended 2026-03-31',
    dossierVerdict: {
      sourceType: 'curated',
      asOf: '2026-06-11',
      researchState: 'energy_infrastructure_watch',
      businessQuality: 'medium_low',
      valuationState: 'not_verified',
      marketEvidence: 'not_verified',
      finalRead: 'Distributed energy manufacturer where the thesis depends on backlog conversion, product gross margins, and cash burn.',
      keySupport: [
        'SEC filings describe Bloom Energy\'s solid oxide fuel cell servers for clean, on-site energy.',
        'Servers operate on natural gas, biogas, or hydrogen, providing fuel flexibility.',
        'Data centers and industrial facilities represent key growth channels for on-site power.'
      ],
      keyRisk: [
        'Customer project delays due to local utility grid connection limits can defer revenues.',
        'Inability to achieve manufacturing cost reductions can compress product gross margins.',
        'High capital requirements and cash burn can increase dependence on external debt/equity financing.'
      ]
    },
    valueCore: {
      ticker: 'BE',
      value_core_type: 'Fuel cell clean energy generation',
      company_stage_candidate: 'Growth stage manufacturer',
      primary_value_driver: 'Product revenue backlog conversion, manufacturing product gross margins, and cash burn rate',
      thesis_break_trigger: 'Product backlog conversion stalls, product gross margins decline, hydrogen server adoption fails to scale, or liquidity runway shrinks',
      evidence_needed: [
        'product revenue and bookings backlog',
        'product-level gross margins',
        'cash runway and quarterly cash burn',
        'hydrogen server shipment volume',
        'utility grid connection delay times',
        'data center customer pipeline scaling'
      ],
      evidence_quality: 'Partial',
      dossier_state: 'curated_profile_batch_11',
      frontend_label: 'Curated',
      coverage_status: 'Curated',
      needs_human_review: false,
      source: 'SEC 10-K / 10-Q'
    },
    visualPhaseOne: {
      faq: {
        overview: [
          {
            question: 'What does BE do?',
            answer: 'Bloom Energy builds solid oxide fuel cell servers that generate constant, reliable on-site electricity, serving commercial, industrial, and data center clients.'
          }
        ],
        thesisRisk: [
          {
            question: 'What would break the BE thesis?',
            answer: 'The thesis weakens if the company cannot convert its project backlog to revenue, product margins compress, or high cash burn leads to dilutive financing.'
          }
        ]
      },
      phaseTwo: {
        thesisRisk: {
          lead: 'The main risk is project grid-connection delays and product manufacturing margin execution.',
          riskMap: [
            {
              label: 'Grid connection delays',
              severity: 'High',
              watch: 'Utility grid interconnect delays defer server activation dates.'
            },
            {
              label: 'Product margin compression',
              severity: 'High',
              watch: 'Product gross margin falls below targets due to material costs.'
            },
            {
              label: 'Cash burn and liquidity',
              severity: 'High',
              watch: 'Operating cash flow remains negative, shrinking cash runway.'
            }
          ],
          evidenceNeeded: [
            'product revenue and bookings backlog',
            'product-level gross margins',
            'cash runway and quarterly cash burn',
            'hydrogen server shipment volume',
            'utility grid connection delay times',
            'data center customer pipeline scaling'
          ]
        }
      }
    }
  },
  BNY: {
    ticker: 'BNY',
    companyName: 'The Bank of New York Mellon Corporation',
    exchange: 'NYSE',
    logoUrl: buildStockLogoUrl('BNY'),
    overview: 'BNY Mellon is a global financial services institution specializing in custody, asset servicing, and investment management.',
    category: 'Custody & Asset Servicing',
    analysisDate: '2026-06-11',
    latestFiscalPeriod: 'Q1 2026 ended 2026-03-31',
    dossierVerdict: {
      sourceType: 'curated',
      asOf: '2026-06-11',
      researchState: 'financial_services_watch',
      businessQuality: 'high',
      valuationState: 'not_verified',
      marketEvidence: 'not_verified',
      finalRead: 'Global custody bank where the thesis depends on Assets under Custody levels, fee revenue growth, and Net Interest Income.',
      keySupport: [
        'SEC filings structure BNY Mellon across Securities Services, Market and Wealth Services, and Investment segments.',
        'Custody assets create highly sticky fee-based service relationships with institutions.',
        'The business model features lower credit risk compared to traditional lending-focused commercial banks.'
      ],
      keyRisk: [
        'A decline in global equity and debt market values can compress asset-based fee revenues.',
        'Net Interest Income (NII) contraction driven by changes in central bank interest rates.',
        'Regulatory compliance failures or custody asset security issues can cause client departures.'
      ]
    },
    valueCore: {
      ticker: 'BNY',
      value_core_type: 'Custody & asset servicing bank',
      company_stage_candidate: 'Established services compounder',
      primary_value_driver: 'Assets under Custody / Administration (AUC/A) levels, asset servicing fee growth, and Net Interest Income',
      thesis_break_trigger: 'AUC/A levels drop sharply, asset servicing fee rates compress, Net Interest Income declines, or operational expenses outrun revenues',
      evidence_needed: [
        'Assets under Custody / Administration (AUC/A) balance',
        'Securities Services fee revenue growth',
        'Net Interest Income (NII) and net interest margin',
        'client deposit balance and deposit beta',
        'operating leverage and expense ratio',
        'regulatory capital ratios (CET1)'
      ],
      evidence_quality: 'Partial',
      dossier_state: 'curated_profile_batch_11',
      frontend_label: 'Curated',
      coverage_status: 'Curated',
      needs_human_review: false,
      source: 'SEC 10-K / 10-Q'
    },
    visualPhaseOne: {
      faq: {
        overview: [
          {
            question: 'What does BNY do?',
            answer: 'BNY Mellon is a custody bank. It safekeeps, clears, and services financial assets for institutional investors, corporations, and wealthy individuals.'
          }
        ],
        thesisRisk: [
          {
            question: 'What would break the BNY thesis?',
            answer: 'The thesis weakens if global markets decline (reducing asset fee revenues), client deposits drop, or Net Interest Income declines due to rate cuts.'
          }
        ]
      },
      phaseTwo: {
        thesisRisk: {
          lead: 'The core risk relates to global financial market levels and interest rate sensitivity.',
          riskMap: [
            {
              label: 'Global market declines',
              severity: 'High',
              watch: 'Equity/bond market index declines reducing AUC/A and fee income.'
            },
            {
              label: 'Net Interest Income contraction',
              severity: 'Medium',
              watch: 'NII declines due to interest rate cuts or rising deposit costs.'
            },
            {
              label: 'Operational expense growth',
              severity: 'Medium',
              watch: 'Expenses outrun fee revenue growth, impairing operating leverage.'
            }
          ],
          evidenceNeeded: [
            'Assets under Custody / Administration (AUC/A) balance',
            'Securities Services fee revenue growth',
            'Net Interest Income (NII) and net interest margin',
            'client deposit balance and deposit beta',
            'operating leverage and expense ratio',
            'regulatory capital ratios (CET1)'
          ]
        }
      }
    }
  },
  BKR: {
    ticker: 'BKR',
    companyName: 'Baker Hughes Company',
    exchange: 'NASDAQ',
    logoUrl: buildStockLogoUrl('BKR'),
    overview: 'Baker Hughes is an energy technology company supplying oilfield services, equipment, and industrial gas solutions.',
    category: 'Energy Technology / Services',
    analysisDate: '2026-06-11',
    latestFiscalPeriod: 'Q1 2026 ended 2026-03-31',
    dossierVerdict: {
      sourceType: 'curated',
      asOf: '2026-06-11',
      researchState: 'energy_technology_watch',
      businessQuality: 'medium_high',
      valuationState: 'not_verified',
      marketEvidence: 'not_verified',
      finalRead: 'Energy tech supplier where the thesis depends on LNG order bookings, global energy capex, and segment profit margins.',
      keySupport: [
        'SEC filings partition Baker Hughes into OFSE and IET segments.',
        'Industrial & Energy Technology (IET) segment benefits from global LNG infrastructure capacity expansion.',
        'Oilfield Services & Equipment (OFSE) segment provides exposure to global offshore drilling cycles.'
      ],
      keyRisk: [
        'A slowdown in global liquefied natural gas (LNG) project approvals can weaken IET backlog growth.',
        'Deterioration in global oil and gas prices can cause operators to cut drilling capex.',
        'Supply chain cost inflation or logistics delays can compress segment operating margins.'
      ]
    },
    valueCore: {
      ticker: 'BKR',
      value_core_type: 'Energy tech & equipment supplier',
      company_stage_candidate: 'Cyclical compounder',
      primary_value_driver: 'IET / LNG booking order momentum, global energy capex, and segment operating margins',
      thesis_break_trigger: 'IET order bookings decelerate, global energy capex declines, oilfield services margins contract, or free cash flow fails to convert',
      evidence_needed: [
        'IET segment order bookings and backlog',
        'OFSE segment operating margins',
        'global LNG project FID status',
        'upstream energy producer capex budgets',
        'raw material and supply chain costs',
        'free cash flow conversion rate'
      ],
      evidence_quality: 'Partial',
      dossier_state: 'curated_profile_batch_11',
      frontend_label: 'Curated',
      coverage_status: 'Curated',
      needs_human_review: false,
      source: 'SEC 10-K / 10-Q'
    },
    visualPhaseOne: {
      faq: {
        overview: [
          {
            question: 'What does BKR do?',
            answer: 'Baker Hughes supplies technology and services for energy and industrial clients, selling gas turbines, compressors, oilfield equipment, and digital solutions.'
          }
        ],
        thesisRisk: [
          {
            question: 'What would break the BKR thesis?',
            answer: 'The thesis weakens if LNG infrastructure buildout slows, international oilfield spending drops, or input cost inflation compresses segment margins.'
          }
        ]
      },
      phaseTwo: {
        thesisRisk: {
          lead: 'The main risk is cyclicality in global energy capital expenditure and LNG investment timing.',
          riskMap: [
            {
              label: 'LNG investment slowdown',
              severity: 'High',
              watch: 'Delay in final investment decisions (FIDs) for global LNG terminals.'
            },
            {
              label: 'Energy capex cuts',
              severity: 'High',
              watch: 'Major oil and gas producers reduce drilling and services budgets.'
            },
            {
              label: 'Margin compression',
              severity: 'Medium',
              watch: 'IET or OFSE segment margins compress due to supply chain inflation.'
            }
          ],
          evidenceNeeded: [
            'IET segment order bookings and backlog',
            'OFSE segment operating margins',
            'global LNG project FID status',
            'upstream energy producer capex budgets',
            'raw material and supply chain costs',
            'free cash flow conversion rate'
          ]
        }
      }
    }
  },
  BLK: {
    ticker: 'BLK',
    companyName: 'BlackRock, Inc.',
    exchange: 'NYSE',
    logoUrl: buildStockLogoUrl('BLK'),
    overview: 'BlackRock is a global investment manager providing public and private market funds, iShares ETFs, and Aladdin technology services.',
    category: 'Asset Management',
    analysisDate: '2026-06-11',
    latestFiscalPeriod: 'Q1 2026 ended 2026-03-31',
    dossierVerdict: {
      sourceType: 'curated',
      asOf: '2026-06-11',
      researchState: 'asset_management_watch',
      businessQuality: 'high',
      valuationState: 'not_verified',
      marketEvidence: 'not_verified',
      finalRead: 'Asset management platform where the thesis depends on AUM levels, net inflows, fee rate stability, and Aladdin technology revenue.',
      keySupport: [
        'SEC filings structure BlackRock as a unified investment management platform.',
        'iShares exchange-traded funds (ETFs) represent a dominant driver of passive asset inflows.',
        'Aladdin enterprise technology services provide recurring SaaS revenue streams to institutional clients.'
      ],
      keyRisk: [
        'Macro market declines can reduce total asset values, depressing asset-based fee income.',
        'Asset class mix shifts from high-fee active funds to low-fee passive products.',
        'Slowing adoption of Aladdin portfolio risk software by institutional managers.'
      ]
    },
    valueCore: {
      ticker: 'BLK',
      value_core_type: 'Asset management & tech platform',
      company_stage_candidate: 'Established market leader',
      primary_value_driver: 'Assets under Management (AUM) levels, client net inflows, fee rates, and Aladdin revenue scaling',
      thesis_break_trigger: 'AUM decays due to market downturns, client net inflows turn negative, average fee rates compress, or Aladdin revenue slows',
      evidence_needed: [
        'Assets under Management (AUM) balance',
        'quarterly net client asset inflows',
        'average investment management fee rate',
        'Aladdin technology services revenue growth',
        'operating margin trends',
        'passive vs active asset mix shifts'
      ],
      evidence_quality: 'Partial',
      dossier_state: 'curated_profile_batch_11',
      frontend_label: 'Curated',
      coverage_status: 'Curated',
      needs_human_review: false,
      source: 'SEC 10-K / 10-Q'
    },
    visualPhaseOne: {
      faq: {
        overview: [
          {
            question: 'What does BLK do?',
            answer: 'BlackRock is the world\'s largest asset manager, offering mutual funds, iShares ETFs, private market strategies, and Aladdin investment risk software.'
          }
        ],
        thesisRisk: [
          {
            question: 'What would break the BLK thesis?',
            answer: 'The thesis weakens if market declines compress AUM, passive price competition reduces fee rates, or Aladdin software adoption slows.'
          }
        ]
      },
      phaseTwo: {
        thesisRisk: {
          lead: 'The main risk is macro market asset value sensitivity and fee rate compression.',
          riskMap: [
            {
              label: 'Market asset value compression',
              severity: 'High',
              watch: 'Equity and fixed income market corrections reducing total AUM.'
            },
            {
              label: 'Fee rate compression',
              severity: 'Medium',
              watch: 'Faster-than-expected client shifts into lowest-fee passive products.'
            },
            {
              label: 'Aladdin growth slowdown',
              severity: 'Medium',
              watch: 'Technology services revenue growth drops below historical double digits.'
            }
          ],
          evidenceNeeded: [
            'Assets under Management (AUM) balance',
            'quarterly net client asset inflows',
            'average investment management fee rate',
            'Aladdin technology services revenue growth',
            'operating margin trends',
            'passive vs active asset mix shifts'
          ]
        }
      }
    }
  },
  BMY: {
    ticker: 'BMY',
    companyName: 'Bristol-Myers Squibb Company',
    exchange: 'NYSE',
    logoUrl: buildStockLogoUrl('BMY'),
    overview: 'Bristol-Myers Squibb is a global biopharmaceutical company focusing on oncology, immunology, and cardiovascular diseases.',
    category: 'Biopharmaceuticals',
    analysisDate: '2026-06-11',
    latestFiscalPeriod: 'Q1 2026 ended 2026-03-31',
    dossierVerdict: {
      sourceType: 'curated',
      asOf: '2026-06-11',
      researchState: 'biopharma_transition_watch',
      businessQuality: 'medium_high',
      valuationState: 'not_verified',
      marketEvidence: 'not_verified',
      finalRead: 'Biopharmaceutical company where the thesis depends on key drug patent timelines, new product portfolio uptake, and pipeline execution.',
      keySupport: [
        'SEC filings structure BMY as a single biopharmaceutical segment.',
        'Revenue is anchored by key blockbusters like Eliquis and Opdivo.',
        'A newly approved product portfolio provides growth drivers to offset legacy patent losses.'
      ],
      keyRisk: [
        'Generic competition after patent loss of exclusivity (LOE) for core products.',
        'Development failures or safety signals in late-stage clinical trials.',
        'High leverage and financing costs following recent biopharma company acquisitions.'
      ]
    },
    valueCore: {
      ticker: 'BMY',
      value_core_type: 'Biopharmaceutical developer',
      company_stage_candidate: 'Established biopharma',
      primary_value_driver: 'Drug patent life cycles, new product portfolio uptake, and clinical pipeline execution',
      thesis_break_trigger: 'Patent LOE impact exceeds new drug revenue, clinical trials fail, regulatory approvals are delayed, or acquisition debt integration underperforms',
      evidence_needed: [
        'Eliquis and Opdivo sales volumes',
        'new product portfolio sales growth',
        'phase 3 clinical trial readouts',
        'FDA regulatory filing and approval dates',
        'operating cash flow and debt reduction rate',
        'in-licensing and business development pipeline'
      ],
      evidence_quality: 'Partial',
      dossier_state: 'curated_profile_batch_11',
      frontend_label: 'Curated',
      coverage_status: 'Curated',
      needs_human_review: false,
      source: 'SEC 10-K / 10-Q'
    },
    visualPhaseOne: {
      faq: {
        overview: [
          {
            question: 'What does BMY do?',
            answer: 'Bristol-Myers Squibb discovers and builds medicines for serious chronic diseases, primarily in cancer care, cardiovascular health, and immunology.'
          }
        ],
        thesisRisk: [
          {
            question: 'What would break the BMY thesis?',
            answer: 'The thesis weakens if generic rivals erode blockbuster drug sales faster than new medicines can launch, or if pipeline trials fail to secure regulatory approval.'
          }
        ]
      },
      phaseTwo: {
        thesisRisk: {
          lead: 'The primary risk is blockbuster drug patent cliffs and pipeline replacement execution.',
          riskMap: [
            {
              label: 'Patent cliff erosion',
              severity: 'High',
              watch: 'Eliquis or Opdivo sales decline due to generic or biosimilar entry.'
            },
            {
              label: 'New drug launch underperformance',
              severity: 'High',
              watch: 'Sales of newly launched medicines fail to match market consensus.'
            },
            {
              label: 'Clinical trial pipeline failures',
              severity: 'Medium',
              watch: 'Late-stage clinical trial program failures or safety setbacks.'
            }
          ],
          evidenceNeeded: [
            'Eliquis and Opdivo sales volumes',
            'new product portfolio sales growth',
            'phase 3 clinical trial readouts',
            'FDA regulatory filing and approval dates',
            'operating cash flow and debt reduction rate',
            'in-licensing and business development pipeline'
          ]
        }
      }
    }
  },
  'BRK-B': {
    ticker: 'BRK-B',
    companyName: 'Berkshire Hathaway Inc.',
    exchange: 'NYSE',
    logoUrl: buildStockLogoUrl('BRK-B'),
    overview: 'Berkshire Hathaway is a diversified holding company operating insurance, railroad, utilities, and industrial businesses alongside a major investment portfolio.',
    category: 'Diversified Holding Company',
    analysisDate: '2026-06-11',
    latestFiscalPeriod: 'Q1 2026 ended 2026-03-31',
    dossierVerdict: {
      sourceType: 'curated',
      asOf: '2026-06-11',
      researchState: 'diversified_holding_watch',
      businessQuality: 'high',
      valuationState: 'not_verified',
      marketEvidence: 'not_verified',
      finalRead: 'Diversified holding company where the thesis depends on insurance underwriting margins, rail/energy returns, and cash redeployment.',
      keySupport: [
        'SEC filings structure Berkshire across Insurance, Railroad (BNSF), Energy (BHE), and manufacturing/retailing businesses.',
        'Underwriting float provides low-cost capital to fund operating expansions and equity investments.',
        'A robust balance sheet features massive cash reserves, offering safety and acquisition capacity.'
      ],
      keyRisk: [
        'Severe natural catastrophe losses can depress insurance underwriting profit margins.',
        'Railroad volume slowdowns or energy utility regulatory changes can impact operating segment returns.',
        'Inability to redeploy cash balances into high-return acquisitions or repurchases.'
      ]
    },
    valueCore: {
      ticker: 'BRK-B',
      value_core_type: 'Diversified holding company',
      company_stage_candidate: 'Conglomerate leader',
      primary_value_driver: 'Insurance underwriting float, operating business margins (BNSF/BHE), and capital deployment efficiency',
      thesis_break_trigger: 'Underwriting profit margins deteriorate, railroad/energy segment returns decline, or cash reserves drag down returns',
      evidence_needed: [
        'insurance underwriting profit/loss and float balance',
        'BNSF shipping volumes and operating ratio',
        'BHE regulatory utility returns and capital expenditures',
        'cash and cash equivalents balance',
        'equity investment portfolio market value',
        'share repurchase volume and price levels'
      ],
      evidence_quality: 'Partial',
      dossier_state: 'curated_profile_batch_11',
      frontend_label: 'Curated',
      coverage_status: 'Curated',
      needs_human_review: false,
      source: 'SEC 10-K / 10-Q'
    },
    visualPhaseOne: {
      faq: {
        overview: [
          {
            question: 'What does BRK-B do?',
            answer: 'Berkshire Hathaway is a conglomerate that owns GEICO insurance, BNSF railway, Berkshire energy, and diverse industrial companies, plus a large stock portfolio.'
          }
        ],
        thesisRisk: [
          {
            question: 'What would break the BRK-B thesis?',
            answer: 'The thesis weakens if insurance underwriting suffers heavy catastrophe losses, rail shipping volumes drop, or massive cash piles drag down returns.'
          }
        ]
      },
      phaseTwo: {
        thesisRisk: {
          lead: 'The primary risk relates to insurance catastrophe exposure, railroad/energy cycles, and cash reinvestment drag.',
          riskMap: [
            {
              label: 'Insurance catastrophe losses',
              severity: 'Medium',
              watch: 'Major natural disasters causing severe insurance underwriting losses.'
            },
            {
              label: 'Railroad and energy slowdown',
              severity: 'Medium',
              watch: 'BNSF freight volume decline or BHE regulatory rate limits.'
            },
            {
              label: 'Reinvestment cash drag',
              severity: 'Medium',
              watch: 'Cash balances scale without accretive acquisition opportunities.'
            }
          ],
          evidenceNeeded: [
            'insurance underwriting profit/loss and float balance',
            'BNSF shipping volumes and operating ratio',
            'BHE regulatory utility returns and capital expenditures',
            'cash and cash equivalents balance',
            'equity investment portfolio market value',
            'share repurchase volume and price levels'
          ]
        }
      }
    }
  },
  BXSL: {
    ticker: 'BXSL',
    companyName: 'Blackstone Secured Lending Fund',
    exchange: 'NYSE',
    logoUrl: buildStockLogoUrl('BXSL'),
    overview: 'Blackstone Secured Lending Fund is a business development company focused on senior secured debt to private middle-market companies.',
    category: 'Private Credit BDC',
    analysisDate: '2026-06-11',
    latestFiscalPeriod: 'Q1 2026 ended 2026-03-31',
    dossierVerdict: {
      sourceType: 'curated',
      asOf: '2026-06-11',
      researchState: 'private_credit_watch',
      businessQuality: 'high',
      valuationState: 'not_verified',
      marketEvidence: 'not_verified',
      finalRead: 'Private credit BDC where the thesis depends on Net Asset Value stability, non-accrual loan rates, and credit quality.',
      keySupport: [
        'SEC filings identify BXSL as a regulated business development company managed by Blackstone.',
        'The portfolio is anchored by first-lien senior secured loans, providing strong asset coverage.',
        'Net investment income yields support stable dividend payments and capital structure.'
      ],
      keyRisk: [
        'Middle-market credit cycle decay can increase borrower default rates and non-accrual loans.',
        'Credit spread compression in the private credit market can lower net investment yields.',
        'Leverage ratio limits or asset coverage headroom constraints can limit portfolio expansion.'
      ]
    },
    valueCore: {
      ticker: 'BXSL',
      value_core_type: 'Private credit BDC',
      company_stage_candidate: 'Established income compounder',
      primary_value_driver: 'Net Asset Value (NAV) stability, net investment income yield, and credit portfolio quality',
      thesis_break_trigger: 'Non-accruals increase, NAV writes down, net investment income coverage of dividends falls, or credit spreads compress',
      evidence_needed: [
        'Net Asset Value (NAV) per share',
        'non-accrual loan percentage of portfolio',
        'net investment income (NII) dividend coverage ratio',
        'weighted average portfolio yield',
        'asset coverage ratio and leverage ratio headroom',
        'first-lien loan concentration percentage'
      ],
      evidence_quality: 'Partial',
      dossier_state: 'curated_profile_batch_11',
      frontend_label: 'Curated',
      coverage_status: 'Curated',
      needs_human_review: false,
      source: 'SEC 10-K / 10-Q'
    },
    visualPhaseOne: {
      faq: {
        overview: [
          {
            question: 'What does BXSL do?',
            answer: 'Blackstone Secured Lending Fund is a BDC that invests in senior secured private debt of US middle-market companies, earning interest income to pay dividends.'
          }
        ],
        thesisRisk: [
          {
            question: 'What would break the BXSL thesis?',
            answer: 'The thesis weakens if defaults rise among private borrowers, causing non-accruals to spike and eroding Blackstone Secured Lending\'s NAV per share.'
          }
        ]
      },
      phaseTwo: {
        thesisRisk: {
          lead: 'The main risk centers on private credit borrower defaults, interest rate volatility, and leverage limits.',
          riskMap: [
            {
              label: 'Non-accrual loan spikes',
              severity: 'High',
              watch: 'Non-accrual loans as a percentage of total portfolio rises above historic averages.'
            },
            {
              label: 'Net Asset Value contraction',
              severity: 'High',
              watch: 'Quarterly NAV per share writes down due to asset valuation impairments.'
            },
            {
              label: 'Dividend coverage dilution',
              severity: 'Medium',
              watch: 'Net investment income falls below dividend requirements.'
            }
          ],
          evidenceNeeded: [
            'Net Asset Value (NAV) per share',
            'non-accrual loan percentage of portfolio',
            'net investment income (NII) dividend coverage ratio',
            'weighted average portfolio yield',
            'asset coverage ratio and leverage ratio headroom',
            'first-lien loan concentration percentage'
          ]
        }
      }
    }
  }
,
  C: {
    ticker: 'C',
    companyName: 'Citigroup Inc.',
    exchange: 'NYSE',
    overview: 'Citigroup is a diversified global financial services holding company providing consumers, corporations, governments, and institutions with a broad range of financial products and services, including consumer banking and credit, corporate and investment banking, securities brokerage, transaction services, and wealth management.',
    category: 'Global Diversified Banking',
    analysisDate: '2026-06-11',
    latestFiscalPeriod: 'Q1 2026 ended 2026-03-31',
    dossierVerdict: 'Citigroup has embarked on a multi-year organizational simplification plan aimed at reducing bureaucracy, improving operating efficiency, and meeting regulatory commitments, while continuing to manage credit card risk and capital adequacy.',
    valueCore: {
      ticker: 'C',
      value_core_type: 'business_summary_thesis_risk',
      company_stage_candidate: 'Restructuring / Mature Financial',
      primary_value_driver: 'Expense reduction from organizational simplification, growth in wealth and services business, and stabilization of net interest income and credit card charge-offs.',
      thesis_break_trigger: 'Failure to reduce expenses according to guidance, CET1 capital ratio dropping below regulatory requirements, or credit card net charge-off rates exceeding historical levels.',
      evidence_needed: [
        'Operating expenses excluding regulatory penalties',
        'Common Equity Tier 1 (CET1) capital ratio',
        'Net interest margin and net interest income',
        'Gross credit card loan non-accrual rate',
        'Wealth management assets under management'
      ],
      evidence_quality: 'Partial',
      dossier_state: 'curated_profile_batch_12',
      frontend_label: 'Curated',
      coverage_status: 'Curated',
      needs_human_review: false,
      source: 'SEC 10-K / 10-Q'
    },
    visualPhaseOne: {
      faq: {
        overview: 'Citigroup is a global systemically important bank operating across consumer banking, corporate client services, markets, transaction services, and wealth management.',
        thesisRisk: 'The primary risks revolve around its ability to execute its massive restructuring program to lower operating costs, manage credit card delinquency and charge-off rates in a changing macro environment, and maintain regulatory capital ratios above target levels.'
      },
      phaseTwo: {
        thesisRisk: [
          {
            category: 'Operational Execution',
            risk: 'Failing to lower operating expenses and streamline layers of management during its restructuring process.',
            watch: 'Quarterly operating expenses and restructuring charge guidance.'
          },
          {
            category: 'Credit Risk',
            risk: 'Rising credit card delinquencies and charge-off rates leading to higher-than-expected provisions for credit losses.',
            watch: 'Net charge-off rates and non-accrual loan metrics for the US personal banking segment.'
          },
          {
            category: 'Capital Adequacy',
            risk: 'CET1 ratio drops close to regulatory minimums, limiting stock repurchases and capital deployment options.',
            watch: 'Quarterly Common Equity Tier 1 (CET1) capital ratio updates.'
          }
        ]
      }
    }
  },
  CCEP: {
    ticker: 'CCEP',
    companyName: 'Coca-Cola Europacific Partners plc',
    exchange: 'NASDAQ',
    overview: 'Coca-Cola Europacific Partners (CCEP) is the world\'s largest independent Coca-Cola bottler, manufacturing, distributing, and selling beverages across Europe, Australia, the Pacific, and parts of Southeast Asia under exclusive franchise agreements.',
    category: 'Beverage Distribution',
    analysisDate: '2026-06-11',
    latestFiscalPeriod: 'Q1 2026 ended 2026-03-27',
    dossierVerdict: 'CCEP maintains a strong market position through exclusive bottling rights for Coca-Cola brands, utilizing geographic diversification and pricing power to manage input cost volatility.',
    valueCore: {
      ticker: 'CCEP',
      value_core_type: 'business_summary_thesis_risk',
      company_stage_candidate: 'Mature Consumer Staples / Consolidation',
      primary_value_driver: 'Volume growth in premium beverage categories, pricing power to pass through packaging and raw material costs, and realization of synergies from geographic integration.',
      thesis_break_trigger: 'Significant volume contraction in core territories, material pricing pushback from retail partners, or raw material cost inflation outpacing gross margins.',
      evidence_needed: [
        'Comparable volume growth by territory',
        'Cost of goods sold per unit case',
        'Gross profit margin percentage',
        'Operating cash flow conversion rate',
        'Foreign exchange translation impact on revenue'
      ],
      evidence_quality: 'Partial',
      dossier_state: 'curated_profile_batch_12',
      frontend_label: 'Curated',
      coverage_status: 'Curated',
      needs_human_review: false,
      source: 'SEC 20-F / 6-K'
    },
    visualPhaseOne: {
      faq: {
        overview: 'CCEP is a major global consumer staples business operating as the lead anchor bottler for The Coca-Cola Company across major European, Asia-Pacific, and Australian markets.',
        thesisRisk: 'Main business risks involve input cost inflation (packaging, electricity, sugar), unfavorable volume changes from pricing increases, and regulatory risks such as sugar taxes or deposit return schemes.'
      },
      phaseTwo: {
        thesisRisk: [
          {
            category: 'Pricing & Volume',
            risk: 'Price increases designed to offset inflation lead to volume contraction or consumer switching to private label brands.',
            watch: 'Territory volume changes and price/mix metrics.'
          },
          {
            category: 'Raw Materials',
            risk: 'Surges in cost of aluminum, PET, glass, and energy compress gross profit margins.',
            watch: 'Cost of goods sold per unit case and gross margin percentage.'
          },
          {
            category: 'Franchise Dependency',
            risk: 'Changes in terms of exclusive bottling agreements with The Coca-Cola Company.',
            watch: 'Related party transactions and franchise agreement disclosures.'
          }
        ]
      }
    }
  },
  CCL: {
    ticker: 'CCL',
    companyName: 'Carnival Corporation & plc',
    exchange: 'NYSE',
    overview: 'Carnival Corporation & plc is the world\'s largest leisure travel company and cruise operator, operating a global fleet of cruise ships across multiple well-known brands including Carnival Cruise Line, Princess Cruises, Holland America Line, and Costa Cruises.',
    category: 'Leisure & Travel',
    analysisDate: '2026-06-11',
    latestFiscalPeriod: 'Q1 2026 ended 2026-02-28',
    dossierVerdict: 'Carnival is focused on post-pandemic deleveraging, aiming to improve yields and occupancy while deploying cash flow to pay down its high debt burden.',
    valueCore: {
      ticker: 'CCL',
      value_core_type: 'business_summary_thesis_risk',
      company_stage_candidate: 'Post-Pandemic Deleveraging / Cyclical Recovery',
      primary_value_driver: 'Higher occupancy rates, expansion of net passenger yields, strong onboard guest spending, and repayment of high-cost debt to reduce interest expenses.',
      thesis_break_trigger: 'Occupancy levels falling below historical averages, sudden increase in marine fuel costs without effective hedging, or rising interest rates compounding debt service costs.',
      evidence_needed: [
        'Occupancy percentage by quarter',
        'Net passenger yields and onboard spending per passenger',
        'Total outstanding debt and interest expense coverage',
        'Marine fuel cost per metric ton',
        'Advanced cruise ticket booking volumes'
      ],
      evidence_quality: 'Partial',
      dossier_state: 'curated_profile_batch_12',
      frontend_label: 'Curated',
      coverage_status: 'Curated',
      needs_human_review: false,
      source: 'SEC 10-K / 10-Q'
    },
    visualPhaseOne: {
      faq: {
        overview: 'Carnival operates in the global travel sector, running cruise brands that cater to diverse market segments worldwide.',
        thesisRisk: 'The thesis hinges on sustained leisure travel demand to cover high capital expenditures and heavy debt obligations, alongside managing volatile operating costs such as marine fuel.'
      },
      phaseTwo: {
        thesisRisk: [
          {
            category: 'Balance Sheet Leverage',
            risk: 'High interest expenses consume operating cash flow, delaying credit rating improvements and increasing refinancing risk.',
            watch: 'Debt repayments, interest expense coverage ratio, and credit ratings.'
          },
          {
            category: 'Consumer Demand',
            risk: 'Economic slowdowns dampening consumer spending on leisure cruises, leading to discounting.',
            watch: 'Occupancy levels and advanced booking trends.'
          },
          {
            category: 'Operating Cost Volatility',
            risk: 'Sharp spikes in fuel and food prices reducing cruise operating margins.',
            watch: 'Fuel costs per metric ton and gross cruise costs.'
          }
        ]
      }
    }
  },
  CDNS: {
    ticker: 'CDNS',
    companyName: 'Cadence Design Systems, Inc.',
    exchange: 'NASDAQ',
    overview: 'Cadence Design Systems is a leading provider of electronic design automation (EDA) software, hardware, and IP blocks used by semiconductor and system companies to design, verify, and package integrated circuits and electronic systems.',
    category: 'Semiconductor Software & IP',
    analysisDate: '2026-06-11',
    latestFiscalPeriod: 'Q1 2026 ended 2026-03-31',
    dossierVerdict: 'Cadence benefits from high customer switching costs and structural demand for AI and custom silicon design software, generating high-margin recurring revenues.',
    valueCore: {
      ticker: 'CDNS',
      value_core_type: 'business_summary_thesis_risk',
      company_stage_candidate: 'High-Growth Software / R&D Enabler',
      primary_value_driver: 'Rising demand for EDA software tools and IP blocks driven by complex AI and system-on-chip architectures, leading to high recurring subscription revenues.',
      thesis_break_trigger: 'Slowing semiconductor R&D spending, supply chain delays for hardware emulator systems, or market share loss to major EDA competitors.',
      evidence_needed: [
        'Recurring product and maintenance revenue growth',
        'Total order backlog dollar value',
        'Operating margin percentage',
        'R&D expenses as a percentage of revenue',
        'Product revenue growth from hardware emulation systems'
      ],
      evidence_quality: 'Partial',
      dossier_state: 'curated_profile_batch_12',
      frontend_label: 'Curated',
      coverage_status: 'Curated',
      needs_human_review: false,
      source: 'SEC 10-K / 10-Q'
    },
    visualPhaseOne: {
      faq: {
        overview: 'Cadence provides critical software infrastructure to the semiconductor industry, facilitating chip design from concept to manufacturing.',
        thesisRisk: 'Risks include potential downturns in chip design activity, export restrictions on advanced design tools, and the heavy R&D investment required to integrate AI design features.'
      },
      phaseTwo: {
        thesisRisk: [
          {
            category: 'R&D Spend Cycles',
            risk: 'Semiconductor clients reducing design starts or R&D budgets during industry downturns.',
            watch: 'Software subscription growth rates and total backlog value.'
          },
          {
            category: 'Hardware Supply Chain',
            risk: 'Shortage of components for advanced emulation hardware systems, delaying delivery to customers.',
            watch: 'Product segment revenue and inventory levels.'
          },
          {
            category: 'Geopolitical Controls',
            risk: 'Tightening export controls restricting sale of advanced EDA tools to specific markets.',
            watch: 'International revenue mix and regulatory compliance disclosures.'
          }
        ]
      }
    }
  },
  CEG: {
    ticker: 'CEG',
    companyName: 'Constellation Energy Corporation',
    exchange: 'NASDAQ',
    overview: 'Constellation Energy is the largest producer of carbon-free energy in the United States, operating the nation\'s largest nuclear power fleet alongside hydro, wind, and solar assets, supplying electricity to commercial, industrial, and residential customers.',
    category: 'Clean Energy & Utilities',
    analysisDate: '2026-06-11',
    latestFiscalPeriod: 'Q1 2026 ended 2026-03-31',
    dossierVerdict: 'Constellation is uniquely positioned to capture growing demand from artificial intelligence data centers seeking round-the-clock clean power, backed by nuclear tax credits.',
    valueCore: {
      ticker: 'CEG',
      value_core_type: 'business_summary_thesis_risk',
      company_stage_candidate: 'Clean Energy Producer / Infrastructure',
      primary_value_driver: 'Growth in power purchase agreements with hyperscale data centers, favorable wholesale merchant power prices, and clean energy production tax credits.',
      thesis_break_trigger: 'Unexpected extended outages in major nuclear units, regulatory changes in clean energy credits, or falling capacity market clearing prices.',
      evidence_needed: [
        'Nuclear fleet capacity factor percentage',
        'Weighted average wholesale power price realized',
        'Capacity market auction clearing prices',
        'Revenue generated from hyperscale data center PPAs',
        'Nuclear fuel procurement cost changes'
      ],
      evidence_quality: 'Partial',
      dossier_state: 'curated_profile_batch_12',
      frontend_label: 'Curated',
      coverage_status: 'Curated',
      needs_human_review: false,
      source: 'SEC 10-K / 10-Q'
    },
    visualPhaseOne: {
      faq: {
        overview: 'Constellation generates and sells carbon-free wholesale electricity, relying primarily on its nuclear power plant fleet.',
        thesisRisk: 'Operational risks include nuclear refueling cycles and forced outages, alongside power market price fluctuations and regulatory policy changes.'
      },
      phaseTwo: {
        thesisRisk: [
          {
            category: 'Nuclear Operations',
            risk: 'Forced outages or safety violations leading to extended reactor shutdowns and reduced power generation.',
            watch: 'Nuclear capacity factor percentage and forced outage rates.'
          },
          {
            category: 'Energy Pricing',
            risk: 'Depressed wholesale merchant electricity prices reducing unhedged generation revenue.',
            watch: 'Realized power prices and percentage of hedged capacity.'
          },
          {
            category: 'Policy & Regulations',
            risk: 'Modifications to federal Production Tax Credits (PTC) or state clean energy programs.',
            watch: 'Regulatory filing updates and policy announcement disclosures.'
          }
        ]
      }
    }
  },
  CHTR: {
    ticker: 'CHTR',
    companyName: 'Charter Communications, Inc.',
    exchange: 'NASDAQ',
    overview: 'Charter Communications is a leading broadband communications company and cable operator in the United States, operating under the Spectrum brand to provide high-speed internet, mobile phone, subscription television, and voice services.',
    category: 'Cable & Telecommunications',
    analysisDate: '2026-06-11',
    latestFiscalPeriod: 'Q1 2026 ended 2026-03-31',
    dossierVerdict: 'Charter faces competitive headwinds in residential broadband, counterbalanced by Spectrum Mobile expansion and high-split network infrastructure upgrades.',
    valueCore: {
      ticker: 'CHTR',
      value_core_type: 'business_summary_thesis_risk',
      company_stage_candidate: 'Mature Cable Operator / Telecom Transition',
      primary_value_driver: 'Broadband customer stabilization, rapid expansion of mobile phone lines via Spectrum Mobile, and high-split network upgrades to defend market share.',
      thesis_break_trigger: 'Accelerated broadband subscriber losses, margin erosion from aggressive mobile discounting, or capital expenditure overruns on network high-splits.',
      evidence_needed: [
        'Broadband subscriber net additions or losses',
        'Spectrum Mobile line additions and ARPU',
        'Subscription video subscriber churn rate',
        'Capital expenditures for network upgrades',
        'Adjusted EBITDA margin percentage'
      ],
      evidence_quality: 'Partial',
      dossier_state: 'curated_profile_batch_12',
      frontend_label: 'Curated',
      coverage_status: 'Curated',
      needs_human_review: false,
      source: 'SEC 10-K / 10-Q'
    },
    visualPhaseOne: {
      faq: {
        overview: 'Charter is a major cable network provider in the US, transitioning its business model to focus on broadband and mobile bundles.',
        thesisRisk: 'The primary risk is customer losses in broadband to fiber and FWA, combined with video cord-cutting and heavy capex requirements.'
      },
      phaseTwo: {
        thesisRisk: [
          {
            category: 'Broadband Competition',
            risk: 'Fiber-to-the-home expansions and 5G fixed-wireless access (FWA) draw away broadband customers.',
            watch: 'Broadband net adds/losses by quarter.'
          },
          {
            category: 'Capital Spending',
            risk: 'High-split network upgrades to offer symmetrical speeds require elevated capex, depressing free cash flow.',
            watch: 'Quarterly capital expenditures and free cash flow.'
          },
          {
            category: 'Cord Cutting',
            risk: 'Accelerated loss of video customers reduces high-margin video revenues.',
            watch: 'Video subscriber churn rates.'
          }
        ]
      }
    }
  },
  CIEN: {
    ticker: 'CIEN',
    companyName: 'Ciena Corporation',
    exchange: 'NYSE',
    overview: 'Ciena Corporation is a network specialist providing optical transport systems, routing and switching platforms, software, and services to telecommunications service providers, cable operators, governments, and large enterprises globally.',
    category: 'Optical Networking Equipment',
    analysisDate: '2026-06-11',
    latestFiscalPeriod: 'Q2 2026 ended 2026-05-02',
    dossierVerdict: 'Ciena relies on cloud provider demand to offset cautious capital spending among traditional telecommunications operators.',
    valueCore: {
      ticker: 'CIEN',
      value_core_type: 'business_summary_thesis_risk',
      company_stage_candidate: 'Cyclical Tech Hardware / Telecom Vendor',
      primary_value_driver: 'Drawdown of hardware backlog, carrier network upgrades to higher optical speeds, and capital expenditure recovery from cloud providers.',
      thesis_break_trigger: 'Extended pause in telecom carrier capital spending, rapid backlog depletion without new orders, or gross margin compression from competitive pricing.',
      evidence_needed: [
        'Optical networking segment revenue growth',
        'Order backlog drawdown rate',
        'Gross profit margin percentage',
        'Telecom carrier capital expenditure guidance',
        'Inventory turnover ratio'
      ],
      evidence_quality: 'Partial',
      dossier_state: 'curated_profile_batch_12',
      frontend_label: 'Curated',
      coverage_status: 'Curated',
      needs_human_review: false,
      source: 'SEC 10-K / 10-Q'
    },
    visualPhaseOne: {
      faq: {
        overview: 'Ciena designs and builds optical network hardware that powers internet backbone infrastructure and datacenter connections.',
        thesisRisk: 'Performance is cyclical, tied directly to carrier capital spend, customer inventory drawdowns, and component supply chains.'
      },
      phaseTwo: {
        thesisRisk: [
          {
            category: 'Client Capex Cycles',
            risk: 'Major telecom carriers reducing network hardware upgrades to conserve cash flow.',
            watch: 'Carrier capital expenditure announcements and segment revenues.'
          },
          {
            category: 'Backlog Drawdown',
            risk: 'Depleting the order backlog built up during supply shortages without securing matching new orders.',
            watch: 'Backlog total value and book-to-bill ratio.'
          },
          {
            category: 'Gross Margin Compression',
            risk: 'Increased pricing competition in optical transport markets lowers margins.',
            watch: 'Gross margin percentage and cost of goods sold.'
          }
        ]
      }
    }
  },
  CIFR: {
    ticker: 'CIFR',
    companyName: 'Cipher Mining Inc.',
    exchange: 'NASDAQ',
    overview: 'Cipher Mining is an industrial-scale technology company focused on development and operation of bitcoin mining data centers in the United States, utilizing power infrastructure to run high-performance ASIC rigs.',
    category: 'Bitcoin Mining & Computing Infrastructure',
    analysisDate: '2026-06-11',
    latestFiscalPeriod: 'Q1 2026 ended 2026-03-31',
    dossierVerdict: 'Cipher focuses on securing long-term power purchase agreements and growing its operational hash rate, with potential expansion into HPC data center hosting.',
    valueCore: {
      ticker: 'CIFR',
      value_core_type: 'business_summary_thesis_risk',
      company_stage_candidate: 'Early-Stage High-Beta Infrastructure',
      primary_value_driver: 'Expansion of active self-mining hash rate, access to low-cost electricity contracts, and operational transitions toward HPC/AI data hosting.',
      thesis_break_trigger: 'Protracted decline in Bitcoin price below marginal production costs, failure to secure low-cost power renewals, or dilutive share issuances exceeding growth value.',
      evidence_needed: [
        'Active self-mining hash rate (EH/s)',
        'Weighted average electricity cost per megawatt-hour',
        'Bitcoin mined per quarter',
        'Capital expenditure commitments for site development',
        'Total outstanding share dilution percentage'
      ],
      evidence_quality: 'Partial',
      dossier_state: 'curated_profile_batch_12',
      frontend_label: 'Curated',
      coverage_status: 'Curated',
      needs_human_review: false,
      source: 'SEC 10-K / 10-Q'
    },
    visualPhaseOne: {
      faq: {
        overview: 'Cipher Mining operates specialized data centers containing ASIC computer chips designed to mine the Bitcoin network.',
        thesisRisk: 'The business model is highly exposed to Bitcoin price volatility, rising electricity grid pricing, and the network difficulty rate.'
      },
      phaseTwo: {
        thesisRisk: [
          {
            category: 'Bitcoin Pricing',
            risk: 'A steep decrease in Bitcoin price makes mining operations unprofitable relative to power costs.',
            watch: 'Bitcoin market price and average mining cost per coin.'
          },
          {
            category: 'Electricity Pricing',
            risk: 'Expiration or disruption of fixed-price electricity contracts increases the cost of mining.',
            watch: 'Power costs per megawatt-hour (MWh).'
          },
          {
            category: 'Capital Dilution',
            risk: 'Issuing high volumes of common stock through ATM programs to fund hardware acquisitions dilute existing owners.',
            watch: 'Total shares outstanding and ATM program drawdowns.'
          }
        ]
      }
    }
  },
  CL: {
    ticker: 'CL',
    companyName: 'Colgate-Palmolive Company',
    exchange: 'NYSE',
    overview: 'Colgate-Palmolive is a leading global consumer products company focused on Oral Care, Personal Care, Home Care, and Pet Nutrition, selling widely recognized brands like Colgate, Palmolive, and Hill\'s Science Diet.',
    category: 'Consumer Staples',
    analysisDate: '2026-06-11',
    latestFiscalPeriod: 'FY2025 ended 2025-12-31',
    dossierVerdict: 'Colgate-Palmolive utilizes strong brand equity to execute pricing increases, protecting gross margins against raw material cost inflation.',
    valueCore: {
      ticker: 'CL',
      value_core_type: 'business_summary_thesis_risk',
      company_stage_candidate: 'Mature Dividend Consumer Staples',
      primary_value_driver: 'Organic sales growth through pricing and volume increases, premiumization in oral care, and gross margin recovery from raw material deflation.',
      thesis_break_trigger: 'Volume decline indicating lack of pricing power, gross margin compression from renewed raw material inflation, or severe currency headwinds in emerging markets.',
      evidence_needed: [
        'Organic sales growth percentage',
        'Volume growth percentage vs pricing impact',
        'Gross profit margin recovery rate',
        'Advertising and promotion expenses',
        'Pet nutrition (Hill\'s) revenue growth'
      ],
      evidence_quality: 'Partial',
      dossier_state: 'curated_profile_batch_12',
      frontend_label: 'Curated',
      coverage_status: 'Curated',
      needs_human_review: false,
      source: 'SEC 10-K / 10-Q'
    },
    visualPhaseOne: {
      faq: {
        overview: 'Colgate-Palmolive manufactures and sells household personal care brands globally, maintaining high market shares in oral care.',
        thesisRisk: 'Risks include volume erosion if prices are raised too aggressively, input cost surges, and translation losses from emerging market currencies.'
      },
      phaseTwo: {
        thesisRisk: [
          {
            category: 'Volume Elasticity',
            risk: 'Consumer pushback against pricing actions leads to market share loss to private labels.',
            watch: 'Volume growth trends vs pricing increases.'
          },
          {
            category: 'Input Inflation',
            risk: 'Renewed commodity spikes in packaging and chemical ingredients compress gross margins.',
            watch: 'Gross margin percentage and cost of goods sold.'
          },
          {
            category: 'Foreign Exchange',
            risk: 'Local currency depreciations in emerging markets reduce reported US dollar earnings.',
            watch: 'Foreign exchange translation impact on revenue and operating profit.'
          }
        ]
      }
    }
  },
  CLSK: {
    ticker: 'CLSK',
    companyName: 'CleanSpark, Inc.',
    exchange: 'NASDAQ',
    overview: 'CleanSpark is an industrial-scale bitcoin mining company that owns and operates multiple data centers in the United States, powered primarily by low-carbon energy sources to support high-efficiency computing equipment.',
    category: 'Bitcoin Mining & Computing Infrastructure',
    analysisDate: '2026-06-11',
    latestFiscalPeriod: 'Q2 2026 ended 2026-03-31',
    dossierVerdict: 'CleanSpark focuses on acquisition-driven hash rate expansion and fleet power efficiency to maintain competitiveness in the bitcoin mining sector.',
    valueCore: {
      ticker: 'CLSK',
      value_core_type: 'business_summary_thesis_risk',
      company_stage_candidate: 'Growth Infrastructure / Bitcoin Mining',
      primary_value_driver: 'Rapid expansion of mining fleet capacity, high ASIC efficiency, and acquisition of low-cost power infrastructure in key regions.',
      thesis_break_trigger: 'Substantial decrease in Bitcoin price, rising electricity unit costs, or operational inefficiency leading to high fleet energy consumption.',
      evidence_needed: [
        'Operational hash rate capacity (EH/s)',
        'Fleet efficiency measured in Joules per Terahash (J/TH)',
        'Weighted average electricity costs',
        'ASIC miner purchase commitments',
        'ATM equity facility drawdowns and share counts'
      ],
      evidence_quality: 'Partial',
      dossier_state: 'curated_profile_batch_12',
      frontend_label: 'Curated',
      coverage_status: 'Curated',
      needs_human_review: false,
      source: 'SEC 10-K / 10-Q'
    },
    visualPhaseOne: {
      faq: {
        overview: 'CleanSpark operates data centers in Georgia, Mississippi, and other regions dedicated to running ASIC miners for Bitcoin.',
        thesisRisk: 'The thesis depends on rapid fleet deployment and low power costs to offset cyclical fluctuations in Bitcoin price and network difficulty.'
      },
      phaseTwo: {
        thesisRisk: [
          {
            category: 'Bitcoin Volatility',
            risk: 'A drop in Bitcoin value compresses mining margins, restricting funds for debt service and capital expansion.',
            watch: 'Bitcoin price and marginal cost of mining per coin.'
          },
          {
            category: 'Fleet Efficiency',
            risk: 'Failure to upgrade to newer ASIC hardware increases average electricity consumption per unit of computing power.',
            watch: 'Average mining fleet efficiency (J/TH).'
          },
          {
            category: 'Financing Risk',
            risk: 'Slowing ATM share sales restricts growth capital, while excessive share sales dilute value.',
            watch: 'Outstanding shares and ATM financing activities.'
          }
        ]
      }
    }
  }
,
  COF: {
    ticker: 'COF',
    companyName: 'Capital One Financial Corporation',
    exchange: 'NYSE',
    overview: 'Capital One Financial is a diversified financial services holding company specializing in credit cards, auto loans, and consumer and commercial banking, utilizing high-volume data analytics to drive credit underwriting and marketing.',
    category: 'Consumer Finance & Banking',
    analysisDate: '2026-06-11',
    latestFiscalPeriod: 'Q1 2026 ended 2026-03-31',
    dossierVerdict: 'Capital One Financial operates a high-volume consumer lending model heavily dependent on credit card and auto loan credit performance, supported by deposit funding.',
    valueCore: {
      ticker: 'COF',
      value_core_type: 'business_summary_thesis_risk',
      company_stage_candidate: 'Mature Consumer Credit & Banking',
      primary_value_driver: 'Credit card loan expansion with data-driven underwriting, stabilization of auto loan delinquency rates, and growth in low-cost deposit funding.',
      thesis_break_trigger: 'Credit card net charge-off rates exceeding historical cycle averages, auto loan credit deterioration, or deposit flight forcing high-cost wholesale funding.',
      evidence_needed: [
        'Credit card net charge-off rate',
        '30+ day credit card delinquency rate',
        'Net interest margin and net interest income',
        'Average deposit interest rate cost',
        'Auto loan provision for credit losses'
      ],
      evidence_quality: 'Partial',
      dossier_state: 'curated_profile_batch_13',
      frontend_label: 'Curated',
      coverage_status: 'Curated',
      needs_human_review: false,
      source: 'SEC 10-K / 10-Q'
    },
    visualPhaseOne: {
      faq: {
        overview: 'Capital One is a major consumer finance firm known for its large credit card portfolio and retail banking franchise in the US.',
        thesisRisk: 'The primary risk lies in consumer credit performance (delinquencies/charge-offs) during economic downturns and the rising cost of retaining deposits.'
      },
      phaseTwo: {
        thesisRisk: [
          {
            category: 'Credit Deterioration',
            risk: 'Increasing default rates in the credit card and auto loan portfolios require larger provisions, impacting profitability.',
            watch: 'Credit card net charge-off rate and provisions.'
          },
          {
            category: 'Funding Cost Pressure',
            risk: 'Competitive pressure to offer higher deposit yields compresses net interest margin.',
            watch: 'Average interest rate paid on deposits.'
          },
          {
            category: 'Marketing Expense Inflation',
            risk: 'Sustained elevated marketing and technology spend fails to generate proportional loan growth.',
            watch: 'Non-interest marketing expenses.'
          }
        ]
      }
    }
  },
  CORZ: {
    ticker: 'CORZ',
    companyName: 'Core Scientific, Inc.',
    exchange: 'NASDAQ',
    overview: 'Core Scientific is a leading operator of digital infrastructure for high-performance computing and bitcoin mining in North America, offering self-mining operations and hosting services to third-party clients.',
    category: 'Bitcoin Mining & Digital Infrastructure',
    analysisDate: '2026-06-11',
    latestFiscalPeriod: 'Q1 2026 ended 2026-03-31',
    dossierVerdict: 'Core Scientific focuses on expanding self-mining hash rate capacity and transitioning energy infrastructure toward high-performance computing hosting contracts.',
    valueCore: {
      ticker: 'CORZ',
      value_core_type: 'business_summary_thesis_risk',
      company_stage_candidate: 'Early-Stage High-Beta Computing Infrastructure',
      primary_value_driver: 'Expansion of active self-mining hash rate, securing low-cost power purchase contracts, and scaling host computer systems for high-performance computing (HPC) and artificial intelligence clients.',
      thesis_break_trigger: 'Bitcoin price falling below marginal production cost, unexpected power tariff increases at major sites, or delays in data center infrastructure conversion for HPC clients.',
      evidence_needed: [
        'Active self-mining hash rate (EH/s)',
        'Weighted average electricity cost per megawatt-hour',
        'HPC hosting contract revenue and backlog',
        'Bitcoin mined per quarter',
        'Total outstanding share dilution'
      ],
      evidence_quality: 'Partial',
      dossier_state: 'curated_profile_batch_13',
      frontend_label: 'Curated',
      coverage_status: 'Curated',
      needs_human_review: false,
      source: 'SEC 10-K / 10-Q'
    },
    visualPhaseOne: {
      faq: {
        overview: 'Core Scientific is an industrial-scale bitcoin miner that also provides hosting infrastructure for third-party miners and artificial intelligence applications.',
        thesisRisk: 'Key risks include high exposure to Bitcoin market prices, power grid stability and cost inflation, and the execution risk of converting sites for HPC/AI clients.'
      },
      phaseTwo: {
        thesisRisk: [
          {
            category: 'Bitcoin Volatility',
            risk: 'A drop in Bitcoin value compresses self-mining margins, restricting liquidity for debt service.',
            watch: 'Bitcoin price and cash cost to mine per coin.'
          },
          {
            category: 'Power Costs',
            risk: 'Rising regional power pricing or grid transmission fees increase the cost of running ASIC miner rigs.',
            watch: 'Average electricity rate per MWh.'
          },
          {
            category: 'HPC Transition Delays',
            risk: 'Slower-than-expected buildout of high-performance computing data center capacity delays contractual revenue.',
            watch: 'HPC hosting revenue and capital expenditures.'
          }
        ]
      }
    }
  },
  CPRT: {
    ticker: 'CPRT',
    companyName: 'Copart, Inc.',
    exchange: 'NASDAQ',
    overview: 'Copart is a global provider of online auction and vehicle processing services, connecting vehicle sellers (primarily insurance companies) with dismantlers, rebuilders, and exporters.',
    category: 'Industrial Auction & Salvage Services',
    analysisDate: '2026-06-11',
    latestFiscalPeriod: 'Q3 2026 ended 2026-04-30',
    dossierVerdict: 'Copart operates a dominant vehicle salvage auction marketplace, leveraging proprietary online bidding tech and physical storage yard networks.',
    valueCore: {
      ticker: 'CPRT',
      value_core_type: 'business_summary_thesis_risk',
      company_stage_candidate: 'High-Moat Industrial Services',
      primary_value_driver: 'Rising vehicle complexity increasing total loss frequency by insurers, expanding international buyer base driving higher auction yields, and growth in storage fees.',
      thesis_break_trigger: 'Sustained decline in insurance total loss frequency due to advanced safety systems, shortage of storage yard land capacity, or pricing pressure from major insurance clients.',
      evidence_needed: [
        'Insurance total loss frequency rate',
        'Global active yard storage capacity in acres',
        'Average fee revenue per vehicle processed',
        'International buyer volume growth',
        'Operating income margin percentage'
      ],
      evidence_quality: 'Partial',
      dossier_state: 'curated_profile_batch_13',
      frontend_label: 'Curated',
      coverage_status: 'Curated',
      needs_human_review: false,
      source: 'SEC 10-K / 10-Q'
    },
    visualPhaseOne: {
      faq: {
        overview: 'Copart operates a virtual monopoly in vehicle salvage auctions, leveraging its extensive network of physical storage yards to store and process wrecked cars.',
        thesisRisk: 'Key risks are a structural decline in car accident rates from autonomous driving tech, local zoning restrictions blocking yard expansions, and fluctuations in scrap metal prices.'
      },
      phaseTwo: {
        thesisRisk: [
          {
            category: 'Total Loss Rates',
            risk: 'Active driver safety technology or lower repair costs decrease the rate of cars declared total losses by insurers.',
            watch: 'US total loss frequency statistics.'
          },
          {
            category: 'Yard Expansion Blocks',
            risk: 'Difficulties in securing zoning permits for land acquisitions restrict storage growth in key metropolitan areas.',
            watch: 'Capital expenditures on land and yard development.'
          },
          {
            category: 'Salvage Values',
            risk: 'Decreases in used car values or global steel prices lower salvage auction yields.',
            watch: 'Used vehicle price indices and scrap metal prices.'
          }
        ]
      }
    }
  },
  CSGP: {
    ticker: 'CSGP',
    companyName: 'CoStar Group, Inc.',
    exchange: 'NASDAQ',
    overview: 'CoStar Group is a leading provider of commercial real estate information, analytics, and online marketplaces, operating major platforms such as CoStar, LoopNet, and Homes.com.',
    category: 'Real Estate Data & Marketplace',
    analysisDate: '2026-06-11',
    latestFiscalPeriod: 'Q1 2026 ended 2026-03-31',
    dossierVerdict: 'CoStar maintains subscription databases in commercial real estate data, while actively deploying capital to build Homes.com as a residential competitor.',
    valueCore: {
      ticker: 'CSGP',
      value_core_type: 'business_summary_thesis_risk',
      company_stage_candidate: 'High-Moat Software & Marketplace',
      primary_value_driver: 'Subscription model resilience in commercial real estate data, monetization of residential listing portals (Homes.com), and expansion into international markets.',
      thesis_break_trigger: 'Failing to monetize Homes.com despite elevated advertising investments, persistent decline in commercial real estate client base, or integration challenges with acquisitions.',
      evidence_needed: [
        'Homes.com paid subscription additions',
        'Commercial real estate subscription retention rate',
        'Sales and marketing expenses as a percentage of revenue',
        'Total monthly active users on marketplaces',
        'Average revenue per advertiser'
      ],
      evidence_quality: 'Partial',
      dossier_state: 'curated_profile_batch_13',
      frontend_label: 'Curated',
      coverage_status: 'Curated',
      needs_human_review: false,
      source: 'SEC 10-K / 10-Q'
    },
    visualPhaseOne: {
      faq: {
        overview: 'CoStar Group is the dominant database provider for commercial real estate and is actively investing to compete in the residential real estate listing market.',
        thesisRisk: 'The primary risk is the high cash burn associated with marketing Homes.com to compete with entrenched residential rivals, and cyclical commercial real estate downturns.'
      },
      phaseTwo: {
        thesisRisk: [
          {
            category: 'Residential Cash Burn',
            risk: 'High marketing campaigns for Homes.com do not translate into adequate high-margin advertiser revenue.',
            watch: 'Sales and marketing expenses and Homes.com revenue.'
          },
          {
            category: 'Subscription Churn',
            risk: 'A prolonged downturn in commercial real estate transaction volumes leads to broker layoffs and database subscription cancellations.',
            watch: 'CoStar Suite retention rates.'
          },
          {
            category: 'Competitive Backlash',
            risk: 'Entrenched residential listing competitors lower prices or block agent access to defend market share.',
            watch: 'Residential agent subscriber counts and ARPU.'
          }
        ]
      }
    }
  },
  CSX: {
    ticker: 'CSX',
    companyName: 'CSX Corporation',
    exchange: 'NASDAQ',
    overview: 'CSX Corporation is a major rail transportation company in North America, operating a network that covers the Eastern United States, transporting coal, intermodal containers, and diverse industrial goods.',
    category: 'Transportation & Logistics',
    analysisDate: '2026-06-11',
    latestFiscalPeriod: 'Q1 2026 ended 2026-03-31',
    dossierVerdict: 'CSX operates a vital rail logistics network in the Eastern US, focusing on Precision Scheduled Railroading and coal/intermodal shipping cycles.',
    valueCore: {
      ticker: 'CSX',
      value_core_type: 'business_summary_thesis_risk',
      company_stage_candidate: 'Cyclical Industrial Infrastructure',
      primary_value_driver: 'Improvement in network operating efficiency (Precision Scheduled Railroading), conversion of highway truck traffic to intermodal rail, and coal export demand.',
      thesis_break_trigger: 'Extended service disruptions or derailments leading to regulatory penalties, labor shortages increasing overtime expenses, or structural decline in coal shipments.',
      evidence_needed: [
        'Average train velocity (mph)',
        'Terminal dwell time (hours)',
        'Quarterly carload volumes by product segment',
        'Operating ratio percentage',
        'Fuel surcharge revenue vs fuel expenses'
      ],
      evidence_quality: 'Partial',
      dossier_state: 'curated_profile_batch_13',
      frontend_label: 'Curated',
      coverage_status: 'Curated',
      needs_human_review: false,
      source: 'SEC 10-K / 10-Q'
    },
    visualPhaseOne: {
      faq: {
        overview: 'CSX operates a dual-rail network in the Eastern US, providing cost-effective heavy transport for industrial, energy, and intermodal freight.',
        thesisRisk: 'Risks are closely tied to regional industrial production, labor wage inflation, regulatory oversight regarding safety, and long-term decline in coal usage.'
      },
      phaseTwo: {
        thesisRisk: [
          {
            category: 'Network Efficiency',
            risk: 'Congestion at major rail terminals lowers train velocity, reducing asset turns and service reliability.',
            watch: 'Average train velocity and dwell time.'
          },
          {
            category: 'Macro Freight Downturn',
            risk: 'Declines in manufacturing output or retail imports reduce intermodal and industrial carload volumes.',
            watch: 'Segment carload volumes.'
          },
          {
            category: 'Regulatory Oversight',
            risk: 'Strict safety rules post-derailment increase operating costs and capex requirements.',
            watch: 'Casualty and insurance expenses and track maintenance capex.'
          }
        ]
      }
    }
  },
  CTAS: {
    ticker: 'CTAS',
    companyName: 'Cintas Corporation',
    exchange: 'NASDAQ',
    overview: 'Cintas Corporation is a leading provider of corporate uniform rental programs, facility services, first aid and safety supplies, and fire protection services to businesses across North America.',
    category: 'Business Services',
    analysisDate: '2026-06-11',
    latestFiscalPeriod: 'Q3 2026 ended 2026-02-28',
    dossierVerdict: 'Cintas benefits from high customer retention and route density, expanding uniform rental programs and facilities services to business customers.',
    valueCore: {
      ticker: 'CTAS',
      value_core_type: 'business_summary_thesis_risk',
      company_stage_candidate: 'Mature Business Services / Consolidation',
      primary_value_driver: 'Route density expansion lowering travel costs per customer, high retention rates, and cross-selling facility/first-aid services to existing uniform rental clients.',
      thesis_break_trigger: 'Sharp rise in corporate employee layoffs reducing uniform users, persistent fuel price inflation eroding route margins, or high customer churn.',
      evidence_needed: [
        'Organic revenue growth rate',
        'Gross profit margin percentage',
        'Route service rep headcount and wage growth',
        'Average route fuel cost per mile',
        'Customer contract retention rate'
      ],
      evidence_quality: 'Partial',
      dossier_state: 'curated_profile_batch_13',
      frontend_label: 'Curated',
      coverage_status: 'Curated',
      needs_human_review: false,
      source: 'SEC 10-K / 10-Q'
    },
    visualPhaseOne: {
      faq: {
        overview: 'Cintas provides uniform rentals and facility maintenance, operating a large route distribution network across North America.',
        thesisRisk: 'Primary risks are labor costs, route delivery fuel price changes, and changes in corporate employment levels that dictate the number of uniforms needed.'
      },
      phaseTwo: {
        thesisRisk: [
          {
            category: 'Employment Levels',
            risk: 'Economic slowdowns lead to layoffs in manufacturing, service, and hospitality sectors, reducing active uniform wearers.',
            watch: 'US employment trends and Cintas organic uniform growth.'
          },
          {
            category: 'Route Logistics Costs',
            risk: 'Surges in diesel and gasoline prices increase route operating expenses.',
            watch: 'Operating expense margins and fuel costs.'
          },
          {
            category: 'Labor Pressures',
            risk: 'Wage inflation for route drivers and laundry plant employees compresses gross margins.',
            watch: 'Selling, general, and administrative labor costs.'
          }
        ]
      }
    }
  },
  CTSH: {
    ticker: 'CTSH',
    companyName: 'Cognizant Technology Solutions Corporation',
    exchange: 'NASDAQ',
    overview: 'Cognizant is a multinational provider of information technology, consulting, and business process outsourcing services, helping enterprises modernize core systems and integrate digital workflows.',
    category: 'IT Consulting & Outsourcing',
    analysisDate: '2026-06-11',
    latestFiscalPeriod: 'Q1 2026 ended 2026-03-31',
    dossierVerdict: 'Cognizant provides digital consulting and system integration services, managing margin pressures through global delivery centers.',
    valueCore: {
      ticker: 'CTSH',
      value_core_type: 'business_summary_thesis_risk',
      company_stage_candidate: 'Mature Technology Services',
      primary_value_driver: 'Enterprise transition to digital operations and cloud infrastructure, cost advantages from offshore delivery centers, and expansion of multi-year outsourcing contracts.',
      thesis_break_trigger: 'Corporate IT budget cuts delaying digital consulting projects, high wage inflation in offshore delivery hubs compressing margins, or loss of large accounts to Indian or global competitors.',
      evidence_needed: [
        'Digital segment revenue growth',
        'Voluntary employee attrition rate',
        'Global delivery headcount and utilization rate',
        'Average hourly billing rate realized',
        'Operating margin percentage'
      ],
      evidence_quality: 'Partial',
      dossier_state: 'curated_profile_batch_13',
      frontend_label: 'Curated',
      coverage_status: 'Curated',
      needs_human_review: false,
      source: 'SEC 10-K / 10-Q'
    },
    visualPhaseOne: {
      faq: {
        overview: 'Cognizant is a major global IT services firm, utilizing a large offshore labor pool (primarily in India) to deliver software development and consulting services.',
        thesisRisk: 'Key risks include wage inflation for software engineers, high attrition, client budget pressure, and the transition of enterprise spending to AI automation.'
      },
      phaseTwo: {
        thesisRisk: [
          {
            category: 'IT Budget Reductions',
            risk: 'Global clients defer discretionary software development and system integration spending.',
            watch: 'Total backlog value and consulting segment revenue.'
          },
          {
            category: 'Talent Cost Inflation',
            risk: 'Rising salaries for tech talent in offshore delivery centers erode consulting margins.',
            watch: 'Cost of services and voluntary employee attrition rates.'
          },
          {
            category: 'Technological Disruption',
            risk: 'AI code generation tools reduce the need for junior developers, pressuring traditional billing models.',
            watch: 'Utilization rates and average billing rates.'
          }
        ]
      }
    }
  },
  CVS: {
    ticker: 'CVS',
    companyName: 'CVS Health Corporation',
    exchange: 'NYSE',
    overview: 'CVS Health is an integrated healthcare provider operating retail pharmacies, a pharmacy benefit manager (Caremark), and a health insurance segment (Aetna), coordinating prescription and medical care.',
    category: 'Healthcare Services & Pharmacy',
    analysisDate: '2026-06-11',
    latestFiscalPeriod: 'Q1 2026 ended 2026-03-31',
    dossierVerdict: 'CVS Health operates an integrated healthcare network, balancing retail pharmacy volumes against medical cost inflation in its insurance operations.',
    valueCore: {
      ticker: 'CVS',
      value_core_type: 'business_summary_thesis_risk',
      company_stage_candidate: 'Mature Integrated Healthcare',
      primary_value_driver: 'Expansion of pharmacy benefit management (PBM) volumes, management of healthcare insurance premium yields, and growth in clinical primary care services.',
      thesis_break_trigger: 'Medicare Advantage medical benefit ratio rising significantly due to high utilization, pharmacy reimbursement rate cuts by government programs, or regulatory restrictions on PBM pricing.',
      evidence_needed: [
        'Medicare Advantage Medical Benefit Ratio (MBR)',
        'Total retail pharmacy scripts processed',
        'PBM product profit margins',
        'Operating cash flow conversion',
        'Interest coverage ratio on outstanding debt'
      ],
      evidence_quality: 'Partial',
      dossier_state: 'curated_profile_batch_13',
      frontend_label: 'Curated',
      coverage_status: 'Curated',
      needs_human_review: false,
      source: 'SEC 10-K / 10-Q'
    },
    visualPhaseOne: {
      faq: {
        overview: 'CVS Health operates an integrated healthcare model combining insurance (Aetna), pharmacy benefits (Caremark), and retail clinics.',
        thesisRisk: 'The primary risk is healthcare insurance cost inflation, particularly within Medicare Advantage, along with drug reimbursement pressures and regulatory scrutiny on PBM practices.'
      },
      phaseTwo: {
        thesisRisk: [
          {
            category: 'Medical Loss Inflation',
            risk: 'Elevated outpatient utilization rates among Medicare Advantage members increase claim payouts.',
            watch: 'Health Care Benefits segment Medical Benefit Ratio.'
          },
          {
            category: 'Reimbursement Pressures',
            risk: 'Government programs or commercial insurers reduce pharmacy dispensing fees and drug reimbursement rates.',
            watch: 'Pharmacy Services segment gross margins.'
          },
          {
            category: 'Legislative Action',
            risk: 'Federal rules restricting PBM rebate retention or requiring net-pricing transparency compress transaction margins.',
            watch: 'Caremark segment operating margins.'
          }
        ]
      }
    }
  },
  DAL: {
    ticker: 'DAL',
    companyName: 'Delta Air Lines, Inc.',
    exchange: 'NYSE',
    overview: 'Delta Air Lines is a major global carrier operating an international network of scheduled air transportation for passengers and cargo, supported by its premium branding and loyalty program (SkyMiles).',
    category: 'Transportation & Airlines',
    analysisDate: '2026-06-11',
    latestFiscalPeriod: 'Q1 2026 ended 2026-03-31',
    dossierVerdict: 'Delta focuses on premium seating expansion and loyalty program revenues, managing seasonal demand changes and jet fuel price fluctuations.',
    valueCore: {
      ticker: 'DAL',
      value_core_type: 'business_summary_thesis_risk',
      company_stage_candidate: 'Cyclical Consumer & Business Travel',
      primary_value_driver: 'Premium passenger yield expansion, growth in high-margin co-brand credit card fees (American Express partnership), and domestic hub dominance.',
      thesis_break_trigger: 'Sharp decline in corporate travel demand, rapid increase in non-hedged jet fuel pricing, or pilot wage agreements significantly exceeding target cost structures.',
      evidence_needed: [
        'Passenger Revenue per Available Seat Mile (PRASM)',
        'Cost per Available Seat Mile excluding fuel (CASM-Ex)',
        'Average price paid per gallon of jet fuel',
        'SkyMiles co-brand cash revenue',
        'Total liquidity and net debt levels'
      ],
      evidence_quality: 'Partial',
      dossier_state: 'curated_profile_batch_13',
      frontend_label: 'Curated',
      coverage_status: 'Curated',
      needs_human_review: false,
      source: 'SEC 10-K / 10-Q'
    },
    visualPhaseOne: {
      faq: {
        overview: 'Delta is a premium-focused global airline, generating significant cash flow from its brand equity and co-branded credit card partnership.',
        thesisRisk: 'Key risks include fuel price shocks, pilot and labor wage inflation, and the cyclical nature of consumer discretionary and business travel spending.'
      },
      phaseTwo: {
        thesisRisk: [
          {
            category: 'Fuel Price Spikes',
            risk: 'Unhedged jet fuel price increases raise operating costs, which cannot be immediately passed to ticket buyers.',
            watch: 'Jet fuel cost per gallon and refinery margins.'
          },
          {
            category: 'Labor Cost Expansion',
            risk: 'New union contracts for pilots and ground crews elevate fixed operating costs.',
            watch: 'CASM-Ex growth rate.'
          },
          {
            category: 'Discretionary Travel Decline',
            risk: 'Economic contractions lead to lower load factors and pressure ticket yields.',
            watch: 'PRASM and load factor percentages.'
          }
        ]
      }
    }
  },
  DASH: {
    ticker: 'DASH',
    companyName: 'DoorDash, Inc.',
    exchange: 'NASDAQ',
    overview: 'DoorDash operates a local commerce platform connecting merchants, consumers, and delivery couriers (Dashers) in the United States and internationally, specializing in food and grocery delivery.',
    category: 'Marketplace & Delivery Services',
    analysisDate: '2026-06-11',
    latestFiscalPeriod: 'Q1 2026 ended 2026-03-31',
    dossierVerdict: 'DoorDash focuses on local marketplace scale, expanding its delivery courier logistics from food delivery to local grocery and convenience retail.',
    valueCore: {
      ticker: 'DASH',
      value_core_type: 'business_summary_thesis_risk',
      company_stage_candidate: 'High-Growth Marketplace & Logistics',
      primary_value_driver: 'Expansion of grocery and convenience retail delivery, optimization of logistics networks to lower delivery costs per order, and growth in high-margin advertising revenue.',
      thesis_break_trigger: 'Dasher incentive costs rising due to labor shortages, regulatory reclassification of couriers as employees increasing benefits costs, or marketplace GOV growth stagnation.',
      evidence_needed: [
        'Marketplace Gross Order Value (GOV)',
        'Marketplace Take Rate percentage',
        'Dasher acquisition and incentive expenses',
        'Adjusted EBITDA margin as a percentage of GOV',
        'Non-food delivery order volume growth'
      ],
      evidence_quality: 'Partial',
      dossier_state: 'curated_profile_batch_13',
      frontend_label: 'Curated',
      coverage_status: 'Curated',
      needs_human_review: false,
      source: 'SEC 10-K / 10-Q'
    },
    visualPhaseOne: {
      faq: {
        overview: 'DoorDash is the leading food delivery marketplace in the US, expanding into grocery, convenience, and local retail logistics.',
        thesisRisk: 'The thesis depends on maintaining courier supply without excessive incentive costs, managing regulatory classification risks, and scaling non-food delivery profitably.'
      },
      phaseTwo: {
        thesisRisk: [
          {
            category: 'Courier Incentives',
            risk: 'Labor tight markets require DoorDash to offer high bonuses to attract Dashers, compressing gross margins.',
            watch: 'Dasher acquisition and incentive costs.'
          },
          {
            category: 'Regulatory Classification',
            risk: 'Federal or state rulings forcing the reclassification of Dashers from independent contractors to employees.',
            watch: 'Legal and regulatory risk disclosures and SG&A expenses.'
          },
          {
            category: 'Growth Saturation',
            risk: 'US food delivery orders reach saturation, forcing dependency on lower-margin grocery delivery expansion.',
            watch: 'GOV growth rates and order frequency.'
          }
        ]
      }
    }
  }
,
  DELL: {
    ticker: 'DELL',
    companyName: 'Dell Technologies Inc.',
    exchange: 'NYSE',
    overview: 'Dell Technologies is a global provider of IT hardware, software, and services, offering client solutions (PCs) and infrastructure solutions (AI-optimized servers, storage, and networking) to enterprise and consumer segments.',
    category: 'Computing Hardware & IT Solutions',
    analysisDate: '2026-06-11',
    latestFiscalPeriod: 'Q1 2026 ended 2026-05-01',
    dossierVerdict: 'Dell Technologies balances cyclical PC business demand against structural growth in high-performance AI-optimized enterprise servers.',
    valueCore: {
      ticker: 'DELL',
      value_core_type: 'business_summary_thesis_risk',
      company_stage_candidate: 'Mature Tech Infrastructure / AI Transition',
      primary_value_driver: 'Scaling shipment of high-margin AI-optimized servers to cloud and enterprise clients, PC refresh cycle stabilization, and debt reduction.',
      thesis_break_trigger: 'Gross margins eroding due to competitive pricing in AI servers, severe component/GPU supply constraints delaying shipments, or a protracted downturn in PC demand.',
      evidence_needed: [
        'Infrastructure Solutions Group (ISG) revenue growth',
        'AI server backlog dollar value',
        'Consolidated gross profit margin',
        'Client Solutions Group (CSG) revenue',
        'Operating cash flow conversion'
      ],
      evidence_quality: 'Partial',
      dossier_state: 'curated_profile_batch_14',
      frontend_label: 'Curated',
      coverage_status: 'Curated',
      needs_human_review: false,
      source: 'SEC 10-K / 10-Q'
    },
    visualPhaseOne: {
      faq: {
        overview: 'Dell provides computers, enterprise servers, and storage solutions, heavily integrating artificial intelligence capabilities into its hardware line.',
        thesisRisk: 'The primary risk is the low gross margin on AI servers due to high component costs and competitive pricing, along with cyclical PC market demand.'
      },
      phaseTwo: {
        thesisRisk: [
          {
            category: 'Margin Compression',
            risk: 'Strong AI server demand fails to yield high operating profits due to severe GPU pricing pressure.',
            watch: 'ISG operating margin percentage.'
          },
          {
            category: 'Supply Constraints',
            risk: 'Delays in acquiring advanced semiconductor chips restrict server shipment volume.',
            watch: 'AI server backlog changes.'
          },
          {
            category: 'PC Cyclicality',
            risk: 'Slow corporate adoption of AI PCs extends the PC replacement cycle longer than expected.',
            watch: 'CSG segment revenue.'
          }
        ]
      }
    }
  },
  DUK: {
    ticker: 'DUK',
    companyName: 'Duke Energy Corporation',
    exchange: 'NYSE',
    overview: 'Duke Energy is one of the largest energy holding companies in the United States, providing electricity and natural gas services to customers across the Carolinas, Florida, Ohio, Indiana, and Kentucky.',
    category: 'Electric & Gas Utilities',
    analysisDate: '2026-06-11',
    latestFiscalPeriod: 'Q1 2026 ended 2026-03-31',
    dossierVerdict: 'Duke Energy manages a large regulated utility footprint, funding clean energy grid transitions through state-approved rate adjustments.',
    valueCore: {
      ticker: 'DUK',
      value_core_type: 'business_summary_thesis_risk',
      company_stage_candidate: 'Regulated Utility / Infrastructure',
      primary_value_driver: 'Timely regulatory approvals of rate cases to recover capital investments, expanding clean energy capacity, and data-center load growth.',
      thesis_break_trigger: 'Unfavorable regulatory rate decisions capping returns on equity, substantial construction cost overruns on clean energy transition, or rising interest rates raising financing costs.',
      evidence_needed: [
        'Approved return on equity (ROE) by state commissions',
        'Capital spending execution against guidance',
        'Data center and industrial load growth rate',
        'Weighted average cost of debt',
        'Retail customer growth rate'
      ],
      evidence_quality: 'Partial',
      dossier_state: 'curated_profile_batch_14',
      frontend_label: 'Curated',
      coverage_status: 'Curated',
      needs_human_review: false,
      source: 'SEC 10-K / 10-Q'
    },
    visualPhaseOne: {
      faq: {
        overview: 'Duke Energy operates regulated electricity and gas transmission networks, investing in low-carbon energy sources to meet clean energy goals.',
        thesisRisk: 'Primary risks are regulatory commission decisions on utility rates, construction delays or cost overruns, and high sensitivity to capital market interest rates.'
      },
      phaseTwo: {
        thesisRisk: [
          {
            category: 'Regulatory Decisions',
            risk: 'Commission rate approvals grant lower ROE than requested, compressing investment returns.',
            watch: 'Rate case decision filings and ROE parameters.'
          },
          {
            category: 'Construction Overruns',
            risk: 'Clean energy capital projects exceed cost budgets, with regulators blocking cost recovery from customers.',
            watch: 'Utility capital expenditures vs regulatory asset base.'
          },
          {
            category: 'Financing Costs',
            risk: 'Prolonged elevated interest rates increase interest expenses on debt-financed utility construction.',
            watch: 'Interest expense and debt-to-capital ratio.'
          }
        ]
      }
    }
  },
  DXCM: {
    ticker: 'DXCM',
    companyName: 'DexCom, Inc.',
    exchange: 'NASDAQ',
    overview: 'DexCom designs and manufactures continuous glucose monitoring (CGM) systems for people with diabetes, focusing on sensor accuracy, software connectivity, and integration with insulin pumps.',
    category: 'Medical Devices & Healthcare Tech',
    analysisDate: '2026-06-11',
    latestFiscalPeriod: 'Q1 2026 ended 2026-03-31',
    dossierVerdict: 'DexCom relies on CGM subscription sensor sales, expanding into non-insulin type 2 diabetes markets amid pricing competition.',
    valueCore: {
      ticker: 'DXCM',
      value_core_type: 'business_summary_thesis_risk',
      company_stage_candidate: 'High-Growth Medical Device',
      primary_value_driver: 'CGM adoption expansion in type 2 non-insulin diabetes populations, international market penetration, and partnership integration with automated insulin delivery systems.',
      thesis_break_trigger: 'Rapid erosion of average selling prices due to competitor discounting, slower-than-expected expansion into type 2 diabetes populations, or insurance coverage limitations.',
      evidence_needed: [
        'CGM subscriber volume growth',
        'Average selling price (ASP) per sensor',
        'Gross profit margin percentage',
        'R&D expenses as a percentage of sales',
        'Sales and marketing expense productivity'
      ],
      evidence_quality: 'Partial',
      dossier_state: 'curated_profile_batch_14',
      frontend_label: 'Curated',
      coverage_status: 'Curated',
      needs_human_review: false,
      source: 'SEC 10-K / 10-Q'
    },
    visualPhaseOne: {
      faq: {
        overview: 'DexCom provides medical sensors that continuously track blood glucose levels, eliminating the need for routine fingersticks.',
        thesisRisk: 'Risks involve competitive pricing pressure from other CGM manufacturers, changes in insurance reimbursement policies, and alternative diabetes treatment breakthroughs.'
      },
      phaseTwo: {
        thesisRisk: [
          {
            category: 'Price Competition',
            risk: 'Aggressive pricing from competitors forces DexCom to discount its sensor packages.',
            watch: 'Gross margin and sensor ASP trends.'
          },
          {
            category: 'Reimbursement Limits',
            risk: 'Health insurance providers restrict CGM coverage to specific patient categories, slowing sales growth.',
            watch: 'Reimbursement coverage updates.'
          },
          {
            category: 'Innovation Risks',
            risk: 'Failing to launch next-generation sensors on schedule allows competitors to gain market share.',
            watch: 'Product release schedules and R&D spending.'
          }
        ]
      }
    }
  },
  EA: {
    ticker: 'EA',
    companyName: 'Electronic Arts Inc.',
    exchange: 'NASDAQ',
    overview: 'Electronic Arts is a leading global developer and publisher of interactive entertainment, creating games for consoles, PCs, and mobile devices, supported by franchises like EA Sports FC, Madden NFL, and Apex Legends.',
    category: 'Interactive Entertainment & Gaming',
    analysisDate: '2026-06-11',
    latestFiscalPeriod: 'FY2026 ended 2026-03-31',
    dossierVerdict: 'Electronic Arts generates high-margin cash flow through live services integration within its dominant global sports gaming franchises.',
    valueCore: {
      ticker: 'EA',
      value_core_type: 'business_summary_thesis_risk',
      company_stage_candidate: 'Mature Intellectual Property / Digital Entertainment',
      primary_value_driver: 'Consistent monetization of live services in sports franchises, launching new original intellectual properties, and expanding margins through direct-to-consumer digital distribution.',
      thesis_break_trigger: 'Significant decline in active player engagement in core sports live services, commercial failure of major non-sports game releases, or player attrition in mobile segments.',
      evidence_needed: [
        'Live services net bookings growth',
        'Active player engagement count',
        'Digital bookings as a percentage of total bookings',
        'Mobile segment revenue growth',
        'R&D development spend efficiency'
      ],
      evidence_quality: 'Partial',
      dossier_state: 'curated_profile_batch_14',
      frontend_label: 'Curated',
      coverage_status: 'Curated',
      needs_human_review: false,
      source: 'SEC 10-K / 10-Q'
    },
    visualPhaseOne: {
      faq: {
        overview: 'EA publishes major video game franchises, relying heavily on recurring live service purchases (in-game content) within sports games.',
        thesisRisk: 'Core risks are the concentration of earnings in sports franchises, changing gamer preferences, and delays in major game development cycles.'
      },
      phaseTwo: {
        thesisRisk: [
          {
            category: 'Sports Concentration',
            risk: 'A decline in user spending on Ultimate Team game modes impacts overall recurring booking streams.',
            watch: 'Live services net bookings by game segment.'
          },
          {
            category: 'Development Delays',
            risk: 'Delays in major game release schedules shift projected revenue out of fiscal quarters.',
            watch: 'Game pipeline timelines and launch announcements.'
          },
          {
            category: 'Mobile Attrition',
            risk: 'Monetization changes or user acquisition costs in mobile games reduce segment profit contributions.',
            watch: 'Mobile net bookings and marketing expenses.'
          }
        ]
      }
    }
  },
  EMR: {
    ticker: 'EMR',
    companyName: 'Emerson Electric Co.',
    exchange: 'NYSE',
    overview: 'Emerson Electric is a global technology and engineering company providing automation solutions (control systems, software, valves, and instruments) to process, hybrid, and discrete manufacturing industries.',
    category: 'Industrial Automation & Control',
    analysisDate: '2026-06-11',
    latestFiscalPeriod: 'Q2 2026 ended 2026-03-31',
    dossierVerdict: 'Emerson focuses on process automation systems, utilizing order backlogs to buffer cyclical changes in industrial capital spending.',
    valueCore: {
      ticker: 'EMR',
      value_core_type: 'business_summary_thesis_risk',
      company_stage_candidate: 'Mature Industrial Automation',
      primary_value_driver: 'Enterprise demand for manufacturing automation and decarbonization solutions, software recurring revenue growth, and execution of portfolio restructuring.',
      thesis_break_trigger: 'A sharp contraction in global industrial capital spending, supply chain delays for specialized control components, or integration issues with software acquisitions.',
      evidence_needed: [
        'Organic order bookings growth rate',
        'Automation Solutions segment operating margin',
        'Software and control recurring revenue',
        'Total order backlog value',
        'Free cash flow conversion rate'
      ],
      evidence_quality: 'Partial',
      dossier_state: 'curated_profile_batch_14',
      frontend_label: 'Curated',
      coverage_status: 'Curated',
      needs_human_review: false,
      source: 'SEC 10-K / 10-Q'
    },
    visualPhaseOne: {
      faq: {
        overview: 'Emerson provides control software, measurement instrumentation, and industrial valves to optimize manufacturing and process facilities.',
        thesisRisk: 'Risks are tied to industrial capital cycles, the integration of new software assets, and economic activity in process industries like chemicals and power.'
      },
      phaseTwo: {
        thesisRisk: [
          {
            category: 'Capex Slowdown',
            risk: 'Global manufacturing firms reduce capital spending on automation upgrades during economic downturns.',
            watch: 'Organic order growth trends.'
          },
          {
            category: 'Backlog Drawdown',
            risk: 'Consuming backlog faster than new orders are secured reduces future revenue visibility.',
            watch: 'Backlog total value and book-to-bill ratio.'
          },
          {
            category: 'Integration Execution',
            risk: 'Failing to realize synergies or cross-promote software from acquired automation control companies.',
            watch: 'Software segment margins.'
          }
        ]
      }
    }
  },
  ETN: {
    ticker: 'ETN',
    companyName: 'Eaton Corporation plc',
    exchange: 'NYSE',
    overview: 'Eaton is a global power management company providing electrical components, systems, and services, alongside aerospace, vehicle, and eMobility products, focusing on electrical grid modernization and electrification.',
    category: 'Electrical Systems & Industrial Equipment',
    analysisDate: '2026-06-11',
    latestFiscalPeriod: 'Q1 2026 ended 2026-03-31',
    dossierVerdict: 'Eaton experiences backlog expansion driven by structural utility grid upgrades, manufacturing reshoring, and data center electrification.',
    valueCore: {
      ticker: 'ETN',
      value_core_type: 'business_summary_thesis_risk',
      company_stage_candidate: 'Industrial Electrification Growth',
      primary_value_driver: 'Data center infrastructure capacity expansion, utility grid upgrades, and manufacturing reshoring demanding advanced electrical systems.',
      thesis_break_trigger: 'Unexpected slowdown in data center capacity additions, material component shortages slowing backlog execution, or margin compression from industrial competitors.',
      evidence_needed: [
        'Electrical Americas segment organic revenue growth',
        'Total order backlog and backlog build rate',
        'Segment operating margin percentage',
        'Utility grid equipment bookings',
        'EMobility segment profitability'
      ],
      evidence_quality: 'Partial',
      dossier_state: 'curated_profile_batch_14',
      frontend_label: 'Curated',
      coverage_status: 'Curated',
      needs_human_review: false,
      source: 'SEC 10-K / 10-Q'
    },
    visualPhaseOne: {
      faq: {
        overview: 'Eaton designs and manufactures equipment to manage electrical, hydraulic, and mechanical power, heavily exposed to grid modernization and data center demand.',
        thesisRisk: 'Core risks are supply chain constraints limiting backlog shipment, project delays in commercial real estate/data centers, and cyclical industrial demand.'
      },
      phaseTwo: {
        thesisRisk: [
          {
            category: 'Supply Constraints',
            risk: 'Extended lead times for electrical switches, transformers, and components delay project completions.',
            watch: 'Segment inventory levels and backlog execution rates.'
          },
          {
            category: 'Data Center Delay',
            risk: 'Power grid connection delays slow down the construction of new data centers, deferring electrical equipment orders.',
            watch: 'Electrical segment backlogs.'
          },
          {
            category: 'Industrial Cyclicality',
            risk: 'Economic downturns in automotive and industrial markets reduce demand for mechanical power systems.',
            watch: 'Vehicle and aerospace segment revenues.'
          }
        ]
      }
    }
  },
  EXC: {
    ticker: 'EXC',
    companyName: 'Exelon Corporation',
    exchange: 'NASDAQ',
    overview: 'Exelon Corporation is a utility holding company operating fully regulated electric and natural gas transmission and distribution utilities, serving millions of customers in the Mid-Atlantic and Midwest.',
    category: 'Electric Utilities & Transmission',
    analysisDate: '2026-06-11',
    latestFiscalPeriod: 'Q1 2026 ended 2026-03-31',
    dossierVerdict: 'Exelon operates a regulated electric and gas transmission business model, recovering modernization capital expenditures through state commission rate approvals.',
    valueCore: {
      ticker: 'EXC',
      value_core_type: 'business_summary_thesis_risk',
      company_stage_candidate: 'Regulated Utility / Infrastructure',
      primary_value_driver: 'Execution of massive multi-year grid modernization capital plans, regulatory recovery of investments, and load growth from commercial customers.',
      thesis_break_trigger: 'Regulators rejecting rate case capital recovery requests, severe weather events raising storm restoration expenses, or rising interest rates raising capital costs.',
      evidence_needed: [
        'Approved rate base capital growth rate',
        'Return on equity (ROE) allowed by state commissions',
        'Storm restoration expenses incurred',
        'Interest coverage ratio',
        'Commercial and industrial load growth'
      ],
      evidence_quality: 'Partial',
      dossier_state: 'curated_profile_batch_14',
      frontend_label: 'Curated',
      coverage_status: 'Curated',
      needs_human_review: false,
      source: 'SEC 10-K / 10-Q'
    },
    visualPhaseOne: {
      faq: {
        overview: 'Exelon operates regulated electric and gas utilities, focusing solely on transmission and distribution services.',
        thesisRisk: 'Risks relate to regulatory approvals for rate hikes to fund grid upgrades, the impact of major storms, and capital market borrowing rates.'
      },
      phaseTwo: {
        thesisRisk: [
          {
            category: 'Rate Recovery Denials',
            risk: 'State utility commissions disallow rate base investments, lowering equity returns.',
            watch: 'Regulatory commission orders and rate case filings.'
          },
          {
            category: 'Weather Disruptions',
            risk: 'Severe weather events require massive emergency crew deployments, raising operating costs.',
            watch: 'Storm restoration cost disclosures.'
          },
          {
            category: 'Cost of Capital',
            risk: 'Higher interest rates raise borrowing costs for capital projects, reducing financial utility margins.',
            watch: 'Weighted average interest rate on outstanding utility bonds.'
          }
        ]
      }
    }
  },
  FANG: {
    ticker: 'FANG',
    companyName: 'Diamondback Energy, Inc.',
    exchange: 'NASDAQ',
    overview: 'Diamondback Energy is an independent oil and natural gas company focused on the acquisition, development, exploration, and exploitation of unconventional onshore oil and natural gas reserves in the Permian Basin of West Texas.',
    category: 'Oil & Gas Exploration & Production',
    analysisDate: '2026-06-11',
    latestFiscalPeriod: 'Q1 2026 ended 2026-03-31',
    dossierVerdict: 'Diamondback Energy operates low-cost unconventional oil reserves in the Permian Basin, returning free cash flow to equity owners based on commodity prices.',
    valueCore: {
      ticker: 'FANG',
      value_core_type: 'business_summary_thesis_risk',
      company_stage_candidate: 'Cyclical Commodity Producer',
      primary_value_driver: 'Low-cost Permian Basin acreage development, high drilling and completion efficiencies, and free cash flow generation for capital return.',
      thesis_break_trigger: 'Sustained decline in global crude oil prices below cash breakeven levels, oilfield service inflation raising capital costs, or pipeline capacity bottlenecks restricting Permian production.',
      evidence_needed: [
        'Daily oil production volumes (MBOE/d)',
        'Average realized oil price per barrel',
        'Drilling and completion capital expenditure per well',
        'Free cash flow conversion rate',
        'Permian Basin pipeline throughput capacity'
      ],
      evidence_quality: 'Partial',
      dossier_state: 'curated_profile_batch_14',
      frontend_label: 'Curated',
      coverage_status: 'Curated',
      needs_human_review: false,
      source: 'SEC 10-K / 10-Q'
    },
    visualPhaseOne: {
      faq: {
        overview: 'Diamondback is a pure-play Permian Basin oil producer, utilizing high-efficiency horizontal drilling to extract unconventional reserves.',
        thesisRisk: 'Key risks include high exposure to crude oil market price volatility, oilfield service cost inflation, and geological reservoir degradation over time.'
      },
      phaseTwo: {
        thesisRisk: [
          {
            category: 'Commodity Volatility',
            risk: 'A drop in WTI oil prices reduces operating revenues, impacting free cash flow levels.',
            watch: 'WTI pricing and cash operating margins.'
          },
          {
            category: 'Service Inflation',
            risk: 'Rising costs for drilling rigs, sand, water, and labor raise capital spending requirements.',
            watch: 'Drilling and completion capex per lateral foot.'
          },
          {
            category: 'Takeaway Constraints',
            risk: 'Pipeline bottlenecks in the Permian Basin force producers to market oil and gas at deep local discounts.',
            watch: 'Midstream transportation capacities and realized price differentials.'
          }
        ]
      }
    }
  },
  FAST: {
    ticker: 'FAST',
    companyName: 'Fastenal Company',
    exchange: 'NASDAQ',
    overview: 'Fastenal is a distributor of industrial and construction supplies, offering fasteners, tools, safety products, and inventory management solutions through physical branches, Onsite locations, and industrial vending machines.',
    category: 'Industrial Distribution & Logistics',
    analysisDate: '2026-06-11',
    latestFiscalPeriod: 'Q1 2026 ended 2026-03-31',
    dossierVerdict: 'Fastenal utilizes integrated supply chain programs, including Onsite locations and industrial vending installations, to manage cyclical industrial tool demand.',
    valueCore: {
      ticker: 'FAST',
      value_core_type: 'business_summary_thesis_risk',
      company_stage_candidate: 'Mature Industrial Distribution / Logistics Partner',
      primary_value_driver: 'Onsite location signings integrating Fastenal into customer facilities, scaling industrial vending machine installs, and route logistics efficiency.',
      thesis_break_trigger: 'Contraction in US manufacturing activity, pricing pressure from competitors eroding gross margins, or slowdown in corporate signing rates for new Onsite programs.',
      evidence_needed: [
        'Daily sales growth percentage',
        'Active Onsite locations signed',
        'Gross profit margin percentage',
        'Fastener vs non-fastener sales mix',
        'Vending machine installations count'
      ],
      evidence_quality: 'Partial',
      dossier_state: 'curated_profile_batch_14',
      frontend_label: 'Curated',
      coverage_status: 'Curated',
      needs_human_review: false,
      source: 'SEC 10-K / 10-Q'
    },
    visualPhaseOne: {
      faq: {
        overview: 'Fastenal distributes industrial fasteners and tools, embedding its supply chain within customer plants through Onsite programs and smart vending machines.',
        thesisRisk: 'The primary risk is cyclical contraction in manufacturing and construction industries, along with commodity pricing volatility in steel and shipping.'
      },
      phaseTwo: {
        thesisRisk: [
          {
            category: 'Manufacturing Downturn',
            risk: 'Slowing US industrial production reduces customer demand for maintenance and repair parts.',
            watch: 'Daily sales growth rate and industrial PMI.'
          },
          {
            category: 'Gross Margin Erosion',
            risk: 'Product cost inflation cannot be fully passed through due to competitive distribution dynamics.',
            watch: 'Gross margin percentage.'
          },
          {
            category: 'Program Signing Slowdown',
            risk: 'Corporate clients delay entering into new long-term Onsite supply agreements.',
            watch: 'Onsite sign-up count and active base.'
          }
        ]
      }
    }
  },
  FDX: {
    ticker: 'FDX',
    companyName: 'FedEx Corporation',
    exchange: 'NYSE',
    overview: 'FedEx Corporation provides a broad portfolio of transportation, e-commerce, and business services, operating major segments including FedEx Express (time-definite delivery) and FedEx Ground (day-definite delivery).',
    category: 'Transportation & Express Delivery',
    analysisDate: '2026-06-11',
    latestFiscalPeriod: 'Q3 2026 ended 2026-02-28',
    dossierVerdict: 'FedEx executes a multi-year network integration program to combine Express and Ground operations, managing volume changes in global trade.',
    valueCore: {
      ticker: 'FDX',
      value_core_type: 'business_summary_thesis_risk',
      company_stage_candidate: 'Cyclical Transport / Operational Restructuring',
      primary_value_driver: 'Cost reduction synergies from integrating Express and Ground networks (One FedEx), package volume recovery, and pricing discipline.',
      thesis_break_trigger: 'Failure to achieve target cost savings from the network integration, pricing wars in air and ground shipping, or steep declines in global trade volumes.',
      evidence_needed: [
        'Daily package volume growth (Express & Ground)',
        'Average revenue per package (yield)',
        'One FedEx program cost savings realized',
        'Operating income margin by segment',
        'Fuel surcharge revenues vs fuel costs'
      ],
      evidence_quality: 'Partial',
      dossier_state: 'curated_profile_batch_14',
      frontend_label: 'Curated',
      coverage_status: 'Curated',
      needs_human_review: false,
      source: 'SEC 10-K / 10-Q'
    },
    visualPhaseOne: {
      faq: {
        overview: 'FedEx operates a global express delivery and logistics network, undergoing a major structural integration of its separate delivery networks.',
        thesisRisk: 'Core risks are execution issues in the network consolidation program, competition from Amazon and UPS, and cyclical trade and consumer shipping patterns.'
      },
      phaseTwo: {
        thesisRisk: [
          {
            category: 'Integration Execution',
            risk: 'Consolidating duplicate sorting facilities and delivery routes causes service disruptions or fails to achieve target savings.',
            watch: 'One FedEx program progress reports and restructuring charges.'
          },
          {
            category: 'Competitive Yield Pressures',
            risk: 'Aggressive pricing from delivery competitors reduces average revenue per package.',
            watch: 'Express and Ground yield metrics.'
          },
          {
            category: 'Volume Contraction',
            risk: 'Slowing global trade or consumer retail activity leads to lower package volumes.',
            watch: 'Average daily package volumes.'
          }
        ]
      }
    }
  }
,
  FER: {
    ticker: 'FER',
    companyName: 'Ferrari N.V.',
    exchange: 'NYSE',
    overview: 'Ferrari N.V. is a global designer, manufacturer, and seller of high-performance luxury sports cars, utilizing extreme brand exclusivity, low production volumes, and racing heritage to command industry-leading margins and pricing power.',
    category: 'Luxury Automotive',
    analysisDate: '2026-06-11',
    latestFiscalPeriod: 'Q1 2026 ended 2026-03-31',
    dossierVerdict: 'Ferrari N.V. commands extreme brand exclusivity and pricing power, leveraging vehicle personalization customization programs and long backlogs.',
    valueCore: {
      ticker: 'FER',
      value_core_type: 'business_summary_thesis_risk',
      company_stage_candidate: 'Mature Premium Luxury / High-Moat Brand',
      primary_value_driver: 'Expanding vehicle personalization customization programs, pricing premium actions on new releases, and scaling hybrid and EV powertrains while maintaining low production caps.',
      thesis_break_trigger: 'Structural contraction in high-net-worth individual demand, dealer inventory accumulation due to overproduction, or margins compressing due to EV development costs.',
      evidence_needed: [
        'Personalization revenue as a percentage of car revenues',
        'Multi-year order book backlog coverage duration',
        'EBITDA and EBIT profit margins',
        'Hybrid and BEV unit volume mix percentage',
        'Capital spending on next-generation manufacturing facilities'
      ],
      evidence_quality: 'Partial',
      dossier_state: 'curated_profile_batch_15',
      frontend_label: 'Curated',
      coverage_status: 'Curated',
      needs_human_review: false,
      source: 'SEC 20-F / 6-K'
    },
    visualPhaseOne: {
      faq: {
        overview: 'Ferrari is an iconic luxury brand that produces limited numbers of high-performance sports cars, maintaining a highly exclusive waitlist.',
        thesisRisk: 'Key risks include brand dilution if production volumes are raised too quickly, high development costs for new electric vehicle lines, and macro shifts affecting global high-net-worth consumer wealth.'
      },
      phaseTwo: {
        thesisRisk: [
          {
            category: 'Brand Dilution',
            risk: 'Over-shipping vehicles to meet near-term revenue targets degrades the exclusivity and secondary market resale value of the brand.',
            watch: 'Annual vehicle shipment volumes and backlog length.'
          },
          {
            category: 'Electrification Costs',
            risk: 'Heavy research and development investment for the first electric Ferrari fails to match traditional internal combustion margin structures.',
            watch: 'R&D spending and gross margins.'
          },
          {
            category: 'Macro Wealth Shocks',
            risk: 'Global economic contractions reduce demand for optional personalization features, lowering average transaction prices.',
            watch: 'Personalization attach rates and average price per vehicle.'
          }
        ]
      }
    }
  },
  FTNT: {
    ticker: 'FTNT',
    companyName: 'Fortinet, Inc.',
    exchange: 'NASDAQ',
    overview: 'Fortinet is a global cybersecurity leader providing integrated network security solutions, including hardware firewall appliances (FortiGate), Secure Access Service Edge (SASE) software, and unified security operations platforms.',
    category: 'Cybersecurity & Network Solutions',
    analysisDate: '2026-06-11',
    latestFiscalPeriod: 'Q1 2026 ended 2026-03-31',
    dossierVerdict: 'Fortinet transitions clients from hardware firewall appliances to SASE software subscriptions, managing cyclical IT hardware refresh cycles.',
    valueCore: {
      ticker: 'FTNT',
      value_core_type: 'business_summary_thesis_risk',
      company_stage_candidate: 'High-Growth Cybersecurity / IT Security',
      primary_value_driver: 'Transitioning customer base from hardware firewall appliances to recurring SASE and cloud security software subscriptions, and expanding unified threat management features.',
      thesis_break_trigger: 'Slowing enterprise security billings growth, accelerated decline in firewall hardware demand before software scale, or gross margin compression from software competitor discounting.',
      evidence_needed: [
        'Total billings growth percentage',
        'SASE and cloud security software subscription revenue',
        'Product vs Service revenue growth split',
        'Deferred revenue backlog balance',
        'Operating income margin percentage'
      ],
      evidence_quality: 'Partial',
      dossier_state: 'curated_profile_batch_15',
      frontend_label: 'Curated',
      coverage_status: 'Curated',
      needs_human_review: false,
      source: 'SEC 10-K / 10-Q'
    },
    visualPhaseOne: {
      faq: {
        overview: 'Fortinet designs hardware firewall appliances and integrates cloud-based security software to protect corporate networks.',
        thesisRisk: 'Risks involve the cyclical hardware refresh cycle of security appliances, heavy competition in the SASE market, and the execution speed of its cloud software transition.'
      },
      phaseTwo: {
        thesisRisk: [
          {
            category: 'Cyclical Hardware Downturns',
            risk: 'Corporate customers deferring firewall appliance upgrades, leading to product revenue contraction.',
            watch: 'Product revenue growth rates.'
          },
          {
            category: 'Competitive SASE Markets',
            risk: 'Aggressive pricing from cloud-native cybersecurity rivals slows Fortinet\'s software subscription growth.',
            watch: 'Service segment margins and billings.'
          },
          {
            category: 'Inventory Digestion',
            risk: 'Distributors clearing excess hardware firewall inventories, temporarily reducing direct orders.',
            watch: 'Days sales outstanding and channel inventory levels.'
          }
        ]
      }
    }
  },
  GBDC: {
    ticker: 'GBDC',
    companyName: 'Golub Capital BDC, Inc.',
    exchange: 'NASDAQ',
    overview: 'Golub Capital BDC is a closed-end specialty finance company that operates as a business development company (BDC), primarily investing in senior secured, one-stop, and junior debt securities of US middle-market companies.',
    category: 'Specialty Finance / Private Credit BDC',
    analysisDate: '2026-06-11',
    latestFiscalPeriod: 'Q2 2026 ended 2026-03-31',
    dossierVerdict: 'Golub Capital BDC operates a middle-market private credit model, distributing interest income from senior secured first-lien portfolios.',
    valueCore: {
      ticker: 'GBDC',
      value_core_type: 'business_summary_thesis_risk',
      company_stage_candidate: 'BDC / Private Credit Vehicle',
      primary_value_driver: 'Generating stable interest income from senior secured first-lien loans, managing credit quality to limit default losses, and optimizing leverage capital structures.',
      thesis_break_trigger: 'Credit defaults and non-accruals rising significantly in the middle-market loan portfolio, NAV per share eroding due to credit losses, or NII falling below dividend distributions.',
      evidence_needed: [
        'Non-accrual loans as a percentage of total portfolio cost',
        'NAV per share change quarter-over-quarter',
        'Net Investment Income (NII) dividend coverage ratio',
        'Percentage of portfolio in first-lien debt',
        'Asset coverage ratio and regulatory leverage headroom'
      ],
      evidence_quality: 'Partial',
      dossier_state: 'curated_profile_batch_15',
      frontend_label: 'Curated',
      coverage_status: 'Curated',
      needs_human_review: false,
      source: 'SEC 10-K / 10-Q'
    },
    visualPhaseOne: {
      faq: {
        overview: 'Golub Capital BDC is a private credit fund providing debt financing to middle-market companies, returning interest income to shareholders.',
        thesisRisk: 'The primary risk is default activity in its underlying borrower portfolio due to high interest rates, alongside compression of net interest margins as base rates decline.'
      },
      phaseTwo: {
        thesisRisk: [
          {
            category: 'Credit Defaults',
            risk: 'High borrowing costs stress middle-market company cash flows, leading to debt defaults and restructuring losses.',
            watch: 'Non-accrual percentages and credit ratings of borrowers.'
          },
          {
            category: 'Spread Compression',
            risk: 'Increased competition in private credit capital deployment lowers loan pricing spreads relative to financing costs.',
            watch: 'Weighted average portfolio yield and interest expense spreads.'
          },
          {
            category: 'NAV Erosion',
            risk: 'Write-downs on portfolio valuations due to credit deterioration reduce overall net asset value.',
            watch: 'Quarterly NAV per share and realized/unrealized losses.'
          }
        ]
      }
    }
  },
  GD: {
    ticker: 'GD',
    companyName: 'General Dynamics Corporation',
    exchange: 'NYSE',
    overview: 'General Dynamics is a global aerospace and defense company, operating major segments including Marine Systems (nuclear submarines), Combat Systems (armored vehicles), Technologies (defense IT), and Aerospace (Gulfstream business jets).',
    category: 'Aerospace & Defense',
    analysisDate: '2026-06-11',
    latestFiscalPeriod: 'Q1 2026 ended 2026-03-31',
    dossierVerdict: 'General Dynamics manages long-cycle defense backlogs for nuclear submarines and corporate business jets, subject to labor shipyard capacity.',
    valueCore: {
      ticker: 'GD',
      value_core_type: 'business_summary_thesis_risk',
      company_stage_candidate: 'Mature Aerospace & Defense / Long-Cycle Backlog',
      primary_value_driver: 'Securing multi-decade Navy nuclear submarine contracts, Gulfstream business jet delivery acceleration, and global defense budget expansion.',
      thesis_break_trigger: 'Severe labor or supply shortages delaying submarine deliveries, production certifications delays for new Gulfstream models, or operating margin erosion on fixed-price defense contracts.',
      evidence_needed: [
        'Gulfstream aircraft delivery volumes',
        'Defense segment backlog book-to-bill ratio',
        'Marine Systems operating margin percentage',
        'Technologies segment backlog',
        'Free cash flow conversion rate'
      ],
      evidence_quality: 'Partial',
      dossier_state: 'curated_profile_batch_15',
      frontend_label: 'Curated',
      coverage_status: 'Curated',
      needs_human_review: false,
      source: 'SEC 10-K / 10-Q'
    },
    visualPhaseOne: {
      faq: {
        overview: 'General Dynamics designs corporate jets and builds combat systems, naval submarines, and communication systems for military customers.',
        thesisRisk: 'Key risks include supply chain and skilled labor constraints in naval shipyards, fixed-price contract margin risks, and jet delivery delays.'
      },
      phaseTwo: {
        thesisRisk: [
          {
            category: 'Shipyard Capacity Constraints',
            risk: 'Skilled welder shortages and component delays push back submarine completion dates, incurring penalty fees.',
            watch: 'Marine Systems segment margins and delivery milestones.'
          },
          {
            category: 'fixed-Price Margin Risks',
            risk: 'Inflation in labor and raw materials compresses profitability on long-term fixed-price defense contracts.',
            watch: 'Defense segment operating margins.'
          },
          {
            category: 'Business Jet Cycles',
            risk: 'Corporate cost-cutting or regulatory delays on flight certifications slow Gulfstream sales growth.',
            watch: 'Gulfstream deliveries and order book backlogs.'
          }
        ]
      }
    }
  },
  GE: {
    ticker: 'GE',
    companyName: 'General Electric Company',
    exchange: 'NYSE',
    overview: 'GE Aerospace (operating as General Electric Company) is a leading provider of jet engines, components, and integrated systems for commercial and military aircraft, generating high-margin recurring revenues from its extensive engine services and spare parts backlog.',
    category: 'Aerospace Propulsion & Systems',
    analysisDate: '2026-06-11',
    latestFiscalPeriod: 'Q1 2026 ended 2026-03-31',
    dossierVerdict: 'GE Aerospace operates a commercial jet engine model, generating recurring aftermarket service revenues from global aircraft engine fleets.',
    valueCore: {
      ticker: 'GE',
      value_core_type: 'business_summary_thesis_risk',
      company_stage_candidate: 'High-Moat Commercial Aerospace Services',
      primary_value_driver: 'Expanding the active installed base of commercial jet engines and capturing decades of high-margin aftermarket service shop visits and parts sales.',
      thesis_break_trigger: 'Persistent supplier supply chain bottlenecks delaying engine deliveries, safety groundings of key aircraft models, or decline in global passenger traffic reducing shop visits.',
      evidence_needed: [
        'Commercial engine shop visit volume growth',
        'Commercial engine delivery volumes (LEAP/GE9X)',
        'Services segment bookings and backlog',
        'Operating margin percentage',
        'Free cash flow generation'
      ],
      evidence_quality: 'Partial',
      dossier_state: 'curated_profile_batch_15',
      frontend_label: 'Curated',
      coverage_status: 'Curated',
      needs_human_review: false,
      source: 'SEC 10-K / 10-Q'
    },
    visualPhaseOne: {
      faq: {
        overview: 'GE Aerospace (retaining the GE ticker) designs jet engines and provides aftermarket services for a significant portion of global commercial aircraft.',
        thesisRisk: 'The primary risk is supply chain constraints delaying new engine production and spare parts deliveries, along with cyclical aviation demand.'
      },
      phaseTwo: {
        thesisRisk: [
          {
            category: 'Supply Chain Bottlenecks',
            risk: 'Shortages of specialty castings and forgings limit engine production rates.',
            watch: 'Engine delivery volumes vs aircraft manufacturing schedules.'
          },
          {
            category: 'Service Shop Visit Volatility',
            risk: 'Airlines deferring discretionary engine maintenance shop visits to manage cash flow.',
            watch: 'Services revenue growth and shop visit counts.'
          },
          {
            category: 'Customer Fleet Risks',
            risk: 'Operational disruptions or groundings of aircraft fleets using GE engines curtail utilization.',
            watch: 'Flight hours of installed engine base.'
          }
        ]
      }
    }
  },
  GEHC: {
    ticker: 'GEHC',
    companyName: 'GE HealthCare Technologies Inc.',
    exchange: 'NASDAQ',
    overview: 'GE HealthCare Technologies is a leading global medical technology company specializing in medical imaging (MRI, CT, ultrasound), pharmaceutical diagnostics, and digital health solutions for hospital networks.',
    category: 'Medical Imaging & Healthcare Tech',
    analysisDate: '2026-06-11',
    latestFiscalPeriod: 'Q1 2026 ended 2026-03-31',
    dossierVerdict: 'GE HealthCare leverages healthcare system installations to supply diagnostic contrast media and medical imaging services.',
    valueCore: {
      ticker: 'GEHC',
      value_core_type: 'business_summary_thesis_risk',
      company_stage_candidate: 'Mature Healthcare Equipment',
      primary_value_driver: 'Global hospital demand for advanced MRI and CT systems, scaling high-margin pharmaceutical diagnostics agents, and expanding digital health subscription software.',
      thesis_break_trigger: 'Substantial decline in hospital capital budgets, raw material price spikes in imaging contrast agents, or delays in product development pipelines.',
      evidence_needed: [
        'Imaging segment revenue growth',
        'Product and service gross profit margins',
        'Pharmaceutical Diagnostics segment operating margin',
        'Order backlog drawdown rate',
        'Free cash flow conversion rate'
      ],
      evidence_quality: 'Partial',
      dossier_state: 'curated_profile_batch_15',
      frontend_label: 'Curated',
      coverage_status: 'Curated',
      needs_human_review: false,
      source: 'SEC 10-K / 10-Q'
    },
    visualPhaseOne: {
      faq: {
        overview: 'GE HealthCare designs medical imaging equipment and diagnostic agents used in hospitals worldwide, spun off from General Electric.',
        thesisRisk: 'Key risks include hospital capital budget cycles, supply chain component costs, and the development timeline of molecular imaging agents.'
      },
      phaseTwo: {
        thesisRisk: [
          {
            category: 'Capex Budget Cuts',
            risk: 'Healthcare systems reduce capital spending on expensive MRI and CT equipment during economic pressure.',
            watch: 'Imaging segment bookings.'
          },
          {
            category: 'Diagnostic Input Inflation',
            risk: 'Price increases in raw materials for contrast media, such as iodine, reduce diagnostic margins.',
            watch: 'Pharmaceutical Diagnostics segment profit margins.'
          },
          {
            category: 'Product Development Delays',
            risk: 'Slower regulatory clearance for next-generation imaging software and hardware.',
            watch: 'FDA approval announcements and R&D spending.'
          }
        ]
      }
    }
  },
  GEV: {
    ticker: 'GEV',
    companyName: 'GE Vernova Inc.',
    exchange: 'NYSE',
    overview: 'GE Vernova is a global energy transition company operating in Power (gas and steam turbines), Wind (onshore and offshore turbines), and Electrification (grid systems and software), helping utilities decarbonize electricity generation.',
    category: 'Energy Transition / Restructuring',
    analysisDate: '2026-06-11',
    latestFiscalPeriod: 'Q1 2026 ended 2026-03-31',
    dossierVerdict: 'GE Vernova operates wind and gas turbine platforms, executing margin recovery programs in wind projects and grid upgrades.',
    valueCore: {
      ticker: 'GEV',
      value_core_type: 'business_summary_thesis_risk',
      company_stage_candidate: 'Energy Transition / Restructuring',
      primary_value_driver: 'Turnaround of Wind segment margins through onshore turbine pricing and restructuring offshore commitments, alongside steady services revenue from gas power turbine fleets.',
      thesis_break_trigger: 'Persistent losses or warranty charges in offshore wind operations, decline in gas turbine aftermarket services, or grid infrastructure delays.',
      evidence_needed: [
        'Wind segment operating margin and backlog profitability',
        'Power segment services revenue growth',
        'Electrification segment backlog growth',
        'Total order book bookings',
        'Restructuring charges and cash margins'
      ],
      evidence_quality: 'Partial',
      dossier_state: 'curated_profile_batch_15',
      frontend_label: 'Curated',
      coverage_status: 'Curated',
      needs_human_review: false,
      source: 'SEC 10-K / 10-Q'
    },
    visualPhaseOne: {
      faq: {
        overview: 'GE Vernova provides wind, gas, and grid electrification systems to utilities globally, spun off from General Electric in 2024.',
        thesisRisk: 'The primary risk is profit margin execution in the Wind turbine segment, especially offshore wind contracts, alongside grid capacity constraints.'
      },
      phaseTwo: {
        thesisRisk: [
          {
            category: 'Wind Margin Volatility',
            risk: 'Historically signed low-price offshore wind contracts incur inflation and construction cost overruns.',
            watch: 'Wind segment operating income and margins.'
          },
          {
            category: 'Aftermarket Services Decline',
            risk: 'Utilities deferring gas turbine services as they transition toward renewables.',
            watch: 'Power segment services bookings.'
          },
          {
            category: 'Grid Electrification Blocks',
            risk: 'Delays in utility grid upgrades prevent new wind and gas generation connections.',
            watch: 'Electrification segment backlogs.'
          }
        ]
      }
    }
  },
  GILD: {
    ticker: 'GILD',
    companyName: 'Gilead Sciences, Inc.',
    exchange: 'NASDAQ',
    overview: 'Gilead Sciences is a research-based biopharmaceutical company focused on the discovery, development, and commercialization of innovative medicines in areas of unmet medical need, including HIV, oncology, and viral hepatitis.',
    category: 'Biopharmaceuticals',
    analysisDate: '2026-06-11',
    latestFiscalPeriod: 'Q1 2026 ended 2026-03-31',
    dossierVerdict: 'Gilead Sciences supports HIV antiviral markets while deploying cash reserves into oncology therapeutics pipelines.',
    valueCore: {
      ticker: 'GILD',
      value_core_type: 'business_summary_thesis_risk',
      company_stage_candidate: 'Mature Biopharma / Pipeline transition',
      primary_value_driver: 'Sustained market share in HIV therapies, expanding oncology therapeutics, and clinical development of next-generation drug candidates.',
      thesis_break_trigger: 'Unexpected clinical trial failures for late-stage oncology assets, earlier-than-expected generic competition for core HIV drugs, or regulatory rejections of new drug applications.',
      evidence_needed: [
        'HIV product sales (Biktarvy)',
        'Oncology product sales growth (Trodelvy)',
        'Clinical development pipeline phase milestones',
        'R&D expenses as a percentage of revenue',
        'Operating cash flow conversion'
      ],
      evidence_quality: 'Partial',
      dossier_state: 'curated_profile_batch_15',
      frontend_label: 'Curated',
      coverage_status: 'Curated',
      needs_human_review: false,
      source: 'SEC 10-K / 10-Q'
    },
    visualPhaseOne: {
      faq: {
        overview: 'Gilead is a major biotechnology company dominant in HIV treatment, actively investing to build a diversified oncology drug pipeline.',
        thesisRisk: 'Key risks are the impending patent expirations of core HIV therapies and the execution risk of oncology clinical trials.'
      },
      phaseTwo: {
        thesisRisk: [
          {
            category: 'Patent Expirations',
            risk: 'Loss of exclusivity for major HIV treatments leads to generic competition and revenue erosion.',
            watch: 'HIV franchise revenue split and patent dates.'
          },
          {
            category: 'Clinical Trial Failures',
            risk: 'Late-stage oncology drug candidates fail to meet primary endpoints in clinical trials.',
            watch: 'Clinical phase trial announcements.'
          },
          {
            category: 'Acquisition Integration',
            risk: 'Heavy cash investments in biotech acquisitions fail to produce commercialized drug candidates.',
            watch: 'Goodwill write-downs and acquired R&D charges.'
          }
        ]
      }
    }
  },
  GM: {
    ticker: 'GM',
    companyName: 'General Motors Company',
    exchange: 'NYSE',
    overview: 'General Motors designs, builds, and sells cars, trucks, and automobile parts globally, transitioning its product lineup toward electric vehicles (EVs) while relying on internal combustion engine (ICE) truck profits.',
    category: 'Automotive Manufacturing',
    analysisDate: '2026-06-11',
    latestFiscalPeriod: 'Q1 2026 ended 2026-03-31',
    dossierVerdict: 'General Motors depends on North American ICE trucks and SUVs pricing power to fund scalable electric vehicle manufacturing.',
    valueCore: {
      ticker: 'GM',
      value_core_type: 'business_summary_thesis_risk',
      company_stage_candidate: 'Mature Auto / Transitioning Capital structure',
      primary_value_driver: 'Sustaining high pricing and margins on ICE trucks and SUVs, scaling EV production to achieve positive variable margins, and restructuring autonomous vehicle capital burn.',
      thesis_break_trigger: 'ICE truck pricing power eroding due to industry oversupply, inability to lower EV battery cell production costs, or severe regulatory barriers for Cruise autonomous operations.',
      evidence_needed: [
        'North America ICE utility and truck margins',
        'EV production volume and variable profit margin',
        'Automotive net pricing change',
        'Cruise autonomous vehicle capital burn rate',
        'Dealer inventory days supply'
      ],
      evidence_quality: 'Partial',
      dossier_state: 'curated_profile_batch_15',
      frontend_label: 'Curated',
      coverage_status: 'Curated',
      needs_human_review: false,
      source: 'SEC 10-K / 10-Q'
    },
    visualPhaseOne: {
      faq: {
        overview: 'GM is a legacy automaker generating core profits from large gasoline trucks in North America, while investing to build an electric and autonomous vehicle platform.',
        thesisRisk: 'Key risks include consumer demand shifts away from ICE vehicles before EV operations reach profitability, EV battery scaling costs, and autonomous technology safety regulation.'
      },
      phaseTwo: {
        thesisRisk: [
          {
            category: 'ICE Profit Erosion',
            risk: 'Increased industry discounts and competition reduce margins on high-profit trucks.',
            watch: 'Automotive average transaction prices and incentives.'
          },
          {
            category: 'EV Margin Pressure',
            risk: 'Sub-scale EV manufacturing plants incur high fixed cost drag, delaying positive variable margin targets.',
            watch: 'EV production volume and unit margins.'
          },
          {
            category: 'Autonomous Burn',
            risk: 'Prolonged development and regulatory compliance costs for the Cruise division consume capital without commercial scale.',
            watch: 'Cruise segment operating losses.'
          }
        ]
      }
    }
  },
  HON: {
    ticker: 'HON',
    companyName: 'Honeywell International Inc.',
    exchange: 'NASDAQ',
    overview: 'Honeywell is a diversified technology and manufacturing company, operating segments in Aerospace (aviation engines and avionics), Industrial Automation (safety and warehouse systems), Building Automation, and Energy & Sustainability Solutions.',
    category: 'Diversified Industrial Technology',
    analysisDate: '2026-06-11',
    latestFiscalPeriod: 'Q1 2026 ended 2026-03-31',
    dossierVerdict: 'Honeywell operates a diversified industrial conglomerate model, relying on aerospace component backlogs to manage business cycles.',
    valueCore: {
      ticker: 'HON',
      value_core_type: 'business_summary_thesis_risk',
      company_stage_candidate: 'Mature Diversified Industrial Conglomerate',
      primary_value_driver: 'Commercial aviation aftermarket services recovery, software-defined industrial automation expansion, and portfolio optimization through acquisitions.',
      thesis_break_trigger: 'Sustained slowdown in commercial aerospace flight hours, persistent contraction in warehouse automation capital orders, or integration failure of newly acquired industrial units.',
      evidence_needed: [
        'Aerospace segment organic revenue growth',
        'Industrial Automation orders and backlog',
        'Consolidated gross profit margin',
        'Backlog book-to-bill ratio',
        'Free cash flow conversion rate'
      ],
      evidence_quality: 'Partial',
      dossier_state: 'curated_profile_batch_15',
      frontend_label: 'Curated',
      coverage_status: 'Curated',
      needs_human_review: false,
      source: 'SEC 10-K / 10-Q'
    },
    visualPhaseOne: {
      faq: {
        overview: 'Honeywell is an industrial conglomerate providing flight systems, building controls, process safety software, and performance materials.',
        thesisRisk: 'Risks relate to commercial aviation spending cycles, cyclical business capital spending in warehouse automation, and execution of conglomerate reorganization.'
      },
      phaseTwo: {
        thesisRisk: [
          {
            category: 'Aerospace Supply Chains',
            risk: 'Component shortages delay aviation engine and avionics deliveries to aircraft builders.',
            watch: 'Aerospace segment backlog and shipment volumes.'
          },
          {
            category: 'Automation Downturn',
            risk: 'Slowing e-commerce growth reduces customer orders for new warehouse sorting automation systems.',
            watch: 'Industrial Automation orders.'
          },
          {
            category: 'Restructuring Execution',
            risk: 'Synergy execution delays from reorganizing its industrial and building divisions.',
            watch: 'Consolidated operating profit margins and restructuring costs.'
          }
        ]
      }
    }
  },
  HOOD: {
    ticker: 'HOOD',
    companyName: 'Robinhood Markets, Inc.',
    exchange: 'NASDAQ',
    logoUrl: buildStockLogoUrl('HOOD'),
    overview: 'Robinhood Markets provides a digital financial services platform that enables retail users to trade in equities, options, and cryptocurrencies, alongside offering subscription services and interest income programs.',
    category: 'Digital Financial Services & Brokerage',
    analysisDate: '2026-06-12',
    latestFiscalPeriod: 'Q1 2026 ended 2026-03-31',
    dossierVerdict: 'Robinhood operates a retail-focused trading platform, sensitive to transaction volume cycles and earning interest spreads on customer cash balances.',
    valueCore: {
      ticker: 'HOOD',
      value_core_type: 'business_summary_thesis_risk',
      company_stage_candidate: 'Growth Financial Services & Brokerage',
      primary_value_driver: 'Expanding gold subscription membership, attracting retail trading assets, increasing net interest margin on customer cash, and launching new transaction offerings.',
      thesis_break_trigger: 'Sustained drop in retail trading activity, retail asset outflows, net interest margin compression from rate cuts, or gold membership attrition.',
      evidence_needed: [
        'Transaction-based revenues by asset class',
        'Average revenues per user',
        'Gold subscription subscriber count',
        'Net interest revenues',
        'Net deposits and assets under custody'
      ],
      evidence_quality: 'Partial',
      dossier_state: 'curated_profile_batch_16',
      frontend_label: 'Curated',
      coverage_status: 'Curated',
      needs_human_review: false,
      source: 'SEC 10-K / 10-Q'
    },
    visualPhaseOne: {
      faq: {
        overview: 'Robinhood provides retail investment brokerage services, generating revenues from transactions and customer cash deposits.',
        thesisRisk: 'Key risks involve changes in retail trading engagement, interest rate impacts on net interest margins, and gold subscription membership trends.'
      },
      phaseTwo: {
        thesisRisk: [
          {
            category: 'Trading Volume Volatility',
            risk: 'Drop in retail investor activity reduces transaction fees on options and crypto assets.',
            watch: 'Transaction-based revenues and active users.'
          },
          {
            category: 'Interest Rate Sensitivity',
            risk: 'Declining interest rates reduce interest income margins on customer cash balances.',
            watch: 'Net interest revenues and yield on cash.'
          },
          {
            category: 'Gold Subscriber Attrition',
            risk: 'Loss of gold subscriptions reduces steady recurring revenues and user engagement.',
            watch: 'Gold subscription counts.'
          }
        ]
      }
    }
  },
  HPE: {
    ticker: 'HPE',
    companyName: 'Hewlett Packard Enterprise Company',
    exchange: 'NYSE',
    logoUrl: buildStockLogoUrl('HPE'),
    overview: 'Hewlett Packard Enterprise provides enterprise server, hybrid cloud GreenLake subscriptions, storage, and networking hardware solutions globally.',
    category: 'Enterprise Technology & Infrastructure',
    analysisDate: '2026-06-12',
    latestFiscalPeriod: 'Q2 2026 ended 2026-04-30',
    dossierVerdict: 'Hewlett Packard Enterprise scales its GPU server segments and hybrid cloud subscription business, managing complex supply chains and hardware margins.',
    valueCore: {
      ticker: 'HPE',
      value_core_type: 'business_summary_thesis_risk',
      company_stage_candidate: 'Mature Enterprise Hardware & Cloud Services',
      primary_value_driver: 'Increasing GPU server shipments, growing GreenLake annual run-rate subscription revenues, and expanding server backlog fulfillment.',
      thesis_break_trigger: 'Severe GPU component supply constraints, margin compression on server transactions, or slowing enterprise software-defined services adoption.',
      evidence_needed: [
        'GreenLake annual run-rate subscription revenues',
        'Server operating profit margins',
        'Order book backlog fulfillment times',
        'Free cash flow generation',
        'Enterprise storage revenues'
      ],
      evidence_quality: 'Partial',
      dossier_state: 'curated_profile_batch_16',
      frontend_label: 'Curated',
      coverage_status: 'Curated',
      needs_human_review: false,
      source: 'SEC 10-K / 10-Q'
    },
    visualPhaseOne: {
      faq: {
        overview: 'Hewlett Packard Enterprise manufactures servers and storage systems while expanding its hybrid cloud software subscription platform.',
        thesisRisk: 'Key risks involve GPU server margin pressure, component supply chain constraints, and the rate of recurring subscription software growth.'
      },
      phaseTwo: {
        thesisRisk: [
          {
            category: 'Server Margin Pressure',
            risk: 'High concentration of lower-margin GPU servers reduces overall server segment operating margins.',
            watch: 'Server segment operating profit margins.'
          },
          {
            category: 'Supply Chain Bottlenecks',
            risk: 'Shortages of critical semiconductor and GPU components delay backlog delivery and revenue recognition.',
            watch: 'Order backlog and inventory trends.'
          },
          {
            category: 'Subscription Growth Execution',
            risk: 'GreenLake hybrid cloud software fails to scale recurring subscription revenues as fast as legacy hardware declines.',
            watch: 'GreenLake annual run-rate subscription revenues.'
          }
        ]
      }
    }
  },
  HTGC: {
    ticker: 'HTGC',
    companyName: 'Hercules Capital, Inc.',
    exchange: 'NYSE',
    logoUrl: buildStockLogoUrl('HTGC'),
    overview: 'Hercules Capital is a business development company focusing on senior secured venture debt loans to technology, life sciences, and renewable energy companies.',
    category: 'Specialty Finance (BDC)',
    analysisDate: '2026-06-12',
    latestFiscalPeriod: 'Q1 2026 ended 2026-03-31',
    dossierVerdict: 'Hercules Capital acts as a senior secured venture lender, exposed to non-accrual loan rates, NAV per share stability, and venture capital funding cycles.',
    valueCore: {
      ticker: 'HTGC',
      value_core_type: 'business_summary_thesis_risk',
      company_stage_candidate: 'Mature Specialty Finance / Business Development Company',
      primary_value_driver: 'Expanding senior secured venture loan portfolio, maintaining net asset value per share stability, and sustaining net investment income to support dividend payouts.',
      thesis_break_trigger: 'Spike in loan non-accruals from venture portfolio defaults, compression in debt yields due to rate cuts, or slowing venture funding activity.',
      evidence_needed: [
        'Portfolio loan non-accrual rates',
        'Net asset value per share',
        'Net investment income dividend coverage ratio',
        'Floating-rate yield spreads',
        'Venture debt loan origination volumes'
      ],
      evidence_quality: 'Partial',
      dossier_state: 'curated_profile_batch_16',
      frontend_label: 'Curated',
      coverage_status: 'Curated',
      needs_human_review: false,
      source: 'SEC 10-K / 10-Q'
    },
    visualPhaseOne: {
      faq: {
        overview: 'Hercules Capital is a venture debt lender providing senior secured loans to growth stage technology and life sciences companies.',
        thesisRisk: 'Key risks include portfolio default non-accrual rates, net asset value stability, and changes in floating interest rate yields.'
      },
      phaseTwo: {
        thesisRisk: [
          {
            category: 'Loan Non-Accruals',
            risk: 'Venture-backed borrowers defaulting on debt payments, leading to portfolio credit losses and asset write-downs.',
            watch: 'Portfolio non-accrual rates.'
          },
          {
            category: 'Interest Rate Exposure',
            risk: 'Declining benchmark rates compress floating-rate yields, reducing net investment income margins.',
            watch: 'Weighted average yield on debt investments.'
          },
          {
            category: 'Venture Funding Slowdown',
            risk: 'Reduced venture capital investments in technology and biotech sectors limit loan origination opportunities.',
            watch: 'New debt loan origination volumes.'
          }
        ]
      }
    }
  },
  IDXX: {
    ticker: 'IDXX',
    companyName: 'IDEXX Laboratories, Inc.',
    exchange: 'NASDAQ',
    logoUrl: buildStockLogoUrl('IDXX'),
    overview: 'IDEXX Laboratories develops and markets veterinary diagnostic instruments, test kits, reagents, and practice management software for companion animal and agricultural sectors.',
    category: 'Veterinary Diagnostics & Health',
    analysisDate: '2026-06-12',
    latestFiscalPeriod: 'Q1 2026 ended 2026-03-31',
    dossierVerdict: 'IDEXX Laboratories relies on recurring diagnostic revenues, companion animal clinic visit volumes, and instrument placements to sustain margins.',
    valueCore: {
      ticker: 'IDXX',
      value_core_type: 'business_summary_thesis_risk',
      company_stage_candidate: 'Mature Diagnostics & Medical Technology',
      primary_value_driver: 'Growing Companion Animal Group recurring revenues, expanding global diagnostic instrument installations, and increasing clinic test utilization rates.',
      thesis_break_trigger: 'Decline in companion animal clinic patient visits, slower instrument installations, or concentration risks from consolidated corporate vet clinic networks.',
      evidence_needed: [
        'Companion Animal Group recurring revenue growth',
        'Diagnostic instrument net placements',
        'Consolidated gross profit margin',
        'Veterinary clinic patient visit volumes',
        'Research and development spending'
      ],
      evidence_quality: 'Partial',
      dossier_state: 'curated_profile_batch_16',
      frontend_label: 'Curated',
      coverage_status: 'Curated',
      needs_human_review: false,
      source: 'SEC 10-K / 10-Q'
    },
    visualPhaseOne: {
      faq: {
        overview: 'IDEXX Laboratories provides diagnostic testing services and lab instruments to veterinary clinics.',
        thesisRisk: 'Key risks relate to companion animal clinic visit volumes, veterinary diagnostic instrument placement rates, and corporate customer concentration.'
      },
      phaseTwo: {
        thesisRisk: [
          {
            category: 'Clinic Visit Volumes',
            risk: 'Slowing pet ownership or rising veterinary care prices reduce routine clinic visits and diagnostic testing.',
            watch: 'Veterinary clinic patient visit volumes.'
          },
          {
            category: 'Instrument Placement Headwinds',
            risk: 'Veterinary clinics deferring new diagnostic instrument capital purchases, slowing multi-year test demand.',
            watch: 'Diagnostic instrument net placements.'
          },
          {
            category: 'Corporate Concentration',
            risk: 'Consolidation of veterinary practices into large corporate chains increases customer pricing power against IDEXX.',
            watch: 'Companion Animal Group gross margins.'
          }
        ]
      }
    }
  },
  INSM: {
    ticker: 'INSM',
    companyName: 'Insmed Incorporated',
    exchange: 'NASDAQ',
    logoUrl: buildStockLogoUrl('INSM'),
    overview: 'Insmed is a biopharmaceutical company commercializing therapies for orphan lung diseases and developing a clinical pipeline of anti-inflammatory treatments.',
    category: 'Biotechnology & Therapeutics',
    analysisDate: '2026-06-12',
    latestFiscalPeriod: 'Q1 2026 ended 2026-03-31',
    dossierVerdict: 'Insmed focuses on drug commercialization revenues, clinical trial readouts, regulatory review outcomes, and capital runway management.',
    valueCore: {
      ticker: 'INSM',
      value_core_type: 'business_summary_thesis_risk',
      company_stage_candidate: 'Early Commercial Biopharmaceutical',
      primary_value_driver: 'Scaling Arikayce net revenues, achieving positive clinical trial results for brensocatib, and securing regulatory approvals for new indications.',
      thesis_break_trigger: 'Slowing Arikayce revenue growth, disappointing clinical trial efficacy or safety readouts, or capital runway dilution.',
      evidence_needed: [
        'Arikayce quarterly net revenues',
        'Clinical trial development progression',
        'Cash and cash equivalents runway',
        'Research and development expenses',
        'Sales and marketing expenses'
      ],
      evidence_quality: 'Partial',
      dossier_state: 'curated_profile_batch_16',
      frontend_label: 'Curated',
      coverage_status: 'Curated',
      needs_human_review: false,
      source: 'SEC 10-K / 10-Q'
    },
    visualPhaseOne: {
      faq: {
        overview: 'Insmed is a biotech firm marketing an orphan lung disease treatment and conducting clinical trials for new pipeline drugs.',
        thesisRisk: 'Key risks include the commercial expansion speed of Arikayce, regulatory approval timelines, and clinical trial results.'
      },
      phaseTwo: {
        thesisRisk: [
          {
            category: 'Commercial Execution',
            risk: 'Arikayce adoption slowing in key international markets, failing to offset ongoing research costs.',
            watch: 'Arikayce net revenues.'
          },
          {
            category: 'Pipeline Efficacy Risks',
            risk: 'Brensocatib or other clinical candidates fail to meet primary endpoints in phase three clinical trials.',
            watch: 'Clinical trial progression updates.'
          },
          {
            category: 'Capital Burn Rate',
            risk: 'High R&D and launch costs deplete cash reserves, requiring dilutive equity issuance to extend the runway.',
            watch: 'Cash runway and burn rate.'
          }
        ]
      }
    }
  },
  IREN: {
    ticker: 'IREN',
    companyName: 'Iris Energy Limited',
    exchange: 'NASDAQ',
    logoUrl: buildStockLogoUrl('IREN'),
    overview: 'Iris Energy Limited operates industrial-scale bitcoin mining data centers and deploys high-performance GPU cloud hosting infrastructure for AI workloads, utilizing renewable energy.',
    category: 'Digital Infrastructure & GPU Cloud',
    analysisDate: '2026-06-12',
    latestFiscalPeriod: 'Q3 2026 ended 2026-03-31',
    dossierVerdict: 'Iris Energy operates a hybrid data center model, exposed to bitcoin mining hash rates, GPU cloud client adoption, power costs, and capital dilution.',
    valueCore: {
      ticker: 'IREN',
      value_core_type: 'business_summary_thesis_risk',
      company_stage_candidate: 'Growth Digital Infrastructure & Computing',
      primary_value_driver: 'Expanding operating GPU cloud hosting capacity, scaling active self-mining hash rate, and maintaining low-cost power contracts.',
      thesis_break_trigger: 'Bitcoin mining difficulty spikes, underutilization of GPU hosting capacity, rising power prices per megawatt-hour, or equity dilution.',
      evidence_needed: [
        'GPU cloud services segment revenues',
        'Active bitcoin self-mining hash rate',
        'Weighted average cost of power per megawatt-hour',
        'Data center operational megawatt capacity',
        'Outstanding share dilution count'
      ],
      evidence_quality: 'Partial',
      dossier_state: 'curated_profile_batch_16',
      frontend_label: 'Curated',
      coverage_status: 'Curated',
      needs_human_review: false,
      source: 'SEC 10-K / 10-Q'
    },
    visualPhaseOne: {
      faq: {
        overview: 'Iris Energy operates data centers used for bitcoin self-mining and GPU cloud infrastructure hosting.',
        thesisRisk: 'Key risks involve changes in bitcoin mining economics, GPU cloud client utilization, and electricity contract pricing.'
      },
      phaseTwo: {
        thesisRisk: [
          {
            category: 'GPU Hosting Utilization',
            risk: 'Slowing demand for AI workloads leads to unleased GPU cloud server capacity and pricing pressure.',
            watch: 'GPU cloud services segment revenues.'
          },
          {
            category: 'Power Cost Volatility',
            risk: 'Increases in contracted power costs per megawatt-hour erode data center operating margins.',
            watch: 'Average cost of electricity.'
          },
          {
            category: 'Capital Dilution',
            risk: 'Heavy capital expenditures for data center expansions require ongoing equity issuance, diluting existing holdings.',
            watch: 'Total outstanding share count.'
          }
        ]
      }
    }
  },
  KDP: {
    ticker: 'KDP',
    companyName: 'Keurig Dr Pepper Inc.',
    exchange: 'NASDAQ',
    logoUrl: buildStockLogoUrl('KDP'),
    overview: 'Keurig Dr Pepper designs single-serve coffee brewers and K-Cup pods while distributing refreshment soft drinks across North America through direct store delivery networks.',
    category: 'Beverages & Coffee Systems',
    analysisDate: '2026-06-12',
    latestFiscalPeriod: 'Q1 2026 ended 2026-03-31',
    dossierVerdict: 'Keurig Dr Pepper manages single-serve coffee pod volume trends, household brewer penetration, beverage pricing power, and balance sheet leverage.',
    valueCore: {
      ticker: 'KDP',
      value_core_type: 'business_summary_thesis_risk',
      company_stage_candidate: 'Mature Consumer Staples / Beverages',
      primary_value_driver: 'Stabilizing coffee pod unit volume growth, expanding Keurig brewer household penetration, and exercising pricing power in liquid refreshment beverages.',
      thesis_break_trigger: 'Contraction in coffee pod volumes, slowing household brewer penetration, commodity cost inflation for packaging, or leverage issues from high debt.',
      evidence_needed: [
        'Coffee segment net sales and volumes',
        'US liquid refreshment beverage volume growth',
        'Consolidated gross profit margin',
        'Total debt to EBITDA leverage ratio',
        'Brewer shipment volumes'
      ],
      evidence_quality: 'Partial',
      dossier_state: 'curated_profile_batch_16',
      frontend_label: 'Curated',
      coverage_status: 'Curated',
      needs_human_review: false,
      source: 'SEC 10-K / 10-Q'
    },
    visualPhaseOne: {
      faq: {
        overview: 'Keurig Dr Pepper manufactures single-serve coffee systems and distributes a portfolio of carbonated soft drinks.',
        thesisRisk: 'Key risks relate to single-serve coffee pod consumption rates, raw material inflation, and debt leverage.'
      },
      phaseTwo: {
        thesisRisk: [
          {
            category: 'Coffee Volume Decline',
            risk: 'Shifts in consumer behavior away from single-serve coffee pods compress segment revenues and margins.',
            watch: 'Coffee segment volume growth.'
          },
          {
            category: 'Commodity Inflation',
            risk: 'Increases in raw materials such as coffee beans, aluminum, and plastics erode gross margins.',
            watch: 'Consolidated gross profit margin.'
          },
          {
            category: 'Debt Leverage Pressure',
            risk: 'High balance sheet debt reduces cash available for capital deployment or share repurchases.',
            watch: 'Net debt to adjusted EBITDA ratio.'
          }
        ]
      }
    }
  },
  KHC: {
    ticker: 'KHC',
    companyName: 'The Kraft Heinz Company',
    exchange: 'NASDAQ',
    logoUrl: buildStockLogoUrl('KHC'),
    overview: 'The Kraft Heinz Company manufactures and markets branded condiments, sauces, packaged meals, and dairy products globally through retail and food service channels.',
    category: 'Packaged Food & Condiments',
    analysisDate: '2026-06-12',
    latestFiscalPeriod: 'Q1 2026 ended 2026-03-28',
    dossierVerdict: 'Kraft Heinz balances organic sales volume recovery against retail pricing actions, food commodity inflation, and brand marketing productivity.',
    valueCore: {
      ticker: 'KHC',
      value_core_type: 'business_summary_thesis_risk',
      company_stage_candidate: 'Mature Consumer Staples / Packaged Food',
      primary_value_driver: 'Recovering organic sales volumes, implementing pricing adjustments to offset food input costs, and driving productivity in brand marketing.',
      thesis_break_trigger: 'Sustained volume declines from retail price hikes, consumer trading down to private label brands, or rising agricultural input costs.',
      evidence_needed: [
        'Organic net sales volume growth',
        'Price/mix revenue contribution',
        'Consolidated gross profit margin',
        'Marketing and advertising spending efficiency',
        'Free cash flow conversion'
      ],
      evidence_quality: 'Partial',
      dossier_state: 'curated_profile_batch_16',
      frontend_label: 'Curated',
      coverage_status: 'Curated',
      needs_human_review: false,
      source: 'SEC 10-K / 10-Q'
    },
    visualPhaseOne: {
      faq: {
        overview: 'Kraft Heinz is a global food manufacturer producing branded condiments, sauces, and packaged meals.',
        thesisRisk: 'Key risks involve consumer resistance to pricing increases, competition from private labels, and food commodity inflation.'
      },
      phaseTwo: {
        thesisRisk: [
          {
            category: 'Private Label Competition',
            risk: 'Inflation-weary consumers switch to lower-priced supermarket private label brands, reducing market share.',
            watch: 'Organic net sales volume growth.'
          },
          {
            category: 'Input Cost Inflation',
            risk: 'Spikes in agricultural commodities, packaging, and logistics costs compress food manufacturing gross margins.',
            watch: 'Consolidated gross profit margin.'
          },
          {
            category: 'Brand Marketing Efficiency',
            risk: 'Increased marketing spend fails to drive volume growth, resulting in operating margin compression.',
            watch: 'Marketing expenses and advertising return.'
          }
        ]
      }
    }
  },
  LMT: {
    ticker: 'LMT',
    companyName: 'Lockheed Martin Corporation',
    exchange: 'NYSE',
    logoUrl: buildStockLogoUrl('LMT'),
    overview: 'Lockheed Martin is a global defense contractor focused on the design, development, and integration of advanced military aeronautics, space systems, and missile defense technologies.',
    category: 'Defense & Aerospace Systems',
    analysisDate: '2026-06-12',
    latestFiscalPeriod: 'Q1 2026 ended 2026-03-29',
    dossierVerdict: 'Lockheed Martin manages F-35 fighter jet delivery schedules, government defense budget appropriations, and operating margins on fixed-price contracts.',
    valueCore: {
      ticker: 'LMT',
      value_core_type: 'business_summary_thesis_risk',
      company_stage_candidate: 'Mature Defense Contractor',
      primary_value_driver: 'Fulfilling F-35 fighter jet delivery targets, securing increased international defense appropriations, and managing subcontractor supply bottlenecks.',
      thesis_break_trigger: 'Delays in F-35 software integration and delivery acceptances, fixed-price contract cost overruns, or supply chain component shortages.',
      evidence_needed: [
        'F-35 aircraft delivery volumes',
        'Aerospace segment operating profit margin',
        'Defense systems backlog book-to-bill ratio',
        'Free cash flow generation',
        'Government budget appropriation adjustments'
      ],
      evidence_quality: 'Partial',
      dossier_state: 'curated_profile_batch_16',
      frontend_label: 'Curated',
      coverage_status: 'Curated',
      needs_human_review: false,
      source: 'SEC 10-K / 10-Q'
    },
    visualPhaseOne: {
      faq: {
        overview: 'Lockheed Martin is a aerospace and defense contractor manufacturing military aircraft, missiles, and space defense systems.',
        thesisRisk: 'Key risks involve government defense budget funding levels, manufacturing delays on key programs, and supply chain supply bottlenecks.'
      },
      phaseTwo: {
        thesisRisk: [
          {
            category: 'Program Delivery Delays',
            risk: 'Software integration issues delay customer acceptance and delivery of F-35 aircraft, deferring revenue.',
            watch: 'F-35 aircraft delivery volumes.'
          },
          {
            category: 'Fixed-Price Cost Overruns',
            risk: 'Subcontractor cost inflation on fixed-price development contracts reduces operating margins.',
            watch: 'Segment operating profit margins.'
          },
          {
            category: 'Supply Chain Disruptions',
            risk: 'Shortages of critical components like rocket motors or microelectronics slow production across segments.',
            watch: 'Backlog book-to-bill ratio.'
          }
        ]
      }
    }
  },
  MAIN: {
    ticker: 'MAIN',
    companyName: 'Main Street Capital Corporation',
    exchange: 'NYSE',
    logoUrl: buildStockLogoUrl('MAIN'),
    overview: 'Main Street Capital is a business development company that provides customized debt and equity capital solutions to lower middle-market companies and debt investments in middle-market firms.',
    category: 'Specialty Finance (BDC)',
    analysisDate: '2026-06-12',
    latestFiscalPeriod: 'Q1 2026 ended 2026-03-31',
    dossierVerdict: 'Main Street Capital focuses on lower middle-market debt and equity investments, exposed to non-accrual loan rates, NAV per share stability, and investment exits.',
    valueCore: {
      ticker: 'MAIN',
      value_core_type: 'business_summary_thesis_risk',
      company_stage_candidate: 'Mature Specialty Finance / Business Development Company',
      primary_value_driver: 'Generating net investment income to cover dividend distributions, maintaining stable net asset value per share, and realizing capital gains from equity investments.',
      thesis_break_trigger: 'Spike in borrower default non-accruals, decline in lower middle-market portfolio valuations, or lower fee income from exit transactions.',
      evidence_needed: [
        'Lower middle-market non-accrual rates',
        'Net asset value per share',
        'Net investment income dividend coverage ratio',
        'Lower middle-market equity holdings fair value',
        'Distributable net investment income'
      ],
      evidence_quality: 'Partial',
      dossier_state: 'curated_profile_batch_16',
      frontend_label: 'Curated',
      coverage_status: 'Curated',
      needs_human_review: false,
      source: 'SEC 10-K / 10-Q'
    },
    visualPhaseOne: {
      faq: {
        overview: 'Main Street Capital provides customized financing solutions, including debt and equity, to lower middle-market companies.',
        thesisRisk: 'Key risks include non-accrual loan rates within the lower middle-market portfolio, asset valuation changes, and dividend coverage stability.'
      },
      phaseTwo: {
        thesisRisk: [
          {
            category: 'LMM Portfolio Defaults',
            risk: 'Lower middle-market borrowers struggle with debt service, leading to loan non-accruals and credit losses.',
            watch: 'Portfolio non-accrual rates.'
          },
          {
            category: 'NAV Valuation Changes',
            risk: 'Declines in the fair value of lower middle-market equity investments reduce net asset value per share.',
            watch: 'Net asset value per share.'
          },
          {
            category: 'Dividend Coverage Pressure',
            risk: 'Lower interest rates or loan defaults reduce net investment income below regular and supplemental dividend payouts.',
            watch: 'Net investment income dividend coverage ratio.'
          }
        ]
      }
    }
  },
  MAR: {
    ticker: 'MAR',
    companyName: 'Marriott International, Inc.',
    exchange: 'NASDAQ',
    logoUrl: buildStockLogoUrl('MAR'),
    overview: 'Marriott International is a leading global lodging franchisor and operator, managing hotels and licensing brands under franchise, management, and licensing agreements across multiple market tiers.',
    category: 'Lodging & Hospitality Management',
    analysisDate: '2026-06-12',
    latestFiscalPeriod: 'Q1 2026 ended 2026-03-31',
    dossierVerdict: 'Marriott operates an asset-light fee-based model, sensitive to global consumer travel demand cycles, net room growth rates, and RevPAR metrics.',
    valueCore: {
      ticker: 'MAR',
      value_core_type: 'business_summary_thesis_risk',
      company_stage_candidate: 'Mature Consumer Services / Hospitality',
      primary_value_driver: 'Expanding loyalty program membership, increasing system-wide RevPAR, and accelerating net room addition rates across brand portfolios.',
      thesis_break_trigger: 'Sustained drop in travel volumes, contraction in hotel room additions, or loyalty member attrition.',
      evidence_needed: [
        'System-wide RevPAR growth rate',
        'Net room additions and pipeline count',
        'Loyalty program member counts',
        'Franchise and management fee margins',
        'Average daily room rates'
      ],
      evidence_quality: 'Partial',
      dossier_state: 'curated_profile_batch_17',
      frontend_label: 'Curated',
      coverage_status: 'Curated',
      needs_human_review: false,
      source: 'SEC 10-K / 10-Q'
    },
    visualPhaseOne: {
      faq: {
        overview: 'Marriott operates an asset-light hotel model, earning fees from franchising and managing lodging brands.',
        thesisRisk: 'Key risks involve changes in global travel demand, rooms growth pipeline delays, and loyalty member engagement.'
      },
      phaseTwo: {
        thesisRisk: [
          {
            category: 'Travel Demand Elasticity',
            risk: 'Macroeconomic downturns reduce travel spending, lowering hotel occupancy rates and fee revenues.',
            watch: 'System-wide occupancy rates and RevPAR growth.'
          },
          {
            category: 'Pipeline Execution Delays',
            risk: 'Rising construction costs and developer financing challenges delay hotel openings, reducing net room growth.',
            watch: 'Total room pipeline and net room additions.'
          },
          {
            category: 'Franchise Fee Compression',
            risk: 'Competitive pressures force adjustments in fee structures for independent hotel developers.',
            watch: 'Franchise and management fee margins.'
          }
        ]
      }
    }
  },
  MCHP: {
    ticker: 'MCHP',
    companyName: 'Microchip Technology Incorporated',
    exchange: 'NASDAQ',
    logoUrl: buildStockLogoUrl('MCHP'),
    overview: 'Microchip Technology designs, manufactures, and markets microcontrollers, mixed-signal, analog, and Flash-IP solutions for embedded control systems across automotive, industrial, and consumer markets.',
    category: 'Embedded Semiconductors & Microcontrollers',
    analysisDate: '2026-06-12',
    latestFiscalPeriod: 'FY 2026 ended 2026-03-31',
    dossierVerdict: 'Microchip Technology navigates semiconductor distribution inventory cycles, factory utilization rates, and embedded microcontroller demand.',
    valueCore: {
      ticker: 'MCHP',
      value_core_type: 'business_summary_thesis_risk',
      company_stage_candidate: 'Mature Semiconductor Manufacturing',
      primary_value_driver: 'Improving factory utilization rates, expanding automotive and industrial design wins, and normalizing distribution channel inventory levels.',
      thesis_break_trigger: 'Persistent high inventory weeks in distribution channels, severe gross margin compression from low utilization, or automotive demand downturn.',
      evidence_needed: [
        'Distribution channel inventory weeks',
        'Manufacturing plant utilization rates',
        'Consolidated gross profit margin',
        'Automotive and industrial segment revenues',
        'Design win pipeline metrics'
      ],
      evidence_quality: 'Partial',
      dossier_state: 'curated_profile_batch_17',
      frontend_label: 'Curated',
      coverage_status: 'Curated',
      needs_human_review: false,
      source: 'SEC 10-K / 10-Q'
    },
    visualPhaseOne: {
      faq: {
        overview: 'Microchip Technology designs microcontrollers and analog chips used in embedded control systems for industrial and automotive applications.',
        thesisRisk: 'Key risks involve cyclical inventory adjustments in the distribution channel, manufacturing factory utilization, and automotive sector demand.'
      },
      phaseTwo: {
        thesisRisk: [
          {
            category: 'Inventory Normalization',
            risk: 'Extended distributor destocking cycles delay revenue recovery and new order bookings.',
            watch: 'Distributor inventory weeks and backlog.'
          },
          {
            category: 'Underutilization Charges',
            risk: 'Slowing demand forcing production cuts, leading to significant underutilization charges that compress gross margins.',
            watch: 'Consolidated gross profit margin.'
          },
          {
            category: 'Automotive Demand Cyclicality',
            risk: 'Weakness in automotive vehicle production cycles reduces microcontroller content demand.',
            watch: 'Automotive segment revenues.'
          }
        ]
      }
    }
  },
  MELI: {
    ticker: 'MELI',
    companyName: 'MercadoLibre, Inc.',
    exchange: 'NASDAQ',
    logoUrl: buildStockLogoUrl('MELI'),
    overview: 'MercadoLibre operates the dominant e-commerce marketplace and fintech transaction network (Mercado Pago) in Latin America, providing logistics, advertising, and credit services.',
    category: 'Latin American E-Commerce & Fintech',
    analysisDate: '2026-06-12',
    latestFiscalPeriod: 'Q1 2026 ended 2026-03-31',
    dossierVerdict: 'MercadoLibre runs a high-growth Latin American digital marketplace and payment ecosystem, balancing logistics costs and credit portfolio risks.',
    valueCore: {
      ticker: 'MELI',
      value_core_type: 'business_summary_thesis_risk',
      company_stage_candidate: 'High-Growth E-Commerce & Fintech Platform',
      primary_value_driver: 'Increasing gross merchandise volume, scaling Mercado Pago payments processing, and managing credit book interest spreads.',
      thesis_break_trigger: 'Spike in consumer credit defaults, slowing digital marketplace transactions, or rising transport and logistics costs.',
      evidence_needed: [
        'Gross merchandise volume growth',
        'Fintech payment volume processed',
        'Credit portfolio non-performing loan ratio',
        'Net interest income on credit book',
        'Logistics shipping cost margins'
      ],
      evidence_quality: 'Partial',
      dossier_state: 'curated_profile_batch_17',
      frontend_label: 'Curated',
      coverage_status: 'Curated',
      needs_human_review: false,
      source: 'SEC 10-K / 10-Q'
    },
    visualPhaseOne: {
      faq: {
        overview: 'MercadoLibre provides online retail marketplaces and fintech payment solutions across major Latin American countries.',
        thesisRisk: 'Key risks relate to credit portfolio loan defaults, local currency fluctuations, and fulfillment shipping costs.'
      },
      phaseTwo: {
        thesisRisk: [
          {
            category: 'Credit Default Spikes',
            risk: 'Rising non-performing loans in its consumer credit segment require high provisions, reducing fintech profitability.',
            watch: 'Credit portfolio non-performing loan ratio.'
          },
          {
            category: 'Marketplace Competition',
            risk: 'Aggressive entry of international commerce platforms increases customer acquisition costs in Brazil and Mexico.',
            watch: 'Gross merchandise volume growth.'
          },
          {
            category: 'Fulfillment Cost Inflation',
            risk: 'Rising fuel and logistics labor costs compress e-commerce margins on free shipping programs.',
            watch: 'Logistics shipping cost margins.'
          }
        ]
      }
    }
  },
  MMM: {
    ticker: 'MMM',
    companyName: '3M Company',
    exchange: 'NYSE',
    logoUrl: buildStockLogoUrl('MMM'),
    overview: '3M Company is a diversified global technology manufacturer, developing consumer, electronics, safety, industrial, and transportation products through advanced materials science.',
    category: 'Diversified Industrial Manufacturing',
    analysisDate: '2026-06-12',
    latestFiscalPeriod: 'Q1 2026 ended 2026-03-31',
    dossierVerdict: '3M manages diversified industrial product segments, balancing restructuring actions against legal settlement payouts and environmental liabilities.',
    valueCore: {
      ticker: 'MMM',
      value_core_type: 'business_summary_thesis_risk',
      company_stage_candidate: 'Mature Diversified Industrial Conglomerate',
      primary_value_driver: 'Executing corporate restructuring and separation plans, recovering organic volume growth, and managing long-term legal cash payouts.',
      thesis_break_trigger: 'Slowing organic industrial demand, lower-than-planned restructuring cost savings, or expansion of legal liability provisions.',
      evidence_needed: [
        'Organic volume sales growth rate',
        'Segment operating profit margins',
        'Restructuring cost savings achieved',
        'Net legal liabilities cash payouts',
        'Free cash flow conversion rate'
      ],
      evidence_quality: 'Partial',
      dossier_state: 'curated_profile_batch_17',
      frontend_label: 'Curated',
      coverage_status: 'Curated',
      needs_human_review: false,
      source: 'SEC 10-K / 10-Q'
    },
    visualPhaseOne: {
      faq: {
        overview: '3M manufactures a broad range of industrial and consumer goods while restructuring its operating divisions.',
        thesisRisk: 'Key risks include litigation settlement cash requirements, restructuring implementation delays, and cyclical industrial demand.'
      },
      phaseTwo: {
        thesisRisk: [
          {
            category: 'Litigation Cash Drain',
            risk: 'Settlement payout schedules for environmental and product liabilities reduce cash available for research and capital spending.',
            watch: 'Free cash flow conversion and legal cash payouts.'
          },
          {
            category: 'Restructuring Execution',
            risk: 'Operational restructuring programs fail to deliver target margin improvements across industrial divisions.',
            watch: 'Segment operating profit margins.'
          },
          {
            category: 'Cyclical Industrial Demand',
            risk: 'Slowing consumer electronics or automotive production reduces materials demand.',
            watch: 'Organic volume sales growth rate.'
          }
        ]
      }
    }
  },
  MNST: {
    ticker: 'MNST',
    companyName: 'Monster Beverage Corporation',
    exchange: 'NASDAQ',
    logoUrl: buildStockLogoUrl('MNST'),
    overview: 'Monster Beverage Corporation develops, markets, and distributes energy drink brands globally, utilizing a centralized brand management model and third-party bottling networks.',
    category: 'Consumer Beverages / Energy Drinks',
    analysisDate: '2026-06-12',
    latestFiscalPeriod: 'Q1 2026 ended 2026-03-31',
    dossierVerdict: 'Monster Beverage relies on energy drink category growth, distribution network alliances, pricing actions, and packaging material cost trends.',
    valueCore: {
      ticker: 'MNST',
      value_core_type: 'business_summary_thesis_risk',
      company_stage_candidate: 'Mature Consumer Staples / Beverages',
      primary_value_driver: 'Expanding energy drink case volumes, implementing pricing adjustments, and growing international brand distribution.',
      thesis_break_trigger: 'Slowing energy drink category consumption, rising packaging costs for aluminum, or distribution network transitions.',
      evidence_needed: [
        'Energy drink case shipment volumes',
        'Gross profit margins',
        'International segment revenue growth',
        'Marketing expenditures as a percentage of sales',
        'Bottler partner inventory levels'
      ],
      evidence_quality: 'Partial',
      dossier_state: 'curated_profile_batch_17',
      frontend_label: 'Curated',
      coverage_status: 'Curated',
      needs_human_review: false,
      source: 'SEC 10-K / 10-Q'
    },
    visualPhaseOne: {
      faq: {
        overview: 'Monster Beverage designs and markets energy drink products, distributing through global bottling partners.',
        thesisRisk: 'Key risks involve energy drink category competition, packaging commodity inflation, and distribution partner transitions.'
      },
      phaseTwo: {
        thesisRisk: [
          {
            category: 'Category Saturation',
            risk: 'Slowing expansion of the energy drink category in mature North American markets limits case volume growth.',
            watch: 'Energy drink case shipment volumes.'
          },
          {
            category: 'Aluminum and Packing Costs',
            risk: 'Spikes in aluminum can costs and shipping transport rates compress beverage gross margins.',
            watch: 'Gross profit margins.'
          },
          {
            category: 'Distribution Dependencies',
            risk: 'Delays or service disruptions in its primary bottling partner network restrict product availability on retail shelves.',
            watch: 'Bottler partner inventory levels.'
          }
        ]
      }
    }
  },
  MPWR: {
    ticker: 'MPWR',
    companyName: 'Monolithic Power Systems, Inc.',
    exchange: 'NASDAQ',
    logoUrl: buildStockLogoUrl('MPWR'),
    overview: 'Monolithic Power Systems designs and markets high-performance, semiconductor power management solutions for computing, automotive, industrial, communications, and consumer markets.',
    category: 'Power Management Semiconductors',
    analysisDate: '2026-06-12',
    latestFiscalPeriod: 'Q1 2026 ended 2026-03-31',
    dossierVerdict: 'Monolithic Power Systems leverages AI server power system design wins, managing enterprise chip margins and customer inventory levels.',
    valueCore: {
      ticker: 'MPWR',
      value_core_type: 'business_summary_thesis_risk',
      company_stage_candidate: 'Growth Semiconductor Designer / Fabless',
      primary_value_driver: 'Expanding power management component placements in advanced AI servers, scaling automotive design wins, and maintaining high gross margins.',
      thesis_break_trigger: 'Loss of power stage design wins in cloud servers, automotive customer inventory adjustments, or margin compression from chip design rivals.',
      evidence_needed: [
        'Enterprise Data segment revenues',
        'Consolidated gross profit margin',
        'Automotive segment design wins',
        'Research and development spending',
        'Days inventory outstanding'
      ],
      evidence_quality: 'Partial',
      dossier_state: 'curated_profile_batch_17',
      frontend_label: 'Curated',
      coverage_status: 'Curated',
      needs_human_review: false,
      source: 'SEC 10-K / 10-Q'
    },
    visualPhaseOne: {
      faq: {
        overview: 'Monolithic Power Systems is a fabless chip company designing power management systems for computing and automotive markets.',
        thesisRisk: 'Key risks relate to AI server processor power stage design wins, customer design changes, and automotive semiconductor inventory levels.'
      },
      phaseTwo: {
        thesisRisk: [
          {
            category: 'AI Server Design Cycles',
            risk: 'Customer design changes or rival power chips displace Monolithic components in next-generation AI processors.',
            watch: 'Enterprise Data segment revenues.'
          },
          {
            category: 'Automotive Inventory Adjustments',
            risk: 'Automotive manufacturers deferring new chip shipments to reduce built-up electronic component inventories.',
            watch: 'Automotive segment design wins.'
          },
          {
            category: 'Gross Margin Pressure',
            risk: 'Pricing concessions required to win high-volume consumer or industrial platform deals reduce gross margins.',
            watch: 'Consolidated gross profit margin.'
          }
        ]
      }
    }
  },
  MSTR: {
    ticker: 'MSTR',
    companyName: 'MicroStrategy Incorporated',
    exchange: 'NASDAQ',
    logoUrl: buildStockLogoUrl('MSTR'),
    overview: 'MicroStrategy operates an enterprise analytics software platform while executing a treasury strategy of acquiring and retaining significant reserves of bitcoin.',
    category: 'Enterprise Software & Bitcoin Treasury',
    analysisDate: '2026-06-12',
    latestFiscalPeriod: 'Q1 2026 ended 2026-03-31',
    dossierVerdict: 'MicroStrategy operates a traditional enterprise software business, but its financial performance is dominated by its bitcoin treasury reserves and debt structure.',
    valueCore: {
      ticker: 'MSTR',
      value_core_type: 'business_summary_thesis_risk',
      company_stage_candidate: 'Special Situations Software / Digital Treasury',
      primary_value_driver: 'Scaling software-as-a-service subscription revenues, managing convertible debt financing costs, and growing treasury reserves of bitcoin.',
      thesis_break_trigger: 'Slowing analytics software recurring revenues, severe declines in bitcoin valuations, or high interest refinancing requirements.',
      evidence_needed: [
        'Software subscription services revenues',
        'Total bitcoin treasury valuation',
        'Convertible debt principal and interest obligations',
        'Software operating profit margins',
        'Cash flows from software operations'
      ],
      evidence_quality: 'Partial',
      dossier_state: 'curated_profile_batch_17',
      frontend_label: 'Curated',
      coverage_status: 'Curated',
      needs_human_review: false,
      source: 'SEC 10-K / 10-Q'
    },
    visualPhaseOne: {
      faq: {
        overview: 'MicroStrategy licenses business intelligence software while maintaining a corporate treasury strategy centered on bitcoin acquisitions.',
        thesisRisk: 'Key risks include the volatility of bitcoin valuations, interest obligations on convertible debt, and the transition of software to subscription models.'
      },
      phaseTwo: {
        thesisRisk: [
          {
            category: 'Bitcoin Price Volatility',
            risk: 'Significant drops in bitcoin valuation reduce asset backing and limit capital access via convertible debt.',
            watch: 'Total bitcoin treasury valuation.'
          },
          {
            category: 'Debt Servicing Obligations',
            risk: 'Inability to refinance convertible notes under favorable terms increases interest expenses, straining software cash flow.',
            watch: 'Convertible debt principal and interest obligations.'
          },
          {
            category: 'Software Transition Headwinds',
            risk: 'Slowing enterprise adoption of cloud analytics subscriptions reduces recurring software cash generation.',
            watch: 'Software subscription services revenues.'
          }
        ]
      }
    }
  },
  NBIS: {
    ticker: 'NBIS',
    companyName: 'Nebius Group N.V.',
    exchange: 'NASDAQ',
    logoUrl: buildStockLogoUrl('NBIS'),
    overview: 'Nebius Group provides full-stack artificial intelligence infrastructure, operating large-scale GPU cloud platforms and machine learning training services for global developers.',
    category: 'AI Infrastructure & GPU Cloud',
    analysisDate: '2026-06-12',
    latestFiscalPeriod: 'Q1 2026 ended 2026-03-31',
    dossierVerdict: 'Nebius Group scales its AI GPU cloud hosting capacity, managing significant server capital expenditures and cloud customer concentration.',
    valueCore: {
      ticker: 'NBIS',
      value_core_type: 'business_summary_thesis_risk',
      company_stage_candidate: 'Growth AI Infrastructure & Computing',
      primary_value_driver: 'Installing and leasing high-capacity GPU server clusters, expanding enterprise AI training customer bases, and managing capital deployment for data centers.',
      thesis_break_trigger: 'GPU hardware procurement delays, underutilization of built-out cloud capacity, or loss of large AI training clients.',
      evidence_needed: [
        'GPU cloud utilization rates',
        'Capital expenditures on server infrastructure',
        'Active GPU cluster count',
        'Enterprise AI customer concentration',
        'Consolidated operating cash flow'
      ],
      evidence_quality: 'Partial',
      dossier_state: 'curated_profile_batch_17',
      frontend_label: 'Curated',
      coverage_status: 'Curated',
      needs_human_review: false,
      source: 'SEC 20-F / 6-K'
    },
    visualPhaseOne: {
      faq: {
        overview: 'Nebius Group operates data center clusters containing advanced GPUs to host AI training workloads for corporate developers.',
        thesisRisk: 'Key risks include GPU supply chain delays, cloud tenant concentration, and the high capital spending required for expansion.'
      },
      phaseTwo: {
        thesisRisk: [
          {
            category: 'GPU Supply Chain Delays',
            risk: 'Delays in receiving next-generation GPU hardware from suppliers slow data center expansions and revenue scaling.',
            watch: 'Active GPU cluster count and capital expenditures.'
          },
          {
            category: 'Cloud Tenant Concentration',
            risk: 'High reliance on a small number of large AI model developers exposes Nebius to sudden revenue drops if clients migrate workloads.',
            watch: 'Enterprise AI customer concentration.'
          },
          {
            category: 'High Capital Burn',
            risk: 'Heavy upfront cash spending for server hardware outpaces cloud lease cash collection, requiring additional financing.',
            watch: 'Consolidated operating cash flow.'
          }
        ]
      }
    }
  },
  NRG: {
    ticker: 'NRG',
    companyName: 'NRG Energy, Inc.',
    exchange: 'NYSE',
    logoUrl: buildStockLogoUrl('NRG'),
    overview: 'NRG Energy is an integrated retail electricity and smart home services provider, supplying energy, smart devices, and home security systems to residential and commercial markets.',
    category: 'Integrated Energy & Home Services',
    analysisDate: '2026-06-12',
    latestFiscalPeriod: 'Q1 2026 ended 2026-03-31',
    dossierVerdict: 'NRG Energy operates an integrated energy and retail services model, exposed to customer count trends, weather volatility, and energy price hedging.',
    valueCore: {
      ticker: 'NRG',
      value_core_type: 'business_summary_thesis_risk',
      company_stage_candidate: 'Mature Utility / Consumer Services',
      primary_value_driver: 'Maintaining retail electricity customer counts, executing wholesale power price hedging, and expanding smart home product subscription margins.',
      thesis_break_trigger: 'Severe weather events disrupting wholesale supply, customer churn to retail electricity provider competition, or hedge contract losses.',
      evidence_needed: [
        'Retail electricity customer counts',
        'Wholesale energy price margins',
        'Smart home subscription gross margins',
        'Consolidated debt leverage ratios',
        'Customer acquisition costs'
      ],
      evidence_quality: 'Partial',
      dossier_state: 'curated_profile_batch_17',
      frontend_label: 'Curated',
      coverage_status: 'Curated',
      needs_human_review: false,
      source: 'SEC 10-K / 10-Q'
    },
    visualPhaseOne: {
      faq: {
        overview: 'NRG Energy sells electricity and natural gas to retail customers while offering connected home security and automation products.',
        thesisRisk: 'Key risks include wholesale energy price volatility, retail customer retention, and weather disruptions to power supplies.'
      },
      phaseTwo: {
        thesisRisk: [
          {
            category: 'Wholesale Hedging Errors',
            risk: 'Failure to hedge power generation output during price spikes forces NRG to purchase expensive wholesale market energy.',
            watch: 'Wholesale energy price margins.'
          },
          {
            category: 'Customer Churn',
            risk: 'Intense price competition in retail electricity markets increases residential customer churn.',
            watch: 'Retail electricity customer counts.'
          },
          {
            category: 'Weather Volatility',
            risk: 'Extreme winter storms or summer heatwaves cause supply disruptions and unexpected power procurement costs.',
            watch: 'Wholesale energy price margins.'
          }
        ]
      }
    }
  },
  NXPI: {
    ticker: 'NXPI',
    companyName: 'NXP Semiconductors N.V.',
    exchange: 'NASDAQ',
    logoUrl: buildStockLogoUrl('NXPI'),
    overview: 'NXP Semiconductors provides mixed-signal semiconductor solutions, focusing on automotive microcontrollers, industrial control systems, mobile secure connectivity, and communication processors.',
    category: 'Automotive & Industrial Semiconductors',
    analysisDate: '2026-06-12',
    latestFiscalPeriod: 'Q1 2026 ended 2026-03-29',
    dossierVerdict: 'NXP Semiconductors manages automotive silicon content growth, distribution channel inventory weeks, and factory manufacturing utilization rates.',
    valueCore: {
      ticker: 'NXPI',
      value_core_type: 'business_summary_thesis_risk',
      company_stage_candidate: 'Mature Semiconductor Manufacturing',
      primary_value_driver: 'Increasing semiconductor content in electric and autonomous vehicles, normalizing distributor channel inventories, and maintaining high manufacturing margins.',
      thesis_break_trigger: 'Slowing automotive production cycles, extended channel inventory adjustments, or gross margin compression from lower utilization.',
      evidence_needed: [
        'Automotive segment revenues',
        'Distributor channel inventory weeks',
        'Manufacturing plant utilization rates',
        'Consolidated gross profit margin',
        'Industrial and IoT segment revenues'
      ],
      evidence_quality: 'Partial',
      dossier_state: 'curated_profile_batch_17',
      frontend_label: 'Curated',
      coverage_status: 'Curated',
      needs_human_review: false,
      source: 'SEC 10-K / 10-Q'
    },
    visualPhaseOne: {
      faq: {
        overview: 'NXP Semiconductors manufactures chips for vehicle systems, industrial automation equipment, and mobile devices.',
        thesisRisk: 'Key risks include automotive manufacturing cycles, distributor channel inventory weeks, and factory underutilization charges.'
      },
      phaseTwo: {
        thesisRisk: [
          {
            category: 'Automotive Slowdown',
            risk: 'Slowing passenger vehicle production reduces demand for automotive microcontrollers and radar chips.',
            watch: 'Automotive segment revenues.'
          },
          {
            category: 'Channel Inventory Normalization',
            risk: 'Distributors holding excess chip inventories defer placing new orders, extending the revenue downturn.',
            watch: 'Distributor channel inventory weeks.'
          },
          {
            category: 'Factory Underutilization',
            risk: 'Slowing demand requires factory production cuts, creating underutilization charges that lower margins.',
            watch: 'Consolidated gross profit margin.'
          }
        ]
      }
    }
  },
  O: {
    ticker: 'O',
    companyName: 'Realty Income Corporation',
    exchange: 'NYSE',
    logoUrl: buildStockLogoUrl('O'),
    overview: 'Realty Income Corporation is a real estate investment trust (REIT) specializing in acquiring and managing single-tenant retail and industrial properties under long-term net lease agreements.',
    category: 'Retail & Industrial REIT',
    analysisDate: '2026-06-12',
    latestFiscalPeriod: 'Q1 2026 ended 2026-03-31',
    dossierVerdict: 'Realty Income operates a diversified real estate net lease portfolio, sensitive to tenant occupancy levels, credit qualities, and interest rate refinancing cycles.',
    valueCore: {
      ticker: 'O',
      value_core_type: 'business_summary_thesis_risk',
      company_stage_candidate: 'Mature Real Estate / REIT',
      primary_value_driver: 'Maintaining high occupancy rates, executing accretive property acquisitions, and adjusting lease escalation rates to manage inflation.',
      thesis_break_trigger: 'Sustained occupancy decline below ninety-six percent, cash flow contraction from tenant defaults, or rising interest rates raising capital costs.',
      evidence_needed: [
        'Portfolio occupancy rate percentage',
        'Normalized FFO per share growth rate',
        'Weighted average lease term remaining',
        'Net acquisition and development volume',
        'Debt to adjusted EBITDA leverage ratio'
      ],
      evidence_quality: 'Partial',
      dossier_state: 'curated_profile_batch_18',
      frontend_label: 'Curated',
      coverage_status: 'Curated',
      needs_human_review: false,
      source: 'SEC 10-K / 10-Q'
    },
    visualPhaseOne: {
      faq: {
        overview: 'Realty Income is a net lease retail REIT earning steady rental income from long-term single-tenant properties.',
        thesisRisk: 'Key risks relate to property occupancy rates, tenant retail industry credit stability, and refinancing cost changes.'
      },
      phaseTwo: {
        thesisRisk: [
          {
            category: 'Occupancy Devaluation',
            risk: 'Disruptions in brick-and-mortar retail lead to tenant bankruptcies, lowering overall portfolio occupancy and rental incomes.',
            watch: 'Portfolio occupancy rate percentage.'
          },
          {
            category: 'Refinancing Costs',
            risk: 'High interest rates increase borrowing costs on maturing debt, compressing FFO margins.',
            watch: 'Weighted average interest rate on debt.'
          },
          {
            category: 'Tenant Concentration',
            risk: 'Financial distress in major retail tenant sectors reduces cash collections.',
            watch: 'Top tenant industry concentration percentages.'
          }
        ]
      }
    }
  },
  OBDC: {
    ticker: 'OBDC',
    companyName: 'Blue Owl Capital BDC',
    exchange: 'NYSE',
    logoUrl: buildStockLogoUrl('OBDC'),
    overview: 'Blue Owl Capital BDC is a specialty business development company that provides direct lending and private credit solutions, focusing on senior secured debt investments in middle-market companies.',
    category: 'Specialty Finance (BDC)',
    analysisDate: '2026-06-12',
    latestFiscalPeriod: 'Q1 2026 ended 2026-03-31',
    dossierVerdict: 'Blue Owl Capital BDC operates a senior secured private lending portfolio, exposed to loan non-accrual rates, net asset value stability, and dividend coverage ratios.',
    valueCore: {
      ticker: 'OBDC',
      value_core_type: 'business_summary_thesis_risk',
      company_stage_candidate: 'Mature Specialty Finance / Business Development Company',
      primary_value_driver: 'Expanding senior secured loan portfolios, generating net investment income to support dividend payouts, and maintaining net asset value per share.',
      thesis_break_trigger: 'Spike in borrower default non-accruals, compression in investment yields, or debt leverage exceeding regulatory limits.',
      evidence_needed: [
        'Portfolio loan non-accrual rates',
        'Net asset value per share',
        'Net investment income dividend coverage ratio',
        'Weighted average yield on debt investments',
        'Debt to equity leverage ratio'
      ],
      evidence_quality: 'Partial',
      dossier_state: 'curated_profile_batch_18',
      frontend_label: 'Curated',
      coverage_status: 'Curated',
      needs_human_review: false,
      source: 'SEC 10-K / 10-Q'
    },
    visualPhaseOne: {
      faq: {
        overview: 'Blue Owl Capital BDC is a private credit lender providing senior secured debt to middle-market businesses.',
        thesisRisk: 'Key risks include loan non-accrual rates, net asset value stability, and floating rate yield margins.'
      },
      phaseTwo: {
        thesisRisk: [
          {
            category: 'Portfolio Credit Losses',
            risk: 'Middle-market borrowers defaulting on interest payments, leading to loan non-accruals and credit write-downs.',
            watch: 'Portfolio loan non-accrual rates.'
          },
          {
            category: 'Yield Compression',
            risk: 'Declining benchmark interest rates compress yields on floating-rate debt investments, lowering net investment income.',
            watch: 'Weighted average yield on debt investments.'
          },
          {
            category: 'Leverage Constraints',
            risk: 'Debt to equity ratios rising near regulatory maximums, limiting new loan origination capacity.',
            watch: 'Debt to equity leverage ratio.'
          }
        ]
      }
    }
  },
  ODFL: {
    ticker: 'ODFL',
    companyName: 'Old Dominion Freight Line, Inc.',
    exchange: 'NASDAQ',
    logoUrl: buildStockLogoUrl('ODFL'),
    overview: 'Old Dominion Freight Line is a premium less-than-truckload (LTL) motor carrier, providing regional and national logistics and freight transport services across North America.',
    category: 'Logistics & Freight Transport',
    analysisDate: '2026-06-12',
    latestFiscalPeriod: 'Q1 2026 ended 2026-03-31',
    dossierVerdict: 'Old Dominion Freight Line manages transport volume and yield trends, focusing on operational efficiency ratios and customer service metrics.',
    valueCore: {
      ticker: 'ODFL',
      value_core_type: 'business_summary_thesis_risk',
      company_stage_candidate: 'Mature Industrial / Transportation',
      primary_value_driver: 'Growing LTL shipments and tonnage volumes, executing yield management actions, and improving operational efficiency ratios.',
      thesis_break_trigger: 'Contraction in industrial freight demand, price wars in LTL carrier markets, or rising driver labor and fuel costs.',
      evidence_needed: [
        'LTL shipments per day growth rate',
        'LTL tonnage per day growth rate',
        'LTL revenue per hundredweight yield',
        'Operating ratio percentage',
        'Capital spending on equipment and terminals'
      ],
      evidence_quality: 'Partial',
      dossier_state: 'curated_profile_batch_18',
      frontend_label: 'Curated',
      coverage_status: 'Curated',
      needs_human_review: false,
      source: 'SEC 10-K / 10-Q'
    },
    visualPhaseOne: {
      faq: {
        overview: 'Old Dominion Freight Line is a Less-Than-Truckload shipping company providing regional and national freight services.',
        thesisRisk: 'Key risks include freight volume cycles, operating ratio pressures from labor and fuel costs, and competitive shipping pricing.'
      },
      phaseTwo: {
        thesisRisk: [
          {
            category: 'Freight Cycle Contraction',
            risk: 'Slowing manufacturing activity reduces daily shipping volumes and carrier tonnage.',
            watch: 'LTL shipments per day growth rate.'
          },
          {
            category: 'Operating Ratio Pressure',
            risk: 'Driver wage inflation and terminal expansion costs rise faster than revenues, compressing operating margins.',
            watch: 'Operating ratio percentage.'
          },
          {
            category: 'Fuel Cost Volatility',
            risk: 'Rapid spikes in diesel fuel prices outpace surcharge collection adjustments.',
            watch: 'Consolidated operating profit margins.'
          }
        ]
      }
    }
  },
  ONDS: {
    ticker: 'ONDS',
    companyName: 'Ondas Holdings Inc.',
    exchange: 'NASDAQ',
    logoUrl: buildStockLogoUrl('ONDS'),
    overview: 'Ondas Holdings provides private wireless data network technology and automated drone systems for critical infrastructure, defense, and government security markets.',
    category: 'Defense & Industrial Communications',
    analysisDate: '2026-06-12',
    latestFiscalPeriod: 'Q1 2026 ended 2026-03-31',
    dossierVerdict: 'Ondas Holdings operates an early-stage drone and wireless network platform, dependent on contract backlog growth, commercial execution, and cash runway extension.',
    valueCore: {
      ticker: 'ONDS',
      value_core_type: 'business_summary_thesis_risk',
      company_stage_candidate: 'Early commercial Technology & Defense',
      primary_value_driver: 'Securing customer orders for autonomous drone systems, expanding private wireless network deployments, and extending capital runway.',
      thesis_break_trigger: 'Slowing project commercialization, loss of key government pilot contracts, or capital runway depletion.',
      evidence_needed: [
        'Wireless network and drone backlogs',
        'Quarterly contract revenues',
        'Cash runway duration months',
        'Research and development spending',
        'Outstanding share dilution count'
      ],
      evidence_quality: 'Partial',
      dossier_state: 'curated_profile_batch_18',
      frontend_label: 'Curated',
      coverage_status: 'Curated',
      needs_human_review: false,
      source: 'SEC 10-K / 10-Q'
    },
    visualPhaseOne: {
      faq: {
        overview: 'Ondas Holdings designs private wireless data networks and automated drone-in-a-box platforms for industrial and military clients.',
        thesisRisk: 'Key risks include slow commercial adoption cycles, high research burn rates, and capital dilution.'
      },
      phaseTwo: {
        thesisRisk: [
          {
            category: 'Slow Adoption Cycles',
            risk: 'Industrial and government clients deferring drone orders due to regulatory approvals or budget constraints.',
            watch: 'Wireless network and drone backlogs.'
          },
          {
            category: 'Capital Runway Risks',
            risk: 'High cash burn outpaces system revenues, requiring dilutive equity issuance to sustain operations.',
            watch: 'Cash runway duration months.'
          },
          {
            category: 'Customer Concentration',
            risk: 'High reliance on a few defense or utility partners exposes the firm to sudden order drops.',
            watch: 'Quarterly contract revenues.'
          }
        ]
      }
    }
  },
  ORLY: {
    ticker: 'ORLY',
    companyName: 'O\'Reilly Automotive, Inc.',
    exchange: 'NASDAQ',
    logoUrl: buildStockLogoUrl('ORLY'),
    overview: 'O\'Reilly Automotive is a specialty retailer of automotive aftermarket parts, tools, and accessories, serving both DIY consumers and professional automotive service businesses.',
    category: 'Automotive Aftermarket Retail',
    analysisDate: '2026-06-12',
    latestFiscalPeriod: 'Q1 2026 ended 2026-03-31',
    dossierVerdict: 'O\'Reilly Automotive relies on same-store sales growth, store count expansions, professional customer demand, and inventory management.',
    valueCore: {
      ticker: 'ORLY',
      value_core_type: 'business_summary_thesis_risk',
      company_stage_candidate: 'Mature Consumer Discretionary / Retail',
      primary_value_driver: 'Growing comparable store sales, expanding store footprints, and increasing professional service customer revenues.',
      thesis_break_trigger: 'Decline in comparable store sales, inventory supply chain delays, or consumer trading down to lower-margin products.',
      evidence_needed: [
        'Comparable store sales growth rate',
        'Store count additions',
        'Consolidated gross profit margin',
        'Inventory turnover ratio',
        'Professional customer transaction mix'
      ],
      evidence_quality: 'Partial',
      dossier_state: 'curated_profile_batch_18',
      frontend_label: 'Curated',
      coverage_status: 'Curated',
      needs_human_review: false,
      source: 'SEC 10-K / 10-Q'
    },
    visualPhaseOne: {
      faq: {
        overview: 'O\'Reilly Automotive distributes car parts and tools to retail consumers and professional mechanics.',
        thesisRisk: 'Key risks involve same-store sales trends, supply chain inventory management, and shifts in vehicle average age.'
      },
      phaseTwo: {
        thesisRisk: [
          {
            category: 'Comparable Store Sales Slowdown',
            risk: 'Milder weather or economic pressures reduce DIY car maintenance transactions.',
            watch: 'Comparable store sales growth rate.'
          },
          {
            category: 'Supply Chain Inflation',
            risk: 'Rising shipping and component costs compress retail gross margins.',
            watch: 'Consolidated gross profit margin.'
          },
          {
            category: 'Mechanic Labor Shortages',
            risk: 'Labor shortages at professional garages limit professional client parts orders.',
            watch: 'Professional customer transaction mix.'
          }
        ]
      }
    }
  },
  PANW: {
    ticker: 'PANW',
    companyName: 'Palo Alto Networks, Inc.',
    exchange: 'NASDAQ',
    logoUrl: buildStockLogoUrl('PANW'),
    overview: 'Palo Alto Networks provides enterprise cybersecurity solutions, offering network firewalls, cloud security software subscriptions, and threat detection platforms globally.',
    category: 'Enterprise Cybersecurity & Cloud Software',
    analysisDate: '2026-06-12',
    latestFiscalPeriod: 'Q2 2026 ended 2026-01-31',
    dossierVerdict: 'Palo Alto Networks drives platform customer consolidation, expanding recurring software security ARR and managing remaining performance obligations.',
    valueCore: {
      ticker: 'PANW',
      value_core_type: 'business_summary_thesis_risk',
      company_stage_candidate: 'Growth Cybersecurity / Enterprise Software',
      primary_value_driver: 'Expanding next-generation security annual recurring revenues, increasing remaining performance obligations, and driving platform consolidation deals.',
      thesis_break_trigger: 'Slowing next-generation security ARR, deceleration in enterprise cyber spending, or margin compression from software competitor discounting.',
      evidence_needed: [
        'Next-generation security annual recurring revenues',
        'Remaining performance obligations balance',
        'Consolidated gross profit margin',
        'Free cash flow conversion rate',
        'Operating income margin percentage'
      ],
      evidence_quality: 'Partial',
      dossier_state: 'curated_profile_batch_18',
      frontend_label: 'Curated',
      coverage_status: 'Curated',
      needs_human_review: false,
      source: 'SEC 10-K / 10-Q'
    },
    visualPhaseOne: {
      faq: {
        overview: 'Palo Alto Networks designs cybersecurity platforms that integrate firewalls and automated threat detection software.',
        thesisRisk: 'Key risks relate to cybersecurity platform pricing competition, software subscription transition speed, and enterprise IT budget cycles.'
      },
      phaseTwo: {
        thesisRisk: [
          {
            category: 'Cybersecurity Pricing Pressure',
            risk: 'Competitors offering high discounts on software packages slow Palo Alto\'s subscription ARR expansion.',
            watch: 'Next-generation security annual recurring revenues.'
          },
          {
            category: 'Enterprise Budget Reductions',
            risk: 'Slowing economic activity leads to IT budget cuts and deferred cybersecurity software upgrades.',
            watch: 'Remaining performance obligations balance.'
          },
          {
            category: 'Platform Transition Execution',
            risk: 'Failing to convert legacy firewall customers into full-platform cloud security software subscribers.',
            watch: 'Next-generation security annual recurring revenues.'
          }
        ]
      }
    }
  },
  PAYX: {
    ticker: 'PAYX',
    companyName: 'Paychex, Inc.',
    exchange: 'NASDAQ',
    logoUrl: buildStockLogoUrl('PAYX'),
    overview: 'Paychex provides human capital management solutions, offering payroll, human resources compliance, employee benefits, and insurance services for small to medium-sized businesses.',
    category: 'Human Capital Management (HCM) Services',
    analysisDate: '2026-06-12',
    latestFiscalPeriod: 'Q3 2026 ended 2026-02-28',
    dossierVerdict: 'Paychex manages small business payroll client counts, human resource compliance services, client cash float interest yields, and employment cycles.',
    valueCore: {
      ticker: 'PAYX',
      value_core_type: 'business_summary_thesis_risk',
      company_stage_candidate: 'Mature Business Services / HCM',
      primary_value_driver: 'Retaining small business client payroll counts, expanding human resource services, and increasing yield on client cash float investments.',
      thesis_break_trigger: 'Contraction in small business employment, decline in client retention rates, or falling interest rates compressing float yields.',
      evidence_needed: [
        'Payroll and HR services client counts',
        'Client retention rate percentage',
        'Interest yield on client cash float',
        'Consolidated operating profit margin',
        'Consolidated revenue growth rate'
      ],
      evidence_quality: 'Partial',
      dossier_state: 'curated_profile_batch_18',
      frontend_label: 'Curated',
      coverage_status: 'Curated',
      needs_human_review: false,
      source: 'SEC 10-K / 10-Q'
    },
    visualPhaseOne: {
      faq: {
        overview: 'Paychex offers payroll processing and human resource compliance outsourcing services to small and mid-sized companies.',
        thesisRisk: 'Key risks involve changes in small business employment levels, client cash float interest yields, and competitive pricing.'
      },
      phaseTwo: {
        thesisRisk: [
          {
            category: 'Employment Downturn',
            risk: 'Rising layoffs or business closures in the small business sector reduce payroll processing volumes.',
            watch: 'Payroll and HR services client counts.'
          },
          {
            category: 'Interest Float Compression',
            risk: 'Declining interest rates reduce earnings on client funds held during transaction processing.',
            watch: 'Interest yield on client cash float.'
          },
          {
            category: 'Outsourcing Pricing Pressure',
            risk: 'Cloud-native payroll competitors discounting basic services lowers HR segment margins.',
            watch: 'Consolidated operating profit margin.'
          }
        ]
      }
    }
  },
  PCAR: {
    ticker: 'PCAR',
    companyName: 'PACCAR Inc',
    exchange: 'NASDAQ',
    logoUrl: buildStockLogoUrl('PCAR'),
    overview: 'PACCAR designs, manufactures, and markets premium commercial trucks while providing financial services and aftermarket parts distribution globally.',
    category: 'Commercial Truck Manufacturing',
    analysisDate: '2026-06-12',
    latestFiscalPeriod: 'Q1 2026 ended 2026-03-31',
    dossierVerdict: 'PACCAR manages commercial truck delivery rates, manufacturing gross margins, order backlogs, and financial services credit quality.',
    valueCore: {
      ticker: 'PCAR',
      value_core_type: 'business_summary_thesis_risk',
      company_stage_candidate: 'Mature Industrial / Automotive',
      primary_value_driver: 'Fulfilling commercial truck delivery volumes, maintaining premium pricing margins, and growing aftermarket parts distribution.',
      thesis_break_trigger: 'Slowing fleet operator capital demand, truck backlog compression, or rising steel and supply component costs.',
      evidence_needed: [
        'Global truck deliveries count',
        'Truck segment gross profit margin',
        'Backlog book-to-bill ratio',
        'Aftermarket parts revenue growth',
        'Financial services loan default rate'
      ],
      evidence_quality: 'Partial',
      dossier_state: 'curated_profile_batch_18',
      frontend_label: 'Curated',
      coverage_status: 'Curated',
      needs_human_review: false,
      source: 'SEC 10-K / 10-Q'
    },
    visualPhaseOne: {
      faq: {
        overview: 'PACCAR manufactures heavy-duty commercial trucks under Kenworth, Peterbilt, and DAF brands, supporting them with aftermarket parts.',
        thesisRisk: 'Key risks involve freight carrier fleet replacement cycles, steel and commodity inflation, and commercial loan defaults.'
      },
      phaseTwo: {
        thesisRisk: [
          {
            category: 'Fleet Replacement Slowdown',
            risk: 'Slowing freight transport rates lead carrier operators to defer purchasing new heavy-duty trucks.',
            watch: 'Backlog book-to-bill ratio and deliveries.'
          },
          {
            category: 'Manufacturing Cost Inflation',
            risk: 'Rising costs for steel, aluminum, and truck engines compress manufacturing gross margins.',
            watch: 'Truck segment gross profit margin.'
          },
          {
            category: 'Credit Default Risks',
            risk: 'Financial distress among owner-operators increases defaults in its truck financing division.',
            watch: 'Financial services loan default rate.'
          }
        ]
      }
    }
  },
  PDD: {
    ticker: 'PDD',
    companyName: 'PDD Holdings Inc.',
    exchange: 'NASDAQ',
    logoUrl: buildStockLogoUrl('PDD'),
    overview: 'PDD Holdings operates global e-commerce platforms, including Pinduoduo in China and Temu internationally, connecting merchants directly with global consumers.',
    category: 'Global E-Commerce Platforms',
    analysisDate: '2026-06-12',
    latestFiscalPeriod: 'Q1 2026 ended 2026-03-31',
    dossierVerdict: 'PDD Holdings scales global direct-from-merchant e-commerce, balancing transaction margins, marketing spend efficiency, and cross-border transport logistics compliance.',
    valueCore: {
      ticker: 'PDD',
      value_core_type: 'business_summary_thesis_risk',
      company_stage_candidate: 'High-Growth E-Commerce Platform',
      primary_value_driver: 'Scaling transaction volumes, growing Temu international shipments, and maintaining merchant marketing services revenues.',
      thesis_break_trigger: 'Cross-border tariff and trade policy restrictions, rising transport shipping costs, or slowing consumer transaction frequency.',
      evidence_needed: [
        'Online marketing services revenues',
        'Transaction services fee revenues',
        'Consolidated operating profit margin',
        'Marketing and promotion spending efficiency',
        'Days inventory outstanding'
      ],
      evidence_quality: 'Partial',
      dossier_state: 'curated_profile_batch_18',
      frontend_label: 'Curated',
      coverage_status: 'Curated',
      needs_human_review: false,
      source: 'SEC 20-F / 6-K'
    },
    visualPhaseOne: {
      faq: {
        overview: 'PDD Holdings runs online shopping marketplaces, facilitating direct transactions between manufacturers and retail buyers.',
        thesisRisk: 'Key risks relate to international trade tariff rules, cross-border shipping transport costs, and merchant marketing platform revenues.'
      },
      phaseTwo: {
        thesisRisk: [
          {
            category: 'Trade Policy and Tariffs',
            risk: 'Changes in import tax thresholds or cross-border transport restrictions disrupt international Temu operations.',
            watch: 'Transaction services fee revenues.'
          },
          {
            category: 'Marketing Cost Escalation',
            risk: 'Heavy advertising spend fails to retain international users, reducing marketing return on investment.',
            watch: 'Marketing and promotion spending efficiency.'
          },
          {
            category: 'Shipping Cost Spikes',
            risk: 'Rising international air and maritime transport rates erode transaction fee operating margins.',
            watch: 'Consolidated operating profit margin.'
          }
        ]
      }
    }
  },
  PWR: {
    ticker: 'PWR',
    companyName: 'Quanta Services, Inc.',
    exchange: 'NYSE',
    logoUrl: buildStockLogoUrl('PWR'),
    overview: 'Quanta Services provides infrastructure solutions, offering engineering, procurement, and construction services for utility transmission, renewable energy, and communications infrastructure.',
    category: 'Infrastructure Engineering & Construction',
    analysisDate: '2026-06-12',
    latestFiscalPeriod: 'Q1 2026 ended 2026-03-31',
    dossierVerdict: 'Quanta Services executes utility transmission and renewable grid integration projects, managing backlogs, labor supply, and capital requirements.',
    valueCore: {
      ticker: 'PWR',
      value_core_type: 'business_summary_thesis_risk',
      company_stage_candidate: 'Mature Industrial / Infrastructure Services',
      primary_value_driver: 'Expanding utility and renewable project backlogs, executing grid connection projects for data centers, and managing subcontractor labor costs.',
      thesis_break_trigger: 'Project delays due to utility regulatory approvals, rising subcontractor wages, or working capital cash flow constraints.',
      evidence_needed: [
        'Electric Power and Renewable backlogs',
        'Segment operating profit margins',
        'Days sales outstanding in receivables',
        'Capital expenditures as a percentage of sales',
        'Free cash flow conversion rate'
      ],
      evidence_quality: 'Partial',
      dossier_state: 'curated_profile_batch_18',
      frontend_label: 'Curated',
      coverage_status: 'Curated',
      needs_human_review: false,
      source: 'SEC 10-K / 10-Q'
    },
    visualPhaseOne: {
      faq: {
        overview: 'Quanta Services designs and builds electric grids, renewable energy connections, and telecommunication infrastructure.',
        thesisRisk: 'Key risks include utility grid upgrade regulatory approval times, skilled labor shortages, and working capital project requirements.'
      },
      phaseTwo: {
        thesisRisk: [
          {
            category: 'Regulatory Project Delays',
            risk: 'Utility regulatory commissions defer grid upgrade approvals, delaying backlog project starts.',
            watch: 'Electric Power and Renewable backlogs.'
          },
          {
            category: 'Labor Supply Shortages',
            risk: 'Shortages of skilled electrical line workers increase wages and project execution costs, compressing margins.',
            watch: 'Segment operating profit margins.'
          },
          {
            category: 'Working Capital Demands',
            risk: 'Large infrastructure projects require significant upfront cash for materials, slowing free cash flow conversion.',
            watch: 'Days sales outstanding in receivables.'
          }
        ]
      }
    }
  },
  PYPL: {
    ticker: 'PYPL',
    companyName: 'PayPal Holdings, Inc.',
    exchange: 'NASDAQ',
    logoUrl: buildStockLogoUrl('PYPL'),
    overview: 'PayPal Holdings operates a digital payments platform that connects merchants and consumers, processing transactions through PayPal, Venmo, Braintree, and other branded checkout solutions globally.',
    category: 'Digital Payments & Financial Technology',
    analysisDate: '2026-06-12',
    latestFiscalPeriod: 'Q1 2026 ended 2026-03-31',
    dossierVerdict: 'PayPal manages transaction payment margins and branded checkout volumes, navigating intense competition from tech-platform payment solutions.',
    valueCore: {
      ticker: 'PYPL',
      value_core_type: 'business_summary_thesis_risk',
      company_stage_candidate: 'Mature Financial Technology Platform',
      primary_value_driver: 'Expanding branded checkout volumes, scaling Braintree payment processing, and improving transaction margins.',
      thesis_break_trigger: 'Sustained drop in branded checkout volumes, compression in transaction margins from processing mix, or active account attrition.',
      evidence_needed: [
        'Transaction payment margin percentage',
        'Branded checkout volume growth rate',
        'Braintree total payment volume',
        'Active customer accounts count',
        'Total payment volume processed'
      ],
      evidence_quality: 'Partial',
      dossier_state: 'curated_profile_batch_19',
      frontend_label: 'Curated',
      coverage_status: 'Curated',
      needs_human_review: false,
      source: 'SEC 10-K / 10-Q'
    },
    visualPhaseOne: {
      faq: {
        overview: 'PayPal provides digital transaction processing services through its global digital wallets and merchant gateway brands.',
        thesisRisk: 'Key risks include competition in branded retail checkouts, processing volume margins, and active user retention.'
      },
      phaseTwo: {
        thesisRisk: [
          {
            category: 'Branded Checkout Growth',
            risk: 'Fierce competition from alternative digital payment wallets reduces PayPal branded checkout transaction volumes.',
            watch: 'Branded checkout volume growth rate.'
          },
          {
            category: 'Transaction Margin Pressure',
            risk: 'Rapid growth in lower-margin unbranded Braintree processing outpaces high-margin PayPal transactions, compressing margins.',
            watch: 'Transaction payment margin percentage.'
          },
          {
            category: 'User Retention',
            risk: 'Loss of active consumer accounts reduces transaction frequency and platform network effects.',
            watch: 'Active customer accounts count.'
          }
        ]
      }
    }
  },
  RCL: {
    ticker: 'RCL',
    companyName: 'Royal Caribbean Cruises Ltd.',
    exchange: 'NYSE',
    logoUrl: buildStockLogoUrl('RCL'),
    overview: 'Royal Caribbean Cruises Ltd. is a global cruise vacation company, operating passenger fleets under brands like Royal Caribbean International, Celebrity Cruises, and Silversea Cruises.',
    category: 'Consumer Travel / Cruise Lines',
    analysisDate: '2026-06-12',
    latestFiscalPeriod: 'Q1 2026 ended 2026-03-31',
    dossierVerdict: 'Royal Caribbean manages booking backlogs, fleet capacity expansions, onboard spending levels, and fuel costs under high balance sheet leverage.',
    valueCore: {
      ticker: 'RCL',
      value_core_type: 'business_summary_thesis_risk',
      company_stage_candidate: 'Mature Consumer Services / Cruise Vacation',
      primary_value_driver: 'Sustaining advance passenger ticket bookings, maintaining high occupancy rates, and increasing onboard customer spending.',
      thesis_break_trigger: 'Sustained contraction in advance bookings, drop in occupancy rates below historical averages, or passenger capacity underutilization.',
      evidence_needed: [
        'Advance passenger bookings balance',
        'Passenger cruise occupancy percentage',
        'Average onboard customer spending',
        'Net debt to adjusted EBITDA ratio',
        'Weighted average fuel cost per metric ton'
      ],
      evidence_quality: 'Partial',
      dossier_state: 'curated_profile_batch_19',
      frontend_label: 'Curated',
      coverage_status: 'Curated',
      needs_human_review: false,
      source: 'SEC 10-K / 10-Q'
    },
    visualPhaseOne: {
      faq: {
        overview: 'Royal Caribbean operates premium cruise ships, generating revenues from ticket sales and passenger spending onboard.',
        thesisRisk: 'Key risks include macroeconomic travel demand declines, fuel cost volatility, and debt leverage refinancing.'
      },
      phaseTwo: {
        thesisRisk: [
          {
            category: 'Consumer Demand Cycles',
            risk: 'Economic recessions reduce discretionary spending on vacations, causing cruise ticket price discounting.',
            watch: 'Advance passenger bookings balance and occupancy.'
          },
          {
            category: 'Fuel Cost Volatility',
            risk: 'Sharp increases in marine diesel prices raise operating costs, lowering fleet margins.',
            watch: 'Weighted average fuel cost per metric ton.'
          },
          {
            category: 'Leverage and Debt Service',
            risk: 'High debt levels require significant interest payments, limiting capital deployment for fleet upgrades.',
            watch: 'Net debt to adjusted EBITDA ratio.'
          }
        ]
      }
    }
  },
  REGN: {
    ticker: 'REGN',
    companyName: 'Regeneron Pharmaceuticals, Inc.',
    exchange: 'NASDAQ',
    logoUrl: buildStockLogoUrl('REGN'),
    overview: 'Regeneron Pharmaceuticals discovers, develops, and commercializes biopharmaceutical therapies, relying on core products like Eylea and Dupixent while investing in oncology pipelines.',
    category: 'Biotechnology & Therapeutics',
    analysisDate: '2026-06-12',
    latestFiscalPeriod: 'Q1 2026 ended 2026-03-31',
    dossierVerdict: 'Regeneron depends on Eylea and Dupixent revenue contributions, clinical trial readouts, and patent litigation cycles.',
    valueCore: {
      ticker: 'REGN',
      value_core_type: 'business_summary_thesis_risk',
      company_stage_candidate: 'Mature Commercial Biopharmaceutical',
      primary_value_driver: 'Scaling Dupixent global revenues, defending Eylea market share, and advancing oncology and immunology drug pipelines.',
      thesis_break_trigger: 'Rapid erosion of Eylea revenues from biosimilar competition, negative clinical trial outcomes for key candidates, or regulatory review delays.',
      evidence_needed: [
        'Eylea net product sales',
        'Dupixent global net sales',
        'Clinical trial pipeline progression',
        'Research and development spending',
        'Biosimilar market penetration rates'
      ],
      evidence_quality: 'Partial',
      dossier_state: 'curated_profile_batch_19',
      frontend_label: 'Curated',
      coverage_status: 'Curated',
      needs_human_review: false,
      source: 'SEC 10-K / 10-Q'
    },
    visualPhaseOne: {
      faq: {
        overview: 'Regeneron is a commercial biotech company developing treatments for eye diseases, inflammatory conditions, and cancer.',
        thesisRisk: 'Key risks include biosimilar competition for Eylea, drug pipeline trial failures, and commercialization costs.'
      },
      phaseTwo: {
        thesisRisk: [
          {
            category: 'Biosimilar Competition',
            risk: 'Competitor biosimilar products erode Eylea market share, reducing high-margin revenues.',
            watch: 'Eylea net product sales and biosimilar market share.'
          },
          {
            category: 'Pipeline Development',
            risk: 'Key oncology or immunology drug candidates fail to meet endpoints in clinical trials, delaying approvals.',
            watch: 'Clinical trial pipeline progression.'
          },
          {
            category: 'Concentration Risk',
            risk: 'High reliance on Dupixent growth to offset potential legacy product declines increases portfolio risk.',
            watch: 'Dupixent global net sales.'
          }
        ]
      }
    }
  },
  ROP: {
    ticker: 'ROP',
    companyName: 'Roper Technologies, Inc.',
    exchange: 'NYSE',
    logoUrl: buildStockLogoUrl('ROP'),
    overview: 'Roper Technologies designs and markets application software and technology solutions for niche markets in healthcare, education, municipal, and industrial segments.',
    category: 'Niche Application Software & Technology',
    analysisDate: '2026-06-12',
    latestFiscalPeriod: 'Q1 2026 ended 2026-03-31',
    dossierVerdict: 'Roper operates an acquisition-driven business model, focusing on recurring software subscription revenues and high EBITDA margins.',
    valueCore: {
      ticker: 'ROP',
      value_core_type: 'business_summary_thesis_risk',
      company_stage_candidate: 'Mature Software & Technology Solutions',
      primary_value_driver: 'Scaling organic recurring software subscription revenues, integrating newly acquired software businesses, and maintaining high free cash flow conversion.',
      thesis_break_trigger: 'Deceleration in organic software subscription growth, integration failure of large acquisitions, or debt leverage limits.',
      evidence_needed: [
        'Organic recurring software revenue growth',
        'Consolidated EBITDA margin percentage',
        'Acquired business integration timelines',
        'Free cash flow conversion rate',
        'Net debt to adjusted EBITDA ratio'
      ],
      evidence_quality: 'Partial',
      dossier_state: 'curated_profile_batch_19',
      frontend_label: 'Curated',
      coverage_status: 'Curated',
      needs_human_review: false,
      source: 'SEC 10-K / 10-Q'
    },
    visualPhaseOne: {
      faq: {
        overview: 'Roper acquires and operates niche vertical software providers, maintaining an asset-light corporate structure.',
        thesisRisk: 'Key risks include slowing organic software subscription demand, high debt from acquisitions, and integration challenges.'
      },
      phaseTwo: {
        thesisRisk: [
          {
            category: 'Organic Growth Slowdown',
            risk: 'Slowing customer renewals or software license upgrades reduces recurring segment growth rates.',
            watch: 'Organic recurring software revenue growth.'
          },
          {
            category: 'Acquisition Valuation',
            risk: 'Paying high valuations for new software businesses fails to yield expected returns, reducing cash generation.',
            watch: 'Consolidated EBITDA margin percentage.'
          },
          {
            category: 'Leverage Risks',
            risk: 'High debt balances incurred for acquisitions limit future deployment and raise interest expenses.',
            watch: 'Net debt to adjusted EBITDA ratio.'
          }
        ]
      }
    }
  },
  ROST: {
    ticker: 'ROST',
    companyName: 'Ross Stores, Inc.',
    exchange: 'NASDAQ',
    logoUrl: buildStockLogoUrl('ROST'),
    overview: 'Ross Stores operates off-price retail stores under Ross Dress for Less and dd\'s DISCOUNTS, providing branded apparel and home fashion products at discounted prices.',
    category: 'Off-Price Retail & Apparel',
    analysisDate: '2026-06-12',
    latestFiscalPeriod: 'Q1 2026 ended 2026-05-02',
    dossierVerdict: 'Ross Stores relies on comparable store sales growth, retail store expansions, inventory turnover rates, and lower-to-middle income consumer demand.',
    valueCore: {
      ticker: 'ROST',
      value_core_type: 'business_summary_thesis_risk',
      company_stage_candidate: 'Mature Consumer Retail / Off-Price',
      primary_value_driver: 'Expanding comparable store sales, growing retail store count footprints, and optimizing merchandise procurement margin spreads.',
      thesis_break_trigger: 'Decline in comparable store sales growth, supply chain inventory bottlenecks, or middle-income consumer wallet contraction.',
      evidence_needed: [
        'Comparable store sales growth rate',
        'Store count additions',
        'Merchandise gross profit margin',
        'Inventory turnover ratio',
        'Average customer ticket transaction value'
      ],
      evidence_quality: 'Partial',
      dossier_state: 'curated_profile_batch_19',
      frontend_label: 'Curated',
      coverage_status: 'Curated',
      needs_human_review: false,
      source: 'SEC 10-K / 10-Q'
    },
    visualPhaseOne: {
      faq: {
        overview: 'Ross Stores distributes brand name apparel and home fashion products at discounted prices through its retail stores.',
        thesisRisk: 'Key risks relate to consumer spending volatility, inventory sourcing availability, and retail operating cost inflation.'
      },
      phaseTwo: {
        thesisRisk: [
          {
            category: 'Consumer Discretionary Shift',
            risk: 'Persistent inflation reduces middle-income consumer spending on apparel, slowing store traffic.',
            watch: 'Comparable store sales growth rate.'
          },
          {
            category: 'Inventory Sourcing',
            risk: 'Shortages in closeout apparel manufacturing restrict the availability of high-quality discounted brands.',
            watch: 'Merchandise gross profit margin.'
          },
          {
            category: 'Wage and Rent Costs',
            risk: 'Increases in retail store hourly wages and real estate lease rents compress operating margins.',
            watch: 'Store segment operating margins.'
          }
        ]
      }
    }
  },
  RTX: {
    ticker: 'RTX',
    companyName: 'RTX Corporation',
    exchange: 'NYSE',
    logoUrl: buildStockLogoUrl('RTX'),
    overview: 'RTX Corporation is an aerospace and defense contractor operating Pratt & Whitney (commercial engines), Collins Aerospace (avionics), and Raytheon (missiles and space systems).',
    category: 'Defense & Aerospace Systems',
    analysisDate: '2026-06-12',
    latestFiscalPeriod: 'Q1 2026 ended 2026-03-31',
    dossierVerdict: 'RTX balances commercial aerospace aftermarket service volumes against defense backlogs, program deliveries, and quality inspections.',
    valueCore: {
      ticker: 'RTX',
      value_core_type: 'business_summary_thesis_risk',
      company_stage_candidate: 'Mature Aerospace & Defense Contractor',
      primary_value_driver: 'Securing defense order backlogs, executing Pratt & Whitney GTF engine inspection schedules, and scaling aerospace aftermarket service sales.',
      thesis_break_trigger: 'GTF engine inspection cost overruns, delays in defense project deliveries, or fixed-price contract margin compression.',
      evidence_needed: [
        'Pratt and Whitney GTF engine inspection metrics',
        'Raytheon defense segment backlog',
        'Aerospace aftermarket service revenues',
        'Free cash flow conversion rate',
        'Fixed-price contract operating margins'
      ],
      evidence_quality: 'Partial',
      dossier_state: 'curated_profile_batch_19',
      frontend_label: 'Curated',
      coverage_status: 'Curated',
      needs_human_review: false,
      source: 'SEC 10-K / 10-Q'
    },
    visualPhaseOne: {
      faq: {
        overview: 'RTX manufactures aviation engines and defense missile systems, serving commercial airlines and military customers.',
        thesisRisk: 'Key risks include commercial engine quality inspections, fixed-price defense program cost overruns, and supply chains.'
      },
      phaseTwo: {
        thesisRisk: [
          {
            category: 'Engine Inspection Costs',
            risk: 'Compensations to airlines and repair costs for Pratt & Whitney GTF engines exceed financial provisions.',
            watch: 'GTF engine inspection metrics and cash outflows.'
          },
          {
            category: 'Fixed-Price Overruns',
            risk: 'Materials and labor inflation on fixed-price defense contracts erode division operating margins.',
            watch: 'Fixed-price contract operating margins.'
          },
          {
            category: 'Supply Chain Bottlenecks',
            risk: 'Shortages of aerospace components delay defense systems and aircraft engine deliveries.',
            watch: 'Defense segment backlog and shipments.'
          }
        ]
      }
    }
  },
  SCHW: {
    ticker: 'SCHW',
    companyName: 'The Charles Schwab Corporation',
    exchange: 'NYSE',
    logoUrl: buildStockLogoUrl('SCHW'),
    overview: 'The Charles Schwab Corporation provides wealth management, securities brokerage, banking, and client cash sweep deposit services to retail and institutional customers.',
    category: 'Securities Brokerage & Financial Services',
    analysisDate: '2026-06-12',
    latestFiscalPeriod: 'Q1 2026 ended 2026-03-31',
    dossierVerdict: 'Schwab manages client sweep deposits, banking segment net interest margins, assets under management, and cash sorting behaviors.',
    valueCore: {
      ticker: 'SCHW',
      value_core_type: 'business_summary_thesis_risk',
      company_stage_candidate: 'Mature Financial Services & Wealth Management',
      primary_value_driver: 'Stabilizing client sweep deposit balances, expanding net interest margin spreads, and increasing total client assets.',
      thesis_break_trigger: 'Sustained client cash sorting into higher-yielding assets, net interest margin compression, or client asset outflows.',
      evidence_needed: [
        'Client sweep deposit balances',
        'Net interest margin percentage',
        'Total client assets under management',
        'Securities brokerage active account count',
        'Banking regulatory Tier 1 leverage ratio'
      ],
      evidence_quality: 'Partial',
      dossier_state: 'curated_profile_batch_19',
      frontend_label: 'Curated',
      coverage_status: 'Curated',
      needs_human_review: false,
      source: 'SEC 10-K / 10-Q'
    },
    visualPhaseOne: {
      faq: {
        overview: 'Charles Schwab provides securities brokerage services and bank accounts, managing customer investments and cash deposits.',
        thesisRisk: 'Key risks involve client cash sorting into higher-yielding money market funds, deposit outflows, and interest rate changes.'
      },
      phaseTwo: {
        thesisRisk: [
          {
            category: 'Client Cash Sorting',
            risk: 'Customers moving low-yield brokerage sweep deposits into high-yield funds forces Schwab to fund its bank with higher-cost debt.',
            watch: 'Client sweep deposit balances.'
          },
          {
            category: 'Net Interest Compression',
            risk: 'Declining benchmark rates compress net interest margins on its banking investment portfolio.',
            watch: 'Net interest margin percentage.'
          },
          {
            category: 'Asset Asset Outflows',
            risk: 'Fierce wealth management competition leads to outflows in fee-generating advisory accounts.',
            watch: 'Total client assets under management.'
          }
        ]
      }
    }
  },
  SHW: {
    ticker: 'SHW',
    companyName: 'The Sherwin-Williams Company',
    exchange: 'NYSE',
    logoUrl: buildStockLogoUrl('SHW'),
    overview: 'The Sherwin-Williams Company manufactures, distributes, and markets paints, architectural coatings, and industrial supplies to professional contractors and retail customers.',
    category: 'Paints & Coatings Manufacturing',
    analysisDate: '2026-06-12',
    latestFiscalPeriod: 'Q1 2026 ended 2026-03-31',
    dossierVerdict: 'Sherwin-Williams manages retail paint store same-store sales, raw material chemical inflation, and professional contractor paint demand.',
    valueCore: {
      ticker: 'SHW',
      value_core_type: 'business_summary_thesis_risk',
      company_stage_candidate: 'Mature Industrial / Consumer Retail',
      primary_value_driver: 'Growing Paint Stores segment same-store sales, implementing price increases to offset raw material costs, and expanding professional contractor accounts.',
      thesis_break_trigger: 'Contraction in same-store sales, severe raw chemical cost inflation, or downturn in residential construction and painting activity.',
      evidence_needed: [
        'Paint Stores segment same-store sales growth',
        'Consolidated gross profit margin',
        'Professional contractor account additions',
        'Housing starts and home resale volume',
        'Days inventory outstanding'
      ],
      evidence_quality: 'Partial',
      dossier_state: 'curated_profile_batch_19',
      frontend_label: 'Curated',
      coverage_status: 'Curated',
      needs_human_review: false,
      source: 'SEC 10-K / 10-Q'
    },
    visualPhaseOne: {
      faq: {
        overview: 'Sherwin-Williams operates retail stores and manufacturing sites, supplying paints and coatings to builders and consumers.',
        thesisRisk: 'Key risks include residential housing construction volume downturns, raw chemical cost inflation, and retail pricing power.'
      },
      phaseTwo: {
        thesisRisk: [
          {
            category: 'Housing Cycle Downturn',
            risk: 'Weak new home construction and low existing home resales reduce professional paint demand.',
            watch: 'Paint Stores segment same-store sales growth.'
          },
          {
            category: 'Chemical Cost Inflation',
            risk: 'Rising costs for petrochemicals and titanium dioxide compress manufacturing gross margins.',
            watch: 'Consolidated gross profit margin.'
          },
          {
            category: 'Contractor Labor Constraints',
            risk: 'Shortages of professional painters limit the number of projects completed, slowing paint sales.',
            watch: 'Professional contractor account additions.'
          }
        ]
      }
    }
  },
  SNDK: {
    ticker: 'SNDK',
    companyName: 'SanDisk Corporation',
    exchange: 'NASDAQ',
    logoUrl: buildStockLogoUrl('SNDK'),
    overview: 'SanDisk Corporation designs, manufactures, and markets flash memory storage solutions, including NAND flash components and solid-state drives for datacenters and consumer devices.',
    category: 'Flash Memory & NAND Storage',
    analysisDate: '2026-06-12',
    latestFiscalPeriod: 'Q1 2026 ended 2026-03-31',
    dossierVerdict: 'SanDisk navigates cyclical NAND flash market pricing, datacenter customer inventory cycles, and wafer fabrication plant utilization.',
    valueCore: {
      ticker: 'SNDK',
      value_core_type: 'business_summary_thesis_risk',
      company_stage_candidate: 'Mature Semiconductor / Memory Storage',
      primary_value_driver: 'Scaling datacenter enterprise solid-state drive shipments, normalizing NAND memory pricing, and increasing wafer fabrication plant utilization.',
      thesis_break_trigger: 'Severe collapse in NAND flash market pricing, underutilization of wafer fabrication capacity, or datacenter client capital reductions.',
      evidence_needed: [
        'NAND flash market price per gigabyte',
        'Enterprise solid-state drive shipment volumes',
        'Wafer fabrication plant utilization rate',
        'Consolidated gross profit margin',
        'Days inventory outstanding'
      ],
      evidence_quality: 'Partial',
      dossier_state: 'curated_profile_batch_19',
      frontend_label: 'Curated',
      coverage_status: 'Curated',
      needs_human_review: false,
      source: 'SEC 10-K / 10-Q'
    },
    visualPhaseOne: {
      faq: {
        overview: 'SanDisk manufactures flash memory storage products used in servers, phones, and computers.',
        thesisRisk: 'Key risks involve volatility in NAND flash market pricing, server customer build cycles, and factory underutilization.'
      },
      phaseTwo: {
        thesisRisk: [
          {
            category: 'NAND Price Volatility',
            risk: 'Industry oversupply of memory chips drives down price per gigabyte, compressing gross margins.',
            watch: 'NAND flash market price per gigabyte.'
          },
          {
            category: 'Factory Underutilization',
            risk: 'Slowing client demand forces production cuts, leading to high fixed cost underutilization charges.',
            watch: 'Wafer fabrication plant utilization rate.'
          },
          {
            category: 'Datacenter CapEx Cycles',
            risk: 'Hyperscale cloud providers deferring server memory upgrades due to infrastructure budget constraints.',
            watch: 'Enterprise solid-state drive shipment volumes.'
          }
        ]
      }
    }
  },
  SNPS: {
    ticker: 'SNPS',
    companyName: 'Synopsys, Inc.',
    exchange: 'NASDAQ',
    logoUrl: buildStockLogoUrl('SNPS'),
    overview: 'Synopsys designs electronic design automation (EDA) software and design IP blocks used by chip design companies to model, verify, and manufacture semiconductors.',
    category: 'Semiconductor Design Software (EDA)',
    analysisDate: '2026-06-12',
    latestFiscalPeriod: 'Q2 2026 ended 2026-04-30',
    dossierVerdict: 'Synopsys operates a stable software model, driven by semiconductor customer R&D budgets, EDA subscriptions, and IP reuse licensing.',
    valueCore: {
      ticker: 'SNPS',
      value_core_type: 'business_summary_thesis_risk',
      company_stage_candidate: 'Mature Engineering Software & IP',
      primary_value_driver: 'Growing EDA software recurring subscription revenues, expanding reuse IP block licensing deals, and managing R&D capital spend.',
      thesis_break_trigger: 'Slowing semiconductor customer research and development budgets, deceleration in EDA software subscriptions, or merger integration delays.',
      evidence_needed: [
        'EDA software recurring subscription revenues',
        'Design IP segment licensing revenues',
        'Semiconductor industry R&D capital spend',
        'Operating income margin percentage',
        'Customer design start project counts'
      ],
      evidence_quality: 'Partial',
      dossier_state: 'curated_profile_batch_19',
      frontend_label: 'Curated',
      coverage_status: 'Curated',
      needs_human_review: false,
      source: 'SEC 10-K / 10-Q'
    },
    visualPhaseOne: {
      faq: {
        overview: 'Synopsys develops the software tools that semiconductor companies use to design and test new computer chips.',
        thesisRisk: 'Key risks involve changes in semiconductor client R&D spending, competitive chip design tools, and merger regulations.'
      },
      phaseTwo: {
        thesisRisk: [
          {
            category: 'Client R&D Reductions',
            risk: 'Consolidation or budget cuts among chipmakers reduce EDA software seat license renewals.',
            watch: 'Semiconductor industry R&D capital spend.'
          },
          {
            category: 'IP Block Obsolescence',
            risk: 'Failing to update standard design blocks for next-generation manufacturing processes reduces licensing fees.',
            watch: 'Design IP segment licensing revenues.'
          },
          {
            category: 'Merger Regulatory Hurdles',
            risk: 'Regulatory authorities blocking or delaying acquisitions limits long-term growth platforms.',
            watch: 'Operating income margin percentage.'
          }
        ]
      }
    }
  },
  SO: {
    ticker: 'SO',
    companyName: 'The Southern Company',
    exchange: 'NYSE',
    logoUrl: buildStockLogoUrl('SO'),
    overview: 'The Southern Company is a utility parent company, operating regulated electric and gas distribution subsidiaries supplying customer markets across multiple US states.',
    category: 'Regulated Electricity & Gas Utility',
    analysisDate: '2026-06-12',
    latestFiscalPeriod: 'Q1 2026 ended 2026-03-31',
    dossierVerdict: 'Southern Company manages regulated utility commission rate cases, nuclear power and grid capital expenditures, and weather-driven demand.',
    valueCore: {
      ticker: 'SO',
      value_core_type: 'business_summary_thesis_risk',
      company_stage_candidate: 'Mature Regulated Utility',
      primary_value_driver: 'Securing constructive utility commission rate adjustments, executing power plant and grid capital spending plans, and expanding retail customer counts.',
      thesis_break_trigger: 'Unfavorable regulatory rate decisions, capital cost overruns on utility infrastructure, or rising interest rates inflating debt service.',
      evidence_needed: [
        'Regulated rate case decisions',
        'Utility infrastructure capital spending',
        'Retail customer connection counts',
        'Wholesale interest rate refinancing costs',
        'Weather-normalized electricity demand'
      ],
      evidence_quality: 'Partial',
      dossier_state: 'curated_profile_batch_19',
      frontend_label: 'Curated',
      coverage_status: 'Curated',
      needs_human_review: false,
      source: 'SEC 10-K / 10-Q'
    },
    visualPhaseOne: {
      faq: {
        overview: 'Southern Company operates electric and gas utilities, generating power and distributing natural gas to retail customers.',
        thesisRisk: 'Key risks include state commission utility rate cases, construction cost overruns on power plants, and refinancing debt costs.'
      },
      phaseTwo: {
        thesisRisk: [
          {
            category: 'Regulatory Decisions',
            risk: 'State public service commissions deny requested rate increases, lowering utility operating returns.',
            watch: 'Regulated rate case decisions.'
          },
          {
            category: 'Capital Project Overruns',
            risk: 'Nuclear reactor or major grid upgrades experience construction delays and budget overruns that cannot be recovered in rates.',
            watch: 'Utility infrastructure capital spending.'
          },
          {
            category: 'Debt Refinancing Rates',
            risk: 'High interest rates increase the cost of refinancing maturing utility bonds, compressing net income margins.',
            watch: 'Wholesale interest rate refinancing costs.'
          }
        ]
      }
    }
  },
  SPG: {
    ticker: 'SPG',
    companyName: 'Simon Property Group, Inc.',
    exchange: 'NYSE',
    logoUrl: buildStockLogoUrl('SPG'),
    overview: 'Simon Property Group is a retail real estate investment trust (REIT), owning, developing, and leasing premium shopping malls and premium outlet centers.',
    category: 'Retail Property REIT',
    analysisDate: '2026-06-12',
    latestFiscalPeriod: 'Q1 2026 ended 2026-03-31',
    dossierVerdict: 'Simon Property Group manages retail property occupancy rates, tenant retail operator credit stability, and base rent per square foot metrics.',
    valueCore: {
      ticker: 'SPG',
      value_core_type: 'business_summary_thesis_risk',
      company_stage_candidate: 'Mature Real Estate / REIT',
      primary_value_driver: 'Maintaining high shopping mall occupancy levels, increasing average base rent rates, and securing stable tenant lease renewals.',
      thesis_break_trigger: 'Sustained occupancy decline below ninety percent, tenant bankruptcies in major department store anchors, or refinancing cost increases.',
      evidence_needed: [
        'Simon retail mall occupancy percentage',
        'Average base rent per square foot',
        'Tenant lease renewal retention rate',
        'Net debt to adjusted EBITDA ratio',
        'Refinancing debt interest rate yields'
      ],
      evidence_quality: 'Partial',
      dossier_state: 'curated_profile_batch_19',
      frontend_label: 'Curated',
      coverage_status: 'Curated',
      needs_human_review: false,
      source: 'SEC 10-K / 10-Q'
    },
    visualPhaseOne: {
      faq: {
        overview: 'Simon Property Group owns premium retail real estate, generating lease revenues from brand retailers in malls and outlets.',
        thesisRisk: 'Key risks involve shopping mall occupancy rates, retail tenant bankruptcies, and debt refinancing costs.'
      },
      phaseTwo: {
        thesisRisk: [
          {
            category: 'Occupancy Devaluation',
            risk: 'Retail store closures and department store bankruptcies lower overall mall occupancy rates.',
            watch: 'Simon retail mall occupancy percentage.'
          },
          {
            category: 'Lease Pricing Compression',
            risk: 'Weak tenant sales force concessions on base rent rates during lease renewal negotiations.',
            watch: 'Average base rent per square foot.'
          },
          {
            category: 'Debt Refinancing Costs',
            risk: 'Refinancing mortgage debt at higher benchmark rates increases interest expenses, compressing cash flows.',
            watch: 'Refinancing debt interest rate yields.'
          }
        ]
      }
    }
  },
  STX: {
    ticker: 'STX',
    companyName: 'Seagate Technology Holdings plc',
    exchange: 'NASDAQ',
    logoUrl: buildStockLogoUrl('STX'),
    overview: 'Seagate Technology designs and manufactures hard disk drives (HDDs) and read-write heads for enterprise cloud datacenters and consumer electronic systems.',
    category: 'Data Storage & Hard Disk Drives',
    analysisDate: '2026-06-12',
    latestFiscalPeriod: 'Q3 2026 ended 2026-04-03',
    dossierVerdict: 'Seagate Technology navigates cloud datacenter client inventory cycles, hard disk drive average realized prices, and factory utilization rates.',
    valueCore: {
      ticker: 'STX',
      value_core_type: 'business_summary_thesis_risk',
      company_stage_candidate: 'Mature Technology Hardware / Storage',
      primary_value_driver: 'Growing enterprise mass capacity HDD shipments, maintaining average realized prices per drive, and improving manufacturing margins.',
      thesis_break_trigger: 'Severe drop in datacenter mass capacity HDD shipments, price competition compressing average realized prices, or underutilization charges.',
      evidence_needed: [
        'Enterprise mass capacity HDD shipments',
        'Average realized price per drive',
        'HDD segment gross profit margin',
        'Cloud datacenter inventory levels',
        'Days inventory outstanding'
      ],
      evidence_quality: 'Partial',
      dossier_state: 'curated_profile_batch_19',
      frontend_label: 'Curated',
      coverage_status: 'Curated',
      needs_human_review: false,
      source: 'SEC 10-K / 10-Q'
    },
    visualPhaseOne: {
      faq: {
        overview: 'Seagate designs and manufactures high-capacity hard drives used in datacenter servers and cloud storage infrastructure.',
        thesisRisk: 'Key risks relate to cloud provider capital spending cycles, hard drive pricing, and manufacturing capacity utilization.'
      },
      phaseTwo: {
        thesisRisk: [
          {
            category: 'Cloud CapEx Cycles',
            risk: 'Major cloud host providers deferring storage server purchases due to inventory digestion cycles.',
            watch: 'Enterprise mass capacity HDD shipments.'
          },
          {
            category: 'Pricing Competition',
            risk: 'Price wars in standard hard drive markets reduce average realized prices, compressing margins.',
            watch: 'Average realized price per drive.'
          },
          {
            category: 'Underutilization Charges',
            risk: 'Production cuts required to balance market supply create fixed cost underutilization drag.',
            watch: 'HDD segment gross profit margin.'
          }
        ]
      }
    }
  },
  T: {
    ticker: 'T',
    companyName: 'AT&T Inc.',
    exchange: 'NYSE',
    logoUrl: buildStockLogoUrl('T'),
    overview: 'AT&T Inc. provides mobile telecommunication services, high-speed fiber broadband connections, and business communication solutions across the US.',
    category: 'Telecommunication Services',
    analysisDate: '2026-06-12',
    latestFiscalPeriod: 'Q1 2026 ended 2026-03-31',
    dossierVerdict: 'AT&T manages wireless postpaid subscriber net additions, postpaid ARPU, fiber broadband expansions, and total debt reduction.',
    valueCore: {
      ticker: 'T',
      value_core_type: 'business_summary_thesis_risk',
      company_stage_candidate: 'Mature Telecommunications Provider',
      primary_value_driver: 'Growing postpaid wireless subscribers, expanding fiber broadband home connections, and generating free cash flows to reduce debt.',
      thesis_break_trigger: 'Wireless subscriber net losses, average revenue per user compression from price wars, or failure to meet free cash flow targets.',
      evidence_needed: [
        'Postpaid wireless subscriber net additions',
        'Postpaid phone average revenue per user',
        'Fiber broadband subscriber counts',
        'Free cash flow generation',
        'Net debt outstanding balance'
      ],
      evidence_quality: 'Partial',
      dossier_state: 'curated_profile_batch_19',
      frontend_label: 'Curated',
      coverage_status: 'Curated',
      needs_human_review: false,
      source: 'SEC 10-K / 10-Q'
    },
    visualPhaseOne: {
      faq: {
        overview: 'AT&T provides mobile voice and data services, broadband fiber connections, and business IT networks.',
        thesisRisk: 'Key risks include wireless market price wars lowering ARPU, fiber rollout capital costs, and balance sheet leverage.'
      },
      phaseTwo: {
        thesisRisk: [
          {
            category: 'ARPU Compression',
            risk: 'Aggressive promotional pricing by telecom competitors lowers average monthly billing rates per subscriber.',
            watch: 'Postpaid phone average revenue per user.'
          },
          {
            category: 'Broadband Capital Cost',
            risk: 'High installation costs for residential fiber lines outpace customer connections, lowering returns.',
            watch: 'Fiber broadband subscriber counts.'
          },
          {
            category: 'Debt Maturity Drag',
            risk: 'Slower-than-planned free cash flow generation delays balance sheet deleveraging goals.',
            watch: 'Net debt outstanding balance.'
          }
        ]
      }
    }
  },
  TPVG: {
    ticker: 'TPVG',
    companyName: 'TriplePoint Venture Growth BDC Corp.',
    exchange: 'NYSE',
    logoUrl: buildStockLogoUrl('TPVG'),
    overview: 'TriplePoint Venture Growth BDC Corp. is a business development company providing customized debt financing to growth stage, venture-backed companies in technology and life sciences.',
    category: 'Specialty Finance (BDC)',
    analysisDate: '2026-06-12',
    latestFiscalPeriod: 'Q1 2026 ended 2026-03-31',
    dossierVerdict: 'TriplePoint BDC operates a senior secured venture lending portfolio, sensitive to loan non-accrual rates, net asset value stability, and NII dividend coverage.',
    valueCore: {
      ticker: 'TPVG',
      value_core_type: 'business_summary_thesis_risk',
      company_stage_candidate: 'Mature Specialty Finance / Business Development Company',
      primary_value_driver: 'Managing venture loan non-accrual rates, securing stable net asset value per share, and generating net investment income to cover dividends.',
      thesis_break_trigger: 'Spike in venture borrower loan defaults, significant net asset value write-downs, or venture funding market freezes.',
      evidence_needed: [
        'Venture loan portfolio non-accrual rates',
        'Net asset value per share',
        'Net investment income dividend coverage ratio',
        'Weighted average yield on venture debt',
        'New debt loan origination volumes'
      ],
      evidence_quality: 'Partial',
      dossier_state: 'curated_profile_batch_19',
      frontend_label: 'Curated',
      coverage_status: 'Curated',
      needs_human_review: false,
      source: 'SEC 10-K / 10-Q'
    },
    visualPhaseOne: {
      faq: {
        overview: 'TriplePoint BDC provides debt loans to growth-stage technology and biotech companies backed by venture capital firms.',
        thesisRisk: 'Key risks include high portfolio non-accrual rates, venture industry funding recessions, and NAV per share stability.'
      },
      phaseTwo: {
        thesisRisk: [
          {
            category: 'Venture Defaults',
            risk: 'Venture-backed startups fail to raise new equity rounds and default on senior loans, causing credit losses.',
            watch: 'Venture loan portfolio non-accrual rates.'
          },
          {
            category: 'NAV Depreciation',
            risk: 'Write-downs in the valuation of equity warrants and venture loans reduce net asset value per share.',
            watch: 'Net asset value per share.'
          },
          {
            category: 'Funding Freeze',
            risk: 'Slowing venture capital fundraising reduces demand for venture debt originations.',
            watch: 'New debt loan origination volumes.'
          }
        ]
      }
    }
  },
  TRI: {
    ticker: 'TRI',
    companyName: 'Thomson Reuters Corporation',
    exchange: 'NYSE',
    logoUrl: buildStockLogoUrl('TRI'),
    overview: 'Thomson Reuters Corporation provides business information services, delivering legal, tax, accounting, and news content through integrated software and digital platforms.',
    category: 'Business Information Services',
    analysisDate: '2026-06-12',
    latestFiscalPeriod: 'Q1 2026 ended March 31, 2026',
    dossierVerdict: 'Thomson Reuters manages organic revenue growth across legal and corporates segments, adjusts adjusted EBITDA margins, and integrates AI technology such as CoCounsel.',
    valueCore: {
      ticker: 'TRI',
      value_core_type: 'business_summary_thesis_risk',
      company_stage_candidate: 'Mature Business Information Provider',
      primary_value_driver: 'Expanding organic revenues in core legal, tax, and corporates segments, and scaling AI-driven product adoption.',
      thesis_break_trigger: 'Slowdown in professional software subscription renewals, failure of AI-driven products to justify investment, or competitive market share loss.',
      evidence_needed: [
        'Big 3 segment organic revenue growth',
        'Adjusted EBITDA margin',
        'Legal professionals organic revenue growth',
        'CoCounsel user adoption',
        'Free cash flow generation'
      ],
      evidence_quality: 'Partial',
      dossier_state: 'curated_profile_batch_20',
      frontend_label: 'Curated',
      coverage_status: 'Curated',
      needs_human_review: false,
      source: 'SEC 20-F / 6-K'
    },
    visualPhaseOne: {
      faq: {
        overview: 'Thomson Reuters provides legal, tax, and news databases and software to professional firms.',
        thesisRisk: 'Key risks relate to professional spending cycles, AI product integration costs, and competition.'
      },
      phaseTwo: {
        thesisRisk: [
          {
            category: 'Professional Spending',
            risk: 'Economic downturns cause law and accounting firms to cut database seats and software licenses.',
            watch: 'Big 3 segment organic revenue growth'
          },
          {
            category: 'AI Tech Transition',
            risk: 'High development cost of generative AI integrations fails to drive corresponding subscription price increases.',
            watch: 'CoCounsel user adoption'
          },
          {
            category: 'Competition',
            risk: 'Alternative legal and tax software providers offer lower cost databases, compressing profit margins.',
            watch: 'Adjusted EBITDA margin'
          }
        ]
      }
    }
  },
  TRV: {
    ticker: 'TRV',
    companyName: 'The Travelers Companies, Inc.',
    exchange: 'NYSE',
    logoUrl: buildStockLogoUrl('TRV'),
    overview: 'The Travelers Companies, Inc. is a leading provider of property and casualty insurance products for businesses, individuals, and associations in the United States and select international markets.',
    category: 'Property & Casualty Insurance',
    analysisDate: '2026-06-12',
    latestFiscalPeriod: 'Q1 2026 ended March 31, 2026',
    dossierVerdict: 'Travelers operates a commercial and personal insurance portfolio, sensitive to underwriting margins, combined ratios, and catastrophe loss trends.',
    valueCore: {
      ticker: 'TRV',
      value_core_type: 'business_summary_thesis_risk',
      company_stage_candidate: 'Mature Property & Casualty Insurer',
      primary_value_driver: 'Maintaining underwriting discipline to secure a combined ratio below 90%, managing catastrophe losses, and growing net written premiums.',
      thesis_break_trigger: 'Persistent increase in the combined ratio above 100%, severe unexpected catastrophe losses, or pricing power deterioration.',
      evidence_needed: [
        'Consolidated combined ratio',
        'Underlying combined ratio',
        'Pre-tax catastrophe losses',
        'Net written premium growth',
        'Net investment income'
      ],
      evidence_quality: 'Partial',
      dossier_state: 'curated_profile_batch_20',
      frontend_label: 'Curated',
      coverage_status: 'Curated',
      needs_human_review: false,
      source: 'SEC 10-K / 10-Q'
    },
    visualPhaseOne: {
      faq: {
        overview: 'Travelers provides commercial, personal, and specialty property and casualty insurance policies.',
        thesisRisk: 'Key risks relate to severe weather catastrophe losses, underwriting combined ratios, and premium pricing trends.'
      },
      phaseTwo: {
        thesisRisk: [
          {
            category: 'Weather Catastrophes',
            risk: 'Rising frequency and severity of hurricanes, tornadoes, and wildfires increase insurance claims.',
            watch: 'Pre-tax catastrophe losses'
          },
          {
            category: 'Underwriting Margins',
            risk: 'Inflation in auto parts and construction costs increases claim severity faster than premiums rise.',
            watch: 'Consolidated combined ratio'
          },
          {
            category: 'Pricing Competition',
            risk: 'Competitors lower premium rates to capture market share, reducing underwriting profit margins.',
            watch: 'Net written premium growth'
          }
        ]
      }
    }
  },
  TSM: {
    ticker: 'TSM',
    companyName: 'Taiwan Semiconductor Manufacturing Company Limited',
    exchange: 'NYSE',
    logoUrl: buildStockLogoUrl('TSM'),
    overview: 'Taiwan Semiconductor Manufacturing Company Limited is the world\'s largest dedicated semiconductor foundry, manufacturing advanced integrated circuits for global fabless chip design customers.',
    category: 'Semiconductor Foundry',
    analysisDate: '2026-06-12',
    latestFiscalPeriod: 'Q1 2026 ended March 31, 2026',
    dossierVerdict: 'TSMC navigates wafer manufacturing capacity utilization, advanced node revenue mix, gross margins, and global factory expansion capital investments.',
    valueCore: {
      ticker: 'TSM',
      value_core_type: 'business_summary_thesis_risk',
      company_stage_candidate: 'Scale Semiconductor Manufacturer',
      primary_value_driver: 'Scaling manufacturing capacity for advanced technology nodes (3nm, 5nm) to support AI demand while securing gross margins above 60%.',
      thesis_break_trigger: 'Decline in advanced node utilization, geopolitical disruptions in Taiwan, or cost overruns at international fab locations.',
      evidence_needed: [
        'Gross profit margin',
        'Advanced node revenue share',
        'Net sales revenue growth',
        'Capital expenditures',
        'Wafer shipments'
      ],
      evidence_quality: 'Partial',
      dossier_state: 'curated_profile_batch_20',
      frontend_label: 'Curated',
      coverage_status: 'Curated',
      needs_human_review: false,
      source: 'SEC 20-F / 6-K'
    },
    visualPhaseOne: {
      faq: {
        overview: 'TSMC manufactures silicon microchips for tech companies, specializing in advanced high-performance nodes.',
        thesisRisk: 'Key risks relate to geopolitical concentration, high capital expenditure for international factories, and semiconductor cycles.'
      },
      phaseTwo: {
        thesisRisk: [
          {
            category: 'Geopolitical Risk',
            risk: 'Political tension disrupts wafer manufacturing facilities located in Taiwan, choking global electronics supply chains.',
            watch: 'Wafer shipments'
          },
          {
            category: 'Capital Cost',
            risk: 'Constructing and operating new factories in the US, Europe, and Japan increases depreciation and lowers returns.',
            watch: 'Gross profit margin'
          },
          {
            category: 'Customer Concentration',
            risk: 'Slower demand for high-end smartphones or AI servers reduces advanced node wafer orders.',
            watch: 'Advanced node revenue share'
          }
        ]
      }
    }
  },
  TTWO: {
    ticker: 'TTWO',
    companyName: 'Take-Two Interactive Software, Inc.',
    exchange: 'NASDAQ',
    logoUrl: buildStockLogoUrl('TTWO'),
    overview: 'Take-Two Interactive Software, Inc. designs, publishes, and distributes interactive entertainment and mobile gaming content through internal developer studios including Rockstar Games, 2K, and Zynga.',
    category: 'Interactive Media & Gaming',
    analysisDate: '2026-06-12',
    latestFiscalPeriod: 'Q4/FY 2026 ended March 31, 2026',
    dossierVerdict: 'Take-Two manages game release schedules, Net Bookings growth, recurring consumer spending, and integration of mobile gaming properties.',
    valueCore: {
      ticker: 'TTWO',
      value_core_type: 'business_summary_thesis_risk',
      company_stage_candidate: 'Large Scale Interactive Entertainment Developer',
      primary_value_driver: 'Delivering major franchise releases on schedule (such as Grand Theft Auto VI) and growing recurring mobile game net bookings.',
      thesis_break_trigger: 'Multi-quarter delays in critical game launches, structural declines in mobile game monetization, or rising software development cost inflation.',
      evidence_needed: [
        'Total Net Bookings',
        'Recurring consumer spending share',
        'Mobile net bookings',
        'Console and PC net bookings',
        'Operating cash flows'
      ],
      evidence_quality: 'Partial',
      dossier_state: 'curated_profile_batch_20',
      frontend_label: 'Curated',
      coverage_status: 'Curated',
      needs_human_review: false,
      source: 'SEC 10-K / 10-Q'
    },
    visualPhaseOne: {
      faq: {
        overview: 'Take-Two develops and publishes games like Grand Theft Auto and NBA 2K for consoles, PC, and mobile.',
        thesisRisk: 'Key risks relate to major game release delays, escalating development budgets, and mobile game player retention.'
      },
      phaseTwo: {
        thesisRisk: [
          {
            category: 'Release Schedule',
            risk: 'Complex development requirements cause Rockstar Games to defer the Grand Theft Auto VI release past guided dates.',
            watch: 'Total Net Bookings'
          },
          {
            category: 'Mobile Performance',
            risk: 'Post-acquisition Zynga mobile games experience user churn or drop in in-app microtransactions.',
            watch: 'Mobile net bookings'
          },
          {
            category: 'Cost Escalation',
            risk: 'Talent competition and longer development cycles inflate software capitalization budgets.',
            watch: 'Operating cash flows'
          }
        ]
      }
    }
  },
  UAL: {
    ticker: 'UAL',
    companyName: 'United Airlines',
    exchange: 'NASDAQ',
    logoUrl: buildStockLogoUrl('UAL'),
    overview: 'United Airlines operates a major global passenger airline network, managing hubs across the United States and offering domestic and international air transportation.',
    category: 'Air Transportation',
    analysisDate: '2026-06-12',
    latestFiscalPeriod: 'Q1 2026 ended March 31, 2026',
    dossierVerdict: 'United Airlines manages passenger unit revenue (PRASM), flight capacity (ASMs), jet fuel price fluctuations, and balance sheet leverage.',
    valueCore: {
      ticker: 'UAL',
      value_core_type: 'business_summary_thesis_risk',
      company_stage_candidate: 'Large Network Air Carrier',
      primary_value_driver: 'Achieving passenger revenue per available seat mile (PRASM) growth, optimizing network capacity, and generating free cash flows to reduce debt.',
      thesis_break_trigger: 'Severe drop in corporate or international travel demand, passenger capacity oversupply crushing PRASM, or soaring fuel costs.',
      evidence_needed: [
        'Passenger revenue per available seat mile',
        'Available seat miles capacity',
        'Average fuel price per gallon',
        'Passenger load factor',
        'Total debt outstanding'
      ],
      evidence_quality: 'Partial',
      dossier_state: 'curated_profile_batch_20',
      frontend_label: 'Curated',
      coverage_status: 'Curated',
      needs_human_review: false,
      source: 'SEC 10-K / 10-Q'
    },
    visualPhaseOne: {
      faq: {
        overview: 'United Airlines operates scheduled passenger flights worldwide, utilizing a hub-and-spoke model.',
        thesisRisk: 'Key risks include high jet fuel costs, pricing pressure from industry overcapacity, and labor contract inflation.'
      },
      phaseTwo: {
        thesisRisk: [
          {
            category: 'Fuel Expense',
            risk: 'Global crude price spikes increase average jet fuel costs, creating immediate margin drag.',
            watch: 'Average fuel price per gallon'
          },
          {
            category: 'Industry Overcapacity',
            risk: 'Airlines expand scheduled domestic routes too aggressively, lowering passenger load factors and unit fares.',
            watch: 'Passenger revenue per available seat mile'
          },
          {
            category: 'Labor Costs',
            risk: 'New collective bargaining contracts for pilots and flight attendants raise fixed operating expenses.',
            watch: 'Passenger load factor'
          }
        ]
      }
    }
  },
  USB: {
    ticker: 'USB',
    companyName: 'U.S. Bancorp',
    exchange: 'NYSE',
    logoUrl: buildStockLogoUrl('USB'),
    overview: 'U.S. Bancorp is a bank parent company providing consumer banking, commercial lending, wealth management, and payment services across the United States.',
    category: 'Regional Banking',
    analysisDate: '2026-06-12',
    latestFiscalPeriod: 'Q1 2026 ended March 31, 2026',
    dossierVerdict: 'U.S. Bancorp manages net interest income, average deposit growth, Common Equity Tier 1 (CET1) capital ratios, and loan credit quality.',
    valueCore: {
      ticker: 'USB',
      value_core_type: 'business_summary_thesis_risk',
      company_stage_candidate: 'Mature Financial Institution',
      primary_value_driver: 'Growing net interest income through deposit cost control, maintaining stable loan credit quality, and preserving CET1 ratios above 10.5%.',
      thesis_break_trigger: 'Sharp contraction in net interest margins, accelerating loan charge-offs, or regulatory deposit capital requirements hikes.',
      evidence_needed: [
        'Net interest income',
        'Average total deposits',
        'Basel III CET1 capital ratio',
        'Net charge-off ratio',
        'Nonperforming asset ratio'
      ],
      evidence_quality: 'Partial',
      dossier_state: 'curated_profile_batch_20',
      frontend_label: 'Curated',
      coverage_status: 'Curated',
      needs_human_review: false,
      source: 'SEC 10-K / 10-Q'
    },
    visualPhaseOne: {
      faq: {
        overview: 'U.S. Bancorp provides retail and commercial banking, trust, and payment services to individuals and businesses.',
        thesisRisk: 'Key risks include deposit cost interest margin squeeze, commercial loan defaults, and capital requirements.'
      },
      phaseTwo: {
        thesisRisk: [
          {
            category: 'Margin Compression',
            risk: 'Intense deposit competition forces the bank to pay higher deposit rates, squeezing net interest margins.',
            watch: 'Net interest income'
          },
          {
            category: 'Credit Quality',
            risk: 'Defaults in commercial real estate or consumer credit card portfolios escalate charge-off rates.',
            watch: 'Net charge-off ratio'
          },
          {
            category: 'Capital Regulation',
            risk: 'Stricter capital rules require higher equity cushions, reducing return on equity.',
            watch: 'Basel III CET1 capital ratio'
          }
        ]
      }
    }
  },
  VRSK: {
    ticker: 'VRSK',
    companyName: 'Verisk Analytics, Inc.',
    exchange: 'NASDAQ',
    logoUrl: buildStockLogoUrl('VRSK'),
    overview: 'Verisk Analytics, Inc. provides data analytics, predictive modeling, and decision support solutions primarily for insurance underwriters and underwriters in the United States and internationally.',
    category: 'Data & Risk Analytics',
    analysisDate: '2026-06-12',
    latestFiscalPeriod: 'Q1 2026 ended March 31, 2026',
    dossierVerdict: 'Verisk Analytics operates subscription data platforms, sensitive to insurance sector customer budgets, organic recurring revenue growth, and EBITDA margins.',
    valueCore: {
      ticker: 'VRSK',
      value_core_type: 'business_summary_thesis_risk',
      company_stage_candidate: 'Mature Data & Software Provider',
      primary_value_driver: 'Expanding subscription recurring revenues through new predictive analytics tools and maintaining adjusted EBITDA margins above 50%.',
      thesis_break_trigger: 'Slowdown in organic subscription revenue growth, consolidation of major insurance customers reducing pricing power, or analytics database outages.',
      evidence_needed: [
        'Organic recurring revenue growth',
        'Subscription revenue share',
        'Adjusted EBITDA margin',
        'Remaining performance obligations',
        'Customer retention rate'
      ],
      evidence_quality: 'Partial',
      dossier_state: 'curated_profile_batch_20',
      frontend_label: 'Curated',
      coverage_status: 'Curated',
      needs_human_review: false,
      source: 'SEC 10-K / 10-Q'
    },
    visualPhaseOne: {
      faq: {
        overview: 'Verisk provides underwriting data, predictive risk modeling, and software tools to property and casualty insurers.',
        thesisRisk: 'Key risks include insurance customer consolidation, subscription growth deceleration, and tech system security.'
      },
      phaseTwo: {
        thesisRisk: [
          {
            category: 'Customer Power',
            risk: 'Mergers between major property and casualty insurers reduce the number of enterprise subscription accounts, compressing prices.',
            watch: 'Organic recurring revenue growth'
          },
          {
            category: 'IT Expenditures',
            risk: 'High capital expenditure to migrate database servers to cloud environments reduces near-term operating cash flows.',
            watch: 'Adjusted EBITDA margin'
          },
          {
            category: 'Database Disruption',
            risk: 'Security breaches in proprietary database centers compromise sensitive insurer claims data, eroding customer trust.',
            watch: 'Customer retention rate'
          }
        ]
      }
    }
  },
  VRT: {
    ticker: 'VRT',
    companyName: 'Vertiv Co.',
    exchange: 'NYSE',
    logoUrl: buildStockLogoUrl('VRT'),
    overview: 'Vertiv Co. designs, builds, and services critical digital infrastructure and cooling solutions for data centers, communication networks, and industrial applications globally.',
    category: 'Data Center Infrastructure',
    analysisDate: '2026-06-12',
    latestFiscalPeriod: 'Q1 2026 ended March 31, 2026',
    dossierVerdict: 'Vertiv manages order bookings, data center infrastructure demand, organic sales growth, and adjusted operating margins.',
    valueCore: {
      ticker: 'VRT',
      value_core_type: 'business_summary_thesis_risk',
      company_stage_candidate: 'Scaling Industrial Technology Provider',
      primary_value_driver: 'Capturing high-density computing demand through liquid cooling and power solutions while expanding operating margins.',
      thesis_break_trigger: 'Sharp deceleration in cloud data center capital spending, supply chain constraints for critical cooling modules, or margin compression from commodity costs.',
      evidence_needed: [
        'Organic sales growth rate',
        'Adjusted operating profit margin',
        'Americas regional sales growth',
        'Book-to-bill ratio',
        'Inventory turnover days'
      ],
      evidence_quality: 'Partial',
      dossier_state: 'curated_profile_batch_20',
      frontend_label: 'Curated',
      coverage_status: 'Curated',
      needs_human_review: false,
      source: 'SEC 10-K / 10-Q'
    },
    visualPhaseOne: {
      faq: {
        overview: 'Vertiv provides power management, thermal cooling systems, and technical services to enterprise and cloud data centers.',
        thesisRisk: 'Key risks include cyclical data center capital expenditure, copper commodity price increases, and manufacturing component delays.'
      },
      phaseTwo: {
        thesisRisk: [
          {
            category: 'CapEx Cycles',
            risk: 'Data center operators pause expansions to digest current thermal cooling capacity installations.',
            watch: 'Organic sales growth rate'
          },
          {
            category: 'Supply Bottlenecks',
            risk: 'Constraints in securing specialized thermal components (such as coolant distribution units) delay shipment revenues.',
            watch: 'Book-to-bill ratio'
          },
          {
            category: 'Material Inflation',
            risk: 'Spikes in raw copper, aluminum, and freight costs compress gross margins before prices can be adjusted.',
            watch: 'Adjusted operating profit margin'
          }
        ]
      }
    }
  },
  VRTX: {
    ticker: 'VRTX',
    companyName: 'Vertex Pharmaceuticals Incorporated',
    exchange: 'NASDAQ',
    logoUrl: buildStockLogoUrl('VRTX'),
    overview: 'Vertex Pharmaceuticals Incorporated is a global biotechnology company that discovers, develops, and commercializes small molecule therapies for cystic fibrosis, alongside gene therapies for sickle cell disease.',
    category: 'Biotechnology',
    analysisDate: '2026-06-12',
    latestFiscalPeriod: 'Q1 2026 ended March 31, 2026',
    dossierVerdict: 'Vertex manages product concentration in cystic fibrosis, pipeline developments (such as Casgevy), R&D expenditures, and regulatory approval milestones.',
    valueCore: {
      ticker: 'VRTX',
      value_core_type: 'business_summary_thesis_risk',
      company_stage_candidate: 'Large Scale Commercial Biotech',
      primary_value_driver: 'Preserving the dominant market share of the cystic fibrosis franchise while commercializing new therapies to diversify the revenue base.',
      thesis_break_trigger: 'Clinical trial failures in advanced pipeline candidates, patent expiration of core cystic fibrosis therapies, or commercial launch delays for new treatments.',
      evidence_needed: [
        'Cystic fibrosis segment product sales',
        'New product revenue contribution',
        'Research and development expenses',
        'Casgevy patient treatment initiations',
        'Cash and marketable securities'
      ],
      evidence_quality: 'Partial',
      dossier_state: 'curated_profile_batch_20',
      frontend_label: 'Curated',
      coverage_status: 'Curated',
      needs_human_review: false,
      source: 'SEC 10-K / 10-Q'
    },
    visualPhaseOne: {
      faq: {
        overview: 'Vertex commercializes therapies for cystic fibrosis, and develops new pipelines in pain management and gene therapy.',
        thesisRisk: 'Key risks relate to high product concentration, clinical trial timelines, and commercial execution of new treatments.'
      },
      phaseTwo: {
        thesisRisk: [
          {
            category: 'Product Concentration',
            risk: 'Dependency on the cystic fibrosis franchise exposes the company to patent challenges or safety concerns.',
            watch: 'Cystic fibrosis segment product sales'
          },
          {
            category: 'Commercial Launch',
            risk: 'Long manufacturing timelines and medical center onboarding delay revenue conversion for gene therapies.',
            watch: 'Casgevy patient treatment initiations'
          },
          {
            category: 'Pipeline Setbacks',
            risk: 'Advanced non-opioid pain therapies or kidney disease candidates fail to meet primary endpoints in Phase 3 trials.',
            watch: 'New product revenue contribution'
          }
        ]
      }
    }
  },
  WBD: {
    ticker: 'WBD',
    companyName: 'Warner Bros. Discovery, Inc.',
    exchange: 'NASDAQ',
    logoUrl: buildStockLogoUrl('WBD'),
    overview: 'Warner Bros. Discovery, Inc. operates as a global media and entertainment company, distributing films, television series, and streaming services through brands like Warner Bros., HBO, and Max.',
    category: 'Media & Entertainment',
    analysisDate: '2026-06-12',
    latestFiscalPeriod: 'Q1 2026 ended March 31, 2026',
    dossierVerdict: 'Warner Bros. Discovery manages streaming subscriber net additions, linear TV advertising revenue declines, content production costs, and net debt reduction.',
    valueCore: {
      ticker: 'WBD',
      value_core_type: 'business_summary_thesis_risk',
      company_stage_candidate: 'Mature Media and Entertainment Company',
      primary_value_driver: 'Growing Max streaming revenues, securing theatrical box office hits, and utilizing studio cash flows to reduce debt leverage.',
      thesis_break_trigger: 'Accelerating pay-TV subscriber cord-cutting, persistent declines in linear advertising, or failure to grow streaming profitability.',
      evidence_needed: [
        'Total revenue growth',
        'Streaming segment adjusted EBITDA',
        'Direct-to-consumer subscriber counts',
        'Advertising revenue decline rate',
        'Free cash flow generation'
      ],
      evidence_quality: 'Partial',
      dossier_state: 'curated_profile_batch_20',
      frontend_label: 'Curated',
      coverage_status: 'Curated',
      needs_human_review: false,
      source: 'SEC 10-K / 10-Q'
    },
    visualPhaseOne: {
      faq: {
        overview: 'Warner Bros. Discovery provides content through television, movie studios, and its streaming platform (Max).',
        thesisRisk: 'Key risks include linear pay-TV subscriber erosion, structural advertising declines, and high debt load.'
      },
      phaseTwo: {
        thesisRisk: [
          {
            category: 'Linear Decay',
            risk: 'High-margin affiliate fees decline due to domestic pay-TV cord-cutting, outstripping streaming expansion.',
            watch: 'Advertising revenue decline rate'
          },
          {
            category: 'Debt Leverage',
            risk: 'Declining cash flows from linear television divisions delay leverage reduction on the balance sheet.',
            watch: 'Free cash flow generation'
          },
          {
            category: 'Streaming Competition',
            risk: 'Competitor content spend increases churn at Max, forcing higher promotional discounts and compressing margins.',
            watch: 'Streaming segment adjusted EBITDA'
          }
        ]
      }
    }
  },
  WDC: {
    ticker: 'WDC',
    companyName: 'Western Digital Corporation',
    exchange: 'NASDAQ',
    logoUrl: buildStockLogoUrl('WDC'),
    overview: 'Western Digital Corporation designs and manufactures data storage solutions, producing hard disk drives (HDDs) for datacenters and flash memory products for mobile and client devices.',
    category: 'Technology Hardware & Storage',
    analysisDate: '2026-06-12',
    latestFiscalPeriod: 'Q3 2026 ended April 3, 2026',
    dossierVerdict: 'Western Digital manages nearline HDD shipments, flash memory pricing cycles, factory capacity utilization, and capital structure debt reduction.',
    valueCore: {
      ticker: 'WDC',
      value_core_type: 'business_summary_thesis_risk',
      company_stage_candidate: 'Cyclical Tech Hardware Manufacturer',
      primary_value_driver: 'Expanding high-capacity nearline HDD gross margins through AI data center demand and managing flash memory cost reductions.',
      thesis_break_trigger: 'Severe downturn in average realized prices for flash memory, hyperscaler cloud storage inventory digestion, or manufacturing cost inflation.',
      evidence_needed: [
        'Total revenues',
        'Non-GAAP gross profit margin',
        'Nearline enterprise HDD sales',
        'Operating cash flows',
        'Total debt outstanding'
      ],
      evidence_quality: 'Partial',
      dossier_state: 'curated_profile_batch_20',
      frontend_label: 'Curated',
      coverage_status: 'Curated',
      needs_human_review: false,
      source: 'SEC 10-K / 10-Q'
    },
    visualPhaseOne: {
      faq: {
        overview: 'Western Digital provides flash memory cards, solid-state drives, and high-capacity hard drives for cloud and client systems.',
        thesisRisk: 'Key risks relate to storage price cycles, cloud customer capital spending pauses, and manufacturing fixed cost coverage.'
      },
      phaseTwo: {
        thesisRisk: [
          {
            category: 'Storage Price Cycles',
            risk: 'Excess flash memory capacity in the industry triggers a collapse in average realized prices, crushing margins.',
            watch: 'Non-GAAP gross profit margin'
          },
          {
            category: 'Hyperscaler Pauses',
            risk: 'Major cloud providers pause storage server purchases to digest existing hard drive inventories.',
            watch: 'Nearline enterprise HDD sales'
          },
          {
            category: 'Capital Leverage',
            risk: 'Slower operating cash flow generation delays debt repayment goals on the remaining corporate credit facilities.',
            watch: 'Total debt outstanding'
          }
        ]
      }
    }
  },
  WFC: {
    ticker: 'WFC',
    companyName: 'Wells Fargo & Company',
    exchange: 'NYSE',
    logoUrl: buildStockLogoUrl('WFC'),
    overview: 'Wells Fargo & Company is a diversified financial services company providing banking, investments, mortgages, and consumer and commercial finance across the United States.',
    category: 'Diversified Banking',
    analysisDate: '2026-06-12',
    latestFiscalPeriod: 'Q1 2026 ended March 31, 2026',
    dossierVerdict: 'Wells Fargo manages net interest income, average deposit growth, loan credit quality, nonaccrual assets, and capital distribution ratios.',
    valueCore: {
      ticker: 'WFC',
      value_core_type: 'business_summary_thesis_risk',
      company_stage_candidate: 'Large Financial Services Institution',
      primary_value_driver: 'Growing consumer lending products post-asset cap removal while controlling deposit funding costs and regulatory compliance expenses.',
      thesis_break_trigger: 'Rapid compression in net interest margins from interest rate cuts, surge in commercial real estate loan defaults, or new regulatory consent orders.',
      evidence_needed: [
        'Net interest income',
        'Average deposits outstanding',
        'Basel III CET1 ratio',
        'Net charge-offs ratio',
        'Nonperforming asset ratio'
      ],
      evidence_quality: 'Partial',
      dossier_state: 'curated_profile_batch_20',
      frontend_label: 'Curated',
      coverage_status: 'Curated',
      needs_human_review: false,
      source: 'SEC 10-K / 10-Q'
    },
    visualPhaseOne: {
      faq: {
        overview: 'Wells Fargo provides retail, commercial, and investment banking services to consumers and institutional clients.',
        thesisRisk: 'Key risks include net interest margin compression, commercial portfolio credit losses, and compliance costs.'
      },
      phaseTwo: {
        thesisRisk: [
          {
            category: 'Margin Squeeze',
            risk: 'Rapid interest rate reductions lower yields on floating-rate loans faster than deposit costs can be adjusted.',
            watch: 'Net interest income'
          },
          {
            category: 'Credit Losses',
            risk: 'Commercial office real estate values decline, causing a spike in nonperforming commercial loans.',
            watch: 'Nonperforming asset ratio'
          },
          {
            category: 'Expense Management',
            risk: 'Compliance upgrades and legacy legal settlements inflate non-interest operating expenses.',
            watch: 'Net charge-offs ratio'
          }
        ]
      }
    }
  },
  XEL: {
    ticker: 'XEL',
    companyName: 'Xcel Energy Inc.',
    exchange: 'NASDAQ',
    logoUrl: buildStockLogoUrl('XEL'),
    overview: 'Xcel Energy Inc. is a public utility parent company operating electric and natural gas utility systems through subsidiaries serving customers in Minnesota, Colorado, and other states.',
    category: 'Regulated Utility',
    analysisDate: '2026-06-12',
    latestFiscalPeriod: 'Q1 2026 ended March 31, 2026',
    dossierVerdict: 'Xcel Energy manages regulated rate base expansions, capital investment recovery, commission rate case outcomes, and interest expense burdens.',
    valueCore: {
      ticker: 'XEL',
      value_core_type: 'business_summary_thesis_risk',
      company_stage_candidate: 'Regulated Infrastructure Provider',
      primary_value_driver: 'Executing a multi-year capital investment program to expand the regulated rate base while securing rate case approvals.',
      thesis_break_trigger: 'Unfavorable utility commission decisions lowering allowed return on equity, wildfire litigation damages, or rising cost of capital.',
      evidence_needed: [
        'Ongoing net earnings',
        'Regulated rate base CAGR',
        'Capital investment program',
        'Allowed return on equity',
        'Interest expense ratio'
      ],
      evidence_quality: 'Partial',
      dossier_state: 'curated_profile_batch_20',
      frontend_label: 'Curated',
      coverage_status: 'Curated',
      needs_human_review: false,
      source: 'SEC 10-K / 10-Q'
    },
    visualPhaseOne: {
      faq: {
        overview: 'Xcel Energy operates regulated electric and gas utilities, focusing on transmission grid modernization.',
        thesisRisk: 'Key risks include rate case outcomes, wildfire liability risks, and interest rate hikes on capital expenditures.'
      },
      phaseTwo: {
        thesisRisk: [
          {
            category: 'Regulatory Friction',
            risk: 'State utility commissions reject rate hikes or lower allowed returns on equity, reducing cash flows.',
            watch: 'Allowed return on equity'
          },
          {
            category: 'Wildfire Liability',
            risk: 'Utility transmission equipment is linked to wildfire starts, triggering massive civil damage claims.',
            watch: 'Ongoing net earnings'
          },
          {
            category: 'Funding Costs',
            risk: 'High interest rates increase the financing cost of the capital program, diluting return on equity.',
            watch: 'Interest expense ratio'
          }
        ]
      }
    }
  },
  XOM: {
    ticker: 'XOM',
    companyName: 'Exxon Mobil Corporation',
    exchange: 'NYSE',
    logoUrl: buildStockLogoUrl('XOM'),
    overview: 'Exxon Mobil Corporation explores, produces, refines, and markets crude oil and natural gas, and manufactures commodity and specialty chemicals globally.',
    category: 'Integrated Oil & Gas',
    analysisDate: '2026-06-12',
    latestFiscalPeriod: 'Q1 2026 ended March 31, 2026',
    dossierVerdict: 'Exxon Mobil manages global oil-equivalent production volumes, Permian and Guyana upstream expansions, capital expenditures, and shareowner cash returns.',
    valueCore: {
      ticker: 'XOM',
      value_core_type: 'business_summary_thesis_risk',
      company_stage_candidate: 'Large Integrated Energy Corporation',
      primary_value_driver: 'Growing low-cost upstream production (Guyana, Permian) and returning capital to shareowners through dividends and share repurchases.',
      thesis_break_trigger: 'Collapse in crude oil and natural gas prices, refinery margin compression, upstream production shortfalls, or capital overspending.',
      evidence_needed: [
        'Total oil-equivalent production',
        'Capital and exploration expenditures',
        'Upstream segment earnings',
        'Shareowner cash returns',
        'Guyana net production volume'
      ],
      evidence_quality: 'Partial',
      dossier_state: 'curated_profile_batch_20',
      frontend_label: 'Curated',
      coverage_status: 'Curated',
      needs_human_review: false,
      source: 'SEC 10-K / 10-Q'
    },
    visualPhaseOne: {
      faq: {
        overview: 'Exxon Mobil produces crude oil and gas, operates refining facilities, and markets petrochemical products.',
        thesisRisk: 'Key risks include oil price volatility, refining margin compression, and execution of carbon capture projects.'
      },
      phaseTwo: {
        thesisRisk: [
          {
            category: 'Commodity Volatility',
            risk: 'Oversupply in global oil markets collapses crude prices, reducing operating cash flows.',
            watch: 'Upstream segment earnings'
          },
          {
            category: 'Refining Margins',
            risk: 'Excess refining capacity or feedstock price hikes squeeze energy product downstream margins.',
            watch: 'Total oil-equivalent production'
          },
          {
            category: 'Project Execution',
            risk: 'Technical delays or partner disputes at Guyana offshore assets slow production growth.',
            watch: 'Guyana net production volume'
          }
        ]
      }
    }
  },
  XYZ: {
    ticker: 'XYZ',
    companyName: 'Block, Inc.',
    exchange: 'NYSE',
    logoUrl: buildStockLogoUrl('XYZ'),
    overview: 'Block, Inc. builds ecosystems focused on commerce and financial services, combining the Square merchant payment ecosystem, the Cash App consumer finance platform, and Afterpay installment payment integrations.',
    category: 'Fintech & Payments',
    analysisDate: '2026-06-12',
    latestFiscalPeriod: 'Q1 2026 ended March 31, 2026',
    dossierVerdict: 'Block manages gross profit expansion across Cash App and Square divisions, implements operating expense discipline through workforce streamlining, and monitors bitcoin transaction exposure.',
    valueCore: {
      ticker: 'XYZ',
      value_core_type: 'business_summary_thesis_risk',
      company_stage_candidate: 'Scaling Financial Technology Platform',
      primary_value_driver: 'Expanding gross profits in Cash App and Square merchant divisions while maintaining disciplined operating expenses.',
      thesis_break_trigger: 'Gross profit growth deceleration below 15% in Cash App, severe merchant customer churn, or costly regulatory compliance failures.',
      evidence_needed: [
        'Total gross profit growth rate',
        'Cash App segment gross profit',
        'Square segment gross profit',
        'Cash App primary banking active users',
        'Square gross payment volume'
      ],
      evidence_quality: 'Partial',
      dossier_state: 'curated_profile_batch_20',
      frontend_label: 'Curated',
      coverage_status: 'Curated',
      needs_human_review: false,
      source: 'SEC 10-K / 10-Q'
    },
    visualPhaseOne: {
      faq: {
        overview: 'Block provides digital payment processing, consumer financial services, and installment payment solutions.',
        thesisRisk: 'Key risks relate to merchant payment industry competition, consumer compliance regulations, and digital asset volatility.'
      },
      phaseTwo: {
        thesisRisk: [
          {
            category: 'Payments Competition',
            risk: 'Aggressive pricing from alternative payment processors and merchant banks reduces Square transaction margins.',
            watch: 'Square segment gross profit'
          },
          {
            category: 'Compliance Regulation',
            risk: 'Stricter federal consumer finance compliance requirements increase Cash App operating overhead and customer acquisition costs.',
            watch: 'Cash App primary banking active users'
          },
          {
            category: 'Transaction Volume',
            risk: 'Workforce reductions or customer friction from AI-driven automation tools disrupts merchant acquisition pipelines.',
            watch: 'Total gross profit growth rate'
          }
        ]
      }
    }
  },
  ZS: {
    ticker: 'ZS',
    companyName: 'Zscaler, Inc.',
    exchange: 'NASDAQ',
    logoUrl: buildStockLogoUrl('ZS'),
    overview: 'Zscaler, Inc. provides cloud-delivered security solutions, protecting users, devices, and applications in enterprise networks through its Zero Trust Exchange platform.',
    category: 'Cloud Security Software',
    analysisDate: '2026-06-12',
    latestFiscalPeriod: 'Q3 2026 ended April 30, 2026',
    dossierVerdict: 'Zscaler manages annual recurring revenue (ARR), Billings, Remaining Performance Obligations (RPO), net retention rates, and operating margins.',
    valueCore: {
      ticker: 'ZS',
      value_core_type: 'business_summary_thesis_risk',
      company_stage_candidate: 'Scaling Cloud Cybersecurity Provider',
      primary_value_driver: 'Growing enterprise subscription ARR through platform adoption (such as AI Protect) while maintaining operating cash flows.',
      thesis_break_trigger: 'Slowdown in enterprise cybersecurity software adoption, compression of subscription prices from competition, or integration issues with acquisitions.',
      evidence_needed: [
        'Annual recurring revenue',
        'Remaining performance obligations',
        'Net retention rate',
        'Non-GAAP operating margin',
        'Free cash flow margin'
      ],
      evidence_quality: 'Partial',
      dossier_state: 'curated_profile_batch_20',
      frontend_label: 'Curated',
      coverage_status: 'Curated',
      needs_human_review: false,
      source: 'SEC 10-K / 10-Q'
    },
    visualPhaseOne: {
      faq: {
        overview: 'Zscaler provides Zero Trust network access, cloud firewall, and threat protection services to enterprise customers.',
        thesisRisk: 'Key risks include cyber market price competition, sales execution challenges, and IT infrastructure capital expenditures.'
      },
      phaseTwo: {
        thesisRisk: [
          {
            category: 'Price Competition',
            risk: 'Network legacy vendors bundle firewalls at near-zero incremental prices, undercutting Zscaler pricing.',
            watch: 'Non-GAAP operating margin'
          },
          {
            category: 'Retention Headwinds',
            risk: 'Customers optimize software counts during budget sweeps, reducing seat count expansion and NRR.',
            watch: 'Net retention rate'
          },
          {
            category: 'Infrastructure Costs',
            risk: 'Capital expenditures for AI processing servers scale rapidly, depressing free cash flow margins.',
            watch: 'Free cash flow margin'
          }
        ]
      }
    }
  },
  ALAB: {
    ticker: 'ALAB',
    companyName: 'Astera Labs, Inc.',
    exchange: 'NASDAQ',
    logoUrl: buildStockLogoUrl('ALAB'),
    overview:
      'Astera Labs designs and manufactures semiconductor-based connectivity solutions for cloud and AI data center platforms, specializing in PCIe, CXL, and Ethernet technologies.',
    category: 'Cloud & AI Connectivity',
    analysisDate: '2026-06-13',
    latestFiscalPeriod: 'Q1 2026 ended 2026-03-31',
    marketSnapshot: {
      currentPrice: null,
      marketCap: null,
      enterpriseValue: 'Not verified',
      fiscalYearRevenueGuide: 'Not verified'
    },
    whyNow: {
      reason: 'Astera Labs is scaling rapidly to meet AI data center requirements for high-bandwidth connectivity and smart fabric switches.',
      verdict: 'Growth is robust with high gross margins, but the valuation multiple requires sustained near-triple-digit revenue growth and operating leverage.'
    },
    dossierVerdict: {
      sourceType: 'curated',
      asOf: '2026-06-13',
      researchState: 'post_earnings_watch',
      businessQuality: 'high',
      valuationState: 'priced_for_perfection',
      marketEvidence: 'constructive',
      finalRead: 'Hyper-growth connectivity provider with demanding valuation.',
      thesisShift: {
        from: 'neutral',
        to: 'neutral',
        confidence: 'medium',
        reason: 'Initial coverage setup.'
      },
      keySupport: [
        'Q1 revenue grew 93% year over year to $308.4 million, driven by AI connectivity demand.',
        'GAAP gross margin remained strong at 76.3% during early scaling.',
        'Initial Scorpio AI fabric switch shipments support the portfolio expansion thesis.'
      ],
      keyRisk: [
        'Valuation multiples capitalize significant forward hyper-growth.',
        'Stock-based compensation remains high and requires dilution discipline.',
        'Customer concentration remains a watch item.'
      ]
    },
    quickFacts: [
      { label: 'Business Model', value: 'Fabless Semiconductor' },
      { label: 'Key Product', value: 'Aries PCIe/CXL Retimers, Scorpio Switches' },
      { label: 'Growth Vector', value: 'AI cluster connectivity scaling' }
    ],
    marketEvidence: {
      title: 'Initial market reception is constructive post-IPO and earnings.',
      points: [
        'The stock shows strong relative strength post-IPO, supported by high-growth earnings guides.',
        'AI data center capital cycles remain supportive of connectivity components.'
      ]
    },
    valueCore: {
      ticker: 'ALAB',
      value_core_type: 'Semiconductors',
      company_stage_candidate: 'Scaling',
      primary_value_driver: 'AI cluster scaling and PCIe/CXL design wins',
      thesis_break_trigger: 'Deceleration in AI cluster buildouts or loss of market share in connectivity chips',
      evidence_needed: [
        'PCIe Gen 6 retimer market share',
        'Scorpio switch customer adoption',
        'Gross margin trends',
        'SBC dilution'
      ],
      evidence_quality: 'Curated',
      dossier_state: 'curated_profile_nasdaq_rebalance_2026_06',
      frontend_label: 'Curated',
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
          title: 'High Growth Connectivity',
          explanation: 'Q1 revenue grew 93% YoY to $308.4M, indicating leading connectivity growth.',
          evidenceState: 'Curated'
        }
      ],
      faq: {
        overview: [
          {
            question: 'What does Astera Labs do?',
            answer: 'Astera Labs provides connectivity solutions for cloud and AI data center platforms, including PCIe/CXL retimers and smart fabric switches.'
          }
        ],
        businessCore: [],
        marketEvidence: [],
        valuation: [],
        thesisRisk: [],
        financialHealth: []
      },
      phaseTwo: {
        valuation: {
          posture: {
            title: 'Premium multiples',
            label: 'Valuation posture',
            note: 'Multiples require high execution durability.'
          },
          metricCards: [
            { label: 'GAAP Gross Margin', value: '76.3%', note: 'High semiconductor margin' },
            { label: 'Revenue Growth', value: '93.0%', note: 'Q1 YoY revenue expansion' }
          ],
          tensionCards: [
            { title: 'Growth vs multiple', state: 'High expectations', text: 'Multiple remains demanding and assumes sustained near-triple-digit growth.' },
            { title: 'Peer context', state: 'Not verified', text: 'Consensus comparisons pending verification.' }
          ],
          checklist: [
            'Sustained revenue growth above 50% for multiple years',
            'FCF margins scale toward 25%-30%',
            'SBC declines as a percentage of revenue'
          ]
        },
        thesisRisk: {
          lead: 'The primary risk is multiple compression if AI cluster capital expenditures moderate.',
          riskMap: [
            { label: 'Growth deceleration', severity: 'High', watch: 'Revenue growth below 40% or customer slowdown' },
            { label: 'Customer concentration', severity: 'Medium', watch: 'Loss of major cloud customers' }
          ],
          evidenceNeeded: [
            'Scorpio switch revenue mix',
            'SBC dilution offset status'
          ]
        },
        financialHealth: {
          qualityRead: 'High revenue growth and strong gross margins, while FCF conversion is scaling but monitored alongside stock-based compensation.',
          metricCards: [
            { label: 'Revenue Growth', value: '93.0%', note: 'Q1 year-over-year growth' },
            { label: 'FCF Margin', value: '21.7%', note: 'Q1 free cash flow margin' },
            { label: 'Gross Margin', value: '76.3%', note: 'GAAP gross margin' },
            { label: 'Cash + Securities', value: '$1.18B', note: 'Cash and short term investments' },
            { label: 'Convertible Notes', value: '$0', note: 'No convertible debt' },
            { label: 'SBC / Revenue', value: '15.8%', note: 'Stock-based compensation ratio' }
          ],
          qualityCards: [
            { title: 'Scale and growth', state: 'Constructive', text: 'Q1 revenue grew 93% YoY to $308.4 million, driven by AI connectivity demand.' },
            { title: 'FCF conversion', state: 'Constructive', text: 'FCF reached $67 million, demonstrating early profitability leverage.' },
            { title: 'Dilution risk', state: 'Monitor', text: 'SBC remains material at roughly 15.8% of revenue, which needs ongoing dilution monitoring.' }
          ]
        }
      }
    }
  },
  CRWV: {
    ticker: 'CRWV',
    companyName: 'CoreWeave, Inc.',
    exchange: 'NASDAQ',
    logoUrl: buildStockLogoUrl('CRWV'),
    overview:
      'CoreWeave is a specialized cloud provider delivering GPU-accelerated computing resources for large-scale AI training, inference, and machine learning workloads.',
    category: 'GPU Cloud Infrastructure Platform',
    analysisDate: '2026-06-13',
    latestFiscalPeriod: 'Q1 2026 ended 2026-03-31',
    marketSnapshot: {
      currentPrice: null,
      marketCap: null,
      enterpriseValue: 'Not verified',
      fiscalYearRevenueGuide: '$12.0B-$13.0B'
    },
    whyNow: {
      reason: 'CoreWeave is leading the GPU-specialized neocloud buildout, adding massive backlog from hyperscale and AI-native customers.',
      verdict: 'Outstanding top-line scale and backlog of $100B, but capital expenditures are massive, leaving FCF negative with substantial debt risk.'
    },
    dossierVerdict: {
      sourceType: 'curated',
      asOf: '2026-06-13',
      researchState: 'post_earnings_watch',
      businessQuality: 'medium_high',
      valuationState: 'speculative_growth',
      marketEvidence: 'constructive',
      finalRead: 'High-leverage neocloud GPU play with massive backlog and CapEx.',
      thesisShift: {
        from: 'neutral',
        to: 'neutral',
        confidence: 'medium',
        reason: 'Initial coverage setup.'
      },
      keySupport: [
        'Q1 revenue reached $2.08B, growing 112% YoY, confirming aggressive scale.',
        'Backlog grew to nearly $100B in Q1 2026, up from $66.8B at the end of 2025.',
        'Diversified customer wins including Meta and Anthropic.'
      ],
      keyRisk: [
        'Massive capital expenditures ($7.7B in Q1) keep free cash flow negative.',
        'Carrying nearly $25 billion in total debt to finance GPU purchases.',
        'Risk of GPU supply-demand normalization over the next 24 months.'
      ]
    },
    quickFacts: [
      { label: 'Business Model', value: 'Specialized Cloud IaaS' },
      { label: 'Key Asset', value: 'NVIDIA GPU clusters (H100/H200/Blackwell)' },
      { label: 'Backlog', value: 'Nearly $100B as of Q1 2026' }
    ],
    marketEvidence: {
      title: 'Outstanding momentum ahead of Nasdaq-100 index inclusion.',
      points: [
        'Shares exhibit constructive institutional support following the March 2025 IPO.',
        'Nasdaq-100 inclusion in June 2026 acts as a passive demand catalyst.'
      ]
    },
    valueCore: {
      ticker: 'CRWV',
      value_core_type: 'Cloud Infrastructure',
      company_stage_candidate: 'Scaling',
      primary_value_driver: 'GPU backlog conversion and customer diversification',
      thesis_break_trigger: 'Customer optimization of GPU compute, or high debt servicing costs',
      evidence_needed: [
        'Quarterly backlog run-rate',
        'Debt-to-EBITDA leverage',
        'Average customer tenure',
        'CapEx buildout cadence'
      ],
      evidence_quality: 'Curated',
      dossier_state: 'curated_profile_nasdaq_rebalance_2026_06',
      frontend_label: 'Curated',
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
          title: 'Hyper Scale GPU Cloud',
          explanation: 'Guidance of $12B-$13B for FY2026 indicates rapid cloud infrastructure scale.',
          evidenceState: 'Curated'
        }
      ],
      faq: {
        overview: [
          {
            question: 'What is CoreWeave?',
            answer: 'CoreWeave is a neocloud provider specializing in GPU-accelerated infrastructure for AI, training, and inference.'
          }
        ],
        businessCore: [],
        marketEvidence: [],
        valuation: [],
        thesisRisk: [],
        financialHealth: []
      },
      phaseTwo: {
        valuation: {
          posture: {
            title: 'High leverage scaling',
            label: 'Valuation posture',
            note: 'Depends heavily on backlog conversion to EBITDA.'
          },
          metricCards: [
            { label: 'Revenue Growth', value: '112.0%', note: 'Q1 year-over-year growth' },
            { label: 'Adjusted EBITDA', value: '$1.16B', note: 'Q1 non-GAAP EBITDA' }
          ],
          tensionCards: [
            { title: 'Leverage vs growth', state: 'High debt', text: 'Total debt of $25B is being used to build out infrastructure, requiring high asset utilization.' },
            { title: 'Peer context', state: 'Not verified', text: 'Neocloud vs hyperscale valuation sets pending.' }
          ],
          checklist: [
            'EBITDA growth scales to cover capital lease costs',
            'Customer concentration continues to diversify',
            'CapEx begins to moderate relative to operating cash flows'
          ]
        },
        thesisRisk: {
          lead: 'The primary risk is credit and leverage risk if GPU utilization drops below targets.',
          riskMap: [
            { label: 'GPU oversupply', severity: 'High', watch: 'Hyperscaler internal chip adoption' },
            { label: 'Leverage stress', severity: 'High', watch: 'Debt servicing costs and covenants' }
          ],
          evidenceNeeded: [
            'Average revenue per GPU compute hour',
            'Utilization rates across datacenters'
          ]
        },
        financialHealth: {
          qualityRead: 'Stellar revenue scaling offset by massive capital expenditures for GPU clusters, resulting in high debt leverage and negative free cash flow.',
          metricCards: [
            { label: 'Revenue Growth', value: '112.0%', note: 'Q1 year-over-year growth' },
            { label: 'FCF Margin', value: 'Negative', note: 'Capital intensive buildout' },
            { label: 'Gross Margin', value: '71.7%', note: 'FY2025 gross margin proxy' },
            { label: 'Cash + Securities', value: '$2.27B', note: 'Cash and equivalents' },
            { label: 'Convertible Notes', value: 'Not verified', note: 'Substantial private/secured debt' },
            { label: 'SBC / Revenue', value: 'Not verified', note: 'Post-IPO compensation structure pending' }
          ],
          qualityCards: [
            { title: 'Scale and growth', state: 'Constructive', text: 'Q1 revenue reached $2.08B, growing 112% YoY, with FY2026 guide of $12B-$13B.' },
            { title: 'Capital intensity', state: 'Monitor', text: 'Negative free cash flow driven by massive CapEx of $7.70B in Q1 2026 alone.' },
            { title: 'Debt leverage', state: 'Monitor', text: 'Carried nearly $25 billion in total debt to finance cluster acquisitions.' }
          ]
        }
      }
    }
  },
  RKLB: {
    ticker: 'RKLB',
    companyName: 'Rocket Lab USA, Inc.',
    exchange: 'NASDAQ',
    logoUrl: buildStockLogoUrl('RKLB'),
    overview:
      'Rocket Lab provides launch services and space systems solutions, including the Electron and Neutron launch vehicles, satellite components, and orbital spacecraft platforms.',
    category: 'Space & Launch Systems',
    analysisDate: '2026-06-13',
    latestFiscalPeriod: 'Q1 2026 ended 2026-03-31',
    marketSnapshot: {
      currentPrice: null,
      marketCap: null,
      enterpriseValue: 'Not verified',
      fiscalYearRevenueGuide: 'Not verified'
    },
    whyNow: {
      reason: 'Rocket Lab is scaling launch cadence and expanding its Space Systems division, which represents a larger and higher-margin revenue mix.',
      verdict: 'Strong growth and record backlog, but FCF remains negative due to heavy Neutron R&D spend and launch capital costs.'
    },
    dossierVerdict: {
      sourceType: 'curated',
      asOf: '2026-06-13',
      researchState: 'post_earnings_watch',
      businessQuality: 'medium',
      valuationState: 'demanding',
      marketEvidence: 'constructive',
      finalRead: 'Durable commercial space player with high R&D reinvestment needs.',
      thesisShift: {
        from: 'neutral',
        to: 'neutral',
        confidence: 'medium',
        reason: 'Initial coverage setup.'
      },
      keySupport: [
        'Record Q1 revenue of $200.3 million, representing a 63.5% increase YoY.',
        'Space Systems revenue grew 57.2% YoY, accounting for 68% of total mix.',
        'Electron launch cadence remains robust, maintaining commercial launch leadership.'
      ],
      keyRisk: [
        'FCF remains negative due to heavy Neutron development investments.',
        'Launch operations carry high capital intensity and payload event risks.',
        'Backlog conversion timeline is subject to defense and commercial customer schedules.'
      ]
    },
    quickFacts: [
      { label: 'Business Model', value: 'Launch & Satellites Services' },
      { label: 'Core Products', value: 'Electron (small), Neutron (medium), Space Systems' },
      { label: 'Q1 2026 Revenue Mix', value: '68% Space Systems / 32% Launch' }
    ],
    marketEvidence: {
      title: 'Constructive relative strength backed by defense contract backlog.',
      points: [
        'The stock shows high relative strength as backlog conversion gains validation.',
        'Defense contracts provide stable demand cushion against commercial launch lumpiness.'
      ]
    },
    valueCore: {
      ticker: 'RKLB',
      value_core_type: 'Space Systems & Launch',
      company_stage_candidate: 'Scaling',
      primary_value_driver: 'Neutron development timeline and space systems contract wins',
      thesis_break_trigger: 'Neutron development delays or launch failure events',
      evidence_needed: [
        'Neutron test launch date',
        'Electron launch margin improvements',
        'Space systems backlog growth',
        'ATM share dilution rate'
      ],
      evidence_quality: 'Curated',
      dossier_state: 'curated_profile_nasdaq_rebalance_2026_06',
      frontend_label: 'Curated',
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
          title: 'Commercial Space Growth',
          explanation: 'Q1 revenue grew 63.5% YoY, led by the space systems division.',
          evidenceState: 'Curated'
        }
      ],
      faq: {
        overview: [
          {
            question: 'What does Rocket Lab do?',
            answer: 'Rocket Lab provides launch services (Electron and Neutron rockets) and designs spacecraft platforms and satellite subsystems.'
          }
        ],
        businessCore: [],
        marketEvidence: [],
        valuation: [],
        thesisRisk: [],
        financialHealth: []
      },
      phaseTwo: {
        valuation: {
          posture: {
            title: 'High R&D capitalization',
            label: 'Valuation posture',
            note: 'Value is heavily weighted toward Neutron execution.'
          },
          metricCards: [
            { label: 'Revenue Growth', value: '63.5%', note: 'Q1 year-over-year growth' },
            { label: 'GAAP Gross Margin', value: '38.2%', note: 'GAAP aerospace margins' }
          ],
          tensionCards: [
            { title: 'Reinvestment vs margin', state: 'Negative FCF', text: 'FCF is currently negative due to investments in the medium-lift Neutron rocket program.' },
            { title: 'Peer context', state: 'Not verified', text: 'Space peer multiples pending verification.' }
          ],
          checklist: [
            'Successful Neutron hot fire test and launch schedule preservation',
            'Space Systems gross margins scale above 40%',
            'Launch backlog conversion speeds up'
          ]
        },
        thesisRisk: {
          lead: 'The primary risk is launch failure and development delay for Neutron.',
          riskMap: [
            { label: 'Launch failures', severity: 'High', watch: 'Electron launch success rate' },
            { label: 'Neutron delay', severity: 'High', watch: 'First test flight target date' }
          ],
          evidenceNeeded: [
            'Space systems contract pipeline',
            'Dilution count from ATM offerings'
          ]
        },
        financialHealth: {
          qualityRead: 'Growth is driven by space systems, but launch capital requirements and Neutron development keep free cash flow negative.',
          metricCards: [
            { label: 'Revenue Growth', value: '63.5%', note: 'Q1 year-over-year growth' },
            { label: 'FCF Margin', value: 'Negative', note: 'Q1 FCF use of $77.4M' },
            { label: 'Gross Margin', value: '38.2%', note: 'GAAP gross margin' },
            { label: 'Cash + Securities', value: '$1.38B', note: 'Cash and equivalents' },
            { label: 'Convertible Notes', value: 'Not verified', note: 'Convertible debt details pending' },
            { label: 'SBC / Revenue', value: 'Not verified', note: 'Higher comp expenses noted' }
          ],
          qualityCards: [
            { title: 'Scale and growth', state: 'Constructive', text: 'Q1 revenue hit a record $200.3 million, up 63.5% YoY, led by Space Systems.' },
            { title: 'R&D investment', state: 'Monitor', text: 'FCF remains negative as capital is allocated to the next-gen Neutron rocket program.' },
            { title: 'Liquidity buffer', state: 'Constructive', text: 'Ended Q1 with $1.38B in cash/investments and over $2.0B in total liquidity.' }
          ]
        }
      }
    }
  },
  TER: {
    ticker: 'TER',
    companyName: 'Teradyne, Inc.',
    exchange: 'NASDAQ',
    logoUrl: buildStockLogoUrl('TER'),
    overview:
      'Teradyne designs and manufactures automated test equipment for semiconductors, wireless products, and electronic systems, alongside industrial robotics and cobots.',
    category: 'Semiconductor Test & Robotics',
    analysisDate: '2026-06-13',
    latestFiscalPeriod: 'Q1 2026 ended 2026-03-29',
    marketSnapshot: {
      currentPrice: null,
      marketCap: null,
      enterpriseValue: 'Not verified',
      fiscalYearRevenueGuide: 'Not verified'
    },
    whyNow: {
      reason: 'Teradyne is benefiting from a cyclical upturn in semiconductor testing demand, particularly for AI-related GPU and HBM components.',
      verdict: 'High profitability and solid cash flow generation, though performance is tied to semiconductor capital spending cycles.'
    },
    dossierVerdict: {
      sourceType: 'curated',
      asOf: '2026-06-13',
      researchState: 'post_earnings_watch',
      businessQuality: 'high',
      valuationState: 'priced_for_recovery',
      marketEvidence: 'constructive',
      finalRead: 'Quality semiconductor test player leveraged to AI testing cycles.',
      thesisShift: {
        from: 'neutral',
        to: 'neutral',
        confidence: 'medium',
        reason: 'Initial coverage setup.'
      },
      keySupport: [
        'Q1 revenue grew 87% YoY to $1.282 billion, showing strong cyclical demand.',
        'GAAP gross margin reached 60.9%, demonstrating high pricing power.',
        'Strong semiconductor testing demand driven by GPU and HBM complexity.'
      ],
      keyRisk: [
        'Semiconductor capital equipment cycles carry high volatility.',
        'Robotics division growth and margins remain a watch item.',
        'Customer concentration in chip design leaders represents a structural risk.'
      ]
    },
    quickFacts: [
      { label: 'Business Model', value: 'Hardware Equipment Sale' },
      { label: 'Core Segments', value: 'Semiconductor Test, System Test, Wireless Test, Robotics' },
      { label: 'Q1 Operating Cash Flow', value: '$265 million' }
    ],
    marketEvidence: {
      title: 'Cyclical recovery evidence is constructive with strong semiconductor demand.',
      points: [
        'Semiconductor testing demand shows strong cyclical recovery signals.',
        'Advanced chip testing complexity serves as a secular tailwind.'
      ]
    },
    valueCore: {
      ticker: 'TER',
      value_core_type: 'Semiconductor Testing & Robotics',
      company_stage_candidate: 'Mature Growth',
      primary_value_driver: 'AI chip complexity testing and robotics adoption',
      thesis_break_trigger: 'Semiconductor cap-ex downturn or robotics margin pressure',
      evidence_needed: [
        'Robotics segment growth rate',
        'Gross margin stability',
        'Advanced packaging test mix',
        'Share repurchase cadence'
      ],
      evidence_quality: 'Curated',
      dossier_state: 'curated_profile_nasdaq_rebalance_2026_06',
      frontend_label: 'Curated',
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
          title: 'Cyclical Semi Test',
          explanation: 'Q1 revenue grew 87% YoY to $1.282B, showing sharp recovery.',
          evidenceState: 'Curated'
        }
      ],
      faq: {
        overview: [
          {
            question: 'What does Teradyne test?',
            answer: 'Teradyne provides testing systems for microprocessors, logic, RF, analog, memory, and system-on-chip devices.'
          }
        ],
        businessCore: [],
        marketEvidence: [],
        valuation: [],
        thesisRisk: [],
        financialHealth: []
      },
      phaseTwo: {
        valuation: {
          posture: {
            title: 'Cyclical pricing',
            label: 'Valuation posture',
            note: 'Multiples fluctuate with semiconductor capital cycles.'
          },
          metricCards: [
            { label: 'Revenue Growth', value: '87.0%', note: 'Q1 year-over-year growth' },
            { label: 'GAAP Gross Margin', value: '60.9%', note: 'Q1 GAAP gross margin' }
          ],
          tensionCards: [
            { title: 'Cyclicality vs automation', state: 'Priced for recovery', text: 'Earning recovery is partly priced in, requiring robotics to offset semi volatility.' },
            { title: 'Peer context', state: 'Not verified', text: 'Testing equipment peers multiple set pending.' }
          ],
          checklist: [
            'Robotics growth scales to double-digits',
            'Gross margins sustain above 58%-60%',
            'Cyclical testing demand carries through to FY2027'
          ]
        },
        thesisRisk: {
          lead: 'The primary risk is cyclical deceleration in semiconductor equipment CapEx.',
          riskMap: [
            { label: 'Cyclical downturns', severity: 'High', watch: 'Major customer capital expenditure cuts' },
            { label: 'Robotics margin compression', severity: 'Medium', watch: 'Robotics pricing pressure' }
          ],
          evidenceNeeded: [
            'Advanced packaging test adoption rate',
            'Free cash flow margins'
          ]
        },
        financialHealth: {
          qualityRead: 'Strong balance sheet with cyclical cash generation and robust gross margins, supported by low debt.',
          metricCards: [
            { label: 'Revenue Growth', value: '87.0%', note: 'Q1 year-over-year growth' },
            { label: 'FCF Margin', value: 'Not verified', note: 'Capex-adjusted free cash flow not verified' },
            { label: 'Gross Margin', value: '60.9%', note: 'GAAP gross margin' },
            { label: 'Cash + Securities', value: '$241.9M', note: 'Cash and equivalents' },
            { label: 'Convertible Notes', value: '$0', note: 'No material convertible debt' },
            { label: 'SBC / Revenue', value: 'Not verified', note: 'Standard compensation equity mix' }
          ],
          qualityCards: [
            { title: 'Scale and growth', state: 'Constructive', text: 'Q1 revenue surged 87% YoY to $1.282B, driven by AI component test demand.' },
            { title: 'Cash generation', state: 'Constructive', text: 'Net cash from operating activities reached $265 million in Q1 2026.' },
            { title: 'Cyclical cushion', state: 'Constructive', text: 'Maintains strong financial flexibility to manage semiconductor capital cycles.' }
          ]
        }
      }
    }
  },
  SPCX: {
    ticker: 'SPCX',
    companyName: 'SpaceX',
    exchange: 'NASDAQ',
    logoUrl: buildStockLogoUrl('SPCX'),
    overview:
      'SpaceX designs, launches, and operates reusable rockets, spacecraft, Starlink satellite connectivity, and adjacent space-infrastructure services. The public-market story also includes optionality around AI infrastructure, X ecosystem distribution, and long-duration space platform ambitions.',
    category: 'Space / Satellite Connectivity / AI Infrastructure',
    analysisDate: '2026-06-18',
    latestFiscalPeriod: 'Public reporting history insufficient',
    marketSnapshot: {
      currentPrice: null,
      marketCap: null,
      enterpriseValue: 'Not verified',
      fiscalYearRevenueGuide: 'Not verified'
    },
    ipoProfile: {
      status: 'available',
      listingDate: '2026-06-12',
      exchange: 'NASDAQ',
      offerPrice: '$135',
      initialSharesOffered: '555,555,555',
      initialProceeds: '$75.0B',
      underwriterOptionShares: '83.3M',
      totalProceedsAfterGreenshoe: '$85.7B',
      ipoValuation: '$1.77T',
      sourceNote: 'Curated from MarketWatch IPO pricing report and WSJ greenshoe proceeds report; direct official filing not verified in this profile gate.'
    },
    whyNow: {
      reason: 'SPCX is a newly public BOSS watchlist name with live market-cap and stock-performance coverage, but still has short public trading history and no canonical earnings event ledger.',
      verdict: 'Early public-market evidence is highly attention-driven. CrowdRisk should track the company as a catalyst watch, not as a fully verified valuation case.'
    },
    dossierVerdict: {
      sourceType: 'curated',
      asOf: '2026-06-18',
      researchState: 'catalyst_watch',
      businessQuality: 'not_verified',
      valuationState: 'insufficient_data',
      marketEvidence: 'early_trading',
      finalRead: 'High-attention SpaceX exposure with thin public-market evidence.',
      thesisShift: {
        from: 'coverage_pending',
        to: 'catalyst_watch',
        confidence: 'low',
        reason: 'Initial curated profile after new-ticker onboarding.'
      },
      keySupport: [
        'SpaceX combines launch systems, Starlink connectivity, spacecraft operations, and broader space-infrastructure optionality.',
        'SPCX has live CrowdRisk market-cap, stock-performance, logo, and active-universe coverage.',
        'Post-IPO trading attention confirms high market interest, but does not by itself verify valuation support.'
      ],
      keyRisk: [
        'Public financial reporting history is still limited, so business quality and financial health remain insufficiently verified.',
        'IPO valuation embeds demanding expectations around Starlink, launch cadence, AI infrastructure, and ecosystem expansion.',
        'SPCX remains unrankable in Momentum Universe until enough OHLCV history is available.'
      ]
    },
    quickFacts: [
      { label: 'Business Model', value: 'Launch, satellite connectivity, spacecraft, and space infrastructure' },
      { label: 'IPO Date', value: '2026-06-12' },
      { label: 'IPO Offer Price', value: '$135' },
      { label: 'Initial IPO Proceeds', value: '$75.0B' },
      { label: 'Total IPO Proceeds', value: '$85.7B after greenshoe' }
    ],
    marketEvidence: {
      title: 'Early public-market evidence is dominated by IPO attention and short-history constraints.',
      points: [
        'CrowdRisk stock-performance coverage is available, but longer-period returns are not fully meaningful until more public OHLCV history accumulates.',
        'Momentum Universe intentionally classifies SPCX as not yet rankable because of insufficient OHLCV history.'
      ]
    },
    valueCore: {
      ticker: 'SPCX',
      value_core_type: 'Space Infrastructure',
      company_stage_candidate: 'New Public Listing',
      primary_value_driver: 'Starlink scale, launch cadence, reusable rocket economics, and space / AI infrastructure optionality',
      thesis_break_trigger: 'Public reporting fails to support the IPO valuation narrative, Starlink growth slows, launch execution weakens, or AI infrastructure expectations outrun verified evidence',
      evidence_needed: [
        'Public revenue and margin reporting',
        'Starlink subscriber and ARPU trend',
        'Launch cadence and reuse economics',
        'Capex intensity and free cash flow path',
        'Governance and key-person risk'
      ],
      evidence_quality: 'Curated',
      dossier_state: 'curated_profile_spcx_initial_2026_06',
      frontend_label: 'Curated',
      coverage_status: 'Curated',
      needs_human_review: false,
      source: 'stockDossierProfiles.js'
    },
    visualPhaseOne: {
      performanceGrid: {
        source: 'stock-performance-latest',
        periods: [
          { label: 'Today', value: null, note: 'Live return available from stock-performance feed' },
          { label: '1 Week', value: null, note: 'Short public history; not enough mature evidence' },
          { label: '1 Month', value: null, note: 'Short public history; not enough mature evidence' },
          { label: '3 Months', value: null, note: 'Short public history; not enough mature evidence' },
          { label: '6 Months', value: null, note: 'Short public history; not enough mature evidence' },
          { label: '1 Year', value: null, note: 'Short public history; not enough mature evidence' }
        ]
      },
      signalScreens: [
        {
          title: 'New Public Space Infrastructure Exposure',
          explanation: 'SPCX is newly public and combines launch systems, Starlink connectivity, spacecraft operations, and space / AI infrastructure optionality.',
          evidenceState: 'Curated'
        },
        {
          title: 'Short-History Momentum Constraint',
          explanation: 'SPCX is active coverage but not yet rankable in Momentum Universe because public OHLCV history is insufficient.',
          evidenceState: 'Verified'
        }
      ],
      faq: {
        overview: [
          {
            question: 'What does SpaceX do?',
            answer: 'SpaceX operates reusable rockets, spacecraft, Starlink satellite connectivity, and broader space-infrastructure services.'
          },
          {
            question: 'When did SPCX go public?',
            answer: 'SPCX began trading on Nasdaq on 2026-06-12 at an IPO offer price of $135 per share.'
          }
        ],
        businessCore: [
          {
            question: 'What evidence matters most for SPCX?',
            answer: 'The key evidence is Starlink scale, launch cadence, reusable-rocket economics, capex intensity, free cash flow path, and whether AI infrastructure optionality becomes verified operating evidence.'
          }
        ],
        marketEvidence: [
          {
            question: 'Why is SPCX not ranked in Momentum Universe yet?',
            answer: 'SPCX is active coverage but not yet rankable because public OHLCV history is still too short.'
          }
        ],
        valuation: [
          {
            question: 'Can CrowdRisk judge SPCX valuation yet?',
            answer: 'Not fully. CrowdRisk has IPO price and market-cap context, but not enough verified public financial history for a full valuation range.'
          }
        ],
        thesisRisk: [
          {
            question: 'What would weaken the SPCX thesis?',
            answer: 'The thesis weakens if public reporting fails to support the IPO valuation narrative, Starlink growth slows, launch execution weakens, or AI infrastructure expectations outrun verified evidence.'
          }
        ],
        financialHealth: [
          {
            question: 'Is SPCX financial health verified?',
            answer: 'No. CrowdRisk needs public revenue, margin, cash-flow, capex, and dilution evidence before making a financial-health judgment.'
          }
        ]
      },
      phaseTwo: {
        valuation: {
          posture: {
            title: 'Insufficient data',
            label: 'Valuation posture',
            note: 'IPO and market-cap facts are available, but full valuation support is not verified.'
          },
          metricCards: [
            { label: 'IPO Offer Price', value: '$135', note: 'IPO pricing context' },
            { label: 'Initial IPO Proceeds', value: '$75.0B', note: 'Initial offering size' },
            { label: 'Total IPO Proceeds', value: '$85.7B', note: 'After greenshoe exercise' },
            { label: 'IPO Valuation', value: '$1.77T', note: 'At IPO offer price' }
          ],
          tensionCards: [
            { title: 'Story vs evidence', state: 'Demanding expectations', text: 'The public story includes Starlink, launch systems, AI infrastructure, and ecosystem optionality, but verified public financial history is still thin.' },
            { title: 'Market cap vs valuation support', state: 'Insufficient data', text: 'Market cap is available, but CrowdRisk should not infer valuation support without public revenue, margin, and cash-flow evidence.' }
          ],
          checklist: [
            'Verified public revenue and margin reporting',
            'Starlink growth and profitability trend',
            'Launch cadence and reuse economics',
            'Capex intensity and free cash flow path'
          ]
        },
        thesisRisk: {
          lead: 'The primary risk is that market expectations run ahead of verified public-company evidence.',
          riskMap: [
            { label: 'Expectation gap', severity: 'High', watch: 'IPO valuation narrative vs public revenue, margin, and cash-flow evidence' },
            { label: 'Execution concentration', severity: 'High', watch: 'Launch cadence, Starlink execution, and key-person / governance risk' },
            { label: 'Short-history evidence', severity: 'Medium', watch: 'Insufficient OHLCV and no canonical earnings reaction rows' }
          ],
          evidenceNeeded: [
            'Public revenue and segment disclosure',
            'Starlink subscriber and ARPU metrics',
            'Capex and free cash flow trend',
            'First public earnings event ledger'
          ]
        },
        financialHealth: {
          qualityRead: 'SPCX financial health is not fully verified yet. CrowdRisk needs public revenue, margin, cash-flow, capex, debt, and dilution evidence before upgrading this read.',
          metricCards: [
            { label: 'Revenue Growth', value: 'Not verified', note: 'Public reporting history insufficient' },
            { label: 'FCF Margin', value: 'Not verified', note: 'Free cash flow evidence pending' },
            { label: 'Gross Margin', value: 'Not verified', note: 'Segment margin evidence pending' },
            { label: 'Cash + Securities', value: 'Not verified', note: 'Balance-sheet evidence pending' },
            { label: 'Convertible Notes', value: 'Not verified', note: 'Debt structure pending' },
            { label: 'SBC / Revenue', value: 'Not verified', note: 'Dilution evidence pending' }
          ],
          qualityCards: [
            { title: 'Public reporting history', state: 'Insufficient data', text: 'SPCX is newly public, so CrowdRisk should not infer financial quality from market attention alone.' },
            { title: 'Capital intensity', state: 'Monitor', text: 'Space, satellite, and AI infrastructure ambitions may require large ongoing capital spending.' },
            { title: 'Evidence gate', state: 'Pending', text: 'Financial-health confidence requires direct public reporting on revenue, margins, free cash flow, balance sheet, and dilution.' }
          ]
        }
      }
    }
  }
};

export function getStockDossierProfile(ticker) {
  return stockDossierProfiles[canonicalizeTicker(ticker)] || null;
}
