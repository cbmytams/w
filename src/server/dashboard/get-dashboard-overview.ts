import { prisma } from "@/lib/db";
import { getOverviewKpis, parseDashboardFilters } from "@/lib/dashboard/queries";
import type { QuestionnaireType } from "@prisma/client";

type SearchParamsInput = Record<string, string | string[] | undefined>;

function toSearchParams(input: SearchParamsInput, type: QuestionnaireType) {
  const params = new URLSearchParams();
  for (const [key, value] of Object.entries(input)) {
    if (value) params.append(key, Array.isArray(value) ? value[0] : value);
  }
  params.set("type", type);
  return params;
}

export async function getDashboardOverviewData(
  searchParamsInput: SearchParamsInput,
  type: QuestionnaireType,
  tenantId: string
) {
  const filters = parseDashboardFilters(toSearchParams(searchParamsInput, type));
  const kpis = await getOverviewKpis(filters, tenantId);

  const [recentResponses, totalEntries] = await Promise.all([
    prisma.questionnaireResponse.findMany({ where: { type, talent: { tenantId } },
      orderBy: { submittedAt: "desc" },
      take: 6,
      include: { talent: { select: { name: true } } },
    }),
    prisma.talent.count({ where: { tenantId, questionnaireResponses: { some: { type } } },
    }),
  ]);

  return {
    kpis,
    recentResponses,
    totalEntries,
  };
}
