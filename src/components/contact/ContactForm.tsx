"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { WafiaLogo } from "@/components/ui/WafiaLogo";
import { OrbLink } from "@/components/navigation/OrbLink";

type ContactVariant = "brands" | "talents";

type FormData = {
  company: string;
  name: string;
  email: string;
  budget: string;
  objective: string;
  instagram: string;
};

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const BRAND_BUDGETS = [
  { value: "under-5k", label: "< 5K€" },
  { value: "5-15k", label: "5 – 15K€" },
  { value: "15-30k", label: "15 – 30K€" },
  { value: "30-50k", label: "30 – 50K€" },
  { value: "over-50k", label: "50K€+" },
] as const;

const CONTENT: Record<
  ContactVariant,
  {
    title: string;
    intro: string;
    backHref: string;
    backLabel: string;
    submitLabel: string;
  }
> = {
  brands: {
    title: "Parlez-nous de votre campagne",
    intro: "Décrivez votre projet, nous revenons vers vous sous 24h.",
    backHref: "/for-brands",
    backLabel: "Retour marques",
    submitLabel: "Envoyer",
  },
  talents: {
    title: "Parlez-nous de votre carrière",
    intro: "Quelques mots sur vous, nous revenons vers vous sous 24h.",
    backHref: "/for-talents",
    backLabel: "Retour talents",
    submitLabel: "Envoyer",
  },
};

const INPUT_CLASS =
  "w-full rounded-xl border border-slate-300/80 bg-white px-4 py-3.5 text-slate-950 placeholder-slate-500 shadow-sm outline-none transition-all focus:border-slate-950 focus:ring-2 focus:ring-slate-950/10";

