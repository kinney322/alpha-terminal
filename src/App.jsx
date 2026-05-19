import { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import AlphaScannerPanel from './components/AlphaScannerPanel.jsx';
import EventStudyPanel from './components/EventStudyPanel.jsx';
import QuantBotChat from './components/QuantBotChat.jsx';
import CatalystRadarShell from './components/CatalystRadarShell.jsx';
import StockDossierSection from './components/StockDossierSection.jsx';
import CrowdRiskHome from './components/CrowdRiskHome.jsx';
import MomentumUniverseSection from './components/MomentumUniverseSection.jsx';
import { fetchAndNormalizeRadarPayload } from './data/payloadAdapter.js';

const PRODUCT_MODE = import.meta.env.VITE_PRODUCT_MODE || 'crowdrisk';

const CROWDRISK_SECTIONS = [
  { id: 'earnings-radar', label: { en: 'Earnings Radar', zh: '財報雷達' }, shortLabel: { en: 'Earnings', zh: '財報' }, subtitle: { en: 'Pre / Event / Post', zh: '財報前 / 當日 / 之後' } },
  { id: 'event-study', label: { en: 'Event Study', zh: '事件研究' }, shortLabel: { en: 'Event', zh: '事件' }, subtitle: { en: 'Historical evidence', zh: '歷史證據' } },
  { id: 'momentum-universe', label: { en: 'Momentum Universe', zh: '動能宇宙' }, shortLabel: { en: 'Trend', zh: '動能' }, subtitle: { en: 'Trend follow-through', zh: '趨勢延續' } },
  { id: 'stock-dossier', label: { en: 'Stock Dossier', zh: '股票檔案' }, shortLabel: { en: 'Dossier', zh: '檔案' }, subtitle: { en: 'Judgment layer', zh: '判斷層' } }
];

const CROWDRISK_APP_COPY = {
  en: {
    slogan: 'Follow the trend. Find the opportunity.',
    sloganParts: ['Follow the trend.', 'Find the opportunity.'],
    themeLabel: 'Theme',
    lightTheme: 'Light',
    darkTheme: 'Dark',
    lastUpdated: 'Last updated',
    localeLabel: 'Language'
  },
  zh: {
    slogan: '跟蹤趨勢，發現機會。',
    sloganParts: ['跟蹤趨勢。', '發現機會。'],
    themeLabel: '主題',
    lightTheme: '淺色',
    darkTheme: '深色',
    lastUpdated: '更新',
    localeLabel: '語言'
  }
};

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
  const [locale, setLocale] = useState('en');
  const [theme, setTheme] = useState('light');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [payload, setPayload] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [dossierSeed, setDossierSeed] = useState(null);
  const [eventStudySeed, setEventStudySeed] = useState(null);

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

  const handleOpenEventStudy = (ticker) => {
    const normalizedTicker = String(ticker || '').trim().toUpperCase();
    if (!normalizedTicker) return;
    setEventStudySeed({ ticker: normalizedTicker, category: 'Earnings', source: 'stock-dossier', openedAt: Date.now() });
    setActiveTab('event-study');
    setIsMobileMenuOpen(false);
  };

  const handleNavigate = (tabId) => {
    if (tabId !== 'stock-dossier' && tabId !== 'dossier') {
      setDossierSeed(null);
    }
    if (tabId !== 'event-study') {
      setEventStudySeed(null);
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
      return new Intl.DateTimeFormat(locale === 'zh' ? 'zh-HK' : 'en-US', {
        month: 'short',
        day: 'numeric',
        hour: 'numeric',
        minute: '2-digit'
      }).format(new Date(generatedAt));
    } catch {
      return generatedAt;
    }
  }, [loading, locale, payload]);

  const crowdRiskCopy = CROWDRISK_APP_COPY[locale] || CROWDRISK_APP_COPY.en;

  const crowdRiskPanels = {
    home: (
      <CrowdRiskHome
        payload={payload}
        loading={loading}
        error={error}
        onNavigate={handleNavigate}
        onOpenStockDossier={handleOpenStockDossier}
        locale={locale}
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
    'event-study': (
      <EventStudyPanel
        payload={payload}
        eventStudySeed={eventStudySeed}
        onOpenStockDossier={handleOpenStockDossier}
      />
    ),
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
        onOpenEventStudy={handleOpenEventStudy}
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
      <div className={`crowdrisk-app crowdrisk-app--${theme}`}>
        <header className="crowdrisk-topbar">
          <button
            className="crowdrisk-brand"
            type="button"
            onClick={() => handleNavigate('home')}
            aria-label="Go to CrowdRisk home"
          >
            <span className="crowdrisk-brand-mark">CrowdRisk</span>
            <small className="crowdrisk-brand-slogan" aria-label={crowdRiskCopy.slogan}>
              {(crowdRiskCopy.sloganParts || [crowdRiskCopy.slogan]).map((line, index) => (
                <span
                  className={`crowdrisk-slogan-line crowdrisk-slogan-line--${index === 0 ? 'trend' : 'opportunity'}`}
                  key={line}
                >
                  {line}
                </span>
              ))}
            </small>
          </button>

          <div className="crowdrisk-topbar-right">
            <nav className="crowdrisk-section-nav" aria-label="CrowdRisk sections">
              {CROWDRISK_SECTIONS.map((section) => (
                <button
                  key={section.id}
                  type="button"
                  className={activeTab === section.id ? 'active' : ''}
                  onClick={() => handleNavigate(section.id)}
                  title={section.subtitle[locale] || section.subtitle.en}
                >
                  <span className="crowdrisk-section-label-long">{section.label[locale] || section.label.en}</span>
                  <span className="crowdrisk-section-label-short">{section.shortLabel[locale] || section.shortLabel.en}</span>
                </button>
              ))}
            </nav>
            <div className="crowdrisk-global-status" aria-label="CrowdRisk display status">
              <div className="crowdrisk-control-stack">
                <div className="crowdrisk-control-row">
                  <div className="crowdrisk-locale-toggle" aria-label={crowdRiskCopy.localeLabel}>
                    <button
                      type="button"
                      className={locale === 'en' ? 'active' : ''}
                      onClick={() => setLocale('en')}
                    >
                      EN
                    </button>
                    <button
                      type="button"
                      className={locale === 'zh' ? 'active' : ''}
                      onClick={() => setLocale('zh')}
                    >
                      繁
                    </button>
                  </div>
                  <div className="crowdrisk-theme-toggle" aria-label={crowdRiskCopy.themeLabel}>
                    <button
                      type="button"
                      className={theme === 'light' ? 'active' : ''}
                      onClick={() => setTheme('light')}
                    >
                      {crowdRiskCopy.lightTheme}
                    </button>
                    <button
                      type="button"
                      className={theme === 'dark' ? 'active' : ''}
                      onClick={() => setTheme('dark')}
                    >
                      {crowdRiskCopy.darkTheme}
                    </button>
                  </div>
                </div>
                <span className="crowdrisk-last-updated">{crowdRiskCopy.lastUpdated} {lastUpdated}</span>
              </div>
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
