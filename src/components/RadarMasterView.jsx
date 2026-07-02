import React, { useState } from 'react';
import { buildMomentumUniverseSyntheticDetail } from './dossierHelpers';
import CatalystRadarTable from './CatalystRadarTable';
import { displayLabel } from './displayLabelHelpers.js';

const RADAR_COPY = {
  en: {
    loadingUnavailable: 'Completed earnings refresh status unavailable',
    refreshCaughtUp: 'Completed earnings refresh: all caught up',
    completedRefresh: 'Completed earnings refresh',
    pending: 'Waiting',
    reactionClosePending: 'Waiting for reaction close',
    vendorPending: 'Waiting for EPS/surprise data',
    pricePending: 'Waiting for price data',
    more: 'more',
    radarTitle: 'Catalyst Radar',
    preEarnings: 'Pre-Earnings',
    eventDay: 'Event Day',
    postEarnings: 'Post-Earnings',
    momentum: 'Momentum',
    tracked: 'Tracked',
    betweenCatalysts: 'Between Catalysts',
    allScannerRanking: 'All Scanner Ranking',
    momentumWatch: 'Momentum Watch',
    allScannerBody: (shown, total) => `Current radar ranking (${shown}/${total} rows), grouped by industry/theme and ranked by momentum score, 200D setup, Z-score, and relative strength. Includes off-cycle thesis rows.`,
    momentumWatchBody: (shown) => `Filtered momentum watch list (${shown} rows). Momentum ranking highlights unusual price/relative-strength conditions for investigation.`,
    allThemes: 'All Themes',
    continuation: 'Continuation',
    reversal: 'Reversal',
    peadWatch: 'PEAD Watch',
    pullbacks: 'Pullbacks',
    topOpportunities: 'Top Opportunities',
    riskAlerts: 'Risk Alerts',
    searchPlaceholder: 'Search ticker across all catalyst events',
    clear: 'Clear',
    ticker: 'Ticker',
    result: 'Result',
    reaction: 'Reaction',
    current: 'Current',
    baseRate: 'Base Rate',
    quality: 'Quality',
    thesisState: 'Thesis State',
    reason: 'Reason',
    review: 'Review',
    lastSeen: 'Last Seen',
    industryTheme: 'Industry / Theme',
    regime: 'Regime',
    scannerScore: 'Scanner Score',
    setup200d: '200D Setup',
    relativeStrength: 'Relative Strength',
    cautions: 'Cautions',
    phase: 'Phase',
    bias: 'Bias',
    riskFlags: 'Risk Flags',
    score: 'Score',
    noBetween: 'No between-catalyst thesis watches.',
    noBetweenBody: 'This means no reviewed thesis notes are currently retained outside the active earnings window.',
    noMomentum: 'No momentum evidence rows.',
    noMomentumBody: 'The backend has not published a momentum watch list yet.',
    noTracked: 'No tracked catalyst setups.',
    noPullbacks: 'No trend pullback setups.',
    noData: 'No data available for this view.',
    datePending: 'Date unavailable',
    notIncluded: 'Not Included',
    unavailable: 'Unavailable',
    post: 'Post',
    scannerScoreSmall: 'Scanner score',
    marketDataOnly: 'Market data only',
    bandDays: 'Band days',
    newsNotChecked: 'News not checked',
    coveragePending: 'Needs more context',
    reviewed: 'Reviewed',
    reviewPending: 'Needs review',
    contextPending: 'Needs more context',
    unknown: 'Unknown',
    pendingRefresh: 'Waiting for data refresh.',
    waitingReactionClose: 'Waiting for reaction close.',
    waitingVendorData: 'Waiting for EPS/surprise vendor data.',
    waitingPriceBackfill: 'Waiting for price backfill.',
    pendingRefreshTitle: (ticker) => `${ticker} is waiting for completed-earnings refresh.`,
    eventDate: 'Event Date',
    foundElsewhere: (ticker) => `Found ${ticker} in Catalyst Radar, but not in this view.`,
    trySwitch: (view) => `Try switching to ${view}.`,
    switchTo: (view) => `Switch to ${view}`,
    trackedElsewhere: (ticker) => `${ticker} is tracked, but not active in the current catalyst view.`,
    openTracked: 'View Tracked to review saved notes.',
    switchToTracked: 'Switch to Tracked',
    noSearchMatch: (query) => `No active catalyst event found for "${query}".`,
    noSearchMatchBody: 'It may be outside the current earnings reaction window, between catalyst cycles, or not in the current scanner universe.'
  },
  zh: {
    loadingUnavailable: '已完成財報刷新狀態暫時無法取得',
    refreshCaughtUp: '已完成財報刷新：全部已更新',
    completedRefresh: '已完成財報刷新',
    pending: '等待中',
    reactionClosePending: '等待反應日收市',
    vendorPending: '等待 EPS / 驚喜數據',
    pricePending: '等待價格資料',
    more: '更多',
    radarTitle: '財報雷達',
    preEarnings: '財報前',
    eventDay: '公布日',
    postEarnings: '財報後',
    momentum: '動能',
    tracked: '已追蹤',
    betweenCatalysts: '催化空窗',
    allScannerRanking: '全部動能排名',
    momentumWatch: '動能觀察',
    allScannerBody: (shown, total) => `目前顯示 ${shown}/${total} 條排名，按主題分組，綜合動能分數、200D 結構、Z-score 與相對強度排序，包含催化空窗名單。`,
    momentumWatchBody: (shown) => `目前顯示 ${shown} 條動能觀察名單，用來找出價格或相對強度異常的研究對象。`,
    allThemes: '全部主題',
    continuation: '延續',
    reversal: '反轉',
    peadWatch: '財報後漂移',
    pullbacks: '回調觀察',
    topOpportunities: '主要機會',
    riskAlerts: '風險警示',
    searchPlaceholder: '搜尋所有催化事件股票代號',
    clear: '清除',
    ticker: '股票',
    result: '結果',
    reaction: '反應',
    current: '目前',
    baseRate: '基準機率',
    quality: '質素',
    thesisState: '論點狀態',
    reason: '原因',
    review: '覆核',
    lastSeen: '最後出現',
    industryTheme: '行業 / 主題',
    regime: '狀態',
    scannerScore: '掃描分數',
    setup200d: '200D 結構',
    relativeStrength: '相對強度',
    cautions: '注意事項',
    phase: '階段',
    bias: '方向',
    riskFlags: '風險標籤',
    score: '分數',
    noBetween: '暫無催化空窗論點觀察。',
    noBetweenBody: '代表目前沒有已覆核論點留在活躍財報窗口之外。',
    noMomentum: '暫無動能證據列。',
    noMomentumBody: '後端尚未發布動能觀察名單。',
    noTracked: '暫無已追蹤催化設定。',
    noPullbacks: '暫無回調觀察設定。',
    noData: '此檢視暫無資料。',
    datePending: '暫無日期',
    notIncluded: '未納入',
    unavailable: '不可用',
    post: '財報後',
    scannerScoreSmall: '掃描分數',
    marketDataOnly: '只有市場數據',
    bandDays: '上軌天數',
    newsNotChecked: '新聞未核對',
    coveragePending: '需要更多脈絡',
    reviewed: '已覆核',
    reviewPending: '需要覆核',
    contextPending: '需要更多背景',
    unknown: '未知',
    pendingRefresh: '等待資料刷新。',
    waitingReactionClose: '等待反應日收市。',
    waitingVendorData: '等待 EPS / 驚喜數據。',
    waitingPriceBackfill: '等待價格回補。',
    pendingRefreshTitle: (ticker) => `${ticker} 正等待完成財報刷新。`,
    eventDate: '事件日期',
    foundElsewhere: (ticker) => `已在財報雷達找到 ${ticker}，但不在目前檢視。`,
    trySwitch: (view) => `可切換到 ${view}。`,
    switchTo: (view) => `切換到 ${view}`,
    trackedElsewhere: (ticker) => `${ticker} 已追蹤，但不在目前催化檢視。`,
    openTracked: '查看已追蹤名單記錄。',
    switchToTracked: '切換到已追蹤',
    noSearchMatch: (query) => `找不到 "${query}" 的活躍催化事件。`,
    noSearchMatchBody: '可能不在目前財報反應窗口、處於催化空窗，或未納入目前掃描範圍。'
  }
};

