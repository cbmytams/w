# Layout Components

## Root Layout
- File path: `src/app/layout.tsx`
- Description: Global HTML scaffold, fonts, metadata, page transitions, analytics, cookie banner.

```tsx
import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans, Outfit, Syne } from "next/font/google";
import "./globals.css";
import { PageTransition } from "@/components/layout/PageTransition";
import { siteConfig } from "@/lib/site";
import { organizationSchema, websiteSchema } from "@/lib/structured-data";
import { CookieBanner } from "@/components/compliance/CookieBanner";
import { GoogleAnalytics } from "@/components/analytics/GoogleAnalytics";

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

// Syne: Bold, geometric display font for distinctive headings
const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  weight: ["600", "700", "800"],
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
  alternates: {
    canonical: "/",
  },
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
  colorScheme: "light dark",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#050510" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className="scroll-smooth">
      <body
        className={`${plusJakarta.variable} ${outfit.variable} ${syne.variable} antialiased font-sans`}
        suppressHydrationWarning
      >
        <GoogleAnalytics />
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:rounded-md focus:bg-white focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-slate-900"
        >
          Aller au contenu
        </a>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
        <PageTransition>{children}</PageTransition>
        <CookieBanner />
      </body>
    </html>
  );
}
```

## PageTransition
- File path: `src/components/layout/PageTransition.tsx`
- Description: Wraps pages in a simple opacity animation.

```tsx
"use client"

import { ReactNode } from "react"
import { motion } from "framer-motion"
import { EASING, DURATION } from "@/lib/easing"

interface PageTransitionProps {
    children: ReactNode
}

/**
 * Wraps page content with smooth entry animation
 * Simplified to avoid AnimatePresence conflicts with whileInView animations
 */
export function PageTransition({ children }: PageTransitionProps) {
    return (
        <motion.div
            initial={false}
            animate={{ opacity: 1 }}
            transition={{
                duration: DURATION.fast,
                ease: EASING.apple
            }}
        >
            {children}
        </motion.div>
    )
}
```

## Header (Main Navigation)
- File path: `src/components/layout/header.tsx`
- Description: Global top navigation with mobile menu.

```tsx
"use client"

import * as React from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"
import { Container } from "@/components/ui/container"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { MAIN_NAVIGATION } from "@/constants/navigation"

export function Header() {
    const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false)
    const [scrolled, setScrolled] = React.useState(false)

    React.useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20)
        }
        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    return (
        <header
            className={cn(
                "sticky top-0 z-50 w-full transition-all duration-300",
                scrolled
                    ? "border-b border-slate-200 bg-white/80 backdrop-blur-md"
                    : "bg-transparent py-2"
            )}
        >
            <Container>
                <div className="flex h-16 items-center justify-between">
                    <div className="flex items-center">
                        <Link href="/" className="text-2xl font-bold tracking-tight font-heading">
                            Wafia
                        </Link>
                    </div>
                    <div className="hidden lg:flex lg:gap-x-8">
                        {MAIN_NAVIGATION.map((item) => (
                            <Link
                                key={item.name}
                                href={item.href}
                                className="text-sm font-medium leading-6 text-slate-900 transition-colors hover:text-slate-600"
                            >
                                {item.name}
                            </Link>
                        ))}
                    </div>
                    <div className="hidden lg:flex lg:items-center lg:gap-x-4">
                        <Button variant="ghost" asChild>
                            <Link href="/contact?type=brand">Je suis une Marque</Link>
                        </Button>
                        <Button asChild>
                            <Link href="/contact?type=talent">Je suis un Talent</Link>
                        </Button>
                    </div>
                    <div className="flex lg:hidden">
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-slate-700"
                        >
                            <span className="sr-only">Open main menu</span>
                            {mobileMenuOpen ? (
                                <X className="h-6 w-6" aria-hidden="true" />
                            ) : (
                                <Menu className="h-6 w-6" aria-hidden="true" />
                            )}
                        </Button>
                    </div>
                </div>
            </Container>

            {/* Mobile Menu */}
            {mobileMenuOpen && (
                <div className="lg:hidden absolute top-full left-0 w-full border-b border-slate-200 bg-white shadow-lg">
                    <Container className="py-6 space-y-4">
                        {MAIN_NAVIGATION.map((item) => (
                            <Link
                                key={item.name}
                                href={item.href}
                                className="block text-base font-semibold leading-7 text-slate-900 hover:text-slate-600"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                {item.name}
                            </Link>
                        ))}
                        <div className="mt-6 flex flex-col gap-3">
                            <Button className="w-full justify-center" variant="secondary" asChild onClick={() => setMobileMenuOpen(false)}>
                                <Link href="/contact?type=brand">Marque / Agence</Link>
                            </Button>
                            <Button className="w-full justify-center" asChild onClick={() => setMobileMenuOpen(false)}>
                                <Link href="/contact?type=talent">Talent / Créateur</Link>
                            </Button>
                        </div>
                    </Container>
                </div>
            )}
        </header>
    )
}
```

