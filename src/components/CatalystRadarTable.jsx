import { AlertOctagon, ChevronRight, Radar, Sparkles } from 'lucide-react';
import { displayLabel } from './displayLabelHelpers.js';

const CATALYST_TABLE_COPY = {
  en: {
    eyebrow: 'Pre-Earnings Opportunity Scanner',
    title: 'Catalyst Radar',
    summary: 'Long and short setup scores sit side by side so the highest-mismatch events surface first.',
    ticker: 'Ticker',
    eventDate: 'Event Date',
    direction: 'Direction',
    scoreMatrix: 'Dual Score Matrix',
    conviction: 'Conviction',
    tags: 'Tags'
  },
  zh: {
    eyebrow: '財報前機會掃描',
    title: '財報雷達',
    summary: '把做多與做空設定同場比較，優先找出錯配較大的事件標的。',
    ticker: '股票',
    eventDate: '事件日期',
    direction: '方向',
    scoreMatrix: '多空分數',
    conviction: '信心分',
    tags: '標籤'
  }
};

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

function RadarBadge({ tag, locale = 'en' }) {
  const tone = priorityTag(tag);
  const icon =
    tone === 'critical' ? <AlertOctagon size={12} /> :
    tone === 'warning' ? <Sparkles size={12} /> :
    <Radar size={12} />;

  return (
    <span className={`radar-badge radar-badge--${tone}`}>
      {icon}
      {displayLabel(tag, locale, tag)}
    </span>
  );
}

export default function CatalystRadarTable({ rows, selectedTicker, onSelect, locale = 'en' }) {
  const copy = CATALYST_TABLE_COPY[locale] || CATALYST_TABLE_COPY.en;
  return (
    <div className="catalyst-radar">
      <div className="catalyst-radar__header">
        <div>
          <p className="catalyst-radar__eyebrow">{copy.eyebrow}</p>
          <h3 className="catalyst-radar__title">{copy.title}</h3>
        </div>
        <p className="catalyst-radar__summary">
          {copy.summary}
        </p>
      </div>

      <div className="catalyst-radar__table-wrap">
        <table className="catalyst-radar__table">
          <thead>
            <tr>
              <th>{copy.ticker}</th>
              <th>{copy.eventDate}</th>
              <th>{copy.direction}</th>
              <th>{copy.scoreMatrix}</th>
              <th>{copy.conviction}</th>
              <th>{copy.tags}</th>
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
                      <span>{displayLabel(row.headlineTag || row.preferredDirection, locale, row.headlineTag || row.preferredDirection)}</span>
                    </div>
                  </td>
                  <td className="catalyst-radar__mono">{row.eventDate}</td>
                  <td>
                    <span className={`direction-pill direction-pill--${row.preferredDirection.toLowerCase()}`}>
                      {displayLabel(row.preferredDirection, locale, row.preferredDirection)}
                    </span>
                  </td>
                  <td>
                    <DualScoreBar longScore={row.longScore} shortScore={row.shortScore} />
                  </td>
                  <td>
                    <div className="conviction-stack">
                      <strong>{row.conviction}</strong>
                      <span>{copy.conviction}</span>
                    </div>
                  </td>
                  <td>
                    <div className="radar-badge-group">
                      {row.tags?.map((tag) => <RadarBadge key={`${row.ticker}-${tag}`} tag={tag} locale={locale} />)}
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
