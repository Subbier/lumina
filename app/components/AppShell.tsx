"use client";

import { useEffect, type ReactNode } from "react";
import { haptic } from "./haptic";

const MORE_VIEWS = new Set<string>([
  "begleitung",
  "team",
  "ueber-uns",
  "tarife",
  "ratgeber",
  "bewerbung",
  "impressum",
  "datenschutz",
  "agb",
  "redaktion",
  "services",
]);

function IconHome() {
  return (
    <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
      <path
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
        d="M4 11.2 12 4l8 7.2V20a1 1 0 0 1-1 1h-5v-6H10v6H5a1 1 0 0 1-1-1z"
      />
    </svg>
  );
}

function IconCare() {
  return (
    <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
      <path
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        d="M12 21s-7-4.4-7-10a4 4 0 0 1 7-2 4 4 0 0 1 7 2c0 5.6-7 10-7 10z"
      />
    </svg>
  );
}

function IconCheck() {
  return (
    <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
      <circle cx="12" cy="12" r="8.2" fill="none" stroke="currentColor" strokeWidth="1.8" />
      <path
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        d="m8.4 12.2 2.4 2.4 4.8-5.2"
      />
    </svg>
  );
}

function IconPeople() {
  return (
    <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
      <circle cx="9" cy="8" r="3" fill="none" stroke="currentColor" strokeWidth="1.8" />
      <path
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        d="M4 19c.4-3.2 2.4-5 5-5s4.6 1.8 5 5"
      />
      <circle cx="17" cy="9" r="2.2" fill="none" stroke="currentColor" strokeWidth="1.8" />
      <path
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        d="M16.2 14.2c1.8.3 3.2 1.6 3.6 4.3"
      />
    </svg>
  );
}

function IconMore() {
  return (
    <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
      <circle cx="5.5" cy="12" r="1.6" fill="currentColor" />
      <circle cx="12" cy="12" r="1.6" fill="currentColor" />
      <circle cx="18.5" cy="12" r="1.6" fill="currentColor" />
    </svg>
  );
}

const TABS: {
  href: string;
  label: string;
  match: string[];
  icon: ReactNode;
  accent?: boolean;
}[] = [
  { href: "/", label: "Start", match: ["home"], icon: <IconHome /> },
  { href: "/spitex", label: "Spitex", match: ["spitex"], icon: <IconCare /> },
  {
    href: "/anspruchscheck",
    label: "Check",
    match: ["anspruchscheck", "lohn-check"],
    icon: <IconCheck />,
    accent: true,
  },
  {
    href: "/angehoerige",
    label: "Angehörige",
    match: ["angehoerige"],
    icon: <IconPeople />,
  },
];

export function AppTabBar({
  view,
  menuOpen,
  onMore,
}: {
  view: string;
  menuOpen: boolean;
  onMore: () => void;
}) {
  const moreActive = menuOpen || MORE_VIEWS.has(view);

  return (
    <nav className="app-tabbar" aria-label="App-Menü">
      {TABS.map((tab) => {
        const active = tab.match.includes(view);
        return (
          <a
            key={tab.href}
            href={tab.href}
            className={`app-tab${active ? " is-active" : ""}${tab.accent ? " is-accent" : ""}`}
            aria-current={active ? "page" : undefined}
            onClick={() => haptic()}
          >
            <span className="app-tab-icon">{tab.icon}</span>
            <span className="app-tab-label">{tab.label}</span>
          </a>
        );
      })}
      <button
        type="button"
        className={`app-tab${moreActive ? " is-active" : ""}`}
        aria-expanded={menuOpen}
        aria-controls="app-menu-sheet"
        onClick={() => {
          haptic();
          onMore();
        }}
      >
        <span className="app-tab-icon">
          <IconMore />
        </span>
        <span className="app-tab-label">Menü</span>
      </button>
    </nav>
  );
}

const SHEET_LINKS: { href: string; label: string; hint: string }[] = [
  { href: "/begleitung", label: "Begleitung", hint: "Alltag, Termine, Teilhabe" },
  { href: "/ueber-uns", label: "Über uns", hint: "Team und Haltung" },
  { href: "/tarife", label: "Tarife", hint: "KLV, UVG, Hauswirtschaft" },
  { href: "/ratgeber", label: "Ratgeber", hint: "Lohn, Anspruch, Pflege" },
  { href: "/bewerbung", label: "Bewerbung", hint: "Pflegefachkräfte gesucht" },
  { href: "/kontakt", label: "Kontakt", hint: "Anruf oder Rückruf" },
  { href: "/lohn-check", label: "Lohn-Check", hint: "Erste Bruttoschätzung" },
];

export function AppMenuSheet({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  return (
    <div
      className={`app-sheet${open ? " is-open" : ""}`}
      role="dialog"
      aria-modal="true"
      aria-hidden={!open}
      aria-labelledby="app-menu-title"
      id="app-menu-sheet"
    >
      <button
        type="button"
        className="app-sheet-backdrop"
        aria-label="Menü schliessen"
        onClick={onClose}
      />
      <div className="app-sheet-panel">
        <div className="app-sheet-handle" aria-hidden="true" />
        <div className="app-sheet-head">
          <h2 id="app-menu-title">Menü</h2>
          <button type="button" className="app-sheet-close" onClick={onClose}>
            Schliessen
          </button>
        </div>
        <div className="app-sheet-list">
          {SHEET_LINKS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="app-sheet-row"
              onClick={() => {
                haptic();
                onClose();
              }}
            >
              <span>
                <b>{item.label}</b>
                <small>{item.hint}</small>
              </span>
              <span aria-hidden="true">›</span>
            </a>
          ))}
        </div>
        <a
          className="app-sheet-call"
          href="tel:+41434338800"
          onClick={() => haptic(20)}
        >
          Anrufen 043 433 88 00
        </a>
      </div>
    </div>
  );
}

export function PWARegister() {
  useEffect(() => {
    const standalone =
      window.matchMedia("(display-mode: standalone)").matches ||
      Boolean(
        "standalone" in navigator &&
          (navigator as Navigator & { standalone?: boolean }).standalone,
      );
    document.documentElement.classList.toggle("pwa-standalone", standalone);

    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.register("/sw.js").catch(() => undefined);
    }
  }, []);
  return null;
}