## PageShell
- File path: `src/components/common/PageShell.tsx`
- Description: Main app shell with background and chrome overlays.

```tsx
import type { ReactNode } from "react"
import { cn } from "@/lib/utils"
import { BackgroundFlow, type BackgroundFlowVariant } from "@/components/common/BackgroundFlow"

type PageChrome = {
    spineLight: string
    spineDark: string
    noiseOpacityLight: number
    noiseOpacityDark: number
}

const CHROME: Record<BackgroundFlowVariant, PageChrome> = {
    brands: {
        spineLight: "linear-gradient(to bottom, transparent, rgba(249,115,22,0.20), transparent)",
        spineDark: "linear-gradient(to bottom, transparent, rgba(236,72,153,0.18), transparent)",
        noiseOpacityLight: 0.03,
        noiseOpacityDark: 0.04
    },
    talents: {
        spineLight: "linear-gradient(to bottom, transparent, rgba(139,92,246,0.18), transparent)",
        spineDark: "linear-gradient(to bottom, transparent, rgba(168,85,247,0.16), transparent)",
        noiseOpacityLight: 0.02,
        noiseOpacityDark: 0.05
    }
}

interface PageShellProps {
    variant?: BackgroundFlowVariant
    nav?: ReactNode
    children: ReactNode
    className?: string
}

export function PageShell({ variant = "brands", nav, children, className }: PageShellProps) {
    const chrome = CHROME[variant]

    return (
        <main
            id="main-content"
            className={cn(
                "min-h-screen relative overflow-x-hidden text-slate-900 dark:text-white bg-transparent",
                className
            )}
        >
            <BackgroundFlow variant={variant} />

            {/* Vertical spine (shared layout) */}
            <div
                className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-px hidden lg:block z-0 pointer-events-none dark:hidden"
                style={{ backgroundImage: chrome.spineLight }}
            />
            <div
                className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-px hidden dark:lg:block z-0 pointer-events-none"
                style={{ backgroundImage: chrome.spineDark }}
            />

            {/* Noise texture overlay */}
            <div
                className="fixed inset-0 pointer-events-none z-[60] bg-[url('/noise.svg')] mix-blend-overlay dark:hidden"
                style={{ opacity: chrome.noiseOpacityLight }}
            />
            <div
                className="fixed inset-0 pointer-events-none z-[60] bg-[url('/noise.svg')] mix-blend-overlay hidden dark:block"
                style={{ opacity: chrome.noiseOpacityDark }}
            />

            <div className="relative z-10">
                {nav}
                {children}
            </div>
        </main>
    )
}
```

## BackgroundFlow
- File path: `src/components/common/BackgroundFlow.tsx`
- Description: Animated background layers for brands/talents variants.

