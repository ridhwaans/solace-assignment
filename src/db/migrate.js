const { drizzle } = require("drizzle-orm/postgres-js");
const { migrate } = require("drizzle-orm/postgres-js/migrator");
const postgres = require("postgres");

const runMigration = async () => {
  if (!process.env.DATABASE_URL) throw new Error("DATABASE_URL is not set");

  console.log("DATABASE_URL:", process.env.DATABASE_URL);

  const sql = postgres(process.env.DATABASE_URL, { max: 1 });

  try {
    const db = drizzle(sql);
    await migrate(db, { migrationsFolder: "drizzle" });
    console.log("Successfully ran migration.");
  } catch (e) {
    console.error("Failed to run migration.");
    console.error(e);
    process.exitCode = 1;
  } finally {
    await sql.end();
  }
};

runMigration();