"use client";

import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { LocaleSwitcher } from "@/components/layout/LocaleSwitcher";
import { useState } from "react";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import styles from "./ContactForm.module.css";

type ContactVariant = "brands" | "talents";

type Status = "idle" | "sending" | "sent" | "error";

export function ContactForm({ variant }: { variant: ContactVariant }) {
  const t = useTranslations("contact");
  const reduceMotion = useReducedMotion();
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "sending") return;
    setStatus("sending");

    const data = new FormData(event.currentTarget);
    const text = (name: string) => String(data.get(name) ?? "").trim();
    const payload =
      variant === "brands"
        ? {
            name: text("name"),
            email: text("email"),
            company: text("company"),
            message: text("objective"),
            type: "brand",
          }
        : {
            name: text("name"),
            email: text("email"),
            company: `Candidature talent (${text("instagram")})`,
            message: text("objective"),
            objective: `Instagram : ${text("instagram")}`,
            type: "talent",
          };

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  }

  // `animate` stays set under reduced motion: the server HTML already carries
  // the `initial` opacity 0, so only a zero-duration animate can reveal it.
  const entrance = {
    initial: { opacity: 0, y: 18 },
    animate: { opacity: 1, y: 0 },
    transition: reduceMotion
      ? { duration: 0 }
      : { duration: 0.55, ease: [0.22, 1, 0.36, 1] as const },
  };

  return (
    <main id="main-content" className={styles.section}>
      <div className={styles.top}>
        <Link
          href="/"
          aria-label={t("common.homeAriaLabel")}
          className={styles.logo}
        >
          <Image
            src="/wafia.svg"
            alt={t("common.logoAlt")}
            width={104}
            height={34}
            priority
          />
        </Link>
        <div className={styles.topEnd}>
          <LocaleSwitcher className={styles.locales} />
          <Link href="/" className={styles.back}>
            <ArrowLeft aria-hidden="true" size={15} />
            {t("common.back")}
          </Link>
        </div>
      </div>

      <motion.div {...entrance}>
        <div className={styles.head}>
          <div>
            <p className={styles.eyebrow}>{t(`form.${variant}.eyebrow`)}</p>
            <h1 className={styles.title}>{t(`form.${variant}.title`)}</h1>
          </div>
          <p className={styles.intro}>{t(`form.${variant}.intro`)}</p>
        </div>

        {status === "sent" ? (
          <div className={styles.success} role="status">
            <span aria-hidden="true" className={styles.successMark} />
            <p className={styles.eyebrow}>{t("form.success.eyebrow")}</p>
            <h2 className={styles.title}>{t("form.success.title")}</h2>
            <p className={styles.intro}>{t("form.success.text")}</p>
            <p className={styles.successAction}>
              <Link href="/" className={styles.submit}>
                {t("form.success.back")}
                <ArrowRight aria-hidden="true" size={18} />
              </Link>
            </p>
          </div>
        ) : (
          <form className={styles.dossier} onSubmit={handleSubmit}>
            {variant === "brands" ? (
              <>
                <div className={styles.row}>
                  <span aria-hidden="true" className={styles.num}>
                    01
                  </span>
                  <label htmlFor="v2-company">
                    {t("form.brands.fields.company.label")}
                  </label>
                  <input
                    id="v2-company"
                    name="company"
                    type="text"
                    autoComplete="organization"
                    placeholder={t("form.brands.fields.company.placeholder")}
                    required
                    maxLength={120}
                  />
                </div>
                <div className={styles.duo}>
                  <div className={styles.row}>
                    <span aria-hidden="true" className={styles.num}>
                      02
                    </span>
                    <label htmlFor="v2-name">
                      {t("form.brands.fields.name.label")}
                    </label>
                    <input
                      id="v2-name"
                      name="name"
                      type="text"
                      autoComplete="name"
                      placeholder={t("form.brands.fields.name.placeholder")}
                      required
                      minLength={2}
                      maxLength={80}
                    />
                  </div>
                  <div className={styles.row}>
                    <span aria-hidden="true" className={styles.num}>
                      03
                    </span>
                    <label htmlFor="v2-email">
                      {t("form.brands.fields.email.label")}
                    </label>
                    <input
                      id="v2-email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      placeholder={t("form.brands.fields.email.placeholder")}
                      required
                      maxLength={160}
                    />
                  </div>
                </div>
                <div className={styles.row}>
                  <span aria-hidden="true" className={styles.num}>
                    04
                  </span>
                  <label htmlFor="v2-objective">
                    {t("form.brands.fields.objective.label")}
                  </label>
                  <div>
                    <textarea
                      id="v2-objective"
                      name="objective"
                      placeholder={t(
                        "form.brands.fields.objective.placeholder"
                      )}
                      required
                      minLength={20}
                      maxLength={3000}
                      rows={4}
                    />
                    <span className={styles.hint}>{t("form.hint")}</span>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className={styles.duo}>
                  <div className={styles.row}>
                    <span aria-hidden="true" className={styles.num}>
                      01
                    </span>
                    <label htmlFor="v2-name">
                      {t("form.talents.fields.name.label")}
                    </label>
                    <input
                      id="v2-name"
                      name="name"
                      type="text"
                      autoComplete="name"
                      placeholder={t("form.talents.fields.name.placeholder")}
                      required
                      minLength={2}
                      maxLength={80}
                    />
                  </div>
                  <div className={styles.row}>
                    <span aria-hidden="true" className={styles.num}>
                      02
                    </span>
                    <label htmlFor="v2-instagram">
                      {t("form.talents.fields.instagram.label")}
                    </label>
                    <input
                      id="v2-instagram"
                      name="instagram"
                      type="text"
                      autoComplete="off"
                      placeholder={t(
                        "form.talents.fields.instagram.placeholder"
                      )}
                      required
                      maxLength={60}
                    />
                  </div>
                </div>
                <div className={styles.row}>
                  <span aria-hidden="true" className={styles.num}>
                    03
                  </span>
                  <label htmlFor="v2-email">
                    {t("form.talents.fields.email.label")}
                  </label>
                  <input
                    id="v2-email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    placeholder={t("form.talents.fields.email.placeholder")}
                    required
                    maxLength={160}
                  />
                </div>
                <div className={styles.row}>
                  <span aria-hidden="true" className={styles.num}>
                    04
                  </span>
                  <label htmlFor="v2-objective">
                    {t("form.talents.fields.objective.label")}
                  </label>
                  <div>
                    <textarea
                      id="v2-objective"
                      name="objective"
                      placeholder={t(
                        "form.talents.fields.objective.placeholder"
                      )}
                      required
                      minLength={20}
                      maxLength={3000}
                      rows={4}
                    />
                    <span className={styles.hint}>{t("form.hint")}</span>
                  </div>
                </div>
              </>
            )}

            {status === "error" ? (
              <p className={styles.error} role="alert">
                {t("form.error")}
              </p>
            ) : null}

            <div className={styles.foot}>
              <p className={styles.note}>
                {t.rich("form.note", {
                  highlight: (chunks) => <span>{chunks}</span>,
                })}
              </p>
              <button
                type="submit"
                className={styles.submit}
                disabled={status === "sending"}
              >
                {status === "sending" ? (
                  t("form.sending")
                ) : (
                  <>
                    {t("form.submit")}
                    <ArrowRight aria-hidden="true" size={18} />
                  </>
                )}
              </button>
            </div>
            <p className={styles.legal}>
              {t.rich("form.rgpd", {
                privacy: (chunks) => (
                  <Link href="/legal/privacy">{chunks}</Link>
                ),
              })}
            </p>
          </form>
        )}
      </motion.div>
    </main>
  );
}
