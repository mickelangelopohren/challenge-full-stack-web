const { Student } = require('../models');
const { ConflictError } = require('../../errors');

class StudentService {
  async create({ data }) {
    const alreadyUsedRegistrationCode = await Student.findOne({
      where: { academicRegister: data.academicRegister }
    });

    if (alreadyUsedRegistrationCode) {
      throw new ConflictError('Duplicate entry `registrationCode`');
    }

    return Student.create(data);
  }

  async getAll() {
    return [
      {
        name: 'Paula Souza',
        email: 'paula.souza@teste.com',
        academicRegister: 123456,
        document: '49116966058',
      },
      {
        name: 'Paula Souza',
        email: 'paula.souza@teste.com',
        academicRegister: 654321,
        document: '49116966058',
      }
    ]
  }
}

module.exports = new StudentService();

