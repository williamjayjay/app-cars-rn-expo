'use client';
import { type FC, type ReactElement } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

 const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnReconnect: true,
      retry: true
    },
  },
});

const ReactQueryProviderCustom: FC<{
  children: ReactElement;
  queryClientJest?: QueryClient;
}> = ({ children, queryClientJest }) => (
  <QueryClientProvider client={queryClientJest ?? queryClient}>
    {children}
  </QueryClientProvider>
);

export {ReactQueryProviderCustom};
