import { prisma } from "@/lib/db";
import { notFound } from "next/navigation";
import { type QuestionValue } from "@/lib/questionnaireIntegrity";
import { EntityDetailLayout } from "@/components/dashboard/EntityDetailLayout";
import { SectionCard } from "@/components/questionnaire/SectionCard";
import { FieldDisplay } from "@/components/questionnaire/FieldDisplay";
import { TALENTS_QUESTIONNAIRE_MAP } from "@/lib/questionnaireMap";
import { computeCompletion } from "@/lib/completion";

export const dynamic = "force-dynamic";

type TalentQuestionnaireDetailProps = {
  params: Promise<{ id: string }>;
};

export default async function TalentDetail({
  params,
}: TalentQuestionnaireDetailProps) {
  const { id } = await params;

  const response = await prisma.questionnaireResponse.findUnique({
    where: { id },
    include: { talent: true },
  });

  if (!response || response.type !== "TALENTS") {
    notFound();
  }

  const dataObj = response.answersJson as Record<string, QuestionValue>;
  const name = response.talent?.name || "Anonyme";

  // Computations
  const globalCompletion = computeCompletion(
    response.answersJson,
    TALENTS_QUESTIONNAIRE_MAP
  );

  return (
    <EntityDetailLayout
      title={name || "Réponse anonyme"}
      subtitle={`Diagnostic importé il y a ${Math.round((new Date().getTime() - response.submittedAt.getTime()) / (1000 * 3600 * 24))} jours`}
      backHref="/admin/talents/questionnaires"
      backLabel="Retour aux Talents"
      headerSlot={
        <div className="flex flex-col items-end gap-1">
          <span className="text-3xl font-display font-bold text-questionnaire-primary">
            {globalCompletion.percent}%
          </span>
          <span className="text-xs text-slate-400 font-medium uppercase tracking-wider">
            de complétion
          </span>
        </div>
      }
      sidebarSlot={
        <nav className="rounded-2xl bg-questionnaire-surface border border-questionnaire-muted p-6 glass-panel">
          <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
            Navigation
          </h4>
          <ul className="space-y-3">
            {TALENTS_QUESTIONNAIRE_MAP.sections.map((section) => {
              // Calculate completion for this specific section
              const mockMap = { type: "TALENTS" as const, sections: [section] };
              const secComp = computeCompletion(response.answersJson, mockMap);

              return (
                <li key={section.id}>
                  <a
                    href={`#${section.id}`}
                    className="flex items-center justify-between group"
                  >
                    <span className="text-sm text-slate-400 group-hover:text-white transition-colors">
                      {section.label}
                    </span>
                    <span
                      className={`text-xs font-medium ${secComp.percent === 100 ? "text-green-500" : "text-questionnaire-primary"}`}
                    >
                      {secComp.percent}%
                    </span>
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>
      }
    >
      {/* Dynamic Sections rendering based on the Single Source of Truth Map */}
      {TALENTS_QUESTIONNAIRE_MAP.sections.map((section) => {
        const mockMap = { type: "TALENTS" as const, sections: [section] };
        const secComp = computeCompletion(response.answersJson, mockMap);

        return (
          <SectionCard
            key={section.id}
            id={section.id}
            title={section.label}
            percent={secComp.percent}
          >
            {section.fields.map((field) => (
              <FieldDisplay
                key={field.key}
                label={field.label}
                value={dataObj[field.key]}
                type={field.type}
                required={field.required}
                questionType="TALENTS"
                fieldKey={field.key}
              />
            ))}
          </SectionCard>
        );
      })}
    </EntityDetailLayout>
  );
}
