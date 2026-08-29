"use client";

import { useEffect } from "react";
import * as Sentry from "@sentry/nextjs";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { OrbLink } from "@/components/navigation/OrbLink";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const prefersReducedMotion = useReducedMotion();

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
          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
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
                <OrbLink href="/contact/brands">Support</OrbLink>
              </Button>
            </div>
          </motion.div>
        </Container>
      </main>
    </>
  );
}
