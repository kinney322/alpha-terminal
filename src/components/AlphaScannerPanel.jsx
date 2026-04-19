import { useState, useEffect } from 'react';

const API_LOG = 'https://pub-03e0405010774afe9ca6d569e0cb43b1.r2.dev/signal_log.json';

export default function AlphaScannerPanel() {
  const [signals, setSignals] = useState([]);
  const [quarantined, setQuarantined] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check local storage for snoozed items
    const snoozed = JSON.parse(localStorage.getItem('quarantine_snooze') || '{}');
    const now = Date.now();
    const activeSnoozes = [];
    
    // Cleanup expired snoozes
    Object.keys(snoozed).forEach(ticker => {
      if (now - snoozed[ticker] < 7 * 24 * 60 * 60 * 1000) {
        activeSnoozes.push(ticker);
      } else {
        delete snoozed[ticker];
      }
    });
    localStorage.setItem('quarantine_snooze', JSON.stringify(snoozed));

    fetch(API_LOG)
      .then(r => r.json())
      .then(data => {
        // Focus on recent signals
        const recent = data.slice(-50).reverse(); // latest first
        
        // Filter into actionable vs momentum
        const validSignals = [];
        const quarantineLog = [];

        recent.forEach(e => {
          // Rule 8: Confluence Filter (Trend Score 0 + Buy = Neutralized/Quarantine)
          const isConflict = e.direction === 'BUY' && e.trend_score === 0;
          e.isConfluenceConflict = isConflict;

          if (isConflict || activeSnoozes.includes(e.symbol)) {
             quarantineLog.push(e);
          } else {
             validSignals.push(e);
          }
        });

        // Deduplicate by symbol (keep latest)
        const uniqueSignals = [];
        const seen = new Set();
        validSignals.forEach(e => {
           if (!seen.has(e.symbol)) {
             seen.add(e.symbol);
             uniqueSignals.push(e);
           }
        });

        setSignals(uniqueSignals);
        setQuarantined(quarantineLog.slice(0, 10)); // max 10 in log
        setLoading(false);
      })
      .catch(e => {
        console.error(e);
        setLoading(false);
      });
  }, []);

  const handleSnooze = (symbol) => {
    const snoozed = JSON.parse(localStorage.getItem('quarantine_snooze') || '{}');
    snoozed[symbol] = Date.now();
    localStorage.setItem('quarantine_snooze', JSON.stringify(snoozed));
    // Trigger reload logic by just forcing a reload for simplicity
    window.location.reload();
  };

  // Splitting valid signals
  // 1. Actionable: wrongly_killed, RSI < 40, bb_pctb <= 0, oversold
  const actionable = signals.filter(e => e.direction === 'BUY' && (
      e.signal_type === 'wrongly_killed' || 
      e.signal_type?.includes('drop') ||
      e.rsi < 40 || 
      (e.bb_pctb != null && e.bb_pctb < 0.1)
  ));
  
  // 2. Momentum: Breakouts, cross_above, ignition (excluding actionable ones)
  const momentum = signals.filter(e => !actionable.includes(e) && (
      e.signal_type?.includes('cross_above') || 
      e.signal_type?.includes('golden') || 
      e.signal_type?.includes('ignition') ||
      (e.direction === 'BUY' && e.rsi >= 50 && e.trend_score >= 2)
  ));

  if (loading) return <div className="fade-in" style={{padding: '40px', color: 'var(--text-muted)'}}>Loading Data Lake...</div>;

  return (
    <div className="fade-in">
      <h2 className="section-title" style={{ marginTop: '20px', border: 'none' }}>Actionable Targets (狙擊錯殺)</h2>
      <div className="cards-grid">
        {actionable.map((e, i) => {
          const isSniper = e.rsi < 30 || (e.bb_pctb != null && e.bb_pctb <= 0);
          
          // 量化目標價計算 (Algorithmic Target Price) - Mean Reversion
          // 假設反彈至 RSI 50 的中軸，每一點 RSI 約等於 0.65% 的股價波動。若有原生分析師資料則優先採用。
          const targetUpside = e.upside_pct || Math.max(5, (50 - e.rsi) * 0.65);
          const targetPrice = e.target_price || e.price_at_signal * (1 + targetUpside / 100);

          return (
            <div key={i} className="alpha-card" style={isSniper ? { borderColor: 'rgba(5, 150, 105, 0.4)', boxShadow: '0 4px 20px rgba(5, 150, 105, 0.05)' } : {}}>
              <div className="card-header">
                <div className="ticker-box">
                  <h2 className="ticker">{e.symbol}</h2>
                  <span className="price">${e.price_at_signal?.toFixed(2)}</span>
                </div>
                <span className={`card-badge ${isSniper ? 'sniper' : ''}`}>{isSniper ? '🟢 Sniper (共振)' : '🟡 Watch (錯殺)'}</span>
              </div>

              <div className="card-metrics">
                <div className="metric">
                  <span className="metric-label">Target Price</span>
                  <span className="metric-value">${targetPrice.toFixed(2)}</span>
                </div>
                <div className="metric">
                  <span className="metric-label">Upside</span>
                  <span className="metric-value" style={{ color: 'var(--signal-buy)' }}>+{targetUpside.toFixed(1)}%</span>
                </div>
                <div className="metric">
                  <span className="metric-label">RSI (14)</span>
                  <span className="metric-value" style={{ color: 'var(--signal-buy)' }}>{e.rsi?.toFixed(1)}</span>
                </div>
                <div className="metric" style={{ flex: 1 }}>
                  <span className="metric-label">Trigger / Signature</span>
                  <span className="metric-value" style={{ fontSize: '13px', fontWeight: '700', lineHeight: 1.3 }}>
                    {(() => {
                      const sig = e.signal_type || '';
                      if (sig.includes('wrongly_killed')) return '業績錯殺 (PEAD Reversion)';
                      if (sig.includes('rolling_drawdown') || sig.includes('max_dd') || sig.includes('drop')) return '累積回落 (Rolling DD)';
                      if (sig.includes('dump') || sig.includes('multi_day')) return '連日拋售 (Multi-Day Dump)';
                      if (sig.includes('flash_crash') || sig.includes('intraday_drop') || sig.includes('intraday')) return '盤中急插 (Flash Crash)';
                      if (sig.includes('momentum_break') || sig.includes('cross_below')) return '跌穿支持 (Momentum Break)';
                      if (sig.includes('cross_above') || sig.includes('golden') || sig.includes('ignition')) return '共振突破 (Ignition)';
                      return sig ? sig.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase()) : 'Algorithmic Edge';
                    })()}
                  </span>
                </div>
              </div>

              <button style={{ width: '100%', padding: '12px', background: isSniper ? 'var(--accent-gold)' : 'var(--sidebar-bg)', color: isSniper ? '#FFF' : 'var(--text-main)', border: isSniper ? 'none' : '1px solid var(--border-light)', borderRadius: '8px', fontWeight: '700', cursor: 'pointer' }}>
                Open Edge Sheet ➡️
              </button>
            </div>
          );
        })}
        {actionable.length === 0 && <div style={{ color: 'var(--text-muted)' }}>No actionable signals today.</div>}
      </div>

      <h2 className="section-title" style={{ marginTop: '48px', border: 'none' }}>Momentum Targets (動能爆發與跌穿支持)</h2>
      <div className="cards-grid">
        {momentum.map((e, i) => {
          // 量化目標價計算 (Algorithmic Target Price) - Trend Continuation
          // 動能追高以趨勢為王，Score 4 大約給予 18.5% 的斐波那契延展目標
          const targetUpside = e.upside_pct || Math.max(5, (e.trend_score || 2) * 3.5 + 4.5);
          const targetPrice = e.target_price || e.price_at_signal * (1 + targetUpside / 100);

          return (
            <div key={i} className="alpha-card">
              <div className="card-header">
                <div className="ticker-box">
                  <h2 className="ticker">{e.symbol}</h2>
                  <span className="price">${e.price_at_signal?.toFixed(2)}</span>
                </div>
                <span className="card-badge" style={{background: 'rgba(59, 130, 246, 0.1)', color: '#2563EB', borderColor: 'rgba(59, 130, 246, 0.2)'}}>🚀 Breakout</span>
              </div>

              <div className="card-metrics">
                <div className="metric">
                  <span className="metric-label">Target Price</span>
                  <span className="metric-value">${targetPrice.toFixed(2)}</span>
                </div>
                <div className="metric">
                  <span className="metric-label">Upside</span>
                  <span className="metric-value" style={{ color: 'var(--signal-buy)' }}>+{targetUpside.toFixed(1)}%</span>
                </div>
                <div className="metric">
                  <span className="metric-label">RSI (14)</span>
                  <span className="metric-value" style={{ color: 'var(--signal-buy)' }}>{e.rsi?.toFixed(1)}</span>
                </div>
                <div className="metric" style={{ flex: 1 }}>
                  <span className="metric-label">Trigger / Signature</span>
                  <span className="metric-value" style={{ fontSize: '13px', fontWeight: '700', lineHeight: 1.3 }}>
                    {(() => {
                      const sig = e.signal_type || '';
                      if (sig.includes('cross_above') || sig.includes('breakout')) return '升穿阻力 (Momentum Breakout)';
                      if (sig.includes('golden') || sig.includes('ignition')) return '金叉發動 (Ignition)';
                      if (sig.includes('wrongly_killed')) return '業績錯殺 (PEAD Reversion)';
                      if (sig.includes('rolling_drawdown') || sig.includes('max_dd') || sig.includes('drop')) return '累積回落 (Rolling DD)';
                      if (sig.includes('dump') || sig.includes('multi_day')) return '連日拋售 (Multi-Day Dump)';
                      if (sig.includes('flash_crash') || sig.includes('intraday_drop') || sig.includes('intraday')) return '盤中急插 (Flash Crash)';
                      if (sig.includes('momentum_break') || sig.includes('cross_below')) return '跌穿支持 (Momentum Break)';
                      return sig ? sig.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase()) : 'Trend Continuation';
                    })()}
                  </span>
                </div>
              </div>

              <button style={{ width: '100%', padding: '12px', background: 'var(--sidebar-bg)', color: 'var(--text-main)', border: '1px solid var(--border-light)', borderRadius: '8px', fontWeight: '700', cursor: 'pointer' }}>
                Open Edge Sheet ➡️
              </button>
            </div>
          );
        })}
        {momentum.length === 0 && <div style={{ color: 'var(--text-muted)' }}>No momentum signals recently.</div>}
      </div>

      {/* 隔離區表格 */}
      <h2 className="section-title">Quarantine Log (互斥隔離區)</h2>
      <table className="data-table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Ticker</th>
            <th>Signal Context</th>
            <th>Trend</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {quarantined.map((e, i) => (
             <tr key={i}>
              <td style={{ color: 'var(--text-muted)' }}>{e.scan_time || e.date}</td>
              <td style={{ fontWeight: '700', fontSize: '16px' }}>{e.symbol}</td>
              <td>
                <span className={`tag ${e.direction === 'BUY' ? 'tag-buy' : 'tag-sell'}`} style={{ marginRight: '8px' }}>{e.direction}</span>
                {e.signal_type?.replace(/_/g, ' ')} {e.isConfluenceConflict ? '(Confluence Conflict: Death Trend)' : ''}
              </td>
              <td className="text-muted">{e.trend_score}/4</td>
              <td><button onClick={() => handleSnooze(e.symbol)} style={{ color: 'var(--text-muted)', background: 'none', border: '1px solid var(--border-light)', padding: '6px 12px', borderRadius: '6px', cursor: 'pointer', fontSize: '11px', fontWeight: '600' }}>Snooze 7D</button></td>
            </tr>
          ))}
          {quarantined.length === 0 && <tr><td colSpan="5" style={{textAlign: 'center', color: 'var(--text-muted)'}}>No quarantine signals.</td></tr>}
        </tbody>
      </table>
    </div>
  );
}
