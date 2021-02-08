const router = require('express').Router({ mergeParams: true });
const StudentController = require('../controllers/StudentController');

router.post(
  '/',
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
  StudentController.update,
);

router.delete(
  '/:studentId',
  StudentController.remove,
);

module.exports = router;

