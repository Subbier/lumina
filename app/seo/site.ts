import type { Metadata } from "next";

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
    title: "Spitex Zürich & Aargau | Pflege zu Hause",
    description:
      "Lumina Spitex: kassenpflichtige Pflege zu Hause, Begleitung und Anstellung für pflegende Angehörige in Zürich und Aargau. Kostenlose Erstberatung.",
  },
  spitex: {
    path: "/spitex",
    title: "Spitex-Leistungen | Abklärung, Grund- & Behandlungspflege",
    description:
      "Professionelle Spitex in Zürich und Aargau: Abklärung & Beratung, Grundpflege und Behandlungspflege – ärztlich verordnet, direkt mit der Krankenkasse.",
  },
  angehoerige: {
    path: "/angehoerige",
    title: "Pflegende Angehörige anstellen | Lohn & Qualifikation",
    description:
      "Angehörige pflegen und dafür Lohn erhalten: Anstellung bei Lumina, Fachbegleitung und anerkannte Qualifikation innert 12 Monaten. Jetzt Anspruch prüfen.",
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
    title: "Ratgeber | Wissen zu Pflege & Angehörigen",
    description:
      "Ratgeber zu Lohn für pflegende Angehörige, Hilflosenentschädigung, Vorsorge und Spitex im Limmattal – verständlich und praxisnah.",
  },
  kontakt: {
    path: "/kontakt",
    title: "Kontakt | Anrufen, Rückruf oder Termin",
    description:
      "Kontaktieren Sie Lumina Spitex: direkt anrufen, Rückruf anfordern, Termin vereinbaren oder schreiben. Mo–Fr 08:00–17:00, Schlieren.",
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
      "In wenigen Minuten prüfen, ob für Ihre Angehörigenpflege ein Lohnanspruch möglich ist. Unverbindliche Einschätzung von Lumina Spitex.",
    conversion: true,
  },
  lohnCheck: {
    path: "/lohn-check",
    title: "Lohn-Check | Orientierung für pflegende Angehörige",
    description:
      "Unverbindliche Bruttolohn-Schätzung für pflegende Angehörige – Pensum und Stundenlohn als erste Orientierung vor dem Gespräch.",
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
} as const satisfies Record<string, PageSeo>;

export function buildMetadata(page: PageSeo): Metadata {
  const url = `${SITE_URL}${page.path === "/" ? "" : page.path}`;
  return {
    title: page.title,
    description: page.description,
    alternates: { canonical: url },
    openGraph: {
      title: page.title,
      description: page.description,
      url,
      siteName: SITE_NAME,
      locale: "de_CH",
      type: "website",
      images: [
        {
          url: "/og.png",
          alt: `${SITE_NAME} – Pflege, die ankommt.`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: page.title,
      description: page.description,
      images: ["/og.png"],
    },
  };
}

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["Organization", "HomeHealthCareService", "LocalBusiness"],
        "@id": `${SITE_URL}/#organization`,
        name: "Lumina Spitex AG",
        legalName: "Lumina Spitex AG",
        url: SITE_URL,
        logo: `${SITE_URL}/icon-512.png`,
        image: `${SITE_URL}/og.png`,
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
        sameAs: [],
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
        "@id": `${SITE_URL}/#website`,
        url: SITE_URL,
        name: SITE_NAME,
        inLanguage: "de-CH",
        publisher: { "@id": `${SITE_URL}/#organization` },
      },
      {
        "@type": "WebPage",
        "@id": `${SITE_URL}/#webpage`,
        url: SITE_URL,
        name: pageSeo.home.title,
        description: pageSeo.home.description,
        isPartOf: { "@id": `${SITE_URL}/#website` },
        about: { "@id": `${SITE_URL}/#organization` },
        inLanguage: "de-CH",
      },
      {
        "@type": "Service",
        "@id": `${SITE_URL}/spitex#service`,
        name: "Spitex-Pflege",
        serviceType: "Ambulante Krankenpflege",
        provider: { "@id": `${SITE_URL}/#organization` },
        areaServed: ["Zürich", "Aargau"],
        url: `${SITE_URL}/spitex`,
        description: pageSeo.spitex.description,
      },
      {
        "@type": "Service",
        "@id": `${SITE_URL}/angehoerige#service`,
        name: "Anstellung pflegender Angehöriger",
        serviceType: "Pflegende Angehörige",
        provider: { "@id": `${SITE_URL}/#organization` },
        url: `${SITE_URL}/angehoerige`,
        description: pageSeo.angehoerige.description,
      },
      {
        "@type": "Service",
        "@id": `${SITE_URL}/begleitung#service`,
        name: "Begleitung im Alltag",
        serviceType: "Alltagsbegleitung",
        provider: { "@id": `${SITE_URL}/#organization` },
        url: `${SITE_URL}/begleitung`,
        description: pageSeo.begleitung.description,
      },
    ],
  };
}
