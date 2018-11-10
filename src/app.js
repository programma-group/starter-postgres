const express = require('express');
const helmet = require('helmet');
const initDb = require('./db');

initDb();

const app = express();
app.use(helmet());

// respond with "hello world" when a GET request is made to the homepage
app.get('/', (req, res) => {
  res.json('hello world');
});

module.exports = app;
