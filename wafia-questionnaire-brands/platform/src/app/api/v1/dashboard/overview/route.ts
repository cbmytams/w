import type { NextRequest } from "next/server";
import { requireDashboardRole } from "@/lib/apiAuth";
import {
  parseDashboardFilters,
  getOverviewKpis,
} from "@/lib/dashboard/queries";
import { enforceRateLimit } from "@/lib/requestSecurity";

export async function GET(request: NextRequest) {
  const auth = requireDashboardRole(request);
  if (auth.response) return auth.response;

  const rateLimitError = enforceRateLimit(request, {
    scope: "dashboard-overview-get",
    limit: 120,
    windowMs: 60 * 1000,
  });
  if (rateLimitError) return rateLimitError;

  const filters = parseDashboardFilters(request.nextUrl.searchParams);
  const kpis = await getOverviewKpis(filters);

  return Response.json({ kpis, filters });
}
