const request = require('supertest');
const app = require('../../../src/app');
const { getCorrectUserData, getOmittedData } = require('../../utils/user');

const goodRequest = (body = {}) => (
  request(app)
    .post('/user')
    .send(body)
);

const requiredFields = [
  'username',
  'password',
  'email',
  'firstName',
  'lastName',
];

describe('POST /user', () => {
  it('correctly posts a user', async () => {
    await goodRequest(getCorrectUserData())
      .expect(({ body }) => {
        expect(body.ok).toBe(true);
        expect(body.user).toMatchObject(expect.objectContaining({
          id: expect.any(Number),
          username: 'inserted_user',
          email: 'inserted_user@admin.com',
          firstName: 'Inserted',
          lastName: 'User',
          password: expect.stringMatching(/^\$2/),
        }));
      })
      .expect(200);
  });
  requiredFields.forEach((field) => {
    const data = getOmittedData(field);
    it(`should return error if ${field} is not present on the payload`, async () => {
      await goodRequest(data)
        .expect(({ body }) => {
          expect(body.ok).toBe(false);
          expect(body.type).toBe('ModelValidation');
          expect(body.data).toMatchSnapshot(field);
        })
        .expect(400);
    });
  });
});
