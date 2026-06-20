import React, { useEffect, useMemo, useState, useCallback } from 'react';
import { Search, Crosshair, BarChart3, Clock, Database, Scale, ShieldAlert, Layers3, Lightbulb } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { canonicalizeTicker, getTickerLookupKeys } from '../data/tickerAliases.js';

const API_BASE = (import.meta.env.VITE_KW_TERMINAL_API_BASE || 'https://kw-terminal-api.myfootballplaces.workers.dev').replace(/\/$/, '');

function formatPercent(value, digits = 2, withSign = false) {
  if (value === undefined || value === null || value === '') return '—';
  const numeric = Number(value);
  if (Number.isNaN(numeric)) return '—';
  const prefix = withSign && numeric > 0 ? '+' : '';
  return `${prefix}${numeric.toFixed(digits)}%`;
}

function formatCount(value) {
  if (value === undefined || value === null || value === '') return '—';
  const numeric = Number(value);
  if (Number.isNaN(numeric)) return '—';
  return `${numeric}次`;
}

function formatDecimal(value, digits = 2) {
  if (value === undefined || value === null || value === '') return '—';
  const numeric = Number(value);
  if (Number.isNaN(numeric)) return '—';
  return numeric.toFixed(digits);
}

function firstDefined(...values) {
  return values.find((value) => value !== undefined && value !== null && value !== '');
}

function extractEstimate(row) {
  return firstDefined(
    row?.eps_estimate,
    row?.estimate_eps,
    row?.estimated_eps,
    row?.epsEstimate,
    row?.eps_est,
    row?.est_eps,
    row?.est
  );
}

function extractActual(row) {
  return firstDefined(
    row?.reported_eps,
    row?.actual_eps,
    row?.eps_actual,
    row?.epsActual,
    row?.act_eps,
    row?.act
  );
}

function extractSurprise(row) {
  return firstDefined(
    row?.surprise_percent,
    row?.surprise_pct,
    row?.surprisePercent,
    row?.surprisePct,
    row?.surprise
  );
}

function ratioToPercent(value) {
  if (value === undefined || value === null || value === '') return null;
  const numeric = Number(value);
  return Number.isFinite(numeric) ? numeric * 100 : null;
}

function averagePercent(rows, field) {
  const values = rows
    .map((row) => ratioToPercent(row?.[field]))
    .filter((value) => value !== null);
  if (!values.length) return null;
  return values.reduce((sum, value) => sum + value, 0) / values.length;
}

const MARKET_DATA_EXCLUSION_REASONS = new Set([
  'FUTURE_EVENT',
  'MISSING_REACTION_DAY',
  'MISSING_PREVIOUS_CLOSE',
  'MISSING_REACTION_OPEN',
  'MISSING_REACTION_CLOSE'
]);

function getAuditRowState(row) {
  const reasons = Array.isArray(row?.exclusion_reasons) ? row.exclusion_reasons : [];
  if (!reasons.length) {
    return {
      status: 'Ready',
      tone: 'ready',
      displayValue: 'Ready',
      detail: 'Reaction price data available.'
    };
  }

  const marketDataOnly = reasons.every((reason) => MARKET_DATA_EXCLUSION_REASONS.has(reason));
  if (marketDataOnly) {
    return {
      status: 'Pending data',
      tone: 'pending',
      displayValue: 'Pending data',
      detail: 'Previous close, reaction open, or reaction close is not available yet.'
    };
  }

  return {
    status: 'Excluded',
    tone: 'excluded',
    displayValue: `${reasons.length} issue${reasons.length === 1 ? '' : 's'}`,
    detail: reasons.join(', ')
  };
}

function formatAuditPercent(value, digits = 2, withSign = true) {
  if (value === undefined || value === null || value === '') {
    return <span className="audit-pending-value">Pending</span>;
  }
  return formatPercent(value, digits, withSign);
}

function isMeasuredReadyQuarter(row) {
  return row?.gap_return !== undefined &&
    row?.gap_return !== null &&
    !(Array.isArray(row?.exclusion_reasons) && row.exclusion_reasons.length > 0);
}

function latestVisibleEarningsRows(rows = []) {
  const visibleRows = [];
  const measuredRows = [];
  let measuredWindowStarted = false;
  for (const row of rows) {
    if (!isMeasuredReadyQuarter(row)) {
      if (!measuredWindowStarted) {
        visibleRows.push(row);
        continue;
      }
      break;
    }
    measuredWindowStarted = true;
    visibleRows.push(row);
    measuredRows.push(row);
  }
  return { visibleRows, measuredRows };
}

