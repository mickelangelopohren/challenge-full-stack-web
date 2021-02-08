const { Joi } = require('express-validation')

const paramsValidation = {
  params: Joi.object({
    studentId: Joi.string().required(),
  }),
};

const common = {
  name: Joi.string().required(),
  email: Joi.string().email().required(),
};

const body = Joi.object({
  ...common,
  registrationCode: Joi.string().required(),
  document: Joi.string().length(11).required(),
});

const createValidation = { body };

const updateValidation = {
  ...paramsValidation,
  body: Joi.object(common),
};

module.exports = {
  createValidation,
  updateValidation,
}

