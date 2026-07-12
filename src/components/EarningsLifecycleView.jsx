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
    search: 'Search covered ticker',
    clear: 'Clear',
    ticker: 'Ticker',
    releaseDate: 'Release date',
    timing: 'Timing',
    days: 'Days',
    preEventPerformance: 'Current run-up',
    historicalPreEvent: 'Historical pre-earnings median',
    historyWindow: 'History window',
    window1y: '1Y',
    window3y: '3Y',
    window5y: '5Y',
    windowMax: 'Max',
    historyLoading: 'Loading historical pattern',
    historyUnavailable: 'Historical pattern unavailable',
    historyDelayed: 'Historical reference is temporarily unavailable. Current event data remains visible.',
    pastEarnings: (size) => `At least ${size} past earnings`,
    lowSample: (size) => `Low sample · at least ${size} events`,
    median: 'Median',
    average: 'Average',
    upRate: 'Up rate',
    range: 'Range',
    preEventLiveAsOf: (date) => `Through ${date} close`,
    preEventFinalAsOf: (date) => `Final through ${date} close`,
    preEventUnavailable: 'Not enough trading history',
    sessionLabel: (days) => `${days}D`,
    estimate: 'EPS estimate',
    revenueEstimate: 'Revenue estimate',
    estimateAsOf: 'Estimate as of',
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
    timingUnavailable: 'Timing not verified',
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
    preNote: 'Historical medians use past earnings only. Estimated dates remain separate from verified catalysts.',
    eventNote: 'Event-day rows show only observed results and reaction data. Missing values remain pending.',
    postNote: 'Returns are measured market evidence. No continuation or reversal label is inferred in the browser.',
    releaseAwaiting: 'Release not yet observed',
    resultsObserved: 'Results observed',
    measuredReaction: 'Reaction measured',
    coveredSummary: (covered, noEvent) => `${covered} covered · ${noEvent} without a current date`,
    updated: 'Updated',
    noEventEyebrow: 'Covered ticker',
    noEventTitle: (ticker) => `${ticker} has no current earnings date`,
    noEventBody: 'The ticker remains covered, but no usable current earnings event is available. No date has been guessed.',
    otherPhaseTitle: (ticker) => `${ticker} is in another earnings phase`,
    otherPhaseBody: 'Open its current phase to review the available event.',
    filteredTitle: (ticker) => `${ticker} is hidden by the current filter`,
    filteredBody: 'Reset the status filter to show the event in this phase.',
    viewCurrentPhase: 'View current phase',
    resetFilter: 'Reset filter'
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
    search: '搜尋已覆蓋股票代號',
    clear: '清除',
    ticker: '股票',
    releaseDate: '公布日期',
    timing: '公布時段',
    days: '尚餘日數',
    preEventPerformance: '今次財報前走勢',
    historicalPreEvent: '歷史財報前中位回報',
    historyWindow: '歷史區間',
    window1y: '1年',
    window3y: '3年',
    window5y: '5年',
    windowMax: '全部',
    historyLoading: '正在載入歷史表現',
    historyUnavailable: '暫無歷史表現',
    historyDelayed: '歷史參考暫時未能載入，今次事件資料仍可查看。',
    pastEarnings: (size) => `最少 ${size} 次歷史財報`,
    lowSample: (size) => `樣本較少 · 最少 ${size} 次`,
    median: '中位回報',
    average: '平均回報',
    upRate: '上升比例',
    range: '回報範圍',
    preEventLiveAsOf: (date) => `截至 ${date} 收市`,
    preEventFinalAsOf: (date) => `以 ${date} 收市為最終基準`,
    preEventUnavailable: '交易日數據不足',
    sessionLabel: (days) => `${days}日`,
    estimate: 'EPS 預期',
    revenueEstimate: '收入預期',
    estimateAsOf: '預期更新時間',
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
    timingUnavailable: '時段未核實',
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
    preNote: '歷史中位回報只採用過去財報；預計日期仍與已核實催化事件分開顯示。',
    eventNote: '公布日只顯示已取得的業績及市場反應，未有的數值會保留為等待中。',
    postNote: '回報只代表已量度的市場表現；前端不會自行判定延續或反轉。',
    releaseAwaiting: '尚未取得業績結果',
    resultsObserved: '已取得業績結果',
    measuredReaction: '市場反應已量度',
    coveredSummary: (covered, noEvent) => `覆蓋 ${covered} 隻 · ${noEvent} 隻暫無日期`,
    updated: '更新時間',
    noEventEyebrow: '已覆蓋股票',
    noEventTitle: (ticker) => `${ticker} 目前沒有可用的財報日期`,
    noEventBody: '這隻股票仍在覆蓋範圍內，但目前沒有可用的財報事件；系統不會猜測日期。',
    otherPhaseTitle: (ticker) => `${ticker} 目前在另一個財報階段`,
    otherPhaseBody: '可前往目前階段查看已有事件資料。',
    filteredTitle: (ticker) => `${ticker} 被目前篩選條件隱藏`,
    filteredBody: '重設資料狀態篩選後，即可顯示這個階段的事件。',
    viewCurrentPhase: '查看目前階段',
    resetFilter: '重設篩選'
  }
};

