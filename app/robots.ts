import type { MetadataRoute } from "next";
import { REVIEW_CRAWL_OPEN, STAGE_PUBLIC_URL } from "../lib/stage-seo";

/**
 * Stage-Robots.
 * REVIEW_CRAWL_OPEN steuert Crawlbarkeit für Audits.
 * Vor Livegang: siehe docs/launch-checklist.md (Punkt 1).
 */
export default function robots(): MetadataRoute.Robots {
  if (REVIEW_CRAWL_OPEN) {
    return {
      rules: [
        {
          userAgent: "*",
          allow: "/",
        },
      ],
      sitemap: `${STAGE_PUBLIC_URL}/sitemap.xml`,
      host: STAGE_PUBLIC_URL.replace(/^https?:\/\//, ""),
    };
  }

  return {
    rules: [
      {
        userAgent: "*",
        disallow: "/",
      },
    ],
  };
}
