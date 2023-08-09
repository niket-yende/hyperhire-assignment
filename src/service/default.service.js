/* eslint-disable no-await-in-loop */
/* eslint-disable no-plusplus */
const ethers = require('ethers');
const logger = require('../lib/logger');

/**
 * Create a wallet
 * @param {string} privateKey
 * @returns {Promise<{ address: string, mnemonic: string, privateKey: string }>}
 */
const createWallet = async () => {
  logger.debug('default.service: invoked service method createWallet');
  // Creates a random wallet
  const wallet = ethers.Wallet.createRandom();

  const response = {
    address: wallet.address,
    mnemonic: wallet.mnemonic.phrase,
    privateKey: wallet.privateKey,
  };

  return response;
};

/**
 * Metjpd to validate wallet address
 * @param {string} address
 * @returns {Promise<{ valid: boolean }>}
 */
const validateAddress = async (address) => {
  logger.debug('default.service: invoked service method validateAddress');
  logger.debug(`Validating address: ${address}`);
  const isValidAddress = ethers.isAddress(address);
  logger.debug(`isValidAddress: ${isValidAddress}`);

  const response = {
    valid: isValidAddress,
  };

  return response;
};

/**
 * Method to get latest sorted transactions by amount of transferred ether
 * @param {String} connectUrl
 * @param {String} apiKey
 * @param {number} txCount
 * @returns {Promise<Array<{
 *   txHash: string,
 *   sender: string,
 *   receiver: string,
 *   amount: string,
 *   blockNumber: number
 * }>} An array of processed and sorted transaction details.
 */
const getLatestTransactions = async (connectUrl, apiKey, txCount) => {
  logger.debug('default.service: invoked service method getLatestTransactions');
  const provider = new ethers.JsonRpcProvider(`${connectUrl}/${apiKey}`);
  // Get the latest block number
  const latestBlockNumber = await provider.getBlockNumber();
  logger.debug(`latestBlockNumber: ${latestBlockNumber}`);

  // Calculate the range of block numbers to fetch
  const startBlock = Math.max(latestBlockNumber - 50, 0) + 1;
  const endBlock = latestBlockNumber;

  // Fetch the latest 1000 transactions in parallel
  const transactions = [];
  for (let i = startBlock; i <= endBlock; i++) {
    const block = await provider.getBlock(i);
    logger.debug(block.transactions.length);
    transactions.push(...block.transactions);
    if (transactions.length > txCount) {
      break;
    }
  }
  const filteredTransactions = transactions.slice(txCount * -1);

  // Process and sort the transactions
  const processedTransactions = await Promise.all(filteredTransactions.map(async (transaction) => {
    const tx = await provider.getTransaction(transaction);
    const sender = tx.from;
    const receiver = tx.to || '(Contract Creation)';
    const amount = tx.value ? ethers.formatEther(tx.value) : '0';
    const { blockNumber } = tx;
    return {
      txHash: tx.hash, sender, receiver, amount, blockNumber,
    };
  }));

  // Sort transactions by amount of ether transferred
  // eslint-disable-next-line max-len
  const sortedTransactions = processedTransactions.sort((a, b) => parseFloat(b.amount) - parseFloat(a.amount));

  return sortedTransactions;
};

module.exports = {
  createWallet,
  validateAddress,
  getLatestTransactions,
};
