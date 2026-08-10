"use client";

import {
  FormEvent,
  ReactNode,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { articles, getArticle, type Article } from "./ratgeber/articles";
import { ServiceSegmentPage, PartnersStrip } from "./dienstleistungen/ServiceSegmentPage";
import { tarifeKlv, tarifeUvg } from "./dienstleistungen/content";

export type View =
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
  | "lohn-check"
  | "anspruchscheck"
  | "impressum"
  | "datenschutz";

function Icon({ children }: { children: ReactNode }) {
  return (
    <span className="icon" aria-hidden="true">
      {children}
    </span>
  );
}

function MoreRead({
  summary,
  children,
  label = "Mehr lesen",
}: {
  summary: ReactNode;
  children: ReactNode;
  label?: string;
}) {
  return (
    <div className="more-read">
      <div className="more-read-summary">{summary}</div>
      <details className="more-read-details">
        <summary>{label}</summary>
        <div className="more-read-body">{children}</div>
      </details>
    </div>
  );
}

function Header() {
  const [open, setOpen] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(false);

  return (
    <>
      <div className="utility">
        <div className="wrap utility-inner">
          <span>Vom Kanton bewilligt · Krankenkassen anerkannt</span>
          <a href="tel:+41434338800">043 433 88 00</a>
        </div>
      </div>
      <header className="header">
        <div className="wrap nav-wrap">
          <a className="brand" href="/" aria-label="Lumina Spitex Startseite">
            <span className="brand-mark">L</span>
            <span>
              <b>Lumina</b>
              <small>Spitex</small>
            </span>
          </a>
          <button
            className="menu-btn"
            onClick={() => setOpen(!open)}
            aria-expanded={open}
            aria-label="Navigation öffnen"
          >
            {open ? "Schliessen" : "Menü"}
          </button>
          <nav
            className={open ? "nav open" : "nav"}
            aria-label="Hauptnavigation"
          >
            <a href="/" onClick={() => setOpen(false)}>
              Home
            </a>
            <a href="/spitex" onClick={() => setOpen(false)}>
              Spitex
            </a>
            <a href="/angehoerige" onClick={() => setOpen(false)}>
              Pflegende Angehörige
            </a>
            <a href="/begleitung" onClick={() => setOpen(false)}>
              Begleitung
            </a>

            <div
              className={`nav-dropdown ${aboutOpen ? "open" : ""}`}
              onMouseEnter={() => setAboutOpen(true)}
              onMouseLeave={() => setAboutOpen(false)}
            >
              <button
                type="button"
                className="nav-dropdown-trigger"
                aria-expanded={aboutOpen}
                aria-haspopup="true"
                onClick={() => setAboutOpen((v) => !v)}
              >
                Über uns
              </button>
              <div className="nav-dropdown-panel" role="menu">
                <div className="nav-dropdown-panel-inner">
                  <a
                    href="/team"
                    role="menuitem"
                    onClick={() => setOpen(false)}
                  >
                    Team
                  </a>
                  <a
                    href="/ratgeber"
                    role="menuitem"
                    onClick={() => setOpen(false)}
                  >
                    Ratgeber
                  </a>
                  <a
                    href="/tarife"
                    role="menuitem"
                    onClick={() => setOpen(false)}
                  >
                    Tarife
                  </a>
                  <a
                    href="/ueber-uns"
                    role="menuitem"
                    onClick={() => setOpen(false)}
                  >
                    Über Lumina
                  </a>
                </div>
              </div>
            </div>

            <a href="/kontakt" onClick={() => setOpen(false)}>
              Kontakt
            </a>
          </nav>
        </div>
      </header>
    </>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div className="wrap footer-grid">
        <div>
          <a className="brand brand-light" href="/">
            <span className="brand-mark">L</span>
            <span>
              <b>Lumina</b>
              <small>Spitex</small>
            </span>
          </a>
          <p>
            Persönliche Spitex-Pflege zu Hause – und wo Angehörige pflegen:
            Anstellung, enge Begleitung und Qualifikation innert zwölf Monaten.
          </p>
          <p className="footer-contact">
            Rütistrasse 18, 8952 Schlieren
            <br />
            <a href="tel:+41434338800">043 433 88 00</a> ·{" "}
            <a href="mailto:info@lumina-spitex.ch">info@lumina-spitex.ch</a>
          </p>
        </div>
        <div>
          <h3>Dienstleistungen</h3>
          <a href="/spitex">Spitex</a>
          <a href="/angehoerige">Pflegende Angehörige</a>
          <a href="/begleitung">Begleitung</a>
        </div>
        <div>
          <h3>Über uns</h3>
          <a href="/team">Team</a>
          <a href="/ratgeber">Ratgeber</a>
          <a href="/tarife">Tarife</a>
          <a href="/ueber-uns">Über Lumina</a>
          <a href="/kontakt">Kontakt</a>
        </div>
        <div>
          <h3>Für Sie da</h3>
          <p>Mo–Fr, 08:00–17:00 Uhr</p>
          <a className="button gold" href="/anspruchscheck">
            Anspruch prüfen
          </a>
        </div>
      </div>
      <div className="wrap legal">
        <span>
          © 2026 Lumina Spitex AG · Website & Inhalte:{" "}
          <a href="https://www.agenticit.ch" target="_blank" rel="noreferrer">
            AgenticIT
          </a>
        </span>
        <span>
          <a href="/impressum">Impressum</a>
          <a href="/datenschutz">Datenschutz</a>
        </span>
      </div>
    </footer>
  );
}

function TrustStrip() {
  return (
    <div className="trust-strip">
      <span>✓ Krankenkassen anerkannt</span>
      <span>✓ Feste Bezugspersonen</span>
      <span>✓ Direkte Abrechnung</span>
      <span>✓ Mitglied ASPS</span>
    </div>
  );
}

function CTA({
  title = "Lassen Sie uns zuerst zuhören.",
  text = "Ein kurzes Gespräch schafft Klarheit – kostenlos, persönlich und ohne Verpflichtung.",
}) {
  return (
    <section className="cta wrap">
      <div>
        <span className="eyebrow light">Persönlich für Sie da</span>
        <h2>{title}</h2>
        <p>{text}</p>
      </div>
      <div className="cta-actions">
        <a className="button gold" href="/kontakt">
          Gespräch vereinbaren
        </a>
        <a className="text-link light" href="tel:+41434338800">
          043 433 88 00 →
        </a>
      </div>
    </section>
  );
}

function Home() {
  return (
    <main>
      {/* AIDA – Attention */}
      <section className="hero wrap mobile-lean">
        <div className="hero-copy">
          <span className="eyebrow">Lumina Spitex · Zürich & Aargau</span>
          <h1>
            Professionelle Pflege
            <br />
            <em>zu Hause.</em>
          </h1>
          <p className="lead">
            Abklärung, Grund- und Behandlungspflege – persönlich begleitet, mit
            fester Bezugsperson und Abrechnung über die Krankenkasse. So bleibt
            Selbstbestimmung dort, wo Sie zu Hause sind.
          </p>
          <div className="actions">
            <a className="button" href="/spitex">
              Spitex-Leistungen
            </a>
            <a className="text-link" href="/kontakt">
              Kostenlose Erstberatung →
            </a>
          </div>
          <TrustStrip />
        </div>
        <div className="hero-visual">
          <img
            src="/images/spitex-care-2.png"
            alt="Spitex-Pflegefachperson bei der Versorgung einer Klientin zu Hause"
          />
        </div>
      </section>

      {/* AIDA – Interest: 3 Kernangebote */}
      <section className="path-section" id="aida-angebote">
        <div className="wrap">
          <div className="section-head">
            <span className="eyebrow">Unsere Dienstleistungen</span>
            <h2>Spitex im Zentrum – ergänzt um Angehörige und Begleitung.</h2>
          </div>
          <div className="paths aida-paths">
            <a href="/spitex" className="path-card important">
              <Icon>01</Icon>
              <span>Spitex-Dienstleistungen</span>
              <h3>Pflege, die die Krankenkasse mitträgt</h3>
              <p>
                Abklärung, Grund- und Behandlungspflege – ärztlich verordnet und
                professionell zu Hause.
              </p>
              <b>Spitex ansehen →</b>
            </a>
            <a href="/angehoerige" className="path-card">
              <Icon>02</Icon>
              <span>Pflegende Angehörige</span>
              <h3>Pflegen – mit Rückhalt und Qualifikation</h3>
              <p>
                Anstellung, enge Fachbegleitung und Ausbildung innert zwölf
                Monaten – damit Nähe und Sicherheit zusammenpassen.
              </p>
              <b>Mehr erfahren →</b>
            </a>
            <a href="/begleitung" className="path-card premium">
              <Icon>03</Icon>
              <span>Begleitung</span>
              <h3>Erledigungen, Termine und Teilhabe</h3>
              <p>
                Unterstützung über die Grundpflege hinaus – für ein angenehmes,
                selbstbestimmtes Leben im Alltag.
              </p>
              <b>Begleitung entdecken →</b>
            </a>
          </div>
          <a className="paths-cta" href="/lohn-check">
            <span className="paths-cta-title">Lohn für pflegende Angehörige</span>
            <span className="paths-cta-action">Jetzt Anspruch prüfen →</span>
          </a>
        </div>
      </section>

      {/* AIDA – Desire: Vertiefung */}
      <section className="wrap aida-block">
        <div className="aida-copy">
          <span className="eyebrow">01 · Spitex</span>
          <h2>Professionelle Pflege zu Hause.</h2>
          <p className="aida-lead">
            Wie bei anerkannten Spitex-Organisationen in der Schweiz starten wir
            mit einer Bedarfsabklärung und begleiten Sie mit festen
            Bezugspersonen – wirksam, zweckmässig und wirtschaftlich.
          </p>
          <ul className="aida-points">
            <li>Bedarfsabklärung mit fester Bezugsperson</li>
            <li>Grund- und Behandlungspflege zu Hause</li>
            <li>Abrechnung über die Krankenkasse (KVG)</li>
          </ul>
          <a className="button" href="/spitex">
            Alle Spitex-Leistungen
          </a>
        </div>
        <img
          className="aida-image"
          src="/images/home-spitex.png"
          alt="Diplomierte Pflegefachperson bei der Behandlungspflege zu Hause"
        />
      </section>

      <section className="wrap aida-block reverse">
        <div className="aida-copy">
          <span className="eyebrow">02 · Pflegende Angehörige</span>
          <h2>Vertraute Pflege – professionell getragen.</h2>
          <p className="aida-lead">
            Wer Angehörige pflegt, verdient mehr als stille Anerkennung: eine
            Anstellung, laufende Fachbegleitung und eine klare Qualifikation
            innert zwölf Monaten.
          </p>
          <ul className="aida-points">
            <li>Anstellung mit Lohn und Sozialversicherung</li>
            <li>Enge Begleitung durch diplomierte Fachpersonen</li>
            <li>Anerkannte Qualifikation innert zwölf Monaten</li>
          </ul>
          <div className="actions">
            <a className="button" href="/angehoerige">
              Modell entdecken
            </a>
            <a className="text-link" href="/kontakt">
              Beratung anfragen →
            </a>
          </div>
        </div>
        <img
          className="aida-image"
          src="/images/home-family.png"
          alt="Tochter unterstützt ihre Mutter zu Hause – familiäre Angehörigenpflege"
        />
      </section>

      <section className="wrap aida-block">
        <div className="aida-copy">
          <span className="eyebrow">03 · Begleitung</span>
          <h2>Wenn Alltag wieder angenehm werden soll.</h2>
          <p className="aida-lead">
            Begleitung geht über die Grundpflege hinaus: Erledigungen, Termine
            und Teilhabe am sozialen Leben – damit Selbstbestimmung spürbar
            bleibt.
          </p>
          <ul className="aida-points">
            <li>Unterstützung bei Erledigungen und Alltag</li>
            <li>Sichere Begleitung zu Terminen</li>
            <li>Soziale Teilhabe – auf Ihren Rhythmus abgestimmt</li>
          </ul>
          <a className="button" href="/begleitung">
            Begleitung ansehen
          </a>
        </div>
        <img
          className="aida-image"
          src="/images/home-services.png"
          alt="Begleitung einer älteren Dame im Freien für mehr Teilhabe"
        />
      </section>

      {/* AIDA – Action + Recruiting */}
      <section className="wrap relation-banner recruit-banner">
        <div>
          <span className="eyebrow light">Team · Wir suchen Verstärkung</span>
          <h2>
            Lumina sucht
            <br />
            Pflegefachkräfte.
          </h2>
          <MoreRead
            summary={
              <p>
                Lumina sucht Verstärkung – insbesondere Pflegefachfrauen und
                Pflegefachmänner EFZ sowie diplomierte Fachpersonen.
              </p>
            }
          >
            <p>
              Wir suchen Pflegefachpersonen EFZ, diplomierte Pflegefachpersonen
              (HF/FH) und Fachpersonen Gesundheit, die Verantwortung übernehmen,
              Familien anleiten und Qualität sichern. Faire Anstellung, klare
              Prozesse und ein Team mit Haltung.
            </p>
          </MoreRead>
          <div className="actions">
            <a className="button gold" href="/team">
              Offene Rollen ansehen
            </a>
            <a className="button ghost-light" href="/kontakt">
              Bewerbung / Gespräch
            </a>
          </div>
        </div>
        <img
          src="/images/home-team.png"
          alt="Pflegefachpersonen von Lumina Spitex – wir suchen Verstärkung"
        />
      </section>

      <section className="numbers">
        <div className="wrap numbers-grid">
          <div>
            <b>EFZ</b>
            <span>Pflegefachpersonen gesucht</span>
          </div>
          <div>
            <b>KVG</b>
            <span>Krankenkassen anerkannt</span>
          </div>
          <div>
            <b>1:1</b>
            <span>Feste Ansprechperson</span>
          </div>
          <div>
            <b>ZH</b>
            <span>Regional in ZH & AG</span>
          </div>
        </div>
      </section>

      <PartnersStrip />
      <BlogPreview />
      <CTA />
    </main>
  );
}

function Spitex() {
  return <ServiceSegmentPage id="spitex" />;
}

function Begleitung() {
  return <ServiceSegmentPage id="begleitung" />;
}

function Angehörige() {
  return <ServiceSegmentPage id="angehoerige" />;
}

function Team() {
  return (
    <main>
      <section className="subhero clean">
        <div className="wrap subhero-grid">
          <div>
            <span className="eyebrow">Arbeiten bei Lumina</span>
            <h1>
              Pflege braucht Können.
              <br />
              <em>Und Menschen mit Herz.</em>
            </h1>
            <p className="lead">
              Wir suchen Teammitglieder, die Verantwortung übernehmen,
              Beziehungen aufbauen und mit uns eine besondere Spitex gestalten
              wollen.
            </p>
            <a className="button" href="#jobs">
              Offene Rollen ansehen
            </a>
          </div>
          <img
            src="/images/home-team.png"
            alt="Lumina sucht Pflegefachkräfte – Team mit Haltung"
          />
        </div>
      </section>
      <section className="wrap intro">
        <span className="eyebrow">Wir suchen Verstärkung</span>
        <h2>Werden Sie Teil von Lumina.</h2>
        <MoreRead
          summary={
            <p className="lead small-lead">
              Lumina sucht Pflegefachfrauen und Pflegefachmänner EFZ sowie
              diplomierte Fachpersonen in den Kantonen Zürich und Aargau.
            </p>
          }
        >
          <p>
            Sie begleiten Klientinnen und Familien mit Fachlichkeit und Zeit,
            leiten Angehörige an und sichern Qualität in Spitex und
            Angehörigenpflege. Faire Anstellung, klare Prozesse und ein Team,
            das Beziehungspflege ernst nimmt.
          </p>
        </MoreRead>
      </section>
      <section className="wrap benefits">
        <article>
          <Icon>♡</Icon>
          <h3>Mehr Zeit für Menschen</h3>
          <p>
            Planbare Einsätze und eine Kultur, die Beziehungspflege ernst nimmt.
          </p>
        </article>
        <article>
          <Icon>↗</Icon>
          <h3>Mit Lumina wachsen</h3>
          <p>Weiterbildung, Verantwortung und Raum für eigene Ideen.</p>
        </article>
        <article>
          <Icon>☼</Icon>
          <h3>Rückhalt im Team</h3>
          <p>
            Kurze Wege, offene Kommunikation und verlässliche Fachbegleitung.
          </p>
        </article>
      </section>
      <section id="jobs" className="wrap jobs">
        <div>
          <span className="eyebrow">Offene Rollen</span>
          <h2>Wo Sie bei uns Wirkung entfalten.</h2>
        </div>
        <div>
          <article>
            <span>60–100% · Zürich & Aargau</span>
            <h3>Pflegefachfrau / Pflegefachmann EFZ</h3>
            <p>
              Grund- und Behandlungspflege im Alltag, stabile Beziehungen zu
              Klientinnen und enge Zusammenarbeit mit dem Fachteam.
            </p>
            <a href="/kontakt">Jetzt bewerben →</a>
          </article>
          <article>
            <span>60–100% · Zürich & Aargau</span>
            <h3>Dipl. Pflegefachperson HF/FH</h3>
            <p>
              Fallführung, Bedarfsabklärung und fachliche Begleitung von
              Kund:innen und Angehörigen.
            </p>
            <a href="/kontakt">Interesse melden →</a>
          </article>
          <article>
            <span>40–100% · Zürich & Aargau</span>
            <h3>Fachperson Gesundheit FaGe</h3>
            <p>
              Professionelle Pflege mit Eigenverantwortung und einer festen
              Beziehung zu Kund:innen.
            </p>
            <a href="/kontakt">Interesse melden →</a>
          </article>
        </div>
      </section>
      <LohnJob />
      <CTA
        title="Bewerben Sie sich als Pflegefachperson EFZ."
        text="Schreiben Sie uns unkompliziert. Wir lernen Sie gerne kennen – auch initiativ."
      />
    </main>
  );
}

function LohnJob() {
  const [pct, setPct] = useState(80);
  const [rate, setRate] = useState(38);
  const gross = Math.round(((((42 * pct) / 100) * 52) / 12) * rate);
  return (
    <section className="wrap job-calculator">
      <div>
        <span className="eyebrow light">Team-Lohnrechner</span>
        <h2>Ihr Pensum. Ihre Orientierung.</h2>
        <p>
          Eine unverbindliche Bruttolohn-Schätzung für den ersten Austausch.
        </p>
      </div>
      <div>
        <label>
          Pensum <b>{pct}%</b>
          <input
            type="range"
            min="40"
            max="100"
            step="10"
            value={pct}
            onChange={(e) => setPct(+e.target.value)}
          />
        </label>
        <label>
          Beispiel-Stundenlohn <b>CHF {rate}</b>
          <input
            type="range"
            min="30"
            max="55"
            step="1"
            value={rate}
            onChange={(e) => setRate(+e.target.value)}
          />
        </label>
      </div>
      <div className="result-preview">
        <span>Brutto / Monat</span>
        <b>CHF {gross.toLocaleString("de-CH")}</b>
        <small>
          Ohne Zulagen; definitive Einstufung nach Qualifikation und Erfahrung.
        </small>
      </div>
    </section>
  );
}

function Tarife() {
  return (
    <main>
      <section className="subhero dark">
        <div className="wrap subhero-grid">
          <div>
            <span className="eyebrow light">Über uns · Tarife</span>
            <h1>
              Transparente Tarife.
              <br />
              <em>Klar kommuniziert.</em>
            </h1>
            <p className="lead">
              Pflegeleistungen nach KLV und UVG sowie hauswirtschaftliche
              Leistungen – wie auf der bestehenden Lumina-Website ausgewiesen.
            </p>
            <a className="button gold" href="/kontakt">
              Tariffrage klären
            </a>
          </div>
          <img
            src="/images/home-spitex.png"
            alt="Transparente Spitex-Tarife und Beratung"
          />
        </div>
      </section>

      <section className="wrap tarife-section">
        <span className="eyebrow">Pflegeleistungen (KLV)</span>
        <h2>Pflichtleistung der Grundversicherung</h2>
        <div className="tarife-table-wrap">
          <table className="tarife-table">
            <thead>
              <tr>
                <th>Leistung</th>
                <th>Kostenübernahme</th>
                <th>Tarif (CHF/Std.)</th>
              </tr>
            </thead>
            <tbody>
              {tarifeKlv.map((row) => (
                <tr key={row.leistung}>
                  <td>{row.leistung}</td>
                  <td>{row.traeger}</td>
                  <td>{row.tarif}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="wrap tarife-section">
        <span className="eyebrow">Pflegeleistungen (UVG)</span>
        <h2>Unfallversicherung</h2>
        <div className="tarife-table-wrap">
          <table className="tarife-table">
            <thead>
              <tr>
                <th>Leistung</th>
                <th>Kostenübernahme</th>
                <th>Tarif (CHF/Std.)</th>
              </tr>
            </thead>
            <tbody>
              {tarifeUvg.map((row) => (
                <tr key={row.leistung}>
                  <td>{row.leistung}</td>
                  <td>{row.traeger}</td>
                  <td>{row.tarif}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="wrap tarife-section">
        <span className="eyebrow">Hauswirtschaft</span>
        <h2>Nicht kassenpflichtig</h2>
        <div className="tarife-table-wrap">
          <table className="tarife-table">
            <thead>
              <tr>
                <th>Leistung</th>
                <th>Kostenübernahme</th>
                <th>Tarif (CHF/Std.)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Hauswirtschaftliche Leistungen</td>
                <td>Klient / Zusatzversicherung</td>
                <td>55.00</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="more-read tarife-notes">
          <div className="more-read-summary">
            <p>
              Hauswirtschaftliche Leistungen werden durch die Klienten bezahlt.
              Sie sind keine Pflichtleistung der Krankenversicherer, können aber
              allenfalls aus der Zusatzversicherung zurückgefordert werden.
            </p>
          </div>
          <details className="more-read-details">
            <summary>Mehr lesen</summary>
            <div className="more-read-body">
              <p>
                Für Haushaltshilfe können Ergänzungsleistungen (EL) oder
                Gemeinden Beiträge leisten. Klientenbeteiligung pro Tag: CHF 7.65
                (gesetzlich geregelt).
              </p>
              <p>
                Absagen von Einsätzen: CHF 50.– pauschal, wenn weniger als 24
                Stunden vor dem Einsatz abgesagt wird (Auszug aus den AGBs).
              </p>
            </div>
          </details>
        </div>
      </section>

      <PartnersStrip />
      <CTA
        title="Fragen zu Finanzierung oder Rechnung?"
        text="Wir erklären Ihnen gerne, welche Leistungen die Krankenkasse trägt – und was privat bleibt."
      />
    </main>
  );
}

function About() {
  return (
    <main>
      <section className="subhero dark">
        <div className="wrap subhero-grid">
          <div>
            <span className="eyebrow light">Über Lumina</span>
            <h1>
              Licht und Wärme.
              <br />
              <em>Auch wenn es schwierig wird.</em>
            </h1>
            <p className="lead">
              „Lumina“ kommt von Lumen – dem Licht. Für uns bedeutet das:
              fachlich Orientierung geben und menschlich nahe bleiben.
            </p>
          </div>
          <img
            src="/images/hero.jpg"
            alt="Hände als Zeichen von Nähe und Unterstützung"
          />
        </div>
      </section>
      <section className="wrap values">
        <div>
          <span className="eyebrow">Unsere Haltung</span>
          <h2>Professionell. Empathisch. Verlässlich.</h2>
        </div>
        <article>
          <b>01</b>
          <h3>Professionalität</h3>
          <p>
            Diplomierte Pflegefachpersonen HF/FH, Fachpersonen Gesundheit und
            geschulte Pflegehelfende – mit laufender Weiterbildung.
          </p>
        </article>
        <article>
          <b>02</b>
          <h3>Empathie</h3>
          <p>
            Wir nehmen uns Zeit, hören zu und begegnen jedem Menschen auf
            Augenhöhe – auch den Angehörigen.
          </p>
        </article>
        <article>
          <b>03</b>
          <h3>Verlässlichkeit</h3>
          <p>
            Feste Bezugspersonen, klare Abläufe und nachvollziehbare
            Dokumentation schaffen Sicherheit.
          </p>
        </article>
      </section>
      <section className="quality">
        <div className="wrap split-section">
          <div>
            <span className="eyebrow">Qualität im Alltag</span>
            <h2>Vertrauen braucht überprüfbare Standards.</h2>
            <p className="lead small-lead">
              Unsere Abläufe verbinden fachliche Sorgfalt mit persönlicher
              Verantwortung.
            </p>
          </div>
          <ul className="checklist">
            <li>Strukturierte Bedarfsabklärung mit anerkannten Instrumenten</li>
            <li>Lückenlose Pflegedokumentation und Qualitätsprüfungen</li>
            <li>Klare Abläufe für Notfälle, Medikamente und Hygiene</li>
            <li>Direkte Abrechnung mit Schweizer Krankenversicherern</li>
            <li>Offenes Ohr für Rückmeldungen von Kund:innen und Familien</li>
          </ul>
        </div>
      </section>
      <PartnersStrip />
      <CTA />
    </main>
  );
}

function Contact() {
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");
  const [sending, setSending] = useState(false);
  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSending(true);
    setError("");
    const data = new FormData(e.currentTarget);
    const response = await fetch("/api/leads", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        source: "kontakt",
        name: `${data.get("first") || ""} ${data.get("last") || ""}`.trim(),
        contact: data.get("contact"),
        topic: data.get("topic"),
        message: data.get("message"),
        consent: true,
      }),
    });
    setSending(false);
    if (response.ok) setSent(true);
    else
      setError(
        "Das Senden hat nicht geklappt. Bitte rufen Sie uns unter 043 433 88 00 an.",
      );
  }
  return (
    <main>
      <section className="contact-hero">
        <div className="wrap">
          <span className="eyebrow">Kontakt</span>
          <h1>Wir sind für Sie da.</h1>
          <p className="lead">
            Rufen Sie an oder schreiben Sie uns. Wir melden uns rasch und
            unkompliziert.
          </p>
        </div>
      </section>
      <section className="wrap contact-grid">
        <div className="contact-info">
          <div>
            <Icon>☎</Icon>
            <span>
              <b>Telefon</b>
              <a href="tel:+41434338800">043 433 88 00</a>
            </span>
          </div>
          <div>
            <Icon>✉</Icon>
            <span>
              <b>E-Mail</b>
              <a href="mailto:info@lumina-spitex.ch">info@lumina-spitex.ch</a>
            </span>
          </div>
          <div>
            <Icon>⌂</Icon>
            <span>
              <b>Adresse</b>
              <p>
                Rütistrasse 18
                <br />
                8952 Schlieren
              </p>
            </span>
          </div>
          <div>
            <Icon>◷</Icon>
            <span>
              <b>Bürozeiten</b>
              <p>
                Montag–Freitag
                <br />
                08:00–17:00 Uhr
              </p>
            </span>
          </div>
          <div className="contact-note">
            <b>Dringender Pflegebedarf?</b>
            <p>
              Rufen Sie uns direkt an. Bei medizinischen Notfällen wählen Sie
              144.
            </p>
          </div>
        </div>
        <form className="contact-form" onSubmit={submit}>
          {sent ? (
            <div className="success">
              <Icon>✓</Icon>
              <h2>Danke für Ihre Nachricht.</h2>
              <p>Wir melden uns so rasch wie möglich persönlich bei Ihnen.</p>
            </div>
          ) : (
            <>
              <span className="eyebrow">Nachricht senden</span>
              <h2>Worum dürfen wir uns kümmern?</h2>
              <div className="form-row">
                <label>
                  Vorname
                  <input required name="first" autoComplete="given-name" />
                </label>
                <label>
                  Nachname
                  <input required name="last" autoComplete="family-name" />
                </label>
              </div>
              <label>
                Telefon oder E-Mail
                <input required name="contact" />
              </label>
              <label>
                Ich interessiere mich für
                <select name="topic">
                  <option>Spitex-Pflege</option>
                  <option>Begleitung</option>
                  <option>Anstellung als pflegende Angehörige</option>
                  <option>Arbeiten bei Lumina</option>
                  <option>Etwas anderes</option>
                </select>
              </label>
              <label>
                Ihre Nachricht
                <textarea rows={5} required name="message" />
              </label>
              <label className="check">
                <input type="checkbox" required />{" "}
                <span>
                  Ich bin mit der Bearbeitung meiner Angaben gemäss{" "}
                  <a href="/datenschutz">Datenschutzerklärung</a> einverstanden.
                </span>
              </label>
              {error && <p role="alert">{error}</p>}
              <button className="button" disabled={sending} type="submit">
                {sending ? "Wird gesendet …" : "Nachricht senden"}
              </button>
            </>
          )}
        </form>
      </section>
    </main>
  );
}

function BlogPreview() {
  return (
    <section className="wrap blog-preview">
      <div className="section-head horizontal">
        <div>
          <span className="eyebrow">Wissen, das weiterhilft</span>
          <h2>Ratgeber für Familien</h2>
        </div>
        <a className="text-link" href="/ratgeber">
          Alle Beiträge ansehen →
        </a>
      </div>
      <div className="article-grid">
        {articles.slice(0, 3).map((a, i) => (
          <ArticleCard a={a} i={i} key={a.title} />
        ))}
      </div>
    </section>
  );
}
function ArticleCard({ a, i }: { a: Article; i: number }) {
  return (
    <article className="article-card">
      <a className="article-media" href={`/ratgeber/${a.slug}`}>
        <img src={a.image} alt={a.imageAlt} />
        <span className={`article-art-label art-${i % 3}`}>
          {i % 3 === 0
            ? "Wissen schafft Klarheit."
            : i % 3 === 1
              ? "Gute Pflege beginnt beim Zuhören."
              : "Entlastung ist Teil der Fürsorge."}
        </span>
      </a>
      <div>
        <span className="tag">{a.tag}</span>
        <h3>{a.title}</h3>
        <p>{a.text}</p>
        <small>{a.read} Lesezeit</small>
        <a href={`/ratgeber/${a.slug}`} aria-label={`${a.title} lesen`}>
          Beitrag lesen →
        </a>
      </div>
    </article>
  );
}

function buildArticleSpeechText(article: Article) {
  const parts = [
    article.title,
    article.text,
    ...article.sections.flatMap((section) => [
      section.heading ?? "",
      ...section.paragraphs,
    ]),
    "Das Wichtigste.",
    ...article.takeaways,
  ];
  return parts.filter(Boolean).join("\n\n");
}

function ArticleReader({ article }: { article: Article }) {
  const speeds = [1, 1.25, 1.5] as const;
  const [speed, setSpeed] = useState<(typeof speeds)[number]>(1);
  const [speaking, setSpeaking] = useState(false);
  const [paused, setPaused] = useState(false);
  const [supported, setSupported] = useState(false);
  const speedRef = useRef<(typeof speeds)[number]>(1);
  const speakingRef = useRef(false);

  useEffect(() => {
    setSupported(typeof window !== "undefined" && "speechSynthesis" in window);
    return () => {
      if (typeof window !== "undefined" && "speechSynthesis" in window) {
        window.speechSynthesis.cancel();
      }
      speakingRef.current = false;
    };
  }, [article.slug]);

  const stop = () => {
    if (!supported) return;
    window.speechSynthesis.cancel();
    speakingRef.current = false;
    setSpeaking(false);
    setPaused(false);
  };

  const start = (rate: number = speedRef.current) => {
    if (!supported) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(
      buildArticleSpeechText(article),
    );
    utterance.lang = "de-DE";
    utterance.rate = rate;
    const voices = window.speechSynthesis.getVoices();
    const german =
      voices.find((v) => v.lang === "de-DE" && /Katja|Amala|Conrad|Germany/i.test(v.name)) ||
      voices.find((v) => v.lang.startsWith("de-DE")) ||
      voices.find((v) => v.lang.startsWith("de") && !/CH|Swiss|Schweiz/i.test(`${v.lang} ${v.name}`)) ||
      voices.find((v) => v.lang.startsWith("de")) ||
      null;
    if (german) utterance.voice = german;
    utterance.onend = () => {
      speakingRef.current = false;
      setSpeaking(false);
      setPaused(false);
    };
    utterance.onerror = () => {
      speakingRef.current = false;
      setSpeaking(false);
      setPaused(false);
    };
    speakingRef.current = true;
    setSpeaking(true);
    setPaused(false);
    window.speechSynthesis.speak(utterance);
  };

  const togglePlay = () => {
    if (!supported) return;
    if (!speaking) {
      start();
      return;
    }
    if (paused) {
      window.speechSynthesis.resume();
      setPaused(false);
      return;
    }
    window.speechSynthesis.pause();
    setPaused(true);
  };

  const changeSpeed = (value: (typeof speeds)[number]) => {
    speedRef.current = value;
    setSpeed(value);
    if (speakingRef.current) {
      start(value);
    }
  };

  return (
    <div className="article-reader" aria-label="Beitrag vorlesen">
      <div className="article-reader-main">
        <button
          type="button"
          className="article-reader-play"
          onClick={togglePlay}
          aria-pressed={speaking && !paused}
        >
          {!speaking ? "Vorlesen" : paused ? "Weiter" : "Pause"}
        </button>
        {speaking ? (
          <button type="button" className="article-reader-stop" onClick={stop}>
            Stopp
          </button>
        ) : null}
        <span className="article-reader-label">Geschwindigkeit</span>
      </div>
      <div
        className="article-reader-speeds"
        role="group"
        aria-label="Vorlesegeschwindigkeit"
      >
        {speeds.map((value) => (
          <button
            type="button"
            key={value}
            className={speed === value ? "active" : ""}
            onClick={() => changeSpeed(value)}
          >
            {value === 1 ? "1×" : `${value}×`}
          </button>
        ))}
      </div>
    </div>
  );
}

function ArticleDetail({ article }: { article: Article }) {
  const related = articles.filter((a) => a.slug !== article.slug).slice(0, 3);
  return (
    <main>
      <article className="article-detail">
        <div className="wrap article-column">
          <header className="article-detail-hero">
            <a className="text-link" href="/ratgeber">
              ← Alle Ratgeber
            </a>
            <span className="tag">{article.tag}</span>
            <h1>{article.title}</h1>
            <p className="lead article-lead">{article.text}</p>
            <div className="article-meta">
              <span>{article.read} Lesezeit</span>
              <span>Aktualisiert {article.updated}</span>
              <span>Schweiz · Zürich & Aargau</span>
            </div>
          </header>
          <div className="article-detail-visual">
            <img src={article.image} alt={article.imageAlt} />
          </div>
          <ArticleReader article={article} />
          <div className="article-prose">
            {article.sections.map((section) => (
              <section key={section.heading ?? section.paragraphs[0]}>
                {section.heading ? <h2>{section.heading}</h2> : null}
                {section.paragraphs.map((p) => (
                  <p key={p.slice(0, 48)}>{p}</p>
                ))}
              </section>
            ))}
            <aside className="article-takeaways">
              <h2>Das Wichtigste</h2>
              <ul>
                {article.takeaways.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </aside>
            <p className="article-disclaimer">
              Hinweis: Dieser Beitrag dient der allgemeinen Orientierung und
              ersetzt keine individuelle medizinische, rechtliche oder
              sozialversicherungsrechtliche Beratung. Beträge und Vorgaben können
              sich ändern – massgebend sind Behörden und Ihre konkrete Abklärung.
            </p>
            {article.ctaHref ? (
              <div className="article-inline-cta">
                <a className="button" href={article.ctaHref}>
                  {article.ctaLabel ?? "Weiter"}
                </a>
                <a className="text-link" href="/kontakt">
                  Persönliches Gespräch →
                </a>
              </div>
            ) : null}
          </div>
        </div>
      </article>
      <section className="wrap blog-preview">
        <div className="section-head horizontal">
          <div>
            <span className="eyebrow">Weiterlesen</span>
            <h2>Weitere Ratgeber</h2>
          </div>
          <a className="text-link" href="/ratgeber">
            Alle Beiträge →
          </a>
        </div>
        <div className="article-grid">
          {related.map((a, i) => (
            <ArticleCard a={a} i={i} key={a.slug} />
          ))}
        </div>
      </section>
      <CTA />
    </main>
  );
}

function Ratgeber({ articleSlug }: { articleSlug?: string }) {
  const selected = articleSlug ? getArticle(articleSlug) : undefined;
  const [filter, setFilter] = useState("Alle");
  const categories = [
    "Alle",
    "Lohn & Anspruch",
    "Pflegealltag",
    "Entlastung",
    "Spitex",
  ];
  const list =
    filter === "Alle"
      ? articles
      : articles.filter(
          (a) =>
            a.tag === filter ||
            (filter === "Lohn & Anspruch" &&
              [
                "Lohn & Anspruch",
                "Orientierung",
                "Finanzierung",
                "Anstellung",
              ].includes(a.tag)) ||
            (filter === "Pflegealltag" &&
              ["Pflegealltag", "Vorsorge", "Sicherheit"].includes(a.tag)) ||
            (filter === "Entlastung" &&
              ["Entlastung", "Regional"].includes(a.tag)),
        );

  if (articleSlug && !selected) {
    return (
      <main>
        <section className="wrap legal-page">
          <h1>Beitrag nicht gefunden</h1>
          <p>Dieser Ratgeber existiert nicht oder wurde verschoben.</p>
          <a className="button" href="/ratgeber">
            Zurück zur Übersicht
          </a>
        </section>
      </main>
    );
  }

  if (selected) {
    return <ArticleDetail article={selected} />;
  }

  return (
    <main>
      <section className="blog-hero">
        <div className="wrap">
          <span className="eyebrow light">Lumina Ratgeber</span>
          <h1>Wissen gibt Sicherheit.</h1>
          <p className="lead">
            Verständliche Antworten auf Fragen zu Pflege, Lohn, Finanzierung und
            Familienalltag – Schweizerisch, konkret und ohne Fachchinesisch.
          </p>
          <a className="button gold" href="/anspruchscheck">
            Anspruch in 2 Minuten prüfen
          </a>
        </div>
      </section>
      <section className="wrap blog-content">
        <div className="filters" aria-label="Beiträge filtern">
          {categories.map((c) => (
            <button
              className={filter === c ? "active" : ""}
              onClick={() => setFilter(c)}
              key={c}
            >
              {c}
            </button>
          ))}
        </div>
        <div className="article-grid all">
          {list.map((a, i) => (
            <div id={a.slug} key={a.slug}>
              <ArticleCard a={a} i={i} />
            </div>
          ))}
        </div>
      </section>
      <section className="wrap magnet">
        <div>
          <span className="eyebrow light">Kostenloser Leitfaden</span>
          <h2>7 Schritte, die pflegende Familien jetzt kennen sollten.</h2>
          <p>
            Eine kompakte Checkliste zu Ansprüchen, Dokumenten und Entlastung –
            direkt als persönliche Zusammenfassung.
          </p>
        </div>
        <a className="button gold" href="/anspruchscheck">
          Leitfaden freischalten
        </a>
      </section>
      <CTA />
    </main>
  );
}

function QuizClose() {
  return (
    <div className="quiz-top">
      <a className="quiz-brand" href="/">
        <span className="brand-mark">L</span> Lumina
      </a>
      <a
        className="quiz-close"
        href="/"
        aria-label="Berechnung schliessen und zur Website zurück"
        title="Schliessen"
      >
        <span aria-hidden="true">×</span>
      </a>
    </div>
  );
}

function LohnCheck() {
  const [step, setStep] = useState(0);
  const [relation, setRelation] = useState("");
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
      value=""
      setValue={() => {}}
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
        Eine ungefähre Angabe reicht für die erste Schätzung.
      </p>
      <div className="big-number">
        {hours.toFixed(1)} <small>Stunden / Tag</small>
      </div>
      <input
        className="big-range"
        type="range"
        min="0.5"
        max="4"
        step="0.5"
        value={hours}
        onChange={(e) => setHours(+e.target.value)}
      />
      <div className="range-labels">
        <span>30 Min.</span>
        <span>4+ Std.</span>
      </div>
    </div>,
    <Choice
      key="s5"
      title="Wo wohnt die gepflegte Person?"
      subtitle="Lumina ist aktuell in Zürich und Aargau im Aufbau tätig."
      options={["Zürich", "Aargau", "Anderer Kanton"]}
      value={canton}
      setValue={setCanton}
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
          source: "lohn-check",
          name: leadName,
          contact: [leadPhone, leadEmail].filter(Boolean).join(" · "),
          topic: "Anstellung als pflegende Angehörige",
          details: { relation, tasks, hours, canton, estimatedMonthlyGross: wage },
          consent: true,
        }),
      });
    }
    if (step < 6) setStep(step + 1);
  }
  return (
    <main className="quiz-page">
      <section className="quiz-shell">
        <QuizClose />
        <div className="quiz-progress">
          <span style={{ width: `${((step + 1) / 7) * 100}%` }} />
          <small>Schritt {step + 1} von 7</small>
        </div>
        <div className="quiz-card">
          {screens[step]}
          {step < 6 && (
            <div className="quiz-nav">
              <button
                onClick={() => setStep(Math.max(0, step - 1))}
                disabled={step === 0}
              >
                Zurück
              </button>
              <button className="button" onClick={next}>
                Weiter
              </button>
            </div>
          )}
          {step >= 6 && (
            <div className="quiz-nav quiz-nav-end">
              <a className="text-link" href="/">
                Zur Website →
              </a>
            </div>
          )}
        </div>
        <p className="quiz-disclaimer">
          Automatisierte, unverbindliche Schätzung auf Basis eines
          Beispiel-Stundenlohns · ersetzt keine Bedarfsabklärung oder
          Rechtsberatung.
        </p>
      </section>
    </main>
  );
}

