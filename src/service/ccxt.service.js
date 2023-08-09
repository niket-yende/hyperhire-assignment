/* eslint-disable import/no-unresolved */
const ccxt = require('ccxt');
const logger = require('../lib/logger');

/**
 * Method to get tradable coins for an exchange
 * @param {string} chainId
 * @returns {Promise<String[]>}
 */
const getTradableCoins = async (chainId) => {
  logger.debug('ccxt.service: invoked service method getTradableCoins');
  const exchange = new ccxt[chainId]();
  const markets = await exchange.loadMarkets();
  const tradableCoins = Object.keys(markets);
  return tradableCoins;
};

/**
 * Method to get average coin prices
 * @param {string} chainId
 * @returns {Promise<{coinSymbol: number}>}
 */
const getAvgCoinPrices = async (chainId) => {
  logger.debug('ccxt.service: invoked service method getAvgCoinPrices');
  const exchange = new ccxt[chainId]();
  const markets = await exchange.loadMarkets();

  const coinSymbols = Object.keys(markets);

  const fetchTradesPromises = coinSymbols.map(async (coinSymbol) => {
    try {
      const trades = await exchange.fetchTrades(coinSymbol, undefined, 100);
      return { coinSymbol, trades };
    } catch (error) {
      console.error(`Error fetching trades for ${coinSymbol}:`, error);
      return null;
    }
  });

  const coinTrades = await Promise.all(fetchTradesPromises);

  const averagePricesPromises = coinTrades
    .filter((coinTrade) => coinTrade !== null)
    .map(async ({ coinSymbol, trades }) => {
      const prices = trades.map((trade) => parseFloat(trade.price));
      const averagePrice = prices.reduce((sum, price) => sum + price, 0) / prices.length;
      return { coinSymbol, averagePrice };
    });

  const averagePricesArray = await Promise.all(averagePricesPromises);

  const averagePrices = {};
  averagePricesArray.forEach(({ coinSymbol, averagePrice }) => {
    averagePrices[coinSymbol] = averagePrice;
  });

  return averagePrices;
};

module.exports = {
  getTradableCoins,
  getAvgCoinPrices,
};
