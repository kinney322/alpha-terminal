import { AlertCircle, BarChart3, CalendarClock, ChevronRight, ExternalLink, Search, ShieldCheck, X } from 'lucide-react';
import { useMemo, useState } from 'react';
import './EarningsLifecycleView.css';

const COPY = {
  en: {
    eyebrow: 'Earnings lifecycle',
    title: 'Earnings Radar',
    intro: 'Track each event from the expected release date through the measured market reaction.',
    pre: 'Pre-Earnings',
    event: 'Event Day',
    post: 'Post-Earnings',
    verified: 'Verified',
    estimated: 'Estimated',
    all: 'All',
    next7: 'Next 7 days',
    later: 'Later',
    awaiting: 'Awaiting release',
    released: 'Results available',
    reactionPending: 'Awaiting reaction',
    measured: 'Measured',
    partial: 'Partial',
    search: 'Search ticker in this phase',
    clear: 'Clear',
    ticker: 'Ticker',
    releaseDate: 'Release date',
    timing: 'Timing',
    days: 'Days',
    estimate: 'EPS estimate',
    revenueEstimate: 'Revenue estimate',
    actual: 'Actual EPS',
    actualRevenue: 'Actual revenue',
    surprise: 'EPS surprise',
    revenueSurprise: 'Revenue surprise',
    reactionDay: 'Reaction day',
    gap: 'Opening gap',
    sameDay: 'Open to close',
    forward: 'Follow-through',
    sample: 'History',
    coverage: 'Coverage',
    status: 'Status',
    unavailable: 'Not available',
    noRows: 'No events match this view.',
    daysAway: (days) => `${days}d`,
    sampleCount: (size) => `N=${size}`,
    dateVerified: 'Date verified',
    dateEstimated: 'Estimated date',
    timingDefault: 'Usual timing',
    timingVerified: 'Timing verified',
    complete: 'Complete',
    qualityPartial: 'Partial',
    qualityUnavailable: 'Awaiting data',
    detail: 'Event detail',
    expectations: 'Expectations',
    results: 'Results',
    marketReaction: 'Market reaction',
    evidenceStatus: 'Evidence status',
    fiscalPeriod: 'Fiscal period',
    missing: 'Still missing',
    noMissing: 'No required fields are missing.',
    guidance: 'Guidance',
    notIncluded: 'Not included',
    asOf: 'As of',
    viewEventStudy: 'View Event Study',
    viewTrend: 'View Momentum',
    viewDossier: 'View Stock Dossier',
    close: 'Close event detail',
    openDetail: (ticker) => `Open ${ticker} event detail`,
    preNote: 'Estimated events remain separate from verified release dates and are not treated as confirmed catalysts.',
    eventNote: 'Event-day rows show only observed results and reaction data. Missing values remain pending.',
    postNote: 'Returns are measured market evidence. No continuation or reversal label is inferred in the browser.',
    releaseAwaiting: 'Release not yet observed',
    resultsObserved: 'Results observed',
    measuredReaction: 'Reaction measured'
  },
  zh: {
    eyebrow: '財報追蹤',
    title: '財報雷達',
    intro: '由公布前開始追蹤，直至業績公布後的市場反應。',
    pre: '財報前',
    event: '公布日',
    post: '財報後',
    verified: '已核實日期',
    estimated: '預計日期',
    all: '全部',
    next7: '未來 7 日',
    later: '稍後公布',
    awaiting: '等待公布',
    released: '已有業績',
    reactionPending: '等待市場反應',
    measured: '反應已量度',
    partial: '資料未齊',
    search: '搜尋本階段股票代號',
    clear: '清除',
    ticker: '股票',
    releaseDate: '公布日期',
    timing: '公布時段',
    days: '尚餘日數',
    estimate: 'EPS 預期',
    revenueEstimate: '收入預期',
    actual: '實際 EPS',
    actualRevenue: '實際收入',
    surprise: 'EPS 與預期差幅',
    revenueSurprise: '收入與預期差幅',
    reactionDay: '反應日',
    gap: '開市跳空',
    sameDay: '即日開收',
    forward: '後續表現',
    sample: '歷史樣本',
    coverage: '資料狀態',
    status: '進度',
    unavailable: '暫無資料',
    noRows: '目前沒有符合條件的事件。',
    daysAway: (days) => `${days} 日`,
    sampleCount: (size) => `${size} 次`,
    dateVerified: '日期已核實',
    dateEstimated: '預計日期',
    timingDefault: '按慣常時段',
    timingVerified: '時段已核實',
    complete: '資料齊備',
    qualityPartial: '部分資料',
    qualityUnavailable: '等待資料',
    detail: '事件詳情',
    expectations: '市場預期',
    results: '業績結果',
    marketReaction: '市場反應',
    evidenceStatus: '資料狀態',
    fiscalPeriod: '財政季度',
    missing: '尚欠資料',
    noMissing: '所需欄位已齊備。',
    guidance: '業績指引',
    notIncluded: '未有資料',
    asOf: '資料截至',
    viewEventStudy: '查看事件研究',
    viewTrend: '查看股價動能',
    viewDossier: '查看股票檔案',
    close: '關閉事件詳情',
    openDetail: (ticker) => `查看 ${ticker} 事件詳情`,
    preNote: '預計日期與已核實日期分開顯示，不會把預計日期當成已確認催化事件。',
    eventNote: '公布日只顯示已取得的業績及市場反應，未有的數值會保留為等待中。',
    postNote: '回報只代表已量度的市場表現；前端不會自行判定延續或反轉。',
    releaseAwaiting: '尚未取得業績結果',
    resultsObserved: '已取得業績結果',
    measuredReaction: '市場反應已量度'
  }
};

