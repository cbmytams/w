import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { notFound } from "next/navigation";
import { getAllArticleSlugs, getArticleBySlug, getArticleDescription } from "@/lib/blog";
import { articleSchema, breadcrumbSchema } from "@/lib/structured-data";
import { siteConfig, sitePaths } from "@/lib/site";

interface BlogArticlePageProps {
  params: Promise<{
    slug: string;
  }>;
}

export const dynamic = "force-static";
export const dynamicParams = false;

export function generateStaticParams() {
  return getAllArticleSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: BlogArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) {
    return {
      title: "Article introuvable",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const canonicalPath = `/blog/${article.slug}`;
  const description = getArticleDescription(article);

  return {
    title: article.title,
    description,
    alternates: {
      canonical: canonicalPath,
    },
    openGraph: {
      title: `${article.title} | Wafia Knowledge`,
      description,
      url: new URL(canonicalPath, siteConfig.url).toString(),
      type: "article",
      siteName: siteConfig.name,
      locale: siteConfig.locale,
      publishedTime: article.publishedAt,
    },
    twitter: {
      card: "summary_large_image",
      title: `${article.title} | Wafia Knowledge`,
      description,
    },
  };
}

export default async function BlogArticlePage({ params }: BlogArticlePageProps) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  const canonicalUrl = new URL(`/blog/${article.slug}`, siteConfig.url).toString();
  const description = getArticleDescription(article);
  const publishedLabel = new Date(article.publishedAt).toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <main id="main-content" className="h-full overflow-y-auto px-6 pb-20 pt-24 text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            articleSchema({
              headline: article.title,
              description,
              url: canonicalUrl,
              datePublished: article.publishedAt,
            }),
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbSchema([
              { name: "Accueil", url: new URL(sitePaths.home, siteConfig.url).toString() },
              { name: "Blog", url: new URL(sitePaths.blog, siteConfig.url).toString() },
              { name: article.title, url: canonicalUrl },
            ]),
          ),
        }}
      />

      <div className="mx-auto max-w-3xl">
        <Link
          href={sitePaths.blog}
          className="inline-flex min-h-11 items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 text-sm font-medium text-white/80 transition hover:bg-white/10 hover:text-white"
        >
          <ArrowLeft className="h-4 w-4" />
          Retour au blog
        </Link>

        <article className="mt-10">
          <header className="border-b border-white/10 pb-10">
            <p className="text-xs uppercase tracking-[0.2em] text-white/45">{article.category}</p>
            <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">{article.title}</h1>
            <p className="mt-4 max-w-2xl text-base leading-7 text-white/70">{description}</p>
            <div className="mt-6 flex flex-wrap items-center gap-3 text-sm text-white/50">
              <span>{publishedLabel}</span>
              <span aria-hidden>•</span>
              <span>{article.time || "Lecture rapide"}</span>
            </div>
          </header>

          <div className="mt-10 space-y-10">
            {article.chapters.map((chapter, index) => (
              <section key={chapter.title} className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 sm:p-8">
                <p className="text-xs uppercase tracking-[0.2em] text-white/35">Chapitre {index + 1}</p>
                <h2 className="mt-3 text-2xl font-semibold tracking-tight text-white">{chapter.title}</h2>
                <p className="mt-4 whitespace-pre-line text-base leading-8 text-white/75">
                  {chapter.content}
                </p>
              </section>
            ))}
          </div>
        </article>
      </div>
    </main>
  );
}
