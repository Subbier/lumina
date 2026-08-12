import type { Metadata } from "next";
import { publicSiteUrl, stageRobotsMeta } from "../../lib/stage-seo";

export const SITE_URL = "https://lumina-spitex.ch";
export const SITE_NAME = "Lumina Spitex";
export const SITE_PHONE = "+41434338800";
export const SITE_PHONE_DISPLAY = "043 433 88 00";
export const SITE_EMAIL = "info@lumina-spitex.ch";
export const SITE_ADDRESS = {
  street: "Rütistrasse 18",
  postalCode: "8952",
  locality: "Schlieren",
  region: "ZH",
  country: "CH",
};

export type PageSeo = {
  title: string;
  description: string;
  path: string;
  /** Higher intent for ads / conversion landings */
  conversion?: boolean;
};

export const pageSeo = {
  home: {
    path: "/",
    title: "Spitex Zürich & Aargau | Pflege zu Hause & Angehörige",
    description:
      "Spitex in Zürich & Aargau. Lohn für pflegende Angehörige. Sofort anstellen, SRK innert 12 Monaten. Jetzt Anspruch prüfen.",
  },
  spitex: {
    path: "/spitex",
    title: "Spitex-Leistungen | Abklärung, Grund- & Behandlungspflege",
    description:
      "Professionelle Spitex in Zürich und Aargau: Abklärung, Grund- und Behandlungspflege – ärztlich verordnet, direkt mit der Krankenkasse. Auch für Familien mit Angehörigenpflege.",
  },
  angehoerige: {
    path: "/angehoerige",
    title: "Pflegende Angehörige anstellen | Sofort Lohn | SRK",
    description:
      "Angehörige pflegen und sofort angestellt werden: Lohn von Tag eins, Lehrgang Pflegende Angehörige SRK innert 12 Monaten – Kosten trägt Lumina. Jetzt Anspruch prüfen.",
    conversion: true,
  },
  begleitung: {
    path: "/begleitung",
    title: "Begleitung im Alltag | Erledigungen & Termine",
    description:
      "Begleitung über die Grundpflege hinaus: Einkäufe, Termine und soziale Teilhabe – persönlich und flexibel. Unverbindliche Beratung bei Lumina Spitex.",
  },
  ueberUns: {
    path: "/ueber-uns",
    title: "Über uns | Junges Team mit über 50 Jahren Erfahrung",
    description:
      "Lumina Spitex: junge Firma, erfahrene Fachpersonen – fünf Personen, drei Frauen und zwei Männer, über 50 Jahre Berufspraxis in Zürich und Aargau.",
  },
  tarife: {
    path: "/tarife",
    title: "Spitex-Tarife | Transparent nach KLV & UVG",
    description:
      "Transparente Spitex-Tarife nach KLV und UVG sowie hauswirtschaftliche Leistungen. Klar kommuniziert – Fragen direkt mit Lumina klären.",
  },
  ratgeber: {
    path: "/ratgeber",
    title: "Ratgeber | Lohn für pflegende Angehörige & Spitex",
    description:
      "Ratgeber zu Anstellung und Lohn für pflegende Angehörige, SRK-Ausbildung, Hilflosenentschädigung und Spitex im Limmattal – klar und praxisnah.",
  },
  kontakt: {
    path: "/kontakt",
    title: "Kontakt | Rückruf für pflegende Angehörige & Spitex",
    description:
      "Rückruf anfordern oder anrufen: Fragen zu Anstellung pflegender Angehöriger und Spitex. Mo–Fr 08:00–17:00, Schlieren.",
    conversion: true,
  },
  bewerbung: {
    path: "/bewerbung",
    title: "Bewerbung | Pflegefachkräfte gesucht",
    description:
      "Werden Sie Teil von Lumina Spitex: offene Stellen für Pflegefachpersonen EFZ, dipl. Fachpersonen und FaGe in Zürich und Aargau.",
    conversion: true,
  },
  anspruchscheck: {
    path: "/anspruchscheck",
    title: "Anspruch prüfen | Lohn für pflegende Angehörige",
    description:
      "In 2 Minuten prüfen: Ist Lohn für Ihre Angehörigenpflege möglich? Unverbindlich – und bei Passung sofort Anstellung bei Lumina Spitex.",
    conversion: true,
  },
  lohnCheck: {
    path: "/lohn-check",
    title: "Lohn-Check | Was verdienen pflegende Angehörige?",
    description:
      "Erste Bruttolohn-Schätzung für pflegende Angehörige – Pensum und Stundenlohn als Orientierung. Danach Rückruf oder Beratung bei Lumina.",
    conversion: true,
  },
  impressum: {
    path: "/impressum",
    title: "Impressum",
    description: "Impressum und Anbieterangaben der Lumina Spitex AG, Schlieren.",
  },
  datenschutz: {
    path: "/datenschutz",
    title: "Datenschutz",
    description:
      "Datenschutzerklärung der Lumina Spitex AG – Umgang mit Personendaten auf dieser Website.",
  },
  agb: {
    path: "/agb",
    title: "AGB | Allgemeine Geschäftsbedingungen",
    description:
      "Allgemeine Geschäftsbedingungen der Lumina Spitex AG für Spitex, Begleitung und Anstellung pflegender Angehöriger.",
  },
  redaktion: {
    path: "/redaktion",
    title: "Redaktionsrichtlinien",
    description:
      "Wie Lumina Spitex Inhalte prüft, aktualisiert und kennzeichnet – Orientierung statt Rechtsberatung.",
  },
} as const satisfies Record<string, PageSeo>;

