require("dotenv").config();

const SECRET_KEY = process.env.SECRET_KEY || 'my weak (!!) secret key';
const BCRYPT_WORK_FACTOR = 12;  // determines "strength" of hashing

module.exports = {
  development: {
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    dialect: "mysql",
  },
  production: {
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    dialect: "mysql",
  },
  
  SECRET_KEY,
  BCRYPT_WORK_FACTOR,
};
