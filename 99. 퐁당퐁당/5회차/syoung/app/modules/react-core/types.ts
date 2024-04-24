import { DefaultError } from "@tanstack/react-query";

export type QueryKey = string[];

export type QueryOptions<TData> = {
  queryKey: QueryKey;
  queryHash?: string;
  queryFn: () => TData | Promise<TData>;
};

export type QueryObserverOptions<TData> = QueryOptions<TData> & {
  enabled?: boolean;
};

export type QueryStatus = "pending" | "error" | "success";
export type FetchStatus = "fetching" | "paused" | "idle";

export type QueryObserverResult<TData> = {
  data: TData | undefined;
  error: DefaultError | null;
  isError: boolean;
  isLoading: boolean;
  isSuccess: boolean;
  refetch: () => Promise<QueryObserverResult<TData>>;
  status: QueryStatus;
  fetchStatus: FetchStatus;
};
