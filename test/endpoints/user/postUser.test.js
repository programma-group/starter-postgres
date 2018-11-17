const request = require('supertest');
const app = require('../../../src/app');
const { getCorrectUserData } = require('../../utils/user');

const goodRequest = (body = {}) => (
  request(app)
    .post('/user')
    .send(body)
);

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
});
