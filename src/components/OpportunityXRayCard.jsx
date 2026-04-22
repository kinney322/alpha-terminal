import { Activity, ArrowDownRight, ArrowUpRight, Orbit, Scale, Sigma, SplitSquareVertical, X } from 'lucide-react';

function metricTone(value, reverse = false) {
  if (value == null || Number.isNaN(value)) return 'neutral';
  const positive = reverse ? value < 1 : value >= 0;
  return positive ? 'positive' : 'negative';
}

function formatMetric(value, digits = 2) {
  if (value == null || Number.isNaN(value)) return '—';
  return Number(value).toFixed(digits);
}

function formatPercent(value, digits = 2) {
  if (value == null || Number.isNaN(value)) return '—';
  return `${value > 0 ? '+' : ''}${Number(value).toFixed(digits)}%`;
}

function InsightRow({ label, value, tone = 'neutral' }) {
  return (
    <div className="xray-insight-row">
      <span>{label}</span>
      <strong className={`tone-${tone}`}>{value}</strong>
    </div>
  );
}

function ScatterMini({ points }) {
  if (!points || points.length === 0) {
    return <div className="xray-scatter-empty">歷史散點資料載入後會顯示於此。</div>;
  }

  const width = 280;
  const height = 160;
  const padding = 18;
  const xs = points.map((p) => Number(p.x ?? 0));
  const ys = points.map((p) => Number(p.y ?? 0));
  const minX = Math.min(...xs, -1);
  const maxX = Math.max(...xs, 1);
  const minY = Math.min(...ys, -1);
  const maxY = Math.max(...ys, 1);
  const rangeX = maxX - minX || 1;
  const rangeY = maxY - minY || 1;

  const projectX = (value) => padding + ((value - minX) / rangeX) * (width - padding * 2);
  const projectY = (value) => height - padding - ((value - minY) / rangeY) * (height - padding * 2);
  const zeroX = projectX(0);
  const zeroY = projectY(0);

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="xray-scatter">
      <line x1={padding} x2={width - padding} y1={zeroY} y2={zeroY} className="xray-scatter__axis" />
      <line x1={zeroX} x2={zeroX} y1={padding} y2={height - padding} className="xray-scatter__axis" />
      {points.map((point, index) => (
        <circle
          key={`${point.label ?? 'pt'}-${index}`}
          cx={projectX(Number(point.x ?? 0))}
          cy={projectY(Number(point.y ?? 0))}
          r="4.2"
          className={`xray-scatter__dot ${Number(point.y ?? 0) >= 0 ? 'is-positive' : 'is-negative'}`}
        />
      ))}
    </svg>
  );
}

