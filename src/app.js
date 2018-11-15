const express = require('express');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const cors = require('cors');
const initDb = require('./db');
const userRoute = require('./routes/user');

initDb();

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
