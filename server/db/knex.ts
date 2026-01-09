import Knex from "knex";
import * as knexConfig from "./knexfile";

export const knex = Knex(knexConfig.development);
