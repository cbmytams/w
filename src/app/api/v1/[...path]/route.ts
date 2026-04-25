import { timingSafeEqual } from "node:crypto";
import type { NextRequest } from "next/server";
import { apiError } from "@/lib/api-response";
import { getWebsiteEnv } from "@/lib/env.server";
import { requireDashboardRole } from "@/lib/apiAuth";
import { DASHBOARD_ROLES } from "@/lib/rbac";
import {
  enforceRateLimit,
  enforceSameOrigin,
  getAllowedOriginsForRequest,
} from "@/lib/requestSecurity";

type RouteContext = {
  params: Promise<{ path: string[] }>;
};

const METHODS_WITH_BODY = new Set(["POST", "PUT", "PATCH", "DELETE"]);
const PROXY_TIMEOUT_MS = 10_000;
const DEFAULT_PROXY_MAX_BODY_BYTES = 1_048_576;

function parseAllowlist() {
  const raw = process.env.PLATFORM_PROXY_ALLOWLIST || "";
  const parsed = raw
    .split(",")
    .map((entry) => entry.trim().replace(/^\/+|\/+$/g, ""))
    .filter(Boolean);
  return parsed.length > 0 ? parsed : ["contacts/intake"];
}

function isPathAllowed(joinedPath: string) {
  const normalized = joinedPath.replace(/^\/+|\/+$/g, "");
  const allowlist = parseAllowlist();
  if (allowlist.length === 0) return false;

  return allowlist.some((pattern) => {
    if (pattern.endsWith("/*")) {
      const prefix = pattern.slice(0, -2);
      return normalized === prefix || normalized.startsWith(`${prefix}/`);
    }
    return normalized === pattern;
  });
}

function hasUnsafePathSegment(pathSegments: string[]) {
  return pathSegments.some((segment) => segment === "." || segment === "..");
}

function safeEqual(a: string, b: string) {
  const aBuf = Buffer.from(a);
  const bBuf = Buffer.from(b);
  if (aBuf.length !== bBuf.length) return false;
  return timingSafeEqual(aBuf, bBuf);
}

function hasValidInternalToken(request: NextRequest) {
  const expected = process.env.INTERNAL_JOB_TOKEN?.trim();
  if (!expected) return false;

  const bearer = request.headers.get("authorization");
  if (bearer?.startsWith("Bearer ")) {
    return safeEqual(bearer.slice("Bearer ".length), expected);
  }

  const headerToken = request.headers.get("x-internal-job-token");
  return headerToken ? safeEqual(headerToken, expected) : false;
}

function resolvePlatformBaseUrl() {
  const explicit = getWebsiteEnv().platformPublicUrl?.replace(/\/+$/, "");
  if (explicit) return explicit;
  if (process.env.NODE_ENV !== "production") return "http://localhost:3001";
  return null;
}

function copyRequestHeaders(request: NextRequest) {
  const headers = new Headers();
  for (const [key, value] of request.headers.entries()) {
    if (
      key === "host" ||
      key === "connection" ||
      key === "content-length" ||
      key === "accept-encoding" ||
      key === "cookie" ||
      key === "authorization" ||
      key === "x-internal-job-token"
    ) {
      continue;
    }
    headers.set(key, value);
  }
  return headers;
}

function unavailableResponse() {
  return apiError("Platform service unavailable", {
    status: 503,
    code: "SERVICE_UNAVAILABLE",
  });
}

function payloadTooLargeResponse() {
  return apiError("Request body too large", {
    status: 413,
    code: "PAYLOAD_TOO_LARGE",
  });
}

function resolveProxyMaxBodyBytes() {
  const parsed = Number(process.env.PLATFORM_PROXY_MAX_BODY_BYTES);
  return Number.isFinite(parsed) && parsed > 0
    ? parsed
    : DEFAULT_PROXY_MAX_BODY_BYTES;
}

