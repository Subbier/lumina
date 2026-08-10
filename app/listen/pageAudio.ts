export type AudioView =
  | "home"
  | "spitex"
  | "services"
  | "begleitung"
  | "angehoerige"
  | "team"
  | "ueber-uns"
  | "tarife"
  | "kontakt"
  | "ratgeber"
  | "impressum"
  | "datenschutz";

export type PageAudio = {
  label: string;
  /** Pre-recorded spoken audio when available */
  src?: string;
  /** Fallback spoken script for speechSynthesis */
  text: string;
};

function speakSpitex(text: string) {
  return text
    .replace(/Spitex-/g, "Spietex-")
    .replace(/Spitex/g, "Spietex")
    .replace(/SPITEX/g, "Spietex");
}

export const pageAudioByView: Partial<Record<AudioView, PageAudio>> = {
  home: {
    label: "Startseite",
    src: "/audio/home.mp3?v=dock1",
    text: speakSpitex(
      "Hallo und willkommen bei Lumina Spitex. Wir sind in Zürich und Aargau für Sie da – mit professioneller Pflege zu Hause, Begleitung im Alltag und einem klaren Modell für pflegende Angehörige. Wenn Sie wissen möchten, was zu Ihrer Situation passt, starten Sie mit einer kostenlosen Erstberatung. Oder prüfen Sie in wenigen Minuten Ihren möglichen Lohnanspruch.",
    ),
  },
  spitex: {
    label: "Spitex",
    src: "/audio/spitex.mp3?v=spoken2",
    text: speakSpitex(
      "Hallo und willkommen bei Lumina Spitex. Wir kommen zu Ihnen nach Hause – mit professioneller Pflege, die zu Ihrem Alltag passt. Zuerst die Abklärung, dann Grund- und Behandlungspflege. Die Leistungen rechnen wir direkt mit der Krankenkasse ab. Fordern Sie eine kostenlose Erstberatung an – wir melden uns persönlich.",
    ),
  },
  angehoerige: {
    label: "Pflegende Angehörige",
    src: "/audio/angehoerige.mp3?v=spoken2",
    text: speakSpitex(
      "Hallo und willkommen bei Lumina Spitex – zum Thema pflegende Angehörige. Sie müssen das nicht allein tragen. Bei Lumina können Sie angestellt werden – mit Lohn, Sozialversicherung und fachlicher Begleitung. Prüfen Sie jetzt Ihren möglichen Lohnanspruch – in rund zwei Minuten, unverbindlich und klar.",
    ),
  },
  begleitung: {
    label: "Begleitung",
    src: "/audio/begleitung.mp3?v=spoken2",
    text: speakSpitex(
      "Hallo und willkommen bei der Begleitung von Lumina Spitex. Wir helfen bei Erledigungen, begleiten zu Terminen und halten Teilhabe lebendig. Fordern Sie weitere Informationen an – wir melden uns mit einem konkreten Vorschlag.",
    ),
  },
  services: {
    label: "Begleitung",
    src: "/audio/begleitung.mp3?v=spoken2",
    text: speakSpitex(
      "Hallo und willkommen bei der Begleitung von Lumina Spitex. Wir helfen bei Erledigungen, begleiten zu Terminen und halten Teilhabe lebendig.",
    ),
  },
  team: {
    label: "Team & Jobs",
    src: "/audio/team.mp3?v=dock1",
    text: speakSpitex(
      "Hallo und willkommen beim Team von Lumina Spitex. Wir suchen Pflegefachpersonen EFZ und diplomierte Fachpersonen in Zürich und Aargau. Faire Anstellung, klare Prozesse und echte Beziehungspflege. Bewerben Sie sich – wir freuen uns auf das Gespräch.",
    ),
  },
  tarife: {
    label: "Tarife",
    src: "/audio/tarife.mp3?v=dock1",
    text: speakSpitex(
      "Hallo und willkommen zu den Tarifen von Lumina Spitex. Hier sehen Sie die Ansätze für kassenpflichtige Leistungen und Begleitung. Wenn etwas unklar ist, sprechen Sie mit uns – wir erklären Finanzierung und Rechnung ruhig und verständlich.",
    ),
  },
  "ueber-uns": {
    label: "Über Lumina",
    src: "/audio/ueber-uns.mp3?v=dock1",
    text: speakSpitex(
      "Hallo und willkommen bei Lumina Spitex. Lumina kommt von Lumen – dem Licht. Für uns bedeutet das: Klarheit, Wärme und professionelle Pflege zu Hause. Lernen Sie uns kennen – oder melden Sie sich für ein persönliches Gespräch.",
    ),
  },
  kontakt: {
    label: "Kontakt",
    src: "/audio/kontakt.mp3?v=dock1",
    text: speakSpitex(
      "Hallo – schön, dass Sie Kontakt aufnehmen. Schreiben Sie uns über das Formular oder rufen Sie an unter null vier drei, vier drei drei, acht acht, null null. Wir melden uns persönlich und unverbindlich.",
    ),
  },
  ratgeber: {
    label: "Ratgeber",
    src: "/audio/ratgeber.mp3?v=dock1",
    text: speakSpitex(
      "Willkommen im Lumina-Ratgeber. Hier finden Sie verständliche Beiträge zu Pflege, Angehörigenlohn und Entlastung. Lesen Sie in Ruhe – oder starten Sie direkt den Anspruch-Check.",
    ),
  },
  impressum: {
    label: "Impressum",
    text: speakSpitex(
      "Dies ist das Impressum der Lumina Spitex AG in Schlieren. Bei Fragen erreichen Sie uns über die Kontaktseite.",
    ),
  },
  datenschutz: {
    label: "Datenschutz",
    text: speakSpitex(
      "Hier finden Sie die Datenschutzerklärung der Lumina Spitex AG. Bei Fragen melden Sie sich gerne über die Kontaktseite.",
    ),
  },
};

export function getPageAudio(view: AudioView): PageAudio | null {
  return pageAudioByView[view] ?? null;
}
