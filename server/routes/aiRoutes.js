import express from "express";
import { generateSuggestion } from "../controllers/aiController.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

router.post("/generate", protect, generateSuggestion);

export default router;
