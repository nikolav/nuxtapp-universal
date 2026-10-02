import { z } from "zod";

export const schemaJsonLiteral = z.union([
  z.string(),
  z.number(),
  z.boolean(),
  z.null(),
]);
export const schemaJsonData = z.json();
export const schemaJsonDataRecord: z.ZodType<{
  [key: string]: z.infer<typeof schemaJsonData>;
}> = z.lazy(() => z.record(z.string(), schemaJsonData));
export type TJsonDataRecord = z.infer<typeof schemaJsonDataRecord>;
