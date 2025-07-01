import RawData from '../models/RawData.js';

export const addRawData = async (req, res) => {
  console.log("incoming data:",req.body);
  
  try {
    const {
      productName,
      supplierName,
      region,
      purchaseDate,
      unitsPurchased,
      unitCost,
      deliveryTimeDays,
      orderAccuracy,
      damagedOnArrival,
      unitsReturned,
      returnRate,
    } = req.body;
    
    const newRawEntry = new RawData({
      product_name: productName,
      supplier_name: supplierName,
      region,
      purchase_date: new Date(purchaseDate),
      units_purchased: parseInt(unitsPurchased),
      unit_cost: parseFloat(unitCost),
      delivery_time_days: parseInt(deliveryTimeDays),
      qc_pass_rate: parseFloat(orderAccuracy),
      damaged_on_arrival: parseInt(damagedOnArrival),
      units_returned: parseInt(unitsReturned),
      return_rate: parseFloat(returnRate),
    });
   
    await newRawEntry.save();
    console.log(newRawEntry);
    
    res.status(201).json({ message: "Raw data added successfully" });
  } catch (error) {
    console.error("Error adding raw data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
