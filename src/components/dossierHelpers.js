export const normalizeTicker = (t) => String(t || '').trim().toUpperCase();

const formatSignedPct = (value) => {
  if (value === undefined || value === null || Number.isNaN(Number(value))) return 'Not Included';
  const n = Number(value);
  return `${n > 0 ? '+' : ''}${n.toFixed(1)}%`;
};

const toFiniteNumber = (value) => {
  const numeric = Number(value);
  return Number.isFinite(numeric) ? numeric : null;
};

const firstFiniteMetric = (source, keys) => {
  const metrics = source?.metrics || {};
  for (const key of keys) {
    const value = metrics[key] ?? source?.[key];
    const numeric = toFiniteNumber(value);
    if (numeric !== null) return numeric;
  }
  return null;
};

const scoreBusinessQuality = ({ revenueGrowth, grossMargin, operatingMargin, fcfMargin }) => {
  let score = 0;
  if (revenueGrowth !== null) score += revenueGrowth >= 0.15 ? 2 : revenueGrowth >= 0.05 ? 1 : revenueGrowth < 0 ? -1 : 0;
  if (grossMargin !== null) score += grossMargin >= 0.6 ? 2 : grossMargin >= 0.4 ? 1 : grossMargin < 0.25 ? -1 : 0;
  if (operatingMargin !== null) score += operatingMargin >= 0.2 ? 2 : operatingMargin >= 0.08 ? 1 : operatingMargin < 0 ? -1 : 0;
  if (fcfMargin !== null) score += fcfMargin >= 0.2 ? 2 : fcfMargin >= 0.08 ? 1 : fcfMargin < 0 ? -1 : 0;

  if (score >= 5) return 'High';
  if (score >= 2) return 'Solid';
  if (score >= 0) return 'Mixed';
  return 'Weak';
};

const deriveValuationState = ({ evToRevenue, evToFcf, ruleOf40 }) => {
  if (evToRevenue === null && evToFcf === null) return 'Valuation Inputs Missing';
  if ((evToRevenue !== null && evToRevenue >= 15) || (evToFcf !== null && evToFcf >= 50)) {
    return ruleOf40 !== null && ruleOf40 >= 50 ? 'Priced for Perfection' : 'Valuation Stretched';
  }
  if ((evToRevenue !== null && evToRevenue >= 8) || (evToFcf !== null && evToFcf >= 30)) {
    return 'Valuation Stretched';
  }
  return 'Valuation Needs Review';
};

