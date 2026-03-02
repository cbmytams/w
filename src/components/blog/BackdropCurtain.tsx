"use client";

import { AnimatePresence, motion } from "framer-motion";
import { wafiaGlass as G } from "@/styles/glass";

interface BackdropCurtainProps {
  open: boolean;
}

export default function BackdropCurtain({ open }: BackdropCurtainProps) {
  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          key="wafia-blog-curtain"
          className="fixed inset-0 z-40"
          style={{
            background: "rgba(0,0,0,0.5)",
            backdropFilter: "blur(8px)",
            WebkitBackdropFilter: "blur(8px)",
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={G.spring}
          aria-hidden
        />
      ) : null}
    </AnimatePresence>
  );
}
