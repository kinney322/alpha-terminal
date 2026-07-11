const TIME_ZONE = 'America/New_York';
const REFRESH_HOUR = 18;
const REFRESH_MINUTE = 30;
const WEEKDAYS = new Set([1, 2, 3, 4, 5]);

function getZonedParts(date) {
  return new Intl.DateTimeFormat('en-US', {
    timeZone: TIME_ZONE,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hourCycle: 'h23'
  }).formatToParts(date).reduce((parts, part) => {
    if (part.type !== 'literal') parts[part.type] = Number(part.value);
    return parts;
  }, {});
}

function getTimeZoneOffsetMs(date) {
  const parts = getZonedParts(date);
  return Date.UTC(parts.year, parts.month - 1, parts.day, parts.hour, parts.minute, parts.second) - date.getTime();
}

function zonedWallTimeToUtc({ year, month, day, hour, minute }) {
  const wallTimeAsUtc = Date.UTC(year, month - 1, day, hour, minute, 0);
  let utcDate = new Date(wallTimeAsUtc);
  let offsetMs = getTimeZoneOffsetMs(utcDate);
  utcDate = new Date(wallTimeAsUtc - offsetMs);
  offsetMs = getTimeZoneOffsetMs(utcDate);
  return new Date(wallTimeAsUtc - offsetMs);
}

export function getNextEarningsLifecycleRefreshAt(now = new Date()) {
  const current = getZonedParts(now);
  for (let dayOffset = 0; dayOffset <= 7; dayOffset += 1) {
    const candidateDate = new Date(Date.UTC(current.year, current.month - 1, current.day + dayOffset));
    if (!WEEKDAYS.has(candidateDate.getUTCDay())) continue;
    const candidate = zonedWallTimeToUtc({
      year: candidateDate.getUTCFullYear(),
      month: candidateDate.getUTCMonth() + 1,
      day: candidateDate.getUTCDate(),
      hour: REFRESH_HOUR,
      minute: REFRESH_MINUTE
    });
    if (candidate.getTime() > now.getTime()) return candidate;
  }
  throw new Error('Unable to resolve the next earnings lifecycle refresh');
}

export function getNextEarningsLifecycleRefreshDelayMs(now = new Date()) {
  return getNextEarningsLifecycleRefreshAt(now).getTime() - now.getTime();
}
