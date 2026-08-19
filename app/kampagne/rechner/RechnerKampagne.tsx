"use client";

import { FormEvent, useState } from "react";
import { LohnCheckQuiz } from "../../lohn-check/LohnCheckQuiz";
import { CookieBanner } from "../../CookieBanner";

/** Kampagnen-Landing für Subdomain rechner.lumina-spitex.ch */
export function RechnerKampagne() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (!phone.trim()) return;
    setSending(true);
    try {
      await fetch("/api/leads", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          source: "kampagne-rechner",
          name,
          contact: phone.trim(),
          topic: "Rückruf Kampagne Rechner",
          consent: true,
        }),
      });
      setSent(true);
    } finally {
      setSending(false);
    }
  }

  return (
    <div className="kampagne-rechner">
      <header className="kampagne-top">
        <div className="wrap kampagne-top-inner">
          <a href="https://lumina-spitex.vercel.app" aria-label="Lumina Spitex">
            <img
              className="brand-logo"
              src="/images/logo-lumina-lockup.png?v=brand1"
              alt="Lumina Spitex"
              height={52}
            />
          </a>
          <a className="kampagne-phone" href="tel:+41434338800">
            043 433 88 00
          </a>
        </div>
      </header>

      <main id="main-content">
        <section className="kampagne-hero">
          <img
            className="kampagne-hero-bg"
            src="/images/angehoerige-hero-anleitung.jpg?v=sq3"
            alt="Angehöriger unterstützt einen älteren Vater am Bett"
          />
          <div className="kampagne-hero-shade" aria-hidden="true" />
          <div className="kampagne-hero-copy wrap">
            <p className="kampagne-brand">Lumina Spitex</p>
            <h1>Lohn für Ihre Angehörigenpflege prüfen</h1>
            <p>
              Lohnrechner – unverbindlich. Sofort Anstellung möglich, Ausbildung
              innert zwölf Monaten.
            </p>
            <div className="kampagne-actions">
              <a className="button gold" href="#lohn-rechner">
                Lohn schätzen
              </a>
              <a className="text-link light" href="#kontakt-kampagne">
                Rückruf anfordern →
              </a>
            </div>
          </div>
        </section>

        <LohnCheckQuiz embedded source="kampagne-rechner-lohn" />

        <section className="wrap kampagne-contact" id="kontakt-kampagne">
          <div className="kampagne-contact-card">
            <span className="eyebrow light">Persönlich</span>
            <h2>Rückruf anfordern</h2>
            <p>Kostenlos und unverbindlich – wir melden uns bei Ihnen.</p>
            {sent ? (
              <p className="kampagne-success">Danke – wir melden uns.</p>
            ) : (
              <form className="kampagne-form" onSubmit={onSubmit}>
                <label>
                  <span>Vorname</span>
                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="z. B. Anna"
                    autoComplete="given-name"
                  />
                </label>
                <label>
                  <span>Telefon *</span>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="079 000 00 00"
                    autoComplete="tel"
                  />
                </label>
                <button className="button gold" type="submit" disabled={sending}>
                  {sending ? "Wird gesendet…" : "Rückruf anfordern"}
                </button>
              </form>
            )}
          </div>
        </section>
      </main>

      <footer className="kampagne-footer wrap">
        <span>Lumina Spitex AG · Schlieren</span>
        <span>
          <a href="/impressum">Impressum</a>
          {" · "}
          <a href="/datenschutz">Datenschutz</a>
        </span>
      </footer>
      <CookieBanner />
    </div>
  );
}
