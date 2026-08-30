import type { MetadataRoute } from "next";
import { INDEXING_ENABLED, LIVE_PUBLIC_URL } from "../lib/stage-seo";

/**
 * Stage-Robots.
 * LUMINA_INDEXING_ENABLED steuert den kontrollierten Domain-Go-live.
 * Vor Aktivierung: siehe docs/launch-checklist.md (Punkt 1).
 */
export default function robots(): MetadataRoute.Robots {
  if (INDEXING_ENABLED) {
    return {
      rules: [
        {
          userAgent: "*",
          allow: "/",
        },
      ],
      sitemap: `${LIVE_PUBLIC_URL}/sitemap.xml`,
      host: LIVE_PUBLIC_URL.replace(/^https?:\/\//, ""),
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
