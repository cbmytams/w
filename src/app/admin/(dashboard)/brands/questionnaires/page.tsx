import { BrandListClient, BrandListItem } from "./BrandListClient";
import { prisma } from "@/lib/db";
import { type QuestionValue } from "@/lib/questionnaireIntegrity";
import { computeCompletion } from "@/lib/completion";
import { BRANDS_QUESTIONNAIRE_MAP } from "@/lib/questionnaireMap";

export const dynamic = "force-dynamic";

export default async function BrandsListPage() {
  const responses = await prisma.questionnaireResponse.findMany({
    where: { type: "BRANDS" },
    orderBy: { submittedAt: "desc" },
  });

  const formattedData: BrandListItem[] = responses.map(
    (res: (typeof responses)[number]) => {
      const dataObj = res.answersJson as Record<string, QuestionValue>;
      const completion = computeCompletion(
        res.answersJson,
        BRANDS_QUESTIONNAIRE_MAP
      );

      // For Brands, company name is stored heavily in "ql_company" according to our map
      const companyName = (dataObj?.["ql_company"] as string) || "Anonyme";

      return {
        id: res.id,
        companyName,
        status: "UNKNOWN",
        updatedAt: res.submittedAt.toISOString(),
        completionPercent: completion.percent,
        missingFieldsCount: completion.missingFields.length,
      };
    }
  );

  return (
    <div className="space-y-6">
      <div className="surface-card p-6">
        <div className="text-[10px] uppercase tracking-[0.35em] text-white/25 font-medium mb-1">
          Plateforme Brands
        </div>
        <h1 className="text-lg font-semibold text-white/90">
          Réponses au Diagnostic
        </h1>
        <p className="text-sm text-white/40 mt-1">
          Vue d'ensemble des marques ayant complété ou démarré le questionnaire
          de projet.
        </p>
      </div>

      <BrandListClient data={formattedData} />
    </div>
  );
}
