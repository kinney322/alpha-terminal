import React, { useState } from 'react';

const RadarMasterView = ({ payload, selectedEventId, onSelectEvent }) => {
  const [activeTab, setActiveTab] = useState('pre_earnings'); // pre_earnings, event_day, post_earnings, tracked
  const [listType, setListType] = useState('top_opportunities'); // top_opportunities, top_risk_alerts
  const [searchQuery, setSearchQuery] = useState('');

  const baseListIds = activeTab === 'tracked'
    ? payload?.radar_lists?.tracked?.reviewed_watch || []
    : payload?.radar_lists?.[activeTab]?.[listType] || [];
  const normalizedSearch = searchQuery.trim().toUpperCase();
  const currentListIds = normalizedSearch
    ? Object.entries(payload?.events_detail || {})
        .filter(([eventId, detail]) => {
          const ticker = String(detail?.ticker || '').toUpperCase();
          return ticker.includes(normalizedSearch) || eventId.toUpperCase().includes(normalizedSearch);
        })
        .map(([eventId]) => eventId)
        .sort((a, b) => {
          const tickerA = payload?.events_detail?.[a]?.ticker || '';
          const tickerB = payload?.events_detail?.[b]?.ticker || '';
          return tickerA.localeCompare(tickerB) || a.localeCompare(b);
        })
    : baseListIds;
  const isSearchMode = Boolean(normalizedSearch);
  const isPostEarnings = activeTab === 'post_earnings';

  const formatSignedPct = (value) => {
    if (value === undefined || value === null || Number.isNaN(Number(value))) return '--';
    const n = Number(value);
    return `${n > 0 ? '+' : ''}${n.toFixed(1)}%`;
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

  const formatResultLabel = (value) => {
    if (!value) return 'Unknown';
    return value.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
  };

  const getPostBaseRateSummary = (item) => {
    const baseRate = item?.post_earnings_base_rate;
    const peadDirection = item?.pead_signal?.direction;
    if (!baseRate || baseRate.status !== 'available') {
      return { label: '--', sublabel: 'No base rate' };
    }

    const rate = peadDirection === 'fade'
      ? baseRate.reversal_rate ?? baseRate.fade_rate
      : baseRate.continuation_rate ?? baseRate.drift_rate;

    const label = rate !== undefined && rate !== null && !Number.isNaN(Number(rate))
      ? `${(Number(rate) * 100).toFixed(0)}%`
      : '--';
    const sample = baseRate.similar_reaction_sample_size ?? baseRate.sample_size;

    return {
      label,
      sublabel: sample !== undefined && sample !== null ? `N=${sample}` : 'N unknown',
    };
  };

  const getPostQuality = (item) => {
    const baseRate = item?.post_earnings_base_rate;
    const tape = item?.historical_earnings_tape;
    const missing = item?.trust_layer?.missing_fields || [];
    const labels = [];

    if (baseRate?.sample_warning) {
      labels.push(formatResultLabel(baseRate.sample_warning));
    } else if ((baseRate?.similar_reaction_sample_size ?? 0) > 0) {
      labels.push('Comparable');
    }

    if (tape?.data_quality?.surprise_rows) {
      labels.push(`${tape.data_quality.surprise_rows} EPS rows`);
    }

    const meaningfulMissing = missing.filter(field => (
      field !== 'options_data' &&
      field !== 'options_chain' &&
      field !== 'implied_move'
    ));

    if (meaningfulMissing.length > 0) {
      labels.push(`Missing ${meaningfulMissing.length}`);
    }

    if (labels.length === 0) labels.push('Basic');
    return labels.slice(0, 2);
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

      <div className="radar-search-row">
        <input
          className="radar-search-input"
          type="search"
          value={searchQuery}
          onChange={(event) => setSearchQuery(event.target.value)}
          placeholder="Search ticker across all catalyst events"
        />
        {isSearchMode && (
          <button className="radar-search-clear" onClick={() => setSearchQuery('')}>
            Clear
          </button>
        )}
      </div>

      <div className="radar-table-container">
        <table className="radar-table">
          <thead>
            <tr>
              <th>Ticker</th>
              {isPostEarnings ? (
                <>
                  <th>Result</th>
                  <th>T+1</th>
                  <th>Current</th>
                  <th>Base Rate</th>
                  <th>Quality</th>
                </>
              ) : (
                <>
                  <th>Phase</th>
                  <th>Bias</th>
                  <th>Risk Flags</th>
                  <th>Score</th>
                </>
              )}
            </tr>
          </thead>
          <tbody>
            {currentListIds.length === 0 ? (
              <tr>
                <td colSpan={isPostEarnings ? 6 : 5} style={{ textAlign: 'center', padding: '20px' }}>
                  {isSearchMode
                    ? `No catalyst events match "${searchQuery.trim()}".`
                    : activeTab === 'tracked'
                      ? 'No tracked catalyst setups.'
                      : 'No data available for this view.'}
                </td>
              </tr>
            ) : (
              currentListIds.map(eventId => {
                const item = payload.events_detail[eventId];
                if (!item) return null;
                const isSelected = selectedEventId === eventId;
                const peadDisplay = isPostEarnings ? getPeadDisplay(item.pead_signal) : null;
                const biasClass = isPostEarnings
                  ? (peadDisplay?.tone === 'bullish' ? 'long' : peadDisplay?.tone === 'bearish' ? 'short' : 'neutral')
                  : item.market_state?.bias?.toLowerCase() || 'neutral';
                const reaction = item.pead_signal?.reaction || {};
                const baseRateSummary = isPostEarnings ? getPostBaseRateSummary(item) : null;
                const postQuality = isPostEarnings ? getPostQuality(item) : [];
                
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
                    {isPostEarnings ? (
                      <>
                        <td className="post-result-cell">
                          <span className={`bias-indicator bias-${biasClass}`}>
                            {peadDisplay.label}
                          </span>
                          <div className="post-result-subline">
                            {formatResultLabel(reaction.surprise_label)} {formatSignedPct(reaction.surprise_percent)}
                          </div>
                        </td>
                        <td>
                          <div className="metric-stack">
                            <strong style={{ color: getReturnColor(reaction.t1_return) }}>
                              {formatSignedPct(reaction.t1_return)}
                            </strong>
                            <span>
                              {item.trading_days_to_event !== undefined && item.trading_days_to_event !== null
                                ? `T${item.trading_days_to_event > 0 ? `+${item.trading_days_to_event}` : item.trading_days_to_event}`
                                : 'Post'}
                            </span>
                          </div>
                        </td>
                        <td>
                          <strong style={{ color: getReturnColor(reaction.current_post_return) }}>
                            {formatSignedPct(reaction.current_post_return)}
                          </strong>
                        </td>
                        <td>
                          <div className="metric-stack">
                            <strong>{baseRateSummary.label}</strong>
                            <span>{baseRateSummary.sublabel}</span>
                          </div>
                        </td>
                        <td>
                          {postQuality.map((label, idx) => (
                            <span key={idx} className="quality-pill">{label}</span>
                          ))}
                        </td>
                      </>
                    ) : (
                      <>
                        <td>
                          {item.trading_days_to_event !== undefined && item.trading_days_to_event !== null
                            ? `T${item.trading_days_to_event > 0 ? `+${item.trading_days_to_event}` : item.trading_days_to_event}`
                            : (item.event_phase || item.thesis_lifecycle?.phase || 'unknown')}
                        </td>
                        <td>
                          <span className={`bias-indicator bias-${biasClass}`}>
                            {item.market_state?.bias}
                          </span>
                        </td>
                        <td>
                          {item.market_state?.risk_flags?.map((flag, idx) => (
                            <span key={idx} className="risk-flag-mini">{flag}</span>
                          ))}
                        </td>
                        <td style={{ fontWeight: 'bold' }}>
                          {item.attention_score?.total_score || item.attention_score || '-'}
                        </td>
                      </>
                    )}
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
