import { getTickerLookupKeys } from './tickerAliases';
import { getStockDossierContractFixture } from './stockDossierContractFixtures';

const localizedValue = (record, key, locale = 'en') => {
  if (!record) return '';
  if (locale === 'zh' && record[`${key}_zh`] !== undefined) return record[`${key}_zh`];
  return record[key] !== undefined ? record[key] : '';
};

const localizedArray = (record, key, locale = 'en') => {
  const value = localizedValue(record, key, locale);
  return Array.isArray(value) ? value.filter(Boolean) : [];
};

const cleanFrontendCard = (card = {}) => {
  const {
    sourceStatus,
    sourceRef,
    sourceId,
    sourceType,
    confidence,
    retrievalStatus,
    frontendVisible,
    ...visibleCard
  } = card;
  return visibleCard;
};

const localizeCard = (card, fields, locale = 'en') => {
  const visibleCard = cleanFrontendCard(card);
  return fields.reduce((nextCard, field) => {
    const localized = localizedValue(card, field, locale);
    if (localized !== '') nextCard[field] = localized;
    return nextCard;
  }, { ...visibleCard });
};

const localizeCards = (cards = [], fields = ['label', 'value', 'note'], locale = 'en') => (
  Array.isArray(cards)
    ? cards.map((card) => localizeCard(card, fields, locale)).filter(Boolean)
    : []
);

const formatMoney = (value) => {
  const numericValue = Number(value);
  if (!Number.isFinite(numericValue)) return null;
  return `$${numericValue.toFixed(numericValue >= 100 ? 2 : 2)}`;
};

const formatLargeMoney = (value) => {
  const numericValue = Number(value);
  if (!Number.isFinite(numericValue)) return null;
  if (Math.abs(numericValue) >= 1_000_000_000_000) return `$${(numericValue / 1_000_000_000_000).toFixed(1)}T`;
  if (Math.abs(numericValue) >= 1_000_000_000) return `$${(numericValue / 1_000_000_000).toFixed(1)}B`;
  if (Math.abs(numericValue) >= 1_000_000) return `$${(numericValue / 1_000_000).toFixed(1)}M`;
  return `$${numericValue.toLocaleString()}`;
};

const findStockPerformanceRow = (payload, ticker) => {
  if (!payload || !ticker) return null;
  const lookupKeys = getTickerLookupKeys(ticker);
  const rows = Array.isArray(payload) ? payload : [
    ...(Array.isArray(payload?.rows) ? payload.rows : []),
    ...(Array.isArray(payload?.data) ? payload.data : []),
    ...(Array.isArray(payload?.items) ? payload.items : [])
  ];
  return rows.find((row) => lookupKeys.includes(String(row?.ticker || row?.symbol || '').toUpperCase())) || null;
};

const findFixtureCard = (cards = [], label) => (
  cards.find((card) => String(card?.label || '').toLowerCase() === String(label || '').toLowerCase()) || null
);

const modelText = (en, zh, locale) => (locale === 'zh' ? zh : en);

export function buildBusinessCoreModel(fixture, locale = 'en') {
  const businessCore = fixture?.businessCore || {};
  return {
    headline: localizedValue(businessCore, 'headline', locale),
    body: localizedValue(businessCore, 'body', locale),
    valueEngineCards: localizeCards(businessCore.valueEngineCards, ['label', 'value', 'note'], locale),
    operatingProofCards: localizeCards(businessCore.operatingProofCards, ['label', 'value', 'note'], locale),
    breakSignalCards: localizeCards(businessCore.breakSignalCards, ['label', 'value', 'note'], locale),
    evidenceToMonitor: localizedArray(businessCore, 'evidenceToMonitor', locale)
  };
}

