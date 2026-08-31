CREATE TABLE IF NOT EXISTS "leads" (
	"id" serial PRIMARY KEY NOT NULL,
	"tenant" text DEFAULT 'lumina' NOT NULL,
	"source" text NOT NULL,
	"purpose" text DEFAULT 'service_request' NOT NULL,
	"status" text DEFAULT 'held' NOT NULL,
	"name" text DEFAULT '' NOT NULL,
	"contact" text NOT NULL,
	"topic" text DEFAULT '' NOT NULL,
	"message" text DEFAULT '' NOT NULL,
	"details" text DEFAULT '{}' NOT NULL,
	"consent" boolean NOT NULL,
	"marketing_consent" boolean DEFAULT false NOT NULL,
	"consent_version" text DEFAULT 'lumina-lead-v1' NOT NULL,
	"consented_at" timestamp with time zone DEFAULT now() NOT NULL,
	"idempotency_key" text NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
