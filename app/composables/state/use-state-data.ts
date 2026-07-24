import type { TJson, TRecordJson } from "~/types";

export const useStateData = <TData extends TRecordJson>(
  KEY: string,
  init = () => {
    return <TData>{};
  },
) => {
  const { $$ } = useNuxtApp();

  const dd = useState(KEY, init);

  const item = (path: string) => $$.get(dd.value, path);

  const commit = (patch: Record<string, TJson>) => {
    $$.each(patch, (val, path) => {
      $$.set(dd.value, path, val);
    });
  };

  const rm = (...paths: string[]) => {
    $$.each(paths, (path) => {
      $$.unset(dd.value, path);
    });
  };

  return {
    data: readonly(dd),
    commit,
    rm,
    item,
  };
};
