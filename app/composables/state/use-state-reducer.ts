import type { TMaybeRefOrGetter, TOrNoValue } from "~/types";

export const useStateReducer = <TData = unknown>(
  key: string,
  init?: () => TMaybeRefOrGetter<TData>,
) => {
  const state = useState(key, () => toValue(init?.()));
  const reduce = (reducer: (d: TOrNoValue<TData>) => TData) => {
    state.value = reducer(state.value);
  };

  return {
    data: readonly(state),
    reduce,
  };
};
