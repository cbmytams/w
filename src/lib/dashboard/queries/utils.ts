const ONE_DAY_MS = 24 * 60 * 60 * 1000;

export function parseDate(value: string | null, fallback: Date) {
  if (!value) return fallback;
  const parsed = new Date(value);
  return Number.isNaN(parsed.getTime()) ? fallback : parsed;
}

export function asIsoDate(date: Date) {
  return date.toISOString().slice(0, 10);
}

export function normalizeRange(from: string | null, to: string | null) {
  const now = new Date();
  const fallbackFrom = new Date(now.getTime() - 30 * ONE_DAY_MS);
  const fallbackTo = now;

  const start = parseDate(from, fallbackFrom);
  const end = parseDate(to, fallbackTo);

  if (start.getTime() > end.getTime()) {
    return {
      start: end,
      end: start,
      from: asIsoDate(end),
      to: asIsoDate(start),
    };
  }

  return {
    start,
    end,
    from: asIsoDate(start),
    to: asIsoDate(end),
  };
}

export function previousRange(start: Date, end: Date) {
  const duration = end.getTime() - start.getTime();
  const previousEnd = new Date(start.getTime() - 1);
  const previousStart = new Date(previousEnd.getTime() - duration);
  return { previousStart, previousEnd };
}

export function percentDelta(current: number, previous: number) {
  if (previous === 0) {
    return current === 0 ? 0 : 100;
  }
  return Math.round(((current - previous) / previous) * 100);
}

export function ratioPercent(part: number, total: number) {
  if (!total) return 0;
  return Math.round((part / total) * 10000) / 100;
}

export function average(values: number[]) {
  if (values.length === 0) return 0;
  return (
    Math.round(
      (values.reduce((sum, value) => sum + value, 0) / values.length) * 100
    ) / 100
  );
}

export function maskEmail(email?: string | null) {
  if (!email) return "";
  const [name, domain] = email.split("@");
  if (!name || !domain) return "***";
  if (name.length <= 2) return `${name[0] || "*"}***@${domain}`;
  return `${name[0]}***${name[name.length - 1]}@${domain}`;
}

export function maskPhone(phone?: string | null) {
  if (!phone) return "";
  const normalized = phone.replace(/\s+/g, "");
  if (normalized.length <= 4) return "****";
  return `${"*".repeat(normalized.length - 4)}${normalized.slice(-4)}`;
}
