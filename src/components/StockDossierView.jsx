import React from 'react';
import {
  buildDossierSummary,
  buildResearchKillSwitch,
  buildPriceTrendRisk,
  buildValuationCore,
  buildStockOverview
} from './dossierHelpers';
import { getStockDossierProfile } from '../data/stockDossierProfiles';

const API_BASE = 'https://kw-terminal-api.myfootballplaces.workers.dev';

const formatPct = (value) => {
  if (value === undefined || value === null || Number.isNaN(Number(value))) return 'Not Included';
  const n = Number(value);
  return `${n > 0 ? '+' : ''}${n.toFixed(1)}%`;
};

const formatRate = (value) => {
  if (value === undefined || value === null || Number.isNaN(Number(value))) return 'Not Included';
  return `${(Number(value) * 100).toFixed(0)}%`;
};

const formatAbsPct = (value) => {
  if (value === undefined || value === null || Number.isNaN(Number(value))) return 'Not Included';
  return `${Math.abs(Number(value)).toFixed(1)}%`;
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

const formatTechnicalZone = (value) => {
  if (!value || String(value).toLowerCase() === 'null' || value === '$0-$0' || value === 'undefined') {
    return null;
  }
  if (Array.isArray(value)) {
    const nums = value.map(Number).filter(Number.isFinite);
    if (!nums.length || nums.every((num) => num === 0)) return null;
    if (nums.length >= 2) {
      return `$${nums[0].toFixed(2)}-$${nums[1].toFixed(2)}`;
    }
    return `$${nums[0].toFixed(2)}`;
  }
  return String(value);
};

const verdictStateLabels = {
  post_earnings_watch: 'Post-earnings watch',
  priced_for_perfection: 'Priced for perfection',
  constructive: 'Constructive',
  high: 'High'
};

const thesisStateLabels = {
  ai_risk: 'AI risk',
  ai_benefit: 'AI benefit',
  neutral: 'neutral',
  mixed: 'mixed'
};

const renderStructuredVerdict = (structuredVerdict, fallback) => {
  if (!structuredVerdict) {
    return {
      reason: fallback.reason,
      verdict: fallback.verdict,
      support: [],
      risks: []
    };
  }

  const researchState = verdictStateLabels[structuredVerdict.researchState] || formatLabel(structuredVerdict.researchState);
  const marketEvidence = verdictStateLabels[structuredVerdict.marketEvidence] || formatLabel(structuredVerdict.marketEvidence);
  const shift = structuredVerdict.thesisShift;
  const shiftLine = shift?.from && shift?.to
    ? `The working thesis has shifted from ${thesisStateLabels[shift.from] || formatLabel(shift.from)} to ${thesisStateLabels[shift.to] || formatLabel(shift.to)}: ${shift.reason}`
    : '';

  return {
    reason: `${researchState}: ${marketEvidence.toLowerCase()} evidence keeps this stock on the research queue.`,
    verdict: structuredVerdict.finalRead || fallback.verdict,
    thesisShift: shiftLine,
    support: structuredVerdict.keySupport || [],
    risks: structuredVerdict.keyRisk || []
  };
};

const toNumeric = (value) => {
  if (value === null || value === undefined || value === '') return null;
  const numeric = Number(value);
  return Number.isFinite(numeric) ? numeric : null;
};

const formatEventDate = (value) => {
  if (!value) return 'Pending';
  try {
    const date = new Date(`${value}T00:00:00Z`);
    if (Number.isNaN(date.getTime())) return value;
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      timeZone: 'UTC'
    }).format(date);
  } catch {
    return value;
  }
};

const formatSignedReturn = (value, digits = 2) => {
  const numeric = toNumeric(value);
  if (numeric === null) return null;
  const prefix = numeric > 0 ? '+' : '';
  return `${prefix}${numeric.toFixed(digits)}%`;
};

