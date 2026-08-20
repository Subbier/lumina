"use client";

import { useEffect, useState } from "react";

const STORAGE_KEY = "lumina-cookie-consent";

export function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      if (!stored) window.requestAnimationFrame(() => setVisible(true));
    } catch {
      window.requestAnimationFrame(() => setVisible(true));
    }
  }, []);

  function choose(value: "accepted" | "declined") {
    try {
      window.localStorage.setItem(STORAGE_KEY, value);
    } catch {
      /* ignore quota / private mode */
    }
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div
      className="cookie-banner"
      role="dialog"
      aria-modal="true"
      aria-labelledby="cookie-banner-title"
      aria-describedby="cookie-banner-text"
    >
      <p id="cookie-banner-title" className="sr-only">
        Cookie-Hinweis
      </p>
      <p id="cookie-banner-text">
        Wir verwenden Cookies, damit die Website zuverlässig funktioniert. Mit
        «Akzeptieren» stimmen Sie auch optionalen Cookies zu. Details in der{" "}
        <a href="/datenschutz">Datenschutzerklärung</a>.
      </p>
      <div className="cookie-banner-actions">
        <button
          type="button"
          className="cookie-banner-decline"
          onClick={() => choose("declined")}
        >
          Ablehnen
        </button>
        <button
          type="button"
          className="cookie-banner-accept"
          onClick={() => choose("accepted")}
        >
          Akzeptieren
        </button>
      </div>
    </div>
  );
}
