import React from 'react';

import { ApolloProvider } from '@apollo/client';

import ReactDOM from 'react-dom/client';

import App from './App';
import client from './graphql/client';
import './styles/main.scss';

const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error('Root element not found');
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </React.StrictMode>
);
