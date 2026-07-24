import express from "express";
import { analyzePage } from "../controllers/analyzeController.js";

const router = express.Router();

router.post("/analyze", analyzePage);

export default router;