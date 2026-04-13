import { prisma } from "../../db";
import type { DashboardFilters, LeadListPage, LeadRecord } from "../types";
import type { DashboardRole } from "../../rbac";
import { normalizeRange, maskEmail, maskPhone } from "./utils";
import { mapTalentStatus, derivePriority, deriveSlaState, allowsPii } from "./mappers";

export async function getLeadsPage(params: {
    filters: DashboardFilters;
    role: DashboardRole;
    tenantId: string;
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

    const talentWhereQuery = filters.type
        ? { questionnaireResponses: { some: { type: filters.type } } }
        : {};

    while (records.length < limit) {
        const talents = await prisma.talent.findMany({ where: { tenantId: params.tenantId,
                ...talentWhereQuery,
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
                responseId: response?.id,
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
