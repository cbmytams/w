import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";

export default function NotFound() {
  return (
    <main id="main-content" className="min-h-[70vh] bg-white py-24">
      <Container className="text-center">
        <p className="text-sm uppercase tracking-widest text-slate-400">Erreur 404</p>
        <h1 className="mt-4 text-4xl font-heading font-bold text-slate-900">
          Page introuvable
        </h1>
        <p className="mt-4 text-slate-600">
          La page demandée n&apos;existe pas ou a été déplacée.
        </p>
        <div className="mt-8 flex justify-center gap-4">
          <Button asChild>
            <Link href="/">Retour à l&apos;accueil</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/contact">Nous contacter</Link>
          </Button>
        </div>
      </Container>
    </main>
  );
}
