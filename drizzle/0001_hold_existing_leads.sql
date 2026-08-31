ALTER TABLE "leads" ADD COLUMN IF NOT EXISTS "tenant" text DEFAULT 'lumina' NOT NULL;
--> statement-breakpoint
ALTER TABLE "leads" ADD COLUMN IF NOT EXISTS "purpose" text DEFAULT 'service_request' NOT NULL;
--> statement-breakpoint
ALTER TABLE "leads" ADD COLUMN IF NOT EXISTS "status" text DEFAULT 'held' NOT NULL;
--> statement-breakpoint
ALTER TABLE "leads" ADD COLUMN IF NOT EXISTS "marketing_consent" boolean DEFAULT false NOT NULL;
--> statement-breakpoint
ALTER TABLE "leads" ADD COLUMN IF NOT EXISTS "consent_version" text DEFAULT 'lumina-lead-v1' NOT NULL;
--> statement-breakpoint
ALTER TABLE "leads" ADD COLUMN IF NOT EXISTS "consented_at" timestamp with time zone DEFAULT now() NOT NULL;
--> statement-breakpoint
ALTER TABLE "leads" ADD COLUMN IF NOT EXISTS "idempotency_key" text;
--> statement-breakpoint
UPDATE "leads"
	SET "idempotency_key" = 'legacy-' || "id"::text
	WHERE "idempotency_key" IS NULL;
--> statement-breakpoint
ALTER TABLE "leads" ALTER COLUMN "idempotency_key" SET NOT NULL;
--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "leads_idempotency_key_unique"
	ON "leads" USING btree ("idempotency_key");
