const express = require('express');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const cors = require('cors');
const { init: initDbConnection } = require('./db');
const userRoute = require('./routes/user');

initDbConnection().catch((err) => {
  // eslint-disable-next-line no-console
  console.log(err);
  process.exit(1);
});

const app = express();
app.use(helmet());
app.use(cors());
app.use(bodyParser.json());
app.use('/user', userRoute);

// respond with "hello world" when a GET request is made to the homepage
app.get('/', (req, res) => {
  res.json('hello world');
});

module.exports = app;
