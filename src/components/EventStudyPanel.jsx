import React, { useEffect, useMemo, useState, useCallback } from 'react';
import { Search, Crosshair, BarChart3, Clock, Database, Scale, ShieldAlert, Layers3, Lightbulb } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { canonicalizeTicker, getTickerLookupKeys } from '../data/tickerAliases.js';

const API_BASE = (import.meta.env.VITE_KW_TERMINAL_API_BASE || 'https://kw-terminal-api.myfootballplaces.workers.dev').replace(/\/$/, '');

function formatPercent(value, digits = 2, withSign = false) {
  if (value === undefined || value === null || value === '') return '—';
  const numeric = Number(value);
  if (Number.isNaN(numeric)) return '—';
  const prefix = withSign && numeric > 0 ? '+' : '';
  return `${prefix}${numeric.toFixed(digits)}%`;
}

function formatCount(value, locale = 'en') {
  if (value === undefined || value === null || value === '') return '—';
  const numeric = Number(value);
  if (Number.isNaN(numeric)) return '—';
  return locale === 'zh' ? `${numeric} 個季度` : `${numeric}`;
}

function formatMeasuredCount(value, locale = 'en') {
  if (value === undefined || value === null || value === '') return '—';
  const numeric = Number(value);
  if (Number.isNaN(numeric)) return '—';
  return locale === 'zh' ? `${numeric} 個季度` : `${numeric} measured`;
}

function formatDecimal(value, digits = 2) {
  if (value === undefined || value === null || value === '') return '—';
  const numeric = Number(value);
  if (Number.isNaN(numeric)) return '—';
  return numeric.toFixed(digits);
}

function firstDefined(...values) {
  return values.find((value) => value !== undefined && value !== null && value !== '');
}

function extractEstimate(row) {
  return firstDefined(
    row?.eps_estimate,
    row?.estimate_eps,
    row?.estimated_eps,
    row?.epsEstimate,
    row?.eps_est,
    row?.est_eps,
    row?.est
  );
}

function extractActual(row) {
  return firstDefined(
    row?.reported_eps,
    row?.actual_eps,
    row?.eps_actual,
    row?.epsActual,
    row?.act_eps,
    row?.act
  );
}

function extractSurprise(row) {
  return firstDefined(
    row?.surprise_percent,
    row?.surprise_pct,
    row?.surprisePercent,
    row?.surprisePct,
    row?.surprise
  );
}

function ratioToPercent(value) {
  if (value === undefined || value === null || value === '') return null;
  const numeric = Number(value);
  return Number.isFinite(numeric) ? numeric * 100 : null;
}

function averagePercent(rows, field) {
  const values = rows
    .map((row) => ratioToPercent(row?.[field]))
    .filter((value) => value !== null);
  if (!values.length) return null;
  return values.reduce((sum, value) => sum + value, 0) / values.length;
}

const MARKET_DATA_EXCLUSION_REASONS = new Set([
  'FUTURE_EVENT',
  'MISSING_REACTION_DAY',
  'MISSING_PREVIOUS_CLOSE',
  'MISSING_REACTION_OPEN',
  'MISSING_REACTION_CLOSE'
]);

const DEFAULT_SAMPLE_FILTER = {
  mode: 'max',
  customStart: '',
  customEnd: ''
};

const SAMPLE_FILTER_OPTIONS = [
  { value: '1y', label: '1Y', years: 1 },
  { value: '3y', label: '3Y', years: 3 },
  { value: '5y', label: '5Y', years: 5 },
  { value: 'max', label: 'Max' },
  { value: 'custom', label: 'Custom' }
];

