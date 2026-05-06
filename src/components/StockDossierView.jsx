import React from 'react';
import {
  deriveThesisPulse,
  buildDossierSummary,
  buildSignalStack,
  buildInvalidationWatch,
  buildEvidenceBoard
} from './dossierHelpers';

const formatPct = (value) => {
  if (value === undefined || value === null || Number.isNaN(Number(value))) return '--';
  const n = Number(value);
  return `${n > 0 ? '+' : ''}${n.toFixed(1)}%`;
};

const formatNumber = (value, digits = 2) => {
  if (value === undefined || value === null || Number.isNaN(Number(value))) return '--';
  return Number(value).toFixed(digits);
};

const formatLabel = (value) => {
  if (!value) return '--';
  return String(value).replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
};

const StockDossierView = ({ eventDetail, payload }) => {
  if (!eventDetail) return null;

  const { reason, verdict } = buildDossierSummary(eventDetail, payload);
  const signalStack = buildSignalStack(eventDetail, payload);
  const pulse = deriveThesisPulse(eventDetail, payload);
  const invalidationWatch = buildInvalidationWatch(eventDetail, payload);
  const evidenceBoard = buildEvidenceBoard(eventDetail, payload);

  const momentum = eventDetail.momentum_evidence || {};
  const metrics = momentum.evidence || eventDetail.trend_setup?.metrics || {};

  const isMomentumUniverse = eventDetail.status === 'momentum_universe' || eventDetail.event_phase === 'off_cycle_universe';

  // Ticker Header variables
  const ticker = eventDetail.ticker;
  const companyName = eventDetail.company_name || '';
  const industryTheme = momentum.industry_theme_label || momentum.industry_theme || eventDetail.trend_setup?.supply_chain_stage || '';
  const researchState = isMomentumUniverse ? 'Momentum Leader'
                      : (eventDetail.status === 'off_cycle_watch' || eventDetail.event_phase === 'off_cycle') ? 'Between Catalysts'
                      : eventDetail.event_phase === 'post_earnings' ? 'Post-Earnings Watch'
                      : eventDetail.peer_readthrough?.incoming?.length > 0 ? 'Peer Confirmation'
                      : 'Catalyst Watch';

  return (
    <div className="stock-dossier-view">
      {/* 1. Ticker Header */}
      <div className="dossier-header" style={{ marginBottom: '24px' }}>
        <h2 style={{ margin: 0, fontSize: '2em' }}>{ticker} <span style={{ fontWeight: 'normal', opacity: 0.7, fontSize: '0.6em' }}>{companyName}</span></h2>
        <div style={{ display: 'flex', gap: '8px', marginTop: '8px', flexWrap: 'wrap' }}>
          <span className="quality-pill" style={{ background: 'var(--bg-highlight, #f1f5f9)', color: 'var(--text-main)' }}>{researchState}</span>
          {industryTheme && <span className="quality-pill">{formatLabel(industryTheme)}</span>}
        </div>
      </div>

      {/* 2. Radar Reason & 3. Sharp Verdict */}
      <div className="card dossier-verdict" style={{ marginBottom: '24px', background: 'var(--surface-color)', borderLeft: '4px solid var(--text-main)', padding: '16px' }}>
        <div style={{ fontWeight: 'bold', marginBottom: '8px', color: 'var(--text-main)' }}>
          Radar Reason: <span style={{ fontWeight: 'normal' }}>{reason}</span>
        </div>
        <div style={{ fontStyle: 'italic', color: 'var(--text-muted)' }}>
          {verdict}
        </div>
      </div>

      {/* 4. Signal Stack */}
      <div className="dossier-signal-stack" style={{ display: 'flex', gap: '12px', marginBottom: '24px', flexWrap: 'wrap' }}>
        {signalStack.map(chip => (
          <div key={chip.id} className={`signal-chip state-${chip.state}`} style={{ padding: '8px 12px', borderRadius: '6px', border: '1px solid var(--border-color)', background: 'var(--surface-color)', flex: '1 1 120px', minWidth: '120px' }}>
            <div style={{ fontSize: '0.75em', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{chip.label}</div>
            <div style={{ fontWeight: 'bold', marginTop: '4px', color: chip.state === 'strong' ? 'var(--text-green, #4caf50)' : chip.state === 'warning' ? 'var(--text-red, #f44336)' : 'inherit' }}>
              {chip.value}
            </div>
          </div>
        ))}
      </div>

      {/* 5. Anomaly Stack */}
      <div className="card dossier-anomaly-stack" style={{ marginBottom: '24px' }}>
        <h3 style={{ marginBottom: '16px' }}>Anomaly Stack</h3>
        <div className="grid-2col" style={{ fontSize: '0.95em' }}>
          {momentum.universe_rank !== undefined && (
            <div><strong>Universe Rank:</strong> #{momentum.universe_rank} / {momentum.universe_count || '--'}</div>
          )}
          {momentum.theme_rank !== undefined && (
            <div><strong>Theme Rank:</strong> #{momentum.theme_rank}</div>
          )}
          {momentum.score !== undefined && (
            <div><strong>Momentum Score:</strong> {momentum.score}</div>
          )}
          {metrics.zscore_200d !== undefined && (
            <div><strong>Z-Score (200D):</strong> {formatNumber(metrics.zscore_200d)}</div>
          )}
          {metrics.ma200_slope_pct !== undefined && (
            <div><strong>MA200 Slope:</strong> {formatPct(metrics.ma200_slope_pct)}</div>
          )}
          {metrics.relative_strength_vs_spy_63d !== undefined && (
            <div><strong>RS vs SPY (63D):</strong> {formatPct(metrics.relative_strength_vs_spy_63d)}</div>
          )}
          {metrics.relative_strength_vs_qqq_63d !== undefined && (
            <div><strong>RS vs QQQ (63D):</strong> {formatPct(metrics.relative_strength_vs_qqq_63d)}</div>
          )}
          {eventDetail.pead_signal?.status === 'available' && (
            <div><strong>Current Post-Return:</strong> {formatPct(eventDetail.pead_signal.reaction?.current_post_return)}</div>
          )}
          {eventDetail.post_earnings_base_rate?.status === 'available' && (
            <div><strong>Matched-Event T+10 Drift:</strong> {formatPct(eventDetail.post_earnings_base_rate.median_t10_return_pct)}</div>
          )}
          {eventDetail.peer_readthrough?.incoming?.length > 0 && (
            <div><strong>Peer Repricing:</strong> {eventDetail.peer_readthrough.incoming.length} confirming peers</div>
          )}
        </div>
      </div>

      {/* 6. Thesis Pulse & 7. What Could Break It & 8. Next Watch Item */}
      <div className="card dossier-pulse-watch" style={{ marginBottom: '24px' }}>
        <div style={{ marginBottom: '16px' }}>
          <h3 style={{ display: 'inline-block', marginRight: '12px' }}>Thesis Pulse:</h3>
          <span className={`quality-pill pulse-${pulse.state.toLowerCase()}`} style={{ fontWeight: 'bold' }}>{pulse.state}</span>
          <div style={{ marginTop: '8px', color: 'var(--text-muted)', fontSize: '0.9em' }}>{pulse.reason}</div>
        </div>

        <div style={{ marginBottom: '16px' }}>
          <h3>What Could Break It</h3>
          <ul style={{ paddingLeft: '20px', color: 'var(--text-muted)', fontSize: '0.9em', margin: '8px 0' }}>
            {invalidationWatch.map((item, i) => <li key={i}>{item}</li>)}
          </ul>
        </div>

        <div>
          <h3>Next Watch Item</h3>
          <div style={{ color: 'var(--text-muted)', fontSize: '0.9em', marginTop: '4px' }}>
            {isMomentumUniverse ? 'Monitor for upcoming earnings catalyst or theme-level continuation.' :
             eventDetail.event_phase === 'post_earnings' ? 'Monitor T+10 drift and thesis pulse stability.' :
             'Review thesis notes against upcoming market data updates.'}
          </div>
        </div>
      </div>

      {/* 9. Evidence Board */}
      <div className="card dossier-evidence-board" style={{ marginBottom: '24px' }}>
        <h3 style={{ marginBottom: '16px' }}>Evidence Board</h3>
        {evidenceBoard.length === 0 ? (
          <div className="warning-text">No significant evidence available.</div>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', textAlign: 'left', borderCollapse: 'collapse', fontSize: '0.9em' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid var(--border-color)', color: 'var(--text-muted)' }}>
                  <th style={{ padding: '8px 4px' }}>Evidence</th>
                  <th style={{ padding: '8px 4px' }}>Signal</th>
                  <th style={{ padding: '8px 4px' }}>Interpretation</th>
                  <th style={{ padding: '8px 4px' }}>Coverage</th>
                </tr>
              </thead>
              <tbody>
                {evidenceBoard.map((row, idx) => (
                  <tr key={idx} style={{ borderBottom: '1px solid var(--border-light)' }}>
                    <td style={{ padding: '8px 4px', fontWeight: 'bold' }}>{row.evidence}</td>
                    <td style={{ padding: '8px 4px' }}>{row.signal}</td>
                    <td style={{ padding: '8px 4px', color: 'var(--text-muted)' }}>{row.interpretation}</td>
                    <td style={{ padding: '8px 4px' }}>
                      <span className="quality-pill" style={{ opacity: row.coverage === 'Available' ? 1 : 0.6 }}>
                        {row.coverage}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* 10. Evidence & Methodology */}
      <details className="card dossier-methodology" style={{ cursor: 'pointer' }}>
        <summary style={{ fontWeight: 'bold', outline: 'none' }}>Evidence & Methodology</summary>
        <div style={{ marginTop: '16px', fontSize: '0.85em', color: 'var(--text-muted)' }}>
          <div className="grid-2col" style={{ marginBottom: '12px' }}>
            <div><strong>Source Version:</strong> {payload?.meta?.source_version || 'v1.2-latest'}</div>
            <div><strong>Generated At:</strong> {payload?.meta?.generated_at ? new Date(payload.meta.generated_at).toLocaleString() : 'Unknown'}</div>
            <div><strong>Sample Size N:</strong> {eventDetail.post_earnings_base_rate?.similar_reaction_sample_size || eventDetail.post_earnings_base_rate?.sample_size || 'Unknown'}</div>
          </div>
          {eventDetail.trust_layer?.missing_fields?.length > 0 && (
            <div style={{ marginBottom: '8px' }}>
              <strong>Missing Fields:</strong> {eventDetail.trust_layer.missing_fields.join(', ')}
            </div>
          )}
          <div style={{ fontStyle: 'italic', marginTop: '12px' }}>
            Data provided for research purposes only. Metrics shown are algorithmically derived from the current scanner universe and historical pricing reactions. Not a trade recommendation.
          </div>
        </div>
      </details>
    </div>
  );
};

export default StockDossierView;
