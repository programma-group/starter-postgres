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
  'passwordConfirm',
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
  requiredFields.forEach((field) => {
    const data = getOmittedData(field);
    it(`should return error if ${field} is not present on the payload`, async () => {
      await makeRequest(data)
        .expect((res) => {
          expect(res.body).toMatchObject(expect.objectContaining({
            ok: false,
            type: 'BodyValidationError',
            message: 'There are validation errors',
          }));
          expect(res.body.errors).toMatchSnapshot(`${field} errors`);
        })
        .expect(400);
    });
  });
});
