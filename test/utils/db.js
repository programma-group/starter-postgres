const userFixtures = require('../fixtures/user.json');

/**
 * Truncates tables in order to put knex data
 * @returns {Promise} resolved on finished seeding
 * @param {Knex} knex The knex object
 */
const truncateTables = async (knex) => {
  await knex('users').truncate();
};

/**
 * Seeds tables in order to put knex data
 * @returns {Promise} resolved on finished seeding
 * @param {Knex} knex The knex object
 */
const seedTables = async (knex) => {
  await knex('users').insert(userFixtures);
};

/**
 * Seeds a database with test fixtures
 * @returns {Promise} resolved on finished seeding
 * @param {Knex} knex The knex object
 */
const seedTestDatabase = async (knex) => {
  await truncateTables(knex);
  await seedTables(knex);
};

module.exports = {
  seedTestDatabase,
  truncateTables,
  seedTables,
};
