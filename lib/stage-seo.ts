/** Einzige öffentliche Website und Canonical-Zieldomain. */
export const PUBLIC_SITE_URL = "https://luminaspitex.com";

/** Öffentliche Basis-URL für Canonical, OG, Sitemap, JSON-LD. */
export function publicSiteUrl(): string {
  return PUBLIC_SITE_URL;
}

export const stageRobotsMeta = {
  index: true,
  follow: true,
  googleBot: {
    index: true,
    follow: true,
  },
};