export function buildValuationModel(fixture, context = {}, locale = 'en') {
  const valuation = fixture?.valuation || {};
  const metricCards = localizeCards(valuation.metricCards, ['label', 'value', 'note'], locale);
  const revenueMultiple = findFixtureCard(metricCards, 'EV / FY2026 Revenue');
  const fcfMultiple = findFixtureCard(metricCards, 'EV / FY2026 FCF');
  const ruleOf40 = findFixtureCard(metricCards, 'Rule of 40');
  const baseCase = findFixtureCard(metricCards, 'Base case support');

  return {
    posture: valuation.posture ? localizeCard(valuation.posture, ['title', 'label', 'note'], locale) : null,
    metricCards,
    tensionCards: localizeCards(valuation.tensionCards, ['title', 'state', 'text'], locale),
    checklist: localizedArray(valuation, 'checklist', locale),
    workbenchCards: [
      {
        label: modelText('Current price', '現價', locale),
        value: context.livePrice || context.marketSnapshot?.currentPrice || '—',
        note: modelText('Read price beside required growth and margin assumptions.', '現價要和市場要求的增長及利潤率一起看。', locale),
        tone: 'neutral'
      },
      {
        label: modelText('Market cap', '市值', locale),
        value: context.liveMarketCap || context.marketSnapshot?.marketCap || '—',
        note: modelText('Premium market value needs durable execution evidence.', '高市值需要持續執行證據支持。', locale),
        tone: 'neutral'
      },
      {
        label: revenueMultiple?.label || modelText('Revenue multiple', '收入倍數', locale),
        value: revenueMultiple?.value || '16.0x',
        note: revenueMultiple?.note || modelText('Shows how much growth the market is paying for.', '反映市場願意為增長付出多少倍數。', locale),
        tone: 'warning'
      },
      {
        label: fcfMultiple?.label || modelText('Cash-flow multiple', '現金流倍數', locale),
        value: fcfMultiple?.value || '55.0x',
        note: fcfMultiple?.note || modelText('High cash-flow multiple leaves little room for execution miss.', '高現金流倍數容錯空間較低。', locale),
        tone: 'warning'
      }
    ],
    depthCards: [
      {
        label: modelText('What is priced in?', '市場已定價甚麼？', locale),
        value: modelText('Durable high growth', '長期高增長', locale),
        note: localizedValue(valuation.posture, 'note', locale) || modelText('The multiple assumes DDOG can keep compounding revenue and cash flow.', '估值假設 DDOG 可以持續複合收入和現金流。', locale),
        tone: 'warning'
      },
      {
        label: modelText('Growth requirement', '增長要求', locale),
        value: ruleOf40?.value || '61',
        note: ruleOf40?.note || modelText('Rule of 40 keeps the valuation debate tied to growth plus margin.', 'Rule of 40 用來把估值討論連回增長和利潤率。', locale),
        tone: 'positive'
      },
      {
        label: modelText('Margin requirement', '利潤率要求', locale),
        value: '29.0%',
        note: modelText('High valuation requires FCF margin to stay strong while growth remains high.', '高估值要求 FCF 利潤率在高增長下仍然企穩。', locale),
        tone: 'positive'
      }
    ],
    watchCards: [
      {
        label: modelText('Margin of safety', '安全邊際', locale),
        value: baseCase?.value || modelText('Thin', '偏薄', locale),
        note: baseCase?.note || modelText('If evidence weakens, valuation risk rises quickly.', '一旦證據轉弱，估值風險會快速上升。', locale)
      },
      {
        label: modelText('Evidence to add', '要補的證據', locale),
        value: localizedArray(valuation, 'checklist', locale).slice(0, 2).join(' / ') || '—',
        note: modelText('Next update should attach current consensus and peer multiple evidence.', '下一次更新要接入最新共識和同業倍數證據。', locale)
      }
    ]
  };
}

