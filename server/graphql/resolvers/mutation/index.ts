import { RouteResult } from "#server/utils/route-result";

export const Mutation = {
  demo: () => new RouteResult("mutation demo ok").dump(),
};
