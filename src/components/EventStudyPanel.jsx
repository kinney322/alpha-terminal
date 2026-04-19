import { useState, useCallback } from 'react';
import { Search, Clock, Crosshair, BarChart3 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const API_BASE = 'https://kw-terminal-api.myfootballplaces.workers.dev';

export default function EventStudyPanel() {
  const [symbol, setSymbol] = useState('');
  const [category, setCategory] = useState('Earnings');
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const fetchEventStudy = useCallback(async (e) => {
    e?.preventDefault();
    if (!symbol) return;

    setLoading(true);
    setError(null);
    setData(null);

    try {
      const res = await fetch(`${API_BASE}/event-study?symbol=${symbol.toUpperCase()}&category=${category}`);
      const json = await res.json();
      
      if (!res.ok) {
        throw new Error(json.error || `Error ${res.status}`);
      }
      
      setData(json);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [symbol, category]);

  const ev = data?.summary?.avg_t10_return || 0;
  let asymmetry = '-';
  let minX = -1, maxX = 1, minY = -1, maxY = 1;

  if (data?.details?.length > 0) {
    const wins = data.details.filter(r => r.t10_return > 0);
    const losses = data.details.filter(r => r.t10_return <= 0);
    const avgWin = wins.length ? wins.reduce((acc, r) => acc + r.t10_return, 0) / wins.length : 0;
    const avgLoss = losses.length ? Math.abs(losses.reduce((acc, r) => acc + r.t10_return, 0) / losses.length) : 0;
    asymmetry = avgLoss !== 0 ? (avgWin / avgLoss).toFixed(2) : '∞';

    const allX = data.details.map(d => d.drift_m5);
    const allY = data.details.map(d => d.t10_return);
    minX = Math.min(Math.min(...allX) - 1, -2);
    maxX = Math.max(Math.max(...allX) + 1, 2);
    minY = Math.min(Math.min(...allY) - 1, -2);
    maxY = Math.max(Math.max(...allY) + 1, 2);
  }

  const getPosition = (x, y) => {
    const left = ((x - minX) / (maxX - minX)) * 100;
    const bottom = ((y - minY) / (maxY - minY)) * 100;
    return { left: `${left}%`, bottom: `${bottom}%` };
  };

  return (
    <div className="fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      
      {/* Header / Query Settings */}
      <div className="alpha-card" style={{ padding: '24px' }}>
        <div className="card-header" style={{ marginBottom: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <Crosshair size={22} color="var(--accent-gold)" />
            <span style={{ fontSize: '18px', fontWeight: '700', color: 'var(--text-main)' }}>事件研究回測矩陣 (Event Study Matrix)</span>
            <span className="card-badge" style={{ textTransform: 'none' }}>D1 Data Lake</span>
          </div>
        </div>
        
        <form onSubmit={fetchEventStudy} style={{ display: 'flex', gap: '1rem', alignItems: 'flex-end', width: '100%' }}>
          <div style={{ flex: 1 }}>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', color: 'var(--text-muted)', marginBottom: '8px' }}>股票代號 (Ticker)</label>
            <input 
              type="text" 
              value={symbol} 
              onChange={(e) => setSymbol(e.target.value)} 
              placeholder="e.g. NVDA, SPY" 
              style={{ width: '100%', background: 'var(--bg-color)', border: '1px solid var(--border-light)', padding: '12px', borderRadius: '8px', color: 'var(--text-main)', fontSize: '14px', outline: 'none' }}
            />
          </div>
          <div style={{ flex: 1 }}>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', color: 'var(--text-muted)', marginBottom: '8px' }}>事件分類 (Category)</label>
            <select 
              value={category} 
              onChange={(e) => setCategory(e.target.value)}
              style={{ width: '100%', background: 'var(--bg-color)', border: '1px solid var(--border-light)', padding: '12px', borderRadius: '8px', color: 'var(--text-main)', fontSize: '14px', outline: 'none' }}
            >
              <option value="Earnings">業績公佈 (Earnings)</option>
              <option value="FOMC">議息會議 (FOMC)</option>
              <option value="CPI">通脹數據 (CPI)</option>
              <option value="PCE">核心通脹 (PCE)</option>
              <option value="NFP">非農就業 (NFP)</option>
              <option value="PPI">生產者物價 (PPI)</option>
              <option value="GDP">國內生產總值 (GDP)</option>
              <option value="RETAIL_SALES">零售銷售 (Retail Sales)</option>
            </select>
          </div>
          <button 
            type="submit" 
            disabled={loading || !symbol} 
            style={{ background: 'var(--accent-gold)', color: '#FFF', fontWeight: '700', padding: '12px 24px', borderRadius: '8px', border: 'none', cursor: 'pointer', display: 'flex', gap: '8px', alignItems: 'center', transition: 'background 0.2s', opacity: (loading || !symbol) ? 0.6 : 1 }}
          >
            {loading ? <Clock size={18} /> : <Search size={18} />}
            {loading ? '回測中...' : '執行回測'}
          </button>
        </form>
        
        {error && (
          <div style={{ marginTop: '16px', padding: '16px', background: 'rgba(220, 38, 38, 0.05)', border: '1px solid rgba(220, 38, 38, 0.2)', borderRadius: '8px', color: 'var(--signal-sell)', fontSize: '14px', fontWeight: '500' }}>
            ⚠️ {error}
          </div>
        )}
      </div>

      <AnimatePresence>
        {data && data.summary && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}
          >
            {/* Summary Cards */}
            <h2 className="section-title" style={{ margin: '8px 0 0 0', border: 'none' }}>Backtest Metrics ( T±10 回測指標 )</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '16px' }}>
              <div className="alpha-card" style={{ padding: '20px' }}>
                <span style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: '600' }}>有效事件樣本</span>
                <div style={{ fontSize: '24px', fontWeight: '700', color: 'var(--text-main)', marginTop: '8px' }}>{data.summary.total_events} <span style={{ fontSize: '14px', color: 'var(--text-muted)', fontWeight: '500' }}>次</span></div>
              </div>
              <div className="alpha-card" style={{ padding: '20px', border: '1px solid var(--accent-gold)' }}>
                <span style={{ fontSize: '11px', color: 'var(--accent-gold)', textTransform: 'uppercase', fontWeight: '600' }}>T+10 期望值 (EV)</span>
                <div style={{ fontSize: '24px', fontWeight: '700', color: ev > 0 ? 'var(--signal-buy)' : 'var(--signal-sell)', marginTop: '8px' }}>
                  {ev > 0 ? '+' : ''}{ev}%
                </div>
              </div>
              <div className="alpha-card" style={{ padding: '20px' }}>
                <span style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: '600' }}>盈虧比 (Asymmetry)</span>
                <div style={{ fontSize: '24px', fontWeight: '700', color: asymmetry >= 1.5 ? 'var(--signal-buy)' : 'var(--signal-sell)', marginTop: '8px' }}>
                  {asymmetry} <span style={{ fontSize: '14px', color: 'var(--text-muted)', fontWeight: '500' }}>x</span>
                </div>
              </div>
              <div className="alpha-card" style={{ padding: '20px' }}>
                <span style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: '600' }}>T-5 日偷步 (Run-up)</span>
                <div style={{ fontSize: '24px', fontWeight: '700', color: data.summary.avg_drift_m5 > 0 ? 'var(--signal-buy)' : 'var(--signal-sell)', marginTop: '8px' }}>{data.summary.avg_drift_m5 > 0 ? '+' : ''}{data.summary.avg_drift_m5}%</div>
              </div>
              <div className="alpha-card" style={{ padding: '20px' }}>
                <span style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: '600' }}>T+1 日裂口波動</span>
                <div style={{ fontSize: '24px', fontWeight: '700', color: 'var(--signal-watch)', marginTop: '8px' }}>{data.summary.avg_t1_abs_volatility}%</div>
              </div>
              <div className="alpha-card" style={{ padding: '20px', borderColor: 'rgba(220, 38, 38, 0.2)' }}>
                <span style={{ fontSize: '11px', color: 'var(--signal-sell)', textTransform: 'uppercase', fontWeight: '600' }}>T+5 最大回撤 (Max DD)</span>
                <div style={{ fontSize: '24px', fontWeight: '700', color: 'var(--signal-sell)', marginTop: '8px' }}>{data.summary.avg_max_dd_5}%</div>
              </div>
              <div className="alpha-card" style={{ padding: '20px', borderColor: 'rgba(52, 211, 153, 0.2)' }}>
                <span style={{ fontSize: '11px', color: 'var(--signal-buy)', textTransform: 'uppercase', fontWeight: '600' }}>T+5 最大上行 (MFE)</span>
                <div style={{ fontSize: '24px', fontWeight: '700', color: 'var(--signal-buy)', marginTop: '8px' }}>+{data.summary.avg_mfe_5 || '0.0'}%</div>
              </div>
            </div>

            {/* Scatter Plot */}
            <div className="alpha-card" style={{ padding: '24px' }}>
              <div className="card-header" style={{ marginBottom: '24px' }}>
                <span style={{ fontSize: '16px', fontWeight: '700', color: 'var(--text-main)' }}>T-5 (Run-up) vs T+10 (Outcome) 散佈圖</span>
                <span style={{ fontSize: '13px', color: 'var(--text-muted)', marginLeft: '12px' }}>洞察偷步與回歸效應 (Buy the rumor, sell the news)</span>
              </div>
              <div style={{ position: 'relative', height: '280px', border: '1px solid var(--border-light)', borderRadius: '8px', background: 'rgba(0,0,0,0.02)', margin: '0 20px' }}>
                {/* Axes */}
                <div style={{ position: 'absolute', left: 0, right: 0, bottom: getPosition(0, 0).bottom, borderBottom: '1px dashed var(--border-light)' }} />
                <div style={{ position: 'absolute', top: 0, bottom: 0, left: getPosition(0, 0).left, borderLeft: '1px dashed var(--border-light)' }} />
                
                {/* Axis Labels */}
                <span style={{ position: 'absolute', right: '10px', bottom: `calc(${getPosition(0, 0).bottom} + 5px)`, fontSize: '10px', color: 'var(--text-muted)' }}>T-5 (%) &rarr;</span>
                <span style={{ position: 'absolute', left: `calc(${getPosition(0, 0).left} + 5px)`, top: '10px', fontSize: '10px', color: 'var(--text-muted)' }}>&uarr; T+10 (%)</span>

                {/* Dots */}
                {data.details.map((row, i) => {
                  const pos = getPosition(row.drift_m5, row.t10_return);
                  const isWin = row.t10_return > 0;
                  return (
                    <div 
                      key={i}
                      title={`Date: ${row.event_date}\nT-5: ${row.drift_m5}%\nT+10: ${row.t10_return}%`}
                      style={{
                        position: 'absolute',
                        left: pos.left,
                        bottom: pos.bottom,
                        width: '10px',
                        height: '10px',
                        borderRadius: '50%',
                        backgroundColor: isWin ? 'var(--signal-buy)' : 'var(--signal-sell)',
                        transform: 'translate(-50%, 50%)',
                        boxShadow: '0 0 4px rgba(0,0,0,0.2)',
                        cursor: 'help'
                      }}
                    />
                  );
                })}
              </div>
            </div>

            {/* Detailed Matrix */}
            <div className="alpha-card" style={{ padding: '24px' }}>
              <div className="card-header" style={{ marginBottom: '24px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <BarChart3 size={20} color="var(--accent-gold)" />
                  <span style={{ fontSize: '16px', fontWeight: '700', color: 'var(--text-main)' }}>T±10 歷史對撞矩陣清單</span>
                </div>
              </div>
              <div style={{ overflowX: 'auto' }}>
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>Event Date</th>
                      <th>Sentiment</th>
                      <th style={{ textAlign: 'right' }}>T-10 (%)</th>
                      <th style={{ textAlign: 'right' }}>T-5 (%)</th>
                      <th style={{ textAlign: 'right' }}>Max DD 5D (%)</th>
                      <th style={{ textAlign: 'right' }}>MFE 5D (%)</th>
                      <th style={{ textAlign: 'right' }}>T+10 (%)</th>
                      <th style={{ textAlign: 'center' }}>Result</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.details.map((row, i) => (
                      <tr key={i}>
                        <td style={{ fontWeight: '500', color: 'var(--text-main)' }}>{row.event_date}</td>
                        <td>
                          <span className={`tag ${row.sentiment.toLowerCase() === 'beat' ? 'tag-buy' : row.sentiment.toLowerCase() === 'miss' ? 'tag-sell' : ''}`} style={{ background: row.sentiment.toLowerCase() !== 'beat' && row.sentiment.toLowerCase() !== 'miss' ? 'var(--bg-color)' : '', color: row.sentiment.toLowerCase() !== 'beat' && row.sentiment.toLowerCase() !== 'miss' ? 'var(--text-muted)' : '' }}>
                            {row.sentiment}
                          </span>
                        </td>
                        <td style={{ textAlign: 'right', fontWeight: '500', color: row.drift_m10 > 0 ? 'var(--signal-buy)' : 'var(--signal-sell)' }}>{row.drift_m10 > 0 ? '+' : ''}{row.drift_m10}</td>
                        <td style={{ textAlign: 'right', fontWeight: '500', color: row.drift_m5 > 0 ? 'var(--signal-buy)' : 'var(--signal-sell)' }}>{row.drift_m5 > 0 ? '+' : ''}{row.drift_m5}</td>
                        <td style={{ textAlign: 'right', fontWeight: '500', color: 'var(--signal-sell)' }}>{row.max_dd_5}</td>
                        <td style={{ textAlign: 'right', fontWeight: '500', color: 'var(--signal-buy)' }}>+{row.mfe_5 || '0.0'}</td>
                        <td style={{ textAlign: 'right', fontWeight: '700', color: row.t10_return > 0 ? 'var(--signal-buy)' : 'var(--signal-sell)' }}>{row.t10_return > 0 ? '+' : ''}{row.t10_return}</td>
                        <td style={{ textAlign: 'center' }}>
                          {row.win ? <span style={{ color: 'var(--signal-buy)', fontWeight: '700' }}>W</span> : <span style={{ color: 'var(--signal-sell)', fontWeight: '700' }}>L</span>}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
