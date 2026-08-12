"use client";

import { AnspruchscheckQuiz } from "../anspruchscheck/AnspruchscheckQuiz";
import {
  getServiceSegment,
  partners,
  type ServiceSegment,
} from "./content";

function PartnersStrip() {
  return (
    <section className="wrap partners-section">
      <div className="section-head">
        <span className="eyebrow">Unsere Partner</span>
        <h2>Vernetzt für gute Versorgung.</h2>
      </div>
      <div className="partners-grid">
        {partners.map((p) => (
          <div className="partner-logo" key={p.name}>
            <img
              src={p.src.replace(/\.(png|jpe?g)$/i, ".webp")}
              alt={p.name}
              width={160}
              height={64}
              loading="lazy"
              decoding="async"
            />
          </div>
        ))}
      </div>
    </section>
  );
}

export function ServiceSegmentPage({
  id,
  showPartners = true,
}: {
  id: ServiceSegment["id"];
  showPartners?: boolean;
}) {
  const page = getServiceSegment(id);

  return (
    <main id="main-content" className="service-segment">
      <section className={`subhero ${page.heroTone}`}>
        <div className="wrap subhero-grid">
          <div>
            <span
              className={
                page.heroTone === "dark" ? "eyebrow light" : "eyebrow"
              }
            >
              {page.eyebrow}
            </span>
            <h1>
              {page.title}
              <br />
              <em>{page.titleEm}</em>
            </h1>
            <p className="lead">{page.lead}</p>
            <div className="actions">
              <a className="button gold" href={page.cta.primaryHref}>
                {page.cta.primaryLabel}
              </a>
              {page.cta.secondaryHref && page.cta.secondaryLabel ? (
                <a className="text-link" href={page.cta.secondaryHref}>
                  {page.cta.secondaryLabel} →
                </a>
              ) : null}
            </div>
          </div>
          <img src={page.image} alt={page.imageAlt} />
        </div>
      </section>

      <section className="wrap intro">
        <span className="eyebrow">{page.introEyebrow}</span>
        <h2>{page.introTitle}</h2>
        <div className="more-read">
          <div className="more-read-summary">
            <p className="lead small-lead">{page.introSummary}</p>
          </div>
          <details className="more-read-details">
            <summary>Mehr lesen</summary>
            <div className="more-read-body">
              {page.introMore.map((p) => (
                <p key={p.slice(0, 40)}>{p}</p>
              ))}
            </div>
          </details>
        </div>
      </section>

      {id === "angehoerige" ? <AnspruchscheckQuiz embedded /> : null}

      {page.facts ? (
        <section className="wrap segment-facts">
          {page.facts.map((f) => (
            <div key={f.label}>
              <span>{f.label}</span>
              <span className="stat-value">{f.value}</span>
            </div>
          ))}
        </section>
      ) : null}

      <section className="wrap accordion-section">
        <div className="section-head left">
          <span className="eyebrow">Dienstleistungen</span>
          <h2>{page.accordionTitle}</h2>
        </div>
        <div className="service-accordion">
          {page.accordion.map((item, i) => (
            <details
              className="service-accordion-item"
              key={item.title}
              open={i === 0}
            >
              <summary>
                <span className="acc-num" aria-hidden="true">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span>{item.title}</span>
              </summary>
              <div className="service-accordion-body">
                <p>{item.intro}</p>
                {item.bullets?.length ? (
                  <ul>
                    {item.bullets.map((b) => (
                      <li key={b}>{b}</li>
                    ))}
                  </ul>
                ) : null}
                {item.note ? <p className="acc-note">{item.note}</p> : null}
                {page.accordionLink ? (
                  <a
                    className="service-accordion-link"
                    href={page.accordionLink.href}
                  >
                    {page.accordionLink.label} →
                  </a>
                ) : null}
              </div>
            </details>
          ))}
        </div>
      </section>

      {page.process?.length ? (
        <section className="process-bg">
          <div className="wrap">
            <div className="section-head">
              <span className="eyebrow light">Ablauf</span>
              <h2>{page.processTitle}</h2>
            </div>
            <div
              className="timeline"
              style={{
                gridTemplateColumns: `repeat(${Math.min(page.process.length, 5)}, 1fr)`,
              }}
            >
              {page.process.map((step) => (
                <div key={step.step}>
                  <span className="step-num">{step.step}</span>
                  <h3>{step.title}</h3>
                  <p>{step.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {showPartners ? <PartnersStrip /> : null}

      {page.claimBanner ? (
        <section className="wrap claim-banner claim-banner-late">
          <a className="claim-banner-card" href={page.claimBanner.href}>
            <div className="claim-banner-copy">
              <span className="eyebrow light">{page.claimBanner.eyebrow}</span>
              <h2>{page.claimBanner.title}</h2>
              <p>{page.claimBanner.text}</p>
            </div>
            <span className="claim-banner-action">
              {page.claimBanner.label}
              <span aria-hidden="true"> →</span>
            </span>
          </a>
        </section>
      ) : null}

      <section className="cta wrap segment-cta">
        <div>
          <span className="eyebrow light">Nächster Schritt</span>
          <h2>{page.cta.title}</h2>
          <p>{page.cta.text}</p>
        </div>
        <div className="cta-actions">
          <a className="button gold" href={page.cta.primaryHref}>
            {page.cta.primaryLabel}
          </a>
          {page.cta.secondaryHref && page.cta.secondaryLabel ? (
            <a className="text-link light" href={page.cta.secondaryHref}>
              {page.cta.secondaryLabel} →
            </a>
          ) : null}
        </div>
      </section>
    </main>
  );
}

export { PartnersStrip };
