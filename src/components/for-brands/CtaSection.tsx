"use client";

import { motion } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import styles from "./CtaSection.module.css";

type CtaSectionProps = {
  readonly estimateHref?: string;
};

const VIEWPORT = { once: true, amount: 0.36 } as const;

export function CtaSection({
  estimateHref = "/contact/brands",
}: CtaSectionProps) {
  const t = useTranslations("cta");
  const reduceMotion = useReducedMotion();

  return (
    <section className={styles.section} aria-labelledby="brands-cta-title">
      <Image
        src="/images/cases/cta-studio-shoot.webp"
        alt=""
        fill
        sizes="100vw"
        className={styles.image}
        aria-hidden="true"
      />
      <div className={styles.scrim} aria-hidden="true" />

      <div className={styles.inner}>
        <motion.div
          className={styles.copy}
          initial={reduceMotion ? false : { opacity: 0, y: 18 }}
          animate={reduceMotion ? { opacity: 1, y: 0 } : undefined}
          whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={VIEWPORT}
          transition={{ duration: 0.56, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className={styles.eyebrow}>{t("eyebrow")}</p>
          <h2 id="brands-cta-title">{t.rich("title", { br: () => <br /> })}</h2>
        </motion.div>

        <motion.aside
          className={styles.panel}
          initial={reduceMotion ? false : { opacity: 0, y: 18 }}
          animate={reduceMotion ? { opacity: 1, y: 0 } : undefined}
          whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={VIEWPORT}
          transition={{
            duration: 0.56,
            delay: reduceMotion ? 0 : 0.08,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          <p>{t("body")}</p>
          <Link href={estimateHref} className={styles.cta}>
            {t("button")}
            <ArrowRight aria-hidden="true" size={20} strokeWidth={1.8} />
          </Link>
        </motion.aside>
      </div>
    </section>
  );
}
