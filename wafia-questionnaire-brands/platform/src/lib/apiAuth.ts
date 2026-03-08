import type { NextRequest } from "next/server";
import { ADMIN_SESSION_COOKIE, verifyAdminSessionToken, type AdminSession } from "./authSession";
import { DASHBOARD_ROLES, canAccessDashboardRole, type DashboardRole } from "./rbac";

function unauthorizedResponse(message = "Unauthorized", status = 401) {
  return Response.json({ error: message }, { status });
}

function getAdminSessionFromRequest(request: NextRequest) {
  const raw = request.cookies.get(ADMIN_SESSION_COOKIE)?.value;
  if (!raw) return null;
  return verifyAdminSessionToken(raw);
}

type DashboardAuthResult =
  | { session: AdminSession; response: null }
  | { session: null; response: Response };

export function requireDashboardRole(
  request: NextRequest,
  minimumRole: DashboardRole = DASHBOARD_ROLES.VIEWER
): DashboardAuthResult {
  const session = getAdminSessionFromRequest(request);
  if (!session) {
    return { session: null, response: unauthorizedResponse("Unauthorized", 401) };
  }

  if (!canAccessDashboardRole(session.role, minimumRole)) {
    return { session: null, response: unauthorizedResponse("Forbidden", 403) };
  }

  return { session, response: null };
}
