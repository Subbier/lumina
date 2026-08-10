export type ArticleSection = {
  heading?: string;
  paragraphs: string[];
};

export type Article = {
  slug: string;
  tag: string;
  title: string;
  text: string;
  read: string;
  image: string;
  imageAlt: string;
  updated: string;
  sections: ArticleSection[];
  takeaways: string[];
  ctaLabel?: string;
  ctaHref?: string;
};

/**
 * Ratgeber-Inhalte für Lumina Spitex.
 * Quellen u.a.: BGE 145 V 161, KLV Art. 7 Abs. 2, Merkblatt AHV 3.01 (Stand 01.01.2026),
 * lumina-spitex.ch, Wettbewerbspflege (pflegewegweiser.ch, iaha.ch, spitex.ch) – inhaltlich
 * abgegrenzt durch Transparenz, Limmattal-Bezug und Fokus Grundpflege unter Fachaufsicht.
 */
export const articles: Article[] = [
  {
    slug: "lohn-fuer-pflegende-angehoerige",
    tag: "Lohn & Anspruch",
    title: "Lohn für pflegende Angehörige: Was ist möglich?",
    text: "Welche Pflegezeit zählt, wie eine Anstellung funktioniert und warum die genaue Abklärung entscheidend ist.",
    read: "8 Min.",
    image: "/images/ratgeber/blog-12.png",
    imageAlt:
      "Pflegende Angehörige begleitet eine ältere Frau zu Hause im Rollstuhl",
    updated: "August 2026",
    takeaways: [
      "Vergütet wird die ärztlich verordnete Grundpflege – nicht jede Betreuungsminute.",
      "Eine Anstellung läuft über eine zugelassene Spitex mit kantonaler Bewilligung.",
      "Der effektive Monatslohn hängt vom dokumentierten Pflegebedarf ab, nicht von Werbeversprechen.",
    ],
    ctaLabel: "Unverbindlichen Lohn-Check starten",
    ctaHref: "/lohn-check",
    sections: [
      {
        paragraphs: [
          "In der Schweiz pflegen Hunderttausende Angehörige ihre Liebsten zu Hause – oft mit reduziertem Erwerbspensum, ohne Lohn und ohne Sozialversicherung. Seit dem Bundesgerichtsentscheid BGE 145 V 161 (2019) ist klar: Grundpflegeleistungen können über eine zugelassene Spitex auch dann zulasten der obligatorischen Krankenpflegeversicherung (OKP) abgerechnet werden, wenn sie von angestellten Angehörigen erbracht werden.",
          "Das ändert die Realität vieler Familien im Limmattal und im Kanton Zürich: Aus unsichtbarer Care-Arbeit kann eine echte Anstellung werden – mit Lohn, Ferienanspruch und Sozialversicherungen. Entscheidend ist aber, was rechtlich als Pflege zählt und was nicht.",
        ],
      },
      {
        heading: "Was wird überhaupt bezahlt?",
        paragraphs: [
          "Abgerechnet werden Massnahmen der allgemeinen Grundpflege gemäss Art. 7 Abs. 2 lit. c der Krankenpflege-Leistungsverordnung (KLV). Dazu gehören typischerweise Hilfe bei Körperpflege, An- und Auskleiden, Essen und Trinken, Betten und Lagern, Mobilisation sowie bestimmte prophylaktische Massnahmen – immer im Rahmen einer pflegerischen Bedarfsabklärung.",
          "Nicht vergütet wird die reine Gesellschaft, der Haushalt ohne Pflegebezug oder medizinische Behandlungspflege (z. B. komplexe Wundversorgung, Injektionen), sofern diese nicht von entsprechend qualifiziertem Fachpersonal erbracht wird. Lumina fokussiert bewusst auf Grundpflege unter Fachaufsicht – ohne unrealistische Maximalversprechen.",
        ],
      },
      {
        heading: "So funktioniert die Anstellung in der Praxis",
        paragraphs: [
          "Eine Privatperson kann Pflegeleistungen nicht direkt bei der Krankenkasse einreichen. Dafür braucht es eine Spitex mit Betriebsbewilligung und Abrechnungsberechtigung. Der Ablauf bei Lumina entspricht dem Schweizer Standard – transparent erklärt:",
          "1) Kurzes Erstgespräch und erste Einschätzung (z. B. über den Lohn-Check). 2) Ärztliche Verordnung und Bedarfsabklärung durch eine diplomierte Pflegefachperson zu Hause. 3) Arbeitsvertrag, Sozialversicherungsanmeldung und Einführung. 4) Monatliche Dokumentation der erbrachten Grundpflege und pünktliche Lohnzahlung.",
          "Konkurrenten wie Pflegewegweiser oder IAHA kommunizieren oft feste Stundenlöhne und hohe Monatsbeträge. Diese Zahlen sind nur dann realistisch, wenn der dokumentierte Pflegebedarf entsprechend hoch ist. Eine seriöse Spitex sagt Ihnen zuerst, welche Stunden voraussichtlich anrechenbar sind – und erst dann, was das ungefähr bedeutet.",
        ],
      },
      {
        heading: "Was Sie vor dem Unterschreiben prüfen sollten",
        paragraphs: [
          "Fragen Sie nach dem Brutto-/Nettolohn, Ferien, AHV/ALV/UVG/BVG, der fachlichen Begleitung und danach, wie die Restkostenfinanzierung der Gemeinde kommuniziert wird. Im Kanton Zürich gelten für Angehörigenpflege strengere finanzielle und qualitative Vorgaben – unter anderem die Pflicht, innert eines Jahres einen anerkannten Pflegehelferkurs (z. B. SRK) zu absolvieren.",
          "Lumina begleitet Sie bei Abklärung, Anstellung und Dokumentation. So bleibt die Pflege bei Ihnen zu Hause – und die Administration nicht allein auf Ihren Schultern.",
        ],
      },
    ],
  },
  {
    slug: "wer-gilt-als-pflegende-angehoerige",
    tag: "Orientierung",
    title: "Wer gilt als pflegende Angehörige?",
    text: "Ehepartner, Kinder, Eltern und enge Bezugspersonen: Entscheidend sind Situation und regelmässige Grundpflege.",
    read: "6 Min.",
    image: "/images/ratgeber/blog-10.png",
    imageAlt: "Gespräch zwischen pflegendem Angehörigen und älterem Mann",
    updated: "August 2026",
    takeaways: [
      "Nicht nur Ehepartner: Auch Kinder, Eltern oder enge Bezugspersonen können in Frage kommen.",
      "Massgeblich sind regelmässige Grundpflege und eine ärztlich/pflegerisch bestätigte Bedarfssituation.",
      "Volljährigkeit und eine längerfristige Pflegesituation sind in der Praxis zentrale Voraussetzungen.",
    ],
    ctaLabel: "Anspruch in 2 Minuten prüfen",
    ctaHref: "/anspruchscheck",
    sections: [
      {
        paragraphs: [
          "«Pflegende Angehörige» ist kein Marketingbegriff, sondern beschreibt Menschen, die regelmässig eine nahestehende Person mit gesundheitlichen Einschränkungen im Alltag unterstützen. Das Bundesamt für Statistik geht von mehreren Hunderttausend Personen in der Schweiz aus – viele davon im erwerbsfähigen Alter.",
          "Für eine Anstellung bei einer Spitex kommt es weniger auf den Stammbaum allein an, sondern auf die konkrete Pflegesituation: Wer leistet welche Hilfe, wie oft, und ist diese Hilfe Teil der verordneten Grundpflege?",
        ],
      },
      {
        heading: "Beziehungen, die häufig in Frage kommen",
        paragraphs: [
          "In der Praxis sind es vor allem Ehe- und Lebenspartner:innen, Töchter und Söhne, Schwiegerkinder, Eltern von erwachsenen Kindern mit Beeinträchtigung sowie engste Bezugspersonen im gemeinsamen Haushalt. Auch Grosseltern-Enkel-Konstellationen kommen vor.",
          "Wichtig: Eine emotionale Nähe allein reicht nicht. Es braucht eine nachvollziehbare, wiederkehrende Übernahme von Grundpflegeaufgaben – zum Beispiel Hilfe beim Waschen, Ankleiden, Essen oder Lagern.",
        ],
      },
      {
        heading: "Was typischerweise erfüllt sein muss",
        paragraphs: [
          "Die gepflegte Person braucht eine ärztliche Verordnung für spitalexterne Krankenpflege. Eine diplomierte Pflegefachperson klärt den Bedarf ab (häufig mit anerkannten Instrumenten) und hält im Pflegeplan fest, welche Massnahmen nötig sind.",
          "Sie selbst sind volljährig, können die Aufgaben zuverlässig übernehmen und lassen sich fachlich anleiten. Haushalt, Einkaufen oder «einfach da sein» sind wertvoll – aber nicht automatisch KVG-pflichtige Pflege.",
        ],
      },
      {
        heading: "Grenzfälle ehrlich einordnen",
        paragraphs: [
          "Wenn mehrere Familienmitglieder sich abwechseln, muss klar sein, wer angestellt wird und wer welche Stunden dokumentiert. Wohnt die gepflegte Person im Heim, gelten andere Regeln als zu Hause. Und wenn vor allem Behandlungspflege im Vordergrund steht, braucht es Fachpersonal – nicht nur Angehörige.",
          "Lumina klärt solche Situationen im Erstgespräch. Unser Ziel ist nicht, jeden Fall «hineinzurechnen», sondern Familien im Limmattal und Kanton Zürich ehrlich zu sagen, ob das Modell passt.",
        ],
      },
    ],
  },
  {
    slug: "hilflosenentschaedigung-verstaendlich",
    tag: "Finanzierung",
    title: "Hilflosenentschädigung verständlich erklärt",
    text: "Wann eine Anmeldung sinnvoll sein kann, welche Stufen es gibt und wo Sie eine verbindliche Prüfung erhalten.",
    read: "9 Min.",
    image: "/images/ratgeber/blog-11.png",
    imageAlt: "Pflegefachperson hält die Hand einer älteren Klientin",
    updated: "August 2026",
    takeaways: [
      "Die Hilflosenentschädigung hängt vom Grad der Hilflosigkeit ab – nicht vom Einkommen.",
      "AHV-Beträge 2026 (zu Hause): leicht CHF 252, mittelschwer CHF 630, schwer CHF 1'008 pro Monat.",
      "Sie kann zusätzlich zur Spitex-Finanzierung relevant sein und wird nicht «weggerechnet».",
    ],
    ctaLabel: "Gespräch zur Finanzierung vereinbaren",
    ctaHref: "/kontakt",
    sections: [
      {
        paragraphs: [
          "Neben Krankenkasse und Spitex gibt es in der Schweiz ein weiteres wichtiges Instrument: die Hilflosenentschädigung (HE) der AHV oder IV. Sie richtet sich an Menschen, die für alltägliche Verrichtungen dauernd auf die Hilfe Dritter angewiesen sind oder der persönlichen Überwachung bedürfen.",
          "Laut Informationsstelle AHV/IV ist die wirtschaftliche Lage dabei nicht massgebend – entscheidend sind die tatsächlichen Einschränkungen. Für viele Familien im Kanton Zürich ist die HE eine spürbare monatliche Entlastung, die unabhängig vom Spitex-Modell geprüft werden sollte.",
        ],
      },
      {
        heading: "Die drei Grade – und die Beträge 2026",
        paragraphs: [
          "Die AHV unterscheidet leichte, mittelschwere und schwere Hilflosigkeit. Gemäss Merkblatt 3.01 (Stand 1. Januar 2026) betragen die monatlichen Entschädigungen der AHV: leichter Grad CHF 252, mittlerer Grad CHF 630, schwerer Grad CHF 1'008.",
          "Anspruch besteht unter anderem, wenn eine Altersrente oder AHV-Ergänzungsleistungen bezogen werden, die Hilflosigkeit ununterbrochen mindestens sechs Monate gedauert hat und kein vorrangiger Anspruch aus Unfall- oder Militärversicherung besteht. Bereits bezogene IV-Hilflosenentschädigungen werden in der Regel mindestens im bisherigen Umfang weitergeführt.",
        ],
      },
      {
        heading: "Wie hängt das mit der Angehörigen-Spitex zusammen?",
        paragraphs: [
          "Wichtig für Familien: Die Hilflosenentschädigung ist nicht dasselbe wie der Lohn für pflegende Angehörige. Die HE geht an die hilflose Person (bzw. wird für sie ausgerichtet). Der Spitex-Lohn geht an die angestellte Pflegeperson für dokumentierte Grundpflege.",
          "Krankenkassen dürfen Spitex-Leistungen nicht einfach kürzen, nur weil parallel eine Hilflosenentschädigung fliesst. Dennoch lohnt sich eine gesamtheitliche Sicht: HE, Ergänzungsleistungen, Patientenbeteiligung und Spitex-Finanzierung greifen ineinander.",
        ],
      },
      {
        heading: "Wo Sie die Prüfung starten",
        paragraphs: [
          "Die Anmeldung läuft über die zuständige AHV- oder IV-Stelle bzw. die Ausgleichskasse. Ärztliche Berichte und eine klare Beschreibung des Alltags sind hilfreich. Spitex-Dokumentation kann die Hilfsbedürftigkeit nachvollziehbar machen – ersetzt aber keine behördliche Verfügung.",
          "Lumina gibt keine Rechtsberatung im engeren Sinn, unterstützt Familien aber dabei, die richtigen Fragen zu stellen und Unterlagen für Abklärungen vorzubereiten. Wenn Sie unsicher sind, ob eine HE-Anmeldung sinnvoll ist, sprechen Sie uns an – wir hören zuerst zu.",
        ],
      },
    ],
  },
  {
    slug: "koerperpflege-zu-hause",
    tag: "Pflegealltag",
    title: "Körperpflege zu Hause würdevoll gestalten",
    text: "Praktische Hinweise für mehr Sicherheit, Selbstbestimmung und Ruhe im täglichen Miteinander.",
    read: "7 Min.",
    image: "/images/ratgeber/blog-09.png",
    imageAlt: "Fürsorgliche Berührung bei der Pflege – Hände von jung und alt",
    updated: "August 2026",
    takeaways: [
      "Würde beginnt bei Tempo, Sprache und dem Recht, «Nein» zu sagen.",
      "Gute Vorbereitung (Raum, Hilfsmittel, Wärme) reduziert Stress für beide Seiten.",
      "Angehörige dürfen fachliche Anleitung annehmen – das ist Stärke, keine Schwäche.",
    ],
    ctaLabel: "Pflege zu Hause besprechen",
    ctaHref: "/kontakt",
    sections: [
      {
        paragraphs: [
          "Körperpflege ist intim. Für viele ältere Menschen im Limmattal ist sie der Moment, in dem Selbstbestimmung besonders spürbar – oder besonders verletzlich – wird. Ob Angehörige oder Spitex-Fachperson: Der Ton entscheidet mit darüber, ob Pflege als Hilfe oder als Übergriff erlebt wird.",
          "Gute Körperpflege zu Hause ist keine Show. Sie ist ruhig, vorbereitet und richtet sich nach dem, was die Person heute kann – nicht nach dem, was gestern noch ging.",
        ],
      },
      {
        heading: "Ablauf, der Würde schützt",
        paragraphs: [
          "Kündigen Sie jeden Schritt kurz an («Ich wasche jetzt den Rücken»). Decken Sie Körperteile ab, die gerade nicht gewaschen werden. Fragen Sie, was die Person selbst übernehmen möchte. Musik, vertraute Seife oder das eigene Badetuch können Sicherheit geben.",
          "Achten Sie auf Schamgefühle – gerade bei Eltern-Kind-Konstellationen. Manchmal hilft eine zweite Person gleicher Geschlechtsidentität oder die Aufteilung: Angehörige begleiten emotional, Fachperson übernimmt die intimsten Schritte.",
        ],
      },
      {
        heading: "Sicherheit ohne Klinik-Atmosphäre",
        paragraphs: [
          "Rutschfeste Matte, guter Halt an der Wand, angenehme Raumtemperatur, Handtücher in Reichweite und ein klarer Fluchtweg aus dem Bad verhindern Hektik. Bei Schwindel oder Sturzangst lieber Sitzwaschungen oder Teilwaschungen statt erzwungener Vollbad-Routine.",
          "Hautpflege, Beobachtung von Rötungen und ausreichend Zeit nach dem Waschen gehören dazu. Was Sie sehen, darf in der Pflegedokumentation stehen – das schützt die gepflegte Person und macht Veränderungen früh sichtbar.",
        ],
      },
      {
        heading: "Wenn Angehörige angestellt sind",
        paragraphs: [
          "Genau diese Grundpflegeleistungen sind es, die im Schweizer Spitex-Modell unter Fachaufsicht vergütet werden können. Lumina schult und begleitet – damit Technik und Haltung zusammenpassen. So bleibt Pflege persönlich, aber nicht allein gelassen.",
        ],
      },
    ],
  },
  {
    slug: "vorsorgeauftrag-und-patientenverfuegung",
    tag: "Vorsorge",
    title: "Vorsorgeauftrag und Patientenverfügung",
    text: "Zwei Dokumente, die Angehörige entlasten und den Willen der betroffenen Person sichtbar machen.",
    read: "9 Min.",
    image: "/images/family.jpg",
    imageAlt: "Familie im Gespräch über Vorsorge und Betreuung",
    updated: "August 2026",
    takeaways: [
      "Patientenverfügung regelt medizinische Wünsche; Vorsorgeauftrag die Vertretung im Alltag und Vermögen.",
      "Beide Dokumente entlasten Angehörige in Notfällen – und verhindern Fremdbestimmung.",
      "Handschriftlichkeit, Klarheit und regelmässige Updates sind entscheidend.",
    ],
    ctaLabel: "Familengespräch vorbereiten",
    ctaHref: "/kontakt",
    sections: [
      {
        paragraphs: [
          "Wenn jemand plötzlich urteilsunfähig wird, stehen Angehörige oft unter Zeitdruck: Spital, Spitex, Bank, Krankenkasse. Zwei Schweizer Instrumente schaffen hier Klarheit – die Patientenverfügung und der Vorsorgeauftrag. Viele Familien im Kanton Zürich schieben sie auf, bis es eng wird. Besser ist ein ruhiges Gespräch, solange alle bei Kräften sind.",
        ],
      },
      {
        heading: "Patientenverfügung: medizinischer Wille",
        paragraphs: [
          "In der Patientenverfügung hält eine urteilsfähige Person fest, welche medizinischen Massnahmen sie in bestimmten Situationen wünscht oder ablehnt – etwa Reanimation, künstliche Ernährung oder lebensverlängernde Therapien. Sie richtet sich an Ärztinnen, Ärzte und Behandlungsteams.",
          "Je konkreter die Formulierungen, desto hilfreicher im Ernstfall. Die Verfügung sollte auffindbar sein (Kopie bei Hausarzt, Angehörigen, allenfalls Hinterlegungshinweis im Portemonnaie). Regelmässig prüfen, ob sie noch dem aktuellen Willen entspricht.",
        ],
      },
      {
        heading: "Vorsorgeauftrag: Vertretung im Leben",
        paragraphs: [
          "Der Vorsorgeauftrag bestimmt, wer bei Urteilsunfähigkeit Personensorge, Vermögenssorge und/oder Rechtsverkehr übernimmt. Er ist besonders wertvoll, wenn mehrere Kinder vorhanden sind oder heikle Vermögensfragen drohen.",
          "Formvorschriften sind streng: In der Regel muss der Vorsorgeauftrag vollständig von Hand geschrieben, datiert und unterzeichnet sein – oder öffentlich beurkundet werden. Ein loses Tippschreiben reicht nicht. Im Kanton Zürich prüfen die Kindes- und Erwachsenenschutzbehörden (KESB) bei Bedarf die Einsetzung.",
        ],
      },
      {
        heading: "Was das mit Pflege zu Hause zu tun hat",
        paragraphs: [
          "Spitex, Angehörigenanstellung und Finanzierung laufen reibungsloser, wenn klar ist, wer entscheiden und unterschreiben darf. Konkurrenten im Markt nutzen Vorsorge-Themen oft als Lead-Magnet. Bei Lumina gehören sie zur ehrlichen Begleitung: Wir ersetzen keine Anwaltskanzlei, helfen aber Familien, die richtigen nächsten Schritte zu sehen – und die Pflegeorganisation nicht vom Papierchaos blockieren zu lassen.",
        ],
      },
    ],
  },
  {
    slug: "pflegen-und-arbeiten",
    tag: "Entlastung",
    title: "Pflegen und arbeiten: So kann beides gelingen",
    text: "Grenzen erkennen, Hilfe organisieren und die eigene Gesundheit nicht aus dem Blick verlieren.",
    read: "7 Min.",
    image: "/images/ratgeber/blog-13.png",
    imageAlt: "Angehörige und ältere Frau teilen einen Moment zu Hause",
    updated: "August 2026",
    takeaways: [
      "Doppelbelastung ist real – Entlastung ist kein Luxus, sondern Prävention.",
      "Ein Anstellungsmodell kann Erwerbsausfälle teilweise ausgleichen.",
      "Klare Zeiten, Hilfenetz und eigene Gesundheit gehören in jeden Pflegeplan.",
    ],
    ctaLabel: "Entlastungsmöglichkeiten prüfen",
    ctaHref: "/angehoerige",
    sections: [
      {
        paragraphs: [
          "Viele pflegende Angehörige im Limmattal jonglieren Job, Familie und Pflege. Studien und Praxisberichten zeigen: Ohne Struktur steigt das Risiko für Erschöpfung, Konflikte am Arbeitsplatz und eigene Gesundheitsprobleme. Gleichzeitig wollen die meisten nicht «abschieben», sondern Verantwortung teilen.",
        ],
      },
      {
        heading: "Signale ernst nehmen",
        paragraphs: [
          "Schlechter Schlaf, Reizbarkeit, sozialer Rückzug, häufige Krankmeldungen oder das Gefühl, nie genug zu tun – das sind Warnzeichen. Wer sie früh benennt, kann gegensteuern, bevor eine Krise entsteht.",
          "Sprechen Sie mit dem Arbeitgeber über Planbarkeit. In der Schweiz gibt es je nach Situation Möglichkeiten wie kurzfristige Absenzen, Urlaubsplanung oder Beratungsangebote. Parallel lohnt sich der Blick auf Spitex-Entlastungseinsätze und Tagesstrukturen.",
        ],
      },
      {
        heading: "Wie Geld und Zeit zusammenhängen",
        paragraphs: [
          "Wenn Angehörige ihr Pensum reduzieren, fehlen Lohnprozente und Vorsorgebeiträge. Genau hier setzt das Spitex-Anstellungsmodell an: Dokumentierte Grundpflege wird entlöhnt, Sozialversicherungen laufen mit. Das ersetzt nicht jede Erwerbsarbeit – aber es kann die Lücke verkleinern.",
          "Vergleichen Sie Angebote nicht nur nach dem höchsten Werbe-Stundenlohn (Marktbeispiele liegen oft um die mittlere 30er-Franken-Range). Fragen Sie nach Begleitung, Vertretung bei Ferien/Krankheit und danach, wie realistisch die Stundenkalkulation ist.",
        ],
      },
      {
        heading: "Ein realistischer Wochenrhythmus",
        paragraphs: [
          "Blocken Sie Pflegezeiten und Erholungszeiten bewusst. Organisieren Sie eine Vertretung, bevor Sie sie brauchen. Nutzen Sie hilfreiche Technik (Medikamentenrolle, Notruf, Kalender) ohne die menschliche Beziehung zu ersetzen.",
          "Lumina verbindet Anstellung, Fachbegleitung und – wo nötig – ergänzende Einsätze. Damit Pflegen und Leben nicht zum Dauerfeuer wird.",
        ],
      },
    ],
  },
  {
    slug: "private-oder-oeffentliche-spitex",
    tag: "Spitex",
    title: "Private oder öffentliche Spitex?",
    text: "Worauf Familien bei Verfügbarkeit, Bezugspersonen, Leistungen und Finanzierung achten sollten.",
    read: "6 Min.",
    image: "/images/care.jpg",
    imageAlt: "Ambulante Pflege zu Hause durch Spitex-Fachperson",
    updated: "August 2026",
    takeaways: [
      "Öffentliche und private Spitex arbeiten unter demselben KVG-Rahmen – Unterschiede liegen in Organisation und Fokus.",
      "Für Angehörigenanstellung braucht es klare Prozesse, Aufsicht und transparente Löhne.",
      "Passung zählt mehr als Label: Verfügbarkeit, Bezugsperson und Qualität der Abklärung.",
    ],
    ctaLabel: "Lumina Spitex kennenlernen",
    ctaHref: "/begleitung",
    sections: [
      {
        paragraphs: [
          "Familien googeln oft «Spitex Schlieren», «Spitex Limmattal» oder «private Spitex Zürich» – und landen bei sehr unterschiedlichen Anbietern. Öffentliche Organisationen (häufig gemeindenah, im Dachverband Spitex Schweiz organisiert) und private Anbieter (u. a. ASPS-Mitglieder) dürfen beide KVG-pflichtige Pflege erbringen, sofern die Bewilligung stimmt.",
        ],
      },
      {
        heading: "Was wirklich unterschiedlich ist",
        paragraphs: [
          "Öffentliche Spitex ist oft stark in der flächendeckenden Versorgung verankert und eng mit Gemeinden vernetzt. Private Spitex kann spezialisierte Modelle schneller aufbauen – etwa die Anstellung pflegender Angehöriger, engere Bezugspersonen-Konzepte oder ergänzende Begleitung für Alltag und Teilhabe.",
          "Beim Preis der KVG-Grundpflege gelten tarifliche Regeln; Unterschiede entstehen eher bei Verfügbarkeit, Wartezeiten, Kommunikationskultur und nicht-kassenpflichtigen Leistungen (Hauswirtschaft, Begleitung, Concierge).",
        ],
      },
      {
        heading: "Checkliste für Ihre Entscheidung",
        paragraphs: [
          "Fragen Sie: Wer kommt wann? Bleibt die Bezugsperson stabil? Wie läuft die Bedarfsabklärung? Wie transparent sind Lohn und Sozialversicherungen bei Angehörigenanstellung? Was passiert bei Ferien oder Krankheit der Pflegeperson? Wie wird mit Gemeinden und Krankenkassen kommuniziert?",
          "Lumina positioniert sich als private Spitex mit klarer Haltung: Grundpflege mit Licht und Wärme, faire Anerkennung für Angehörige, keine Schönfärberei bei Zahlen. ASPS-Mitgliedschaft und kantonale Bewilligung sind Qualitätsanker – nicht Selbstzweck.",
        ],
      },
    ],
  },
  {
    slug: "sturzpraevention-zu-hause",
    tag: "Sicherheit",
    title: "Sturzprävention: Kleine Änderungen, grosse Wirkung",
    text: "Ein kompakter Rundgang durch Wohnung, Alltag und Hilfsmittel für mehr Sicherheit zu Hause.",
    read: "5 Min.",
    image: "/images/hero.jpg",
    imageAlt: "Sicheres, helles Wohnumfeld für Pflege zu Hause",
    updated: "August 2026",
    takeaways: [
      "Die meisten Stürze passieren zu Hause – oft durch Kleinigkeiten.",
      "Licht, freier Boden und stabile Routinen bringen mehr als teure Gadgets.",
      "Spitex erkennt Risiken früh und kann Hilfsmittel sowie Training anstossen.",
    ],
    ctaLabel: "Sicherheitscheck anfragen",
    ctaHref: "/kontakt",
    sections: [
      {
        paragraphs: [
          "Ein Sturz kann Unabhängigkeit über Nacht verändern: Spital, Angst, weniger Bewegung – ein Teufelskreis. In Schweizer Haushalten sind Teppiche, schlechte Beleuchtung, nasse Badezimmer und eilige Nachtgänge klassische Risikofaktoren. Gute Nachricht: Viele Ursachen lassen sich ohne Umbau-Marathon entschärfen.",
        ],
      },
      {
        heading: "Der 15-Minuten-Wohnungscheck",
        paragraphs: [
          "Entfernen oder fixieren Sie lose Teppiche. Halten Sie Gehwege frei von Kabeln und Schuhen. Installieren Sie Nachtlichter zwischen Bett und Bad. Prüfen Sie rutschfeste Socken bzw. geeignete Hausschuhe. Im Bad: Haltegriffe nur fachgerecht montieren, Matten mit Saugnäpfen, Duschstuhl bei Bedarf.",
          "Medikamente, Blutdruck und Sehkraft gehören zur Prävention dazu. Schwindel nach dem Aufstehen? Langsamer aufstehen, Flüssigkeit beachten, ärztlich abklären lassen.",
        ],
      },
      {
        heading: "Bewegung statt Schonhaltung",
        paragraphs: [
          "Wer aus Angst weniger geht, verliert Kraft und Balance. Kurzübungen an der Küchenzeile, Physiotherapie oder begleitete Spaziergänge wirken präventiv. Spitex-Fachpersonen können im Alltag beobachten, wo Transfer und Mobilisation riskant werden – und Anpassungen vorschlagen.",
          "Für pflegende Angehörige gilt: Sicherheit geht vor Tempo. Lieber zwei ruhige Schritte mit gutem Stand als ein schneller «Hoppla»-Transfer.",
        ],
      },
    ],
  },
  {
    slug: "arbeitsvertrag-ferien-sozialversicherungen",
    tag: "Anstellung",
    title: "Arbeitsvertrag, Ferien und Sozialversicherungen",
    text: "Was zu einer richtigen Anstellung gehört und weshalb professionelle Begleitung so wichtig ist.",
    read: "8 Min.",
    image: "/images/team.jpg",
    imageAlt: "Professionelle Begleitung und Team von Lumina Spitex",
    updated: "August 2026",
    takeaways: [
      "Eine echte Anstellung umfasst Vertrag, Lohnabrechnung und Sozialversicherungen.",
      "Ferien, Krankheit und Vertretung müssen geregelt sein – sonst trägt die Familie das Risiko.",
      "Fachaufsicht ist rechtlich zentral für die Abrechnung von Angehörigenpflege.",
    ],
    ctaLabel: "Anstellungsmodell erklären lassen",
    ctaHref: "/angehoerige",
    sections: [
      {
        paragraphs: [
          "«Wir zahlen Ihnen einfach etwas aus» ist kein Schweizer Anstellungsmodell. Wenn Angehörige über die OKP finanzierte Grundpflege leisten, braucht es ein Arbeitsverhältnis mit einer zugelassenen Spitex: Rechte, Pflichten, Versicherungen – und eine nachvollziehbare Dokumentation.",
        ],
      },
      {
        heading: "Was im Vertrag stehen sollte",
        paragraphs: [
          "Pensum bzw. Stundenlogik, Bruttolohn, Ferienanspruch, Probezeit, Kündigungsfristen, Aufgabenbeschreibung (Grundpflege gemäss Pflegeplan), Schweigepflicht und Hinweise zur fachlichen Weisungsgebundenheit. Klären Sie, wie Rapportierung funktioniert und wer bei Unklarheiten entscheidet.",
          "Fragen Sie nach Musterlohnabrechnungen. Seriöse Anbieter zeigen Arbeitgeber- und Arbeitnehmerbeiträge – statt nur eine «Nettopauschale» zu versprechen.",
        ],
      },
      {
        heading: "Sozialversicherungen konkret",
        paragraphs: [
          "Zur richtigen Anstellung gehören in der Regel AHV/IV/EO, ALV (sofern beitragspflichtig), Unfallversicherung und – abhängig von Lohn und Alter – berufliche Vorsorge. Genau das unterscheidet das Modell von informeller Familienhilfe: Es baut Vorsorge auf, statt Lücken zu vertiefen.",
          "Im AHV-Alter sind Anstellungen oft weiterhin möglich, jedoch mit anderen beitragsrechtlichen Details. Lassen Sie sich den konkreten Fall erklären – pauschale Internetrechner ersetzen keine Anmeldung.",
        ],
      },
      {
        heading: "Warum Aufsicht keine Schikane ist",
        paragraphs: [
          "Das Bundesgericht hat Angehörigen-Grundpflege unter der Voraussetzung zugelassen, dass die Spitex fachlich überwacht und anleitet. Im Kanton Zürich kommen Ausbildungsfristen und engere Steuerung hinzu. Das schützt Klientinnen und Klienten – und schützt auch Sie als angestellte Pflegeperson.",
          "Lumina übernimmt Administration und Begleitung, damit Sie sich auf die Pflege konzentrieren können. Transparenz statt Kleingedrucktes: Das ist unser Massstab gegenüber lauteren Marktversprechen.",
        ],
      },
    ],
  },
  {
    slug: "entlastungsangebote-limmattal",
    tag: "Regional",
    title: "Entlastungsangebote im Limmattal",
    text: "Welche Angebote pflegende Familien ergänzend nutzen können und wie Lumina beim Koordinieren hilft.",
    read: "6 Min.",
    image: "/images/ratgeber/blog-11.png",
    imageAlt: "Persönliche Pflege und Beratung im häuslichen Umfeld",
    updated: "August 2026",
    takeaways: [
      "Limmattal-Familien brauchen lokale, erreichbare Lösungen – nicht nur nationale Hotlines.",
      "Spitex, Tagesstrukturen, Hilflosenentschädigung und Angehörigenanstellung können kombiniert werden.",
      "Eine feste Bezugsperson reduziert Koordinationschaos.",
    ],
    ctaLabel: "Standort Schlieren kontaktieren",
    ctaHref: "/kontakt",
    sections: [
      {
        paragraphs: [
          "Schlieren, Dietikon, Unterengstringen, Urdorf und die umliegenden Gemeinden: Im Limmattal leben viele Mehrgenerationen-Familien auf engem Raum – mit kurzen Wegen und hoher Belastung zugleich. Entlastung gelingt, wenn Angebote lokal und verständlich sind.",
        ],
      },
      {
        heading: "Bausteine, die sich ergänzen",
        paragraphs: [
          "KVG-Spitex für Grund- und Behandlungspflege, Anstellung pflegender Angehöriger für die alltägliche Grundpflege, private hauswirtschaftliche Unterstützung, Beratungsstellen für Angehörige, sowie sozialversicherungsrechtliche Leistungen wie Hilflosenentschädigung oder Ergänzungsleistungen.",
          "Nicht alles braucht es sofort. Oft reicht ein klarer Start: Abklärung zu Hause, realistische Stunden, eine Bezugsperson und ein Plan für die nächsten 30 Tage.",
        ],
      },
      {
        heading: "Warum regionale Nähe zählt",
        paragraphs: [
          "Wenn die Pflegefachperson Anfahrtswege kennt, Schulen und Hausärzte in der Region vernetzt sind und bei Fragen jemand innert nützlicher Frist zurückruft, sinkt der Stress spürbar. Nationale Plattformen können Reichweite haben – Vertrauen entsteht vor Ort.",
          "Lumina Spitex AG ist in Schlieren verankert (Rütistrasse 18) und auf das Limmattal sowie den Kanton Zürich ausgerichtet. Wir koordinieren, statt Familien mit zehn Telefonnummern allein zu lassen.",
        ],
      },
      {
        heading: "Nächster Schritt",
        paragraphs: [
          "Schildern Sie uns Ihre Situation – auch unvollständig. Wir sagen Ihnen transparent, was möglich ist, was nicht, und welche Entlastung zuerst den grössten Effekt hat. Wissen gibt Sicherheit. Nähe gibt Entlastung.",
        ],
      },
    ],
  },
];

export function getArticle(slug: string) {
  return articles.find((a) => a.slug === slug);
}

export function getArticleIndex(slug: string) {
  return articles.findIndex((a) => a.slug === slug);
}