function Choice({
  title,
  subtitle,
  options,
  value,
  setValue,
}: {
  title: string;
  subtitle: string;
  options: string[];
  value: string;
  setValue: (v: string) => void;
}) {
  const [local, setLocal] = useState(value);
  return (
    <div>
      <h2>{title}</h2>
      <p className="quiz-sub">{subtitle}</p>
      <div className="choices">
        {options.map((o) => (
          <button
            className={(value || local) === o ? "selected" : ""}
            onClick={() => {
              setLocal(o);
              setValue(o);
            }}
            key={o}
          >
            <span>{o}</span>
            <b>→</b>
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
            <b>{value.includes(o) ? "✓" : "+"}</b>
          </button>
        ))}
      </div>
    </div>
  );
}

function Anspruchscheck() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const qs = [
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
  ];
  if (step >= 4)
    return (
      <main className="quiz-page green">
        <section className="quiz-shell">
          <QuizClose />
          <div className="quiz-card result-check">
            <span className="success-icon">✓</span>
            <span className="result-kicker">Ihre erste Orientierung</span>
            <h1>Mehrere Ansprüche könnten in Frage kommen.</h1>
            <div className="claim-grid">
              <div>
                <b>Hilflosenentschädigung</b>
                <span>Persönlich abklären</span>
              </div>
              <div>
                <b>Betreuungsgutschrift</b>
                <span>Situation prüfen</span>
              </div>
              <div>
                <b>Anstellung bei Lumina</b>
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
              className="restart"
              onClick={() => {
                setStep(0);
                setAnswers([]);
              }}
            >
              Check wiederholen
            </button>
            <a className="restart" href="/">
              Zur Website
            </a>
          </div>
          <p className="quiz-disclaimer">
            Unverbindliche Orientierung, keine Rechts- oder Sozialberatung. Die
            verbindliche Prüfung erfolgt durch die zuständige Stelle oder
            Fachperson.
          </p>
        </section>
      </main>
    );
  const q = qs[step];
  return (
    <main className="quiz-page green">
      <section className="quiz-shell">
        <QuizClose />
        <div className="quiz-progress">
          <span style={{ width: `${((step + 1) / 4) * 100}%` }} />
          <small>Frage {step + 1} von 4</small>
        </div>
        <div className="quiz-card">
          <h2>{q.q}</h2>
          <p className="quiz-sub">{q.s}</p>
          <div className="choices">
            {q.o.map((o) => (
              <button
                onClick={() => {
                  setAnswers([...answers, o]);
                  setStep(step + 1);
                }}
                key={o}
              >
                <span>{o}</span>
                <b>→</b>
              </button>
            ))}
          </div>
          {step > 0 && (
            <button
              className="restart"
              onClick={() => {
                setStep(step - 1);
                setAnswers(answers.slice(0, -1));
              }}
            >
              ← Zurück
            </button>
          )}
        </div>
      </section>
    </main>
  );
}

