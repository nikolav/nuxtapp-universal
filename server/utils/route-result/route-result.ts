import { z } from "zod";
import type { TJson, TOrNoValue } from "#server/types";
import { $$ } from "#server/utils";

export class RouteResult<TData extends TJson = TJson, TError = any> {
  static schemaTransformDump = z.transform((res: RouteResult) => ({
    error: $$.isPresent(res.error) ? `${res.error}` : null,
    result: res.data,
  }));

  constructor(
    public data: TData,
    public error: TOrNoValue<TError> = null,
  ) {}

  dump() {
    return RouteResult.schemaTransformDump.parse(this);
  }
}
