/** Shared config for application; can be req'd many places. */

require("dotenv").config();

const PORT = +process.env.PORT || 5000;

const BCRYPT_WORK_FACTOR = 12;

const SQUARE_APP_ID = process.env.SQUARE_APP_ID;

const SQUARE_TOKEN = process.env.SQUARE_TOKEN;

const SQUARE_VERSION = process.env.SQUARE_VERSION;

const SQUARE_LOC_ID = process.env.SQUARE_LOC_ID;

const SQUARE_API_BASEPATH = process.env.SQUARE_API_BASEPATH;

const SQUARE_PAYMENT_FORM_PATH = process.env.SQUARE_PAYMENT_FORM_PATH;

const SQUARE_PAYMENTS_PATH = process.env.SQUARE_PAYMENTS_PATH;

const ORIGIN_FRONTEND = process.env.ORIGIN_FRONTEND;

const PRIVATE_KEY = process.env.PRIVATE_KEY.replace(/\\n/gm, '\n');

const NODE_ENV = process.env.NODE_ENV;

// database is:
//
// - on Heroku, get from env var DATABASE_URL
// - in testing, 'opus-core-test'
// - else: 'opus-core'

// console.log("Loading Environment Variables: ", process.env);

let DB_URI;

if (NODE_ENV === "test") {
  DB_URI = "opus-core-test";
  // console.log("Configuring DB_URI for test: ", DB_URI);
} else {
  DB_URI = process.env.DATABASE_URL || "opus-core";
  // console.log("Configuring DB_URI for production: ", DB_URI);
}



module.exports = {
  NODE_ENV,
  PORT,
  DB_URI,
  BCRYPT_WORK_FACTOR,
  SQUARE_APP_ID,
  SQUARE_TOKEN,
  SQUARE_VERSION,
  SQUARE_LOC_ID,
  SQUARE_API_BASEPATH,
  SQUARE_PAYMENT_FORM_PATH,
  SQUARE_PAYMENTS_PATH,
  ORIGIN_FRONTEND,
  PRIVATE_KEY
};
