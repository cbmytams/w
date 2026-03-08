import Link from "next/link";

export default function NotFound() {
  return (
    <div className="app-shell flex items-center justify-center px-6 py-16">
      <div className="surface-card p-8 max-w-lg w-full text-center">
        <h1 className="text-2xl font-semibold">404 — Page introuvable</h1>
        <p className="text-sm text-muted mt-3">
          La ressource demandée n&apos;existe pas ou n&apos;est plus disponible.
        </p>
        <Link
          href="/dashboard"
          className="mt-6 inline-flex rounded-full bg-black text-white dark:bg-white dark:text-black px-5 py-2 text-sm font-semibold"
        >
          Retour au dashboard
        </Link>
      </div>
    </div>
  );
}
