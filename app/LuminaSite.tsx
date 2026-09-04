"use client";

import {
  CSSProperties,
  FormEvent,
  ReactNode,
  useEffect,
  useState,
} from "react";
import dynamic from "next/dynamic";
import { ServiceSegmentPage, PartnersStrip } from "./dienstleistungen/ServiceSegmentPage";
import { tarifeKlv, tarifeUvg } from "./dienstleistungen/content";
import { CookieBanner } from "./CookieBanner";
import { PictImg } from "./components/PictImg";
import { AppMenuSheet, AppTabBar, PWARegister } from "./components/AppShell";
import { haptic } from "./components/haptic";

const LohnCheckQuiz = dynamic(
  () => import("./lohn-check/LohnCheckQuiz").then((mod) => mod.LohnCheckQuiz),
  { ssr: false },
);
const AnspruchscheckQuiz = dynamic(
  () =>
    import("./anspruchscheck/AnspruchscheckQuiz").then(
      (mod) => mod.AnspruchscheckQuiz,
    ),
  { ssr: false },
);

const RatgeberView = dynamic(
  () => import("./ratgeber/RatgeberView").then((mod) => mod.RatgeberView),
  { ssr: false },
);

function BrandLockup({
  height = 84,
  light = false,
  lazy = false,
}: {
  height?: number;
  light?: boolean;
  lazy?: boolean;
}) {
  return (
    <span
      className={`brand-logo brand-lockup${light ? " is-light" : ""}`}
      style={{ "--lockup-height": `${height}px` } as CSSProperties}
      aria-hidden="true"
    >
      <PictImg
        className="brand-lockup-mark"
        src="/images/logo-lumina-mark-warm.svg"
        alt=""
        width={421}
        height={483}
        loading={lazy ? "lazy" : "eager"}
        decoding="async"
        sizes={`${height}px`}
      />
      <span className="brand-lockup-copy">
        <strong>Lumina<sup>©</sup></strong>
        <small>SPITEX <b>+</b></small>
      </span>
    </span>
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
          <span className="utility-actions">
            <a
              className="utility-opan"
              href="https://opancare.ch/de/anmeldung/spitex/1500000002068/lumina-spitex-ag/anmeldung-starten/8038-zuerich"
              target="_blank"
              rel="noopener noreferrer"
            >
              OPAN-Anmeldung für Leistungserbringer
            </a>
            <a className="utility-contact" href="/kontakt">
              <strong>Kontaktieren Sie uns</strong>
              <span>Mo–Fr von 08:00 Uhr bis 17:00 Uhr</span>
            </a>
          </span>
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
        </div>
        <nav aria-label="Dienstleistungen">
          <p className="footer-heading">Dienstleistungen</p>
          <a href="/spitex">Spitex</a>
          <a href="/angehoerige">Pflegende Angehörige</a>
          <a className="footer-subitem" href="/lohn-check">
            Bedarfscheck für pflegende Angehörige
          </a>
          <a href="/begleitung">Begleitung</a>
        </nav>
        <nav aria-label="Über uns und Service">
          <p className="footer-heading">Über uns</p>
          <a href="/ueber-uns">Über uns</a>
          <a href="/tarife">Tarife</a>
          <a href="/ratgeber">Ratgeber</a>
          <a href="/bewerbung">Bewerbung</a>
          <a href="/kontakt">Kontakt</a>
          <a href="/redaktion">Redaktion</a>
        </nav>
        <div>
          <address className="footer-contact">
            <strong>Lumina Spitex AG</strong>
            <br />
            Rütistrasse 18
            <br />
            8952 Schlieren
            <br />
            <a href="mailto:info@lumina-spitex.ch">info@lumina-spitex.ch</a>
            <br />
            <a href="https://luminaspitex.com">luminaspitex.com</a>
            <br />
            <a href="tel:+41434338800" aria-label="Telefon 043 433 88 00">
              043 433 88 00
            </a>
          </address>
        </div>
      </div>
      <div className="wrap legal">
        <span>© 2026 Lumina Spitex AG</span>
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
              <span>Spitex</span>
              <h3>Pflege, die von der Krankenkasse übernommen wird</h3>
              <p>
                Abklärung, Grundpflege und Behandlungspflege – ärztlich
                verordnet und professionell bei Ihnen zu Hause.
              </p>
              <a href="/spitex">Spitex ansehen →</a>
            </article>
            <article className="path-card">
              <Icon>02</Icon>
              <span>Pflegende Angehörige</span>
              <h3>Pflege ist Arbeit. Sie verdient einen Lohn.</h3>
              <p>
                Sie pflegen bereits? Wir machen Sie zur Pflegefachperson: In nur
                zwölf Monaten zur SRK-anerkannten Ausbildung für pflegende
                Angehörige.
              </p>
              <a href="/angehoerige#anspruch-pruefen">Zum Bedarfscheck →</a>
            </article>
            <article className="path-card premium">
              <Icon>03</Icon>
              <span>Begleitung</span>
              <h3>Erledigungen, Termine, Alltag</h3>
              <p>
                Unterstützung, die über die Grundpflege hinausgeht – für mehr
                Selbstständigkeit, Sicherheit und Lebensqualität im Alltag.
              </p>
              <a href="/begleitung">Begleitung entdecken →</a>
            </article>
          </div>
          <p className="paths-note">
            Sie pflegen bereits jemanden? Der Bedarfscheck liefert in zwei
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
            Nach einer sorgfältigen Bedarfsabklärung begleiten feste
            Fachpersonen Ihren Alltag. Die Pflege bleibt wirksam, zweckmässig
            und wirtschaftlich – so, wie es für anerkannte
            Spitex-Organisationen in der Schweiz vorgesehen ist.
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
          loading="lazy"
          decoding="async"
          sizes="(max-width: 980px) 100vw, 560px"
        />
      </section>

      <section className="wrap aida-block reverse">
        <div className="aida-copy">
          <span className="eyebrow">02 · Pflegende Angehörige</span>
          <h2>Sie pflegen schon. Wir zahlen dafür.</h2>
          <p className="aida-lead">
            Sie können sofort mit Lohn angestellt werden. Den anerkannten
            Lehrgang für pflegende Angehörige absolvieren Sie anschliessend
            innerhalb von zwölf Monaten – organisiert und begleitet von Lumina.
          </p>
          <ul className="aida-points">
            <li>Sofort anstellen – Ausbildung folgt</li>
            <li>Lohn plus Sozialversicherung ab Tag eins</li>
            <li>SRK-Ausbildung in 12 Monaten</li>
          </ul>
          <a className="text-link" href="#anspruch-pruefen">
            In 2 Minuten zum ersten Bedarfscheck →
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
            Unsere Begleitung ergänzt die Grundpflege dort, wo der Alltag mehr
            Unterstützung braucht: bei Erledigungen, Terminen und sozialen
            Kontakten. So bleibt Selbstbestimmung auch im Alltag spürbar.
          </p>
          <ul className="aida-points">
            <li>Unterstützung bei Erledigungen im Alltag</li>
            <li>Sichere Begleitung zu Terminen</li>
            <li>Am sozialen Leben teilnehmen – in Ihrem Tempo</li>
          </ul>
          <a className="button outline" href="/begleitung">
            Mehr über Begleitung →
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
          <h2>Wir suchen mehrere Fachkräfte.</h2>
          <MoreRead
            summary={
              <p>
                Immer mehr Menschen verlassen sich auf das Lumina-Team. Deshalb
                wachsen wir und suchen Verstärkung in verschiedenen Bereichen.
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

function Tarife() {
  return (
    <main id="main-content">
      <section className="subhero dark">
        <div className="wrap subhero-grid">
          <div>
            <span className="eyebrow light">Über uns · Tarife</span>
            <h1 className="hero-title">
              <span className="hero-title-line">Transparente Tarife</span>
              <span className="hero-title-line">
                nach <em>KLV und UVG.</em>
              </span>
            </h1>
            <p className="lead">
              Pflegeleistungen nach KLV und UVG sowie private Leistungen –{" "}
              <br />
              klar aufgeschlüsselt und verständlich erklärt.
            </p>
            <a className="button hero-button" href="/kontakt?thema=pflege">
              Tariffrage klären
            </a>
          </div>
          <PictImg
            src="/images/about-team-meeting.webp"
            alt="Beratungsgespräch zu Tarifen und Abrechnung bei Lumina Spitex"
            width={1536}
            height={1024}
            loading="eager"
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
                <td data-label="Kostenübernahme">Kundin/Kunde oder Zusatzversicherung</td>
                <td data-label="Tarif (CHF/Std.)">55.00</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="more-read tarife-notes">
          <div className="more-read-summary">
            <p>
              Hauswirtschaftliche Leistungen werden von den Kundinnen und
              Kunden bezahlt.
              Sie sind keine Pflichtleistung der Krankenversicherer, können aber
              allenfalls aus der Zusatzversicherung zurückgefordert werden.
            </p>
          </div>
          <details className="more-read-details">
            <summary>Mehr lesen</summary>
            <div className="more-read-body">
              <p>
                Für Haushaltshilfe können Ergänzungsleistungen (EL) oder
                Gemeinden Beiträge leisten. Beteiligung der Kundinnen und Kunden
                pro Tag: CHF 7.65
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
            alt="Das Lumina-Team bespricht gemeinsam die Betreuung von Kundinnen und Kunden"
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
            <li>Offenes Ohr für Rückmeldungen von Kundinnen, Kunden und Familien</li>
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
            Lumina Spitex wächst, weil immer mehr Menschen uns vertrauen.
            Damit wir diesen Zuspruch halten und mehr Familien begleiten können,
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
              Kundinnen und Kunden und enge Zusammenarbeit mit dem Fachteam.
            </p>
            <a href="/bewerbung?rolle=efz&pensum=60-80&region=beides">
              Jetzt bewerben →
            </a>
          </article>
          <article>
            <span>60–100% · Zürich & Aargau</span>
            <h3>Dipl. Pflegefachperson HF/FH</h3>
            <p>
              Fallführung, Bedarfsabklärung und fachliche Begleitung von
              Kundinnen, Kunden und Angehörigen.
            </p>
            <a href="/bewerbung?rolle=dipl&pensum=60-80&region=beides">
              Jetzt bewerben →
            </a>
          </article>
          <article>
            <span>40–100% · Zürich & Aargau</span>
            <h3>Fachperson Gesundheit FaGe</h3>
            <p>
              Professionelle Pflege mit Eigenverantwortung und einer festen
              Beziehung zu Kundinnen und Kunden.
            </p>
            <a href="/bewerbung?rolle=fage&pensum=40-60&region=beides">
              Jetzt bewerben →
            </a>
          </article>
        </div>
      </section>

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
  const [pensum, setPensum] = useState("80-100");
  const [region, setRegion] = useState("beides");

  useEffect(() => {
    if (typeof window === "undefined") return;
    const params = new URLSearchParams(window.location.search);
    const q = params.get("rolle");
    const p = params.get("pensum");
    const r = params.get("region");
    window.requestAnimationFrame(() => {
      if (q === "dipl" || q === "fage" || q === "efz" || q === "initiativ") {
        setRolle(q);
      }
      if (p === "40-60" || p === "60-80" || p === "80-100" || p === "flexibel") {
        setPensum(p);
      }
      if (r === "zuerich" || r === "aargau" || r === "beides") {
        setRegion(r);
      }
    });
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
        "Das Senden hat nicht geklappt. Nutzen Sie bitte die E-Mail- oder Anrufmöglichkeit auf dieser Seite.",
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
                  <select
                    name="pensum"
                    value={pensum}
                    onChange={(e) => setPensum(e.target.value)}
                  >
                    <option value="40-60">40–60%</option>
                    <option value="60-80">60–80%</option>
                    <option value="80-100">80–100%</option>
                    <option value="flexibel">Flexibel</option>
                  </select>
                </label>
                <label>
                  Region
                  <select
                    name="region"
                    value={region}
                    onChange={(e) => setRegion(e.target.value)}
                  >
                    <option value="zuerich">Kanton Zürich</option>
                    <option value="aargau">Kanton Aargau</option>
                    <option value="beides">Zürich & Aargau</option>
                  </select>
                </label>
              </div>
              <label>
                <span className="label-text">
                  Kurz zu Ihnen <span className="optional">(optional)</span>
                </span>
                <textarea
                  rows={4}
                  name="message"
                  placeholder="Ausbildung, Erfahrung oder möglicher Start"
                />
              </label>
              <label className="check consent-line">
                <input type="checkbox" required />{" "}
                <span>
                  Ich bin mit der Bearbeitung meiner Bewerbungsdaten gemäss{" "}
                  <a className="consent-link" href="/datenschutz">
                    Datenschutzerklärung
                  </a>{" "}
                  einverstanden.
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
      <section className="wrap legal-copy compact-support">
        <h2>So läuft Ihre Bewerbung bei Lumina ab</h2>
        <p>
          Nach Ihrer Schnellbewerbung prüft das Lumina-Team, ob Profil, Pensum
          und Einsatzregion grundsätzlich zusammenpassen. Danach folgt ein
          persönliches Gespräch zu Erfahrung, fachlicher Verantwortung,
          Arbeitsweise und möglichen Einsätzen. Lebenslauf, Diplome und
          Arbeitszeugnisse fordern wir erst im nächsten Schritt über einen
          geeigneten Übermittlungsweg an. So bleibt der Erstkontakt einfach und
          datensparsam.
        </p>
        <p>
          Gesucht sind Menschen, die professionelle Pflege mit Verlässlichkeit
          und Respekt verbinden. Feste Bezugspersonen, nachvollziehbare Abläufe
          und fachliche Qualität stehen im Zentrum. Auch eine Initiativbewerbung
          ist willkommen, wenn Sie in Zürich oder Aargau arbeiten möchten und
          sich in einem wachsenden Spitex-Team einbringen wollen.
        </p>
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
        contact: [data.get("phone"), data.get("email")]
          .filter(Boolean)
          .join(" · "),
        topic: data.get("topic"),
        message: data.get("message"),
        details: {
          phone: data.get("phone"),
          email: data.get("email"),
        },
        consent: true,
      }),
    });
    setSending(false);
    if (response.ok) setSent(true);
    else
      setError(
        "Das Senden hat nicht geklappt. Nutzen Sie bitte den Anruf-Link auf dieser Seite.",
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
              Rufen Sie uns direkt an! Ausserhalb der Bürozeiten melden Sie sich
              beim Ärztephon oder direkt unter <a href="tel:144">144</a>.
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
                  <span className="eyebrow">Rückmeldung anfordern</span>
                  <h2>Wenige Angaben genügen.</h2>
                  <p className="form-intro">
                    Keine langen Formulare. Sagen Sie uns kurz, worum es geht.
                  </p>
                  <label>
                    Ihr Name
                    <input required name="name" autoComplete="name" />
                  </label>
                  <div className="form-row">
                    <label>
                      Telefon
                      <input
                        required
                        type="tel"
                        name="phone"
                        autoComplete="tel"
                        placeholder="043 433 88 00"
                      />
                    </label>
                    <label>
                      E-Mail
                      <input
                        type="email"
                        name="email"
                        autoComplete="email"
                        placeholder="name@beispiel.ch"
                      />
                    </label>
                  </div>
                  <label>
                    Ich interessiere mich für
                    <select
                      name="topic"
                      value={topic}
                      onChange={(e) => setTopic(e.target.value)}
                    >
                      <option value="pflege">Pflege</option>
                      <option value="begleitung">Begleitung</option>
                      <option value="mehr-infos">Weitere Informationen</option>
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
                    <span className="label-text">
                      Ihre Frage <span className="optional">(optional)</span>
                    </span>
                    <textarea
                      rows={3}
                      name="message"
                      placeholder="Geben Sie hier Ihre Frage ein."
                    />
                  </label>
                  <label className="check consent-line">
                    <input type="checkbox" required />{" "}
                    <span>
                      Ich bin mit der Bearbeitung meiner Angaben gemäss{" "}
                      <a className="consent-link" href="/datenschutz">
                        Datenschutzerklärung
                      </a>{" "}
                      einverstanden.
                    </span>
                  </label>
                  {error && <p role="alert">{error}</p>}
                  <button className="button" disabled={sending} type="submit">
                    {sending ? "Wird gesendet …" : "Rückmeldung anfordern"}
                  </button>
                </>
              )}
          </form>
        </div>
      </section>
      <section className="wrap legal-copy compact-support">
        <h2>Was nach Ihrer Anfrage passiert</h2>
        <p>
          Eine Fachperson meldet sich während der Bürozeiten persönlich bei
          Ihnen. Im ersten Gespräch geht es darum, Ihre Situation zu verstehen:
          Welche Unterstützung wird benötigt, wo wohnt die betreute Person und
          wie dringend ist der Bedarf? Sie müssen im Formular keine Diagnose und
          keine ausführlichen Gesundheitsangaben nennen. Für die Rückmeldung
          genügen Name, Kontaktmöglichkeit und das Thema.
        </p>
        <p>
          Wenn eine Pflegeabklärung sinnvoll ist, erklärt Lumina den weiteren
          Ablauf, die benötigten Unterlagen und mögliche Termine. Bei Fragen zur
          Anstellung pflegender Angehöriger können Sie vorab den{" "}
          <a href="/anspruchscheck">Anspruchscheck</a> nutzen. Er ersetzt keine
          Fachabklärung, hilft aber dabei, das Erstgespräch gezielt
          vorzubereiten.
        </p>
      </section>
    </main>
  );
}

