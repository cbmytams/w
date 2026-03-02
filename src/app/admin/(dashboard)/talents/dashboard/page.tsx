import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard | WAFIA BDD Talents",
  description: "Vue d'ensemble des KPIs, alertes et activités de la plateforme talents."
};

const kpis = [
  { label: "Talents onboardés", value: "112", hint: "+8 cette semaine" },
  { label: "Profils incomplets", value: "14", hint: "Relance requise" },
  { label: "Syncs en erreur", value: "3", hint: "API TikTok" },
  { label: "Nouveaux talents", value: "6", hint: "7 derniers jours" }
];

const alerts = [
  "3 talents sans email confirmé",
  "2 comptes TikTok non connectés",
  "Export shortlist en attente"
];

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {kpis.map((kpi) => (
          <div key={kpi.label} className="surface-card p-6">
            <div className="text-xs uppercase tracking-[0.3em] text-soft">{kpi.label}</div>
            <div className="text-3xl font-semibold mt-4">{kpi.value}</div>
            <div className="text-sm text-muted mt-2">{kpi.hint}</div>
          </div>
        ))}
      </section>

      <section className="grid gap-6 lg:grid-cols-3">
        <div className="surface-card p-6 lg:col-span-2">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Activité récente</h2>
            <span className="text-xs text-soft uppercase tracking-[0.3em]">24h</span>
          </div>
          <div className="mt-6 space-y-4 text-sm text-muted">
            <div className="flex items-center justify-between">
              <span>Import Excel • 14 nouveaux talents</span>
              <span className="text-soft">Il y a 3h</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Sync stats Instagram • 96 comptes</span>
              <span className="text-soft">Il y a 5h</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Questionnaire • 8 réponses soumises</span>
              <span className="text-soft">Hier</span>
            </div>
          </div>
        </div>

        <div className="surface-card p-6">
          <div className="text-xs uppercase tracking-[0.3em] text-soft">Alertes</div>
          <div className="mt-4 space-y-3 text-sm text-muted">
            {alerts.map((alert) => (
              <div key={alert} className="rounded-xl border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 px-4 py-3">
                {alert}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
