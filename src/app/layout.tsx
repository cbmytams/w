import type { Metadata, Viewport } from "next";
import { Suspense } from "react";
import { Plus_Jakarta_Sans, Outfit } from "next/font/google";
import "./globals.css";
import { PageTransition } from "@/components/layout/PageTransition";
import { GlobalNav } from "@/components/layout/GlobalNav";
import { GlobalBackground } from "@/components/common/GlobalBackground";
import { siteConfig } from "@/lib/site";
import { CookieBanner } from "@/components/compliance/CookieBanner";
import { GoogleAnalytics } from "@/components/analytics/GoogleAnalytics";
import { BfCacheScrollRecovery } from "@/components/common/BfCacheScrollRecovery";
import { organizationSchema, websiteSchema } from "@/lib/structured-data";

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  display: "swap",
});


export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: "Wafia | Influence & Creative Studio",
    template: "%s | Wafia",
  },
  description: siteConfig.description,
  keywords: [
    "influence marketing",
    "talent management",
    "studio créatif",
    "UGC",
    "production contenu",
    "campagnes social media",
  ],
  openGraph: {
    title: "Wafia | Influence & Creative Studio",
    description: siteConfig.description,
    url: siteConfig.url,
    siteName: siteConfig.name,
    locale: siteConfig.locale,
    type: "website",
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: "Wafia",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Wafia | Influence & Creative Studio",
    description: siteConfig.description,
    images: [siteConfig.ogImage],
    creator: siteConfig.twitterHandle || undefined,
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
  },
  manifest: "/manifest.webmanifest",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-video-preview": -1,
      "max-snippet": -1,
    },
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  colorScheme: "light dark",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0b111a" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className="scroll-smooth" data-scroll-behavior="smooth" suppressHydrationWarning>
      <body
        className={`${plusJakarta.variable} ${outfit.variable} antialiased font-sans`}
        suppressHydrationWarning
      >
        <GoogleAnalytics />
        <BfCacheScrollRecovery />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:rounded-md focus:bg-white focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-slate-900"
        >
          Aller au contenu
        </a>
        <Suspense fallback={null}><GlobalBackground /></Suspense>
        <GlobalNav />
        <PageTransition>{children}</PageTransition>
        <CookieBanner />
      </body>
    </html>
  );
}
