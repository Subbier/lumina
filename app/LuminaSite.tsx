"use client";

import {
  FormEvent,
  ReactNode,
  useEffect,
  useState,
} from "react";
import { articles, getArticle, type Article } from "./ratgeber/articles";
import { ServiceSegmentPage, PartnersStrip } from "./dienstleistungen/ServiceSegmentPage";
import { tarifeKlv, tarifeUvg } from "./dienstleistungen/content";
import { ListenPlayer } from "./listen/ListenPlayer";
import { CookieBanner } from "./CookieBanner";
import { LohnCheckQuiz } from "./lohn-check/LohnCheckQuiz";
import { PictImg } from "./components/PictImg";
import { AppMenuSheet, AppTabBar, PWARegister } from "./components/AppShell";
import { haptic } from "./components/haptic";

function BrandLockup({
  height = 84,
  light = false,
  lazy = false,
}: {
  height?: number;
  light?: boolean;
  lazy?: boolean;
}) {
  const width = Math.round(height * (987 / 360));
  const src = light
    ? "/images/logo-lumina-lockup-light.png?v=brand1"
    : "/images/logo-lumina-lockup.png?v=brand1";
  return (
    <PictImg
      className="brand-logo"
      src={src}
      alt="Lumina Spitex"
      width={width}
      height={height}
      loading={lazy ? "lazy" : "eager"}
      decoding="async"
      sizes={`${width}px`}
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
  | "datenschutz"
  | "agb"
  | "redaktion";

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

function Header({
  menuOpen,
  onMenuToggle,
}: {
  menuOpen: boolean;
  onMenuToggle: () => void;
}) {
  const [aboutOpen, setAboutOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    if (!aboutOpen) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setAboutOpen(false);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [aboutOpen]);

  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 24);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  return (
    <>
      <a className="skip-link" href="#main-content">
        Zum Inhalt springen
      </a>
      <div className="utility">
        <div className="wrap utility-inner">
          <span>Vom Kanton bewilligt · Krankenkassen anerkannt</span>
          <a href="tel:+41434338800" aria-label="Telefon 043 433 88 00">
            043 433 88 00
          </a>
        </div>
      </div>
      <header className={`header${scrolled ? " is-compact" : ""}`}>
        <div className="wrap nav-wrap">
          <a className="brand" href="/" aria-label="Lumina Spitex Startseite">
            <BrandLockup height={84} />
            <span className="sr-only">Lumina Spitex</span>
          </a>
          <button
            className={`menu-btn${menuOpen ? " is-open" : ""}`}
            onClick={() => {
              haptic();
              onMenuToggle();
            }}
            aria-expanded={menuOpen}
            aria-controls="app-menu-sheet"
            aria-label={menuOpen ? "Menü schliessen" : "Menü öffnen"}
          >
            <span className="menu-btn-bars" aria-hidden="true">
              <i />
              <i />
              <i />
            </span>
          </button>
          <nav id="main-nav" className="nav" aria-label="Hauptnavigation">
            <a href="/">Home</a>
            <a href="/spitex">Spitex</a>
            <a href="/angehoerige">Pflegende Angehörige</a>
            <a href="/begleitung">Begleitung</a>

            <div
              className={`nav-dropdown ${aboutOpen ? "open" : ""}`}
              onMouseEnter={() => setAboutOpen(true)}
              onMouseLeave={() => setAboutOpen(false)}
            >
              <a
                href="/ueber-uns"
                className="nav-dropdown-trigger"
                id="nav-about-trigger"
                aria-expanded={aboutOpen}
                aria-haspopup="menu"
                aria-controls="nav-about-menu"
                onClick={() => {
                  setAboutOpen(false);
                }}
                onFocus={() => setAboutOpen(true)}
              >
                Über uns
              </a>
              <div
                id="nav-about-menu"
                className="nav-dropdown-panel"
                role="menu"
                aria-labelledby="nav-about-trigger"
              >
                <div className="nav-dropdown-panel-inner">
                  <a
                    href="/ueber-uns"
                    role="menuitem"
                    onClick={() => setAboutOpen(false)}
                  >
                    Über uns
                  </a>
                  <a
                    href="/tarife"
                    role="menuitem"
                    onClick={() => setAboutOpen(false)}
                  >
                    Tarife
                  </a>
                  <a
                    href="/ratgeber"
                    role="menuitem"
                    onClick={() => setAboutOpen(false)}
                  >
                    Ratgeber
                  </a>
                  <a
                    href="/bewerbung"
                    role="menuitem"
                    onClick={() => setAboutOpen(false)}
                  >
                    Bewerbung
                  </a>
                  <a
                    href="/redaktion"
                    role="menuitem"
                    onClick={() => setAboutOpen(false)}
                  >
                    Redaktion
                  </a>
                </div>
              </div>
            </div>

            <a href="/kontakt">Kontakt</a>
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
            <BrandLockup height={72} light lazy />
            <span className="sr-only">Lumina Spitex</span>
          </a>
          <p>
            Persönliche Pflege zu Hause und faire Anstellung für pflegende
            Angehörige in Zürich und Aargau.
          </p>
          <address className="footer-contact">
            Rütistrasse 18, 8952 Schlieren
            <br />
            <a href="tel:+41434338800" aria-label="Telefon 043 433 88 00">
              043 433 88 00
            </a>{" "}
            ·{" "}
            <a href="mailto:info@lumina-spitex.ch">info@lumina-spitex.ch</a>
          </address>
        </div>
        <nav aria-label="Dienstleistungen">
          <h3>Dienstleistungen</h3>
          <a href="/spitex">Spitex</a>
          <a href="/angehoerige">Pflegende Angehörige</a>
          <a href="/begleitung">Begleitung</a>
        </nav>
        <nav aria-label="Über uns und Service">
          <h3>Über uns</h3>
          <a href="/ueber-uns">Über uns</a>
          <a href="/tarife">Tarife</a>
          <a href="/ratgeber">Ratgeber</a>
          <a href="/bewerbung">Bewerbung</a>
          <a href="/kontakt">Kontakt</a>
          <a href="/redaktion">Redaktion</a>
        </nav>
        <div>
          <h3>Für Sie da</h3>
          <p>Mo–Fr, 08:00–17:00 Uhr</p>
          <a className="button gold" href="/anspruchscheck">
            Lohn schätzen
          </a>
        </div>
      </div>
      <div className="wrap legal">
        <span>
          © 2026 Lumina Spitex AG · Webdesign & technische Umsetzung:{" "}
          <a href="https://agenticit.ch/" target="_blank" rel="noopener noreferrer">
            AgenticIT
          </a>
        </span>
        <span>
          <a href="/impressum">Impressum</a>
          <a href="/datenschutz">Datenschutz</a>
          <a href="/agb">AGB</a>
          <a href="/redaktion">Redaktionsrichtlinien</a>
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
    <main id="main-content">
      <section className="hero wrap mobile-lean">
        <div className="hero-copy">
          <span className="eyebrow">Lumina Spitex · Zürich & Aargau</span>
          <h1 className="hero-title">
            <span className="hero-title-line">Professionelle </span>
            <span className="hero-title-line">
              Pflege <em>zu Hause.</em>
            </span>
          </h1>
          <p className="lead">
            Verlässliche Pflege mit festen Bezugspersonen. Persönlich geplant,
            direkt mit der Krankenkasse abgerechnet.
          </p>
          <div className="actions">
            <a className="button" href="/kontakt?aktion=rueckruf">
              Kostenlos beraten lassen
            </a>
            <a className="text-link" href="/spitex">
              Leistungen ansehen →
            </a>
          </div>
          <TrustStrip />
        </div>
        <div className="hero-visual">
          <PictImg
            src="/images/home-hero.jpg?v=sq3"
            alt="Pflegefachperson plant Medikamente mit Angehörigen zu Hause"
            width={558}
            height={558}
            fetchPriority="high"
            decoding="async"
            sizes="(max-width: 980px) 100vw, 520px"
          />
        </div>
      </section>

      <section className="path-section" id="aida-angebote">
        <div className="wrap">
          <div className="section-head">
            <span className="eyebrow">Unsere Dienstleistungen</span>
            <h2>Die passende Unterstützung für Ihre Situation.</h2>
            <p className="section-lead">
              Pflege, Lohn für Angehörige oder Begleitung im Alltag – wir
              klären gemeinsam, was wirklich passt.
            </p>
          </div>
          <div className="paths aida-paths">
            <article className="path-card">
              <Icon>01</Icon>
              <span>Spitex-Dienstleistungen</span>
              <h3>Pflege, die die Krankenkasse mitträgt</h3>
              <p>
                Abklärung, Grundpflege, Behandlungspflege. Ärztlich verordnet.
                Professionell zu Hause.
              </p>
              <a href="/spitex">Spitex ansehen →</a>
            </article>
            <article className="path-card">
              <Icon>02</Icon>
              <span>Pflegende Angehörige</span>
              <h3>Sofort anstellen. Lohn für Ihre Pflege.</h3>
              <p>
                Sie pflegen schon. Wir stellen an. Ausbildung Pflegende
                Angehörige SRK innert zwölf Monaten. Kosten trägt Lumina.
              </p>
              <a href="/angehoerige#anspruch-pruefen">Lohn schätzen →</a>
            </article>
            <article className="path-card premium">
              <Icon>03</Icon>
              <span>Begleitung</span>
              <h3>Erledigungen, Termine, Teilhabe</h3>
              <p>
                Hilfe über die Grundpflege hinaus. Für einen angenehmen,
                selbstbestimmten Alltag.
              </p>
              <a href="/begleitung">Begleitung entdecken →</a>
            </article>
          </div>
          <p className="paths-note">
            Sie pflegen bereits jemanden? Der Lohnrechner liefert in zwei
            Minuten eine erste Orientierung.
          </p>
        </div>
      </section>

      <LohnCheckQuiz embedded source="home-lohn" sectionId="anspruch-pruefen" />

      <section className="wrap aida-block">
        <div className="aida-copy">
          <span className="eyebrow">01 · Spitex</span>
          <h2>Pflege mit fester Bezugsperson. Klare Abrechnung.</h2>
          <p className="aida-lead">
            Wir starten mit einer Bedarfsabklärung. Danach begleiten feste
            Fachpersonen Ihren Alltag. Wirksam. Zweckmässig. Wirtschaftlich.
            Genau so, wie es anerkannte Spitex-Organisationen in der Schweiz
            machen.
          </p>
          <ul className="aida-points">
            <li>Bedarfsabklärung mit fester Bezugsperson</li>
            <li>Grundpflege sowie Behandlungspflege zu Hause</li>
            <li>Abrechnung über die Krankenkasse (KVG)</li>
          </ul>
          <a className="button outline" href="/spitex">
            Alle Spitex-Leistungen →
          </a>
        </div>
        <PictImg
          className="aida-image"
          src="/images/home-spitex.webp"
          alt="Diplomierte Pflegefachperson misst Blutdruck zu Hause"
          width={1536}
          height={1024}
          decoding="async"
          sizes="(max-width: 980px) 100vw, 560px"
        />
      </section>

      <section className="wrap aida-block reverse">
        <div className="aida-copy">
          <span className="eyebrow">02 · Pflegende Angehörige</span>
          <h2>Sie pflegen schon. Wir zahlen dafür.</h2>
          <p className="aida-lead">
            Sofortige Anstellung mit Lohn. Die Ausbildung folgt. Innert zwölf
            Monaten: Lehrgang Pflegende Angehörige SRK. Lumina organisiert.
            Lumina finanziert.
          </p>
          <ul className="aida-points">
            <li>Sofort anstellen – ohne Kursabschluss zuerst</li>
            <li>Lohn plus Sozialversicherung ab Tag eins</li>
            <li>SRK-Ausbildung innert zwölf Monaten – Kosten bei uns</li>
          </ul>
          <a className="text-link" href="#anspruch-pruefen">
            In zwei Minuten eine erste Lohnzahl sehen →
          </a>
        </div>
        <PictImg
          className="aida-image"
          src="/images/angehoerige-hero-anleitung.jpg?v=sq3"
          alt="Pflegefachperson zeigt Angehörigen, wie sie den Vater stützen"
          width={558}
          height={558}
          loading="lazy"
          decoding="async"
          sizes="(max-width: 980px) 100vw, 560px"
        />
      </section>

      <section className="wrap aida-block">
        <div className="aida-copy">
          <span className="eyebrow">03 · Begleitung</span>
          <h2>Wenn Alltag wieder angenehm werden soll.</h2>
          <p className="aida-lead">
            Begleitung geht über die Grundpflege hinaus. Erledigungen. Termine.
            Soziale Teilhabe. So bleibt Selbstbestimmung spürbar.
          </p>
          <ul className="aida-points">
            <li>Unterstützung bei Erledigungen im Alltag</li>
            <li>Sichere Begleitung zu Terminen</li>
            <li>Soziale Teilhabe – passend zu Ihrem Rhythmus</li>
          </ul>
          <a className="button outline" href="/begleitung">
            Begleitung ansehen →
          </a>
        </div>
        <PictImg
          className="aida-image"
          src="/images/home-services.webp"
          alt="Begleitung einer älteren Dame im Freien"
          width={1536}
          height={1024}
          loading="lazy"
          decoding="async"
          sizes="(max-width: 980px) 100vw, 560px"
        />
      </section>

      <section className="wrap relation-banner recruit-banner">
        <div>
          <span className="eyebrow light">Team · Wachstum mit Vertrauen</span>
          <h2>
            Wir suchen{" "}
            <br />
            mehrere Fachkräfte.
          </h2>
          <MoreRead
            summary={
              <p>
                Immer mehr Menschen vertrauen dem Lumina-Team. Deshalb wachsen
                wir. Wir suchen Verstärkung an mehreren Stellen.
              </p>
            }
          >
            <p>
              Gesucht sind Pflegefachpersonen EFZ, diplomierte Pflegefachpersonen
              (HF/FH) sowie Fachpersonen Gesundheit. Verantwortung übernehmen.
              Familien anleiten. Qualität sichern. Faire Anstellung. Klare
              Prozesse. Ein erfahrenes Team mit Haltung.
            </p>
          </MoreRead>
          <a className="text-link light" href="/ueber-uns#karriere">
            Offene Rollen ansehen →
          </a>
        </div>
        <PictImg
          src="/images/home-team.webp"
          alt="Pflegefachpersonen von Lumina Spitex"
          width={1536}
          height={1024}
          loading="lazy"
          decoding="async"
          sizes="(max-width: 980px) 100vw, 560px"
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
      <CTA
        text="Ein kurzes Gespräch schafft Klarheit. Kostenlos. Persönlich. Ohne Verpflichtung."
      />
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
    <main id="main-content">
      <section className="subhero dark">
        <div className="wrap subhero-grid">
          <div>
            <span className="eyebrow light">Über uns · Tarife</span>
            <h1 className="hero-title">
              <span className="hero-title-line">
                Transparente Tarife nach KLV und UVG.
              </span>
            </h1>
            <p className="lead">
              Pflegeleistungen nach KLV und UVG sowie private Leistungen –
              klar aufgeschlüsselt und verständlich erklärt.
            </p>
            <a className="button hero-button" href="/kontakt?thema=pflege">
              Tariffrage klären
            </a>
          </div>
          <PictImg
            src="/images/home-spitex.webp"
            alt="Transparente Spitex-Tarife und Beratung"
            width={1536}
            height={1024}
            sizes="(max-width: 980px) 100vw, 560px"
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
                  <td data-label="Leistung">{row.leistung}</td>
                  <td data-label="Kostenübernahme">{row.traeger}</td>
                  <td data-label="Tarif (CHF/Std.)">{row.tarif}</td>
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
                  <td data-label="Leistung">{row.leistung}</td>
                  <td data-label="Kostenübernahme">{row.traeger}</td>
                  <td data-label="Tarif (CHF/Std.)">{row.tarif}</td>
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
                <td data-label="Leistung">Hauswirtschaftliche Leistungen</td>
                <td data-label="Kostenübernahme">Klient / Zusatzversicherung</td>
                <td data-label="Tarif (CHF/Std.)">55.00</td>
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
              rel="noopener noreferrer"
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
              rel="noopener noreferrer"
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
              rel="noopener noreferrer"
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
              rel="noopener noreferrer"
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
    <main id="main-content">
      <section className="subhero dark">
        <div className="wrap subhero-grid">
          <div>
            <span className="eyebrow light">Über uns</span>
            <h1 className="hero-title">
              <span className="hero-title-line">Pflegekompetenz, die</span>
              <span className="hero-title-line">
                <em>Nähe schafft.</em>
              </span>
            </h1>
            <p className="lead">
              Wir verbinden fundierte Pflegefachlichkeit mit festen
              Bezugspersonen und klaren Abläufen. So erhalten Menschen in
              Zürich und Aargau verlässliche Unterstützung, die ihre
              Selbstbestimmung stärkt.
            </p>
            <p>
              Mehr als 50 Jahre gemeinsame Berufserfahrung prägen unsere
              Arbeit. Wir hören zu, übernehmen Verantwortung und koordinieren
              Pflege so, dass Familien im Alltag spürbar entlastet werden.
            </p>
            <div className="actions">
              <a className="button gold" href="#qualitaet">
                Unser Qualitätsverständnis
              </a>
              <a className="text-link light" href="/bewerbung">
                Team verstärken →
              </a>
            </div>
          </div>
          <PictImg
            src="/images/about-team-meeting.webp"
            alt="Das Lumina-Team bespricht gemeinsam die Betreuung von Klientinnen und Klienten"
            width={1536}
            height={1024}
            loading="lazy"
            decoding="async"
            sizes="(max-width: 980px) 100vw, 560px"
            responsive={false}
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
      <section className="quality" id="qualitaet">
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
      window.requestAnimationFrame(() => setRolle(q));
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
    <main id="main-content">
      <section className="contact-hero">
        <div className="wrap">
          <span className="eyebrow">Karriere</span>
          <h1>Pflege mit Persönlichkeit.</h1>
          <p className="lead">
            Wir suchen Pflegefachpersonen für Zürich und Aargau. Senden Sie uns
            Ihre wichtigsten Angaben – den Rest klären wir persönlich.
          </p>
        </div>
      </section>
      <section className="wrap contact-grid">
        <div className="contact-info">
          <div>
            <Icon>☎</Icon>
            <span>
              <span className="contact-label">Fragen zur Stelle?</span>
              <a href="tel:+41434338800">043 433 88 00</a>
            </span>
          </div>
          <div>
            <Icon>✉</Icon>
            <span>
              <span className="contact-label">E-Mail</span>
              <a href="mailto:info@lumina-spitex.ch">info@lumina-spitex.ch</a>
            </span>
          </div>
          <div className="contact-note">
            <span className="contact-label">Schnellbewerbung</span>
            <p>
              Für den ersten Kontakt genügen Ihre Angaben. Lebenslauf und
              Zeugnisse können Sie später nachreichen.
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
              <h2>In zwei Minuten bewerben.</h2>
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
                Kurz zu Ihnen <span className="optional">(optional)</span>
                <textarea
                  rows={4}
                  name="message"
                  placeholder="Ausbildung, Erfahrung oder möglicher Start"
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

function Contact() {
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");
  const [sending, setSending] = useState(false);
  const [topic, setTopic] = useState("pflege");

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
      window.requestAnimationFrame(() => setTopic(q));
    }
  }, []);

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (topic === "bewerbung") {
      window.location.href = "/bewerbung";
      return;
    }
    setSending(true);
    setError("");
    const data = new FormData(e.currentTarget);
    const response = await fetch("/api/leads", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        source: "kontakt-rueckruf",
        name: data.get("name"),
        contact: data.get("contact"),
        topic: data.get("topic"),
        message: data.get("message"),
        details: {},
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
    <main id="main-content">
      <section className="contact-hero">
        <div className="wrap">
          <span className="eyebrow">Kontakt</span>
          <h1>Wie können wir Ihnen helfen?</h1>
          <p className="lead">
            Rufen Sie uns an oder hinterlassen Sie Ihre Kontaktdaten. Wir hören
            zu und melden uns persönlich – kostenlos und unverbindlich.
          </p>
        </div>
      </section>
      <section className="wrap contact-grid">
        <div className="contact-info">
          <a className="contact-callout" href="tel:+41434338800">
            <span>Jetzt anrufen</span>
            <strong>043 433 88 00</strong>
            <small>Mo–Fr, 08:00–17:00 Uhr</small>
          </a>
          <div>
            <Icon>✉</Icon>
            <span>
              <span className="contact-label">E-Mail</span>
              <a href="mailto:info@lumina-spitex.ch">info@lumina-spitex.ch</a>
            </span>
          </div>
          <div>
            <Icon>⌂</Icon>
            <span>
              <span className="contact-label">Adresse</span>
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
              <span className="contact-label">Bürozeiten</span>
              <p>
                Montag–Freitag
                <br />
                08:00–17:00 Uhr
              </p>
            </span>
          </div>
          <div className="contact-note">
            <span className="contact-label">Dringender Pflegebedarf?</span>
            <p>
              Rufen Sie uns direkt an. Bei medizinischen Notfällen wählen Sie
              144.
            </p>
          </div>
        </div>

        <div className="contact-panel">
          <form className="contact-form contact-form-simple" onSubmit={submit}>
              {sent ? (
                <div className="success">
                  <Icon>✓</Icon>
                  <h2>Danke. Wir melden uns.</h2>
                  <p>Eine Fachperson nimmt so rasch wie möglich Kontakt auf.</p>
                  <button
                    type="button"
                    className="text-link"
                    onClick={() => setSent(false)}
                  >
                    Neue Anfrage erfassen →
                  </button>
                </div>
              ) : (
                <>
                  <span className="eyebrow">Rückruf anfordern</span>
                  <h2>Drei Angaben genügen.</h2>
                  <p className="form-intro">
                    Keine langen Formulare. Sagen Sie uns kurz, worum es geht.
                  </p>
                  <label>
                    Ihr Name
                    <input required name="name" autoComplete="name" />
                  </label>
                  <label>
                    Telefon oder E-Mail
                    <input
                      required
                      name="contact"
                      autoComplete="tel"
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
                  <label>
                    Ihre Frage <span className="optional">(optional)</span>
                    <textarea
                      rows={3}
                      name="message"
                      placeholder="Zum Beispiel: Pflege für meine Mutter in Dietikon"
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
                    {sending ? "Wird gesendet …" : "Rückruf anfordern"}
                  </button>
                </>
              )}
          </form>
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
      <div className="article-media">
        <a href={`/ratgeber/${a.slug}`} aria-label={`${a.title} lesen`}>
          <PictImg
            src={a.image}
            alt={a.imageAlt}
            width={640}
            height={400}
            loading="lazy"
            decoding="async"
            sizes="(max-width: 640px) 100vw, 360px"
          />
        </a>
        <span className={`article-art-label art-${i % 3}`}>
          {i % 3 === 0
            ? "Wissen schafft Klarheit."
            : i % 3 === 1
              ? "Gute Pflege beginnt beim Zuhören."
              : "Entlastung ist Teil der Fürsorge."}
        </span>
      </div>
      <div>
        <span className="tag">{a.tag}</span>
        <h3>{a.title}</h3>
        <p>{a.text}</p>
        <small>{a.read} Lesezeit</small>
        <a href={`/ratgeber/${a.slug}`}>
          {a.title} →
        </a>
      </div>
    </article>
  );
}