const EVENT_STUDY_COPY = {
  en: {
    panelTitle: 'Earnings Reaction Study Matrix',
    tickerLabel: 'Ticker',
    tickerPlaceholder: 'e.g. NVDA, SPY',
    categoryLabel: 'Category',
    categoryAria: 'Event study category',
    categoryValue: 'Earnings',
    unavailableError: 'Event study summary unavailable',
    submitIdle: 'Run study',
    submitLoading: 'Running...',
    pillars: [
      {
        eyebrow: '1. Edge',
        title: 'Start with verified reaction samples',
        body: 'Use only reaction-day aligned gap and forward-return data.'
      },
      {
        eyebrow: '2. Crowding',
        title: 'Then check whether pre-event run-up is stretched',
        body: 'A stronger pre-5 run-up raises the risk that good news is already priced in.'
      },
      {
        eyebrow: '3. Risk',
        title: 'Size the trade from gap and intraday risk',
        body: 'Gap return and same-day open-to-close movement drive position sizing, not direction alone.'
      }
    ],
    linkedObject: 'Linked research object',
    openStockDossier: 'Open Stock Dossier',
    longPayoff: 'Long Payoff',
    shortPayoff: 'Short Payoff',
    positionSizing: 'Position Sizing',
    baseRateSuffix: 'base rate',
    avgGapDownSuffix: 'avg gap down',
    preEventRunupSuffix: 'pre-event run-up',
    gapUpRate: 'Gap-up rate',
    legacyWinRate: 'Legacy +10D win rate',
    avgGapDown: 'Avg Gap Down',
    pre5Runup: 'Pre -5D run-up',
    sameDayOc: 'Same-day O/C',
    legacyVolatility: 'Legacy +1D volatility',
    maxDrawdown5d: '5D max drawdown',
    validSample: 'Valid sample',
    reactionDayFootnote: 'based on verified reaction day',
    legacyFootnote: 'older calculation path',
    nullGapDownFootnote: 'null means no measured gap-down rows',
    priceInFootnote: 'higher values need a price-in check',
    reactionOpenCloseFootnote: 'reaction open to close',
    stopFootnote: 'used to define stops and risk budget',
    lowSampleFootnote: 'reduce confidence below 8 events',
    historicalEvidence: 'Historical Evidence',
    whyThisMatters: 'Why This Matters',
    baseRate: 'Base Rate',
    averageGapUp: 'Average Gap Up',
    crowding: 'Crowding',
    riskBudget: 'Risk Budget',
    truthCoverage: 'Truth Coverage',
    measured: 'measured',
    latestEarningsSnapshot: 'Latest Earnings Snapshot',
    noValue: 'n/a',
    surprise: 'Surprise',
    sampleLabel: 'Sample',
    sampleWindowAria: 'Historical evidence sample window',
    customSampleStartAria: 'Custom sample start date',
    customSampleEndAria: 'Custom sample end date',
    maxFilter: 'Max',
    customFilter: 'Custom',
    gap: 'Gap',
    gapColumn: 'Gap (%)',
    baseRateBodyTruth: 'First check whether verified reactions consistently gap up. Without a sample, do not force a directional conclusion.',
    baseRateBodyLegacy: 'First check whether this event type has a historical edge. Without edge, do not force a directional conclusion.',
    averageGapUpBodyTruth: 'Gap return uses reaction open divided by previous close, not release-date guessing.',
    averageGapUpBodyLegacy: 'The larger the run-up, the more you need to separate healthy positioning from sell-the-news risk.',
    riskBudgetBodyTruth: 'Same-day open-to-close movement shows reaction-day intraday risk and should be separated from gap risk.',
    riskBudgetBodyLegacy: 'High volatility means position sizing matters more than forcing a direction.',
    snapshotFallback: 'The frontend can display EST / ACT / Surprise when the backend provides those fields.',
    tradeSetupTitle: 'Trade Setup Matrix',
    tradeSetupBadge: 'Cross-Sectional Edge',
    primaryBucket: 'Primary Bucket',
    singleFactor: 'Single Factor',
    crossSetup: 'Cross Setup',
    sampleCount: 'Sample',
    winRate: 'Win rate',
    legacyPlus10: 'Legacy +10D',
    legacyPlus1: 'Legacy +1D',
    legacyPlus1Volatility: 'Legacy +1D volatility',
    maxDrawdown5dShort: 'Max DD 5D',
    highRunup: 'High Run-up',
    weakSurprise: 'Weak Surprise',
    highSurprise: 'High Surprise',
    positiveSurprise: 'Positive Surprise',
    negativeSurprise: 'Negative Surprise',
    lowRunup: 'Low Run-up',
    highSurpriseLowRunup: 'High Surprise + Low Run-up',
    highRunupWeakNegativeSurprise: 'High Run-up + Weak/Negative Surprise',
    veryLowSample: 'Very Low Sample',
    lowSampleBadge: 'Low Sample',
    auditTitleTruth: 'Earnings Reaction Truth Audit',
    auditTitleLegacy: 'Legacy Historical Matrix',
    releaseDate: 'Release Date',
    reactionDay: 'Reaction Day',
    sameDayOcColumn: 'Same-day O/C (%)',
    status: 'Status',
    releaseReaction: 'Release / Reaction',
    result: 'Result',
    preEarningsRunup: 'Pre-Earnings Run-up',
    postReactionDrift: 'Post-Reaction Drift',
    eventDate: 'Event Date',
    sentiment: 'Sentiment',
    sentimentGapUp: 'Gap Up',
    sentimentGapDown: 'Gap Down',
    sentimentPending: 'Pending',
    sentimentBeat: 'Beat',
    sentimentMiss: 'Miss',
    sentimentInline: 'Inline',
    ready: 'Ready',
    pending: 'Pending',
    pendingData: 'Pending data',
    excluded: 'Excluded',
    readyDetail: 'Reaction price data available.',
    pendingDetail: 'Previous close, reaction open, or reaction close is not available yet.',
    issueSingular: 'issue',
    issuePlural: 'issues',
    to: 'to',
    decisionTruthTitle: 'Reaction-day aligned earnings response',
    decisionTruthSummary: 'This page uses verified earnings timing and reaction-day prices instead of estimating reaction day from older date offsets.',
    confidenceMedium: 'Medium confidence',
    confidenceLow: 'Low confidence',
    confidencePending: 'Pending data',
    riskHighVolatility: 'High volatility',
    riskMediumVolatility: 'Medium volatility',
    riskLowSample: 'Low sample',
    noVerifiedRows: 'No statistically usable verified reaction rows yet',
    legacyDecisionBalancedTitle: 'Two-sided wait for pricing mismatch',
    legacyDecisionBalancedSummary: 'This event sample is better for comparing long and short payoff than assuming one fixed direction.',
    legacyDecisionExpansionTitle: 'Continuation bias, but compare short payoff first',
    legacyDecisionExpansionSummary: 'The historical base rate is positive. Treat it as a long baseline, then check crowding and event-day volatility for short payoff.',
    legacyDecisionCompressionTitle: 'Fade risk rises, but keep a squeeze scenario',
    legacyDecisionCompressionSummary: 'Pre-event crowding and post-event volatility are elevated, strengthening the fade setup. If market expectations are too low, short squeeze risk remains.',
    confidenceHigh: 'High confidence',
    riskHigh: 'High risk',
    riskMedium: 'Medium risk',
    riskLow: 'Low risk',
    flagLowSample: 'Small sample; conclusion is directional only.',
    flagHighRunup: 'Pre-event run-up is elevated; avoid chasing.',
    flagHighVolatility: 'Event-day volatility is high; reduce position size.',
    flagDeepDrawdown: 'Historical max drawdown is deep; define stop first.',
    flagWeakWinRate: 'Win-rate edge is unclear; rely on price and risk control.',
    legacyLongStrong: 'Historical win rate and run-up structure are friendlier for long setups, preferably after an event-window pullback.',
    legacyLongMedium: 'Long still has base-rate support, but needs a better entry instead of chasing the win rate.',
    legacyLongWeak: 'Long lacks a clear statistical edge. Use it only if price is washed out or expectations are too low.',
    legacyShortVolatile: 'Crowding and volatility raise short payoff, especially for sell-the-news or reflexive fade setups.',
    legacyShortWeakWinRate: 'History is more favorable to short setups, but watch post-event squeeze risk.',
    legacyShortWeak: 'Short has no natural edge unless pre-event crowding or options pricing is stretched.',
    legacySizingHighRisk: 'Event risk is high. Use smaller size, split entries and exits, and avoid one-shot sizing.',
    legacySizingMediumRisk: 'Tradable, but position size should be below normal and event-day failure conditions should be defined first.',
    legacySizingLowRisk: 'Volatility and drawdown are manageable. Focus on entry quality and payoff ratio.',
    longPayoffSupportive: 'Verified quarters lean toward gap-up reactions, but confidence should improve as backfill expands.',
    longPayoffWeak: 'The verified gap-up rate is not strong enough on its own. Pair this with fundamentals and valuation.',
    shortPayoffSupportive: 'Gap-down or failed reactions are elevated. Check for high expectations or sell-the-news risk.',
    shortPayoffWeak: 'There is not enough verified gap-down evidence to justify a standalone short thesis.',
    sizingText: (avgGapUp, sameDayOc) => `Average reaction gap up ${avgGapUp}; same-day open-to-close ${sameDayOc}. Size around gap risk instead of old date-offset assumptions.`
  },
  zh: {
    panelTitle: '財報反應回測',
    tickerLabel: '股票代號',
    tickerPlaceholder: '例如 MU、NVDA、SPY',
    categoryLabel: '事件分類',
    categoryAria: '事件研究分類',
    categoryValue: '財報',
    unavailableError: '事件研究摘要暫時無法取得',
    submitIdle: '執行回測',
    submitLoading: '回測中...',
    pillars: [
      {
        eyebrow: '1. 優勢',
        title: '先看核實樣本',
        body: '只採用已對齊反應日的財報樣本，避免用錯公布日。'
      },
      {
        eyebrow: '2. 擁擠度',
        title: '再看事件前升幅是否過熱',
        body: 'Pre-5 升幅越高，越要懷疑好消息是否已被提前定價。'
      },
      {
        eyebrow: '3. 風險',
        title: '最後用高低開與即日波幅決定倉位',
        body: '反應日高低開與開收表現，決定倉位大小，不只是方向判斷。'
      }
    ],
    linkedObject: '連結研究對象',
    openStockDossier: '打開股票檔案',
    longPayoff: '做多勝算',
    shortPayoff: '做空勝算',
    positionSizing: '倉位風險',
    baseRateSuffix: '向上機率',
    avgGapDownSuffix: '平均低開',
    preEventRunupSuffix: '事件前升幅',
    gapUpRate: '高開機率',
    legacyWinRate: '舊版 +10D 勝率',
    avgGapDown: '平均低開',
    pre5Runup: 'Pre -5D 升幅',
    sameDayOc: '即日開收',
    legacyVolatility: '舊版 +1D 波動',
    maxDrawdown5d: '5D 最大回撤',
    validSample: '核實樣本',
    reactionDayFootnote: '按核實反應日計算',
    legacyFootnote: '舊版計算口徑',
    nullGapDownFootnote: '空值代表沒有可統計的低開樣本',
    priceInFootnote: '越高越要檢查是否已被定價',
    reactionOpenCloseFootnote: '反應日開市至收市',
    stopFootnote: '用來定義止損與風險預算',
    lowSampleFootnote: '少於 8 次時要降低信任度',
    historicalEvidence: '歷史樣本',
    whyThisMatters: '為何重要',
    baseRate: '向上機率',
    averageGapUp: '平均高開',
    crowding: '擁擠度',
    riskBudget: '即日波幅',
    truthCoverage: '核實樣本',
    measured: '已核實反應',
    latestEarningsSnapshot: '最新財報快照',
    noValue: '不適用',
    surprise: '驚喜幅度',
    sampleLabel: '統計範圍',
    sampleWindowAria: '歷史樣本統計範圍',
    customSampleStartAria: '自訂樣本開始日期',
    customSampleEndAria: '自訂樣本結束日期',
    maxFilter: '全部',
    customFilter: '自訂',
    gap: '開市跳空',
    gapColumn: '開市跳空 (%)',
    baseRateBodyTruth: '先判斷核實反應是否經常高開。樣本不足時，不應硬推方向。',
    baseRateBodyLegacy: '先判斷這類事件過去是否有優勢。沒有優勢，就不要急著討論方向。',
    averageGapUpBodyTruth: '高開幅度用反應日開市價對上一日收市價計算，不用公布日猜測。',
    averageGapUpBodyLegacy: '事件前升幅越大，越要分清健康部署與利好出貨風險。',
    riskBudgetBodyTruth: '即日開收表現反映反應日內部風險，應與高低開分開看。',
    riskBudgetBodyLegacy: '高波動代表不能用大倉位硬賭方向，應先決定可承受的跳空風險。',
    snapshotFallback: '如果後端提供 EST / ACT / Surprise，前端就會顯示。',
    tradeSetupTitle: '交易設定矩陣',
    tradeSetupBadge: '橫截面優勢',
    primaryBucket: '主要分組',
    singleFactor: '單一因子',
    crossSetup: '交叉設定',
    sampleCount: '樣本數',
    winRate: '勝率',
    legacyPlus10: '舊版 +10D',
    legacyPlus1: '舊版 +1D',
    legacyPlus1Volatility: '舊版 +1D 波動',
    maxDrawdown5dShort: '5D 最大回撤',
    highRunup: '高升幅',
    weakSurprise: '低驚喜',
    highSurprise: '高驚喜',
    positiveSurprise: '正面驚喜',
    negativeSurprise: '負面驚喜',
    lowRunup: '低升幅',
    highSurpriseLowRunup: '高驚喜 + 低升幅',
    highRunupWeakNegativeSurprise: '高升幅 + 低或負面驚喜',
    veryLowSample: '樣本極少',
    lowSampleBadge: '樣本偏少',
    auditTitleTruth: '財報反應核對明細',
    auditTitleLegacy: '舊版歷史矩陣',
    releaseDate: '公布日',
    reactionDay: '反應日',
    sameDayOcColumn: '即日開收 (%)',
    status: '狀態',
    releaseReaction: '公布日 / 反應日',
    result: '結果',
    preEarningsRunup: '財報前升幅',
    postReactionDrift: '反應後漂移',
    eventDate: '事件日期',
    sentiment: '結果分類',
    sentimentGapUp: '高開',
    sentimentGapDown: '低開',
    sentimentPending: '待補',
    sentimentBeat: '高於預期',
    sentimentMiss: '低於預期',
    sentimentInline: '符合預期',
    ready: '核實完成',
    pending: '待補',
    pendingData: '待補行情',
    excluded: '排除',
    readyDetail: '反應日價格齊備。',
    pendingDetail: '上一日收市、反應日開市或反應日收市資料仍未齊。',
    issueSingular: '個問題',
    issuePlural: '個問題',
    to: '至',
    decisionTruthTitle: '按反應日重建財報反應',
    decisionTruthSummary: '這一頁只讀已核實的財報事件與反應特徵，不再用舊版事件日期偏移推估反應日。',
    confidenceMedium: '中信度',
    confidenceLow: '低信度',
    confidencePending: '待補資料',
    riskHighVolatility: '高波動',
    riskMediumVolatility: '中波動',
    riskLowSample: '低樣本',
    noVerifiedRows: '尚無可統計的已驗證反應樣本',
    legacyDecisionBalancedTitle: '雙邊等待定價錯配',
    legacyDecisionBalancedSummary: '這組事件資料更適合比較多空兩邊賠率，而不是直接預設單一方向。',
    legacyDecisionExpansionTitle: '偏向順勢，但先比對做空賠率',
    legacyDecisionExpansionSummary: '歷史基準率偏正向，但應先視為做多基線，再用擁擠度與事件日波動檢查做空是否更有賠率。',
    legacyDecisionCompressionTitle: '偏向反身性回吐，但保留擠壓劇本',
    legacyDecisionCompressionSummary: '事件前擁擠度與事後波動偏高，回吐劇本變強；但若市場預期過低，仍要保留對做空不利的擠壓情境。',
    confidenceHigh: '高信度',
    riskHigh: '高風險',
    riskMedium: '中風險',
    riskLow: '低風險',
    flagLowSample: '樣本偏少，結論僅供參考',
    flagHighRunup: '事件前偷步偏高，須防追價',
    flagHighVolatility: '事件日波動大，倉位需縮小',
    flagDeepDrawdown: '歷史最大回撤偏深，停損要先定義',
    flagWeakWinRate: '勝率優勢不明顯，應依賴價位與風控',
    legacyLongStrong: '歷史勝率與升幅結構對做多較友善，適合等事件前後回調再接。',
    legacyLongMedium: '做多仍有基準率支撐，但需要更好的入場位，不能用勝率硬追。',
    legacyLongWeak: '做多缺乏明確統計優勢，若要做，必須依賴價格錯殺或預期過低的情境。',
    legacyShortVolatile: '偷步與波動偏高，做空賠率提升，特別要盯利好出貨或反身性回吐。',
    legacyShortWeakWinRate: '歷史結果對做空較有利，但要留意事件後擠壓風險。',
    legacyShortWeak: '做空沒有天然優勢，除非看到事件前擁擠或期權定價過滿。',
    legacySizingHighRisk: '事件風險偏大，適合縮倉位、分批進出，避免單點重押。',
    legacySizingMediumRisk: '可做，但倉位應低於平時，並先定義事件日失敗條件。',
    legacySizingLowRisk: '波動與回撤仍在可控區間，可以把焦點放在入場質素與賠率。',
    longPayoffSupportive: '核實樣本偏向財報後高開，但仍要等資料補齊後再提高信任度。',
    longPayoffWeak: '目前高開機率不足以單獨支持順勢結論，應搭配基本面與估值檢查。',
    shortPayoffSupportive: '低開或反應失效比例偏高，需檢查是否存在預期過高或利好出貨風險。',
    shortPayoffWeak: '目前沒有足夠低開證據支持單獨做空判斷。',
    sizingText: (avgGapUp, sameDayOc) => `財報後平均高開 ${avgGapUp}；即日開收 ${sameDayOc}。倉位應以高低開風險，而不是舊日期偏移判斷。`
  }
};

