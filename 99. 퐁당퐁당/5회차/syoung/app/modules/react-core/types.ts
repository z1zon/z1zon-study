import { QueryCache } from "./queryCache";
import { QueryKey } from "./utils";

export type QueryOptions = {
  cache: QueryCache;
  queryKey: QueryKey;
  queryHash?: string;
  queryFn: () => Promise<any>;
};
