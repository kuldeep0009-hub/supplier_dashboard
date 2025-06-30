import mongoose from 'mongoose';

const supplierSchema = new mongoose.Schema({
  product_id: String,
  product_name: String,
  supplier_id: String,
  supplier_name: String,
  region: String,
  purchase_date: String,
  units_purchased: Number,
  unit_cost: Number,
  total_cost: Number,
  delivery_time_days: Number,
  qc_pass_rate: Number,
  customer_rating_avg: Number,
  damaged_on_arrival: Number,
  complaint_count: Number,
  units_returned: Number,
  return_rate: Number,
  supplier_score: Number,
  supplier_rank: Number,
  predicted_supplier_score: Number,
  predicted_supplier_rank: Number,
  timestamp: { type: Date, default: Date.now },
   
  
},{collection: 'ml_outputs'});

// ✅ Force collection to 'ml_output'
export default mongoose.model('Supplier', supplierSchema, 'ml_outputs');
