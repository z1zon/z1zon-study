import {
  QueryObserverListener,
  QueryObserverOptions,
} from "../types/query-observer";
import { Query } from "./query";
import { QueryClient } from "./query-client";
import { QueryOptions, QueryState } from "../types/query";
import { notifyManager } from "./notifyManager";
import { Subscribable } from "./subscribable";

export class QueryObserver extends Subscribable<QueryObserverListener> {
  private client: QueryClient;
  private options: QueryObserverOptions;
  private currentQuery!: Query;
  // private currentResultState: QueryState;
  private currentResult: any;

  constructor(client: QueryClient, options: QueryObserverOptions) {
    super();
    this.client = client;
    this.options = options;
    this.init();
  }

  private init() {
    const prevQuery = this.currentQuery;
    this.updateQuery();
    if (this.shouldFetchOptionally(this.currentQuery, prevQuery)) {
      this.executor();
    }
    this.updateResult();
  }

  private executor() {
    this.updateQuery();
    return this.currentQuery.executor();
  }

  private shouldFetchOptionally(query: Query, prevQuery: Query) {
    /*
      실제 fetch를 해와야하는지 조건 검사
      stale 인지? enabled 인지?
    */
    if (query !== prevQuery) {
      return true;
    }
    return false;
  }

  private shallowEqualObjects(prevResult: any, nextResult: any) {
    // query 결과 비교
    return false;
  }

  private updateQuery() {
    const query = this.client.getQueryCache().build(this.client, this.options);
    if (this.currentQuery === query) {
      return;
    }

    const prevQuery = this.currentQuery;
    this.currentQuery = query;
  }

  private updateResult() {
    const prevResult = this.currentResult;
    const nextResult = this.createResult(this.currentQuery, this.options);
    // this.currentResultState = this.currentQuery.state;

    // nextResult와 prevResult가 다를 때에만 update와 notify를 실행
    if (this.shallowEqualObjects(nextResult, prevResult)) {
      return;
    }

    this.currentResult = nextResult;
    this.notify();
  }

  private notify() {
    notifyManager.batch(() => {
      // First, trigger the listeners
      this.listeners.forEach((listener) => {
        listener(this.currentResult);
      });

      // Then the cache listeners
      this.client.getQueryCache().notify({
        query: this.currentQuery,
        type: "observerResultsUpdated",
      });
    });
  }

  private createResult(query: Query, options: QueryObserverOptions) {
    const { state } = query;
    return {
      status: state.status,
      data: state.data,
    };
  }

  public getResult(options: QueryObserverOptions) {
    const query = this.client.getQueryCache().build(this.client, options);
    const result = this.createResult(query, options);
    return result;
  }

  protected onSubscribe(): void {
    if (this.listeners.size === 1) {
      this.currentQuery.addObserver(this);
      this.executor();
    }
  }

  public onQueryUpdate(): void {
    this.updateResult();
  }
}
