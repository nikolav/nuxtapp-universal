import Knex from "knex";
import { Model } from "objection";

import * as connections from "#server/db/knexfile";
import type { TKnex } from "#server/types";

let knex: TKnex;

export default defineNitroPlugin(async (nitroApp) => {
  const config = useRuntimeConfig();

  if (config.databaseInit) {
    knex = Knex((<any>connections)[config.databaseConnectionName]);
    Model.knex(knex);
    console.log({ "knex:initialized": knex });
  }

  nitroApp.hooks.hook("request", (event) => {
    // available in server routes, server middleware, API handlers:
    event.context.knex = knex;
  });
});

// # access
// export default defineEventHandler((event) => {
//   const knex = event.context.knex;
//   // ...
// });
