const COPY = {
  en: {
    title: 'Decision Brief',
    whyNow: 'Why now',
    businessEvidence: 'Business evidence',
    earningsContext: 'Earnings context',
    risk: 'Risk / contradiction',
    nextConfirmation: 'Next confirmation',
    researchState: 'Research state',
    earningsWindow: 'Earnings window',
    postEarningsReview: 'Post-earnings review',
    momentumFollowThrough: 'Momentum follow-through',
    catalystWatch: 'Catalyst watch',
    fundamentalsPending: 'Fundamentals pending',
    snapshotAvailable: (count) => `${count} snapshot${count === 1 ? '' : 's'} available`,
    fiscalPending: 'Fiscal period pending',
    earningsPending: 'Earnings identity pending',
    valuationPending: 'Valuation coverage pending',
    releaseReactionCheck: 'Release and reaction check',
    companyEvidenceCheck: 'Company evidence check',
    coveragePending: 'Coverage pending',
    partialEvidence: 'Partial evidence',
    evidenceAssembled: 'Evidence assembled',
    eventDetail: (date, timing) => `${date} · ${timing}`,
    futureEventDetail: 'Confirm the release, actual results, and canonical reaction day.',
    pastEventDetail: 'Confirm the measured reaction and whether follow-through persists.',
    momentumDetail: (rank) => rank ? `Momentum rank ${rank}; company evidence still decides the research case.` : 'Market evidence is active; company evidence still decides the research case.',
    catalystDetail: 'No shared near-term event is available; keep the research state explicit.',
    fundamentalsDetail: 'No shared fundamental snapshot is available; do not infer business quality from momentum.',
    snapshotDetail: 'Fundamental evidence exists, but valuation and completeness remain separate checks.',
    valuationDetail: 'Price action and earnings timing do not establish valuation support.',
    companyCheckDetail: 'Add current revenue, margins, cash flow, revisions, and dilution evidence.',
    stateDetail: 'Research coverage remains separate from any portfolio action.'
  },
  zh: {
    title: '決策摘要',
    whyNow: '為何現在留意',
    businessEvidence: '業務證據',
    earningsContext: '財報背景',
    risk: '風險 / 矛盾',
    nextConfirmation: '下一個確認點',
    researchState: '研究狀態',
    earningsWindow: '財報窗口',
    postEarningsReview: '財報後檢視',
    momentumFollowThrough: '動能延續',
    catalystWatch: '催化觀察',
    fundamentalsPending: '基本面覆蓋待補',
    snapshotAvailable: (count) => `已有 ${count} 份基本面快照`,
    fiscalPending: 'Fiscal period 待補',
    earningsPending: '財報身份待補',
    valuationPending: '估值覆蓋待補',
    releaseReactionCheck: '核對發布與市場反應',
    companyEvidenceCheck: '補公司層面證據',
    coveragePending: '覆蓋待補',
    partialEvidence: '部分證據齊備',
    evidenceAssembled: '證據已整理',
    eventDetail: (date, timing) => `${date} · ${timing}`,
    futureEventDetail: '核對正式發布、實際業績及 canonical reaction day。',
    pastEventDetail: '核對已量度的市場反應，以及走勢是否延續。',
    momentumDetail: (rank) => rank ? `動能排名 ${rank}；研究結論仍要由公司證據確認。` : '市場證據正在變化；研究結論仍要由公司證據確認。',
    catalystDetail: '共用資料未有近期事件，研究狀態要保持清楚。',
    fundamentalsDetail: '未有共用基本面快照，不能用動能推斷業務質素。',
    snapshotDetail: '已有基本面證據，但估值及完整程度仍要分開核對。',
    valuationDetail: '股價走勢和財報日期不能證明估值有支持。',
    companyCheckDetail: '補齊收入、利潤率、現金流、預期修訂及攤薄證據。',
    stateDetail: '研究覆蓋狀態與投資組合行動分開處理。'
  }
};

