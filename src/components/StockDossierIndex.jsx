import React, { useMemo } from 'react';
import { buildDossierRecords } from './dossierHelpers';
import StockLogo from './StockLogo';
import { getStockDossierProfile } from '../data/stockDossierProfiles';

const DOSSIER_INDEX_COPY = {
  en: {
    notIncluded: 'Not Included',
    waiting: 'Waiting for payload...',
    title: 'Stock Dossier',
    body: 'Living research index aggregating Post-Earnings, Catalyst, and Momentum Universe setups.',
    ticker: 'Ticker',
    sectorTheme: 'Sector / Theme',
    researchState: 'Research State',
    moveType: 'Move Type',
    thesisPulse: 'Thesis Pulse',
    dataCoverage: 'Data Coverage',
    action: 'Action',
    empty: 'No research objects available.',
    companyPending: 'Company Pending',
    sectorNA: 'Sector N/A',
    openDossier: 'Open Dossier'
  },
  zh: {
    notIncluded: '未納入',
    waiting: '等待資料載入...',
    title: '股票檔案',
    body: '集中整理財報後、催化事件與動能宇宙的研究對象。',
    ticker: '股票',
    sectorTheme: '行業 / 主題',
    researchState: '研究狀態',
    moveType: '走勢類型',
    thesisPulse: '論點脈搏',
    dataCoverage: '資料覆蓋',
    action: '動作',
    empty: '暫無研究對象。',
    companyPending: '公司資料待補',
    sectorNA: '行業未分類',
    openDossier: '打開股票檔案'
  }
};

const formatLabel = (val, fallback = 'Not Included') => val ? val.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase()) : fallback;

const translateDossierStatus = (value, locale) => {
  if (locale !== 'zh' || !value) return value;
  const normalized = String(value).trim().toLowerCase();
  const translations = {
    'momentum candidate': '動能候選',
    'between catalysts': '催化空窗',
    'post-earnings watch': '財報後觀察',
    'catalyst watch': '催化觀察',
    'evidence improving': '證據改善',
    stable: '穩定',
    challenged: '受挑戰',
    diverging: '走勢分歧',
    unavailable: '不可用',
    'market evidence available': '市場證據可用',
    'coverage pending': '覆蓋待補'
  };
  if (translations[normalized]) return translations[normalized];
  if (normalized.startsWith('data partial')) return value.replace('Data Partial', '資料部分齊備');
  return value;
};

export default function StockDossierIndex({ payload, onOpenTicker, locale = 'en' }) {
  const copy = DOSSIER_INDEX_COPY[locale] || DOSSIER_INDEX_COPY.en;
  const dossierRecords = useMemo(() => {
    return buildDossierRecords(payload);
  }, [payload]);

  if (!payload) return <div className="fade-in" style={{padding: '40px', color: 'var(--text-muted)'}}>{copy.waiting}</div>;

  return (
    <div className="radar-master-view fade-in">
      <div className="radar-header">
        <h2>{copy.title}</h2>
        <div className="panel-note" style={{ marginTop: '8px' }}>
          {copy.body}
        </div>
      </div>

      <div className="radar-table-container" style={{ marginTop: '24px' }}>
        <table className="radar-table stock-dossier-index-table">
          <thead>
            <tr>
              <th>{copy.ticker}</th>
              <th>{copy.sectorTheme}</th>
              <th>{copy.researchState}</th>
              <th>{copy.moveType}</th>
              <th>{copy.thesisPulse}</th>
              <th>{copy.dataCoverage}</th>
              <th>{copy.action}</th>
            </tr>
          </thead>
          <tbody>
            {dossierRecords.length === 0 ? (
              <tr>
                <td colSpan="7" style={{ textAlign: 'center', padding: '20px' }}>{copy.empty}</td>
              </tr>
            ) : (
              dossierRecords.map(rec => (
                <tr key={rec.ticker} className="radar-row" onClick={() => onOpenTicker(rec.ticker, rec.primaryEventDetail)}>
                  <td>
                    <div className="stock-dossier-index-identity">
                      <StockLogo
                        ticker={rec.ticker}
                        companyName={rec.companyName}
                        logoUrl={rec.logoUrl || rec.primaryEventDetail?.company_logo_url || rec.primaryEventDetail?.logo_url || getStockDossierProfile(rec.ticker)?.logoUrl || ''}
                        size="index"
                      />
                      <div>
                        <div style={{ fontWeight: 'bold' }}>{rec.ticker}</div>
                        <div style={{ fontSize: '0.8em', color: 'var(--text-muted)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '120px' }}>
                          {rec.companyName || copy.companyPending}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td>
                    {rec.derivedState.theme ? <span className="quality-pill">{formatLabel(rec.derivedState.theme, copy.notIncluded)}</span> : <span style={{color: 'var(--text-muted)'}}>{copy.sectorNA}</span>}
                  </td>
                  <td>
                    <span className="quality-pill" style={{ background: 'var(--bg-highlight, #f1f5f9)', color: 'var(--text-main)' }}>{translateDossierStatus(rec.derivedState.researchState, locale)}</span>
                  </td>
                  <td style={{ fontWeight: 'bold' }}>
                    {translateDossierStatus(rec.derivedState.moveType, locale)}
                  </td>
                  <td>
                    <span className={`quality-pill pulse-${rec.derivedState.pulseState.toLowerCase()}`} style={{ fontWeight: 'bold' }}>
                      {translateDossierStatus(rec.derivedState.pulseState, locale)}
                    </span>
                  </td>
                  <td>
                    {translateDossierStatus(rec.derivedState.coverage, locale)}
                  </td>
                  <td>
                    <button
                      className="action-btn"
                      style={{ fontSize: '0.85em', padding: '6px 12px', background: 'var(--surface-color)', border: '1px solid var(--border-color)', borderRadius: '4px', cursor: 'pointer' }}
                    >
                      {copy.openDossier}
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
