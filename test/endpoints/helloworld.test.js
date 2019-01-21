const request = require('supertest');
const app = require('../../src/app');

describe('GET /', () => {
  it('should render hello world', async () => {
    await request(app)
      .get('/')
      .send()
      .expect((res) => {
        expect(res.body).toEqual('hello world');
      })
      .expect(200);
  });
});
