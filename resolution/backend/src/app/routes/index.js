const router = require('express').Router();

router.use('/students', require('./StudentRoutes'));

router.get('/status', (req, res) => {
  res.status(200).send({ status: 'UP' });
});

router.all('*', (req, res) => {
  res.status(404).send({ error: { message: 'Not found.' } });
});

module.exports = router;

