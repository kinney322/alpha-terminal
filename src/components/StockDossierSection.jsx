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
    <div className="stock-dossier-section fade-in" style={{ padding: '24px', maxWidth: '1000px', margin: '0 auto' }}>
      <div style={{ marginBottom: '24px' }}>
        <button
          onClick={handleBackToIndex}
          style={{
            background: 'none',
            border: 'none',
            color: 'var(--brand-blue, #2563eb)',
            cursor: 'pointer',
            fontWeight: 'bold',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '8px 0'
          }}
        >
          <span>←</span> Back to Dossier Index
        </button>
      </div>

      <div className="card" style={{ padding: '32px', background: 'var(--surface-color)', borderRadius: '8px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}>
        {resolvedDetail ? (
          <StockDossierView eventDetail={resolvedDetail} payload={payload} />
        ) : (
          <div style={{ color: 'var(--text-muted)' }}>No dossier data available.</div>
        )}
      </div>
    </div>
  );
}
