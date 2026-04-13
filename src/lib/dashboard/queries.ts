import type { DashboardFilters, KpiCard } from "./types";
import {
  normalizeRange,
  percentDelta,
  ratioPercent,
  average,
} from "./queries/utils";
import { fetchKpiRawData } from "./queries/kpi-data";

export { parseDashboardFilters } from "./queries/parse-filters";
export { getFunnelSteps } from "./queries/funnel";
export { getLeadsPage } from "./queries/leads";
export { getAuditEvents } from "./queries/audit";

export async function getOverviewKpis(
  filters: DashboardFilters,
  tenantId: string
): Promise<KpiCard[]> {
  const normalized = normalizeRange(filters.from, filters.to);

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
    interviewsPrevious,
  ] = await fetchKpiRawData(filters, tenantId);

  const avgProcessingCurrent = average(
    processingCurrent.map(
      (talent) =>
        (talent.updatedAt.getTime() - talent.createdAt.getTime()) /
        (60 * 60 * 1000)
    )
  );
  const avgProcessingPrevious = average(
    processingPrevious.map(
      (talent) =>
        (talent.updatedAt.getTime() - talent.createdAt.getTime()) /
        (60 * 60 * 1000)
    )
  );

  const completionRateCurrent = ratioPercent(
    completedResponsesCurrent,
    totalResponsesCurrent
  );
  const completionRatePrevious = ratioPercent(
    completedResponsesPrevious,
    totalResponsesPrevious
  );

  const conversionCurrent = ratioPercent(
    interviewsCurrent,
    leadsQualifiedCurrent
  );
  const conversionPrevious = ratioPercent(
    interviewsPrevious,
    leadsQualifiedPrevious
  );

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
      updatedAt,
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
      updatedAt,
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
      updatedAt,
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
      updatedAt,
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
      updatedAt,
    },
  ];
}
