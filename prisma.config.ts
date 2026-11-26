import "dotenv/config";
import { defineConfig } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  datasource: {
    // Migrations use DIRECT_URL (non-pooler) when available.
    // The placeholder allows `prisma generate` to run before .env is created.
    url:
      process.env.DIRECT_URL ??
      process.env.DATABASE_URL ??
      "postgresql://user:password@localhost:5432/database",
  },
});
