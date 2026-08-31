import { getDb, hasDatabase } from "../../../db";
import { leads } from "../../../db/schema";
import {
  prepareLeadPayload,
  unavailableLeadSinkResponse,
} from "../../../lib/lead-contract.mjs";
import { eq } from "drizzle-orm";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as Record<string, unknown>;
    const parsed = prepareLeadPayload(
      body,
      request.headers.get("idempotency-key"),
    );
    if (!parsed.ok || !parsed.value) {
      return Response.json(
        { ok: false, persisted: false, error: parsed.error },
        { status: 400 }
      );
    }

    if (!hasDatabase()) {
      console.warn("lead-create-no-db");
      return unavailableLeadSinkResponse();
    }

    const payload = parsed.value;
    const database = getDb();
    const [created] = await database
      .insert(leads)
      .values(payload)
      .onConflictDoNothing({ target: leads.idempotencyKey })
      .returning({ id: leads.id });

    const existing = created
      ? created
      : (
          await database
            .select({ id: leads.id })
            .from(leads)
            .where(eq(leads.idempotencyKey, payload.idempotencyKey))
            .limit(1)
        )[0];

    if (!existing) {
      throw new Error("lead-create-idempotency-lookup");
    }

    return Response.json(
      { ok: true, id: existing.id, persisted: true, status: "held" },
      { status: created ? 201 : 200 },
    );
  } catch (error) {
    console.error("lead-create", error);
    return Response.json(
      { error: "Die Anfrage konnte nicht gespeichert werden." },
      { status: 500 }
    );
  }
}
