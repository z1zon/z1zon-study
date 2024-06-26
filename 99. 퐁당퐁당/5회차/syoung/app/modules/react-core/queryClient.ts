import { QueryCache } from "./queryCache";

export class QueryClient {
  #queryCache: QueryCache;

  constructor() {
    this.#queryCache = new QueryCache();
  }

  getQueryCache() {
    return this.#queryCache;
  }

  clear() {
    this.#queryCache.clear();
  }
}
