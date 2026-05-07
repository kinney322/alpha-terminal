export const normalizeTicker = (t) => String(t || '').trim().toUpperCase();

const formatSignedPct = (value) => {
  if (value === undefined || value === null || Number.isNaN(Number(value))) return 'Not Included';
  const n = Number(value);
  return `${n > 0 ? '+' : ''}${n.toFixed(1)}%`;
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
    return { state: 'Evidence Improving', reason: 'Market evidence is constructive; fundamental coverage remains pending.' };
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

export const buildSignalStack = (eventDetail, payload) => {
  const chips = [];

  if (eventDetail.event_phase && eventDetail.event_phase !== 'off_cycle_universe') {
    chips.push({ id: 'catalyst', label: 'Catalyst', state: 'constructive', value: eventDetail.event_phase.replace(/_/g, ' ') });
  }

  const rank = eventDetail.momentum_evidence?.score;
  if (rank !== undefined) {
    chips.push({ id: 'momentum', label: 'Momentum Score', state: 'strong', value: String(rank) });
  }

  if (eventDetail.post_earnings_base_rate?.status === 'available') {
    chips.push({ id: 'event_study', label: 'Event Study', state: 'neutral', value: 'Matched' });
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
  watchpoints.push("Fundamental coverage remains pending until revisions, margins, or company-specific evidence improve.");

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
