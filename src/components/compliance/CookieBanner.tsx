"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { getStoredConsent, setStoredConsent, type CookieConsent } from "@/hooks/useCookieConsent";

export function CookieBanner() {
  const [consent, setConsent] = useState<CookieConsent>(null);

  useEffect(() => {
    const handler = () => setConsent(getStoredConsent());
    handler(); // Initialize state
  }, []);

  if (consent) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-slate-200 bg-white/95 backdrop-blur-md dark:border-zinc-700 dark:bg-zinc-900/95">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-6 py-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="text-sm text-slate-600 dark:text-zinc-300">
          Nous utilisons des cookies pour améliorer l&apos;expérience et mesurer la performance.
          Consultez notre{" "}
          <Link href="/legal/cookies" className="font-semibold text-slate-900 underline underline-offset-4 dark:text-white">
            politique cookies
          </Link>
          .
        </div>
        <div className="flex items-center gap-3">
          <button
            type="button"
            className="inline-flex h-11 items-center justify-center rounded-full border border-slate-300 bg-transparent px-6 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-100 dark:border-zinc-600 dark:text-zinc-200 dark:hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-900 dark:focus-visible:outline-white"
            onClick={() => {
              setStoredConsent("declined");
              setConsent("declined");
            }}
          >
            Refuser
          </button>
          <Button
            onClick={() => {
              setStoredConsent("accepted");
              setConsent("accepted");
            }}
          >
            Accepter
          </Button>
        </div>
      </div>
    </div>
  );
}
