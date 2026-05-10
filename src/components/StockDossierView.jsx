import React from 'react';
import {
  deriveThesisPulse,
  buildDossierSummary,
  buildSignalStack,
  buildResearchKillSwitch,
  buildPriceTrendRisk,
  buildEvidenceBoard,
  buildValuationCore,
  buildStockOverview
} from './dossierHelpers';
import { getStockDossierProfile } from '../data/stockDossierProfiles';

const formatPct = (value) => {
  if (value === undefined || value === null || Number.isNaN(Number(value))) return 'Not Included';
  const n = Number(value);
  return `${n > 0 ? '+' : ''}${n.toFixed(1)}%`;
};

const formatNumber = (value, digits = 2) => {
  if (value === undefined || value === null || Number.isNaN(Number(value))) return 'Not Included';
  return Number(value).toFixed(digits);
};

const formatLabel = (value) => {
  if (!value) return 'Not Included';
  return String(value)
    .replace(/([a-z])([A-Z])/g, '$1 $2')
    .replace(/_/g, ' ')
    .replace(/\b\w/g, c => c.toUpperCase());
};

const formatValuationMetric = (metric) => {
  if (metric.value === undefined || metric.value === null || Number.isNaN(Number(metric.value))) return 'Pending';
  const numeric = Number(metric.value);
  if (metric.format === 'percent') return `${(numeric * 100).toFixed(1)}%`;
  if (metric.format === 'multiple') return `${numeric.toFixed(2)}x`;
  if (metric.format === 'billion') return `$${numeric.toFixed(1)}B`;
  return numeric.toFixed(1);
};

const toNumeric = (value) => {
  const numeric = Number(value);
  return Number.isFinite(numeric) ? numeric : null;
};

const clamp = (value, min = 8, max = 96) => Math.max(min, Math.min(max, value));

const buildSparklinePath = (values, width = 220, height = 74, pad = 8) => {
  if (!Array.isArray(values) || values.length < 2) return '';
  const nums = values.map(toNumeric).filter(value => value !== null);
  if (nums.length < 2) return '';
  const min = Math.min(...nums);
  const max = Math.max(...nums);
  const range = max - min || 1;
  return nums.map((value, index) => {
    const x = pad + (index / (nums.length - 1)) * (width - pad * 2);
    const y = height - pad - ((value - min) / range) * (height - pad * 2);
    return `${index === 0 ? 'M' : 'L'} ${x.toFixed(1)} ${y.toFixed(1)}`;
  }).join(' ');
};

const extractPriceSeries = (eventDetail) => {
  const candidates = [
    eventDetail.price_series,
    eventDetail.price_history,
    eventDetail.trend_setup?.price_series,
    eventDetail.trend_setup?.metrics?.price_series,
    eventDetail.trend_setup?.metrics?.close_series,
    eventDetail.momentum_evidence?.evidence?.price_series,
    eventDetail.momentum_evidence?.evidence?.close_series
  ];

  for (const candidate of candidates) {
    if (!Array.isArray(candidate)) continue;
    const values = candidate
      .map(point => typeof point === 'object' ? (point.close ?? point.price ?? point.value) : point)
      .map(toNumeric)
      .filter(value => value !== null);
    if (values.length >= 2) return values;
  }
  return [];
};

const radarPoint = (score, index, total, radius = 76, center = 112) => {
  const angle = (-90 + (360 / total) * index) * (Math.PI / 180);
  const scaledRadius = (clamp(score, 0, 100) / 100) * radius;
  return {
    x: center + Math.cos(angle) * scaledRadius,
    y: center + Math.sin(angle) * scaledRadius
  };
};

const buildRadarPolygon = (axes, score = null) => {
  return axes.map((axis, index) => {
    const point = radarPoint(score ?? axis.score, index, axes.length);
    return `${point.x.toFixed(1)},${point.y.toFixed(1)}`;
  }).join(' ');
};

