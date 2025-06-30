import RawData from '../models/RawData.js';

export const addRawData = async (req, res) => {
  try {
    const newRawEntry = new RawData(req.body);
    await newRawEntry.save();
    res.status(201).json({ message: "Raw data added successfully" });
  } catch (error) {
    console.error("Error adding raw data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
