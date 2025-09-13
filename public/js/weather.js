document.addEventListener('DOMContentLoaded', function() {
  const locationInput = document.getElementById('location');
  const getWeatherBtn = document.getElementById('getWeather');
  const weatherResult = document.getElementById('weatherResult');
  
  if (getWeatherBtn) {
    getWeatherBtn.addEventListener('click', async function() {
      const location = locationInput.value.trim();
      
      if (!location) {
        weatherResult.innerHTML = '<p class="error">Please enter a location</p>';
        return;
      }
      
      try {
        // Show loading state
        weatherResult.innerHTML = '<p>Loading weather data...</p>';
        
        // Fetch weather data
        const response = await fetch(`/api/weather/${location}`);
        const data = await response.json();
        
        if (response.ok) {
          // Display weather data
          weatherResult.innerHTML = `
            <div class="weather-card">
              <h3>Weather in ${location}</h3>
              <div class="weather-info">
                <div class="temperature">${data.temperature}°C</div>
                <div class="description">${data.description}</div>
                <div class="humidity">Humidity: ${data.humidity}%</div>
              </div>
            </div>
          `;
        } else {
          weatherResult.innerHTML = `<p class="error">${data.error || 'Failed to fetch weather data'}</p>`;
        }
      } catch (error) {
        console.error('Error:', error);
        weatherResult.innerHTML = '<p class="error">An error occurred while fetching weather data</p>';
      }
    });
  }
});
