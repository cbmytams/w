"use client";

import { useEffect } from "react";
import * as Sentry from "@sentry/nextjs";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    Sentry.captureException(error);
    if (process.env.NODE_ENV !== "production") {
      console.error(error);
    }
  }, [error]);

  return (
    <>
      <title>Erreur – Wafia</title>
      <meta name="robots" content="noindex, follow" />
      <main id="main-content" className="min-h-[70vh] bg-white py-24">
        <Container className="text-center">
          <p className="text-sm uppercase tracking-widest text-slate-400">
            Erreur 500
          </p>
          <h1 className="mt-4 text-4xl font-heading font-bold text-slate-900">
            Une erreur est survenue
          </h1>
          <p className="mt-4 text-slate-600">
            Réessayez ou contactez-nous si le problème persiste.
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <Button onClick={() => reset()}>Réessayer</Button>
            <Button variant="outline" asChild>
              <Link href="/contact/brands">Support</Link>
            </Button>
          </div>
        </Container>
      </main>
    </>
  );
}