function ArticleDetail({ article }: { article: Article }) {
  const related = articles.filter((a) => a.slug !== article.slug).slice(0, 3);
  return (
    <main id="main-content">
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
            <PictImg
              src={article.image}
              alt={article.imageAlt}
              width={1200}
              height={675}
              sizes="(max-width: 980px) 100vw, 900px"
              responsive={false}
            />
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
      <main id="main-content">
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
    <main id="main-content">
      <section className="blog-hero">
        <div className="wrap">
          <span className="eyebrow light">Lumina Ratgeber</span>
          <h1 className="hero-title">
            <span className="hero-title-line">Ratgeber: Wissen gibt</span>
            <span className="hero-title-line">Sicherheit.</span>
          </h1>
          <p className="lead">
            Verständliche Antworten zu Pflege, Lohn, Finanzierung und
            Familienalltag – für die Schweiz recherchiert und fachlich geprüft.
          </p>
          <a className="button gold" href="/anspruchscheck">
            Lohn in 2 Minuten schätzen
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
          Lohn schätzen
        </a>
      </section>
      <CTA />
    </main>
  );
}

function LohnCheck() {
  return (
    <main id="main-content">
      <section className="subhero warm">
        <div className="wrap">
          <span className="eyebrow">Lohnrechner</span>
          <h1>Lohn-Check für pflegende Angehörige</h1>
          <p className="lead">
            Erste Brutto-Orientierung in Franken – unverbindlich, ohne Login.
          </p>
        </div>
      </section>
      <LohnCheckQuiz embedded source="lohn-check" sectionId="lohn-rechner" />
    </main>
  );
}

