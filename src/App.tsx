import React, { useEffect, useState } from 'react';

import { useQuery } from '@apollo/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { ThemeProvider } from '@mui/material';
import Skeleton from 'react-loading-skeleton';
import "react-loading-skeleton/dist/skeleton.css";
import { Provider } from 'react-redux';

import { HomePage, CountryPage } from './pages';
import { GET_COUNTRIES } from './services';
import type { Country } from './shared';
import { store } from './store';
import { theme } from './styles/theme';
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
      <Provider store={store}><ThemeProvider theme={theme}>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage countries={countries} />} />
          <Route path="/country/:code" element={<CountryPage />} />
        </Routes>
      </Router>
      </ThemeProvider>
      </Provider>
    </ErrorBoundary>
  );
};

export default App;
