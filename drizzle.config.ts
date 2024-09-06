import type { Config } from "drizzle-kit";

export default {
  dialect: 'postgresql',
  schema: './src/db/schema.ts',
  dbCredentials: {
    url: process.env.DB_URL!,
  },
  out: './drizzle',
} satisfies Config