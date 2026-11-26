import "dotenv/config";
import { z } from "zod";

const booleanString = z
  .enum(["true", "false"], { error: 'must be "true" or "false"' })
  .transform((value) => value === "true");

const envSchema = z.object({
  NODE_ENV: z
    .enum(["development", "test", "production"])
    .default("development"),
  PORT: z.coerce.number().int().min(1).max(65535).default(3000),

  DATABASE_URL: z
    .string({ error: "required." })
    .regex(/^postgres(ql)?:\/\//, "must be in the format postgresql://..."),
  // Direct (non-pooler) connection for Prisma migrations. Optional.
  DIRECT_URL: z.string().optional(),
  // If empty: SSL is enabled automatically for hosts other than localhost.
  DATABASE_SSL: booleanString.optional(),

  // "*" or a comma-separated list of origins, e.g. http://localhost:5173,https://toko.example.com
  CORS_ORIGIN: z.string().default("*"),
});

export type Env = z.infer<typeof envSchema>;

/** Validates environment variables. Throws an error listing the problems if invalid. */
export function parseEnv(source: NodeJS.ProcessEnv = process.env): Env {
  const result = envSchema.safeParse(source);

  if (!result.success) {
    const details = result.error.issues
      .map((issue) => `  - ${issue.path.join(".")}: ${issue.message}`)
      .join("\n");
    throw new Error(`Invalid environment configuration:\n${details}`);
  }

  return result.data;
}
