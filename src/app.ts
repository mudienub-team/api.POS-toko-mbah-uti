import cors from "cors";
import express from "express";
import { isDatabaseHealthy } from "@/config/database.js";
import { config } from "@/config/index.js";

const app = express();

app.use(cors({ origin: config.cors.origin }));
app.use(express.json());

app.get("/api/health", async (_req, res) => {
  const databaseUp = await isDatabaseHealthy();

  res.status(databaseUp ? 200 : 503).json({
    status: databaseUp ? "success" : "error",
    message: databaseUp ? "Backend is running" : "Database is unreachable",
    database: databaseUp ? "up" : "down",
  });
});

export default app;
