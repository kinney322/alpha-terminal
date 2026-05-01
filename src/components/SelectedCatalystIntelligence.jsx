import React from 'react';

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
  if (eventDetail.event_phase !== 'post_earnings' || eventDetail.post_earnings_base_rate?.status === 'not_applicable_pre_event') {
    return (
      <div className="pead-panel card">
        <h3>Post-Earnings Base Rate</h3>
        <div className="warning-text">Not Applicable (Pre-Event Phase)</div>
      </div>
    );
  }
  
  return (
    <div className="pead-panel card">
      <h3>Post-Earnings Base Rate</h3>
      <div className="grid-2col">
        <div><strong>Sample Size:</strong> {eventDetail.post_earnings_base_rate?.similar_reaction_sample_size || 'Unknown'}</div>
        <div><strong>Drift Rate:</strong> {eventDetail.post_earnings_base_rate?.drift_rate ? (eventDetail.post_earnings_base_rate.drift_rate * 100).toFixed(1) + '%' : 'Unknown'}</div>
        <div><strong>Fade Rate:</strong> {eventDetail.post_earnings_base_rate?.fade_rate ? (eventDetail.post_earnings_base_rate.fade_rate * 100).toFixed(1) + '%' : 'Unknown'}</div>
        <div><strong>Median T1-T10 Return:</strong> {eventDetail.post_earnings_base_rate?.median_t1_to_t10_return ? (eventDetail.post_earnings_base_rate.median_t1_to_t10_return * 100).toFixed(1) + '%' : 'Unknown'}</div>
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

// Main Component
const SelectedCatalystIntelligence = ({ eventDetail, onClose }) => {
  if (!eventDetail) return null;

  const lifecycle = eventDetail?.thesis_lifecycle;
  const displayStatus = lifecycle ? (STATUS_MAPPING[lifecycle.status] || 'Unknown') : null;

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

      <div className="trust-layer-status card">
        <h3>Trust Layer Status</h3>
        <div className="grid-2col">
          <div><strong>Event Date:</strong> {eventDetail.event_date} ({eventDetail.event_date_status})</div>
          <div><strong>Timing:</strong> {eventDetail.trust_layer?.earnings_timing}</div>
          <div><strong>Options Data:</strong> {eventDetail.trust_layer?.options_data_status}</div>
          <div><strong>Sample Size:</strong> {eventDetail.trust_layer?.sample_size}</div>
          {eventDetail.trust_layer?.missing_fields?.length > 0 && (
            <div className="warning-text"><strong>Missing:</strong> {eventDetail.trust_layer.missing_fields.join(', ')}</div>
          )}
        </div>
      </div>

      <ThesisLifecyclePanel eventDetail={eventDetail} />

      <div className="market-state-panel card">
        <h3>Market State</h3>
        <div className="grid-2col">
          <div><strong>Bias:</strong> <span className={`bias-${eventDetail.market_state?.bias?.toLowerCase()}`}>{eventDetail.market_state?.bias}</span></div>
          <div><strong>Edge Gap:</strong> {eventDetail.market_state?.edge_gap}</div>
          <div><strong>T-5 Runup Pct:</strong> {eventDetail.market_state?.runup_t5_percentile !== undefined ? eventDetail.market_state?.runup_t5_percentile + '%' : 'Unknown'}</div>
          <div><strong>Vol Pricing:</strong> {eventDetail.market_state?.vol_pricing_status}</div>
          <div><strong>Liquidity Risk:</strong> {eventDetail.market_state?.liquidity_risk}</div>
          <div className="risk-flags-container">
            <strong>Risk Flags:</strong>
            {eventDetail.market_state?.risk_flags?.length > 0 ? eventDetail.market_state.risk_flags.map((flag, idx) => (
              <span key={idx} className="risk-flag-mini">{flag}</span>
            )) : <span className="warning-text" style={{display: 'inline-block', margin: 0}}>None</span>}
          </div>
        </div>
      </div>

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

      {eventDetail.pead_signal?.status === 'available' && (
        <div className={`pead-reaction-panel card strength-${eventDetail.pead_signal.strength?.toLowerCase()}`}>
          <h3>Post-Earnings Reaction</h3>
          <div className="grid-2col" style={{ marginBottom: '12px' }}>
            <div><strong>Direction:</strong> <span style={{ textTransform: 'capitalize', fontWeight: 'bold' }}>{eventDetail.pead_signal.direction}</span></div>
            <div><strong>Strength:</strong> <span style={{ textTransform: 'capitalize' }}>{eventDetail.pead_signal.strength}</span></div>
          </div>
          <div style={{ marginBottom: '16px', fontSize: '0.9em' }}>
            <strong>Reason:</strong> {eventDetail.pead_signal.reason}
          </div>
          
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', textAlign: 'left', borderCollapse: 'collapse', fontSize: '0.9em' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid var(--border-color)', color: 'var(--text-muted)' }}>
                  <th style={{ padding: '8px 4px' }}>Result</th>
                  <th style={{ padding: '8px 4px' }}>Surprise</th>
                  <th style={{ padding: '8px 4px' }}>T+1</th>
                  <th style={{ padding: '8px 4px' }}>Current Post Return</th>
                  <th style={{ padding: '8px 4px' }}>Max Risk</th>
                  <th style={{ padding: '8px 4px' }}>Max Reward</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style={{ padding: '8px 4px', fontWeight: 'bold', textTransform: 'capitalize' }}>
                    {eventDetail.pead_signal.reaction?.surprise_label || 'Unknown'}
                  </td>
                  <td style={{ padding: '8px 4px', color: eventDetail.pead_signal.reaction?.surprise_percent > 0 ? 'var(--text-green, #4caf50)' : eventDetail.pead_signal.reaction?.surprise_percent < 0 ? 'var(--text-red, #f44336)' : 'inherit' }}>
                    {eventDetail.pead_signal.reaction?.surprise_percent != null ? `${eventDetail.pead_signal.reaction.surprise_percent.toFixed(1)}%` : '--'}
                  </td>
                  <td style={{ padding: '8px 4px', color: eventDetail.pead_signal.reaction?.t1_return > 0 ? 'var(--text-green, #4caf50)' : eventDetail.pead_signal.reaction?.t1_return < 0 ? 'var(--text-red, #f44336)' : 'inherit' }}>
                    {eventDetail.pead_signal.reaction?.t1_return != null ? `${(Math.abs(eventDetail.pead_signal.reaction.t1_return) <= 1.0 && eventDetail.pead_signal.reaction.t1_return !== 0 ? eventDetail.pead_signal.reaction.t1_return * 100 : eventDetail.pead_signal.reaction.t1_return).toFixed(1)}%` : '--'}
                  </td>
                  <td style={{ padding: '8px 4px', color: eventDetail.pead_signal.reaction?.current_post_return > 0 ? 'var(--text-green, #4caf50)' : eventDetail.pead_signal.reaction?.current_post_return < 0 ? 'var(--text-red, #f44336)' : 'inherit' }}>
                    {eventDetail.pead_signal.reaction?.current_post_return != null ? `${(Math.abs(eventDetail.pead_signal.reaction.current_post_return) <= 1.0 && eventDetail.pead_signal.reaction.current_post_return !== 0 ? eventDetail.pead_signal.reaction.current_post_return * 100 : eventDetail.pead_signal.reaction.current_post_return).toFixed(1)}%` : '--'}
                  </td>
                  <td style={{ padding: '8px 4px', color: 'var(--text-muted)' }}>
                    {eventDetail.pead_signal.reaction?.max_drawdown_5d != null ? `${(Math.abs(eventDetail.pead_signal.reaction.max_drawdown_5d) <= 1.0 && eventDetail.pead_signal.reaction.max_drawdown_5d !== 0 ? eventDetail.pead_signal.reaction.max_drawdown_5d * 100 : eventDetail.pead_signal.reaction.max_drawdown_5d).toFixed(1)}%` : '--'}
                  </td>
                  <td style={{ padding: '8px 4px', color: 'var(--text-muted)' }}>
                    {eventDetail.pead_signal.reaction?.max_favorable_excursion_5d != null ? `${(Math.abs(eventDetail.pead_signal.reaction.max_favorable_excursion_5d) <= 1.0 && eventDetail.pead_signal.reaction.max_favorable_excursion_5d !== 0 ? eventDetail.pead_signal.reaction.max_favorable_excursion_5d * 100 : eventDetail.pead_signal.reaction.max_favorable_excursion_5d).toFixed(1)}%` : '--'}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      <HistoricalSetupMatrixPanel eventDetail={eventDetail} />
      <HistoricalEarningsTapePanel eventDetail={eventDetail} />
      <PostEarningsBaseRatePanel eventDetail={eventDetail} />
      <SpilloverWatchPanel eventDetail={eventDetail} />
      <RowLevelAuditTrail eventDetail={eventDetail} />

    </div>
  );
};

export default SelectedCatalystIntelligence;
