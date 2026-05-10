import { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import AlphaScannerPanel from './components/AlphaScannerPanel.jsx';
import EventStudyPanel from './components/EventStudyPanel.jsx';
import QuantBotChat from './components/QuantBotChat.jsx';
import CatalystRadarShell from './components/CatalystRadarShell.jsx';
import StockDossierSection from './components/StockDossierSection.jsx';
import PublicLeaderboardPreview from './components/PublicLeaderboardPreview.jsx';
import CrowdRiskHome from './components/CrowdRiskHome.jsx';
import MomentumUniverseSection from './components/MomentumUniverseSection.jsx';
import { fetchAndNormalizeRadarPayload } from './data/payloadAdapter.js';

const PRODUCT_MODE = import.meta.env.VITE_PRODUCT_MODE || 'crowdrisk';

const CROWDRISK_SECTIONS = [
  { id: 'earnings-radar', label: 'Earnings Radar', subtitle: 'Pre / Event / Post' },
  { id: 'event-study', label: 'Event Study', subtitle: 'Historical evidence' },
  { id: 'momentum-universe', label: 'Momentum Universe', subtitle: 'Trend follow-through' },
  { id: 'stock-dossier', label: 'Stock Dossier', subtitle: 'Judgment layer' }
];

const INTERNAL_TABS = [
  { id: 'scanner', label: 'Alpha Scanner', icon: '◉' },
  { id: 'quant-chat', label: 'Quant Chatbot', icon: '◇' },
  { id: 'edge', label: 'Alpha Edge (Deep)', icon: '△' },
  { id: 'macro', label: 'Macro Sentiment', icon: '□' },
  { id: 'sports', label: 'Sports Quant', icon: '▣' }
];

const scrollViewportToTop = () => {
  document.querySelector('.crowdrisk-app')?.scrollIntoView({ block: 'start' });
  window.scrollTo({ top: 0, left: 0 });
  if (document.scrollingElement) {
    document.scrollingElement.scrollTop = 0;
    document.scrollingElement.scrollLeft = 0;
  }
  document.documentElement.scrollTop = 0;
  document.body.scrollTop = 0;
};

function App() {
  const isCrowdRisk = PRODUCT_MODE === 'crowdrisk';
  const [activeTab, setActiveTab] = useState(isCrowdRisk ? 'home' : 'scanner');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [payload, setPayload] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [dossierSeed, setDossierSeed] = useState(null);

  useEffect(() => {
    let alive = true;
    fetchAndNormalizeRadarPayload()
      .then((data) => {
        if (!alive) return;
        setPayload(data);
        setError(null);
      })
      .catch((err) => {
        if (!alive) return;
        console.error('Failed to load CrowdRisk radar payload', err);
        setError(err);
      })
      .finally(() => {
        if (alive) setLoading(false);
      });
    return () => {
      alive = false;
    };
  }, []);

  useEffect(() => {
    scrollViewportToTop();
    const scrollTimer = window.setTimeout(scrollViewportToTop, 0);
    const scrollAnchorTimer = window.setTimeout(scrollViewportToTop, 80);
    return () => {
      window.clearTimeout(scrollTimer);
      window.clearTimeout(scrollAnchorTimer);
    };
  }, [activeTab]);

  const handleOpenStockDossier = (ticker, eventDetail) => {
    setDossierSeed({ ticker, eventDetail });
    setActiveTab(isCrowdRisk ? 'stock-dossier' : 'dossier');
    setIsMobileMenuOpen(false);
  };

  const handleNavigate = (tabId) => {
    if (tabId !== 'stock-dossier' && tabId !== 'dossier') {
      setDossierSeed(null);
    }
    setActiveTab(tabId);
    setIsMobileMenuOpen(false);
    scrollViewportToTop();
    window.setTimeout(scrollViewportToTop, 80);
  };

  const lastUpdated = useMemo(() => {
    const generatedAt = payload?.meta?.generated_at || payload?.generated_at;
    if (!generatedAt) return loading ? 'Loading' : 'Not available';
    try {
      return new Intl.DateTimeFormat('en-US', {
        month: 'short',
        day: 'numeric',
        hour: 'numeric',
        minute: '2-digit'
      }).format(new Date(generatedAt));
    } catch {
      return generatedAt;
    }
  }, [loading, payload]);

  const crowdRiskPanels = {
    home: (
      <CrowdRiskHome
        payload={payload}
        loading={loading}
        error={error}
        onNavigate={handleNavigate}
        onOpenStockDossier={handleOpenStockDossier}
      />
    ),
    'earnings-radar': (
      <CatalystRadarShell
        payload={payload}
        loading={loading}
        error={error}
        onOpenStockDossier={handleOpenStockDossier}
      />
    ),
    'event-study': <EventStudyPanel />,
    'momentum-universe': (
      <MomentumUniverseSection
        payload={payload}
        loading={loading}
        error={error}
        onOpenStockDossier={handleOpenStockDossier}
      />
    ),
    'stock-dossier': (
      <StockDossierSection
        payload={payload}
        loading={loading}
        error={error}
        dossierSeed={dossierSeed}
        onClearSeed={() => setDossierSeed(null)}
      />
    )
  };

  const internalPanels = {
    scanner: <AlphaScannerPanel />,
    'quant-chat': <QuantBotChat />,
    edge: <div className="fade-in"><h2 className="section-title">Coming Soon</h2></div>,
    macro: <div className="fade-in"><h2 className="section-title">Coming Soon</h2></div>,
    sports: <div className="fade-in"><h2 className="section-title">Coming Soon</h2></div>
  };

  if (isCrowdRisk) {
    return (
      <div className="crowdrisk-app">
        <header className="crowdrisk-topbar">
          <button
            className="crowdrisk-brand"
            type="button"
            onClick={() => handleNavigate('home')}
            aria-label="Go to CrowdRisk home"
          >
            <span>CrowdRisk</span>
            <small>Follow the trend. Find the opportunity.</small>
          </button>

          <div className="crowdrisk-topbar-right">
            {activeTab !== 'home' && (
              <nav className="crowdrisk-section-nav" aria-label="CrowdRisk sections">
                {CROWDRISK_SECTIONS.map((section) => (
                  <button
                    key={section.id}
                    type="button"
                    className={activeTab === section.id ? 'active' : ''}
                    onClick={() => handleNavigate(section.id)}
                    title={section.subtitle}
                  >
                    {section.label}
                  </button>
                ))}
              </nav>
            )}
            <div className="crowdrisk-global-status" aria-label="CrowdRisk display status">
              <span>Light / Dark</span>
              <span>Last updated {lastUpdated}</span>
            </div>
          </div>
        </header>

        <main className="crowdrisk-main">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              {crowdRiskPanels[activeTab] || crowdRiskPanels.home}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    );
  }

  return (
    <div className="app-container">
      <button
        type="button"
        className="mobile-menu-toggle"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      >
        {isMobileMenuOpen ? 'Close' : 'Menu'}
      </button>

      <aside className={`sidebar ${isMobileMenuOpen ? 'open' : ''}`}>
        <div className="brand">
          <div className="brand-mark">AT</div>
          <div>
            <h1>AlphaTerminal</h1>
            <p>Omni-Scanner v4</p>
          </div>
        </div>

        <nav className="nav-sections">
          <p className="nav-label">Intelligence</p>
          {INTERNAL_TABS.map((tab) => (
            <button
              key={tab.id}
              type="button"
              className={activeTab === tab.id ? 'active' : ''}
              onClick={() => handleNavigate(tab.id)}
            >
              <span className="nav-icon">{tab.icon}</span>
              <span>{tab.label}</span>
            </button>
          ))}
        </nav>

        <div className="sidebar-footer">
          <p>Live Polling</p>
          <strong>EST Timezone</strong>
        </div>
      </aside>

      <main className="main-content">
        <header className="topbar">
          <div>
            <p className="eyebrow">Operational Quant Console</p>
            <h2>Omni-Scanner v4</h2>
          </div>
          <div className="status-pill">E-Ink Light Mode Active</div>
        </header>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.2 }}
          >
            {internalPanels[activeTab]}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}

export default App;
