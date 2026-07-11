import React, { useEffect, useState } from 'react';
import EarningsLifecycleView from './EarningsLifecycleView';
import { fetchEarningsRadarLifecyclePayload } from '../data/payloadAdapter';
import { getNextEarningsLifecycleRefreshDelayMs } from '../data/earningsLifecycleRefreshSchedule';
import './CatalystRadar.css';

const CatalystRadarShell = ({ onOpenEventStudy, onOpenMomentum, onOpenStockDossier, locale = 'en' }) => {
  const [lifecyclePayload, setLifecyclePayload] = useState(null);
  const [lifecycleError, setLifecycleError] = useState(null);
  const [refreshError, setRefreshError] = useState(null);
  const [retryToken, setRetryToken] = useState(0);

  useEffect(() => {
    let alive = true;
    let refreshTimer = null;
    let hasPayload = false;
    setLifecyclePayload(null);
    setLifecycleError(null);
    setRefreshError(null);

    const loadLifecycle = async ({ initial = false } = {}) => {
      try {
        const data = await fetchEarningsRadarLifecyclePayload();
        if (!alive) return;
        hasPayload = true;
        setLifecyclePayload(data);
        setLifecycleError(null);
        setRefreshError(null);
      } catch (err) {
        if (!alive) return;
        const message = err instanceof Error ? err.message : 'Lifecycle data unavailable';
        if (initial || !hasPayload) setLifecycleError(message);
        else setRefreshError(message);
      }
    };

    const scheduleNextRefresh = () => {
      if (!alive) return;
      refreshTimer = window.setTimeout(async () => {
        await loadLifecycle();
        scheduleNextRefresh();
      }, getNextEarningsLifecycleRefreshDelayMs());
    };

    loadLifecycle({ initial: true }).finally(scheduleNextRefresh);

    return () => {
      alive = false;
      if (refreshTimer) window.clearTimeout(refreshTimer);
    };
  }, [retryToken]);

  if (!lifecyclePayload && !lifecycleError) {
    return <div className="radar-load-state fade-in">{locale === 'zh' ? '正在載入財報進程...' : 'Loading earnings lifecycle...'}</div>;
  }

  if (lifecycleError) {
    return (
      <div className="radar-load-state radar-load-state--error fade-in" role="alert">
        <strong>{locale === 'zh' ? '財報進程暫時無法載入' : 'Earnings lifecycle is temporarily unavailable'}</strong>
        <span>{locale === 'zh' ? '系統沒有改用舊資料，以免混淆已核實與預計日期。' : 'The product did not fall back to legacy rows, so verified and estimated dates stay separate.'}</span>
        <button type="button" onClick={() => setRetryToken((value) => value + 1)}>{locale === 'zh' ? '重新載入' : 'Retry'}</button>
      </div>
    );
  }

  return (
    <div className="catalyst-radar-shell fade-in">
      {refreshError && (
        <div className="radar-refresh-warning" role="status">
          <span>{locale === 'zh' ? '最新資料暫時未能更新，現正保留上一個可用版本。' : 'The latest refresh is delayed. The last available version remains on screen.'}</span>
          <button type="button" onClick={() => setRetryToken((value) => value + 1)}>{locale === 'zh' ? '重新載入' : 'Retry'}</button>
        </div>
      )}
      <EarningsLifecycleView
        payload={lifecyclePayload}
        locale={locale}
        onOpenEventStudy={onOpenEventStudy}
        onOpenMomentum={onOpenMomentum}
        onOpenStockDossier={onOpenStockDossier}
      />
    </div>
  );
};

export default CatalystRadarShell;
