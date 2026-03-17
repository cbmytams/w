import { timingSafeEqual } from "node:crypto";
import type { NextRequest } from "next/server";
import { getWebsiteEnv } from "@/lib/env.server";
import { requireDashboardRole } from "@/lib/apiAuth";
import { DASHBOARD_ROLES } from "@/lib/rbac";
import {
  enforceRateLimit,
  enforceSameOrigin,
  getAllowedOriginsForRequest
} from "@/lib/requestSecurity";

type RouteContext = {
  params: Promise<{ path: string[] }>;
};

const METHODS_WITH_BODY = new Set(["POST", "PUT", "PATCH", "DELETE"]);
const PROXY_TIMEOUT_MS = 10_000;
const DEFAULT_MAX_PROXY_BODY_BYTES = 10 * 1024 * 1024;
const CORS_MAX_AGE_SECONDS = 600;
const CORS_METHODS = ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"];

class PayloadTooLargeError extends Error {
  constructor(message = "Request body too large") {
    super(message);
    this.name = "PayloadTooLargeError";
  }
}

function parseAllowlist() {
  const raw = process.env.PLATFORM_PROXY_ALLOWLIST || "";
  const parsed = raw
    .split(",")
    .map((entry) => entry.trim().replace(/^\/+|\/+$/g, ""))
    .filter(Boolean);
  return parsed.length > 0 ? parsed : ["contacts/intake"];
}

function parseMaxProxyBodyBytes() {
  const raw = process.env.PLATFORM_PROXY_MAX_BODY_BYTES?.trim();
  const parsed = raw ? Number.parseInt(raw, 10) : Number.NaN;
  if (Number.isFinite(parsed) && parsed > 0) return parsed;
  return DEFAULT_MAX_PROXY_BODY_BYTES;
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

function safeTokenEqual(left: string, right: string) {
  const leftBuffer = Buffer.from(left, "utf8");
  const rightBuffer = Buffer.from(right, "utf8");
  if (leftBuffer.length !== rightBuffer.length) return false;
  return timingSafeEqual(leftBuffer, rightBuffer);
}

function hasValidInternalToken(request: NextRequest) {
  const expected = process.env.INTERNAL_JOB_TOKEN?.trim();
  if (!expected) return false;

  const bearer = request.headers.get("authorization");
  if (bearer?.startsWith("Bearer ")) {
    return safeTokenEqual(bearer.slice("Bearer ".length), expected);
  }

  const headerToken = request.headers.get("x-internal-job-token");
  return headerToken ? safeTokenEqual(headerToken, expected) : false;
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

function normalizeOrigin(value: string | null) {
  if (!value) return null;
  try {
    return new URL(value).origin;
  } catch {
    return null;
  }
}

function buildPreflightHeaders(request: NextRequest, origin: string) {
  const headers = new Headers();
  headers.set("Access-Control-Allow-Origin", origin);
  headers.set("Access-Control-Allow-Methods", CORS_METHODS.join(", "));
  headers.set("Allow", CORS_METHODS.join(", "));
  headers.set("Access-Control-Allow-Credentials", "true");
  headers.set("Access-Control-Max-Age", String(CORS_MAX_AGE_SECONDS));
  headers.set("Vary", "Origin, Access-Control-Request-Headers");

  const requestedHeaders = request.headers.get("access-control-request-headers");
  headers.set(
    "Access-Control-Allow-Headers",
    requestedHeaders || "authorization, content-type"
  );

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

async function resolveJoinedPath(context: RouteContext) {
  const { path } = await context.params;
  const segments = path || [];
  if (hasUnsafePathSegment(segments)) {
    return Response.json(
      { error: "Invalid proxy path", code: "INVALID_PATH" },
      { status: 400 }
    );
  }

  const joinedPath = segments.join("/");
  if (!isPathAllowed(joinedPath)) {
    return Response.json(
      { error: "Route not exposed by proxy", code: "ROUTE_NOT_ALLOWED" },
      { status: 404 }
    );
  }

  return joinedPath;
}

async function readBoundedRequestBody(request: NextRequest, maxBytes: number) {
  const contentLength = request.headers.get("content-length");
  if (contentLength) {
    const parsedLength = Number.parseInt(contentLength, 10);
    if (Number.isFinite(parsedLength) && parsedLength > maxBytes) {
      throw new PayloadTooLargeError();
    }
  }

  if (!request.body) return undefined;

  const reader = request.body.getReader();
  const chunks: Uint8Array[] = [];
  let total = 0;

  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      if (!value) continue;

      total += value.byteLength;
      if (total > maxBytes) {
        throw new PayloadTooLargeError();
      }

      chunks.push(value);
    }
  } finally {
    reader.releaseLock();
  }

  if (chunks.length === 0) return new Uint8Array(0).buffer;

  const merged = new Uint8Array(total);
  let offset = 0;
  for (const chunk of chunks) {
    merged.set(chunk, offset);
    offset += chunk.byteLength;
  }

  return merged.buffer;
}

async function handleProxy(request: NextRequest, context: RouteContext) {
  const baseUrl = resolvePlatformBaseUrl();
  if (!baseUrl) return unavailableResponse();

  const resolvedPath = await resolveJoinedPath(context);
  if (resolvedPath instanceof Response) return resolvedPath;
  const joinedPath = resolvedPath;

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

  const maxBodyBytes = parseMaxProxyBodyBytes();

  try {
    if (METHODS_WITH_BODY.has(request.method)) {
      init.body = await readBoundedRequestBody(request, maxBodyBytes);
    }

    const upstream = await fetch(targetUrl, init);
    const headers = new Headers(upstream.headers);
    headers.delete("content-encoding");
    headers.delete("transfer-encoding");

    return new Response(upstream.body, {
      status: upstream.status,
      headers
    });
  } catch (error) {
    if (error instanceof PayloadTooLargeError) {
      return Response.json(
        { error: "Request body too large", code: "PAYLOAD_TOO_LARGE" },
        { status: 413 }
      );
    }

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
  const resolvedPath = await resolveJoinedPath(context);
  if (resolvedPath instanceof Response) return resolvedPath;

  const rawOrigin = request.headers.get("origin");
  if (!rawOrigin) {
    return new Response(null, {
      status: 204,
      headers: { Allow: CORS_METHODS.join(", ") }
    });
  }

  const origin = normalizeOrigin(rawOrigin);
  const allowedOrigins = getAllowedOriginsForRequest(request);
  if (!origin || !allowedOrigins.includes(origin)) {
    return Response.json({ error: "Invalid origin" }, { status: 403 });
  }

  return new Response(null, {
    status: 204,
    headers: buildPreflightHeaders(request, origin)
  });
}
