import get from "lodash/get.js";
import isEmpty from "lodash/isEmpty.js";

import type { TOrNoValue } from "#server/types";

import { isPresent } from "#server/utils/is-present/is-present";
import { RouteResult } from "#server/utils/route-result/route-result";

export const $$ = {
  // 3rd party; lodash,
  get,
  isEmpty,

  // utils
  isPresent,

  // lib
  RouteResult,
  res: (
    d: InstanceType<typeof RouteResult>["data"],
    e?: TOrNoValue<InstanceType<typeof RouteResult>["error"]>,
  ) => new RouteResult(d, e).dump(),
};
