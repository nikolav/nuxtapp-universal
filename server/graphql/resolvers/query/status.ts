import get from "lodash/get.js";
import { RouteResult } from "#server/utils/route-result";

export const status = (_: unknown, args: unknown) => {
  console.log({ args });
  return new RouteResult({
    x: get(args, "x", null),
    foo: "bar",
    dt: ((d) => `${d.toLocaleDateString()} ${d.toLocaleTimeString()}`)(
      new Date(),
    ),
  }).dump();
};
