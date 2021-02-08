const StudentService = require('../services/StudentService');
const { ConflictError, BusinessLogicError } = require('../../errors');

class StudentController {
  async create(req, res) {
    try {
      const { body: data } = req;

      const { id } = await StudentService.create({ data });

      return res.status(201).send({ id });
    } catch(error) {
      if(error instanceof ConflictError){
        return res.status(409).send({ message: error.message });
      }

      return res.status(500).send();
    }
  }

  async getAll(req, res) {
      return res.status(500).send();
  }

  async getOne(req, res) {
  }

  async update(req, res) {
  }

  async remove(req, res) {
  }
}

module.exports = new StudentController();

