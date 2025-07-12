/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("visits", (table) => {
    table.string("id").primary();
    table.string("clinician_id", 255).notNullable();
    table.string("patient_id", 255).notNullable();
    table.string("patient_name", 255).notNullable();
    table.string("visit_type").nullable().defaultTo("general");
    table.text("notes").nullable();
    table.timestamp("created_at").notNullable().defaultTo(knex.fn.now());
    table.timestamp("updated_at").notNullable().defaultTo(knex.fn.now());

    table
      .foreign("clinician_id")
      .references("id")
      .inTable("clinicians")
      .onDelete("SET NULL"); // if the clinician is deleted, the visit will be set to null

    table
      .foreign("patient_id")
      .references("id")
      .inTable("patients")
      .onDelete("CASCADE"); // if the patient is deleted, the visit will be deleted

    table
      .foreign("patient_name")
      .references("name")
      .inTable("patients")
      .onDelete("CASCADE");

    // index
    table.index("patient_name");
    table.index("clinician_id");
    table.index("patient_id");
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("visits");
};
