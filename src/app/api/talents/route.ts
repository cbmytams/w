import type { NextRequest } from "next/server";
import { requireDashboardRole } from "@/lib/apiAuth";
import { apiError, apiSuccess } from "@/lib/api-response";
import { prisma } from "@/lib/db";
import { DASHBOARD_ROLES } from "@/lib/rbac";
import { enforceRateLimit } from "@/lib/requestSecurity";

export async function GET(request: NextRequest) {
  const auth = await requireDashboardRole(request, DASHBOARD_ROLES.MANAGER);
  if (auth.response) return auth.response;

  const rateLimitError = enforceRateLimit(request, {
    scope: "platform-talents-list",
    limit: 120,
    windowMs: 60 * 1000,
  });
  if (rateLimitError) return rateLimitError;

  try {
    const talents = await prisma.talent.findMany({
      where: { tenantId: auth.session.tenantId },
      take: 10,
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        name: true,
        slug: true,
        status: true,
        approvalStatus: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return apiSuccess({ talents });
  } catch {
    return apiError("Database not configured", 500);
  }
}
