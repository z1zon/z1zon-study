import {
  Children,
  ReactNode,
  createContext,
  useContext,
  useEffect,
} from "react";

import { QueryClient } from "../react-core/queryClient";

const QueryClientContext = createContext<QueryClient | undefined>(undefined);

export const useQueryClient = () => {
  const client = useContext(QueryClientContext);

  if (!client) {
    throw new Error("No QueryClient set, use QueryClientProvider to set one");
  }

  return client;
};

export type QueryClientProviderProps = {
  client: QueryClient;
  children?: ReactNode;
};

export const QueryClientProvider = ({
  client,
  children,
}: QueryClientProviderProps) => {
  return (
    <QueryClientContext.Provider value={client}>
      {children}
    </QueryClientContext.Provider>
  );
};
