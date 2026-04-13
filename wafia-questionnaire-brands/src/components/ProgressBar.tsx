/**
 * WAFIA DIAGNOSTIC TOOL - PROGRESS BAR
 * Direction: Heat Laser Line
 */

import { motion } from "framer-motion";

interface ProgressBarProps {
  current: number;
  total: number;
  percentage: number;
  phase: string;
}

export function ProgressBar({ percentage, phase }: ProgressBarProps) {
  if (phase === "landing" || phase === "results") return null;

  return (
    <div className="fixed top-0 left-0 right-0 z-50 pointer-events-none">
      {/* Track */}
      <div className="absolute top-0 left-0 w-full h-[2px] bg-white/5" />

      {/* Heat Line */}
      <motion.div
        className="absolute top-0 left-0 h-[2px]"
        style={{
          background:
            "linear-gradient(90deg, var(--heat-start), var(--heat-end))",
          boxShadow: "0 0 20px rgba(236, 72, 153, 0.5)",
        }}
        initial={{ width: 0 }}
        animate={{ width: `${percentage}%` }}
        transition={{ type: "spring", stiffness: 100, damping: 30, mass: 1 }}
      >
        {/* Leading Hot Head */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-32 h-[4px] bg-gradient-to-r from-transparent to-[var(--heat-accent)] blur-[2px]" />
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-white rounded-full shadow-[0_0_10px_white]" />
      </motion.div>
    </div>
  );
}