function normalizeEarningsGapSummaryPayload(payload, displayTicker = null) {
  const fullRows = Array.isArray(payload?.audit_trail?.full_history_quarter_log)
    ? payload.audit_trail.full_history_quarter_log
    : Array.isArray(payload?.quarter_log)
      ? payload.quarter_log
      : [];
  const { visibleRows: rows, measuredRows } = latestVisibleEarningsRows(fullRows);
  const measuredCount = measuredRows.length;
  const gapUpRows = measuredRows.filter((row) => Number(row.gap_return) > 0);
  const gapDownRows = measuredRows.filter((row) => Number(row.gap_return) < 0);
  const gapUpRate = measuredRows.length ? (gapUpRows.length / measuredRows.length) * 100 : null;
  const averageGapUp = averagePercent(gapUpRows, 'gap_return');
  const averageGapDown = averagePercent(gapDownRows, 'gap_return');
  const sameDayOc = averagePercent(measuredRows, 'same_day_oc');
  const sampleDates = measuredRows.map((row) => row.release_date).filter(Boolean).sort();
  const fullHistoryMeasuredCount = fullRows.filter(isMeasuredReadyQuarter).length;
  const fullHistoryExcludedCount = payload?.coverage?.full_history_excluded_count ??
    payload?.coverage?.excluded_count ??
    Math.max(fullRows.length - fullHistoryMeasuredCount, 0);
  const coverage = {
    ...(payload?.coverage || {}),
    sample_window: payload?.coverage?.sample_window || 'latest_contiguous_verified_reaction',
    quarters_analyzed: measuredCount,
    measured_gap_count: measuredCount,
    date_range: {
      start: sampleDates[0] || payload?.coverage?.date_range?.start || null,
      end: sampleDates[sampleDates.length - 1] || payload?.coverage?.date_range?.end || null
    },
    sample_excluded_count: 0,
    full_history_quarters_available: payload?.coverage?.full_history_quarters_available ?? fullRows.length,
    full_history_measured_gap_count: payload?.coverage?.full_history_measured_gap_count ?? fullHistoryMeasuredCount,
    full_history_excluded_count: fullHistoryExcludedCount,
    measured_outside_continuous_window: payload?.coverage?.measured_outside_continuous_window ??
      Math.max(fullHistoryMeasuredCount - measuredCount, 0),
    leading_pending_count: payload?.coverage?.leading_pending_count ?? Math.max(rows.length - measuredRows.length, 0)
  };
  const ticker = displayTicker || payload?.ticker;

  return {
    truth_layer_status: 'truth_layer_v1',
    ticker,
    source_ticker: payload?.ticker,
    coverage,
    earnings_summary: payload?.earnings_summary,
    forward_returns: payload?.forward_returns,
    dossier_digest: payload?.dossier_digest,
    summary: {
      truth_layer_kind: 'earnings_gap_summary',
      ticker,
      source_ticker: payload?.ticker,
      total_events: measuredCount,
      win_rate: gapUpRate,
      avg_gap_up_pct: averageGapUp,
      avg_gap_down_pct: averageGapDown,
      avg_same_day_oc_pct: sameDayOc,
      avg_drift_m5: null,
      avg_t1_abs_volatility: sameDayOc,
      avg_max_dd_5: null,
    },
    details: rows.map((row) => ({
      ...row,
      truth_layer_kind: 'earnings_gap_summary',
      event_date: row.release_date,
      sentiment: row.gap_return > 0 ? 'Gap Up' : row.gap_return < 0 ? 'Gap Down' : 'Pending',
      gap_return_pct: ratioToPercent(row.gap_return),
      same_day_oc_pct: ratioToPercent(row.same_day_oc),
      pre_1_return_pct: ratioToPercent(row.pre_1_return),
      pre_5_return_pct: ratioToPercent(row.pre_5_return),
      pre_10_return_pct: ratioToPercent(row.pre_10_return),
      r_plus_1_pct: ratioToPercent(row.r_plus_1),
      r_plus_3_pct: ratioToPercent(row.r_plus_3),
      r_plus_5_pct: ratioToPercent(row.r_plus_5),
      r_plus_10_pct: ratioToPercent(row.r_plus_10),
      r_plus_30_pct: ratioToPercent(row.r_plus_30),
      until_next_earnings_return_pct: ratioToPercent(row.until_next_earnings_return),
      win: Number(row.gap_return) > 0,
    })),
  };
}

function mergeHistoryIntoDetails(details = [], historyRows = []) {
  const historyMap = new Map(
    historyRows.map((row) => [String(row.event_date), row])
  );

  return details.map((detail) => {
    const historyRow = historyMap.get(String(detail.event_date));
    return {
      ...detail,
      eps_estimate: extractEstimate(detail) ?? extractEstimate(historyRow),
      actual_eps: extractActual(detail) ?? extractActual(historyRow),
      surprise_percent: extractSurprise(detail) ?? extractSurprise(historyRow),
    };
  });
}

function getLatestEarningsSnapshot(rows = []) {
  const enriched = rows.find((row) =>
    extractEstimate(row) !== undefined ||
    extractActual(row) !== undefined ||
    extractSurprise(row) !== undefined
  );

  if (!enriched) return null;

  return {
    eventDate: enriched.event_date,
    estimate: extractEstimate(enriched),
    actual: extractActual(enriched),
    surprise: extractSurprise(enriched),
  };
}

