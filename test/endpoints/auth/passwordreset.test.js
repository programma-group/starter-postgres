const request = require('supertest');
const { advanceTo, clear } = require('jest-date-mock');
const bcrypt = require('bcrypt');
const app = require('../../../src/app');
const User = require('../../../src/models/user');

const makeRequest = (token, password, passwordConfirm) => (
  request(app)
    .post('/auth/password/reset')
    .send({
      token,
      password,
      passwordConfirm,
    })
);

const goodToken = '58eaa98bc6fc41004a9ade9a5607846acbc0a4b2';

describe('POST /auth/password/reset', () => {
  it('should reset a password', async () => {
    const newPassword = '1234567';
    advanceTo(new Date('2018-01-12 00:00:00 UTC'));
    await makeRequest(goodToken, newPassword, newPassword)
      .expect((res) => {
        expect(res.body).toMatchObject({
          ok: true,
          message: 'Password reset for user "reset_user"',
        });
      })
      .expect(200);
    const user = await User.query().where('username', 'reset_user').first();
    expect(user.resetPasswordToken).toBeNull();
    expect(user.resetPasswordExpires).toBeNull();
    expect(bcrypt.compare(newPassword, user.password)).resolves.toBe(true);
    clear();
  });
});
