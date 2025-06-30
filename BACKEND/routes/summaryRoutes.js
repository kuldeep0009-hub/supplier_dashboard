import express from 'express';
import { getSummary } from '../controllers/summarycontroller.js';
const router = express.Router();

router.get('/', getSummary);

export default router;
