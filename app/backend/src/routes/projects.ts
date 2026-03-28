import { Router } from "express";
import { getAllProjects, getProjectById } from "src/models/project.model";

const router = Router();

// GET /v1/projects - Get all projects
router.get("/projects", async (req, res) => {
  try {
    const projects = await getAllProjects();
    res.json(projects);
  } catch (error) {
    console.error("Error reading jobs:", error);
    res.status(500).json({ error: "Failed to load jobs" });
  }
});

router.get("/projects/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const project = await getProjectById(Number(id));
    res.json(project);
  } catch (error) {
    console.error("Error reading jobs:", error);
    res.status(500).json({ error: "Failed to load jobs" });
  }
});

export const projectsRouter: Router = router;