const returnToneClass = (value) => {
  const numeric = toNumeric(value);
  if (numeric === null) return 'pending';
  if (numeric > 0) return 'positive';
  if (numeric < 0) return 'negative';
  return 'neutral';
};

const ReturnValue = ({ value, digits = 2 }) => {
  const formatted = formatSignedReturn(value, digits);
  if (formatted === null) {
    return <em className="dossier-pending-value">Pending</em>;
  }
  return <span className={`dossier-return-value tone-${returnToneClass(value)}`}>{formatted}</span>;
};

const SummaryMetric = ({ label, summary, value }) => (
  <div className="dossier-event-summary-metric">
    <span>{label}</span>
    <strong>
      {summary ? (
        <>
          <ReturnValue value={value ?? summary.avg_return} />
          <small>{summary.count ?? 0} measured</small>
        </>
      ) : (
        <em className="dossier-pending-value">Pending</em>
      )}
    </strong>
  </div>
);

const EventStudyQuarterTable = ({ rows = [] }) => {
  if (!rows.length) {
    return (
      <div className="dossier-quarter-table-empty">
        <em className="dossier-pending-value">Pending</em>
        <span>No earnings-event quarter log is available for this ticker.</span>
      </div>
    );
  }

  return (
    <div className="dossier-quarter-table-wrap" aria-label="Earnings event quarter log">
      <table className="dossier-quarter-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Date</th>
            <th>Surprise (%)</th>
            <th>Next Day</th>
            <th>3 Days</th>
            <th>5 Days</th>
            <th>10 Days</th>
            <th>30 Days</th>
            <th>Next Earnings</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={`${row.event_date}-${index}`}>
              <td>{index + 1}</td>
              <td>{formatEventDate(row.event_date)}</td>
              <td><ReturnValue value={row.surprise_percent} /></td>
              <td><ReturnValue value={row.r_plus_1} /></td>
              <td><ReturnValue value={row.r_plus_3} /></td>
              <td><ReturnValue value={row.r_plus_5} /></td>
              <td><ReturnValue value={row.r_plus_10} /></td>
              <td><ReturnValue value={row.r_plus_30} /></td>
              <td><ReturnValue value={row.until_next_earnings_return} /></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
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
    { label: 'Trend', value: momentumScore === null ? 'Pending' : `${momentumScore}/100`, score: momentumScore ?? 18, tone: momentumTone },
    { label: 'Strength', value: rsSpy === null ? 'Pending' : formatPct(rsSpy), score: rsSpy === null ? 18 : clamp(50 + rsSpy * 2.2), tone: rsTone },
    { label: 'Long Term', value: smaConstructive === null ? 'Pending' : smaConstructive ? 'Above' : 'Below', score: smaConstructive === null ? 18 : smaConstructive ? 76 : 24, tone: smaConstructive === null ? 'neutral' : smaConstructive ? 'hot' : 'cool' },
    { label: 'Reaction', value: currentPostReturn === null ? 'Pending' : formatPct(currentPostReturn), score: currentPostReturn === null ? 18 : clamp(50 + currentPostReturn * 3), tone: eventTone },
    { label: 'Valuation', value: valuationCore.status === 'available' ? valuationCore.topVerdict.valuationState : 'Pending', score: valueScore, tone: valueTone }
  ];
};

