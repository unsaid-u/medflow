const { Model } = require("objection");
const bcrypt = require("bcryptjs");
const { v4: uuidv4 } = require("uuid");
const { PAGINATION_DEFAULT, SORT_ORDER } = require("../constants");

const DB = require("../../db/connection").DB;

Model.knex(DB);

class ClinicianModel extends Model {
  static get tableName() {
    return "clinicians";
  }

  static get idColumn() {
    return "id";
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["name", "password", "specialty", "email", "contact"],

      properties: {
        id: { type: "string" },
        name: { type: "string", minLength: 1, maxLength: 255 },
        password: { type: "string", minLength: 1, maxLength: 255 },
        specialty: { type: "string", minLength: 1, maxLength: 255 },
        email: { type: "string", minLength: 1, maxLength: 255 },
        profile_image: { type: "string", format: "uri", nullable: true },
        contact: { type: "string", minLength: 1, maxLength: 255 },
      },
    };
  }

  static async beforeInsert() {
    this.id = uuidv4();
    if (this.password) {
      this.password = await bcrypt.hash(this.password, 10);
    }

    if (!this.created_at) {
      this.created_at = new Date().toISOString();
    }

    this.update_at = new Date().toISOString();
  }

  static async authenticate(email, password) {
    // can be used for login
    const user = await this.query().findOne({ email });
    if (user && (await bcrypt.compare(password, user.password))) {
      return user;
    }
    return null;
  }

  static async getAllClinicians(
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

  static async createClinician(clinician) {
    return await this.query().insert(clinician);
  }

  static async getClinicianById(id) {
    return await this.query().findById(id);
  }
}

module.exports = { ClinicianModel };
