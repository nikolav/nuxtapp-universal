import { z } from "zod";
import isJWT from "validator/es/lib/isJWT";

export { schemaJsonData, schemaJsonDataRecord } from "./json.schema";
export * from "./transforms";

export const schemaJWT = z.string().refine(isJWT);
export const schemaAuthCredentials = z.object({
  email: z.email(),
  password: z.string().nonempty(),
});
