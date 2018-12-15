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
});
