import { canonicalizeTicker } from './tickerAliases';

const DDOG_SOURCE_PACK = {
  ticker: 'DDOG',
  contractVersion: 'stock_dossier_remaining_tabs_v0.1',
  generatedAt: '2026-07-02',
  sourcePackStatus: 'partial',
  sources: [
    {
      sourceId: 'stock_performance_latest_ddog',
      sourceType: 'market_data',
      title: 'CrowdRisk stock performance latest row',
      retrievalStatus: 'live_readback',
      retrievedAt: '2026-07-02',
      frontendVisible: false
    },
    {
      sourceId: 'radar_technical_cockpit_ddog',
      sourceType: 'market_data',
      title: 'CrowdRisk radar Technical Cockpit row',
      retrievalStatus: 'live_readback',
      retrievedAt: '2026-07-02',
      frontendVisible: false
    },
    {
      sourceId: 'reference_peer_map_latest_ddog',
      sourceType: 'peer_map',
      title: 'CrowdRisk reference peer map',
      retrievalStatus: 'live_readback',
      retrievedAt: '2026-07-02',
      frontendVisible: false
    },
    {
      sourceId: 'ddog_q1_2026_ir_release_seed',
      sourceType: 'official_ir',
      title: 'Datadog Q1 2026 earnings release',
      url: 'https://investors.datadoghq.com/news-releases/news-release-details/datadog-announces-first-quarter-2026-financial-results/',
      publishedAt: '2026-05-07',
      periodEndDate: '2026-03-31',
      retrievalStatus: 'local_seed_only',
      frontendVisible: false
    },
    {
      sourceId: 'ddog_q1_2026_10q',
      sourceType: 'sec_filing',
      title: 'Datadog Q1 2026 Form 10-Q',
      retrievalStatus: 'missing_source_ref',
      frontendVisible: false
    },
    {
      sourceId: 'ddog_forward_model_assumptions',
      sourceType: 'model_assumption',
      title: 'CrowdRisk DDOG forward valuation assumptions',
      retrievalStatus: 'model_assumption',
      frontendVisible: false
    }
  ],
  missingEvidence: [
    'Official IR body still needs a retrievable primary-source copy.',
    'SEC 10-Q accession and metric-level refs still need to be attached.',
    'Current full consensus model is not attached.',
    'Peer valuation multiple source is not attached.',
    'Product-level revenue mix is not attached.'
  ],
  missingEvidence_zh: [
    '仍要補回可讀取的官方 IR 原文。',
    '仍要補回 SEC 10-Q accession 和逐項指標來源。',
    '仍未接入最新市場共識模型。',
    '仍未接入同業估值倍數來源。',
    '仍未接入產品層面收入組合。'
  ]
};

