import { Router } from "express";
import { getAllJobs, getJobById } from "src/models/job.model";

const router = Router();

// GET /v1/jobs - Get all jobs
router.get("/jobs", async (req, res) => {
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

export const jobsRouter: Router = router;
