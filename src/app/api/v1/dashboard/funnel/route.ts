import type { NextRequest } from "next/server";
import { apiSuccess } from "@/lib/api-response";
import { requireDashboardRole } from "@/lib/apiAuth";
import { getFunnelSteps, parseDashboardFilters } from "@/lib/dashboard/queries";
import { enforceRateLimit } from "@/lib/requestSecurity";

export async function GET(request: NextRequest) {
  const auth = await requireDashboardRole(request);
  if (auth.response) return auth.response;

  const rateLimitError = enforceRateLimit(request, {
    scope: "dashboard-funnel-get",
    limit: 120,
    windowMs: 60 * 1000,
  });
  if (rateLimitError) return rateLimitError;

  const filters = parseDashboardFilters(request.nextUrl.searchParams);
  const steps = await getFunnelSteps(filters, auth.session.tenantId);

  return apiSuccess({ steps, filters });
}
