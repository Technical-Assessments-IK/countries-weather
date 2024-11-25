import React from 'react';

import { Link } from 'react-router-dom';

import WeatherInfo from './WeatherInfo';

type CountryCardProps = {
  code: string;
  name: string;
  capital: string;
  continent: string;
  flag?: string;
};

export const CountryCard: React.FC<CountryCardProps> = ({
  code,
  name,
  capital,
  continent,
  flag,
}) => {
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
      {/* Use WeatherInfo Component */}
      {capital ? (
        <WeatherInfo capital={capital} />
      ) : (
        <p>No weather information available (no capital provided).</p>
      )}
      <Link to={`/country/${code}`} className="view-details">
        View Details
      </Link>
    </div>
  );
};
