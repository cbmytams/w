import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/container";

export const metadata: Metadata = {
  title: "Contact",
  description: "Parlons de vos objectifs de marque et de croissance.",
};

export default function ContactPage() {
  return (
    <main
      id="main-content"
      className="min-h-[70vh] bg-white py-24 dark:bg-transparent"
    >
      <Container className="max-w-3xl text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-400">
          Contact
        </p>
        <h1 className="mt-4 text-4xl font-heading font-bold text-slate-900 dark:text-white">
          Parlons de votre projet
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-slate-600 dark:text-white/60">
          Utilisez notre formulaire pour nous partager votre contexte. Nous
          revenons vers vous avec un cadrage rapide et des recommandations
          actionnables.
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/contact/brands"
            className="inline-flex h-11 items-center rounded-full bg-slate-900 px-6 text-sm font-medium text-white transition-opacity hover:opacity-90 dark:bg-white dark:text-slate-900"
          >
            Je suis une marque
          </Link>
          <Link
            href="/contact/talents"
            className="inline-flex h-11 items-center rounded-full border border-slate-300 px-6 text-sm font-medium text-slate-700 transition-colors hover:border-slate-500 dark:border-white/20 dark:text-white/80 dark:hover:border-white/40"
          >
            Je suis un talent
          </Link>
        </div>
      </Container>
    </main>
  );
}
