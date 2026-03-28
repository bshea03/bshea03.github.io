import { Router } from "express";
import { getSkillsList, updateSkillCategory } from "src/models/skill.model";
import type { Skill } from "@types";
import { authMiddleware } from "../middleware/auth.js";

const VALID_CATEGORIES = ["frontend", "backend", "cloud", "tools", "testing"];

const router = Router();

// GET /v1/skills - Get all skills
router.get("/skills", async (req, res) => {
  try {
    const skills = await getSkillsList();
    res.json(skills);
  } catch (error) {
    console.error("Error reading skills:", error);
    res.status(500).json({ error: "Failed to load skills" });
  }
});

// PUT /v1/skills/:category - Replace a category's skill array (protected)
router.put(
  "/skills/:category",
  authMiddleware,
  async (req, res) => {
    try {
      const { category } = req.params;
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
  },
);

export const skillsRouter: Router = router;
