const { Model } = require("objection");
const { v4: uuidv4 } = require("uuid");
const { SORT_ORDER } = require("../constants");

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

  $beforeInsert() {
    this.id = uuidv4();
    if (!this.created_at) {
      this.created_at = new Date().toISOString();
    }

    this.update_at = new Date().toISOString();
  }

  static async getAllPatients(
    pageNo = PAGINATION_DEFAULT.PAGE_NO,
    pageSize = PAGINATION_DEFAULT.PAGE_SIZE,
    searchByName,
    sortBy = "created_at",
    sortOrder = SORT_ORDER.DESC
  ) {
    const query = this.query().orderBy(`${sortBy}`, `${sortOrder}`);

    if (searchByName) {
      query.where("name", "ilike", `%${searchByName}%`);
    }

    return await query.page(pageNo - 1, pageSize);
  }

  static async getPatientById(id) {
    return await this.query().where("id", id).first();
  }
}

module.exports = { PatientsModel };
