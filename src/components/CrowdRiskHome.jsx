import PublicLeaderboardPreview from './PublicLeaderboardPreview.jsx';

const countNestedItems = (value) => {
  if (!value || typeof value !== 'object') return 0;
  return Object.values(value).reduce((count, entry) => {
    if (Array.isArray(entry)) return count + entry.length;
    return count;
  }, 0);
};

const extractTicker = (item) => {
  if (!item) return '';
  if (typeof item === 'string') return item.split('-')[0];
  if (typeof item === 'object' && item.ticker) return item.ticker;
  if (typeof item === 'object' && item.event_key) return item.event_key.split('-')[0];
  return '';
};

function CrowdRiskHome({ payload, loading, error, onNavigate, onOpenStockDossier }) {
  const radarLists = payload?.radar_lists || {};
  const postEarnings = radarLists.post_earnings || {};
  const momentumRankings = payload?.momentum_universe?.rankings || [];
  const postWatch = [
    ...(postEarnings.pead_watch || []),
    ...(postEarnings.top_risk_alerts || [])
  ]
    .map(extractTicker)
    .filter(Boolean)
    .slice(0, 4);

  const lifecycleCards = [
    {
      title: 'Pre-Earnings Opportunity',
      label: 'Before catalyst',
      count: countNestedItems(radarLists.pre_earnings) || countNestedItems(postEarnings),
      body: 'Surface names where the setup matters before the event hits.'
    },
    {
      title: 'Event Day',
      label: 'During catalyst',
      count: countNestedItems(radarLists.event_day),
      body: 'Separate confirmed reaction from noise while the market reprices.'
    },
    {
      title: 'Post-Earnings Drift',
      label: 'After catalyst',
      count: (postEarnings.pead_watch || []).length,
      body: 'Track whether the post-earnings move still has follow-through.'
    }
  ];

  const watchQueue = [
    {
      label: 'Dossier Review',
      value: postWatch.length ? postWatch.join(', ') : loading ? 'Loading' : 'No priority names',
      action: 'Open Stock Dossier'
    },
    {
      label: 'Momentum Follow-Through',
      value: momentumRankings.length ? `${momentumRankings.length} ranked names` : 'No momentum payload',
      action: 'Open Momentum Universe'
    },
    {
      label: 'Event Evidence',
      value: error ? 'Radar payload unavailable' : 'Base-rate and crowding checks ready',
      action: 'Open Event Study'
    }
  ];

  return (
    <div className="crowdrisk-home">
      <section className="crowdrisk-home-hero">
        <div>
          <p className="crowdrisk-kicker">Today&apos;s Research Queue</p>
          <h1>Find → Explain → Judge → Watch / Drop</h1>
          <p>
            CrowdRisk routes attention first, then sends each name into the section that can explain
            why it deserves research now.
          </p>
        </div>
        <div className="crowdrisk-home-stats" aria-label="CrowdRisk queue summary">
          <span>
            <strong>{postEarnings.top_opportunities?.length || 0}</strong>
            Radar hits
          </span>
          <span>
            <strong>{postEarnings.pead_watch?.length || 0}</strong>
            PEAD watch
          </span>
          <span>
            <strong>{payload?.momentum_universe?.ranked_count || momentumRankings.length || 0}</strong>
            Momentum ranks
          </span>
        </div>
      </section>

      <section className="crowdrisk-home-leaderboard" aria-label="Priority leaderboard">
        <PublicLeaderboardPreview
          payload={payload}
          loading={loading}
          error={error}
          onOpenStockDossier={onOpenStockDossier}
        />
      </section>

      <section className="crowdrisk-home-section">
        <div className="crowdrisk-section-heading">
          <p className="crowdrisk-kicker">Earnings Lifecycle</p>
          <h2>Pre, event day, and post-earnings work in one flow.</h2>
          <button type="button" onClick={() => onNavigate('earnings-radar')}>
            Open Earnings Radar
          </button>
        </div>
        <div className="crowdrisk-card-grid three">
          {lifecycleCards.map((card) => (
            <article className="crowdrisk-queue-card" key={card.title}>
              <p>{card.label}</p>
              <h3>{card.title}</h3>
              <strong>{card.count}</strong>
              <span>{card.body}</span>
            </article>
          ))}
        </div>
      </section>

      <section className="crowdrisk-home-section split">
        <div>
          <div className="crowdrisk-section-heading compact">
            <p className="crowdrisk-kicker">Momentum Follow-Through</p>
            <h2>Use trend strength as a separate routing signal.</h2>
            <button type="button" onClick={() => onNavigate('momentum-universe')}>
              Open Momentum Universe
            </button>
          </div>
          <div className="crowdrisk-momentum-strip">
            {momentumRankings.slice(0, 5).map((row) => (
              <button
                type="button"
                key={row.ticker}
                onClick={() => onNavigate('momentum-universe')}
              >
                <span>#{row.scanner_rank || row.rank || '-'}</span>
                <strong>{row.ticker}</strong>
                <small>RS {row.relative_strength_percentile ?? '-'}</small>
              </button>
            ))}
            {!momentumRankings.length && (
              <div className="crowdrisk-empty-state">Momentum payload not available.</div>
            )}
          </div>
        </div>

        <div>
          <div className="crowdrisk-section-heading compact">
            <p className="crowdrisk-kicker">Watch / Drop Queue</p>
            <h2>Move names toward a research decision.</h2>
          </div>
          <div className="crowdrisk-watch-list">
            {watchQueue.map((item) => (
              <button
                type="button"
                key={item.label}
                onClick={() => {
                  if (item.label === 'Momentum Follow-Through') onNavigate('momentum-universe');
                  else if (item.label === 'Event Evidence') onNavigate('event-study');
                  else onNavigate('stock-dossier');
                }}
              >
                <span>{item.label}</span>
                <strong>{item.value}</strong>
                <small>{item.action}</small>
              </button>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default CrowdRiskHome;