function getEventStudyCopy(locale = 'en') {
  return EVENT_STUDY_COPY[locale] || EVENT_STUDY_COPY.en;
}

function getDateRange(rows = []) {
  const dates = rows.map((row) => row?.release_date).filter(Boolean).sort();
  return {
    start: dates[0] || null,
    end: dates[dates.length - 1] || null
  };
}

function shiftDateByYears(dateString, years) {
  if (!dateString) return null;
  const [year, month, day] = dateString.split('-').map(Number);
  if (!year || !month || !day) return null;
  const date = new Date(Date.UTC(year + years, month - 1, day));
  return date.toISOString().slice(0, 10);
}

function clampDate(dateString, minDate, maxDate) {
  if (!dateString) return '';
  if (minDate && dateString < minDate) return minDate;
  if (maxDate && dateString > maxDate) return maxDate;
  return dateString;
}

function filterMeasuredRowsBySampleWindow(rows = [], sampleFilter = DEFAULT_SAMPLE_FILTER) {
  const mode = sampleFilter?.mode || 'max';
  if (mode === 'max') return rows;

  const fullRange = getDateRange(rows);
  if (!fullRange.start || !fullRange.end) return rows;

  let startDate = fullRange.start;
  let endDate = fullRange.end;

  const preset = SAMPLE_FILTER_OPTIONS.find((option) => option.value === mode);
  if (preset?.years) {
    startDate = shiftDateByYears(fullRange.end, -preset.years) || fullRange.start;
  } else if (mode === 'custom') {
    startDate = sampleFilter.customStart || fullRange.start;
    endDate = sampleFilter.customEnd || fullRange.end;
  }

  const boundedStart = clampDate(startDate, fullRange.start, fullRange.end);
  const boundedEnd = clampDate(endDate, fullRange.start, fullRange.end);
  const normalizedStart = boundedStart && boundedEnd && boundedStart > boundedEnd ? boundedEnd : boundedStart;
  const normalizedEnd = boundedStart && boundedEnd && boundedStart > boundedEnd ? boundedStart : boundedEnd;

  return rows.filter((row) => {
    if (!row?.release_date) return false;
    return row.release_date >= normalizedStart && row.release_date <= normalizedEnd;
  });
}

function getSampleFilterLabel(sampleFilter = DEFAULT_SAMPLE_FILTER, copy = getEventStudyCopy()) {
  const mode = sampleFilter?.mode || 'max';
  if (mode === 'custom') {
    if (sampleFilter.customStart && sampleFilter.customEnd) {
      return `${sampleFilter.customStart} → ${sampleFilter.customEnd}`;
    }
    return copy.customFilter;
  }
  if (mode === 'max') return copy.maxFilter;
  return SAMPLE_FILTER_OPTIONS.find((option) => option.value === mode)?.label || copy.maxFilter;
}

function getAuditRowState(row, copy = getEventStudyCopy()) {
  const reasons = Array.isArray(row?.exclusion_reasons) ? row.exclusion_reasons : [];
  if (!reasons.length) {
    return {
      status: copy.ready,
      tone: 'ready',
      displayValue: copy.ready,
      detail: copy.readyDetail
    };
  }

  const marketDataOnly = reasons.every((reason) => MARKET_DATA_EXCLUSION_REASONS.has(reason));
  if (marketDataOnly) {
    return {
      status: copy.pendingData,
      tone: 'pending',
      displayValue: copy.pendingData,
      detail: copy.pendingDetail
    };
  }

  return {
    status: copy.excluded,
    tone: 'excluded',
    displayValue: `${reasons.length} ${reasons.length === 1 ? copy.issueSingular : copy.issuePlural}`,
    detail: reasons.join(', ')
  };
}

function formatAuditPercent(value, digits = 2, withSign = true, copy = getEventStudyCopy()) {
  if (value === undefined || value === null || value === '') {
    return <span className="audit-pending-value">{copy.pending}</span>;
  }
  return formatPercent(value, digits, withSign);
}

function formatSentimentLabel(sentiment, copy = getEventStudyCopy()) {
  const normalized = String(sentiment || '').toLowerCase();
  if (normalized === 'gap up') return copy.sentimentGapUp;
  if (normalized === 'gap down') return copy.sentimentGapDown;
  if (normalized === 'pending') return copy.sentimentPending;
  if (normalized === 'beat') return copy.sentimentBeat;
  if (normalized === 'miss') return copy.sentimentMiss;
  if (normalized === 'inline' || normalized === 'in line') return copy.sentimentInline;
  return sentiment || copy.pending;
}

function isMeasuredReadyQuarter(row) {
  return row?.gap_return !== undefined &&
    row?.gap_return !== null &&
    !(Array.isArray(row?.exclusion_reasons) && row.exclusion_reasons.length > 0);
}

function isPrimarySourceReleaseDate(row) {
  if (row?.release_date_is_primary_source === true) return true;
  if (!row?.source_url) return false;
  const reasons = Array.isArray(row?.exclusion_reasons) ? row.exclusion_reasons : [];
  return !reasons.includes('SEC_FILING_DATE_FALLBACK_NOT_ORIGINAL_EARNINGS_RELEASE');
}

function canDisplayLeadingPendingRow(row, asOfDate) {
  return Boolean(
    row?.release_date &&
    (!asOfDate || row.release_date <= asOfDate) &&
    isPrimarySourceReleaseDate(row)
  );
}

function latestVisibleEarningsRows(rows = [], asOfDate = null) {
  const visibleRows = [];
  const measuredRows = [];
  const hiddenLeadingRows = [];
  let measuredWindowStarted = false;
  for (const row of rows) {
    if (!isMeasuredReadyQuarter(row)) {
      if (!measuredWindowStarted) {
        if (canDisplayLeadingPendingRow(row, asOfDate)) {
          visibleRows.push(row);
        } else {
          hiddenLeadingRows.push(row);
        }
        continue;
      }
      break;
    }
    measuredWindowStarted = true;
    visibleRows.push(row);
    measuredRows.push(row);
  }
  return { visibleRows, measuredRows, hiddenLeadingRows };
}

