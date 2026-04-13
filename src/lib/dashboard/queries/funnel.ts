import { ApprovalStatus } from "@prisma/client";
import { prisma } from "../../db";
import type { DashboardFilters, FunnelStep } from "../types";
import { normalizeRange } from "./utils";

export async function getFunnelSteps(filters: DashboardFilters, tenantId: string): Promise<FunnelStep[]> {
    const normalized = normalizeRange(filters.from, filters.to);

    const talentWhereQuery = filters.type
        ? { questionnaireResponses: { some: { type: filters.type } } }
        : {};

    const responseWhereQuery = filters.type
        ? { type: filters.type }
        : {};

    const [started, completed, qualified, interview] = await Promise.all([
        prisma.talent.count({ where: { tenantId, ...talentWhereQuery, createdAt: { gte: normalized.start, lte: normalized.end } } }),
        prisma.questionnaireResponse.count({ where: { talent: { tenantId },
                ...responseWhereQuery,
                submittedAt: { gte: normalized.start, lte: normalized.end },
                completionRate: { gte: 100 }
            } }),
        prisma.talent.count({ where: { tenantId,
                ...talentWhereQuery,
                approvalStatus: ApprovalStatus.APPROVED,
                updatedAt: { gte: normalized.start, lte: normalized.end }
            } }),
        prisma.talent.count({ where: { tenantId,
                ...talentWhereQuery,
                approvalStatus: ApprovalStatus.APPROVED,
                contacts: { some: {} },
                updatedAt: { gte: normalized.start, lte: normalized.end }
            } })
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
