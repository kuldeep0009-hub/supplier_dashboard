// routes/summaryRoutes.js
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  // Fetch ya mock summary data yaha send karo
  res.json({
    bestSupplier: { name: "TechCorp Solutions", score: 95 },
    mostFlaggedProduct: { name: "Smartphones", issueCount: 8 },
    averageScoreTrend: 87
  });
});

module.exports = router;