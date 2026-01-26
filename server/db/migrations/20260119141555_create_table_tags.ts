import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable("tags", (table) => {
    table.increments("id").primary();
    table.string("tag").notNullable().unique();
    table.timestamps(true, true);

    table.index(["tag"]);
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable("tags");
}
