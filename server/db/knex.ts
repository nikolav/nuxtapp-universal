import Knex from "knex";
import * as connections from "#server/db/knexfile";

export const knex = useRuntimeConfig().databaseInit
  ? Knex((<any>connections)[useRuntimeConfig().databaseConnectionName])
  : null;