const PHASES = ['pre_earnings', 'event_day', 'post_earnings'];
const PRE_EVENT_DISPLAY_HORIZONS = [14, 10, 7, 5, 3, 1];
const REFERENCE_WINDOWS = ['1y', '3y', '5y', 'max'];

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

function formatRate(value, fallback) {
  if (!hasValue(value) || !Number.isFinite(Number(value))) return fallback;
  return `${(Number(value) * 100).toFixed(0)}%`;
}

function formatRange(stats, fallback) {
  if (!stats || !hasValue(stats.min_return) || !hasValue(stats.max_return)) return fallback;
  return `${formatPercent(stats.min_return, fallback)} / ${formatPercent(stats.max_return, fallback)}`;
}

function historyWindowLabel(copy, window) {
  if (window === '1y') return copy.window1y;
  if (window === '3y') return copy.window3y;
  if (window === 'max') return copy.windowMax;
  return copy.window5y;
}

function returnTone(value) {
  if (!hasValue(value) || !Number.isFinite(Number(value)) || Number(value) === 0) return 'neutral';
  return Number(value) > 0 ? 'positive' : 'negative';
}

function PreEventPerformance({ performance, copy, locale, detail = false }) {
  const status = performance?.status || 'unavailable';
  const asOfDate = formatDate(performance?.as_of_date, locale, copy.unavailable);
  const statusText = status === 'final'
    ? copy.preEventFinalAsOf(asOfDate)
    : status === 'live'
      ? copy.preEventLiveAsOf(asOfDate)
      : copy.preEventUnavailable;

  return (
    <div className={`earnings-pre-event-performance${detail ? ' earnings-pre-event-performance--detail' : ''}`}>
      <div className="earnings-pre-event-performance__grid">
        {PRE_EVENT_DISPLAY_HORIZONS.map((horizon) => {
          const value = performance?.[`pre_${horizon}_return`];
          return (
            <span className="earnings-pre-event-performance__item" key={horizon}>
              <small>{copy.sessionLabel(horizon)}</small>
              <strong className={`earnings-pre-event-return--${returnTone(value)}`}>
                {formatPercent(value, '—')}
              </strong>
            </span>
          );
        })}
      </div>
      <small className="earnings-pre-event-performance__asof">{statusText}</small>
    </div>
  );
}

