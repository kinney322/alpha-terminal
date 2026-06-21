import { buildMomentumUniverseSyntheticDetail } from './dossierHelpers.js';
import { displayLabel } from './displayLabelHelpers.js';

const MOMENTUM_COPY = {
  en: {
    loading: 'Loading Momentum Universe...',
    error: 'Momentum Universe payload unavailable.',
    kicker: 'Momentum Universe',
    title: 'Trend follow-through candidates ranked for research.',
    body: 'This section reads the live momentum universe contract and keeps scanner rank, scanner score, relative strength, price, and SMA distance in one place.',
    rank: 'Rank',
    ticker: 'Ticker',
    theme: 'Theme',
    scannerScore: 'Scanner Score',
    rsPercentile: 'RS Percentile',
    price: 'Price',
    setup: 'Setup',
    action: 'Action',
    openDossier: 'Open Dossier',
    empty: 'No momentum universe rankings available.',
    coverageWatch: 'Coverage Watch',
    notRankable: 'Not Yet Rankable',
    coverageBody: 'Active coverage names that are not ranked because scanner inputs are not ready yet.',
    nameSingular: 'name',
    namePlural: 'names',
    reason: 'Reason',
    source: 'Source',
    unmapped: 'Unmapped',
    inputHistoryUnavailable: 'Input history unavailable',
    insufficientHistory: 'Insufficient OHLCV history',
    missingOhlcv: 'Missing OHLCV',
    missingPrice: 'Missing price history'
  },
  zh: {
    loading: '正在載入動能宇宙...',
    error: '動能宇宙資料暫時無法取得。',
    kicker: '動能宇宙',
    title: '按研究優先次序排列的趨勢延續候選名單。',
    body: '這裡集中顯示即時動能排名、掃描分數、相對強度、價格與均線距離。',
    rank: '排名',
    ticker: '股票',
    theme: '主題',
    scannerScore: '掃描分數',
    rsPercentile: '相對強度百分位',
    price: '價格',
    setup: '結構',
    action: '動作',
    openDossier: '打開股票檔案',
    empty: '暫無動能宇宙排名。',
    coverageWatch: '覆蓋觀察',
    notRankable: '暫未可排名',
    coverageBody: '已納入覆蓋但掃描輸入尚未準備好，因此暫未排名。',
    nameSingular: '隻股票',
    namePlural: '隻股票',
    reason: '原因',
    source: '來源',
    unmapped: '未分類',
    inputHistoryUnavailable: '輸入歷史不足',
    insufficientHistory: 'OHLCV 歷史不足',
    missingOhlcv: '缺少 OHLCV',
    missingPrice: '缺少價格歷史'
  }
};

const formatNumber = (value, suffix = '') => {
  if (value === null || value === undefined || value === '') return '-';
  const num = Number(value);
  if (!Number.isFinite(num)) return String(value);
  return `${Math.round(num * 100) / 100}${suffix}`;
};

const formatUnavailableReason = (value, copy) => {
  if (!value) return copy.inputHistoryUnavailable;
  const normalized = String(value).replace(/_/g, ' ').trim().toLowerCase();
  if (normalized === 'insufficient ohlcv history') return copy.insufficientHistory;
  if (normalized === 'missing ohlcv') return copy.missingOhlcv;
  if (normalized === 'missing price') return copy.missingPrice;
  return normalized.replace(/\b\w/g, (char) => char.toUpperCase());
};

const SetupBadge = ({ setup, locale = 'en' }) => {
  if (!setup || setup.status === 'unavailable') {
    return <span className="crowdrisk-muted">—</span>;
  }
  const label = (locale === 'zh' ? setup.status_label_zh : setup.status_label_en) || setup.status_label_en || setup.status_label_zh || setup.daily_action || '—';
  return <span className="momentum-setup-badge">{label}</span>;
};