export function buildThesisRiskModel(fixture, context = {}, locale = 'en') {
  const thesisRisk = fixture?.thesisRisk || {};
  const riskMap = localizeCards(thesisRisk.riskMap, ['label', 'severity', 'watch'], locale);
  const evidenceNeeded = localizedArray(thesisRisk, 'evidenceNeeded', locale);
  const marketWarning = context.technicalCockpit?.snapshot?.range52w
    ? modelText('Watch whether price loses leadership versus the market.', '留意股價相對大市是否失去領先。', locale)
    : modelText('Add price and relative-strength evidence before over-reading the signal.', '要補價格和相對強度證據，避免過度解讀。', locale);

  return {
    lead: localizedValue(thesisRisk, 'lead', locale),
    riskMap,
    evidenceNeeded,
    assumptionCards: [
      {
        label: modelText('Core assumption', '核心假設', locale),
        value: modelText('Expansion remains durable', '擴張仍然持久', locale),
        note: modelText('Large-customer growth, retention, and product adoption must continue together.', '大客戶增長、留存和產品採用要同步延續。', locale),
        tone: 'positive'
      },
      {
        label: modelText('First break point', '第一破局點', locale),
        value: riskMap[0]?.label || modelText('Growth deceleration', '增長放慢', locale),
        note: riskMap[0]?.watch || modelText('Revisit the thesis if top-line durability starts to fade.', '如果收入耐久度轉弱，就要重審論點。', locale),
        tone: 'warning'
      },
      {
        label: modelText('Market warning', '市場警號', locale),
        value: modelText('Momentum break', '動能轉弱', locale),
        note: marketWarning,
        tone: 'warning'
      }
    ],
    evidenceCards: [
      {
        label: modelText('Needs to keep working', '要繼續成立', locale),
        value: evidenceNeeded.slice(0, 2).join(' / ') || modelText('Customer expansion', '客戶擴張', locale),
        note: modelText('These are the first evidence lines to refresh after each quarter.', '每季更新要先刷新這些證據線。', locale)
      },
      {
        label: modelText('To reduce risk', '要降低風險', locale),
        value: evidenceNeeded.slice(2, 4).join(' / ') || modelText('FCF and SBC evidence', 'FCF 和 SBC 證據', locale),
        note: modelText('The risk read improves only when growth quality and shareholder economics both hold.', '只有增長質素和股東經濟效益同時企穩，風險讀法才改善。', locale)
      }
    ],
    triggerGroups: [
      {
        label: modelText('Business break', '業務破局', locale),
        value: riskMap[0]?.label || modelText('Growth durability', '增長耐久度', locale),
        note: riskMap[0]?.watch || modelText('Growth or retention deterioration would weaken the core thesis.', '增長或留存轉弱會削弱核心論點。', locale),
        tone: 'warning'
      },
      {
        label: modelText('Valuation break', '估值破局', locale),
        value: riskMap[1]?.label || modelText('Margin durability', '利潤率耐久度', locale),
        note: riskMap[1]?.watch || modelText('Margins must support the premium multiple.', '利潤率需要支持高估值倍數。', locale),
        tone: 'warning'
      },
      {
        label: modelText('Market break', '市場破局', locale),
        value: riskMap[3]?.label || modelText('Price confirmation', '價格確認', locale),
        note: riskMap[3]?.watch || marketWarning,
        tone: 'neutral'
      }
    ]
  };
}

