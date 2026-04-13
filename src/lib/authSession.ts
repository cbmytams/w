import { createHmac, timingSafeEqual } from "crypto";
import type { DashboardRole } from "./rbac";

export const ADMIN_SESSION_COOKIE = "wafia_admin_session";
const SESSION_TTL_SECONDS = 60 * 60 * 8;

export interface AdminSession {
  sub: string;
  role: DashboardRole;
  tenantSlug: string;
  exp: number;
}

interface SessionEnvelope {
  payload: string;
  signature: string;
}

function base64Url(input: string) {
  return Buffer.from(input, "utf8").toString("base64url");
}

function fromBase64Url(input: string) {
  return Buffer.from(input, "base64url").toString("utf8");
}

function getSessionSecret() {
  const secret = process.env.ADMIN_SESSION_SECRET;
  if (!secret) {
    throw new Error("ADMIN_SESSION_SECRET is required");
  }
  return secret;
}

function signPayload(payload: string) {
  return createHmac("sha256", getSessionSecret())
    .update(payload)
    .digest("base64url");
}

function parseToken(token: string): SessionEnvelope | null {
  const [payload, signature] = token.split(".");
  if (!payload || !signature) return null;
  return { payload, signature };
}

export function createAdminSessionToken(input: {
  sub: string;
  role: DashboardRole;
  tenantSlug?: string;
  ttlSeconds?: number;
}) {
  const ttl = input.ttlSeconds ?? SESSION_TTL_SECONDS;
  const session: AdminSession = {
    sub: input.sub,
    role: input.role,
    tenantSlug: input.tenantSlug || "wafia",
    exp: Math.floor(Date.now() / 1000) + ttl,
  };

  const payload = base64Url(JSON.stringify(session));
  const signature = signPayload(payload);
  return `${payload}.${signature}`;
}

export function verifyAdminSessionToken(token: string): AdminSession | null {
  const envelope = parseToken(token);
  if (!envelope) return null;

  const expectedSignature = signPayload(envelope.payload);
  const expectedBuffer = Buffer.from(expectedSignature, "utf8");
  const providedBuffer = Buffer.from(envelope.signature, "utf8");

  if (expectedBuffer.length !== providedBuffer.length) return null;
  if (!timingSafeEqual(expectedBuffer, providedBuffer)) return null;

  try {
    const decoded = fromBase64Url(envelope.payload);
    const session = JSON.parse(decoded) as AdminSession;
    if (!session?.sub || !session?.role || !session?.exp) return null;
    if (session.exp <= Math.floor(Date.now() / 1000)) return null;
    return session;
  } catch {
    return null;
  }
}

export function getAdminSessionCookieMaxAge() {
  return SESSION_TTL_SECONDS;
}
