const { sequelize } = require('../../src/app/models');
const StudentService = require('../../src/app/services/StudentService');

const dataMock = (newOpts) => {
  return {
    name: 'Paula Souza',
    email: 'paula.souza@teste.com',
    academicRegister: '5233812',
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
    const data1 = dataMock();
    const data2 = dataMock({
      name: 'Marina Miranda',
      email: 'marina.miranda@teste.com',
      document: '36508685040'
    });

    const createdStudent1 = await StudentService.create({ data: data1 })
    try {
    const createdStudent2 = await StudentService.create({ data: data2 })
    } catch(error) {
      expect(error).toBeInstanceOf(Error);
    }
  });
});

