import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";
import {
  canAccessDashboardRole,
  DASHBOARD_ROLES,
  type DashboardRole,
} from "@/lib/rbac";

function buildDefaultCspHeader(nonce: string, allowSameOriginFrame: boolean) {
  return [
    "default-src 'self'",
    `script-src 'self' 'nonce-${nonce}' 'strict-dynamic'`,
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data: https:",
    "font-src 'self'",
    "connect-src 'self' https://*.sentry.io https://*.upstash.io",
    allowSameOriginFrame ? "frame-ancestors 'self'" : "frame-ancestors 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    "object-src 'none'",
  ].join("; ");
}

function buildQuestionnaireStaticCspHeader() {
  return [
    "default-src 'self'",
    "script-src 'self' 'unsafe-inline'",
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
    "img-src 'self' data: https:",
    "font-src 'self' https://fonts.gstatic.com data:",
    "connect-src 'self' https:",
    "frame-ancestors 'self'",
    "base-uri 'self'",
    "form-action 'self'",
    "object-src 'none'",
  ].join("; ");
}

function allowSameOriginFrame(pathname: string) {
  return (
    pathname.startsWith("/questionnaire") ||
    pathname.startsWith("/questionnaire-brands") ||
    pathname.startsWith("/questionnaire-talents")
  );
}

function isQuestionnaireStaticPath(pathname: string) {
  return (
    pathname.startsWith("/questionnaire-brands") ||
    pathname.startsWith("/questionnaire-talents")
  );
}

function applySecurityHeaders(
  response: NextResponse,
  nonce: string,
  pathname: string
) {
  const allowFrame = allowSameOriginFrame(pathname);
  const isQuestionnaireStatic = isQuestionnaireStaticPath(pathname);
  response.headers.set(
    "Content-Security-Policy",
    isQuestionnaireStatic
      ? buildQuestionnaireStaticCspHeader()
      : buildDefaultCspHeader(nonce, allowFrame)
  );
  response.headers.set(
    "Strict-Transport-Security",
    "max-age=31536000; includeSubDomains; preload"
  );
  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set("X-Frame-Options", allowFrame ? "SAMEORIGIN" : "DENY");
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  response.headers.set(
    "Permissions-Policy",
    "camera=(), microphone=(), geolocation=()"
  );
  response.headers.set("x-nonce", nonce);
  return response;
}

export function getRouteChecks(pathname: string) {
  const isQuestionnaireAdminApi =
    pathname.startsWith("/api/v1/questionnaires") &&
    pathname !== "/api/v1/questionnaires/current" &&
    pathname !== "/api/v1/questionnaires/submit";
  const isApiAdmin =
    pathname.startsWith("/api/v1/admin") ||
    pathname.startsWith("/api/v1/dashboard") ||
    isQuestionnaireAdminApi;
  const isAdminRoute =
    pathname.startsWith("/admin") && !pathname.startsWith("/admin/login");
  return { isApiAdmin, isAdminRoute };
}

export default async function proxy(req: NextRequest) {
  const nonce = crypto.randomUUID();
  const requestHeaders = new Headers(req.headers);
  requestHeaders.set("x-nonce", nonce);
  const pathname = req.nextUrl.pathname;

  const passThrough = applySecurityHeaders(
    NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    }),
    nonce,
    pathname
  );

  const { isApiAdmin, isAdminRoute } = getRouteChecks(pathname);
  if (!isApiAdmin && !isAdminRoute) {
    return passThrough;
  }

  const token = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  });

  const role = typeof token?.role === "string" ? token.role : null;
  const hasDashboardAccess = role
    ? canAccessDashboardRole(role as DashboardRole, DASHBOARD_ROLES.VIEWER)
    : false;

  if (!hasDashboardAccess) {
    if (req.nextUrl.pathname.startsWith("/api")) {
      return applySecurityHeaders(
        new NextResponse("Unauthorized", { status: 401 }),
        nonce,
        pathname
      );
    }
    return applySecurityHeaders(
      NextResponse.redirect(new URL("/admin/login", req.url)),
      nonce,
      pathname
    );
  }

  return passThrough;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
