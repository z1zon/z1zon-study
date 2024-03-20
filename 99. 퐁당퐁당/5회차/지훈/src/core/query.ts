import { QueryActionType, QueryOptions, QueryState } from "../types/query";
import hash from "../utils/hash";
import { QueryObserver } from "./query-observer";
import { QueryCache } from "./query-cache";
import { notifyManager } from "./notifyManager";

export class Query {
  private queryKey: string[];
  public queryHash: string;
  private observer: QueryObserver[];
  private queryFn: () => Promise<any>;
  public state: QueryState;
  private promise: Promise<any> | null;
  private cache: QueryCache;

  constructor(options: QueryOptions) {
    this.queryKey = options.queryKey;
    this.observer = [];
    this.cache = options.cache;
    this.state = {
      status: "idle",
      data: undefined,
      error: null,
    };
    this.queryFn = options.queryFn;
    this.queryHash = hash(options.queryKey);
    this.promise = null;
  }

  public async executor() {
    if (this.state.status === "idle") {
      if (this.promise) {
        return this.promise;
      } else {
        this.dispatch({ type: "loading" });
        this.promise = this.queryFn()
          .then((value) => {
            this.dispatch({
              type: "success",
              payload: value,
            });
          })
          .catch((error) => {
            this.dispatch({ type: "failed", payload: error });
          });
      }
    }
    return this.promise;
  }

  public addObserver(observer: QueryObserver) {
    if (!this.observer.includes(observer)) {
      this.observer.push(observer);
    }
  }

  private dispatch(action: QueryActionType) {
    const reducer = (state: QueryState): QueryState => {
      switch (action.type) {
        case "failed":
          return {
            ...state,
            data: undefined,
            status: "error",
            error: action.payload,
          };
        case "loading":
          return {
            ...state,
            data: undefined,
            status: "loading",
          };
        case "success":
          return {
            ...state,
            data: action.payload,
            status: "success",
          };
      }
    };

    this.state = reducer(this.state);

    notifyManager.batch(() => {
      this.observer.forEach((observer) => {
        observer.onQueryUpdate();
      });

      this.cache.notify({ query: this, type: "queryUpdated" });
    });
  }
}