const buildRadarAxes = ({ momentum, metrics, valuationCore, eventDetail }) => {
  const rsSpy = toNumeric(metrics.relative_strength_vs_spy_63d);
  const latestClose = toNumeric(metrics.latest_close);
  const ma200 = toNumeric(metrics.ma200);
  const ma200Slope = toNumeric(metrics.ma200_slope_pct);
  const currentPostReturn = toNumeric(eventDetail.pead_signal?.reaction?.current_post_return);
  const momentumScore = toNumeric(momentum.score);

  const momentumTone = momentumScore === null ? 'neutral' : momentumScore >= 70 ? 'hot' : momentumScore >= 50 ? 'warm' : 'cool';
  const rsTone = rsSpy === null ? 'neutral' : rsSpy > 0 ? 'hot' : 'cool';
  const smaConstructive = latestClose !== null && ma200 !== null ? latestClose >= ma200 : ma200Slope !== null ? ma200Slope > 0 : null;
  const eventTone = currentPostReturn === null ? 'neutral' : currentPostReturn > 0 ? 'hot' : 'cool';
  const valueTone = valuationCore.status === 'available'
    ? valuationCore.topVerdict.valuationState.includes('Stretched') || valuationCore.topVerdict.valuationState.includes('Perfection') ? 'warm' : 'hot'
    : 'neutral';
  const valueScore = valuationCore.status === 'available'
    ? valuationCore.topVerdict.valuationState.includes('Perfection') ? 25
    : valuationCore.topVerdict.valuationState.includes('Stretched') ? 38
    : 62
    : 18;

  return [
    { label: 'Momentum', value: momentumScore === null ? 'Pending' : `${momentumScore}/100`, score: momentumScore ?? 18, tone: momentumTone },
    { label: 'RS', value: rsSpy === null ? 'Pending' : formatPct(rsSpy), score: rsSpy === null ? 18 : clamp(50 + rsSpy * 2.2), tone: rsTone },
    { label: 'MA200', value: smaConstructive === null ? 'Pending' : smaConstructive ? 'Above' : 'Below', score: smaConstructive === null ? 18 : smaConstructive ? 76 : 24, tone: smaConstructive === null ? 'neutral' : smaConstructive ? 'hot' : 'cool' },
    { label: 'Drift', value: currentPostReturn === null ? 'Pending' : formatPct(currentPostReturn), score: currentPostReturn === null ? 18 : clamp(50 + currentPostReturn * 3), tone: eventTone },
    { label: 'Value', value: valuationCore.status === 'available' ? valuationCore.topVerdict.valuationState : 'Pending', score: valueScore, tone: valueTone }
  ];
};