export default function OpportunityXRayCard({ row, onClose, eventStudy, eventStudyLoading, eventStudyError }) {
  if (!row) {
    return (
      <div className="xray-card xray-card--empty">
        <p>點擊左側雷達榜單任一標的，即可展開 Opportunity X-Ray。</p>
      </div>
    );
  }

  const preferredTone = row.preferredDirection.toLowerCase();
  const reflexTone = metricTone(-(row.reflexivityRho ?? 0));
  const imrvTone = metricTone((row.imrv ?? 1) - 1);
  const eventSummary = eventStudy?.summary;
  const scatterPoints = Array.isArray(eventStudy?.details)
    ? eventStudy.details.slice(0, 18).map((detail, index) => ({
        x: Number(detail.drift_m5 ?? detail.drift_m10 ?? 0),
        y: Number(detail.t10_return ?? detail.t1_return ?? 0),
        label: detail.event_date ?? String(index),
      }))
    : [];

  return (
    <div className="xray-card">
      <div className="xray-card__header">
        <div>
          <p className="xray-card__eyebrow">Single Name Deconstruction</p>
          <h3 className="xray-card__title">
            {row.ticker}
            <span className={`direction-pill direction-pill--${preferredTone}`}>{row.preferredDirection}</span>
          </h3>
        </div>
        <div className="xray-card__headline">
          <strong>{row.headlineTag || 'Opportunity X-Ray'}</strong>
          <span>{row.eventDate}</span>
        </div>
        {onClose ? (
          <button className="xray-close-btn" onClick={onClose} aria-label="Close X-Ray">
            <X size={18} />
          </button>
        ) : null}
      </div>

      <div className="xray-card__grid">
        <section className="xray-engine">
          <div className="xray-engine__title">
            <SplitSquareVertical size={16} />
            <span>Historical Edge Engine</span>
          </div>
          <div className="xray-engine__score-row">
            <div className="xray-kpi">
              <span>Long Edge</span>
              <strong>{formatMetric(row.historicalLongEdge)}</strong>
            </div>
            <div className="xray-kpi">
              <span>Short Edge</span>
              <strong>{formatMetric(row.historicalShortEdge)}</strong>
            </div>
          </div>
          <div className="xray-insight-list">
            <InsightRow label="Mu +1D" value={formatPercent(row.mu1)} tone={metricTone(row.mu1)} />
            <InsightRow label="Mu +3D" value={formatPercent(row.mu3)} tone={metricTone(row.mu3)} />
            <InsightRow label="Mu +10D" value={formatPercent(row.mu10)} tone={metricTone(row.mu10)} />
            <InsightRow label="Win Long" value={formatPercent(row.winLong, 0)} tone="positive" />
            <InsightRow label="Win Short" value={formatPercent(row.winShort, 0)} tone="negative" />
          </div>
        </section>

        <section className="xray-engine">
          <div className="xray-engine__title">
            <Activity size={16} />
            <span>Setup Fit Engine</span>
          </div>
          <div className="xray-engine__score-row">
            <div className="xray-kpi">
              <span>Long Setup</span>
              <strong>{formatMetric(row.longSetupFit)}</strong>
            </div>
            <div className="xray-kpi">
              <span>Short Setup</span>
              <strong>{formatMetric(row.shortSetupFit)}</strong>
            </div>
          </div>
          <div className="xray-insight-list">
            <InsightRow label="Run-up Pctl" value={formatMetric(row.runupPercentile, 1)} tone={metricTone((row.runupPercentile ?? 50) - 50)} />
            <InsightRow label="RS Pctl" value={formatMetric(row.relativeStrengthPercentile, 1)} tone={metricTone((row.relativeStrengthPercentile ?? 50) - 50)} />
            <InsightRow label="Long Score" value={formatMetric(row.longScore)} tone="positive" />
            <InsightRow label="Short Score" value={formatMetric(row.shortScore)} tone="negative" />
            <InsightRow label="Conviction" value={formatMetric(row.conviction)} tone={row.conviction >= 20 ? 'positive' : 'neutral'} />
          </div>
        </section>

        <section className="xray-quant">
          <div className="xray-engine__title">
            <Orbit size={16} />
            <span>Reflexivity</span>
          </div>
          <div className="xray-quant__hero">
            <div className={`xray-quant__icon tone-${reflexTone}`}>
              {row.preferredDirection === 'SHORT' ? <ArrowDownRight size={18} /> : <ArrowUpRight size={18} />}
            </div>
            <div>
              <span>Reflexivity Rho</span>
              <strong className={`tone-${reflexTone}`}>{formatMetric(row.reflexivityRho, 3)}</strong>
            </div>
          </div>
          <p className="xray-quant__note">
            數值越偏負，代表盤前越熱、事後越容易反身性反噬；對 short fade setup 特別關鍵。
          </p>
        </section>

        <section className="xray-quant">
          <div className="xray-engine__title">
            <Sigma size={16} />
            <span>Options Pricing</span>
          </div>
          <div className="xray-quant__hero">
            <div className={`xray-quant__icon tone-${imrvTone}`}>
              <Scale size={18} />
            </div>
            <div>
              <span>IMRV</span>
              <strong className={`tone-${imrvTone}`}>{formatMetric(row.imrv, 3)}</strong>
            </div>
          </div>
          <p className="xray-quant__note">
            IMRV &gt; 1 代表市場把波動與預期定價得更滿；若同時疊加高 run-up，sell-the-news 風險會顯著升高。
          </p>
        </section>

        <section className="xray-engine xray-engine--full">
          <div className="xray-engine__title">
            <Activity size={16} />
            <span>Historical Event Study Linkage</span>
          </div>

          {eventStudyLoading ? (
            <div className="xray-linked-loading">同步歷史事件研究中...</div>
          ) : eventStudyError ? (
            <div className="xray-linked-error">{eventStudyError}</div>
          ) : eventSummary ? (
            <div className="xray-linked-grid">
              <div className="xray-linked-kpis">
                <InsightRow
                  label="T+10 Win Rate"
                  value={formatPercent(eventSummary.win_rate, 0)}
                  tone={(eventSummary.win_rate ?? 0) >= 50 ? 'positive' : 'negative'}
                />
                <InsightRow
                  label="Avg Run-up T-5"
                  value={formatPercent(eventSummary.avg_drift_m5)}
                  tone={metricTone(eventSummary.avg_drift_m5)}
                />
                <InsightRow
                  label="Avg T+1 Abs Vol"
                  value={formatPercent(eventSummary.avg_t1_abs_volatility)}
                  tone="neutral"
                />
                <InsightRow
                  label="Avg Max DD 5D"
                  value={formatPercent(eventSummary.avg_max_dd_5)}
                  tone="negative"
                />
              </div>
              <div className="xray-linked-plot">
                <ScatterMini points={scatterPoints} />
                <p className="xray-linked-caption">X 軸為盤前 T-5 run-up，Y 軸為事件後 T+10 結果。</p>
              </div>
            </div>
          ) : (
            <div className="xray-linked-empty">點擊雷達標的後，這裡會接入單檔事件研究的勝率與散點圖資料。</div>
          )}
        </section>
      </div>
    </div>
  );
}
