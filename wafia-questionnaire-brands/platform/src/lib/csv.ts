const DANGEROUS_CSV_PREFIX = /^[=+\-@\t\r]/;

function csvEscape(value: unknown) {
  if (value === null || value === undefined) return "";
  const rawValue = String(value);
  const shouldNeutralizeFormula =
    typeof value === "string" &&
    DANGEROUS_CSV_PREFIX.test(rawValue.trimStart());
  const raw = shouldNeutralizeFormula ? `'${rawValue}` : rawValue;
  if (
    raw.includes('"') ||
    raw.includes(",") ||
    raw.includes("\n") ||
    raw.includes("\r")
  ) {
    return `"${raw.replace(/"/g, '""')}"`;
  }
  return raw;
}

export function toCsv(headers: string[], rows: Array<Record<string, unknown>>) {
  const headerLine = headers.map((header) => csvEscape(header)).join(",");
  const bodyLines = rows.map((row) =>
    headers.map((header) => csvEscape(row[header])).join(",")
  );
  return [headerLine, ...bodyLines].join("\n");
}
