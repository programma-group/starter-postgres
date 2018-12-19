const swaggerJSDoc = require('swagger-jsdoc');

const swaggerDefinition = {
  info: {
    title: 'Express/PostgreSQL starter app starter app',
    version: '0.0.1',
    description: 'This is the REST Documentation for Programma group PostgreSQL starter',
  },
  host: `${process.env.URL}:${process.env.PORT}`,
  securityDefinitions: {
    Bearer: {
      type: 'apiKey',
      name: 'Authorization',
      in: 'header',
    },
  },
  components: {
    responses: {
      UnauthorizedError: {
        description: 'Access token is missing or invalid',
      },
    },
  },
};

const options = {
  swaggerDefinition,
  apis: ['./src/docs/**/*.yaml'],
};

module.exports = swaggerJSDoc(options);
