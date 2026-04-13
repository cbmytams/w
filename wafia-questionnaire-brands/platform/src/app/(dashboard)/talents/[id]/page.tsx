import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Fiche talent | WAFIA BDD Talents",
  description:
    "Détail talent: profils sociaux, stats, contacts et notes internes.",
};

export default function TalentDetailPage() {
  return (
    <div className="space-y-6">
      <div className="surface-card p-6">
        <div className="text-xs uppercase tracking-[0.3em] text-soft">
          Fiche talent
        </div>
        <h1 className="text-3xl font-semibold mt-2">Nom du talent</h1>
        <p className="text-sm text-muted mt-2">
          Vue complète avec infos, plateformes, stats et notes internes.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="surface-card p-6 lg:col-span-2">
          <h2 className="text-lg font-semibold mb-4">Plateformes & stats</h2>
          <div className="space-y-3 text-sm text-muted">
            <div className="flex items-center justify-between">
              <span>Instagram @handle</span>
              <span>132k • Sync OK</span>
            </div>
            <div className="flex items-center justify-between">
              <span>TikTok @handle</span>
              <span>98k • Sync pending</span>
            </div>
          </div>
        </div>
        <div className="surface-card p-6">
          <h2 className="text-lg font-semibold mb-4">Contacts</h2>
          <div className="text-sm text-muted space-y-2">
            <div>Email • talent@email.com</div>
            <div>Agent • agent@email.com</div>
          </div>
        </div>
      </div>
    </div>
  );
}
