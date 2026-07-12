import React, { useEffect, useRef, useState } from 'react';
import EarningsLifecycleView from './EarningsLifecycleView';
import {
  fetchEarningsPreEventReferencePayload,
  fetchEarningsRadarLifecyclePayload
} from '../data/payloadAdapter';
import { getNextEarningsLifecycleRefreshDelayMs } from '../data/earningsLifecycleRefreshSchedule';
import './CatalystRadar.css';

const CatalystRadarShell = ({ onOpenEventStudy, onOpenMomentum, onOpenStockDossier, locale = 'en' }) => {
  const [lifecyclePayload, setLifecyclePayload] = useState(null);
  const [lifecycleError, setLifecycleError] = useState(null);
  const [refreshError, setRefreshError] = useState(null);
  const [retryToken, setRetryToken] = useState(0);
  const [referenceWindow, setReferenceWindow] = useState('5y');
  const [referencePayload, setReferencePayload] = useState(null);
  const [referenceError, setReferenceError] = useState(null);
  const [referenceLoading, setReferenceLoading] = useState(true);
  const [referenceRefreshToken, setReferenceRefreshToken] = useState(0);
  const referenceCache = useRef(new Map());

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
        referenceCache.current.clear();
        setReferenceRefreshToken((value) => value + 1);
        scheduleNextRefresh();
      }, getNextEarningsLifecycleRefreshDelayMs());
    };

    loadLifecycle({ initial: true }).finally(scheduleNextRefresh);

    return () => {
      alive = false;
      if (refreshTimer) window.clearTimeout(refreshTimer);
    };
  }, [retryToken]);

  useEffect(() => {
    let alive = true;
    const cached = referenceCache.current.get(referenceWindow);
    if (cached) {
      setReferencePayload(cached);
      setReferenceError(null);
      setReferenceLoading(false);
      return () => { alive = false; };
    }
    setReferencePayload(null);
    setReferenceError(null);
    setReferenceLoading(true);
    fetchEarningsPreEventReferencePayload(referenceWindow)
      .then((data) => {
        if (!alive) return;
        referenceCache.current.set(referenceWindow, data);
        setReferencePayload(data);
        setReferenceError(null);
      })
      .catch((error) => {
        if (!alive) return;
        setReferenceError(error instanceof Error ? error.message : 'Pre-earnings history unavailable');
      })
      .finally(() => {
        if (alive) setReferenceLoading(false);
      });
    return () => { alive = false; };
  }, [referenceRefreshToken, referenceWindow]);

  const retryAll = () => {
    referenceCache.current.clear();
    setReferenceRefreshToken((value) => value + 1);
    setRetryToken((value) => value + 1);
  };

  if (!lifecyclePayload && !lifecycleError) {
    return <div className="radar-load-state fade-in">{locale === 'zh' ? '正在載入財報進程...' : 'Loading earnings lifecycle...'}</div>;
  }

  if (lifecycleError) {
    return (
      <div className="radar-load-state radar-load-state--error fade-in" role="alert">
        <strong>{locale === 'zh' ? '財報進程暫時無法載入' : 'Earnings lifecycle is temporarily unavailable'}</strong>
        <span>{locale === 'zh' ? '系統沒有改用舊資料，以免混淆已核實與預計日期。' : 'The product did not fall back to legacy rows, so verified and estimated dates stay separate.'}</span>
        <button type="button" onClick={retryAll}>{locale === 'zh' ? '重新載入' : 'Retry'}</button>
      </div>
    );
  }

  return (
    <div className="catalyst-radar-shell fade-in">
      {refreshError && (
        <div className="radar-refresh-warning" role="status">
          <span>{locale === 'zh' ? '最新資料暫時未能更新，現正保留上一個可用版本。' : 'The latest refresh is delayed. The last available version remains on screen.'}</span>
          <button type="button" onClick={retryAll}>{locale === 'zh' ? '重新載入' : 'Retry'}</button>
        </div>
      )}
      <EarningsLifecycleView
        payload={lifecyclePayload}
        referencePayload={referencePayload}
        referenceWindow={referenceWindow}
        referenceLoading={referenceLoading}
        referenceError={referenceError}
        onReferenceWindowChange={setReferenceWindow}
        locale={locale}
        onOpenEventStudy={onOpenEventStudy}
        onOpenMomentum={onOpenMomentum}
        onOpenStockDossier={onOpenStockDossier}
      />
    </div>
  );
};

export default CatalystRadarShell;
