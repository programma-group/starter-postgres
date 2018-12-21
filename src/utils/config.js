const winston = require('winston');

const winstonConfig = {
  transports: [
    new winston.transports.Console(),
  ],
  format: winston.format.combine(
    winston.format.json(),
  ),
};

module.exports = {
  winstonConfig,
};