const buildEventStudyDetail = (eventDetail, dossierProfile = null) => {
  const baseRate = eventDetail.post_earnings_base_rate || {};
  const pead = eventDetail.pead_signal || {};
  const reaction = pead.reaction || {};
  const direction = pead.direction || 'continuation';
  const selectedRate = direction === 'fade'
    ? baseRate.reversal_rate ?? baseRate.fade_rate
    : baseRate.continuation_rate ?? baseRate.drift_rate;
  const sampleSize = baseRate.similar_reaction_sample_size ?? baseRate.sample_size ?? null;
  const currentPostReturn = toNumeric(reaction.current_post_return);
  const t1Return = toNumeric(reaction.t1_return);
  const medianT1 = toNumeric(baseRate.median_t1_return_pct);
  const medianT10 = toNumeric(baseRate.median_t10_return_pct);
  const medianT1ToT10 = toNumeric(baseRate.median_t1_to_t10_return_pct);
  const medianMaxRisk = toNumeric(baseRate.median_max_risk_5d);
  const filterMode = baseRate.filter_mode
    ? formatLabel(baseRate.filter_mode).replace(/\s+Fallback$/i, '')
    : 'Current setup';
  const hasBaseRate = baseRate.status === 'available';
  const returnTone = (value) => {
    const numeric = toNumeric(value);
    if (numeric === null) return 'neutral';
    return numeric >= 0 ? 'positive' : 'negative';
  };

  return {
    hasBaseRate,
    title: dossierProfile?.eventStudyRead?.title || 'Historical post-event evidence is not yet complete.',
    interpretation: dossierProfile?.eventStudyRead?.interpretation || 'Use the event-study matrix as market evidence only; it does not replace valuation or company-level research.',
    setupLabel: filterMode,
    sampleSize,
    currentPostReturn,
    t1Return,
    metrics: [
      { label: 'Base Rate', value: hasBaseRate ? formatRate(selectedRate) : 'Pending', tone: selectedRate >= 0.55 ? 'positive' : selectedRate <= 0.45 ? 'negative' : 'neutral' },
      { label: 'Median T+1', value: formatPct(medianT1 ?? t1Return), tone: returnTone(medianT1 ?? t1Return) },
      { label: 'Median T+10', value: formatPct(medianT10), tone: returnTone(medianT10) },
      { label: 'T+1 to T+10', value: formatPct(medianT1ToT10), tone: returnTone(medianT1ToT10) },
      { label: 'Current Post Move', value: formatPct(currentPostReturn), tone: returnTone(currentPostReturn) },
      { label: '5D Risk Budget', value: formatAbsPct(medianMaxRisk), tone: 'neutral' }
    ],
    notes: [
      sampleSize ? `Comparable sample: N=${sampleSize}.` : 'Comparable sample size is not available in the current payload.',
      pead.reason || 'Current event reaction is used only as market evidence.',
      baseRate.sample_warning ? `Sample warning: ${formatLabel(baseRate.sample_warning)}.` : null
    ].filter(Boolean)
  };
};

