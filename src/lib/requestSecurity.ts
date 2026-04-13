import type { NextRequest } from "next/server";
import { apiError } from "@/lib/api-response";

type RateLimitBucket = {
  count: number;
  resetAt: number;
};

type RateLimitResult = {
  allowed: boolean;
  retryAfterSeconds: number;
};

type RateLimitOptions = {
  scope: string;
  limit: number;
  windowMs: number;
};

const GLOBAL_STORE_KEY = "__wafiaRateLimitStore";

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

function getStore() {
  const globalState = globalThis as typeof globalThis & {
    [GLOBAL_STORE_KEY]?: Map<string, RateLimitBucket>;
  };

  if (!globalState[GLOBAL_STORE_KEY]) {
    globalState[GLOBAL_STORE_KEY] = new Map<string, RateLimitBucket>();
  }

  return globalState[GLOBAL_STORE_KEY];
}

function getClientIp(request: NextRequest) {
  const forwardedFor = request.headers.get("x-forwarded-for");
  if (forwardedFor) {
    return forwardedFor.split(",")[0]?.trim() || "unknown";
  }

  return request.headers.get("x-real-ip") || "unknown";
}

function consumeToken(
  key: string,
  limit: number,
  windowMs: number
): RateLimitResult {
  const now = Date.now();
  const store = getStore();
  const existing = store.get(key);

  if (!existing || existing.resetAt <= now) {
    store.set(key, { count: 1, resetAt: now + windowMs });
    return { allowed: true, retryAfterSeconds: 0 };
  }

  if (existing.count >= limit) {
    return {
      allowed: false,
      retryAfterSeconds: Math.max(
        1,
        Math.ceil((existing.resetAt - now) / 1000)
      ),
    };
  }

  existing.count += 1;
  store.set(key, existing);
  return { allowed: true, retryAfterSeconds: 0 };
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

export function enforceRateLimit(
  request: NextRequest,
  options: RateLimitOptions
) {
  const ip = getClientIp(request);
  const key = `${options.scope}:${ip}`;
  const result = consumeToken(key, options.limit, options.windowMs);

  if (result.allowed) return null;

  const response = apiError("Too many requests. Please retry later.", {
    status: 429,
  });
  response.headers.set("Retry-After", String(result.retryAfterSeconds));
  return response;
}
