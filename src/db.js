const knex = require('knex');
const { Model } = require('objection');

const {
  DB_HOST, DB_USER, DB_PASS, DB_NAME, DB_MIN_POOL, DB_MAX_POOL, DB_PORT,
} = process.env;

const knexObject = knex({
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
});

const init = () => Model.knex(knexObject);

module.exports = init;
