/**
 * WAFIA DIAGNOSTIC TOOL - NAVIGATION BUTTONS
 * Direction: Heat Floating Dock
 */

import { ArrowRight, ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";

interface NavigationButtonsProps {
  onPrevious: () => void;
  onNext: () => void;
  canProceed: boolean;
  showPrevious: boolean;
  isLastQuestion: boolean;
}

export function NavigationButtons({
  onPrevious,
  onNext,
  canProceed,
  showPrevious,
  isLastQuestion,
}: NavigationButtonsProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleNext = async () => {
    if (isSubmitting || !canProceed) return;
    setIsSubmitting(true);
    try {
      await onNext();
    } finally {
      setTimeout(() => setIsSubmitting(false), 500);
    }
  };

  return (
    <div
      className="fixed left-1/2 -translate-x-1/2 z-40 w-[min(92vw,600px)]"
      style={{ bottom: "calc(1.5rem + env(safe-area-inset-bottom, 0px))" }}
    >
      <motion.div
        className="flex items-center justify-between gap-4"
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        {/* Previous Button (Glass) */}
        <motion.button
          onClick={onPrevious}
          disabled={!showPrevious}
          animate={{
            opacity: showPrevious ? 1 : 0,
            x: showPrevious ? 0 : -20,
            display: showPrevious ? "flex" : "none",
          }}
          data-testid="prev-question"
          className="h-14 w-14 rounded-full border border-white/10 bg-black/40 backdrop-blur-md text-white flex items-center justify-center hover:bg-white/10 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </motion.button>

        {/* Primary Action Button (Heat) */}
        <motion.button
          onClick={handleNext}
          disabled={!canProceed || isSubmitting}
          animate={{
            opacity: canProceed && !isSubmitting ? 1 : 0.5,
            scale: canProceed && !isSubmitting ? 1 : 0.98,
            flex: 1,
          }}
          whileHover={
            canProceed && !isSubmitting
              ? { scale: 1.02, boxShadow: "0 0 30px rgba(249, 115, 22, 0.4)" }
              : {}
          }
          whileTap={canProceed && !isSubmitting ? { scale: 0.98 } : {}}
          data-testid="next-question"
          aria-busy={isSubmitting}
          className="relative h-14 rounded-full font-bold text-sm tracking-widest uppercase text-white overflow-hidden shadow-[0_0_20px_rgba(236,72,153,0.3)] transition-all"
          style={{
            background:
              "linear-gradient(90deg, var(--heat-start), var(--heat-end))",
          }}
        >
          <div className="absolute inset-0 bg-white/20 opacity-0 hover:opacity-100 transition-opacity" />

          <span className="relative z-10 flex items-center justify-center gap-3">
            {isSubmitting
              ? "Chargement..."
              : isLastQuestion
                ? "Voir mon profil"
                : "Suivant"}
            <div className="bg-white/20 rounded-full p-1">
              <ArrowRight className="w-4 h-4" />
            </div>
          </span>
        </motion.button>
      </motion.div>
    </div>
  );
}
