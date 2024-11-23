import React, { useEffect, useState } from 'react';
import { fetchWeather } from '../utils/api';
import type { Weather } from '../types';

type WeatherInfoProps = {
  capital: string;
};

const WeatherInfo: React.FC<WeatherInfoProps> = ({ capital }) => {
  const [weather, setWeather] = useState<Weather | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (capital) {
      fetchWeather(capital)
        .then((data) => setWeather(data))
        .catch(() => setError('Failed to fetch weather data.'));
    } else {
      setError('No capital provided for weather data.');
    }
  }, [capital]);

  if (error) return <p>{error}</p>;
  if (!weather) return <p>Loading weather...</p>;

  return weather.current ? (
    <div className="weather-info">
      <p>Temperature: {weather.current.temp_c}°C</p>
      <p>Condition: {weather.current.condition.text}</p>
      <img
        src={`https:${weather.current.condition.icon}`}
        alt="Weather icon"
      />
    </div>
  ) : (
    <p>No weather information available.</p>
  );
};

export default WeatherInfo;
