import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Contact",
  description: "Parlons de vos objectifs de marque et de croissance.",
};

export default function ContactPage() {
  return (
    <main id="main-content" className="min-h-[70vh] bg-white py-24">
      <Container className="max-w-3xl text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-400">
          Contact
        </p>
        <h1 className="mt-4 text-4xl font-heading font-bold text-slate-900">
          Parlons de votre projet
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-slate-600">
          Utilisez notre formulaire pour nous partager votre contexte. Nous
          revenons vers vous avec un cadrage rapide et des recommandations
          actionnables.
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Button asChild>
            <Link href="/for-brands">Réserver un appel</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/for-talents">Je suis un talent</Link>
          </Button>
        </div>
      </Container>
    </main>
  );
}
