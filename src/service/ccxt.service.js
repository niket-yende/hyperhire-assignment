/* eslint-disable import/no-unresolved */
const ccxt = require('ccxt');

const getTradableCoins = async (chainId) => {
  const exchange = new ccxt[chainId]();
  const markets = await exchange.loadMarkets();
  const tradableCoins = Object.keys(markets);
  return tradableCoins;
};

const getAvgCoinPrices = async (chainId) => {
  console.log('chainId ', chainId);
  return 'response';
};

module.exports = {
  getTradableCoins,
  getAvgCoinPrices,
};
