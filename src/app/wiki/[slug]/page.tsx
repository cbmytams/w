import type { Metadata } from "next";
import { notFound } from "next/navigation";
import WikiArticleView from "@/components/wiki/WikiArticleView";
import { getAllWikiSlugs, getWikiArticleBySlug, getWikiArticleSummaries } from "@/lib/wiki";
import { siteConfig } from "@/lib/site";

interface WikiArticlePageProps {
  params: Promise<{
    slug: string;
  }>;
}

export const dynamic = "force-static";
export const dynamicParams = false;

export async function generateStaticParams(): Promise<Array<{ slug: string }>> {
  const slugs = await getAllWikiSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: WikiArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = await getWikiArticleBySlug(slug);

  if (!article) {
    return {
      title: "Article introuvable",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const canonicalPath = `/wiki/${article.slug}`;

  return {
    title: article.title,
    description: article.description,
    alternates: {
      canonical: canonicalPath,
    },
    openGraph: {
      title: `${article.title} | Wiki de l'Influence`,
      description: article.description,
      url: new URL(canonicalPath, siteConfig.url).toString(),
      type: "article",
      locale: "fr_FR",
      publishedTime: article.publishedAt,
    },
    twitter: {
      card: "summary_large_image",
      title: `${article.title} | Wiki de l'Influence`,
      description: article.description,
    },
  };
}

export default async function WikiArticlePage({ params }: WikiArticlePageProps) {
  const { slug } = await params;
  const [article, allArticles] = await Promise.all([
    getWikiArticleBySlug(slug),
    getWikiArticleSummaries(),
  ]);

  if (!article) {
    notFound();
  }

  return (
    <WikiArticleView
      article={{
        slug: article.slug,
        title: article.title,
        category: article.category,
        readTime: article.readTime,
        chapters: article.chapters,
      }}
      allArticles={allArticles}
    />
  );
}
