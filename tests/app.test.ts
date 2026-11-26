import request from "supertest";
import { beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("@/config/database.js", () => ({
  isDatabaseHealthy: vi.fn(),
}));

import app from "@/app.js";
import { isDatabaseHealthy } from "@/config/database.js";

describe("GET /api/health", () => {
  beforeEach(() => {
    vi.mocked(isDatabaseHealthy).mockReset();
  });

  it("200 when database is connected", async () => {
    vi.mocked(isDatabaseHealthy).mockResolvedValue(true);

    const res = await request(app).get("/api/health");

    expect(res.status).toBe(200);
    expect(res.body).toMatchObject({ status: "success", database: "up" });
  });

  it("503 when database is unreachable", async () => {
    vi.mocked(isDatabaseHealthy).mockResolvedValue(false);

    const res = await request(app).get("/api/health");

    expect(res.status).toBe(503);
    expect(res.body).toMatchObject({ status: "error", database: "down" });
  });
});
