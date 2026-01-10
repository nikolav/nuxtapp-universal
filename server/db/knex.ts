import Knex from "knex";
import * as knexConfig from "./knexfile";

export const knex = useRuntimeConfig().databaseInit
  ? Knex(knexConfig.development)
  : null;