const StockDossierView = ({ eventDetail, payload }) => {
  if (!eventDetail) return null;

  const dossierProfile = getStockDossierProfile(eventDetail.ticker);
  const enrichedEventDetail = dossierProfile ? {
    ...eventDetail,
    company_name: eventDetail.company_name || dossierProfile.companyName,
    exchange: eventDetail.exchange || dossierProfile.exchange,
    company_logo_url: eventDetail.company_logo_url || dossierProfile.logoUrl,
    business_summary: eventDetail.business_summary || dossierProfile.overview
  } : eventDetail;

  const dossierSummary = buildDossierSummary(enrichedEventDetail, payload);
  const reason = dossierProfile?.whyNow?.reason || dossierSummary.reason;
  const verdict = dossierProfile?.whyNow?.verdict || dossierSummary.verdict;
  const signalStack = buildSignalStack(enrichedEventDetail, payload);
  const pulse = deriveThesisPulse(enrichedEventDetail, payload);
  const killSwitch = buildResearchKillSwitch(enrichedEventDetail, payload);
  const priceTrendRisk = buildPriceTrendRisk(enrichedEventDetail, payload);
  const evidenceBoard = buildEvidenceBoard(enrichedEventDetail, payload);
  const valuationCore = buildValuationCore(enrichedEventDetail, dossierProfile);
  const stockOverview = buildStockOverview(enrichedEventDetail, payload, dossierProfile);

  const momentum = enrichedEventDetail.momentum_evidence || {};
  const metrics = momentum.evidence || enrichedEventDetail.trend_setup?.metrics || {};
  const priceSeries = extractPriceSeries(enrichedEventDetail);
  const sparklinePath = buildSparklinePath(priceSeries);

  const isMomentumUniverse = enrichedEventDetail.status === 'momentum_universe' || enrichedEventDetail.event_phase === 'off_cycle_universe';

  // Ticker Header variables
  const ticker = enrichedEventDetail.ticker;
  const companyName = enrichedEventDetail.company_name || '';
  const companyLogoUrl = enrichedEventDetail.company_logo_url || enrichedEventDetail.logo_url || enrichedEventDetail.logo || enrichedEventDetail.brand_logo_url || '';
  const exchange = enrichedEventDetail.exchange || enrichedEventDetail.market || '';
  const companyDisplayName = companyName || ticker;
  const tickerLine = exchange ? `${exchange}:${ticker} Stock Dossier` : `${ticker} Stock Dossier`;
  const industryTheme = stockOverview.theme || momentum.industry_theme_label || momentum.industry_theme || enrichedEventDetail.trend_setup?.supply_chain_stage || '';
  const researchState = isMomentumUniverse ? 'Momentum Candidate'
                      : (enrichedEventDetail.status === 'off_cycle_watch' || enrichedEventDetail.event_phase === 'off_cycle') ? 'Between Catalysts'
                      : enrichedEventDetail.event_phase === 'post_earnings' ? 'Post-Earnings Watch'
                      : enrichedEventDetail.peer_readthrough?.incoming?.length > 0 ? 'Peer-Led Context'
                      : 'Catalyst Watch';
  const eventStudyAvailable = enrichedEventDetail.post_earnings_base_rate?.status === 'available' ||
                              enrichedEventDetail.historical_setup_matrix?.status === 'available' ||
                              enrichedEventDetail.historical_earnings_tape?.status === 'available';
  const eventStudyValue = eventStudyAvailable ? 'Historical Matrix Available' : 'Pending';
  const momentumValue = momentum.score !== undefined ? `Score ${momentum.score}` : 'Pending';
  const snapshotRows = [
    { label: 'Business Quality', value: valuationCore.topVerdict.businessQuality, tone: valuationCore.topVerdict.businessQuality === 'High' ? 'positive' : 'neutral' },
    { label: 'Valuation', value: valuationCore.topVerdict.valuationState, tone: valuationCore.topVerdict.valuationState.includes('Missing') ? 'warning' : 'neutral' },
    { label: 'Event Study', value: eventStudyValue, tone: eventStudyAvailable ? 'positive' : 'warning' },
    { label: 'Momentum', value: momentumValue, tone: momentum.score !== undefined ? 'positive' : 'warning' }
  ];
  const radarAxes = buildRadarAxes({ momentum, metrics, valuationCore, eventDetail: enrichedEventDetail });

  return (
    <div className="stock-dossier-view">
      {/* 1. Stock Overview */}
      <section className="dossier-hero-card">
        <div className="dossier-hero-main">
          <div className="dossier-hero-identity">
            <div className={`dossier-company-logo ${companyLogoUrl ? 'has-logo' : ''}`} aria-label={`${companyDisplayName} logo`}>
              {companyLogoUrl && (
                <img
                  src={companyLogoUrl}
                  alt={`${companyDisplayName} logo`}
                  onError={(event) => {
                    event.currentTarget.style.display = 'none';
                    event.currentTarget.parentElement?.classList.add('logo-fallback-visible');
                  }}
                />
              )}
              <span>{ticker.slice(0, 4)}</span>
            </div>
            <div>
              <p className="crowdrisk-kicker">Stock Overview</p>
              <h2>{companyDisplayName}</h2>
              <p className="dossier-ticker-line">{tickerLine}</p>
              <div className="dossier-hero-pills">
                <span>{researchState}</span>
                {industryTheme && <span>{formatLabel(industryTheme)}</span>}
                <span>{stockOverview.dataCoverage}</span>
              </div>
            </div>
          </div>

          <p className="dossier-profile-line">{stockOverview.profileLine}</p>

          {dossierProfile?.marketSnapshot && (
            <div className="dossier-market-strip" aria-label={`${ticker} market snapshot`}>
              {Object.entries(dossierProfile.marketSnapshot).map(([key, value]) => (
                <div key={key}>
                  <span>{formatLabel(key)}</span>
                  <strong>{value}</strong>
                </div>
              ))}
            </div>
          )}

          <div className="dossier-why-now">
            <span>Why now</span>
            <strong>{reason}</strong>
            <p>{verdict}</p>
          </div>
        </div>

        <div className="dossier-snapshot-board" aria-label={`${ticker} dossier snapshot`}>
          <div className="dossier-snapshot-header">
            <span>Research State</span>
            <strong>{researchState}</strong>
          </div>
          <div className="dossier-snapshot-list">
            {snapshotRows.map((row) => (
              <div key={row.label} className={`dossier-snapshot-row tone-${row.tone}`}>
                <span>{row.label}</span>
                <strong>{row.value}</strong>
              </div>
            ))}
          </div>
          <div className="dossier-market-visuals">
            <div className="dossier-mini-chart">
              <div>
                <span>Price Tape</span>
                <strong>{sparklinePath ? 'Recent trend' : 'Price chart pending'}</strong>
              </div>
              {sparklinePath ? (
                <svg viewBox="0 0 220 74" role="img" aria-label={`${ticker} price trend`}>
                  <path d={sparklinePath} />
                </svg>
              ) : (
                <div className="dossier-mini-chart__empty" aria-hidden="true">
                  <span />
                  <span />
                  <span />
                </div>
              )}
            </div>
            <div className="dossier-radar-panel" aria-label={`${ticker} quick situation map`}>
              <div className="dossier-radar-heading">
                <span>Situation Map</span>
                <strong>Momentum / RS / MA200 / Drift / Value</strong>
              </div>
              <svg className="dossier-radar-chart" viewBox="0 0 224 224" role="img" aria-label={`${ticker} research heat map`}>
                {[20, 40, 60, 80].map(level => (
                  <polygon key={level} className="dossier-radar-ring" points={buildRadarPolygon(radarAxes, level)} />
                ))}
                {radarAxes.map((axis, index) => {
                  const end = radarPoint(100, index, radarAxes.length);
                  const label = radarPoint(116, index, radarAxes.length);
                  return (
                    <React.Fragment key={axis.label}>
                      <line className="dossier-radar-spoke" x1="112" y1="112" x2={end.x.toFixed(1)} y2={end.y.toFixed(1)} />
                      <text className="dossier-radar-label" x={label.x.toFixed(1)} y={label.y.toFixed(1)} textAnchor="middle">{axis.label}</text>
                    </React.Fragment>
                  );
                })}
                <polygon className="dossier-radar-area" points={buildRadarPolygon(radarAxes)} />
              </svg>
            </div>
          </div>
        </div>
      </section>

      {dossierProfile && (
        <section id="company-overview" className="dossier-company-overview-card card">
          <div className="dossier-company-overview">
            <p className="crowdrisk-kicker">Company Overview</p>
            <h3>{companyDisplayName} Stock Overview</h3>
            <p>{stockOverview.profileLine}</p>
            <div className="dossier-quick-facts">
              {stockOverview.quickFacts.map((fact) => (
                <div key={fact.label}>
                  <span>{fact.label}</span>
                  <strong>{fact.value}</strong>
                </div>
              ))}
            </div>
            {dossierProfile.sections?.length > 0 && (
              <div className="dossier-profile-sections">
                {dossierProfile.sections.map((section) => (
                  <article key={section.id}>
                    <span>{section.label}</span>
                    <h4>{section.title}</h4>
                    <ul>
                      {section.points.map((point) => (
                        <li key={point}>{point}</li>
                      ))}
                    </ul>
                  </article>
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      {/* 4. Signal Stack */}
      <div className="dossier-signal-stack" style={{ display: 'flex', gap: '12px', marginBottom: '24px', flexWrap: 'wrap' }}>
        {signalStack.map(chip => (
          <div key={chip.id} className={`signal-chip state-${chip.state}`} style={{ padding: '8px 12px', borderRadius: '6px', border: '1px solid var(--border-color)', background: 'var(--surface-color)', flex: '1 1 120px', minWidth: '120px' }}>
            <div style={{ fontSize: '0.75em', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{chip.label}</div>
            <div style={{ fontWeight: 'bold', marginTop: '4px', color: chip.state === 'strong' ? 'var(--text-green, #4caf50)' : chip.state === 'warning' ? 'var(--text-red, #f44336)' : 'inherit' }}>
              {chip.value}
            </div>
          </div>
        ))}
      </div>

      {/* 5. Risk Counter-Signals */}
      <div className="card dossier-risk-signals" style={{ marginBottom: '24px', borderLeft: '4px solid var(--text-muted)' }}>
        <h3 style={{ marginBottom: '16px' }}>Risk Counter-Signals</h3>
        <div className="grid-2col" style={{ fontSize: '0.95em' }}>
          <div><strong>Fundamental Coverage:</strong> <span style={{ color: 'var(--text-muted)' }}>{valuationCore.status === 'available' ? 'Available' : 'Pending'}</span></div>
          <div><strong>Revision Support:</strong> <span style={{ color: 'var(--text-muted)' }}>Not Included</span></div>
          <div><strong>Valuation Pressure:</strong> <span style={{ color: 'var(--text-muted)' }}>{valuationCore.topVerdict.valuationState}</span></div>
          <div><strong>Dilution / SBC:</strong> <span style={{ color: 'var(--text-muted)' }}>{valuationCore.missingEvidence.includes('SBC / dilution') ? 'Missing' : 'Included'}</span></div>
          <div style={{ gridColumn: '1 / -1', marginTop: '8px', fontStyle: 'italic', color: 'var(--text-muted)' }}>
            <strong>Data Coverage:</strong> {valuationCore.status === 'available' ? 'Market + Fundamentals' : 'Market Evidence Only'}
          </div>
        </div>
      </div>

      {/* 5b. Fundamentals Summary / Valuation Core */}
      <div id="valuation-core" className="card dossier-valuation-core" style={{ marginBottom: '24px' }}>
        <div className="dossier-valuation-core__header">
          <div>
            <p className="crowdrisk-kicker">Fundamentals Summary / Valuation Core</p>
            <h3>Does company quality support continued research?</h3>
          </div>
          <span className="quality-pill">{valuationCore.status === 'available' ? 'Fundamentals Available' : 'Fundamentals Pending'}</span>
        </div>

        <div className="dossier-valuation-verdict">
          <div>
            <span>Business Quality</span>
            <strong>{valuationCore.topVerdict.businessQuality}</strong>
          </div>
          <div>
            <span>Valuation State</span>
            <strong>{valuationCore.topVerdict.valuationState}</strong>
          </div>
          <div>
            <span>Base Case Support</span>
            <strong>{valuationCore.topVerdict.baseCaseSupport}</strong>
          </div>
          <div>
            <span>Margin of Safety</span>
            <strong>{valuationCore.topVerdict.marginOfSafety}</strong>
          </div>
        </div>

        <div className="dossier-valuation-read">
          <strong>{valuationCore.topVerdict.overallRead}</strong>
          <p>{valuationCore.topVerdict.why}</p>
        </div>

        {valuationCore.coreMetrics.length > 0 && (
          <div className="dossier-valuation-metrics">
            {valuationCore.coreMetrics.map((metric) => (
              <div key={metric.id}>
                <span>{metric.label}</span>
                <strong>{formatValuationMetric(metric)}</strong>
              </div>
            ))}
          </div>
        )}

        <div className="dossier-valuation-judgment">
          <div>
            <h4>Research Judgment</h4>
            <ul>
              {valuationCore.researchJudgment.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <div>
            <h4>Missing Evidence</h4>
            <ul>
              {valuationCore.missingEvidence.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>

        {valuationCore.scenarios && (
          <div id="scenario-range" className="dossier-scenario-grid">
            {valuationCore.scenarios.map((scenario) => (
              <div key={scenario.label}>
                <span>{scenario.label}</span>
                <p>{scenario.text}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 6. Thesis Pulse & 7. Kill Switch & 8. Next Watch Item */}
      <div className="card dossier-pulse-watch" style={{ marginBottom: '24px' }}>
        <div style={{ marginBottom: '16px' }}>
          <h3 style={{ display: 'inline-block', marginRight: '12px' }}>Thesis Pulse:</h3>
          <span className={`quality-pill pulse-${pulse.state.replace(/\s+/g, '-').toLowerCase()}`} style={{ fontWeight: 'bold' }}>{pulse.state}</span>
          <div style={{ marginTop: '8px', color: 'var(--text-muted)', fontSize: '0.9em' }}>{pulse.reason}</div>
        </div>

        <div className="grid-2col" style={{ gap: '24px', marginBottom: '16px' }}>
          <div id="kill-data">
            <h3>Research Kill Switch</h3>
            <ul style={{ paddingLeft: '20px', color: 'var(--text-muted)', fontSize: '0.9em', margin: '8px 0' }}>
              {(valuationCore.killData || killSwitch).map((item, i) => <li key={i}>{item}</li>)}
            </ul>
          </div>
          <div>
            <h3>Price Trend Risk</h3>
            <ul style={{ paddingLeft: '20px', color: 'var(--text-muted)', fontSize: '0.9em', margin: '8px 0' }}>
              {priceTrendRisk.map((item, i) => <li key={i}>{item}</li>)}
            </ul>
          </div>
        </div>

        <div>
          <h3>Next Validation</h3>
          <div style={{ color: 'var(--text-muted)', fontSize: '0.9em', marginTop: '4px' }}>
            {isMomentumUniverse ? 'Monitor for upcoming earnings catalyst or theme-level continuation.' :
             enrichedEventDetail.event_phase === 'post_earnings' ? 'Monitor T+10 drift and thesis pulse stability.' :
             'Review thesis notes against upcoming market data updates.'}
          </div>
        </div>
      </div>

      {/* 9. Evidence Board */}
      <div id="market-evidence" className="card dossier-evidence-board" style={{ marginBottom: '24px' }}>
        <h3 style={{ marginBottom: '16px' }}>Evidence Board</h3>
        {evidenceBoard.length === 0 ? (
          <div className="warning-text">No significant evidence available.</div>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', textAlign: 'left', borderCollapse: 'collapse', fontSize: '0.9em' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid var(--border-color)', color: 'var(--text-muted)' }}>
                  <th style={{ padding: '8px 4px' }}>Evidence</th>
                  <th style={{ padding: '8px 4px' }}>Signal</th>
                  <th style={{ padding: '8px 4px' }}>Interpretation</th>
                  <th style={{ padding: '8px 4px' }}>Coverage</th>
                </tr>
              </thead>
              <tbody>
                {evidenceBoard.map((row, idx) => (
                  <tr key={idx} style={{ borderBottom: '1px solid var(--border-light)' }}>
                    <td style={{ padding: '8px 4px', fontWeight: 'bold' }}>{row.evidence}</td>
                    <td style={{ padding: '8px 4px' }}>{row.signal}</td>
                    <td style={{ padding: '8px 4px', color: 'var(--text-muted)' }}>{row.interpretation}</td>
                    <td style={{ padding: '8px 4px' }}>
                      <span className="quality-pill" style={{ opacity: row.coverage === 'Available' ? 1 : 0.6 }}>
                        {row.coverage}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* 10. Market Evidence Detail */}
      <details className="card dossier-methodology" style={{ cursor: 'pointer', marginBottom: '24px' }}>
        <summary style={{ fontWeight: 'bold', outline: 'none' }}>Market Evidence Detail</summary>
        <div className="grid-2col" style={{ fontSize: '0.95em', marginTop: '16px', color: 'var(--text-muted)' }}>
          {momentum.universe_rank !== undefined && (
            <div><strong>Universe Rank:</strong> #{momentum.universe_rank} / {momentum.universe_count || 'Not Included'}</div>
          )}
          {momentum.theme_rank !== undefined && (
            <div><strong>Theme Rank:</strong> #{momentum.theme_rank}</div>
          )}
          {momentum.score !== undefined && (
            <div><strong>Momentum Score:</strong> {momentum.score}</div>
          )}
          {metrics.zscore_200d !== undefined && (
            <div><strong>Z-Score (200D):</strong> {formatNumber(metrics.zscore_200d)}</div>
          )}
          {metrics.ma200_slope_pct !== undefined && (
            <div><strong>MA200 Slope:</strong> {formatPct(metrics.ma200_slope_pct)}</div>
          )}
          {metrics.relative_strength_vs_spy_63d !== undefined && (
            <div><strong>RS vs SPY (63D):</strong> {formatPct(metrics.relative_strength_vs_spy_63d)}</div>
          )}
          {metrics.relative_strength_vs_qqq_63d !== undefined && (
            <div><strong>RS vs QQQ (63D):</strong> {formatPct(metrics.relative_strength_vs_qqq_63d)}</div>
          )}
          {enrichedEventDetail.pead_signal?.status === 'available' && (
            <div><strong>Current Post-Return:</strong> {formatPct(enrichedEventDetail.pead_signal.reaction?.current_post_return)}</div>
          )}
          {enrichedEventDetail.post_earnings_base_rate?.status === 'available' && (
            <div><strong>Matched-Event T+10 Drift:</strong> {formatPct(enrichedEventDetail.post_earnings_base_rate.median_t10_return_pct)}</div>
          )}
          {enrichedEventDetail.peer_readthrough?.incoming?.length > 0 && (
            <div><strong>Peer Repricing:</strong> {enrichedEventDetail.peer_readthrough.incoming.length} related peer moves</div>
          )}
        </div>
      </details>

    </div>
  );
};

export default StockDossierView;
