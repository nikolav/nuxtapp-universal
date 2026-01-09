exports.up = async function (knex) {
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
};

exports.down = async function (knex) {
  await knex.schema.dropTableIfExists("main");
};
