import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import AlphaScannerPanel from './components/AlphaScannerPanel';
import EventStudyPanel from './components/EventStudyPanel';
import QuantBotChat from './components/QuantBotChat';

const TABS = [
  { key: 'scanner', label: '📡 Alpha Scanner' },
  { key: 'quant-chat', label: '🤖 Quant 探勘大腦' },
  { key: 'edge', label: '🧠 Alpha Edge (Deep)' },
  { key: 'event-study', label: '🎯 Event Study (事件研究)' },
  { key: 'macro', label: '🌡️ Macro Sentiment' },
];

function App() {
  const [activeTab, setActiveTab] = useState('scanner');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const pageVariants = {
    initial: { opacity: 0, y: 15 },
    in: { opacity: 1, y: 0 },
    out: { opacity: 0, y: -15 },
  };

  const panels = {
    scanner: <AlphaScannerPanel />,
    'quant-chat': <QuantBotChat />,
    'event-study': <EventStudyPanel />,
    edge: <div className="fade-in"><h2 className="section-title">Coming Soon</h2></div>,
    macro: <div className="fade-in"><h2 className="section-title">Coming Soon</h2></div>,
  };

  return (
    <div className="app-container">
      
      {/* 左側邊欄 */}
      <aside className={`sidebar ${isMobileMenuOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <div className="brand">Alpha<span>Terminal</span></div>
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
          <div className="nav-split">Core Ops</div>
          
          {TABS.map(tab => (
            <div 
              key={tab.key}
              className={`nav-item ${activeTab === tab.key ? 'active' : ''}`}
              onClick={() => {
                setActiveTab(tab.key);
                setIsMobileMenuOpen(false); // Close menu on selection
              }}
            >
              {tab.label}
            </div>
          ))}
          
          <div className="nav-split">Separated Sandbox</div>
          <div className="nav-item" style={{ color: '#A1A1AA', opacity: 0.7 }}>
            ⚾ Sports Quant
          </div>
        </div>
      </aside>

      {/* 主區塊 */}
      <main className="main-content">
        <header className="page-header">
          <div className="page-title">
            <h1>Omni-Scanner v4</h1>
            <p>Live Polling • EST Timezone • E-Ink Light Mode Active</p>
          </div>
          <div style={{ fontSize: '12px', color: 'var(--text-muted)', fontWeight: '600', background: 'var(--surface-color)', padding: '8px 16px', borderRadius: '20px', border: '1px solid var(--border-light)' }}>
            🔴 Kill Switch: 0 Active
          </div>
        </header>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial="initial"
            animate="in"
            exit="out"
            variants={pageVariants}
            transition={{ type: 'tween', ease: 'easeOut', duration: 0.25 }}
          >
            {panels[activeTab]}
          </motion.div>
        </AnimatePresence>
      </main>

    </div>
  );
}

export default App;
