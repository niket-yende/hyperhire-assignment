const express = require('express');

const router = express.Router();

const defaultController = require('../controller/default.controller');

router.get('/', (req, res) => {
  res.send({ message: 'Hello world' });
});

router.get('/wallet/:address', defaultController.validateAddress);
// router
//   .route('/:address')
//   .get(defaultController.validateAddress);

module.exports = router;
