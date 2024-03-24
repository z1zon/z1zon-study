import { hashKey } from "./utils";
import { Query } from "./query";
import { QueryOptions } from "./types";

export interface QueryStore {
  has: (queryHash: string) => boolean;
  set: (queryHash: string, query: Query) => void;
  get: (queryHash: string) => Query | undefined;
  delete: (queryHash: string) => void;
  values: () => IterableIterator<Query>;
}

export class QueryCache {
  #queries: QueryStore;

  constructor() {
    this.#queries = new Map<string, Query>();
  }

  build<TQueryFnData, TError, TData>(
    options: QueryOptions
  ): Query<TQueryFnData, TError, TData> {
    const queryKey = options.queryKey;
    const queryHash = hashKey(queryKey);
    let query = this.get<TQueryFnData, TError, TData>(queryHash);

    if (!query) {
      query = new Query({
        cache: this,
        queryKey,
        queryHash,
        options,
      });
      this.add(query);
    }

    return query;
  }

  add(query: Query<any, any, any>): void {
    if (!this.#queries.has(query.queryHash)) {
      this.#queries.set(query.queryHash, query);
    }
  }

  remove(query: Query<any, any, any>): void {
    const queryInMap = this.#queries.get(query.queryHash);

    if (queryInMap) {
      this.#queries.delete(query.queryHash);
    }
  }

  clear() {
    this.getAll().forEach((query) => {
      this.remove(query);
    });
  }

  get<TQueryFnData, TError, TData>(queryHash: string) {
    return this.#queries.get(queryHash) as
      | Query<TQueryFnData, TError, TData>
      | undefined;
  }

  getAll() {
    return [...this.#queries.values()];
  }
}
