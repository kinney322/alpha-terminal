import React, { useState } from 'react';

const getPeadDisplay = (peadSignal) => {
  const direction = peadSignal?.direction;
  const reaction = peadSignal?.reaction || {};
  const t1 = Number(reaction.t1_return);
  const current = Number(reaction.current_post_return);

  if (!direction || Number.isNaN(t1) || Number.isNaN(current)) {
    return { label: 'Unavailable', tone: 'neutral' };
  }

  const currentTone = current > 0 ? 'bullish' : current < 0 ? 'bearish' : 'neutral';

  if (direction === 'drift') {
    if (currentTone === 'bullish') return { label: 'Bullish Continuation', tone: 'bullish' };
    if (currentTone === 'bearish') return { label: 'Bearish Continuation', tone: 'bearish' };
    return { label: 'Neutral Continuation', tone: 'neutral' };
  }

  if (direction === 'fade') {
    if (currentTone === 'bullish') return { label: 'Bullish Reversal', tone: 'bullish' };
    if (currentTone === 'bearish') return { label: 'Bearish Reversal', tone: 'bearish' };
    return { label: 'Neutral Reversal', tone: 'neutral' };
  }

  return { label: 'Neutral', tone: 'neutral' };
};

const formatLifecycleTime = (value) => {
  if (!value) return '--';
  try {
    const d = new Date(value);
    if (isNaN(d.getTime())) return '--';
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
      timeZone: 'America/New_York',
      timeZoneName: 'short',
    }).format(d);
  } catch (e) {
    return '--';
  }
};

const STATUS_MAPPING = {
  new: 'New',
  active: 'Active',
  event_day: 'Event Day',
  post_event_watch: 'Post-event Watch',
  dropped: 'Dropped',
  expired: 'Expired',
};

const ThesisLifecyclePanel = ({ eventDetail }) => {
  const lifecycle = eventDetail?.thesis_lifecycle;
  if (!lifecycle) return null;

  const displayStatus = STATUS_MAPPING[lifecycle.status] || 'Unknown';
  
  return (
    <div className="thesis-lifecycle-panel card">
      <h3>Thesis Lifecycle</h3>
      <div className="grid-2col">
        <div><strong>Status:</strong> {displayStatus}</div>
        <div><strong>Phase:</strong> {lifecycle.phase || '--'}</div>
        <div><strong>First Detected:</strong> {formatLifecycleTime(lifecycle.first_detected_at)}</div>
        <div><strong>Last Seen:</strong> {formatLifecycleTime(lifecycle.last_seen_at)}</div>
        <div><strong>Status Changed:</strong> {formatLifecycleTime(lifecycle.status_changed_at)}</div>
        <div><strong>Review State:</strong> {lifecycle.review_state?.reviewed ? 'Reviewed' : 'Not Reviewed'}</div>
      </div>
      {lifecycle.review_state?.notes && (
        <div style={{ marginTop: '12px', fontSize: '0.9em' }}>
          <strong>Notes:</strong> {lifecycle.review_state.notes}
        </div>
      )}
    </div>
  );
};

const OffCycleWatchPanel = ({ eventDetail }) => {
  if (eventDetail.status !== 'off_cycle_watch' && eventDetail.event_phase !== 'off_cycle') return null;

  const lifecycle = eventDetail.thesis_lifecycle || {};
  const reason = eventDetail.off_cycle_reason || {};
  const review = lifecycle.review_state || {};
  
  const formatLabel = (val) => val ? val.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase()) : '--';

  return (
    <div className="off-cycle-panel card">
      <h3>Off-Cycle Thesis Watch</h3>
      <div className="grid-2col">
        <div><strong>Status:</strong> {formatLabel(eventDetail.status)}</div>
        <div><strong>Source:</strong> {formatLabel(eventDetail.source)}</div>
        <div><strong>Reason Labels:</strong> {reason.labels?.length ? reason.labels.map(l => formatLabel(l)).join(', ') : '--'}</div>
        <div><strong>Review State:</strong> {review.reviewed ? 'Reviewed' : 'Not Reviewed'}</div>
        <div><strong>Last Seen:</strong> {formatLifecycleTime(lifecycle.last_seen_at)}</div>
        <div><strong>Status Changed:</strong> {formatLifecycleTime(lifecycle.status_changed_at)}</div>
      </div>
      {review.notes && (
        <div style={{ marginTop: '16px', fontSize: '0.9em' }}>
          <strong>Notes:</strong>
          <div style={{ whiteSpace: 'pre-wrap', marginTop: '8px', background: 'var(--surface-color, #fff)', padding: '12px', borderRadius: '6px', border: '1px solid var(--border-light)' }}>
            {review.notes}
          </div>
        </div>
      )}
    </div>
  );
};

