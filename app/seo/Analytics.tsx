"use client";

import { useEffect } from "react";

const GTM_ID = "GTM-PJKS83HR";
const STORAGE_KEY = "lumina-cookie-consent";
const CONSENT_EVENT = "lumina-cookie-consent-change";
const SCRIPT_ID = "lumina-gtm";

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
  }
}

function loadTagManager() {
  if (document.getElementById(SCRIPT_ID)) return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ "gtm.start": Date.now(), event: "gtm.js" });
  const script = document.createElement("script");
  script.id = SCRIPT_ID;
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtm.js?id=${GTM_ID}`;
  document.head.appendChild(script);
}

export function Analytics() {
  useEffect(() => {
    try {
      if (window.localStorage.getItem(STORAGE_KEY) === "analytics") loadTagManager();
    } catch {
      // Ohne lesbare Einwilligung kein Tracking.
    }

    const onConsent = (event: Event) => {
      if ((event as CustomEvent<string>).detail === "analytics") loadTagManager();
    };
    window.addEventListener(CONSENT_EVENT, onConsent);
    return () => window.removeEventListener(CONSENT_EVENT, onConsent);
  }, []);

  return null;
}
