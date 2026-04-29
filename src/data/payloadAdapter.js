// src/data/payloadAdapter.js

const API_BASE = 'https://kw-terminal-api.myfootballplaces.workers.dev';
const LEADERBOARD_FALLBACK_URLS = [
  import.meta.env.VITE_RADAR_V1_URL,
  `${API_BASE}/event-opportunity/leaderboard-latest`,
  'https://pub-03e0405010774afe9ca6d569e0cb43b1.r2.dev/event-study/leaderboard-latest.json.gz',
  import.meta.env.VITE_EVENT_LEADERBOARD_URL,
].filter(Boolean);

export async function fetchAndNormalizeRadarPayload() {
  let rawData = null;
  let sourceUrl = '';

  for (const url of LEADERBOARD_FALLBACK_URLS) {
    try {
      const res = await fetch(url, { headers: { Accept: 'application/json' } });
      if (!res.ok) throw new Error(`Fetch failed ${res.status}`);
      rawData = await res.json();
      sourceUrl = url;
      break;
    } catch (error) {
      console.warn(`Failed to fetch from ${url}:`, error);
    }
  }

  if (!rawData) {
    throw new Error('Unable to fetch live payload from any fallback URL.');
  }

  // If already v1.1 normalized, return directly
  if (rawData.schema_type === "normalized_dictionary" || rawData.events_detail) {
    return rawData;
  }

  const rawRows = Array.isArray(rawData) ? rawData : (Array.isArray(rawData?.leaderboard) ? rawData.leaderboard : []);
  
  const normalized = {
    meta: {
      generated_at: rawData?.meta?.generated_at || new Date().toISOString(),
      data_source: "legacy_adapter",
      options_data_timestamp: "unavailable",
      global_status: "fresh",
      total_tickers_scanned: rawRows.length
    },
    radar_lists: {
      pre_earnings: { top_opportunities: [], top_risk_alerts: [] },
      event_day: { top_opportunities: [], top_risk_alerts: [] },
      post_earnings: { top_opportunities: [], top_risk_alerts: [] },
      unknown: { top_opportunities: [], top_risk_alerts: [] } // Fallback for invalid dates
    },
    events_detail: {}
  };

  const parsedDetails = rawRows.map((row) => {
    const ticker = row.Ticker ?? row.ticker ?? "UNKNOWN";
    const eventDate = row.EventDate ?? row.eventDate ?? "unknown";
    const conviction = Number(row.Conviction ?? row.conviction ?? 0);
    const tags = row.Tags ?? row.tags ?? [];
    const runupPercentile = Number(row.RunupPercentile ?? row.runupPercentile ?? 0);
    
    const prefDir = (row.PreferredDirection ?? row.preferredDirection ?? 'NEUTRAL').toUpperCase();
    let bias = 'Neutral';
    if (prefDir === 'LONG') bias = 'Long';
    if (prefDir === 'SHORT') bias = 'Short';

    const longScore = Number(row.LongScore ?? row.longScore ?? 0);
    const shortScore = Number(row.ShortScore ?? row.shortScore ?? 0);
    const preferredScore = bias === 'Long' ? longScore : bias === 'Short' ? shortScore : Math.max(longScore, shortScore);
    const edgeGap = conviction;
    const attentionScore = 0.7 * preferredScore + 0.3 * edgeGap;

    // Finding 1: Immutable event_id
    const fiscalPeriod = row.fiscal_period || row.fiscalPeriod || row.quarter || row.period;
    const isLegacyId = !fiscalPeriod;
    const eventId = isLegacyId ? `${ticker}-Earnings-LegacyUpcoming` : `${ticker}-Earnings-${fiscalPeriod}`;
    
    const missingFields = ["options_data", "earnings_timing"];
    if (isLegacyId) missingFields.push("fiscal_period");

    // Finding 2: trading_days_to_event
    let trading_days_to_event = null;
    let event_phase = "unknown";
    
    if (eventDate === "unknown" || isNaN(new Date(eventDate).getTime())) {
      missingFields.push("event_date");
    } else {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const targetDate = new Date(eventDate);
      targetDate.setHours(0, 0, 0, 0);

      let days = 0;
      let current = new Date(today);
      const isFuture = targetDate > today;
      const isPast = targetDate < today;

      if (isFuture) {
        while (current < targetDate) {
          current.setDate(current.getDate() + 1);
          const day = current.getDay();
          if (day !== 0 && day !== 6) days++;
        }
        trading_days_to_event = -days;
      } else if (isPast) {
        while (current > targetDate) {
          current.setDate(current.getDate() - 1);
          const day = current.getDay();
          if (day !== 0 && day !== 6) days++;
        }
        trading_days_to_event = days;
      } else {
        trading_days_to_event = 0;
      }

      if (trading_days_to_event < 0) event_phase = "pre_earnings";
      else if (trading_days_to_event === 0) event_phase = "event_day";
      else event_phase = "post_earnings";
    }

    const detail = {
      event_id: eventId,
      ticker: ticker,
      event_category: "Earnings",
      fiscal_period: fiscalPeriod || "unknown",
      event_date: eventDate,
      event_date_status: "estimated",
      event_schedule_version: 1,
      previous_event_dates: [],
      
      event_phase: event_phase,
      trading_days_to_event: trading_days_to_event,
      
      // Explicit limitation warning for legacy adapter
      event_identity_status: isLegacyId ? "legacy_unstable" : "stable",

      trust_layer: {
        generated_at: normalized.meta.generated_at,
        data_source: "legacy_adapter",
        earnings_timing: "unknown",
        event_trading_day: "unknown",
        options_data_status: "unavailable",
        sample_size: "unknown",
        missing_fields: missingFields
      },

      attention_score: {
        total_score: Number(attentionScore.toFixed(1)),
        raw_components: {
          edge_strength: "unknown",
          event_phase_relevance: "unknown",
          data_confidence: "unknown",
          market_state_signal: "unknown",
          liquidity_quality: "unknown"
        },
        weighted_components: {}
      },

      market_state: {
        bias: bias,
        edge_gap: edgeGap,
        runup_t5_percentile: runupPercentile,
        historical_realized_move_median: "unknown",
        vol_pricing_status: "unknown",
        liquidity_risk: tags.some(t => t.toLowerCase().includes("thin") || t.toLowerCase().includes("liquidity")) ? "High" : "unknown",
        risk_flags: tags
      },

      expected_move: {
        status: "unavailable"
      },

      post_earnings_base_rate: {
        status: "not_applicable_pre_event"
      },

      spillover_watch: {
        has_spillover: false,
        peers: []
      }
    };
    
    normalized.events_detail[eventId] = detail;
    return detail;
  });

  // Finding 3: Use adapted attention score for sorting
  parsedDetails.sort((a, b) => b.attention_score.total_score - a.attention_score.total_score);

  parsedDetails.forEach(detail => {
    const isHighRisk = detail.market_state.runup_t5_percentile >= 85 || 
                       detail.market_state.liquidity_risk === "High" ||
                       detail.trust_layer.missing_fields.includes("options_data") ||
                       detail.trust_layer.missing_fields.includes("event_date");
    
    // Looser threshold for legacy adapter to populate opportunities
    const isOpp = detail.attention_score.total_score >= 30;
    
    // Map 'unknown' phase to 'pre_earnings' list visually, but keep object property as 'unknown'
    const listPhase = detail.event_phase === "unknown" ? "pre_earnings" : detail.event_phase;

    if (isOpp) {
      normalized.radar_lists[listPhase].top_opportunities.push(detail.event_id);
    }
    if (isHighRisk || !isOpp) {
      normalized.radar_lists[listPhase].top_risk_alerts.push(detail.event_id);
    }
  });

  // Clean up unknown fallback if empty
  if (normalized.radar_lists.unknown.top_opportunities.length === 0 && normalized.radar_lists.unknown.top_risk_alerts.length === 0) {
      delete normalized.radar_lists.unknown;
  }

  return normalized;
}
