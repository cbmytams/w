import type { NextRequest } from "next/server";
import { apiSuccess } from "@/lib/api-response";
import { requireDashboardRole } from "@/lib/apiAuth";
import { getAuditEvents, parseDashboardFilters } from "@/lib/dashboard/queries";
import { DASHBOARD_ROLES } from "@/lib/rbac";
import { enforceRateLimit } from "@/lib/requestSecurity";

export async function GET(request: NextRequest) {
  const auth = await requireDashboardRole(request, DASHBOARD_ROLES.MANAGER);
  if (auth.response) return auth.response;

  const rateLimitError = enforceRateLimit(request, {
    scope: "dashboard-audit-get",
    limit: 60,
    windowMs: 60 * 1000,
  });
  if (rateLimitError) return rateLimitError;

  const baseFilters = parseDashboardFilters(request.nextUrl.searchParams);
  const actor = request.nextUrl.searchParams.get("actor") || undefined;
  const entity = request.nextUrl.searchParams.get("entity") || undefined;
  const events = await getAuditEvents({
    ...baseFilters,
    actor,
    entity,
    tenantId: auth.session.tenantId,
  });

  return apiSuccess({ events, filters: { ...baseFilters, actor, entity } });
}
