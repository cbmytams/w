"use client";

import { motion } from "framer-motion";
import { wafiaGlass as G } from "@/styles/glass";

interface ChapterDotsProps {
  total: number;
  current: number;
  onChange: (index: number) => void;
}

export default function ChapterDots({ total, current, onChange }: ChapterDotsProps) {
  return (
    <div className="flex items-center gap-2">
      {Array.from({ length: total }).map((_, index) => {
        const isActive = current === index;
        return (
          <button
            key={`chapter-dot-${index}`}
            type="button"
            onClick={() => onChange(index)}
            aria-label={`Chapitre ${index + 1} sur ${total}`}
            aria-current={isActive ? "true" : undefined}
            className="rounded-full"
          >
            <motion.span
              className="block h-1.5 rounded-full"
              animate={{
                width: isActive ? 24 : 6,
                opacity: isActive ? 1 : 0.3,
                backgroundColor: isActive ? G.dotActive.bg : G.dotInactive.bg,
                boxShadow: isActive ? G.dotActive.glow : G.dotInactive.glow,
              }}
              transition={G.springFast}
            />
          </button>
        );
      })}
    </div>
  );
}
