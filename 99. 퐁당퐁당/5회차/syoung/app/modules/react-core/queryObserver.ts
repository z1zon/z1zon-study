import { notifyManager } from "./notifyManager";
import { Query } from "./query";
import { QueryClient } from "./queryClient";
import { Subscribable } from "./subscribable";
import { QueryObserverOptions, QueryObserverResult } from "./types";
import { shallowEqualObjects } from "./utils";

type QueryObserverListener<TData> = (
  result: QueryObserverResult<TData>
) => void;

interface NotifyOptions {
  notify?: boolean;
}

export class QueryObserver<TData = unknown> extends Subscribable<
  QueryObserverListener<TData>
> {
  #client: QueryClient;
  #currentQuery: Query<TData> = undefined!;
  #currentResult: QueryObserverResult<TData> = undefined!;

  constructor(
    client: QueryClient,
    public options: QueryObserverOptions<TData>
  ) {
    super();
    console.log("[QueryObserver] constructor()");

    this.#client = client;
    this.refetch = this.refetch.bind(this);
    this.setOptions(options);
  }

  // init 역할
  setOptions(
    options: QueryObserverOptions<TData>,
    notifyOptions?: NotifyOptions
  ) {
    console.log("[QueryObserver] setOptions()");
    const prevQuery = this.#currentQuery;
    this.options = options;

    this.#updateQuery();

    if (shouldFetchOptionally(this.#currentQuery, prevQuery, this.options)) {
      this.#executeFetch();
    }

    this.updateResult(notifyOptions);
  }

  // 전달받은 options으로 query를 만들어서 #currentQuery로 세팅
  #updateQuery(): void {
    const query = this.#client.getQueryCache().build(this.options);

    if (query === this.#currentQuery) {
      return;
    }
    console.log("[QueryObserver] updateQuery()");

    this.#currentQuery = query;
  }

  // ⭐️
  #executeFetch(): Promise<TData | undefined> {
    console.log("[QueryObserver] executeFetch()");
    this.#updateQuery();

    return this.#currentQuery.fetch();
  }

  // query 정보를 기반으로 result 형식으로 만들기
  createResult(query: Query<TData>): QueryObserverResult<TData> {
    const { state } = query;
    let { data, error, status, fetchStatus } = state;

    const isFetching = fetchStatus === "fetching";
    const isPending = status === "pending";
    const isLoading = isPending && isFetching;

    console.log(
      `[QueryObserver] createResult() - status='${status}', fetchStatus='${fetchStatus}', `
    );

    return {
      data,
      error,
      isError: status === "error",
      isLoading,
      isSuccess: status === "success",
      refetch: this.refetch,
      status,
      fetchStatus,
    };
  }

  // 데이터가 변경된 경우만 result update, notify
  updateResult(notifyOptions?: NotifyOptions) {
    const prevResult = this.#currentResult;
    const nextResult = this.createResult(this.#currentQuery);

    if (shallowEqualObjects(nextResult, prevResult)) {
      return;
    }

    console.log("[QueryObserver] updateResult()");

    this.#currentResult = nextResult;
    this.#notify({ notify: notifyOptions?.notify !== false });
  }

  getCurrentResult(): QueryObserverResult<TData> {
    return this.#currentResult;
  }

  getResult(options: QueryObserverOptions<TData>) {
    const query = this.#client.getQueryCache().build<TData>(options);
    const result = this.createResult(query);
    return result;
  }

  fetch(): Promise<QueryObserverResult<TData>> {
    return this.#executeFetch().then(() => {
      this.updateResult();
      return this.#currentResult;
    });
  }

  refetch(): Promise<QueryObserverResult<TData>> {
    return this.fetch();
  }

  protected onSubscribe(): void {
    if (this.listeners.size === 1) {
      this.#currentQuery.addObserver(this);

      if (shouldFetchOnMount(this.options)) {
        this.#executeFetch();
      } else {
        this.updateResult();
      }
    }
  }

  protected onUnsubscribe(): void {
    if (!this.hasListeners()) {
      this.listeners = new Set();
      this.#currentQuery.removeObserver(this);
    }
  }

  onQueryUpdate(): void {
    this.updateResult();
  }

  #notify(notifyOptions?: NotifyOptions): void {
    if (!notifyOptions?.notify) {
      return;
    }

    console.log("[QueryObserver] notify()");

    notifyManager.batch(() => {
      this.listeners.forEach((listener) => {
        listener(this.#currentResult);
      });
    });
  }
}

function shouldFetchOnMount(options: QueryObserverOptions<any>) {
  return options.enabled !== false;
}

function shouldFetchOptionally(
  query: Query<any>,
  prevQuery: Query<any>,
  options: QueryObserverOptions<any>
) {
  return options.enabled !== false && query !== prevQuery;
}