export function buildFinancialHealthModel(fixture, locale = 'en') {
  const financialHealth = fixture?.financialHealth || {};
  const metricCards = localizeCards(financialHealth.metricCards, ['label', 'value', 'note'], locale);
  const qualityCards = localizeCards(financialHealth.qualityCards, ['title', 'state', 'text'], locale);
  const revenueGrowth = findFixtureCard(metricCards, 'Revenue Growth');
  const fcfMargin = findFixtureCard(metricCards, 'FCF Margin');
  const cash = findFixtureCard(metricCards, 'Cash + Securities');
  const sbc = findFixtureCard(metricCards, 'SBC / Revenue');

  return {
    qualityRead: localizedValue(financialHealth, 'qualityRead', locale),
    metricCards,
    qualityCards,
    dashboardCards: [
      {
        label: revenueGrowth?.label || modelText('Growth', '增長', locale),
        value: revenueGrowth?.value || '32.0%',
        note: revenueGrowth?.note || modelText('Revenue expansion remains the first quality check.', '收入擴張仍是第一個質素檢查。', locale),
        tone: 'positive'
      },
      {
        label: fcfMargin?.label || modelText('Cash conversion', '現金轉化', locale),
        value: fcfMargin?.value || '29.0%',
        note: fcfMargin?.note || modelText('Cash flow must support the growth story.', '現金流要支持增長故事。', locale),
        tone: 'positive'
      },
      {
        label: cash?.label || modelText('Balance sheet', '資產負債表', locale),
        value: cash?.value || '$4.8B',
        note: cash?.note || modelText('Liquidity gives flexibility through cycles.', '流動性提供穿越周期的彈性。', locale),
        tone: 'neutral'
      },
      {
        label: sbc?.label || modelText('Shareholder cost', '股東成本', locale),
        value: sbc?.value || '19.6%',
        note: sbc?.note || modelText('SBC determines how much growth accrues to shareholders.', 'SBC 決定增長有多少真正歸股東。', locale),
        tone: 'warning'
      }
    ],
    depthCards: [
      {
        label: modelText('Growth quality', '增長質素', locale),
        value: revenueGrowth?.value || '32.0%',
        note: modelText('Growth matters only if it remains durable and efficient.', '增長只有在持久和有效率時才有質素。', locale),
        tone: 'positive'
      },
      {
        label: modelText('Cash conversion', '現金流轉化', locale),
        value: fcfMargin?.value || '29.0%',
        note: modelText('Premium software multiples need strong cash conversion.', '高估值軟件公司需要強現金轉化。', locale),
        tone: 'positive'
      },
      {
        label: modelText('Shareholder dilution', '股東攤薄', locale),
        value: sbc?.value || '19.6%',
        note: modelText('High SBC can dilute the value of revenue growth.', '高 SBC 會攤薄收入增長對股東的價值。', locale),
        tone: 'warning'
      },
      {
        label: modelText('Balance sheet', '資產負債表', locale),
        value: cash?.value || '$4.8B',
        note: modelText('Cash and debt define downside flexibility.', '現金和負債決定下行彈性。', locale),
        tone: 'neutral'
      }
    ],
    watchCards: [
      {
        label: modelText('Quality read', '質素結論', locale),
        value: localizedValue(financialHealth, 'qualityRead', locale),
        note: modelText('Use growth, margin, cash, and SBC together.', '要把增長、利潤率、現金和 SBC 一起看。', locale)
      },
      {
        label: modelText('Next evidence to check', '下一步要看', locale),
        value: metricCards.slice(0, 4).map((card) => card.label).join(' / '),
        note: modelText('Refresh these metrics first in the next source update.', '下一次來源更新要先刷新這些指標。', locale)
      }
    ]
  };
}

export function resolveStockDossierContractModel({
  ticker,
  locale = 'en',
  stockPerformancePayload,
  technicalCockpit,
  marketSnapshot
} = {}) {
  const fixture = getStockDossierContractFixture(ticker);
  if (!fixture) return null;

  const stockPerformanceRow = findStockPerformanceRow(stockPerformancePayload, ticker);
  const livePrice = formatMoney(
    stockPerformanceRow?.price
      ?? stockPerformanceRow?.close
      ?? stockPerformanceRow?.latest_price
      ?? stockPerformanceRow?.market_snapshot?.price
  );
  const liveMarketCap = formatLargeMoney(
    stockPerformanceRow?.capitalization?.market_cap
      ?? stockPerformanceRow?.market_cap
      ?? stockPerformanceRow?.market_snapshot?.market_cap
  );

  return {
    ticker: fixture.ticker,
    contractVersion: fixture.contractVersion,
    businessCore: buildBusinessCoreModel(fixture, locale),
    valuation: buildValuationModel(fixture, { livePrice, liveMarketCap, marketSnapshot }, locale),
    thesisRisk: buildThesisRiskModel(fixture, { technicalCockpit }, locale),
    financialHealth: buildFinancialHealthModel(fixture, locale)
  };
}
