// controllers/analyticsController.js
import MLOutput from "../models/mlOutputModel.js";

export const getAvgScoreByRegion = async (req, res) => {
  try {
    const result = await MLOutput.aggregate([
      // 1. Sort by purchased_date to get latest first
      { $sort: { purchased_date: -1 } },

      // 2. Group by supplier and product (latest entry only)
      {
        $group: {
          _id: {
            supplier: "$supplier_name",
            product: "$product_name"
          },
          region: { $first: "$region" },
          supplier_score: { $first: "$supplier_score" }
        }
      },

      // 3. Exclude documents with null supplier_score
      {
        $match: {
          supplier_score: { $ne: null }
        }
      },

      // 4. Group by region to get average score
      {
        $group: {
          _id: "$region",
          avgScore: { $avg: "$supplier_score" },
          count: { $sum: 1 }
        }
      },

      // 5. Filter to include only required regions
      {
        $match: {
          _id: {
            $in: ["Delhi NCR", "Mumbai", "Bengaluru", "Chennai", "Kolkata"]
          }
        }
      },

      // 6. Format result
      {
        $project: {
          _id: 0,
          region: "$_id",
          avgScore: { $round: ["$avgScore", 2] },
          count: 1
        }
      }
    ]);

    res.status(200).json(result);
  } catch (error) {
    console.error("Error in getAvgScoreByRegion:", error);
    res.status(500).json({ message: "Server error" });
  }
};
