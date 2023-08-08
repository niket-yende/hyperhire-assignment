const catchAsync = require('../middleware/catchAsync');
const ccxtService = require('../service/ccxt.service');

const getTradableCoins = catchAsync(async (req, res) => {
  const { chainId } = req.query;
  console.log('chainId ', chainId);
  const chain = chainId || 'binance';
  console.log('Default chain ', chain);
  const result = await ccxtService.getTradableCoins(chain);
  res.send(result);
});

const getAvgCoinPrices = catchAsync(async (req, res) => {
  const { chainId } = req.query;
  console.log('chainId ', chainId);
  const chain = chainId || 'binance';
  console.log('Default chain ', chain);
  const coinPrices = await ccxtService.getAvgCoinPrices(chain);
  res.send(coinPrices);
});

module.exports = {
  getTradableCoins,
  getAvgCoinPrices,
};
