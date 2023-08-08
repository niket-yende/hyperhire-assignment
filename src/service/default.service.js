// const httpStatus = require('http-status');
const ethers = require('ethers');
// const { User } = require('../models');
// const ApiError = require('../middleware/ApiError');

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

module.exports = {
  createWallet,
  validateAddress,
};
