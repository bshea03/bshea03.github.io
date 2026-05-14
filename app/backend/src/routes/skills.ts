import { Router } from "express";
import { getSkillsList, updateSkillCategory } from "../models/skill.model.js";
import type { Skill } from "@types";
import { authMiddleware } from "../middleware/auth.js";

const VALID_CATEGORIES = ["frontend", "backend", "cloud", "tools", "testing"];

const router = Router();

router.get("/skills", async (_req, res) => {
  try {
    const skills = await getSkillsList();
    res.json(skills);
  } catch (error) {
    console.error("Error reading skills:", error);
    res.status(500).json({ error: "Failed to load skills" });
  }
});


router.put("/skills/:category", authMiddleware, async (req, res) => {
  try {
    const category = req.params.category as string;
    if (!VALID_CATEGORIES.includes(category)) {
      return res.status(400).json({ error: "Invalid category" });
    }
    const skills = req.body as Skill[];
    if (!Array.isArray(skills)) {
      return res.status(400).json({ error: "Body must be an array of skills" });
    }
    await updateSkillCategory(category, skills);
    res.json({ message: "Skills updated" });
  } catch (error) {
    console.error("Error updating skills:", error);
    res.status(500).json({ error: "Failed to update skills" });
  }
});

export const skillsRouter: Router = router;
