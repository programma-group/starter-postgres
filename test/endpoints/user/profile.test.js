const request = require('supertest');
const app = require('../../../src/app');
const { getSignedToken } = require('../../utils/user');

describe('GET /user/profile', () => {
  it('should show a users profile', async () => {
    const username = 'user';
    const token = await getSignedToken(username);
    await request(app)
      .get('/user/profile')
      .set('Authorization', token)
      .send()
      .expect((res) => {
        expect(res.body).toMatchObject({
          ok: true,
          data: {
            id: 2,
            username: 'user',
            email: 'user@admin.com',
            firstName: 'User',
            lastName: 'LastName',
          },
        });
        expect(res.body.data.password).toBeUndefined();
        expect(res.body.data.resetPasswordToken).toBeUndefined();
        expect(res.body.data.resetPasswordExpires).toBeUndefined();
      })
      .expect(200);
  });
});
