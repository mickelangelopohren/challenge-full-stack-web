const { sequelize } = require('../../src/app/models');
const StudentService = require('../../src/app/services/StudentService');
const { BusinessLogicError, ConflictError } = require('../../src/errors');

const getRandomInt = (min = 111111111, max = 999999999 ) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const dataMock = (newOpts) => ({
  name: 'Paula Souza',
  email: 'paula.souza@teste.com',
  academicRegister: `${getRandomInt()}`,
  document: '49116966058',
  ...newOpts
});

describe('Students service', () => {
  beforeAll(async () => {
    await sequelize.sync({ force: true });
  });

  beforeEach(async () => {
    await Promise.all(
      Object.values(sequelize.models).map(function(model) {
        return model.destroy({ truncate: true, force: true });
      })
    );
  });

  it('Should create new student', async () => {
    const data = dataMock();
    const createdStudent = await StudentService.create({ data });

    expect(createdStudent?.id).toBeDefined();
  });

  it('Should return an error on duplicated academicRegister entry', async () => {
    const data1 = dataMock({ academicRegister: 123456 });
    const data2 = dataMock({ academicRegister: 123456 });

    const createdStudent1 = await StudentService.create({ data: data1 });

    const createStudent2 = StudentService.create({ data: data2 });

    await expect(createStudent2).rejects
      .toThrowError(new ConflictError("Duplicate entry 'academicRegister'"));
  });

  it('Should retrieve all created students', async () => {
    const data1 = dataMock({ academicRegister: '123456' });
    const data2 = dataMock({ academicRegister: '654321' });

    const createdStudent1 = await StudentService.create({ data: data1 });
    const createdStudent2 = await StudentService.create({ data: data2 });

    const studentsList = await StudentService.getAll();

    expect(studentsList).toEqual(
      expect.arrayContaining([
        expect.objectContaining(data1),
        expect.objectContaining(data2)
      ])
    );
  });

  it('Should retrieve an empty array of students', async () => {
    const studentsList = await StudentService.getAll();

    expect(studentsList).toEqual([]);
  });

  it('Should retrieve one student', async () => {
    const data = dataMock();

    const { id } = await StudentService.create({ data });

    const student = await StudentService.getOne({ id });

    expect(student).toEqual(expect.objectContaining(data));
  });

  it('Should return null when retrieve one inexistent student', async () => {
    const student = await StudentService.getOne({ id: 123456789 });

    expect(student).toEqual(null);
  });

  it('Should update a student', async () => {
    const data = dataMock();
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
    const data = dataMock();
    const updateData = { academicRegister: '123456' };

    const { id } = await StudentService.create({ data });

    const updateStudent = StudentService.update({ id, data: updateData });

    await expect(updateStudent).rejects
      .toThrowError(new BusinessLogicError("Field 'academicRegister' cannot be modified"));
  });

  it('Should return error when update student`s document', async () => {
    const data = dataMock();
    const updateData = { document: '01928711022' };

    const { id } = await StudentService.create({ data });

    const updateStudent = StudentService.update({ id, data: updateData });

    await expect(updateStudent).rejects
      .toThrowError(new BusinessLogicError("Field 'document' cannot be modified"));
  });
});