export const buildValuationCore = (eventDetail, profile = null) => {
  if (profile?.valuationCore) {
    return profile.valuationCore;
  }

  const fundamental = eventDetail?.fundamental_evidence || {};
  const hasFundamentals = fundamental.status === 'available';

  if (!hasFundamentals) {
    return {
      status: 'pending',
      topVerdict: {
        businessQuality: 'Insufficient Data',
        valuationState: 'Insufficient Data',
        baseCaseSupport: 'Insufficient Data',
        marginOfSafety: 'Insufficient Data',
        overallRead: 'Fundamentals Pending',
        why: 'Company-level fundamentals are not available in the current payload, so the Dossier cannot judge quality or valuation support yet.'
      },
      coreMetrics: [],
      researchJudgment: [
        'Needs current revenue, margin, cash flow, balance sheet, and valuation data before the research case can be judged.',
        'Do not infer valuation support from momentum, event-study evidence, or leaderboard position alone.'
      ],
      missingEvidence: [
        'current price / market cap / enterprise value',
        'valuation multiples',
        'SBC / dilution',
        'company-specific guidance or revisions'
      ]
    };
  }

  const revenueGrowth = firstFiniteMetric(fundamental, ['revenue_growth_yoy', 'revenue_growth']);
  const grossMargin = firstFiniteMetric(fundamental, ['gross_margin']);
  const operatingMargin = firstFiniteMetric(fundamental, ['operating_margin']);
  const fcfMargin = firstFiniteMetric(fundamental, ['fcf_margin', 'free_cash_flow_margin']);
  const debtToEquity = firstFiniteMetric(fundamental, ['debt_to_equity']);
  const evToRevenue = firstFiniteMetric(fundamental, ['ev_to_revenue', 'ev_revenue', 'ev_sales']);
  const evToFcf = firstFiniteMetric(fundamental, ['ev_to_fcf', 'ev_fcf']);
  const sbcRevenue = firstFiniteMetric(fundamental, ['sbc_to_revenue', 'stock_based_compensation_to_revenue']);
  const ruleOf40 = revenueGrowth !== null && fcfMargin !== null ? (revenueGrowth + fcfMargin) * 100 : null;

  const businessQuality = scoreBusinessQuality({ revenueGrowth, grossMargin, operatingMargin, fcfMargin });
  const valuationState = deriveValuationState({ evToRevenue, evToFcf, ruleOf40 });
  const valuationInputsMissing = valuationState === 'Valuation Inputs Missing';
  const baseCaseSupport = valuationInputsMissing ? 'Partial' : valuationState === 'Priced for Perfection' ? 'Needs Confirmation' : 'Needs Review';
  const marginOfSafety = valuationInputsMissing ? 'Insufficient Data' : valuationState === 'Priced for Perfection' ? 'None' : 'Needs Review';

  return {
    status: 'available',
    topVerdict: {
      businessQuality,
      valuationState,
      baseCaseSupport,
      marginOfSafety,
      overallRead: valuationInputsMissing ? 'Quality Visible; Valuation Not Proven' : `${businessQuality} Quality; ${valuationState}`,
      why: valuationInputsMissing
        ? 'The current payload has operating-quality evidence, but not enough market valuation inputs to decide whether the price is supported.'
        : 'The Dossier can compare company quality against available valuation pressure, but should still be treated as a research judgment layer.'
    },
    coreMetrics: [
      { id: 'revenue_growth', label: 'Revenue Growth', value: revenueGrowth, format: 'percent' },
      { id: 'gross_margin', label: 'Gross Margin', value: grossMargin, format: 'percent' },
      { id: 'operating_margin', label: 'Operating Margin', value: operatingMargin, format: 'percent' },
      { id: 'fcf_margin', label: 'FCF Margin', value: fcfMargin, format: 'percent' },
      { id: 'rule_of_40', label: 'Rule of 40', value: ruleOf40, format: 'number' },
      { id: 'ev_revenue', label: 'EV / Revenue', value: evToRevenue, format: 'multiple' },
      { id: 'ev_fcf', label: 'EV / FCF', value: evToFcf, format: 'multiple' },
      { id: 'sbc_revenue', label: 'SBC / Revenue', value: sbcRevenue, format: 'percent' },
      { id: 'debt_equity', label: 'Debt / Equity', value: debtToEquity, format: 'multiple' }
    ],
    researchJudgment: [
      valuationInputsMissing
        ? 'Only reasonable if future valuation data confirms that the business quality is not already fully capitalized.'
        : 'Only reasonable if growth, margin, cash conversion, and dilution trends support the current valuation state.',
      fcfMargin !== null && fcfMargin >= 0.2
        ? 'Cash conversion is a constructive input, but it still needs dilution and valuation context.'
        : 'Needs stronger cash conversion evidence before quality can offset valuation risk.',
      revenueGrowth !== null && revenueGrowth < 0.05
        ? 'Research case weakens if low growth persists without margin expansion.'
        : 'Research case weakens if growth decelerates without better margins or cleaner shareholder economics.'
    ],
    missingEvidence: [
      evToRevenue === null ? 'EV / revenue' : null,
      evToFcf === null ? 'EV / FCF' : null,
      sbcRevenue === null ? 'SBC / dilution' : null,
      'market-implied expectations',
      'guidance / estimate revision context'
    ].filter(Boolean)
  };
};

