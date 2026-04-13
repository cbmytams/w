import type { NextRequest } from "next/server";
import { apiError } from "@/lib/api-response";
import { enforceRateLimitWithUpstash } from "@/lib/rate-limit-middleware";

type RateLimitOptions = {
  scope: string;
  limit: number;
  windowMs: number;
};

function normalizeUrlOrigin(value: string | null) {
  if (!value) return null;

  try {
    return new URL(value).origin;
  } catch {
    return null;
  }
}

function splitAndTrim(value: string | null) {
  if (!value) return [];
  return value
    .split(",")
    .map((entry) => entry.trim())
    .filter(Boolean);
}

function buildExpectedOrigins(request: NextRequest) {
  const hostHeader =
    request.headers.get("x-forwarded-host") || request.headers.get("host");
  const host = hostHeader?.split(",")[0]?.trim() || null;
  const forwardedProto = request.headers.get("x-forwarded-proto");
  const currentOrigin = normalizeUrlOrigin(request.url);
  const protoFromOrigin = currentOrigin?.startsWith("https://")
    ? "https"
    : "http";
  const protocol = forwardedProto || protoFromOrigin;

  const expectedFromHost = host ? `${protocol}://${host}` : null;
  const expectedFromEnv = normalizeUrlOrigin(
    process.env.APP_URL || process.env.NEXT_PUBLIC_APP_URL || null
  );
  const extraOrigins = splitAndTrim(process.env.ALLOWED_ORIGINS || null).map(
    (entry) => normalizeUrlOrigin(entry)
  );

  return Array.from(
    new Set(
      [
        expectedFromHost,
        expectedFromEnv,
        currentOrigin,
        ...extraOrigins,
      ].filter((value): value is string => Boolean(value))
    )
  );
}

export function getAllowedOriginsForRequest(request: NextRequest) {
  return buildExpectedOrigins(request);
}

export function enforceSameOrigin(request: NextRequest) {
  const origin = normalizeUrlOrigin(request.headers.get("origin"));
  const refererOrigin = normalizeUrlOrigin(request.headers.get("referer"));
  const requestOrigin = origin || refererOrigin;

  const allowedOrigins = getAllowedOriginsForRequest(request);
  if (!requestOrigin) {
    return apiError("Missing origin", 403);
  }

  if (allowedOrigins.includes(requestOrigin)) return null;

  return apiError("Invalid origin", 403);
}

export async function enforceRateLimit(
  request: NextRequest,
  options: RateLimitOptions
) {
  return enforceRateLimitWithUpstash(request, options);
}
