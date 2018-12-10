const Password = require('objection-password')();
const { Model, mixin } = require('objection');
const crypto = require('crypto');
const uniqueMixin = require('objection-unique')({
  fields: ['email', 'username'],
  identifiers: ['id'],
});

const userMixin = mixin(Model, [
  Password,
  uniqueMixin,
]);

class User extends userMixin {
  static get useLimitInFirst() {
    return true;
  }

  static get virtualAttributes() {
    return ['name'];
  }

  static get tableName() {
    return 'users';
  }

  static get name() {
    return `${this.firstName} ${this.lastName}`;
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

  generateResetToken() {
    return new Promise((resolve, reject) => {
      crypto.randomBytes(20, (err, buf) => {
        if (err) {
          return reject(err);
        }
        const resetPasswordToken = buf.toString('hex');
        const resetPasswordExpires = new Date(Date.now() + 86400000); // 1 day in the future
        return this.$query().patch({
          resetPasswordExpires,
          resetPasswordToken,
        }).then(resolve).catch(reject);
      });
    });
  }
}

module.exports = User;
