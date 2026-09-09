import type { TRecordJson } from "~/types";
import { TOKEN_appState$ } from "~/keys";

export const useStateBuffer = (KEY: string) => {
  const { $$ } = useNuxtApp();
  const state$ = inject(TOKEN_appState$)!;

  const data = shallowRef(<TRecordJson>{});

  useSubscription(
    state$.subscribe((state) => {
      data.value = <TRecordJson>(state[KEY] ?? {});
    }),
  );

  const item = (path: string) => $$.get(data.value, path);
  const commit = (patches: TRecordJson) => {
    if ($$.isEmpty(patches)) return;
    state$.next(
      $$.reduce(
        patches,
        (state, value, path) => {
          $$.set(state, `${KEY}.${path}`, value);
          return state;
        },
        $$.cloned(state$.getValue()),
      ),
    );
  };
  const drop = (...paths: string[]) => {
    if ($$.isEmpty(paths)) return;
    state$.next(
      $$.reduce(
        paths,
        (state, path) => {
          $$.unset(state, `${KEY}.${path}`);
          return state;
        },
        $$.cloned(state$.getValue()),
      ),
    );
  };
  const isSet = (path: string) => $$.isPresent(item(path));

  return {
    data: readonly(data),
    item,
    commit,
    push: commit,
    drop,
    isSet,
  };
};
