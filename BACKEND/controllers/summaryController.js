import Supplier from "../models/Supplier.js";

export const getSummary = async (req, res) => {
  try {
    // 1. Get all data without filter
    const data = await Supplier.find();
       console.log(data.length);
       console.log(data[0]);
       
       
    if (data.length === 0) return res.json({ message: "No data found" });

    // 2. Best Supplier by supplier_score
    const bestSupplier = data.reduce((a, b) =>
      a.supplier_score > b.supplier_score ? a : b
    );
     
    // 3. Worst Product by QC pass rate
    const worstProduct = data.reduce((a, b) =>
      a.qc_pass_rate < b.qc_pass_rate ? a : b
    );

    // 4. Current vs Last Month Avg Supplier Score
    const now = new Date();
    const lastMonth = new Date();
    lastMonth.setMonth(lastMonth.getMonth() - 1);

    const currentScores = data.map((d) => d.supplier_score);

    const lastMonthData = await Supplier.find({
      timestamp: { $lte: lastMonth },
    });
    const lastMonthScores = lastMonthData.map((d) => d.supplier_score);

    const avg = (arr) => arr.reduce((a, b) => a + b, 0) / (arr.length || 1);
    const trend = avg(currentScores) - avg(lastMonthScores);  
    const percentageChange = (trend / (avg(lastMonthScores) || 1)) * 100;
     console.log(percentageChange);
     
    // 5. Final Response
    res.json({
      bestSupplier,
      worstProduct,
      avgScoreTrend: percentageChange.toFixed(2) + "%",
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