export function absoluteUrl(path: string): string {
  const base = publicSiteUrl().replace(/\/$/, "");
  if (!path || path === "/") return base;
  return `${base}${path.startsWith("/") ? path : `/${path}`}`;
}

export function buildMetadata(page: PageSeo): Metadata {
  const canonical = absoluteUrl(page.path);
  return {
    title: page.title,
    description: page.description,
    robots: stageRobotsMeta,
    alternates: { canonical },
    openGraph: {
      title: page.title,
      description: page.description,
      url: canonical,
    },
  };
}

export function organizationJsonLd(baseUrl: string = SITE_URL) {
  const base = baseUrl.replace(/\/$/, "");
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "LocalBusiness",
        additionalType: [
          "https://schema.org/Organization",
          "https://schema.org/HomeHealthCareService",
        ],
        "@id": `${base}/#organization`,
        name: "Lumina Spitex AG",
        legalName: "Lumina Spitex AG",
        url: base,
        logo: `${base}/icon-512.png`,
        image: `${base}/og.png`,
        telephone: SITE_PHONE,
        email: SITE_EMAIL,
        address: {
          "@type": "PostalAddress",
          streetAddress: SITE_ADDRESS.street,
          postalCode: SITE_ADDRESS.postalCode,
          addressLocality: SITE_ADDRESS.locality,
          addressRegion: SITE_ADDRESS.region,
          addressCountry: SITE_ADDRESS.country,
        },
        areaServed: [
          { "@type": "AdministrativeArea", name: "Kanton Zürich" },
          { "@type": "AdministrativeArea", name: "Kanton Aargau" },
        ],
        openingHoursSpecification: {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: [
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
          ],
          opens: "08:00",
          closes: "17:00",
        },
        sameAs: [
          "https://www.help.ch/firma/CHE-233.932.070/lumina-spitex-ag-schlieren",
        ],
        knowsAbout: [
          "Spitex",
          "Ambulante Pflege",
          "Pflegende Angehörige",
          "Grundpflege",
          "Behandlungspflege",
          "Begleitung",
        ],
      },
      {
        "@type": "WebSite",
        "@id": `${base}/#website`,
        url: base,
        name: SITE_NAME,
        inLanguage: "de-CH",
        publisher: { "@id": `${base}/#organization` },
      },
      {
        "@type": "WebPage",
        "@id": `${base}/#webpage`,
        url: base,
        name: pageSeo.home.title,
        description: pageSeo.home.description,
        isPartOf: { "@id": `${base}/#website` },
        about: { "@id": `${base}/#organization` },
        inLanguage: "de-CH",
      },
      {
        "@type": "Service",
        "@id": `${base}/spitex#service`,
        name: "Spitex-Pflege",
        serviceType: "Ambulante Krankenpflege",
        provider: { "@id": `${base}/#organization` },
        areaServed: ["Zürich", "Aargau"],
        url: `${base}/spitex`,
        description: pageSeo.spitex.description,
      },
      {
        "@type": "Service",
        "@id": `${base}/angehoerige#service`,
        name: "Anstellung pflegender Angehöriger",
        serviceType: "Pflegende Angehörige",
        provider: { "@id": `${base}/#organization` },
        url: `${base}/angehoerige`,
        description: pageSeo.angehoerige.description,
      },
      {
        "@type": "Service",
        "@id": `${base}/begleitung#service`,
        name: "Begleitung im Alltag",
        serviceType: "Alltagsbegleitung",
        provider: { "@id": `${base}/#organization` },
        url: `${base}/begleitung`,
        description: pageSeo.begleitung.description,
      },
    ],
  };
}
