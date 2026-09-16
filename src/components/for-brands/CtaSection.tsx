"use client";

import { motion } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import styles from "./CtaSection.module.css";

type CtaSectionProps = {
  readonly estimateHref?: string;
};

const VIEWPORT = { once: true, amount: 0.36 } as const;

export function CtaSection({
  estimateHref = "/contact/brands",
}: CtaSectionProps) {
  const reduceMotion = useReducedMotion();

  return (
    <section className={styles.section} aria-labelledby="brands-cta-title">
      <Image
        src="/images/cases/cta-studio-shoot.webp"
        alt=""
        fill
        loading="eager"
        sizes="100vw"
        className={styles.image}
        aria-hidden="true"
      />
      <div className={styles.scrim} aria-hidden="true" />

      <div className={styles.inner}>
        <motion.div
          className={styles.copy}
          initial={reduceMotion ? false : { opacity: 0, y: 18 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={VIEWPORT}
          transition={{ duration: 0.56, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className={styles.eyebrow}>Studio de campagne</p>
          <h2 id="brands-cta-title">
            Parlons de votre
            <br />
            prochaine campagne.
          </h2>
        </motion.div>

        <motion.aside
          className={styles.panel}
          initial={reduceMotion ? false : { opacity: 0, y: 18 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={VIEWPORT}
          transition={{
            duration: 0.56,
            delay: reduceMotion ? 0 : 0.08,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          <p>
            Une idée, un enjeu, une marque ? Discutons de la meilleure façon de
            la faire vivre avec les bons créateurs.
          </p>
          <Link href={estimateHref} className={styles.cta}>
            Nous contacter
            <ArrowRight aria-hidden="true" size={20} strokeWidth={1.8} />
          </Link>
        </motion.aside>
      </div>
    </section>
  );
}
