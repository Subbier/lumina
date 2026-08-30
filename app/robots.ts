import type { MetadataRoute } from "next";
import { PUBLIC_SITE_URL } from "../lib/stage-seo";

/**
 * Stage-Robots.
 * Die Vercel-Adresse ist die öffentliche Website und darf indexiert werden.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
      },
    ],
    sitemap: `${PUBLIC_SITE_URL}/sitemap.xml`,
    host: PUBLIC_SITE_URL.replace(/^https?:\/\//, ""),
  };
}
