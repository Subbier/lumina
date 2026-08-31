const SOURCE_PURPOSE = Object.freeze({
  bewerbung: "recruiting",
  "kontakt-rueckruf": "service_request",
  "kampagne-rechner": "service_request",
  "home-lohn": "care_assessment",
  "lohn-check": "care_assessment",
  "angehoerige-lohn": "care_assessment",
  "kampagne-rechner-lohn": "care_assessment",
});

export const LEAD_CONSENT_VERSION = "lumina-lead-v1";

export function forwardingEnabled() {
  return false;
}

export function unavailableLeadSinkResponse() {
  return Response.json(
    {
      ok: false,
      persisted: false,
      status: "unavailable",
      error: "Die Anfrage kann momentan nicht sicher gespeichert werden.",
    },
    { status: 503 },
  );
}

export function prepareLeadPayload(body, requestedIdempotencyKey, now = new Date()) {
  const source = String(body?.source ?? "").trim();
  const contact = String(body?.contact ?? "").trim();
  const consent = body?.consent === true;
  const purpose = SOURCE_PURPOSE[source];

  if (!contact || !consent || !purpose) {
    return {
      ok: false,
      error: "Kontakt, Einwilligung und eine gültige Quelle sind erforderlich.",
    };
  }

  let details = "{}";
  try {
    details = JSON.stringify(body?.details ?? {}).slice(0, 6000);
  } catch {
    return { ok: false, error: "Die Zusatzangaben sind ungültig." };
  }

  const proposedKey = String(requestedIdempotencyKey ?? "").trim();
  const idempotencyKey = /^[A-Za-z0-9._:-]{1,128}$/.test(proposedKey)
    ? proposedKey
    : crypto.randomUUID();

  return {
    ok: true,
    value: {
      tenant: "lumina",
      source,
      purpose,
      status: "held",
      name: String(body?.name ?? "").trim().slice(0, 160),
      contact: contact.slice(0, 240),
      topic: String(body?.topic ?? "").trim().slice(0, 160),
      message: String(body?.message ?? "").trim().slice(0, 4000),
      details,
      consent: true,
      marketingConsent: false,
      consentVersion: LEAD_CONSENT_VERSION,
      consentedAt: now,
      idempotencyKey,
    },
  };
}

