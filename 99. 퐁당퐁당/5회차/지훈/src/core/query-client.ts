import { QueryClientOptions } from "../types/query-client";
import { QueryCache } from "./query-cache";

export class QueryClient {
  private queryCache: QueryCache;

  constructor(options: QueryClientOptions = {}) {
    this.queryCache = options.queryCache || new QueryCache();
  }

  public getQueryCache() {
    return this.queryCache;
  }
}
