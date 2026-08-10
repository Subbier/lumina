import { boolean, pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

export const leads = pgTable("leads", {
  id: serial("id").primaryKey(),
  source: text("source").notNull(),
  name: text("name").notNull().default(""),
  contact: text("contact").notNull(),
  topic: text("topic").notNull().default(""),
  message: text("message").notNull().default(""),
  details: text("details").notNull().default("{}"),
  consent: boolean("consent").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});