function getDecisionModel(summary) {
  if (!summary) return null;

  if (summary.truth_layer_kind === 'earnings_gap_summary') {
    const sample = Number(summary.total_events ?? 0);
    const gapUpRate = Number(summary.win_rate ?? 0);
    const sameDayOc = Number(summary.avg_same_day_oc_pct ?? 0);
    const avgGapUp = Number(summary.avg_gap_up_pct ?? 0);

    return {
      posture: 'truth_layer',
      title: '以 reaction_day 對齊財報反應',
      summaryText: '這一頁只讀 earnings_event_truth_v1 與 earnings_reaction_features，不再用 legacy event_date 偏移推估反應日。',
      confidence: sample >= 8 ? '中信度' : sample > 0 ? '低信度' : '待補資料',
      risk: Math.abs(avgGapUp) >= 10 ? '高波動' : Math.abs(avgGapUp) >= 3 ? '中波動' : '低樣本',
      flags: sample === 0 ? ['尚無可統計的 verified reaction rows'] : [],
      longPayoff:
        gapUpRate >= 55
          ? '已驗證季度偏向 gap-up reaction，但樣本數仍需隨 backfill 擴充後再提高信任度。'
          : '目前 verified gap-up rate 不足以單獨支持順勢結論，應搭配基本面與估值檢查。',
      shortPayoff:
        gapUpRate <= 45
          ? 'gap-down 或無效反應比例偏高，需檢查是否存在預期過高或 sell-the-news 風險。'
          : '目前沒有足夠 verified gap-down evidence 支持單獨做空判斷。',
      sizingText:
        `Reaction gap 平均上行 ${Number.isFinite(avgGapUp) ? formatPercent(avgGapUp, 2, true) : '—'}；same-day open-to-close ${Number.isFinite(sameDayOc) ? formatPercent(sameDayOc, 2, true) : '—'}，倉位應以 gap risk 而不是舊日期偏移判斷。`,
    };
  }

  const sample = Number(summary.total_events ?? 0);
  const winRate = Number(summary.win_rate ?? 0);
  const runup = Number(summary.avg_drift_m5 ?? 0);
  const volatility = Number(summary.avg_t1_abs_volatility ?? 0);
  const maxDrawdown = Number(summary.avg_max_dd_5 ?? 0);
  const drawdownAbs = Math.abs(maxDrawdown);

  let posture = 'balanced';
  let title = '雙邊等待定價錯配';
  let summaryText = '這組事件資料更適合拿來比較多空兩邊的賠率差，而不是直接預設單一方向。';

  if ((winRate >= 58 && runup <= 2.5) || (winRate >= 65 && maxDrawdown > -5)) {
    posture = 'expansion';
    title = '偏向順勢，但先比對 short 賠率';
    summaryText = '歷史 base rate 偏正向，但你應該把它視為 long baseline，再拿 crowding 與事件日波動去檢查 short 是否更有賠率。';
  } else if ((winRate <= 45 && runup >= 1.5) || (runup >= 3 && volatility >= 4)) {
    posture = 'compression';
    title = '偏向反身性回吐，但保留 squeeze 劇本';
    summaryText = '事件前擁擠度與事後波動偏高，代表 fade 劇本變強；但若市場預期過低，也要保留 squeeze 對 short 不利的情境。';
  }

  const confidence = sample >= 20 ? '高信度' : sample >= 10 ? '中信度' : '低信度';
  const risk = volatility >= 5 || drawdownAbs >= 7 ? '高風險' : volatility >= 3 || drawdownAbs >= 4 ? '中風險' : '低風險';

  const flags = [];
  if (sample < 8) flags.push('樣本偏少，結論僅供參考');
  if (runup >= 3) flags.push('事件前偷步偏高，須防追價');
  if (volatility >= 4) flags.push('事件日波動大，倉位需縮小');
  if (drawdownAbs >= 5) flags.push('歷史最大回撤偏深，停損要先定義');
  if (winRate > 45 && winRate < 55) flags.push('勝率優勢不明顯，應依賴價位與風控');

  return {
    posture,
    title,
    summaryText,
    confidence,
    risk,
    flags,
    longPayoff:
      winRate >= 58 && runup <= 2.5
        ? '歷史勝率與 run-up 結構對 long 較友善，適合等事件前後 pullback 再接。'
        : winRate >= 50
          ? 'long 仍有 base rate 支撐，但需要更好的 entry，不能用勝率硬追。'
          : 'long 缺乏明確統計優勢，若要做，必須依賴價格錯殺或預期過低的情境。',
    shortPayoff:
      runup >= 3 || volatility >= 4
        ? '偷步與波動偏高，short payoff 提升，特別要盯 sell-the-news 或反身性回吐。'
        : winRate <= 45
          ? '歷史結果對 short 較有利，但要留意事件後 squeeze 風險。'
          : 'short 沒有天然優勢，除非看到 pre-event crowding 或 options 定價過滿。',
    sizingText:
      volatility >= 5 || drawdownAbs >= 7
        ? '事件風險偏大，適合縮倉位、分批進出，避免單點重押。'
        : volatility >= 3 || drawdownAbs >= 4
          ? '可做，但倉位應低於平時，並先定義 event-day 失敗條件。'
          : '波動與回撤仍在可控區間，可以把焦點放在 entry quality 與 payoff ratio。',
  };
}

function DecisionMetricCard({ label, value, tone = 'neutral', footnote }) {
  return (
    <div className={`decision-metric-card decision-metric-card--${tone}`}>
      <span className="decision-metric-card__label">{label}</span>
      <strong className="decision-metric-card__value">{value}</strong>
      <span className="decision-metric-card__footnote">{footnote}</span>
    </div>
  );
}

function BucketCard({ title, bucket, compact = false }) {
  if (!bucket) return null;
  const { count, win_rate, avg_t10, avg_t1, avg_max_dd_5, avg_t1_abs_volatility, sample_warning } = bucket;

  return (
    <div className={`bucket-card ${sample_warning ? 'bucket-card--warning' : ''}`}>
      <div className="bucket-card__header">
        <span className="bucket-card__title">{title}</span>
        {sample_warning === 'very_low_sample' && <span className="bucket-badge bucket-badge--red">Very Low Sample</span>}
        {sample_warning === 'low_sample' && <span className="bucket-badge bucket-badge--amber">Low Sample</span>}
      </div>
      <div className="bucket-card__metrics">
        <div className="bucket-metric">
          <span>樣本數</span>
          <strong>{count ?? 0}</strong>
        </div>
        <div className="bucket-metric">
          <span>勝率</span>
          <strong>{win_rate != null ? `${win_rate}%` : '—'}</strong>
        </div>
        <div className="bucket-metric">
          <span>Legacy +10D</span>
          <strong className={avg_t10 > 0 ? 'text-success' : avg_t10 < 0 ? 'text-danger' : ''}>{avg_t10 != null ? `${avg_t10}%` : '—'}</strong>
        </div>
        {compact ? (
          <>
            <div className="bucket-metric">
              <span>Legacy +1D</span>
              <strong className={avg_t1 > 0 ? 'text-success' : avg_t1 < 0 ? 'text-danger' : ''}>{avg_t1 != null ? `${avg_t1}%` : '—'}</strong>
            </div>
            <div className="bucket-metric">
              <span>5D DD</span>
              <strong className="text-danger">{avg_max_dd_5 != null ? `${avg_max_dd_5}%` : '—'}</strong>
            </div>
          </>
        ) : (
          <div className="bucket-metric">
            <span>Legacy +1D 波動</span>
            <strong>{avg_t1_abs_volatility != null ? `${avg_t1_abs_volatility}%` : '—'}</strong>
          </div>
        )}
      </div>
    </div>
  );
}

function BestSetupHintCard({ hint }) {
  if (!hint) return null;

  const { label, title, confidence, reason, primary_bucket, sample_warning } = hint;

  let toneClass = 'neutral';
  if (label === 'clean_long_continuation') toneClass = 'positive';
  else if (label === 'crowded_fade') toneClass = 'negative';
  else if (label === 'balanced_two_sided') toneClass = 'neutral';
  else if (label === 'insufficient_signal') toneClass = 'warning';

  return (
    <div className={`glass-panel w-full event-study-workbench best-setup-hint-card best-setup-hint-card--${toneClass}`}>
      <div className="best-setup-hint-card__header">
        <div className="best-setup-hint-card__title-group">
          <Lightbulb size={18} />
          <span>{title}</span>
          <span className={`hint-confidence-badge hint-confidence-badge--${confidence}`}>{confidence}</span>
        </div>
        {sample_warning && (
          <span className="hint-sample-badge">
            {sample_warning === 'very_low_sample' ? 'Very Low Sample' : 'Low Sample'}
          </span>
        )}
      </div>
      <p className="best-setup-hint-card__reason">{reason}</p>
      <div className="best-setup-hint-card__footer">
        <span>Primary Bucket:</span>
        <code className="mono">{primary_bucket}</code>
      </div>
    </div>
  );
}

