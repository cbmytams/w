"use client";

export default function GlobalError({
  error,
  reset
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="fr">
      <body className="min-h-screen flex items-center justify-center px-6">
        <main id="main-content" className="max-w-lg rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm">
          <h1 className="text-2xl font-bold">Erreur globale</h1>
          <p className="mt-3 text-sm text-slate-600">
            Une erreur inattendue est survenue. Réessayez ou revenez plus tard.
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
            Réessayer
          </button>
        </main>
      </body>
    </html>
  );
}
