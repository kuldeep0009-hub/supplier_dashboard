const express = require("express");
const router = express.Router();
const axios = require("axios");

router.post("/test-ml", async (req, res) => {
  try {
    const response = await axios.post('http://127.0.0.1:5001/predict', req.body);
    res.json({ fromFlask: response.data });
  } catch (err) {
    console.error("ML Test Route Error:", err.message);
    res.status(500).json({ error: "Flask connection failed" });
  }
});

module.exports = router;
