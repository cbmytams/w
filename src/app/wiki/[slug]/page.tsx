import type { Metadata } from "next";
import { notFound } from "next/navigation";
import WikiArticleView from "@/components/wiki/WikiArticleView";
import {
  getAllWikiSlugs,
  getWikiArticleBySlug,
  getWikiArticleSummaries,
} from "@/lib/wiki";
import { articleSchema, breadcrumbSchema } from "@/lib/structured-data";
import { siteConfig, sitePaths } from "@/lib/site";
import { getAuthorBySlug, getDefaultAuthor } from "@/lib/authors";

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

export async function generateMetadata({
  params,
}: WikiArticlePageProps): Promise<Metadata> {
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
      modifiedTime: article.updatedAt,
    },
    twitter: {
      card: "summary_large_image",
      title: `${article.title} | Wiki de l'Influence`,
      description: article.description,
    },
  };
}

export default async function WikiArticlePage({
  params,
}: WikiArticlePageProps) {
  const { slug } = await params;
  const [article, allArticles] = await Promise.all([
    getWikiArticleBySlug(slug),
    getWikiArticleSummaries(),
  ]);

  if (!article) {
    notFound();
  }

  const canonicalUrl = new URL(
    `/wiki/${article.slug}`,
    siteConfig.url
  ).toString();
  const author = getAuthorBySlug(article.authorSlug) ?? getDefaultAuthor();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            articleSchema({
              headline: article.title,
              description: article.description,
              url: canonicalUrl,
              datePublished: article.publishedAt,
              dateModified: article.updatedAt,
              author,
              keywords: [
                article.category,
                article.theme ?? "",
                article.platform ?? "",
              ].filter(Boolean),
            })
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbSchema([
              {
                name: "Accueil",
                url: new URL(sitePaths.home, siteConfig.url).toString(),
              },
              {
                name: "Wiki",
                url: new URL(sitePaths.wiki, siteConfig.url).toString(),
              },
              { name: article.title, url: canonicalUrl },
            ])
          ),
        }}
      />
      <WikiArticleView
        article={{
          slug: article.slug,
          title: article.title,
          category: article.category,
          readTime: article.readTime,
          chapters: article.chapters,
          theme: article.theme,
          platform: article.platform,
        }}
        allArticles={allArticles}
      />
    </>
  );
}