function normalizeEarningsGapSummaryPayload(payload, displayTicker = null, sampleFilter = DEFAULT_SAMPLE_FILTER) {
  const fullRows = Array.isArray(payload?.audit_trail?.full_history_quarter_log)
    ? payload.audit_trail.full_history_quarter_log
    : Array.isArray(payload?.quarter_log)
      ? payload.quarter_log
      : [];
  const asOfDate = payload?.coverage?.as_of_date || null;
  const { visibleRows, measuredRows: continuousMeasuredRows, hiddenLeadingRows } = latestVisibleEarningsRows(fullRows, asOfDate);
  const leadingPendingRows = visibleRows.filter((row) => !isMeasuredReadyQuarter(row));
  const measuredRows = filterMeasuredRowsBySampleWindow(continuousMeasuredRows, sampleFilter);
  const rows = [...leadingPendingRows, ...measuredRows];
  const measuredCount = measuredRows.length;
  const gapUpRows = measuredRows.filter((row) => Number(row.gap_return) > 0);
  const gapDownRows = measuredRows.filter((row) => Number(row.gap_return) < 0);
  const gapUpRate = measuredRows.length ? (gapUpRows.length / measuredRows.length) * 100 : null;
  const averageGapUp = averagePercent(gapUpRows, 'gap_return');
  const averageGapDown = averagePercent(gapDownRows, 'gap_return');
  const sameDayOc = averagePercent(measuredRows, 'same_day_oc');
  const sampleDateRange = getDateRange(measuredRows);
  const continuousReadyDateRange = getDateRange(continuousMeasuredRows);
  const fullHistoryMeasuredCount = fullRows.filter(isMeasuredReadyQuarter).length;
  const fullHistoryExcludedCount = payload?.coverage?.full_history_excluded_count ??
    payload?.coverage?.excluded_count ??
    Math.max(fullRows.length - fullHistoryMeasuredCount, 0);
  const coverage = {
    ...(payload?.coverage || {}),
    sample_window: payload?.coverage?.sample_window || 'latest_contiguous_verified_reaction',
    quarters_analyzed: measuredCount,
    measured_gap_count: measuredCount,
    date_range: {
      start: sampleDateRange.start,
      end: sampleDateRange.end
    },
    continuous_ready_date_range: continuousReadyDateRange,
    active_sample_filter: {
      mode: sampleFilter?.mode || 'max',
      label: getSampleFilterLabel(sampleFilter),
      custom_start: sampleFilter?.customStart || null,
      custom_end: sampleFilter?.customEnd || null
    },
    sample_excluded_count: 0,
    sample_filtered_out_count: Math.max(continuousMeasuredRows.length - measuredCount, 0),
    full_history_quarters_available: payload?.coverage?.full_history_quarters_available ?? fullRows.length,
    full_history_measured_gap_count: payload?.coverage?.full_history_measured_gap_count ?? fullHistoryMeasuredCount,
    full_history_excluded_count: fullHistoryExcludedCount,
    measured_outside_continuous_window: payload?.coverage?.measured_outside_continuous_window ??
      Math.max(fullHistoryMeasuredCount - continuousMeasuredRows.length, 0),
    leading_pending_count: payload?.coverage?.leading_pending_count ?? Math.max(rows.length - measuredRows.length, 0),
    hidden_leading_pending_count: payload?.coverage?.hidden_leading_pending_count ?? hiddenLeadingRows.length
  };
  const ticker = displayTicker || payload?.ticker;

  return {
    truth_layer_status: 'truth_layer_v1',
    ticker,
    source_ticker: payload?.ticker,
    coverage,
    earnings_summary: payload?.earnings_summary,
    forward_returns: payload?.forward_returns,
    dossier_digest: payload?.dossier_digest,
    summary: {
      truth_layer_kind: 'earnings_gap_summary',
      ticker,
      source_ticker: payload?.ticker,
      total_events: measuredCount,
      win_rate: gapUpRate,
      avg_gap_up_pct: averageGapUp,
      avg_gap_down_pct: averageGapDown,
      avg_same_day_oc_pct: sameDayOc,
      avg_drift_m5: null,
      avg_t1_abs_volatility: sameDayOc,
      avg_max_dd_5: null,
    },
    details: rows.map((row) => ({
      ...row,
      truth_layer_kind: 'earnings_gap_summary',
      event_date: row.release_date,
      sentiment: row.gap_return > 0 ? 'Gap Up' : row.gap_return < 0 ? 'Gap Down' : 'Pending',
      gap_return_pct: ratioToPercent(row.gap_return),
      same_day_oc_pct: ratioToPercent(row.same_day_oc),
      pre_1_return_pct: ratioToPercent(row.pre_1_return),
      pre_5_return_pct: ratioToPercent(row.pre_5_return),
      pre_10_return_pct: ratioToPercent(row.pre_10_return),
      r_plus_1_pct: ratioToPercent(row.r_plus_1),
      r_plus_3_pct: ratioToPercent(row.r_plus_3),
      r_plus_5_pct: ratioToPercent(row.r_plus_5),
      r_plus_10_pct: ratioToPercent(row.r_plus_10),
      r_plus_30_pct: ratioToPercent(row.r_plus_30),
      until_next_earnings_return_pct: ratioToPercent(row.until_next_earnings_return),
      win: Number(row.gap_return) > 0,
    })),
  };
}

function mergeHistoryIntoDetails(details = [], historyRows = []) {
  const historyMap = new Map(
    historyRows.map((row) => [String(row.event_date), row])
  );

  return details.map((detail) => {
    const historyRow = historyMap.get(String(detail.event_date));
    return {
      ...detail,
      eps_estimate: extractEstimate(detail) ?? extractEstimate(historyRow),
      actual_eps: extractActual(detail) ?? extractActual(historyRow),
      surprise_percent: extractSurprise(detail) ?? extractSurprise(historyRow),
    };
  });
}

function getLatestEarningsSnapshot(rows = []) {
  const enriched = rows.find((row) =>
    extractEstimate(row) !== undefined ||
    extractActual(row) !== undefined ||
    extractSurprise(row) !== undefined
  );

  if (!enriched) return null;

  return {
    eventDate: enriched.event_date,
    estimate: extractEstimate(enriched),
    actual: extractActual(enriched),
    surprise: extractSurprise(enriched),
  };
}

function getDecisionModel(summary, copy = getEventStudyCopy()) {
  if (!summary) return null;

  if (summary.truth_layer_kind === 'earnings_gap_summary') {
    const sample = Number(summary.total_events ?? 0);
    const gapUpRate = Number(summary.win_rate ?? 0);
    const sameDayOc = Number(summary.avg_same_day_oc_pct ?? 0);
    const avgGapUp = Number(summary.avg_gap_up_pct ?? 0);

    return {
      posture: 'truth_layer',
      title: copy.decisionTruthTitle,
      summaryText: copy.decisionTruthSummary,
      confidence: sample >= 8 ? copy.confidenceMedium : sample > 0 ? copy.confidenceLow : copy.confidencePending,
      risk: Math.abs(avgGapUp) >= 10 ? copy.riskHighVolatility : Math.abs(avgGapUp) >= 3 ? copy.riskMediumVolatility : copy.riskLowSample,
      flags: sample === 0 ? [copy.noVerifiedRows] : [],
      longPayoff:
        gapUpRate >= 55
          ? copy.longPayoffSupportive
          : copy.longPayoffWeak,
      shortPayoff:
        gapUpRate <= 45
          ? copy.shortPayoffSupportive
          : copy.shortPayoffWeak,
      sizingText:
        copy.sizingText(
          Number.isFinite(avgGapUp) ? formatPercent(avgGapUp, 2, true) : '—',
          Number.isFinite(sameDayOc) ? formatPercent(sameDayOc, 2, true) : '—'
        ),
    };
  }

  const sample = Number(summary.total_events ?? 0);
  const winRate = Number(summary.win_rate ?? 0);
  const runup = Number(summary.avg_drift_m5 ?? 0);
  const volatility = Number(summary.avg_t1_abs_volatility ?? 0);
  const maxDrawdown = Number(summary.avg_max_dd_5 ?? 0);
  const drawdownAbs = Math.abs(maxDrawdown);

  let posture = 'balanced';
  let title = copy.legacyDecisionBalancedTitle;
  let summaryText = copy.legacyDecisionBalancedSummary;

  if ((winRate >= 58 && runup <= 2.5) || (winRate >= 65 && maxDrawdown > -5)) {
    posture = 'expansion';
    title = copy.legacyDecisionExpansionTitle;
    summaryText = copy.legacyDecisionExpansionSummary;
  } else if ((winRate <= 45 && runup >= 1.5) || (runup >= 3 && volatility >= 4)) {
    posture = 'compression';
    title = copy.legacyDecisionCompressionTitle;
    summaryText = copy.legacyDecisionCompressionSummary;
  }

  const confidence = sample >= 20 ? copy.confidenceHigh : sample >= 10 ? copy.confidenceMedium : copy.confidenceLow;
  const risk = volatility >= 5 || drawdownAbs >= 7 ? copy.riskHigh : volatility >= 3 || drawdownAbs >= 4 ? copy.riskMedium : copy.riskLow;

  const flags = [];
  if (sample < 8) flags.push(copy.flagLowSample);
  if (runup >= 3) flags.push(copy.flagHighRunup);
  if (volatility >= 4) flags.push(copy.flagHighVolatility);
  if (drawdownAbs >= 5) flags.push(copy.flagDeepDrawdown);
  if (winRate > 45 && winRate < 55) flags.push(copy.flagWeakWinRate);

  return {
    posture,
    title,
    summaryText,
    confidence,
    risk,
    flags,
    longPayoff:
      winRate >= 58 && runup <= 2.5
        ? copy.legacyLongStrong
        : winRate >= 50
          ? copy.legacyLongMedium
          : copy.legacyLongWeak,
    shortPayoff:
      runup >= 3 || volatility >= 4
        ? copy.legacyShortVolatile
        : winRate <= 45
          ? copy.legacyShortWeakWinRate
          : copy.legacyShortWeak,
    sizingText:
      volatility >= 5 || drawdownAbs >= 7
        ? copy.legacySizingHighRisk
        : volatility >= 3 || drawdownAbs >= 4
          ? copy.legacySizingMediumRisk
          : copy.legacySizingLowRisk,
  };
}

