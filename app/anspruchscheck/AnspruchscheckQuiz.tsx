"use client";

import { useState, type ReactNode } from "react";

const QUESTIONS = [
  {
    q: "Wen betreuen oder pflegen Sie?",
    s: "Damit wir einschätzen, welche Unterstützung in Frage kommt.",
    o: [
      "Mutter oder Vater",
      "Partnerin oder Partner",
      "Anderes Familienmitglied",
      "Nahestehende Person",
    ],
  },
  {
    q: "Wie viel Hilfe braucht die Person im Alltag?",
    s: "Denken Sie an Ankleiden, Essen, Körperpflege, Bewegung und Toilette.",
    o: [
      "Bei fast allem täglich",
      "Bei mehreren Dingen regelmässig",
      "Bei einzelnen Dingen",
      "Noch weitgehend selbstständig",
    ],
  },
  {
    q: "Wie lange besteht der Hilfebedarf?",
    s: "Für einzelne Sozialleistungen gelten Warte- oder Mindestfristen.",
    o: [
      "Rund ein Jahr oder länger",
      "Seit einigen Monaten",
      "Erst seit Kurzem",
      "Nicht sicher",
    ],
  },
  {
    q: "In welcher Region wohnt die Person?",
    s: "Lumina ist in den Kantonen Zürich und Aargau für Sie da.",
    o: [
      "Kanton Zürich",
      "Kanton Aargau",
      "Limmattal / Grenzregion",
      "Andere Region",
    ],
  },
] as const;

type AnspruchscheckQuizProps = {
  /** Inline auf einer Inhaltsseite – ohne Fullpage-Chrome */
  embedded?: boolean;
  /** Nur im Fullpage-Modus: Logo/Schliessen oben */
  topBar?: ReactNode;
};

export function AnspruchscheckQuiz({
  embedded = false,
  topBar,
}: AnspruchscheckQuizProps) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);

  const shell = (
    <>
      {!embedded && topBar}
      {step >= QUESTIONS.length ? (
        <>
          <div className="quiz-card result-check">
            <span className="success-icon">✓</span>
            <span className="result-kicker">Ihre erste Orientierung</span>
            <h2>Mehrere Ansprüche könnten in Frage kommen.</h2>
            <div className="claim-grid">
              <div>
                <span className="claim-title">Hilflosenentschädigung</span>
                <span>Persönlich abklären</span>
              </div>
              <div>
                <span className="claim-title">Betreuungsgutschrift</span>
                <span>Situation prüfen</span>
              </div>
              <div>
                <span className="claim-title">Anstellung bei Lumina</span>
                <span>Wahrscheinlich relevant</span>
              </div>
            </div>
            <p>
              Eine Fachperson kann Ihre Angaben kostenlos einordnen und die
              nächsten Schritte mit Ihnen besprechen.
            </p>
            <a className="button" href="/kontakt">
              Persönliche Prüfung anfragen
            </a>
            <button
              type="button"
              className="restart"
              onClick={() => {
                setStep(0);
                setAnswers([]);
              }}
            >
              Check wiederholen
            </button>
            {!embedded ? (
              <a className="restart" href="/">
                Zur Website
              </a>
            ) : (
              <a className="restart" href="/kontakt">
                Lieber Rückruf anfordern
              </a>
            )}
          </div>
          <p className="quiz-disclaimer">
            Unverbindliche Orientierung, keine Rechts- oder Sozialberatung. Die
            verbindliche Prüfung erfolgt durch die zuständige Stelle oder
            Fachperson.
          </p>
        </>
      ) : (
        <>
          <div className="quiz-progress">
            <span style={{ width: `${((step + 1) / QUESTIONS.length) * 100}%` }} />
            <small>
              Frage {step + 1} von {QUESTIONS.length}
            </small>
          </div>
          <div className="quiz-card">
            <h2>{QUESTIONS[step].q}</h2>
            <p className="quiz-sub">{QUESTIONS[step].s}</p>
            <div className="choices">
              {QUESTIONS[step].o.map((o) => (
                <button
                  type="button"
                  onClick={() => {
                    setAnswers([...answers, o]);
                    setStep(step + 1);
                  }}
                  key={o}
                >
                  <span>{o}</span>
                  <span aria-hidden="true">→</span>
                </button>
              ))}
            </div>
            {step > 0 ? (
              <button
                type="button"
                className="restart"
                onClick={() => {
                  setStep(step - 1);
                  setAnswers(answers.slice(0, -1));
                }}
              >
                ← Zurück
              </button>
            ) : null}
          </div>
        </>
      )}
    </>
  );

  if (embedded) {
    return (
      <section
        className="claim-inline-quiz"
        id="anspruch-pruefen"
        aria-labelledby="anspruch-pruefen-title"
      >
        <div className="wrap">
          <div className="section-head left claim-inline-head">
            <span className="eyebrow">Anspruch prüfen</span>
            <h2 id="anspruch-pruefen-title">
              Passt das zu Ihrer Situation?
            </h2>
            <p>
              Vier kurze Fragen – Sie sehen sofort, worum es geht. Unverbindlich,
              ohne Anmeldung.
            </p>
          </div>
          <div className="quiz-embed green">
            <div className="quiz-shell">{shell}</div>
          </div>
        </div>
      </section>
    );
  }

  return <section className="quiz-shell">{shell}</section>;
}
