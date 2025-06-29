const mongoose = require('mongoose');

const supplierSchema = new mongoose.Schema({
  name: String,             // Supplier Name
  region: String,           // Region (for heatmap/filter)
  product: String,          // Product category/type
  onTimeDelivery: Number,   // %
  orderAccuracy: Number,    // %
  packagingRating: Number,  // Rating out of 5
  returnRate: Number,       // %
  fulfillmentTime: Number,  // in hours/days
  performanceScore: Number, // ML-based score (0–100)
  status: String            // green/yellow/red etc.
}, { timestamps: true });

module.exports = mongoose.model("Supplier", supplierSchema);