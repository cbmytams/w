import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Exports | WAFIA BDD Talents",
  description: "Générez et suivez les exports shortlists CSV/PDF.",
};

export default function ExportsPage() {
  return (
    <div className="space-y-6">
      <div className="surface-card p-6">
        <div className="text-xs uppercase tracking-[0.3em] text-soft">
          Exports
        </div>
        <h1 className="text-2xl font-semibold mt-2">Shortlists & one-pagers</h1>
        <p className="text-sm text-muted mt-2">
          Préparez des exports CSV et des PDF premium pour les marques.
        </p>
      </div>

      <div className="surface-card p-6">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Dernières shortlists</h2>
          <Link
            href="/talents"
            className="rounded-full bg-black text-white dark:bg-white dark:text-black px-4 py-2 text-xs font-semibold"
          >
            Créer une shortlist
          </Link>
        </div>
        <div className="mt-6 space-y-3 text-sm text-muted">
          <div className="flex items-center justify-between">
            <span>Beauty x LVMH</span>
            <span>Export CSV • 3h</span>
          </div>
          <div className="flex items-center justify-between">
            <span>Gaming x Samsung</span>
            <span>PDF • Hier</span>
          </div>
        </div>
      </div>
    </div>
  );
}
