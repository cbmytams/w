import { getAllWikiArticles } from "@/lib/wiki";
import { siteConfig, sitePaths } from "@/lib/site";
import {
    breadcrumbSchema,
    collectionPageSchema,
} from "@/lib/structured-data";
import WikiIndexView from "@/components/wiki/WikiIndexView";

/**
 * Wiki index — SSG page.
 *
 * Server Component handles: metadata, JSON-LD, data fetching.
 * Client Component (WikiIndexView) handles: tabs, animations, dark mode.
 * All content is in the initial HTML for SEO.
 */
export default async function WikiIndexPage() {
    const articles = await getAllWikiArticles();

    // ── JSON-LD ──────────────────────────────────────────────────
    const collectionLd = collectionPageSchema({
        name: "Wiki de l'Influence",
        description:
            "Guides, analyses et stratégies pour le marketing d'influence et le digital.",
        url: new URL(sitePaths.wiki, siteConfig.url).toString(),
        items: articles.map((a) => ({
            url: new URL(`/wiki/${a.slug}`, siteConfig.url).toString(),
            name: a.title,
        })),
    });

    const breadcrumbLd = breadcrumbSchema([
        { name: "Accueil", url: new URL("/", siteConfig.url).toString() },
        {
            name: "Wiki",
            url: new URL(sitePaths.wiki, siteConfig.url).toString(),
        },
    ]);

    // Serializable article data for the client component
    const articleSummaries = articles.map((a) => ({
        slug: a.slug,
        title: a.title,
        category: a.category,
        readTime: a.readTime,
        theme: a.theme,
        platform: a.platform,
    }));

    return (
        <>
            {/* Structured data — server-rendered for crawlers */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionLd) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
            />

            {/* Client-side interactive view — same design as original Vite SPA */}
            <WikiIndexView articles={articleSummaries} />
        </>
    );
}
