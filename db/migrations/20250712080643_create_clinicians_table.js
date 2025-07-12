/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("clinicians", (table) => {
    table.string("id").primary();
    table.string("name", 255).notNullable();
    table.string("password", 255).notNullable();
    table.string("specialty", 255).notNullable();
    table.string("email", 255).notNullable().unique();
    table.string("profile_image").nullable();
    table.string("contact", 255).notNullable();
    table.timestamp("created_at").notNullable().defaultTo(knex.fn.now());
    table.timestamp("updated_at").notNullable().defaultTo(knex.fn.now());

    // index
    table.index("name");
    table.index("email");
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("clinicians");
};
