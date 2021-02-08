const StudentService = require('../../src/app/services/StudentService');
const { BusinessLogicError, ConflictError } = require('../../src/errors');
const { clearDatabase, syncDatabase } = require('../helpers/db');
const { createStudentData } = require('../helpers/data');

describe('Students service', () => {
  beforeAll(async () => {
    await syncDatabase();
  });

  beforeEach(async () => {
    await clearDatabase();
  });

  it('Should create new student', async () => {
    const data = createStudentData();
    const { id } = await StudentService.create({ data });

    expect(id).toBeDefined();
  });

  it('Should return an error on duplicated academicRegister entry', async () => {
    const data1 = createStudentData({ academicRegister: 123456 });
    const data2 = createStudentData({ academicRegister: 123456 });

    const createdStudent1 = await StudentService.create({ data: data1 });

    const createStudent2 = StudentService.create({ data: data2 });

    await expect(createStudent2).rejects
      .toThrowError(new ConflictError("Duplicate entry 'academicRegister'"));
  });

  it('Should retrieve all created students', async () => {
    const data1 = createStudentData({ academicRegister: '123456' });
    const data2 = createStudentData({ academicRegister: '654321' });

    const createdStudent1 = await StudentService.create({ data: data1 });
    const createdStudent2 = await StudentService.create({ data: data2 });

    const offset = 0;
    const limit = 10;
    const studentsList = await StudentService.getAll({ offset, limit });

    expect(studentsList.count).toBeDefined();
    expect(studentsList.rows).toEqual(
      expect.arrayContaining([
        expect.objectContaining(data1),
        expect.objectContaining(data2)
      ])
    );
  });

  it('Should retrieve an empty array of students', async () => {
    const offset = 0;
    const limit = 10;
    const studentsList = await StudentService.getAll({ offset, limit });

    expect(studentsList).toEqual({"count": 0, "rows": []});
  });

  it('Should retrieve one student', async () => {
    const data = createStudentData();

    const { id } = await StudentService.create({ data });

    const student = await StudentService.getOne({ id });

    expect(student).toEqual(expect.objectContaining(data));
  });

  it('Should return null when retrieve one inexistent student', async () => {
    const student = await StudentService.getOne({ id: 123456789 });

    expect(student).toEqual(false);
  });

  it('Should update a student', async () => {
    const data = createStudentData();
    const updateData = { name: 'New Name', email: 'new@email.com'  };

    const { id } = await StudentService.create({ data });

    const updatedStudent = await StudentService.update({ id, data: updateData });

    const student = await StudentService.getOne({ id });

    expect(updatedStudent).toEqual(true);
    expect(student).toEqual(expect.objectContaining(updateData));
  });

  it('Should return an error when update a inexistent student', async () => {
    const id = 123456789;
    const data = { name: 'New Name', email: 'new@email.com' };

    const updatedStudent = await StudentService.update({ id, data });

    expect(updatedStudent).toEqual(false);
  });

  it('Should return error when update student`s academicRegister', async () => {
    const data = createStudentData();
    const updateData = { academicRegister: '123456' };

    const { id } = await StudentService.create({ data });

    const updateStudent = StudentService.update({ id, data: updateData });

    await expect(updateStudent).rejects
      .toThrowError(new BusinessLogicError("Field 'academicRegister' cannot be modified"));
  });

  it('Should return error when update student`s document', async () => {
    const data = createStudentData();
    const updateData = { document: '01928711022' };

    const { id } = await StudentService.create({ data });

    const updateStudent = StudentService.update({ id, data: updateData });

    await expect(updateStudent).rejects
      .toThrowError(new BusinessLogicError("Field 'document' cannot be modified"));
  });

  it('Should delete one student', async () => {
    const data = createStudentData();
    const { id } = await StudentService.create({ data });

    const deletedStudent = await StudentService.remove({ id })

    expect(deletedStudent).toEqual(true);
  });

  it('Should delete one student', async () => {
    const id = 987654321;

    const deletedStudent = await StudentService.remove({ id })

    expect(deletedStudent).toEqual(false);
  });
});