export const deriveThesisPulse = (eventDetail, payload) => {
  if (!eventDetail) return { state: 'Unavailable', reason: 'Insufficient context.' };

  const momentum = eventDetail.momentum_evidence || {};
  const trend = eventDetail.trend_setup || {};
  const metrics = { ...(trend.metrics || {}), ...(momentum.evidence || {}) };

  if (momentum.status !== 'available' && trend.status !== 'available') {
    return { state: 'Unavailable', reason: 'Insufficient trend and momentum context.' };
  }

  const hasMA200 = metrics.latest_close !== undefined && metrics.ma200 !== undefined;
  const isAboveMA200 = hasMA200 ? (metrics.latest_close > metrics.ma200 || metrics.ma200_slope_pct > 0) : null;

  const hasRS = metrics.relative_strength_vs_spy_63d !== undefined;
  const isRSConstructive = hasRS ? (metrics.relative_strength_vs_spy_63d > 0) : null;

  const lifecycle = eventDetail.thesis_lifecycle || {};
  const isReviewed = lifecycle.review_state?.reviewed;

  const reaction = eventDetail.pead_signal?.reaction || {};
  const isRetracing = reaction.current_post_return !== undefined && reaction.t1_return !== undefined && reaction.current_post_return < 0 && reaction.t1_return > 0;

  if (isRetracing) {
    return { state: 'Challenged', reason: 'Post-event move is retracing.' };
  }

  if (isAboveMA200 === false) {
    return { state: 'Market Evidence Weakening', reason: 'Price trend weakened; fundamental coverage is not assessed by MA200.' };
  }

  if (isReviewed && (isAboveMA200 === false || isRSConstructive === false)) {
    return { state: 'Diverging', reason: 'Thesis remains active but momentum is weakening.' };
  }

  const peer = eventDetail.peer_readthrough || {};
  const hasConstructivePeer = (peer.incoming?.length > 0 || peer.outgoing_candidates?.length > 0);
  const eventStudy = eventDetail.post_earnings_base_rate || {};
  const isEventStudyConstructive = (eventStudy.continuation_rate > 0.5 || eventStudy.reversal_rate > 0.5);

  if (momentum.status === 'available' && isAboveMA200 === true && isRSConstructive === true && (hasConstructivePeer || isEventStudyConstructive)) {
    return { state: 'Evidence Improving', reason: 'Market evidence is constructive; validate it against valuation and company fundamentals.' };
  }

  return { state: 'Stable', reason: 'Trend and momentum available with no material deterioration.' };
};

export const buildDossierSummary = (eventDetail, payload) => {
  const isOffCycle = eventDetail.status === 'off_cycle_watch' || eventDetail.event_phase === 'off_cycle';
  const isMomentumUniverse = eventDetail.status === 'momentum_universe' || eventDetail.event_phase === 'off_cycle_universe';

  let reason = '';
  if (isMomentumUniverse) {
    reason = `Identified in the Momentum Universe scan due to extreme momentum or relative strength vs SPY/QQQ.`;
  } else if (isOffCycle) {
    reason = `Currently in off-cycle thesis watch, monitoring trend setup between catalyst cycles.`;
  } else {
    reason = `On radar due to ${eventDetail.event_phase || 'earnings catalyst'} event phase with active signal potential.`;
  }

  let verdict = '';
  if (isMomentumUniverse) {
    const theme = eventDetail.momentum_evidence?.industry_theme_label || eventDetail.momentum_evidence?.industry_theme || 'sector';
    verdict = `${eventDetail.ticker} is a top-ranked ${theme.toLowerCase()} momentum candidate; next validation comes from catalyst follow-through and company-specific evidence; peer moves remain market context only.`;
  } else if (eventDetail.pead_signal?.status === 'available') {
    verdict = `Post-earnings price action indicates market repricing, supported by available trend evidence.`;
  } else {
    verdict = `Monitoring ${eventDetail.ticker} for setup validation around its catalyst window.`;
  }

  // Override with thesis notes if available
  if (eventDetail.thesis_lifecycle?.review_state?.notes) {
    verdict = eventDetail.thesis_lifecycle.review_state.notes;
  }

  return { reason, verdict };
};

