import '../styles/globals.scss';
import 'react-toastify/dist/ReactToastify.css';
import type {AppProps} from 'next/app';

import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {ToastContainer} from 'react-toastify';
import {Provider} from 'jotai';
import React from 'react';

import {ThemeProvider} from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

import theme from 'theme/index';

import {Provider as ReduxProvider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {store, persistor} from 'store';
import {ProvideAuth} from 'hooks';
const queryClient = new QueryClient();

function MyApp({Component, pageProps}: AppProps): JSX.Element {
  return (
    <ReduxProvider store={store}>
      <PersistGate loading={null} persistor={persistor} />
      <ProvideAuth>
        <Provider>
          <QueryClientProvider client={queryClient}>
            <ThemeProvider theme={theme}>
              <CssBaseline />
              <Component {...pageProps} />
            </ThemeProvider>
            <ToastContainer limit={5} position="bottom-right" />
          </QueryClientProvider>
        </Provider>
      </ProvideAuth>
    </ReduxProvider>
  );
}

export default MyApp;
