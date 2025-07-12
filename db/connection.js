"use strict";

const knex_configuration = require("./knexfile");

const DB = require("knex")(knex_configuration);

function disconnect() {
  DB.destroy((err) => {
    if (err) logger.error(err);
  });
}

module.exports = {
  DB,
  disconnect,
};
