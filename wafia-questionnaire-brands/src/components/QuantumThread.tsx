/**
 * WAFIA DIAGNOSTIC TOOL - QUANTUM THREAD
 * A visual narrative thread that connects questions physically.
 * It pulses with energy and guides the user's focus.
 */

import { motion } from "framer-motion";

interface QuantumThreadProps {
  isActive: boolean;
}

export function QuantumThread({ isActive }: QuantumThreadProps) {
  if (!isActive) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-0 hidden sm:flex justify-center overflow-hidden">
      {/* The Central Line */}
      <div className="relative h-full w-[2px] bg-white/5">
        {/* Active Energy Beam */}
        <motion.div
          className="absolute top-0 left-0 right-0 bg-gradient-to-b from-transparent via-indigo-500 to-transparent w-full origin-top"
          initial={{ scaleY: 0, opacity: 0 }}
          animate={{
            scaleY: isActive ? 1 : 0,
            opacity: isActive ? 0.5 : 0,
          }}
          transition={{
            duration: 1.5,
            ease: "easeInOut",
            repeat: isActive ? Infinity : 0,
            repeatType: "reverse",
          }}
        />

        {/* Particle Pulse */}
        {isActive && (
          <motion.div
            className="absolute left-1/2 -translate-x-1/2 w-1 h-20 bg-white blur-md"
            initial={{ top: "-10%" }}
            animate={{ top: "110%" }}
            transition={{
              duration: 3,
              ease: "linear",
              repeat: Infinity,
              repeatDelay: 0.5,
            }}
          />
        )}
      </div>
    </div>
  );
}
