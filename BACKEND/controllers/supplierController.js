import Supplier from '../models/Supplier.js';

export const getFilteredSuppliers = async (req, res) => {
  try {
    const filters = {};

    if (req.query.region) {
      filters.region = req.query.region;
    }
    if (req.query.product_name) {
      filters.product_name = req.query.product_name;
    }

    const suppliers = await Supplier.aggregate([
      { $match: filters },

      // Step 1: Sort by purchase_date desc so latest comes first
      {
        $sort: {
          createdAt: -1
        }
      },

      // Step 2: Group by supplier_name + product_name to get latest for each product per supplier
      {
        $group: {
          _id: {
            supplier_name: "$supplier_name",
            product_name: "$product_name"
          },
          doc: { $first: "$$ROOT" }
        }
      },

      // Step 3: Flatten the structure
      {
        $replaceRoot: { newRoot: "$doc" }
      },

      // Step 4: Final sort by supplier_score descending
      {
        $sort: {
          supplier_score: -1
        }
      }
    ]);

    res.status(200).json(suppliers);
  } catch (error) {
    console.error("Error in getFilteredSuppliers:", error);
    res.status(500).json({ error: "Server Error" });
  }
};
