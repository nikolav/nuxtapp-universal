import { Model } from "objection";
import { knex } from "../db/knex";

import "../config/dotenv.init";

export default defineNitroPlugin(() => {
  if (process.env.DATABASE_INIT) {
    Model.knex(knex!);
    console.log("knex initialized");
  }
});