const CompletedEarningsRefreshStatus = ({ refresh, copy }) => {
  if (!refresh) return null;

  if (refresh.status === 'unavailable') {
    return (
      <div className="completed-refresh-status completed-refresh-status--unavailable">
        {copy.loadingUnavailable}
      </div>
    );
  }

  const pendingCount = refresh.pending_count || 0;
  if (pendingCount === 0) {
    return (
      <div className="completed-refresh-status">
        {copy.refreshCaughtUp}
      </div>
    );
  }

  const statusCounts = refresh.status_counts || {};
  const t1Pending = statusCounts.waiting_for_market_close || 0;
  const vendorPending = statusCounts.waiting_for_vendor_data || 0;
  const pricePending = statusCounts.waiting_for_price_data || 0;

  const sample = refresh.sample || [];
  const displaySample = sample.slice(0, 6);
  const extraCount = Math.max(0, sample.length - 6);

  return (
    <div className="completed-refresh-status">
      <div className="completed-refresh-status__header">
        <strong>{copy.completedRefresh}</strong> ({copy.pending}: {pendingCount})
      </div>
      <div className="completed-refresh-status__metrics">
        {t1Pending > 0 && <span className="completed-refresh-status__metric">{copy.reactionClosePending}: {t1Pending}</span>}
        {vendorPending > 0 && <span className="completed-refresh-status__metric">{copy.vendorPending}: {vendorPending}</span>}
        {pricePending > 0 && <span className="completed-refresh-status__metric">{copy.pricePending}: {pricePending}</span>}
      </div>
      {displaySample.length > 0 && (
        <div className="completed-refresh-status__chips">
          {displaySample.map((s, idx) => (
            <span key={idx} className="quality-pill">{s.ticker}</span>
          ))}
          {extraCount > 0 && <span className="quality-pill">+{extraCount} {copy.more}</span>}
        </div>
      )}
    </div>
  );
};

const normalizeTicker = (value) => String(value || '').trim().toUpperCase();

