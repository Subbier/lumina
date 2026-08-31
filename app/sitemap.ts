import type { MetadataRoute } from "next";
import { publicSiteUrl } from "../lib/stage-seo";
import { articles } from "./ratgeber/articles";
import { pageSeo } from "./seo/site";

/** Öffentliche Sitemap der Lumina-Website. */
export default function sitemap(): MetadataRoute.Sitemap {
  const base = publicSiteUrl().replace(/\/$/, "");
  const pageLastModified: Record<string, string> = {
    "/": "2026-08-30",
    "/spitex": "2026-08-26",
    "/angehoerige": "2026-08-30",
    "/begleitung": "2026-08-26",
    "/ueber-uns": "2026-08-20",
    "/tarife": "2026-08-20",
    "/ratgeber": "2026-08-30",
    "/kontakt": "2026-08-29",
    "/bewerbung": "2026-08-20",
    "/anspruchscheck": "2026-08-30",
    "/lohn-check": "2026-08-30",
    "/impressum": "2026-08-20",
    "/datenschutz": "2026-08-29",
    "/agb": "2026-08-20",
    "/redaktion": "2026-08-30",
  };

  const pages = Object.values(pageSeo).map((page) => ({
    url: `${base}${page.path === "/" ? "" : page.path}`,
    lastModified: pageLastModified[page.path],
    changeFrequency: "monthly" as const,
    priority: page.path === "/" ? 1 : 0.7,
  }));

  const ratgeber = articles.map((article) => ({
    url: `${base}/ratgeber/${article.slug}`,
    lastModified: article.modifiedAt,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...pages, ...ratgeber];
}
