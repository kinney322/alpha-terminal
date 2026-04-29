import React, { useState } from 'react';

const RadarMasterView = ({ payload, selectedEventId, onSelectEvent }) => {
  const [activeTab, setActiveTab] = useState('pre_earnings'); // pre_earnings, event_day, post_earnings
  const [listType, setListType] = useState('top_opportunities'); // top_opportunities, top_risk_alerts

  const currentListIds = payload?.radar_lists?.[activeTab]?.[listType] || [];

  return (
    <div className="radar-master-view">
      <div className="radar-header">
        <h2>Catalyst Radar</h2>
        <div className="radar-tabs">
          <button 
            className={activeTab === 'pre_earnings' ? 'active' : ''} 
            onClick={() => setActiveTab('pre_earnings')}
          >
            Pre-Earnings
          </button>
          <button 
            className={activeTab === 'event_day' ? 'active' : ''} 
            onClick={() => setActiveTab('event_day')}
          >
            Event Day
          </button>
          <button 
            className={activeTab === 'post_earnings' ? 'active' : ''} 
            onClick={() => setActiveTab('post_earnings')}
          >
            Post-Earnings
          </button>
        </div>
      </div>

      <div className="radar-list-switch">
        <button 
          className={listType === 'top_opportunities' ? 'active' : ''} 
          onClick={() => setListType('top_opportunities')}
        >
          Top Opportunities
        </button>
        <button 
          className={listType === 'top_risk_alerts' ? 'active' : ''} 
          onClick={() => setListType('top_risk_alerts')}
        >
          Risk Alerts
        </button>
      </div>

      <div className="radar-table-container">
        <table className="radar-table">
          <thead>
            <tr>
              <th>Ticker</th>
              <th>Phase</th>
              <th>Bias</th>
              <th>Risk Flags</th>
              <th>Score</th>
            </tr>
          </thead>
          <tbody>
            {currentListIds.length === 0 ? (
              <tr>
                <td colSpan="5" style={{ textAlign: 'center', padding: '20px' }}>
                  No data available for this view.
                </td>
              </tr>
            ) : (
              currentListIds.map(eventId => {
                const item = payload.events_detail[eventId];
                if (!item) return null;
                const isSelected = selectedEventId === eventId;
                
                return (
                  <tr 
                    key={eventId} 
                    className={`radar-row ${isSelected ? 'selected' : ''}`}
                    onClick={() => onSelectEvent(eventId)}
                  >
                    <td>
                      <div style={{ fontWeight: 'bold' }}>{item.ticker}</div>
                      <div style={{ fontSize: '0.8em', color: 'var(--text-muted)' }}>
                        {item.event_date}
                      </div>
                    </td>
                    <td>T{item.trading_days_to_event > 0 ? `+${item.trading_days_to_event}` : item.trading_days_to_event}</td>
                    <td>
                      <span className={`bias-indicator bias-${item.market_state?.bias?.toLowerCase()}`}>
                        {item.market_state?.bias}
                      </span>
                    </td>
                    <td>
                      {item.market_state?.risk_flags?.map((flag, idx) => (
                        <span key={idx} className="risk-flag-mini">{flag}</span>
                      ))}
                    </td>
                    <td style={{ fontWeight: 'bold' }}>
                      {item.attention_score?.total_score}
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
};

export default RadarMasterView;