export const stockDossierContractFixtures = {
  DDOG: {
    ticker: 'DDOG',
    contractVersion: 'stock_dossier_remaining_tabs_v0.1',
    generatedAt: '2026-07-02',
    sourcePack: DDOG_SOURCE_PACK,
    businessCore: {
      headline: 'Customer expansion is the value engine.',
      headline_zh: '客戶擴張是價值引擎。',
      body: 'DDOG is a subscription observability and security platform. The key test is whether adopted customers keep expanding usage, adding products, and keeping Datadog embedded in cloud operations.',
      body_zh: 'DDOG 是訂閱制可觀測性和安全平台。核心檢查是：已採用的客戶是否繼續增加用量、採用更多產品，並把 Datadog 留在雲端營運流程內。',
      valueEngineCards: [
        {
          label: 'Revenue engine',
          label_zh: '收入引擎',
          value: 'Subscription platform revenue',
          value_zh: '訂閱制平台收入',
          note: 'Revenue is driven by land-and-expand adoption across infrastructure, APM, logs, security, and user-experience monitoring.',
          note_zh: '收入由基建、APM、日誌、安全和用戶體驗監控的 land-and-expand 採用推動。',
          tone: 'positive',
          sourceStatus: 'local_seed'
        },
        {
          label: 'Customer expansion',
          label_zh: '客戶擴張',
          value: '4,550 $100k+ ARR customers',
          value_zh: '4,550 名年收入 10 萬美元以上客戶',
          note: 'Large-customer expansion is one of the cleanest platform-value signals, but the next update should attach metric-level filing evidence.',
          note_zh: '大型客戶擴張是最直接的平台價值信號之一，但目前仍要補回逐項指標來源。',
          tone: 'positive',
          sourceStatus: 'local_seed'
        },
        {
          label: 'Platform breadth',
          label_zh: '平台廣度',
          value: 'Observability plus security workflow',
          value_zh: '可觀測性加安全流程',
          note: 'The read is stronger if customers adopt more products, not only more usage of a single module.',
          note_zh: '如果客戶採用更多產品，而不只是單一模組用量增加，業務判斷會更強。',
          tone: 'neutral',
          sourceStatus: 'local_seed'
        },
        {
          label: 'Retention durability',
          label_zh: '留存耐久度',
          value: 'Low-120%s net retention',
          value_zh: '低 120%s 淨留存率',
          note: 'Retention remains the main bridge between product value and future revenue durability.',
          note_zh: '留存率是產品價值能否轉化成未來收入韌性的主要橋樑。',
          tone: 'positive',
          sourceStatus: 'local_seed'
        }
      ],
      operatingProofCards: [
        {
          label: 'Revenue growth',
          label_zh: '收入增長',
          value: '32.0%',
          note: 'Q1 2026, period ended 2026-03-31.',
          note_zh: 'Q1 2026，截至 2026-03-31。',
          tone: 'positive',
          sourceStatus: 'local_seed'
        },
        {
          label: 'Large customers',
          label_zh: '大型客戶',
          value: '4,550 / 90% of ARR',
          note: 'Shows whether enterprise customers are becoming a larger revenue base.',
          note_zh: '用來判斷企業客戶是否成為更大的收入基礎。',
          tone: 'positive',
          sourceStatus: 'local_seed'
        },
        {
          label: 'FCF margin',
          label_zh: 'FCF 利潤率',
          value: '29.0%',
          note: 'Strong cash conversion, but still needs to be read with SBC and dilution.',
          note_zh: '現金轉化強，但仍要和 SBC 及攤薄一併閱讀。',
          tone: 'positive',
          sourceStatus: 'local_seed'
        },
        {
          label: 'RPO / cRPO',
          label_zh: 'RPO / cRPO',
          value: 'Needs updated evidence',
          value_zh: '需要補充最新證據',
          note: 'Use RPO / cRPO to test forward demand durability in the next evidence refresh.',
          note_zh: '下一次證據更新應用 RPO / cRPO 檢查未來需求韌性。',
          tone: 'neutral',
          sourceStatus: 'missing'
        }
      ],
      breakSignalCards: [
        {
          label: 'First break signal',
          label_zh: '第一破局信號',
          value: 'Retention, large-customer growth, or RPO weakens',
          value_zh: '留存、大型客戶增長或 RPO 轉弱',
          note: 'These would challenge the business engine before the headline story changes.',
          note_zh: '這些信號會比 headline 故事更早挑戰業務引擎。',
          tone: 'warning',
          sourceStatus: 'model_assumption'
        },
        {
          label: 'Shareholder cost',
          label_zh: '股東成本',
          value: 'SBC / revenue 19.6%',
          note: 'Growth needs better SBC discipline, otherwise shareholder economics weaken.',
          note_zh: '高增長要同時改善 SBC 紀律，否則股東經濟效益會被削弱。',
          tone: 'warning',
          sourceStatus: 'local_seed'
        }
      ],
      evidenceToMonitor: [
        'NRR / DBNR trend',
        '$100k+ ARR customer growth',
        'RPO / cRPO growth',
        'FCF margin',
        'SBC as percentage of revenue'
      ],
      evidenceToMonitor_zh: [
        'NRR / DBNR 趨勢',
        '年收入 10 萬美元以上客戶增長',
        'RPO / cRPO 增長',
        'FCF 利潤率',
        'SBC 佔收入比例'
      ]
    },
    valuation: {
      posture: {
        title: 'Premium assumptions need proof.',
        title_zh: '高估值假設需要證據支持。',
        label: 'Valuation posture',
        label_zh: '估值狀態',
        note: 'Current price already requires durable growth, strong cash conversion, and better dilution discipline.',
        note_zh: '現價已經要求公司維持長期增長、強現金轉化，以及更好的攤薄紀律。'
      },
      modelNotes: [
        'Forward range is a model assumption, not a formal target.',
        'Current full consensus and peer comp sources are still missing.'
      ],
      modelNotes_zh: [
        '前瞻區間是模型假設，不是正式目標價。',
        '仍未接入最新市場共識和同業估值來源。'
      ],
      metricCards: [
        { label: 'EV / FY2026 Revenue', label_zh: 'EV / FY2026 收入', value: '16.0x', note: 'Model input pending fuller evidence support.', note_zh: '目前是模型輸入，仍要補充更完整證據支持。', tone: 'warning', sourceStatus: 'model_assumption' },
        { label: 'EV / FY2026 FCF', label_zh: 'EV / FY2026 FCF', value: '55.0x', note: 'Cash-flow expectations are high.', note_zh: '市場對現金流要求很高。', tone: 'warning', sourceStatus: 'model_assumption' },
        { label: 'Rule of 40', label_zh: 'Rule of 40', value: '61', note: 'Growth plus FCF margin evidence.', note_zh: '收入增長加 FCF 利潤率證據。', tone: 'positive', sourceStatus: 'local_seed' },
        { label: 'Base case support', label_zh: '基準情境支持', value: 'Needs more evidence', value_zh: '仍要更多證據', note: 'Quality is visible; valuation still demands proof.', note_zh: '業務質素可見，但估值仍要更多證據支持。', tone: 'neutral', sourceStatus: 'mixed' }
      ],
      tensionCards: [
        {
          title: 'Growth vs multiple',
          title_zh: '增長與估值倍數',
          state: 'Needs sustained growth',
          state_zh: '需要持續高增長',
          text: 'DDOG needs revenue growth to stay above the mid-20%s while the revenue multiple remains elevated.',
          text_zh: '只要收入估值倍數仍高，DDOG 就需要把收入增長維持在中 20%s 以上。'
        },
        {
          title: 'Margin sensitivity',
          title_zh: '利潤率敏感度',
          state: 'FCF must hold',
          state_zh: 'FCF 需要守住',
          text: 'A slip below high-20%s FCF margin would make the current valuation less forgiving.',
          text_zh: '如果 FCF 利潤率跌穿高 20%s，現估值會變得更難支持。'
        },
        {
          title: 'Evidence gap',
          title_zh: '證據缺口',
          state: 'Need consensus and peer comps',
          state_zh: '仍要市場共識和同業估值',
          text: 'Current peer and consensus multiple sets are still needed before valuation confidence can rise.',
          text_zh: '仍需要最新同業和市場共識倍數，估值信心才可提高。'
        }
      ],
      checklist: [
        'Revenue growth stays above 25% for multiple years',
        'FCF margin holds near or above 30%',
        'NRR / DBNR stays around low-120%s',
        'SBC declines as a percentage of revenue',
        'RPO / cRPO supports forward revenue durability'
      ],
      checklist_zh: [
        '收入增長未來多年維持 25% 以上',
        'FCF 利潤率接近或高於 30%',
        'NRR / DBNR 維持低 120%s 左右',
        'SBC 佔收入比例下降',
        'RPO / cRPO 支持未來收入韌性'
      ]
    },
    thesisRisk: {
      lead: 'The main risk is whether platform durability keeps matching a demanding valuation read.',
      lead_zh: '主要風險是平台耐久度能否繼續配得上高估值要求。',
      riskMap: [
        { label: 'Growth deceleration', label_zh: '增長放慢', severity: 'High', severity_zh: '高', watch: 'Revenue growth below 25% or weaker RPO support.', watch_zh: '收入增長跌穿 25%，或 RPO 支持轉弱。' },
        { label: 'Margin / efficiency', label_zh: '利潤率 / 效率', severity: 'Medium', severity_zh: '中', watch: 'FCF margin below 25% or SBC staying elevated.', watch_zh: 'FCF 利潤率跌穿 25%，或 SBC 維持高位。' },
        { label: 'Platform breadth', label_zh: '平台廣度', severity: 'Medium', severity_zh: '中', watch: 'Large-customer expansion or multi-product adoption slows.', watch_zh: '大型客戶擴張或多產品採用放慢。' },
        { label: 'Market warning', label_zh: '市場警號', severity: 'Medium', severity_zh: '中', watch: 'Relative strength fades or key support breaks.', watch_zh: '相對強度轉弱，或關鍵支持位失守。' }
      ],
      evidenceNeeded: [
        'NRR / DBNR trend',
        '$100k+ ARR customer growth',
        'RPO / cRPO growth',
        'FCF margin durability',
        'SBC as percentage of revenue'
      ],
      evidenceNeeded_zh: [
        'NRR / DBNR 趨勢',
        '年收入 10 萬美元以上客戶增長',
        'RPO / cRPO 增長',
        'FCF 利潤率耐久度',
        'SBC 佔收入比例'
      ]
    },
    financialHealth: {
      qualityRead: 'Growth quality is strong only if revenue expansion, FCF margin, balance-sheet flexibility, and dilution discipline move together.',
      qualityRead_zh: '只有收入擴張、FCF 利潤率、資產負債表彈性和攤薄紀律同步配合，增長質素才算真正強。',
      metricCards: [
        { label: 'Revenue Growth', label_zh: '收入增長', value: '32.0%', note: 'Q1 year-over-year growth.', note_zh: 'Q1 按年增長。', tone: 'positive', sourceStatus: 'local_seed' },
        { label: 'FCF Margin', label_zh: 'FCF 利潤率', value: '29.0%', note: 'Strong cash conversion.', note_zh: '現金轉化強。', tone: 'positive', sourceStatus: 'local_seed' },
        { label: 'Gross Margin', label_zh: '毛利率', value: '79.0%', note: 'Software margin profile.', note_zh: '軟件利潤率特徵。', tone: 'positive', sourceStatus: 'local_seed' },
        { label: 'Cash + Securities', label_zh: '現金及證券', value: '$4.8B', note: 'Liquidity cushion.', note_zh: '流動性緩衝。', tone: 'neutral', sourceStatus: 'local_seed' },
        { label: 'Convertible Notes', label_zh: '可轉換票據', value: '$1.0B', note: 'Balance-sheet item to monitor.', note_zh: '需要監察的資產負債表項目。', tone: 'neutral', sourceStatus: 'local_seed' },
        { label: 'SBC / Revenue', label_zh: 'SBC / 收入', value: '19.6%', note: 'Dilution discipline still matters.', note_zh: '攤薄紀律仍然重要。', tone: 'warning', sourceStatus: 'local_seed' }
      ],
      qualityCards: [
        { title: 'Scale and growth', title_zh: '規模與增長', state: 'Constructive', state_zh: '正面', text: 'Revenue crossed the $1B quarterly run-rate threshold while growth remained above 30%.', text_zh: '季度收入年化已超過 10 億美元，同時增長仍高於 30%。' },
        { title: 'Cash generation', title_zh: '現金生成能力', state: 'Strong, but not complete', state_zh: '強，但未完整', text: 'FCF margin is strong, but the read should stay paired with SBC and reinvestment evidence.', text_zh: 'FCF 利潤率強，但仍要和 SBC 及再投資證據一起看。' },
        { title: 'Shareholder economics', title_zh: '股東經濟效益', state: 'Monitor dilution', state_zh: '監察攤薄', text: 'The question is whether growth increasingly accrues to shareholders after SBC.', text_zh: '關鍵是扣除 SBC 後，增長是否愈來愈能轉化為股東價值。' }
      ]
    }
  }
};

export function getStockDossierContractFixture(ticker) {
  const normalizedTicker = canonicalizeTicker(ticker);
  return normalizedTicker ? stockDossierContractFixtures[normalizedTicker] || null : null;
}
