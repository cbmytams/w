import type { NextRequest } from "next/server";
import { getWebsiteEnv } from "@/lib/env.server";

type RouteContext = {
  params: Promise<{ path: string[] }>;
};

const METHODS_WITH_BODY = new Set(["POST", "PUT", "PATCH", "DELETE"]);

function resolvePlatformBaseUrl() {
  const explicit = getWebsiteEnv().platformPublicUrl?.replace(/\/+$/, "");
  if (explicit) return explicit;
  if (process.env.NODE_ENV !== "production") return "http://localhost:3001";
  return null;
}

function looksLikeApiPath(path: string) {
  return path.startsWith("api/");
}

function isHtmlNavigation(request: NextRequest) {
  const accept = request.headers.get("accept") || "";
  return accept.includes("text/html");
}

function serviceUnavailableResponse(request: NextRequest) {
  if (looksLikeApiPath(request.nextUrl.pathname.replace(/^\/platform\/?/, ""))) {
    return Response.json(
      {
        error: "Platform service unavailable",
        code: "SERVICE_UNAVAILABLE"
      },
      { status: 503 }
    );
  }

  if (isHtmlNavigation(request)) {
    const fallback = new URL("/platform/unavailable", request.url);
    fallback.searchParams.set("target", request.nextUrl.pathname + request.nextUrl.search);
    return Response.redirect(fallback, 307);
  }

  return Response.json(
    {
      error: "Platform service unavailable",
      code: "SERVICE_UNAVAILABLE"
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
      key === "accept-encoding"
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
  const targetUrl = `${baseUrl}/${joinedPath}${request.nextUrl.search}`;

  const init: RequestInit = {
    method: request.method,
    headers: copyRequestHeaders(request),
    redirect: "manual"
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
    return serviceUnavailableResponse(request);
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
