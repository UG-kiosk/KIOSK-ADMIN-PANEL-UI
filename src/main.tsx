import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import router from './router/routes.tsx';
import AuthContextProvider from './providers/context/AuthContextProvider.tsx';
import { ThemeProvider } from '@emotion/react';
import { theme } from './theme/theme.ts';
import { MutationCache, QueryCache, QueryClient, QueryClientConfig, QueryClientProvider } from '@tanstack/react-query';
import './styles/index.css';

const developmentConfiguration: QueryClientConfig = {
  mutationCache: new MutationCache({
    onError: error => {
      console.error('Mutation Error');
      console.error(error);
    },
  }),
  queryCache: new QueryCache({
    onError: error => {
      console.error('Query Error');
      console.error(error);
    },
  }),
};

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 0,
      refetchOnMount: false,
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
    },
    mutations: {
      retry: 0,
    },
  },
  ...developmentConfiguration,
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <AuthContextProvider>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <React.StrictMode>
          <RouterProvider router={router} />
        </React.StrictMode>
      </ThemeProvider>
    </QueryClientProvider>
  </AuthContextProvider>,
);
