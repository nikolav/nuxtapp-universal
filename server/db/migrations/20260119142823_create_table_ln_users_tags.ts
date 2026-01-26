import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable("ln_users_tags", (table) => {
    table.increments("id").primary();

    // Foreign key to users table
    // When user is deleted, remove their tags
    table
      .integer("user_id")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("users")
      .onDelete("CASCADE");

    // Foreign key to tags table
    // When tag is deleted, remove from users
    table
      .integer("tag_id")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("tags")
      .onDelete("CASCADE");

    // Automatic timestamps
    table.timestamps(true, true);

    // Composite unique constraint - prevents duplicate user-tag pairs
    table.unique(["user_id", "tag_id"]);

    // Indexes for performance
    table.index(["user_id"]);
    table.index(["tag_id"]);
    table.index(["user_id", "tag_id"]);
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists("ln_users_tags");
}
