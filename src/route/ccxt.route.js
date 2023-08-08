const express = require('express');

const router = express.Router();

const ccxtController = require('../controller/ccxt.controller');

router.get('/tradable', ccxtController.getTradableCoins);
router.get('/average-price', ccxtController.getAvgCoinPrices);

module.exports = router;
