import { z } from "zod";

import {
  schemaJsonLiteral,
  schemaJsonData,
  schemaJsonDataRecord,
} from "#shared/schemas";

export type TOrNoValue<T = unknown> = T | undefined | null;
export type TJsonLiteral = z.infer<typeof schemaJsonLiteral>;
export type TJson = z.infer<typeof schemaJsonData>;
export type TRecordJson = z.infer<typeof schemaJsonDataRecord>;
