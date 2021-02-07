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
     return Student.findAll();
  }

  async getOne({ id }) {
    return Student.findOne({ where: { id } });
  }
}

module.exports = new StudentService();

