const { Student } = require('../models');

class StudentService {
  async create({ data }) {

    return { id: 1 };
  }
}

module.exports = new StudentService();

