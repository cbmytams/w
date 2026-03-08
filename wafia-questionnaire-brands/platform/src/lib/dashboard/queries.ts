import { ApprovalStatus, TalentStatus } from "@prisma/client";
import { prisma } from "../db";
import { DASHBOARD_ROLES, mapPlatformRoleToDashboardRole, type DashboardRole } from "../rbac";
import type {
  AuditEvent,
  DashboardFilters,
  FunnelStep,
  KpiCard,
  LeadListPage,
  LeadPriority,
  LeadRecord,
  LeadSlaState,
  LeadWorkflowStatus
} from "./types";

const ONE_DAY_MS = 24 * 60 * 60 * 1000;

function parseDate(value: string | null, fallback: Date) {
  if (!value) return fallback;
  const parsed = new Date(value);
  return Number.isNaN(parsed.getTime()) ? fallback : parsed;
}

function asIsoDate(date: Date) {
  return date.toISOString().slice(0, 10);
}

function normalizeRange(from: string | null, to: string | null) {
  const now = new Date();
  const fallbackFrom = new Date(now.getTime() - 30 * ONE_DAY_MS);
  const fallbackTo = now;

  const start = parseDate(from, fallbackFrom);
  const end = parseDate(to, fallbackTo);

  if (start.getTime() > end.getTime()) {
    return {
      start: end,
      end: start,
      from: asIsoDate(end),
      to: asIsoDate(start)
    };
  }

  return {
    start,
    end,
    from: asIsoDate(start),
    to: asIsoDate(end)
  };
}

function previousRange(start: Date, end: Date) {
  const duration = end.getTime() - start.getTime();
  const previousEnd = new Date(start.getTime() - 1);
  const previousStart = new Date(previousEnd.getTime() - duration);
  return { previousStart, previousEnd };
}

function percentDelta(current: number, previous: number) {
  if (previous === 0) {
    return current === 0 ? 0 : 100;
  }
  return Math.round(((current - previous) / previous) * 100);
}

function ratioPercent(part: number, total: number) {
  if (!total) return 0;
  return Math.round((part / total) * 10000) / 100;
}

function average(values: number[]) {
  if (values.length === 0) return 0;
  return Math.round((values.reduce((sum, value) => sum + value, 0) / values.length) * 100) / 100;
}

function maskEmail(email?: string | null) {
  if (!email) return "";
  const [name, domain] = email.split("@");
  if (!name || !domain) return "***";
  if (name.length <= 2) return `${name[0] || "*"}***@${domain}`;
  return `${name[0]}***${name[name.length - 1]}@${domain}`;
}

function maskPhone(phone?: string | null) {
  if (!phone) return "";
  const normalized = phone.replace(/\s+/g, "");
  if (normalized.length <= 4) return "****";
  return `${"*".repeat(normalized.length - 4)}${normalized.slice(-4)}`;
}

function mapTalentStatus(input: {
  status: TalentStatus;
  approvalStatus: ApprovalStatus;
  hasInterviewSignal: boolean;
  hasAnyResponse: boolean;
  completionRate?: number | null;
}): LeadWorkflowStatus {
  if (input.status === TalentStatus.ARCHIVED) return "ARCHIVED";
  if (input.approvalStatus === ApprovalStatus.REJECTED) return "REJECTED";
  if (input.approvalStatus === ApprovalStatus.APPROVED) {
    return input.hasInterviewSignal ? "INTERVIEW" : "QUALIFIED";
  }

  if ((input.completionRate || 0) >= 100) return "COMPLETED";
  if (input.hasAnyResponse) return "IN_PROGRESS";
  return "NEW";
}

function derivePriority(createdAt: Date, status: LeadWorkflowStatus): LeadPriority {
  if (!["NEW", "IN_PROGRESS"].includes(status)) return "P3";
  const ageDays = (Date.now() - createdAt.getTime()) / ONE_DAY_MS;
  if (ageDays >= 14) return "P1";
  if (ageDays >= 7) return "P2";
  return "P3";
}

