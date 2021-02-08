const app = require('../../src/app');
const request = require('supertest')(app);
const { clearDatabase, syncDatabase } = require('../helpers/db');
const { createStudentData } = require('../helpers/data');
const StudentService = require('../../src/app/services/StudentService');

describe('Students', () => {
  beforeAll(async () => {
    await syncDatabase();
  });

  beforeEach(async () => {
    await clearDatabase();
  });

  it('Should return UP status', async () => {

    const response = await request.get("/status").send();

    expect(response.status).toBe(200);
    expect(response.body).toEqual(expect.objectContaining({ status : 'UP' }));
  });

  it('Should return 404 when request to not defined route', async () => {
    const data = createStudentData();

    const response1 = await request.get("/someroute/123").send();

    const response2 = await request.post("/someroute").send({ foo: 'bar'});

    expect(response1.status).toBe(404);
    expect(response2.status).toBe(404);
  });

  it('Should create a student and return 201 and id', async () => {
    const data = createStudentData();

    const response = await request.post("/students").send(data);

    expect(response.status).toBe(201);
    expect(response.body.id).toBeDefined();
  });

  it('Should return 409 status on duplicatede academicRegister', async () => {
    const data1 = createStudentData();
    const data2 = createStudentData();

    const response1 = await request.post("/students").send(data1);
    const response2 = await request.post("/students").send(data2);

    expect(response2.status).toBe(409);
  });

  it('Should return error', async () => {
    const data = createStudentData();

    jest.spyOn(StudentService, 'create').mockImplementation(() => new Error('Some error'));

    const response = await request.post("/students").send(data);

    expect(response.status).toBe(409);

    jest.restoreAllMocks();
  });
});

