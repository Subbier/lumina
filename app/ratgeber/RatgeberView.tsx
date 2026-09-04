"use client";

import { useState } from "react";
import { articles, getArticle, type Article } from "./articles";
import { PictImg } from "../components/PictImg";
import { ListenPlayer } from "../listen/ListenPlayer";

function RatgeberCTA() {
  return (
    <section className="cta wrap">
      <div>
        <span className="eyebrow light">Persönlich für Sie da</span>
        <h2>Lassen Sie uns zuerst zuhören.</h2>
        <p>Ein kurzes Gespräch schafft Klarheit – kostenlos, persönlich und ohne Verpflichtung.</p>
      </div>
      <div className="cta-actions">
        <a className="button gold" href="/kontakt">Gespräch vereinbaren</a>
        <a className="text-link light" href="tel:+41434338800">043 433 88 00 →</a>
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
                {article.ctaHref !== "/kontakt" ? (
                  <a className="text-link" href="/kontakt">
                    Persönliches Gespräch →
                  </a>
                ) : null}
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
      <RatgeberCTA />
    </main>
  );
}

export function RatgeberView({ articleSlug }: { articleSlug?: string }) {
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
        <h2 className="blog-list-title">Alle Ratgeber-Beiträge</h2>
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
      <RatgeberCTA />
    </main>
  );
}


