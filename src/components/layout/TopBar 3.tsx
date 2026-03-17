"use client";

import { usePathname } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import { LogOut, Bell } from "lucide-react";

export function TopBar() {
  const pathname = usePathname();
  const { data: session } = useSession();
  const isBrands = pathname?.startsWith("/admin/brands");

  // Derive the current section name from the URL
  const segments = pathname?.split("/").filter(Boolean) ?? [];
  const section = segments[segments.length - 1];
  const sectionLabel: Record<string, string> = {
    dashboard: "Tableau de bord",
    leads: "Leads",
    questionnaires: "Questionnaires",
    exports: "Exports",
    health: "Monitor",
    settings: "Paramètres",
  };
  const pageName = sectionLabel[section] ?? section;

  return (
    <div className="flex items-center justify-between gap-4 mb-2">
      {/* Left – breadcrumb-style title */}
      <div className="min-w-0">
        <div className="text-[10px] uppercase tracking-[0.35em] text-white/25 font-medium mb-0.5">
          {isBrands ? "Portail Marques" : "Portail Talents"}
        </div>
        <h1 className="text-xl font-semibold text-white/90 tracking-tight truncate">
          {pageName}
        </h1>
      </div>

      {/* Right – actions */}
      <div className="flex items-center gap-2 flex-shrink-0">
        {/* Notification bell (placeholder, future-ready) */}
        <button
          className="w-9 h-9 rounded-xl bg-white/5 border border-white/8 hover:bg-white/10 transition flex items-center justify-center text-white/40 hover:text-white/70"
          title="Notifications"
        >
          <Bell className="w-4 h-4" />
        </button>

        {/* User pill */}
        {session?.user && (
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/5 border border-white/8">
            <div className="w-5 h-5 rounded-full bg-gradient-to-br from-orange-400 to-pink-500 flex-shrink-0" />
            <span className="text-xs font-medium text-white/60 hidden sm:block max-w-[80px] truncate">
              {session.user.name ?? session.user.email}
            </span>
          </div>
        )}

        {/* Sign out */}
        <button
          onClick={() => signOut({ callbackUrl: "/admin/login" })}
          className="w-9 h-9 rounded-xl bg-white/5 border border-white/8 hover:bg-red-500/10 hover:border-red-500/20 transition flex items-center justify-center text-white/40 hover:text-red-400"
          title="Se déconnecter"
        >
          <LogOut className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