export function ContactForm({ variant }: { variant: ContactVariant }) {
  const prefersReducedMotion = useReducedMotion() ?? false;
  const [submitted, setSubmitted] = useState(false);

  // Dark-first glass design: force the dark theme while mounted, then
  // restore the previous state when leaving (same pattern as the orb home).
  useEffect(() => {
    const el = document.documentElement;
    const hadDarkElsewhere = el.classList.contains("dark");
    el.classList.add("dark");
    return () => {
      if (!hadDarkElsewhere) el.classList.remove("dark");
    };
  }, []);

  const [formData, setFormData] = useState<FormData>({
    company: "",
    name: "",
    email: "",
    budget: "",
    objective: "",
    instagram: "",
  });

  const content = CONTENT[variant];

  const setField = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }) as FormData);
  };

  const motionProps = prefersReducedMotion
    ? {}
    : {
        initial: { opacity: 0, y: 18 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.55, ease: EASE },
      };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="relative z-10 flex min-h-screen w-full flex-col items-center justify-center px-5 py-24 sm:px-8">
      <div className="absolute inset-0 bg-white/35 backdrop-blur-[2px] dark:bg-slate-950/20" />
      <header className="absolute inset-x-0 top-0 flex items-center justify-between px-5 py-5 sm:px-8">
        <OrbLink
          href="/"
          className="flex h-12 items-center gap-2.5 rounded-full border border-slate-900/10 bg-slate-950/75 px-5 shadow-lg shadow-slate-950/10 backdrop-blur-[40px] saturate-150 transition-all duration-300 hover:scale-105 hover:bg-slate-950/90"
        >
          <WafiaLogo className="h-4 w-auto text-white" />
          <span className="text-xs font-bold uppercase tracking-[0.18em] text-white">
            Wafia
          </span>
        </OrbLink>
        <OrbLink
          href={content.backHref}
          className="inline-flex items-center gap-2 rounded-full bg-white/80 px-4 py-2 text-sm font-semibold text-slate-800 shadow-sm ring-1 ring-slate-900/10 backdrop-blur-xl transition-colors hover:bg-white hover:text-slate-950"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>{content.backLabel}</span>
        </OrbLink>
      </header>

      <main
        id="main-content"
        className="relative w-full max-w-lg"
        aria-label="Formulaire de contact"
      >
        {submitted ? (
          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="rounded-[1.75rem] border border-slate-900/10 bg-white/92 p-8 text-center shadow-2xl shadow-slate-950/15 backdrop-blur-2xl"
          >
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-green-500/10">
              <svg
                className="h-8 w-8 text-green-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <h1 className="mb-2 text-2xl font-semibold text-slate-950">
              Demande envoyée
            </h1>
            <p className="mb-8 text-slate-600">
              Merci ! Nous revenons vers vous sous 24h.
            </p>
            <OrbLink
              href={content.backHref}
              className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-medium text-slate-900 transition-opacity hover:opacity-90"
            >
              {content.backLabel}
            </OrbLink>
          </motion.div>
        ) : (
          <section className="rounded-[1.75rem] border border-slate-900/10 bg-white/92 p-6 shadow-2xl shadow-slate-950/15 backdrop-blur-2xl sm:p-8">
            <motion.div {...motionProps}>
              <h1 className="mb-3 text-3xl font-semibold text-slate-950">
                {content.title}
              </h1>
              <p className="mb-8 text-slate-600">{content.intro}</p>
            </motion.div>

            <motion.form
              onSubmit={handleSubmit}
              className="space-y-4"
              {...(prefersReducedMotion
                ? {}
                : {
                    initial: { opacity: 0, y: 18 },
                    animate: { opacity: 1, y: 0 },
                    transition: {
                      duration: 0.55,
                      delay: 0.1,
                      ease: EASE,
                    },
                  })}
            >
              {variant === "brands" ? (
                <>
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={(e) => setField("company", e.target.value)}
                    placeholder="Entreprise"
                    required
                    aria-label="Entreprise"
                    className={INPUT_CLASS}
                  />
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={(e) => setField("name", e.target.value)}
                    placeholder="Votre nom"
                    required
                    aria-label="Votre nom"
                    className={INPUT_CLASS}
                  />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={(e) => setField("email", e.target.value)}
                    placeholder="Email professionnel"
                    required
                    aria-label="Email professionnel"
                    className={INPUT_CLASS}
                  />
                  <select
                    name="budget"
                    value={formData.budget}
                    onChange={(e) => setField("budget", e.target.value)}
                    required
                    aria-label="Budget"
                    className={`${INPUT_CLASS} appearance-none`}
                  >
                    <option value="" disabled className="bg-[#1c1c1e]">
                      Budget
                    </option>
                    {BRAND_BUDGETS.map((b) => (
                      <option
                        key={b.value}
                        value={b.value}
                        className="bg-white text-slate-950"
                      >
                        {b.label}
                      </option>
                    ))}
                  </select>
                  <textarea
                    name="objective"
                    value={formData.objective}
                    onChange={(e) => setField("objective", e.target.value)}
                    placeholder="Votre objectif (optionnel)"
                    rows={3}
                    aria-label="Votre objectif (optionnel)"
                    className={`${INPUT_CLASS} resize-none`}
                  />
                </>
              ) : (
                <>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={(e) => setField("name", e.target.value)}
                    placeholder="Nom complet"
                    required
                    aria-label="Nom complet"
                    className={INPUT_CLASS}
                  />
                  <input
                    type="text"
                    name="instagram"
                    value={formData.instagram}
                    onChange={(e) => setField("instagram", e.target.value)}
                    placeholder="Instagram (@pseudo)"
                    required
                    aria-label="Instagram"
                    className={INPUT_CLASS}
                  />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={(e) => setField("email", e.target.value)}
                    placeholder="Email"
                    required
                    aria-label="Email"
                    className={INPUT_CLASS}
                  />
                  <textarea
                    name="objective"
                    value={formData.objective}
                    onChange={(e) => setField("objective", e.target.value)}
                    placeholder="Votre objectif (optionnel)"
                    rows={3}
                    aria-label="Votre objectif (optionnel)"
                    className={`${INPUT_CLASS} resize-none`}
                  />
                </>
              )}

              <motion.button
                type="submit"
                whileTap={prefersReducedMotion ? undefined : { scale: 0.98 }}
                className="w-full rounded-xl bg-slate-950 py-3.5 font-semibold text-white transition-colors hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-950/20 focus:ring-offset-2"
              >
                {content.submitLabel}
              </motion.button>
            </motion.form>
          </section>
        )}
      </main>
    </div>
  );
}
