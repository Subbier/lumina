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

  function acknowledge() {
    try {
      window.localStorage.setItem(STORAGE_KEY, "acknowledged");
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
        Diese Website nutzt nur technisch notwendige lokale Speicherungen. Es
        sind derzeit keine Analyse- oder Marketing-Cookies aktiv. Details in der{" "}
        <a href="/datenschutz">Datenschutzerklärung</a>.
      </p>
      <div className="cookie-banner-actions">
        <button
          type="button"
          className="cookie-banner-accept"
          onClick={acknowledge}
        >
          Verstanden
        </button>
      </div>
    </div>
  );
}
