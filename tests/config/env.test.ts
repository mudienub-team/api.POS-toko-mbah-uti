import { describe, expect, it } from "vitest";
import { buildConfig, config } from "@/config/index.js";
import { parseEnv } from "@/config/env.js";

const validEnv = {
  DATABASE_URL: "postgresql://user:pass@localhost:5432/db",
};

describe("parseEnv", () => {
  it("uses default values when only DATABASE_URL is provided", () => {
    const env = parseEnv(validEnv);

    expect(env.PORT).toBe(3000);
    expect(env.NODE_ENV).toBe("development");
    expect(env.CORS_ORIGIN).toBe("*");
  });

  it("coerces PORT to a number", () => {
    expect(parseEnv({ ...validEnv, PORT: "4000" }).PORT).toBe(4000);
  });

  it("throws an error if DATABASE_URL is missing", () => {
    expect(() => parseEnv({})).toThrow(/DATABASE_URL/);
  });

  it("throws an error if DATABASE_URL is not postgresql", () => {
    expect(() => parseEnv({ DATABASE_URL: "mysql://localhost/db" })).toThrow(
      /DATABASE_URL/,
    );
  });

  it("throws an error if PORT is invalid", () => {
    expect(() => parseEnv({ ...validEnv, PORT: "abc" })).toThrow(/PORT/);
  });
});

describe("buildConfig", () => {
  it("disables SSL for localhost database", () => {
    const config = buildConfig(parseEnv(validEnv));
    expect(config.database.ssl).toBe(false);
  });

  it("enables SSL for remote database", () => {
    const config = buildConfig(
      parseEnv({ DATABASE_URL: "postgresql://u:p@db.example.com:5432/db" }),
    );
    expect(config.database.ssl).toBe(true);
  });

  it("explicit DATABASE_SSL overrides auto-detection", () => {
    const config = buildConfig(parseEnv({ ...validEnv, DATABASE_SSL: "true" }));
    expect(config.database.ssl).toBe(true);
  });

  it("splits CORS_ORIGIN into a list of origins", () => {
    const config = buildConfig(
      parseEnv({ ...validEnv, CORS_ORIGIN: "http://a.com, http://b.com" }),
    );
    expect(config.cors.origin).toEqual(["http://a.com", "http://b.com"]);
  });
});

describe("env isolation during tests", () => {
  it("does not load values from the actual .env file", () => {
    expect(config.database.url).toBe(
      "postgresql://user:password@localhost:5432/test_db",
    );
    expect(config.database.directUrl).toBeUndefined();
    expect(config.isTest).toBe(true);
  });
});
