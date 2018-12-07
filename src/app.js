const express = require('express');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const cors = require('cors');
const { init: initDbConnection } = require('./db');
const userRouter = require('./routes/user');
const authRouter = require('./routes/auth');
const User = require('./models/user');

initDbConnection().catch((err) => {
  // eslint-disable-next-line no-console
  console.log(err);
  process.exit(1);
});

const app = express();
app.set('models.user', User);
app.use(helmet());
app.use(cors());
app.use(bodyParser.json());
app.use('/user', userRouter);
app.use('/auth', authRouter);

// respond with "hello world" when a GET request is made to the homepage
app.get('/', (req, res) => {
  res.json('hello world');
});

module.exports = app;
