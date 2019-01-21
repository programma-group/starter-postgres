const express = require('express');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const expressWinston = require('express-winston');
const passport = require('./passport');
const { init: initDbConnection } = require('./db');
const { winstonConfig } = require('./utils/config');
const userRouter = require('./routes/user');
const authRouter = require('./routes/auth');
const User = require('./models/user');
const mail = require('./utils/mail');
const swaggerSpec = require('./utils/swagger');

initDbConnection().catch((err) => {
  // eslint-disable-next-line no-console
  console.log(err);
  process.exit(1);
});

const app = express();
const authMiddleware = passport.authenticate('jwt');
app.set('models.user', User);
app.set('mail', mail);
app.use(helmet());
app.use(cors());
if (process.env.NODE_ENV !== 'test') {
  app.use(expressWinston.logger(winstonConfig));
}
app.use(passport.initialize());
app.use(bodyParser.json());
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, {
  explorer: true,
}));
app.use('/user', authMiddleware, userRouter);
app.use('/auth', authRouter);

// respond with "hello world" when a GET request is made to the homepage
app.get('/', (req, res) => {
  res.json('hello world');
});

module.exports = app;
