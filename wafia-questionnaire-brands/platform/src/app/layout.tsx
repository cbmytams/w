import type { Metadata } from "next";
import { Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-sans",
  subsets: ["latin"],
});

const jetBrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "WAFIA BDD Talents",
  description: "Plateforme de gestion de talents et de performances.",
  openGraph: {
    title: "WAFIA BDD Talents",
    description: "Plateforme de gestion de talents et de performances.",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "WAFIA BDD Talents",
    description: "Plateforme de gestion de talents et de performances.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body
        className={`${spaceGrotesk.variable} ${jetBrainsMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
