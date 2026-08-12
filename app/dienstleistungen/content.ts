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
  /** Text link shown bottom-right inside each open accordion item */
  accordionLink?: {
    href: string;
    label: string;
  };
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
    eyebrow: "Spitex",
    title: "Professionelle Pflege.",
    titleEm: "Zu Hause begleitet.",
    lead:
      "Abklärung & Beratung sowie Grund- und Behandlungspflege – ärztlich verordnet, von Fachpersonen erbracht und über die Krankenkasse abrechenbar.",
    image: "/images/spitex-hero-home-visit.jpg?v=sq3",
    imageAlt:
      "Spitex-Pflegefachperson misst bei einer Klientin zu Hause den Blutdruck",
    heroTone: "warm",
    introEyebrow: "Kassenpflichtige Pflege mit Haltung",
    introTitle: "Sie brauchen Pflege. Wir bleiben an Ihrer Seite.",
    introSummary:
      "Bevor die Pflege beginnt, klären wir den Bedarf. Danach begleiten diplomierte Pflegefachpersonen und Fachpersonen Gesundheit Sie im Alltag – wirksam, zweckmässig und wirtschaftlich.",
    introMore: [
      "Sämtliche Grund- und Behandlungspflegeleistungen nach KLV Art. 7 Abs. 2 werden direkt über Ihre Krankenkasse abgerechnet. Die Leistungen erfassen wir transparent in der Pflegedokumentation.",
      "Leistungen über die Kassenpflege hinaus finden Sie unter Begleitung. Wenn Angehörige die Pflege übernehmen, begleiten wir Anstellung und Qualifikation unter Pflegende Angehörige. Aktuelle Ansätze stehen unter Tarife.",
    ],
    accordionTitle: "Was Sie von der Lumina Spitex erwarten dürfen",
    accordionLink: {
      href: "/kontakt?thema=mehr-infos&aktion=rueckruf",
      label: "Mehr Infos anfordern",
    },
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
        label: "Leistungen",
        value: "Abklärung, Grund- und Behandlungspflege",
      },
      {
        label: "Finanzierung",
        value: "Direkte Abrechnung über die Grundversicherung (KVG)",
      },
      {
        label: "Region",
        value: "Kanton Zürich & Aargau",
      },
    ],
    processTitle: "Ihr Weg mit Lumina",
    process: [
      {
        step: "01",
        title: "Melden",
        text: "Sie kontaktieren uns – wir klären unverbindlich Bedarf und Finanzierung.",
      },
      {
        step: "02",
        title: "Abklären",
        text: "Eine diplomierte Pflegefachperson erhebt den Bedarf zu Hause und erstellt den Pflegeplan.",
      },
      {
        step: "03",
        title: "Verordnen",
        text: "Ärztliche Verordnung und Krankenkasse greifen – wir unterstützen bei den Formalitäten.",
      },
      {
        step: "04",
        title: "Pflegen",
        text: "Feste Bezugspersonen begleiten Sie im Alltag – klar dokumentiert und nachvollziehbar.",
      },
      {
        step: "05",
        title: "Begleiten",
        text: "Wir bleiben erreichbar, stimmen uns mit Ärztinnen ab und passen die Pflege bei Bedarf an.",
      },
    ],
    audioSrc: "/audio/spitex.mp3?v=spoken2",
    speakScript:
      "Hallo und willkommen bei Lumina Spietex. Schön, dass Sie da sind. Wir kommen zu Ihnen nach Hause – mit professioneller Pflege, die wirklich zu Ihrem Alltag passt. Zuerst schauen wir gemeinsam hin: Was brauchen Sie gerade? Eine diplomierte Pflegefachperson macht die Abklärung bei Ihnen vor Ort und plant die nächsten Schritte mit Ihnen. Danach unterstützen wir Sie in der Grundpflege – zum Beispiel bei Körperpflege, Mobilisation oder beim Anziehen. Und wenn medizinische Massnahmen nötig sind, übernehmen wir die Behandlungspflege auf ärztliche Anordnung. Medikamente, Wundversorgung, Blutdruck – das regeln wir fachlich und ruhig. Wichtig für Sie: Diese Leistungen rechnen wir direkt mit der Krankenkasse ab. Sie müssen das nicht allein organisieren. Wenn Sie jetzt wissen möchten, wie der Einstieg bei Ihnen aussehen könnte, fordern Sie bitte eine kostenlose Erstberatung an – über das Kontaktformular auf dieser Seite oder telefonisch unter null vier drei, vier drei drei, acht acht, null null. Wir melden uns persönlich bei Ihnen.",
    claimBanner: {
      eyebrow: "Unverbindliche Orientierung",
      title: "Brauchen Sie Spitex-Pflege zu Hause? Dann klären wir den nächsten Schritt.",
      text: "In einem kurzen Gespräch prüfen wir Bedarf, Finanzierung über die Krankenkasse und wie der Einstieg bei Ihnen aussehen könnte – klar und ohne Verpflichtung.",
      href: "/kontakt",
      label: "Erstberatung anfragen",
    },
    cta: {
      title: "Dürfen wir Ihre Pflegesituation gemeinsam anschauen?",
      text: "Starten Sie mit einer unverbindlichen Erstberatung – oder prüfen Sie zuerst die Tarife für kassenpflichtige Leistungen.",
      primaryHref: "/kontakt",
      primaryLabel: "Erstberatung anfragen",
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
    image: "/images/home-services.webp",
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
    accordionLink: {
      href: "/kontakt?thema=begleitung",
      label: "unverbindliche Beratung",
    },
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
    audioSrc: "/audio/begleitung.mp3?v=spoken2",
    speakScript:
      "Hallo und willkommen bei der Begleitung von Lumina Spietex. Manchmal reicht Pflege allein nicht aus, damit der Tag wieder leicht wird. Genau hier setzen wir an. Wir helfen bei Erledigungen – Einkauf, Apotheke, Post oder Behördengängen. Wir begleiten Sie sicher zu Terminen, zum Beispiel zum Arzt oder zur Therapie. Und wir bleiben an Ihrer Seite, wenn Begegnung und Teilhabe wichtig sind: ein Spaziergang, ein Besuch, ein Café – einfach wieder dabei sein. Das geht über die kassenpflichtige Grundpflege hinaus und wird persönlich mit Ihnen vereinbart. Wenn Sie spüren, dass Sie genau diese Entlastung brauchen, fordern Sie bitte weitere Informationen an – über das Kontaktformular auf dieser Seite. Erzählen Sie uns kurz, was Ihnen helfen würde. Wir melden uns mit einem konkreten Vorschlag.",
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
    title: "Sie pflegen.",
    titleEm: "Wir stellen an.",
    lead:
      "Sie pflegen schon – und können sofort angestellt werden. Lohn von Tag eins. Die Ausbildung folgt innert zwölf Monaten: Lehrgang Pflegende Angehörige SRK, organisiert und finanziert durch uns.",
    image: "/images/angehoerige-hero-anleitung.jpg?v=sq3",
    imageAlt:
      "Pflegefachperson zeigt einem Angehörigen auf Hausbesuch, wie er seinen Vater unterstützt",
    heroTone: "warm",
    introEyebrow: "Sofort anstellen. Danach ausbilden.",
    introTitle: "Pflegen Sie weiter. Wir übernehmen den Rest.",
    introSummary:
      "Kein Kurs zuerst, kein monatelanges Warten: Bei Lumina starten Sie mit Anstellung, Lohn und Sozialversicherung. Eine diplomierte Pflegefachperson bleibt an Ihrer Seite – und die Krankenkasse trägt die dokumentierte Grundpflege.",
    introMore: [
      "Vertrag, Abrechnung und Qualitätssicherung liegen bei uns. Sie bleiben bei dem Menschen, der Ihnen nahesteht – mit Lohn statt stiller Belastung.",
      "Innert zwölf Monaten absolvieren Sie den Lehrgang Pflegende Angehörige SRK (von Spitex Schweiz anerkannt). Wir organisieren, zahlen und begleiten das Coaching zu Hause.",
    ],
    accordionTitle: "Was Sie von Lumina erwarten dürfen",
    accordionLink: {
      href: "#anspruch-pruefen",
      label: "Jetzt Anspruch prüfen",
    },
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
        title: "Lehrgang Pflegende Angehörige SRK",
        intro:
          "Zuerst Anstellung – dann Ausbildung. Innert zwölf Monaten führen wir Sie durch den anerkannten SRK-Lehrgang. Praxisnah, auf Ihre Situation zu Hause ausgerichtet.",
        bullets: [
          "Kurskosten übernimmt Lumina",
          "Anmeldung und Termine organisieren wir",
          "Transfercoaching durch unsere Pflegefachpersonen",
          "Zertifikat Pflegende Angehörige SRK – anerkannt von Spitex Schweiz",
        ],
        note:
          "Hauswirtschaft und Gesellschaft bleiben wertvoll – gehören aber nicht automatisch zur kassenpflichtigen Grundpflege. Dafür steht unsere Begleitung bereit.",
      },
    ],
    facts: [
      {
        label: "Zielgruppe",
        value: "Ehepartner/innen, Kinder, Geschwister, enge Bezugspersonen",
      },
      {
        label: "Finanzierung",
        value: "Abrechnung über die Grundversicherung (KVG)",
      },
      {
        label: "Ausbildung",
        value: "SRK-Lehrgang innert 12 Monaten – Kosten trägt Lumina",
      },
    ],
    processTitle: "Ihr Weg mit Lumina",
    process: [
      {
        step: "01",
        title: "Klären",
        text: "Kurzes Erstgespräch: Passt Ihre Situation – und wie geht es weiter?",
      },
      {
        step: "02",
        title: "Abklären",
        text: "Eine diplomierte Pflegefachperson erhebt den Bedarf zu Hause.",
      },
      {
        step: "03",
        title: "Anstellen",
        text: "Sofort: Vertrag, Sozialversicherungen und Lohn – ohne Kursabschluss zuerst.",
      },
      {
        step: "04",
        title: "Ausbilden",
        text: "Innert zwölf Monaten: Lehrgang Pflegende Angehörige SRK – organisiert und finanziert durch uns.",
      },
      {
        step: "05",
        title: "Begleiten",
        text: "Lohn, Dokumentation und Fachaufsicht bleiben dauerhaft an Ihrer Seite.",
      },
    ],
    audioSrc: "/audio/angehoerige.mp3?v=spoken2",
    speakScript:
      "Hallo und willkommen bei Lumina Spitex. Wenn Sie jemanden pflegen, der Ihnen nahesteht: Sie müssen das nicht allein tragen. Bei uns können Sie sofort angestellt werden – mit Lohn und Sozialversicherung. Eine diplomierte Pflegefachperson begleitet Sie. Innert zwölf Monaten organisieren und finanzieren wir den Lehrgang Pflegende Angehörige SRK. Prüfen Sie jetzt in zwei Minuten Ihren möglichen Lohnanspruch – oder fordern Sie einen Rückruf an.",
    claimBanner: {
      eyebrow: "2 Minuten",
      title: "Pflegen Sie Angehörige? Prüfen Sie Ihren Lohnanspruch.",
      text: "Unverbindlich und klar – oft ist mehr möglich, als Familien denken.",
      href: "#anspruch-pruefen",
      label: "Jetzt prüfen",
    },
    cta: {
      title: "Möchten Sie wissen, ob Lohn für Ihre Pflege möglich ist?",
      text: "Nutzen Sie den Check auf dieser Seite – oder fordern Sie einen Rückruf an.",
      primaryHref: "#anspruch-pruefen",
      primaryLabel: "Anspruch prüfen",
      secondaryHref: "/kontakt",
      secondaryLabel: "Rückruf anfordern",
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
