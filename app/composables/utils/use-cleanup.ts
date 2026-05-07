import { from, of } from "rxjs";
import { catchError, finalize, map, mergeMap, reduce } from "rxjs/operators";
import type { TFnMaybeAsync } from "~/types";

const CONCURRENCY = 10;
export const useCleanup = <T = void>() => {
  const { $$ } = useNuxtApp();
  const gc = new Set<TFnMaybeAsync<T>>();

  // add cleanup task
  const task = (cleanupTask: TFnMaybeAsync<T>) => {
    gc.add(cleanupTask);
  };

  // clear all cleanup tasks
  const reset = () => {
    gc.clear();
  };

  // run all cleanup tasks
  const run = async () => {
    await $$.resolved(
      !$$.isEmpty(gc)
        ? from(Array.from(gc)).pipe(
            // execut cleanup
            mergeMap(
              (cleanup) =>
                $$.to$(cleanup()).pipe(
                  map(() => null),
                  // send errors
                  catchError((error) => of({ error })),
                ),
              CONCURRENCY,
            ),
            // collect errors
            reduce(
              (accum, res) => {
                if (null != res?.error) {
                  (<any[]>accum.error).push(res.error);
                }
                return accum;
              },
              $$.res(null, <any[]>[]),
            ),
            // map, close
            map((res) => res.dump()),
            finalize(reset),
          )
        : of($$.res(null, []).dump()),
      false,
    );
  };

  return { task, run, reset };
};
