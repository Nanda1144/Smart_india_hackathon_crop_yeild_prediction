const express = require('express');
const axios = require('axios');
const router = express.Router();

// Weather API endpoint
router.get('/weather/:location', async (req, res) => {
  try {
    const location = req.params.location;
    const apiKey = process.env.WEATHER_API_KEY;
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

// Prediction endpoint (mock)
router.post('/predict', (req, res) => {
  // In a real app, this would call your ML model
  // For demo purposes, we'll return mock data
  const { crop, area, soilType, season } = req.body;
  
  // Mock prediction logic
  const baseYield = 2.5; // tons per hectare
  let yieldPrediction = baseYield;
  
  // Adjust based on inputs
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
