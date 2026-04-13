import type { NextRequest } from "next/server";
import { apiError } from "@/lib/api-response";
import { checkRateLimit } from "@/lib/rate-limit";

type MiddlewareOptions =
  | {
      scope: string;
      kind: "default" | "auth";
    }
  | {
      scope: string;
      kind?: never;
      limit: number;
      windowMs: number;
    };

function getClientIp(request: NextRequest) {
  const forwardedFor = request.headers.get("x-forwarded-for");
  if (forwardedFor) {
    return forwardedFor.split(",")[0]?.trim() || "unknown";
  }

  return request.headers.get("x-real-ip") || "unknown";
}

function computeRetryAfterSeconds(reset: number) {
  if (!reset) return 1;
  const nowSeconds = Math.floor(Date.now() / 1000);
  return Math.max(1, reset - nowSeconds);
}

export async function enforceRateLimitWithUpstash(
  request: NextRequest,
  options: MiddlewareOptions
) {
  const ip = getClientIp(request);
  const identifier = `${options.scope}:${ip}`;
  const result = options.kind
    ? await checkRateLimit(identifier, { kind: options.kind })
    : await checkRateLimit(identifier, {
        limit: options.limit,
        windowMs: options.windowMs,
      });

  if (result.success) return null;

  const response = apiError("Too many requests. Please retry later.", {
    status: 429,
  });
  response.headers.set(
    "Retry-After",
    String(computeRetryAfterSeconds(result.reset))
  );
  response.headers.set("X-RateLimit-Limit", String(result.limit));
  response.headers.set("X-RateLimit-Remaining", String(result.remaining));
  return response;
}
