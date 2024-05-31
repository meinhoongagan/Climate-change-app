import React, { useState, useEffect } from 'react';
import './WeatherWidget.css';

const WeatherWidget = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const apiKey = 'e0da1f4d5233a12ed005f0435dfb06fa'; // Replace 'YOUR_API_KEY' with your actual API key

  useEffect(() => {
    // Get user's location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
          
          try {
            const response = await fetch(apiUrl);
            if (!response.ok) {
              throw new Error('Weather data not available');
            }
            const data = await response.json();
            setWeatherData(data);
            setLoading(false);
          } catch (error) {
            setError(error.message);
            setLoading(false);
          }
        },
        (error) => {
          setError(error.message);
          setLoading(false);
        }
      );
    } else {
      setError('Geolocation is not supported by your browser');
      setLoading(false);
    }
  }, [apiKey]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="weather-widget">
      {weatherData && (
        <>
          <h2>Current Weather in {weatherData.name}</h2>
          <div className="weather-info">
            <p>Temperature: {weatherData.main && weatherData.main.temp}°C</p>
            <p>Max Temperature: {weatherData.main && weatherData.main.temp_max}°C</p>
            <p>Min Temperature: {weatherData.main && weatherData.main.temp_min}°C</p>
            <p>Feels Like: {weatherData.main && weatherData.main.feels_like}°C</p>
            <p>Humidity: {weatherData.main && weatherData.main.humidity}%</p>
            <p>Weather: {weatherData.weather && weatherData.weather[0].description}</p>
          </div>
          {/* Add more weather parameters as needed */}
        </>
      )}
    </div>
  );
};

export default WeatherWidget;
