import React, { useState, useEffect, useMemo } from 'react';
import StockDossierIndex from './StockDossierIndex';
import StockDossierView from './StockDossierView';
import { buildDossierRecords, normalizeTicker } from './dossierHelpers';
import { getStockDossierProfile } from '../data/stockDossierProfiles';

const DOSSIER_SECTIONS = [
  { id: 'company-overview', label: 'Company Overview' },
  { id: 'valuation-core', label: 'Valuation Core' },
  { id: 'market-evidence', label: 'Market Evidence' },
  { id: 'scenario-range', label: 'Scenario Range' },
  { id: 'kill-data', label: 'Kill Data' }
];

const scrollDossierToTop = () => {
  document.querySelector('.stock-dossier-section')?.scrollIntoView({ block: 'start' });
  const main = document.querySelector('.main-content');
  if (main) {
    main.scrollTop = 0;
    main.scrollLeft = 0;
  }
  window.scrollTo(0, 0);
};

export default function StockDossierSection({ payload, loading, error, dossierSeed, onClearSeed, onOpenEventStudy }) {
  const [selectedTicker, setSelectedTicker] = useState(null);
  const [selectedEventDetail, setSelectedEventDetail] = useState(null);
  const [activeSection, setActiveSection] = useState(DOSSIER_SECTIONS[0].id);

  useEffect(() => {
    if (dossierSeed) {
      setSelectedTicker(dossierSeed.ticker);
      setSelectedEventDetail(dossierSeed.eventDetail);
    } else {
      setSelectedTicker(null);
      setSelectedEventDetail(null);
    }
  }, [dossierSeed]);

  useEffect(() => {
    if (!selectedTicker) return;
    window.requestAnimationFrame(scrollDossierToTop);
    const scrollTimer = window.setTimeout(scrollDossierToTop, 80);
    return () => window.clearTimeout(scrollTimer);
  }, [selectedTicker]);

  const records = useMemo(() => buildDossierRecords(payload), [payload]);

  const resolvedDetail = useMemo(() => {
    if (!selectedTicker) return null;
    const record = records.find(r => r.ticker === normalizeTicker(selectedTicker));
    return record?.primaryEventDetail || selectedEventDetail;
  }, [selectedTicker, records, selectedEventDetail]);

  const dossierProfile = useMemo(() => {
    if (!selectedTicker) return null;
    return getStockDossierProfile(selectedTicker);
  }, [selectedTicker]);

  useEffect(() => {
    if (!selectedTicker) return undefined;

    const sections = DOSSIER_SECTIONS
      .map(section => document.getElementById(section.id))
      .filter(Boolean);

    if (sections.length === 0) return undefined;

    const observer = new IntersectionObserver((entries) => {
      const visible = entries
        .filter(entry => entry.isIntersecting)
        .sort((a, b) => (
          Math.abs(a.boundingClientRect.top - 132) - Math.abs(b.boundingClientRect.top - 132)
        ))[0];

      if (visible?.target?.id) {
        setActiveSection(visible.target.id);
      }
    }, {
      rootMargin: '-22% 0px -58% 0px',
      threshold: [0.12, 0.24, 0.48]
    });

    sections.forEach(section => observer.observe(section));

    return () => observer.disconnect();
  }, [selectedTicker, resolvedDetail]);

  if (loading) {
    return <div className="fade-in" style={{padding: '40px', color: 'var(--text-muted)'}}>Loading Dossier Data...</div>;
  }

  if (error) {
    return <div className="fade-in" style={{padding: '40px', color: '#dc2626'}}>Error: {error}</div>;
  }

  const handleOpenTicker = (ticker, eventDetail) => {
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }
    setSelectedTicker(ticker);
    setSelectedEventDetail(eventDetail);
    window.setTimeout(scrollDossierToTop, 0);
  };

  const handleBackToIndex = () => {
    setSelectedTicker(null);
    setSelectedEventDetail(null);
    if (onClearSeed) onClearSeed();
  };

  if (!selectedTicker) {
    return <StockDossierIndex payload={payload} onOpenTicker={handleOpenTicker} />;
  }

  const companyLogoUrl = resolvedDetail?.company_logo_url
    || resolvedDetail?.logo_url
    || dossierProfile?.logoUrl
    || '';
  const companyName = resolvedDetail?.company_name || dossierProfile?.companyName || selectedTicker;
  const exchange = resolvedDetail?.exchange || dossierProfile?.exchange || '';
  const tickerLine = exchange ? `${exchange}:${normalizeTicker(selectedTicker)}` : normalizeTicker(selectedTicker);
  const researchState = resolvedDetail?.event_phase === 'post_earnings'
    ? 'Post-Earnings Watch'
    : resolvedDetail?.status === 'momentum_universe' || resolvedDetail?.event_phase === 'off_cycle_universe'
      ? 'Momentum Candidate'
      : 'Catalyst Watch';

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
          <div className="stock-dossier-side-profile">
            <div className={`stock-dossier-side-logo ${companyLogoUrl ? 'has-logo' : ''}`}>
              {companyLogoUrl && (
                <img
                  src={companyLogoUrl}
                  alt={`${companyName} logo`}
                  onError={(event) => {
                    event.currentTarget.style.display = 'none';
                    event.currentTarget.parentElement?.classList.add('logo-fallback-visible');
                  }}
                />
              )}
              <span>{normalizeTicker(selectedTicker).slice(0, 4)}</span>
            </div>
            <div>
              <strong>{companyName}</strong>
              <span>{tickerLine} Stock Dossier</span>
            </div>
          </div>
          <div className="stock-dossier-side-state">
            <span>Research State</span>
            <strong>{researchState}</strong>
          </div>
          <p className="crowdrisk-kicker">Dossier Sections</p>
          <nav className="stock-dossier-side-links">
            {DOSSIER_SECTIONS.map((section, index) => (
              <a
                key={section.id}
                href={`#${section.id}`}
                className={activeSection === section.id ? 'active' : ''}
                onClick={() => setActiveSection(section.id)}
              >
                <span>{index + 1}</span>
                {section.label}
              </a>
            ))}
          </nav>
        </aside>

        <div className="card stock-dossier-content-card">
          {resolvedDetail ? (
            <StockDossierView
              eventDetail={resolvedDetail}
              payload={payload}
              onOpenEventStudy={onOpenEventStudy}
            />
          ) : (
            <div style={{ color: 'var(--text-muted)' }}>No dossier data available.</div>
          )}
        </div>
      </div>
    </div>
  );
}