function DecisionMetricCard({ label, value, tone = 'neutral', footnote }) {
  return (
    <div className={`decision-metric-card decision-metric-card--${tone}`}>
      <span className="decision-metric-card__label">{label}</span>
      <strong className="decision-metric-card__value">{value}</strong>
      <span className="decision-metric-card__footnote">{footnote}</span>
    </div>
  );
}

function BucketCard({ title, bucket, compact = false, copy = getEventStudyCopy() }) {
  if (!bucket) return null;
  const { count, win_rate, avg_t10, avg_t1, avg_max_dd_5, avg_t1_abs_volatility, sample_warning } = bucket;

  return (
    <div className={`bucket-card ${sample_warning ? 'bucket-card--warning' : ''}`}>
      <div className="bucket-card__header">
        <span className="bucket-card__title">{title}</span>
        {sample_warning === 'very_low_sample' && <span className="bucket-badge bucket-badge--red">{copy.veryLowSample}</span>}
        {sample_warning === 'low_sample' && <span className="bucket-badge bucket-badge--amber">{copy.lowSampleBadge}</span>}
      </div>
      <div className="bucket-card__metrics">
        <div className="bucket-metric">
          <span>{copy.sampleCount}</span>
          <strong>{count ?? 0}</strong>
        </div>
        <div className="bucket-metric">
          <span>{copy.winRate}</span>
          <strong>{win_rate != null ? `${win_rate}%` : '—'}</strong>
        </div>
        <div className="bucket-metric">
          <span>{copy.legacyPlus10}</span>
          <strong className={avg_t10 > 0 ? 'text-success' : avg_t10 < 0 ? 'text-danger' : ''}>{avg_t10 != null ? `${avg_t10}%` : '—'}</strong>
        </div>
        {compact ? (
          <>
            <div className="bucket-metric">
              <span>{copy.legacyPlus1}</span>
              <strong className={avg_t1 > 0 ? 'text-success' : avg_t1 < 0 ? 'text-danger' : ''}>{avg_t1 != null ? `${avg_t1}%` : '—'}</strong>
            </div>
            <div className="bucket-metric">
              <span>{copy.maxDrawdown5dShort}</span>
              <strong className="text-danger">{avg_max_dd_5 != null ? `${avg_max_dd_5}%` : '—'}</strong>
            </div>
          </>
        ) : (
          <div className="bucket-metric">
            <span>{copy.legacyPlus1Volatility}</span>
            <strong>{avg_t1_abs_volatility != null ? `${avg_t1_abs_volatility}%` : '—'}</strong>
          </div>
        )}
      </div>
    </div>
  );
}

function BestSetupHintCard({ hint, copy = getEventStudyCopy() }) {
  if (!hint) return null;

  const { label, title, confidence, reason, primary_bucket, sample_warning } = hint;

  let toneClass = 'neutral';
  if (label === 'clean_long_continuation') toneClass = 'positive';
  else if (label === 'crowded_fade') toneClass = 'negative';
  else if (label === 'balanced_two_sided') toneClass = 'neutral';
  else if (label === 'insufficient_signal') toneClass = 'warning';

  return (
    <div className={`glass-panel w-full event-study-workbench best-setup-hint-card best-setup-hint-card--${toneClass}`}>
      <div className="best-setup-hint-card__header">
        <div className="best-setup-hint-card__title-group">
          <Lightbulb size={18} />
          <span>{title}</span>
          <span className={`hint-confidence-badge hint-confidence-badge--${confidence}`}>{confidence}</span>
        </div>
        {sample_warning && (
          <span className="hint-sample-badge">
            {sample_warning === 'very_low_sample' ? copy.veryLowSample : copy.lowSampleBadge}
          </span>
        )}
      </div>
      <p className="best-setup-hint-card__reason">{reason}</p>
      <div className="best-setup-hint-card__footer">
        <span>{copy.primaryBucket || 'Primary Bucket'}:</span>
        <code className="mono">{primary_bucket}</code>
      </div>
    </div>
  );
}

function TradeSetupMatrix({ conditionalSummary, copy = getEventStudyCopy() }) {
  if (!conditionalSummary) return null;
  const {
    thresholds,
    positive_surprise,
    negative_surprise,
    high_runup,
    low_runup,
    high_surprise_low_runup,
    high_runup_negative_or_weak_surprise
  } = conditionalSummary;

  return (
    <div className="glass-panel w-full event-study-workbench">
      <div className="panel-header">
        <Database size={18} className="text-accent" />
        <span>{copy.tradeSetupTitle}</span>
        <span className="badge panel-badge radar-panel-badge">{copy.tradeSetupBadge}</span>
      </div>

      <div className="trade-setup-matrix">
        {thresholds && (
          <div className="trade-setup-thresholds">
            <span><strong>{copy.highRunup}</strong> &ge; {thresholds.high_runup_threshold}%</span>
            <span><strong>{copy.weakSurprise}</strong> &le; {thresholds.weak_surprise_threshold}%</span>
            <span><strong>{copy.highSurprise}</strong> &ge; {thresholds.high_surprise_threshold}%</span>
          </div>
        )}

        <div>
          <h4 style={{ fontSize: '0.85rem', color: 'var(--eink-gold-deep)', textTransform: 'uppercase', marginBottom: '0.8rem', fontWeight: 700 }}>{copy.singleFactor}</h4>
          <div className="bucket-grid">
            <BucketCard title={copy.positiveSurprise} bucket={positive_surprise} copy={copy} />
            <BucketCard title={copy.negativeSurprise} bucket={negative_surprise} copy={copy} />
            <BucketCard title={copy.highRunup} bucket={high_runup} copy={copy} />
            <BucketCard title={copy.lowRunup} bucket={low_runup} copy={copy} />
          </div>
        </div>

        <div>
          <h4 style={{ fontSize: '0.85rem', color: 'var(--eink-gold-deep)', textTransform: 'uppercase', marginBottom: '0.8rem', fontWeight: 700 }}>{copy.crossSetup}</h4>
          <div className="bucket-grid">
            <BucketCard title={copy.highSurpriseLowRunup} bucket={high_surprise_low_runup} compact copy={copy} />
            <BucketCard title={copy.highRunupWeakNegativeSurprise} bucket={high_runup_negative_or_weak_surprise} compact copy={copy} />
          </div>
        </div>
      </div>
    </div>
  );
}

function MobileAuditCard({ row, index, copy = getEventStudyCopy() }) {
  if (row.truth_layer_kind === 'earnings_gap_summary') {
    const auditState = getAuditRowState(row, copy);
    return (
      <article className="event-audit-card" key={`${row.release_date}-${index}`}>
        <div className="event-audit-card__header">
          <div>
            <span className="event-audit-card__eyebrow">{copy.releaseReaction}</span>
            <strong className="mono text-accent">{row.release_date} → {row.reaction_day || copy.pending}</strong>
          </div>
          <span className={`audit-status-pill audit-status-pill--${auditState.tone}`}>
            {auditState.status}
          </span>
        </div>

        <div className="event-audit-card__grid">
          <div className="event-audit-card__metric">
            <span>Pre-5</span>
            <strong className={row.pre_5_return_pct > 0 ? 'text-success' : row.pre_5_return_pct < 0 ? 'text-danger' : ''}>
              {formatAuditPercent(row.pre_5_return_pct, 2, true, copy)}
            </strong>
          </div>
          <div className="event-audit-card__metric">
            <span>Pre-1</span>
            <strong className={row.pre_1_return_pct > 0 ? 'text-success' : row.pre_1_return_pct < 0 ? 'text-danger' : ''}>
              {formatAuditPercent(row.pre_1_return_pct, 2, true, copy)}
            </strong>
          </div>
          <div className="event-audit-card__metric">
            <span>{copy.gap}</span>
            <strong className={row.gap_return_pct > 0 ? 'text-success' : row.gap_return_pct < 0 ? 'text-danger' : ''}>
              {formatAuditPercent(row.gap_return_pct, 2, true, copy)}
            </strong>
          </div>
          <div className="event-audit-card__metric">
            <span>{copy.sameDayOc}</span>
            <strong className={row.same_day_oc_pct > 0 ? 'text-success' : row.same_day_oc_pct < 0 ? 'text-danger' : ''}>
              {formatAuditPercent(row.same_day_oc_pct, 2, true, copy)}
            </strong>
          </div>
          <div className="event-audit-card__metric">
            <span>R+1</span>
            <strong>{formatAuditPercent(row.r_plus_1_pct, 2, true, copy)}</strong>
          </div>
          <div className="event-audit-card__metric">
            <span>R+5</span>
            <strong>{formatAuditPercent(row.r_plus_5_pct, 2, true, copy)}</strong>
          </div>
          <div className="event-audit-card__metric">
            <span>R+10</span>
            <strong>{formatAuditPercent(row.r_plus_10_pct, 2, true, copy)}</strong>
          </div>
        </div>

        <div className="event-audit-card__footer">
          <span>{copy.status}</span>
          <strong>{auditState.detail}</strong>
        </div>
      </article>
    );
  }

  return (
    <article className="event-audit-card" key={`${row.event_date}-${index}`}>
      <div className="event-audit-card__header">
        <div>
          <span className="event-audit-card__eyebrow">{copy.eventDate}</span>
          <strong className="mono text-accent">{row.event_date}</strong>
        </div>
        <span className={`badge ${row.sentiment.toLowerCase() === 'beat' ? 'active' : row.sentiment.toLowerCase() === 'miss' ? 'inactive' : 'pending'}`}>
          {formatSentimentLabel(row.sentiment, copy)}
        </span>
      </div>

      <div className="event-audit-card__grid">
        <div className="event-audit-card__metric">
          <span>Pre-10</span>
          <strong className={row.drift_m10 > 0 ? 'text-success' : 'text-danger'}>{row.drift_m10}</strong>
        </div>
        <div className="event-audit-card__metric">
          <span>Pre-5</span>
          <strong className={row.drift_m5 > 0 ? 'text-success' : 'text-danger'}>{row.drift_m5}</strong>
        </div>
        <div className="event-audit-card__metric">
          <span>EST</span>
          <strong>{formatDecimal(row.eps_estimate)}</strong>
        </div>
        <div className="event-audit-card__metric">
          <span>ACT</span>
          <strong>{formatDecimal(row.actual_eps)}</strong>
        </div>
        <div className="event-audit-card__metric">
          <span>{copy.surprise}</span>
          <strong className={Number(row.surprise_percent) >= 0 ? 'text-success' : 'text-danger'}>
            {formatPercent(row.surprise_percent, 2, true)}
          </strong>
        </div>
        <div className="event-audit-card__metric">
          <span>{copy.legacyPlus1}</span>
          <strong className={row.t1_return > 0 ? 'text-success' : 'text-danger'}>{row.t1_return}</strong>
        </div>
        <div className="event-audit-card__metric">
          <span>{copy.maxDrawdown5dShort}</span>
          <strong className="text-danger">{row.max_dd_5}</strong>
        </div>
        <div className="event-audit-card__metric">
          <span>{copy.legacyPlus10}</span>
          <strong className={row.t10_return > 0 ? 'text-success' : 'text-danger'}>{row.t10_return}</strong>
        </div>
      </div>

      <div className="event-audit-card__footer">
            <span>{copy.result}</span>
        {row.win ? <strong className="text-success">W</strong> : <strong className="text-danger">L</strong>}
      </div>
    </article>
  );
}

