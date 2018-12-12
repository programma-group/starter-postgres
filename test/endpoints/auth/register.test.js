const request = require('supertest');
const app = require('../../../src/app');
const { getCorrectUserData, getOmittedData } = require('../../utils/user');

const makeRequest = (body = {}) => (
  request(app)
    .post('/auth/register')
    .send(body)
);

const requiredFields = [
  'username',
  'password',
  'email',
  'firstName',
  'lastName',
];

describe('POST /auth/register', () => {
  it('should register a user', async () => {
    await makeRequest(getCorrectUserData())
      .expect((res) => {
        expect(res.body).toMatchObject(expect.objectContaining({
          ok: true,
          data: {
            token: expect.any(String),
          },
        }));
      });
  });
});
