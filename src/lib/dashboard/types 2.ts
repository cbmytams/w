import type { DashboardRole } from "../rbac";

export type DashboardSource = "questionnaire" | "manual" | "import";

export interface DashboardFilters {
  from: string;
  to: string;
  source?: DashboardSource;
  segment?: string;
  owner?: string;
  status?: string;
  type?: "TALENTS" | "BRANDS";
}

export interface KpiSamplingMetadata {
  limit: number;
  currentTotal: number;
  previousTotal: number;
  currentTruncated: boolean;
  previousTruncated: boolean;
}

export interface KpiCard {
  id:
  | "leads_incoming"
  | "leads_qualified"
  | "questionnaire_completion_rate"
  | "avg_processing_time_hours"
  | "conversion_to_interview_rate";
  label: string;
  value: number;
  unit?: "%" | "h" | "count";
  delta: number;
  period: { from: string; to: string };
  definition: string;
  sourceQueryId: string;
  updatedAt: string;
  metadata?: {
    sampling?: KpiSamplingMetadata;
  };
}

export interface FunnelStep {
  key: string;
  label: string;
  value: number;
  dropOffFromPrevious: number;
}

export type LeadWorkflowStatus =
  | "NEW"
  | "IN_PROGRESS"
  | "COMPLETED"
  | "QUALIFIED"
  | "INTERVIEW"
  | "REJECTED"
  | "ARCHIVED";

export type LeadPriority = "P1" | "P2" | "P3";
export type LeadSlaState = "ON_TIME" | "AT_RISK" | "LATE";

export interface LeadRecord {
  id: string;
  name: string;
  emailMasked: string;
  phoneMasked: string;
  email?: string;
  phone?: string;
  status: LeadWorkflowStatus;
  priority: LeadPriority;
  slaState: LeadSlaState;
  ownerId?: string;
  responseId?: string;
  createdAt: string;
  updatedAt: string;
}

export interface LeadListPage {
  items: LeadRecord[];
  nextCursor: string | null;
}

export interface AuditEvent {
  id: string;
  actorId: string;
  actorRole: DashboardRole;
  action: string;
  entity: string;
  entityId: string;
  createdAt: string;
  diffJson?: unknown;
}
