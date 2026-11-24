import { z } from "zod";

export const schemaJsonLiteral = z.union([
  z.string(),
  z.number(),
  z.boolean(),
  z.null(),
]);
export type TJsonLiteral = z.infer<typeof schemaJsonLiteral>;

export const schemaJsonData = z.json();
export type TJson = z.infer<typeof schemaJsonData>;

export const schemaJsonDataRecord: z.ZodType<{ [key: string]: TJson }> = z.lazy(
  () => z.record(z.string(), schemaJsonData),
);
export type TJsonDataRecord = z.infer<typeof schemaJsonDataRecord>;