const findSearchContext = (query, payload, currentListIds, activeTab, listType) => {
  const normQuery = normalizeTicker(query);
  if (!normQuery) return null;

  const isBroad = normQuery.length < 2;

  const sample = payload?.meta?.completed_earnings_refresh?.sample || [];
  const matchedSample = sample.find(s => {
    const t = normalizeTicker(s.ticker);
    return t === normQuery || (!isBroad && t.includes(normQuery));
  });
  if (matchedSample) {
    return { type: 'pending_refresh', data: matchedSample };
  }

  const allEvents = Object.entries(payload?.events_detail || {});
  const matchedEvent = allEvents.find(([eventId, detail]) => {
    const t = normalizeTicker(detail.ticker);
    return t === normQuery || (!isBroad && t.includes(normQuery));
  });

  if (matchedEvent) {
    const [eventId, detail] = matchedEvent;
    
    const radarLists = payload?.radar_lists || {};
    if (radarLists.post_earnings?.pead_watch?.includes(eventId)) return { type: 'other_view', ticker: detail.ticker, suggest: 'PEAD Watch', action: { tab: 'post_earnings', list: 'pead_watch' } };
    if (radarLists.post_earnings?.top_opportunities?.includes(eventId)) return { type: 'other_view', ticker: detail.ticker, suggest: 'Continuation', action: { tab: 'post_earnings', list: 'top_opportunities' } };
    if (radarLists.post_earnings?.top_risk_alerts?.includes(eventId)) return { type: 'other_view', ticker: detail.ticker, suggest: 'Reversal', action: { tab: 'post_earnings', list: 'top_risk_alerts' } };
    if (radarLists.post_earnings?.trend_pullbacks?.includes(eventId)) return { type: 'other_view', ticker: detail.ticker, suggest: 'Pullbacks', action: { tab: 'post_earnings', list: 'trend_pullbacks' } };
    if (radarLists.momentum?.watch?.includes(eventId)) return { type: 'other_view', ticker: detail.ticker, suggest: 'Momentum', action: { tab: 'momentum' } };
    if (radarLists.tracked?.reviewed_watch?.includes(eventId)) return { type: 'tracked', ticker: detail.ticker, action: { tab: 'tracked' } };
    if (radarLists.off_cycle_watch?.thesis_watch?.includes(eventId)) return { type: 'other_view', ticker: detail.ticker, suggest: 'Between Catalysts', action: { tab: 'between_catalysts' } };
    if (detail.momentum_evidence?.status === 'available') return { type: 'other_view', ticker: detail.ticker, suggest: 'Momentum', action: { tab: 'momentum' } };
    
    if (detail.event_phase === 'pre_earnings' || detail.thesis_lifecycle?.phase === 'pre_earnings') return { type: 'other_view', ticker: detail.ticker, suggest: 'Pre-Earnings', action: { tab: 'pre_earnings' } };
    if (detail.event_phase === 'event_day' || detail.thesis_lifecycle?.phase === 'event_day') return { type: 'other_view', ticker: detail.ticker, suggest: 'Event Day', action: { tab: 'event_day' } };

    return { type: 'other_view', ticker: detail.ticker, suggest: 'another view' };
  }

  return { type: 'no_match', query: normQuery };
};

