import { Router } from "express";
import {
  getAllProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject,
  reorderProjects,
} from "../models/project.model.js";
import { getSignedUploadUrl } from "../lib/storage.js";
import type { Project } from "@types";
import { authMiddleware } from "../middleware/auth.js";

const router = Router();

router.get("/projects", async (_req, res) => {
  try {
    res.json(await getAllProjects());
  } catch (error) {
    console.error("Error reading projects:", error);
    res.status(500).json({ error: "Failed to load projects" });
  }
});

router.get("/projects/:id", async (req, res) => {
  try {
    const project = await getProjectById(Number(req.params.id));
    if (!project) return res.status(404).json({ error: "Project not found" });
    res.json(project);
  } catch (error) {
    console.error("Error reading project:", error);
    res.status(500).json({ error: "Failed to load project" });
  }
});

router.post("/projects", authMiddleware, async (req, res) => {
  try {
    const created = await createProject(req.body as Omit<Project, "id">);
    res.status(201).json(created);
  } catch (error) {
    console.error("Error creating project:", error);
    res.status(500).json({ error: "Failed to create project" });
  }
});

router.put("/projects/reorder", authMiddleware, async (req, res) => {
  try {
    const { ids } = req.body as { ids: number[] };
    if (!Array.isArray(ids)) return res.status(400).json({ error: "ids must be an array" });
    res.json(await reorderProjects(ids));
  } catch (error) {
    console.error("Error reordering projects:", error);
    res.status(500).json({ error: "Failed to reorder projects" });
  }
});

router.put("/projects/:id", authMiddleware, async (req, res) => {
  try {
    const updated = await updateProject(Number(req.params.id), req.body as Partial<Project>);
    if (!updated) return res.status(404).json({ error: "Project not found" });
    res.json(updated);
  } catch (error) {
    console.error("Error updating project:", error);
    res.status(500).json({ error: "Failed to update project" });
  }
});

router.delete("/projects/:id", authMiddleware, async (req, res) => {
  try {
    const deleted = await deleteProject(Number(req.params.id));
    if (!deleted) return res.status(404).json({ error: "Project not found" });
    res.status(204).send();
  } catch (error) {
    console.error("Error deleting project:", error);
    res.status(500).json({ error: "Failed to delete project" });
  }
});

router.get("/projects/:id/image-upload-url", authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const contentType = (req.query.contentType as string) || "image/png";
    const ext = contentType.split("/")[1] ?? "png";
    const { signedUrl, publicUrl } = await getSignedUploadUrl(`projects/headers/${id}.${ext}`, contentType);
    res.json({ signedUrl, publicUrl });
  } catch (error) {
    console.error("Error generating image upload URL:", error);
    res.status(500).json({ error: "Failed to generate upload URL" });
  }
});

router.get("/projects/:id/readme-upload-url", authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const contentType = (req.query.contentType as string) || "text/markdown";
    const ext = contentType === "application/pdf" ? "pdf" : "md";
    const { signedUrl, publicUrl } = await getSignedUploadUrl(`projects/readmes/${id}.${ext}`, contentType);
    res.json({ signedUrl, publicUrl });
  } catch (error) {
    console.error("Error generating readme upload URL:", error);
    res.status(500).json({ error: "Failed to generate upload URL" });
  }
});

export const projectsRouter: Router = router;
