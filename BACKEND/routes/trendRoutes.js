import express from "express";

import { getMonthlyPerformance } from "../controllers/trendController.js";
const router = express.Router();
router.get("/", getMonthlyPerformance);

export default router;