export default function EventStudyPanel({ payload, eventStudySeed, onOpenStockDossier, locale = 'en' }) {
  const [symbol, setSymbol] = useState('');
  const [loading, setLoading] = useState(false);
  const [rawEarningsPayload, setRawEarningsPayload] = useState(null);
  const [dataTicker, setDataTicker] = useState(null);
  const [sampleFilter, setSampleFilter] = useState(DEFAULT_SAMPLE_FILTER);
  const [error, setError] = useState(null);

  const [historyRows, setHistoryRows] = useState([]);
  const [expandedRows, setExpandedRows] = useState(new Set());

  const toggleRow = (index) => {
    setExpandedRows(prev => {
      const next = new Set(prev);
      if (next.has(index)) next.delete(index);
      else next.add(index);
      return next;
    });
  };

  const [isMobile, setIsMobile] = useState(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(max-width: 767px)').matches;
  });
  const copy = useMemo(() => getEventStudyCopy(locale), [locale]);

  const fetchEventStudy = useCallback(async (symbolOverride, options = {}) => {
    const nextSymbol = canonicalizeTicker(symbolOverride ?? symbol);
    if (!nextSymbol) return;
    if (!options.silent) {
      setSymbol(nextSymbol.toUpperCase());
    }
    setLoading(true);
    setError(null);
    if (!options.keepPrevious) {
      setRawEarningsPayload(null);
      setDataTicker(null);
    }

    try {
      let lastError = null;
      for (const lookupSymbol of getTickerLookupKeys(nextSymbol)) {
        const endpoint = `${API_BASE}/event-study/earnings-gap-summary?symbol=${encodeURIComponent(lookupSymbol)}`;
        const res = await fetch(endpoint);
        const json = await res.json();

        if (res.ok) {
          setRawEarningsPayload(json);
          setDataTicker(nextSymbol.toUpperCase());
          setSampleFilter(DEFAULT_SAMPLE_FILTER);
          setHistoryRows([]);
          setExpandedRows(new Set());
          return;
        }
        lastError = json?.error || json?.dossier_digest?.reason || `Error ${res.status}`;
      }
      throw new Error(lastError || copy.unavailableError);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [copy.unavailableError, symbol]);

  const handleSubmit = useCallback((e) => {
    e?.preventDefault();
    fetchEventStudy(symbol);
  }, [fetchEventStudy, symbol]);

  useEffect(() => {
    const seededTicker = String(eventStudySeed?.ticker || '').trim().toUpperCase();
    if (!seededTicker) return;
    setSymbol(seededTicker);
    fetchEventStudy(seededTicker, { keepPrevious: false });
  }, [eventStudySeed?.openedAt]);

  useEffect(() => {
    if (typeof window === 'undefined') return undefined;
    const media = window.matchMedia('(max-width: 767px)');
    const update = () => setIsMobile(media.matches);
    update();
    media.addEventListener('change', update);
    return () => media.removeEventListener('change', update);
  }, []);

  const data = useMemo(
    () => rawEarningsPayload ? normalizeEarningsGapSummaryPayload(rawEarningsPayload, dataTicker, sampleFilter) : null,
    [rawEarningsPayload, dataTicker, sampleFilter]
  );

  useEffect(() => {
    setExpandedRows(new Set());
  }, [sampleFilter, dataTicker]);

  const decisionModel = useMemo(() => getDecisionModel(data?.summary, copy), [data, copy]);
  const mergedDetails = useMemo(() => mergeHistoryIntoDetails(data?.details ?? [], historyRows), [data?.details, historyRows]);
  const latestEarningsSnapshot = useMemo(() => getLatestEarningsSnapshot(historyRows), [historyRows]);
  const isTruthLayerData = data?.truth_layer_status === 'truth_layer_v1';
  const measuredReactionCount = data?.coverage?.measured_gap_count ?? data?.summary?.total_events ?? 0;
  const continuousReadyRange = data?.coverage?.continuous_ready_date_range || {};
  const activeSampleLabel = getSampleFilterLabel(
    data?.coverage?.active_sample_filter
      ? {
        mode: data.coverage.active_sample_filter.mode,
        customStart: data.coverage.active_sample_filter.custom_start || sampleFilter.customStart,
        customEnd: data.coverage.active_sample_filter.custom_end || sampleFilter.customEnd
      }
      : sampleFilter,
    copy
  );

  const updateSampleFilterMode = useCallback((mode) => {
    setSampleFilter((current) => {
      if (mode !== 'custom') {
        return { ...DEFAULT_SAMPLE_FILTER, mode };
      }
      const start = current.customStart || continuousReadyRange.start || '';
      const end = current.customEnd || continuousReadyRange.end || '';
      return {
        mode: 'custom',
        customStart: clampDate(start, continuousReadyRange.start, continuousReadyRange.end),
        customEnd: clampDate(end, continuousReadyRange.start, continuousReadyRange.end)
      };
    });
  }, [continuousReadyRange.end, continuousReadyRange.start]);

  const updateCustomSampleDate = useCallback((field, value) => {
    setSampleFilter((current) => ({
      ...current,
      mode: 'custom',
      [field]: clampDate(value, continuousReadyRange.start, continuousReadyRange.end)
    }));
  }, [continuousReadyRange.end, continuousReadyRange.start]);

  const resolveDossierDetail = useCallback((ticker) => {
    const normalizedTicker = String(ticker || '').trim().toUpperCase();
    if (!normalizedTicker) return null;
    const details = Object.values(payload?.events_detail || {});
    return details.find((detail) => detail.ticker === normalizedTicker && detail.event_phase === 'post_earnings') ||
           details.find((detail) => detail.ticker === normalizedTicker) ||
           {
             event_id: `${normalizedTicker}-EventStudy`,
             ticker: normalizedTicker,
             event_category: 'Earnings',
             event_phase: 'event_study_lookup',
             status: 'event_study_lookup'
           };
  }, [payload]);

  const handleOpenCurrentDossier = useCallback(() => {
    if (!onOpenStockDossier) return;
    const ticker = String(data?.ticker || data?.summary?.ticker || symbol || '').trim().toUpperCase();
    if (!ticker) return;
    onOpenStockDossier(ticker, resolveDossierDetail(ticker));
  }, [data, onOpenStockDossier, resolveDossierDetail, symbol]);

  return (
    <div className="dashboard-grid fade-in flex flex-col gap-4 event-study-shell">
      <div className="glass-panel w-full event-study-workbench">
        <div className="panel-header">
          <Crosshair size={18} className="text-accent" />
          <span>{copy.panelTitle}</span>
        </div>

        <div>
          <form onSubmit={handleSubmit} className="event-study-toolbar">
            <div style={{ flex: 1 }}>
              <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>{copy.tickerLabel}</label>
              <input
                className="event-study-input"
                type="text"
                value={symbol}
                onChange={(e) => setSymbol(e.target.value)}
                placeholder={copy.tickerPlaceholder}
              />
            </div>
            <div style={{ flex: 1 }}>
              <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>{copy.categoryLabel}</label>
              <div
                className="event-study-input"
                aria-label={copy.categoryAria}
                style={{ display: 'flex', alignItems: 'center' }}
              >
                {copy.categoryValue}
              </div>
            </div>
            <button
              type="submit"
              disabled={loading || !symbol}
              className="event-study-submit"
            >
              {loading ? <Clock size={16} /> : <Search size={16} />}
              {loading ? copy.submitLoading : copy.submitIdle}
            </button>
          </form>

          <div className="decision-pillar-grid">
            <div className="decision-pillar-card">
              <span className="decision-pillar-card__eyebrow">{copy.pillars[0].eyebrow}</span>
              <strong>{copy.pillars[0].title}</strong>
              <p>{copy.pillars[0].body}</p>
            </div>
            <div className="decision-pillar-card">
              <span className="decision-pillar-card__eyebrow">{copy.pillars[1].eyebrow}</span>
              <strong>{copy.pillars[1].title}</strong>
              <p>{copy.pillars[1].body}</p>
            </div>
            <div className="decision-pillar-card">
              <span className="decision-pillar-card__eyebrow">{copy.pillars[2].eyebrow}</span>
              <strong>{copy.pillars[2].title}</strong>
              <p>{copy.pillars[2].body}</p>
            </div>
          </div>

          {error && (
            <div className="event-study-error-alert">
              <p>{error}</p>
            </div>
          )}
        </div>
      </div>

      <AnimatePresence>
        {data && data.summary && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="event-study-results"
          >
            {onOpenStockDossier && (
              <div className="event-study-dossier-link">
                <div>
                  <span>{copy.linkedObject}</span>
                  <strong>{String(data?.ticker || data?.summary?.ticker || symbol || '').toUpperCase()} Stock Dossier</strong>
                </div>
                <button type="button" onClick={handleOpenCurrentDossier}>
                  {copy.openStockDossier}
                </button>
              </div>
            )}

            <div className="event-study-decision-grid">
              <BestSetupHintCard hint={data?.best_setup_hint} copy={copy} />

              <div className="decision-trading-grid">
                <div className="decision-trading-card decision-trading-card--long">
                  <span className="decision-trading-card__eyebrow">{copy.longPayoff}</span>
                  <strong>{formatPercent(data.summary.win_rate, 0)} {copy.baseRateSuffix}</strong>
                  <p>{decisionModel?.longPayoff}</p>
                  <DecisionMetricCard
                    label={isTruthLayerData ? copy.gapUpRate : copy.legacyWinRate}
                    value={formatPercent(data.summary.win_rate, 0)}
                    tone={data.summary.win_rate >= 50 ? 'positive' : 'negative'}
                    footnote={isTruthLayerData ? copy.reactionDayFootnote : copy.legacyFootnote}
                  />
                </div>

                <div className="decision-trading-card decision-trading-card--short">
                  <span className="decision-trading-card__eyebrow">{copy.shortPayoff}</span>
                  <strong>{formatPercent(isTruthLayerData ? data.summary.avg_gap_down_pct : data.summary.avg_drift_m5, 2, true)} {isTruthLayerData ? copy.avgGapDownSuffix : copy.preEventRunupSuffix}</strong>
                  <p>{decisionModel?.shortPayoff}</p>
                  <DecisionMetricCard
                    label={isTruthLayerData ? copy.avgGapDown : copy.pre5Runup}
                    value={formatPercent(isTruthLayerData ? data.summary.avg_gap_down_pct : data.summary.avg_drift_m5, 2, true)}
                    tone={isTruthLayerData ? 'negative' : data.summary.avg_drift_m5 > 0 ? 'warning' : 'positive'}
                    footnote={isTruthLayerData ? copy.nullGapDownFootnote : copy.priceInFootnote}
                  />
                </div>

                <div className="decision-trading-card decision-trading-card--risk">
                  <span className="decision-trading-card__eyebrow">{copy.positionSizing}</span>
                  <strong>
                    {isTruthLayerData
                      ? `${formatPercent(data.summary.avg_gap_up_pct, 2, true)} / ${formatPercent(data.summary.avg_same_day_oc_pct, 2, true)}`
                      : `${formatPercent(data.summary.avg_t1_abs_volatility)} / ${formatPercent(data.summary.avg_max_dd_5, 2, true)}`}
                  </strong>
                  <p>{decisionModel?.sizingText}</p>
                  <div className="decision-mini-metrics">
                    <DecisionMetricCard
                      label={isTruthLayerData ? copy.sameDayOc : copy.legacyVolatility}
                      value={formatPercent(data.summary.avg_t1_abs_volatility)}
                      tone="warning"
                      footnote={isTruthLayerData ? copy.reactionOpenCloseFootnote : copy.legacyFootnote}
                    />
                    <DecisionMetricCard
                      label={copy.maxDrawdown5d}
                      value={formatPercent(data.summary.avg_max_dd_5, 2, true)}
                      tone="negative"
                      footnote={copy.stopFootnote}
                    />
                    <DecisionMetricCard
                      label={copy.validSample}
                      value={formatCount(data.summary.total_events, locale)}
                      tone="neutral"
                      footnote={copy.lowSampleFootnote}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="glass-panel w-full event-study-workbench event-study-evidence">
              <div className="panel-header">
                <BarChart3 size={18} className="text-accent" />
                <span>{copy.historicalEvidence}</span>
                {isTruthLayerData && (
                  <div className="event-study-sample-filter" aria-label={copy.sampleWindowAria || 'Historical evidence sample window'}>
                    <div className="event-study-sample-filter__controls">
                      {SAMPLE_FILTER_OPTIONS.map((option) => (
                        <button
                          type="button"
                          key={option.value}
                          className={`event-study-sample-filter__button ${sampleFilter.mode === option.value ? 'event-study-sample-filter__button--active' : ''}`}
                          onClick={() => updateSampleFilterMode(option.value)}
                        >
                          {option.value === 'max'
                            ? copy.maxFilter
                            : option.value === 'custom'
                              ? copy.customFilter
                              : option.label}
                        </button>
                      ))}
                    </div>
                    {sampleFilter.mode === 'custom' && (
                      <div className="event-study-sample-filter__custom">
                        <input
                          type="date"
                          value={sampleFilter.customStart}
                          min={continuousReadyRange.start || undefined}
                          max={continuousReadyRange.end || undefined}
                          onInput={(event) => updateCustomSampleDate('customStart', event.target.value)}
                          onChange={(event) => updateCustomSampleDate('customStart', event.target.value)}
                          aria-label={copy.customSampleStartAria}
                        />
                        <span>{copy.to}</span>
                        <input
                          type="date"
                          value={sampleFilter.customEnd}
                          min={continuousReadyRange.start || undefined}
                          max={continuousReadyRange.end || undefined}
                          onInput={(event) => updateCustomSampleDate('customEnd', event.target.value)}
                          onChange={(event) => updateCustomSampleDate('customEnd', event.target.value)}
                          aria-label={copy.customSampleEndAria}
                        />
                      </div>
                    )}
                  </div>
                )}
                <span className="badge panel-badge radar-panel-badge">{copy.whyThisMatters}</span>
              </div>

              <div className="event-study-evidence-grid">
                <div className="event-study-evidence-card">
                  <span className="event-study-evidence-card__eyebrow">{copy.baseRate}</span>
                  <strong>{formatPercent(data.summary.win_rate, 0)}</strong>
                  <p>{isTruthLayerData ? copy.baseRateBodyTruth : copy.baseRateBodyLegacy}</p>
                </div>
                <div className="event-study-evidence-card">
                  <span className="event-study-evidence-card__eyebrow">{isTruthLayerData ? copy.averageGapUp : copy.crowding}</span>
                  <strong>{formatPercent(isTruthLayerData ? data.summary.avg_gap_up_pct : data.summary.avg_drift_m5, 2, true)}</strong>
                  <p>{isTruthLayerData ? copy.averageGapUpBodyTruth : copy.averageGapUpBodyLegacy}</p>
                </div>
                <div className="event-study-evidence-card">
                  <span className="event-study-evidence-card__eyebrow">{copy.riskBudget}</span>
                  <strong>{formatPercent(data.summary.avg_t1_abs_volatility)}</strong>
                  <p>{isTruthLayerData ? copy.riskBudgetBodyTruth : copy.riskBudgetBodyLegacy}</p>
                </div>
                <div className="event-study-evidence-card event-study-evidence-card--earnings">
                  <span className="event-study-evidence-card__eyebrow">{isTruthLayerData ? copy.truthCoverage : copy.latestEarningsSnapshot}</span>
                  <strong>{isTruthLayerData ? formatMeasuredCount(measuredReactionCount, locale) : latestEarningsSnapshot?.eventDate ?? copy.noValue}</strong>
                  {isTruthLayerData ? (
                    <p>{copy.sampleLabel}: {activeSampleLabel}</p>
                  ) : (
                    <>
                      <div className="earnings-snapshot-grid">
                        <div className="earnings-snapshot-metric">
                          <span>EST</span>
                          <strong>{formatDecimal(latestEarningsSnapshot?.estimate)}</strong>
                        </div>
                        <div className="earnings-snapshot-metric">
                          <span>ACT</span>
                          <strong>{formatDecimal(latestEarningsSnapshot?.actual)}</strong>
                        </div>
                        <div className="earnings-snapshot-metric">
                          <span>{copy.surprise}</span>
                          <strong>{formatPercent(latestEarningsSnapshot?.surprise, 2, true)}</strong>
                        </div>
                      </div>
                      <p>{copy.snapshotFallback}</p>
                    </>
                  )}
                </div>
              </div>
            </div>


            <TradeSetupMatrix conditionalSummary={data?.conditional_summary} copy={copy} />

            <div className="glass-panel w-full event-study-workbench">
              <div className="panel-header">
                <BarChart3 size={18} className="text-accent" />
                <span>{isTruthLayerData ? copy.auditTitleTruth : copy.auditTitleLegacy}</span>
              </div>
              {isMobile ? (
                <div className="event-audit-card-list">
                  {mergedDetails.map((row, i) => <MobileAuditCard row={row} index={i} key={i} copy={copy} />)}
                </div>
              ) : (
                <div style={{ overflowX: 'auto' }}>
                  {isTruthLayerData ? (
                    <table className="data-table">
                      <thead>
                        <tr>
                          <th>{copy.releaseDate}</th>
                          <th>{copy.reactionDay}</th>
                          <th style={{ textAlign: 'right' }}>Pre-5 (%)</th>
                          <th style={{ textAlign: 'right' }}>Pre-1 (%)</th>
                          <th style={{ textAlign: 'right' }}>{copy.gapColumn}</th>
                          <th style={{ textAlign: 'right' }}>{copy.sameDayOcColumn}</th>
                          <th style={{ textAlign: 'right' }}>R+1 (%)</th>
                          <th style={{ textAlign: 'right' }}>R+5 (%)</th>
                          <th style={{ textAlign: 'right' }}>R+10 (%)</th>
                          <th>{copy.status}</th>
                          <th></th>
                        </tr>
                      </thead>
                      <tbody>
                        {mergedDetails.map((row, i) => {
                          const isExpanded = expandedRows.has(i);
                          const auditState = getAuditRowState(row, copy);
                          return (
                            <React.Fragment key={i}>
                              <tr onClick={() => toggleRow(i)} style={{ cursor: 'pointer' }}>
                                <td className="mono text-accent">{row.release_date}</td>
                                <td className="mono">{row.reaction_day || '—'}</td>
                                <td style={{ textAlign: 'right' }} className={row.pre_5_return_pct > 0 ? 'text-success' : row.pre_5_return_pct < 0 ? 'text-danger' : ''}>{formatAuditPercent(row.pre_5_return_pct, 2, true, copy)}</td>
                                <td style={{ textAlign: 'right' }} className={row.pre_1_return_pct > 0 ? 'text-success' : row.pre_1_return_pct < 0 ? 'text-danger' : ''}>{formatAuditPercent(row.pre_1_return_pct, 2, true, copy)}</td>
                                <td style={{ textAlign: 'right', fontWeight: 'bold' }} className={row.gap_return_pct > 0 ? 'text-success' : row.gap_return_pct < 0 ? 'text-danger' : ''}>{formatAuditPercent(row.gap_return_pct, 2, true, copy)}</td>
                                <td style={{ textAlign: 'right' }} className={row.same_day_oc_pct > 0 ? 'text-success' : row.same_day_oc_pct < 0 ? 'text-danger' : ''}>{formatAuditPercent(row.same_day_oc_pct, 2, true, copy)}</td>
                                <td style={{ textAlign: 'right' }}>{formatAuditPercent(row.r_plus_1_pct, 2, true, copy)}</td>
                                <td style={{ textAlign: 'right' }}>{formatAuditPercent(row.r_plus_5_pct, 2, true, copy)}</td>
                                <td style={{ textAlign: 'right' }}>{formatAuditPercent(row.r_plus_10_pct, 2, true, copy)}</td>
                                <td className="audit-status-cell">
                                  <span className={`audit-status-pill audit-status-pill--${auditState.tone}`} title={auditState.detail}>
                                    {auditState.displayValue}
                                  </span>
                                </td>
                                <td style={{ textAlign: 'center', color: 'var(--text-muted)' }}>{isExpanded ? '▼' : '▶'}</td>
                              </tr>
                              {isExpanded && (
                                <tr className="detail-row">
                                  <td colSpan="11" style={{ padding: '16px', background: 'var(--bg-layer-2)', borderBottom: '1px solid var(--border-color)' }}>
                                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
                                      <div>
	                                        <h4 style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '8px', textTransform: 'uppercase' }}>{copy.preEarningsRunup}</h4>
                                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', rowGap: '8px' }}>
	                                          <span>Pre-10:</span><strong style={{ textAlign: 'right' }}>{formatAuditPercent(row.pre_10_return_pct, 2, true, copy)}</strong>
	                                          <span>Pre-5:</span><strong style={{ textAlign: 'right' }}>{formatAuditPercent(row.pre_5_return_pct, 2, true, copy)}</strong>
	                                          <span>Pre-1:</span><strong style={{ textAlign: 'right' }}>{formatAuditPercent(row.pre_1_return_pct, 2, true, copy)}</strong>
                                        </div>
                                      </div>
                                      <div>
	                                        <h4 style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '8px', textTransform: 'uppercase' }}>{copy.reactionDay}</h4>
                                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', rowGap: '8px' }}>
	                                          <span>{copy.gap}:</span><strong style={{ textAlign: 'right' }}>{formatAuditPercent(row.gap_return_pct, 2, true, copy)}</strong>
	                                          <span>{copy.sameDayOc}:</span><strong style={{ textAlign: 'right' }}>{formatAuditPercent(row.same_day_oc_pct, 2, true, copy)}</strong>
	                                          <span>{copy.status}:</span><strong style={{ textAlign: 'right' }}>{auditState.status}</strong>
                                        </div>
                                      </div>
                                      <div>
	                                        <h4 style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '8px', textTransform: 'uppercase' }}>{copy.postReactionDrift}</h4>
                                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', rowGap: '8px' }}>
	                                          <span>R+1:</span><strong style={{ textAlign: 'right' }}>{formatAuditPercent(row.r_plus_1_pct, 2, true, copy)}</strong>
	                                          <span>R+3:</span><strong style={{ textAlign: 'right' }}>{formatAuditPercent(row.r_plus_3_pct, 2, true, copy)}</strong>
	                                          <span>R+5:</span><strong style={{ textAlign: 'right' }}>{formatAuditPercent(row.r_plus_5_pct, 2, true, copy)}</strong>
	                                          <span>R+10:</span><strong style={{ textAlign: 'right' }}>{formatAuditPercent(row.r_plus_10_pct, 2, true, copy)}</strong>
	                                          <span>R+30:</span><strong style={{ textAlign: 'right' }}>{formatAuditPercent(row.r_plus_30_pct, 2, true, copy)}</strong>
                                        </div>
                                      </div>
                                    </div>
                                  </td>
                                </tr>
                              )}
                            </React.Fragment>
                          );
                        })}
                      </tbody>
                    </table>
                  ) : (
                    <table className="data-table">
                      <thead>
                        <tr>
                          <th>{copy.eventDate}</th>
                          <th>{copy.sentiment}</th>
                          <th style={{ textAlign: 'right' }}>Pre -10D (%)</th>
                          <th style={{ textAlign: 'right' }}>Pre -5D (%)</th>
                          <th style={{ textAlign: 'right' }}>EST</th>
                          <th style={{ textAlign: 'right' }}>ACT</th>
                          <th style={{ textAlign: 'right' }}>{copy.surprise} (%)</th>
                          <th style={{ textAlign: 'right' }}>{copy.legacyPlus1} (%)</th>
                          <th style={{ textAlign: 'right' }}>{copy.maxDrawdown5dShort} (%)</th>
                          <th style={{ textAlign: 'right' }}>{copy.legacyPlus10} (%)</th>
                          <th style={{ textAlign: 'center' }}>{copy.result}</th>
                        </tr>
                      </thead>
                      <tbody>
                        {mergedDetails.map((row, i) => (
                          <tr key={i}>
                            <td className="mono text-accent">{row.event_date}</td>
                            <td>
                              <span className={`badge ${row.sentiment.toLowerCase() === 'beat' ? 'active' : row.sentiment.toLowerCase() === 'miss' ? 'inactive' : 'pending'}`}>
                                {formatSentimentLabel(row.sentiment, copy)}
                              </span>
                            </td>
                            <td style={{ textAlign: 'right' }} className={row.drift_m10 > 0 ? 'text-success' : 'text-danger'}>{row.drift_m10}</td>
                            <td style={{ textAlign: 'right' }} className={row.drift_m5 > 0 ? 'text-success' : 'text-danger'}>{row.drift_m5}</td>
                            <td style={{ textAlign: 'right' }}>{formatDecimal(row.eps_estimate)}</td>
                            <td style={{ textAlign: 'right' }}>{formatDecimal(row.actual_eps)}</td>
                            <td style={{ textAlign: 'right' }} className={Number(row.surprise_percent) >= 0 ? 'text-success' : 'text-danger'}>{formatPercent(row.surprise_percent, 2, true)}</td>
                            <td style={{ textAlign: 'right', fontWeight: 'bold' }} className={row.t1_return > 0 ? 'text-success' : 'text-danger'}>{row.t1_return}</td>
                            <td style={{ textAlign: 'right' }} className="text-danger">{row.max_dd_5}</td>
                            <td style={{ textAlign: 'right', fontWeight: 'bold' }} className={row.t10_return > 0 ? 'text-success' : 'text-danger'}>{row.t10_return}</td>
                            <td style={{ textAlign: 'center' }}>
                              {row.win ? <span className="text-success font-bold">W</span> : <span className="text-danger font-bold">L</span>}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
