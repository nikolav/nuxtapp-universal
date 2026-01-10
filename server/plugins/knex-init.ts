import { Model } from "objection";
import { knex } from "../db/knex";

export default defineNitroPlugin(() => {
  if (useRuntimeConfig().databaseInit) {
    Model.knex(knex!);
    console.log("knex initialized");
  }
});
