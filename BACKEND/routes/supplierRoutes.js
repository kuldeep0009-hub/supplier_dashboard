import express from 'express';
import { getFilteredSuppliers } from '../controllers/supplierController.js';
const router = express.Router();

router.get('/', getFilteredSuppliers);

export default router;
