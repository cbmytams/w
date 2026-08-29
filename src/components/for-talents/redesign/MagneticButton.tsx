"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ReactNode, MouseEvent } from "react";
import Link from "next/link";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface MagneticButtonProps {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  className?: string;
}

export function MagneticButton({
  children,
  href,
  onClick,
  className = "",
}: MagneticButtonProps) {
  const prefersReducedMotion = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const translateX = useTransform(mouseXSpring, [-0.5, 0.5], [-20, 20]);
  const translateY = useTransform(mouseYSpring, [-0.5, 0.5], [-20, 20]);

  const handleMouseMove = (e: MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const buttonContent = (
    <motion.div
      onMouseMove={prefersReducedMotion ? undefined : handleMouseMove}
      onMouseLeave={prefersReducedMotion ? undefined : handleMouseLeave}
      style={prefersReducedMotion ? undefined : { translateX, translateY }}
      whileHover={prefersReducedMotion ? undefined : { scale: 1.05 }}
      whileTap={prefersReducedMotion ? undefined : { scale: 0.95 }}
      className={`px-12 py-6 text-xl font-bold rounded-full bg-white hover:bg-slate-50 text-violet-600 shadow-2xl shadow-violet-900/20 hover:shadow-violet-900/30 transition-all cursor-pointer inline-flex items-center gap-3 relative overflow-hidden ${className}`}
    >
      {/* Animated shine effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-violet-100/50 to-transparent"
        animate={prefersReducedMotion ? undefined : { x: ["-100%", "200%"] }}
        transition={
          prefersReducedMotion
            ? undefined
            : { duration: 3, repeat: Infinity, ease: "linear" }
        }
      />
      <span className="relative z-10 flex items-center justify-center gap-3">
        {children}
      </span>
    </motion.div>
  );

  if (href) {
    return <Link href={href}>{buttonContent}</Link>;
  }

  return (
    <button type="button" onClick={onClick} className="inline-flex">
      {buttonContent}
    </button>
  );
}