```tsx
"use client"

import { motion, useScroll, useSpring, useTransform } from "framer-motion"
import { useReducedMotion } from "@/hooks/useReducedMotion"

export type BackgroundFlowVariant = "brands" | "talents"

type BackgroundPalette = {
    baseLight: string
    baseDark: string
    phaseLight: string
    phaseDark: string
    auroraA: string
    auroraB: string
    glowA: { strong: string; soft: string }
    glowB: { strong: string; soft: string }
    glowC: { strong: string; soft: string }
    dot: string
}

const PALETTES: Record<BackgroundFlowVariant, BackgroundPalette> = {
    brands: {
        baseLight: "#fff7f1",
        baseDark: "#07080c",
        phaseLight:
            "linear-gradient(180deg,rgba(255,255,255,0.96)_0%,rgba(255,248,243,0.9)_24%,rgba(255,236,224,0.75)_44%,rgba(249,115,22,0.20)_56%,rgba(236,72,153,0.12)_68%,rgba(255,255,255,0.92)_82%,rgba(255,255,255,0.98)_100%)",
        phaseDark:
            "linear-gradient(180deg,rgba(8,8,12,0.96)_0%,rgba(12,12,18,0.92)_26%,rgba(24,22,28,0.88)_42%,rgba(249,115,22,0.24)_56%,rgba(236,72,153,0.14)_68%,rgba(10,10,16,0.95)_82%,rgba(6,6,10,0.98)_100%)",
        auroraA:
            "linear-gradient(120deg,rgba(249,115,22,0.18),rgba(251,146,60,0.16),rgba(236,72,153,0.12),transparent_70%)",
        auroraB:
            "linear-gradient(240deg,rgba(252,211,77,0.16),rgba(249,115,22,0.16),rgba(239,68,68,0.12),transparent_70%)",
        glowA: { strong: "rgba(249,115,22,0.22)", soft: "rgba(249,115,22,0.08)" },
        glowB: { strong: "rgba(56,189,248,0.20)", soft: "rgba(56,189,248,0.07)" },
        glowC: { strong: "rgba(236,72,153,0.18)", soft: "rgba(236,72,153,0.06)" },
        dot: "rgba(249,115,22,0.35)"
    },
    talents: {
        baseLight: "#f8f7ff", // Blanc teinté froid (Spatial Base)
        baseDark: "#050508",  // Deep Space Dark
        phaseLight:
            "linear-gradient(180deg,rgba(255,255,255,0.90)_0%,rgba(248,245,255,0.85)_24%,rgba(240,235,255,0.60)_44%,rgba(124,58,237,0.25)_56%,rgba(79,70,229,0.20)_68%,rgba(255,255,255,0.90)_82%,rgba(255,255,255,0.98)_100%)",
        phaseDark:
            "linear-gradient(180deg,rgba(5,5,8,0.96)_0%,rgba(8,8,12,0.92)_26%,rgba(15,12,24,0.88)_42%,rgba(124,58,237,0.30)_56%,rgba(79,70,229,0.20)_68%,rgba(5,5,8,0.95)_82%,rgba(2,2,4,0.98)_100%)",
        // Aurora: Plus intense et cosmique (Violet/Indigo/Pink)
        auroraA:
            "linear-gradient(120deg,rgba(139,92,246,0.25),rgba(124,58,237,0.22),rgba(167,139,250,0.18),transparent_70%)",
        auroraB:
            "linear-gradient(240deg,rgba(99,102,241,0.22),rgba(124,58,237,0.22),rgba(236,72,153,0.18),transparent_70%)",
        // Glows: "Nebula" style - plus larges et diffus
        glowA: { strong: "rgba(124,58,237,0.30)", soft: "rgba(139,92,246,0.12)" }, // Deep Violet
        glowB: { strong: "rgba(79,70,229,0.28)", soft: "rgba(99,102,241,0.10)" }, // Indigo
        glowC: { strong: "rgba(236,72,153,0.25)", soft: "rgba(244,114,182,0.08)" }, // Pink
        dot: "rgba(124,58,237,0.40)"
    }
}

export function BackgroundFlow({ variant = "brands" }: { variant?: BackgroundFlowVariant }) {
    const prefersReducedMotion = useReducedMotion()
    const { scrollYProgress } = useScroll()

    const smoothProgress = useSpring(scrollYProgress, {
        stiffness: 70,
        damping: 24,
        mass: 0.7
    })

    const ySlow = useTransform(smoothProgress, [0, 1], [-160, 220])
    const yMid = useTransform(smoothProgress, [0, 1], [120, -180])
    const yFast = useTransform(smoothProgress, [0, 1], [180, 260])

    const auroraPosition = useTransform(smoothProgress, (value) => `${40 + value * 30}% ${20 + value * 50}%`)
    const auroraPositionAlt = useTransform(smoothProgress, (value) => `${70 - value * 20}% ${10 + value * 40}%`)
    const phasePosition = useTransform(smoothProgress, (value) => `50% ${value * 100}%`)
    const opacity = useTransform(smoothProgress, [0, 0.5, 1], [0.92, 0.78, 0.88])

    const palette = PALETTES[variant]

    const phasePositionStyle = prefersReducedMotion ? "50% 50%" : phasePosition

    return (
        <div className="pointer-events-none fixed inset-0 z-0">
            {/* Base tone */}
            <div className="absolute inset-0 dark:hidden" style={{ background: palette.baseLight }} />
            <div className="absolute inset-0 hidden dark:block" style={{ background: palette.baseDark }} />

            <motion.div
                style={prefersReducedMotion ? {} : { opacity }}
                className="absolute inset-0"
            />

            {/* Section phase gradient */}
            <motion.div
                style={{
                    backgroundImage: palette.phaseLight,
                    backgroundSize: "100% 220%",
                    backgroundPosition: phasePositionStyle
                }}
                className="absolute inset-0 opacity-[0.80] dark:hidden"
            />
            <motion.div
                style={{
                    backgroundImage: palette.phaseDark,
                    backgroundSize: "100% 220%",
                    backgroundPosition: phasePositionStyle
                }}
                className="absolute inset-0 opacity-[0.70] hidden dark:block"
            />

            {/* Aurora sweeps with animated color transitions */}
            <motion.div
                animate={prefersReducedMotion ? {} : {
                    backgroundPosition: [
                        "40% 20%",
                        "45% 28%",
                        "48% 22%",
                        "40% 20%"
                    ],
                    opacity: [0.60, 0.70, 0.65, 0.60] // Increased opacity for "plus voyant"
                }}
                transition={prefersReducedMotion ? {} : {
                    duration: 18,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
                style={{
                    backgroundImage: palette.auroraA,
                    backgroundSize: "200% 200%"
                }}
                className="absolute inset-0 dark:opacity-[0.50]"
            />
            <motion.div
                animate={prefersReducedMotion ? {} : {
                    backgroundPosition: [
                        "60% 30%",
                        "55% 35%",
                        "58% 28%",
                        "60% 30%"
                    ],
                    opacity: [0.50, 0.60, 0.55, 0.50] // Increased opacity
                }}
                transition={prefersReducedMotion ? {} : {
                    duration: 15,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 2
                }}
                style={{
                    backgroundImage: palette.auroraB,
                    backgroundSize: "220% 220%"
                }}
                className="absolute inset-0 dark:opacity-[0.40]"
            />

            {/* Floating glows with animated opacity */}
            <motion.div
                style={prefersReducedMotion ? {} : { y: ySlow }}
                animate={prefersReducedMotion ? {} : {
                    opacity: [0.85, 0.95, 0.82, 0.85]
                }}
                transition={prefersReducedMotion ? {} : {
                    duration: 12,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
                className="absolute -top-48 left-1/2 h-[640px] w-[980px] -translate-x-1/2 rounded-full blur-[140px] dark:opacity-80"
            >
                <div
                    className="h-full w-full rounded-full"
                    style={{
                        background: `radial-gradient(ellipse_at_center,${palette.glowA.strong} 0%,${palette.glowA.soft} 42%,transparent 70%)`
                    }}
                />
            </motion.div>
            <motion.div
                style={prefersReducedMotion ? {} : { y: yMid }}
                animate={prefersReducedMotion ? {} : {
                    opacity: [0.75, 0.85, 0.72, 0.75]
                }}
                transition={prefersReducedMotion ? {} : {
                    duration: 10,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 1.5
                }}
                className="absolute top-[18%] right-[-8%] h-[600px] w-[760px] rounded-full blur-[150px] dark:opacity-70"
            >
                <div
                    className="h-full w-full rounded-full"
                    style={{
                        background: `radial-gradient(ellipse_at_center,${palette.glowB.strong} 0%,${palette.glowB.soft} 42%,transparent 70%)`
                    }}
                />
            </motion.div>
            <motion.div
                style={prefersReducedMotion ? {} : { y: yFast }}
                animate={prefersReducedMotion ? {} : {
                    opacity: [0.80, 0.90, 0.78, 0.80]
                }}
                transition={prefersReducedMotion ? {} : {
                    duration: 14,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 3
                }}
                className="absolute bottom-[-24%] left-[-12%] h-[680px] w-[820px] rounded-full blur-[160px] dark:opacity-70"
            >
                <div
                    className="h-full w-full rounded-full"
                    style={{
                        background: `radial-gradient(ellipse_at_center,${palette.glowC.strong} 0%,${palette.glowC.soft} 42%,transparent 70%)`
                    }}
                />
            </motion.div>

            {/* Gentle vignette + Stars Texture (Spatial Effect) */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_30%,rgba(2,6,23,0.06)_100%)] dark:bg-[radial-gradient(circle_at_center,transparent_18%,rgba(2,6,23,0.65)_100%)]" />
            <div
                className="absolute inset-0 opacity-[0.25] dark:opacity-[0.20] mix-blend-overlay"
                style={{
                    backgroundImage: `radial-gradient(${palette.dot} 1.5px, transparent 1.5px), radial-gradient(${palette.dot} 1px, transparent 1px)`,
                    backgroundSize: "60px 60px, 30px 30px",
                    backgroundPosition: "0 0, 15px 15px"
                }}
            />
        </div>
    )
}
```

## CookieBanner
- File path: `src/components/compliance/CookieBanner.tsx`
- Description: GDPR consent banner displayed globally.

```tsx
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
```

## GoogleAnalytics
- File path: `src/components/analytics/GoogleAnalytics.tsx`
- Description: Conditionally loads GA based on cookie consent.

```tsx
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
```
