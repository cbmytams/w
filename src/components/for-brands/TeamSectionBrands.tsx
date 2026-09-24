"use client";

import Image from "next/image";
import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { BRAND_TEAM_PROFILES } from "@/components/for-brands/brand-team-content";
import { BrandTeamDrawer } from "@/components/for-brands/BrandTeamDrawer";
import styles from "./TeamSectionBrands.module.css";

const VIEWPORT = { once: true, amount: 0.25 } as const;

export function TeamSectionBrands() {
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
          <p className={styles.eyebrow}>L&apos;équipe opérationnelle</p>
          <h2 id="team-title" className={styles.title}>
            Des experts
            <br />
            de terrain.
            <br />
            Et de culture.
          </h2>
          <p className={styles.body}>
            Les bonnes campagnes ont quelque chose d&apos;évident. Elles ne
            forcent pas. Elles trouvent le bon rythme, le bon visage, la bonne
            façon d&apos;exister. C&apos;est ce que l&apos;équipe Wafia cherche
            à construire.
          </p>
          <button
            type="button"
            className={styles.discover}
            onClick={() => setIsOpen(true)}
            aria-haspopup="dialog"
          >
            Découvrir l&apos;équipe
            <ArrowRight aria-hidden="true" size={18} strokeWidth={1.8} />
          </button>
        </motion.div>

        <div className={styles.portraits} aria-label="L'équipe Wafia">
          {BRAND_TEAM_PROFILES.map((profile, index) => (
            <motion.button
              type="button"
              key={profile.id}
              className={styles.portrait}
              onClick={() => setIsOpen(true)}
              aria-label={`Découvrir l'équipe avec ${profile.name}`}
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
                  alt={`Portrait de ${profile.name}`}
                  fill
                  sizes="(max-width: 760px) 43vw, (max-width: 1100px) 28vw, 19vw"
                  className={styles.portraitImage}
                />
              </span>
              <span className={styles.name}>{profile.name}</span>
              <span className={styles.role}>{profile.role}</span>
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
            Du brief à l&apos;idée · de l&apos;idée au contenu
          </motion.p>
        </div>

        <motion.aside
          className={styles.note}
          aria-label="Notre manière de travailler"
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
          Des humains.
          <br />
          Des idées.
          <br />
          Du concret.
          <span aria-hidden="true" />
        </motion.aside>
      </div>

      <BrandTeamDrawer open={isOpen} onClose={() => setIsOpen(false)} />
    </section>
  );
}
