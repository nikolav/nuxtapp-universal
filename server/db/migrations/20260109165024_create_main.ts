import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  // Enable UUID generator (safe if already enabled)
  await knex.raw('CREATE EXTENSION IF NOT EXISTS "pgcrypto"');

  await knex.schema.createTable("main", (table) => {
    table.uuid("id").primary().defaultTo(knex.raw("gen_random_uuid()"));

    table.string("key").unique();

    table.jsonb("data").notNullable();

    // Explicit UTC timestamps
    table
      .timestamp("created_at", { useTz: true })
      .notNullable()
      .defaultTo(knex.raw("timezone('utc', now())"));

    table
      .timestamp("updated_at", { useTz: true })
      .notNullable()
      .defaultTo(knex.raw("timezone('utc', now())"));
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists("main");
}
