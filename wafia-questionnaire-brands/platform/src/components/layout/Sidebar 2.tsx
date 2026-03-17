import Link from "next/link";

const navItems = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/talents", label: "Talents" },
  { href: "/questionnaires", label: "Questionnaires" },
  { href: "/exports", label: "Exports" },
  { href: "/settings", label: "Settings" }
];

export function Sidebar() {
  return (
    <aside className="hidden lg:flex lg:flex-col lg:w-72 lg:shrink-0 lg:border-r lg:border-black/10 dark:lg:border-white/10 lg:bg-white/70 dark:lg:bg-black/30 lg:backdrop-blur-xl">
      <div className="px-8 py-10">
        <div className="text-xs uppercase tracking-[0.4em] text-soft">WAFIA</div>
        <div className="text-lg font-semibold mt-2">BDD Talents</div>
      </div>
      <nav className="flex-1 px-6 space-y-2">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="flex items-center justify-between rounded-2xl px-4 py-3 text-sm text-muted hover:text-white dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5 transition"
          >
            <span>{item.label}</span>
            <span className="text-xs text-soft">↗</span>
          </Link>
        ))}
      </nav>
      <div className="px-8 py-6 text-xs text-soft">v1 • preview</div>
    </aside>
  );
}
