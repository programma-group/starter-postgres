const Password = require('objection-password')();
const { Model, mixin } = require('objection');
const uniqueMixin = require('objection-unique')({
  fields: ['email', 'username'],
  identifiers: ['id'],
});

const userMixin = mixin(Model, [
  Password,
  uniqueMixin,
]);

class User extends userMixin {
  static get tableName() {
    return 'users';
  }

  $formatJson(user) {
    const userFormatted = super.$formatJson(user);
    userFormatted.password = undefined;
    return userFormatted;
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
