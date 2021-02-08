const { Student } = require('../models');
const { BusinessLogicError, ConflictError } = require('../../errors');

class StudentService {
  async create({ data }) {
    const alreadyUsedRegistrationCode = await Student.findOne({
      where: { academicRegister: data.academicRegister },
    });

    if (alreadyUsedRegistrationCode) {
      throw new ConflictError("Duplicate entry 'academicRegister'");
    }

    return Student.create(data);
  }

  async getAll() {
    return Student.findAll();
  }

  async getOne({ id }) {
    const student = await Student.findOne({ where: { id } });

    return student || false;
  }

  async update({ id, data }) {
    const validations = {
      document: () => { throw new BusinessLogicError("Field 'document' cannot be modified"); },
      academicRegister: () => { throw new BusinessLogicError("Field 'academicRegister' cannot be modified"); },
    };

    Object.keys(validations).forEach((property) => {
      if (data[property]) {
        return validations[property]();
      }
      return false;
    });

    const update = await Student.findOne({ where: { id } })
      .then(async (student) => {
        if (student) {
          return student.update(data);
        }
        return false;
      });

    return !!update;
  }

  async remove({ id }) {
    const deleted = await Student.destroy({ where: { id } });

    return !!deleted;
  }
}

module.exports = new StudentService();
