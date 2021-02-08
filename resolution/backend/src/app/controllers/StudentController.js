const StudentService = require('../services/StudentService');

class StudentController {
  async create(req, res) {
    return res.status(201).send({ id: 123 });
  }

  async getAll(req, res) {
  }

  async getOne(req, res) {
  }

  async update(req, res) {
  }

  async remove(req, res) {
  }
}

module.exports = new StudentController();

