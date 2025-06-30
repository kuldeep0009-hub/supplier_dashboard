import mongoose from 'mongoose';

const rawDataSchema = new mongoose.Schema({
  product_name: String,
  supplier_name: String,
  region: String,
  purchase_date: Date,
  units_purchased: Number,
  unit_cost: Number,
  delivery_time_days: Number,
  qc_pass_rate: Number,
  damaged_on_arrival: Number,
  units_returned: Number,
  return_rate: Number
}, {
  timestamps: true // will add createdAt and updatedAt fields
});

const RawData = mongoose.model('RawData', rawDataSchema,"raw_data");

export default RawData;
