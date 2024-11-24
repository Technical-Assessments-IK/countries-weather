import React, { useEffect, useState } from 'react';

import { useQuery } from '@apollo/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Skeleton from 'react-loading-skeleton';
import "react-loading-skeleton/dist/skeleton.css";

import { GET_COUNTRIES } from './graphql/queries/countries';
import { HomePage, CountryPage } from './pages';
import type { Country } from './shared';
import ErrorBoundary from './utils/ErrorBoundary';

const App: React.FC = () => {
  const { data, loading, error } = useQuery(GET_COUNTRIES);
  const [countries, setCountries] = useState<Country[]>([]);

  useEffect(() => {
    if (data && data.countries) {
      setCountries(data.countries);
    } else {
      setCountries([]);
    }
  }, [data]);

  if (loading) return <><Skeleton /><>App is loading...</><Skeleton /></>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <ErrorBoundary>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage countries={countries} />} />
          <Route path="/country/:code" element={<CountryPage />} />
        </Routes>
      </Router>
    </ErrorBoundary>
  );
};

export default App;
