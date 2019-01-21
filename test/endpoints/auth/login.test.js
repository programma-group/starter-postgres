const jsonwebtoken = require('jsonwebtoken');
const request = require('supertest');
const app = require('../../../src/app');

const getLoginData = (email, password) => ({
  email,
  password,
});

const makeRequest = body => (
  request(app)
    .post('/auth/login')
    .send(body)
);

describe('POST /auth/login', () => {
  it('should login', async () => {
    await makeRequest(getLoginData('admin@admin.com', '12345'))
      .expect((res) => {
        expect(res.body.ok).toBe(true);
        const decoded = jsonwebtoken.verify(res.body.data.token, process.env.SECRET);
        expect(decoded.id).toBe(1);
      })
      .expect(200);
  });
  it('should not login if the password is incorrect', async () => {
    await makeRequest(getLoginData('admin@admin.com', 'incorrectPassword'))
      .expect((res) => {
        expect(res.body).toMatchObject({
          ok: false,
          type: 'WrongLogin',
          message: 'The password you entered is not valid',
        });
      })
      .expect(401);
  });
  it('should not login if the user is incorrect', async () => {
    await makeRequest(getLoginData('non_existent@admin.com', '12345'))
      .expect((res) => {
        expect(res.body).toMatchObject({
          ok: false,
          type: 'WrongLogin',
          message: 'User not found',
        });
      })
      .expect(404);
  });
  it('should not login if email field doesn\'t appear', async () => {
    const data = {
      password: '123456',
    };
    await makeRequest(data)
      .expect((res) => {
        expect(res.body).toMatchObject({
          ok: false,
          errors: [{
            location: 'body',
            param: 'email',
            msg: 'That Email is not valid!',
          }],
          message: 'There are validation errors',
          type: 'BodyValidationError',
        });
      })
      .expect(400);
  });
  it('should not login if password field doesn\'t appear', async () => {
    const data = {
      email: 'admin@admin.com',
    };
    await makeRequest(data)
      .expect((res) => {
        expect(res.body).toMatchObject({
          ok: false,
          errors: [{
            location: 'body',
            param: 'password',
            msg: 'Password cannot be blank!',
          }],
          message: 'There are validation errors',
          type: 'BodyValidationError',
        });
      })
      .expect(400);
  });
});
