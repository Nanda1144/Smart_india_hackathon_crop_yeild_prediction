const mongoose = require('mongoose');

const farmDataSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  crop: { type: String, required: true },
  area: { type: Number, required: true },
  soilType: String,
  season: String,
  location: String,
  plantingDate: Date,
  predictedYield: Number,
  actualYield: Number,
  weatherData: {
    temperature: Number,
    humidity: Number,
    rainfall: Number
  },
  soilData: {
    ph: Number,
    nitrogen: Number,
    phosphorus: Number,
    potassium: Number,
    organicMatter: Number
  },
  recommendations: [String],
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('FarmData', farmDataSchema);