export const buildStockOverview = (eventDetail, payload, profile = null) => {
  const momentum = eventDetail?.momentum_evidence || {};
  const trend = eventDetail?.trend_setup || {};
  const fundamental = eventDetail?.fundamental_evidence || {};
  const theme = momentum.industry_theme_label || momentum.industry_theme || trend.supply_chain_stage || null;
  const companyName = eventDetail?.company_name || profile?.companyName || null;
  const businessDescription = eventDetail?.business_summary || eventDetail?.description || profile?.overview || null;
  const eventPhase = eventDetail?.event_phase ? eventDetail.event_phase.replace(/_/g, ' ') : 'research watch';

  return {
    title: companyName || `${eventDetail?.ticker || 'Ticker'} Stock Overview`,
    profileLine: businessDescription || `Company profile is not yet available in the live payload; use the research context below before opening a deeper Dossier review.`,
    theme: profile?.category || (theme ? formatOverviewLabel(theme) : 'Theme Pending'),
    eventContext: eventPhase,
    dataCoverage: profile ? 'Curated Dossier Available' : fundamental.status === 'available' ? 'Fundamentals Available' : 'Company Profile Pending',
    quickFacts: profile?.quickFacts || [
      { label: 'Research State', value: eventPhase },
      { label: 'Theme / Industry', value: theme ? formatOverviewLabel(theme) : 'Pending' },
      { label: 'Fundamentals', value: fundamental.status === 'available' ? 'Available' : 'Pending' },
      { label: 'Event Date', value: eventDetail?.event_date || 'Not Included' }
    ]
  };
};

const formatOverviewLabel = (value) => {
  return String(value || '').replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
};

export const buildSignalStack = (eventDetail, payload) => {
  const chips = [];

  if (eventDetail.event_phase && eventDetail.event_phase !== 'off_cycle_universe') {
    chips.push({ id: 'catalyst', label: 'Catalyst', state: 'constructive', value: eventDetail.event_phase.replace(/_/g, ' ') });
  }

  const peer = eventDetail.peer_readthrough || {};
  if (peer.incoming?.length > 0 || peer.outgoing_candidates?.length > 0) {
    chips.push({ id: 'peer', label: 'Peer Repricing', state: 'strong', value: 'Detected' });
  }

  const pulse = deriveThesisPulse(eventDetail, payload);
  chips.push({ id: 'pulse', label: 'Thesis Pulse', state: pulse.state === 'Evidence Improving' ? 'strong' : pulse.state === 'Challenged' ? 'warning' : 'neutral', value: pulse.state });

  return chips.slice(0, 5);
};

export const buildResearchKillSwitch = (eventDetail, payload) => {
  const watchpoints = [];
  if (eventDetail.fundamental_evidence?.status === 'available') {
    watchpoints.push("Company fundamentals are available; research case still needs revision, valuation, and dilution confirmation.");
  } else {
    watchpoints.push("Fundamental coverage remains pending until revisions, margins, or company-specific evidence improve.");
  }

  if (eventDetail.pead_signal?.status === 'available') {
    watchpoints.push("Post-earnings move fully retraces.");
  }

  const peer = eventDetail.peer_readthrough || {};
  if (peer.incoming?.length > 0) {
    watchpoints.push("Peer basket fails to confirm the repricing theme.");
  }

  return watchpoints.slice(0, 4);
};

export const buildPriceTrendRisk = (eventDetail, payload) => {
  const watchpoints = [];
  watchpoints.push("Move quality deteriorates if MA200 or relative strength weakens.");
  return watchpoints;
};

