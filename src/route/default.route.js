const express = require('express');

const router = express.Router();

const defaultController = require('../controller/default.controller');

router.get('/', (req, res) => {
  res.send({ message: 'Welcome to hyperhire assignment' });
});

router.get('/wallets/:address', defaultController.validateAddress);
router.post('/wallets', defaultController.createWallet);
router.get('/transactions', defaultController.getLatestTransactions);

module.exports = router;
