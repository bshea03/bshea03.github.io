import express, { type RequestHandler } from "express";
import cors from "cors";
import bcrypt from "bcryptjs";
import "dotenv/config";
import jwt from "jsonwebtoken";
import { expressjwt } from "express-jwt";
import { closeDB, connectDB } from "./db/connection.js";
import { portfolioRouter } from "./routes/portfolio.js";
import { jobsRouter } from "./routes/jobs.js";
import { awardsRouter } from "./routes/awards.js";
import { projectsRouter } from "./routes/projects.js";
import { skillsRouter } from "./routes/skills.js";

const app = express();
const PORT = process.env.PORT || 8080;

const { ACCESS_TOKEN_SECRET, ADMIN_USERNAME, ADMIN_PASSWORD } = process.env;
if (!ACCESS_TOKEN_SECRET) {
  throw new Error("ACCESS_TOKEN_SECRET is not set");
}

export const authMiddleware: RequestHandler = expressjwt({
  secret: ACCESS_TOKEN_SECRET,
  algorithms: ["HS256"],
});

// middleware
app.use(cors());
app.use(express.json());

// Health check
app.get("/health", (req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

app.post("/login", async (req, res) => {
  const user = req.body.username;
  // if user not in db, respond w a 400
  //
  try {
    if (
      req.body.username !== ADMIN_USERNAME &&
      (await bcrypt.compare(ADMIN_PASSWORD as string, user.password))
    ) {
      res.send(`Logged in as ${user.name}`);
    } else {
      res.send("Incorrect username or password");
    }
  } catch (err) {
    res.sendStatus(500);
  }
  const accessToken = jwt.sign(user, ACCESS_TOKEN_SECRET, { expiresIn: "24h" });
  res.json({ accessToken });
});

// API routes
app.use("/v1", portfolioRouter);
app.use("/v1", jobsRouter);
app.use("/v1", awardsRouter);
app.use("/v1", projectsRouter);
app.use("/v1", skillsRouter);

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
