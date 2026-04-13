import type { NextRequest } from "next/server";
import { timingSafeEqual } from "crypto";
import { cookies } from "next/headers";
import {
  ADMIN_SESSION_COOKIE,
  createAdminSessionToken,
  getAdminSessionCookieMaxAge,
  verifyAdminSessionToken,
} from "@/lib/authSession";
import { apiError, apiSuccess, validateBody } from "@/lib/api-response";
import { DASHBOARD_ROLES, type DashboardRole } from "@/lib/rbac";
import { enforceRateLimit, enforceSameOrigin } from "@/lib/requestSecurity";
import { LoginSchema } from "@/lib/validations";

function safeEqual(a: string, b: string) {
  const left = Buffer.from(a);
  const right = Buffer.from(b);
  if (left.length !== right.length) return false;
  return timingSafeEqual(left, right);
}

const noStoreHeaders = {
  "Cache-Control": "no-store, no-cache, must-revalidate",
  Pragma: "no-cache",
  Expires: "0",
};

function getCredentialMap() {
  const map = new Map<string, { password: string; role: DashboardRole }>();

  const adminUser = process.env.ADMIN_USERNAME;
  const adminPass = process.env.ADMIN_PASSWORD;
  if (adminUser && adminPass) {
    map.set(adminUser, { password: adminPass, role: DASHBOARD_ROLES.ADMIN });
  }

  const managerUser = process.env.MANAGER_USERNAME;
  const managerPass = process.env.MANAGER_PASSWORD;
  if (managerUser && managerPass) {
    map.set(managerUser, {
      password: managerPass,
      role: DASHBOARD_ROLES.MANAGER,
    });
  }

  const viewerUser = process.env.VIEWER_USERNAME;
  const viewerPass = process.env.VIEWER_PASSWORD;
  if (viewerUser && viewerPass) {
    map.set(viewerUser, { password: viewerPass, role: DASHBOARD_ROLES.VIEWER });
  }

  return map;
}

export async function GET() {
  const cookieStore = await cookies();
  const token = cookieStore.get(ADMIN_SESSION_COOKIE)?.value;
  if (!token) {
    return apiError("Unauthorized", { status: 401 });
  }

  const session = verifyAdminSessionToken(token);
  if (!session) {
    return apiError("Unauthorized", { status: 401 });
  }

  const response = apiSuccess({
    user: {
      username: session.sub,
      role: session.role,
      tenantSlug: session.tenantSlug,
    },
  });
  for (const [key, value] of Object.entries(noStoreHeaders)) {
    response.headers.set(key, value);
  }
  return response;
}

export async function POST(request: NextRequest) {
  const originError = enforceSameOrigin(request);
  if (originError) return originError;

  const rateLimitError = await enforceRateLimit(request, {
    scope: "admin-session-login",
    limit: 8,
    windowMs: 15 * 60 * 1000,
  });
  if (rateLimitError) return rateLimitError;

  const body = await request.json().catch(() => null);
  if (!body) {
    return apiError("Invalid JSON body", 400);
  }

  const validation = validateBody(LoginSchema, body);
  if (!validation.success) return validation.response;

  const { username, password } = validation.data;

  const credentials = getCredentialMap();
  if (credentials.size === 0) {
    return apiError(
      "Authentication is not configured. Set ADMIN_USERNAME/ADMIN_PASSWORD (and optional MANAGER/VIEWER credentials).",
      503
    );
  }

  const user = credentials.get(username);

  if (!user || !safeEqual(user.password, password)) {
    return apiError("Invalid credentials", 401);
  }

  const token = createAdminSessionToken({
    sub: username,
    role: user.role,
  });

  const cookieStore = await cookies();
  cookieStore.set(ADMIN_SESSION_COOKIE, token, {
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: getAdminSessionCookieMaxAge(),
  });

  const response = apiSuccess({
    user: {
      username,
      role: user.role,
    },
  });
  for (const [key, value] of Object.entries(noStoreHeaders)) {
    response.headers.set(key, value);
  }
  return response;
}

export async function DELETE(request: NextRequest) {
  const originError = enforceSameOrigin(request);
  if (originError) return originError;

  const cookieStore = await cookies();
  cookieStore.set(ADMIN_SESSION_COOKIE, "", {
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 0,
  });
  const response = apiSuccess({ signedOut: true });
  for (const [key, value] of Object.entries(noStoreHeaders)) {
    response.headers.set(key, value);
  }
  return response;
}
