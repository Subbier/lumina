import {
  boolean,
  pgTable,
  serial,
  text,
  timestamp,
  uniqueIndex,
} from "drizzle-orm/pg-core";

export const leads = pgTable(
  "leads",
  {
    id: serial("id").primaryKey(),
    tenant: text("tenant").notNull().default("lumina"),
    source: text("source").notNull(),
    purpose: text("purpose").notNull().default("service_request"),
    status: text("status").notNull().default("held"),
    name: text("name").notNull().default(""),
    contact: text("contact").notNull(),
    topic: text("topic").notNull().default(""),
    message: text("message").notNull().default(""),
    details: text("details").notNull().default("{}"),
    consent: boolean("consent").notNull(),
    marketingConsent: boolean("marketing_consent").notNull().default(false),
    consentVersion: text("consent_version").notNull().default("lumina-lead-v1"),
    consentedAt: timestamp("consented_at", { withTimezone: true }).notNull().defaultNow(),
    idempotencyKey: text("idempotency_key").notNull(),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => [
    uniqueIndex("leads_idempotency_key_unique").on(table.idempotencyKey),
  ],
);
