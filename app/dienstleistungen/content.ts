export type ServiceAccordionItem = {
  title: string;
  intro: string;
  bullets?: string[];
  note?: string;
};

export type ServiceSegment = {
  id: "spitex" | "begleitung" | "angehoerige";
  path: string;
  eyebrow: string;
  title: string;
  titleEm: string;
  lead: string;
  image: string;
  imageAlt: string;
  heroTone: "dark" | "warm" | "clean";
  introEyebrow: string;
  introTitle: string;
  introSummary: string;
  introMore: string[];
  accordionTitle: string;
  accordion: ServiceAccordionItem[];
  facts?: { label: string; value: string }[];
  processTitle?: string;
  process?: { step: string; title: string; text: string }[];
  audioSrc: string;
  speakScript: string;
  claimBanner?: {
    eyebrow: string;
    title: string;
    text: string;
    href: string;
    label: string;
  };
  cta: {
    title: string;
    text: string;
    primaryHref: string;
    primaryLabel: string;
    secondaryHref?: string;
    secondaryLabel?: string;
  };
};

export const serviceSegments: ServiceSegment[] = [
  {
    id: "spitex",
    path: "/spitex",
    eyebrow: "Spitex · kassenpflichtige Pflege",
    title: "Professionelle Pflege",
    titleEm: "zu Hause.",
    lead:
      "Abklärung & Beratung sowie Grund- und Behandlungspflege – ärztlich verordnet, von Fachpersonen erbracht und über die Krankenkasse abrechenbar.",
    image: "/images/spitex-care-2.png",
    imageAlt: "Spitex-Pflegefachperson im Einsatz bei einer Klientin",
    heroTone: "dark",
    introEyebrow: "Aus unserem Angebot",
    introTitle: "Spitex-Pflege, die zu Hause ankommt.",
    introSummary:
      "Bevor die Pflege beginnt, klären wir den Bedarf. Danach begleiten diplomierte Pflegefachpersonen und Fachpersonen Gesundheit Sie im Alltag – wirksam, zweckmässig und wirtschaftlich.",
    introMore: [
      "Sämtliche Grund- und Behandlungspflegeleistungen nach KLV Art. 7 Abs. 2 werden direkt über Ihre Krankenkasse abgerechnet. Die Leistungen erfassen wir transparent in der Pflegedokumentation.",
      "Leistungen über die Kassenpflege hinaus finden Sie unter Begleitung. Wenn Angehörige die Pflege übernehmen, begleiten wir Anstellung und Qualifikation unter Pflegende Angehörige. Aktuelle Ansätze stehen unter Tarife.",
    ],
    accordionTitle: "Leistungen im Überblick",
    accordion: [
      {
        title: "Abklärung & Beratung",
        intro:
          "Die Abklärung und Beratung bildet das Fundament jeder professionellen Spitex-Betreuung. Beim strukturierten Erstbesuch erfassen unsere diplomierten Pflegefachpersonen Ihren Pflege-, Betreuungs- und Unterstützungsbedarf und erstellen gemeinsam mit Ihnen einen massgeschneiderten Versorgungsplan.",
        bullets: [
          "Erfassung des pflegerischen, medizinischen und sozialen Gesamtzustands",
          "Einschätzung der Alltagskompetenz und Selbständigkeit (ADL/IADL)",
          "Analyse des häuslichen Umfelds auf Risiken und Hilfsmittelbedarf",
          "Klärung des Leistungsanspruchs gegenüber der Krankenversicherung (KVG/KLV Art. 7 Abs. 2)",
          "Abklärung möglicher Zusatzleistungen über AHV/EL, IV oder Gemeinde",
          "Einbezug von Angehörigen und Betreuungspersonen",
          "Erstellung des individuellen Pflegeplans und Festlegung der Pflegeziele",
        ],
        note:
          "Beratung begleitet Sie auch laufend – zu Krankheitsbildern, Medikamenten, Hilfsmitteln und der Koordination mit Ärztinnen, Spital und Therapeuten. Die Abklärungs- und Beratungsleistungen sind kassenpflichtig.",
      },
      {
        title: "Grundpflege",
        intro:
          "Die Grundpflege umfasst alle Massnahmen zur Unterstützung der täglichen Körperpflege und zur Erhaltung der Selbständigkeit. Wir arbeiten einfühlsam, respektvoll und ressourcenorientiert.",
        bullets: [
          "Körperpflege: Waschen, Baden, Duschen, Haarpflege, Rasur",
          "Mundpflege und Zahnpflegeunterstützung",
          "An- und Auskleiden, Wechsel von Körperwäsche und Inkontinenzmaterial",
          "Lagerung und Mobilisation",
          "Sturzprävention und Gehhilfe",
          "Unterstützung bei der Nahrungsaufnahme",
          "Förderung der Kontinenz, Blasen- und Darmpflege",
        ],
      },
      {
        title: "Behandlungspflege",
        intro:
          "Die Behandlungspflege umfasst medizinisch-pflegerische Massnahmen auf ärztliche Anordnung. Diese Leistungen erfordern spezifische Fachkompetenz und werden durch diplomierte Pflegefachpersonen HF/FH erbracht.",
        bullets: [
          "Medikamentenmanagement: Richten, Verabreichen, Inhalationen",
          "Injektionen, Infusionen und Infusionstherapien",
          "Wundversorgung nach aktuellem Wundmanagementstandard",
          "Katheter- und Stomapflege",
          "Vitalzeichenkontrolle (Blutdruck, Puls, Blutzucker, Gewicht)",
          "Entnahme von Blut- und Urinproben",
          "Verbandwechsel, Nahtentfernung, Kompressionsversorgung",
        ],
      },
    ],
    facts: [
      {
        label: "Finanzierung",
        value: "Über die Krankenkasse abrechenbar",
      },
      {
        label: "Bezugsperson",
        value: "Fest zugewiesen",
      },
      {
        label: "Region",
        value: "Limmattal & Kanton Zürich",
      },
    ],
    processTitle: "So starten wir",
    process: [
      {
        step: "01",
        title: "Erstkontakt",
        text: "Sie melden sich – wir klären unverbindlich, was nötig ist und wie die Finanzierung greift.",
      },
      {
        step: "02",
        title: "Bedarfsabklärung",
        text: "Eine diplomierte Pflegefachperson besucht Sie zu Hause und erstellt den Pflegeplan.",
      },
      {
        step: "03",
        title: "Pflege im Alltag",
        text: "Feste Bezugspersonen begleiten Sie – mit klarer Dokumentation und direkter Abrechnung.",
      },
    ],
    audioSrc: "/audio/spitex.mp3?v=noprices",
    speakScript:
      "Willkommen bei den Spietex-Dienstleistungen von Lumina Spietex. Wir bieten professionelle Pflege zu Hause: Zuerst die Abklärung und Beratung, danach Grundpflege und Behandlungspflege. Beim Erstbesuch erfassen diplomierte Pflegefachpersonen Ihren Bedarf und erstellen mit Ihnen einen Versorgungsplan. Die Grundpflege unterstützt Körperpflege, Mobilisation und Selbständigkeit im Alltag. Die Behandlungspflege umfasst medizinisch-pflegerische Maßnahmen auf ärztliche Anordnung – etwa Medikamente, Wundversorgung oder Vitalzeichenkontrolle. Diese Leistungen rechnen wir direkt mit Ihrer Krankenkasse ab. Einzelheiten zu den Ansätzen finden Sie auf unserer Tarifseite. Wenn Sie mehr erfahren möchten, fordern Sie bitte eine kostenlose Erstberatung an – telefonisch oder über das Kontaktformular.",
    cta: {
      title: "Mehr Informationen zur Spitex anfordern?",
      text: "Wir erklären unverbindlich Leistungen und Ablauf – persönlich und verständlich. Ansätze finden Sie unter Tarife.",
      primaryHref: "/kontakt",
      primaryLabel: "Informationen anfordern",
      secondaryHref: "/tarife",
      secondaryLabel: "Tarife ansehen",
    },
  },
  {
    id: "begleitung",
    path: "/begleitung",
    eyebrow: "Begleitung · über die Grundpflege hinaus",
    title: "Ein Leben,",
    titleEm: "das sich wieder leicht anfühlt.",
    lead:
      "Wenn Pflege das Nötige sichert, schafft Begleitung das Angenehme: Erledigungen, Termine und Teilhabe am sozialen Leben – diskret, verlässlich und auf Sie abgestimmt.",
    image: "/images/home-services.png",
    imageAlt: "Begleitung für Teilhabe und ein angenehmes Leben zu Hause",
    heroTone: "clean",
    introEyebrow: "Mehr als das Minimum",
    introTitle: "Unterstützung, die Alltag und Freude verbindet.",
    introSummary:
      "Nicht jede Hilfe gehört zur kassenpflichtigen Pflege – und genau hier setzt unsere Begleitung an. Wir entlasten bei praktischen Dingen, begleiten Sie sicher unterwegs und halten soziale Kontakte lebendig.",
    introMore: [
      "Diese Leistungen ergänzen die Spitex-Pflege. Sie sind in der Regel privat zu finanzieren; je nach Situation können Zusatzversicherung, Ergänzungsleistungen oder Gemeindebeiträge mittragen. Transparente Ansätze finden Sie unter Tarife.",
      "Kassenpflichtige Pflege: unter Spitex. Anstellung und Qualifikation für Angehörige: unter Pflegende Angehörige.",
    ],
    accordionTitle: "So begleiten wir Sie",
    accordion: [
      {
        title: "Erledigungen im Alltag",
        intro:
          "Kleine und grosse Besorgungen kosten Zeit und Kraft. Wir übernehmen, was den Tag entlastet – sorgfältig und in Ihrem Sinne.",
        bullets: [
          "Einkäufe und Apothekengänge",
          "Post, Behördenwege und administrative Besorgungen",
          "Organisation von Terminen und Lieferungen",
          "Unterstützung bei Haushaltsdingen, die den Alltag erleichtern",
        ],
      },
      {
        title: "Begleitung zu Terminen",
        intro:
          "Arzt, Therapie, Bank oder Behörde: Wir begleiten Sie zuverlässig – von der Tür bis zurück nach Hause.",
        bullets: [
          "Begleitung zu medizinischen und therapeutischen Terminen",
          "Unterstützung beim Ankommen, Warten und Nachfragen",
          "Hilfe beim Transportweg und bei der Orientierung",
          "Ruhige Präsenz, wenn Unsicherheit oder Anstrengung mitspielen",
        ],
      },
      {
        title: "Teilhabe am sozialen Leben",
        intro:
          "Begegnung hält lebendig. Wir begleiten Spaziergänge, Besuche und Anlässe – damit Isolation nicht den Alltag bestimmt.",
        bullets: [
          "Gesellschaft und Gespräche im vertrauten Rhythmus",
          "Begleitung zu Kultur, Café, Kirche oder Familienbesuchen",
          "Gemeinsame Spaziergänge und leichte Freizeitmomente",
          "Unterstützung dabei, Kontakte und Gewohnheiten zu pflegen",
        ],
      },
    ],
    facts: [
      {
        label: "Fokus",
        value: "Über die Grundpflege hinaus",
      },
      {
        label: "Ziel",
        value: "Alltagserleichterung & Teilhabe",
      },
      {
        label: "Gestaltung",
        value: "Persönlich und flexibel",
      },
    ],
    processTitle: "So entsteht Ihre Begleitung",
    process: [
      {
        step: "01",
        title: "Zuhören",
        text: "Wir klären, was Ihnen im Alltag fehlt – und was wieder leicht werden soll.",
      },
      {
        step: "02",
        title: "Passen",
        text: "Gemeinsam legen wir Umfang, Zeiten und Bezugsperson fest.",
      },
      {
        step: "03",
        title: "Begleiten",
        text: "Wir sind verlässlich da und passen die Unterstützung bei Bedarf an.",
      },
    ],
    audioSrc: "/audio/begleitung.mp3?v=1",
    speakScript:
      "Willkommen bei der Begleitung von Lumina Spietex. Wenn Pflege das Nötige sichert, schafft Begleitung das Angenehme. Wir unterstützen Sie bei Erledigungen im Alltag, begleiten Sie zu Terminen und fördern die Teilhabe am sozialen Leben. Dazu gehören Einkäufe und Besorgungen, Begleitung zu Arzt oder Behörde sowie Gesellschaft bei Spaziergängen, Besuchen und Anlässen. Diese Leistungen gehen über die kassenpflichtige Grundpflege hinaus und werden individuell vereinbart. Ansätze finden Sie auf unserer Tarifseite. Wenn Sie ein persönliches Arrangement wünschen, fordern Sie bitte weitere Informationen an.",
    cta: {
      title: "Möchten Sie wieder mehr Leichtigkeit im Alltag?",
      text: "Erzählen Sie uns, was Sie entlasten würde – wir melden uns mit einem konkreten Vorschlag.",
      primaryHref: "/kontakt",
      primaryLabel: "Begleitung anfragen",
      secondaryHref: "/tarife",
      secondaryLabel: "Tarife ansehen",
    },
  },
  {
    id: "angehoerige",
    path: "/angehoerige",
    eyebrow: "Pflegende Angehörige",
    title: "Nähe behalten.",
    titleEm: "Sicherheit gewinnen.",
    lead:
      "Wenn Sie einen Menschen zu Hause pflegen, müssen Sie das nicht allein tragen. Lumina stellt an, begleitet eng, schult Sie im Alltag – und führt Sie innert zwölf Monaten zur anerkannten Qualifikation.",
    image: "/images/home-family.png",
    imageAlt: "Familiäre Angehörigenpflege zu Hause",
    heroTone: "warm",
    introEyebrow: "Anstellung mit echter Begleitung",
    introTitle: "Sie pflegen. Wir bleiben an Ihrer Seite.",
    introSummary:
      "Viele Familien leisten täglich wertvolle Grundpflege – oft unsichtbar und ohne Absicherung. Bei Lumina wird daraus ein klares Arbeitsverhältnis: mit Lohn, Sozialversicherung und einer diplomierten Pflegefachperson, die Sie regelmässig anleitet.",
    introMore: [
      "Wir rechnen die ärztlich verordnete, dokumentierte Grundpflege über die obligatorische Krankenpflegeversicherung ab. Parallel dazu übernehmen wir Vertrag, Administration und Qualitätssicherung – damit Sie sich auf den Menschen konzentrieren können, der Ihnen nahesteht.",
      "Fachliche Begleitung ist bei uns kein Zusatz, sondern Teil des Modells: Einführung vor Ort, laufende Unterstützung und eine strukturierte Ausbildung, die Sie innerhalb von zwölf Monaten zur Pflegehilfsperson qualifiziert.",
    ],
    accordionTitle: "Was Sie von Lumina erwarten dürfen",
    accordion: [
      {
        title: "Für wen eignet sich das Modell?",
        intro:
          "Für Ehepartnerinnen und Ehepartner, Töchter und Söhne, Geschwister sowie enge Bezugspersonen, die eine nahestehende Person regelmässig zu Hause pflegen.",
        bullets: [
          "Finanzierung über die Grundversicherung (KVG), soweit Leistungen anrechenbar sind",
          "Monatliche Lohnzahlung durch die Lumina Spitex AG",
          "Vollständiger Sozialversicherungsschutz im Rahmen der Anstellung",
        ],
      },
      {
        title: "Enge Begleitung im Pflegealltag",
        intro:
          "Sie sind nicht allein gelassen. Eine diplomierte Pflegefachperson führt Sie ein, bleibt erreichbar und begleitet die Qualität der Pflege – mit Respekt für Ihre familiäre Nähe.",
        bullets: [
          "Persönliche Einführung in sichere Pflegetechniken",
          "Regelmässige Fachkontakte und Hausbesuche nach Bedarf",
          "Unterstützung bei Dokumentation und Absprachen mit Ärztinnen und Ärzten",
          "Entlastung, wenn Sie vorübergehend Vertretung brauchen",
        ],
      },
      {
        title: "Ausbildung innert zwölf Monaten",
        intro:
          "Wir bereiten Sie systematisch auf Ihre Rolle vor und organisieren den anerkannten Pflegehelferkurs – oder eine gleichwertige Ausbildung. Innerhalb eines Jahres nach Anstellungsbeginn schliessen Sie diese Qualifikation ab.",
        bullets: [
          "Praxisnahe Schulung direkt in Ihrer Pflegesituation",
          "Begleitung bis zum Kursabschluss",
          "Klare Orientierung, welche Leistungen als Grundpflege gelten",
          "Wachsende Sicherheit in Hygiene, Mobilisation und Alltagspflege",
        ],
        note:
          "Hauswirtschaft und reine Gesellschaft bleiben wertvoll – sie gehören jedoch nicht automatisch zur kassenpflichtigen Grundpflege. Dafür steht unsere Begleitung bereit.",
      },
    ],
    facts: [
      {
        label: "Zielgruppe",
        value: "Ehepartner/innen, Kinder, Geschwister, enge Bezugspersonen",
      },
      {
        label: "Finanzierung",
        value: "Direkte Abrechnung über die Grundversicherung (KVG)",
      },
      {
        label: "Qualifikation",
        value: "Anerkannte Ausbildung innert 12 Monaten",
      },
    ],
    processTitle: "Ihr Weg mit Lumina",
    process: [
      {
        step: "01",
        title: "Klären",
        text: "Im Erstgespräch prüfen wir ehrlich, ob Ihre Situation für das Modell geeignet ist.",
      },
      {
        step: "02",
        title: "Abklären",
        text: "Eine diplomierte Pflegefachperson erhebt den Bedarf zu Hause und erstellt den Pflegeplan.",
      },
      {
        step: "03",
        title: "Anstellen",
        text: "Sie erhalten einen Arbeitsvertrag sowie die Anmeldung bei den Sozialversicherungen.",
      },
      {
        step: "04",
        title: "Qualifizieren",
        text: "Wir schulen Sie im Alltag und begleiten die Ausbildung – Abschluss innert zwölf Monaten.",
      },
      {
        step: "05",
        title: "Begleiten",
        text: "Lohn, Dokumentation, Fachaufsicht und Ansprechpersonen bleiben dauerhaft an Ihrer Seite.",
      },
    ],
    audioSrc: "/audio/angehoerige.mp3?v=begleitung12",
    speakScript:
      "Willkommen bei Lumina Spietex zum Thema pflegende Angehörige. Wenn Sie einen Menschen zu Hause pflegen, müssen Sie das nicht allein tragen. Lumina stellt Sie an, begleitet Sie eng und schult Sie im Alltag. Innerhalb von zwölf Monaten führen wir Sie zur anerkannten Qualifikation als Pflegehilfsperson. Die dokumentierte Grundpflege wird über die Grundversicherung abgerechnet. Sie erhalten monatlichen Lohn und Sozialversicherungsschutz. Eine diplomierte Pflegefachperson bleibt an Ihrer Seite – mit Einführung, Fachfragen und regelmässiger Begleitung. Der Weg ist klar: klären, abklären, anstellen, qualifizieren und dauerhaft begleiten. Wenn Sie wissen möchten, ob das Modell zu Ihrer Familie passt, fordern Sie bitte weitere Informationen an.",
    claimBanner: {
      eyebrow: "Erste Einschätzung",
      title: "Pflegen Sie Angehörige? Dann prüfen Sie Ihren möglichen Lohnanspruch.",
      text: "Viele Familien übernehmen täglich Grundpflege – oft ohne zu wissen, dass dafür ein Lohn möglich ist. In rund zwei Minuten erhalten Sie eine klare, unverbindliche Orientierung.",
      href: "/lohn-check",
      label: "Anspruch prüfen",
    },
    cta: {
      title: "Pflegen Sie Angehörige – und möchten wissen, was möglich ist?",
      text: "Starten Sie mit einer kurzen Einschätzung zum möglichen Lohnanspruch – oder sprechen Sie direkt mit uns über Anstellung und Begleitung.",
      primaryHref: "/lohn-check",
      primaryLabel: "Anspruch prüfen",
      secondaryHref: "/kontakt",
      secondaryLabel: "Beratung anfragen",
    },
  },
];

