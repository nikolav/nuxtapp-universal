import { Model } from "objection";
import { knex } from "../db/knex";

export default defineNitroPlugin(async () => {
  const runtimeConfig = useRuntimeConfig();
  if (knex && runtimeConfig.databaseInit) {
    Model.knex(knex!);
    console.log(`knex initialized.`);
  }
});
