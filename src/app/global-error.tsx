"use client";

import { useEffect } from "react";
import * as Sentry from "@sentry/nextjs";

/**
 * Replaces the root layout, so it has no NextIntlClientProvider and no locale:
 * the copy is deliberately language-neutral (brand title) plus a short
 * bilingual FR/EN message, not next-intl.
 */
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    Sentry.captureException(error);
  }, [error]);

  return (
    <html lang="fr">
      <head>
        <title>Wafia</title>
        <meta name="robots" content="noindex, follow" />
      </head>
      <body className="min-h-screen flex items-center justify-center px-6">
        <main
          id="main-content"
          className="max-w-lg rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm"
        >
          <h1 className="text-2xl font-bold">Wafia</h1>
          <p lang="fr" className="mt-3 text-sm text-slate-600">
            Une erreur inattendue est survenue. Réessayez ou revenez plus tard.
          </p>
          <p lang="en" className="mt-2 text-sm text-slate-600">
            An unexpected error occurred. Try again or come back later.
          </p>
          {process.env.NODE_ENV !== "production" && (
            <pre className="mt-4 rounded-lg bg-slate-100 p-3 text-left text-xs text-slate-700 overflow-auto">
              {error.message}
            </pre>
          )}
          <button
            onClick={reset}
            className="mt-6 inline-flex items-center rounded-full bg-black px-5 py-2 text-sm font-semibold text-white"
          >
            <span lang="fr">Réessayer</span>
            <span aria-hidden="true">&nbsp;/&nbsp;</span>
            <span lang="en">Try again</span>
          </button>
        </main>
      </body>
    </html>
  );
}