const homeArticlePreviews = [
  { slug: "lohn-fuer-pflegende-angehoerige", tag: "Lohn & Anspruch", title: "Lohn für pflegende Angehörige", text: "Welche Pflegezeit zählt, wie eine Anstellung funktioniert und warum die genaue Abklärung entscheidend ist.", read: "8 Min.", image: "/images/ratgeber/blog-12.webp", imageAlt: "Pflegende Angehörige begleitet eine ältere Frau zu Hause im Rollstuhl" },
  { slug: "wer-gilt-als-pflegende-angehoerige", tag: "Orientierung", title: "Wer gilt als pflegende Angehörige?", text: "Ehepartner, Kinder, Eltern und enge Bezugspersonen: Entscheidend sind Situation und regelmässige Grundpflege.", read: "6 Min.", image: "/images/ratgeber/blog-10.webp", imageAlt: "Gespräch zwischen pflegendem Angehörigen und älterem Mann" },
  { slug: "hilflosenentschaedigung-verstaendlich", tag: "Finanzierung", title: "Hilflosenentschädigung verständlich erklärt", text: "Wann eine Anmeldung sinnvoll sein kann, welche Stufen es gibt und wo Sie eine verbindliche Prüfung erhalten.", read: "9 Min.", image: "/images/ratgeber/blog-11.webp", imageAlt: "Pflegefachperson hält die Hand einer älteren Kundin" },
];

