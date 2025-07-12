const { Model } = require("objection");
const { v4: uuidv4 } = require("uuid");

const DB = require("../../db/connection").DB;

Model.knex(DB);

class PatientsModel extends Model {
  static get tableName() {
    return "patients";
  }

  static get idColumn() {
    return "id";
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["name", "email", "contact", "address", "dob"],

      properties: {
        id: { type: "string" },
        name: { type: "string", minLength: 1, maxLength: 255 },
        email: { type: "string", minLength: 1, maxLength: 255 },
        profile_image: { type: "string", format: "uri", nullable: true },
        contact: { type: "string", minLength: 1, maxLength: 255 },
        address: { type: "string", nullable: true },
        dob: {
          type: "string",
          format: "date", // enforces an ISO-8601 date: “YYYY-MM-DD”
        },
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

  static async getAllPatients(pageNo = 1, pageSize, searchByName = null) {}
}

module.exports = { PatientsModel };
