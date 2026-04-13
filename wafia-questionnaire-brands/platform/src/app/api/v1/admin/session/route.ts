import type { NextRequest } from "next/server";
import { timingSafeEqual } from "crypto";
import { cookies } from "next/headers";
import {
  ADMIN_SESSION_COOKIE,
  createAdminSessionToken,
  getAdminSessionCookieMaxAge,
  verifyAdminSessionToken,
} from "@/lib/authSession";
import { DASHBOARD_ROLES, type DashboardRole } from "@/lib/rbac";
import { enforceRateLimit, enforceSameOrigin } from "@/lib/requestSecurity";

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
    return Response.json(
      { error: "Unauthorized" },
      { status: 401, headers: noStoreHeaders }
    );
  }

  const session = verifyAdminSessionToken(token);
  if (!session) {
    return Response.json(
      { error: "Unauthorized" },
      { status: 401, headers: noStoreHeaders }
    );
  }

  return Response.json(
    {
      user: {
        username: session.sub,
        role: session.role,
        tenantSlug: session.tenantSlug,
      },
    },
    { headers: noStoreHeaders }
  );
}

export async function POST(request: NextRequest) {
  const originError = enforceSameOrigin(request);
  if (originError) return originError;

  const rateLimitError = enforceRateLimit(request, {
    scope: "admin-session-login",
    limit: 8,
    windowMs: 15 * 60 * 1000,
  });
  if (rateLimitError) return rateLimitError;

  const body = (await request.json().catch(() => null)) as {
    username?: string;
    password?: string;
  } | null;
  const username = body?.username?.trim();
  const password = body?.password;

  if (!username || !password) {
    return Response.json(
      { error: "Missing credentials" },
      { status: 400, headers: noStoreHeaders }
    );
  }

  const credentials = getCredentialMap();
  if (credentials.size === 0) {
    return Response.json(
      {
        error:
          "Authentication is not configured. Set ADMIN_USERNAME/ADMIN_PASSWORD (and optional MANAGER/VIEWER credentials).",
      },
      { status: 503, headers: noStoreHeaders }
    );
  }

  const user = credentials.get(username);

  if (!user || !safeEqual(user.password, password)) {
    return Response.json(
      { error: "Invalid credentials" },
      { status: 401, headers: noStoreHeaders }
    );
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

  return Response.json(
    {
      user: {
        username,
        role: user.role,
      },
    },
    { headers: noStoreHeaders }
  );
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
  return Response.json({ ok: true }, { headers: noStoreHeaders });
}
