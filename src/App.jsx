import { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import AlphaScannerPanel from './components/AlphaScannerPanel.jsx';
import EventStudyPanel from './components/EventStudyPanel.jsx';
import QuantBotChat from './components/QuantBotChat.jsx';
import CatalystRadarShell from './components/CatalystRadarShell.jsx';
import StockDossierSection from './components/StockDossierSection.jsx';
import CrowdRiskHome from './components/CrowdRiskHome.jsx';
import MomentumUniverseSection from './components/MomentumUniverseSection.jsx';
import { buildMomentumUniverseSyntheticDetail } from './components/dossierHelpers.js';
import { fetchAndNormalizeRadarPayload, fetchReferencePeerMapPayload, fetchStockPerformancePayload } from './data/payloadAdapter.js';
import { canonicalizeTicker } from './data/tickerAliases.js';

const PRODUCT_MODE = import.meta.env.VITE_PRODUCT_MODE || 'crowdrisk';
const BACKEND_PAYLOAD_REFRESH_TIME_ZONE = 'America/New_York';
const BACKEND_PAYLOAD_REFRESH_HOUR = 6;
const BACKEND_PAYLOAD_REFRESH_MINUTE = 30;
const BACKEND_PAYLOAD_REFRESH_WEEKDAYS = new Set([1, 2, 3, 4, 5]);

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
    localeLabel: 'Language',
    tickerSearchPlaceholder: 'Search ticker',
    tickerSearchError: 'Enter a ticker'
  },
  zh: {
    slogan: '追蹤趨勢，發現機會。',
    sloganParts: ['追蹤趨勢。', '發現機會。'],
    themeLabel: '主題',
    lightTheme: '淺色',
    darkTheme: '深色',
    lastUpdated: '更新',
    localeLabel: '語言',
    tickerSearchPlaceholder: '搜尋代號',
    tickerSearchError: '請輸入股票代號'
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

const normalizeTicker = canonicalizeTicker;

const getZonedDateTimeParts = (date, timeZone) => {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false
  }).formatToParts(date);

  return parts.reduce((acc, part) => {
    if (part.type !== 'literal') acc[part.type] = Number(part.value);
    return acc;
  }, {});
};

const getTimeZoneOffsetMs = (date, timeZone) => {
  const parts = getZonedDateTimeParts(date, timeZone);
  const zonedAsUtc = Date.UTC(
    parts.year,
    parts.month - 1,
    parts.day,
    parts.hour,
    parts.minute,
    parts.second
  );
  return zonedAsUtc - date.getTime();
};

const zonedWallTimeToUtc = ({ year, month, day, hour, minute, timeZone }) => {
  const wallTimeAsUtc = Date.UTC(year, month - 1, day, hour, minute, 0);
  let utcDate = new Date(wallTimeAsUtc);
  let offsetMs = getTimeZoneOffsetMs(utcDate, timeZone);
  utcDate = new Date(wallTimeAsUtc - offsetMs);
  offsetMs = getTimeZoneOffsetMs(utcDate, timeZone);
  return new Date(wallTimeAsUtc - offsetMs);
};

const getNextBackendPayloadRefreshDelayMs = (now = new Date()) => {
  const currentParts = getZonedDateTimeParts(now, BACKEND_PAYLOAD_REFRESH_TIME_ZONE);

  for (let dayOffset = 0; dayOffset <= 7; dayOffset += 1) {
    const candidateCalendarDate = new Date(Date.UTC(
      currentParts.year,
      currentParts.month - 1,
      currentParts.day + dayOffset,
      0,
      0,
      0
    ));
    const weekday = candidateCalendarDate.getUTCDay();
    if (!BACKEND_PAYLOAD_REFRESH_WEEKDAYS.has(weekday)) continue;

    const candidateUtc = zonedWallTimeToUtc({
      year: candidateCalendarDate.getUTCFullYear(),
      month: candidateCalendarDate.getUTCMonth() + 1,
      day: candidateCalendarDate.getUTCDate(),
      hour: BACKEND_PAYLOAD_REFRESH_HOUR,
      minute: BACKEND_PAYLOAD_REFRESH_MINUTE,
      timeZone: BACKEND_PAYLOAD_REFRESH_TIME_ZONE
    });

    const delayMs = candidateUtc.getTime() - now.getTime();
    if (delayMs > 0) return delayMs;
  }

  return 24 * 60 * 60 * 1000;
};

const scheduleBackendPayloadRefresh = (loadPayload) => {
  let timer = null;
  let cancelled = false;

  const scheduleNext = () => {
    if (cancelled) return;
    const delayMs = getNextBackendPayloadRefreshDelayMs();
    timer = window.setTimeout(() => {
      loadPayload();
      scheduleNext();
    }, delayMs);
  };

  scheduleNext();

  return () => {
    cancelled = true;
    if (timer) window.clearTimeout(timer);
  };
};

