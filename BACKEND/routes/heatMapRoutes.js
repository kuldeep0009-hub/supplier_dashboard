// routes/analyticsRoutes.js
import express from "express";
import { getAvgScoreByRegion } from "../controllers/heatMapController.js";

const router = express.Router();

router.get("/avg-region-scores", getAvgScoreByRegion);

export default router;
