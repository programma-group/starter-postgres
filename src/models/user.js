const Password = require('objection-password')();
const { Model } = require('objection');

class User extends Password(Model) {
  static get tableName() {
    return 'users';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['firstName', 'lastName', 'username', 'password', 'email'],
      properties: {
        id: {
          type: 'integer',
        },
        firstName: {
          type: 'string',
          minLength: 1,
          maxLength: 255,
        },
        lastName: {
          type: 'string',
          minLength: 1,
          maxLength: 255,
        },
        username: {
          type: 'string',
          minLength: 1,
          maxLength: 255,
        },
        email: {
          type: 'string',
          minLength: 1,
          maxLength: 255,
          format: 'email',
        },
        password: {
          type: 'string',
          minLength: 6,
          maxLength: 100,
        },
      },
    };
  }
}

module.exports = User;
