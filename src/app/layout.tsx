import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans, Outfit } from "next/font/google";
import { headers } from "next/headers";
import { NextIntlClientProvider } from "next-intl";
import { getLocale, getTranslations } from "next-intl/server";
import "./globals.css";
import { PageTransition } from "@/components/layout/PageTransition";
import { GlobalNav } from "@/components/layout/GlobalNav";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { GlobalMotionConfig } from "@/components/layout/GlobalMotionConfig";
import { siteConfig } from "@/lib/site";
import { GoogleAnalytics } from "@/components/analytics/GoogleAnalytics";
import { BfCacheScrollRecovery } from "@/components/common/BfCacheScrollRecovery";
import { organizationSchema, getWebsiteSchema } from "@/lib/structured-data";
import { defaultLocale, locales } from "@/i18n/config";

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

// Pages with the dark hero (home, contact) get `dark` before first paint; the
// locale prefix (/en…) is stripped first so every language behaves the same.
const LOCALE_PREFIX = locales.filter((l) => l !== defaultLocale).join("|");
const DARK_ROUTE_SCRIPT = `try{var p=location.pathname.replace(/^\/(${LOCALE_PREFIX})(?=\/|$)/,"")||"/";if(p==="/"||p.startsWith("/contact")){document.documentElement.classList.add("dark")}}catch(e){}`;

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const t = await getTranslations({ locale, namespace: "metadata" });
  const title = t("site.title");
  const description = t("site.description");

  return {
    metadataBase: new URL(siteConfig.url),
    title: {
      default: title,
      template: "%s | Wafia",
    },
    description,
    keywords: t.raw("site.keywords") as string[],
    openGraph: {
      title,
      description,
      url: siteConfig.url,
      siteName: siteConfig.name,
      locale: t("ogLocale"),
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
      title,
      description,
      images: [siteConfig.ogImage],
      creator: siteConfig.twitterHandle || undefined,
    },
    icons: {
      icon: [
        { url: "/icon.svg", type: "image/svg+xml" },
        { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
      ],
      shortcut: "/icon.svg",
      apple: [
        { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
      ],
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
}

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

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const nonce = (await headers()).get("x-nonce") || undefined;
  const locale = await getLocale();
  const t = await getTranslations({ locale, namespace: "common" });

  return (
    <html
      lang={locale}
      className="scroll-smooth"
      data-scroll-behavior="smooth"
      suppressHydrationWarning
    >
      <head>
        {nonce ? <meta property="csp-nonce" content={nonce} /> : null}
      </head>
      <body
        className={`${plusJakarta.variable} ${outfit.variable} antialiased font-sans`}
        suppressHydrationWarning
      >
        <GoogleAnalytics />
        <BfCacheScrollRecovery />
        <script
          nonce={nonce}
          suppressHydrationWarning
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
          }}
        />
        <script
          nonce={nonce}
          suppressHydrationWarning
          dangerouslySetInnerHTML={{
            __html: DARK_ROUTE_SCRIPT,
          }}
        />
        <script
          nonce={nonce}
          suppressHydrationWarning
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(getWebsiteSchema(locale)),
          }}
        />
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:rounded-md focus:bg-white focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-slate-900"
        >
          {t("skipToContent")}
        </a>
        <NextIntlClientProvider>
          <GlobalMotionConfig>
            <GlobalNav />
            <PageTransition>{children}</PageTransition>
            <SiteFooter />
          </GlobalMotionConfig>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
