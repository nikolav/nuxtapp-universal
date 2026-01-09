import Knex from "knex";
import * as knexConfig from "./knexfile";

import "../config/dotenv.init";

export const knex = process.env.NUXT_DATABASE_INIT
  ? Knex(knexConfig.development)
  : null;
