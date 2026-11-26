import { parseEnv, type Env } from "@/config/env.js";

const LOCAL_HOSTS = new Set(["localhost", "127.0.0.1", "::1"]);

function isLocalDatabase(url: string): boolean {
  try {
    return LOCAL_HOSTS.has(new URL(url).hostname);
  } catch {
    return false;
  }
}

function parseCorsOrigin(value: string): "*" | string[] {
  if (value.trim() === "*") {
    return "*";
  }
  return value
    .split(",")
    .map((origin) => origin.trim())
    .filter(Boolean);
}

export function buildConfig(env: Env) {
  return {
    nodeEnv: env.NODE_ENV,
    isProduction: env.NODE_ENV === "production",
    isTest: env.NODE_ENV === "test",
    port: env.PORT,
    cors: {
      origin: parseCorsOrigin(env.CORS_ORIGIN),
    },
    database: {
      url: env.DATABASE_URL,
      directUrl: env.DIRECT_URL,
      ssl: env.DATABASE_SSL ?? !isLocalDatabase(env.DATABASE_URL),
    },
  } as const;
}

export type AppConfig = ReturnType<typeof buildConfig>;

export const config: AppConfig = buildConfig(parseEnv());
