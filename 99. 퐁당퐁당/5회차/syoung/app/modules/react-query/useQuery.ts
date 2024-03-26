import { useCallback, useEffect, useState, useSyncExternalStore } from "react";
import { useQueryClient } from "./QueryClientProvider";
import { QueryObserver } from "../react-core/queryObserver";
import { QueryObserverOptions } from "../react-core/types";
import { notifyManager } from "../react-core/notifyManager";

export const useQuery = <TData = unknown>(
  options: QueryObserverOptions<TData>
) => {
  const client = useQueryClient();

  const [observer] = useState(() => new QueryObserver<TData>(client, options));

  const result = observer.getResult(options);

  useSyncExternalStore(
    useCallback(
      (onStoreChange) => {
        const unsubscribe = observer.subscribe(
          notifyManager.batchCalls(onStoreChange)
        );

        observer.updateResult();

        return unsubscribe;
      },
      [observer]
    ),
    () => observer.getCurrentResult(),
    () => observer.getCurrentResult()
  );

  useEffect(() => {
    observer.setOptions(options, { notify: false });
  }, [options, observer]);

  if (result.isError) {
    throw result.error;
  }

  return result;
};
