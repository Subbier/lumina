/**
 * Stage-SEO-Schalter
 *
 * REVIEW_CRAWL_OPEN = true  → Audits (Ubersuggest etc.) dürfen crawlen
 * REVIEW_CRAWL_OPEN = false → Disallow + noindex (Stage privat)
 *
 * ⚠️ LIVEGANG: Vor Go-Live diesen Schalter und die Punkte in
 * docs/launch-checklist.md prüfen. Vergessener Disallow = monatelang
 * keine Indexierung.
 */
export const REVIEW_CRAWL_OPEN = false;

/** Indexierung wird erst beim kontrollierten Domain-Go-live explizit aktiviert. */
export const INDEXING_ENABLED =
  !REVIEW_CRAWL_OPEN && process.env.LUMINA_INDEXING_ENABLED === "true";

/** Technische Vorschau-Adresse; niemals als Canonical verwenden. */
export const STAGE_PUBLIC_URL = "https://lumina-spitex.vercel.app";

/** Einzige öffentliche Canonical-Zieldomain. */
export const LIVE_PUBLIC_URL = "https://lumina-spitex.ch";

/** Öffentliche Basis-URL für Canonical, OG, Sitemap, JSON-LD. */
export function publicSiteUrl(): string {
  return LIVE_PUBLIC_URL;
}

export const stageRobotsMeta = INDEXING_ENABLED
  ? {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
      },
    }
  : {
      index: false,
      follow: false,
      nocache: true,
      googleBot: {
        index: false,
        follow: false,
        noimageindex: true,
        nosnippet: true,
      },
    };
