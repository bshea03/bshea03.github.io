import { Router } from "express";
import type { Portfolio } from "@types";
import { getAllJobs } from "../models/job.model.js";
import { getAllProjects } from "../models/project.model.js";
import { getAllAwards } from "../models/award.model.js";
import { getSkillsList } from "../models/skill.model.js";

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