function Anspruchscheck() {
  return (
    <main id="main-content">
      <section className="subhero warm">
        <div className="wrap">
          <span className="eyebrow">Lohnrechner</span>
          <h1>Anspruch prüfen für pflegende Angehörige</h1>
          <p className="lead">
            In wenigen Schritten eine erste Brutto-Orientierung in Franken.
          </p>
        </div>
      </section>
      <LohnCheckQuiz
        embedded
        source="anspruchscheck"
        sectionId="anspruch-pruefen"
      />
    </main>
  );
}

function Legal({
  privacy = false,
  agb = false,
  redaktion = false,
}: {
  privacy?: boolean;
  agb?: boolean;
  redaktion?: boolean;
}) {
  if (agb) {
    return (
      <main id="main-content">
        <section className="legal-hero">
          <div className="wrap">
            <span className="eyebrow">Rechtliches</span>
            <h1>Allgemeine Geschäftsbedingungen für Pflege</h1>
            <p>
              <time dateTime="2026-08-12">Stand: 12. August 2026</time>
            </p>
          </div>
        </section>
        <section className="wrap legal-copy">
          <h2>1. Geltungsbereich</h2>
          <p>
            Diese Allgemeinen Geschäftsbedingungen gelten für Spitex-Leistungen,
            Begleitung sowie die Anstellung pflegender Angehöriger der Lumina
            Spitex AG, Schlieren.
          </p>
          <h2>2. Leistungen</h2>
          <p>
            Wir erbringen Pflege nach ärztlicher Verordnung. Wir stellen
            Angehörige an, wenn die Lage passt. Digitale Checks sind nur eine
            Orientierung. Sie ersetzen keine Fachabklärung.
          </p>
          <h2>3. Verträge</h2>
          <p>
            Pflege- oder Anstellungsverträge entstehen schriftlich. Preise für
            kassenpflichtige Leistungen folgen den geltenden Tarifen. Private
            Zusatzleistungen vereinbaren wir vorab.
          </p>
          <h2>4. Datenschutz</h2>
          <p>
            Personendaten bearbeiten wir gemäss unserer{" "}
            <a href="/datenschutz">Datenschutzerklärung</a>.
          </p>
          <h2>5. Haftung</h2>
          <p>
            Wir haften nach den gesetzlichen Regeln. Für Inhalte auf der Website
            übernehmen wir keine Garantie auf Vollständigkeit.
          </p>
          <h2>6. Kontakt</h2>
          <p>
            Lumina Spitex AG, Rütistrasse 18, 8952 Schlieren · 043 433 88 00 ·
            info@lumina-spitex.ch
          </p>
        </section>
      </main>
    );
  }

  if (redaktion) {
    return (
      <main id="main-content">
        <section className="legal-hero">
          <div className="wrap">
            <span className="eyebrow">Transparenz</span>
            <h1>Redaktion: so prüfen wir Texte</h1>
            <p>
              <time dateTime="2026-08-12">Stand: 12. August 2026</time>
            </p>
          </div>
        </section>
        <section className="wrap legal-copy">
          <p>
            Diese Seite beschreibt den redaktionellen Prüfprozess für Ratgeber
            und Website-Texte: Fachprüfung, Quellen und jährliche Aktualisierung
            – unabhängig von Produktseiten zur Pflege zu Hause.
          </p>
          <p className="byline">
            <span>Herausgeberin: Lumina Spitex AG</span>
            <span>Fachliche Verantwortung: diplomierte Pflegefachpersonen</span>
          </p>
          <h2>Zweck</h2>
          <p>
            Unsere Texte helfen Familien bei Pflege zu Hause. Sie erklären
            Abläufe, Finanzierung und Anstellung. Sie sind Orientierung. Keine
            Rechtsberatung. Keine medizinische Einzelfall-Auskunft.
          </p>
          <h2>Fachliche Grundlage</h2>
          <p>
            Inhalte prüfen Pflegefachpersonen HF/FH. Quellen sind unter anderem
            KVG/KLV, AHV/IV-Merkblätter sowie kantonale Vorgaben. Beträge und
            Regeln können sich ändern.
          </p>
          <h2>Aktualisierung</h2>
          <p>
            Wir prüfen Ratgeber-Beiträge mindestens jährlich. Das Datum steht
            auf der Seite. Fehler melden Sie bitte an info@lumina-spitex.ch.
          </p>
          <h2>Interesse</h2>
          <p>
            Lumina Spitex AG erbringt Spitex-Leistungen. Wir kennzeichnen
            Angebote klar. Unabhängige Behörden bleiben die massgebende Stelle
            für Entscheide.
          </p>
        </section>
      </main>
    );
  }

  return (
    <main id="main-content">
      <section className="legal-hero">
        <div className="wrap">
          <span className="eyebrow">Rechtliches</span>
          <h1>
            {privacy
              ? "Datenschutzerklärung dieser Website"
              : "Impressum der Lumina Spitex AG"}
          </h1>
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
              Website-Konzeption und technische Umsetzung:{" "}
              <a href="https://agenticit.ch/" target="_blank" rel="noopener noreferrer">
                AgenticIT
              </a>
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
            <div className="legal-overview">
              <article>
                <h2>Anbieterin</h2>
                <address>
                  Lumina Spitex AG<br />
                  Rütistrasse 18<br />
                  8952 Schlieren<br />
                  Schweiz
                </address>
              </article>
              <article>
                <h2>Kontakt</h2>
                <p>
                  <a href="tel:+41434338800">043 433 88 00</a><br />
                  <a href="mailto:info@lumina-spitex.ch">info@lumina-spitex.ch</a>
                </p>
              </article>
              <article>
                <h2>Vertretung</h2>
                <p>Geschäftsleitung der Lumina Spitex AG</p>
              </article>
              <article>
                <h2>Handelsregister</h2>
                <p>Handelsregisteramt des Kantons Zürich</p>
              </article>
            </div>
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
            <h2>Website</h2>
            <p>
              Konzeption, Gestaltung und technische Umsetzung:{" "}
              <a href="https://agenticit.ch/" target="_blank" rel="noopener noreferrer">
                AgenticIT
              </a>. Für die Inhalte und Pflegeinformationen ist die Lumina
              Spitex AG verantwortlich.
            </p>
          </>
        )}
      </section>
    </main>
  );
}

export function LuminaSite({
  view,
  articleSlug,
}: {
  view: View;
  articleSlug?: string;
}) {
  const [menuOpen, setMenuOpen] = useState(false);

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
      page = <LohnCheck />;
      break;
    case "anspruchscheck":
      page = <Anspruchscheck />;
      break;
    case "impressum":
      page = <Legal />;
      break;
    case "datenschutz":
      page = <Legal privacy />;
      break;
    case "agb":
      page = <Legal agb />;
      break;
    case "redaktion":
      page = <Legal redaktion />;
      break;
    default:
      page = <Home />;
  }

  return (
    <>
      <PWARegister />
      <Header
        menuOpen={menuOpen}
        onMenuToggle={() => setMenuOpen((open) => !open)}
      />
      <div key={view} className="app-page">
        {page}
      </div>
      <Footer />
      <CookieBanner />
      <AppTabBar
        view={view}
        menuOpen={menuOpen}
        onMore={() => setMenuOpen(true)}
      />
      <AppMenuSheet open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}