export function getServiceSegment(id: ServiceSegment["id"]) {
  return serviceSegments.find((s) => s.id === id)!;
}

export const partners = [
  { name: "ASPS", src: "/images/partners/asps.png" },
  { name: "Verein KM", src: "/images/partners/vereinkm.png" },
  { name: "ASOS", src: "/images/partners/asos.png" },
  { name: "Physio Zürich", src: "/images/partners/physio-zurich.jpg" },
  { name: "Stadt Zürich", src: "/images/partners/zurich.jpg" },
  { name: "Lifestage Solutions", src: "/images/partners/lifestage.jpg" },
];

export const tarifeKlv = [
  {
    leistung: "Bedarfsabklärung, Beratung und Koordination (KLV A)",
    traeger: "Krankenkasse",
    tarif: "76.90",
  },
  {
    leistung: "Untersuchung und Behandlung (KLV B)",
    traeger: "Krankenkasse",
    tarif: "63.00",
  },
  {
    leistung: "Grundpflege (KLV C)",
    traeger: "Krankenkasse",
    tarif: "52.60",
  },
];

export const tarifeUvg = [
  {
    leistung: "Bedarfsabklärung, Beratung und Koordination",
    traeger: "Unfallversicherung",
    tarif: "125.05",
  },
  {
    leistung: "Untersuchung und Behandlung",
    traeger: "Unfallversicherung",
    tarif: "120.00",
  },
  {
    leistung: "Grundpflege",
    traeger: "Unfallversicherung",
    tarif: "110.05",
  },
];
