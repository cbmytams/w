"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  Menu,
  X,
  LayoutDashboard,
  Users,
  FileText,
  Download,
  Activity,
  Settings,
  ArrowLeftRight,
  ExternalLink,
  type LucideIcon,
} from "lucide-react";
import { WafiaLogo } from "@/components/ui/WafiaLogo";

const NAV_ITEMS = [
  { key: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { key: "leads", label: "Leads", icon: Users },
  { key: "questionnaires", label: "Questionnaires", icon: FileText },
  { key: "exports", label: "Exports", icon: Download },
  { key: "health", label: "Monitor", icon: Activity },
  { key: "settings", label: "Settings", icon: Settings },
];

type SidebarNavItem = {
  href: string;
  label: string;
  icon: LucideIcon;
};

type SidebarContentProps = {
  navItems: SidebarNavItem[];
  pathname: string | null;
  portalLabel: string;
  questionnaireHref: string;
  switchHref: string;
  switchLabel: string;
  onNavigate: () => void;
};

function SidebarContent({
  navItems,
  pathname,
  portalLabel,
  questionnaireHref,
  switchHref,
  switchLabel,
  onNavigate,
}: SidebarContentProps) {
  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="px-6 pt-8 pb-6 border-b border-white/5">
        {/* Logo / Brand */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 flex items-center justify-center flex-shrink-0">
            <WafiaLogo className="w-full h-full text-white" />
          </div>
          <div>
            <div className="text-[10px] uppercase tracking-[0.3em] text-white/30 font-medium">
              Wafia OS
            </div>
            <div className="text-sm font-semibold text-white/90 leading-tight">
              {portalLabel}
            </div>
          </div>
        </div>

        {/* Back to questionnaire */}
        <Link
          href={questionnaireHref}
          target="_blank"
          rel="noopener noreferrer"
          onClick={onNavigate}
          className="inline-flex items-center gap-1.5 text-[10px] font-medium text-white/30 hover:text-white/60 transition-colors duration-200"
        >
          <ExternalLink className="w-3 h-3" />
          Voir le questionnaire
        </Link>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto custom-scrollbar">
        <div className="px-3 mb-3 text-[9px] uppercase tracking-[0.3em] text-white/20 font-medium">
          Navigation
        </div>
        {navItems.map(({ href, label, icon: Icon }) => {
          const isActive = pathname?.startsWith(href);
          return (
            <Link
              key={href}
              href={href}
              onClick={onNavigate}
              className={`
                flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all duration-200 group
                ${
                  isActive
                    ? "bg-white/10 text-white border border-white/10 shadow-inner"
                    : "text-white/40 hover:text-white/80 hover:bg-white/5"
                }
              `}
            >
              <Icon
                className={`w-4 h-4 flex-shrink-0 transition-all duration-200 ${
                  isActive ? "text-orange-400" : "group-hover:text-white/80"
                }`}
              />
              <span className="font-medium tracking-tight">{label}</span>
              {isActive && (
                <span className="ml-auto w-1.5 h-1.5 rounded-full bg-orange-400 shadow-sm shadow-orange-400/50" />
              )}
            </Link>
          );
        })}
      </nav>

      {/* Footer – Switch Portal */}
      <div className="px-3 py-4 border-t border-white/5 space-y-2">
        <Link
          href={switchHref}
          onClick={onNavigate}
          className="flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-xs font-medium text-white/30 hover:text-white/70 hover:bg-white/5 transition-all duration-200 border border-white/5 hover:border-white/10"
        >
          <ArrowLeftRight className="w-3.5 h-3.5 flex-shrink-0" />
          <span>Passer au {switchLabel}</span>
        </Link>
        <div className="px-3 text-[9px] text-white/15 font-mono">
          v1.0 · unified platform
        </div>
      </div>
    </div>
  );
}

export function Sidebar() {
  const pathname = usePathname();
  const isBrands = pathname?.startsWith("/admin/brands");
  const basePath = isBrands ? "/admin/brands" : "/admin/talents";
  const portalLabel = isBrands ? "Marques" : "Talents";
  const switchLabel = isBrands ? "Portail Talents" : "Portail Marques";
  const switchHref = isBrands
    ? "/admin/talents/dashboard"
    : "/admin/brands/dashboard";
  const questionnaireHref = isBrands
    ? "/questionnaire/brands"
    : "/questionnaire/talents";
  const [mobileOpen, setMobileOpen] = useState(false);

  const navItems = NAV_ITEMS.map((item) => ({
    ...item,
    href: `${basePath}/${item.key}`,
  }));

  return (
    <>
      {/* Mobile hamburger */}
      <button
        onClick={() => setMobileOpen(true)}
        className="lg:hidden fixed top-4 left-4 z-50 w-10 h-10 rounded-xl bg-black/60 backdrop-blur-xl border border-white/10 flex items-center justify-center shadow-lg"
        aria-label="Ouvrir le menu"
      >
        <Menu className="w-4 h-4 text-white/70" />
      </button>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-40">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setMobileOpen(false)}
          />
          <aside className="relative z-50 w-72 h-full border-r border-white/10 bg-black/70 backdrop-blur-3xl shadow-2xl">
            <button
              onClick={() => setMobileOpen(false)}
              className="absolute top-4 right-4 w-8 h-8 rounded-xl flex items-center justify-center text-white/40 hover:text-white/80 hover:bg-white/5 transition"
              aria-label="Fermer le menu"
            >
              <X className="w-4 h-4" />
            </button>
            <SidebarContent
              navItems={navItems}
              pathname={pathname ?? null}
              portalLabel={portalLabel}
              questionnaireHref={questionnaireHref}
              switchHref={switchHref}
              switchLabel={switchLabel}
              onNavigate={() => setMobileOpen(false)}
            />
          </aside>
        </div>
      )}

      {/* Desktop sidebar */}
      <aside className="hidden lg:flex lg:flex-col lg:w-64 lg:flex-shrink-0 border-r border-white/5 bg-black/30 backdrop-blur-3xl">
        <SidebarContent
          navItems={navItems}
          pathname={pathname ?? null}
          portalLabel={portalLabel}
          questionnaireHref={questionnaireHref}
          switchHref={switchHref}
          switchLabel={switchLabel}
          onNavigate={() => setMobileOpen(false)}
        />
      </aside>
    </>
  );
}
