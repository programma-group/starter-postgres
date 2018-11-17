const userFixtures = require('../fixtures/user.json');

const setValTable = (knex, sequenceId, fixtures) => {
  const maxId = Math.max(...fixtures.map(f => f.id));
  return knex.raw('SELECT setval(?, ?)', [sequenceId, maxId + 1]);
};

/**
 * Truncates tables in order to put knex data
 * @returns {Promise} resolved on finished seeding
 * @param {Knex} knex The knex object
 */
const truncateTables = async (knex) => {
  await knex('users').truncate();
  await setValTable(knex, 'users_id_seq', userFixtures);
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
