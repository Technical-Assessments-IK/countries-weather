import { useQuery } from '@apollo/client';
import { ThemeProvider } from '@mui/material';
import React, { useEffect, useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { Provider } from 'react-redux';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { CountryPage, HomePage } from './pages';
import { GET_COUNTRIES } from './services';
import type { Country } from './shared';
import { store } from './store';
import { theme } from './styles/theme';
import ErrorBoundary from './utils/ErrorBoundary';

const App: React.FC = () => {
  const { data, loading, error } = useQuery(GET_COUNTRIES);
  const [countries, setCountries] = useState<Country[]>([]);

  useEffect(() => {
    if (data?.countries?.length) {
      setCountries(data.countries);
    } else {
      setCountries([]);
    }
  }, [data]);

  if (loading) {
    return (
      <div style={{ padding: '1rem', textAlign: 'center' }}>
        <Skeleton height={30} />
        <p>App is loading...</p>
        <Skeleton height={30} />
      </div>
    );
  }

  if (error) return <p>Error: {error.message}</p>;

  const basename =
    process.env.NODE_ENV === 'production' ? '/countries-weather' : '/';

  return (
    <ErrorBoundary>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <Router basename={basename}>
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
