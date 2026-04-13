import type { Metadata } from "next";
import { getLeadsPage, parseDashboardFilters } from "@/lib/dashboard/queries";
import { DASHBOARD_ROLES } from "@/lib/rbac";
import { authOptions } from "@/lib/authOptions";
import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Leads Talents | WAFIA OS",
  description: "Base de données talents centralisée.",
};

export const dynamic = "force-dynamic";

export default async function TalentsLeadsPage(props: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const searchParams = await props.searchParams;
  const sp = new URLSearchParams();
  for (const [k, v] of Object.entries(searchParams)) {
    if (v) sp.append(k, Array.isArray(v) ? v[0] : v);
  }
  sp.set("type", "TALENTS");
  const filters = parseDashboardFilters(sp);
  const session = await getServerSession(authOptions);
  if (!session?.user?.tenantId) {
    redirect("/admin/login");
  }
  const pageData = await getLeadsPage({
    filters,
    role: DASHBOARD_ROLES.ADMIN,
    tenantId: session.user.tenantId,
    cursor: null,
    limit: 50,
  });
  const leads = pageData.items;

  const STATUS_COLOR: Record<string, string> = {
    NEW: "bg-blue-500/10 text-blue-400 border-blue-500/20",
    CONTACTED: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
    QUALIFIED: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    REJECTED: "bg-red-500/10 text-red-400 border-red-500/20",
  };

  return (
    <div className="space-y-6">
      {/* Header card */}
      <div className="surface-card p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="text-[10px] uppercase tracking-[0.35em] text-white/25 font-medium">
            Base de données
          </div>
          <div className="text-lg font-semibold text-white/90 mt-0.5">
            Talents
          </div>
          <div className="text-xs text-white/30 mt-1">
            {leads.length} lead{leads.length !== 1 ? "s" : ""} enregistré
            {leads.length !== 1 ? "s" : ""}
          </div>
        </div>
        <a
          href="/questionnaire/talents"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-xs font-medium text-white/50 hover:text-white/80 hover:bg-white/10 transition"
        >
          <ExternalLink className="w-3.5 h-3.5" />
          Questionnaire Talents
        </a>
      </div>

      {/* Table card */}
      <div className="surface-card overflow-hidden">
        {leads.length === 0 ? (
          <div className="py-24 flex flex-col items-center text-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center text-3xl">
              🎤
            </div>
            <div>
              <h3 className="text-base font-semibold text-white/70">
                Aucun talent enregistré
              </h3>
              <p className="text-sm text-white/30 mt-1 max-w-xs">
                Les leads apparaîtront ici dès qu'un talent soumet le
                questionnaire.
              </p>
            </div>
            <a
              href="/questionnaire/talents"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 px-5 py-2.5 rounded-xl bg-orange-500/10 border border-orange-500/20 text-xs font-semibold text-orange-400 hover:bg-orange-500/20 transition"
            >
              Ouvrir le questionnaire ↗
            </a>
          </div>
        ) : (
          <div className="overflow-x-auto">
            {/* Table header */}
            <div className="grid grid-cols-[2fr_2fr_1fr_1fr_auto] gap-4 px-6 py-3 border-b border-white/5 text-[9px] uppercase tracking-[0.3em] text-white/25 font-medium min-w-[640px]">
              <div>Nom</div>
              <div>Email</div>
              <div>Date</div>
              <div>Statut</div>
              <div className="text-right">Action</div>
            </div>
            {/* Rows */}
            <div className="divide-y divide-white/5 min-w-[640px]">
              {leads.map((lead) => {
                const statusClass =
                  STATUS_COLOR[lead.status] ??
                  "bg-white/5 text-white/40 border-white/10";
                return (
                  <div
                    key={lead.id}
                    className="grid grid-cols-[2fr_2fr_1fr_1fr_auto] gap-4 px-6 py-4 items-center text-sm hover:bg-white/[0.02] transition"
                  >
                    <div className="font-medium text-white/80 truncate">
                      {lead.name}
                    </div>
                    <div className="text-white/40 truncate">
                      {lead.email || lead.emailMasked || "—"}
                    </div>
                    <div className="text-white/30 text-xs">
                      {new Date(lead.createdAt).toLocaleDateString("fr-FR")}
                    </div>
                    <div>
                      <span
                        className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium border ${statusClass}`}
                      >
                        {lead.status}
                      </span>
                    </div>
                    <div className="text-right">
                      {lead.responseId ? (
                        <Link
                          href={`/admin/talents/leads/${lead.id}`}
                          className="text-xs font-medium text-orange-400 hover:text-orange-300 transition"
                        >
                          Voir →
                        </Link>
                      ) : (
                        <span className="text-xs text-white/20">—</span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
