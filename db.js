/** Database setup for jobly. */

const { Client } = require("pg");
const { 
  NODE_ENV,
  DB_URI } = require("./config");

const db = (NODE_ENV === "test" || NODE_ENV === "dev") ? 
  new Client({
    connectionString: DB_URI
  })
  :
  new Client({
    connectionString: DB_URI,
    ssl: {
      rejectUnauthorized: false
    }
  });

db.connect();

module.exports = db;
