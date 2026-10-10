"use client";

import { useRef } from "react";
import { motion, useInView, type Transition } from "framer-motion";
import { useTranslations } from "next-intl";
import { ArrowRight } from "lucide-react";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import styles from "./BrandMethodSection.module.css";

type MethodStep = {
  title: string;
  description: string;
};

const SWEEP = 1.8;
const DIM = 0.5;
const MUTED = "#9aa09a";
const ACCENT = "#c23a1f";
const EASE = [0.22, 1, 0.36, 1] as const;

const stepVariants = {
  idle: { opacity: DIM, y: 8 },
  lit: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay, duration: 0.6, ease: EASE },
  }),
};

const numberVariants = {
  idle: { color: MUTED },
  lit: (delay: number) => ({
    color: ACCENT,
    transition: { delay, duration: 0.6 },
  }),
};

function LitStep({
  step,
  index,
  total,
  lit,
}: {
  step: MethodStep;
  index: number;
  total: number;
  lit: boolean;
}) {
  // The rail reaches each column at (index / total) * SWEEP; the step lights
  // just behind it.
  const delay = 0.15 + (index / total) * SWEEP;

  return (
    <li className={styles.step}>
      <motion.div
        className={styles.stepInner}
        variants={stepVariants}
        custom={delay}
        initial="idle"
        animate={lit ? "lit" : "idle"}
      >
        <div className={styles.marker} aria-hidden="true">
          <motion.span
            className={styles.number}
            variants={numberVariants}
            custom={delay}
          >
            {String(index + 1).padStart(2, "0")}
          </motion.span>
          <span className={styles.connector}>
            <ArrowRight size={16} strokeWidth={1} />
          </span>
        </div>
        <div className={styles.copy}>
          <h3>{step.title}</h3>
          <p>{step.description}</p>
        </div>
      </motion.div>
    </li>
  );
}

export function BrandMethodSection() {
  const t = useTranslations("method");
  const steps = t.raw("steps") as MethodStep[];
  const sectionRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  // Time-based, played once on arrival: it shows however the section is
  // reached (scroll, nav anchor, reload). Reduced motion keeps the fills and
  // fades; the travelling dot and the lift are dropped.
  const lit = useInView(sectionRef, { once: true, amount: 0.3 });
  const sweep = { duration: SWEEP, ease: "linear" } as const;
  const dot: Transition = {
    duration: SWEEP,
    ease: "linear",
    times: [0, 0.05, 0.95, 1],
  };

  return (
    <section
      ref={sectionRef}
      id="process"
      aria-labelledby="brand-method-title"
      data-nav-tone="light"
      className={styles.section}
    >
      <div className={styles.inner}>
        <header className={styles.header}>
          <h2 id="brand-method-title">{t("title")}</h2>
          <p>{t("subtitle")}</p>
        </header>
        <div className={styles.rail} aria-hidden="true">
          <motion.span
            className={styles.line}
            initial={{ clipPath: "inset(0 100% 0 0)" }}
            animate={{
              clipPath: lit ? "inset(0 0% 0 0)" : "inset(0 100% 0 0)",
            }}
            transition={sweep}
          />
          {!reduceMotion && (
            <motion.i
              className={styles.head}
              initial={{ left: "0%", opacity: 0 }}
              animate={
                lit ? { left: "100%", opacity: [0, 1, 1, 0] } : undefined
              }
              transition={dot}
            />
          )}
        </div>
        <div className={styles.trackArea}>
          <div className={styles.railV} aria-hidden="true">
            <motion.span
              className={styles.lineV}
              initial={{ clipPath: "inset(0 0 100% 0)" }}
              animate={{
                clipPath: lit ? "inset(0 0 0% 0)" : "inset(0 0 100% 0)",
              }}
              transition={sweep}
            />
            {!reduceMotion && (
              <motion.i
                className={styles.headV}
                initial={{ top: "0%", opacity: 0 }}
                animate={
                  lit ? { top: "100%", opacity: [0, 1, 1, 0] } : undefined
                }
                transition={dot}
              />
            )}
          </div>
          <ol className={styles.steps}>
            {steps.map((step, index) => (
              <LitStep
                key={step.title}
                step={step}
                index={index}
                total={steps.length}
                lit={lit}
              />
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
