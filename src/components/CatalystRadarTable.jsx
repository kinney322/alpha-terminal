import { AlertOctagon, ChevronRight, Radar, Sparkles } from 'lucide-react';

function priorityTag(tag) {
  if (tag === 'God-tier Short Setup') return 'critical';
  if (tag === 'Euphoric Run-up') return 'warning';
  if (tag === 'Clean Long Continuation') return 'positive';
  return 'default';
}

function DualScoreBar({ longScore, shortScore }) {
  const total = Math.max(longScore + shortScore, 1);
  const longWidth = `${(longScore / total) * 100}%`;
  const shortWidth = `${(shortScore / total) * 100}%`;

  return (
    <div className="dual-score-bar">
      <div className="dual-score-bar__track">
        <div className="dual-score-bar__long" style={{ width: longWidth }} />
        <div className="dual-score-bar__short" style={{ width: shortWidth }} />
        <div className="dual-score-bar__midline" />
      </div>
      <div className="dual-score-bar__labels">
        <span className="dual-score-bar__label dual-score-bar__label--long">L {longScore}</span>
        <span className="dual-score-bar__label dual-score-bar__label--short">S {shortScore}</span>
      </div>
    </div>
  );
}

function RadarBadge({ tag }) {
  const tone = priorityTag(tag);
  const icon =
    tone === 'critical' ? <AlertOctagon size={12} /> :
    tone === 'warning' ? <Sparkles size={12} /> :
    <Radar size={12} />;

  return (
    <span className={`radar-badge radar-badge--${tone}`}>
      {icon}
      {tag}
    </span>
  );
}

export default function CatalystRadarTable({ rows, selectedTicker, onSelect }) {
  return (
    <div className="catalyst-radar">
      <div className="catalyst-radar__header">
        <div>
          <p className="catalyst-radar__eyebrow">Pre-Earnings Opportunity Scanner</p>
          <h3 className="catalyst-radar__title">Catalyst Radar</h3>
        </div>
        <p className="catalyst-radar__summary">
          以多空雙引擎同場角力，優先放大最具錯配與反身性的事件標的。
        </p>
      </div>

      <div className="catalyst-radar__table-wrap">
        <table className="catalyst-radar__table">
          <thead>
            <tr>
              <th>Ticker</th>
              <th>Event Date</th>
              <th>Direction</th>
              <th>Dual Score Matrix</th>
              <th>Conviction</th>
              <th>Tags</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => {
              const isActive = selectedTicker === row.ticker;
              return (
                <tr
                  key={`${row.ticker}-${row.eventDate}`}
                  className={isActive ? 'is-active' : ''}
                  onClick={() => onSelect?.(row)}
                >
                  <td>
                    <div className="catalyst-radar__ticker-cell">
                      <strong>{row.ticker}</strong>
                      <span>{row.headlineTag || row.preferredDirection}</span>
                    </div>
                  </td>
                  <td className="catalyst-radar__mono">{row.eventDate}</td>
                  <td>
                    <span className={`direction-pill direction-pill--${row.preferredDirection.toLowerCase()}`}>
                      {row.preferredDirection}
                    </span>
                  </td>
                  <td>
                    <DualScoreBar longScore={row.longScore} shortScore={row.shortScore} />
                  </td>
                  <td>
                    <div className="conviction-stack">
                      <strong>{row.conviction}</strong>
                      <span>Conviction</span>
                    </div>
                  </td>
                  <td>
                    <div className="radar-badge-group">
                      {row.tags?.map((tag) => <RadarBadge key={`${row.ticker}-${tag}`} tag={tag} />)}
                    </div>
                  </td>
                  <td className="catalyst-radar__arrow">
                    <ChevronRight size={16} />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
