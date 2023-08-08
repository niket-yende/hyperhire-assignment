/* eslint-disable no-await-in-loop */
/* eslint-disable no-plusplus */
const ethers = require('ethers');

/**
 * Create a wallet
 * @param {String} privateKey
 * @returns {Promise<Object>}
 */
const createWallet = async () => {
  // Creates a random wallet
  const wallet = ethers.Wallet.createRandom();

  const response = {
    address: wallet.address,
    mnemonic: wallet.mnemonic.phrase,
    privateKey: wallet.privateKey,
  };

  return response;
};

const validateAddress = async (address) => {
  console.log(`Validating address: ${address}`);
  const isValidAddress = ethers.isAddress(address);
  console.log(`isValidAddress: ${isValidAddress}`);

  const response = {
    valid: isValidAddress,
  };

  return response;
};

const getLatestTransactions = async (connectUrl, apiKey, txCount) => {
  const provider = new ethers.JsonRpcProvider(`${connectUrl}/${apiKey}`);
  // Get the latest block number
  const latestBlockNumber = await provider.getBlockNumber();
  console.log('latestBlockNumber ', latestBlockNumber);

  // Calculate the range of block numbers to fetch
  const startBlock = Math.max(latestBlockNumber - 10, 0) + 1;
  const endBlock = latestBlockNumber;

  // Fetch the latest 1000 transactions in parallel
  const transactions = [];
  for (let i = startBlock; i <= endBlock; i++) {
    const block = await provider.getBlock(i);
    console.log(block.transactions.length);
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
