import type { Metadata } from "next";
import { Suspense } from "react";
import { getWikiArticleSummaries } from "@/lib/wiki";
import { siteConfig } from "@/lib/site";
import WikiIndexView from "@/components/wiki/WikiIndexView";
import { collectionPageSchema } from "@/lib/structured-data";

const WIKI_TITLE = "Wiki de l'Influence";
const WIKI_DESCRIPTION =
  "Guides, analyses et stratégies sur l'influence, les plateformes et la monétisation des créateurs.";

export const dynamic = "force-static";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: WIKI_TITLE,
    description: WIKI_DESCRIPTION,
    alternates: {
      canonical: "/wiki",
    },
    openGraph: {
      title: `${WIKI_TITLE} | Wafia`,
      description: WIKI_DESCRIPTION,
      url: new URL("/wiki", siteConfig.url).toString(),
      type: "website",
      locale: "fr_FR",
    },
    twitter: {
      card: "summary_large_image",
      title: `${WIKI_TITLE} | Wafia`,
      description: WIKI_DESCRIPTION,
    },
  };
}

export default async function WikiIndexPage() {
  const articleSummaries = await getWikiArticleSummaries();
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            collectionPageSchema({
              name: WIKI_TITLE,
              description: WIKI_DESCRIPTION,
              url: new URL("/wiki", siteConfig.url).toString(),
              items: articleSummaries.map((article) => ({
                name: article.title,
                url: new URL(`/wiki/${article.slug}`, siteConfig.url).toString(),
              })),
            }),
          ),
        }}
      />
      <Suspense fallback={null}>
        <WikiIndexView articles={articleSummaries} />
      </Suspense>
    </>
  );
}
