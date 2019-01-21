require('dotenv').config({
  path: '../.env',
});

const {
  DB_HOST, DB_USER, DB_PASS, DB_NAME, DB_MIN_POOL, DB_MAX_POOL, DB_PORT,
} = process.env;

module.exports = {
  development: {
    client: 'postgresql',
    connection: {
      host: DB_HOST,
      user: DB_USER,
      password: DB_PASS,
      database: DB_NAME,
      port: DB_PORT,
    },
    pool: {
      min: parseInt(DB_MIN_POOL, 10),
      max: parseInt(DB_MAX_POOL, 10),
    },
  },
};
