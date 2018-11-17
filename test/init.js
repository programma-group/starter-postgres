const path = require('path');

const envPath = path.resolve(__dirname, '..', '.env.test');
require('dotenv').config({
  path: envPath,
});

const { init: initDbConnection, knexObject } = require('../src/db');
const { seedTestDatabase, truncateTables } = require('./utils/db');

beforeAll(async () => {
  await initDbConnection();
  await knexObject.migrate.latest({
    directory: path.resolve(__dirname, '..', 'src', 'migrations'),
  });
  await seedTestDatabase(knexObject);
});

afterAll(async () => {
  await truncateTables(knexObject);
});
