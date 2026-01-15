import { request } from "graphql-request";
import { from } from "rxjs";
import type { RequestExtendedOptions } from "graphql-request";

export default defineNuxtPlugin({
  name: "graphql:request",
  setup: () => {
    // const url = useRuntimeConfig().public.graphqlEndpoint;
    const url = "https://graphqlzero.almansi.me/api";
    return {
      provide: {
        gql: <TData = unknown>(config: Partial<RequestExtendedOptions>) =>
          from(
            request<TData>({
              url,
              ...(<any>config),
            })
          ),
      },
    };
  },
});
