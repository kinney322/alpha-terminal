import { buildMomentumUniverseSyntheticDetail } from './dossierHelpers.js';

const formatNumber = (value, suffix = '') => {
  if (value === null || value === undefined || value === '') return '-';
  const num = Number(value);
  if (!Number.isFinite(num)) return String(value);
  return `${Math.round(num * 100) / 100}${suffix}`;
};

function MomentumUniverseSection({ payload, loading, error, onOpenStockDossier }) {
  const rankings = payload?.momentum_universe?.rankings || [];

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
    </section>
  );
}

export default MomentumUniverseSection;