const StockDossierView = ({ eventDetail, payload, onOpenEventStudy }) => {
  const tickerForSummary = String(eventDetail?.ticker || '').trim().toUpperCase();
  const [eventStudySummary, setEventStudySummary] = React.useState(null);
  const [eventStudyLoading, setEventStudyLoading] = React.useState(false);
  const [eventStudyError, setEventStudyError] = React.useState(null);

  React.useEffect(() => {
    if (!tickerForSummary) {
      setEventStudySummary(null);
      setEventStudyError(null);
      setEventStudyLoading(false);
      return undefined;
    }

    const controller = new AbortController();
    setEventStudyLoading(true);
    setEventStudyError(null);

    fetch(`${API_BASE}/event-study/earnings-summary?ticker=${encodeURIComponent(tickerForSummary)}`, {
      signal: controller.signal,
      headers: { Accept: 'application/json' }
    })
      .then(async (response) => {
        const json = await response.json();
        if (!response.ok) {
          throw new Error(json?.error || `Event study summary failed (${response.status})`);
        }
        setEventStudySummary(json);
      })
      .catch((error) => {
        if (error.name === 'AbortError') return;
        setEventStudySummary(null);
        setEventStudyError(error.message);
      })
      .finally(() => {
        if (!controller.signal.aborted) {
          setEventStudyLoading(false);
        }
      });

    return () => controller.abort();
  }, [tickerForSummary]);

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
  const renderedVerdict = renderStructuredVerdict(dossierProfile?.dossierVerdict, {
    reason: dossierProfile?.whyNow?.reason || dossierSummary.reason,
    verdict: dossierProfile?.whyNow?.verdict || dossierSummary.verdict
  });
  const killSwitch = buildResearchKillSwitch(enrichedEventDetail, payload);
  const priceTrendRisk = buildPriceTrendRisk(enrichedEventDetail, payload);
  const valuationCore = buildValuationCore(enrichedEventDetail, dossierProfile);
  const stockOverview = buildStockOverview(enrichedEventDetail, payload, dossierProfile);
  const marketEvidence = dossierProfile?.marketEvidence || {
    title: 'Market evidence requires more context before it can support a research conclusion.',
    points: [
      'Use event reaction, trend quality, and valuation context together before treating the setup as actionable.',
      'Do not infer company quality or margin of safety from momentum alone.'
    ]
  };
  const eventStudyDetail = buildEventStudyDetail(enrichedEventDetail, dossierProfile);

  const momentum = enrichedEventDetail.momentum_evidence || {};
  const metrics = momentum.evidence || enrichedEventDetail.trend_setup?.metrics || {};
  const priceSeries = extractPriceSeries(enrichedEventDetail);
  const sparklinePath = buildSparklinePath(priceSeries);

  const isMomentumUniverse = enrichedEventDetail.status === 'momentum_universe' || enrichedEventDetail.event_phase === 'off_cycle_universe';

  // Ticker Header variables
  const ticker = tickerForSummary || enrichedEventDetail.ticker;
  const companyName = enrichedEventDetail.company_name || '';
  const exchange = enrichedEventDetail.exchange || enrichedEventDetail.market || '';
  const companyDisplayName = companyName || ticker;
  const tickerLine = exchange ? `${exchange}:${ticker} Stock Dossier` : `${ticker} Stock Dossier`;
  const industryTheme = stockOverview.theme || momentum.industry_theme_label || momentum.industry_theme || enrichedEventDetail.trend_setup?.supply_chain_stage || '';
  const researchState = isMomentumUniverse ? 'Momentum Candidate'
                      : (enrichedEventDetail.status === 'off_cycle_watch' || enrichedEventDetail.event_phase === 'off_cycle') ? 'Between Catalysts'
                      : enrichedEventDetail.event_phase === 'post_earnings' ? 'Post-Earnings Watch'
                      : enrichedEventDetail.peer_readthrough?.incoming?.length > 0 ? 'Peer-Led Context'
                      : 'Catalyst Watch';
  const snapshotRows = [
    { label: 'Business Quality', value: valuationCore.topVerdict.businessQuality, tone: valuationCore.topVerdict.businessQuality === 'High' ? 'positive' : 'neutral' },
    { label: 'Valuation', value: valuationCore.topVerdict.valuationState, tone: valuationCore.topVerdict.valuationState.includes('Missing') ? 'warning' : 'neutral' },
    { label: 'Base Case', value: valuationCore.topVerdict.baseCaseSupport, tone: valuationCore.topVerdict.baseCaseSupport === 'Partial' ? 'warning' : 'neutral' },
    { label: 'Margin of Safety', value: valuationCore.topVerdict.marginOfSafety, tone: valuationCore.topVerdict.marginOfSafety === 'None' ? 'warning' : 'neutral' }
  ];
  const radarAxes = buildRadarAxes({ momentum, metrics, valuationCore, eventDetail: enrichedEventDetail });
  const valuationGate = valuationCore.topVerdict.marginOfSafety === 'None'
    ? 'No margin of safety'
    : valuationCore.topVerdict.valuationState;
  const breakPoint = renderedVerdict.risks[0] || valuationCore.killData?.[0] || 'Needs updated evidence before conclusion changes.';
  const eventStudyCoverage = eventStudySummary?.coverage || null;
  const eventStudyDigest = eventStudySummary?.dossier_digest || null;
  const forwardAll = eventStudySummary?.forward_returns?.all_events || null;
  const quarterLogRows = Array.isArray(eventStudySummary?.quarter_log) ? eventStudySummary.quarter_log : [];
  const measuredT10Count = forwardAll?.ten_days?.count ?? null;

  return (
    <div className="stock-dossier-view">
      {/* 1. Stock Overview */}
      <section className="dossier-hero-card">
        <div className="dossier-hero-main">
          <div className="dossier-hero-identity">
            <p className="crowdrisk-kicker">Stock Overview</p>
            <h2>{companyDisplayName}</h2>
            <p className="dossier-ticker-line">{tickerLine}</p>
            <div className="dossier-hero-pills">
              <span>{researchState}</span>
              {industryTheme && <span>{formatLabel(industryTheme)}</span>}
            </div>
          </div>

          <p className="dossier-profile-line">{stockOverview.profileLine}</p>

          <div className="dossier-hero-read" aria-label={`${ticker} executive summary`}>
            <span>Final Read</span>
            <strong>{renderedVerdict.verdict}</strong>
            <p>{valuationGate}. {breakPoint}</p>
          </div>

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
            <strong>{renderedVerdict.reason}</strong>
            {renderedVerdict.thesisShift && <p>{renderedVerdict.thesisShift}</p>}
          </div>
        </div>

        <div className="dossier-snapshot-board" aria-label={`${ticker} dossier snapshot`}>
          <p className="crowdrisk-kicker">At a glance</p>
          <div className="dossier-snapshot-list">
            {snapshotRows.map((row) => (
              <div key={row.label} className={`dossier-snapshot-row tone-${row.tone}`}>
                <span>{row.label}</span>
                <strong>{row.value}</strong>
              </div>
            ))}
          </div>
          <div className="dossier-market-visuals">
            {sparklinePath && (
              <div className="dossier-mini-chart">
                <div>
                  <span>Price Trend</span>
                  <strong>Recent trend</strong>
                </div>
                <svg viewBox="0 0 220 74" role="img" aria-label={`${ticker} price trend`}>
                  <path d={sparklinePath} />
                </svg>
              </div>
            )}
            <div className="dossier-radar-panel" aria-label={`${ticker} quick situation map`}>
              <div className="dossier-radar-heading">
                <span>Research Map</span>
                <strong>Quality, valuation, trend, and evidence</strong>
              </div>
              <div className="dossier-research-bars">
                {radarAxes.map((axis) => (
                  <div key={axis.label} className={`dossier-research-bar tone-${axis.tone}`}>
                    <div>
                      <span>{axis.label}</span>
                      <strong>{axis.value}</strong>
                    </div>
                    <i style={{ '--score': `${clamp(axis.score, 0, 100)}%` }} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {(renderedVerdict.support.length > 0 || renderedVerdict.risks.length > 0) && (
        <section className="card dossier-case-summary" aria-label={`${ticker} verdict summary`}>
          <div>
            <p className="crowdrisk-kicker">Case Summary</p>
            <h3>What has to keep working?</h3>
          </div>
          <div className="dossier-verdict-grid">
            {renderedVerdict.support.length > 0 && (
              <div>
                <em>What supports the case</em>
                <ul>
                  {renderedVerdict.support.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            )}
            {renderedVerdict.risks.length > 0 && (
              <div>
                <em>What can break the case</em>
                <ul>
                  {renderedVerdict.risks.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </section>
      )}

      {dossierProfile && (
        <section id="company-overview" className="dossier-company-overview-card card">
          <div className="dossier-company-overview">
            <p className="crowdrisk-kicker">Company Overview</p>
            <h3>Business Engine</h3>
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

      {/* 5b. Fundamentals Summary / Valuation Core */}
      <div id="valuation-core" className="card dossier-valuation-core" style={{ marginBottom: '24px' }}>
        <div className="dossier-valuation-core__header">
          <div>
            <p className="crowdrisk-kicker">Fundamentals Summary / Valuation Core</p>
            <h3>Does company quality support continued research?</h3>
          </div>
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

      </div>

      <div id="market-evidence" className="card dossier-market-evidence-card" style={{ marginBottom: '24px' }}>
        <p className="crowdrisk-kicker">Market Evidence</p>
        <h3>{marketEvidence.title}</h3>
        <div className="dossier-event-study-summary-strip" aria-label={`${ticker} earnings event summary`}>
          <div>
            <span>Measured quarters</span>
            <strong>
              {eventStudyDigest?.quarters_analyzed ?? eventStudyCoverage?.feature_rows ?? <em className="dossier-pending-value">Pending</em>}
              {measuredT10Count !== null && <small>{measuredT10Count} T+10 measured</small>}
            </strong>
          </div>
          <div>
            <span>T+10 base rate</span>
            <strong>
              {eventStudyDigest?.base_rate !== undefined && eventStudyDigest?.base_rate !== null ? `${eventStudyDigest.base_rate}%` : <em className="dossier-pending-value">Pending</em>}
            </strong>
          </div>
          <SummaryMetric label="3D avg return" summary={forwardAll?.three_days} value={eventStudyDigest?.average_t3_return} />
          <SummaryMetric label="30D avg return" summary={forwardAll?.thirty_days} value={eventStudyDigest?.average_t30_return} />
        </div>
        {eventStudyDigest?.summary_line && (
          <p className="dossier-event-study-summary-line">{eventStudyDigest.summary_line}</p>
        )}
        {eventStudyLoading && <p className="dossier-event-study-status">Loading earnings-event summary...</p>}
        {eventStudyError && <p className="dossier-event-study-status dossier-event-study-status--error">{eventStudyError}</p>}
        <div className="dossier-event-study-detail">
          <div className="dossier-event-study-copy">
            <span>Event Study Detail</span>
            <strong>{eventStudyDetail.title}</strong>
            <p>{eventStudyDetail.interpretation}</p>
            {onOpenEventStudy && (
              <button
                type="button"
                className="dossier-section-link-button"
                onClick={() => onOpenEventStudy(ticker)}
              >
                Open {ticker} Event Study
              </button>
            )}
            <ul>
              {marketEvidence.points.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
          </div>
          <div className="dossier-event-study-board" aria-label={`${ticker} event study evidence`}>
            <div className="dossier-event-study-meta">
              <span>{eventStudyDigest ? 'Earnings summary' : eventStudyDetail.setupLabel}</span>
              <strong>
                {measuredT10Count !== null
                  ? `N=${measuredT10Count}`
                  : eventStudyDetail.sampleSize ? `N=${eventStudyDetail.sampleSize}` : 'Sample not included'}
              </strong>
            </div>
            <div className="dossier-event-study-metrics">
              {(eventStudyDigest ? [
                { label: 'T+10 Base Rate', value: `${eventStudyDigest.base_rate}%`, tone: eventStudyDigest.base_rate >= 55 ? 'positive' : eventStudyDigest.base_rate <= 45 ? 'negative' : 'neutral' },
                { label: 'Avg 3D', value: formatSignedReturn(eventStudyDigest.average_t3_return) || 'Pending', tone: returnToneClass(eventStudyDigest.average_t3_return) },
                { label: 'Avg 10D', value: formatSignedReturn(eventStudyDigest.average_t10_return) || 'Pending', tone: returnToneClass(eventStudyDigest.average_t10_return) },
                { label: 'Avg 30D', value: formatSignedReturn(eventStudyDigest.average_t30_return) || 'Pending', tone: returnToneClass(eventStudyDigest.average_t30_return) }
              ] : eventStudyDetail.metrics).map((metric) => (
                <div key={metric.label} className={`tone-${metric.tone}`}>
                  <span>{metric.label}</span>
                  <strong>{metric.value}</strong>
                </div>
              ))}
            </div>
            <ul className="dossier-event-study-notes">
              {eventStudyDetail.notes.map((note) => (
                <li key={note}>{note}</li>
              ))}
            </ul>
          </div>
        </div>
        <div className="dossier-quarter-log-section">
          <div className="dossier-quarter-log-header">
            <div>
              <p className="crowdrisk-kicker">Quarter Log</p>
              <h4>{quarterLogRows.length ? `${quarterLogRows.length} earnings quarters` : 'Earnings quarter log'}</h4>
            </div>
            <span>{eventStudyCoverage?.generated_at ? `Updated ${formatEventDate(eventStudyCoverage.generated_at.slice(0, 10))}` : 'Live API'}</span>
          </div>
          <EventStudyQuarterTable rows={quarterLogRows} />
        </div>
      </div>

      <div id="technical-setup" className="card dossier-scenario-card" style={{ marginBottom: '24px' }}>
        <p className="crowdrisk-kicker">Technical Setup</p>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
          <h3 style={{ margin: 0 }}>Structure & Execution</h3>
          {(() => {
            const ts = enrichedEventDetail.trend_setup?.technical_setup || {};
            const hasSetup = ts.status && ts.status !== 'unavailable';
            const label = ts.status_label_en || ts.status_label_zh || ts.daily_action || 'Unavailable';
            return <span className={hasSetup ? 'momentum-setup-badge' : 'crowdrisk-muted'}>{label}</span>;
          })()}
        </div>
        <div className="dossier-scenario-grid" style={{ gridTemplateColumns: '1fr' }}>
          <div>
            {(() => {
              const ts = enrichedEventDetail.trend_setup?.technical_setup || {};
              const hasSetup = ts.status && ts.status !== 'unavailable';
              const sentence = ts.setup_sentence_en || ts.setup_sentence_zh || 'No technical setup context provided.';
              return <p className={hasSetup ? '' : 'crowdrisk-muted'}>{sentence}</p>;
            })()}
          </div>
          {(() => {
             const ts = enrichedEventDetail.trend_setup?.technical_setup || {};
             const hasSetup = ts.status && ts.status !== 'unavailable';
             if (!hasSetup) return null;

             const breakout = formatTechnicalZone(ts.breakout_area);
             const support = formatTechnicalZone(ts.support_area);
             const target = formatTechnicalZone(ts.target_zone);
             const hold = formatTechnicalZone(ts.hold_zone);

             if (!breakout && !support && !target && !hold) return null;

             return (
               <div className="dossier-market-strip" style={{ marginTop: '16px' }}>
                 {breakout && <div><span>Breakout Area</span><strong>{breakout}</strong></div>}
                 {support && <div><span>Support Area</span><strong>{support}</strong></div>}
                 {target && <div><span>Target Zone</span><strong>{target}</strong></div>}
                 {hold && <div><span>Hold Zone</span><strong>{hold}</strong></div>}
               </div>
             );
          })()}
        </div>
      </div>

      {valuationCore.scenarios && (
        <div id="scenario-range" className="card dossier-scenario-card">
          <p className="crowdrisk-kicker">Scenario Range</p>
          <h3>What changes the expected outcome?</h3>
          <div className="dossier-scenario-grid">
            {valuationCore.scenarios.map((scenario) => (
              <div key={scenario.label}>
                <span>{scenario.label}</span>
                <p>{scenario.text}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 6. Kill Data */}
      <div id="kill-data" className="card dossier-pulse-watch dossier-kill-card" style={{ marginBottom: '24px' }}>
        <div className="grid-2col" style={{ gap: '24px' }}>
          <div>
            <h3>Kill Data</h3>
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
      </div>

    </div>
  );
};

export default StockDossierView;
