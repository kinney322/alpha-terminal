import React, { useState, useEffect, useMemo } from 'react';
import StockDossierIndex from './StockDossierIndex';
import StockDossierView from './StockDossierView';
import { buildDossierRecords, normalizeTicker } from './dossierHelpers';

export default function StockDossierSection({ payload, loading, error, dossierSeed, onClearSeed }) {
  const [selectedTicker, setSelectedTicker] = useState(null);
  const [selectedEventDetail, setSelectedEventDetail] = useState(null);

  useEffect(() => {
    if (dossierSeed) {
      setSelectedTicker(dossierSeed.ticker);
      setSelectedEventDetail(dossierSeed.eventDetail);
    } else {
      setSelectedTicker(null);
      setSelectedEventDetail(null);
    }
  }, [dossierSeed]);

  const records = useMemo(() => buildDossierRecords(payload), [payload]);

  const resolvedDetail = useMemo(() => {
    if (!selectedTicker) return null;
    const record = records.find(r => r.ticker === normalizeTicker(selectedTicker));
    return record?.primaryEventDetail || selectedEventDetail;
  }, [selectedTicker, records, selectedEventDetail]);

  if (loading) {
    return <div className="fade-in" style={{padding: '40px', color: 'var(--text-muted)'}}>Loading Dossier Data...</div>;
  }

  if (error) {
    return <div className="fade-in" style={{padding: '40px', color: '#dc2626'}}>Error: {error}</div>;
  }

  const handleOpenTicker = (ticker, eventDetail) => {
    setSelectedTicker(ticker);
    setSelectedEventDetail(eventDetail);
  };

  const handleBackToIndex = () => {
    setSelectedTicker(null);
    setSelectedEventDetail(null);
    if (onClearSeed) onClearSeed();
  };

  if (!selectedTicker) {
    return <StockDossierIndex payload={payload} onOpenTicker={handleOpenTicker} />;
  }

  return (
    <div className="stock-dossier-section fade-in">
      <div className="stock-dossier-back-row">
        <button
          onClick={handleBackToIndex}
          className="stock-dossier-back-button"
        >
          <span>←</span> Back to Dossier Index
        </button>
      </div>

      <div className="stock-dossier-detail-layout">
        <aside className="stock-dossier-side-nav" aria-label="Dossier sections">
          <p className="crowdrisk-kicker">Dossier Sections</p>
          <a href="#company-overview">1. Company Overview</a>
          <a href="#valuation-core">2. Valuation Core</a>
          <a href="#market-evidence">3. Market Evidence</a>
          <a href="#scenario-range">4. Scenario Range</a>
          <a href="#kill-data">5. Kill Data</a>
        </aside>

        <div className="card stock-dossier-content-card">
          {resolvedDetail ? (
            <StockDossierView eventDetail={resolvedDetail} payload={payload} />
          ) : (
            <div style={{ color: 'var(--text-muted)' }}>No dossier data available.</div>
          )}
        </div>
      </div>
    </div>
  );
}
