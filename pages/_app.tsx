import '../styles/globals.scss';
import 'react-toastify/dist/ReactToastify.css';
import type {AppProps} from 'next/app';

import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {ToastContainer} from 'react-toastify';

import {ThemeProvider} from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

import theme from 'theme/index';
import {useEffect} from 'react';
import {useRouter} from 'next/router';

const queryClient = new QueryClient({
  defaultOptions: {
    mutations: {
      cacheTime: 1000 * 60 * 60 * 24 // 24 hours
    }
  }
});

function MyApp({Component, pageProps}: AppProps): JSX.Element {
  const router = useRouter();
  const auth = () => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('auth');
    } else {
      return null;
    }
  };

  useEffect(() => {
    if (!auth()) {
      router.push('/login');
    } else {
      router.push('/');
    }
  }, [auth]);

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Component {...pageProps} />
      </ThemeProvider>
      <ToastContainer limit={5} position="bottom-right" />
    </QueryClientProvider>
  );
}

export default MyApp;
