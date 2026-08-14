"use client";

import { useMemo, useState } from "react";

type LohnCheckQuizProps = {
  /** Inline auf Kampagnen-/Inhaltsseiten */
  embedded?: boolean;
  /** Lead-Quelle für /api/leads */
  source?: string;
  /** Anker für Deep-Links, z. B. #anspruch-pruefen */
  sectionId?: string;
  topBar?: React.ReactNode;
};

export function LohnCheckQuiz({
  embedded = false,
  source = "lohn-check",
  sectionId = "lohn-rechner",
  topBar,
}: LohnCheckQuizProps) {
  const [step, setStep] = useState(0);
  const [relation, setRelation] = useState("");
  const [who, setWho] = useState("");
  const [tasks, setTasks] = useState<string[]>([]);
  const [hours, setHours] = useState(2);
  const [canton, setCanton] = useState("");
  const [contact, setContact] = useState(false);
  const [leadName, setLeadName] = useState("");
  const [leadPhone, setLeadPhone] = useState("");
  const [leadEmail, setLeadEmail] = useState("");
  const eligible =
    tasks.some((t) => t !== "Haushalt & Gesellschaft") &&
    (canton === "Zürich" || canton === "Aargau");
  const wage = useMemo(() => Math.round(hours * 30.4 * 36), [hours]);
  const needsWeiter = step === 2 || step === 3 || step === 5;

  function goNext() {
    window.setTimeout(() => setStep((s) => Math.min(6, s + 1)), 160);
  }

  const screens = [
    <Choice
      key="s1"
      title="Welche Situation trifft auf Sie zu?"
      subtitle="Damit wir Sie auf den richtigen Weg führen."
      options={[
        "Ich pflege einen Menschen",
        "Ich werde gepflegt",
        "Ich möchte mich informieren",
      ]}
      value={relation}
      setValue={setRelation}
      onPick={() => goNext()}
    />,
    <Choice
      key="s2"
      title="Wen begleiten Sie?"
      subtitle="Mehrere Beziehungen können grundsätzlich in Frage kommen."
      options={[
        "Mutter oder Vater",
        "Partner:in",
        "Grosseltern",
        "Eigenes Kind",
        "Nahestehende Person",
      ]}
      value={who}
      setValue={setWho}
      onPick={() => goNext()}
    />,
    <MultiChoice
      key="s3"
      title="Wobei helfen Sie regelmässig?"
      subtitle="Wählen Sie alles, was zutrifft."
      options={[
        "Körperpflege",
        "Essen & Trinken",
        "Aufstehen & Bewegen",
        "An- & Auskleiden",
        "Haushalt & Gesellschaft",
      ]}
      value={tasks}
      setValue={setTasks}
    />,
    <div key="s4">
      <h2>Wie viel Zeit wenden Sie pro Tag auf?</h2>
      <p className="quiz-sub">
        Schieben Sie den Regler. Die Schätzung aktualisiert sich sofort.
      </p>
      <div className="big-number">
        {hours.toFixed(1)} <small>Stunden / Tag</small>
      </div>
      <input
        className="big-range"
        type="range"
        min="0.5"
        max="8"
        step="0.5"
        value={hours}
        onChange={(e) => setHours(+e.target.value)}
        aria-label="Pflegestunden pro Tag"
      />
      <div className="range-labels">
        <span>30 Min.</span>
        <span>8 Std.</span>
      </div>
      <div className="wage wage-live">
        <span>Erste Brutto-Orientierung / Monat</span>
        <b>CHF {wage.toLocaleString("de-CH")}</b>
        <small>bei CHF 36.–/Std. für anrechenbare Grundpflege</small>
      </div>
    </div>,
    <Choice
      key="s5"
      title="Wo wohnt die gepflegte Person?"
      subtitle="Lumina ist aktuell in Zürich und Aargau im Aufbau tätig."
      options={["Zürich", "Aargau", "Anderer Kanton"]}
      value={canton}
      setValue={setCanton}
      onPick={() => goNext()}
    />,
    <div key="s6" className="quiz-lead">
      <h2>Wohin dürfen wir Ihr Ergebnis senden?</h2>
      <p className="quiz-sub">
        Optional – Sie sehen die Schätzung auch direkt auf dem nächsten Schritt.
      </p>
      <div className="quiz-lead-form">
        <div className="quiz-lead-grid">
          <label className="quiz-field">
            <span>Vorname</span>
            <input
              value={leadName}
              onChange={(e) => setLeadName(e.target.value)}
              placeholder="z. B. Anna"
              autoComplete="given-name"
            />
          </label>
          <label className="quiz-field">
            <span>Telefon</span>
            <input
              type="tel"
              value={leadPhone}
              onChange={(e) => setLeadPhone(e.target.value)}
              placeholder="079 000 00 00"
              autoComplete="tel"
            />
          </label>
        </div>
        <label className="quiz-field">
          <span>E-Mail</span>
          <input
            type="email"
            value={leadEmail}
            onChange={(e) => setLeadEmail(e.target.value)}
            placeholder="name@beispiel.ch"
            autoComplete="email"
          />
        </label>
        <label className="quiz-consent">
          <input
            type="checkbox"
            checked={contact}
            onChange={(e) => setContact(e.target.checked)}
          />
          <span>
            Ich wünsche eine persönliche Rückmeldung und stimme der Bearbeitung
            gemäss{" "}
            <a href="/datenschutz" target="_blank" rel="noreferrer">
              Datenschutz
            </a>{" "}
            zu.
          </span>
        </label>
      </div>
    </div>,
    <div className="quiz-result" key="s7">
      <span className="result-kicker">Ihre unverbindliche Einschätzung</span>
      {eligible ? (
        <>
          <h2>Eine Anstellung könnte möglich sein.</h2>
          <div className="wage">
            <span>Orientierungswert brutto / Monat</span>
            <b>CHF {wage.toLocaleString("de-CH")}</b>
            <small>
              Beispiel mit CHF 36.–/Std. für anrechenbare Grundpflege
            </small>
          </div>
          <ul>
            <li>Arbeitsvertrag und monatliche Lohnabrechnung</li>
            <li>AHV und Unfallversicherung</li>
            <li>Fachliche Begleitung und Schulung</li>
            <li>Administration und Abrechnung durch Lumina</li>
          </ul>
          <a className="button gold" href="/kontakt">
            Persönliche Prüfung vereinbaren
          </a>
        </>
      ) : (
        <>
          <h2>Lassen Sie uns Ihre Situation persönlich ansehen.</h2>
          <p>
            Die gewählten Angaben reichen für eine positive digitale
            Einschätzung noch nicht aus. Es können trotzdem andere Leistungen
            oder Entlastungsangebote passen.
          </p>
          <a className="button gold" href="/kontakt">
            Kostenlos beraten lassen
          </a>
        </>
      )}
    </div>,
  ];

  async function next() {
    if (step === 5 && contact && (leadPhone || leadEmail)) {
      await fetch("/api/leads", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          source,
          name: leadName,
          contact: [leadPhone, leadEmail].filter(Boolean).join(" · "),
          topic: "Anstellung als pflegende Angehörige",
          details: {
            relation,
            who,
            tasks,
            hours,
            canton,
            estimatedMonthlyGross: wage,
          },
          consent: true,
        }),
      });
    }
    if (step < 6) setStep(step + 1);
  }

  const inner = (
    <>
      {!embedded && topBar}
      <div className="quiz-progress">
        <span style={{ width: `${((step + 1) / 7) * 100}%` }} />
        <small>Schritt {step + 1} von 7</small>
      </div>
      <div className="quiz-card">
        {screens[step]}
        {step < 6 ? (
          <div className="quiz-nav">
            <button
              type="button"
              onClick={() => setStep(Math.max(0, step - 1))}
              disabled={step === 0}
            >
              Zurück
            </button>
            {needsWeiter ? (
              <button type="button" className="button" onClick={next}>
                Weiter
              </button>
            ) : (
              <span className="quiz-nav-hint">Antwort antippen – es geht automatisch weiter</span>
            )}
          </div>
        ) : (
          <div className="quiz-nav quiz-nav-end">
            <a
              className="text-link"
              href={embedded ? "#kontakt-kampagne" : "/"}
            >
              {embedded ? "Rückruf anfordern →" : "Zur Website →"}
            </a>
          </div>
        )}
      </div>
      <p className="quiz-disclaimer">
        Automatisierte, unverbindliche Schätzung auf Basis eines
        Beispiel-Stundenlohns · ersetzt keine Bedarfsabklärung oder
        Rechtsberatung.
      </p>
    </>
  );

  if (embedded) {
    return (
      <section
        className="claim-inline-quiz"
        id={sectionId}
        aria-labelledby={`${sectionId}-title`}
      >
        <div className="wrap">
          <div className="section-head left claim-inline-head">
            <span className="eyebrow">Lohnrechner</span>
            <h2 id={`${sectionId}-title`}>Was könnte Ihre Pflege wert sein?</h2>
            <p>
              Kurze Angaben – erste Brutto-Orientierung. Unverbindlich, ohne
              Verpflichtung.
            </p>
          </div>
          <div className="quiz-embed navy">
            <div className="quiz-shell">{inner}</div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="quiz-shell">{inner}</section>
  );
}

