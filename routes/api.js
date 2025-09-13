const express = require('express');
const axios = require('axios');
const router = express.Router();
const FarmData = require('../models/farmData');
const Notification = require('../models/notification');

// Weather API endpoint
router.get('/weather/:location', async (req, res) => {
  try {
    const location = req.params.location;
    const apiKey = process.env.2964ae4e6e693bfc9efa08f0395b83e9;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`;
    
    const response = await axios.get(url);
    const weatherData = {
      temperature: response.data.main.temp,
      humidity: response.data.main.humidity,
      description: response.data.weather[0].description,
      icon: response.data.weather[0].icon
    };
    
    res.json(weatherData);
  } catch (error) {
    console.error('Error fetching weather data:', error);
    res.status(500).json({ error: 'Failed to fetch weather data' });
  }
});

// Prediction endpoint
router.post('/predict', async (req, res) => {
  try {
    const { crop, area, soilType, season, location } = req.body;
    const userId = req.session.user._id;
    
    // Mock prediction logic
    const baseYield = 2.5; // tons per hectare
    let yieldPrediction = baseYield;
    
    // Adjust based on inputs
    if (soilType === 'loamy') yieldPrediction *= 1.2;
    if (season === 'monsoon') yieldPrediction *= 1.3;
    
    // Generate recommendations
    const recommendations = [
      'Apply nitrogen fertilizer 3 weeks after planting',
      'Ensure proper irrigation during flowering stage',
      'Monitor for pests during early growth stages'
    ];
    
    // Save prediction to database
    const farmData = new FarmData({
      userId,
      crop,
      area,
      soilType,
      season,
      location,
      predictedYield: yieldPrediction,
      recommendations
    });
    
    await farmData.save();
    
    res.json({
      crop,
      predictedYield: yieldPrediction.toFixed(2),
      confidence: '85%',
      recommendations
    });
  } catch (error) {
    console.error('Error generating prediction:', error);
    res.status(500).json({ error: 'Failed to generate prediction' });
  }
});

// Save soil analysis data
router.post('/soil-analysis', async (req, res) => {
  try {
    const userId = req.session.user._id;
    const soilData = req.body;
    
    // Find the most recent farm data for this user
    const recentFarmData = await FarmData.findOne({ userId })
      .sort({ createdAt: -1 });
    
    if (recentFarmData) {
      // Update existing record
      recentFarmData.soilData = soilData;
      await recentFarmData.save();
    } else {
      // Create new record
      const farmData = new FarmData({
        userId,
        soilData
      });
      await farmData.save();
    }
    
    // Generate soil health notification
    const notification = new Notification({
      userId,
      type: 'system',
      title: 'Soil Analysis Complete',
      message: 'Your soil analysis has been completed. Check the recommendations for improving soil health.'
    });
    
    await notification.save();
    
    res.json({ success: true });
  } catch (error) {
    console.error('Error saving soil analysis:', error);
    res.status(500).json({ error: 'Failed to save soil analysis' });
  }
});

// Get farm data for analytics
router.get('/farm-data', async (req, res) => {
  try {
    const userId = req.session.user._id;
    
    const farmData = await FarmData.find({ userId })
      .sort({ createdAt: -1 })
      .limit(100);
    
    res.json(farmData);
  } catch (error) {
    console.error('Error fetching farm data:', error);
    res.status(500).json({ error: 'Failed to fetch farm data' });
  }
});

// Get market prices
router.get('/market-prices', async (req, res) => {
  try {
    // Mock market prices data
    const marketPrices = [
      { crop: 'rice', variety: 'Basmati', price: 3850, change: 2.5 },
      { crop: 'wheat', variety: 'MP Sharbati', price: 2250, change: -1.2 },
      { crop: 'maize', variety: 'Yellow', price: 1850, change: 3.1 },
      { crop: 'cotton', variety: 'Long Staple', price: 6200, change: 1.8 },
      { crop: 'sugarcane', variety: 'Per Quintal', price: 315, change: -0.5 }
    ];
    
    res.json(marketPrices);
  } catch (error) {
    console.error('Error fetching market prices:', error);
    res.status(500).json({ error: 'Failed to fetch market prices' });
  }
});

module.exports = router;  // Adjust based on inputs
  if (soilType === 'loamy') yieldPrediction *= 1.2;
  if (season === 'monsoon') yieldPrediction *= 1.3;
  
  res.json({
    crop,
    predictedYield: yieldPrediction.toFixed(2),
    confidence: '85%',
    recommendations: [
      'Apply nitrogen fertilizer 3 weeks after planting',
      'Ensure proper irrigation during flowering stage',
      'Monitor for pests during early growth stages'
    ]
  });
});

module.exports = router;
