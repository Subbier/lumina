# Lumina Spitex – Launch-Checklist

## 1. SEO-Schalter (kritisch – Relaunch-Killer)

Vergessener `Disallow: /` oder `noindex` = monatelang keine Indexierung.

- [ ] Vercel-Variable `LUMINA_INDEXING_ENABLED=true` erst nach Domain-Umzug setzen
- [ ] Live: `app/robots.ts` erlaubt Crawling + zeigt `sitemap.xml`
- [ ] Live: `app/sitemap.ts` listet alle öffentlichen URLs (Ortsseiten, Karriere, …)
- [ ] Live: Meta-Robots / `X-Robots-Tag` = index,follow (kein Stage-noindex)
- [ ] Live: Canonicals + OG/Twitter pro Seite individuell (nicht Layout-Default überall)
- [ ] `public/llms.txt` auf öffentliche Version umstellen
- [ ] Nach Deploy: `https://…/robots.txt` und eine Seite manuell prüfen

Vorschau und Preview-Deployments bleiben ohne Variable automatisch auf
`noindex, nofollow`. Für Audits wird die Vorschau nicht mehr indexierbar gemacht.

## 2. Arbitrage-Cluster Hilflosenentschädigung (Priorität)

~9'500 Suchen/Monat, Werbe-Wettbewerb oft &lt; 0.30. Früher Einstieg vor Spitex-Entscheidung.

- [ ] Ankerseite: HE Schweiz – Anspruch, Grade, Beträge, Antrag (beste Seite, nicht AHV-Kopie)
- [ ] Kantonsseiten (zuerst ZH + AG, dann je Priorität): Ausgleichskasse + Formular + Ablauf
- [ ] Beantragungs-Guide, Grade-Erklärung, Heim vs. zu Hause
- [ ] Tool: HE-Anspruchscheck (ADL-Fragen) → Ergebnis ohne Login
- [ ] Leadmagnet: Formular-Ausfüllhilfe gegen Name/Telefon
- [ ] Auf jeder HE-Seite: Telefon/Rückruf prominent; Disclaimer (Orientierung, keine Rechtsauskunft); jährliche Pflege Beträge/Voraussetzungen
- [ ] Meiden in Ads: «angehörige pflegen», «private spitex …» (teuer)

## 3. Orts-/Regionsseiten (Einsatzgebiet ZH + AG)

- [ ] Eigene URL wo sinnvoll (Gemeinde) – oder an Kantons-HE hängen
- [ ] Eigener Title/Description/H1 – kein Copy-Paste
- [ ] Öffnungszeiten, Karte, Ansprechperson, lokale Vertrauenssignale
- [ ] Semrush-Konkurrenz im Einsatzgebiet nachziehen → Priorität

## 4. Karriere / Personal

- [ ] Ernsthafter Karrierebereich (nicht nur Banner)
- [ ] Eigene Seiten pro Rolle
- [ ] Kurzbewerbung statt Formularmarathon
- [ ] Keywords: job spitex, spitex jobs, offene stellen spitex, …

## 5. Conversion & Vertrauen

- [ ] Telefon + Rückruf prominent (Zielgruppe entscheidet oft am Telefon)
- [ ] Pflichtfelder im Formular minimal
- [ ] Kantonsbewilligung, KK-Anerkennung, Verbände, Team mit Gesicht
- [ ] Durchgehend «Sie» (Angehörige 50+)

## 6. Technik Go-Live

- [ ] Domain `lumina-spitex.ch` + Redirects von alter Adresse
- [ ] Kampagne: `rechner.lumina-spitex.ch` (DNS), nicht Query-Spam auf Apex
- [ ] Mobile: Ladezeit + Schriftgrösse
- [ ] Analytics / Conversion-Events nur nach Consent
