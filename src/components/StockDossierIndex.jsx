import React, { useMemo } from 'react';
import { buildDossierRecords } from './dossierHelpers';
import StockLogo from './StockLogo';
import { getStockDossierProfile } from '../data/stockDossierProfiles';
import { displayLabel, frontendEmptyText, safeFrontendText } from './displayLabelHelpers.js';

const DOSSIER_INDEX_COPY = {
  en: {
    notIncluded: 'Not Included',
    waiting: 'Waiting for payload...',
    title: 'Stock Dossier',
    body: 'Active-company index with available earnings, catalyst, and market evidence attached.',
    activeCompanies: 'active companies',
    activeUniverseStale: 'Active membership refresh failed. Showing the last available active universe.',
    activeUniverseUnavailable: 'Active universe unavailable. Dossier membership cannot be verified.',
    ticker: 'Ticker',
    sectorTheme: 'Sector / Theme',
    researchState: 'Research State',
    moveType: 'Setup',
    thesisPulse: 'Thesis Pulse',
    action: 'Action',
    empty: 'No research objects available.',
    companyPending: 'Company details unavailable',
    sectorNA: 'Sector N/A',
    openDossier: 'View Dossier'
  },
  zh: {
    notIncluded: '未納入',
    waiting: '等待資料載入...',
    title: '股票檔案',
    body: '以 active 公司名單為準，附上現有財報、催化事件及市場證據。',
    activeCompanies: '個 active 公司',
    activeUniverseStale: 'Active 名單更新失敗，現正顯示上次可用名單。',
    activeUniverseUnavailable: 'Active 名單暫時不可用，未能核實股票檔案 membership。',
    ticker: '股票',
    sectorTheme: '行業 / 主題',
    researchState: '研究狀態',
    moveType: '研究設定',
    thesisPulse: '論點脈搏',
    action: '動作',
    empty: '暫無研究對象。',
    companyPending: '暫無公司資料',
    sectorNA: '行業未分類',
    openDossier: '查看股票檔案'
  }
};

const formatLabel = (val, fallback = 'Not Included', locale = 'en') => displayLabel(val, locale, fallback);

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
    'coverage pending': '資料覆蓋待補'
  };
  if (translations[normalized]) return translations[normalized];
  if (normalized.startsWith('data partial')) return locale === 'zh' ? '研究資料部分齊備' : 'Research data partially available';
  return safeFrontendText(value, locale, frontendEmptyText(locale));
};

export default function StockDossierIndex({ payload, onOpenTicker, membershipStatus = 'loading', membershipError = null, locale = 'en' }) {
  const copy = DOSSIER_INDEX_COPY[locale] || DOSSIER_INDEX_COPY.en;
  const sharedTruth = payload?.dossier_shared_truth || null;
  const hasCanonicalMembership = Boolean(sharedTruth);
  const dossierRecords = useMemo(() => {
    return buildDossierRecords(payload);
  }, [payload]);

  if (!hasCanonicalMembership && membershipStatus === 'loading') {
    return <div className="fade-in" style={{padding: '40px', color: 'var(--text-muted)'}}>{copy.waiting}</div>;
  }

  const membershipWarning = membershipStatus === 'stale'
    ? copy.activeUniverseStale
    : (!hasCanonicalMembership && (membershipStatus === 'error' || membershipError))
      ? copy.activeUniverseUnavailable
      : '';
  const emptyMessage = hasCanonicalMembership ? copy.empty : copy.activeUniverseUnavailable;

  return (
    <div className="radar-master-view fade-in">
      <div className="radar-header">
        <h2>{copy.title}</h2>
        <div className="panel-note" style={{ marginTop: '8px' }}>
          {copy.body}
        </div>
        {hasCanonicalMembership && (
          <div className="panel-note" style={{ marginTop: '6px', fontWeight: 700 }}>
            {sharedTruth.universe_count} {copy.activeCompanies}
          </div>
        )}
        {membershipWarning && (
          <div className="panel-note" role="status" style={{ marginTop: '6px', color: 'var(--text-muted)' }}>
            {membershipWarning}
          </div>
        )}
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
              <th>{copy.action}</th>
            </tr>
          </thead>
          <tbody>
            {dossierRecords.length === 0 ? (
              <tr>
                <td colSpan="6" style={{ textAlign: 'center', padding: '20px' }}>{emptyMessage}</td>
              </tr>
            ) : (
              dossierRecords.map(rec => (
                <tr key={rec.ticker} className="radar-row" onClick={() => onOpenTicker(rec.ticker, rec.primaryEventDetail)}>
                  <td data-label={copy.ticker}>
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
                  <td data-label={copy.sectorTheme}>
                    {rec.derivedState.theme ? <span className="quality-pill">{formatLabel(rec.derivedState.theme, copy.notIncluded, locale)}</span> : <span style={{color: 'var(--text-muted)'}}>{copy.sectorNA}</span>}
                  </td>
                  <td data-label={copy.researchState}>
                    <span className="quality-pill" style={{ background: 'var(--bg-highlight, #f1f5f9)', color: 'var(--text-main)' }}>{translateDossierStatus(rec.derivedState.researchState, locale)}</span>
                  </td>
                  <td data-label={copy.moveType} style={{ fontWeight: 'bold' }}>
                    {rec.derivedState.moveTypeLocalized?.[locale] || translateDossierStatus(rec.derivedState.moveType, locale)}
                  </td>
                  <td data-label={copy.thesisPulse}>
                    <span className={`quality-pill pulse-${rec.derivedState.pulseState.toLowerCase()}`} style={{ fontWeight: 'bold' }}>
                      {translateDossierStatus(rec.derivedState.pulseState, locale)}
                    </span>
                  </td>
                  <td data-label={copy.action}>
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
