import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import supplierRoutes from "./routes/supplierRoutes.js";
import summaryRoutes from "./routes/summaryRoutes.js";

dotenv.config();
const app = express();
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

app.use("/api/suppliers", supplierRoutes);
app.use("/api/summary", summaryRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
