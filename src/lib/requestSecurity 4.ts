import type { NextRequest } from "next/server";

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
const LOOPBACK_TOKENS = new Set(["loopback", "localhost"]);
const LOOPBACK_IPS = new Set(["127.0.0.1", "::1"]);

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

function parseTrustedProxies() {
  const values = splitAndTrim(process.env.TRUSTED_PROXIES || null).map((value) =>
    value.toLowerCase()
  );
  return new Set(values);
}

function sanitizeIpToken(value: string | null): string | null {
  if (!value) return null;
  const trimmed = value.trim();
  if (!trimmed) return null;

  // Drop optional IPv6 brackets and/or port suffixes.
  const noBrackets = trimmed.replace(/^\[|\]$/g, "");
  const withoutPort = noBrackets.includes(":") && noBrackets.includes(".")
    ? noBrackets.split(":")[0]
    : noBrackets;

  return withoutPort || null;
}

function isTrustedProxy(ip: string | null, trustedProxies: Set<string>) {
  if (!ip) return false;
  const token = ip.toLowerCase();
  if (trustedProxies.has(token)) return true;
  if (LOOPBACK_IPS.has(token)) {
    for (const loopbackToken of LOOPBACK_TOKENS) {
      if (trustedProxies.has(loopbackToken)) return true;
    }
  }
  return false;
}

function parseForwardedForChain(value: string | null) {
  if (!value) return [];
  return value
    .split(",")
    .map((entry) => sanitizeIpToken(entry))
    .filter((entry): entry is string => Boolean(entry));
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
  const trustedProxies = parseTrustedProxies();
  const forwardedFor = parseForwardedForChain(request.headers.get("x-forwarded-for"));

  // X-Forwarded-For is only trusted when the immediate upstream is trusted.
  if (forwardedFor.length > 0) {
    const immediateProxyIp = forwardedFor[forwardedFor.length - 1] || null;
    if (isTrustedProxy(immediateProxyIp, trustedProxies)) {
      // Rightmost is immediate proxy, so the previous value is the client.
      const clientCandidate =
        forwardedFor.length > 1 ? forwardedFor[forwardedFor.length - 2] : immediateProxyIp;
      if (clientCandidate) return clientCandidate;
    }
  }

  return "unknown";
}

function consumeToken(key: string, limit: number, windowMs: number): RateLimitResult {
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
      retryAfterSeconds: Math.max(1, Math.ceil((existing.resetAt - now) / 1000))
    };
  }

  existing.count += 1;
  store.set(key, existing);
  return { allowed: true, retryAfterSeconds: 0 };
}

export function getAllowedOriginsForRequest(request: NextRequest) {
  const hostHeader = request.headers.get("x-forwarded-host") || request.headers.get("host");
  const host = hostHeader?.split(",")[0]?.trim() || null;
  const forwardedProto = request.headers.get("x-forwarded-proto");
  const requestOrigin = normalizeUrlOrigin(request.url);
  const protoFromOrigin = requestOrigin?.startsWith("https://") ? "https" : "http";
  const protocol = forwardedProto || protoFromOrigin;

  const expectedFromHost = host ? `${protocol}://${host}` : null;
  const expectedFromEnv = normalizeUrlOrigin(
    process.env.APP_URL || process.env.NEXT_PUBLIC_APP_URL || null
  );
  const extraOrigins = splitAndTrim(process.env.ALLOWED_ORIGINS || null).map((entry) =>
    normalizeUrlOrigin(entry)
  );

  return Array.from(
    new Set(
      [expectedFromHost, expectedFromEnv, ...extraOrigins].filter(
        (value): value is string => Boolean(value)
      )
    )
  );
}

export function enforceSameOrigin(request: NextRequest) {
  const origin = normalizeUrlOrigin(request.headers.get("origin"));
  const refererOrigin = normalizeUrlOrigin(request.headers.get("referer"));
  const requestOrigin = origin || refererOrigin;

  const allowedOrigins = getAllowedOriginsForRequest(request);
  if (!requestOrigin) {
    return Response.json({ error: "Missing origin" }, { status: 403 });
  }

  if (allowedOrigins.includes(requestOrigin)) return null;

  return Response.json({ error: "Invalid origin" }, { status: 403 });
}

export function enforceRateLimit(request: NextRequest, options: RateLimitOptions) {
  const ip = getClientIp(request);
  const key = `${options.scope}:${ip}`;
  const result = consumeToken(key, options.limit, options.windowMs);

  if (result.allowed) return null;

  return Response.json(
    { error: "Too many requests. Please retry later." },
    {
      status: 429,
      headers: {
        "Retry-After": String(result.retryAfterSeconds)
      }
    }
  );
}
