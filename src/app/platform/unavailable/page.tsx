import Link from "next/link";

type UnavailableSearchParams = Promise<{
  target?: string;
}>;

export default async function PlatformUnavailablePage({
  searchParams
}: {
  searchParams: UnavailableSearchParams;
}) {
  const params = await searchParams;
  const target = typeof params.target === "string" ? params.target : "/platform/login";

  return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center px-6">
      <div className="max-w-xl w-full border border-white/10 rounded-2xl p-8 bg-white/[0.03]">
        <p className="text-xs uppercase tracking-[0.25em] text-white/60">Plateforme Admin</p>
        <h1 className="mt-3 text-2xl font-semibold">Plateforme momentanément indisponible</h1>
        <p className="mt-3 text-sm text-white/70">
          Le service admin n&apos;est pas joignable pour le moment. Vérifie que le serveur
          platform est démarré, puis réessaie.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href={target}
            className="rounded-full bg-white text-black px-5 py-2 text-sm font-semibold"
          >
            Réessayer
          </Link>
          <Link
            href="/"
            className="rounded-full border border-white/20 px-5 py-2 text-sm text-white/90"
          >
            Retour accueil
          </Link>
        </div>
      </div>
    </main>
  );
}