const normalizedCoverage = (value) => ['verified', 'partial', 'pending'].includes(value) ? value : 'pending';

const formatEarningsValue = (earnings, copy) => {
  if (!earnings) return copy.earningsPending;
  return `${earnings.fiscal_period || copy.fiscalPending} · ${earnings.release_date} · ${earnings.timing || 'UNKNOWN'}`;
};

export function buildDossierDecisionBrief({
  companyTruth,
  eventDetail,
  momentumRanking,
  asOfDate,
  locale = 'en'
} = {}) {
  const copy = COPY[locale] || COPY.en;
  const earnings = companyTruth?.earnings || null;
  const fundamentalCount = Number(companyTruth?.fundamental_evidence?.snapshot_count || 0);
  const eventIsFuture = Boolean(earnings?.release_date && asOfDate && earnings.release_date >= asOfDate);
  const eventIsPast = Boolean(earnings?.release_date && asOfDate && earnings.release_date < asOfDate);
  const momentumRank = Number(momentumRanking?.rank || momentumRanking?.universe_rank || 0) || null;

  let whyNowValue = copy.catalystWatch;
  let whyNowDetail = copy.catalystDetail;
  let whyNowStatus = 'pending';
  if (earnings) {
    whyNowValue = eventIsFuture ? copy.earningsWindow : copy.postEarningsReview;
    whyNowDetail = copy.eventDetail(earnings.release_date, earnings.timing || 'UNKNOWN');
    whyNowStatus = normalizedCoverage(companyTruth?.coverage?.earnings);
  } else if (momentumRanking || eventDetail?.status === 'momentum_universe') {
    whyNowValue = copy.momentumFollowThrough;
    whyNowDetail = copy.momentumDetail(momentumRank);
    whyNowStatus = 'partial';
  }

  const businessStatus = normalizedCoverage(companyTruth?.coverage?.fundamentals);
  const earningsStatus = normalizedCoverage(companyTruth?.coverage?.earnings);
  const valuationStatus = normalizedCoverage(companyTruth?.coverage?.valuation);
  const identityStatus = normalizedCoverage(companyTruth?.coverage?.identity);
  const nextValue = earnings ? copy.releaseReactionCheck : copy.companyEvidenceCheck;
  const nextDetail = earnings
    ? (eventIsFuture ? copy.futureEventDetail : eventIsPast ? copy.pastEventDetail : copy.futureEventDetail)
    : copy.companyCheckDetail;

  const stateValue = identityStatus === 'pending'
    ? copy.coveragePending
    : [businessStatus, earningsStatus, valuationStatus].every((status) => status === 'verified')
      ? copy.evidenceAssembled
      : copy.partialEvidence;

  const items = [
    { id: 'why-now', label: copy.whyNow, value: whyNowValue, detail: whyNowDetail, status: whyNowStatus },
    {
      id: 'business-evidence',
      label: copy.businessEvidence,
      value: fundamentalCount > 0 ? copy.snapshotAvailable(fundamentalCount) : copy.fundamentalsPending,
      detail: fundamentalCount > 0 ? copy.snapshotDetail : copy.fundamentalsDetail,
      status: businessStatus
    },
    {
      id: 'earnings-context',
      label: copy.earningsContext,
      value: formatEarningsValue(earnings, copy),
      detail: earnings ? copy.eventDetail(earnings.release_date, earnings.timing || 'UNKNOWN') : copy.catalystDetail,
      status: earningsStatus
    },
    {
      id: 'risk',
      label: copy.risk,
      value: copy.valuationPending,
      detail: copy.valuationDetail,
      status: valuationStatus
    },
    { id: 'next-confirmation', label: copy.nextConfirmation, value: nextValue, detail: nextDetail, status: earnings ? earningsStatus : 'pending' },
    { id: 'research-state', label: copy.researchState, value: stateValue, detail: copy.stateDetail, status: stateValue === copy.coveragePending ? 'pending' : 'partial' }
  ];

  return {
    title: copy.title,
    items
  };
}
