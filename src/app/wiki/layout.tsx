import type { Metadata } from "next";
import { siteConfig, sitePaths } from "@/lib/site";

export const metadata: Metadata = {
    title: {
        default: "Wiki de l'Influence | Wafia",
        template: "%s | Wiki de l'Influence — Wafia",
    },
    description:
        "Guides, analyses et stratégies pour le marketing d'influence et le digital. Par Wafia.",
    alternates: {
        canonical: sitePaths.wiki,
        types: {
            "application/rss+xml": [
                { url: "/wiki/feed.xml", title: "Wiki de l'Influence — Wafia" },
            ],
        },
    },
    openGraph: {
        title: "Wiki de l'Influence | Wafia",
        description:
            "Guides, analyses et stratégies pour le marketing d'influence et le digital.",
        url: sitePaths.wiki,
        siteName: siteConfig.name,
        type: "website",
        locale: siteConfig.locale,
    },
    twitter: {
        card: "summary_large_image",
        title: "Wiki de l'Influence | Wafia",
        description:
            "Guides, analyses et stratégies pour le marketing d'influence et le digital.",
    },
};

export default function WikiLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
