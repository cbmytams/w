import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import { logWarn } from "@/lib/logger";

type UpstashLimiterKind = "default" | "auth";

const upstashUrl = process.env.UPSTASH_REDIS_REST_URL;
const upstashToken = process.env.UPSTASH_REDIS_REST_TOKEN;
const hasUpstashConfig = Boolean(upstashUrl && upstashToken);

let hasWarnedMissingConfig = false;
const limiterCache = new Map<string, Ratelimit>();

const redis = hasUpstashConfig
  ? new Redis({
      url: upstashUrl!,
      token: upstashToken!,
    })
  : null;

function getWindowLabel(windowMs: number) {
  const seconds = Math.max(1, Math.ceil(windowMs / 1000));
  return `${seconds} s` as `${number} s`;
}

function createLimiter(limit: number, windowMs: number) {
  if (!redis) return null;

  return new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(limit, getWindowLabel(windowMs)),
    analytics: true,
  });
}

function getOrCreateLimiter(limit: number, windowMs: number) {
  const key = `${limit}:${windowMs}`;
  const cached = limiterCache.get(key);
  if (cached) return cached;

  const limiter = createLimiter(limit, windowMs);
  if (!limiter) return null;

  limiterCache.set(key, limiter);
  return limiter;
}

export const rateLimiter = getOrCreateLimiter(10, 10_000);
export const authRateLimiter = getOrCreateLimiter(5, 60_000);

export async function checkRateLimit(
  identifier: string,
  options:
    | { kind: UpstashLimiterKind }
    | { kind?: never; limit: number; windowMs: number }
) {
  if (!hasUpstashConfig || !redis) {
    if (!hasWarnedMissingConfig) {
      hasWarnedMissingConfig = true;
      logWarn("rate_limit.upstash_missing_config", {
        env: ["UPSTASH_REDIS_REST_URL", "UPSTASH_REDIS_REST_TOKEN"],
      });
    }
    return {
      success: true,
      limit: 0,
      remaining: 0,
      reset: 0,
      reason: "missing_config" as const,
    };
  }

  const limiter =
    "kind" in options
      ? options.kind === "auth"
        ? authRateLimiter
        : rateLimiter
      : getOrCreateLimiter(options.limit, options.windowMs);

  if (!limiter) {
    return {
      success: true,
      limit: 0,
      remaining: 0,
      reset: 0,
      reason: "limiter_unavailable" as const,
    };
  }

  try {
    const result = await limiter.limit(identifier);
    return { ...result, reason: "enforced" as const };
  } catch (error) {
    logWarn("rate_limit.upstash_check_failed", {
      identifier,
      error: error instanceof Error ? error.message : String(error),
    });
    return {
      success: true,
      limit: 0,
      remaining: 0,
      reset: 0,
      reason: "check_failed" as const,
    };
  }
}
