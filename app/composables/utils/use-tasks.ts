import { of, from } from "rxjs";
import { mergeMap, map, catchError, reduce, finalize } from "rxjs/operators";
import type { TFnMaybeAsync } from "~/types";

const CONCURRENCY = 22;
export const useTasks = <T = unknown>() => {
  const { $$ } = useNuxtApp();

  const tasks = new Set<TFnMaybeAsync<T>>();
  const add = (...lst: TFnMaybeAsync<T>[]) => {
    lst.forEach((t) => {
      tasks.add(t);
    });
  };
  const reset = () => {
    tasks.clear();
  };
  const run = async () =>
    await $$.resolved(
      !$$.isEmpty(tasks)
        ? from(Array.from(tasks)).pipe(
            mergeMap(
              (task) =>
                $$.to$(task()).pipe(
                  map(() => null),
                  // send errors
                  catchError((error) => of({ error })),
                ),
              CONCURRENCY,
            ),

            // collect errors
            reduce(
              (accum, res) => {
                if ($$.isPresent(res?.error)) {
                  (<any[]>accum.error).push(res!.error);
                }
                return accum;
              },
              $$.res(null, <any[]>[]),
            ),

            // map, close
            map((res) => res.dump()),
            finalize(reset),
          )
        : of($$.res(null, <any[]>[]).dump()),
      false,
    );
  return {
    add,
    reset,
    run,
  };
};
