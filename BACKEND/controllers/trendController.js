import MLOutput from "../models/mlOutputModel.js";

export const getMonthlyPerformance = async (req, res) => {
  try {
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

    const result = await MLOutput.aggregate([
      {
        $addFields: {
          dateObj: {
            $convert: {
              input: "$purchase_date",
              to: "date",
              onError: null,   // if conversion fails, set null
              onNull: null
            }
          }
        }
      },
      {
        $match: {
          dateObj: { $ne: null, $gte: sixMonthsAgo }
        }
      },
      {
        $addFields: {
          month: { $month: "$dateObj" },
          year: { $year: "$dateObj" }
        }
      },
      {
        $group: {
          _id: { year: "$year", month: "$month" },
          avgScore: { $avg: "$supplier_score" }
        }
      },
      {
        $sort: { "_id.year": 1, "_id.month": 1 }
      },
      {
        $project: {
          _id: 0,
          year: "$_id.year",
          month: "$_id.month",
          avgScore: { $round: ["$avgScore", 2] }
        }
      }
    ]);

    res.status(200).json(result);
  } catch (err) {
    console.error("❌ Error fetching performance trend:", err);
    res.status(500).json({ error: err.message });
  }
};


