import React from 'react';

// Placeholder Components
const EventStudyEvidencePanel = ({ eventDetail }) => (
  <div className="event-study-evidence-panel card">
    <h3>Event Study Evidence</h3>
    <div className="warning-text">Historical reaction scatter plots and detailed edge gap analysis (Coming Soon)</div>
  </div>
);

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

const RowLevelAuditTrail = ({ eventDetail }) => (
  <div className="audit-trail-panel card">
    <h3>Row-Level Audit Trail</h3>
    <div className="warning-text">Historical raw earnings data logs for verification (Coming Soon)</div>
  </div>
);

// Main Component
const SelectedCatalystIntelligence = ({ eventDetail, onClose }) => {
  if (!eventDetail) return null;

  return (
    <div className="catalyst-intelligence-panel">
      <div className="panel-header">
        <div className="header-title">
          <h2>{eventDetail.ticker}</h2>
          <span className="phase-badge">{eventDetail.event_phase}</span>
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

      <EventStudyEvidencePanel eventDetail={eventDetail} />
      <PostEarningsBaseRatePanel eventDetail={eventDetail} />
      <SpilloverWatchPanel eventDetail={eventDetail} />
      <RowLevelAuditTrail eventDetail={eventDetail} />

    </div>
  );
};

export default SelectedCatalystIntelligence;
