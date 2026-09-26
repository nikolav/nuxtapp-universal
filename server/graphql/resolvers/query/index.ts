import { $$ } from "#server/utils";

export const Query = {
  status: () => $$.res({ status: "ok" }),
};
