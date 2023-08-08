const httpStatus = require('http-status');
const ApiError = require('../middleware/ApiError');
const catchAsync = require('../middleware/catchAsync');
const ccxtService = require('../service/ccxt.service');

const getTradableCoins = catchAsync(async (req, res) => {
  const { chainId } = req.query;
  console.log('chainId ', chainId);
  const chain = chainId || 'binance';
  const result = await ccxtService.getTradableCoins(chain);
  res.send(result);
});

const getAvgCoinPrices = catchAsync(async (req, res) => {
  const coinPrices = await ccxtService.getAvgCoinPrices(req.params.address);
  res.send(coinPrices);
});

module.exports = {
  getTradableCoins,
  getAvgCoinPrices,
};
