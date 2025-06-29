const Supplier = require('../models/Supplier');
const axios = require('axios');

// GET all suppliers with filters
const getSuppliers = async (req, res) => {
  try {
    // Filters from query params
    const { region, product, supplier } = req.query;

    // Query object
    let query = {};
    if (region && region !== 'All') query.region = region;
    if (product && product !== 'All') query.product = product;
    if (supplier && supplier !== 'All') query.name = supplier;

    const suppliers = await Supplier.find(query);
    res.json(suppliers);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// AddSupplier and updateSupplier as before (no change needed)
const addSupplier = async (req, res) => {
  //... tera existing code yahi rahega
};

const updateSupplier = async (req, res) => {
  //... tera existing code yahi rahega
};

module.exports = { getSuppliers, addSupplier, updateSupplier };
