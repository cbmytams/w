import type { Metadata } from "next";
import { siteConfig, sitePaths } from "@/lib/site";
import { breadcrumbSchema } from "@/lib/structured-data";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Parlons de votre projet : contactez Wafia pour une campagne d'influence, du studio ou du talent management.",
  alternates: {
    canonical: sitePaths.contact,
  },
  openGraph: {
    title: "Contact | Wafia",
    description:
      "Parlons de votre projet : contactez Wafia pour une campagne d'influence, du studio ou du talent management.",
    url: sitePaths.contact,
    siteName: siteConfig.name,
    type: "website",
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {children}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbSchema([
              { name: "Accueil", url: new URL(sitePaths.home, siteConfig.url).toString() },
              { name: "Contact", url: new URL(sitePaths.contact, siteConfig.url).toString() },
            ])
          ),
        }}
      />
    </>
  );
}
