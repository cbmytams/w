"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // TODO: brancher un outil de monitoring si nécessaire
    console.error(error);
  }, [error]);

  return (
    <main id="main-content" className="min-h-[70vh] bg-white py-24">
      <Container className="text-center">
        <p className="text-sm uppercase tracking-widest text-slate-400">Erreur 500</p>
        <h1 className="mt-4 text-4xl font-heading font-bold text-slate-900">
          Une erreur est survenue
        </h1>
        <p className="mt-4 text-slate-600">
          Réessayez ou contactez-nous si le problème persiste.
        </p>
        <div className="mt-8 flex justify-center gap-4">
          <Button onClick={() => reset()}>Réessayer</Button>
          <Button variant="outline" asChild>
            <Link href="/contact">Support</Link>
          </Button>
        </div>
      </Container>
    </main>
  );
}
