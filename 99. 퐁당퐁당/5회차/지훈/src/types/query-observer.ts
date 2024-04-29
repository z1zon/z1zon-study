import { QueryOptions } from "./query";

export interface QueryObserverOptions extends Omit<QueryOptions, "cache"> {}

export type QueryObserverListener = (queryResult: any) => void;
