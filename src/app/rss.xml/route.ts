import { siteConfig } from "@/lib/site";
import { getWikiArticleSummaries } from "@/lib/wiki";

const RSS_CONTENT_TYPE = "application/rss+xml; charset=utf-8";
const RSS_LIMIT = 100;

type FeedItem = {
  title: string;
  description: string;
  url: string;
  publishedAt: string;
  updatedAt: string;
  category: string;
};

function escapeXml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

function toRfc822(isoDate: string): string {
  return new Date(isoDate).toUTCString();
}

function toFeedXml(items: FeedItem[]): string {
  const channelUrl = siteConfig.url;
  const feedUrl = new URL("/rss.xml", channelUrl).toString();

  const itemXml = items
    .map((item) => {
      const title = escapeXml(item.title);
      const description = escapeXml(item.description);
      const itemUrl = escapeXml(item.url);
      const category = escapeXml(item.category);
      const pubDate = toRfc822(item.publishedAt);
      const updatedDate = toRfc822(item.updatedAt);

      return [
        "<item>",
        `<title>${title}</title>`,
        `<description>${description}</description>`,
        `<link>${itemUrl}</link>`,
        `<guid isPermaLink="true">${itemUrl}</guid>`,
        `<category>${category}</category>`,
        `<pubDate>${pubDate}</pubDate>`,
        `<dc:date>${updatedDate}</dc:date>`,
        "</item>",
      ].join("");
    })
    .join("");

  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:dc="http://purl.org/dc/elements/1.1/">',
    "<channel>",
    `<title>${escapeXml(`${siteConfig.name} Knowledge`)}</title>`,
    `<description>${escapeXml(siteConfig.description)}</description>`,
    `<link>${escapeXml(channelUrl)}</link>`,
    `<language>${escapeXml(siteConfig.locale.replace("_", "-"))}</language>`,
    `<atom:link href="${escapeXml(feedUrl)}" rel="self" type="application/rss+xml" />`,
    itemXml,
    "</channel>",
    "</rss>",
  ].join("");
}

export async function GET() {
  const wikiArticles = await getWikiArticleSummaries();

  const wikiItems: FeedItem[] = wikiArticles.map((article) => ({
    title: article.title,
    description: article.description,
    url: new URL(`/wiki/${article.slug}`, siteConfig.url).toString(),
    publishedAt: article.publishedAt,
    updatedAt: article.updatedAt,
    category: article.category,
  }));

  const items = wikiItems
    .sort(
      (a, b) =>
        new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
    )
    .slice(0, RSS_LIMIT);

  return new Response(toFeedXml(items), {
    headers: {
      "content-type": RSS_CONTENT_TYPE,
      "cache-control": "public, max-age=0, s-maxage=3600",
    },
  });
}
