import { request } from "graphql-request";
import type { TGQLOptions } from "~/types";

export const useAsyncGraphqlData = <TData = unknown>(
  options: TGQLOptions<TData>
) => {
  const { $$ } = useNuxtApp();
  const { apiBase, graphqlEndpoint } = useRuntimeConfig().public;
  const url = `${apiBase}/${$$.trim(graphqlEndpoint, "/")}`;
  const requestHeaders: HeadersInit = {};
  return useAsyncData(
    options.key,
    (_nuxtApp, { signal }) =>
      request({
        signal,
        requestHeaders,
        ...options,
        url,
      }),
    {
      server: true,
      lazy: true,
      ...(<any>options),
    }
  );
};