function BlogPreview() {
  return (
    <section className="wrap blog-preview">
      <div className="section-head horizontal">
        <div><span className="eyebrow">Wissen, das weiterhilft</span><h2>Ratgeber für Familien</h2></div>
        <a className="text-link" href="/ratgeber">Alle Beiträge ansehen →</a>
      </div>
      <div className="article-grid">
        {homeArticlePreviews.map((article, index) => (
          <article className="article-card" key={article.slug}>
            <div className="article-media">
              <a href={`/ratgeber/${article.slug}`} aria-label={`${article.title} lesen`}>
                <PictImg src={article.image} alt={article.imageAlt} width={640} height={400} loading="lazy" sizes="(max-width: 640px) 100vw, 360px" />
              </a>
              <span className={`article-art-label art-${index % 3}`}>
                {index % 3 === 0
                  ? "Wissen schafft Klarheit."
                  : index % 3 === 1
                    ? "Gute Pflege beginnt beim Zuhören."
                    : "Entlastung ist Teil der Fürsorge."}
              </span>
            </div>
            <div><span className="tag">{article.tag}</span><h3>{article.title}</h3><p>{article.text}</p><small>{article.read} Lesezeit</small><a href={`/ratgeber/${article.slug}`}>{article.title} →</a></div>
          </article>
        ))}
      </div>
    </section>
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
      <section className="wrap legal-copy check-explainer">
        <h2>So entsteht Ihre Lohnorientierung</h2>
        <p>
          Der Lohn-Check beantwortet die konkrete Frage: Welcher Bruttolohn kann
          sich aus regelmässiger, anrechenbarer Grundpflege ungefähr ergeben? Die
          Schätzung verbindet Ihren täglichen Zeitaufwand mit einer
          Lohnorientierung. Sie ist bewusst keine verbindliche Offerte. Erst eine
          diplomierte Pflegefachperson kann vor Ort beurteilen, welche
          Pflegehandlungen ärztlich verordnet und nach KLV abrechenbar sind.
          Haushalt, Begleitung und reine Präsenz sind wertvoll, zählen aber nicht
          automatisch als kassenpflichtige Grundpflege.
        </p>
        <h2>Was nach dem Ergebnis passiert</h2>
        <p>
          Sie entscheiden selbst, ob Sie das Resultat mit Lumina besprechen
          möchten. Im persönlichen Erstgespräch klären wir Pflegesituation,
          Wohnort und zeitlichen Umfang. Passt das Modell grundsätzlich, folgen
          die ärztliche Verordnung und eine Bedarfsabklärung zu Hause. Erst danach
          werden Pensum, Arbeitsvertrag, Sozialversicherungen, Ferienanspruch und
          Dokumentation verbindlich festgelegt. Ein hoher privater Zeitaufwand
          führt deshalb nicht automatisch zu gleich vielen bezahlten Stunden.
        </p>
        <h2>Welche Angaben und Unterlagen helfen</h2>
        <p>
          Für den ersten Kontakt genügen eine kurze Beschreibung der täglichen
          Pflege und Ihre Kontaktangaben. Hilfreich für die spätere Abklärung sind
          eine aktuelle Medikamentenliste, vorhandene Arztberichte, bisherige
          Spitex-Unterlagen und eine einfache Übersicht der wiederkehrenden
          Pflegehandlungen. Senden Sie keine Gesundheitsunterlagen unaufgefordert
          über ein Freitextfeld. Lumina erklärt Ihnen zuerst den passenden,
          geschützten Übermittlungsweg.
        </p>
        <p>
          Noch unsicher, ob überhaupt ein Anspruch bestehen kann? Starten Sie
          zuerst den <a href="/anspruchscheck">Anspruchscheck</a>. Er prüft die
          grundlegende Situation; der Lohn-Check schätzt anschliessend die mögliche
          Grössenordnung.
        </p>
      </section>
    </main>
  );
}

