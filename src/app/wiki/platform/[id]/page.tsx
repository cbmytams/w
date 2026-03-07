import type { Metadata } from "next";
import { notFound } from "next/navigation";
import WikiCategoryView from "@/components/wiki/WikiCategoryView";
import { WIKI_PLATFORM_LABELS, getWikiArticleSummaries, getWikiPlatforms } from "@/lib/wiki";
import { siteConfig } from "@/lib/site";

interface WikiPlatformPageProps {
  params: Promise<{
    id: string;
  }>;
}

export const dynamic = "force-static";
export const dynamicParams = false;

export async function generateStaticParams(): Promise<Array<{ id: string }>> {
  const platforms = await getWikiPlatforms();
  return platforms.map((id) => ({ id }));
}

function resolvePlatformLabel(platformId: string): string {
  return WIKI_PLATFORM_LABELS[platformId] ?? platformId;
}

export async function generateMetadata({ params }: WikiPlatformPageProps): Promise<Metadata> {
  const { id } = await params;
  const title = resolvePlatformLabel(id);
  const canonicalPath = `/wiki/platform/${id}`;
  const description = `Tous les articles de la plateforme ${title} du Wiki de l'Influence.`;

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

export default async function WikiPlatformPage({ params }: WikiPlatformPageProps) {
  const { id } = await params;
  const [platforms, allArticles] = await Promise.all([
    getWikiPlatforms(),
    getWikiArticleSummaries(),
  ]);

  if (!platforms.includes(id)) {
    notFound();
  }

  const platformTitle = resolvePlatformLabel(id);
  const platformArticles = allArticles.filter((article) => article.platform === id);

  return (
    <WikiCategoryView
      type="platform"
      title={platformTitle}
      articles={platformArticles}
      allArticles={allArticles}
    />
  );
}
