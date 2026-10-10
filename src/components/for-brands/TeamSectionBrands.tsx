"use client";

import Image from "next/image";
import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import {
  BRAND_TEAM_PROFILES,
  type BrandTeamProfileCopy,
} from "@/components/for-brands/brand-team-content";
import { BrandTeamDrawer } from "@/components/for-brands/BrandTeamDrawer";
import styles from "./TeamSectionBrands.module.css";

const VIEWPORT = { once: true, amount: 0.25 } as const;

export function TeamSectionBrands() {
  const t = useTranslations("team");
  const profileCopy = t.raw("profiles") as BrandTeamProfileCopy[];
  const br = { br: () => <br /> };
  const [isOpen, setIsOpen] = useState(false);
  const reduceMotion = useReducedMotion();

  return (
    <section id="team" className={styles.section} aria-labelledby="team-title">
      <div className={styles.inner}>
        <motion.div
          className={styles.copy}
          initial={reduceMotion ? false : { opacity: 0, y: 18 }}
          animate={reduceMotion ? { opacity: 1, y: 0 } : undefined}
          whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={VIEWPORT}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className={styles.eyebrow}>{t("section.eyebrow")}</p>
          <h2 id="team-title" className={styles.title}>
            {t.rich("section.title", br)}
          </h2>
          <p className={styles.body}>{t("section.body")}</p>
          <button
            type="button"
            className={styles.discover}
            onClick={() => setIsOpen(true)}
            aria-haspopup="dialog"
          >
            {t("section.discover")}
            <ArrowRight aria-hidden="true" size={18} strokeWidth={1.8} />
          </button>
        </motion.div>

        <div
          className={styles.portraits}
          aria-label={t("section.portraitsAria")}
        >
          {BRAND_TEAM_PROFILES.map((profile, index) => (
            <motion.button
              type="button"
              key={profile.id}
              className={styles.portrait}
              onClick={() => setIsOpen(true)}
              aria-label={t("section.portraitAria", { name: profile.name })}
              initial={reduceMotion ? false : { opacity: 0, y: 24 }}
              animate={reduceMotion ? { opacity: 1, y: 0 } : undefined}
              whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={VIEWPORT}
              transition={{
                duration: 0.58,
                delay: reduceMotion ? 0 : 0.1 + index * 0.1,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <span className={styles.portraitMedia}>
                <Image
                  src={profile.image}
                  alt={t("section.portraitAlt", { name: profile.name })}
                  fill
                  sizes="(max-width: 760px) 43vw, (max-width: 1100px) 28vw, 19vw"
                  className={styles.portraitImage}
                />
              </span>
              <span className={styles.name}>{profile.name}</span>
              <span className={styles.role}>{profileCopy[index].role}</span>
            </motion.button>
          ))}
          <motion.p
            className={styles.caption}
            initial={reduceMotion ? false : { opacity: 0 }}
            animate={reduceMotion ? { opacity: 1 } : undefined}
            whileInView={reduceMotion ? undefined : { opacity: 1 }}
            viewport={VIEWPORT}
            transition={{ duration: 0.5, delay: reduceMotion ? 0 : 0.32 }}
          >
            {t("section.caption")}
          </motion.p>
        </div>

        <motion.aside
          className={styles.note}
          aria-label={t("section.noteAria")}
          initial={reduceMotion ? false : { opacity: 0, x: 16, rotate: 1 }}
          animate={reduceMotion ? { opacity: 1, x: 0, rotate: -2 } : undefined}
          whileInView={
            reduceMotion ? undefined : { opacity: 1, x: 0, rotate: -2 }
          }
          viewport={VIEWPORT}
          transition={{
            duration: 0.62,
            delay: reduceMotion ? 0 : 0.24,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          {t.rich("section.note", br)}
          <span aria-hidden="true" />
        </motion.aside>
      </div>

      <BrandTeamDrawer open={isOpen} onClose={() => setIsOpen(false)} />
    </section>
  );
}
