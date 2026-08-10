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
import { ListenPlayer } from "./listen/ListenPlayer";
import { CookieBanner } from "./CookieBanner";

function BrandLockup({
  height = 84,
  light = false,
}: {
  height?: number;
  light?: boolean;
}) {
  const width = Math.round(height * (987 / 360));
  return (
    <img
      className="brand-logo"
      src={
        light
          ? "/images/logo-lumina-lockup-light.png?v=orig1"
          : "/images/logo-lumina-lockup.png?v=orig1"
      }
      alt=""
      width={width}
      height={height}
      decoding="async"
    />
  );
}

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
  | "bewerbung"
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
            <BrandLockup height={84} />
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
                    href="/ueber-uns"
                    role="menuitem"
                    onClick={() => setOpen(false)}
                  >
                    Über uns
                  </a>
                  <a
                    href="/tarife"
                    role="menuitem"
                    onClick={() => setOpen(false)}
                  >
                    Tarife
                  </a>
                  <a
                    href="/ratgeber"
                    role="menuitem"
                    onClick={() => setOpen(false)}
                  >
                    Ratgeber
                  </a>
                  <a
                    href="/bewerbung"
                    role="menuitem"
                    onClick={() => setOpen(false)}
                  >
                    Bewerbung
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
          <a className="brand brand-light" href="/" aria-label="Lumina Spitex Startseite">
            <BrandLockup height={72} light />
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
          <a href="/ueber-uns">Über uns</a>
          <a href="/tarife">Tarife</a>
          <a href="/ratgeber">Ratgeber</a>
          <a href="/bewerbung">Bewerbung</a>
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
  href = "/kontakt",
  ctaLabel = "Gespräch vereinbaren",
}: {
  title?: string;
  text?: string;
  href?: string;
  ctaLabel?: string;
}) {
  return (
    <section className="cta wrap">
      <div>
        <span className="eyebrow light">Persönlich für Sie da</span>
        <h2>{title}</h2>
        <p>{text}</p>
      </div>
      <div className="cta-actions">
        <a className="button gold" href={href}>
          {ctaLabel}
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
          <h1 className="hero-title">
            <span className="hero-title-line">Professionelle</span>
            <span className="hero-title-line">
              Pflege <em>zu Hause.</em>
            </span>
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
            src="/images/home-hero.jpg?v=sq3"
            alt="Pflege und Medikamentenplanung zu Hause mit Angehörigen und Fachperson"
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
            <a href="/spitex" className="path-card">
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
          <a className="button outline" href="/spitex">
            Alle Spitex-Leistungen →
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
          <a className="text-link" href="/anspruchscheck">
            Sie pflegen einen Angehörigen? Jetzt innerhalb von zwei Minuten
            Lohnanspruch prüfen →
          </a>
        </div>
        <img
          className="aida-image"
          src="/images/angehoerige-hero-anleitung.jpg?v=sq3"
          alt="Pflegefachperson zeigt einem Angehörigen auf Hausbesuch, wie er seinen Vater unterstützt"
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
          <a className="button outline" href="/begleitung">
            Begleitung ansehen →
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
          <span className="eyebrow light">Team · Wachstum mit Vertrauen</span>
          <h2>
            Wir suchen
            <br />
            mehrere Fachkräfte.
          </h2>
          <MoreRead
            summary={
              <p>
                Immer mehr Menschen vertrauen dem Lumina-Team. Deshalb wachsen
                wir – und suchen Verstärkung an mehreren Stellen.
              </p>
            }
          >
            <p>
              Gesucht sind Pflegefachpersonen EFZ, diplomierte Pflegefachpersonen
              (HF/FH) und Fachpersonen Gesundheit, die Verantwortung übernehmen,
              Familien anleiten und Qualität sichern. Faire Anstellung, klare
              Prozesse und ein erfahrenes Team mit Haltung.
            </p>
          </MoreRead>
          <a className="text-link light" href="/ueber-uns#karriere">
            Offene Rollen ansehen →
          </a>
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
  return <About />;
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
            <h1 className="hero-title">
              <span className="hero-title-line">Transparente Tarife.</span>
              <span className="hero-title-line">
                <em>Klar kommuniziert.</em>
              </span>
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

      <section className="wrap legal-foundations">
        <div className="section-head left">
          <span className="eyebrow">Rechtliche Grundlagen</span>
          <h2>Was Spitex und Finanzierung rechtlich trägt.</h2>
          <p className="lead small-lead">
            Für Pflege zu Hause gelten klare Bundesgesetze und Verordnungen.
            Hier die wichtigsten Bestimmungen – verständlich eingeordnet, mit
            Link zum Originaltext auf Fedlex.
          </p>
        </div>

        <div className="legal-cards">
          <article>
            <h3>Krankenversicherungsgesetz (KVG)</h3>
            <p>
              Das KVG legt fest, welche Pflegeleistungen die obligatorische
              Krankenpflegeversicherung übernimmt und wie die Finanzierung
              zwischen Versicherer, Kanton und versicherter Person aufgeteilt
              wird (Art. 25a). Es verlangt wirtschaftliche Leistungen (Art. 56),
              schützt vor überhöhten Tarifen (Art. 44) und regelt die Vergütung
              von Analysen, Arzneimitteln sowie Mitteln und Gegenständen (Art.
              52).
            </p>
            <a
              className="text-link"
              href="https://www.fedlex.admin.ch/eli/cc/1995/1328_1328_1328/de"
              target="_blank"
              rel="noreferrer"
            >
              KVG auf Fedlex öffnen →
            </a>
          </article>

          <article>
            <h3>Krankenpflege-Leistungsverordnung (KLV)</h3>
            <p>
              Die KLV konkretisiert die kassenpflichtige Pflege: Art. 7 und 7a
              listen die Leistungen und die Beiträge der Krankenversicherer.
              Art. 8 und 8a regeln, wann ein ärztlicher Auftrag nötig ist und
              wie die Spitex den Bedarf ermittelt. Art. 9 steuert die
              Abrechnung; Art. 20a verweist auf die Mittel- und Gegenständeliste
              des BAG.
            </p>
            <a
              className="text-link"
              href="https://www.fedlex.admin.ch/eli/cc/1995/4964_4964_4964/de"
              target="_blank"
              rel="noreferrer"
            >
              KLV auf Fedlex öffnen →
            </a>
          </article>

          <article>
            <h3>Krankenversicherungsverordnung (KVV)</h3>
            <p>
              Die KVV regelt unter anderem die Zulassung von
              Spitex-Organisationen (Art. 51) und die Qualitätsanforderungen
              (Art. 58). Ohne diese Voraussetzungen ist keine Abrechnung über
              die Grundversicherung möglich.
            </p>
            <a
              className="text-link"
              href="https://www.fedlex.admin.ch/eli/cc/1995/3867_3867_3867/de"
              target="_blank"
              rel="noreferrer"
            >
              KVV auf Fedlex öffnen →
            </a>
          </article>

          <article>
            <h3>Ergänzungsleistungen (ELG)</h3>
            <p>
              Das Bundesgesetz über Ergänzungsleistungen zur AHV und IV regelt
              in Art. 14–16, wie Kantone Krankheits- und Behinderungskosten
              mitvergüten können – etwa bei Haushaltshilfe oder
              Restkostenbeteiligung.
            </p>
            <a
              className="text-link"
              href="https://www.fedlex.admin.ch/eli/cc/2007/804/de#art_14"
              target="_blank"
              rel="noreferrer"
            >
              ELG Art. 14 auf Fedlex öffnen →
            </a>
          </article>
        </div>

        <div className="legal-notes">
          <h3>Kantone, Gemeinden und Versichererverträge</h3>
          <p>
            Viele Regeln zur Hilfe und Pflege zu Hause sind kantonal oder
            kommunal. Massgebend sind die Vorgaben Ihres Wohnkantons bzw. Ihrer
            Gemeinde. Zusätzlich gelten Administrativverträge zwischen
            Spitex-Organisationen und Krankenversicherern sowie der Tarifvertrag
            IV/UV/MV für Leistungen zulasten Invaliden-, Unfall- und
            Militärversicherung.
          </p>
          <p>
            Wir erklären Ihnen gerne, welche Grundlagen für Ihre Situation
            greifen – und was das für Abrechnung und Beteiligung bedeutet.
          </p>
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
            <span className="eyebrow light">Über uns</span>
            <h1 className="hero-title">
              <span className="hero-title-line">Licht und Wärme.</span>
              <span className="hero-title-line">
                <em>Auch wenn es schwierig wird.</em>
              </span>
            </h1>
            <p className="lead">
              „Lumina“ kommt von Lumen – dem Licht. Für uns bedeutet das:
              fachlich Orientierung geben und menschlich nahe bleiben. Lumina
              ist eine junge Firma – fünf Personen, drei Frauen und zwei Männer
              – mit langjähriger Erfahrung in der Pflege. Gemeinsam bringen wir
              über 50 Jahre Berufspraxis mit und begleiten Klientinnen und
              Familien in Zürich und Aargau.
            </p>
            <div className="actions">
              <a className="button gold" href="#karriere">
                Offene Stellen
              </a>
              <a className="text-link light" href="/bewerbung">
                Bewerben →
              </a>
            </div>
          </div>
          <img
            src="/images/lumina-team-5.jpg?v=1"
            alt="Das Lumina-Team: drei Frauen und zwei Männer"
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
          <h3>Erfahrung mit Herz</h3>
          <p>
            Neu gegründet – aber keine Anfänger: erfahrene Fachleute mit Liebe
            zum Beruf, die wissen, worauf es in der Pflege zu Hause ankommt.
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

      <section id="karriere" className="wrap benefits">
        <article>
          <Icon>♡</Icon>
          <h3>Vertrauen, das wächst</h3>
          <p>
            Immer mehr Familien vertrauen uns ihre Pflege an – dieses Vertrauen
            möchten wir mit zusätzlichen Fachpersonen tragen.
          </p>
        </article>
        <article>
          <Icon>↗</Icon>
          <h3>Bedarf und Wachstum</h3>
          <p>
            Die Nachfrage steigt. Deshalb suchen wir mehrere Mitarbeitende, die
            mit uns Qualität und Nähe ausbauen.
          </p>
        </article>
        <article>
          <Icon>☼</Icon>
          <h3>Rückhalt im Team</h3>
          <p>
            Kurze Wege, offene Kommunikation und erfahrene Kolleginnen und
            Kollegen an Ihrer Seite.
          </p>
        </article>
      </section>

      <section id="jobs" className="wrap jobs">
        <div>
          <span className="eyebrow">Karriere</span>
          <h2>Wir suchen Verstärkung – an mehreren Stellen.</h2>
          <p className="lead small-lead">
            Lumina Spitex wächst, weil Menschen uns bereits vertrauen. Damit
            wir diesen Zuspruch halten und mehr Familien begleiten können,
            suchen wir Pflegefachfrauen und Pflegefachmänner EFZ sowie
            diplomierte Fachpersonen in Zürich und Aargau.
          </p>
        </div>
        <div>
          <article>
            <span>60–100% · Zürich & Aargau</span>
            <h3>Pflegefachfrau / Pflegefachmann EFZ</h3>
            <p>
              Grund- und Behandlungspflege im Alltag, stabile Beziehungen zu
              Klientinnen und enge Zusammenarbeit mit dem Fachteam.
            </p>
            <a href="/bewerbung?rolle=efz">Jetzt bewerben →</a>
          </article>
          <article>
            <span>60–100% · Zürich & Aargau</span>
            <h3>Dipl. Pflegefachperson HF/FH</h3>
            <p>
              Fallführung, Bedarfsabklärung und fachliche Begleitung von
              Kund:innen und Angehörigen.
            </p>
            <a href="/bewerbung?rolle=dipl">Jetzt bewerben →</a>
          </article>
          <article>
            <span>40–100% · Zürich & Aargau</span>
            <h3>Fachperson Gesundheit FaGe</h3>
            <p>
              Professionelle Pflege mit Eigenverantwortung und einer festen
              Beziehung zu Kund:innen.
            </p>
            <a href="/bewerbung?rolle=fage">Jetzt bewerben →</a>
          </article>
        </div>
      </section>

      <LohnJob />
      <PartnersStrip />
      <CTA
        title="Bewerben Sie sich bei Lumina."
        text="Nutzen Sie unser Bewerbungsformular – wir melden uns persönlich."
        href="/bewerbung"
        ctaLabel="Zum Bewerbungsformular"
      />
    </main>
  );
}

