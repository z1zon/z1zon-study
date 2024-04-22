import { notifyManager } from "./core/notifyManager";
import { QueryObserver } from "./core/query-observer";
import { queryClient } from ".";
import { QueryOptions, QueryState } from "./types/query";
import rerender from "./rerender";

export default function (options: Omit<QueryOptions, "cache">) {
  const observer = new QueryObserver(queryClient, options);
  observer.subscribe(
    notifyManager.batchCalls((state: QueryState) => {
      console.log("updated!!", { state });
      rerender(state);
    })
  );
  return observer.getResult(options);
}