const resolveDossierDetail = (payload, ticker) => {
  const normalizedTicker = normalizeTicker(ticker);
  if (!normalizedTicker) return null;

  const details = Object.values(payload?.events_detail || {})
    .filter((detail) => normalizeTicker(detail?.ticker) === normalizedTicker);

  const preferredDetail = details.find((detail) => detail.event_phase === 'post_earnings')
    || details.find((detail) => detail.event_phase === 'pre_earnings')
    || details[0];

  if (preferredDetail) return { ...preferredDetail, ticker: normalizedTicker };

  return buildMomentumUniverseSyntheticDetail(normalizedTicker, payload) || { ticker: normalizedTicker };
};

function App() {
  const isCrowdRisk = PRODUCT_MODE === 'crowdrisk';
  const [activeTab, setActiveTab] = useState(isCrowdRisk ? 'home' : 'scanner');
  const [locale, setLocale] = useState('en');
  const [theme, setTheme] = useState('light');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [payload, setPayload] = useState(null);
  const [stockPerformancePayload, setStockPerformancePayload] = useState(null);
  const [referencePeerMapPayload, setReferencePeerMapPayload] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [dossierSeed, setDossierSeed] = useState(null);
  const [eventStudySeed, setEventStudySeed] = useState(null);
  const [tickerSearchQuery, setTickerSearchQuery] = useState('');
  const [tickerSearchError, setTickerSearchError] = useState('');

  useEffect(() => {
    let alive = true;
    const loadPayload = () => {
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
    };

    loadPayload();
    const cancelRefresh = scheduleBackendPayloadRefresh(loadPayload);

    return () => {
      alive = false;
      cancelRefresh();
    };
  }, []);

  useEffect(() => {
    let alive = true;
    const loadStockPerformancePayload = () => {
      fetchStockPerformancePayload()
        .then((data) => {
          if (!alive) return;
          setStockPerformancePayload(data);
        })
        .catch((err) => {
          if (!alive) return;
          console.warn('Failed to load CrowdRisk stock performance payload', err);
          setStockPerformancePayload(null);
        });
    };

    loadStockPerformancePayload();
    const cancelRefresh = scheduleBackendPayloadRefresh(loadStockPerformancePayload);

    return () => {
      alive = false;
      cancelRefresh();
    };
  }, []);

  useEffect(() => {
    let alive = true;
    const loadReferencePeerMapPayload = () => {
      fetchReferencePeerMapPayload()
        .then((data) => {
          if (!alive) return;
          setReferencePeerMapPayload(data);
        })
        .catch((err) => {
          if (!alive) return;
          console.warn('Failed to load CrowdRisk reference peer map payload', err);
          setReferencePeerMapPayload(null);
        });
    };

    loadReferencePeerMapPayload();
    const cancelRefresh = scheduleBackendPayloadRefresh(loadReferencePeerMapPayload);

    return () => {
      alive = false;
      cancelRefresh();
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
    const canonicalTicker = normalizeTicker(ticker);
    setDossierSeed({ ticker: canonicalTicker, eventDetail: eventDetail || resolveDossierDetail(payload, canonicalTicker) });
    setActiveTab(isCrowdRisk ? 'stock-dossier' : 'dossier');
    setIsMobileMenuOpen(false);
  };

  const handleTickerSearchSubmit = (event) => {
    event.preventDefault();
    const ticker = normalizeTicker(tickerSearchQuery);
    if (!ticker) {
      setTickerSearchError(crowdRiskCopy.tickerSearchError);
      return;
    }

    setTickerSearchError('');
    setTickerSearchQuery(ticker);
    handleOpenStockDossier(ticker, resolveDossierDetail(payload, ticker));
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
        stockPerformancePayload={stockPerformancePayload}
        referencePeerMapPayload={referencePeerMapPayload}
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
        locale={locale}
      />
    ),
    'event-study': (
      <EventStudyPanel
        payload={payload}
        eventStudySeed={eventStudySeed}
        onOpenStockDossier={handleOpenStockDossier}
        locale={locale}
      />
    ),
    'momentum-universe': (
      <MomentumUniverseSection
        payload={payload}
        loading={loading}
        error={error}
        onOpenStockDossier={handleOpenStockDossier}
        locale={locale}
      />
    ),
    'stock-dossier': (
      <StockDossierSection
        payload={payload}
        stockPerformancePayload={stockPerformancePayload}
        referencePeerMapPayload={referencePeerMapPayload}
        loading={loading}
        error={error}
        dossierSeed={dossierSeed}
        onClearSeed={() => setDossierSeed(null)}
        onOpenEventStudy={handleOpenEventStudy}
        locale={locale}
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
            <form
              className="crowdrisk-ticker-search"
              onSubmit={handleTickerSearchSubmit}
              aria-label="View Stock Dossier by ticker"
            >
              <input
                type="search"
                value={tickerSearchQuery}
                onChange={(event) => {
                  setTickerSearchQuery(event.target.value.toUpperCase());
                  if (tickerSearchError) setTickerSearchError('');
                }}
                placeholder={crowdRiskCopy.tickerSearchPlaceholder}
                aria-invalid={tickerSearchError ? 'true' : 'false'}
              />
              {tickerSearchError && <span role="alert">{tickerSearchError}</span>}
            </form>
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