function Bewerbung() {
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");
  const [sending, setSending] = useState(false);
  const [rolle, setRolle] = useState("efz");

  useEffect(() => {
    if (typeof window === "undefined") return;
    const q = new URLSearchParams(window.location.search).get("rolle");
    if (q === "dipl" || q === "fage" || q === "efz" || q === "initiativ") {
      setRolle(q);
    }
  }, []);

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSending(true);
    setError("");
    const data = new FormData(e.currentTarget);
    const response = await fetch("/api/leads", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        source: "bewerbung",
        name: `${data.get("first") || ""} ${data.get("last") || ""}`.trim(),
        contact: data.get("contact"),
        topic: `Bewerbung: ${data.get("role")}`,
        message: data.get("message"),
        details: {
          role: data.get("role"),
          pensum: data.get("pensum"),
          region: data.get("region"),
          start: data.get("start"),
        },
        consent: true,
      }),
    });
    setSending(false);
    if (response.ok) setSent(true);
    else
      setError(
        "Das Senden hat nicht geklappt. Bitte mailen Sie an info@lumina-spitex.ch oder rufen Sie 043 433 88 00 an.",
      );
  }

  return (
    <main>
      <section className="contact-hero">
        <div className="wrap">
          <span className="eyebrow">Karriere</span>
          <h1 className="hero-title">
            <span className="hero-title-line">Bewerbung</span>
            <span className="hero-title-line">bei Lumina.</span>
          </h1>
          <p className="lead">
            Eigenes Formular für Bewerbungen – nicht das allgemeine
            Kontaktformular. Wir melden uns persönlich.
          </p>
        </div>
      </section>
      <section className="wrap contact-grid">
        <div className="contact-info">
          <div>
            <Icon>☎</Icon>
            <span>
              <b>Fragen zur Stelle?</b>
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
          <div className="contact-note">
            <b>Lebenslauf</b>
            <p>
              Bitte Lebenslauf und Zeugnisse nach dem Absenden per E-Mail
              nachreichen – oder im Nachrichtenfeld den Link zu Ihrem Profil
              angeben.
            </p>
          </div>
          <div>
            <a className="text-link light" href="/ueber-uns#karriere">
              ← Zurück zu offenen Rollen
            </a>
          </div>
        </div>
        <form className="contact-form" onSubmit={submit}>
          {sent ? (
            <div className="success">
              <Icon>✓</Icon>
              <h2>Danke für Ihre Bewerbung.</h2>
              <p>
                Wir prüfen Ihre Angaben und melden uns so rasch wie möglich.
              </p>
            </div>
          ) : (
            <>
              <span className="eyebrow">Bewerbungsformular</span>
              <h2>Erzählen Sie uns von sich.</h2>
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
                Stelle / Profil
                <select
                  name="role"
                  value={rolle}
                  onChange={(e) => setRolle(e.target.value)}
                >
                  <option value="efz">
                    Pflegefachfrau / Pflegefachmann EFZ
                  </option>
                  <option value="dipl">Dipl. Pflegefachperson HF/FH</option>
                  <option value="fage">Fachperson Gesundheit FaGe</option>
                  <option value="initiativ">Initiativbewerbung</option>
                </select>
              </label>
              <div className="form-row">
                <label>
                  Gewünschtes Pensum
                  <select name="pensum" defaultValue="80">
                    <option value="40-60">40–60%</option>
                    <option value="60-80">60–80%</option>
                    <option value="80-100">80–100%</option>
                    <option value="flexibel">Flexibel</option>
                  </select>
                </label>
                <label>
                  Region
                  <select name="region" defaultValue="beides">
                    <option value="zuerich">Kanton Zürich</option>
                    <option value="aargau">Kanton Aargau</option>
                    <option value="beides">Zürich & Aargau</option>
                  </select>
                </label>
              </div>
              <label>
                Möglicher Start
                <input name="start" placeholder="z. B. ab Oktober 2026" />
              </label>
              <label>
                Motivation & Erfahrung
                <textarea
                  rows={6}
                  required
                  name="message"
                  placeholder="Kurz zu Ausbildung, Erfahrung und warum Lumina zu Ihnen passt."
                />
              </label>
              <label className="check">
                <input type="checkbox" required />{" "}
                <span>
                  Ich bin mit der Bearbeitung meiner Bewerbungsdaten gemäss{" "}
                  <a href="/datenschutz">Datenschutzerklärung</a> einverstanden.
                </span>
              </label>
              {error && <p role="alert">{error}</p>}
              <button className="button" disabled={sending} type="submit">
                {sending ? "Wird gesendet …" : "Bewerbung absenden"}
              </button>
            </>
          )}
        </form>
      </section>
    </main>
  );
}

