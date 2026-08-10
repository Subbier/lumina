import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "./schema";

export function hasDatabase() {
  return Boolean(process.env.DATABASE_URL);
}

export function getDb() {
  const databaseUrl = process.env.DATABASE_URL;
  if (!databaseUrl) {
    throw new Error(
      "DATABASE_URL is not set. Add a Neon/Postgres connection string in Vercel env vars to persist leads."
    );
  }

  const sql = neon(databaseUrl);
  return drizzle(sql, { schema });
}
