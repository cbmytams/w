import Link from "next/link";

export default function Home() {
  return (
    <main className="app-shell px-6 py-16">
      <div className="app-container space-y-12">
        <div className="space-y-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 px-4 py-2 text-xs uppercase tracking-[0.3em] text-muted">
            WAFIA BDD Talents
          </div>
          <h1 className="text-4xl md:text-6xl font-semibold leading-tight max-w-4xl">
            Le socle unique pour piloter vos talents, leurs données et leurs
            performances.
          </h1>
          <p className="text-lg md:text-xl text-muted max-w-2xl">
            Centralisez les profils, standardisez les questionnaires et suivez
            les stats multi-plateformes avec traçabilité.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="surface-card p-6">
            <div className="text-xs uppercase tracking-[0.3em] text-soft mb-3">
              Espace Admin
            </div>
            <h2 className="text-2xl font-semibold mb-2">Back-office Wafia</h2>
            <p className="text-sm text-muted">
              Gérez vos talents, lancez les imports, configurez les intégrations
              et suivez la qualité des données.
            </p>
            <Link
              href="/dashboard"
              className="mt-6 inline-flex items-center gap-2 text-sm font-semibold"
            >
              Accéder au dashboard
              <span className="accent">→</span>
            </Link>
          </div>

          <div className="surface-card p-6">
            <div className="text-xs uppercase tracking-[0.3em] text-soft mb-3">
              Espace Talent
            </div>
            <h2 className="text-2xl font-semibold mb-2">Onboarding rapide</h2>
            <p className="text-sm text-muted">
              Questionnaire guidé, connexion sociale et mise à jour continue des
              données clés.
            </p>
            <Link
              href="/questionnaires"
              className="mt-6 inline-flex items-center gap-2 text-sm font-semibold"
            >
              Démarrer le questionnaire
              <span className="accent">→</span>
            </Link>
          </div>
        </div>

        <div className="surface-strong p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div>
            <div className="text-xs uppercase tracking-[0.3em] text-soft mb-2">
              MVP en construction
            </div>
            <h3 className="text-2xl font-semibold">
              Structure prête pour import, scoring et sync automatique.
            </h3>
          </div>
          <div className="text-sm text-muted">
            Prochaine étape : wiring Auth, RBAC et pipelines de sync.
          </div>
        </div>
      </div>
    </main>
  );
}
