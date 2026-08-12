import type { MetadataRoute } from "next";
import { REVIEW_CRAWL_OPEN } from "../lib/stage-seo";
import { pageSeo } from "./seo/site";

/** Stage: Sitemap nur wenn Review-Crawl offen; Live später voll ausbauen (Ortsseiten!). */
export default function sitemap(): MetadataRoute.Sitemap {
  if (!REVIEW_CRAWL_OPEN) return [];

  const base = "https://lumina-spitex.vercel.app";
  return Object.values(pageSeo).map((page) => ({
    url: `${base}${page.path}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: page.path === "/" ? 1 : 0.7,
  }));
}