function Anspruchscheck() {
  return (
    <main id="main-content">
      <section className="subhero warm">
        <div className="wrap">
          <span className="eyebrow">Anspruchscheck</span>
          <h1>Anspruch prüfen für pflegende Angehörige</h1>
          <p className="lead">
            Vier kurze Fragen zeigen, ob eine Anstellung grundsätzlich in Frage
            kommen könnte – ohne Login und ohne verbindliche Entscheidung.
          </p>
        </div>
      </section>
      <AnspruchscheckQuiz embedded />
      <section className="wrap legal-copy check-explainer">
        <h2>Wann Angehörigenpflege grundsätzlich anstellbar ist</h2>
        <p>
          Der Anspruchscheck beantwortet zuerst die grundlegende Frage: Passt Ihre
          Situation überhaupt zum Modell der angestellten Angehörigenpflege? Im
          Zentrum stehen regelmässige Hilfe bei der Grundpflege, eine betreute
          Person zu Hause und die Bereitschaft, sich von einer zugelassenen Spitex
          anleiten zu lassen. Häufig geht es um Unterstützung beim Waschen,
          Ankleiden, Essen, Lagern, Aufstehen oder bei der Mobilität. Verwandtschaft
          allein schafft noch keinen Anspruch; entscheidend ist der fachlich
          bestätigte Pflegebedarf.
        </p>
        <h2>Was der digitale Check nicht entscheidet</h2>
        <p>
          Das Ergebnis ist eine unverbindliche Orientierung und keine Zusage der
          Krankenkasse, Gemeinde oder Lumina. Eine ärztliche Verordnung und die
          Bedarfsabklärung durch eine diplomierte Pflegefachperson bleiben
          notwendig. Dabei wird unterschieden zwischen Grundpflege,
          Behandlungspflege, Haushalt und Betreuung. Auch Region, Dauer der
          Pflegesituation, fachliche Anleitung und kantonale Vorgaben spielen eine
          Rolle. Grenzfälle werden deshalb immer persönlich beurteilt.
        </p>
        <h2>Ihr nächster sinnvoller Schritt</h2>
        <p>
          Wenn mehrere Voraussetzungen passen, besprechen wir die Situation in
          einem kostenlosen Erstgespräch. Dafür brauchen Sie zunächst keine
          vollständige Akte. Notieren Sie, welche Hilfe täglich anfällt, seit wann
          sie nötig ist und ob bereits eine Spitex oder Ärztin beteiligt ist. Im
          nächsten Schritt erklärt Lumina, welche Unterlagen erforderlich sind und
          wie die fachliche Abklärung abläuft. Sie behalten jederzeit die Kontrolle
          darüber, welche Daten Sie weitergeben.
        </p>
        <p>
          Sie wissen bereits, dass regelmässige Grundpflege anfällt? Dann zeigt der
          <a href="/lohn-check">Lohn-Check</a> eine erste mögliche
          Bruttolohn-Grössenordnung. Anspruch und Lohn bleiben damit klar getrennt.
        </p>
      </section>
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
            Lumina Spitex AG, Rütistrasse 18, 8952 Schlieren ·{" "}
            <a href="tel:+41434338800">043 433 88 00</a> ·{" "}
            <a href="mailto:info@lumina-spitex.ch">info@lumina-spitex.ch</a>
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
          <p>
            Fachliche Aussagen werden bei relevanten Änderungen der gesetzlichen
            oder kantonalen Grundlagen früher überprüft. Korrekturen halten wir
            im Aktualisierungsdatum des jeweiligen Beitrags fest. Hinweise von
            Leserinnen, Lesern und Fachpersonen prüfen wir nachvollziehbar; eine
            redaktionelle Anpassung erfolgt erst nach dem Abgleich mit einer
            belastbaren Quelle.
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
          <p>
            <time dateTime="2026-08-20">Stand: 20. August 2026</time>
          </p>
        </div>
      </section>
      <section className="wrap legal-copy">
        {privacy ? (
          <>
            <div className="privacy-intro">
              <span className="eyebrow">Vertrauen durch Klarheit</span>
              <h2>Ihre Daten verdienen denselben Schutz wie Ihr Vertrauen.</h2>
              <p>
                Hier erfahren Sie transparent, welche Personendaten wir bearbeiten,
                wofür wir sie benötigen und welche Rechte Sie haben.
              </p>
            </div>

            <h2>1. Verantwortliche Stelle</h2>
            <p>
              Lumina Spitex AG, Rütistrasse 18, 8952 Schlieren, Schweiz
              <br />
              E-Mail: <a href="mailto:info@lumina-spitex.ch">info@lumina-spitex.ch</a>
              {" · "}
              Telefon: <a href="tel:+41434338800">043 433 88 00</a>
            </p>
            <p>
              Lumina Spitex AG ist für die Bearbeitung Ihrer Personendaten
              verantwortlich. AgenticIT unterstützt die Website in den Bereichen
              Konzeption, Gestaltung, Technik und Redaktion und bearbeitet Daten
              nur, soweit dies für diese Aufgaben erforderlich ist.
            </p>
            <p>
              Website-Partner:{" "}
              <a href="https://agenticit.ch/" target="_blank" rel="noopener noreferrer">
                AgenticIT
              </a>
            </p>

            <h2>2. Geltungsbereich und Rechtsgrundlagen</h2>
            <p>
              Diese Erklärung gilt für die Nutzung dieser Website und die darüber
              ausgelösten Anfragen. Für ein späteres Pflege-, Beratungs- oder
              Arbeitsverhältnis können ergänzende Informationen gelten. Wir
              bearbeiten Personendaten nach dem Schweizer Datenschutzgesetz
              (DSG). Die Bearbeitung erfolgt insbesondere zur Vertragsanbahnung
              und Vertragserfüllung, zur Erfüllung gesetzlicher Pflichten,
              aufgrund Ihrer Einwilligung oder für einen sicheren und
              kundenfreundlichen Betrieb.
            </p>

            <h2>3. Besuch der Website</h2>
            <p>
              Beim Aufruf der Website können technisch notwendige Protokolldaten
              anfallen: IP-Adresse, Datum und Uhrzeit, aufgerufene Adresse,
              verweisende Seite, Browser- und Geräteangaben sowie Status der
              Anfrage. Wir verwenden diese Daten, um die Website bereitzustellen,
              Fehler zu beheben, Missbrauch abzuwehren und die Systemsicherheit zu
              gewährleisten. Die Website wird über Vercel bereitgestellt.
            </p>

            <h2>4. Kontakt- und Rückrufanfragen</h2>
            <p>
              Wenn Sie ein Formular absenden, bearbeiten wir die von Ihnen
              angegebenen Kontaktinformationen sowie Thema und Nachricht. Wir
              benötigen diese Angaben, um Ihre Anfrage zuzuordnen, Sie zu
              kontaktieren und eine Beratung vorzubereiten. Freitextfelder sind
              freiwillig. Bitte teilen Sie dort nur Informationen mit, die für Ihr
              Anliegen erforderlich sind.
            </p>

            <h2>5. Lohn-Check und Anspruchscheck</h2>
            <p>
              Der Lohn-Check verarbeitet Angaben zur Pflegesituation, zu Aufgaben,
              Zeitaufwand und Kanton. Diese Angaben können Rückschlüsse auf die
              Gesundheit der betreuten Person zulassen und sind besonders
              schützenswert. Ohne Kontaktdaten und Ihre aktive Einwilligung wird
              das Ergebnis nicht an Lumina übermittelt. Der Anspruchscheck wird
              direkt in Ihrem Browser ausgewertet; seine Antworten werden nicht
              über das Kontaktformular gespeichert.
            </p>
            <p>
              Rechner und Checks liefern nur eine unverbindliche Orientierung.
              Sie führen zu keiner ausschliesslich automatisierten Entscheidung
              mit rechtlicher oder ähnlich erheblicher Wirkung. Eine Fachperson
              klärt die konkrete Situation mit Ihnen.
            </p>

            <h2>6. Bewerbungen</h2>
            <p>
              Bei einer Bewerbung bearbeiten wir Ihre Personal- und Kontaktdaten,
              die gewünschte Funktion, Pensum, Einsatzregion, möglichen Start und
              Ihre Nachricht. Die Angaben dienen ausschliesslich der Prüfung und
              Durchführung des Bewerbungsverfahrens. Weitere Unterlagen fordern
              wir bei Bedarf separat an.
            </p>

            <h2>7. Empfänger und Dienstleister</h2>
            <p>
              Zugriff erhalten nur Personen und Stellen, die ihn für den
              jeweiligen Zweck benötigen. Dazu können Mitarbeitende von Lumina,
              sorgfältig ausgewählte IT- und Website-Dienstleister sowie – wenn
              Sie dies wünschen oder eine gesetzliche Grundlage besteht –
              beteiligte Fachstellen gehören. Für die Website setzen wir
              insbesondere folgende Auftragsbearbeiter ein:
            </p>
            <ul className="privacy-list">
              <li><strong>Vercel Inc.</strong> für Hosting, Auslieferung und technische Protokolle;</li>
              <li><strong>Neon</strong> für die geschützte PostgreSQL-Datenbank der Formulare;</li>
              <li><strong>AgenticIT GmbH</strong> für technische, gestalterische und redaktionelle Betreuung.</li>
            </ul>
            <p>
              Wir verkaufen keine Personendaten und geben sie nicht für fremde
              Werbezwecke weiter. Dienstleister dürfen Daten nur für die
              vereinbarten Aufgaben und nach unseren Weisungen bearbeiten.
            </p>

            <h2>8. Bearbeitung im Ausland</h2>
            <p>
              Vercel, Neon und deren Unterauftragnehmer können Daten insbesondere
              in der Schweiz, im Europäischen Wirtschaftsraum und in den USA
              bearbeiten. Befindet sich ein Empfänger in einem Staat ohne
              anerkannt angemessenes Datenschutzniveau, verwenden wir – soweit
              erforderlich – anerkannte Standarddatenschutzklauseln und
              ergänzende Schutzmassnahmen oder stützen die Übermittlung auf eine
              gesetzliche Ausnahme.
            </p>

            <h2>9. Cookies, lokaler Speicher und App-Funktion</h2>
            <p>
              Diese Website setzt derzeit keine Analyse-, Marketing- oder
              Profiling-Dienste ein. Sie nutzt ausschliesslich technisch
              notwendige lokale Speicherungen. Dazu gehören Ihre Auswahl zu
              diesem Hinweis sowie ein Service Worker, der öffentliche Seiten und
              Dateien für eine zuverlässige App- und Offline-Funktion im Browser
              zwischenspeichern kann. Formulareingaben und abgesendete
              Gesundheitsangaben werden nicht in diesem Offline-Speicher
              abgelegt. Sie können lokale Website-Daten jederzeit in den
              Einstellungen Ihres Browsers löschen.
            </p>

            <h2>10. Aufbewahrungsdauer</h2>
            <p>
              Wir bewahren Personendaten nur so lange auf, wie sie für den Zweck
              erforderlich sind oder gesetzliche und vertragliche Pflichten
              bestehen. Nicht weitergeführte Website-Anfragen löschen oder
              anonymisieren wir in der Regel spätestens zwölf Monate nach
              Abschluss der Anfrage. Daten erfolgloser Bewerbungen löschen wir in
              der Regel sechs Monate nach Abschluss des Verfahrens, sofern keine
              Einwilligung für eine längere Aufbewahrung vorliegt. Entsteht ein
              Pflege-, Vertrags- oder Arbeitsverhältnis, gelten die dafür
              erforderlichen gesetzlichen Aufbewahrungsfristen. Sicherungskopien
              werden nach den vorgesehenen Löschzyklen überschrieben.
            </p>

            <h2>11. Datensicherheit</h2>
            <p>
              Wir treffen angemessene technische und organisatorische
              Massnahmen, um Daten vor Verlust, unberechtigtem Zugriff,
              Veränderung und Offenlegung zu schützen. Dazu gehören
              verschlüsselte Übertragung, Zugriffsbeschränkungen,
              Sicherheitsvorgaben für Dienstleister und technische
              Schutzmechanismen der Website. Eine Datenübertragung im Internet
              kann dennoch nie vollständig risikofrei garantiert werden.
            </p>

            <h2>12. Ihre Rechte</h2>
            <p>
              Sie können im Rahmen des anwendbaren Rechts insbesondere Auskunft,
              Berichtigung, Löschung, Einschränkung der Bearbeitung oder die
              Herausgabe Ihrer Daten verlangen. Erteilte Einwilligungen können
              Sie jederzeit für die Zukunft widerrufen. Ein Widerruf berührt die
              Rechtmässigkeit der bisherigen Bearbeitung nicht. Zur eindeutigen
              Zuordnung können wir einen geeigneten Identitätsnachweis verlangen.
            </p>
            <p>
              Senden Sie Ihr Anliegen an{" "}
              <a href="mailto:info@lumina-spitex.ch">info@lumina-spitex.ch</a>.
              Sie können sich zudem an den{" "}
              <a href="https://www.edoeb.admin.ch/" target="_blank" rel="noopener noreferrer">
                Eidgenössischen Datenschutz- und Öffentlichkeitsbeauftragten (EDÖB)
              </a>{" "}
              wenden.
            </p>

            <h2>13. Externe Links</h2>
            <p>
              Diese Website enthält Links zu Angeboten Dritter. Sobald Sie einen
              solchen Link öffnen, gilt die Datenschutzerklärung der jeweiligen
              Anbieterin. Lumina hat keinen Einfluss auf deren Datenbearbeitung.
            </p>

            <h2>14. Änderungen dieser Erklärung</h2>
            <p>
              Wir passen diese Datenschutzerklärung an, wenn sich Funktionen,
              Dienstleister oder rechtliche Anforderungen ändern. Massgebend ist
              die jeweils auf dieser Website veröffentlichte Fassung.
            </p>

            <aside className="privacy-note">
              <strong>Gut zu wissen:</strong> Die Informationspflicht nach dem
              Schweizer DSG verlangt eine verständliche und leicht zugängliche
              Erklärung. Weiterführende Informationen finden Sie beim{" "}
              <a href="https://www.edoeb.admin.ch/de/datenschutzerklaerungen-im-internet" target="_blank" rel="noopener noreferrer">
                EDÖB
              </a>{" "}
              und im{" "}
              <a href="https://www.fedlex.admin.ch/eli/cc/2022/491/de" target="_blank" rel="noopener noreferrer">
                Schweizer Datenschutzgesetz
              </a>.
            </aside>
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
            <h2>Website & Inhalte</h2>
            <p>
              Diese Website wurde von{" "}
              <a href="https://agenticit.ch/" target="_blank" rel="noopener noreferrer">
                AgenticIT
              </a>{" "}
              konzipiert, gestaltet und technisch umgesetzt. AgenticIT
              verantwortet zudem die redaktionellen Inhalte dieser Website.
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
      page = <RatgeberView articleSlug={articleSlug} />;
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
