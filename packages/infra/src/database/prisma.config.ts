import "dotenv/config";
import { defineConfig, env } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  datasource: {
    url: env("DATABASE_URL"),
    // ⚠️ Do not define DIRECT_URL in production environments
    // shadowDatabaseUrl: env("DIRECT_URL"),
  },
});
