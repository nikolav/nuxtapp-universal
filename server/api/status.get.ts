import { Main } from "#server/db/models/Main.model";

import { knex } from "#server/db/knex";

export default defineEventHandler(async (event) => {
  return {
    time: new Date().toISOString(),
    status: "ok",
    connection: knex?.client.config.connection,
    res: knex ? await Main.query() : [],
    cache: (await event.context.cache?.get("keyv")) ?? null,
  };
});
