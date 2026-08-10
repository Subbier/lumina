import { getDb, hasDatabase } from "../../../db";
import { leads } from "../../../db/schema";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as Record<string, unknown>;
    const contact = String(body.contact ?? "").trim();
    const consent = body.consent === true;
    if (!contact || !consent) {
      return Response.json(
        { error: "Kontakt und Einwilligung sind erforderlich." },
        { status: 400 }
      );
    }

    const payload = {
      source: String(body.source ?? "website").slice(0, 80),
      name: String(body.name ?? "").slice(0, 160),
      contact: contact.slice(0, 240),
      topic: String(body.topic ?? "").slice(0, 160),
      message: String(body.message ?? "").slice(0, 4000),
      details: JSON.stringify(body.details ?? {}).slice(0, 6000),
      consent,
    };

    if (!hasDatabase()) {
      console.warn("lead-create-no-db", payload);
      return Response.json(
        { ok: true, id: `pending-${Date.now()}`, persisted: false },
        { status: 201 }
      );
    }

    const [lead] = await getDb()
      .insert(leads)
      .values(payload)
      .returning({ id: leads.id });

    return Response.json({ ok: true, id: lead.id, persisted: true }, { status: 201 });
  } catch (error) {
    console.error("lead-create", error);
    return Response.json(
      { error: "Die Anfrage konnte nicht gespeichert werden." },
      { status: 500 }
    );
  }
}
