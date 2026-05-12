import { z } from "zod";
import isJWT from "validator/es/lib/isJWT";
import matches from "validator/es/lib/matches";

import { rRegexSafeCharacters } from "../utils/re";
export { schemaJsonData, schemaJsonDataRecord } from "./json.schema";
export * from "./transforms";

export const schemaJWT = z.string().refine(isJWT);

export const schemaAuthCredentials = z.object({
  email: z.email(),
  password: z.string().nonempty(),
});

export const schemaOAuthProviders = z.enum(["google"]);

export const schemaAuthToken = z
  .string()
  .min(1)
  .refine((val) => {
    // jwt
    if (val.includes(".") && isJWT(val)) return true;
    // laravel sanctum token format: "123|abcdef..."
    if (/^\d+\|[A-Za-z0-9+/=_-]+$/.test(val)) return true;

    return false;
  }, "Invalid token format");

export const schemaOAuthPayload = z.discriminatedUnion("type", [
  z.object({
    type: z.literal("oauth:token"),
    token: schemaAuthToken,
  }),
  z.object({
    type: z.literal("oauth:error"),
    error: z.string().optional(),
  }),
]);

export const schemaAuthDriver = z.enum(["memory", "api", "firebase"]);

export const schemaNonSpecialChars = z
  .string()
  .trim()
  .nonempty()
  .refine((s) => matches(s, rRegexSafeCharacters));

export const schemaCacheKeyDriver = z.enum([
  "local",
  "api",
  "firebase",
] as const);

export const schemaStatusResultDump = z.object({
  error: z.unknown(),
  result: z.unknown(),
});

export const schemaCollectionsKeyDriver = z.enum([
  "local",
  "api",
  "firebase",
] as const);

export const schemaFileStorageDriver = z.enum(["local"] as const);
