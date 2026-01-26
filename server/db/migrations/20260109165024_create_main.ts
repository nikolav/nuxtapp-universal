import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable("main", (table) => {
    table.increments("id").primary();
    table.string("key").unique();
    table.json("data").notNullable();
    // created_at, updated_at with defaults
    table.timestamps(true, true);

    table.index(["key"]);
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists("main");
}
