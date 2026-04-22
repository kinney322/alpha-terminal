import { useEffect, useMemo, useState, useCallback } from 'react';
import { Search, Crosshair, BarChart3, Clock, Radar, Database, RefreshCcw, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import CatalystRadarTable from './CatalystRadarTable';
import OpportunityXRayCard from './OpportunityXRayCard';

const API_BASE = 'https://kw-terminal-api.myfootballplaces.workers.dev';
const LEADERBOARD_FALLBACK_URLS = [
  'https://pub-03e0405010774afe9ca6d569e0cb43b1.r2.dev/event-study/leaderboard-latest.json.gz',
  import.meta.env.VITE_EVENT_LEADERBOARD_URL,
  `${API_BASE}/leaderboard-latest.json`,
  `${API_BASE}/event-opportunity/leaderboard-latest`,
].filter(Boolean);

const DEMO_RADAR_ROWS = [
  {
    ticker: 'SNOW',
    eventDate: '2026-05-22',
    preferredDirection: 'SHORT',
    longScore: 34,
    shortScore: 91,
    conviction: 57,
    tags: ['God-tier Short Setup', 'Euphoric Run-up'],
    headlineTag: 'Reflexive Fade',
    historicalLongEdge: 28,
    historicalShortEdge: 85,
    longSetupFit: 31,
    shortSetupFit: 89,
    reflexivityRho: -0.47,
    imrv: 1.28,
    runupPercentile: 97.3,
    relativeStrengthPercentile: 91.2,
    mu1: -2.1,
    mu3: -3.4,
    mu10: -4.8,
    winLong: 29,
    winShort: 71,
  },
  {
    ticker: 'NVDA',
    eventDate: '2026-05-21',
    preferredDirection: 'LONG',
    longScore: 84,
    shortScore: 29,
    conviction: 42,
    tags: ['Clean Long Continuation'],
    headlineTag: 'Healthy Continuation',
    historicalLongEdge: 91,
    historicalShortEdge: 22,
    longSetupFit: 77,
    shortSetupFit: 24,
    reflexivityRho: 0.32,
    imrv: 0.93,
    runupPercentile: 64.1,
    relativeStrengthPercentile: 88.4,
    mu1: 1.9,
    mu3: 3.1,
    mu10: 4.7,
    winLong: 68,
    winShort: 32,
  },
  {
    ticker: 'CRWD',
    eventDate: '2026-06-03',
    preferredDirection: 'SHORT',
    longScore: 43,
    shortScore: 78,
    conviction: 26,
    tags: ['Euphoric Run-up'],
    headlineTag: 'Crowded Long',
    historicalLongEdge: 41,
    historicalShortEdge: 74,
    longSetupFit: 46,
    shortSetupFit: 82,
    reflexivityRho: -0.29,
    imrv: 1.19,
    runupPercentile: 94.8,
    relativeStrengthPercentile: 85.7,
    mu1: -1.1,
    mu3: -2.2,
    mu10: -3.9,
    winLong: 38,
    winShort: 62,
  },
];

function normalizeLeaderboardRow(row) {
  return {
    ticker: row.Ticker ?? row.ticker,
    eventDate: row.EventDate ?? row.eventDate,
    preferredDirection: row.PreferredDirection ?? row.preferredDirection ?? 'NEUTRAL',
    longScore: Number(row.LongScore ?? row.longScore ?? 0),
    shortScore: Number(row.ShortScore ?? row.shortScore ?? 0),
    conviction: Number(row.Conviction ?? row.conviction ?? 0),
    tags: row.Tags ?? row.tags ?? [],
    headlineTag: row.HeadlineTag ?? row.headlineTag ?? '',
    historicalLongEdge: Number(row.HistoricalLongEdge ?? row.historicalLongEdge ?? 0),
    historicalShortEdge: Number(row.HistoricalShortEdge ?? row.historicalShortEdge ?? 0),
    longSetupFit: Number(row.LongSetupFit ?? row.longSetupFit ?? 0),
    shortSetupFit: Number(row.ShortSetupFit ?? row.shortSetupFit ?? 0),
    reflexivityRho: Number(row.ReflexivityRho ?? row.Diagnostics?.ReflexivityRho ?? row.reflexivityRho ?? 0),
    imrv: Number(row.IMRV ?? row.imrv ?? 0),
    runupPercentile: Number(row.RunupPercentile ?? row.runupPercentile ?? 0),
    relativeStrengthPercentile: Number(row.RelativeStrengthPercentile ?? row.relativeStrengthPercentile ?? 0),
    mu1: Number(row.Mu1 ?? row.mu1 ?? 0),
    mu3: Number(row.Mu3 ?? row.mu3 ?? 0),
    mu10: Number(row.Mu10 ?? row.mu10 ?? 0),
    winLong: Number(row.WinLong ?? row.winLong ?? 0),
    winShort: Number(row.WinShort ?? row.winShort ?? 0),
  };
}

async function fetchLeaderboardPayload(signal) {
  let lastError = null;

  for (const url of LEADERBOARD_FALLBACK_URLS) {
    try {
      const res = await fetch(url, { signal, headers: { Accept: 'application/json' } });
      if (!res.ok) {
        throw new Error(`Fetch failed ${res.status} @ ${url}`);
      }

      const json = await res.json();
      const rows = Array.isArray(json) ? json : Array.isArray(json?.leaderboard) ? json.leaderboard : [];
      if (rows.length === 0) {
        throw new Error(`Empty leaderboard payload @ ${url}`);
      }

      return {
        rows: rows.map(normalizeLeaderboardRow),
        source: url,
        lastUpdated: json?.meta?.generated_at ?? null,
      };
    } catch (error) {
      lastError = error;
    }
  }

  throw lastError ?? new Error('Unable to load leaderboard payload');
}

function RadarSkeleton() {
  return (
    <div className="radar-skeleton">
      <div className="radar-skeleton__header shimmer" />
      {Array.from({ length: 5 }).map((_, index) => (
        <div key={index} className="radar-skeleton__row">
          <div className="radar-skeleton__cell shimmer" />
          <div className="radar-skeleton__bar shimmer" />
          <div className="radar-skeleton__badge shimmer" />
        </div>
      ))}
    </div>
  );
}

export default function EventStudyPanel() {
  const [symbol, setSymbol] = useState('');
  const [category, setCategory] = useState('Earnings');
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const [leaderboardRows, setLeaderboardRows] = useState(DEMO_RADAR_ROWS);
  const [leaderboardLoading, setLeaderboardLoading] = useState(true);
  const [leaderboardError, setLeaderboardError] = useState(null);
  const [leaderboardMeta, setLeaderboardMeta] = useState({ source: 'demo', lastUpdated: null, usingFallback: true });

  const [selectedRadarRow, setSelectedRadarRow] = useState(DEMO_RADAR_ROWS[0]);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(max-width: 767px)').matches;
  });

  const fetchEventStudy = useCallback(async (symbolOverride, options = {}) => {
    const nextSymbol = (symbolOverride ?? symbol).trim();
    if (!nextSymbol) return;
    if (!options.silent) {
      setSymbol(nextSymbol.toUpperCase());
    }
    setLoading(true);
    setError(null);
    if (!options.keepPrevious) {
      setData(null);
    }

    try {
      const res = await fetch(`${API_BASE}/event-study?symbol=${nextSymbol.toUpperCase()}&category=${category}`);
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

  const handleSubmit = useCallback((e) => {
    e?.preventDefault();
    fetchEventStudy(symbol);
  }, [fetchEventStudy, symbol]);

  const fetchLeaderboard = useCallback(async () => {
    const controller = new AbortController();
    setLeaderboardLoading(true);
    setLeaderboardError(null);

    try {
      const payload = await fetchLeaderboardPayload(controller.signal);
      setLeaderboardRows(payload.rows);
      setSelectedRadarRow((current) => {
        if (!current) return payload.rows[0] ?? null;
        return payload.rows.find((row) => row.ticker === current.ticker) ?? payload.rows[0] ?? null;
      });
      setLeaderboardMeta({
        source: payload.source,
        lastUpdated: payload.lastUpdated,
        usingFallback: false,
      });
    } catch (err) {
      setLeaderboardRows(DEMO_RADAR_ROWS);
      setSelectedRadarRow((current) => current ?? DEMO_RADAR_ROWS[0]);
      setLeaderboardError(err.message);
      setLeaderboardMeta({
        source: 'demo-fallback',
        lastUpdated: null,
        usingFallback: true,
      });
    } finally {
      setLeaderboardLoading(false);
    }

    return () => controller.abort();
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    setLeaderboardLoading(true);
    setLeaderboardError(null);

    (async () => {
      try {
        const payload = await fetchLeaderboardPayload(controller.signal);
        setLeaderboardRows(payload.rows);
        setSelectedRadarRow(payload.rows[0] ?? null);
        setLeaderboardMeta({
          source: payload.source,
          lastUpdated: payload.lastUpdated,
          usingFallback: false,
        });
      } catch (err) {
        setLeaderboardRows(DEMO_RADAR_ROWS);
        setSelectedRadarRow(DEMO_RADAR_ROWS[0]);
        setLeaderboardError(err.message);
        setLeaderboardMeta({
          source: 'demo-fallback',
          lastUpdated: null,
          usingFallback: true,
        });
      } finally {
        setLeaderboardLoading(false);
      }
    })();

    return () => controller.abort();
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return undefined;
    const media = window.matchMedia('(max-width: 767px)');
    const update = () => setIsMobile(media.matches);
    update();
    media.addEventListener('change', update);
    return () => media.removeEventListener('change', update);
  }, []);

  useEffect(() => {
    if (typeof document === 'undefined') return undefined;
    const original = document.body.style.overflow;
    if (drawerOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = original;
    }
    return () => {
      document.body.style.overflow = original;
    };
  }, [drawerOpen]);

  const radarRows = useMemo(() => {
    if (Array.isArray(data?.leaderboard) && data.leaderboard.length > 0) {
      return data.leaderboard.map(normalizeLeaderboardRow);
    }
    return leaderboardRows;
  }, [data, leaderboardRows]);

  const handleSelectRadarRow = useCallback((row) => {
    setSelectedRadarRow(row);
    setDrawerOpen(true);
    setSymbol(row.ticker);
    fetchEventStudy(row.ticker, { keepPrevious: true, silent: true });
  }, [fetchEventStudy]);

  return (
    <div className="dashboard-grid fade-in flex flex-col gap-4 event-study-shell">
      <div className="glass-panel w-full event-study-workbench">
        <div className="panel-header">
          <Crosshair size={18} className="text-accent" />
          <span>事件研究回測矩陣 (Event Study Matrix)</span>
          <span className="badge panel-badge radar-panel-badge">D1 Data Lake</span>
        </div>

        <div>
          <form onSubmit={handleSubmit} className="flex gap-4 items-end" style={{ display: 'flex', gap: '1rem', alignItems: 'flex-end' }}>
            <div style={{ flex: 1 }}>
              <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>股票代號 (Ticker)</label>
              <input
                className="event-study-input"
                type="text"
                value={symbol}
                onChange={(e) => setSymbol(e.target.value)}
                placeholder="e.g. NVDA, SPY"
              />
            </div>
            <div style={{ flex: 1 }}>
              <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>事件分類 (Category)</label>
              <select
                className="event-study-input"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="Earnings">財報 (Earnings)</option>
                <option value="FOMC">議息會議 (FOMC)</option>
                <option value="CPI">通膨數據 (CPI)</option>
                <option value="PPI">生產者物價指數 (PPI)</option>
                <option value="GDP">國內生產毛額 (GDP)</option>
                <option value="NFP">非農就業 (NFP)</option>
              </select>
            </div>
            <button
              type="submit"
              disabled={loading || !symbol}
              className="event-study-submit"
            >
              {loading ? <Clock size={16} /> : <Search size={16} />}
              {loading ? '回測中...' : '執行回測'}
            </button>
          </form>

          {error && (
            <div style={{ marginTop: '1rem', padding: '1rem', background: 'rgba(139,0,0,0.08)', border: '1px solid rgba(139,0,0,0.18)', borderRadius: '10px', color: '#8b0000' }}>
              <p>{error}</p>
            </div>
          )}
        </div>
      </div>

      <div className="glass-panel event-study-workbench">
        <div className="panel-header">
          <Radar size={18} className="text-accent" />
          <span>Catalyst Radar</span>
          <span className="badge panel-badge radar-panel-badge">{leaderboardMeta.usingFallback ? 'Demo Fallback' : 'R2 Live Feed'}</span>
        </div>

        <div className="event-study-feedbar">
          <div className="event-study-feedbar__meta">
            <Database size={14} />
            <span>Source: {leaderboardMeta.source}</span>
            <span>Rows: {radarRows.length}</span>
            <span>Updated: {leaderboardMeta.lastUpdated ? new Date(leaderboardMeta.lastUpdated).toLocaleString() : 'n/a'}</span>
          </div>
          <button className="event-study-refresh" onClick={fetchLeaderboard} disabled={leaderboardLoading}>
            <RefreshCcw size={14} />
            {leaderboardLoading ? '同步中...' : '刷新 Radar'}
          </button>
        </div>

        {leaderboardError ? (
          <div className="event-study-soft-alert" style={{ background: 'rgba(251, 191, 36, 0.1)', color: '#b45309', borderColor: 'rgba(217, 119, 6, 0.2)' }}>
            <AlertCircle size={16} />
            <span>智能連線超時，啟動備用迴路。目前顯示 Demo Data 展示用數據。</span>
          </div>
        ) : null}

        {leaderboardLoading ? (
          <RadarSkeleton />
        ) : (
          <CatalystRadarTable
            rows={radarRows}
            selectedTicker={selectedRadarRow?.ticker}
            onSelect={handleSelectRadarRow}
          />
        )}
      </div>

      <AnimatePresence>
        {data && data.summary && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}
          >
            <div className="grid-4" style={{ gridTemplateColumns: 'repeat(5, 1fr)' }}>
              <div className="glass-panel stat-card event-study-workbench">
                <span className="stat-label">有效事件樣本</span>
                <div className="stat-value text-accent">{data.summary.total_events}<span style={{ fontSize: '1rem' }}>次</span></div>
              </div>
              <div className="glass-panel stat-card event-study-workbench">
                <span className="stat-label">T+10 日勝率</span>
                <div className={`stat-value ${data.summary.win_rate >= 50 ? 'text-success' : 'text-danger'}`}>{data.summary.win_rate}%</div>
              </div>
              <div className="glass-panel stat-card event-study-workbench">
                <span className="stat-label">T-5 日偷步 (Run-up)</span>
                <div className={`stat-value ${data.summary.avg_drift_m5 > 0 ? 'text-success' : 'text-danger'}`}>{data.summary.avg_drift_m5}%</div>
              </div>
              <div className="glass-panel stat-card event-study-workbench">
                <span className="stat-label">T+1 日裂口波動</span>
                <div className="stat-value text-warning">{data.summary.avg_t1_abs_volatility}%</div>
              </div>
              <div className="glass-panel stat-card event-study-workbench">
                <span className="stat-label">T+5 日最大回撤</span>
                <div className="stat-value text-danger">{data.summary.avg_max_dd_5}%</div>
              </div>
            </div>

            <div className="glass-panel w-full event-study-workbench">
              <div className="panel-header">
                <BarChart3 size={18} className="text-accent" />
                <span>T±10 歷史對撞矩陣清單</span>
              </div>
              <div style={{ overflowX: 'auto' }}>
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>Event Date</th>
                      <th>Sentiment</th>
                      <th style={{ textAlign: 'right' }}>T-10 (%)</th>
                      <th style={{ textAlign: 'right' }}>T-5 (%)</th>
                      <th style={{ textAlign: 'right' }}>T+1 (%)</th>
                      <th style={{ textAlign: 'right' }}>Max DD 5D (%)</th>
                      <th style={{ textAlign: 'right' }}>T+10 (%)</th>
                      <th style={{ textAlign: 'center' }}>Result</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.details.map((row, i) => (
                      <tr key={i}>
                        <td className="mono text-accent">{row.event_date}</td>
                        <td>
                          <span className={`badge ${row.sentiment.toLowerCase() === 'beat' ? 'active' : row.sentiment.toLowerCase() === 'miss' ? 'inactive' : 'pending'}`}>
                            {row.sentiment}
                          </span>
                        </td>
                        <td style={{ textAlign: 'right' }} className={row.drift_m10 > 0 ? 'text-success' : 'text-danger'}>{row.drift_m10}</td>
                        <td style={{ textAlign: 'right' }} className={row.drift_m5 > 0 ? 'text-success' : 'text-danger'}>{row.drift_m5}</td>
                        <td style={{ textAlign: 'right', fontWeight: 'bold' }} className={row.t1_return > 0 ? 'text-success' : 'text-danger'}>{row.t1_return}</td>
                        <td style={{ textAlign: 'right' }} className="text-danger">{row.max_dd_5}</td>
                        <td style={{ textAlign: 'right', fontWeight: 'bold' }} className={row.t10_return > 0 ? 'text-success' : 'text-danger'}>{row.t10_return}</td>
                        <td style={{ textAlign: 'center' }}>
                          {row.win ? <span className="text-success font-bold">W</span> : <span className="text-danger font-bold">L</span>}
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

      <AnimatePresence>
        {drawerOpen && selectedRadarRow ? (
          <>
            <motion.button
              type="button"
              className="xray-drawer-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setDrawerOpen(false)}
              aria-label="Close drawer backdrop"
            />
            <motion.aside
              className="xray-drawer"
              initial={isMobile ? { opacity: 0, y: 56 } : { opacity: 0, x: 48 }}
              animate={isMobile ? { opacity: 1, y: 0 } : { opacity: 1, x: 0 }}
              exit={isMobile ? { opacity: 0, y: 64 } : { opacity: 0, x: 56 }}
              transition={{ type: 'tween', ease: 'easeOut', duration: 0.24 }}
            >
              <OpportunityXRayCard
                row={selectedRadarRow}
                onClose={() => setDrawerOpen(false)}
                eventStudy={data}
                eventStudyLoading={loading}
                eventStudyError={error}
              />
            </motion.aside>
          </>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
