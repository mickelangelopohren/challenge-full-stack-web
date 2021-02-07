const { Student } = require('../models');

class StudentService {
  async create({ data }) {

    return Student.create(data);
  }
}

module.exports = new StudentService();

