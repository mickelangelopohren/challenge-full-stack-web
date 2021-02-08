const express = require('express');
const cors = require('cors');
const { ValidationError } = require('express-validation');

const app = express();

app.use(cors());
app.use(express.json());

app.use(require('./routes'));

// eslint-disable-next-line
app.use((err, req, res, next) => {
  if (err instanceof ValidationError) {
    return res.status(err.statusCode).send(err);
  }

  return res.status(500).send(err);
});

module.exports = app;
