import type { Metadata } from "next";
import { Users, TrendingUp, FileCheck, Clock } from "lucide-react";
import Link from "next/link";
import { getDashboardOverviewData } from "@/server/dashboard/get-dashboard-overview";
import { authOptions } from "@/lib/authOptions";
import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Dashboard | WAFIA Talents",
  description: "Vue d'ensemble des KPIs et activités — Portail Talents.",
};

export const dynamic = "force-dynamic";

const KPI_META = [
  {
    icon: Users,
    color: "from-blue-500 to-indigo-500",
    shadow: "shadow-blue-500/20",
  },
  {
    icon: TrendingUp,
    color: "from-emerald-400 to-teal-500",
    shadow: "shadow-emerald-500/20",
  },
  {
    icon: FileCheck,
    color: "from-orange-400 to-amber-500",
    shadow: "shadow-orange-500/20",
  },
  {
    icon: Clock,
    color: "from-pink-500 to-rose-500",
    shadow: "shadow-pink-500/20",
  },
];

export default async function TalentsDashboardPage(props: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const searchParams = await props.searchParams;
  const session = await getServerSession(authOptions);
  if (!session?.user?.tenantId) {
    redirect("/admin/login");
  }
  const {
    kpis,
    recentResponses,
    totalEntries: totalTalents,
  } = await getDashboardOverviewData(
    searchParams,
    "TALENTS",
    session.user.tenantId
  );

  return (
    <div className="space-y-6">
      {/* KPI Cards */}
      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {kpis.slice(0, 4).map((kpi, i) => {
          const meta = KPI_META[i] ?? KPI_META[0];
          const Icon = meta.icon;
          const numVal =
            typeof kpi.value === "number" ? Math.round(kpi.value) : kpi.value;
          const unit = kpi.unit === "%" ? "%" : kpi.unit === "h" ? "h" : "";
          return (
            <div
              key={kpi.label}
              className="surface-card p-6 relative overflow-hidden group"
            >
              {/* Background icon decoration */}
              <div
                className={`absolute right-4 top-4 w-10 h-10 rounded-xl bg-gradient-to-br ${meta.color} opacity-10 group-hover:opacity-20 transition-all duration-300 flex items-center justify-center`}
              >
                <Icon className="w-5 h-5 text-white" />
              </div>

              <div className="text-[10px] uppercase tracking-[0.3em] text-white/30 font-medium mb-3">
                {kpi.label}
              </div>

              <div className="text-4xl font-bold text-white/90 tracking-tight leading-none">
                {numVal}
                <span className="text-2xl font-medium text-white/50 ml-0.5">
                  {unit}
                </span>
              </div>

              {kpi.delta !== 0 && (
                <div
                  className={`mt-3 text-xs font-medium flex items-center gap-1 ${kpi.delta > 0 ? "text-emerald-400" : "text-red-400"}`}
                >
                  <span>{kpi.delta > 0 ? "↑" : "↓"}</span>
                  <span>{Math.abs(kpi.delta)}%</span>
                  <span className="text-white/20">vs préc.</span>
                </div>
              )}
            </div>
          );
        })}
      </section>

      {/* Activity + Summary */}
      <section className="grid gap-6 lg:grid-cols-3">
        {/* Recent Activity */}
        <div className="surface-card lg:col-span-2">
          <div className="flex items-center justify-between px-6 pt-6 pb-4 border-b border-white/5">
            <h2 className="text-sm font-semibold text-white/80">
              Activité récente
            </h2>
            <span className="inline-flex items-center gap-1.5 text-[9px] uppercase tracking-[0.3em] text-emerald-400 font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Live
            </span>
          </div>

          <div className="divide-y divide-white/5">
            {recentResponses.length > 0 ? (
              recentResponses.map((r: (typeof recentResponses)[number]) => {
                const name = r.talent?.name ?? "Anonyme";
                const initials = name.slice(0, 2).toUpperCase();
                const pct = Math.round(r.completionRate);
                return (
                  <Link
                    key={r.id}
                    href={`/admin/talents/questionnaires/${r.id}`}
                    className="flex items-center justify-between px-6 py-3.5 hover:bg-white/[0.03] transition-colors group"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-8 h-8 rounded-full bg-white/8 border border-white/10 flex items-center justify-center text-xs font-semibold text-white/60 flex-shrink-0">
                        {initials}
                      </div>
                      <div className="min-w-0">
                        <div className="text-sm font-medium text-white/80 truncate group-hover:text-white transition-colors">
                          {name}
                        </div>
                        <div className="text-xs text-white/30">
                          {r.submittedAt.toLocaleDateString("fr-FR", {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                          })}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 flex-shrink-0">
                      <span
                        className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                          pct >= 100
                            ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                            : "bg-orange-500/10 text-orange-400 border border-orange-500/20"
                        }`}
                      >
                        {pct}%
                      </span>
                      <span className="text-white/20 text-xs group-hover:text-white/60 transition-colors">
                        →
                      </span>
                    </div>
                  </Link>
                );
              })
            ) : (
              <div className="py-16 text-center">
                <div className="text-2xl mb-2">📭</div>
                <p className="text-sm text-white/40">Aucune activité récente</p>
                <p className="text-xs text-white/20 mt-1">
                  Les soumissions apparaîtront ici.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Summary Panel */}
        <div className="surface-card p-6 flex flex-col gap-4">
          <h2 className="text-[10px] uppercase tracking-[0.3em] text-white/30 font-medium">
            Résumé
          </h2>

          <div className="space-y-3">
            {[
              { label: "Total talents", value: totalTalents },
              { label: "Réponses récentes", value: recentResponses.length },
              { label: "KPIs surveillés", value: kpis.length },
            ].map(({ label, value }) => (
              <div
                key={label}
                className="flex items-center justify-between py-2.5 border-b border-white/5 last:border-0"
              >
                <span className="text-sm text-white/40">{label}</span>
                <span className="text-sm font-semibold text-white/80">
                  {value}
                </span>
              </div>
            ))}
          </div>

          <div className="mt-auto pt-4 border-t border-white/5">
            <Link
              href="/admin/talents/questionnaires"
              className="text-xs font-medium text-orange-400 hover:text-orange-300 transition-colors"
            >
              Voir toutes les réponses →
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
