import { isVNode } from "vue";
import { z } from "zod";
// import isJWT from "validator/es/lib/isJWT";

import type { TIconProp } from "~/types";

export { schemaJsonData, schemaJsonDataRecord } from "./json.schema";
export * from "./transforms";

export const schemaStringNonemptyOrRenderable = z.union([
  z.string().trim().nonempty(),
  z.custom<TIconProp>(
    (v) =>
      isVNode(v) ||
      "function" === typeof v ||
      ("object" === typeof v && v != null)
  ),
]);
