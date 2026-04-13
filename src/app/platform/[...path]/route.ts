import type { NextRequest } from "next/server";
import { requireDashboardRole } from "@/lib/apiAuth";
import { apiError } from "@/lib/api-response";
import { getWebsiteEnv } from "@/lib/env.server";
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

function resolvePlatformBaseUrl() {
  const explicit = getWebsiteEnv().platformPublicUrl?.replace(/\/+$/, "");
  if (explicit) return explicit;
  if (process.env.NODE_ENV !== "production") return "http://localhost:3001";
  return null;
}

function parseAllowlist() {
  const raw = process.env.PLATFORM_PROXY_ALLOWLIST || "";
  const parsed = raw
    .split(",")
    .map((entry) => entry.trim().replace(/^\/+|\/+$/g, ""))
    .filter(Boolean);
  return parsed.length > 0 ? parsed : ["contacts/intake"];
}

function looksLikeApiPath(path: string) {
  return path === "api" || path.startsWith("api/");
}

function normalizeApiPath(path: string) {
  const normalized = path.replace(/^\/+|\/+$/g, "");
  return normalized.replace(/^api\/v1\//, "").replace(/^api\//, "");
}

function hasUnsafePathSegment(pathSegments: string[]) {
  return pathSegments.some((segment) => segment === "." || segment === "..");
}

function isPathAllowed(joinedPath: string) {
  const normalized = normalizeApiPath(joinedPath);
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

function hasValidInternalToken(request: NextRequest) {
  const expected = process.env.INTERNAL_JOB_TOKEN?.trim();
  if (!expected) return false;

  const bearer = request.headers.get("authorization");
  if (bearer?.startsWith("Bearer ")) {
    return bearer.slice("Bearer ".length) === expected;
  }

  return request.headers.get("x-internal-job-token") === expected;
}

function isHtmlNavigation(request: NextRequest) {
  const accept = request.headers.get("accept") || "";
  return accept.includes("text/html");
}

function serviceUnavailableResponse(request: NextRequest) {
  if (
    looksLikeApiPath(request.nextUrl.pathname.replace(/^\/platform\/?/, ""))
  ) {
    return Response.json(
      {
        error: "Platform service unavailable",
        code: "SERVICE_UNAVAILABLE",
      },
      { status: 503 }
    );
  }

  if (isHtmlNavigation(request)) {
    const fallback = new URL("/platform/unavailable", request.url);
    fallback.searchParams.set(
      "target",
      request.nextUrl.pathname + request.nextUrl.search
    );
    return Response.redirect(fallback, 307);
  }

  return Response.json(
    {
      error: "Platform service unavailable",
      code: "SERVICE_UNAVAILABLE",
    },
    { status: 503 }
  );
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

async function handleProxy(request: NextRequest, context: RouteContext) {
  const baseUrl = resolvePlatformBaseUrl();
  if (!baseUrl) {
    return Response.json(
      { error: "Platform URL is not configured", code: "SERVICE_UNAVAILABLE" },
      { status: 503 }
    );
  }

  const { path } = await context.params;
  const joinedPath = (path || []).join("/");
  const isApiPath = looksLikeApiPath(joinedPath);

  if (hasUnsafePathSegment(path || [])) {
    return apiError("Invalid proxy path", {
      status: 400,
      code: "INVALID_PATH",
    });
  }

  if (isApiPath && !isPathAllowed(joinedPath)) {
    return apiError("Route not exposed by proxy", {
      status: 404,
      code: "ROUTE_NOT_ALLOWED",
    });
  }

  if (isApiPath) {
    const internalTokenAuthorized = hasValidInternalToken(request);
    if (!internalTokenAuthorized) {
      const rateLimitError = enforceRateLimit(request, {
        scope: "platform-public-proxy",
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
  }

  const targetUrl = `${baseUrl}/${joinedPath}${request.nextUrl.search}`;

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), PROXY_TIMEOUT_MS);

  const init: RequestInit = {
    method: request.method,
    headers: copyRequestHeaders(request),
    redirect: "manual",
    signal: controller.signal,
  };

  if (METHODS_WITH_BODY.has(request.method)) {
    init.body = await request.arrayBuffer();
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
    return serviceUnavailableResponse(request);
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
  const joinedPath = (path || []).join("/");
  const isApiPath = looksLikeApiPath(joinedPath);

  if (isApiPath) {
    if (hasUnsafePathSegment(path || [])) {
      return apiError("Invalid proxy path", {
        status: 400,
        code: "INVALID_PATH",
      });
    }

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

  return handleProxy(request, context);
}
