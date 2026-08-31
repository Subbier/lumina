export type LuminaLeadInput = {
  source: string;
  name?: string;
  contact: string;
  topic?: string;
  message?: string;
  details?: Record<string, unknown>;
  consent: true;
};

export async function submitLead(
  payload: LuminaLeadInput,
  idempotencyKey: string,
) {
  const response = await fetch("/api/leads", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "idempotency-key": idempotencyKey,
    },
    body: JSON.stringify(payload),
  });

  const result = (await response.json().catch(() => null)) as {
    persisted?: boolean;
    status?: string;
    error?: string;
  } | null;

  if (!response.ok || result?.persisted !== true || result.status !== "held") {
    throw new Error(
      result?.error || "Die Anfrage konnte nicht sicher gespeichert werden.",
    );
  }

  return result;
}