const PHASES = ['pre_earnings', 'event_day', 'post_earnings'];

function hasValue(value) {
  return value !== null && value !== undefined && value !== '';
}

function formatDate(value, locale, fallback) {
  if (!value) return fallback;
  const date = new Date(`${value}T12:00:00Z`);
  if (Number.isNaN(date.getTime())) return value;
  return new Intl.DateTimeFormat(locale === 'zh' ? 'zh-HK' : 'en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    timeZone: 'UTC'
  }).format(date);
}

function formatTimestamp(value, locale, fallback) {
  if (!value) return fallback;
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return fallback;
  return new Intl.DateTimeFormat(locale === 'zh' ? 'zh-HK' : 'en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit'
  }).format(date);
}

function formatNumber(value, fallback, digits = 2) {
  if (!hasValue(value) || !Number.isFinite(Number(value))) return fallback;
  return Number(value).toFixed(digits);
}

function formatPercent(value, fallback) {
  if (!hasValue(value) || !Number.isFinite(Number(value))) return fallback;
  const percent = Number(value) * 100;
  return `${percent > 0 ? '+' : ''}${percent.toFixed(2)}%`;
}

function formatSurprise(value, fallback) {
  if (!hasValue(value) || !Number.isFinite(Number(value))) return fallback;
  const percent = Number(value);
  return `${percent > 0 ? '+' : ''}${percent.toFixed(2)}%`;
}

function qualityLabel(event, copy) {
  if (event.quality?.status === 'complete') return copy.complete;
  if (event.quality?.status === 'partial') return copy.qualityPartial;
  return copy.qualityUnavailable;
}

function stateLabel(event, copy) {
  const state = event.lifecycle?.state;
  if (state === 'measured_post_earnings') return copy.measuredReaction;
  if (hasValue(event.actuals?.eps) || hasValue(event.actuals?.revenue)) return copy.resultsObserved;
  return copy.releaseAwaiting;
}

function statusTone(event) {
  if (event.schedule?.release_date_status === 'verified' || event.lifecycle?.state === 'measured_post_earnings') return 'verified';
  if (event.schedule?.release_date_status === 'estimated') return 'estimated';
  if (event.quality?.status === 'unavailable') return 'waiting';
  return 'estimated';
}

