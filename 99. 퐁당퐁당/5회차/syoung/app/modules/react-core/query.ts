import { DefaultError } from "@tanstack/react-query";

import { QueryCache } from "./queryCache";
import { QueryOptions, FetchStatus, QueryKey, QueryStatus } from "./types";
import { QueryObserver } from "./queryObserver";
import { notifyManager } from "./notifyManager";

interface QueryConfig<TData> {
  cache: QueryCache;
  queryKey: QueryKey;
  queryHash: string;
  options: QueryOptions<TData>;
}

export interface QueryState<TData = unknown> {
  data: TData | undefined;
  dataUpdatedAt: number;
  error: DefaultError | null;
  status: QueryStatus;
  fetchStatus: FetchStatus;
}

export type Action<TData> =
  | { type: "error"; error: DefaultError }
  | { type: "fetch" }
  | {
      data: TData | undefined;
      type: "success";
      dataUpdatedAt?: number;
    };

export class Query<TData = unknown> {
  queryKey: QueryKey;
  queryHash: string;
  options: QueryOptions<TData>;
  state: QueryState<TData>;

  #initialState: QueryState<TData>;
  // #cache: QueryCache; // 간소화 버전에서는 사용 x
  #promise?: Promise<TData>;
  #observers: Array<QueryObserver<TData>>;

  constructor(config: QueryConfig<TData>) {
    this.options = config.options!;
    this.#observers = [];
    // this.#cache = config.cache;
    this.queryKey = config.queryKey;
    this.queryHash = config.queryHash;
    this.#initialState = getDefaultState();
    this.state = this.#initialState;
  }

  addObserver(observer: QueryObserver<TData>) {
    if (!this.#observers.includes(observer)) {
      this.#observers.push(observer);
    }
  }

  removeObserver(observer: QueryObserver<TData>) {
    if (this.#observers.includes(observer)) {
      this.#observers = this.#observers.filter((v) => v !== observer);
    }
  }

  // ⭐️
  fetch(): Promise<TData> {
    if (this.state.fetchStatus !== "idle" && this.#promise) {
      return this.#promise;
    }

    this.#dispatch({ type: "fetch" });
    let promiseResolve: (data: TData) => void;
    let promiseReject: (error: DefaultError) => void;

    const promise = new Promise<TData>((outerResolve, outerReject) => {
      promiseResolve = outerResolve;
      promiseReject = outerReject;
    });

    const run = () => {
      Promise.resolve(this.options.queryFn())
        .then((value: any) => {
          this.#dispatch({ type: "success", data: value });
          promiseResolve(value);
        })
        .catch((error: DefaultError) => {
          this.#dispatch({ type: "error", error });
          promiseReject(error);
        });
    };

    run();

    this.#promise = promise;

    return this.#promise;
  }

  // action으로 this.state를 변경하고 observer에 알림
  #dispatch(action: Action<TData>) {
    const reducer = (state: QueryState<TData>): QueryState<TData> => {
      switch (action.type) {
        case "fetch":
          return {
            ...state,
            fetchStatus: "fetching",
            ...(!state.dataUpdatedAt && {
              error: null,
              status: "pending",
            }),
          };
        case "success":
          return {
            ...state,
            data: action.data,
            dataUpdatedAt: action.dataUpdatedAt ?? Date.now(),
            error: null,
            status: "success",
            fetchStatus: "idle",
          };
        case "error":
          return {
            ...state,
            error: action.error,
            fetchStatus: "idle",
            status: "error",
          };
      }
    };

    this.state = reducer(this.state);

    notifyManager.batch(() => {
      this.#observers.forEach((observer) => {
        observer.onQueryUpdate();
      });

      // this.#cache.notify({ query: this, type: "updated", action });
    });
  }
}

function getDefaultState<TData>(): QueryState<TData> {
  return {
    data: undefined,
    dataUpdatedAt: 0,
    error: null,
    status: "pending",
    fetchStatus: "idle",
  };
}
