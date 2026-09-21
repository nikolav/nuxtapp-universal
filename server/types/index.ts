import { z } from "zod";

const schemaJsonLiteral = z.union([
  z.string(),
  z.number(),
  z.boolean(),
  z.null(),
]);

type JsonLiteral = z.infer<typeof schemaJsonLiteral>;
type Json = JsonLiteral | { [key: string]: Json } | Json[];

export type TOrNoValue<T = unknown> = T | undefined | null;
export type TRecordJson = { [key: string]: Json };
export type TJson = Json;