function Legal({ privacy = false }: { privacy?: boolean }) {
  return (
    <main>
      <section className="legal-hero">
        <div className="wrap">
          <span className="eyebrow">Rechtliches</span>
          <h1>{privacy ? "Datenschutzerklärung" : "Impressum"}</h1>
          <p>Stand: August 2026</p>
        </div>
      </section>
      <section className="wrap legal-copy">
        {privacy ? (
          <>
            <h2>1. Verantwortliche Stelle</h2>
            <p>
              Lumina Spitex AG, Rütistrasse 18, 8952 Schlieren, Schweiz
              <br />
              E-Mail: info@lumina-spitex.ch · Telefon: 043 433 88 00
            </p>
            <p>
              Website und redaktionelle Inhalte:{" "}
              <a href="https://www.agenticit.ch" target="_blank" rel="noreferrer">
                AgenticIT
              </a>
              , www.agenticit.ch
            </p>
            <h2>2. Welche Daten wir bearbeiten</h2>
            <p>
              Wenn Sie uns kontaktieren oder einen Check nutzen, bearbeiten wir
              die von Ihnen eingegebenen Kontakt-, Anfrage- und
              Situationsangaben. Gesundheitsbezogene Angaben behandeln wir
              besonders vertraulich.
            </p>
            <h2>3. Zweck der Bearbeitung</h2>
            <p>
              Wir verwenden Angaben, um Anfragen zu beantworten, eine
              persönliche Beratung vorzubereiten, unsere Leistungen zu erbringen
              und gesetzliche Pflichten zu erfüllen. Digitale Checks liefern nur
              eine unverbindliche Orientierung; eine Fachperson prüft die
              Situation persönlich.
            </p>
            <h2>4. Weitergabe und Auftragsbearbeitung</h2>
            <p>
              Wir geben Daten nur weiter, wenn dies für eine beauftragte
              Leistung, eine gesetzliche Pflicht oder mit Ihrer Einwilligung
              erforderlich ist. Eingesetzte Dienstleister werden sorgfältig
              ausgewählt und vertraglich zum Datenschutz verpflichtet.
            </p>
            <h2>5. Aufbewahrung und Sicherheit</h2>
            <p>
              Wir bewahren Daten nur so lange auf, wie es für den jeweiligen
              Zweck oder gesetzliche Pflichten notwendig ist, und schützen sie
              mit angemessenen technischen und organisatorischen Massnahmen.
            </p>
            <h2>6. Ihre Rechte</h2>
            <p>
              Sie können im Rahmen des anwendbaren Schweizer Datenschutzrechts
              Auskunft, Berichtigung, Löschung oder Herausgabe Ihrer Daten
              verlangen und eine Einwilligung für die Zukunft widerrufen.
              Kontaktieren Sie uns dazu unter info@lumina-spitex.ch.
            </p>
            <h2>7. Cookies und lokale Speicherung</h2>
            <p>
              Die Website kann technisch notwendige lokale Speicherung
              verwenden, etwa um Eingaben innerhalb eines Checks zu halten oder
              die Installierbarkeit als App zu ermöglichen. Nicht notwendige
              Analyse- oder Marketingdienste werden nur nach entsprechender
              Information und, wo erforderlich, Einwilligung eingesetzt.
            </p>
            <h2>8. Änderungen</h2>
            <p>
              Wir können diese Erklärung anpassen, wenn sich Funktionen oder
              rechtliche Anforderungen ändern. Es gilt die auf dieser Website
              veröffentlichte Fassung.
            </p>
          </>
        ) : (
          <>
            <h2>Anbieterin</h2>
            <p>
              Lumina Spitex AG
              <br />
              Rütistrasse 18
              <br />
              8952 Schlieren
              <br />
              Schweiz
            </p>
            <h2>Kontakt</h2>
            <p>
              Telefon: 043 433 88 00
              <br />
              E-Mail: info@lumina-spitex.ch
            </p>
            <h2>Vertretungsberechtigte Person</h2>
            <p>Geschäftsleitung der Lumina Spitex AG</p>
            <h2>Handelsregister</h2>
            <p>
              Handelsregisteramt des Kantons Zürich
              <br />
              UID und Handelsregisternummer: vor Veröffentlichung ergänzen.
            </p>
            <h2>Haftung</h2>
            <p>
              Die Inhalte dieser Website dienen der allgemeinen Information.
              Insbesondere Rechner und Anspruchscheck ersetzen keine
              medizinische, rechtliche oder sozialversicherungsrechtliche
              Beratung. Trotz sorgfältiger Bearbeitung wird keine Gewähr für
              Vollständigkeit und Aktualität übernommen.
            </p>
            <h2>Urheberrecht</h2>
            <p>
              Inhalte und Gestaltung dieser Website sind urheberrechtlich
              geschützt. Eine Verwendung ausserhalb der gesetzlichen Schranken
              bedarf der vorherigen Zustimmung.
            </p>
            <h2>Website & Inhalte</h2>
            <p>
              Diese Website wurde erstellt von{" "}
              <a href="https://www.agenticit.ch" target="_blank" rel="noreferrer">
                AgenticIT
              </a>{" "}
              (www.agenticit.ch). AgenticIT ist auch für die Inhalte dieser
              Website verantwortlich.
            </p>
          </>
        )}
      </section>
    </main>
  );
}

