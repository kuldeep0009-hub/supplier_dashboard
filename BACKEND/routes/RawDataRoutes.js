import express from 'express';
import { addRawData } from '../controllers/rawDataController.js';

const router = express.Router();

router.post('/add', addRawData);

export default router;
