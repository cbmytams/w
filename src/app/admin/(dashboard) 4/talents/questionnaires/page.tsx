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

  const formattedData: TalentListItem[] = responses.map((res: typeof responses[number]) => {
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
      <div className="surface-card p-6">
        <div className="text-[10px] uppercase tracking-[0.35em] text-white/25 font-medium mb-1">Plateforme Talents</div>
        <h1 className="text-lg font-semibold text-white/90">Réponses au Diagnostic</h1>
        <p className="text-sm text-white/40 mt-1">
          Vue d'ensemble des talents ayant complété ou démarré le questionnaire d'onboarding.
        </p>
      </div>

      <TalentListClient data={formattedData} />
    </div>
  );
}
