import { BrandListClient, BrandListItem } from './BrandListClient';
import { prisma } from '@/lib/db';
import { computeCompletion } from '@/lib/completion';
import { BRANDS_QUESTIONNAIRE_MAP } from '@/lib/questionnaireMap';

export const dynamic = 'force-dynamic';

export default async function BrandsListPage() {
  const responses = await prisma.questionnaireResponse.findMany({
    where: { type: 'BRANDS' },
    orderBy: { submittedAt: 'desc' }
  });

  const formattedData: BrandListItem[] = responses.map((res: any) => {
    const dataObj = res.answersJson as Record<string, any>;
    const completion = computeCompletion(res.answersJson, BRANDS_QUESTIONNAIRE_MAP);

    // For Brands, company name is stored heavily in "ql_company" according to our map
    const companyName = dataObj?.['ql_company'] || 'Anonyme';

    return {
      id: res.id,
      companyName,
      status: 'UNKNOWN',
      updatedAt: res.submittedAt.toISOString(),
      completionPercent: completion.percent,
      missingFieldsCount: completion.missingFields.length
    };
  });

  return (
    <div className="space-y-6">
      <div className="surface-card p-6 bg-questionnaire-surface border border-questionnaire-muted rounded-xl">
        <div className="text-xs uppercase tracking-[0.3em] text-gray-400">Plateforme Brands</div>
        <h1 className="text-2xl font-semibold mt-2 text-white">Réponses au Diagnostic</h1>
        <p className="text-sm text-gray-400 mt-2">
          Vue d'ensemble des marques ayant complété ou démarré le questionnaire de projet.
        </p>
      </div>

      <BrandListClient data={formattedData} />
    </div>
  );
}
