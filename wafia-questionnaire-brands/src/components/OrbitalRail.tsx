import { motion } from "framer-motion";
import { LayoutDashboard, Users, Settings, LogOut } from "lucide-react";
import { cn } from "../utils/cn";

interface OrbitalRailProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  onClose: () => void;
}

const NAV_ITEMS = [
  {
    id: "dashboard",
    icon: LayoutDashboard,
    label: "Tableau de bord",
    description: "Vue d'ensemble des performances",
  },
  {
    id: "leads",
    icon: Users,
    label: "Prospects",
    description: "Gérer les créateurs",
  },
  {
    id: "config",
    icon: Settings,
    label: "Configuration",
    description: "Modifier les questions",
  },
  /* { id: 'data', icon: Database, label: 'Data' }, // Future */
];

export function OrbitalRail({
  activeTab,
  onTabChange,
  onClose,
}: OrbitalRailProps) {
  return (
    <div className="w-20 h-full border-r border-white/5 bg-[#050505] flex flex-col items-center py-6 z-50 relative">
      {/* BRAND LOGO */}
      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[var(--heat-start)] to-[var(--heat-end)] flex items-center justify-center text-white font-bold text-xl mb-12 shadow-[0_0_20px_var(--heat-start)]">
        W
      </div>

      {/* NAV ITEMS */}
      <nav className="flex-1 flex flex-col gap-6 w-full px-4">
        {NAV_ITEMS.map((item) => {
          const isActive = activeTab === item.id;
          const Icon = item.icon;

          return (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className="relative group w-full aspect-square flex items-center justify-center"
              data-tour={`${item.id}-tab`}
            >
              {/* Hover / Active Glow */}
              <div
                className={cn(
                  "absolute inset-0 rounded-xl transition-all duration-500",
                  isActive
                    ? "bg-white/10 shadow-[0_0_15px_rgba(255,255,255,0.1)]"
                    : "group-hover:bg-white/5"
                )}
              />

              {/* Active Indicator Line */}
              {isActive && (
                <motion.div
                  layoutId="rail-indicator"
                  className="absolute left-0 top-2 bottom-2 w-1 rounded-r-full bg-gradient-to-b from-[var(--heat-start)] to-[var(--heat-end)]"
                />
              )}

              <Icon
                strokeWidth={isActive ? 2.5 : 1.5}
                className={cn(
                  "w-6 h-6 transition-colors relative z-10",
                  isActive
                    ? "text-white"
                    : "text-zinc-500 group-hover:text-zinc-300"
                )}
              />

              {/* Tooltip */}
              <div className="absolute left-full ml-4 px-3 py-2 bg-zinc-900 border border-white/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50">
                <div className="text-xs font-bold text-white whitespace-nowrap">
                  {item.label}
                </div>
                <div className="text-[10px] text-zinc-500 whitespace-nowrap mt-0.5">
                  {item.description}
                </div>
              </div>
            </button>
          );
        })}
      </nav>

      {/* EXIT */}
      <button
        onClick={onClose}
        className="w-10 h-10 rounded-full flex items-center justify-center text-zinc-600 hover:text-white hover:bg-white/5 transition-all mt-auto"
        title="Exit Admin"
      >
        <LogOut className="w-5 h-5" />
      </button>
    </div>
  );
}
