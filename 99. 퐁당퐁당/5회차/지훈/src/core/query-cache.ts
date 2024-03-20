import hash from "../utils/hash";
import { Query } from "./query";
import { QueryClient } from "./query-client";
import { notifyManager } from "./notifyManager";
import {
  QueryCacheListener,
  QueryCacheNotifyEvent,
} from "../types/query-cache";
import { Subscribable } from "./subscribable";
import { QueryObserverOptions } from "../types/query-observer";

export class QueryCache extends Subscribable<QueryCacheListener> {
  private queries;

  constructor() {
    super();
    this.queries = new Map<string, Query>();
  }

  private get(queryHash: string) {
    return this.queries.get(queryHash);
  }

  private add(query: Query) {
    if (!this.get(query.queryHash)) {
      this.queries.set(query.queryHash, query);
    }
  }

  public build(client: QueryClient, options: QueryObserverOptions) {
    const queryKey = options.queryKey;
    const queryHash = options.queryHash ?? hash(options.queryKey);
    let query = this.get(queryHash);

    if (!query) {
      query = new Query({
        cache: this,
        queryKey,
        queryHash,
        queryFn: options.queryFn,
        // defaultOptions: client.getDefaultOptions()
      });
      this.add(query);
    }

    return query;
  }

  public notify(event: QueryCacheNotifyEvent) {
    notifyManager.batch(() => {
      this.listeners.forEach((listener) => {
        listener(event);
      });
    });
  }
}
