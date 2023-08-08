// const httpStatus = require('http-status');
const ethers = require('ethers');
// const { User } = require('../models');
// const ApiError = require('../middleware/ApiError');

/**
 * Create a wallet
 * @param {Object} userBody
 * @returns {Promise<User>}
 */
// const createWallet = async (userBody) => {
//   if (await User.isEmailTaken(userBody.email)) {
//     throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
//   }
//   return User.create(userBody);
// };

const validateAddress = async (address) => {
  console.log(`Validating address: ${address}`);
  const isValidAddress = ethers.isAddress(address);
  console.log(`isValidAddress: ${isValidAddress}`);
  return isValidAddress;
};

module.exports = {
//   createWallet,
  validateAddress,
};
