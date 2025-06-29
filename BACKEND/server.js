const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const connectDB = require('./config/db');
const dotenv = require('dotenv');
const axios = require("axios");
const apiRoutes = require("./routes/api");

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use('/api/suppliers', require('./routes/supplierRoutes'));
app.use('/api/ml', require('./routes/ml'));
app.use('/api/summary', require('./routes/summaryRoutes'));
app.use("/api", apiRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));