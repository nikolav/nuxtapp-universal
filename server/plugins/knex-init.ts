import { Model } from "objection";
import { knex } from "../db/knex";

export default defineNitroPlugin(() => {
  Model.knex(knex);
  console.log("knex initialized");
});
