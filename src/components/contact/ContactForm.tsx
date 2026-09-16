"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, ChevronDown } from "lucide-react";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import styles from "./ContactForm.module.css";

type ContactVariant = "brands" | "talents";

const BRAND_BUDGETS = [
  { value: "under-5k", label: "Moins de 5K€" },
  { value: "5-15k", label: "5 à 15K€" },
  { value: "15-30k", label: "15 à 30K€" },
  { value: "30-50k", label: "30 à 50K€" },
  { value: "over-50k", label: "Plus de 50K€" },
] as const;

const CONTENT: Record<
  ContactVariant,
  {
    eyebrow: string;
    title: string;
    intro: string;
    backHref: string;
    backLabel: string;
  }
> = {
  brands: {
    eyebrow: "Contact marques",
    title: "Parlons de votre prochaine campagne.",
    intro:
      "Décrivez votre projet en quelques lignes, nous revenons vers vous sous 24h avec un premier cadrage.",
    backHref: "/",
    backLabel: "Retour",
  },
  talents: {
    eyebrow: "Contact talents",
    title: "Parlons de votre parcours.",
    intro:
      "Présentez-vous en quelques lignes, nous revenons vers vous sous 24h.",
    backHref: "/",
    backLabel: "Retour",
  },
};

type Status = "idle" | "sending" | "sent" | "error";

export function ContactForm({ variant }: { variant: ContactVariant }) {
  const reduceMotion = useReducedMotion();
  const content = CONTENT[variant];
  const [status, setStatus] = useState<Status>("idle");
  const [serverError, setServerError] = useState("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "sending") return;
    setStatus("sending");
    setServerError("");

    const data = new FormData(event.currentTarget);
    const text = (name: string) => String(data.get(name) ?? "").trim();
    const payload =
      variant === "brands"
        ? {
            name: text("name"),
            email: text("email"),
            company: text("company"),
            message: text("objective"),
            objective: `Budget indicatif : ${text("budget") || "non précisé"}`,
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
      setServerError(
        "L’envoi a échoué. Vérifiez votre connexion puis réessayez."
      );
    }
  }

  return (
    <main className={styles.section}>
      <div className={styles.top}>
        <Link href="/" aria-label="Wafia, accueil" className={styles.logo}>
          <Image
            src="/wafia.svg"
            alt="Wafia"
            width={104}
            height={34}
            priority
          />
        </Link>
        <Link href={content.backHref} className={styles.back}>
          <ArrowLeft aria-hidden="true" size={15} />
          {content.backLabel}
        </Link>
      </div>

      <div className={styles.inner}>
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 18 }}
          animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className={styles.eyebrow}>{content.eyebrow}</p>
          <h1 className={styles.title}>{content.title}</h1>
          <p className={styles.intro}>{content.intro}</p>
          <p className={styles.reassure}>
            <span>Réponse sous 24h.</span> Un interlocuteur, pas un tunnel de
            vente.
          </p>
        </motion.div>

        {status === "sent" ? (
          <div className={styles.success} role="status">
            <span aria-hidden="true" className={styles.successMark} />
            <p className={styles.eyebrow}>Demande envoyée</p>
            <h2 className={styles.title}>Merci, c’est bien reçu.</h2>
            <p className={styles.intro}>
              Nous revenons vers vous sous 24h avec un premier cadrage.
            </p>
            <Link href={content.backHref} className={styles.submit}>
              {content.backLabel}
              <ArrowRight aria-hidden="true" size={17} />
            </Link>
          </div>
        ) : (
          <form className={styles.form} onSubmit={handleSubmit}>
            {variant === "brands" ? (
              <>
                <div className={styles.field}>
                  <label htmlFor="contact-company">Entreprise</label>
                  <input
                    id="contact-company"
                    name="company"
                    type="text"
                    autoComplete="organization"
                    placeholder="Votre marque"
                    required
                    maxLength={120}
                  />
                </div>
                <div className={styles.row}>
                  <div className={styles.field}>
                    <label htmlFor="contact-name">Votre nom</label>
                    <input
                      id="contact-name"
                      name="name"
                      type="text"
                      autoComplete="name"
                      placeholder="Prénom Nom"
                      required
                      minLength={2}
                      maxLength={80}
                    />
                  </div>
                  <div className={styles.field}>
                    <label htmlFor="contact-email">Email professionnel</label>
                    <input
                      id="contact-email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      placeholder="vous@marque.fr"
                      required
                      maxLength={160}
                    />
                  </div>
                </div>
                <div className={styles.field}>
                  <label htmlFor="contact-budget">Budget indicatif</label>
                  <div className={styles.selectWrap}>
                    <select id="contact-budget" name="budget" defaultValue="">
                      <option value="" disabled>
                        Sélectionner une fourchette
                      </option>
                      {BRAND_BUDGETS.map((budget) => (
                        <option key={budget.value} value={budget.label}>
                          {budget.label}
                        </option>
                      ))}
                    </select>
                    <ChevronDown aria-hidden="true" size={17} />
                  </div>
                </div>
                <div className={styles.field}>
                  <label htmlFor="contact-objective">Votre projet</label>
                  <textarea
                    id="contact-objective"
                    name="objective"
                    placeholder="Contexte, enjeux, timing."
                    required
                    minLength={20}
                    maxLength={3000}
                    rows={4}
                  />
                  <span className={styles.hint}>20 caractères minimum.</span>
                </div>
              </>
            ) : (
              <>
                <div className={styles.row}>
                  <div className={styles.field}>
                    <label htmlFor="contact-name">Nom complet</label>
                    <input
                      id="contact-name"
                      name="name"
                      type="text"
                      autoComplete="name"
                      placeholder="Prénom Nom"
                      required
                      minLength={2}
                      maxLength={80}
                    />
                  </div>
                  <div className={styles.field}>
                    <label htmlFor="contact-instagram">Instagram</label>
                    <input
                      id="contact-instagram"
                      name="instagram"
                      type="text"
                      autoComplete="off"
                      placeholder="@pseudo"
                      required
                      maxLength={60}
                    />
                  </div>
                </div>
                <div className={styles.field}>
                  <label htmlFor="contact-email">Email</label>
                  <input
                    id="contact-email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    placeholder="vous@email.fr"
                    required
                    maxLength={160}
                  />
                </div>
                <div className={styles.field}>
                  <label htmlFor="contact-objective">Votre parcours</label>
                  <textarea
                    id="contact-objective"
                    name="objective"
                    placeholder="Contenus, audience, objectifs."
                    required
                    minLength={20}
                    maxLength={3000}
                    rows={4}
                  />
                  <span className={styles.hint}>20 caractères minimum.</span>
                </div>
              </>
            )}

            {status === "error" ? (
              <p className={styles.error} role="alert">
                {serverError}
              </p>
            ) : null}

            <button
              type="submit"
              className={styles.submit}
              disabled={status === "sending"}
            >
              {status === "sending" ? (
                "Envoi en cours"
              ) : (
                <>
                  Envoyer
                  <ArrowRight aria-hidden="true" size={17} />
                </>
              )}
            </button>
          </form>
        )}
      </div>
    </main>
  );
}
