import { request } from "graphql-request";
import { from } from "rxjs";
import type { RequestExtendedOptions } from "graphql-request";
import trim from "lodash/trim";

export default defineNuxtPlugin({
  name: "gql",
  enforce: "pre",
  setup: () => {
    const { apiBase, graphqlEndpoint } = useRuntimeConfig().public;
    const url = `${apiBase}/${trim(graphqlEndpoint, "/")}`;
    return {
      provide: {
        gql: <TData = unknown>(config: Partial<RequestExtendedOptions>) =>
          from(
            request<TData>({
              url,
              ...(<any>config),
            }),
          ),
      },
    };
  },
});
