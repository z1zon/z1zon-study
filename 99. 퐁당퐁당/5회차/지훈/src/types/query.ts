import { QueryCache } from "../core/query-cache";

export interface QueryOptions {
  cache: QueryCache;
  queryKey: string[];
  queryHash?: string;
  queryFn: () => Promise<any>;
}

type QueryStatus = "idle" | "loading" | "success" | "error";

export interface QueryState {
  status: QueryStatus;
  data: any;
  error: unknown;
}

export interface QueryActionType {
  type: "failed" | "loading" | "success";
  payload?: unknown;
}
