"use client";

import { motion } from "framer-motion";
import { wafiaGlass as G } from "@/styles/glass";

interface Tab {
  id: string;
  label: string;
}

interface TabSwitcherProps {
  tabs: Tab[];
  active: string;
  onChange: (value: string) => void;
}

export default function TabSwitcher({ tabs, active, onChange }: TabSwitcherProps) {
  return (
    <div
      className="relative inline-flex w-full rounded-full border p-1"
      style={{
        background: "rgba(255, 248, 230, 0.03)",
        borderColor: "rgba(255, 235, 180, 0.14)",
      }}
    >
      {tabs.map((tab) => {
        const isActive = tab.id === active;
        return (
          <button
            key={tab.id}
            type="button"
            onClick={() => onChange(tab.id)}
            className="relative z-10 flex-1 rounded-full px-4 py-2.5 text-xs font-semibold tracking-wide transition-colors"
            style={{ color: isActive ? "#0f1115" : G.pillInactive.color }}
            aria-pressed={isActive}
          >
            {isActive ? (
              <motion.span
                layoutId="wafia-pill"
                transition={G.springFast}
                className="absolute inset-0 -z-10 rounded-full"
                style={G.pillActive}
              />
            ) : null}
            <span className="relative">{tab.label}</span>
          </button>
        );
      })}
    </div>
  );
}
