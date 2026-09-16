"use client";

import { useRef } from "react";
import { useInView } from "framer-motion";
import { ArrowRight } from "lucide-react";
import styles from "./BrandMethodSection.module.css";

const METHOD_STEPS = [
  {
    title: "Audit",
    description:
      "Votre marque, vos publics, vos objectifs. On part du terrain.",
  },
  {
    title: "Stratégie",
    description: "Une idée juste. Un angle qui donne envie de vous écouter.",
  },
  {
    title: "Casting",
    description:
      "Les bonnes voix pour votre marque. Pas seulement des audiences.",
  },
  {
    title: "Production",
    description:
      "Du brief au dernier montage. Des contenus faits pour leur public.",
  },
  {
    title: "Diffusion & reporting",
    description:
      "Amplifier, mesurer, réutiliser. Faire durer ce qui fonctionne.",
  },
] as const;

export function BrandMethodSection() {
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
          <h2 id="brand-method-title">Notre méthode</h2>
          <p>Du diagnostic à l&apos;impact</p>
        </header>
        <div className={styles.rail} aria-hidden="true">
          <span className={styles.runner} />
        </div>
        <div className={styles.trackArea}>
          <span className={styles.mobileRunner} aria-hidden="true" />
          <ol className={styles.steps}>
            {METHOD_STEPS.map((step, index) => (
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