function TradeSetupMatrix({ conditionalSummary }) {
  if (!conditionalSummary) return null;
  const {
    thresholds,
    positive_surprise,
    negative_surprise,
    high_runup,
    low_runup,
    high_surprise_low_runup,
    high_runup_negative_or_weak_surprise
  } = conditionalSummary;

  return (
    <div className="glass-panel w-full event-study-workbench">
      <div className="panel-header">
        <Database size={18} className="text-accent" />
        <span>條件化交易框架 (Trade Setup Matrix)</span>
        <span className="badge panel-badge radar-panel-badge">Cross-Sectional Edge</span>
      </div>

      <div className="trade-setup-matrix">
        {thresholds && (
          <div className="trade-setup-thresholds">
            <span><strong>High Run-up</strong> &ge; {thresholds.high_runup_threshold}%</span>
            <span><strong>Weak Surprise</strong> &le; {thresholds.weak_surprise_threshold}%</span>
            <span><strong>High Surprise</strong> &ge; {thresholds.high_surprise_threshold}%</span>
          </div>
        )}

        <div>
          <h4 style={{ fontSize: '0.85rem', color: 'var(--eink-gold-deep)', textTransform: 'uppercase', marginBottom: '0.8rem', fontWeight: 700 }}>Single Factor (單一維度)</h4>
          <div className="bucket-grid">
            <BucketCard title="Positive Surprise" bucket={positive_surprise} />
            <BucketCard title="Negative Surprise" bucket={negative_surprise} />
            <BucketCard title="High Run-up" bucket={high_runup} />
            <BucketCard title="Low Run-up" bucket={low_runup} />
          </div>
        </div>

        <div>
          <h4 style={{ fontSize: '0.85rem', color: 'var(--eink-gold-deep)', textTransform: 'uppercase', marginBottom: '0.8rem', fontWeight: 700 }}>Cross Setup (多因子情境)</h4>
          <div className="bucket-grid">
            <BucketCard title="High Surprise + Low Run-up" bucket={high_surprise_low_runup} compact />
            <BucketCard title="High Run-up + Weak/Negative Surprise" bucket={high_runup_negative_or_weak_surprise} compact />
          </div>
        </div>
      </div>
    </div>
  );
}

function MobileAuditCard({ row, index }) {
  if (row.truth_layer_kind === 'earnings_gap_summary') {
    const auditState = getAuditRowState(row);
    return (
      <article className="event-audit-card" key={`${row.release_date}-${index}`}>
        <div className="event-audit-card__header">
          <div>
            <span className="event-audit-card__eyebrow">Release / Reaction</span>
            <strong className="mono text-accent">{row.release_date} → {row.reaction_day || 'Pending'}</strong>
          </div>
          <span className={`audit-status-pill audit-status-pill--${auditState.tone}`}>
            {auditState.status}
          </span>
        </div>

        <div className="event-audit-card__grid">
          <div className="event-audit-card__metric">
            <span>Pre-5</span>
            <strong className={row.pre_5_return_pct > 0 ? 'text-success' : row.pre_5_return_pct < 0 ? 'text-danger' : ''}>
              {formatAuditPercent(row.pre_5_return_pct)}
            </strong>
          </div>
          <div className="event-audit-card__metric">
            <span>Pre-1</span>
            <strong className={row.pre_1_return_pct > 0 ? 'text-success' : row.pre_1_return_pct < 0 ? 'text-danger' : ''}>
              {formatAuditPercent(row.pre_1_return_pct)}
            </strong>
          </div>
          <div className="event-audit-card__metric">
            <span>Gap</span>
            <strong className={row.gap_return_pct > 0 ? 'text-success' : row.gap_return_pct < 0 ? 'text-danger' : ''}>
              {formatAuditPercent(row.gap_return_pct)}
            </strong>
          </div>
          <div className="event-audit-card__metric">
            <span>Same-day O/C</span>
            <strong className={row.same_day_oc_pct > 0 ? 'text-success' : row.same_day_oc_pct < 0 ? 'text-danger' : ''}>
              {formatAuditPercent(row.same_day_oc_pct)}
            </strong>
          </div>
          <div className="event-audit-card__metric">
            <span>R+1</span>
            <strong>{formatAuditPercent(row.r_plus_1_pct)}</strong>
          </div>
          <div className="event-audit-card__metric">
            <span>R+5</span>
            <strong>{formatAuditPercent(row.r_plus_5_pct)}</strong>
          </div>
          <div className="event-audit-card__metric">
            <span>R+10</span>
            <strong>{formatAuditPercent(row.r_plus_10_pct)}</strong>
          </div>
        </div>

        <div className="event-audit-card__footer">
          <span>Status</span>
          <strong>{auditState.detail}</strong>
        </div>
      </article>
    );
  }

  return (
    <article className="event-audit-card" key={`${row.event_date}-${index}`}>
      <div className="event-audit-card__header">
        <div>
          <span className="event-audit-card__eyebrow">Event Date</span>
          <strong className="mono text-accent">{row.event_date}</strong>
        </div>
        <span className={`badge ${row.sentiment.toLowerCase() === 'beat' ? 'active' : row.sentiment.toLowerCase() === 'miss' ? 'inactive' : 'pending'}`}>
          {row.sentiment}
        </span>
      </div>

      <div className="event-audit-card__grid">
        <div className="event-audit-card__metric">
          <span>Pre-10</span>
          <strong className={row.drift_m10 > 0 ? 'text-success' : 'text-danger'}>{row.drift_m10}</strong>
        </div>
        <div className="event-audit-card__metric">
          <span>Pre-5</span>
          <strong className={row.drift_m5 > 0 ? 'text-success' : 'text-danger'}>{row.drift_m5}</strong>
        </div>
        <div className="event-audit-card__metric">
          <span>EST</span>
          <strong>{formatDecimal(row.eps_estimate)}</strong>
        </div>
        <div className="event-audit-card__metric">
          <span>ACT</span>
          <strong>{formatDecimal(row.actual_eps)}</strong>
        </div>
        <div className="event-audit-card__metric">
          <span>Surprise</span>
          <strong className={Number(row.surprise_percent) >= 0 ? 'text-success' : 'text-danger'}>
            {formatPercent(row.surprise_percent, 2, true)}
          </strong>
        </div>
        <div className="event-audit-card__metric">
          <span>Legacy +1D</span>
          <strong className={row.t1_return > 0 ? 'text-success' : 'text-danger'}>{row.t1_return}</strong>
        </div>
        <div className="event-audit-card__metric">
          <span>Max DD 5D</span>
          <strong className="text-danger">{row.max_dd_5}</strong>
        </div>
        <div className="event-audit-card__metric">
          <span>Legacy +10D</span>
          <strong className={row.t10_return > 0 ? 'text-success' : 'text-danger'}>{row.t10_return}</strong>
        </div>
      </div>

      <div className="event-audit-card__footer">
        <span>Result</span>
        {row.win ? <strong className="text-success">W</strong> : <strong className="text-danger">L</strong>}
      </div>
    </article>
  );
}

