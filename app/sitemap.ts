import type { MetadataRoute } from "next";
import { articles } from "./ratgeber/articles";
import { SITE_URL, pageSeo, type PageSeo } from "./seo/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes = (Object.values(pageSeo) as PageSeo[]).map((page) => {
    const isConversion = Boolean(page.conversion);
    return {
      url: `${SITE_URL}${page.path === "/" ? "" : page.path}`,
      lastModified: now,
      changeFrequency: isConversion
        ? ("daily" as const)
        : ("weekly" as const),
      priority:
        page.path === "/"
          ? 1
          : isConversion
            ? 0.9
            : page.path === "/impressum" || page.path === "/datenschutz"
              ? 0.3
              : 0.7,
    };
  });

  const articleRoutes = articles.map((article) => ({
    url: `${SITE_URL}/ratgeber/${article.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.55,
  }));

  return [...staticRoutes, ...articleRoutes];
}
