import type { Metadata } from "next";
import { notFound } from "next/navigation";
import WikiCategoryView from "@/components/wiki/WikiCategoryView";
import {
  WIKI_THEME_LABELS,
  getWikiArticleSummaries,
  getWikiThemes,
} from "@/lib/wiki";
import { siteConfig } from "@/lib/site";
import { collectionPageSchema } from "@/lib/structured-data";

interface WikiThemePageProps {
  params: Promise<{
    id: string;
  }>;
}

export const dynamic = "force-static";
export const dynamicParams = false;

export async function generateStaticParams(): Promise<Array<{ id: string }>> {
  const themes = await getWikiThemes();
  return themes.map((id) => ({ id }));
}

function resolveThemeLabel(themeId: string): string {
  return WIKI_THEME_LABELS[themeId] ?? themeId;
}

export async function generateMetadata({
  params,
}: WikiThemePageProps): Promise<Metadata> {
  const { id } = await params;
  const title = resolveThemeLabel(id);
  const canonicalPath = `/wiki/theme/${id}`;
  const description = `Tous les articles du thème ${title.toLowerCase()} du Wiki de l'Influence.`;

  return {
    title,
    description,
    alternates: {
      canonical: canonicalPath,
    },
    openGraph: {
      title: `${title} | Wiki de l'Influence`,
      description,
      url: new URL(canonicalPath, siteConfig.url).toString(),
      type: "website",
      locale: "fr_FR",
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | Wiki de l'Influence`,
      description,
    },
  };
}

export default async function WikiThemePage({ params }: WikiThemePageProps) {
  const { id } = await params;
  const [themes, allArticles] = await Promise.all([
    getWikiThemes(),
    getWikiArticleSummaries(),
  ]);

  if (!themes.includes(id)) {
    notFound();
  }

  const themeTitle = resolveThemeLabel(id);
  const themeArticles = allArticles.filter((article) => article.theme === id);
  const canonicalUrl = new URL(`/wiki/theme/${id}`, siteConfig.url).toString();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            collectionPageSchema({
              name: `${themeTitle} | Wiki de l'Influence`,
              description: `Articles du theme ${themeTitle.toLowerCase()} sur le Wiki de l'Influence.`,
              url: canonicalUrl,
              items: themeArticles.map((article) => ({
                name: article.title,
                url: new URL(
                  `/wiki/${article.slug}`,
                  siteConfig.url
                ).toString(),
              })),
            })
          ),
        }}
      />
      <WikiCategoryView
        type="theme"
        title={themeTitle}
        articles={themeArticles}
        allArticles={allArticles}
      />
    </>
  );
}
