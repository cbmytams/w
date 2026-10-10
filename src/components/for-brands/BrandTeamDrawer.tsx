"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { createPortal } from "react-dom";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Linkedin, Mail, X } from "lucide-react";
import { useFocusTrap } from "@/hooks/useFocusTrap";
import {
  BRAND_TEAM_PROFILES,
  type BrandTeamProfileCopy,
} from "@/components/for-brands/brand-team-content";
import styles from "./BrandTeamDrawer.module.css";

type BrandTeamDrawerProps = {
  readonly open: boolean;
  readonly onClose: () => void;
};

export function BrandTeamDrawer({ open, onClose }: BrandTeamDrawerProps) {
  const t = useTranslations("team");
  const profileCopy = t.raw("profiles") as BrandTeamProfileCopy[];
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
            aria-label={t("drawer.closeBackdropAria")}
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
              aria-label={t("drawer.closeAria")}
            >
              <X aria-hidden="true" size={28} strokeWidth={1.6} />
            </button>

            <div className={styles.drawerHeader}>
              <p className={styles.drawerEyebrow}>{t("drawer.eyebrow")}</p>
              <h2 id="brand-team-drawer-title" className={styles.drawerTitle}>
                {t.rich("drawer.title", { br: () => <br /> })}
              </h2>
              <p className={styles.drawerIntro}>{t("drawer.intro")}</p>
            </div>

            <div className={styles.profiles}>
              {BRAND_TEAM_PROFILES.map((profile, index) => (
                <article key={profile.id} className={styles.profile}>
                  <div className={styles.profileSide}>
                    <div className={styles.profileMedia}>
                      <Image
                        src={profile.image}
                        alt={t("drawer.portraitAlt", {
                          name: profile.fullName,
                        })}
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
                        aria-label={t("drawer.linkedinAria", {
                          name: profile.name,
                        })}
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
                        aria-label={t("drawer.emailAria", {
                          name: profile.name,
                        })}
                        className={styles.socialLink}
                      >
                        <Mail aria-hidden="true" size={17} strokeWidth={1.8} />
                      </a>
                    </div>
                  </div>
                  <div className={styles.profileCopy}>
                    <h3>{profile.name}</h3>
                    <p className={styles.profileRole}>
                      {profileCopy[index].role}
                    </p>
                    <div className={styles.fact}>
                      <span>{t("drawer.paperLabel")}</span>
                      <p>{profileCopy[index].paper}</p>
                    </div>
                    <div className={styles.fact}>
                      <span>{t("drawer.realLifeLabel")}</span>
                      <p>{profileCopy[index].realLife}</p>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            <Link href="/contact/brands" className={styles.drawerCta}>
              {t("drawer.cta")}
              <ArrowRight aria-hidden="true" size={19} strokeWidth={1.8} />
            </Link>
          </motion.aside>
        </>
      ) : null}
    </AnimatePresence>,
    document.body
  );
}
