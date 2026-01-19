import Knex from "knex";
import * as knexConfig from "./knexfile";

export const knex = useRuntimeConfig().databaseInit
  ? Knex(knexConfig.connections[useRuntimeConfig().databaseConnectionName])
  : null;
