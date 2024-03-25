import { MutationKey } from "@tanstack/react-query";
import { QueryKey } from "./types";

export function noop(): undefined {
  return undefined;
}

export function hashKey(queryKey: QueryKey | MutationKey): string {
  return queryKey.join(" ");
}

export function shallowEqualObjects<T extends Record<string, any>>(
  a: T,
  b: T | undefined
): boolean {
  if (!b || Object.keys(a).length !== Object.keys(b).length) {
    return false;
  }

  return Object.keys(a).every((key) => a[key] === b[key]);
}
