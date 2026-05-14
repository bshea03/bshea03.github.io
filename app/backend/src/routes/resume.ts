import { Router } from "express";
import { getSignedUploadUrl } from "../lib/storage.js";
import { authMiddleware } from "../middleware/auth.js";

const router = Router();

router.get("/resume/upload-url", authMiddleware, async (_req, res) => {
  try {
    const { signedUrl, publicUrl } = await getSignedUploadUrl(
      "resumes/brady-shea-resume.pdf",
      "application/pdf",
    );
    res.json({ signedUrl, publicUrl });
  } catch (error) {
    console.error("Error generating resume upload URL:", error);
    res.status(500).json({ error: "Failed to generate upload URL" });
  }
});

export const resumeRouter: Router = router;
