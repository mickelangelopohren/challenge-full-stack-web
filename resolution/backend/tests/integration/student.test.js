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

    const response = await request.get('/status').send();

    expect(response.status).toBe(200);
    expect(response.body).toEqual(expect.objectContaining({ status : 'UP' }));
  });

  it('Should return 404 when request to not defined route', async () => {
    const data = createStudentData();

    const response1 = await request.get('/someroute/123').send();

    const response2 = await request.post('/someroute').send({ foo: 'bar'});

    expect(response1.status).toBe(404);
    expect(response2.status).toBe(404);
  });

  it('Should create a student and return 201 and id', async () => {
    const data = createStudentData();

    const response = await request.post('/students').send(data);

    expect(response.status).toBe(201);
    expect(response.body.id).toBeDefined();
  });

  it('Should return 409 status on duplicatede academicRegister', async () => {
    const data1 = createStudentData({ academicRegister: '123123' });
    const data2 = createStudentData({ academicRegister: '123123' });

    const response1 = await request.post('/students').send(data1);
    const response2 = await request.post('/students').send(data2);

    expect(response2.status).toBe(409);
  });

  it('Should return 500 status when an unmapped error occurs on create', async () => {
    const data = createStudentData();

    jest.spyOn(StudentService, 'create').mockImplementation(() => { throw new Error('Some error') });

    const response = await request.post('/students').send(data);

    expect(response.status).toBe(500);

    jest.restoreAllMocks();
  });

  it('Should a list of created students', async () => {
    const data = createStudentData();

    await request.post('/students').send(data);

    const response = await request.get('/students').send();

    expect(response.status).toBe(200);
    expect(response.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining(data),
      ])
    );
  });

  it('Should return 500 status when an unmapped error occurs on retrieve all', async () => {
    const data = createStudentData();

    jest.spyOn(StudentService, 'getAll').mockImplementation(() => { throw new Error('Some error') });

    const response = await request.get('/students').send(data);

    expect(response.status).toBe(500);

    jest.restoreAllMocks();
  });

  it('Should return 200 and one student data', async () => {
    const data = createStudentData();

    const { body: { id } } = await request.post('/students').send(data);
    const response = await request.get(`/students/${id}`).send();

    expect(response.status).toBe(200);
    expect(response.body).toEqual(expect.objectContaining(data));
  });

  it('Should return 404 with inexistent student id', async () => {
    const id = 999999;
    const response = await request.get(`/students/${id}`).send();

    expect(response.status).toBe(404);
  });

  it('Should return 500 status when an unmapped error occurs on retrieve one', async () => {
    const id = 123456;

    jest.spyOn(StudentService, 'getOne').mockImplementation(() => { throw new Error('Some error') });

    const response = await request.get(`/students/${id}`).send();

    expect(response.status).toBe(500);

    jest.restoreAllMocks();
  });

  it('Should return 204 and update student data', async () => {
    const data = createStudentData();
    const updateData = { name: 'New Name', email: 'new@email.com' };

    const { body: { id } } = await request.post('/students').send(data);
    const { status } = await request.patch(`/students/${id}`).send(updateData);
    const response = await request.get(`/students/${id}`).send();

    expect(status).toBe(200);
    expect(response.body).toEqual(expect.objectContaining(updateData));
  });

  it('Should return 404 with inexistent student id', async () => {
    const id = 999999;
    const data = createStudentData();

    const response = await request.patch(`/students/${id}`).send(data);

    expect(response.status).toBe(404);
  });

  it('Should return 422 when try to update academicRegister', async () => {
    const data = createStudentData();
    const updateData = { name: 'New Name', email: 'new@email.com', academicRegister: '123456' };

    const response = await request.patch(`/students/${id}`).send(updateData);

    expect(response.status).toBe(422);
  });

  it('Should return 500 status when an unmapped error occurs on update', async () => {
    const id = 123456;

    jest.spyOn(StudentService, 'getOne').mockImplementation(() => { throw new Error('Some error') });

    const response = await request.patch(`/students/${id}`).send();

    expect(response.status).toBe(500);

    jest.restoreAllMocks();
  });
});