function MomentumUniverseSection({ payload, loading, error, onOpenStockDossier, locale = 'en' }) {
  const copy = MOMENTUM_COPY[locale] || MOMENTUM_COPY.en;
  const rankings = payload?.momentum_universe?.rankings || [];
  const unavailableRows = payload?.momentum_universe?.unavailable || [];

  const openDossier = (row) => {
    const detail = buildMomentumUniverseSyntheticDetail(row.ticker, payload);
    if (detail) onOpenStockDossier(row.ticker, detail);
  };

  if (loading) {
    return <div className="crowdrisk-panel-message">{copy.loading}</div>;
  }

  if (error) {
    return <div className="crowdrisk-panel-message error">{copy.error}</div>;
  }

  return (
    <section className="momentum-universe-panel">
      <div className="crowdrisk-section-heading">
        <p className="crowdrisk-kicker">{copy.kicker}</p>
        <h1>{copy.title}</h1>
        <p>
          {copy.body}
        </p>
      </div>

      <div className="momentum-universe-table-wrap">
        <table className="momentum-universe-table">
          <thead>
            <tr>
              <th>{copy.rank}</th>
              <th>{copy.ticker}</th>
              <th>{copy.theme}</th>
              <th>{copy.scannerScore}</th>
              <th>{copy.rsPercentile}</th>
              <th>{copy.price}</th>
              <th>50SMA</th>
              <th>200SMA</th>
              <th>{copy.setup}</th>
              <th>{copy.action}</th>
            </tr>
          </thead>
          <tbody>
            {rankings.map((row, idx) => (
              <tr key={`${row.ticker}-${idx}`}>
                <td>#{row.scanner_rank || row.rank || idx + 1}</td>
                <td>
                  <strong>{row.ticker}</strong>
                </td>
                <td>{displayLabel(row.industry_theme_label || row.primary_theme || row.industry_theme || row.theme, locale, copy.unmapped)}</td>
                <td>{formatNumber(row.scanner_score || row.leaderboard_score)}</td>
                <td>{formatNumber(row.relative_strength_percentile, '%')}</td>
                <td>{formatNumber(row.price ? `$${row.price}` : null)}</td>
                <td>{formatNumber(row.price_vs_sma50_pct, '%')}</td>
                <td>{formatNumber(row.price_vs_sma200_pct, '%')}</td>
                <td>
                  <SetupBadge setup={row.trend_setup?.technical_setup} locale={locale} />
                </td>
                <td>
                  <button type="button" onClick={() => openDossier(row)}>
                    {copy.openDossier} →
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {!rankings.length && (
          <div className="crowdrisk-empty-state">{copy.empty}</div>
        )}
      </div>

      {!!unavailableRows.length && (
        <div className="momentum-unavailable-panel" aria-label="Momentum coverage not yet rankable">
          <div className="momentum-unavailable-heading">
            <div>
              <p className="crowdrisk-kicker">{copy.coverageWatch}</p>
              <h2>{copy.notRankable}</h2>
              <p>{copy.coverageBody}</p>
            </div>
            <span>{unavailableRows.length} {unavailableRows.length === 1 ? copy.nameSingular : copy.namePlural}</span>
          </div>

          <div className="momentum-unavailable-list">
            {unavailableRows.map((row) => (
              <div className="momentum-unavailable-row" key={row.ticker}>
                <div>
                  <strong>{row.ticker}</strong>
                  <span>{displayLabel(row.industry_theme_label || row.industry_theme || row.theme, locale, copy.unmapped)}</span>
                </div>
                <div>
                  <span className="momentum-unavailable-label">{copy.reason}</span>
                  <strong>{formatUnavailableReason(row.unavailable_reason || row.reason, copy)}</strong>
                </div>
                <div>
                  <span className="momentum-unavailable-label">{copy.source}</span>
                  <strong>{row.source || 'momentum universe'}</strong>
                </div>
                <button type="button" onClick={() => openDossier(row)}>
                  {copy.openDossier} →
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
