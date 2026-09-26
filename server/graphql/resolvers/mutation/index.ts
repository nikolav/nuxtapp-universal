import { $$ } from "#server/utils";

export const Mutation = {
  demo: () => $$.res("mutation:demo ok"),
};
