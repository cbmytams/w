import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Settings | WAFIA BDD Talents",
  description:
    "Configuration des rôles, catégories et intégrations plateforme.",
};

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <div className="surface-card p-6">
        <div className="text-xs uppercase tracking-[0.3em] text-soft">
          Settings
        </div>
        <h1 className="text-2xl font-semibold mt-2">
          Catégories, tags & intégrations
        </h1>
        <p className="text-sm text-muted mt-2">
          Configurez les règles de données, les rôles et les connexions API.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="surface-card p-6">
          <h2 className="text-lg font-semibold mb-4">Catégories</h2>
          <div className="text-sm text-muted">
            Beauty, Lifestyle, Gaming, Finance...
          </div>
        </div>
        <div className="surface-card p-6">
          <h2 className="text-lg font-semibold mb-4">Rôles</h2>
          <div className="text-sm text-muted">
            SUPER_ADMIN • ADMIN • STAFF • TALENT
          </div>
        </div>
      </div>
    </div>
  );
}
