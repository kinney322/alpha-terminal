import React, { useState } from 'react';

const RadarMasterView = ({ payload, selectedEventId, onSelectEvent }) => {
  const [activeTab, setActiveTab] = useState('pre_earnings'); // pre_earnings, event_day, post_earnings, tracked
  const [listType, setListType] = useState('top_opportunities'); // top_opportunities, top_risk_alerts

  const currentListIds = activeTab === 'tracked' 
    ? payload?.radar_lists?.tracked?.reviewed_watch || []
    : payload?.radar_lists?.[activeTab]?.[listType] || [];
  const isPostEarnings = activeTab === 'post_earnings';

  const formatPct = (value) => {
    if (value === undefined || value === null || Number.isNaN(Number(value))) return '--';
    return `${Number(value).toFixed(1)}%`;
  };

  const getReturnColor = (value) => {
    const n = Number(value);
    if (Number.isNaN(n) || n === 0) return 'inherit';
    return n > 0 ? 'var(--text-green, #4caf50)' : 'var(--text-red, #f44336)';
  };

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

  const formatStrength = (value) => {
    if (!value) return '--';
    return value.charAt(0).toUpperCase() + value.slice(1);
  };

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
          <button 
            className={activeTab === 'tracked' ? 'active' : ''} 
            onClick={() => setActiveTab('tracked')}
          >
            Tracked
          </button>
        </div>
      </div>

      {activeTab !== 'tracked' && (
        <div className="radar-list-switch">
          {activeTab === 'post_earnings' ? (
            <>
              <button 
                className={listType === 'top_opportunities' ? 'active' : ''} 
                onClick={() => setListType('top_opportunities')}
              >Continuation</button>
              <button 
                className={listType === 'top_risk_alerts' ? 'active' : ''} 
                onClick={() => setListType('top_risk_alerts')}
              >Reversal</button>
              <button 
                className={listType === 'pead_watch' ? 'active' : ''} 
                onClick={() => setListType('pead_watch')}
              >
                PEAD Watch
              </button>
            </>
          ) : (
            <>
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
            </>
          )}
        </div>
      )}

      <div className="radar-table-container">
        <table className="radar-table">
          <thead>
            <tr>
              <th>Ticker</th>
              <th>Phase</th>
              <th>{isPostEarnings ? 'PEAD' : 'Bias'}</th>
              {isPostEarnings && <th>Strength</th>}
              <th>Risk Flags</th>
              <th>{isPostEarnings ? 'Current Move' : 'Score'}</th>
            </tr>
          </thead>
          <tbody>
            {currentListIds.length === 0 ? (
              <tr>
                <td colSpan="5" style={{ textAlign: 'center', padding: '20px' }}>
                  {activeTab === 'tracked' ? 'No tracked catalyst setups.' : 'No data available for this view.'}
                </td>
              </tr>
            ) : (
              currentListIds.map(eventId => {
                const item = payload.events_detail[eventId];
                if (!item) return null;
                const isSelected = selectedEventId === eventId;
                const peadDisplay = isPostEarnings ? getPeadDisplay(item.pead_signal) : null;
                const biasClass = peadDisplay?.tone === 'bullish' ? 'long' : peadDisplay?.tone === 'bearish' ? 'short' : 'neutral';
                
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
                    <td>
                      {item.trading_days_to_event !== undefined && item.trading_days_to_event !== null
                        ? `T${item.trading_days_to_event > 0 ? `+${item.trading_days_to_event}` : item.trading_days_to_event}`
                        : (item.event_phase || item.thesis_lifecycle?.phase || 'unknown')}
                    </td>
                    {isPostEarnings ? (
                      <>
                        <td>
                          <span className={`bias-indicator bias-${biasClass}`}>
                            {peadDisplay.label}
                          </span>
                          <div style={{ fontSize: '0.78em', color: 'var(--text-muted)', marginTop: '4px' }}>
                            {item.pead_signal?.reaction?.surprise_label || 'unknown'} / T+1 {formatPct(item.pead_signal?.reaction?.t1_return)}
                          </div>
                        </td>
                        <td>
                          <span className="risk-flag-mini">
                            {formatStrength(item.pead_signal?.strength)}
                          </span>
                        </td>
                      </>
                    ) : (
                      <td>
                        <span className={`bias-indicator bias-${item.market_state?.bias?.toLowerCase()}`}>
                          {item.market_state?.bias}
                        </span>
                      </td>
                    )}
                    <td>
                      {item.market_state?.risk_flags?.map((flag, idx) => (
                        <span key={idx} className="risk-flag-mini">{flag}</span>
                      ))}
                    </td>
                    <td style={{ fontWeight: 'bold' }}>
                      {isPostEarnings ? (
                        <span style={{ color: getReturnColor(item.pead_signal?.reaction?.current_post_return) }}>
                          {formatPct(item.pead_signal?.reaction?.current_post_return)}
                        </span>
                      ) : (
                        item.attention_score?.total_score || item.attention_score || '-'
                      )}
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
