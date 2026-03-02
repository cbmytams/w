import type { Metadata } from "next"
import { siteConfig, sitePaths } from "@/lib/site"

export const metadata: Metadata = {
    title: "Politique cookies",
    description: "Informations sur l'utilisation des cookies et le consentement.",
    alternates: {
        canonical: sitePaths.legalCookies,
    },
    openGraph: {
        title: "Politique cookies | Wafia",
        description: "Informations sur l'utilisation des cookies et le consentement.",
        url: sitePaths.legalCookies,
        siteName: siteConfig.name,
        type: "article",
    },
}

export default function CookiesPolicy() {
    return (
        <div className="prose prose-slate dark:prose-invert max-w-none">
            <h1>Politique des Cookies</h1>
            <p>
                Ce site utilise des cookies pour améliorer votre expérience et mesurer l&apos;audience (via Google Analytics si activé).
            </p>
            <p>
                Vous pouvez configurer votre navigateur pour refuser les cookies.
            </p>
        </div>
    )
}
