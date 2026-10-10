"use client";

import { useRef } from "react";
import { useInView } from "framer-motion";
import { useTranslations } from "next-intl";
import { ArrowRight } from "lucide-react";
import styles from "./BrandMethodSection.module.css";

type MethodStep = {
  title: string;
  description: string;
};

export function BrandMethodSection() {
  const t = useTranslations("method");
  const steps = t.raw("steps") as MethodStep[];
  const sectionRef = useRef<HTMLElement>(null);
  const isVisible = useInView(sectionRef, { amount: 0.1 });

  return (
    <section
      ref={sectionRef}
      id="process"
      aria-labelledby="brand-method-title"
      data-nav-tone="light"
      data-running={isVisible}
      className={styles.section}
    >
      <div className={styles.inner}>
        <header className={styles.header}>
          <h2 id="brand-method-title">{t("title")}</h2>
          <p>{t("subtitle")}</p>
        </header>
        <div className={styles.rail} aria-hidden="true">
          <span className={styles.runner} />
        </div>
        <div className={styles.trackArea}>
          <span className={styles.mobileRunner} aria-hidden="true" />
          <ol className={styles.steps}>
            {steps.map((step, index) => (
              <li key={step.title} className={styles.step}>
                <div className={styles.marker} aria-hidden="true">
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <span className={styles.connector}>
                    <ArrowRight size={16} strokeWidth={1} />
                  </span>
                </div>
                <div className={styles.copy}>
                  <h3>{step.title}</h3>
                  <p>{step.description}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
