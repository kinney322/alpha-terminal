import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import AlphaScannerPanel from './components/AlphaScannerPanel';
import EventStudyPanel from './components/EventStudyPanel';
import QuantBotChat from './components/QuantBotChat';
import CatalystRadarShell from './components/CatalystRadarShell';
import StockDossierSection from './components/StockDossierSection';
import PublicLeaderboardPreview from './components/PublicLeaderboardPreview';
import { fetchAndNormalizeRadarPayload } from './data/payloadAdapter';

const PRODUCT_MODE = import.meta.env.VITE_PRODUCT_MODE || 'crowdrisk';

const PUBLIC_TABS = [
  { key: 'leaderboard', label: '🏆 Leaderboard' },
  { key: 'earnings-radar', label: '📡 Earnings Radar' },
  { key: 'event-study', label: '🎯 Event Study' },
  { key: 'stock-dossier', label: '📘 Stock Dossier' },
  { key: 'peer-reactions', label: '🔗 Peer Reactions' },
  { key: 'methodology', label: '📖 Methodology' },
];

const INTERNAL_TABS = [
  { key: 'scanner', label: '📡 Alpha Scanner' },
  { key: 'quant-chat', label: '🤖 Quant Chatbot' },
  { key: 'edge', label: '🧠 Alpha Edge (Deep)' },
  { key: 'macro', label: '🌡️ Macro Sentiment' },
  { key: 'sports', label: '⚾ Sports Quant' },
];

function App() {
  const [activeTab, setActiveTab] = useState(PRODUCT_MODE === 'crowdrisk' ? 'leaderboard' : 'scanner');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Shared Dossier State
  const [dossierSeed, setDossierSeed] = useState(null);

  // Shared Radar Payload State
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

  const handleOpenStockDossier = (ticker, eventDetail) => {
    setDossierSeed({ ticker, eventDetail });
    setActiveTab('stock-dossier');
  };

  const pageVariants = {
    initial: { opacity: 0, y: 15 },
    in: { opacity: 1, y: 0 },
    out: { opacity: 0, y: -15 },
  };

  const panels = {
    // CrowdRisk Panels
    'leaderboard': <PublicLeaderboardPreview payload={payload} onOpenStockDossier={handleOpenStockDossier} />,
    'earnings-radar': <CatalystRadarShell payload={payload} loading={loading} error={error} onOpenStockDossier={handleOpenStockDossier} />,
    'event-study': <EventStudyPanel />,
    'stock-dossier': <StockDossierSection payload={payload} loading={loading} error={error} dossierSeed={dossierSeed} onClearSeed={() => setDossierSeed(null)} />,
    'peer-reactions': <div className="fade-in"><h2 className="section-title">Coming Soon</h2></div>,
    'methodology': <div className="fade-in"><h2 className="section-title">Coming Soon</h2></div>,
    
    // Internal Panels
    scanner: <AlphaScannerPanel />,
    'quant-chat': <QuantBotChat />,
    edge: <div className="fade-in"><h2 className="section-title">Coming Soon</h2></div>,
    macro: <div className="fade-in"><h2 className="section-title">Coming Soon</h2></div>,
    sports: <div className="fade-in"><h2 className="section-title">Coming Soon</h2></div>,
  };

  const brandName = PRODUCT_MODE === 'crowdrisk' ? 'CrowdRisk' : 'AlphaTerminal';
  const pageTitle = PRODUCT_MODE === 'crowdrisk' ? 'Intelligence Terminal' : 'Omni-Scanner v4';

  return (
    <div className="app-container">
      
      {/* 左側邊欄 */}
      <aside className={`sidebar ${isMobileMenuOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <div className="brand">{PRODUCT_MODE === 'crowdrisk' ? 'CrowdRisk' : <>Alpha<span>Terminal</span></>}</div>
          <button className="mobile-menu-btn" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              {isMobileMenuOpen ? (
                <><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></>
              ) : (
                <><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></>
              )}
            </svg>
          </button>
        </div>
        
        <div className="nav-container">
          <div className="nav-split">CrowdRisk Core</div>
          
          {PUBLIC_TABS.map(tab => (
            <div 
              key={tab.key}
              className={`nav-item ${activeTab === tab.key ? 'active' : ''}`}
              onClick={() => {
                if (tab.key === 'stock-dossier') {
                  setDossierSeed(null);
                }
                setActiveTab(tab.key);
                setIsMobileMenuOpen(false);
              }}
            >
              {tab.label}
            </div>
          ))}
          
          {PRODUCT_MODE !== 'crowdrisk' && (
            <>
              <div className="nav-split">Internal / Lab nav</div>
              {INTERNAL_TABS.map(tab => (
                <div 
                  key={tab.key}
                  className={`nav-item ${activeTab === tab.key ? 'active' : ''}`}
                  onClick={() => {
                    setActiveTab(tab.key);
                    setIsMobileMenuOpen(false);
                  }}
                  style={tab.key === 'sports' ? { color: '#A1A1AA', opacity: 0.7 } : {}}
                >
                  {tab.label}
                </div>
              ))}
            </>
          )}
        </div>
      </aside>

      {/* 主區塊 */}
      <main className="main-content">
        <header className="page-header">
          <div className="page-title">
            <h1>{pageTitle}</h1>
            <p>Live Polling • EST Timezone • E-Ink Light Mode Active</p>
          </div>
          {PRODUCT_MODE !== 'crowdrisk' && (
            <div style={{ fontSize: '12px', color: 'var(--text-muted)', fontWeight: '600', background: 'var(--surface-color)', padding: '8px 16px', borderRadius: '20px', border: '1px solid var(--border-light)' }}>
              🔴 Kill Switch: 0 Active
            </div>
          )}
        </header>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial="initial"
            animate="in"
            exit="out"
            variants={pageVariants}
            transition={{ type: 'tween', ease: 'easeOut', duration: 0.25 }}
            style={{ minHeight: 'calc(100% - 80px)', overflow: 'visible' }}
          >
            {panels[activeTab]}
          </motion.div>
        </AnimatePresence>
      </main>

    </div>
  );
}

export default App;
