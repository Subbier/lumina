import type { MetadataRoute } from "next";
import { publicSiteUrl, REVIEW_CRAWL_OPEN } from "../lib/stage-seo";
import { articles } from "./ratgeber/articles";
import { pageSeo } from "./seo/site";

/** Stage: Sitemap nur wenn Review-Crawl offen; Live später voll ausbauen (Ortsseiten!). */
export default function sitemap(): MetadataRoute.Sitemap {
  if (!REVIEW_CRAWL_OPEN) return [];

  const base = publicSiteUrl().replace(/\/$/, "");
  const pages = Object.values(pageSeo).map((page) => ({
    url: `${base}${page.path === "/" ? "" : page.path}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: page.path === "/" ? 1 : 0.7,
  }));

  const ratgeber = articles.map((article) => ({
    url: `${base}/ratgeber/${article.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...pages, ...ratgeber];
}
