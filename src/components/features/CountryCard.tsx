import React, { useEffect, useState } from 'react';

import { Link } from 'react-router-dom';

import { fetchWeather } from '../../utils/api';

import type { Weather } from '@/shared';


type CountryCardProps = {
  code: string;
  name: string;
  capital: string;
  continent: string;
  flag?: string;
};

export const CountryCard: React.FC<CountryCardProps> = ({ code, name, capital, continent, flag }) => {
  const [weather, setWeather] = useState<Weather | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (capital) {
      fetchWeather(capital)
        .then(setWeather)
        .catch(() => setError('Failed to fetch weather data.'));
    } else {
      setError('No capital available.');
    }
  }, [capital]);

  return (
    <div className="country-card">
      <div className="country-wrapper">
        <h4>{name}</h4>
        <div className="country-flag-wrap">
          {flag ? (
            <img
              src={flag}
              alt={`${name} flag`}
              className="country-flag"
            />
          ) : (
            <p>No flag available</p>
          )}
        </div>
      </div>
      <p>Capital: {capital}</p>
      <p>Continent: {continent}</p>
      {weather ? (
        weather.current ? (
          <div className="weather-info">
            <p>
              Temp: {weather.current.temp_c !== undefined ? `${weather.current.temp_c}°C` : 'Weather data not available'}
            </p>
            <p>Condition: {weather.current.condition.text}</p>
            <div className="weather-info-wrapper">
              <img
                src={`https:${weather.current.condition.icon}`}
                alt="Weather icon"
              />
            </div>
          </div>
        ) : (
          <p>No weather information available.</p>
        )
      ) : (
        <p>{error || 'Loading weather...'}</p>
      )}
      <Link to={`/country/${code}`} className="view-details">
        View Details
      </Link>
    </div>
  );
};
