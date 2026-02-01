import { z } from "zod";
import isJWT from "validator/es/lib/isJWT";

export { schemaJsonData, schemaJsonDataRecord } from "./json.schema";
export * from "./transforms";

export const schemaJWT = z.string().refine(isJWT);
export const schemaAuthCredentials = z.object({
  email: z.email(),
  password: z.string().nonempty(),
});
export const schemaOAuthProviders = z
  .string()
  .refine((val) => Boolean({ google: true }[val.toLocaleLowerCase()]));
export const schemaOAuthPayload = z.object({
  type: z.string().refine((val) => "oauth:token" === val),
  token: schemaJWT,
});