function deriveSlaState(createdAt: Date, status: LeadWorkflowStatus): LeadSlaState {
  if (!["NEW", "IN_PROGRESS"].includes(status)) return "ON_TIME";
  const ageDays = (Date.now() - createdAt.getTime()) / ONE_DAY_MS;
  if (ageDays >= 14) return "LATE";
  if (ageDays >= 7) return "AT_RISK";
  return "ON_TIME";
}

function allowsPii(role: DashboardRole) {
  return role !== DASHBOARD_ROLES.VIEWER;
}

export function parseDashboardFilters(searchParams: URLSearchParams): DashboardFilters {
  const normalized = normalizeRange(searchParams.get("from"), searchParams.get("to"));
  return {
    from: normalized.from,
    to: normalized.to,
    source: (searchParams.get("source") as DashboardFilters["source"]) || undefined,
    segment: searchParams.get("segment") || undefined,
    owner: searchParams.get("owner") || undefined,
    status: searchParams.get("status") || undefined
  };
}

export async function getOverviewKpis(filters: DashboardFilters): Promise<KpiCard[]> {
  const normalized = normalizeRange(filters.from, filters.to);
  const { previousStart, previousEnd } = previousRange(normalized.start, normalized.end);

  const [
    leadsIncomingCurrent,
    leadsIncomingPrevious,
    leadsQualifiedCurrent,
    leadsQualifiedPrevious,
    totalResponsesCurrent,
    totalResponsesPrevious,
    completedResponsesCurrent,
    completedResponsesPrevious,
    processingCurrent,
    processingPrevious,
    interviewsCurrent,
    interviewsPrevious
  ] = await Promise.all([
    prisma.talent.count({
      where: { createdAt: { gte: normalized.start, lte: normalized.end } }
    }),
    prisma.talent.count({
      where: { createdAt: { gte: previousStart, lte: previousEnd } }
    }),
    prisma.talent.count({
      where: {
        approvalStatus: ApprovalStatus.APPROVED,
        updatedAt: { gte: normalized.start, lte: normalized.end }
      }
    }),
    prisma.talent.count({
      where: {
        approvalStatus: ApprovalStatus.APPROVED,
        updatedAt: { gte: previousStart, lte: previousEnd }
      }
    }),
    prisma.questionnaireResponse.count({
      where: { submittedAt: { gte: normalized.start, lte: normalized.end } }
    }),
    prisma.questionnaireResponse.count({
      where: { submittedAt: { gte: previousStart, lte: previousEnd } }
    }),
    prisma.questionnaireResponse.count({
      where: {
        submittedAt: { gte: normalized.start, lte: normalized.end },
        completionRate: { gte: 100 }
      }
    }),
    prisma.questionnaireResponse.count({
      where: {
        submittedAt: { gte: previousStart, lte: previousEnd },
        completionRate: { gte: 100 }
      }
    }),
    prisma.talent.findMany({
      where: {
        approvalStatus: ApprovalStatus.APPROVED,
        updatedAt: { gte: normalized.start, lte: normalized.end }
      },
      select: { createdAt: true, updatedAt: true },
      take: 5000
    }),
    prisma.talent.findMany({
      where: {
        approvalStatus: ApprovalStatus.APPROVED,
        updatedAt: { gte: previousStart, lte: previousEnd }
      },
      select: { createdAt: true, updatedAt: true },
      take: 5000
    }),
    prisma.talent.count({
      where: {
        approvalStatus: ApprovalStatus.APPROVED,
        contacts: { some: {} },
        updatedAt: { gte: normalized.start, lte: normalized.end }
      }
    }),
    prisma.talent.count({
      where: {
        approvalStatus: ApprovalStatus.APPROVED,
        contacts: { some: {} },
        updatedAt: { gte: previousStart, lte: previousEnd }
      }
    })
  ]);

  const avgProcessingCurrent = average(
    processingCurrent.map((talent) => (talent.updatedAt.getTime() - talent.createdAt.getTime()) / (60 * 60 * 1000))
  );
  const avgProcessingPrevious = average(
    processingPrevious.map((talent) => (talent.updatedAt.getTime() - talent.createdAt.getTime()) / (60 * 60 * 1000))
  );

  const completionRateCurrent = ratioPercent(completedResponsesCurrent, totalResponsesCurrent);
  const completionRatePrevious = ratioPercent(completedResponsesPrevious, totalResponsesPrevious);

  const conversionCurrent = ratioPercent(interviewsCurrent, leadsQualifiedCurrent);
  const conversionPrevious = ratioPercent(interviewsPrevious, leadsQualifiedPrevious);

  const updatedAt = new Date().toISOString();
  const period = { from: normalized.from, to: normalized.to };

  return [
    {
      id: "leads_incoming",
      label: "Leads entrants",
      value: leadsIncomingCurrent,
      unit: "count",
      delta: percentDelta(leadsIncomingCurrent, leadsIncomingPrevious),
      period,
      definition: "Nombre de leads créés sur la période.",
      sourceQueryId: "kpi_overview_v1_q1",
      updatedAt
    },
    {
      id: "leads_qualified",
      label: "Leads qualifiés",
      value: leadsQualifiedCurrent,
      unit: "count",
      delta: percentDelta(leadsQualifiedCurrent, leadsQualifiedPrevious),
      period,
      definition: "Nombre de leads passés en statut QUALIFIED sur la période.",
      sourceQueryId: "kpi_overview_v1_q2",
      updatedAt
    },
    {
      id: "questionnaire_completion_rate",
      label: "Taux de complétion questionnaire",
      value: completionRateCurrent,
      unit: "%",
      delta: percentDelta(completionRateCurrent, completionRatePrevious),
      period,
      definition: "Questionnaires terminés / questionnaires démarrés.",
      sourceQueryId: "kpi_overview_v1_q3",
      updatedAt
    },
    {
      id: "avg_processing_time_hours",
      label: "Délai moyen de traitement",
      value: avgProcessingCurrent,
      unit: "h",
      delta: percentDelta(avgProcessingCurrent, avgProcessingPrevious),
      period,
      definition: "Moyenne des délais (qualifiedAt - createdAt), en heures.",
      sourceQueryId: "kpi_overview_v1_q4",
      updatedAt
    },
    {
      id: "conversion_to_interview_rate",
      label: "Conversion vers entretien",
      value: conversionCurrent,
      unit: "%",
      delta: percentDelta(conversionCurrent, conversionPrevious),
      period,
      definition: "Leads passés en entretien / leads qualifiés.",
      sourceQueryId: "kpi_overview_v1_q5",
      updatedAt
    }
  ];
}

