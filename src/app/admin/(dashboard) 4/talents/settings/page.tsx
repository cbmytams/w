import { prisma } from "@/lib/db";
import { TALENTS_QUESTIONNAIRE_MAP } from "@/lib/questionnaireMap";
import { CheckCircle, Database, FileText, Shield } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function TalentsSettingsPage() {
  const totalResponses = await prisma.questionnaireResponse.count({ where: { type: "TALENTS" } });
  const totalTalents = await prisma.talent.count({
    where: { questionnaireResponses: { some: { type: "TALENTS" } } },
  });
  const questionnaire = await prisma.questionnaire.findFirst({ where: { type: "TALENTS" } });

  const totalSections = TALENTS_QUESTIONNAIRE_MAP.sections.length;
  const totalFields = TALENTS_QUESTIONNAIRE_MAP.sections.reduce((s, sec) => s + sec.fields.length, 0);
  const requiredFields = TALENTS_QUESTIONNAIRE_MAP.sections.reduce((s, sec) => s + sec.fields.filter((f) => f.required).length, 0);

  const stats = [
    { icon: FileText, color: "text-orange-400", bg: "bg-orange-500/10", label: "Réponses", value: totalResponses },
    { icon: Shield, color: "text-blue-400", bg: "bg-blue-500/10", label: "Talents", value: totalTalents },
    { icon: Database, color: "text-violet-400", bg: "bg-violet-500/10", label: "Sections", value: totalSections },
    { icon: CheckCircle, color: "text-emerald-400", bg: "bg-emerald-500/10", label: "Champs requis", value: requiredFields },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="surface-card p-6">
        <div className="text-[10px] uppercase tracking-[0.35em] text-white/25 font-medium mb-1">Configuration</div>
        <h1 className="text-lg font-semibold text-white/90">Questionnaire Talents</h1>
        <p className="text-sm text-white/40 mt-1">Structure et statistiques du questionnaire en temps réel.</p>
      </div>

      {/* Stats grid */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map(({ icon: Icon, color, bg, label, value }) => (
          <div key={label} className="surface-card p-5 flex items-center gap-4">
            <div className={`w-10 h-10 rounded-xl ${bg} flex items-center justify-center flex-shrink-0`}>
              <Icon className={`w-5 h-5 ${color}`} />
            </div>
            <div>
              <div className="text-[10px] uppercase tracking-[0.25em] text-white/25 font-medium">{label}</div>
              <div className="text-2xl font-bold text-white/90 mt-0.5">{value}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Structure */}
      <div className="surface-card p-6">
        <h2 className="text-xs uppercase tracking-[0.3em] text-white/30 font-medium mb-4">Structure du questionnaire</h2>
        <div className="space-y-2">
          {TALENTS_QUESTIONNAIRE_MAP.sections.map((section, i) => (
            <div key={section.id} className="flex items-center justify-between py-2.5 border-b border-white/5 last:border-0">
              <div className="flex items-center gap-3">
                <span className="text-xs font-mono text-white/20">{String(i + 1).padStart(2, "0")}</span>
                <span className="text-sm font-medium text-white/70">{section.label}</span>
              </div>
              <span className="text-xs text-white/30">{section.fields.length} champ{section.fields.length !== 1 ? "s" : ""}</span>
            </div>
          ))}
        </div>
      </div>

      {/* System info */}
      <div className="surface-card p-6">
        <h2 className="text-xs uppercase tracking-[0.3em] text-white/30 font-medium mb-4">Informations système</h2>
        <div className="space-y-2">
          {[
            { label: "Version questionnaire", value: questionnaire ? `v${questionnaire.version}` : "—" },
            { label: "Total champs", value: totalFields },
            { label: "Champs optionnels", value: totalFields - requiredFields },
            { label: "Type", value: "TALENTS" },
          ].map(({ label, value }) => (
            <div key={label} className="flex items-center justify-between py-2.5 border-b border-white/5 last:border-0">
              <span className="text-sm text-white/40">{label}</span>
              <span className="text-sm font-medium text-white/70 font-mono">{value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