export default function EventStudyPanel({ payload, eventStudySeed, onOpenStockDossier }) {
  const [symbol, setSymbol] = useState('');
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const [historyRows, setHistoryRows] = useState([]);
  const [expandedRows, setExpandedRows] = useState(new Set());

  const toggleRow = (index) => {
    setExpandedRows(prev => {
      const next = new Set(prev);
      if (next.has(index)) next.delete(index);
      else next.add(index);
      return next;
    });
  };

  const [isMobile, setIsMobile] = useState(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(max-width: 767px)').matches;
  });

  const fetchEventStudy = useCallback(async (symbolOverride, options = {}) => {
    const nextSymbol = canonicalizeTicker(symbolOverride ?? symbol);
    if (!nextSymbol) return;
    if (!options.silent) {
      setSymbol(nextSymbol.toUpperCase());
    }
    setLoading(true);
    setError(null);
    if (!options.keepPrevious) {
      setData(null);
    }

    try {
      let lastError = null;
      for (const lookupSymbol of getTickerLookupKeys(nextSymbol)) {
        const endpoint = `${API_BASE}/event-study/earnings-gap-summary?symbol=${encodeURIComponent(lookupSymbol)}`;
        const res = await fetch(endpoint);
        const json = await res.json();

        if (res.ok) {
          setData(normalizeEarningsGapSummaryPayload(json, nextSymbol.toUpperCase()));
          setHistoryRows([]);
          setExpandedRows(new Set());
          return;
        }
        lastError = json?.error || json?.dossier_digest?.reason || `Error ${res.status}`;
      }
      throw new Error(lastError || 'Event study summary unavailable');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [symbol]);

  const handleSubmit = useCallback((e) => {
    e?.preventDefault();
    fetchEventStudy(symbol);
  }, [fetchEventStudy, symbol]);

  useEffect(() => {
    const seededTicker = String(eventStudySeed?.ticker || '').trim().toUpperCase();
    if (!seededTicker) return;
    setSymbol(seededTicker);
    fetchEventStudy(seededTicker, { keepPrevious: false });
  }, [eventStudySeed?.openedAt]);

  useEffect(() => {
    if (typeof window === 'undefined') return undefined;
    const media = window.matchMedia('(max-width: 767px)');
    const update = () => setIsMobile(media.matches);
    update();
    media.addEventListener('change', update);
    return () => media.removeEventListener('change', update);
  }, []);

  const decisionModel = useMemo(() => getDecisionModel(data?.summary), [data]);
  const mergedDetails = useMemo(() => mergeHistoryIntoDetails(data?.details ?? [], historyRows), [data?.details, historyRows]);
  const latestEarningsSnapshot = useMemo(() => getLatestEarningsSnapshot(historyRows), [historyRows]);
  const isTruthLayerData = data?.truth_layer_status === 'truth_layer_v1';
  const measuredReactionCount = data?.coverage?.measured_gap_count ?? data?.summary?.total_events ?? 0;
  const truthSampleStart = data?.coverage?.date_range?.start;
  const truthSampleEnd = data?.coverage?.date_range?.end;
  const truthReadyWindowLabel = truthSampleStart && truthSampleEnd ? `${truthSampleStart} → ${truthSampleEnd}` : 'n/a';
  const fullHistoryPendingCount = data?.coverage?.full_history_excluded_count ?? data?.coverage?.excluded_count ?? 0;

  const resolveDossierDetail = useCallback((ticker) => {
    const normalizedTicker = String(ticker || '').trim().toUpperCase();
    if (!normalizedTicker) return null;
    const details = Object.values(payload?.events_detail || {});
    return details.find((detail) => detail.ticker === normalizedTicker && detail.event_phase === 'post_earnings') ||
           details.find((detail) => detail.ticker === normalizedTicker) ||
           {
             event_id: `${normalizedTicker}-EventStudy`,
             ticker: normalizedTicker,
             event_category: 'Earnings',
             event_phase: 'event_study_lookup',
             status: 'event_study_lookup'
           };
  }, [payload]);

  const handleOpenCurrentDossier = useCallback(() => {
    if (!onOpenStockDossier) return;
    const ticker = String(data?.ticker || data?.summary?.ticker || symbol || '').trim().toUpperCase();
    if (!ticker) return;
    onOpenStockDossier(ticker, resolveDossierDetail(ticker));
  }, [data, onOpenStockDossier, resolveDossierDetail, symbol]);

  return (
    <div className="dashboard-grid fade-in flex flex-col gap-4 event-study-shell">
      <div className="glass-panel w-full event-study-workbench">
        <div className="panel-header">
          <Crosshair size={18} className="text-accent" />
          <span>財報反應研究矩陣 (Reaction Study Matrix)</span>
          <span className="badge panel-badge radar-panel-badge">Timing Truth Layer</span>
        </div>

        <div>
          <form onSubmit={handleSubmit} className="event-study-toolbar">
            <div style={{ flex: 1 }}>
              <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>股票代號 (Ticker)</label>
              <input
                className="event-study-input"
                type="text"
                value={symbol}
                onChange={(e) => setSymbol(e.target.value)}
                placeholder="e.g. NVDA, SPY"
              />
            </div>
            <div style={{ flex: 1 }}>
              <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>事件分類 (Category)</label>
              <div
                className="event-study-input"
                aria-label="Event study category"
                style={{ display: 'flex', alignItems: 'center' }}
              >
                財報 (Earnings)
              </div>
            </div>
            <button
              type="submit"
              disabled={loading || !symbol}
              className="event-study-submit"
            >
              {loading ? <Clock size={16} /> : <Search size={16} />}
              {loading ? '回測中...' : '執行回測'}
            </button>
          </form>

          <div className="decision-pillar-grid">
            <div className="decision-pillar-card">
              <span className="decision-pillar-card__eyebrow">1. Edge</span>
              <strong>先看 verified reaction 樣本</strong>
              <p>只使用 truth-layer reaction_day 對齊後的 gap 與 forward return。</p>
            </div>
            <div className="decision-pillar-card">
              <span className="decision-pillar-card__eyebrow">2. Crowding</span>
              <strong>再看事件前偷步有沒有過熱</strong>
              <p>Pre-5 run-up 越高，越要懷疑好消息是否早已被 price in。</p>
            </div>
            <div className="decision-pillar-card">
              <span className="decision-pillar-card__eyebrow">3. Risk</span>
              <strong>最後才看可承受的波動與回撤</strong>
              <p>Gap return 與 same-day open-to-close 決定倉位大小，不只是方向判斷。</p>
            </div>
          </div>

          {error && (
            <div className="event-study-error-alert">
              <p>{error}</p>
            </div>
          )}
        </div>
      </div>

      <AnimatePresence>
        {data && data.summary && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="event-study-results"
          >
            {onOpenStockDossier && (
              <div className="event-study-dossier-link">
                <div>
                  <span>Linked research object</span>
                  <strong>{String(data?.ticker || data?.summary?.ticker || symbol || '').toUpperCase()} Stock Dossier</strong>
                </div>
                <button type="button" onClick={handleOpenCurrentDossier}>
                  Open Stock Dossier
                </button>
              </div>
            )}

            <div className="event-study-decision-grid">
              <BestSetupHintCard hint={data?.best_setup_hint} />

              <div className="decision-trading-grid">
                <div className="decision-trading-card decision-trading-card--long">
                  <span className="decision-trading-card__eyebrow">Long Payoff</span>
                  <strong>{formatPercent(data.summary.win_rate, 0)} base rate</strong>
                  <p>{decisionModel?.longPayoff}</p>
                  <DecisionMetricCard
                    label={isTruthLayerData ? 'Gap-up rate' : 'Legacy +10D win rate'}
                    value={formatPercent(data.summary.win_rate, 0)}
                    tone={data.summary.win_rate >= 50 ? 'positive' : 'negative'}
                    footnote={isTruthLayerData ? '基於 verified reaction_day' : 'legacy endpoint, not truth layer'}
                  />
                </div>

                <div className="decision-trading-card decision-trading-card--short">
                  <span className="decision-trading-card__eyebrow">Short Payoff</span>
                  <strong>{formatPercent(isTruthLayerData ? data.summary.avg_gap_down_pct : data.summary.avg_drift_m5, 2, true)} {isTruthLayerData ? 'avg gap down' : 'pre-event run-up'}</strong>
                  <p>{decisionModel?.shortPayoff}</p>
                  <DecisionMetricCard
                    label={isTruthLayerData ? 'Avg Gap Down' : 'Pre -5D run-up'}
                    value={formatPercent(isTruthLayerData ? data.summary.avg_gap_down_pct : data.summary.avg_drift_m5, 2, true)}
                    tone={isTruthLayerData ? 'negative' : data.summary.avg_drift_m5 > 0 ? 'warning' : 'positive'}
                    footnote={isTruthLayerData ? 'null means no measured gap-down rows' : '越高越要檢查是否 price in'}
                  />
                </div>

                <div className="decision-trading-card decision-trading-card--risk">
                  <span className="decision-trading-card__eyebrow">Position Sizing</span>
                  <strong>
                    {isTruthLayerData
                      ? `${formatPercent(data.summary.avg_gap_up_pct, 2, true)} / ${formatPercent(data.summary.avg_same_day_oc_pct, 2, true)}`
                      : `${formatPercent(data.summary.avg_t1_abs_volatility)} / ${formatPercent(data.summary.avg_max_dd_5, 2, true)}`}
                  </strong>
                  <p>{decisionModel?.sizingText}</p>
                  <div className="decision-mini-metrics">
                    <DecisionMetricCard
                      label={isTruthLayerData ? 'Same-day O/C' : 'Legacy +1D volatility'}
                      value={formatPercent(data.summary.avg_t1_abs_volatility)}
                      tone="warning"
                      footnote={isTruthLayerData ? 'reaction open to close' : 'legacy endpoint, not truth layer'}
                    />
                    <DecisionMetricCard
                      label="5D 最大回撤"
                      value={formatPercent(data.summary.avg_max_dd_5, 2, true)}
                      tone="negative"
                      footnote="用來定義 stop 與 risk budget"
                    />
                    <DecisionMetricCard
                      label="有效事件樣本"
                      value={formatCount(data.summary.total_events)}
                      tone="neutral"
                      footnote="少於 8 次時要降低信任度"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="glass-panel w-full event-study-workbench event-study-evidence">
              <div className="panel-header">
                <BarChart3 size={18} className="text-accent" />
                <span>Historical Evidence</span>
                <span className="badge panel-badge radar-panel-badge">Why This Matters</span>
              </div>

              <div className="event-study-evidence-grid">
                <div className="event-study-evidence-card">
                  <span className="event-study-evidence-card__eyebrow">Base Rate</span>
                  <strong>{formatPercent(data.summary.win_rate, 0)}</strong>
                  <p>{isTruthLayerData ? '先回答 verified reaction 是否穩定 gap up。沒有樣本，就不要急著討論方向。' : '先回答「這事件 historically 有沒有 edge」。沒有 edge，就不要急著討論方向。'}</p>
                </div>
                <div className="event-study-evidence-card">
                  <span className="event-study-evidence-card__eyebrow">{isTruthLayerData ? 'Average Gap Up' : 'Crowding'}</span>
                  <strong>{formatPercent(isTruthLayerData ? data.summary.avg_gap_up_pct : data.summary.avg_drift_m5, 2, true)}</strong>
                  <p>{isTruthLayerData ? 'Gap return 只用 reaction_open / previous_close - 1，不使用 release_date 猜測。' : '偷步越大，越要分辨是健康提前佈局，還是過熱後等著 sell-the-news。'}</p>
                </div>
                <div className="event-study-evidence-card">
                  <span className="event-study-evidence-card__eyebrow">Risk Budget</span>
                  <strong>{formatPercent(data.summary.avg_t1_abs_volatility)}</strong>
                  <p>{isTruthLayerData ? 'Same-day open-to-close 顯示 reaction day 內部波動，應與 gap risk 分開看。' : '高波動代表不能拿大倉位硬賭方向，應先決定你能承受的 gap risk。'}</p>
                </div>
                <div className="event-study-evidence-card event-study-evidence-card--earnings">
                  <span className="event-study-evidence-card__eyebrow">{isTruthLayerData ? 'Truth Coverage' : 'Latest Earnings Snapshot'}</span>
                  <strong>{isTruthLayerData ? `${measuredReactionCount} measured` : latestEarningsSnapshot?.eventDate ?? 'n/a'}</strong>
                  {isTruthLayerData ? (
                    <>
                      <div className="earnings-snapshot-grid">
                        <div className="earnings-snapshot-metric">
                          <span>Ready window</span>
                          <strong>{truthReadyWindowLabel}</strong>
                        </div>
                        <div className="earnings-snapshot-metric">
                          <span>Full pending</span>
                          <strong>{fullHistoryPendingCount}</strong>
                        </div>
                        <div className="earnings-snapshot-metric">
                          <span>Source</span>
                          <strong>v1</strong>
                        </div>
                      </div>
                      <p>Stats and visible rows use the latest continuous Ready window only; full-history fallback rows stay outside this sample.</p>
                    </>
                  ) : (
                    <>
                      <div className="earnings-snapshot-grid">
                        <div className="earnings-snapshot-metric">
                          <span>EST</span>
                          <strong>{formatDecimal(latestEarningsSnapshot?.estimate)}</strong>
                        </div>
                        <div className="earnings-snapshot-metric">
                          <span>ACT</span>
                          <strong>{formatDecimal(latestEarningsSnapshot?.actual)}</strong>
                        </div>
                        <div className="earnings-snapshot-metric">
                          <span>Surprise</span>
                          <strong>{formatPercent(latestEarningsSnapshot?.surprise, 2, true)}</strong>
                        </div>
                      </div>
                      <p>目前前端已支援顯示 EST / ACT / Surprise；若 backend payload 尚未提供，這裡會先顯示 `n/a`。</p>
                    </>
                  )}
                </div>
              </div>
            </div>


            <TradeSetupMatrix conditionalSummary={data?.conditional_summary} />

            <div className="glass-panel w-full event-study-workbench">
              <div className="panel-header">
                <BarChart3 size={18} className="text-accent" />
                <span>{isTruthLayerData ? 'Earnings Reaction Truth Audit' : 'Legacy Historical Matrix'}</span>
                <span className="badge panel-badge radar-panel-badge">{isTruthLayerData ? 'Truth Layer v1' : 'Legacy Audit Trail'}</span>
              </div>
              {isMobile ? (
                <div className="event-audit-card-list">
                  {mergedDetails.map((row, i) => <MobileAuditCard row={row} index={i} key={i} />)}
                </div>
              ) : (
                <div style={{ overflowX: 'auto' }}>
                  {isTruthLayerData ? (
                    <table className="data-table">
                      <thead>
                        <tr>
                          <th>Release Date</th>
                          <th>Reaction Day</th>
                          <th style={{ textAlign: 'right' }}>Pre-5 (%)</th>
                          <th style={{ textAlign: 'right' }}>Pre-1 (%)</th>
                          <th style={{ textAlign: 'right' }}>Gap (%)</th>
                          <th style={{ textAlign: 'right' }}>Same-day O/C (%)</th>
                          <th style={{ textAlign: 'right' }}>R+1 (%)</th>
                          <th style={{ textAlign: 'right' }}>R+5 (%)</th>
                          <th style={{ textAlign: 'right' }}>R+10 (%)</th>
                          <th>Status</th>
                          <th></th>
                        </tr>
                      </thead>
                      <tbody>
                        {mergedDetails.map((row, i) => {
                          const isExpanded = expandedRows.has(i);
                          const auditState = getAuditRowState(row);
                          return (
                            <React.Fragment key={i}>
                              <tr onClick={() => toggleRow(i)} style={{ cursor: 'pointer' }}>
                                <td className="mono text-accent">{row.release_date}</td>
                                <td className="mono">{row.reaction_day || '—'}</td>
                                <td style={{ textAlign: 'right' }} className={row.pre_5_return_pct > 0 ? 'text-success' : row.pre_5_return_pct < 0 ? 'text-danger' : ''}>{formatAuditPercent(row.pre_5_return_pct)}</td>
                                <td style={{ textAlign: 'right' }} className={row.pre_1_return_pct > 0 ? 'text-success' : row.pre_1_return_pct < 0 ? 'text-danger' : ''}>{formatAuditPercent(row.pre_1_return_pct)}</td>
                                <td style={{ textAlign: 'right', fontWeight: 'bold' }} className={row.gap_return_pct > 0 ? 'text-success' : row.gap_return_pct < 0 ? 'text-danger' : ''}>{formatAuditPercent(row.gap_return_pct)}</td>
                                <td style={{ textAlign: 'right' }} className={row.same_day_oc_pct > 0 ? 'text-success' : row.same_day_oc_pct < 0 ? 'text-danger' : ''}>{formatAuditPercent(row.same_day_oc_pct)}</td>
                                <td style={{ textAlign: 'right' }}>{formatAuditPercent(row.r_plus_1_pct)}</td>
                                <td style={{ textAlign: 'right' }}>{formatAuditPercent(row.r_plus_5_pct)}</td>
                                <td style={{ textAlign: 'right' }}>{formatAuditPercent(row.r_plus_10_pct)}</td>
                                <td className="audit-status-cell">
                                  <span className={`audit-status-pill audit-status-pill--${auditState.tone}`} title={auditState.detail}>
                                    {auditState.displayValue}
                                  </span>
                                </td>
                                <td style={{ textAlign: 'center', color: 'var(--text-muted)' }}>{isExpanded ? '▼' : '▶'}</td>
                              </tr>
                              {isExpanded && (
                                <tr className="detail-row">
                                  <td colSpan="11" style={{ padding: '16px', background: 'var(--bg-layer-2)', borderBottom: '1px solid var(--border-color)' }}>
                                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
                                      <div>
                                        <h4 style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '8px', textTransform: 'uppercase' }}>Pre-Earnings Run-up</h4>
                                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', rowGap: '8px' }}>
                                          <span>Pre-10:</span><strong style={{ textAlign: 'right' }}>{formatAuditPercent(row.pre_10_return_pct)}</strong>
                                          <span>Pre-5:</span><strong style={{ textAlign: 'right' }}>{formatAuditPercent(row.pre_5_return_pct)}</strong>
                                          <span>Pre-1:</span><strong style={{ textAlign: 'right' }}>{formatAuditPercent(row.pre_1_return_pct)}</strong>
                                        </div>
                                      </div>
                                      <div>
                                        <h4 style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '8px', textTransform: 'uppercase' }}>Reaction Day</h4>
                                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', rowGap: '8px' }}>
                                          <span>Gap:</span><strong style={{ textAlign: 'right' }}>{formatAuditPercent(row.gap_return_pct)}</strong>
                                          <span>Same-day O/C:</span><strong style={{ textAlign: 'right' }}>{formatAuditPercent(row.same_day_oc_pct)}</strong>
                                          <span>Status:</span><strong style={{ textAlign: 'right' }}>{auditState.status}</strong>
                                        </div>
                                      </div>
                                      <div>
                                        <h4 style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '8px', textTransform: 'uppercase' }}>Post-Reaction Drift</h4>
                                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', rowGap: '8px' }}>
                                          <span>R+1:</span><strong style={{ textAlign: 'right' }}>{formatAuditPercent(row.r_plus_1_pct)}</strong>
                                          <span>R+3:</span><strong style={{ textAlign: 'right' }}>{formatAuditPercent(row.r_plus_3_pct)}</strong>
                                          <span>R+5:</span><strong style={{ textAlign: 'right' }}>{formatAuditPercent(row.r_plus_5_pct)}</strong>
                                          <span>R+10:</span><strong style={{ textAlign: 'right' }}>{formatAuditPercent(row.r_plus_10_pct)}</strong>
                                          <span>R+30:</span><strong style={{ textAlign: 'right' }}>{formatAuditPercent(row.r_plus_30_pct)}</strong>
                                        </div>
                                      </div>
                                    </div>
                                  </td>
                                </tr>
                              )}
                            </React.Fragment>
                          );
                        })}
                      </tbody>
                    </table>
                  ) : (
                    <table className="data-table">
                      <thead>
                        <tr>
                          <th>Event Date</th>
                          <th>Sentiment</th>
                          <th style={{ textAlign: 'right' }}>Pre -10D (%)</th>
                          <th style={{ textAlign: 'right' }}>Pre -5D (%)</th>
                          <th style={{ textAlign: 'right' }}>EST</th>
                          <th style={{ textAlign: 'right' }}>ACT</th>
                          <th style={{ textAlign: 'right' }}>Surprise (%)</th>
                          <th style={{ textAlign: 'right' }}>Legacy +1D (%)</th>
                          <th style={{ textAlign: 'right' }}>Max DD 5D (%)</th>
                          <th style={{ textAlign: 'right' }}>Legacy +10D (%)</th>
                          <th style={{ textAlign: 'center' }}>Result</th>
                        </tr>
                      </thead>
                      <tbody>
                        {mergedDetails.map((row, i) => (
                          <tr key={i}>
                            <td className="mono text-accent">{row.event_date}</td>
                            <td>
                              <span className={`badge ${row.sentiment.toLowerCase() === 'beat' ? 'active' : row.sentiment.toLowerCase() === 'miss' ? 'inactive' : 'pending'}`}>
                                {row.sentiment}
                              </span>
                            </td>
                            <td style={{ textAlign: 'right' }} className={row.drift_m10 > 0 ? 'text-success' : 'text-danger'}>{row.drift_m10}</td>
                            <td style={{ textAlign: 'right' }} className={row.drift_m5 > 0 ? 'text-success' : 'text-danger'}>{row.drift_m5}</td>
                            <td style={{ textAlign: 'right' }}>{formatDecimal(row.eps_estimate)}</td>
                            <td style={{ textAlign: 'right' }}>{formatDecimal(row.actual_eps)}</td>
                            <td style={{ textAlign: 'right' }} className={Number(row.surprise_percent) >= 0 ? 'text-success' : 'text-danger'}>{formatPercent(row.surprise_percent, 2, true)}</td>
                            <td style={{ textAlign: 'right', fontWeight: 'bold' }} className={row.t1_return > 0 ? 'text-success' : 'text-danger'}>{row.t1_return}</td>
                            <td style={{ textAlign: 'right' }} className="text-danger">{row.max_dd_5}</td>
                            <td style={{ textAlign: 'right', fontWeight: 'bold' }} className={row.t10_return > 0 ? 'text-success' : 'text-danger'}>{row.t10_return}</td>
                            <td style={{ textAlign: 'center' }}>
                              {row.win ? <span className="text-success font-bold">W</span> : <span className="text-danger font-bold">L</span>}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
