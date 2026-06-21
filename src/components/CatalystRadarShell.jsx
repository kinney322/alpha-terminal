import React, { useEffect, useState } from 'react';
import RadarMasterView from './RadarMasterView';
import SelectedCatalystIntelligence from './SelectedCatalystIntelligence';
import OpportunityXRayCard from './OpportunityXRayCard';
import { fetchPreopenCatalystRadarPayload } from '../data/payloadAdapter';
import './CatalystRadar.css';

const CatalystRadarShell = ({ payload, loading, error, onOpenStockDossier, locale = 'en' }) => {
  const [selectedEventId, setSelectedEventId] = useState(null);
  const [selectedEventDetailOverride, setSelectedEventDetailOverride] = useState(null);
  const [selectedXRayRow, setSelectedXRayRow] = useState(null);
  const [preopenPayload, setPreopenPayload] = useState(null);

  useEffect(() => {
    if (loading || error || !payload) {
      setPreopenPayload(null);
      return undefined;
    }

    let alive = true;
    fetchPreopenCatalystRadarPayload()
      .then((data) => {
        if (alive) setPreopenPayload(data);
      })
      .catch((err) => {
        if (!alive) return;
        console.warn('Failed to load dedicated preopen catalyst payload; falling back to canonical radar payload.', err);
        setPreopenPayload(null);
      });

    return () => {
      alive = false;
    };
  }, [payload, loading, error]);

  const handleSelectEvent = (eventId, eventDetailOverride = null, xrayRow = null) => {
    setSelectedEventId(eventId);
    setSelectedEventDetailOverride(eventDetailOverride);
    setSelectedXRayRow(xrayRow);
  };

  const handleCloseDetail = () => {
    setSelectedEventId(null);
    setSelectedEventDetailOverride(null);
    setSelectedXRayRow(null);
  };

  if (loading) {
    return <div className="fade-in" style={{padding: '40px', color: 'var(--text-muted)'}}>{locale === 'zh' ? '正在載入財報雷達...' : 'Loading Radar Data...'}</div>;
  }

  if (error) {
    return <div className="fade-in" style={{padding: '40px', color: '#dc2626'}}>{locale === 'zh' ? '錯誤' : 'Error'}: {error}</div>;
  }

  return (
    <div className="catalyst-radar-shell fade-in">
      <div className="radar-master-pane">
        <RadarMasterView 
          payload={payload} 
          preopenPayload={preopenPayload}
          selectedEventId={selectedEventId} 
          onSelectEvent={handleSelectEvent} 
          locale={locale}
        />
      </div>
      
      {selectedEventId && (
        <>
          <button
            className="radar-detail-backdrop"
            aria-label="Close catalyst detail"
            onClick={handleCloseDetail}
          />
          <aside className="radar-detail-pane fade-in" role="dialog" aria-modal="true">
            {selectedXRayRow ? (
              <OpportunityXRayCard
                row={selectedXRayRow}
                onClose={handleCloseDetail}
                locale={locale}
              />
            ) : (
              <SelectedCatalystIntelligence
                eventDetail={selectedEventDetailOverride || payload.events_detail[selectedEventId]}
                payload={payload}
                peerReadthroughCases={payload.peer_readthrough_cases || {}}
                onClose={handleCloseDetail}
                onOpenStockDossier={onOpenStockDossier}
                locale={locale}
              />
            )}
          </aside>
        </>
      )}
    </div>
  );
};

export default CatalystRadarShell;