function Choice({
  title,
  subtitle,
  options,
  value,
  setValue,
  onPick,
}: {
  title: string;
  subtitle: string;
  options: string[];
  value: string;
  setValue: (v: string) => void;
  onPick?: () => void;
}) {
  return (
    <div>
      <h2>{title}</h2>
      <p className="quiz-sub">{subtitle}</p>
      <div className="choices">
        {options.map((o) => (
          <button
            type="button"
            className={value === o ? "selected" : ""}
            onClick={() => {
              setValue(o);
              onPick?.();
            }}
            key={o}
          >
            <span>{o}</span>
            <span aria-hidden="true">→</span>
          </button>
        ))}
      </div>
    </div>
  );
}

function MultiChoice({
  title,
  subtitle,
  options,
  value,
  setValue,
}: {
  title: string;
  subtitle: string;
  options: string[];
  value: string[];
  setValue: (v: string[]) => void;
}) {
  return (
    <div>
      <h2>{title}</h2>
      <p className="quiz-sub">{subtitle}</p>
      <div className="choices multi">
        {options.map((o) => (
          <button
            type="button"
            className={value.includes(o) ? "selected" : ""}
            onClick={() =>
              setValue(
                value.includes(o)
                  ? value.filter((x) => x !== o)
                  : [...value, o],
              )
            }
            key={o}
          >
            <span>{o}</span>
            <span aria-hidden="true">{value.includes(o) ? "✓" : "+"}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
