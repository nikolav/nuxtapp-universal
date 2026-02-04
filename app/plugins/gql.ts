import { request } from "graphql-request";
import { from } from "rxjs";
import type { RequestExtendedOptions } from "graphql-request";

export default defineNuxtPlugin({
  name: "gql",
  dependsOn: ["utils"],
  setup: () => {
    const { $$ } = useNuxtApp();
    const { apiBase, graphqlEndpoint } = useRuntimeConfig().public;
    const url = `${apiBase}/${$$.trim(graphqlEndpoint, "/")}`;
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
