import type { NextRequest } from "next/server";
import { ApprovalStatus, Prisma, TalentStatus } from "@prisma/client";
import { requireDashboardRole } from "@/lib/apiAuth";
import { getLeadsPage, parseDashboardFilters } from "@/lib/dashboard/queries";
import { DASHBOARD_ROLES, type DashboardRole } from "@/lib/rbac";
import { prisma } from "@/lib/db";
import { enforceRateLimit, enforceSameOrigin } from "@/lib/requestSecurity";
import { isSafeRecordId } from "@/lib/questionnaireValidation";

export async function GET(request: NextRequest) {
  const auth = await requireDashboardRole(request);
  if (auth.response) return auth.response;

  const rateLimitError = enforceRateLimit(request, {
    scope: "dashboard-leads-get",
    limit: 120,
    windowMs: 60 * 1000
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
    priority
  });

  return Response.json(page);
}

export async function PATCH(request: NextRequest) {
  const originError = enforceSameOrigin(request);
  if (originError) return originError;

  const rateLimitError = enforceRateLimit(request, {
    scope: "dashboard-leads-patch",
    limit: 60,
    windowMs: 60 * 1000
  });
  if (rateLimitError) return rateLimitError;

  const auth = await requireDashboardRole(request, DASHBOARD_ROLES.MANAGER);
  if (auth.response) return auth.response;

  const body = await request.json().catch(() => null) as
    | { id?: string; status?: string }
    | null;
  const id = body?.id;
  const status = body?.status;

  if (!id || !status || !isSafeRecordId(id)) {
    return Response.json({ error: "Missing id or status" }, { status: 400 });
  }

  const updates: { status?: TalentStatus; approvalStatus?: ApprovalStatus } = {};

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
      return Response.json({ error: "Unsupported status" }, { status: 400 });
  }

  try {
    const updatedCount = await prisma.talent.updateMany({ where: { id, tenantId: auth.session.tenantId },
      data: updates,
    });
    if (updatedCount.count === 0) {
      return Response.json({ error: "Lead not found" }, { status: 404 });
    }

    const updated = await prisma.talent.findFirst({ where: { id, tenantId: auth.session.tenantId },
      select: {
        id: true,
        status: true,
        approvalStatus: true,
        updatedAt: true
      }
    });

    if (!updated) {
      return Response.json({ error: "Lead not found" }, { status: 404 });
    }

    return Response.json({ ok: true, lead: updated });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2025") {
      return Response.json({ error: "Lead not found" }, { status: 404 });
    }

    void error;
    // TODO(logging): replace with structured logger
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
