const path = require('path');

const envPath = path.resolve(__dirname, '..', '.env.test');
require('dotenv').config({
  path: envPath,
});
