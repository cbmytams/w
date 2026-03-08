import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Talents | WAFIA BDD Talents",
  description: "Base talents centralisée avec recherche, filtres et suivi de statut."
};

const talents = [
  { name: "Lina M.", category: "Beauty", platform: "Instagram", followers: "128k", status: "Approuvé" },
  { name: "Marcus K.", category: "Gaming", platform: "YouTube", followers: "82k", status: "En revue" },
  { name: "Sofia R.", category: "Lifestyle", platform: "TikTok", followers: "210k", status: "Approuvé" }
];

export default function TalentsPage() {
  return (
    <div className="space-y-6">
        <div className="surface-card p-6 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <div className="text-xs uppercase tracking-[0.3em] text-soft">Talents</div>
            <h1 className="text-2xl font-semibold">Base de données centralisée</h1>
          </div>
          <div className="flex flex-wrap gap-3">
          <div className="rounded-full border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 px-4 py-2 text-xs text-muted">Plateforme</div>
          <div className="rounded-full border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 px-4 py-2 text-xs text-muted">Catégorie</div>
          <div className="rounded-full border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 px-4 py-2 text-xs text-muted">Budget</div>
          <div className="rounded-full bg-black text-white dark:bg-white dark:text-black px-4 py-2 text-xs font-semibold">Nouveau talent</div>
          </div>
        </div>

      <div className="surface-card p-6">
        <div className="overflow-x-auto">
          <div className="min-w-[720px]">
            <div className="grid grid-cols-5 text-xs uppercase tracking-[0.3em] text-soft pb-4 border-b border-white/5">
              <div>Talent</div>
              <div>Catégorie</div>
              <div>Plateforme</div>
              <div>Audience</div>
              <div>Statut</div>
            </div>
            <div className="divide-y divide-white/5">
              {talents.map((talent) => (
                <div key={talent.name} className="grid grid-cols-5 text-sm py-4">
                  <div className="font-semibold">{talent.name}</div>
                  <div className="text-muted">{talent.category}</div>
                  <div className="text-muted">{talent.platform}</div>
                  <div className="text-muted">{talent.followers}</div>
                  <div>
                    <span className="rounded-full border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 px-3 py-1 text-xs">
                      {talent.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