function HistoricalPreEventPerformance({ reference, window, copy, loading = false, error = null, detail = false }) {
  if (loading) {
    return <div className="earnings-history-state">{copy.historyLoading}</div>;
  }
  if (error || !reference || reference.sample_size === 0) {
    return <div className="earnings-history-state">{copy.historyUnavailable}</div>;
  }
  const conservativeSampleSize = reference.minimum_horizon_sample_size;
  const sampleText = reference.low_sample
    ? copy.lowSample(conservativeSampleSize)
    : copy.pastEarnings(conservativeSampleSize);
  return (
    <div className={`earnings-pre-event-performance earnings-historical-performance${detail ? ' earnings-pre-event-performance--detail' : ''}`}>
      <div className="earnings-pre-event-performance__grid">
        {PRE_EVENT_DISPLAY_HORIZONS.map((horizon) => {
          const value = reference.horizons?.[String(horizon)]?.median_return;
          return (
            <span className="earnings-pre-event-performance__item" key={horizon}>
              <small>{copy.sessionLabel(horizon)}</small>
              <strong className={`earnings-pre-event-return--${returnTone(value)}`}>
                {formatPercent(value, '—')}
              </strong>
            </span>
          );
        })}
      </div>
      <small className={`earnings-pre-event-performance__asof${reference.low_sample ? ' earnings-pre-event-performance__asof--warning' : ''}`}>
        {historyWindowLabel(copy, window)} · {sampleText}
      </small>
    </div>
  );
}

