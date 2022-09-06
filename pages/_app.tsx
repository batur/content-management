import '../styles/globals.scss';
import 'react-toastify/dist/ReactToastify.css';
import type {AppProps} from 'next/app';

import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {ToastContainer} from 'react-toastify';
import {Provider, useAtom} from 'jotai';
import React, {useEffect} from 'react';
import AuthAtom from 'store/Auth';

import {useRouter} from 'next/router';
import {isJWTInvalid} from 'helpers';

import {ThemeProvider} from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

import theme from 'theme/index';

const queryClient = new QueryClient();

function MyApp({Component, pageProps}: AppProps): JSX.Element {
  const router = useRouter();
  const [auth, setAuth] = useAtom(AuthAtom);

  useEffect(() => {
    const authLocalStorage = localStorage.getItem('auth');
    setAuth(authLocalStorage);
  }, []);

  useEffect(() => {
    if (!auth || isJWTInvalid(auth.token)) {
      router.push('/login');
    }
  }, [auth]);

  return (
    <Provider>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Component {...pageProps} />
        </ThemeProvider>
        <ToastContainer />
      </QueryClientProvider>
    </Provider>
  );
}

export default MyApp;
