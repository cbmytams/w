import { ApprovalStatus, TalentStatus } from "@prisma/client";
import { DASHBOARD_ROLES, type DashboardRole } from "../../rbac";
import type { LeadPriority, LeadSlaState, LeadWorkflowStatus } from "../types";

const ONE_DAY_MS = 24 * 60 * 60 * 1000;

export function mapTalentStatus(input: {
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

export function derivePriority(createdAt: Date, status: LeadWorkflowStatus): LeadPriority {
    if (!["NEW", "IN_PROGRESS"].includes(status)) return "P3";
    const ageDays = (Date.now() - createdAt.getTime()) / ONE_DAY_MS;
    if (ageDays >= 14) return "P1";
    if (ageDays >= 7) return "P2";
    return "P3";
}

export function deriveSlaState(createdAt: Date, status: LeadWorkflowStatus): LeadSlaState {
    if (!["NEW", "IN_PROGRESS"].includes(status)) return "ON_TIME";
    const ageDays = (Date.now() - createdAt.getTime()) / ONE_DAY_MS;
    if (ageDays >= 14) return "LATE";
    if (ageDays >= 7) return "AT_RISK";
    return "ON_TIME";
}

export function allowsPii(role: DashboardRole) {
    return role !== DASHBOARD_ROLES.VIEWER;
}