const SearchEmptyState = ({ context, onSwitch, copy }) => {
  if (!context) return null;

  if (context.type === 'pending_refresh') {
    const { ticker, pending_reason_primary, event_date } = context.data;
    let reasonText = copy.pendingRefresh || 'Waiting for data refresh.';
    if (pending_reason_primary === 'market_not_closed_yet') reasonText = copy.waitingReactionClose || 'Waiting for reaction close.';
    else if (['missing_actual', 'missing_surprise', 'vendor_unavailable'].includes(pending_reason_primary)) reasonText = copy.waitingVendorData || 'Waiting for EPS/surprise vendor data.';
    else if (pending_reason_primary === 'missing_t1_close') reasonText = copy.waitingPriceBackfill || 'Waiting for price backfill.';

    return (
      <div className="radar-search-empty">
        <div className="radar-search-empty__title">{copy.pendingRefreshTitle ? copy.pendingRefreshTitle(ticker) : `${ticker} is pending completed-earnings refresh.`}</div>
        <div className="radar-search-empty__body">{reasonText} ({copy.eventDate || 'Event Date'}: {event_date || copy.unknown})</div>
      </div>
    );
  }

  if (context.type === 'other_view') {
    return (
      <div className="radar-search-empty">
        <div className="radar-search-empty__title">{copy.foundElsewhere ? copy.foundElsewhere(context.ticker) : `Found ${context.ticker} in Catalyst Radar, but not in this view.`}</div>
        <div className="radar-search-empty__body">{copy.trySwitch ? copy.trySwitch(context.suggest) : `Try switching to ${context.suggest}.`}</div>
        {context.action && (
          <button className="radar-search-empty__action" onClick={() => onSwitch(context.action)}>
            {copy.switchTo ? copy.switchTo(context.suggest) : `Switch to ${context.suggest}`}
          </button>
        )}
      </div>
    );
  }

  if (context.type === 'tracked') {
    return (
      <div className="radar-search-empty">
        <div className="radar-search-empty__title">{copy.trackedElsewhere ? copy.trackedElsewhere(context.ticker) : `${context.ticker} is tracked, but not active in the current catalyst view.`}</div>
        <div className="radar-search-empty__body">{copy.openTracked || 'View Tracked to review saved notes.'}</div>
        {context.action && (
          <button className="radar-search-empty__action" onClick={() => onSwitch(context.action)}>
            {copy.switchToTracked || 'Switch to Tracked'}
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="radar-search-empty">
      <div className="radar-search-empty__title">{copy.noSearchMatch ? copy.noSearchMatch(context.query) : `No active catalyst event found for "${context.query}".`}</div>
      <div className="radar-search-empty__body">{copy.noSearchMatchBody || 'It may be outside the current earnings reaction window, between catalyst cycles, or not in the current scanner universe.'}</div>
    </div>
  );
};

const formatResultLabel = (value, locale = 'en') => {
  if (!value) return locale === 'zh' ? '未知' : 'Unknown';
  return displayLabel(value, locale, '');
};

const firstFiniteNumber = (...values) => {
  for (const value of values) {
    if (value === null || value === undefined || value === '') continue;
    const numeric = Number(value);
    if (Number.isFinite(numeric)) return numeric;
  }
  return null;
};

const RadarMasterView = ({ payload, preopenPayload, selectedEventId, onSelectEvent, locale = 'en' }) => {
  const copy = RADAR_COPY[locale] || RADAR_COPY.en;
  const [activeTab, setActiveTab] = useState('pre_earnings'); // pre_earnings, event_day, post_earnings, momentum, tracked, between_catalysts
  const [listType, setListType] = useState('top_opportunities'); // top_opportunities, top_risk_alerts
  const [searchQuery, setSearchQuery] = useState('');
  const [momentumGroupFilter, setMomentumGroupFilter] = useState('all');
  const hasDedicatedPreopenPayload = Boolean(
    preopenPayload?.events_detail &&
    preopenPayload?.radar_lists?.pre_earnings
  );
  const preEarningsPayload = hasDedicatedPreopenPayload ? preopenPayload : payload;
  const listPayload = activeTab === 'pre_earnings' ? preEarningsPayload : payload;

  const getSyntheticDetail = (ticker) => buildMomentumUniverseSyntheticDetail(ticker, payload);

  const getMomentumGroupKey = (item) => (
    item?.momentum_evidence?.industry_theme ||
    item?.momentum_evidence?.evidence?.industry_theme ||
    item?.trend_setup?.supply_chain_stage ||
    item?.momentum_evidence?.evidence?.supply_chain_stage ||
    'unmapped'
  );

  const getMomentumGroupLabel = (item) => {
    const label = item?.momentum_evidence?.industry_theme_label ||
                  item?.momentum_evidence?.evidence?.industry_theme_label;
    if (label) return displayLabel(label, locale, label);
    const key = getMomentumGroupKey(item);
    if (key === 'unmapped') return displayLabel('unmapped', locale, 'Unmapped');
    return formatResultLabel(key, locale);
  };

  const isMomentumAllRanking = activeTab === 'momentum' && listType !== 'momentum_watch';

  const momentumAllListIds = (() => {
    const rankings = payload?.momentum_universe?.rankings || [];
    return rankings.map(r => r.ticker);
  })();

  const momentumSourceListIds = listType === 'momentum_watch'
    ? payload?.radar_lists?.momentum?.watch || []
    : momentumAllListIds;

  const momentumGroupOptions = (() => {
    if (isMomentumAllRanking) {
      const counts = payload?.momentum_universe?.theme_counts || {};
      const groups = Object.entries(counts).map(([key, count]) => {
        const sample = (payload?.momentum_universe?.rankings || []).find(r => r.industry_theme === key);
        const label = displayLabel(sample?.industry_theme_label || key, locale, formatResultLabel(key, locale));
        return { key, count, label };
      }).sort((a, b) => {
        if (a.key === 'unmapped') return 1;
        if (b.key === 'unmapped') return -1;
        return a.key.localeCompare(b.key);
      });
      return [{ key: 'all', count: payload?.momentum_universe?.ranked_count || momentumSourceListIds.length, label: copy.allThemes }, ...groups];
    } else {
      const groupStats = new Map();
      momentumSourceListIds.forEach(eventId => {
        const item = payload?.events_detail?.[eventId];
        const key = getMomentumGroupKey(item);
        const label = getMomentumGroupLabel(item);
        if (!groupStats.has(key)) {
          groupStats.set(key, { count: 0, label });
        }
        groupStats.get(key).count += 1;
      });

      const groups = Array.from(groupStats.entries())
        .map(([key, { count, label }]) => ({ key, count, label }))
        .sort((a, b) => {
          if (a.key === 'unmapped') return 1;
          if (b.key === 'unmapped') return -1;
          return a.key.localeCompare(b.key);
        });

      return [{ key: 'all', count: momentumSourceListIds.length, label: copy.allThemes }, ...groups];
    }
  })();

  const momentumFilteredListIds = momentumGroupFilter === 'all'
    ? momentumSourceListIds
    : momentumSourceListIds.filter(id => {
        const item = isMomentumAllRanking ? getSyntheticDetail(id) : payload?.events_detail?.[id];
        return getMomentumGroupKey(item) === momentumGroupFilter;
      });

  const baseListIds = activeTab === 'tracked'
    ? payload?.radar_lists?.tracked?.reviewed_watch || []
    : activeTab === 'momentum'
      ? momentumFilteredListIds
    : activeTab === 'between_catalysts'
      ? payload?.radar_lists?.off_cycle_watch?.thesis_watch || []
      : listPayload?.radar_lists?.[activeTab]?.[listType] || [];
  const normalizedSearch = searchQuery.trim().toUpperCase();
  const filteredListIds = normalizedSearch
    ? baseListIds.filter(id => {
        const item = isMomentumAllRanking ? getSyntheticDetail(id) : listPayload?.events_detail?.[id];
        const ticker = String(item?.ticker || id).toUpperCase();
        return ticker.includes(normalizedSearch) || String(id).toUpperCase().includes(normalizedSearch);
      })
    : baseListIds;
  const isSearchMode = Boolean(normalizedSearch);
  const isPostEarnings = activeTab === 'post_earnings';
  const isBetweenCatalysts = activeTab === 'between_catalysts';
  const isMomentum = activeTab === 'momentum';

  const handleSwitchView = (action) => {
    if (action.tab) setActiveTab(action.tab);
    if (action.list) setListType(action.list);
  };

  const formatShortDate = (value) => {
    if (!value) return copy.datePending;
    try {
      const d = new Date(value);
      if (isNaN(d.getTime())) return copy.datePending;
      return d.toISOString().split('T')[0];
    } catch (e) {
      return copy.datePending;
    }
  };

  const formatSignedPct = (value) => {
    if (value === undefined || value === null || Number.isNaN(Number(value))) return copy.notIncluded;
    const n = Number(value);
    return `${n > 0 ? '+' : ''}${n.toFixed(1)}%`;
  };

  const getReturnColor = (value) => {
    const n = Number(value);
    if (Number.isNaN(n) || n === 0) return 'inherit';
    return n > 0 ? 'var(--text-green, #4caf50)' : 'var(--text-red, #f44336)';
  };

  const getPeadDisplay = (peadSignal) => {
    const direction = peadSignal?.direction;
    const reaction = peadSignal?.reaction || {};
    const t1 = Number(reaction.t1_return);
    const current = Number(reaction.current_post_return);

    if (!direction || Number.isNaN(t1) || Number.isNaN(current)) {
      return { label: copy.unavailable, tone: 'neutral' };
    }

    const currentTone = current > 0 ? 'bullish' : current < 0 ? 'bearish' : 'neutral';

    if (direction === 'drift') {
      if (currentTone === 'bullish') return { label: 'Bullish Continuation', tone: 'bullish' };
      if (currentTone === 'bearish') return { label: 'Bearish Continuation', tone: 'bearish' };
      return { label: 'Neutral Continuation', tone: 'neutral' };
    }

    if (direction === 'fade') {
      if (currentTone === 'bullish') return { label: 'Bullish Reversal', tone: 'bullish' };
      if (currentTone === 'bearish') return { label: 'Bearish Reversal', tone: 'bearish' };
      return { label: 'Neutral Reversal', tone: 'neutral' };
    }

    return { label: 'Neutral', tone: 'neutral' };
  };


  const getPostBaseRateSummary = (item) => {
    const baseRate = item?.post_earnings_base_rate;
    const peadDirection = item?.pead_signal?.direction;
    if (!baseRate || baseRate.status !== 'available') {
      return { label: 'Needs more history', sublabel: 'No base rate' };
    }

    const rate = peadDirection === 'fade'
      ? baseRate.reversal_rate ?? baseRate.fade_rate
      : baseRate.continuation_rate ?? baseRate.drift_rate;

    const label = rate !== undefined && rate !== null && !Number.isNaN(Number(rate))
      ? `${(Number(rate) * 100).toFixed(0)}%`
      : 'Needs more history';
    const sample = baseRate.similar_reaction_sample_size ?? baseRate.sample_size;

    return {
      label,
      sublabel: sample !== undefined && sample !== null ? `N=${sample}` : 'N unknown',
    };
  };

  const getPostQuality = (item) => {
    const baseRate = item?.post_earnings_base_rate;
    const tape = item?.historical_earnings_tape;
    const missing = item?.trust_layer?.missing_fields || [];
    const labels = [];

    if (baseRate?.sample_warning) {
      labels.push(formatResultLabel(baseRate.sample_warning, locale));
    } else if ((baseRate?.similar_reaction_sample_size ?? 0) > 0) {
      labels.push('Comparable');
    }

    if (tape?.data_quality?.surprise_rows) {
      labels.push(`${tape.data_quality.surprise_rows} EPS rows`);
    }

    const meaningfulMissing = missing.filter(field => (
      field !== 'options_data' &&
      field !== 'options_chain' &&
      field !== 'implied_move'
    ));

    if (meaningfulMissing.length > 0) {
      labels.push(`Missing ${meaningfulMissing.length}`);
    }

    if (labels.length === 0) labels.push('Basic');
    return labels.slice(0, 2);
  };

  const getPeerReadthroughSummary = (item) => {
    const peer = item?.peer_readthrough;
    if (!peer || peer.status !== 'available') return null;

    const incoming = Array.isArray(peer.incoming) ? peer.incoming : [];
    const outgoing = Array.isArray(peer.outgoing_candidates) ? peer.outgoing_candidates : [];
    if (incoming.length + outgoing.length === 0) return null;

    return {
      label: incoming.length > 0
        ? `Peer Read-Through In: ${incoming.length}`
        : `Peer Read-Through Out: ${outgoing.length}`,
    };
  };

  const getMomentumToneClass = (regime) => {
    if (regime === 'confirmed_momentum' || regime === 'constructive_momentum') return 'momentum-positive';
    if (regime === 'crowded_momentum') return 'momentum-crowded';
    if (regime === 'pullback_watch') return 'momentum-pullback';
    if (regime === 'weak_momentum') return 'momentum-weak';
    return 'momentum-neutral';
  };

  const getMomentumGroup = (item) => (
    getMomentumGroupKey(item)
  );

  const buildCatalystXRayRow = (item, eventId) => {
    const rawBias = String(item?.market_state?.bias || item?.trend_setup?.direction || 'neutral').toUpperCase();
    const preferredDirection = rawBias === 'LONG' || rawBias === 'SHORT' ? rawBias : 'NEUTRAL';
    const attentionScore = firstFiniteNumber(
      item?.attention_score?.total_score,
      item?.attention_score,
      item?.opportunity_score,
      item?.score
    );
    const longScore = firstFiniteNumber(
      item?.attention_score?.long_score,
      item?.long_score,
      preferredDirection === 'LONG' ? attentionScore : null,
      attentionScore
    );
    const shortScore = firstFiniteNumber(
      item?.attention_score?.short_score,
      item?.risk_score,
      item?.short_score,
      preferredDirection === 'SHORT' ? attentionScore : null,
      0
    );
    const peerSummary = getPeerReadthroughSummary(item);
    const riskFlags = Array.isArray(item?.market_state?.risk_flags) ? item.market_state.risk_flags : [];
    const tags = [
      ...(item?.headline_tag ? [item.headline_tag] : []),
      ...(item?.setup_label ? [item.setup_label] : []),
      ...riskFlags,
      ...(peerSummary ? [peerSummary.label] : []),
    ].filter(Boolean).slice(0, 4);

    return {
      eventId,
      eventDetail: item,
      ticker: item?.ticker || eventId,
      eventDate: item?.event_date || item?.catalyst_date || copy.datePending,
      preferredDirection,
      longScore: longScore ?? 0,
      shortScore: shortScore ?? 0,
      conviction: firstFiniteNumber(item?.conviction, item?.attention_score?.conviction, attentionScore, 0) ?? 0,
      tags,
      headlineTag: item?.headline_tag || item?.setup_label || formatResultLabel(item?.thesis_lifecycle?.phase || item?.event_phase || 'Watchlist', locale),
      historicalLongEdge: firstFiniteNumber(item?.historical_edge?.long_edge, item?.post_earnings_base_rate?.continuation_rate),
      historicalShortEdge: firstFiniteNumber(item?.historical_edge?.short_edge, item?.post_earnings_base_rate?.reversal_rate),
      longSetupFit: firstFiniteNumber(item?.setup_fit?.long_setup, longScore),
      shortSetupFit: firstFiniteNumber(item?.setup_fit?.short_setup, shortScore),
      reflexivityRho: firstFiniteNumber(item?.reflexivity?.rho, item?.reflexivity_rho),
      imrv: firstFiniteNumber(item?.options_pricing?.imrv, item?.imrv),
      runupPercentile: firstFiniteNumber(item?.market_state?.runup_percentile, item?.runup_percentile),
      relativeStrengthPercentile: firstFiniteNumber(item?.market_state?.relative_strength_percentile, item?.relative_strength_percentile),
      mu1: firstFiniteNumber(item?.historical_edge?.mu1, item?.event_study_linkage?.mu1),
      mu3: firstFiniteNumber(item?.historical_edge?.mu3, item?.event_study_linkage?.mu3),
      mu10: firstFiniteNumber(item?.historical_edge?.mu10, item?.event_study_linkage?.mu10),
      winLong: firstFiniteNumber(item?.historical_edge?.win_long, item?.event_study_linkage?.win_long),
      winShort: firstFiniteNumber(item?.historical_edge?.win_short, item?.event_study_linkage?.win_short),
    };
  };

  const catalystRows = activeTab === 'pre_earnings'
    ? filteredListIds
        .map((id) => {
          const item = preEarningsPayload?.events_detail?.[id];
          return item ? buildCatalystXRayRow(item, id) : null;
        })
        .filter(Boolean)
    : [];

  return (
    <div
      className="radar-master-view"
      data-preopen-feed-source={hasDedicatedPreopenPayload ? 'dedicated' : 'canonical-fallback'}
    >
      <div className="radar-header">
        <h2>{copy.radarTitle}</h2>
        <div className="radar-tabs">
          <button 
            className={activeTab === 'pre_earnings' ? 'active' : ''} 
            onClick={() => { setActiveTab('pre_earnings'); setListType('top_opportunities'); setMomentumGroupFilter('all'); }}
          >
            {copy.preEarnings}
          </button>
          <button 
            className={activeTab === 'event_day' ? 'active' : ''} 
            onClick={() => { setActiveTab('event_day'); setListType('top_opportunities'); setMomentumGroupFilter('all'); }}
          >
            {copy.eventDay}
          </button>
          <button 
            className={activeTab === 'post_earnings' ? 'active' : ''} 
            onClick={() => { setActiveTab('post_earnings'); setListType('top_opportunities'); setMomentumGroupFilter('all'); }}
          >
            {copy.postEarnings}
          </button>
          <button 
            className={activeTab === 'momentum' ? 'active' : ''} 
            onClick={() => { setActiveTab('momentum'); setListType('all_scanner_ranking'); setMomentumGroupFilter('all'); }}
          >
            {copy.momentum}
          </button>
          <button 
            className={activeTab === 'tracked' ? 'active' : ''} 
            onClick={() => setActiveTab('tracked')}
          >
            {copy.tracked}
          </button>
          <button 
            className={activeTab === 'between_catalysts' ? 'active' : ''} 
            onClick={() => setActiveTab('between_catalysts')}
          >
            {copy.betweenCatalysts}
          </button>
        </div>
      </div>

      {isPostEarnings && (
        <CompletedEarningsRefreshStatus refresh={payload?.meta?.completed_earnings_refresh} copy={copy} />
      )}

      {isMomentum && (
        <div className="momentum-board-note">
          <strong>{isMomentumAllRanking ? copy.allScannerRanking : copy.momentumWatch}</strong>
          <span>
            {isMomentumAllRanking
              ? copy.allScannerBody(baseListIds.length, momentumSourceListIds.length)
              : copy.momentumWatchBody(baseListIds.length)}
          </span>
        </div>
      )}

      {isMomentum && (
        <div className="radar-list-switch">
          <button
            className={listType !== 'momentum_watch' ? 'active' : ''}
            onClick={() => { setListType('all_scanner_ranking'); setMomentumGroupFilter('all'); }}
          >
            {copy.allScannerRanking}
          </button>
          <button
            className={listType === 'momentum_watch' ? 'active' : ''}
            onClick={() => { setListType('momentum_watch'); setMomentumGroupFilter('all'); }}
          >
            {copy.momentumWatch}
          </button>
        </div>
      )}

      {isMomentum && (
        <div className="momentum-group-filter-compact">
          {momentumGroupOptions.map(option => (
            <button
              key={option.key}
              className={momentumGroupFilter === option.key ? 'active' : ''}
              onClick={() => setMomentumGroupFilter(option.key)}
            >
              {option.label}
              <span>{option.count}</span>
            </button>
          ))}
        </div>
      )}

      {(activeTab !== 'tracked' && activeTab !== 'between_catalysts' && activeTab !== 'momentum') && (
        <div className="radar-list-switch">
          {activeTab === 'post_earnings' ? (
            <>
              <button 
                className={listType === 'top_opportunities' ? 'active' : ''} 
                onClick={() => setListType('top_opportunities')}
              >{copy.continuation}</button>
              <button 
                className={listType === 'top_risk_alerts' ? 'active' : ''} 
                onClick={() => setListType('top_risk_alerts')}
              >{copy.reversal}</button>
              <button 
                className={listType === 'pead_watch' ? 'active' : ''} 
                onClick={() => setListType('pead_watch')}
              >
                {copy.peadWatch}
              </button>
              <button 
                className={listType === 'trend_pullbacks' ? 'active' : ''} 
                onClick={() => setListType('trend_pullbacks')}
              >
                {copy.pullbacks}
              </button>
            </>
          ) : (
            <>
              <button 
                className={listType === 'top_opportunities' ? 'active' : ''} 
                onClick={() => setListType('top_opportunities')}
              >
                {copy.topOpportunities}
              </button>
              <button 
                className={listType === 'top_risk_alerts' ? 'active' : ''} 
                onClick={() => setListType('top_risk_alerts')}
              >
                {copy.riskAlerts}
              </button>
            </>
          )}
        </div>
      )}

      <div className="radar-search-row">
        <input
          className="radar-search-input"
          type="search"
          value={searchQuery}
          onChange={(event) => setSearchQuery(event.target.value)}
          placeholder={copy.searchPlaceholder}
        />
        {isSearchMode && (
          <button className="radar-search-clear" onClick={() => setSearchQuery('')}>
            {copy.clear}
          </button>
        )}
      </div>

      {activeTab === 'pre_earnings' && catalystRows.length > 0 ? (
        <CatalystRadarTable
          rows={catalystRows}
          selectedTicker={selectedEventId ? catalystRows.find(row => row.eventId === selectedEventId)?.ticker : null}
          onSelect={(row) => onSelectEvent(row.eventId, row.eventDetail, row)}
          locale={locale}
        />
      ) : (

      <div className="radar-table-container">
        <table className="radar-table radar-master-table">
          <thead>
            <tr>
              <th>{copy.ticker}</th>
              {isPostEarnings ? (
                <>
                  <th>{copy.result}</th>
                  <th>{copy.reaction}</th>
                  <th>{copy.current}</th>
                  <th>{copy.baseRate}</th>
                  <th>{copy.quality}</th>
                </>
              ) : isBetweenCatalysts ? (
                <>
                  <th>{copy.thesisState}</th>
                  <th>{copy.reason}</th>
                  <th>{copy.review}</th>
                  <th>{copy.lastSeen}</th>
                </>
              ) : isMomentum ? (
                <>
                  <th>{copy.industryTheme}</th>
                  <th>{copy.regime}</th>
                  <th>{copy.scannerScore}</th>
                  <th>{copy.setup200d}</th>
                  <th>{copy.relativeStrength}</th>
                  <th>{copy.cautions}</th>
                </>
              ) : (
                <>
                  <th>{copy.phase}</th>
                  <th>{copy.bias}</th>
                  <th>{copy.riskFlags}</th>
                  <th>{copy.score}</th>
                </>
              )}
            </tr>
          </thead>
          <tbody>
            {filteredListIds.length === 0 ? (
              <tr>
                <td colSpan={isPostEarnings ? 6 : isMomentum ? 7 : 5} style={{ textAlign: 'center', padding: '20px' }}>
                  {isSearchMode ? (
                    <SearchEmptyState 
                      context={findSearchContext(searchQuery, payload, filteredListIds, activeTab, listType)}
                      onSwitch={handleSwitchView}
                      copy={copy}
                    />
                  ) : activeTab === 'between_catalysts' ? (
                    <div style={{ padding: '20px' }}>
                      <div style={{ fontWeight: 'bold', marginBottom: '8px', fontSize: '1.05em' }}>{copy.noBetween}</div>
                      <div style={{ color: 'var(--text-muted)' }}>{copy.noBetweenBody}</div>
                    </div>
                  ) : activeTab === 'momentum' ? (
                    <div style={{ padding: '20px' }}>
                      <div style={{ fontWeight: 'bold', marginBottom: '8px', fontSize: '1.05em' }}>{copy.noMomentum}</div>
                      <div style={{ color: 'var(--text-muted)' }}>{copy.noMomentumBody}</div>
                    </div>
                  ) : activeTab === 'tracked'
                    ? copy.noTracked
                    : isPostEarnings && listType === 'trend_pullbacks'
                      ? copy.noPullbacks
                      : copy.noData}
                </td>
              </tr>
            ) : (
              filteredListIds.map(id => {
                const item = isMomentumAllRanking ? getSyntheticDetail(id) : listPayload.events_detail[id];
                if (!item) return null;
                const eventId = isMomentumAllRanking ? item.event_id : id;
                const isSelected = selectedEventId === eventId;
                const isPullbacksView = isPostEarnings && listType === 'trend_pullbacks';
                const peadDisplay = isPostEarnings ? getPeadDisplay(item.pead_signal) : null;
                const biasClass = isPostEarnings
                  ? (peadDisplay?.tone === 'bullish' ? 'long' : peadDisplay?.tone === 'bearish' ? 'short' : 'neutral')
                  : item.market_state?.bias?.toLowerCase() || 'neutral';
                const reaction = item.pead_signal?.reaction || {};
                const baseRateSummary = isPostEarnings ? getPostBaseRateSummary(item) : null;
                const postQuality = isPostEarnings ? getPostQuality(item) : [];
                const peerSummary = getPeerReadthroughSummary(item);
                const momentum = item.momentum_evidence || {};
                const momentumEvidence = momentum.evidence || {};
                
                return (
                  <tr 
                    key={eventId} 
                    className={`radar-row ${isSelected ? 'selected' : ''}`}
                    onClick={() => onSelectEvent(eventId, isMomentumAllRanking ? item : null)}
                  >
                    <td>
                      <div style={{ fontWeight: 'bold' }}>{item.ticker}</div>
                      <div style={{ fontSize: '0.8em', color: 'var(--text-muted)' }}>
                        {item.event_date}
                      </div>
                    </td>
                    {isPostEarnings ? (
                      <>
                        <td className="post-result-cell">
                          {isPullbacksView && item.trend_setup?.status === 'available' ? (
                            <>
                              <span className={`bias-indicator badge-${item.trend_setup.stage}`}>
                                {formatResultLabel(item.trend_setup.stage, locale)}
                              </span>
                              <div className="post-result-subline">
                                {copy.score}: {item.trend_setup.score || copy.notIncluded} | {item.trend_setup.supply_chain_stage ? formatResultLabel(item.trend_setup.supply_chain_stage, locale) : copy.contextPending}
                              </div>
                            </>
                          ) : (
                            <>
                              <span className={`bias-indicator bias-${biasClass}`}>
                                {peadDisplay.label}
                              </span>
                              <div className="post-result-subline">
                                {formatResultLabel(reaction.surprise_label, locale)} {formatSignedPct(reaction.surprise_percent)}
                              </div>
                            </>
                          )}
                        </td>
                        <td>
                          <div className="metric-stack">
                            <strong style={{ color: getReturnColor(reaction.t1_return) }}>
                              {formatSignedPct(reaction.t1_return)}
                            </strong>
                            <span>
                              {item.trading_days_to_event !== undefined && item.trading_days_to_event !== null
                                ? `Day ${item.trading_days_to_event > 0 ? `+${item.trading_days_to_event}` : item.trading_days_to_event}`
                                : copy.post}
                            </span>
                          </div>
                        </td>
                        <td>
                          <strong style={{ color: getReturnColor(reaction.current_post_return) }}>
                            {formatSignedPct(reaction.current_post_return)}
                          </strong>
                        </td>
                        <td>
                          <div className="metric-stack">
                            <strong>{baseRateSummary.label}</strong>
                            <span>{baseRateSummary.sublabel}</span>
                          </div>
                        </td>
                        <td>
                          {postQuality.map((label, idx) => (
                            <span key={idx} className="quality-pill">{label}</span>
                          ))}
                        </td>
                      </>
                    ) : isMomentum ? (
                      <>
                        <td>
                          <span className="quality-pill">{getMomentumGroupLabel(item)}</span>
                          <div className="post-result-subline">{formatResultLabel(item.event_phase || 'unknown', locale)}</div>
                        </td>
                        <td>
                          <span className={`quality-pill momentum-regime-pill ${getMomentumToneClass(momentum.regime)}`}>
                            {formatResultLabel(momentum.regime, locale)}
                          </span>
                          <div className="post-result-subline">{momentum.evidence_status === 'market_data_only' ? copy.marketDataOnly : formatResultLabel(momentum.evidence_status, locale)}</div>
                        </td>
                        <td>
                          <div className="metric-stack">
                            <strong>{momentum.score ?? copy.notIncluded}</strong>
                            <span>{copy.scannerScoreSmall}</span>
                          </div>
                        </td>
                        <td>
                          <div className="metric-stack">
                            <strong>MA200 {formatSignedPct(momentumEvidence.ma200_slope_pct)}</strong>
                            <span>Z {momentumEvidence.zscore_200d != null ? Number(momentumEvidence.zscore_200d).toFixed(2) : copy.notIncluded} · {copy.bandDays} {momentumEvidence.days_above_upper_band_60d ?? copy.notIncluded}</span>
                          </div>
                        </td>
                        <td>
                          <div className="metric-stack">
                            <strong>SPY {formatSignedPct(momentumEvidence.relative_strength_vs_spy_63d)}</strong>
                            <span>QQQ {formatSignedPct(momentumEvidence.relative_strength_vs_qqq_63d)}</span>
                          </div>
                        </td>
                        <td>
                          {(momentum.caution_flags || []).slice(0, 3).map((flag, idx) => (
                            <span key={idx} className="quality-pill">{flag}</span>
                          ))}
                          {momentum.news_checked === false && <span className="quality-pill">{copy.newsNotChecked}</span>}
                        </td>
                      </>
                    ) : isBetweenCatalysts ? (
                      <>
                        <td>
                          <span className="quality-pill">{formatResultLabel(item.thesis_lifecycle?.status || 'Unknown', locale)}</span>
                        </td>
                        <td>
                          {item.off_cycle_reason?.labels?.length > 0 ? item.off_cycle_reason.labels.map((l, i) => <span key={i} className="quality-pill">{formatResultLabel(l, locale)}</span>) : copy.coveragePending}
                        </td>
                        <td>
                          {item.thesis_lifecycle?.review_state?.reviewed ? copy.reviewed : copy.reviewPending}
                        </td>
                        <td>
                          <div style={{ fontSize: '0.85em', color: 'var(--text-muted)' }}>
                            {formatShortDate(item.thesis_lifecycle?.last_seen_at)}
                          </div>
                        </td>
                      </>
                    ) : (
                      <>
                        <td>
                          {item.trading_days_to_event !== undefined && item.trading_days_to_event !== null
                            ? `T${item.trading_days_to_event > 0 ? `+${item.trading_days_to_event}` : item.trading_days_to_event}`
                            : (item.event_phase || item.thesis_lifecycle?.phase || 'unknown')}
                        </td>
                        <td>
                          <span className={`bias-indicator bias-${biasClass}`}>
                            {item.market_state?.bias}
                          </span>
                        </td>
                        <td className="radar-risk-flags-cell">
                          {item.market_state?.risk_flags?.map((flag, idx) => (
                            <span key={idx} className="risk-flag-mini">{flag}</span>
                          ))}
                          {peerSummary && (
                            <span className="quality-pill peer-readthrough-pill">{peerSummary.label}</span>
                          )}
                        </td>
                        <td style={{ fontWeight: 'bold' }}>
                          {item.attention_score?.total_score || item.attention_score || '-'}
                        </td>
                      </>
                    )}
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
      )}
    </div>
  );
};

export default RadarMasterView;
