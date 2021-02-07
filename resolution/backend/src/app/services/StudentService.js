const { Student } = require('../models');
const { BusinessLogicError, ConflictError } = require('../../errors');

class StudentService {
  async create({ data }) {
    const alreadyUsedRegistrationCode = await Student.findOne({
      where: { academicRegister: data.academicRegister }
    });

    if (alreadyUsedRegistrationCode) {
      throw new ConflictError('Duplicate entry `academicRegister`');
    }

    return Student.create(data);
  }

  async getAll() {
     return Student.findAll();
  }

  async getOne({ id }) {
    return Student.findOne({ where: { id } });
  }

  async update({ id, data }) {
    const update = await Student.findOne({ where: { id } })
      .then(async (student) => {
        if(student) {
          return student.update(data)
        }
      });

    return !!update;
  }
}

module.exports = new StudentService();

