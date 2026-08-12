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
export const REVIEW_CRAWL_OPEN = true;

/** Absolute Basis-URL für Meta/OG während Stage-Review (nicht die noch tote .ch). */
export const STAGE_PUBLIC_URL = "https://lumina-spitex.vercel.app";

export const stageRobotsMeta = REVIEW_CRAWL_OPEN
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
