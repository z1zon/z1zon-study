"use client";

import { ReactNode } from "react";

import { QueryClient } from "./modules/react-core/queryClient";
import { QueryClientProvider } from "./modules/react-query/QueryClientProvider";

type ProvidersProps = {
  children: ReactNode;
};

export const Providers = ({ children }: ProvidersProps) => {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};
