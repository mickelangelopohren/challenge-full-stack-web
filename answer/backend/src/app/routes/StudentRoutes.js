const router = require('express').Router({ mergeParams: true });
const StudentController = require('../controllers/StudentController');
const { validate } = require('express-validation')
const validatorConfig = require('../config/schemaValidator');
const { createValidation, updateValidation } = require('../schemas/StudentSchema');

router.post(
  '/',
  validate(createValidation, ...validatorConfig),
  StudentController.create,
);

router.get(
  '/',
  StudentController.getAll,
);

router.get(
  '/:studentId',
  StudentController.getOne,
);

router.patch(
  '/:studentId',
  validate(updateValidation, ...validatorConfig),
  StudentController.update,
);

router.delete(
  '/:studentId',
  StudentController.remove,
);

module.exports = router;

