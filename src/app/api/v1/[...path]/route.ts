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
  const joinedPath = (path || []).join("/");
  const targetUrl = `${baseUrl}/api/v1/${joinedPath}${request.nextUrl.search}`;

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
    return unavailableResponse();
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
