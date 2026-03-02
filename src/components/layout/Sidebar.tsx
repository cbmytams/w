"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function Sidebar() {
  const pathname = usePathname();
  const isBrands = pathname?.startsWith("/admin/brands");
  const basePath = isBrands ? "/admin/brands" : "/admin/talents";

  const navItems = [
    { href: `${basePath}/dashboard`, label: "Dashboard" },
    { href: `${basePath}/leads`, label: "Leads" },
    { href: `${basePath}/questionnaires`, label: "Questionnaires" },
    { href: `${basePath}/exports`, label: "Exports" },
    { href: `${basePath}/health`, label: "Monitor" },
    { href: `${basePath}/settings`, label: "Settings" }
  ];

  return (
    <aside className="hidden lg:flex lg:flex-col lg:w-72 lg:shrink-0 lg:border-r lg:border-black/10 dark:lg:border-white/10 lg:bg-white/70 dark:lg:bg-black/30 lg:backdrop-blur-xl">
      <div className="px-8 py-10">
        <div className="text-xs uppercase tracking-[0.4em] text-soft">WAFIA DASHBOARD</div>
        <div className="text-lg font-semibold mt-2">{isBrands ? "Brands" : "Talents"}</div>
      </div>
      <nav className="flex-1 px-6 space-y-2">
        {navItems.map((item) => {
          const isActive = pathname?.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center justify-between rounded-2xl px-4 py-3 text-sm transition ${isActive
                ? "bg-black text-white dark:bg-white dark:text-black font-medium"
                : "text-muted hover:bg-black/5 dark:hover:bg-white/5"
                }`}
            >
              <span>{item.label}</span>
              <span className="text-xs opacity-50">↗</span>
            </Link>
          );
        })}
      </nav>

      {/* Switcher */}
      <div className="px-6 py-4 border-t border-black/5 dark:border-white/5">
        <div className="text-xs font-medium text-soft mb-2 px-2">SWITCH PORTAL</div>
        <Link
          href={isBrands ? "/admin/talents/dashboard" : "/admin/brands/dashboard"}
          className="flex flex-col items-center justify-center p-3 w-full border border-black/10 dark:border-white/10 rounded-xl hover:bg-black/5 dark:hover:bg-white/5 transition"
        >
          <span className="text-xs font-semibold">{isBrands ? "Go to Talents Portal →" : "Go to Brands Portal →"}</span>
        </Link>
      </div>

      <div className="px-8 py-6 text-xs text-soft border-t border-black/5 dark:border-white/5">v1 • unified platform</div>
    </aside>
  );
}
