import express from "express";
import bcrypt from "bcryptjs";
import "dotenv/config";
import jwt from "jsonwebtoken";
import { rateLimit } from "express-rate-limit";
import { closeDB, connectDB } from "./db/connection.js";
import { portfolioRouter } from "./routes/portfolio.js";
import { jobsRouter } from "./routes/jobs.js";
import { awardsRouter } from "./routes/awards.js";
import { projectsRouter } from "./routes/projects.js";
import { skillsRouter } from "./routes/skills.js";
import { resumeRouter } from "./routes/resume.js";
import corsConfig from "../cors.json" with { type: "json" };

const app = express();
const PORT = process.env.PORT || 8080;
const allowedOrigins = corsConfig.flatMap((rule) => rule.origin);

const { ACCESS_TOKEN_SECRET, ADMIN_USERNAME, ADMIN_PASSWORD } = process.env;
if (!ACCESS_TOKEN_SECRET) throw new Error("ACCESS_TOKEN_SECRET is not set");

// middleware
app.use((req, res, next) => {
  const origin = req.headers.origin;
  if (origin && allowedOrigins.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  }
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  if (req.method === "OPTIONS") {
    res.sendStatus(204);
    return;
  }
  next();
});
app.use(express.json());

// Health check
app.get("/health", (req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 10,
  message: { error: "Too many login attempts. Please try again later." },
});

app.post("/login", loginLimiter, async (req, res) => {
  const { username, password } = req.body;
  try {
    const usernameMatch = username === ADMIN_USERNAME;
    const passwordMatch = await bcrypt.compare(password, ADMIN_PASSWORD as string);
    if (!usernameMatch || !passwordMatch) {
      res.status(401).json({ error: "Incorrect username or password" });
      return;
    }
    const accessToken = jwt.sign({ username }, ACCESS_TOKEN_SECRET, { expiresIn: "24h" });
    res.json({ accessToken });
  } catch (err) {
    res.sendStatus(500);
  }
});

// API routes
app.use("/v1", portfolioRouter);
app.use("/v1", jobsRouter);
app.use("/v1", awardsRouter);
app.use("/v1", projectsRouter);
app.use("/v1", skillsRouter);
app.use("/v1", resumeRouter);

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: "Not found" });
});

// Error handler
app.use(
  (
    err: Error,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
  ) => {
    console.error("Error:", err);
    res.status(500).json({ error: "Internal server error" });
  },
);

// Connect to MongoDB and start server
connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
      console.log(`Health check: http://localhost:${PORT}/health`);
      console.log(`Portfolio API: http://localhost:${PORT}/v1/portfolio`);
    });
  })
  .catch((error) => {
    console.error("Failed to connect to MongoDB:", error);
    closeDB();
    process.exit(1);
  });
