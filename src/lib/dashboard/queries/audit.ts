import { prisma } from "../../db";
import { DASHBOARD_ROLES, mapPlatformRoleToDashboardRole } from "../../rbac";
import type { DashboardFilters, AuditEvent } from "../types";
import { normalizeRange } from "./utils";

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
