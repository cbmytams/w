import type { NextRequest } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/authOptions";
import { DASHBOARD_ROLES, canAccessDashboardRole, type DashboardRole } from "./rbac";

export type AdminSession = {
  id: string;
  name: string;
  role: DashboardRole;
}

const DASHBOARD_ROLE_VALUES = new Set<DashboardRole>(Object.values(DASHBOARD_ROLES));

function isDashboardRole(role: string | undefined | null): role is DashboardRole {
  if (!role) return false;
  return DASHBOARD_ROLE_VALUES.has(role as DashboardRole);
}

function unauthorizedResponse(message = "Unauthorized", status = 401) {
  return Response.json({ error: message }, { status });
}

type DashboardAuthResult =
  | { session: AdminSession; response: null }
  | { session: null; response: Response };

export async function requireDashboardRole(
  request: NextRequest,
  minimumRole: DashboardRole = DASHBOARD_ROLES.VIEWER
): Promise<DashboardAuthResult> {
  const session = await getServerSession(authOptions) as {
    user?: {
      id?: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
      role?: string;
    };
  } | null;

  if (!session?.user?.id) {
    return { session: null, response: unauthorizedResponse("Unauthorized", 401) };
  }

  const role = session.user.role;
  if (!isDashboardRole(role)) {
    return { session: null, response: unauthorizedResponse("Forbidden", 403) };
  }

  if (!canAccessDashboardRole(role, minimumRole)) {
    return { session: null, response: unauthorizedResponse("Forbidden", 403) };
  }

  return {
    session: { id: session.user.id, name: session.user.name || session.user.id, role },
    response: null
  };
}
