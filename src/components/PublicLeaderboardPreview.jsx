import React, { useState, useEffect } from 'react';

const formatLabel = (val) => val ? val.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase()) : '';

export default function PublicLeaderboardPreview({ onOpenStockDossier, payload: fullRadarPayload }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('new_radar_hits');

  useEffect(() => {
    fetch('https://kw-terminal-api.myfootballplaces.workers.dev/event-opportunity/leaderboard-compact-v1')
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch leaderboard data');
        return res.json();
      })
      .then(json => {
        setData(json);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="fade-in" style={{ padding: '40px', color: 'var(--text-muted)' }}>Loading leaderboard...</div>;
  if (error) return <div className="fade-in" style={{ padding: '40px', color: 'red' }}>Error: {error}</div>;
  if (!data || !data.tabs) return <div className="fade-in" style={{ padding: '40px' }}>No leaderboard data available.</div>;

  const tabs = [
    { key: 'new_radar_hits', label: 'New Radar Hits' },
    { key: 'post_earnings_breakouts', label: 'Post-Earnings Breakouts' },
    { key: 'momentum_breakouts', label: 'Momentum Breakouts' },
    { key: 'quality_compounders', label: 'Quality Compounders' }
  ];

  const currentTabTickers = data.tabs[activeTab] || [];
  const rowsByTicker = data.rows_by_ticker || {};

  const handleRowClick = (row) => {
    let resolvedEventDetail = null;
    const eventKey = row.dossier_target?.event_key;
    if (eventKey && fullRadarPayload?.events_detail?.[eventKey]) {
      resolvedEventDetail = fullRadarPayload.events_detail[eventKey];
    } else {
      resolvedEventDetail = { ticker: row.ticker, event_key: eventKey };
    }
    onOpenStockDossier(row.ticker, resolvedEventDetail);
  };

  return (
    <div className="radar-master-view fade-in">
      <div className="radar-header">
        <h2>CrowdRisk Leaderboard</h2>
        <div className="panel-note" style={{ marginTop: '8px' }}>
          Follow the trend. Find the opportunity.
        </div>
      </div>

      <div style={{ display: 'flex', gap: '10px', marginTop: '24px', flexWrap: 'wrap' }}>
        {tabs.map(t => (
          <button
            key={t.key}
            onClick={() => setActiveTab(t.key)}
            style={{
              padding: '8px 16px',
              background: activeTab === t.key ? 'var(--text-main)' : 'var(--surface-color)',
              color: activeTab === t.key ? 'var(--bg-main)' : 'var(--text-main)',
              borderRadius: '20px',
              cursor: 'pointer',
              fontWeight: '600',
              border: activeTab === t.key ? '1px solid var(--text-main)' : '1px solid var(--border-color)'
            }}
          >
            {t.label} ({data.tabs[t.key]?.length || 0})
          </button>
        ))}
      </div>

      <div className="radar-table-container" style={{ marginTop: '24px' }}>
        <table className="radar-table">
          <thead>
            <tr>
              <th style={{ width: '60px' }}>Rank</th>
              <th>Ticker</th>
              <th>Theme</th>
              <th>Signals</th>
              <th style={{ width: '120px', textAlign: 'right' }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {currentTabTickers.length === 0 ? (
              <tr>
                <td colSpan="5" style={{ textAlign: 'center', padding: '20px', color: 'var(--text-muted)' }}>
                  No tickers currently in this list.
                </td>
              </tr>
            ) : (
              currentTabTickers.map(ticker => {
                const row = rowsByTicker[ticker];
                if (!row) return null;
                return (
                  <tr key={ticker} className="radar-row" onClick={() => handleRowClick(row)}>
                    <td style={{ fontWeight: 'bold', color: 'var(--text-muted)' }}>#{row.rank}</td>
                    <td>
                      <div style={{ fontWeight: 'bold', fontSize: '1.1em' }}>{row.ticker}</div>
                    </td>
                    <td>
                      {row.primary_theme ? (
                        <span className="quality-pill">{formatLabel(row.primary_theme)}</span>
                      ) : (
                        <span style={{ color: 'var(--text-muted)' }}>-</span>
                      )}
                    </td>
                    <td>
                      <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                        {row.compact_tags && row.compact_tags.map((tag, idx) => (
                          <span key={idx} className="quality-pill" style={{ background: 'var(--bg-highlight)', color: 'var(--text-main)', fontSize: '0.8em' }}>
                            {tag}
                          </span>
                        ))}
                        {(!row.compact_tags || row.compact_tags.length === 0) && (
                          <span style={{ color: 'var(--text-muted)', fontSize: '0.85em' }}>-</span>
                        )}
                      </div>
                    </td>
                    <td style={{ textAlign: 'right' }}>
                      <button
                        className="action-btn"
                        style={{ fontSize: '0.85em', padding: '6px 12px', background: 'var(--surface-color)', border: '1px solid var(--border-color)', borderRadius: '4px', cursor: 'pointer' }}
                        onClick={(e) => { e.stopPropagation(); handleRowClick(row); }}
                      >
                        Open Dossier →
                      </button>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
