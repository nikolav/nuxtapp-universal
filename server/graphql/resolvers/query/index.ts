import { RouteResult } from "~~/server/utils/route-result";

export const Query = {
  status: () => new RouteResult("ok").dump(),
};
