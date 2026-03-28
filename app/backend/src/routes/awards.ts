import { Router } from "express";
import { getAllAwards, getAwardById } from "src/models/award.model";

const router = Router();

// GET /v1/awards - Get all awards
router.get("/awards", async (req, res) => {
  try {
    const awards = await getAllAwards();
    res.json(awards);
  } catch (error) {
    console.error("Error reading jobs:", error);
    res.status(500).json({ error: "Failed to load jobs" });
  }
});

router.get("/awards/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const award = await getAwardById(Number(id));
    res.json(award);
  } catch (error) {
    console.error("Error reading jobs:", error);
    res.status(500).json({ error: "Failed to load jobs" });
  }
});

export const awardsRouter: Router = router;
