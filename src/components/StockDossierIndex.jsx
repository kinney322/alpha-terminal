import React, { useMemo } from 'react';
import { buildDossierRecords } from './dossierHelpers';

const formatLabel = (val) => val ? val.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase()) : 'Not Included';

export default function StockDossierIndex({ payload, onOpenTicker }) {
  const dossierRecords = useMemo(() => {
    return buildDossierRecords(payload);
  }, [payload]);

  if (!payload) return <div className="fade-in" style={{padding: '40px', color: 'var(--text-muted)'}}>Waiting for payload...</div>;

  return (
    <div className="radar-master-view fade-in">
      <div className="radar-header">
        <h2>Stock Dossier</h2>
        <div className="panel-note" style={{ marginTop: '8px' }}>
          Living research index aggregating Post-Earnings, Catalyst, and Momentum Universe setups.
        </div>
      </div>

      <div className="radar-table-container" style={{ marginTop: '24px' }}>
        <table className="radar-table">
          <thead>
            <tr>
              <th>Ticker</th>
              <th>Sector / Theme</th>
              <th>Research State</th>
              <th>Move Type</th>
              <th>Thesis Pulse</th>
              <th>Data Coverage</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {dossierRecords.length === 0 ? (
              <tr>
                <td colSpan="7" style={{ textAlign: 'center', padding: '20px' }}>No research objects available.</td>
              </tr>
            ) : (
              dossierRecords.map(rec => (
                <tr key={rec.ticker} className="radar-row" onClick={() => onOpenTicker(rec.ticker, rec.primaryEventDetail)}>
                  <td>
                    <div style={{ fontWeight: 'bold' }}>{rec.ticker}</div>
                    <div style={{ fontSize: '0.8em', color: 'var(--text-muted)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '120px' }}>
                      {rec.companyName || 'Company Pending'}
                    </div>
                  </td>
                  <td>
                    {rec.derivedState.theme ? <span className="quality-pill">{formatLabel(rec.derivedState.theme)}</span> : <span style={{color: 'var(--text-muted)'}}>Sector N/A</span>}
                  </td>
                  <td>
                    <span className="quality-pill" style={{ background: 'var(--bg-highlight, #f1f5f9)', color: 'var(--text-main)' }}>{rec.derivedState.researchState}</span>
                  </td>
                  <td style={{ fontWeight: 'bold' }}>
                    {rec.derivedState.moveType}
                  </td>
                  <td>
                    <span className={`quality-pill pulse-${rec.derivedState.pulseState.toLowerCase()}`} style={{ fontWeight: 'bold' }}>
                      {rec.derivedState.pulseState}
                    </span>
                  </td>
                  <td>
                    {rec.derivedState.coverage}
                  </td>
                  <td>
                    <button
                      className="action-btn"
                      style={{ fontSize: '0.85em', padding: '6px 12px', background: 'var(--surface-color)', border: '1px solid var(--border-color)', borderRadius: '4px', cursor: 'pointer' }}
                    >
                      Open Dossier
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
