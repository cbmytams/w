"use client";

import { motion, type Variants } from "framer-motion";
import { ReactNode } from "react";
import { EASING, DURATION } from "@/lib/easing";

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: DURATION.normal, ease: EASING.smooth },
  },
};

export function LegalContainer({ children }: { children: ReactNode }) {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="space-y-12"
    >
      {children}
    </motion.div>
  );
}

export function LegalHeader({
  title,
  date,
  subtitle,
}: {
  title: string;
  date?: string;
  subtitle?: string;
}) {
  return (
    <motion.div variants={itemVariants} className="space-y-6 mb-24">
      <div className="flex items-center gap-4">
        <div className="h-px bg-purple-500/50 w-16"></div>
        <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-purple-600 dark:text-purple-400">
          Document Officiel
        </span>
      </div>
      <h1 className="text-6xl md:text-8xl font-bold tracking-tighter text-slate-900 dark:text-white leading-[1.1]">
        {title}
      </h1>
      {subtitle && (
        <p className="text-2xl text-slate-600 dark:text-white/60 max-w-3xl font-light leading-relaxed">
          {subtitle}
        </p>
      )}
      {date && (
        <div className="inline-flex items-center gap-3 px-4 py-2 bg-black/[0.03] dark:bg-white/[0.03] rounded-full border border-black/[0.05] dark:border-white/[0.05] mt-8 backdrop-blur-md">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="text-[13px] font-medium text-slate-600 dark:text-slate-300/80">
            Mise à jour : {date}
          </span>
        </div>
      )}
    </motion.div>
  );
}

export function LegalSection({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <motion.section
      variants={itemVariants}
      className="relative pt-8 first:pt-0"
    >
      <div className="mb-8">
        <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-slate-900 dark:text-white flex items-center gap-4">
          <div className="w-8 h-px bg-purple-500/30"></div>
          {title}
        </h2>
      </div>
      <div className="text-lg leading-relaxed text-slate-600 dark:text-slate-300/80 space-y-6">
        {children}
      </div>
    </motion.section>
  );
}

export function LegalGrid({ children }: { children: ReactNode }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">{children}</div>
  );
}

export function LegalCard({
  title,
  value,
  icon,
}: {
  title: string;
  value: ReactNode;
  icon?: ReactNode;
}) {
  return (
    <div className="group relative bg-black/[0.02] dark:bg-white/[0.02] backdrop-blur-[40px] border border-black/[0.05] dark:border-white/[0.05] rounded-2xl p-8 hover:shadow-2xl dark:shadow-none transition-all duration-500 hover:-translate-y-2 ease-[cubic-bezier(0.16,1,0.3,1)]">
      <div className="absolute inset-0 rounded-2xl border border-white/20 dark:border-white/5 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/0 to-violet-500/0 group-hover:from-purple-500/[0.03] group-hover:to-violet-500/[0.03] dark:group-hover:from-purple-500/[0.05] dark:group-hover:to-violet-500/[0.05] rounded-2xl transition-all duration-500 pointer-events-none" />
      <div className="relative z-10">
        <div className="text-xs text-slate-500 dark:text-slate-400 font-mono mb-4 uppercase tracking-widest flex justify-between items-start">
          <span>{title}</span>
          {icon && (
            <span className="opacity-50 group-hover:opacity-100 transition-opacity duration-300">
              {icon}
            </span>
          )}
        </div>
        <div className="text-xl font-medium tracking-tight text-slate-900 dark:text-white">
          {value}
        </div>
      </div>
    </div>
  );
}
