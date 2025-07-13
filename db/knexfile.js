"use strict";

const path = require("path");

const migrationDirectories = [path.join(__dirname, "./migrations")];

module.exports = {
  client: "sqlite3",
  connection: {
    // this will create (or open) ./data/database.sqlite
    filename: path.join(__dirname, "data", "database.sqlite"),
  },
  useNullAsDefault: true,
  migrations: {
    directory: migrationDirectories,
  },

  // ! SQLite the foreign key disabled by default
  // Enable foreign key constraints for SQLite
  pool: {
    afterCreate: (conn, done) => {
      conn.run("PRAGMA foreign_keys = ON", done);
    },
  },
};