export const buildEvidenceBoard = (eventDetail, payload) => {
  const evidenceList = [];

  const pulse = deriveThesisPulse(eventDetail, payload);
  const isMomentumUniverse = eventDetail.status === 'momentum_universe' || eventDetail.event_phase === 'off_cycle_universe';

  if (eventDetail.momentum_evidence?.status === 'available') {
    const metrics = eventDetail.momentum_evidence.evidence || {};
    evidenceList.push({
      evidence: 'Momentum',
      signal: `Score ${eventDetail.momentum_evidence.score || 'Not Included'}; Z ${metrics.zscore_200d ? Number(metrics.zscore_200d).toFixed(2) : 'Not Included'}`,
      interpretation: 'Relative strength compared to scanner universe.',
      coverage: 'Available',
      priority: 1
    });
  }

  if (eventDetail.pead_signal?.status === 'available') {
    const reaction = eventDetail.pead_signal.reaction || {};
    evidenceList.push({
      evidence: 'Event Reaction',
      signal: `${eventDetail.pead_signal.direction} ${formatSignedPct(reaction.t1_return)}`,
      interpretation: 'Post-catalyst drift and repricing continuation.',
      coverage: 'Available',
      priority: 2
    });
  }

  const eventStudy = eventDetail.post_earnings_base_rate || {};
  if (eventStudy.status === 'available') {
    evidenceList.push({
      evidence: 'Event Study',
      signal: `T+10 Drift ${formatSignedPct(eventStudy.median_t10_return_pct)} (N=${eventStudy.similar_reaction_sample_size || eventStudy.sample_size})`,
      interpretation: 'Historical post-event profile.',
      coverage: 'Available',
      priority: 3
    });
  }

  const peer = eventDetail.peer_readthrough || {};
  if (peer.status === 'available' && (peer.incoming?.length > 0 || peer.outgoing_candidates?.length > 0)) {
    evidenceList.push({
      evidence: 'Peer Read-Through',
      signal: `${peer.incoming?.length || 0} incoming, ${peer.outgoing_candidates?.length || 0} outgoing`,
      interpretation: 'Theme-level context only; company-specific evidence remains pending.',
      coverage: peer.incoming?.length > 0 ? 'Available' : 'Partial',
      priority: 4
    });
  }

  if (eventDetail.thesis_lifecycle?.review_state?.reviewed) {
    evidenceList.push({
      evidence: 'Thesis Notes',
      signal: 'Reviewed off-cycle thesis',
      interpretation: 'Human-reviewed thesis exists.',
      coverage: 'Available',
      priority: 5
    });
  }

  // Sort by priority
  return evidenceList.sort((a, b) => a.priority - b.priority);
};

export const buildMomentumUniverseSyntheticDetail = (ticker, payload) => {
  const ranking = (payload?.momentum_universe?.rankings || []).find(r => r.ticker === ticker);
  if (!ranking) return null;
  return {
    event_id: `${ticker}-MomentumUniverse`,
    ticker,
    event_phase: "off_cycle_universe",
    event_category: "Momentum Universe",
    status: "momentum_universe",
    trend_setup: ranking.trend_setup || {},
    momentum_evidence: {
      ...ranking.momentum_evidence,
      industry_theme: ranking.industry_theme,
      industry_theme_label: ranking.industry_theme_label,
      regime: ranking.regime,
      score: ranking.score,
      universe_rank: ranking.rank,
      theme_rank: ranking.theme_rank,
      universe_count: payload?.momentum_universe?.ranked_count,
      evidence: {
        ...(ranking.momentum_evidence?.evidence || {}),
        ...((ranking.trend_setup || {}).metrics || {})
      }
    },
    trust_layer: {
      data_source: "momentum_universe",
      event_date_status: "not_applicable",
      missing_fields: []
    },
    fundamental_evidence: ranking.fundamental_evidence || {
      status: 'not_available',
      knowledge_timestamp: null,
      period_end_date: null,
      vendor_source: null,
      sector_compatible: null,
      metrics: {
        revenue_growth_yoy: null,
        gross_margin: null,
        operating_margin: null,
        fcf_margin: null,
        debt_to_equity: null
      }
    }
  };
};

