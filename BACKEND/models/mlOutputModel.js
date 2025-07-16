import mongoose from "mongoose";

const mlOutputSchema = new mongoose.Schema({
  supplier_name: String,
  product_name: String,
  region: String,
  delivery_time_days: Number,
  return_rate: Number,
  unit_cost: Number,
  qc_pass_rate: Number,
  purchase_date: String,
  supplier_score: Number,
  supplier_rank: Number,
}, { collection: 'ml_outputs' }); 

const MLOutput = mongoose.model("MLOutput", mlOutputSchema);

export default MLOutput;
