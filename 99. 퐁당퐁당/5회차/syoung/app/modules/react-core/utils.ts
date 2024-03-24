import { MutationKey, QueryOptions } from "@tanstack/react-query";
import { Query } from "./query";

export type QueryTypeFilter = "all" | "active" | "inactive";
export type QueryKey = string[];
export type QueryStatus = "pending" | "error" | "success";
export type FetchStatus = "fetching" | "paused" | "idle";

export interface QueryFilters {
  /**
   * Filter to active queries, inactive queries or all queries
   */
  type?: QueryTypeFilter;
  /**
   * Match query key exactly
   */
  exact?: boolean;
  /**
   * Include queries matching this predicate function
   */
  predicate?: (query: Query) => boolean;
  /**
   * Include queries matching this query key
   */
  queryKey?: QueryKey;
  /**
   * Include or exclude stale queries
   */
  stale?: boolean;
  /**
   * Include queries matching their fetchStatus
   */
  fetchStatus?: FetchStatus;
}

export function noop(): undefined {
  return undefined;
}

export function timeUntilStale(
  updatedAt: number,
  staleTime: number = 0
): number {
  return Math.max(updatedAt + staleTime - Date.now(), 0);
}

export function hashKey(queryKey: QueryKey | MutationKey): string {
  return queryKey.join(" ");
}
