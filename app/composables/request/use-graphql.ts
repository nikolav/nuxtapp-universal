import { request } from "graphql-request";
import type { TGQLOptions, TMaybeRefOrGetter } from "~/types";

export const useGraphql = <TData = unknown>(
  options: TGQLOptions<TData> & {
    variables?: Record<string, TMaybeRefOrGetter>;
  },
) => {
  const { $$ } = useNuxtApp();
  const { apiBase, graphqlEndpoint } = useRuntimeConfig().public;
  const url = `${apiBase}/${$$.trim(graphqlEndpoint, "/")}`;
  const variables = computed(() =>
    $$.reduce(
      options.variables ?? <any>{},
      (res, dep, name) => {
        res[name] = toValue(dep);
        return res;
      },
      <any>{},
    ),
  );
  const vars = () => variables.value;
  return useAsyncData(
    options.key,
    (_nuxtApp, { signal }) =>
      request({
        signal,
        requestHeaders: <HeadersInit>{},
        ...options,
        variables: vars(),
        url,
      }),
    {
      server: true,
      lazy: true,
      ...(<any>options),
      watch: [variables],
    },
  );
};
