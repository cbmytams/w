"use client";

export default function Error({
  error,
  reset
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="app-shell flex items-center justify-center px-6 py-16">
      <div className="surface-card p-8 max-w-lg w-full text-center">
        <h1 className="text-2xl font-semibold">Erreur applicative</h1>
        <p className="text-sm text-muted mt-3">
          Une erreur est survenue pendant le chargement de cette page.
        </p>
        {process.env.NODE_ENV !== "production" && (
          <pre className="mt-4 text-left text-xs rounded-lg bg-black/5 dark:bg-white/5 p-3 overflow-auto">
            {error.message}
          </pre>
        )}
        <button
          onClick={reset}
          className="mt-6 rounded-full bg-black text-white dark:bg-white dark:text-black px-5 py-2 text-sm font-semibold"
        >
          Réessayer
        </button>
      </div>
    </div>
  );
}
