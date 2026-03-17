import { ApprovalStatus } from "@prisma/client";
import { prisma } from "../../db";
import type { DashboardFilters } from "../types";
import { previousRange, normalizeRange } from "./utils";

export const PROCESSING_SAMPLE_LIMIT = 5000;

type ProcessingSnapshot = {
    createdAt: Date;
    updatedAt: Date;
};

export type KpiRawData = {
    leadsIncomingCurrent: number;
    leadsIncomingPrevious: number;
    leadsQualifiedCurrent: number;
    leadsQualifiedPrevious: number;
    totalResponsesCurrent: number;
    totalResponsesPrevious: number;
    completedResponsesCurrent: number;
    completedResponsesPrevious: number;
    processingCurrent: ProcessingSnapshot[];
    processingPrevious: ProcessingSnapshot[];
    interviewsCurrent: number;
    interviewsPrevious: number;
    processingSampling: {
        limit: number;
        currentTotal: number;
        previousTotal: number;
        currentTruncated: boolean;
        previousTruncated: boolean;
    };
};

export async function fetchKpiRawData(filters: DashboardFilters): Promise<KpiRawData> {
    const normalized = normalizeRange(filters.from, filters.to);
    const { previousStart, previousEnd } = previousRange(normalized.start, normalized.end);

    const talentWhereQuery = filters.type
        ? { questionnaireResponses: { some: { type: filters.type } } }
        : {};

    const responseWhereQuery = filters.type
        ? { type: filters.type }
        : {};

    const processingCurrentWhere = {
        ...talentWhereQuery,
        approvalStatus: ApprovalStatus.APPROVED,
        updatedAt: { gte: normalized.start, lte: normalized.end }
    };

    const processingPreviousWhere = {
        ...talentWhereQuery,
        approvalStatus: ApprovalStatus.APPROVED,
        updatedAt: { gte: previousStart, lte: previousEnd }
    };

    const [
        leadsIncomingCurrent,
        leadsIncomingPrevious,
        leadsQualifiedCurrent,
        leadsQualifiedPrevious,
        totalResponsesCurrent,
        totalResponsesPrevious,
        completedResponsesCurrent,
        completedResponsesPrevious,
        processingCurrentCount,
        processingPreviousCount,
        processingCurrent,
        processingPrevious,
        interviewsCurrent,
        interviewsPrevious
    ] = await Promise.all([
        prisma.talent.count({
            where: { ...talentWhereQuery, createdAt: { gte: normalized.start, lte: normalized.end } }
        }),
        prisma.talent.count({
            where: { ...talentWhereQuery, createdAt: { gte: previousStart, lte: previousEnd } }
        }),
        prisma.talent.count({
            where: {
                ...talentWhereQuery,
                approvalStatus: ApprovalStatus.APPROVED,
                updatedAt: { gte: normalized.start, lte: normalized.end }
            }
        }),
        prisma.talent.count({
            where: {
                ...talentWhereQuery,
                approvalStatus: ApprovalStatus.APPROVED,
                updatedAt: { gte: previousStart, lte: previousEnd }
            }
        }),
        prisma.questionnaireResponse.count({
            where: { ...responseWhereQuery, submittedAt: { gte: normalized.start, lte: normalized.end } }
        }),
        prisma.questionnaireResponse.count({
            where: { ...responseWhereQuery, submittedAt: { gte: previousStart, lte: previousEnd } }
        }),
        prisma.questionnaireResponse.count({
            where: {
                ...responseWhereQuery,
                submittedAt: { gte: normalized.start, lte: normalized.end },
                completionRate: { gte: 100 }
            }
        }),
        prisma.questionnaireResponse.count({
            where: {
                ...responseWhereQuery,
                submittedAt: { gte: previousStart, lte: previousEnd },
                completionRate: { gte: 100 }
            }
        }),
        prisma.talent.count({ where: processingCurrentWhere }),
        prisma.talent.count({ where: processingPreviousWhere }),
        prisma.talent.findMany({
            where: processingCurrentWhere,
            select: { createdAt: true, updatedAt: true },
            take: PROCESSING_SAMPLE_LIMIT
        }),
        prisma.talent.findMany({
            where: processingPreviousWhere,
            select: { createdAt: true, updatedAt: true },
            take: PROCESSING_SAMPLE_LIMIT
        }),
        prisma.talent.count({
            where: {
                ...talentWhereQuery,
                approvalStatus: ApprovalStatus.APPROVED,
                contacts: { some: {} },
                updatedAt: { gte: normalized.start, lte: normalized.end }
            }
        }),
        prisma.talent.count({
            where: {
                ...talentWhereQuery,
                approvalStatus: ApprovalStatus.APPROVED,
                contacts: { some: {} },
                updatedAt: { gte: previousStart, lte: previousEnd }
            }
        })
    ]);

    return {
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
        interviewsPrevious,
        processingSampling: {
            limit: PROCESSING_SAMPLE_LIMIT,
            currentTotal: processingCurrentCount,
            previousTotal: processingPreviousCount,
            currentTruncated: processingCurrentCount > PROCESSING_SAMPLE_LIMIT,
            previousTruncated: processingPreviousCount > PROCESSING_SAMPLE_LIMIT,
        }
    };
}
