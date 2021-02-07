const { sequelize } = require('../../src/app/models');
const StudentService = require('../../src/app/services/StudentService');
const { ConflictError } = require('../../src/errors');

function getRandomInt(min = 111111111, max = 999999999 ) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const dataMock = (newOpts) => {
  return {
    name: 'Paula Souza',
    email: 'paula.souza@teste.com',
    academicRegister: `${getRandomInt()}`,
    document: '49116966058',
    ...newOpts
  };
};

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
    const createdStudent = await StudentService.create({ data })

    expect(createdStudent?.id).toBeDefined();
  });

  it('Should return an error on duplicated academicRegister entry', async () => {
    const data1 = dataMock({ academicRegister: 123456 });
    const data2 = dataMock({ academicRegister: 123456 });

    const createdStudent1 = await StudentService.create({ data: data1 })

    const createStudent2 = StudentService.create({ data: data2 })

    await expect(createStudent2).rejects
      .toThrowError(new ConflictError('Duplicate entry `registrationCode`'))
  });

  it('Should retrieve all created students', async () => {
    const data1 = dataMock({ academicRegister: '123456' });
    const data2 = dataMock({ academicRegister: '654321' });

    const createdStudent1 = await StudentService.create({ data: data1 })
    const createdStudent2 = await StudentService.create({ data: data2 })

    const studentsList = await StudentService.getAll()

    expect(studentsList).toEqual(
      expect.arrayContaining([
        expect.objectContaining(data1),
        expect.objectContaining(data2)
      ])
    );
  });

  it('Should retrieve an empty array of students', async () => {
    const studentsList = await StudentService.getAll()

    expect(studentsList).toEqual([])
  });

  it('Should retrieve one student', async () => {
    const data = dataMock();

    const { id } = await StudentService.create({ data })

    const student = await StudentService.getOne({ id })

    expect(student).toEqual(expect.objectContaining(data));
  });

  it('Should return null when retrieve one inexistent student', async () => {
    const student = await StudentService.getOne({ id: 123456789 })

    expect(student).toEqual(null);
  });

});