function missingFieldLabel(field, copy) {
  const labels = {
    eps_estimate: copy.estimate,
    revenue_estimate: copy.revenueEstimate,
    actual_eps: copy.actual,
    actual_revenue: copy.actualRevenue,
    reaction_day: copy.reactionDay,
    gap_return: copy.gap,
    same_day_oc: copy.sameDay
  };
  return labels[field] || copy.unavailable;
}

function Metric({ label, value }) {
  return (
    <div className="earnings-lifecycle-metric">
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}

function EventDetail({ event, copy, locale, generatedAt, onClose, onOpenEventStudy, onOpenMomentum, onOpenStockDossier }) {
  if (!event) return null;
  const missing = Array.isArray(event.quality?.missing_fields) ? event.quality.missing_fields : [];
  const canEventStudy = Boolean(event.links?.event_study && onOpenEventStudy);
  const canMomentum = Boolean(event.links?.momentum && onOpenMomentum);
  const canDossier = Boolean(event.links?.stock_dossier && onOpenStockDossier);

  return (
    <>
      <button className="radar-detail-backdrop" aria-label={copy.close} onClick={onClose} />
      <aside className="earnings-lifecycle-detail" role="dialog" aria-modal="true" aria-labelledby="earnings-lifecycle-detail-title">
        <header className="earnings-lifecycle-detail__header">
          <div>
            <p>{copy.detail}</p>
            <h2 id="earnings-lifecycle-detail-title">{event.ticker}</h2>
            <span>{formatDate(event.schedule?.release_date, locale, copy.unavailable)}</span>
          </div>
          <button type="button" onClick={onClose} aria-label={copy.close} title={copy.close}>
            <X size={18} />
          </button>
        </header>

        <div className="earnings-lifecycle-detail__status">
          <span className={`earnings-status earnings-status--${statusTone(event)}`}>{stateLabel(event, copy)}</span>
          <span>{qualityLabel(event, copy)}</span>
        </div>

        <section aria-labelledby="detail-schedule">
          <h3 id="detail-schedule">{copy.releaseDate}</h3>
          <div className="earnings-lifecycle-metric-grid">
            <Metric label={copy.releaseDate} value={formatDate(event.schedule?.release_date, locale, copy.unavailable)} />
            <Metric label={copy.timing} value={event.schedule?.release_timing || copy.unavailable} />
            <Metric label={copy.reactionDay} value={formatDate(event.schedule?.reaction_day, locale, copy.unavailable)} />
            <Metric label={copy.fiscalPeriod} value={event.fiscal_period || copy.unavailable} />
          </div>
        </section>

        <section aria-labelledby="detail-expectations">
          <h3 id="detail-expectations">{copy.expectations}</h3>
          <div className="earnings-lifecycle-metric-grid">
            <Metric label={copy.estimate} value={formatNumber(event.expectations?.eps_estimate, copy.unavailable)} />
            <Metric label={copy.revenueEstimate} value={formatNumber(event.expectations?.revenue_estimate, copy.unavailable)} />
            <Metric label={copy.sample} value={hasValue(event.historical_context?.sample_size) ? copy.sampleCount(event.historical_context.sample_size) : copy.unavailable} />
          </div>
        </section>

        <section aria-labelledby="detail-results">
          <h3 id="detail-results">{copy.results}</h3>
          <div className="earnings-lifecycle-metric-grid">
            <Metric label={copy.actual} value={formatNumber(event.actuals?.eps, copy.unavailable)} />
            <Metric label={copy.actualRevenue} value={formatNumber(event.actuals?.revenue, copy.unavailable)} />
            <Metric label={copy.surprise} value={formatSurprise(event.actuals?.eps_surprise_pct, copy.unavailable)} />
            <Metric label={copy.revenueSurprise} value={formatSurprise(event.actuals?.revenue_surprise_pct, copy.unavailable)} />
            <Metric label={copy.guidance} value={event.actuals?.guidance_status === 'not_included' ? copy.notIncluded : event.actuals?.guidance_status || copy.unavailable} />
          </div>
        </section>

        <section aria-labelledby="detail-reaction">
          <h3 id="detail-reaction">{copy.marketReaction}</h3>
          <div className="earnings-lifecycle-metric-grid">
            <Metric label={copy.gap} value={formatPercent(event.market_reaction?.gap_return, copy.unavailable)} />
            <Metric label={copy.sameDay} value={formatPercent(event.market_reaction?.same_day_oc, copy.unavailable)} />
            <Metric label="R+1" value={formatPercent(event.market_reaction?.r_plus_1, copy.unavailable)} />
            <Metric label="R+5" value={formatPercent(event.market_reaction?.r_plus_5, copy.unavailable)} />
            <Metric label="R+10" value={formatPercent(event.market_reaction?.r_plus_10, copy.unavailable)} />
          </div>
        </section>

        <section aria-labelledby="detail-evidence">
          <h3 id="detail-evidence">{copy.evidenceStatus}</h3>
          <p className="earnings-lifecycle-detail__missing-title">{copy.missing}</p>
          {missing.length ? (
            <ul className="earnings-lifecycle-missing-list">
              {missing.map((field) => <li key={field}>{missingFieldLabel(field, copy)}</li>)}
            </ul>
          ) : <p className="earnings-lifecycle-detail__quiet">{copy.noMissing}</p>}
          <p className="earnings-lifecycle-detail__asof">{copy.asOf}: {formatTimestamp(generatedAt, locale, copy.unavailable)}</p>
        </section>

        {(canEventStudy || canMomentum || canDossier) && (
          <footer className="earnings-lifecycle-detail__actions">
            {canEventStudy && <button type="button" onClick={() => onOpenEventStudy(event.ticker)}><BarChart3 size={16} />{copy.viewEventStudy}</button>}
            {canMomentum && <button type="button" onClick={() => onOpenMomentum(event.ticker)}><ExternalLink size={16} />{copy.viewTrend}</button>}
            {canDossier && <button type="button" onClick={() => onOpenStockDossier(event.ticker, event)}><ExternalLink size={16} />{copy.viewDossier}</button>}
          </footer>
        )}
      </aside>
    </>
  );
}

function RowButton({ event, children, onSelect, openLabel }) {
  return (
    <tr className="earnings-lifecycle-row" onClick={() => onSelect(event)}>
      {children}
      <td className="earnings-lifecycle-row__open">
        <button type="button" onClick={(clickEvent) => { clickEvent.stopPropagation(); onSelect(event); }} aria-label={openLabel}>
          <ChevronRight size={16} />
        </button>
      </td>
    </tr>
  );
}

export default function EarningsLifecycleView({ payload, locale = 'en', onOpenEventStudy, onOpenMomentum, onOpenStockDossier }) {
  const copy = COPY[locale] || COPY.en;
  const [phase, setPhase] = useState('pre_earnings');
  const [filter, setFilter] = useState('all');
  const [query, setQuery] = useState('');
  const [selectedEvent, setSelectedEvent] = useState(null);

  const boardIds = useMemo(() => ({
    pre_earnings: [...payload.boards.pre_earnings.verified, ...payload.boards.pre_earnings.estimated],
    event_day: payload.boards.event_day,
    post_earnings: payload.boards.post_earnings
  }), [payload]);

  const phaseCounts = {
    pre_earnings: boardIds.pre_earnings.length,
    event_day: boardIds.event_day.length,
    post_earnings: boardIds.post_earnings.length
  };

  const filters = phase === 'pre_earnings'
    ? [['all', copy.all], ['verified', copy.verified], ['estimated', copy.estimated], ['next7', copy.next7], ['later', copy.later]]
    : phase === 'event_day'
      ? [['all', copy.all], ['awaiting', copy.awaiting], ['released', copy.released], ['reaction', copy.reactionPending]]
      : [['all', copy.all], ['measured', copy.measured], ['partial', copy.partial]];

  const events = useMemo(() => {
    const normalizedQuery = query.trim().toUpperCase();
    return boardIds[phase]
      .map((eventId) => payload.events_detail[eventId])
      .filter(Boolean)
      .filter((event) => !normalizedQuery || event.ticker.includes(normalizedQuery))
      .filter((event) => {
        if (filter === 'all') return true;
        if (filter === 'verified') return event.schedule?.release_date_status === 'verified';
        if (filter === 'estimated') return event.schedule?.release_date_status === 'estimated';
        if (filter === 'next7') return hasValue(event.schedule?.days_to_event) && event.schedule.days_to_event >= 0 && event.schedule.days_to_event <= 7;
        if (filter === 'later') return hasValue(event.schedule?.days_to_event) && event.schedule.days_to_event > 7;
        if (filter === 'awaiting') return !hasValue(event.actuals?.eps) && !hasValue(event.actuals?.revenue);
        if (filter === 'released') return hasValue(event.actuals?.eps) || hasValue(event.actuals?.revenue);
        if (filter === 'reaction') return (hasValue(event.actuals?.eps) || hasValue(event.actuals?.revenue)) && !event.schedule?.reaction_day;
        if (filter === 'measured') return event.lifecycle?.state === 'measured_post_earnings';
        if (filter === 'partial') return event.quality?.status !== 'complete';
        return true;
      });
  }, [boardIds, filter, payload.events_detail, phase, query]);

  const phaseNote = phase === 'pre_earnings' ? copy.preNote : phase === 'event_day' ? copy.eventNote : copy.postNote;

  const selectPhase = (nextPhase) => {
    setPhase(nextPhase);
    setFilter('all');
    setQuery('');
  };

  return (
    <section className="earnings-lifecycle" aria-labelledby="earnings-lifecycle-title">
      <header className="earnings-lifecycle__header">
        <div>
          <p>{copy.eyebrow}</p>
          <h1 id="earnings-lifecycle-title">{copy.title}</h1>
          <span>{copy.intro}</span>
        </div>
        <div className="earnings-lifecycle__asof">
          <CalendarClock size={18} />
          <span>{copy.asOf}</span>
          <strong>{formatDate(payload.meta.as_of_date, locale, copy.unavailable)}</strong>
        </div>
      </header>

      <nav className="earnings-lifecycle__phases" aria-label={copy.eyebrow}>
        {PHASES.map((phaseId) => {
          const label = phaseId === 'pre_earnings' ? copy.pre : phaseId === 'event_day' ? copy.event : copy.post;
          return (
            <button key={phaseId} type="button" className={phase === phaseId ? 'active' : ''} onClick={() => selectPhase(phaseId)}>
              <span>{label}</span><strong>{phaseCounts[phaseId]}</strong>
            </button>
          );
        })}
      </nav>

      <div className="earnings-lifecycle__controls">
        <div className="earnings-lifecycle__filters" aria-label={copy.status}>
          {filters.map(([id, label]) => (
            <button key={id} type="button" className={filter === id ? 'active' : ''} onClick={() => setFilter(id)}>{label}</button>
          ))}
        </div>
        <label className="earnings-lifecycle__search">
          <Search size={17} />
          <input value={query} onChange={(event) => setQuery(event.target.value.toUpperCase())} placeholder={copy.search} aria-label={copy.search} />
          {query && <button type="button" onClick={() => setQuery('')} aria-label={copy.clear} title={copy.clear}><X size={15} /></button>}
        </label>
      </div>

      <div className="earnings-lifecycle__note">
        {phase === 'pre_earnings' ? <ShieldCheck size={17} /> : phase === 'event_day' ? <AlertCircle size={17} /> : <BarChart3 size={17} />}
        <span>{phaseNote}</span>
      </div>

      <div className="earnings-lifecycle__table-wrap">
        <table className={`earnings-lifecycle-table earnings-lifecycle-table--${phase}`}>
          <thead>
            <tr>
              <th>{copy.ticker}</th>
              <th>{copy.releaseDate}</th>
              {phase === 'pre_earnings' && <><th>{copy.timing}</th><th>{copy.days}</th><th>{copy.estimate}</th><th>{copy.sample}</th><th>{copy.coverage}</th></>}
              {phase === 'event_day' && <><th>{copy.status}</th><th>{copy.estimate}</th><th>{copy.actual}</th><th>{copy.surprise}</th><th>{copy.coverage}</th></>}
              {phase === 'post_earnings' && <><th>{copy.reactionDay}</th><th>{copy.surprise}</th><th>{copy.gap}</th><th>{copy.sameDay}</th><th>{copy.forward}</th><th>{copy.sample}</th></>}
              <th />
            </tr>
          </thead>
          <tbody>
            {events.map((event) => (
              <RowButton key={event.event_id} event={event} onSelect={setSelectedEvent} openLabel={copy.openDetail(event.ticker)}>
                <td data-label={copy.ticker}><strong>{event.ticker}</strong><span className={`earnings-status earnings-status--${statusTone(event)}`}>{event.schedule?.release_date_status === 'verified' ? copy.dateVerified : copy.dateEstimated}</span></td>
                <td data-label={copy.releaseDate}>{formatDate(event.schedule?.release_date, locale, copy.unavailable)}</td>
                {phase === 'pre_earnings' && <>
                  <td data-label={copy.timing}><strong>{event.schedule?.release_timing || copy.unavailable}</strong><span>{event.schedule?.timing_status === 'verified' ? copy.timingVerified : copy.timingDefault}</span></td>
                  <td data-label={copy.days}>{hasValue(event.schedule?.days_to_event) ? copy.daysAway(event.schedule.days_to_event) : copy.unavailable}</td>
                  <td data-label={copy.estimate}>{formatNumber(event.expectations?.eps_estimate, copy.unavailable)}</td>
                  <td data-label={copy.sample}>{hasValue(event.historical_context?.sample_size) ? copy.sampleCount(event.historical_context.sample_size) : copy.unavailable}</td>
                  <td data-label={copy.coverage}>{qualityLabel(event, copy)}</td>
                </>}
                {phase === 'event_day' && <>
                  <td data-label={copy.status}>{stateLabel(event, copy)}</td>
                  <td data-label={copy.estimate}>{formatNumber(event.expectations?.eps_estimate, copy.unavailable)}</td>
                  <td data-label={copy.actual}>{formatNumber(event.actuals?.eps, copy.unavailable)}</td>
                  <td data-label={copy.surprise}>{formatSurprise(event.actuals?.eps_surprise_pct, copy.unavailable)}</td>
                  <td data-label={copy.coverage}>{qualityLabel(event, copy)}</td>
                </>}
                {phase === 'post_earnings' && <>
                  <td data-label={copy.reactionDay}>{formatDate(event.schedule?.reaction_day, locale, copy.unavailable)}</td>
                  <td data-label={copy.surprise}>{formatSurprise(event.actuals?.eps_surprise_pct, copy.unavailable)}</td>
                  <td data-label={copy.gap}>{formatPercent(event.market_reaction?.gap_return, copy.unavailable)}</td>
                  <td data-label={copy.sameDay}>{formatPercent(event.market_reaction?.same_day_oc, copy.unavailable)}</td>
                  <td data-label={copy.forward}><strong>R+1 {formatPercent(event.market_reaction?.r_plus_1, copy.unavailable)}</strong><span>R+5 {formatPercent(event.market_reaction?.r_plus_5, copy.unavailable)}</span></td>
                  <td data-label={copy.sample}>{hasValue(event.historical_context?.sample_size) ? copy.sampleCount(event.historical_context.sample_size) : copy.unavailable}</td>
                </>}
              </RowButton>
            ))}
          </tbody>
        </table>
        {!events.length && <div className="earnings-lifecycle__empty">{copy.noRows}</div>}
      </div>

      <EventDetail
        event={selectedEvent}
        copy={copy}
        locale={locale}
        generatedAt={payload.meta.generated_at}
        onClose={() => setSelectedEvent(null)}
        onOpenEventStudy={onOpenEventStudy}
        onOpenMomentum={onOpenMomentum}
        onOpenStockDossier={onOpenStockDossier}
      />
    </section>
  );
}
