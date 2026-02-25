import { Router } from "express";
import { getSkillsList, updateSkill } from "src/models/skill.model";
import type { Skill } from "@types";
import { authMiddleware } from "../index.js";

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

// PATCH /v1/skills/:name - Update a skill (protected)
router.patch(
  "/skills/:name",
  authMiddleware,
  async (req: { params: { name: string }; body: any }, res) => {
    try {
      const { name } = req.params;
      const updates = req.body as Partial<Omit<Skill, "id" | "name">>;
      const result = await updateSkill(name, updates);
      if (result.matchedCount === 0) {
        return res.status(404).json({ error: "Skill not found" });
      }
      res.json({ message: "Skill updated" });
    } catch (error) {
      console.error("Error updating skill:", error);
      res.status(500).json({ error: "Failed to update skill" });
    }
  },
);

export const skillsRouter: Router = router;