function HistoricalReferenceDetail({ reference, window, copy, loading, error }) {
  return (
    <div className="earnings-history-detail">
      <HistoricalPreEventPerformance
        reference={reference}
        window={window}
        copy={copy}
        loading={loading}
        error={error}
        detail
      />
      {reference?.sample_size > 0 && !loading && !error && (
        <div className="earnings-history-stats">
          <div className="earnings-history-stats__row earnings-history-stats__header" aria-hidden="true">
            <span />
            <span>{copy.median}</span>
            <span>{copy.average}</span>
            <span>{copy.upRate}</span>
            <span>{copy.range}</span>
            <span>{copy.sample}</span>
          </div>
          {PRE_EVENT_DISPLAY_HORIZONS.map((horizon) => {
            const stats = reference.horizons?.[String(horizon)];
            return (
              <div className="earnings-history-stats__row" key={horizon}>
                <strong>{copy.sessionLabel(horizon)}</strong>
                <span data-label={copy.median}>{formatPercent(stats?.median_return, '—')}</span>
                <span data-label={copy.average}>{formatPercent(stats?.mean_return, '—')}</span>
                <span data-label={copy.upRate}>{formatRate(stats?.positive_rate, '—')}</span>
                <span data-label={copy.range}>{formatRange(stats, '—')}</span>
                <span data-label={copy.sample}>{stats?.sample_size || '—'}</span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
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
    fiscal_period: copy.fiscalPeriod,
    eps_estimate: copy.estimate,
    revenue_estimate: copy.revenueEstimate,
    estimate_as_of: copy.estimateAsOf,
    actual_eps: copy.actual,
    actual_revenue: copy.actualRevenue,
    eps_surprise_pct: copy.surprise,
    revenue_surprise_pct: copy.revenueSurprise,
    guidance: copy.guidance,
    reaction_day: copy.reactionDay,
    gap_return: copy.gap,
    same_day_oc: copy.sameDay,
    r_plus_1: 'R+1',
    r_plus_5: 'R+5',
    r_plus_10: 'R+10'
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

function timingValue(event, copy) {
  const timing = event.schedule?.release_timing || copy.unavailable;
  const status = event.schedule?.timing_status;
  if (status === 'verified') return `${timing} · ${copy.timingVerified}`;
  if (status === 'profile_default') return `${timing} · ${copy.timingDefault}`;
  return `${timing} · ${copy.timingUnavailable}`;
}

function SearchState({ state, copy, locale, generatedAt, onOpenEventStudy, onOpenMomentum, onSelectPhase, onResetFilter }) {
  if (!state) return null;
  if (state.type === 'no_event') {
    const item = state.item;
    return (
      <section className="earnings-lifecycle-search-state" aria-live="polite">
        <div>
          <p>{copy.noEventEyebrow}</p>
          <h2>{copy.noEventTitle(item.ticker)}</h2>
          <span>{copy.noEventBody}</span>
          <small>{copy.asOf}: {formatTimestamp(generatedAt, locale, copy.unavailable)}</small>
        </div>
        <div className="earnings-lifecycle-search-state__actions">
          {item.links?.event_study && onOpenEventStudy && <button type="button" onClick={() => onOpenEventStudy(item.ticker)}><BarChart3 size={16} />{copy.viewEventStudy}</button>}
          {item.links?.momentum && onOpenMomentum && <button type="button" onClick={() => onOpenMomentum(item.ticker)}><ExternalLink size={16} />{copy.viewTrend}</button>}
        </div>
      </section>
    );
  }
  if (state.type === 'other_phase') {
    return (
      <section className="earnings-lifecycle-search-state" aria-live="polite">
        <div><p>{copy.status}</p><h2>{copy.otherPhaseTitle(state.event.ticker)}</h2><span>{copy.otherPhaseBody}</span></div>
        <div className="earnings-lifecycle-search-state__actions"><button type="button" onClick={() => onSelectPhase(state.event.phase)}>{copy.viewCurrentPhase}</button></div>
      </section>
    );
  }
  if (state.type === 'filtered') {
    return (
      <section className="earnings-lifecycle-search-state" aria-live="polite">
        <div><p>{copy.status}</p><h2>{copy.filteredTitle(state.event.ticker)}</h2><span>{copy.filteredBody}</span></div>
        <div className="earnings-lifecycle-search-state__actions"><button type="button" onClick={onResetFilter}>{copy.resetFilter}</button></div>
      </section>
    );
  }
  return null;
}

function EventDetail({
  event,
  reference,
  referenceWindow,
  referenceLoading,
  referenceError,
  copy,
  locale,
  generatedAt,
  onClose,
  onOpenEventStudy,
  onOpenMomentum,
  onOpenStockDossier
}) {
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
            <Metric label={copy.timing} value={timingValue(event, copy)} />
            <Metric label={copy.reactionDay} value={formatDate(event.schedule?.reaction_day, locale, copy.unavailable)} />
            <Metric label={copy.fiscalPeriod} value={event.fiscal_period || copy.unavailable} />
          </div>
        </section>

        <section aria-labelledby="detail-expectations">
          <h3 id="detail-expectations">{copy.expectations}</h3>
          <div className="earnings-lifecycle-metric-grid">
            <Metric label={copy.estimate} value={formatNumber(event.expectations?.eps_estimate, copy.unavailable)} />
            <Metric label={copy.revenueEstimate} value={formatNumber(event.expectations?.revenue_estimate, copy.unavailable)} />
            <Metric label={copy.estimateAsOf} value={formatTimestamp(event.expectations?.estimate_as_of, locale, copy.unavailable)} />
          </div>
        </section>

        {event.phase === 'pre_earnings' && (
          <>
            <section aria-labelledby="detail-historical-pre-event-performance">
              <h3 id="detail-historical-pre-event-performance">{copy.historicalPreEvent}</h3>
              <HistoricalReferenceDetail
                reference={reference}
                window={referenceWindow}
                copy={copy}
                loading={referenceLoading}
                error={referenceError}
              />
            </section>
            <section aria-labelledby="detail-current-pre-event-performance">
              <h3 id="detail-current-pre-event-performance">{copy.preEventPerformance}</h3>
              <PreEventPerformance performance={event.pre_event_performance} copy={copy} locale={locale} detail />
            </section>
          </>
        )}

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

export default function EarningsLifecycleView({
  payload,
  referencePayload,
  referenceWindow = '5y',
  referenceLoading = false,
  referenceError = null,
  onReferenceWindowChange,
  locale = 'en',
  onOpenEventStudy,
  onOpenMomentum,
  onOpenStockDossier
}) {
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
  const allEvents = useMemo(() => Object.values(payload.events_detail).filter(Boolean), [payload.events_detail]);
  const noActiveEvents = payload.coverage?.no_active_events || [];
  const selectedReference = selectedEvent
    ? referencePayload?.tickers?.[selectedEvent.ticker] || null
    : null;

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

  const searchState = useMemo(() => {
    const normalizedQuery = query.trim().toUpperCase();
    if (!normalizedQuery || events.length) return null;
    const noEvent = noActiveEvents.find((item) => item.ticker === normalizedQuery);
    if (noEvent) return { type: 'no_event', item: noEvent };
    const tickerEvents = allEvents.filter((event) => event.ticker === normalizedQuery);
    const otherPhase = tickerEvents.find((event) => event.phase !== phase);
    if (otherPhase) return { type: 'other_phase', event: otherPhase };
    const filteredEvent = tickerEvents.find((event) => event.phase === phase);
    if (filteredEvent) return { type: 'filtered', event: filteredEvent };
    return null;
  }, [allEvents, events.length, noActiveEvents, phase, query]);

  const phaseNote = phase === 'pre_earnings' ? copy.preNote : phase === 'event_day' ? copy.eventNote : copy.postNote;

  const selectPhase = (nextPhase) => {
    setPhase(nextPhase);
    setFilter('all');
    setQuery('');
  };

  const selectSearchPhase = (nextPhase) => {
    setPhase(nextPhase);
    setFilter('all');
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
          <small>{copy.coveredSummary(payload.coverage.active_ticker_count, payload.coverage.no_active_event_count)}</small>
          <small>{copy.updated}: {formatTimestamp(payload.meta.generated_at, locale, copy.unavailable)}</small>
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

      {phase === 'pre_earnings' && (
        <div className="earnings-history-window">
          <span>{copy.historyWindow}</span>
          <div role="group" aria-label={copy.historyWindow}>
            {REFERENCE_WINDOWS.map((window) => (
              <button
                key={window}
                type="button"
                className={referenceWindow === window ? 'active' : ''}
                aria-pressed={referenceWindow === window}
                onClick={() => onReferenceWindowChange?.(window)}
              >
                {historyWindowLabel(copy, window)}
              </button>
            ))}
          </div>
          {referenceError && <small role="status">{copy.historyDelayed}</small>}
        </div>
      )}

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
              {phase === 'pre_earnings' && <><th>{copy.timing}</th><th>{copy.days}</th><th>{copy.historicalPreEvent}</th><th>{copy.estimate}</th><th>{copy.coverage}</th></>}
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
                  <td className="earnings-lifecycle-row__pre-performance" data-label={copy.historicalPreEvent}>
                    <HistoricalPreEventPerformance
                      reference={referencePayload?.tickers?.[event.ticker] || null}
                      window={referenceWindow}
                      copy={copy}
                      loading={referenceLoading}
                      error={referenceError}
                    />
                  </td>
                  <td data-label={copy.estimate}>{formatNumber(event.expectations?.eps_estimate, copy.unavailable)}</td>
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
        {!events.length && !searchState && <div className="earnings-lifecycle__empty">{copy.noRows}</div>}
      </div>

      {!events.length && searchState && (
        <SearchState
          state={searchState}
          copy={copy}
          locale={locale}
          generatedAt={payload.meta.generated_at}
          onOpenEventStudy={onOpenEventStudy}
          onOpenMomentum={onOpenMomentum}
          onSelectPhase={selectSearchPhase}
          onResetFilter={() => setFilter('all')}
        />
      )}

      <EventDetail
        event={selectedEvent}
        reference={selectedReference}
        referenceWindow={referenceWindow}
        referenceLoading={referenceLoading}
        referenceError={referenceError}
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
