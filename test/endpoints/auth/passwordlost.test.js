const request = require('supertest');
const { advanceTo, clear } = require('jest-date-mock');
const app = require('../../../src/app');

const makeRequest = email => (
  request(app)
    .post('/auth/password/lost')
    .send({ email })
);

jest.mock('nodemailer', () => ({
  createTransport: () => ({
    sendMail: jest.fn().mockResolvedValue(),
  }),
}));

describe('POST /auth/password/lost', () => {
  beforeEach(() => {
    advanceTo(new Date('2018-01-12 00:00:00 UTC'));
  });

  afterEach(clear);

  it('should generate a expired token', async () => {
    await makeRequest('admin@admin.com')
      .expect((res) => {
        expect(res.body).toMatchObject({
          ok: true,
          message: 'Password reset success',
        });
      })
      .expect(200);
  });
});
