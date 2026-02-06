"use client";

import Script from "next/script";
import { useCookieConsent } from "@/hooks/useCookieConsent";

export function GoogleAnalytics() {
  const consent = useCookieConsent();
  const gaId = process.env.NEXT_PUBLIC_GA_ID;

  if (!gaId || consent !== "accepted") return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
        strategy="afterInteractive"
      />
      <Script id="ga-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);} 
          gtag('js', new Date());
          gtag('config', '${gaId}', { anonymize_ip: true });
        `}
      </Script>
    </>
  );
}
