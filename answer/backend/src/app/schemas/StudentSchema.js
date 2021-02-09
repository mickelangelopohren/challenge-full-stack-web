const { Joi } = require('express-validation');

const paramsValidation = {
  params: Joi.object({
    studentId: Joi.string().required(),
  }),
};

const createValidation = {
  body: Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    academicRegister: Joi.string().required(),
    document: Joi.string().length(11).required(),
  })};

const updateValidation = {
  ...paramsValidation,
  body: Joi.object({
    name: Joi.string(),
    email: Joi.string().email(),
  }).min(1),
};

module.exports = {
  createValidation,
  updateValidation,
};
