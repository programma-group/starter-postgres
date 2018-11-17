const path = require('path');

const envPath = path.resolve(__dirname, '..', '.env.test');
require('dotenv').config({
  path: envPath,
});

const { init: initDbConnection, knexObject } = require('../src/db');

beforeAll(async () => {
  await initDbConnection();
  await knexObject.migrate.latest({
    directory: path.resolve(__dirname, '..', 'src', 'migrations'),
  });
});
