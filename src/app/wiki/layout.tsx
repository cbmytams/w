import type { Metadata } from "next";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Wiki de l'Influence",
  description:
    "Guides, analyses et stratégies sur l'influence, les plateformes et la monétisation des créateurs.",
  alternates: {
    canonical: "/wiki",
  },
  openGraph: {
    title: "Wiki de l'Influence | Wafia",
    description:
      "Guides, analyses et stratégies sur l'influence, les plateformes et la monétisation des créateurs.",
    url: "/wiki",
    siteName: siteConfig.name,
    type: "website",
    locale: siteConfig.locale,
  },
  twitter: {
    card: "summary_large_image",
    title: "Wiki de l'Influence | Wafia",
    description:
      "Guides, analyses et stratégies sur l'influence, les plateformes et la monétisation des créateurs.",
  },
};

export default function WikiLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
