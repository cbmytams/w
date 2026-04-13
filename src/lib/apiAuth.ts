import type { NextRequest } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/authOptions";
import { apiError } from "@/lib/api-response";
import {
  DASHBOARD_ROLES,
  canAccessDashboardRole,
  type DashboardRole,
} from "./rbac";

export type AdminSession = {
  id: string;
  name: string;
  role: string;
  tenantId: string;
};

function unauthorizedResponse(message = "Unauthorized", status = 401) {
  return apiError(message, status);
}

type DashboardAuthResult =
  | { session: AdminSession; response: null }
  | { session: null; response: Response };

export async function requireDashboardRole(
  request: NextRequest,
  minimumRole: DashboardRole = DASHBOARD_ROLES.VIEWER
): Promise<DashboardAuthResult> {
  const session = (await getServerSession(authOptions)) as {
    user?: {
      id?: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
      role?: string;
      tenantId?: string;
    };
  } | null;

  if (!session?.user?.id) {
    return {
      session: null,
      response: unauthorizedResponse("Unauthorized", 401),
    };
  }

  const role: string = session.user.role || "VIEWER";
  const tenantId = session.user.tenantId;

  if (!canAccessDashboardRole(role as DashboardRole, minimumRole)) {
    return { session: null, response: unauthorizedResponse("Forbidden", 403) };
  }

  if (!tenantId) {
    return { session: null, response: unauthorizedResponse("Forbidden", 403) };
  }

  return {
    session: {
      id: session.user.id,
      name: session.user.name || session.user.id,
      role,
      tenantId,
    },
    response: null,
  };
}
