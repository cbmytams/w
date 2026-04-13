import { ApprovalStatus } from "@prisma/client";
import { prisma } from "../../db";
import type { DashboardFilters } from "../types";
import { previousRange, normalizeRange } from "./utils"; // we'll extract these to utils shortly

export async function fetchKpiRawData(filters: DashboardFilters, tenantId: string) {
    const normalized = normalizeRange(filters.from, filters.to);
    const { previousStart, previousEnd } = previousRange(normalized.start, normalized.end);

    const talentWhereQuery = filters.type
        ? { questionnaireResponses: { some: { type: filters.type } } }
        : {};

    const responseWhereQuery = filters.type
        ? { type: filters.type }
        : {};

    return Promise.all([
        // [0-1] leadsIncoming
        prisma.talent.count({ where: { tenantId, ...talentWhereQuery, createdAt: { gte: normalized.start, lte: normalized.end } } }),
        prisma.talent.count({ where: { tenantId, ...talentWhereQuery, createdAt: { gte: previousStart, lte: previousEnd } } }),
        // [2-3] leadsQualified
        prisma.talent.count({ where: {
                tenantId,
                ...talentWhereQuery,
                approvalStatus: ApprovalStatus.APPROVED,
                updatedAt: { gte: normalized.start, lte: normalized.end }
            } }),
        prisma.talent.count({ where: {
                tenantId,
                ...talentWhereQuery,
                approvalStatus: ApprovalStatus.APPROVED,
                updatedAt: { gte: previousStart, lte: previousEnd }
            } }),
        // [4-5] totalResponses
        prisma.questionnaireResponse.count({ where: { ...responseWhereQuery, talent: { tenantId }, submittedAt: { gte: normalized.start, lte: normalized.end } } }),
        prisma.questionnaireResponse.count({ where: { ...responseWhereQuery, talent: { tenantId }, submittedAt: { gte: previousStart, lte: previousEnd } } }),
        // [6-7] completedResponses
        prisma.questionnaireResponse.count({ where: {
                ...responseWhereQuery,
                talent: { tenantId },
                submittedAt: { gte: normalized.start, lte: normalized.end },
                completionRate: { gte: 100 }
            } }),
        prisma.questionnaireResponse.count({ where: {
                ...responseWhereQuery,
                talent: { tenantId },
                submittedAt: { gte: previousStart, lte: previousEnd },
                completionRate: { gte: 100 }
            } }),
        // [8-9] processing times
        prisma.talent.findMany({ where: {
                tenantId,
                ...talentWhereQuery,
                approvalStatus: ApprovalStatus.APPROVED,
                updatedAt: { gte: normalized.start, lte: normalized.end }
            },
            select: { createdAt: true, updatedAt: true },
            take: 5000
        }),
        prisma.talent.findMany({ where: {
                tenantId,
                ...talentWhereQuery,
                approvalStatus: ApprovalStatus.APPROVED,
                updatedAt: { gte: previousStart, lte: previousEnd }
            },
            select: { createdAt: true, updatedAt: true },
            take: 5000
        }),
        // [10-11] interviews
        prisma.talent.count({ where: {
                tenantId,
                ...talentWhereQuery,
                approvalStatus: ApprovalStatus.APPROVED,
                contacts: { some: {} },
                updatedAt: { gte: normalized.start, lte: normalized.end }
            } }),
        prisma.talent.count({ where: {
                tenantId,
                ...talentWhereQuery,
                approvalStatus: ApprovalStatus.APPROVED,
                contacts: { some: {} },
                updatedAt: { gte: previousStart, lte: previousEnd }
            } })
    ]);
}
