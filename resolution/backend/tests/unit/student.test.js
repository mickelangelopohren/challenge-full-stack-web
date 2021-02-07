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
});

