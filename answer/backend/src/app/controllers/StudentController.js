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
      console.log(error);
      return res.status(500).send();
    }
  }

  async getAll(req, res) {
    try {
      const students = await StudentService.getAll();

      return res.status(200).send(students);
    } catch (error) {
      console.log(error);
      return res.status(500).send();
    }
  }

  async getOne(req, res) {
    try {
      const { params: { studentId: id } } = req;

      const student = await StudentService.getOne({ id });

      if (!student) {
        return res.status(404).send({ message: 'Student not found' });
      }

      return res.status(200).send(student);
    } catch (error) {
      console.log(error);
      return res.status(500).send();
    }
  }

  async update(req, res) {
    try {
      const { params: { studentId: id }, body: data } = req;

      const updated =  await StudentService.update({ id, data });

      if (!updated) {
        return res.status(404).send({ message: 'Student not found' });
      }

      return res.status(204).send();
    } catch(error) {
      if(error instanceof BusinessLogicError){
        return res.status(422).send([{ message: error.message }]);
      }
      console.log(error);
      return res.status(500).send();
    }
  }

  async remove(req, res) {
    try {
      const { params: { studentId: id } } = req;

      const deleted = await StudentService.remove({ id });

      if (!deleted) {
        return res.status(404).send({ message: 'Student not found' });
      }

      return res.status(204).send();
    } catch (error) {
      console.log(error);
      return res.status(500).send();
    }
  }
}

module.exports = new StudentController();

