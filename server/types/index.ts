import { z } from "zod";

import { schemaJsonLiteral } from "#server/schemas";

export type TOrNoValue<T = unknown> = T | undefined | null;
export type TJsonLiteral = z.infer<typeof schemaJsonLiteral>;
export type TJson = TJsonLiteral | { [key: string]: TJson } | TJson[];
export type TRecordJson = { [key: string]: TJson };
