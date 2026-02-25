import { Router } from "express";
import type { Portfolio } from "@types";
import { getAllJobs } from "src/models/job.model";
import { getAllProjects } from "src/models/project.model";
import { getAllAwards } from "src/models/award.model";
import { getSkillsList } from "src/models/skill.model";

const router = Router();

// GET /v1/portfolio - Get all portfolio data
router.get("/portfolio", async (req, res) => {
  try {
    const jobs = await getAllJobs();
    const projects = await getAllProjects();
    const awards = await getAllAwards();
    const skills = await getSkillsList();

    const portfolio: Portfolio = {
      jobs,
      projects,
      awards,
      skills,
    };

    res.json(portfolio);
  } catch (error) {
    console.error("Error reading portfolio data:", error);
    res.status(500).json({ error: "Failed to load portfolio data" });
  }
});

export const portfolioRouter: Router = router;
