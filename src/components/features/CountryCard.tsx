import React from 'react';

import { Link as RouterLink } from 'react-router-dom';

import Card from '@mui/material/Card';

import WeatherInfo from './WeatherInfo';
import { Link } from '@mui/material';

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
    <Card className="country-card">
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
      {capital ? (
        <WeatherInfo capital={capital} />
      ) : (
        <p>No weather information available (no capital provided).</p>
      )}
      <Link
        component={RouterLink}
        to={`/country/${code}`}
        underline="hover"
        color="primary"
        variant="body2"
        className="view-details"
      >
        View Details
      </Link>
    </Card>
  );
};
