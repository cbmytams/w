import type { NextRequest } from "next/server";
import { ApprovalStatus, Prisma, TalentStatus } from "@prisma/client";
import { z } from "zod";
import { requireDashboardRole } from "@/lib/apiAuth";
import { apiError, apiSuccess, validateBody } from "@/lib/api-response";
import { getLeadsPage, parseDashboardFilters } from "@/lib/dashboard/queries";
import { DASHBOARD_ROLES, type DashboardRole } from "@/lib/rbac";
import { prisma } from "@/lib/db";
import { enforceRateLimit, enforceSameOrigin } from "@/lib/requestSecurity";
import { isSafeRecordId } from "@/lib/questionnaireValidation";
import { logError } from "@/lib/logger";

const DashboardLeadPatchSchema = z.object({
  id: z.string().min(1),
  status: z.string().min(1),
});

export async function GET(request: NextRequest) {
  const auth = await requireDashboardRole(request);
  if (auth.response) return auth.response;

  const rateLimitError = await enforceRateLimit(request, {
    scope: "dashboard-leads-get",
    limit: 120,
    windowMs: 60 * 1000,
  });
  if (rateLimitError) return rateLimitError;

  const filters = parseDashboardFilters(request.nextUrl.searchParams);
  const cursor = request.nextUrl.searchParams.get("cursor");
  const limit = Number(request.nextUrl.searchParams.get("limit") || "20");
  const status = request.nextUrl.searchParams.get("status");
  const priority = request.nextUrl.searchParams.get("priority");

  const page = await getLeadsPage({
    filters,
    role: auth.session.role as DashboardRole,
    tenantId: auth.session.tenantId,
    cursor,
    limit,
    status,
    priority,
  });

  return apiSuccess(page);
}

export async function PATCH(request: NextRequest) {
  const originError = enforceSameOrigin(request);
  if (originError) return originError;

  const rateLimitError = await enforceRateLimit(request, {
    scope: "dashboard-leads-patch",
    limit: 60,
    windowMs: 60 * 1000,
  });
  if (rateLimitError) return rateLimitError;

  const auth = await requireDashboardRole(request, DASHBOARD_ROLES.MANAGER);
  if (auth.response) return auth.response;

  const body = await request.json().catch(() => null);
  if (!body) return apiError("Invalid JSON body");

  const validation = validateBody(DashboardLeadPatchSchema, body);
  if (!validation.success) return validation.response;

  const { id, status } = validation.data;

  if (!id || !status || !isSafeRecordId(id)) {
    return apiError("Missing id or status", 400);
  }

  const updates: { status?: TalentStatus; approvalStatus?: ApprovalStatus } =
    {};

  switch (status) {
    case "ARCHIVED":
      updates.status = TalentStatus.ARCHIVED;
      break;
    case "REJECTED":
      updates.approvalStatus = ApprovalStatus.REJECTED;
      updates.status = TalentStatus.ACTIVE;
      break;
    case "QUALIFIED":
    case "INTERVIEW":
      updates.approvalStatus = ApprovalStatus.APPROVED;
      updates.status = TalentStatus.ACTIVE;
      break;
    case "COMPLETED":
    case "IN_PROGRESS":
    case "NEW":
      updates.approvalStatus = ApprovalStatus.PENDING;
      updates.status = TalentStatus.ACTIVE;
      break;
    default:
      return apiError("Unsupported status", 400);
  }

  try {
    const updatedCount = await prisma.talent.updateMany({
      where: { id, tenantId: auth.session.tenantId },
      data: updates,
    });
    if (updatedCount.count === 0) {
      return apiError("Lead not found", 404);
    }

    const updated = await prisma.talent.findFirst({
      where: { id, tenantId: auth.session.tenantId },
      select: {
        id: true,
        status: true,
        approvalStatus: true,
        updatedAt: true,
      },
    });

    if (!updated) {
      return apiError("Lead not found", 404);
    }

    return apiSuccess({ lead: updated });
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2025"
    ) {
      return apiError("Lead not found", 404);
    }

    logError("dashboard.leads.patch_failed", error, {
      route: "/api/v1/dashboard/leads",
      leadId: id,
      tenantId: auth.session.tenantId,
      status,
    });
    return apiError("Internal Server Error", 500);
  }
}
