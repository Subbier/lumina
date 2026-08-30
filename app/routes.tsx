import { LuminaSite, type View } from "./LuminaSite";
import {
  breadcrumbJsonLd,
  pageJsonLd,
  pageSeo,
  type PageSeo,
} from "./seo/site";

const seoByView: Partial<Record<View, PageSeo>> = {
  home: pageSeo.home,
  spitex: pageSeo.spitex,
  services: pageSeo.begleitung,
  begleitung: pageSeo.begleitung,
  angehoerige: pageSeo.angehoerige,
  team: pageSeo.ueberUns,
  "ueber-uns": pageSeo.ueberUns,
  tarife: pageSeo.tarife,
  kontakt: pageSeo.kontakt,
  bewerbung: pageSeo.bewerbung,
  ratgeber: pageSeo.ratgeber,
  "lohn-check": pageSeo.lohnCheck,
  anspruchscheck: pageSeo.anspruchscheck,
  impressum: pageSeo.impressum,
  datenschutz: pageSeo.datenschutz,
  agb: pageSeo.agb,
  redaktion: pageSeo.redaktion,
};

export function RoutePage({
  view,
  articleSlug,
}: {
  view: View;
  articleSlug?: string;
}) {
  const seo = articleSlug ? undefined : seoByView[view];
  const schemas = seo
    ? [
        pageJsonLd(seo),
        ...(seo.path === "/"
          ? []
          : [
              breadcrumbJsonLd([
                { name: "Startseite", path: "/" },
                { name: seo.title, path: seo.path },
              ]),
            ]),
      ]
    : [];

  return (
    <>
      {schemas.map((schema, index) => (
        <script
          key={`${view}-schema-${index}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
      <LuminaSite view={view} articleSlug={articleSlug} />
    </>
  );
}
