"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { getStoredConsent, setStoredConsent, type CookieConsent } from "@/hooks/useCookieConsent";

export function CookieBanner() {
  const [consent, setConsent] = useState<CookieConsent>(null);

  useEffect(() => {
    setConsent(getStoredConsent());
  }, []);

  if (consent) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-slate-200 bg-white/95 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-6 py-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="text-sm text-slate-600">
          Nous utilisons des cookies pour améliorer l&apos;expérience et mesurer la performance.
          Consultez notre{" "}
          <Link href="/legal/cookies" className="font-semibold text-slate-900 underline underline-offset-4">
            politique cookies
          </Link>
          .
        </div>
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            onClick={() => {
              setStoredConsent("declined");
              setConsent("declined");
            }}
          >
            Refuser
          </Button>
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
