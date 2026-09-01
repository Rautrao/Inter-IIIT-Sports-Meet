import "dotenv/config";
import pg from "pg";
import { drizzle } from "drizzle-orm/node-postgres";
import { eq } from "drizzle-orm";
import bcrypt from "bcryptjs";
import { users } from "./schema.js";
import { iiits } from "../data/iiits.js";

const { Pool } = pg;

function slugify(name) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

async function seed() {
  const databaseUrl = process.env.DATABASE_URL;
  if (!databaseUrl) {
    console.error("❌ Error: DATABASE_URL is not set in the environment.");
    process.exit(1);
  }

  const isLocalhost =
    databaseUrl.includes("localhost") || databaseUrl.includes("127.0.0.1");

  const pool = new Pool({
    connectionString: databaseUrl,
    ssl: isLocalhost ? false : { rejectUnauthorized: false },
  });

  const db = drizzle(pool);

  console.log("🌱 Seeding database...");

  const adminPassword = process.env.ADMIN_PASSWORD || "admin_sports_2026";
  const defaultIIITPassword = process.env.DEFAULT_IIIT_PASSWORD || "iiit_sports_2026";

  const adminHash = await bcrypt.hash(adminPassword, 10);
  const iiitHash = await bcrypt.hash(defaultIIITPassword, 10);

  // 1. Seed Admin User
  const existingAdmin = await db
    .select()
    .from(users)
    .where(eq(users.username, "admin"))
    .limit(1);

  if (existingAdmin.length === 0) {
    await db.insert(users).values({
      username: "admin",
      passwordHash: adminHash,
      role: "admin",
      iiitName: null,
      iiitCode: null,
    });
    console.log("✅ Created Admin account: 'admin'");
  } else {
    console.log("ℹ️ Admin account 'admin' already exists.");
  }

  // 2. Seed 25 IIIT Accounts
  let createdCount = 0;
  for (const item of iiits) {
    const code = slugify(item.name);
    const username = code;

    const existing = await db
      .select()
      .from(users)
      .where(eq(users.username, username))
      .limit(1);

    if (existing.length === 0) {
      await db.insert(users).values({
        username,
        passwordHash: iiitHash,
        role: "iiit",
        iiitName: item.name,
        iiitCode: code,
      });
      createdCount++;
    }
  }

  console.log(`✅ Seeded ${createdCount} new IIIT accounts (Total: ${iiits.length}).`);
  console.log("🎉 Seeding complete.");

  await pool.end();
}

seed().catch((err) => {
  console.error("❌ Seed failed with error:", err);
  process.exit(1);
});
