import { Router } from "express";
import { getAllAwards, getAwardById, createAward, updateAward, deleteAward, reorderAwards } from "../models/award.model.js";
import type { Award } from "@types";
import { authMiddleware } from "../middleware/auth.js";

const router = Router();

router.get("/awards", async (_req, res) => {
  try {
    const awards = await getAllAwards();
    res.json(awards);
  } catch (error) {
    console.error("Error reading awards:", error);
    res.status(500).json({ error: "Failed to load awards" });
  }
});

router.get("/awards/:id", async (req, res) => {
  try {
    const award = await getAwardById(Number(req.params.id));
    if (!award) return res.status(404).json({ error: "Award not found" });
    res.json(award);
  } catch (error) {
    console.error("Error reading award:", error);
    res.status(500).json({ error: "Failed to load award" });
  }
});

router.post("/awards", authMiddleware, async (req, res) => {
  try {
    const created = await createAward(req.body as Omit<Award, "id">);
    res.status(201).json(created);
  } catch (error) {
    console.error("Error creating award:", error);
    res.status(500).json({ error: "Failed to create award" });
  }
});

router.put("/awards/reorder", authMiddleware, async (req, res) => {
  try {
    const { ids } = req.body as { ids: number[] };
    if (!Array.isArray(ids)) return res.status(400).json({ error: "ids must be an array" });
    const reordered = await reorderAwards(ids);
    res.json(reordered);
  } catch (error) {
    console.error("Error reordering awards:", error);
    res.status(500).json({ error: "Failed to reorder awards" });
  }
});

router.put("/awards/:id", authMiddleware, async (req, res) => {
  try {
    const updated = await updateAward(Number(req.params.id), req.body as Partial<Award>);
    if (!updated) return res.status(404).json({ error: "Award not found" });
    res.json(updated);
  } catch (error) {
    console.error("Error updating award:", error);
    res.status(500).json({ error: "Failed to update award" });
  }
});

router.delete("/awards/:id", authMiddleware, async (req, res) => {
  try {
    const deleted = await deleteAward(Number(req.params.id));
    if (!deleted) return res.status(404).json({ error: "Award not found" });
    res.status(204).send();
  } catch (error) {
    console.error("Error deleting award:", error);
    res.status(500).json({ error: "Failed to delete award" });
  }
});

export const awardsRouter: Router = router;
