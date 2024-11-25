import React from 'react';

import { useFetchWeather } from '../../hooks/useFetchWeather';

type WeatherInfoProps = {
  capital: string;
};

export const WeatherInfo: React.FC<WeatherInfoProps> = ({ capital }) => {
  const { weather, error } = useFetchWeather(capital);

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
