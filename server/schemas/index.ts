import { z } from "zod";

export const schemaJsonLiteral = z.union([
  z.string(),
  z.number(),
  z.boolean(),
  z.null(),
]);
