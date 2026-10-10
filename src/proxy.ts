import createMiddleware from "next-intl/middleware";
import { NextRequest, NextResponse } from "next/server";
import { routing } from "./i18n/routing";

const handleI18nRouting = createMiddleware(routing);

// Routes that live outside app/[locale]: APIs, Sentry tunnel, generated images, files.
const NON_LOCALIZED =
  /^\/(api|monitoring|dev|opengraph-image|twitter-image)(\/|$)|\.[^/]+$/;

function buildDefaultCspHeader(nonce: string) {
  const scriptSource =
    process.env.NODE_ENV === "development"
      ? `script-src 'self' 'nonce-${nonce}' 'strict-dynamic' 'unsafe-eval'`
      : `script-src 'self' 'nonce-${nonce}' 'strict-dynamic'`;
  const styleElementSource =
    process.env.NODE_ENV === "development"
      ? "style-src-elem 'self' 'unsafe-inline'"
      : `style-src-elem 'self' 'nonce-${nonce}'`;

  return [
    "default-src 'self'",
    scriptSource,
    `style-src 'self' 'nonce-${nonce}'`,
    styleElementSource,
    "style-src-attr 'unsafe-inline'",
    "img-src 'self' data: https:",
    "font-src 'self'",
    "connect-src 'self' https://*.sentry.io https://*.upstash.io",
    "frame-ancestors 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    "object-src 'none'",
  ].join("; ");
}

function applySecurityHeaders(response: NextResponse, nonce: string) {
  response.headers.set("Content-Security-Policy", buildDefaultCspHeader(nonce));
  response.headers.set(
    "Strict-Transport-Security",
    "max-age=31536000; includeSubDomains; preload"
  );
  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set("X-Frame-Options", "DENY");
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  response.headers.set(
    "Permissions-Policy",
    "camera=(), microphone=(), geolocation=()"
  );
  response.headers.set("x-nonce", nonce);
  return response;
}

export default async function proxy(req: NextRequest) {
  const nonce = crypto.randomUUID();
  const requestHeaders = new Headers(req.headers);
  requestHeaders.set("x-nonce", nonce);

  const request = new NextRequest(req, { headers: requestHeaders });
  const response = NON_LOCALIZED.test(req.nextUrl.pathname)
    ? NextResponse.next({ request: { headers: requestHeaders } })
    : handleI18nRouting(request);

  return applySecurityHeaders(response, nonce);
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
