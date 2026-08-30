/**
 * Öffentliche Kampagnen-Hosts auf Vercel.
 * Muster (zweites Vercel-Projekt, gleiches Repo):
 *   rechner-lumina-spitex.vercel.app  → Kampagne «rechner»
 *   lumina-spitex.vercel.app           → Hauptdomain (normale Site)
 */

/** Öffentliche Hauptdomain */
export const STAGE_APEX = "lumina-spitex.vercel.app";

/** Suffix für Kampagnen-Projekte: {slug}-lumina-spitex.vercel.app */
export const STAGE_CAMPAIGN_SUFFIX = "-lumina-spitex.vercel.app";

/** Hosts der Haupt-Site (kein Kampagnen-Rewrite) */
export const APEX_HOSTS = new Set([
  STAGE_APEX,
  "localhost",
  "127.0.0.1",
]);

export type CampaignConfig = {
  path: string;
  label: string;
  /** Vercel-Projektname für die Stage-URL */
  vercelProjectName: string;
};

export const CAMPAIGNS: Record<string, CampaignConfig> = {
  rechner: {
    path: "/kampagne/rechner",
    label: "Lohn- & Anspruchsrechner",
    vercelProjectName: "rechner-lumina-spitex",
  },
};

export function normalizeHost(host: string | null): string {
  if (!host) return "";
  return host.split(":")[0].trim().toLowerCase();
}

/** Extrahiert Kampagnen-Slug oder null */
export function getCampaignSlug(host: string | null): string | null {
  const h = normalizeHost(host);
  if (!h || APEX_HOSTS.has(h)) return null;

  // lokal: rechner.localhost
  if (h.endsWith(".localhost")) {
    const slug = h.slice(0, -".localhost".length);
    return slug && CAMPAIGNS[slug] ? slug : null;
  }

  // Stage Vercel: rechner-lumina-spitex.vercel.app
  if (h.endsWith(STAGE_CAMPAIGN_SUFFIX)) {
    const slug = h.slice(0, -STAGE_CAMPAIGN_SUFFIX.length);
    return slug && CAMPAIGNS[slug] ? slug : null;
  }

  // Preview-Deployments: rechner-lumina-spitex-xxxxx-gntc.vercel.app
  for (const [slug, config] of Object.entries(CAMPAIGNS)) {
    if (
      h === `${config.vercelProjectName}.vercel.app` ||
      h.startsWith(`${config.vercelProjectName}-`)
    ) {
      return slug;
    }
  }

  return null;
}

/** Öffentliche Kampagnen-URL (aktuell Stage/Vercel) */
export function campaignPublicUrl(slug: string): string {
  const c = CAMPAIGNS[slug];
  if (!c) return `https://${STAGE_APEX}/kampagne/${slug}`;
  return `https://${c.vercelProjectName}.vercel.app`;
}

/** Preview ohne zweites Projekt */
export function campaignPathUrl(slug: string): string {
  const c = CAMPAIGNS[slug];
  return `https://${STAGE_APEX}${c?.path ?? `/kampagne/${slug}`}`;
}