async function handleProxy(request: NextRequest, context: RouteContext) {
  const { path } = await context.params;
  if (hasUnsafePathSegment(path || [])) {
    return apiError("Invalid proxy path", {
      status: 400,
      code: "INVALID_PATH",
    });
  }

  const joinedPath = (path || []).join("/");
  if (!isPathAllowed(joinedPath)) {
    return apiError("Route not exposed by proxy", {
      status: 404,
      code: "ROUTE_NOT_ALLOWED",
    });
  }

  let body: ArrayBuffer | undefined;
  if (METHODS_WITH_BODY.has(request.method)) {
    const maxBodyBytes = resolveProxyMaxBodyBytes();
    const contentLength = Number(request.headers.get("content-length"));
    if (Number.isFinite(contentLength) && contentLength > maxBodyBytes) {
      return payloadTooLargeResponse();
    }

    body = await request.arrayBuffer();
    if (body.byteLength > maxBodyBytes) {
      return payloadTooLargeResponse();
    }
  }

  const internalTokenAuthorized = hasValidInternalToken(request);
  if (!internalTokenAuthorized) {
    const rateLimitError = await enforceRateLimit(request, {
      scope: "api-v1-proxy",
      limit: 60,
      windowMs: 60 * 1000,
    });
    if (rateLimitError) return rateLimitError;

    if (METHODS_WITH_BODY.has(request.method)) {
      const originError = enforceSameOrigin(request);
      if (originError) return originError;
    }

    const auth = await requireDashboardRole(request, DASHBOARD_ROLES.VIEWER);
    if (auth.response) return auth.response;
  }

  const baseUrl = resolvePlatformBaseUrl();
  if (!baseUrl) return unavailableResponse();
  const targetUrl = `${baseUrl}/api/v1/${joinedPath}${request.nextUrl.search}`;

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), PROXY_TIMEOUT_MS);

  const init: RequestInit = {
    method: request.method,
    headers: copyRequestHeaders(request),
    redirect: "manual",
    signal: controller.signal,
  };

  if (body) {
    init.body = body;
  }

  try {
    const upstream = await fetch(targetUrl, init);
    const headers = new Headers(upstream.headers);
    headers.delete("content-encoding");
    headers.delete("transfer-encoding");

    return new Response(upstream.body, {
      status: upstream.status,
      headers,
    });
  } catch {
    if (controller.signal.aborted) {
      return apiError("Upstream timeout", {
        status: 504,
        code: "UPSTREAM_TIMEOUT",
      });
    }
    return unavailableResponse();
  } finally {
    clearTimeout(timeout);
  }
}

export async function GET(request: NextRequest, context: RouteContext) {
  return handleProxy(request, context);
}

export async function POST(request: NextRequest, context: RouteContext) {
  return handleProxy(request, context);
}

export async function PUT(request: NextRequest, context: RouteContext) {
  return handleProxy(request, context);
}

export async function PATCH(request: NextRequest, context: RouteContext) {
  return handleProxy(request, context);
}

export async function DELETE(request: NextRequest, context: RouteContext) {
  return handleProxy(request, context);
}

export async function OPTIONS(request: NextRequest, context: RouteContext) {
  const { path } = await context.params;
  if (hasUnsafePathSegment(path || [])) {
    return apiError("Invalid proxy path", {
      status: 400,
      code: "INVALID_PATH",
    });
  }

  const joinedPath = (path || []).join("/");
  if (!isPathAllowed(joinedPath)) {
    return apiError("Route not exposed by proxy", {
      status: 404,
      code: "ROUTE_NOT_ALLOWED",
    });
  }

  const requestOrigin = request.headers.get("origin");
  const allowedOrigins = getAllowedOriginsForRequest(request);
  if (!requestOrigin || !allowedOrigins.includes(requestOrigin)) {
    return apiError("Invalid origin", 403);
  }

  const requestedHeaders = request.headers.get(
    "access-control-request-headers"
  );
  const allowHeaders = requestedHeaders || "content-type,authorization";
  const allowMethods = "GET,POST,PUT,PATCH,DELETE,OPTIONS";

  return new Response(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": requestOrigin,
      "Access-Control-Allow-Methods": allowMethods,
      "Access-Control-Allow-Headers": allowHeaders,
      "Access-Control-Max-Age": "600",
      Vary: "Origin, Access-Control-Request-Headers",
      Allow: allowMethods,
    },
  });
}
