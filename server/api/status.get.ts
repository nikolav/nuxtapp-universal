import { Main } from "#server/db/models/Main.model";

export default defineEventHandler(async (event) => {
  const knex = event.context.knex;
  return {
    time: new Date().toISOString(),
    status: "ok",
    connection: knex?.client.config.connection,
    res: knex ? await Main.query() : [],
    cache: (await event.context.cache?.get("keyv")) ?? null,
  };
});
