// routes/ml.js
const express = require('express');
const axios = require('axios');

const router = express.Router();

router.post('/predict', async (req, res) => {
  try {
    const flaskResponse = await axios.post('http://localhost:5001/predict', req.body);
    res.json(flaskResponse.data); // Send back ML prediction to frontend
    console.log(res.json(flaskResponse.data));
    
  } catch (err) {
    console.error("Error talking to Flask backend:", err.message);
    res.status(500).json({ error: "ML prediction failed" });
  }
});

module.exports = router;
