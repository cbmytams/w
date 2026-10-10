"use client";

import { useRef } from "react";
import {
  motion,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { useTranslations } from "next-intl";
import { ArrowRight } from "lucide-react";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import styles from "./BrandMethodSection.module.css";

type MethodStep = {
  title: string;
  description: string;
};

const DIM = 0.5;
const MUTED = "#9aa09a";
const ACCENT = "#c23a1f";

function LitStep({
  step,
  index,
  total,
  progress,
}: {
  step: MethodStep;
  index: number;
  total: number;
  progress: MotionValue<number>;
}) {
  const from = Math.max(0, index / total - 0.03);
  const to = index / total + 0.07;
  const opacity = useTransform(progress, [from, to], [DIM, 1]);
  const y = useTransform(progress, [from, to], [6, 0]);
  const color = useTransform(progress, [from, to], [MUTED, ACCENT]);

  return (
    <li className={styles.step}>
      <motion.div className={styles.stepInner} style={{ opacity, y }}>
        <div className={styles.marker} aria-hidden="true">
          <motion.span className={styles.number} style={{ color }}>
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
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 88%", "start 38%"],
  });
  // Critically damped: fluid, no overshoot. It also keeps the scrub on the JS
  // path, which maps the section's scroll range reliably.
  const smooth = useSpring(scrollYProgress, {
    stiffness: 170,
    damping: 26,
    mass: 1,
  });
  const complete = useMotionValue(1);
  const progress = reduceMotion ? complete : smooth;
  const position = useTransform(progress, (value) => `${value * 100}%`);
  const headOpacity = useTransform(progress, [0, 0.02, 0.97, 1], [0, 1, 1, 0]);

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
          <motion.span className={styles.line} style={{ scaleX: progress }} />
          <motion.i
            className={styles.head}
            style={{ left: position, opacity: headOpacity }}
          />
        </div>
        <div className={styles.trackArea}>
          <div className={styles.railV} aria-hidden="true">
            <motion.span
              className={styles.lineV}
              style={{ scaleY: progress }}
            />
            <motion.i
              className={styles.headV}
              style={{ top: position, opacity: headOpacity }}
            />
          </div>
          <ol className={styles.steps}>
            {steps.map((step, index) => (
              <LitStep
                key={step.title}
                step={step}
                index={index}
                total={steps.length}
                progress={progress}
              />
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
