import { Query } from "../core/query";

export type QueryCacheListener = (event: QueryCacheNotifyEvent) => void;

export interface QueryCacheNotifyEvent {
  query: Query;
  type: EventType;
}

export type EventType = "observerResultsUpdated" | "queryUpdated";
