import { prisma } from '@/lib/db';
import { notFound } from 'next/navigation';
import { EntityDetailLayout } from '@/components/dashboard/EntityDetailLayout';
import { SectionCard } from '@/components/questionnaire/SectionCard';
import { FieldDisplay } from '@/components/questionnaire/FieldDisplay';
import { BRANDS_QUESTIONNAIRE_MAP } from '@/lib/questionnaireMap';
import { computeCompletion } from '@/lib/completion';

export const dynamic = 'force-dynamic';

export default async function BrandDetail({ params }: { params: { id: string } }) {
    const { id } = params;

    const response = await prisma.questionnaireResponse.findUnique({
        where: { id }
    });

    if (!response || response.type !== 'BRANDS') {
        notFound();
    }

    const dataObj = response.answersJson as Record<string, any>;
    const companyName = dataObj?.['ql_company'] || 'Entreprise Anonyme';

    // Computations
    const globalCompletion = computeCompletion(response.answersJson, BRANDS_QUESTIONNAIRE_MAP);

    return (
        <EntityDetailLayout
            title={companyName}
            subtitle={`Projet soumis le ${response.submittedAt.toLocaleDateString('fr-FR')}`}
            backHref="/admin/brands/questionnaires"
            backLabel="Retour aux Marques"
            headerSlot={
                <div className="flex flex-col items-end gap-1">
                    <span className="text-3xl font-display font-bold text-questionnaire-primary">{globalCompletion.percent}%</span>
                    <span className="text-xs text-gray-400 font-medium uppercase tracking-wider">de complétion</span>
                </div>
            }
            sidebarSlot={
                <nav className="rounded-2xl bg-questionnaire-surface border border-questionnaire-muted p-6 glass-panel">
                    <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Sommaire</h4>
                    <ul className="space-y-3 max-h-[60vh] overflow-y-auto pr-2 custom-scrollbar">
                        {BRANDS_QUESTIONNAIRE_MAP.sections.map(section => {
                            // Calculate completion for this specific section
                            const mockMap = { type: 'BRANDS' as const, sections: [section] };
                            const secComp = computeCompletion(response.answersJson, mockMap);

                            return (
                                <li key={section.id}>
                                    <a href={`#${section.id}`} className="flex items-center justify-between group">
                                        <span className="text-sm text-gray-400 group-hover:text-white transition-colors truncate max-w-[180px]" title={section.label}>{section.label}</span>
                                        <span className={`text-xs font-medium ml-2 ${secComp.percent === 100 ? 'text-green-500' : 'text-questionnaire-primary'}`}>
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
            {BRANDS_QUESTIONNAIRE_MAP.sections.map(section => {
                const mockMap = { type: 'BRANDS' as const, sections: [section] };
                const secComp = computeCompletion(response.answersJson, mockMap);

                return (
                    <SectionCard
                        key={section.id}
                        id={section.id}
                        title={section.label}
                        percent={secComp.percent}
                    >
                        {section.fields.map(field => (
                            <FieldDisplay
                                key={field.key}
                                label={field.label}
                                value={dataObj[field.key]}
                                type={field.type}
                                required={field.required}
                            />
                        ))}
                    </SectionCard>
                );
            })}
        </EntityDetailLayout>
    );
}
