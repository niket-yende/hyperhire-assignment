const express = require('express');

const router = express.Router();

const defaultController = require('../controller/default.controller');

router.get('/', (req, res) => {
  res.send({ message: 'Welcome to hyperhire assignment' });
});

router.get('/wallet/:address', defaultController.validateAddress);
router.post('/wallet', defaultController.createWallet);

module.exports = router;