function PWARegister() {
  useEffect(() => {
    if ("serviceWorker" in navigator)
      navigator.serviceWorker.register("/sw.js").catch(() => undefined);
  }, []);
  return null;
}

export function LuminaSite({
  view,
  articleSlug,
}: {
  view: View;
  articleSlug?: string;
}) {
  let page: ReactNode;
  switch (view) {
    case "spitex":
      page = <Spitex />;
      break;
    case "services":
    case "begleitung":
      page = <Begleitung />;
      break;
    case "angehoerige":
      page = <Angehörige />;
      break;
    case "team":
      page = <Team />;
      break;
    case "tarife":
      page = <Tarife />;
      break;
    case "ueber-uns":
      page = <About />;
      break;
    case "kontakt":
      page = <Contact />;
      break;
    case "ratgeber":
      page = <Ratgeber articleSlug={articleSlug} />;
      break;
    case "lohn-check":
      return (
        <>
          <PWARegister />
          <LohnCheck />
        </>
      );
    case "anspruchscheck":
      return (
        <>
          <PWARegister />
          <Anspruchscheck />
        </>
      );
    case "impressum":
      page = <Legal />;
      break;
    case "datenschutz":
      page = <Legal privacy />;
      break;
    default:
      page = <Home />;
  }
  return (
    <>
      <PWARegister />
      <Header />
      {page}
      <Footer />
      <div className="mobile-bar">
        <a href="tel:+41434338800">Anrufen</a>
        <a href="/kontakt">Kontakt</a>
      </div>
    </>
  );
}
