const formatSignedPct = (value) => {
  if (value === undefined || value === null || Number.isNaN(Number(value))) return '--';
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
    return { state: 'Challenged', reason: 'Price has lost key MA200 baseline.' };
  }

  if (isReviewed && (isAboveMA200 === false || isRSConstructive === false)) {
    return { state: 'Diverging', reason: 'Thesis remains active but momentum is weakening.' };
  }

  const peer = eventDetail.peer_readthrough || {};
  const hasConstructivePeer = (peer.incoming?.length > 0 || peer.outgoing_candidates?.length > 0);
  const eventStudy = eventDetail.post_earnings_base_rate || {};
  const isEventStudyConstructive = (eventStudy.continuation_rate > 0.5 || eventStudy.reversal_rate > 0.5);

  if (momentum.status === 'available' && isAboveMA200 === true && isRSConstructive === true && (hasConstructivePeer || isEventStudyConstructive)) {
    return { state: 'Confirming', reason: 'Momentum, trend, and peer/event evidence are constructive.' };
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
    verdict = `${eventDetail.ticker} is a top-ranked ${theme.toLowerCase()} momentum candidate; next validation comes from catalyst follow-through and peer confirmation.`;
  } else if (eventDetail.pead_signal?.status === 'available') {
    verdict = `Post-earnings price action indicates market repricing, supported by available trend evidence.`;
  } else {
    verdict = `Monitoring ${eventDetail.ticker} for setup confirmation around its catalyst window.`;
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
  chips.push({ id: 'pulse', label: 'Thesis Pulse', state: pulse.state === 'Confirming' ? 'strong' : pulse.state === 'Challenged' ? 'warning' : 'neutral', value: pulse.state });

  return chips.slice(0, 5);
};

export const buildInvalidationWatch = (eventDetail, payload) => {
  const watchpoints = [];
  watchpoints.push("Price loses MA200 baseline or relative strength turns negative.");
  watchpoints.push("Momentum rank deteriorates materially compared to peers.");

  if (eventDetail.pead_signal?.status === 'available') {
    watchpoints.push("Post-earnings move fully retraces.");
  }

  const peer = eventDetail.peer_readthrough || {};
  if (peer.incoming?.length > 0) {
    watchpoints.push("Peer basket fails to confirm the repricing theme.");
  }

  return watchpoints.slice(0, 4);
};

export const buildEvidenceBoard = (eventDetail, payload) => {
  const evidenceList = [];

  const pulse = deriveThesisPulse(eventDetail, payload);
  const isMomentumUniverse = eventDetail.status === 'momentum_universe' || eventDetail.event_phase === 'off_cycle_universe';

  if (eventDetail.momentum_evidence?.status === 'available') {
    const metrics = eventDetail.momentum_evidence.evidence || {};
    evidenceList.push({
      evidence: 'Momentum',
      signal: `Score ${eventDetail.momentum_evidence.score || '--'}; Z ${metrics.zscore_200d ? Number(metrics.zscore_200d).toFixed(2) : '--'}`,
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
      interpretation: 'Theme-level confirmation or contradiction.',
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
