import { randomUUID } from "node:crypto";

const COMBINING_MARKS_REGEX = /[\u0300-\u036f]/g;

export function normalizeLeadSlugBase(value: string) {
  return value
    .normalize("NFKD")
    .replace(COMBINING_MARKS_REGEX, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .replace(/-{2,}/g, "-");
}

export function buildLeadSlug(finalName: string, email?: string) {
  const normalizedName = finalName.trim();
  const normalizedEmail = typeof email === "string" ? email.trim() : "";
  const baseInput = normalizedName || normalizedEmail || "Inconnu";
  const baseSlug = normalizeLeadSlugBase(baseInput) || "unknown";
  const timestamp = Date.now().toString(36);
  const uniqueSuffix = randomUUID().replace(/-/g, "").slice(0, 8);
  return `${baseSlug}-${timestamp}-${uniqueSuffix}`;
}
