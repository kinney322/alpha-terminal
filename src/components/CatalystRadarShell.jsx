import React, { useState, useEffect } from 'react';
import RadarMasterView from './RadarMasterView';
import SelectedCatalystIntelligence from './SelectedCatalystIntelligence';
import { fetchAndNormalizeRadarPayload } from '../data/payloadAdapter';
import './CatalystRadar.css';

const CatalystRadarShell = () => {
  const [selectedEventId, setSelectedEventId] = useState(null);
  const [payload, setPayload] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchAndNormalizeRadarPayload()
      .then(data => {
        setPayload(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to fetch radar payload:", err);
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const handleSelectEvent = (eventId) => {
    setSelectedEventId(eventId);
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
            onClick={() => setSelectedEventId(null)}
          />
          <aside className="radar-detail-pane fade-in" role="dialog" aria-modal="true">
            <SelectedCatalystIntelligence 
              eventDetail={payload.events_detail[selectedEventId]}
              peerReadthroughCases={payload.peer_readthrough_cases || {}}
              onClose={() => setSelectedEventId(null)}
            />
          </aside>
        </>
      )}
    </div>
  );
};

export default CatalystRadarShell;
