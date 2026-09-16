"use client";

import Image from "next/image";
import Link from "next/link";
import { createPortal } from "react-dom";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Linkedin, Mail, X } from "lucide-react";
import { useFocusTrap } from "@/hooks/useFocusTrap";
import { BRAND_TEAM_PROFILES } from "@/components/for-brands/brand-team-content";
import styles from "./BrandTeamDrawer.module.css";

type BrandTeamDrawerProps = {
  readonly open: boolean;
  readonly onClose: () => void;
};

export function BrandTeamDrawer({ open, onClose }: BrandTeamDrawerProps) {
  const [mounted, setMounted] = useState(false);
  const panelRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", closeOnEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [onClose, open]);

  useFocusTrap(panelRef, open && mounted);

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {open ? (
        <>
          <motion.button
            type="button"
            aria-label="Fermer la présentation de l'équipe"
            className={styles.backdrop}
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
          />
          <motion.aside
            ref={panelRef}
            className={styles.panel}
            role="dialog"
            aria-modal="true"
            aria-labelledby="brand-team-drawer-title"
            tabIndex={-1}
            initial={reduceMotion ? { opacity: 0 } : { x: "100%" }}
            animate={reduceMotion ? { opacity: 1 } : { x: 0 }}
            exit={reduceMotion ? { opacity: 0 } : { x: "100%" }}
            transition={
              reduceMotion
                ? { duration: 0.18 }
                : { type: "spring", stiffness: 290, damping: 34, mass: 0.9 }
            }
          >
            <button
              type="button"
              onClick={onClose}
              className={styles.close}
              aria-label="Fermer"
            >
              <X aria-hidden="true" size={28} strokeWidth={1.6} />
            </button>

            <div className={styles.drawerHeader}>
              <p className={styles.drawerEyebrow}>
                L&apos;équipe opérationnelle
              </p>
              <h2 id="brand-team-drawer-title" className={styles.drawerTitle}>
                L&apos;équipe derrière
                <br />
                l&apos;évidence.
              </h2>
              <p className={styles.drawerIntro}>
                On ne vient pas ajouter du bruit autour d&apos;une marque. On
                cherche ce qui peut vraiment prendre : une idée simple, une
                présence juste, un contenu qui donne envie d&apos;être vu.
              </p>
            </div>

            <div className={styles.profiles}>
              {BRAND_TEAM_PROFILES.map((profile) => (
                <article key={profile.id} className={styles.profile}>
                  <div className={styles.profileSide}>
                    <div className={styles.profileMedia}>
                      <Image
                        src={profile.image}
                        alt={`Portrait de ${profile.fullName}`}
                        fill
                        sizes="(max-width: 620px) 92px, 132px"
                        className={styles.profileImage}
                      />
                    </div>
                    <div className={styles.profileSocial}>
                      <a
                        href={profile.linkedin}
                        target="_blank"
                        rel="noreferrer"
                        aria-label={`LinkedIn de ${profile.name}`}
                        className={styles.socialLink}
                      >
                        <Linkedin
                          aria-hidden="true"
                          size={17}
                          strokeWidth={1.8}
                        />
                      </a>
                      <a
                        href={`mailto:${profile.email}`}
                        aria-label={`Écrire à ${profile.name}`}
                        className={styles.socialLink}
                      >
                        <Mail aria-hidden="true" size={17} strokeWidth={1.8} />
                      </a>
                    </div>
                  </div>
                  <div className={styles.profileCopy}>
                    <h3>{profile.name}</h3>
                    <p className={styles.profileRole}>{profile.role}</p>
                    <div className={styles.fact}>
                      <span>Sur le papier</span>
                      <p>{profile.paper}</p>
                    </div>
                    <div className={styles.fact}>
                      <span>Dans la vraie vie</span>
                      <p>{profile.realLife}</p>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            <Link href="/contact/brands" className={styles.drawerCta}>
              Parler de votre campagne
              <ArrowRight aria-hidden="true" size={19} strokeWidth={1.8} />
            </Link>
          </motion.aside>
        </>
      ) : null}
    </AnimatePresence>,
    document.body
  );
}
