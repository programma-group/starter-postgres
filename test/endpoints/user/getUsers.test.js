const request = require('supertest');
const app = require('../../../src/app');

const goodRequest = (params = '') => (
  request(app)
    .get(`/user${params}`)
    .send()
);

describe('GET /user', () => {
  it('should show users', async () => {
    await goodRequest()
      .expect(({ body }) => {
        expect(body.ok).toBe(true);
        expect(body.users).toHaveLength(2);
      })
      .expect(200);
  });
  it('searchs users by username', async () => {
    await goodRequest('?username=adm')
      .expect(({ body }) => {
        expect(body.ok).toBe(true);
        expect(body.users).toHaveLength(1);
        expect(body.users[0]).toMatchObject(expect.objectContaining({
          id: 1,
          username: 'admin',
          email: 'admin@admin.com',
          firstName: 'Admin',
          lastName: 'LastName',
        }));
      })
      .expect(200);
  });
  it('searchs users by first name and last name', async () => {
    await goodRequest('?firstName=adm&lastName=last')
      .expect(({ body }) => {
        expect(body.ok).toBe(true);
        expect(body.users).toHaveLength(1);
        expect(body.users[0]).toMatchObject(expect.objectContaining({
          id: 1,
          username: 'admin',
          email: 'admin@admin.com',
          firstName: 'Admin',
          lastName: 'LastName',
        }));
      })
      .expect(200);
  });
});
