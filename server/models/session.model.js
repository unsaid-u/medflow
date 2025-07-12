const DB = require("../../db/connection").DB;
const { Model } = require("objection");

Model.knex(DB);