export async function getFunnelSteps(filters: DashboardFilters): Promise<FunnelStep[]> {
  const normalized = normalizeRange(filters.from, filters.to);

  const [started, completed, qualified, interview] = await Promise.all([
    prisma.talent.count({
      where: { createdAt: { gte: normalized.start, lte: normalized.end } }
    }),
    prisma.questionnaireResponse.count({
      where: {
        submittedAt: { gte: normalized.start, lte: normalized.end },
        completionRate: { gte: 100 }
      }
    }),
    prisma.talent.count({
      where: {
        approvalStatus: ApprovalStatus.APPROVED,
        updatedAt: { gte: normalized.start, lte: normalized.end }
      }
    }),
    prisma.talent.count({
      where: {
        approvalStatus: ApprovalStatus.APPROVED,
        contacts: { some: {} },
        updatedAt: { gte: normalized.start, lte: normalized.end }
      }
    })
  ]);

  const raw = [
    { key: "started", label: "Démarrés", value: started },
    { key: "completed", label: "Terminés", value: completed },
    { key: "qualified", label: "Qualifiés", value: qualified },
    { key: "interview", label: "Entretiens", value: interview }
  ];

  return raw.map((step, index) => {
    if (index === 0) return { ...step, dropOffFromPrevious: 0 };
    const previous = raw[index - 1].value;
    const dropOff = previous === 0 ? 0 : Math.max(0, Math.round((1 - step.value / previous) * 100));
    return { ...step, dropOffFromPrevious: dropOff };
  });
}

