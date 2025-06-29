const express = require('express');
const router = express.Router();
const {
  getSuppliers,
  addSupplier,
  updateSupplier
} = require('../controllers/supplierController');

router.get('/', getSuppliers);
router.post('/', addSupplier);
router.put('/:id', updateSupplier);

module.exports = router;