// Placeholder Components
const HistoricalEarningsTapePanel = ({ eventDetail }) => {
  const tape = eventDetail?.historical_earnings_tape;

  if (!tape || tape.status !== 'available' || !tape.rows || tape.rows.length === 0) {
    return (
      <div className="historical-earnings-tape-panel card">
        <h3>Historical Earnings Tape</h3>
        <div className="warning-text">No completed earnings tape available.</div>
      </div>
    );
  }

  const formatSurpriseLabel = (label) => {
    if (!label) return 'Unknown';
    const l = label.toLowerCase();
    if (l === 'beat') return 'Beat';
    if (l === 'miss') return 'Miss';
    if (l === 'inline') return 'Inline';
    return 'Unknown';
  };

  const getReturnColor = (val) => {
    if (val == null) return 'var(--text-muted)';
    if (val > 0) return 'var(--text-green, #4caf50)';
    if (val < 0) return 'var(--text-red, #f44336)';
    return 'inherit';
  };

  const formatPct = (val) => val != null ? `${val.toFixed(1)}%` : '--';

  return (
    <div className="historical-earnings-tape-panel card">
      <h3>Historical Earnings Tape</h3>
      <div className="grid-2col" style={{ marginBottom: '16px', fontSize: '0.9em', color: 'var(--text-muted)' }}>
        <div><strong>Total:</strong> {tape.data_quality?.total_rows || 0}</div>
        <div><strong>Completed:</strong> {tape.data_quality?.completed_rows || 0}</div>
        <div><strong>Shown:</strong> {tape.data_quality?.returned_rows || tape.rows.length}</div>
        <div><strong>Surprise Coverage:</strong> {tape.data_quality?.surprise_rows || 0}</div>
      </div>

      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', textAlign: 'left', borderCollapse: 'collapse', fontSize: '0.9em' }}>
          <thead>
            <tr style={{ borderBottom: '2px solid var(--border-color)', color: 'var(--text-muted)' }}>
              <th style={{ padding: '8px 4px' }}>Date</th>
              <th style={{ padding: '8px 4px' }}>Result</th>
              <th style={{ padding: '8px 4px' }}>Est / Actual</th>
              <th style={{ padding: '8px 4px' }}>Surprise</th>
              <th style={{ padding: '8px 4px' }}>T+1</th>
              <th style={{ padding: '8px 4px' }}>T+10</th>
              <th style={{ padding: '8px 4px' }}>Max Risk</th>
              <th style={{ padding: '8px 4px' }}>Max Reward</th>
            </tr>
          </thead>
          <tbody>
            {tape.rows.map((r, idx) => (
              <tr key={idx} style={{ borderBottom: '1px solid var(--border-light)' }}>
                <td style={{ padding: '8px 4px' }}>{r.event_date}</td>
                <td style={{ padding: '8px 4px', fontWeight: 'bold' }}>{formatSurpriseLabel(r.surprise_label)}</td>
                <td style={{ padding: '8px 4px', color: 'var(--text-muted)' }}>
                  {r.eps_estimate != null ? r.eps_estimate.toFixed(2) : '--'} / {r.actual_eps != null ? r.actual_eps.toFixed(2) : '--'}
                </td>
                <td style={{ padding: '8px 4px', color: getReturnColor(r.surprise_percent) }}>{formatPct(r.surprise_percent)}</td>
                <td style={{ padding: '8px 4px', color: getReturnColor(r.t1_return) }}>{formatPct(r.t1_return)}</td>
                <td style={{ padding: '8px 4px', color: getReturnColor(r.t10_return) }}>{formatPct(r.t10_return)}</td>
                <td style={{ padding: '8px 4px', color: 'var(--text-muted)' }}>{formatPct(r.max_drawdown_5d)}</td>
                <td style={{ padding: '8px 4px', color: 'var(--text-muted)' }}>{formatPct(r.max_favorable_excursion_5d)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const PostEarningsBaseRatePanel = ({ eventDetail }) => {
  if (eventDetail.event_phase !== 'post_earnings') {
    return null;
  }

  const baseRate = eventDetail.post_earnings_base_rate;
  const hasValue = (value) => value !== null && value !== undefined && !Number.isNaN(Number(value));
  const formatRate = (value) => hasValue(value) ? `${(Number(value) * 100).toFixed(1)}%` : 'Unknown';
  const formatPct = (value) => hasValue(value) ? `${Number(value).toFixed(1)}%` : 'Unknown';
  const formatFilter = (value) => {
    if (!value) return 'Unknown';
    return value.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
  };

  if (!baseRate || baseRate.status !== 'available') {
    return (
      <div className="pead-panel card">
        <h3>Post-Earnings Base Rate</h3>
        <div className="warning-text">No comparable post-earnings base rate available.</div>
      </div>
    );
  }
  
  return (
    <div className="pead-panel card">
      <h3>Post-Earnings Base Rate</h3>
      <div className="grid-2col">
        <div><strong>Sample Size:</strong> {baseRate.similar_reaction_sample_size ?? 'Unknown'}</div>
        <div><strong>Filter:</strong> {formatFilter(baseRate.filter_mode)}</div>
        <div><strong>Continuation Rate:</strong> {formatRate(baseRate.continuation_rate ?? baseRate.drift_rate)}</div>
        <div><strong>Reversal Rate:</strong> {formatRate(baseRate.reversal_rate ?? baseRate.fade_rate)}</div>
        <div><strong>Median T+1:</strong> {formatPct(baseRate.median_t1_return_pct)}</div>
        <div><strong>Median T+10:</strong> {formatPct(baseRate.median_t10_return_pct)}</div>
        <div><strong>Median T+1 → T+10:</strong> {formatPct(baseRate.median_t1_to_t10_return_pct)}</div>
        <div><strong>Median Max Risk (5D):</strong> {formatPct(baseRate.median_max_risk_5d)}</div>
        <div><strong>Median Max Reward (5D):</strong> {formatPct(baseRate.median_max_reward_5d)}</div>
        {baseRate.sample_warning && (
          <div className="warning-text"><strong>Warning:</strong> {formatFilter(baseRate.sample_warning)}</div>
        )}
      </div>
      <div style={{ marginTop: '12px', fontSize: '0.85em', color: 'var(--text-muted)' }}>
        5D = five trading days after the earnings event. Continuation/Reversal is measured from T+1 close to T+10, excluding the current event row.
      </div>
    </div>
  );
};

const SpilloverWatchPanel = ({ eventDetail }) => {
  if (!eventDetail.spillover_watch?.has_spillover || !eventDetail.spillover_watch?.peers?.length) {
    return (
      <div className="spillover-panel card">
        <h3>Spillover Watch</h3>
        <div className="warning-text">No significant peer sympathy risk mapped.</div>
      </div>
    );
  }

  return (
    <div className="spillover-panel card">
      <h3>Spillover Watch</h3>
      <ul className="spillover-list">
        {eventDetail.spillover_watch.peers.map((peer, idx) => (
          <li key={idx}>
            <strong>{peer.ticker}</strong> - {peer.reason}
            <div style={{ fontSize: '0.85em', color: 'var(--text-muted)' }}>
              Avg T+1 Reaction: {peer.avg_peer_t1_move !== undefined ? (peer.avg_peer_t1_move * 100).toFixed(1) + '%' : 'Unknown'} (N={peer.historical_peer_reaction_sample_size || 'Unknown'})
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

const HistoricalSetupMatrixPanel = ({ eventDetail }) => {
  const matrix = eventDetail?.historical_setup_matrix;
  
  if (!matrix || matrix.status === 'unavailable') {
    return null;
  }

  const formatSampleWarning = (warning) => {
    if (!warning) return null;
    const known = {
      very_low_sample: 'Very Low Sample',
      low_sample: 'Low Sample',
      insufficient_surprise_data: 'Insufficient Surprise Data',
    };
    return known[warning] || warning.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
  };

  const renderBucket = (label, bucket) => {
    if (!bucket) return null;
    if (bucket.status === 'insufficient_data') {
      return (
        <tr key={label} style={{ borderBottom: '1px solid var(--border-light)' }}>
          <td style={{ padding: '8px 4px' }}>{label}</td>
          <td colSpan="5" style={{ padding: '8px 4px', textAlign: 'center', color: 'var(--text-muted)' }}>Insufficient Surprise Data</td>
        </tr>
      );
    }
    
    const count = bucket.count ?? 0;
    if (count === 0) {
      return (
        <tr key={label} style={{ borderBottom: '1px solid var(--border-light)' }}>
          <td style={{ padding: '8px 4px' }}>{label}</td>
          <td colSpan="5" style={{ padding: '8px 4px', textAlign: 'center', color: 'var(--text-muted)' }}>No Samples</td>
        </tr>
      );
    }

    return (
      <tr key={label} style={{ borderBottom: '1px solid var(--border-light)' }}>
        <td style={{ padding: '8px 4px' }}>
          {label}
          {bucket.sample_warning && (
            <div style={{ marginTop: '4px' }}>
              <span className="risk-flag-mini">{formatSampleWarning(bucket.sample_warning)}</span>
            </div>
          )}
        </td>
        <td style={{ padding: '8px 4px' }}>{count}</td>
        <td style={{ padding: '8px 4px' }}>{bucket.win_rate != null ? bucket.win_rate.toFixed(1) + '%' : '-'}</td>
        <td style={{ padding: '8px 4px' }}>{bucket.avg_t10 != null ? bucket.avg_t10.toFixed(1) + '%' : '-'}</td>
        <td style={{ padding: '8px 4px' }}>{bucket.avg_max_dd_5 != null ? bucket.avg_max_dd_5.toFixed(1) + '%' : '-'}</td>
        <td style={{ padding: '8px 4px' }}>{bucket.avg_mfe_5 != null ? bucket.avg_mfe_5.toFixed(1) + '%' : '-'}</td>
      </tr>
    );
  };

  return (
    <div className="historical-setup-matrix-panel card">
      <h3>True Historical Setup Matrix</h3>
      {matrix.status === 'insufficient_sample' && (
        <div className="warning-text" style={{marginBottom: '12px'}}>Warning: Insufficient total samples for reliable statistical baseline.</div>
      )}
      
      <div className="grid-2col" style={{marginBottom: '16px', fontSize: '0.9em', color: 'var(--text-muted)'}}>
        <div><strong>Total Samples:</strong> {matrix.data_quality?.total_rows || 0}</div>
        <div><strong>Surprise Coverage:</strong> {matrix.data_quality?.surprise_coverage_pct || 0}%</div>
        {matrix.data_quality?.coverage_warning && (
          <div className="warning-text" style={{gridColumn: '1 / -1', marginTop: '4px'}}>
            <strong>Warning:</strong> {matrix.data_quality.coverage_warning}
          </div>
        )}
      </div>

      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', textAlign: 'left', borderCollapse: 'collapse', fontSize: '0.9em' }}>
          <thead>
            <tr style={{ borderBottom: '2px solid var(--border-color)', color: 'var(--text-muted)' }}>
              <th style={{ padding: '8px 4px' }}>Setup Bucket</th>
              <th style={{ padding: '8px 4px' }}>N</th>
              <th style={{ padding: '8px 4px' }}>Win Rate</th>
              <th style={{ padding: '8px 4px' }}>Avg 10D Return</th>
              <th style={{ padding: '8px 4px' }}>Max Risk (5D)</th>
              <th style={{ padding: '8px 4px' }}>Max Reward (5D)</th>
            </tr>
          </thead>
          <tbody>
            {renderBucket('High Runup (>=3%)', matrix.single_factor?.high_runup)}
            {renderBucket('Low Runup (<3%)', matrix.single_factor?.low_runup)}
            {renderBucket('Positive Surprise', matrix.single_factor?.positive_surprise)}
            {renderBucket('Negative Surprise', matrix.single_factor?.negative_surprise)}
            {renderBucket('High Surprise + Low Runup', matrix.cross_setup?.high_surprise_low_runup)}
            {renderBucket('High Runup + Weak Surprise', matrix.cross_setup?.high_runup_negative_or_weak_surprise)}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const RowLevelAuditTrail = ({ eventDetail }) => (
  <div className="audit-trail-panel card">
    <h3>Row-Level Audit Trail</h3>
    <div className="warning-text">Historical raw earnings data logs for verification (Coming Soon)</div>
  </div>
);

const PostEarningsReactionPanel = ({ eventDetail }) => {
  if (eventDetail.pead_signal?.status !== 'available') {
    return (
      <div className="pead-reaction-panel card">
        <h3>Post-Earnings Reaction</h3>
        <div className="warning-text">No completed post-earnings reaction signal available.</div>
      </div>
    );
  }

  const reaction = eventDetail.pead_signal.reaction || {};
  const peadDisplay = getPeadDisplay(eventDetail.pead_signal);
  const toneColor = peadDisplay.tone === 'bullish'
    ? 'var(--text-green, #4caf50)'
    : peadDisplay.tone === 'bearish'
      ? 'var(--text-red, #f44336)'
      : 'inherit';

  const normalizePct = (value) => {
    if (value === undefined || value === null || Number.isNaN(Number(value))) return null;
    const n = Number(value);
    return Math.abs(n) <= 1.0 && n !== 0 ? n * 100 : n;
  };
  const formatPct = (value) => {
    const n = normalizePct(value);
    if (n === null) return '--';
    return `${n > 0 ? '+' : ''}${n.toFixed(1)}%`;
  };
  const getReturnColor = (value) => {
    const n = normalizePct(value);
    if (n === null || n === 0) return 'inherit';
    return n > 0 ? 'var(--text-green, #4caf50)' : 'var(--text-red, #f44336)';
  };

  return (
    <div className={`pead-reaction-panel card strength-${eventDetail.pead_signal.strength?.toLowerCase()}`}>
      <h3>Post-Earnings Reaction</h3>
      <div className="reaction-summary-grid">
        <div>
          <span className="panel-kicker">Signal</span>
          <strong style={{ color: toneColor }}>{peadDisplay.label}</strong>
        </div>
        <div>
          <span className="panel-kicker">Strength</span>
          <strong style={{ textTransform: 'capitalize' }}>{eventDetail.pead_signal.strength || '--'}</strong>
        </div>
        <div>
          <span className="panel-kicker">Current</span>
          <strong style={{ color: getReturnColor(reaction.current_post_return) }}>{formatPct(reaction.current_post_return)}</strong>
        </div>
      </div>

      <div className="panel-note">
        <strong>Reason:</strong> {eventDetail.pead_signal.reason}
      </div>

      <div style={{ overflowX: 'auto' }}>
        <table className="compact-metric-table">
          <thead>
            <tr>
              <th>Result</th>
              <th>Surprise</th>
              <th>T+1</th>
              <th>Current</th>
              <th>Max Risk (5D)</th>
              <th>Max Reward (5D)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ fontWeight: 'bold', textTransform: 'capitalize' }}>{reaction.surprise_label || 'Unknown'}</td>
              <td style={{ color: getReturnColor(reaction.surprise_percent) }}>{formatPct(reaction.surprise_percent)}</td>
              <td style={{ color: getReturnColor(reaction.t1_return) }}>{formatPct(reaction.t1_return)}</td>
              <td style={{ color: getReturnColor(reaction.current_post_return) }}>{formatPct(reaction.current_post_return)}</td>
              <td>{formatPct(reaction.max_drawdown_5d)}</td>
              <td>{formatPct(reaction.max_favorable_excursion_5d)}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

const TrendSetupPanel = ({ eventDetail }) => {
  const setup = eventDetail?.trend_setup;
  
  if (!setup || setup.status !== 'available') {
    return (
      <div className="trend-setup-panel card">
        <h3>Trend Setup Layer</h3>
        <div className="warning-text" style={{ color: 'var(--text-muted)' }}>No trend setup available.</div>
      </div>
    );
  }

  const formatLabel = (val) => val ? val.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase()) : '--';

  return (
    <div className="trend-setup-panel card">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
        <h3>Trend Setup Layer</h3>
        <span className={`badge-${setup.stage}`} style={{ padding: '4px 8px', borderRadius: '4px', fontWeight: 'bold', fontSize: '0.85em' }}>
          {formatLabel(setup.stage)}
        </span>
      </div>
      
      <div className="reaction-summary-grid" style={{ gridTemplateColumns: 'repeat(4, minmax(0, 1fr))' }}>
        <div>
          <span className="panel-kicker">Supply Chain</span>
          <strong>{formatLabel(setup.supply_chain_stage)}</strong>
        </div>
        <div>
          <span className="panel-kicker">Setup Score</span>
          <strong>{setup.score ?? '--'}</strong>
        </div>
        <div>
          <span className="panel-kicker">Range Duration</span>
          <strong>{setup.metrics?.base_duration_days ?? '--'} Trading Days</strong>
        </div>
        <div>
          <span className="panel-kicker">Base Quality</span>
          <strong>{formatLabel(setup.base_quality?.label ?? 'Not Classified')}</strong>
        </div>
      </div>

      <div className="panel-note">
        <strong>Explanation:</strong> {setup.explanation}
      </div>
      <div className="panel-note" style={{ fontSize: '0.85em', marginTop: '-8px' }}>
        <em>Range Duration measures how long price stayed in a contained 52W range. It does not by itself imply a bullish base.</em>
      </div>

      {setup.setup_tags?.length > 0 && (
        <div style={{ marginBottom: '16px' }}>
          {setup.setup_tags.map((tag, i) => (
            <span key={i} className="quality-pill" style={{ background: 'rgba(37,99,235,0.1)', color: '#1d4ed8', borderColor: '#bfdbfe' }}>{tag}</span>
          ))}
        </div>
      )}

      <div className="grid-2col" style={{ fontSize: '0.95em' }}>
        <div><strong>MA200 Slope:</strong> {setup.metrics?.ma200_slope_pct != null ? setup.metrics.ma200_slope_pct.toFixed(1) + '%' : '--'}</div>
        <div><strong>Z-Score 200D:</strong> {setup.metrics?.zscore_200d != null ? setup.metrics.zscore_200d.toFixed(2) : '--'}</div>
        <div><strong>Days &gt; 200MA + 1.5σ Band:</strong> {setup.metrics?.days_above_upper_band_60d ?? '--'}</div>
        <div><strong>52W Range Position (0=Low, 1=High):</strong> {setup.metrics?.range_position_52w != null ? setup.metrics.range_position_52w.toFixed(2) : '--'}</div>
        <div><strong>RS vs SPY (63D):</strong> {setup.metrics?.relative_strength_vs_spy_63d != null ? setup.metrics.relative_strength_vs_spy_63d.toFixed(1) + '%' : '--'}</div>
        <div><strong>RS vs QQQ (63D):</strong> {setup.metrics?.relative_strength_vs_qqq_63d != null ? setup.metrics.relative_strength_vs_qqq_63d.toFixed(1) + '%' : '--'}</div>
        <div><strong>Latest Close:</strong> {setup.metrics?.latest_close != null ? setup.metrics.latest_close.toFixed(2) : '--'}</div>
        <div><strong>MA200 / Upper Band:</strong> {setup.metrics?.ma200 != null ? setup.metrics.ma200.toFixed(2) : '--'} / {setup.metrics?.upper_band_200d_1_5sigma != null ? setup.metrics.upper_band_200d_1_5sigma.toFixed(2) : '--'}</div>
      </div>
    </div>
  );
};

// Main Component
const SelectedCatalystIntelligence = ({ eventDetail, onClose }) => {
  const [activeDetailTab, setActiveDetailTab] = useState('reaction');

  if (!eventDetail) return null;

  const lifecycle = eventDetail?.thesis_lifecycle;
  const displayStatus = lifecycle ? (STATUS_MAPPING[lifecycle.status] || 'Unknown') : null;
  const hasPostEarningsSignal = eventDetail.pead_signal?.status === 'available';
  const peadDisplay = hasPostEarningsSignal ? getPeadDisplay(eventDetail.pead_signal) : null;
  const reaction = eventDetail.pead_signal?.reaction || {};
  const detailTabs = hasPostEarningsSignal
    ? [
        { id: 'reaction', label: 'Reaction' },
        { id: 'trend', label: 'Trend' },
        { id: 'history', label: 'History' },
        { id: 'trust', label: 'Trust' },
      ]
    : [
        { id: 'overview', label: 'Overview' },
        { id: 'trend', label: 'Trend' },
        { id: 'history', label: 'History' },
        { id: 'trust', label: 'Trust' },
      ];
  const currentDetailTab = detailTabs.some(tab => tab.id === activeDetailTab)
    ? activeDetailTab
    : detailTabs[0].id;

  const formatDrawerPct = (value) => {
    if (value === undefined || value === null || Number.isNaN(Number(value))) return '--';
    const n = Number(value);
    return `${n > 0 ? '+' : ''}${n.toFixed(1)}%`;
  };

  const getDrawerReturnColor = (value) => {
    const n = Number(value);
    if (Number.isNaN(n) || n === 0) return 'inherit';
    return n > 0 ? 'var(--text-green, #4caf50)' : 'var(--text-red, #f44336)';
  };

  const renderTrustLayer = () => (
    <div className="trust-layer-status card">
      <h3>Trust Layer Status</h3>
      <div className="grid-2col">
        <div><strong>Event Date:</strong> {eventDetail.event_date} ({eventDetail.event_date_status})</div>
        <div><strong>Timing:</strong> {eventDetail.trust_layer?.earnings_timing || '--'}</div>
        <div><strong>Options Data:</strong> {eventDetail.trust_layer?.options_data_status || '--'}</div>
        <div><strong>Sample Size:</strong> {eventDetail.trust_layer?.sample_size ?? '--'}</div>
        {eventDetail.trust_layer?.missing_fields?.length > 0 && (
          <div className="warning-text"><strong>Missing:</strong> {eventDetail.trust_layer.missing_fields.join(', ')}</div>
        )}
      </div>
    </div>
  );

  const renderMarketState = () => (
    <div className="market-state-panel card">
      <h3>Market State</h3>
      <div className="grid-2col">
        <div><strong>Bias:</strong> <span className={`bias-${eventDetail.market_state?.bias?.toLowerCase()}`}>{eventDetail.market_state?.bias || '--'}</span></div>
        <div><strong>Edge Gap:</strong> {eventDetail.market_state?.edge_gap ?? '--'}</div>
        <div><strong>T-5 Runup Pct:</strong> {eventDetail.market_state?.runup_t5_percentile !== undefined ? eventDetail.market_state?.runup_t5_percentile + '%' : 'Unknown'}</div>
        <div><strong>Vol Pricing:</strong> {eventDetail.market_state?.vol_pricing_status || '--'}</div>
        <div><strong>Liquidity Risk:</strong> {eventDetail.market_state?.liquidity_risk || '--'}</div>
        <div className="risk-flags-container">
          <strong>Risk Flags:</strong>
          {eventDetail.market_state?.risk_flags?.length > 0 ? eventDetail.market_state.risk_flags.map((flag, idx) => (
            <span key={idx} className="risk-flag-mini">{flag}</span>
          )) : <span className="warning-text" style={{display: 'inline-block', margin: 0}}>None</span>}
        </div>
      </div>
    </div>
  );

  const renderExpectedMove = () => (
    <div className="expected-move-panel card">
      <h3>Expected Move</h3>
      {eventDetail.expected_move?.status === 'fresh' ? (
        <div className="grid-2col">
          <div><strong>Value:</strong> {(eventDetail.expected_move.value * 100).toFixed(1)}%</div>
          <div><strong>Method:</strong> {eventDetail.expected_move.method}</div>
          <div><strong>Quote Time:</strong> {new Date(eventDetail.expected_move.quote_timestamp).toLocaleString()}</div>
          <div><strong>Bid-Ask Width:</strong> {(eventDetail.expected_move.bid_ask_width_pct * 100).toFixed(1)}%</div>
        </div>
      ) : (
        <div className="warning-text">Data Unavailable</div>
      )}
    </div>
  );

  return (
    <div className="catalyst-intelligence-panel">
      <div className="panel-header">
        <div className="header-title">
          <h2>{eventDetail.ticker}</h2>
          <span className="phase-badge">{eventDetail.event_phase}</span>
          {displayStatus && (
            <span className="phase-badge" style={{ marginLeft: '8px', opacity: 0.8 }}>
              {displayStatus}
            </span>
          )}
        </div>
        <button className="close-btn" onClick={onClose}>×</button>
      </div>

      <div className="drawer-summary-strip">
        {hasPostEarningsSignal ? (
          <>
            <div>
              <span className="panel-kicker">Signal</span>
              <strong>{peadDisplay.label}</strong>
            </div>
            <div>
              <span className="panel-kicker">T+1</span>
              <strong style={{ color: getDrawerReturnColor(reaction.t1_return) }}>{formatDrawerPct(reaction.t1_return)}</strong>
            </div>
            <div>
              <span className="panel-kicker">Current</span>
              <strong style={{ color: getDrawerReturnColor(reaction.current_post_return) }}>{formatDrawerPct(reaction.current_post_return)}</strong>
            </div>
          </>
        ) : (
          <>
            <div>
              <span className="panel-kicker">Bias</span>
              <strong>{eventDetail.market_state?.bias || '--'}</strong>
            </div>
            <div>
              <span className="panel-kicker">Score</span>
              <strong>{eventDetail.attention_score?.total_score || eventDetail.attention_score || '--'}</strong>
            </div>
            <div>
              <span className="panel-kicker">Event Date</span>
              <strong>{eventDetail.event_date || '--'}</strong>
            </div>
          </>
        )}
      </div>

      <div className="radar-detail-tabs">
        {detailTabs.map(tab => (
          <button
            key={tab.id}
            className={currentDetailTab === tab.id ? 'active' : ''}
            onClick={() => setActiveDetailTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {currentDetailTab === 'reaction' && (
        <>
          <PostEarningsReactionPanel eventDetail={eventDetail} />
          <PostEarningsBaseRatePanel eventDetail={eventDetail} />
        </>
      )}

      {currentDetailTab === 'trend' && (
        <TrendSetupPanel eventDetail={eventDetail} />
      )}

      {currentDetailTab === 'overview' && (
        <>
          <OffCycleWatchPanel eventDetail={eventDetail} />
          {eventDetail.status !== 'off_cycle_watch' && eventDetail.event_phase !== 'off_cycle' && (
            <>
              {renderMarketState()}
              {renderExpectedMove()}
            </>
          )}
        </>
      )}

      {currentDetailTab === 'history' && (
        <>
          <HistoricalSetupMatrixPanel eventDetail={eventDetail} />
          <HistoricalEarningsTapePanel eventDetail={eventDetail} />
        </>
      )}

      {currentDetailTab === 'trust' && (
        <>
          {renderTrustLayer()}
          <ThesisLifecyclePanel eventDetail={eventDetail} />
          {renderMarketState()}
          {renderExpectedMove()}
          <SpilloverWatchPanel eventDetail={eventDetail} />
          <RowLevelAuditTrail eventDetail={eventDetail} />
        </>
      )}
    </div>
  );
};

export default SelectedCatalystIntelligence;