export async function getLeadsPage(params: {
  filters: DashboardFilters;
  role: DashboardRole;
  cursor: string | null;
  limit: number;
  status?: string | null;
  priority?: string | null;
}): Promise<LeadListPage> {
  const { filters, role } = params;
  const normalized = normalizeRange(filters.from, filters.to);
  const limit = Math.min(Math.max(params.limit, 1), 100);
  const statusFilter = params.status || filters.status;
  const priorityFilter = params.priority || undefined;

  if (filters.source && filters.source !== "questionnaire") {
    return { items: [], nextCursor: null };
  }

  const batchSize = Math.min(limit * 3, 120);
  const records: LeadRecord[] = [];
  let cursor = params.cursor;
  let nextCursor: string | null = null;

  while (records.length < limit) {
    const talents = await prisma.talent.findMany({
      where: {
        createdAt: {
          gte: normalized.start,
          lte: normalized.end
        }
      },
      orderBy: { createdAt: "desc" },
      take: batchSize,
      ...(cursor ? { cursor: { id: cursor }, skip: 1 } : {}),
      include: {
        contacts: {
          take: 1,
          orderBy: { createdAt: "desc" }
        },
        questionnaireResponses: {
          take: 1,
          orderBy: { submittedAt: "desc" }
        }
      }
    });

    if (talents.length === 0) {
      nextCursor = null;
      break;
    }

    for (const talent of talents) {
      const contact = talent.contacts[0];
      const response = talent.questionnaireResponses[0];

      const status = mapTalentStatus({
        status: talent.status,
        approvalStatus: talent.approvalStatus,
        hasInterviewSignal: Boolean(contact),
        hasAnyResponse: Boolean(response),
        completionRate: response?.completionRate
      });
      const priority = derivePriority(talent.createdAt, status);
      const slaState = deriveSlaState(talent.createdAt, status);

      if (statusFilter && statusFilter !== status) continue;
      if (priorityFilter && priorityFilter !== priority) continue;

      records.push({
        id: talent.id,
        name: talent.name,
        emailMasked: maskEmail(contact?.email),
        phoneMasked: maskPhone(contact?.phone),
        email: allowsPii(role) ? (contact?.email || undefined) : undefined,
        phone: allowsPii(role) ? (contact?.phone || undefined) : undefined,
        status,
        priority,
        slaState,
        ownerId: undefined,
        createdAt: talent.createdAt.toISOString(),
        updatedAt: talent.updatedAt.toISOString()
      });

      if (records.length >= limit) break;
    }

    cursor = talents[talents.length - 1]?.id || null;
    nextCursor = talents.length < batchSize ? null : cursor;

    if (talents.length < batchSize || !cursor) break;
  }

  return {
    items: records.slice(0, limit),
    nextCursor
  };
}

export async function getAuditEvents(filters: DashboardFilters & { actor?: string; entity?: string }): Promise<AuditEvent[]> {
  const normalized = normalizeRange(filters.from, filters.to);

  const logs = await prisma.auditLog.findMany({
    where: {
      createdAt: {
        gte: normalized.start,
        lte: normalized.end
      },
      ...(filters.actor ? { actorId: filters.actor } : {}),
      ...(filters.entity ? { entity: filters.entity } : {})
    },
    orderBy: { createdAt: "desc" },
    take: 200
  });

  const actorIds = Array.from(new Set(logs.map((log) => log.actorId)));
  const users = actorIds.length
    ? await prisma.user.findMany({
      where: { id: { in: actorIds } },
      select: { id: true, role: true }
    })
    : [];

  const rolesByActor = new Map(
    users.map((user) => [user.id, mapPlatformRoleToDashboardRole(user.role)])
  );

  return logs.map((log) => ({
    id: log.id,
    actorId: log.actorId,
    actorRole: rolesByActor.get(log.actorId) || DASHBOARD_ROLES.VIEWER,
    action: log.action,
    entity: log.entity,
    entityId: log.entityId,
    createdAt: log.createdAt.toISOString(),
    diffJson: log.diffJson || undefined
  }));
}

