import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

import {
  forwardingEnabled,
  prepareLeadPayload,
  unavailableLeadSinkResponse,
} from "../lib/lead-contract.mjs";
import { submitLead } from "../lib/lead-client.ts";

const root = new URL("../", import.meta.url);
const read = (path) => readFile(new URL(path, root), "utf8");

test("rejects an unconfigured durable lead sink instead of reporting success", async () => {
  const response = unavailableLeadSinkResponse();

  assert.equal(response.status, 503);
  assert.deepEqual(await response.json(), {
    ok: false,
    persisted: false,
    status: "unavailable",
    error: "Die Anfrage kann momentan nicht sicher gespeichert werden.",
  });
});

test("normalizes every Lumina source into a held, non-marketing purpose", () => {
  const cases = new Map([
    ["bewerbung", "recruiting"],
    ["kontakt-rueckruf", "service_request"],
    ["kampagne-rechner", "service_request"],
    ["home-lohn", "care_assessment"],
    ["lohn-check", "care_assessment"],
    ["angehoerige-lohn", "care_assessment"],
    ["kampagne-rechner-lohn", "care_assessment"],
  ]);

  for (const [source, purpose] of cases) {
    const result = prepareLeadPayload(
      { source, contact: "test@example.test", consent: true },
      `test-${source}`,
      new Date("2026-08-31T12:00:00.000Z"),
    );

    assert.equal(result.ok, true, source);
    assert.equal(result.value.tenant, "lumina", source);
    assert.equal(result.value.status, "held", source);
    assert.equal(result.value.purpose, purpose, source);
    assert.equal(result.value.marketingConsent, false, source);
    assert.equal(result.value.consentVersion, "lumina-lead-v1", source);
    assert.equal(result.value.consentedAt.toISOString(), "2026-08-31T12:00:00.000Z");
  }
});

test("requires explicit consent, contact and a known source", () => {
  assert.equal(prepareLeadPayload({ source: "kontakt-rueckruf", consent: true }, "a").ok, false);
  assert.equal(prepareLeadPayload({ source: "kontakt-rueckruf", contact: "x" }, "b").ok, false);
  assert.equal(
    prepareLeadPayload({ source: "unknown", contact: "x", consent: true }, "c").ok,
    false,
  );
});

test("forwarding remains disabled and no lead UI bypasses the shared submitter", async () => {
  assert.equal(forwardingEnabled(), false);

  const [site, quiz, campaign] = await Promise.all([
    read("app/LuminaSite.tsx"),
    read("app/lohn-check/LohnCheckQuiz.tsx"),
    read("app/kampagne/rechner/RechnerKampagne.tsx"),
  ]);

  for (const source of [site, quiz, campaign]) {
    assert.doesNotMatch(source, /fetch\(["']\/api\/leads["']/);
    assert.match(source, /submitLead/);
  }
});

test("shared form submitter rejects non-2xx and non-persisted acknowledgements", async (t) => {
  const originalFetch = globalThis.fetch;
  t.after(() => {
    globalThis.fetch = originalFetch;
  });

  const payload = {
    source: "kontakt-rueckruf",
    contact: "test@example.test",
    consent: true,
  };

  globalThis.fetch = async () =>
    Response.json({ persisted: false, status: "unavailable" }, { status: 503 });
  await assert.rejects(submitLead(payload, "test-error"));

  globalThis.fetch = async () =>
    Response.json({ persisted: false, status: "held" }, { status: 201 });
  await assert.rejects(submitLead(payload, "test-not-persisted"));

  globalThis.fetch = async () =>
    Response.json({ persisted: true, status: "held" }, { status: 201 });
  await assert.doesNotReject(submitLead(payload, "test-held"));
});

test("lead migrations are PostgreSQL and preserve existing rows", async () => {
  const [initial, upgrade, journal] = await Promise.all([
    read("drizzle/0000_create_leads.sql"),
    read("drizzle/0001_hold_existing_leads.sql"),
    read("drizzle/meta/_journal.json"),
  ]);

  assert.doesNotMatch(initial, /`|AUTOINCREMENT|integer NOT NULL/);
  assert.match(initial, /CREATE TABLE IF NOT EXISTS "leads"/);
  assert.match(upgrade, /ADD COLUMN IF NOT EXISTS "status"/);
  assert.match(upgrade, /SET "idempotency_key" = 'legacy-' \|\| "id"::text/);
  assert.doesNotMatch(upgrade, /DROP|DELETE|TRUNCATE/i);
  assert.equal(JSON.parse(journal).dialect, "postgresql");
});
