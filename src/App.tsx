import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { HomePage } from './pages/HomePage';
import { CountryPage } from './pages/CountryPage';
import { GET_COUNTRIES } from './graphql/queries/countries';
import type { Country } from './types';
import ErrorBoundary from './components/ErrorBoundary';
import Skeleton from 'react-loading-skeleton';
import "react-loading-skeleton/dist/skeleton.css";

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

  if (loading) return <Skeleton />;
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
