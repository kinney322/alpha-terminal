import React, { useEffect, useState } from 'react';
import EarningsLifecycleView from './EarningsLifecycleView';
import { fetchEarningsRadarLifecyclePayload } from '../data/payloadAdapter';
import './CatalystRadar.css';

const CatalystRadarShell = ({ onOpenEventStudy, onOpenMomentum, onOpenStockDossier, locale = 'en' }) => {
  const [lifecyclePayload, setLifecyclePayload] = useState(null);
  const [lifecycleError, setLifecycleError] = useState(null);
  const [retryToken, setRetryToken] = useState(0);

  useEffect(() => {
    let alive = true;
    setLifecyclePayload(null);
    setLifecycleError(null);

    fetchEarningsRadarLifecyclePayload()
      .then((data) => {
        if (alive) setLifecyclePayload(data);
      })
      .catch((err) => {
        if (!alive) return;
        setLifecycleError(err instanceof Error ? err.message : 'Lifecycle data unavailable');
      });

    return () => {
      alive = false;
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
