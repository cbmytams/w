import type { NextRequest } from "next/server";
import { getWebsiteEnv } from "@/lib/env.server";
import { requireDashboardRole } from "@/lib/apiAuth";
import { DASHBOARD_ROLES } from "@/lib/rbac";
import { enforceRateLimit, enforceSameOrigin } from "@/lib/requestSecurity";

type RouteContext = {
  params: Promise<{ path: string[] }>;
};

const METHODS_WITH_BODY = new Set(["POST", "PUT", "PATCH", "DELETE"]);
const PROXY_TIMEOUT_MS = 10_000;

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

function hasValidInternalToken(request: NextRequest) {
  const expected = process.env.INTERNAL_JOB_TOKEN?.trim();
  if (!expected) return false;

  const bearer = request.headers.get("authorization");
  if (bearer?.startsWith("Bearer ")) {
    return bearer.slice("Bearer ".length) === expected;
  }

  return request.headers.get("x-internal-job-token") === expected;
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
  return Response.json(
    {
      error: "Platform service unavailable",
      code: "SERVICE_UNAVAILABLE"
    },
    { status: 503 }
  );
}

async function handleProxy(request: NextRequest, context: RouteContext) {
  const baseUrl = resolvePlatformBaseUrl();
  if (!baseUrl) return unavailableResponse();

  const { path } = await context.params;
  if (hasUnsafePathSegment(path || [])) {
    return Response.json(
      { error: "Invalid proxy path", code: "INVALID_PATH" },
      { status: 400 }
    );
  }

  const joinedPath = (path || []).join("/");
  if (!isPathAllowed(joinedPath)) {
    return Response.json(
      { error: "Route not exposed by proxy", code: "ROUTE_NOT_ALLOWED" },
      { status: 404 }
    );
  }

  const internalTokenAuthorized = hasValidInternalToken(request);
  if (!internalTokenAuthorized) {
    const rateLimitError = enforceRateLimit(request, {
      scope: "api-v1-proxy",
      limit: 60,
      windowMs: 60 * 1000
    });
    if (rateLimitError) return rateLimitError;

    if (METHODS_WITH_BODY.has(request.method)) {
      const originError = enforceSameOrigin(request);
      if (originError) return originError;
    }

    const auth = await requireDashboardRole(request, DASHBOARD_ROLES.VIEWER);
    if (auth.response) return auth.response;
  }

  const targetUrl = `${baseUrl}/api/v1/${joinedPath}${request.nextUrl.search}`;

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), PROXY_TIMEOUT_MS);

  const init: RequestInit = {
    method: request.method,
    headers: copyRequestHeaders(request),
    redirect: "manual",
    signal: controller.signal
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
      headers
    });
  } catch {
    if (controller.signal.aborted) {
      return Response.json(
        { error: "Upstream timeout", code: "UPSTREAM_TIMEOUT" },
        { status: 504 }
      );
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
  return handleProxy(request, context);
}
