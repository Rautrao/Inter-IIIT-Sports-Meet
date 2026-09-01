import { drizzle } from "drizzle-orm/node-postgres";
import pg from "pg";
import * as schema from "./schema.js";

const { Pool } = pg;

// Singleton pool instance across Next.js hot reloads in development
let pool;

export function getPool() {
  if (!process.env.DATABASE_URL) {
    throw new Error(
      "DATABASE_URL environment variable is not defined. Please set it in your .env.local file."
    );
  }

  if (!pool) {
    const isLocalhost =
      process.env.DATABASE_URL.includes("localhost") ||
      process.env.DATABASE_URL.includes("127.0.0.1");

    pool = new Pool({
      connectionString: process.env.DATABASE_URL,
      ssl: isLocalhost ? false : { rejectUnauthorized: false },
      max: 10,
    });
  }

  return pool;
}

export function getDb() {
  const p = getPool();
  return drizzle(p, { schema });
}

export const db = new Proxy({}, {
  get(target, prop) {
    const instance = getDb();
    const val = instance[prop];
    if (typeof val === 'function') {
      return val.bind(instance);
    }
    return val;
  }
});

export { schema };
