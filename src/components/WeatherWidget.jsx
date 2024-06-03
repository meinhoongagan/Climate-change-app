import React, { useState, useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import './WeatherWidget.css';

const WeatherWidget = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const apiKey = 'e0da1f4d5233a12ed005f0435dfb06fa'; 

  useEffect(() => {
    console.log('WeatherWidget mounted');
    AOS.init({
      duration: 1200,
    });

    const fetchWeatherData = async (latitude, longitude) => {
      const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
      try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error('Weather data not available');
        }
        const data = await response.json();
        console.log('Weather data fetched:', data);
        setWeatherData(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching weather data:', error);
        setError(error.message);
        setLoading(false);
      }
    };

    // Get user's location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          fetchWeatherData(latitude, longitude);
        },
        (error) => {
          console.error('Geolocation error:', error);
          setError(error.message);
          setLoading(false);
        }
      );
    } else {
      setError('Geolocation is not supported by your browser');
      setLoading(false);
    }
  });

  const getWeatherSuggestions = () => {
    if (!weatherData || !weatherData.weather) return '';

    const temperature = weatherData.main.temp;
    // const description = weatherData.weather[0].description.toLowerCase();
    const weatherId = weatherData.weather[0].id;

    // Temperature-based suggestions
    if (temperature <= 5) {
      return 'It\'s freezing outside! Bundle up in layers and stay warm.';
    } else if (temperature > 5 && temperature <= 15) {
      return 'It\'s quite cold. Don\'t forget your jacket!';
    } else if (temperature > 15 && temperature <= 25) {
      if (weatherId >= 500 && weatherId < 600) {
        return 'It may rain. Take an umbrella with you.';
      } else if (weatherId >= 200 && weatherId < 300) {
        return 'Thunderstorms possible. Stay indoors if possible.';
      } else {
        return 'It\'s a pleasant day. Enjoy the weather!';
      }
    } else {
      return 'It\'s warm and sunny. Perfect for outdoor activities!';
    }
  };

  if (loading) {
    return (
      <div className="weather-widget">
        <h2><Skeleton width={200} /></h2>
        <div className="weather-info">
          <p><Skeleton width={100} /></p>
          <p><Skeleton width={100} /></p>
          <p><Skeleton width={100} /></p>
          <p><Skeleton width={100} /></p>
          <p><Skeleton width={100} /></p>
          <p><Skeleton width={100} /></p>
        </div>
      </div>
    );
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="weather-widget" data-aos="fade-up">
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
            <p>Suggestions: {getWeatherSuggestions()}</p>
          </div>
        </>
      )}
    </div>
  );
};

export default WeatherWidget;
