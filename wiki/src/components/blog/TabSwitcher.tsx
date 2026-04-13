import { motion } from "framer-motion";

interface Tab<T extends string = string> {
  id: T;
  label: string;
}

interface TabSwitcherProps<T extends string = string> {
  tabs: readonly Tab<T>[];
  active: T;
  onChange: (id: T) => void;
}

export default function TabSwitcher<T extends string>({
  tabs,
  active,
  onChange,
}: TabSwitcherProps<T>) {
  return (
    <div
      className="flex border-b"
      role="tablist"
      aria-label="Sections"
      style={{ borderColor: "var(--line)" }}
    >
      {tabs.map((tab) => {
        const isActive = active === tab.id;
        return (
          <button
            key={tab.id}
            role="tab"
            aria-selected={isActive}
            aria-controls={`panel-${tab.id}`}
            id={`tab-${tab.id}`}
            onClick={() => onChange(tab.id)}
            className="relative pb-3 px-4 text-xs font-mono uppercase tracking-widest transition-colors duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 rounded-sm"
            style={{ color: isActive ? "var(--ink)" : "var(--ink-secondary)" }}
          >
            {tab.label}
            {isActive && (
              <motion.div
                layoutId="tab-indicator"
                className="absolute bottom-0 left-0 right-0 h-px"
                style={{ backgroundColor: "var(--ink)" }}
              />
            )}
          </button>
        );
      })}
    </div>
  );
}
