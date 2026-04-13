import fs from "node:fs";
import path from "node:path";
import nextConfig from "../../../next.config";
import wikiSitemap from "../../app/wiki/sitemap";
import {
  getAllWikiSlugs,
  getWikiPlatforms,
  getWikiThemes,
} from "../../lib/wiki";
import { siteConfig } from "../../lib/site";

describe("wiki SEO contract", () => {
  it("disables legacy static wiki rewrites and keeps 301 legacy redirects", async () => {
    const rewritesResult =
      typeof nextConfig.rewrites === "function"
        ? await nextConfig.rewrites()
        : [];
    const rewriteDestinations = Array.isArray(rewritesResult)
      ? rewritesResult.map((rewrite) => rewrite.destination)
      : [
          ...(rewritesResult.beforeFiles ?? []).map(
            (rewrite) => rewrite.destination
          ),
          ...(rewritesResult.afterFiles ?? []).map(
            (rewrite) => rewrite.destination
          ),
          ...(rewritesResult.fallback ?? []).map(
            (rewrite) => rewrite.destination
          ),
        ];

    expect(
      rewriteDestinations.some((destination) =>
        /^\/wiki\/.*\.html$/.test(destination)
      )
    ).toBe(false);

    const redirects =
      typeof nextConfig.redirects === "function"
        ? await nextConfig.redirects()
        : [];

    expect(redirects).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          source: "/wiki/blog",
          destination: "/wiki",
          statusCode: 301,
        }),
        expect.objectContaining({
          source: "/wiki/blog/theme/:id",
          destination: "/wiki/theme/:id",
          statusCode: 301,
        }),
        expect.objectContaining({
          source: "/wiki/blog/platform/:id",
          destination: "/wiki/platform/:id",
          statusCode: 301,
        }),
        expect.objectContaining({
          source: "/wiki/blog/:slug",
          destination: "/wiki/:slug",
          statusCode: 301,
        }),
      ])
    );

    [
      "public/wiki/sitemap.xml",
      "public/wiki/robots.txt",
      "public/wiki/rss.xml",
      "public/wiki/index.html",
    ].forEach((relativePath) => {
      expect(fs.existsSync(path.join(process.cwd(), relativePath))).toBe(false);
    });
  });

  it("enforces static wiki route generation in route source files", () => {
    const slugRouteSource = fs.readFileSync(
      path.join(process.cwd(), "src/app/wiki/[slug]/page.tsx"),
      "utf8"
    );
    const themeRouteSource = fs.readFileSync(
      path.join(process.cwd(), "src/app/wiki/theme/[id]/page.tsx"),
      "utf8"
    );
    const platformRouteSource = fs.readFileSync(
      path.join(process.cwd(), "src/app/wiki/platform/[id]/page.tsx"),
      "utf8"
    );

    [slugRouteSource, themeRouteSource, platformRouteSource].forEach(
      (source) => {
        expect(source.includes("export const dynamicParams = false;")).toBe(
          true
        );
        expect(source.includes("generateStaticParams")).toBe(true);
        expect(source.includes("notFound()")).toBe(true);
      }
    );
  });

  it("exposes every wiki slug in /wiki/sitemap.xml", async () => {
    const [entries, slugs, themes, platforms] = await Promise.all([
      wikiSitemap(),
      getAllWikiSlugs(),
      getWikiThemes(),
      getWikiPlatforms(),
    ]);
    const urls = new Set(entries.map((entry) => entry.url));
    const canonicalBase = siteConfig.url.replace(/\/$/, "");

    expect(urls.has(`${canonicalBase}/wiki`)).toBe(true);
    slugs.forEach((slug) => {
      expect(urls.has(`${canonicalBase}/wiki/${slug}`)).toBe(true);
    });
    themes.forEach((theme) => {
      expect(urls.has(`${canonicalBase}/wiki/theme/${theme}`)).toBe(true);
    });
    platforms.forEach((platform) => {
      expect(urls.has(`${canonicalBase}/wiki/platform/${platform}`)).toBe(true);
    });
  });

  it("keeps crawlable anchor navigation in main wiki components", () => {
    const indexSource = fs.readFileSync(
      path.join(process.cwd(), "src/components/wiki/WikiIndexView.tsx"),
      "utf8"
    );
    const articleCardSource = fs.readFileSync(
      path.join(process.cwd(), "src/components/wiki/WikiArticleCard.tsx"),
      "utf8"
    );
    const searchSource = fs.readFileSync(
      path.join(process.cwd(), "src/components/wiki/WikiSearchDialog.tsx"),
      "utf8"
    );

    expect(indexSource.includes("router.push")).toBe(false);
    expect(articleCardSource.includes("router.push")).toBe(false);
    expect(searchSource.includes("router.push")).toBe(false);

    expect(indexSource.includes("href={`${routePrefix}/${item.id}`}")).toBe(
      true
    );
    expect(articleCardSource.includes("href={`/wiki/${article.slug}`}")).toBe(
      true
    );
    expect(searchSource.includes("href={`/wiki/${r.slug}`}")).toBe(true);
  });
});