type ContactIntent = "anrufen" | "rueckruf" | "termin" | "schreiben";

const contactIntents: {
  id: ContactIntent;
  label: string;
  hint: string;
}[] = [
  {
    id: "anrufen",
    label: "Direkt anrufen",
    hint: "Sofort mit uns sprechen",
  },
  {
    id: "rueckruf",
    label: "Rückruf anfordern",
    hint: "Wir rufen Sie zurück",
  },
  {
    id: "termin",
    label: "Termin vereinbaren",
    hint: "Erstgespräch planen",
  },
  {
    id: "schreiben",
    label: "Einfach schreiben",
    hint: "Nachricht hinterlassen",
  },
];

function Contact() {
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");
  const [sending, setSending] = useState(false);
  const [topic, setTopic] = useState("pflege");
  const [intent, setIntent] = useState<ContactIntent>("schreiben");

  useEffect(() => {
    if (typeof window === "undefined") return;
    const params = new URLSearchParams(window.location.search);
    const q = params.get("thema");
    if (
      q === "pflege" ||
      q === "begleitung" ||
      q === "bewerbung" ||
      q === "sonstiges" ||
      q === "mehr-infos"
    ) {
      setTopic(q);
    }
    const aktion = params.get("aktion");
    if (
      aktion === "anrufen" ||
      aktion === "rueckruf" ||
      aktion === "termin" ||
      aktion === "schreiben"
    ) {
      setIntent(aktion);
    } else if (q === "mehr-infos") {
      setIntent("rueckruf");
    } else if (q === "begleitung" || q === "pflege") {
      setIntent("schreiben");
    }
  }, []);

  function chooseIntent(next: ContactIntent) {
    setIntent(next);
    setSent(false);
    setError("");
  }

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (topic === "bewerbung") {
      window.location.href = "/bewerbung";
      return;
    }
    setSending(true);
    setError("");
    const data = new FormData(e.currentTarget);
    const preferred = String(data.get("preferred") || "").trim();
    const messageRaw = String(data.get("message") || "").trim();
    const intentLabel =
      contactIntents.find((item) => item.id === intent)?.label || intent;
    const messageParts = [
      `Anliegen: ${intentLabel}`,
      preferred ? `Wunschzeit / Terminwunsch: ${preferred}` : "",
      messageRaw,
    ].filter(Boolean);

    const response = await fetch("/api/leads", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        source: `kontakt-${intent}`,
        name: `${data.get("first") || ""} ${data.get("last") || ""}`.trim(),
        contact: data.get("contact"),
        topic: data.get("topic"),
        message: messageParts.join("\n\n"),
        details: {
          intent,
          preferred: preferred || null,
        },
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

  const formCopy =
    intent === "rueckruf"
      ? {
          eyebrow: "Rückruf",
          title: "Wann dürfen wir Sie anrufen?",
          submit: "Rückruf anfordern",
          successTitle: "Rückruf angefordert.",
          successText:
            "Danke. Wir melden uns telefonisch so rasch wie möglich bei Ihnen.",
          messageLabel: "Kurznotiz (optional)",
          messageRequired: false,
          preferredLabel: "Wann passt ein Rückruf am besten?",
          preferredRequired: true,
          contactLabel: "Ihre Telefonnummer",
        }
      : intent === "termin"
        ? {
            eyebrow: "Termin",
            title: "Erstgespräch vereinbaren",
            submit: "Terminwunsch senden",
            successTitle: "Terminwunsch erhalten.",
            successText:
              "Danke. Wir prüfen Ihre Wunschzeiten und melden uns zur Bestätigung.",
            messageLabel: "Worum geht es? (optional)",
            messageRequired: false,
            preferredLabel: "Wunschtag oder Zeitraum",
            preferredRequired: true,
            contactLabel: "Telefon oder E-Mail",
          }
        : {
            eyebrow: "Nachricht",
            title: "Schreiben Sie uns einfach",
            submit: "Nachricht senden",
            successTitle: "Danke für Ihre Nachricht.",
            successText:
              "Wir melden uns so rasch wie möglich persönlich bei Ihnen.",
            messageLabel: "Ihre Nachricht",
            messageRequired: true,
            preferredLabel: "",
            preferredRequired: false,
            contactLabel: "Telefon oder E-Mail",
          };

  return (
    <main>
      <section className="contact-hero">
        <div className="wrap">
          <span className="eyebrow">Kontakt</span>
          <h1 className="hero-title">
            <span className="hero-title-line">Wir sind</span>
            <span className="hero-title-line">für Sie da.</span>
          </h1>
          <p className="lead">
            Rufen Sie direkt an, fordern Sie einen Rückruf an, vereinbaren Sie
            einen Termin – oder schreiben Sie uns einfach.
          </p>
        </div>
      </section>
      <section className="wrap contact-grid">
        <div className="contact-info">
          <a className="contact-callout" href="tel:+41434338800">
            <span>Jetzt anrufen</span>
            <b>043 433 88 00</b>
            <small>Mo–Fr, 08:00–17:00 Uhr</small>
          </a>
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

        <div className="contact-panel">
          <div
            className="contact-intents"
            role="tablist"
            aria-label="Wie möchten Sie Kontakt aufnehmen?"
          >
            {contactIntents.map((item) => (
              <button
                key={item.id}
                type="button"
                role="tab"
                aria-selected={intent === item.id}
                className={
                  intent === item.id
                    ? "contact-intent is-active"
                    : "contact-intent"
                }
                onClick={() => chooseIntent(item.id)}
              >
                <b>{item.label}</b>
                <span>{item.hint}</span>
              </button>
            ))}
          </div>

          {intent === "anrufen" ? (
            <div className="contact-call-panel">
              <span className="eyebrow">Direkt anrufen</span>
              <h2>Ein Anruf genügt.</h2>
              <p>
                Sprechen Sie jetzt mit dem Lumina-Team – unverbindlich und
                persönlich. Ausserhalb der Bürozeiten hinterlassen Sie bitte
                eine Nachricht oder fordern Sie einen Rückruf an.
              </p>
              <a className="button gold" href="tel:+41434338800">
                043 433 88 00 anrufen
              </a>
              <button
                type="button"
                className="text-link"
                onClick={() => chooseIntent("rueckruf")}
              >
                Lieber Rückruf anfordern →
              </button>
            </div>
          ) : (
            <form className="contact-form" onSubmit={submit}>
              {sent ? (
                <div className="success">
                  <Icon>✓</Icon>
                  <h2>{formCopy.successTitle}</h2>
                  <p>{formCopy.successText}</p>
                  <button
                    type="button"
                    className="text-link"
                    onClick={() => {
                      setSent(false);
                      setIntent("schreiben");
                    }}
                  >
                    Weitere Nachricht schreiben →
                  </button>
                </div>
              ) : (
                <>
                  <span className="eyebrow">{formCopy.eyebrow}</span>
                  <h2>{formCopy.title}</h2>
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
                    {formCopy.contactLabel}
                    <input
                      required
                      name="contact"
                      type={intent === "rueckruf" ? "tel" : "text"}
                      autoComplete={
                        intent === "rueckruf" ? "tel" : "email"
                      }
                    />
                  </label>
                  <label>
                    Ich interessiere mich für
                    <select
                      name="topic"
                      value={topic}
                      onChange={(e) => setTopic(e.target.value)}
                    >
                      <option value="pflege">Pflege</option>
                      <option value="begleitung">Begleitung</option>
                      <option value="mehr-infos">Mehr Infos anfordern</option>
                      <option value="bewerbung">Bewerbung</option>
                      <option value="sonstiges">Sonstiges</option>
                    </select>
                  </label>
                  {topic === "bewerbung" ? (
                    <p className="form-hint">
                      Für Bewerbungen öffnet sich nach dem Absenden das{" "}
                      <a href="/bewerbung">Bewerbungsformular</a>.
                    </p>
                  ) : topic === "mehr-infos" ? (
                    <p className="form-hint">
                      Wir rufen Sie zurück und beantworten Ihre Fragen zu den
                      Spitex-Leistungen persönlich.
                    </p>
                  ) : null}
                  {formCopy.preferredLabel ? (
                    <label>
                      {formCopy.preferredLabel}
                      <input
                        name="preferred"
                        required={formCopy.preferredRequired}
                        placeholder={
                          intent === "termin"
                            ? "z. B. Dienstag Vormittag oder 12.08. nach 14 Uhr"
                            : "z. B. heute Nachmittag oder morgen Vormittag"
                        }
                      />
                    </label>
                  ) : null}
                  <label>
                    {formCopy.messageLabel}
                    <textarea
                      rows={intent === "schreiben" ? 5 : 3}
                      required={formCopy.messageRequired}
                      name="message"
                    />
                  </label>
                  <label className="check">
                    <input type="checkbox" required />{" "}
                    <span>
                      Ich bin mit der Bearbeitung meiner Angaben gemäss{" "}
                      <a href="/datenschutz">Datenschutzerklärung</a>{" "}
                      einverstanden.
                    </span>
                  </label>
                  {error && <p role="alert">{error}</p>}
                  <button className="button" disabled={sending} type="submit">
                    {sending ? "Wird gesendet …" : formCopy.submit}
                  </button>
                </>
              )}
            </form>
          )}
        </div>
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
            {article.audioSrc ? (
              <ListenPlayer
                audioSrc={article.audioSrc}
                articleLabel={article.title}
              />
            ) : null}
            <div className="article-meta">
              <span>{article.read} Lesezeit</span>
              <span>Aktualisiert {article.updated}</span>
              <span>Schweiz · Zürich & Aargau</span>
            </div>
          </header>
          <div className="article-detail-visual">
            <img src={article.image} alt={article.imageAlt} />
          </div>
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
          <h1 className="hero-title">
            <span className="hero-title-line">Wissen gibt</span>
            <span className="hero-title-line">Sicherheit.</span>
          </h1>
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
      <a className="quiz-brand brand brand-on-dark" href="/" aria-label="Lumina Spitex Startseite">
        <BrandLockup height={56} light />
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
    case "bewerbung":
      page = <Bewerbung />;
      break;
    case "ratgeber":
      page = <Ratgeber articleSlug={articleSlug} />;
      break;
    case "lohn-check":
      return (
        <>
          <PWARegister />
          <LohnCheck />
          <CookieBanner />
        </>
      );
    case "anspruchscheck":
      return (
        <>
          <PWARegister />
          <Anspruchscheck />
          <CookieBanner />
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
      <CookieBanner />
      <div className="mobile-bar">
        <a href="tel:+41434338800">Anrufen</a>
        <a href="/kontakt">Kontakt</a>
      </div>
    </>
  );
}
