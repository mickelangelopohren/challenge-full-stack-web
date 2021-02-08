const request = require('supertest');
const app = require('../../src/app');
const { clearDatabase, syncDatabase } = require('../helpers/db');
const { createStudentData } = require('../helpers/data');

describe('Students', () => {
  beforeAll(async () => {
    await syncDatabase();
  });

  beforeEach(async () => {
    await clearDatabase();
  });

  it('Should return UP status', async () => {

    const response = await request(app)
      .get("/status")
      .send();

    expect(response.status).toBe(200);
    expect(response.body).toEqual(expect.objectContaining({ status : 'UP' }));
  });

  it('Should return 404 when request to not defined route', async () => {
    const data = createStudentData();

    const response1 = await request(app)
      .get("/someroute/123")
      .send();

    const response2 = await request(app)
      .post("/someroute")
      .send({ foo: 'bar'});

    expect(response1.status).toBe(404);
    expect(response2.status).toBe(404);
  });
});

