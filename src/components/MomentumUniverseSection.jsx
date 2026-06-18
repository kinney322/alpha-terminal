import { buildMomentumUniverseSyntheticDetail } from './dossierHelpers.js';

const formatNumber = (value, suffix = '') => {
  if (value === null || value === undefined || value === '') return '-';
  const num = Number(value);
  if (!Number.isFinite(num)) return String(value);
  return `${Math.round(num * 100) / 100}${suffix}`;
};

const formatUnavailableReason = (value) => {
  if (!value) return 'Input history unavailable';
  const normalized = String(value).replace(/_/g, ' ').trim().toLowerCase();
  if (normalized === 'insufficient ohlcv history') return 'Insufficient OHLCV history';
  if (normalized === 'missing ohlcv') return 'Missing OHLCV';
  if (normalized === 'missing price') return 'Missing price history';
  return normalized.replace(/\b\w/g, (char) => char.toUpperCase());
};

const SetupBadge = ({ setup }) => {
  if (!setup || setup.status === 'unavailable') {
    return <span className="crowdrisk-muted">—</span>;
  }
  const label = setup.status_label_en || setup.status_label_zh || setup.daily_action || '—';
  return <span className="momentum-setup-badge">{label}</span>;
};

function MomentumUniverseSection({ payload, loading, error, onOpenStockDossier }) {
  const rankings = payload?.momentum_universe?.rankings || [];
  const unavailableRows = payload?.momentum_universe?.unavailable || [];

  const openDossier = (row) => {
    const detail = buildMomentumUniverseSyntheticDetail(row.ticker, payload);
    if (detail) onOpenStockDossier(row.ticker, detail);
  };

  if (loading) {
    return <div className="crowdrisk-panel-message">Loading Momentum Universe...</div>;
  }

  if (error) {
    return <div className="crowdrisk-panel-message error">Momentum Universe payload unavailable.</div>;
  }

  return (
    <section className="momentum-universe-panel">
      <div className="crowdrisk-section-heading">
        <p className="crowdrisk-kicker">Momentum Universe</p>
        <h1>Trend follow-through candidates ranked for research.</h1>
        <p>
          This section reads the live momentum universe contract and keeps scanner rank, scanner score,
          relative strength, price, and SMA distance in one place.
        </p>
      </div>

      <div className="momentum-universe-table-wrap">
        <table className="momentum-universe-table">
          <thead>
            <tr>
              <th>Rank</th>
              <th>Ticker</th>
              <th>Theme</th>
              <th>Scanner Score</th>
              <th>RS Percentile</th>
              <th>Price</th>
              <th>50SMA</th>
              <th>200SMA</th>
              <th>Setup</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {rankings.map((row, idx) => (
              <tr key={`${row.ticker}-${idx}`}>
                <td>#{row.scanner_rank || row.rank || idx + 1}</td>
                <td>
                  <strong>{row.ticker}</strong>
                </td>
                <td>{row.industry_theme_label || row.primary_theme || row.industry_theme || row.theme || 'Unmapped'}</td>
                <td>{formatNumber(row.scanner_score || row.leaderboard_score)}</td>
                <td>{formatNumber(row.relative_strength_percentile, '%')}</td>
                <td>{formatNumber(row.price ? `$${row.price}` : null)}</td>
                <td>{formatNumber(row.price_vs_sma50_pct, '%')}</td>
                <td>{formatNumber(row.price_vs_sma200_pct, '%')}</td>
                <td>
                  <SetupBadge setup={row.trend_setup?.technical_setup} />
                </td>
                <td>
                  <button type="button" onClick={() => openDossier(row)}>
                    Open Dossier →
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {!rankings.length && (
          <div className="crowdrisk-empty-state">No momentum universe rankings available.</div>
        )}
      </div>

      {!!unavailableRows.length && (
        <div className="momentum-unavailable-panel" aria-label="Momentum coverage not yet rankable">
          <div className="momentum-unavailable-heading">
            <div>
              <p className="crowdrisk-kicker">Coverage Watch</p>
              <h2>Not Yet Rankable</h2>
              <p>Active coverage names that are not ranked because scanner inputs are not ready yet.</p>
            </div>
            <span>{unavailableRows.length} name{unavailableRows.length === 1 ? '' : 's'}</span>
          </div>

          <div className="momentum-unavailable-list">
            {unavailableRows.map((row) => (
              <div className="momentum-unavailable-row" key={row.ticker}>
                <div>
                  <strong>{row.ticker}</strong>
                  <span>{row.industry_theme_label || row.industry_theme || row.theme || 'Unmapped'}</span>
                </div>
                <div>
                  <span className="momentum-unavailable-label">Reason</span>
                  <strong>{formatUnavailableReason(row.unavailable_reason || row.reason)}</strong>
                </div>
                <div>
                  <span className="momentum-unavailable-label">Source</span>
                  <strong>{row.source || 'momentum universe'}</strong>
                </div>
                <button type="button" onClick={() => openDossier(row)}>
                  Open Dossier →
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}

export default MomentumUniverseSection;
