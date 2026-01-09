import Knex from "knex";
import * as knexConfig from "./knexfile";

const config = useRuntimeConfig();

export const knex = config.databaseInit ? Knex(knexConfig.development) : null;