export const buildDossierRecords = (payload) => {
  if (!payload) return [];

  const tickerMap = new Map();

  const getOrCreate = (ticker) => {
    const norm = normalizeTicker(ticker);
    if (!tickerMap.has(norm)) {
      tickerMap.set(norm, {
        ticker: norm,
        companyName: null,
        primaryEventDetail: null,
        secondaryContexts: {
          momentumUniverse: null,
          offCycleThesis: null,
          trackedReview: null,
        },
        sources: new Set(),
        priorityScore: 0
      });
    }
    return tickerMap.get(norm);
  };

  Object.entries(payload.events_detail || {}).forEach(([eventId, detail]) => {
    const rec = getOrCreate(detail.ticker);
    if (!rec.companyName && detail.company_name) rec.companyName = detail.company_name;

    let score = 150; // default unknown real event

    if (payload.radar_lists?.post_earnings?.pead_watch?.includes(eventId) ||
        payload.radar_lists?.post_earnings?.top_opportunities?.includes(eventId) ||
        payload.radar_lists?.post_earnings?.top_risk_alerts?.includes(eventId) ||
        payload.radar_lists?.post_earnings?.trend_pullbacks?.includes(eventId)) {
      rec.sources.add('post_earnings');
      score = Math.max(score, 400);
    }

    if (payload.radar_lists?.off_cycle_watch?.thesis_watch?.includes(eventId)) {
      rec.sources.add('off_cycle');
      rec.secondaryContexts.offCycleThesis = detail;
      score = Math.max(score, 200);
    }
    if (payload.radar_lists?.tracked?.reviewed_watch?.includes(eventId)) {
      rec.sources.add('tracked');
      rec.secondaryContexts.trackedReview = detail;
      score = Math.max(score, 220);
    }

    if (detail.event_phase === 'event_day') score = Math.max(score, 300);
    else if (detail.event_phase === 'pre_earnings') score = Math.max(score, 250);

    if (score > rec.priorityScore) {
       rec.priorityScore = score;
       rec.primaryEventDetail = detail;
    }
  });

  (payload.momentum_universe?.rankings || []).forEach(ranking => {
    const rec = getOrCreate(ranking.ticker);
    rec.sources.add('momentum_universe');
    const synthetic = buildMomentumUniverseSyntheticDetail(ranking.ticker, payload);
    rec.secondaryContexts.momentumUniverse = synthetic;

    if (100 > rec.priorityScore) {
      rec.priorityScore = 100;
      rec.primaryEventDetail = synthetic;
    }
  });

  const results = Array.from(tickerMap.values()).map(rec => {
    const primary = rec.primaryEventDetail;
    const momentum = primary?.momentum_evidence || rec.secondaryContexts.momentumUniverse?.momentum_evidence || {};
    const trend = primary?.trend_setup || rec.secondaryContexts.momentumUniverse?.trend_setup || {};

    const theme = momentum.industry_theme_label || momentum.industry_theme || trend.supply_chain_stage || null;

    let researchState = 'Catalyst Watch';
    if (rec.sources.has('post_earnings')) researchState = 'Post-Earnings Watch';
    else if (rec.sources.has('off_cycle')) researchState = 'Between Catalysts';
    else if (rec.sources.has('momentum_universe') && !rec.sources.has('tracked')) researchState = 'Momentum Candidate';
    else if (rec.sources.has('tracked')) researchState = 'Tracked Thesis';

    const pulse = deriveThesisPulse(primary, payload);
    const missing = primary?.trust_layer?.missing_fields || [];
    const meaningfulMissing = missing.filter(field => field !== 'options_data' && field !== 'options_chain');

    let coverage = 'Coverage Pending';
    if (meaningfulMissing.length === 0) {
      if (primary) coverage = 'Market Evidence Available';
    } else {
      coverage = `Data Partial (${meaningfulMissing.length})`;
    }

    let moveType = 'Move Type Pending';
    if (primary?.pead_signal?.status === 'available') {
       const t = primary.pead_signal.reaction?.current_post_return;
       if (t !== undefined && t !== null) moveType = `Post ${t > 0 ? '+' : ''}${t.toFixed(1)}%`;
    } else if (momentum.evidence?.ma200_slope_pct !== undefined) {
       const t = momentum.evidence.ma200_slope_pct;
       moveType = `MA200 ${t > 0 ? '+' : ''}${t.toFixed(1)}%`;
    }

    rec.derivedState = {
      theme,
      researchState,
      moveType,
      pulseState: pulse.state,
      coverage
    };

    return rec;
  });

  return results.sort((a, b) => {
    const scoreA = a.primaryEventDetail?.momentum_evidence?.score || 0;
    const scoreB = b.primaryEventDetail?.momentum_evidence?.score || 0;
    if (scoreA !== scoreB) return scoreB - scoreA;
    return a.ticker.localeCompare(b.ticker);
  });
};
