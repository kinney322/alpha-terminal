import React, { useState } from 'react';
import RadarMasterView from './RadarMasterView';
import SelectedCatalystIntelligence from './SelectedCatalystIntelligence';
import OpportunityXRayCard from './OpportunityXRayCard';
import './CatalystRadar.css';

const CatalystRadarShell = ({ payload, loading, error, onOpenStockDossier }) => {
  const [selectedEventId, setSelectedEventId] = useState(null);
  const [selectedEventDetailOverride, setSelectedEventDetailOverride] = useState(null);
  const [selectedXRayRow, setSelectedXRayRow] = useState(null);

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
    return <div className="fade-in" style={{padding: '40px', color: 'var(--text-muted)'}}>Loading Radar Data...</div>;
  }

  if (error) {
    return <div className="fade-in" style={{padding: '40px', color: '#dc2626'}}>Error: {error}</div>;
  }

  return (
    <div className="catalyst-radar-shell fade-in">
      <div className="radar-master-pane">
        <RadarMasterView 
          payload={payload} 
          selectedEventId={selectedEventId} 
          onSelectEvent={handleSelectEvent} 
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
              />
            ) : (
              <SelectedCatalystIntelligence
                eventDetail={selectedEventDetailOverride || payload.events_detail[selectedEventId]}
                payload={payload}
                peerReadthroughCases={payload.peer_readthrough_cases || {}}
                onClose={handleCloseDetail}
                onOpenStockDossier={onOpenStockDossier}
              />
            )}
          </aside>
        </>
      )}
    </div>
  );
};

export default CatalystRadarShell;
