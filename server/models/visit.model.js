const { Model } = require("objection");
const { v4: uuidv4 } = require("uuid");

const DB = require("../../db/connection").DB;

Model.knex(DB);

class VisitsModel extends Model {
  static get tableName() {
    return "visits";
  }

  static get idColumn() {
    return "id";
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["clinician_id", "patient_id"],

      properties: {
        id: { type: "string" },
        clinician_id: { type: "string", minLength: 1, maxLength: 255 },
        patient_id: { type: "string", minLength: 1, maxLength: 255 },
        visit_type: { type: "string", nullable: true, default: "general" },
        notes: { type: "string", nullable: true },
      },
    };
  }

  static async beforeInsert() {
    this.id = uuidv4();
    if (!this.created_at) {
      this.created_at = new Date().toISOString();
    }

    this.update_at = new Date().toISOString();
  }
}

module.exports = { VisitsModel };
