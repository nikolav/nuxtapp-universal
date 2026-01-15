import { request } from "graphql-request";
import type { TGQLOptions } from "~/types";

// document: any,
//   variables?: any,
//   options?: AsyncDataOptions<TData>
const url = "https://graphqlzero.almansi.me/api";
export const useGraphQL = <TData = unknown>(options: TGQLOptions<TData>) => {
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
