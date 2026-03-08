import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Questionnaires | WAFIA BDD Talents",
  description: "Pilotage des versions de questionnaires et suivi de complétion."
};

export default function QuestionnairesPage() {
  return (
    <div className="space-y-6">
      <div className="surface-card p-6">
        <div className="text-xs uppercase tracking-[0.3em] text-soft">Questionnaires</div>
        <h1 className="text-2xl font-semibold mt-2">Builder & analytics</h1>
        <p className="text-sm text-muted mt-2">
          Créez des versions, suivez la complétion et adaptez les champs obligatoires.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="surface-card p-6">
          <h2 className="text-lg font-semibold mb-4">Version active</h2>
          <div className="text-sm text-muted">V1 • 32 questions • 78% complétion moyenne</div>
        </div>
        <div className="surface-card p-6">
          <h2 className="text-lg font-semibold mb-4">Champs manquants</h2>
          <div className="text-sm text-muted">Contact direct • Rate card • Disponibilités</div>
        </div>
      </div>
    </div>
  );
}
