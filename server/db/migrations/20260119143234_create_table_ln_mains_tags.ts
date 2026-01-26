import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable("ln_mains_tags", (table) => {
    table.increments("id").primary();

    // Foreign key to mains table
    // Cascade delete when main is deleted
    table
      .integer("main_id")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("main")
      .onDelete("CASCADE");

    // Foreign key to tags table
    // Cascade delete when tag is deleted
    table
      .integer("tag_id")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("tags")
      .onDelete("CASCADE");

    // Automatic timestamps
    table.timestamps(true, true);

    // Composite unique constraint - prevents duplicate main-tag pairs
    table.unique(["main_id", "tag_id"]);

    // Indexes for performance
    table.index(["main_id"]);
    table.index(["tag_id"]);
    table.index(["main_id", "tag_id"]);
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists("ln_mains_tags");
}
