import { Router } from "express";
import { getAllJobs, getJobById, updateJob, createJob, deleteJob } from "../models/job.model.js";
import { getSignedUploadUrl } from "../lib/storage.js";
import type { Job } from "@types";
import { authMiddleware } from "../middleware/auth.js";

const router = Router();

// GET /v1/jobs - Get all jobs
router.get("/jobs", async (_req, res) => {
  try {
    const jobs = await getAllJobs();
    res.json(jobs);
  } catch (error) {
    console.error("Error reading jobs:", error);
    res.status(500).json({ error: "Failed to load jobs" });
  }
});

router.get("/jobs/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const job = await getJobById(Number(id));
    res.json(job);
  } catch (error) {
    console.error("Error reading jobs:", error);
    res.status(500).json({ error: "Failed to load jobs" });
  }
});

// POST /v1/jobs - Create a new job (protected)
router.post("/jobs", authMiddleware, async (req, res) => {
  try {
    const data = req.body as Partial<Job>;
    const created = await createJob(data);
    res.status(201).json(created);
  } catch (error) {
    console.error("Error creating job:", error);
    res.status(500).json({ error: "Failed to create job" });
  }
});

// PUT /v1/jobs/:id - Update a job (protected)
router.put("/jobs/:id", authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body as Partial<Job>;
    const updated = await updateJob(Number(id), data);
    if (!updated) return res.status(404).json({ error: "Job not found" });
    res.json(updated);
  } catch (error) {
    console.error("Error updating job:", error);
    res.status(500).json({ error: "Failed to update job" });
  }
});

// PATCH /v1/jobs/:id/icon - Save the icon URL to the job (protected)
router.patch("/jobs/:id/icon", authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const { icon } = req.body as { icon: string };
    if (!icon) return res.status(400).json({ error: "icon is required" });
    const updated = await updateJob(Number(id), { icon });
    if (!updated) return res.status(404).json({ error: "Job not found" });
    res.json(updated);
  } catch (error) {
    console.error("Error saving icon:", error);
    res.status(500).json({ error: "Failed to save icon" });
  }
});

// GET /v1/jobs/:id/icon-upload-url - Get a signed URL to upload directly to GCS (protected)
router.get("/jobs/:id/icon-upload-url", authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const contentType = (req.query.contentType as string) || "image/png";
    const ext = contentType.split("/")[1] ?? "png";
    const { signedUrl, publicUrl } = await getSignedUploadUrl(`jobs/${id}.${ext}`, contentType);
    res.json({ signedUrl, publicUrl });
  } catch (error) {
    console.error("Error generating upload URL:", error);
    res.status(500).json({ error: "Failed to generate upload URL" });
  }
});

// DELETE /v1/jobs/:id - Delete a job (protected)
router.delete("/jobs/:id", authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await deleteJob(Number(id));
    if (!deleted) return res.status(404).json({ error: "Job not found" });
    res.status(204).send();
  } catch (error) {
    console.error("Error deleting job:", error);
    res.status(500).json({ error: "Failed to delete job" });
  }
});

export const jobsRouter: Router = router;
