import { TalentListClient, TalentListItem } from './TalentListClient';
import { prisma } from '@/lib/db';
import { computeCompletion } from '@/lib/completion';
import { TALENTS_QUESTIONNAIRE_MAP } from '@/lib/questionnaireMap';

export const dynamic = 'force-dynamic';

export default async function TalentsListPage() {
  const responses = await prisma.questionnaireResponse.findMany({
    where: { type: 'TALENTS' },
    include: {
      talent: true
    },
    orderBy: { submittedAt: 'desc' }
  });

  const formattedData: TalentListItem[] = responses.map((res: any) => {
    const completion = computeCompletion(res.answersJson, TALENTS_QUESTIONNAIRE_MAP);
    return {
      id: res.id,
      name: res.talent?.name || 'Anonyme',
      status: res.talent?.status || 'UNKNOWN',
      updatedAt: res.submittedAt.toISOString(),
      completionPercent: completion.percent,
      missingFieldsCount: completion.missingFields.length
    };
  });

  return (
    <div className="space-y-6">
      <div className="surface-card p-6 bg-questionnaire-surface border border-questionnaire-muted rounded-xl">
        <div className="text-xs uppercase tracking-[0.3em] text-gray-400">Plateforme Talents</div>
        <h1 className="text-2xl font-semibold mt-2 text-white">Réponses au Diagnostic</h1>
        <p className="text-sm text-gray-400 mt-2">
          Vue d'ensemble des talents ayant complété ou démarré le questionnaire d'onboarding.
        </p>
      </div>

      <TalentListClient data={formattedData} />
    </div>
  );
}
