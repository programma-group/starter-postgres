const request = require('supertest');
const app = require('../../../src/app');
const User = require('../../../src/models/user');
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
    const data = getCorrectUserData();
    await makeRequest(data)
      .expect((res) => {
        expect(res.body).toMatchObject(expect.objectContaining({
          ok: true,
          data: {
            token: expect.any(String),
          },
        }));
      })
      .expect(200);
    const c = await User.query().where('email', data.email).count();
    expect(c[0].count).toBe('1');
    const userObj = await User.query().where('email', data.email).first();
    expect(userObj).toMatchObject(expect.objectContaining({
      email: data.email,
      firstName: data.firstName,
      lastName: data.lastName,
      username: data.username,
    }));
  });
  requiredFields.forEach((field) => {
    const data = getOmittedData(field);
    it(`should return error if ${field} is not present on the payload`, async () => {
      const initialCount = await User.query().count();
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
      const finalCount = await User.query().count();
      expect(initialCount[0].count).toBe(finalCount[0].count);
    });
  });
  it('should not allow email and username twice', async () => {
    const data = getCorrectUserData();
    await makeRequest(data).expect(200);
    await makeRequest(data)
      .expect((res) => {
        expect(res.body).toMatchObject(expect.objectContaining({
          ok: false,
          type: 'ModelValidation',
        }));
        expect(Object.keys(res.body.data)).toHaveLength(2);
        const { email, username } = res.body.data;
        expect(email).toMatchSnapshot('email');
        expect(username).toMatchSnapshot('username');
      })
      .expect(400);
  });
});
