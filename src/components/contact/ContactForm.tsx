"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import styles from "./ContactForm.module.css";

type ContactVariant = "brands" | "talents";

const CONTENT: Record<
  ContactVariant,
  { eyebrow: string; title: string; intro: string }
> = {
  brands: {
    eyebrow: "Contact marques",
    title: "Remplissez le dossier.",
    intro:
      "Le brief qui lance tout : votre marque, vos coordonnées, votre projet. Vous recevez sous 24h un premier cadrage.",
  },
  talents: {
    eyebrow: "Contact talents",
    title: "Remplissez le dossier.",
    intro:
      "Qui vous êtes, où vous suivre, où vous voulez aller. Nous revenons vers vous sous 24h.",
  },
};

type Status = "idle" | "sending" | "sent" | "error";

export function ContactForm({ variant }: { variant: ContactVariant }) {
  const reduceMotion = useReducedMotion();
  const content = CONTENT[variant];
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

  const entrance = reduceMotion
    ? {}
    : {
        initial: { opacity: 0, y: 18 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as const },
      };

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
        <Link href="/" className={styles.back}>
          <ArrowLeft aria-hidden="true" size={15} />
          Retour
        </Link>
      </div>

      <motion.div {...entrance}>
        <div className={styles.head}>
          <div>
            <p className={styles.eyebrow}>{content.eyebrow}</p>
            <h1 className={styles.title}>{content.title}</h1>
          </div>
          <p className={styles.intro}>{content.intro}</p>
        </div>

        {status === "sent" ? (
          <div className={styles.success} role="status">
            <span aria-hidden="true" className={styles.successMark} />
            <p className={styles.eyebrow}>Dossier reçu</p>
            <h2 className={styles.title}>Merci, c’est bien reçu.</h2>
            <p className={styles.intro}>Nous revenons vers vous sous 24h.</p>
            <p style={{ marginTop: 28 }}>
              <Link href="/" className={styles.submit}>
                Retour
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
                  <label htmlFor="v2-company">Entreprise</label>
                  <input
                    id="v2-company"
                    name="company"
                    type="text"
                    autoComplete="organization"
                    placeholder="Votre marque"
                    required
                    maxLength={120}
                  />
                </div>
                <div className={styles.duo}>
                  <div className={styles.row}>
                    <span aria-hidden="true" className={styles.num}>
                      02
                    </span>
                    <label htmlFor="v2-name">Votre nom</label>
                    <input
                      id="v2-name"
                      name="name"
                      type="text"
                      autoComplete="name"
                      placeholder="Prénom Nom"
                      required
                      minLength={2}
                      maxLength={80}
                    />
                  </div>
                  <div className={styles.row}>
                    <span aria-hidden="true" className={styles.num}>
                      03
                    </span>
                    <label htmlFor="v2-email">Email pro</label>
                    <input
                      id="v2-email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      placeholder="vous@marque.fr"
                      required
                      maxLength={160}
                    />
                  </div>
                </div>
                <div className={styles.row}>
                  <span aria-hidden="true" className={styles.num}>
                    04
                  </span>
                  <label htmlFor="v2-objective">Votre projet</label>
                  <div>
                    <textarea
                      id="v2-objective"
                      name="objective"
                      placeholder="Contexte, enjeux, timing."
                      required
                      minLength={20}
                      maxLength={3000}
                      rows={4}
                    />
                    <span className={styles.hint}>20 caractères minimum.</span>
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
                    <label htmlFor="v2-name">Nom complet</label>
                    <input
                      id="v2-name"
                      name="name"
                      type="text"
                      autoComplete="name"
                      placeholder="Prénom Nom"
                      required
                      minLength={2}
                      maxLength={80}
                    />
                  </div>
                  <div className={styles.row}>
                    <span aria-hidden="true" className={styles.num}>
                      02
                    </span>
                    <label htmlFor="v2-instagram">Instagram</label>
                    <input
                      id="v2-instagram"
                      name="instagram"
                      type="text"
                      autoComplete="off"
                      placeholder="@pseudo"
                      required
                      maxLength={60}
                    />
                  </div>
                </div>
                <div className={styles.row}>
                  <span aria-hidden="true" className={styles.num}>
                    03
                  </span>
                  <label htmlFor="v2-email">Email</label>
                  <input
                    id="v2-email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    placeholder="vous@email.fr"
                    required
                    maxLength={160}
                  />
                </div>
                <div className={styles.row}>
                  <span aria-hidden="true" className={styles.num}>
                    04
                  </span>
                  <label htmlFor="v2-objective">Votre parcours</label>
                  <div>
                    <textarea
                      id="v2-objective"
                      name="objective"
                      placeholder="Contenus, audience, objectifs."
                      required
                      minLength={20}
                      maxLength={3000}
                      rows={4}
                    />
                    <span className={styles.hint}>20 caractères minimum.</span>
                  </div>
                </div>
              </>
            )}

            {status === "error" ? (
              <p className={styles.error} role="alert">
                L’envoi a échoué. Vérifiez votre connexion puis réessayez.
              </p>
            ) : null}

            <div className={styles.foot}>
              <p className={styles.note}>
                <span>Réponse sous 24h.</span> Un interlocuteur, pas un tunnel
                de vente.
              </p>
              <button
                type="submit"
                className={styles.submit}
                disabled={status === "sending"}
              >
                {status === "sending" ? (
                  "Envoi en cours"
                ) : (
                  <>
                    Envoyer le dossier
                    <ArrowRight aria-hidden="true" size={18} />
                  </>
                )}
              </button>
            </div>
          </form>
        )}
      </motion.div>
    </main>
  );
}
