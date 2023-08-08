const httpStatus = require('http-status');
const ApiError = require('../middleware/ApiError');
const catchAsync = require('../middleware/catchAsync');
const defaultService = require('../service/default.service');

const createWallet = catchAsync(async (req, res) => {
  const wallet = await defaultService.createWallet();
  if (!wallet) {
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'Error creating wallet');
  }
  res.status(httpStatus.CREATED).send(wallet);
});

const getLatestTransactions = catchAsync(async (req, res) => {
  const { count } = req.query;
  console.log('count ', count);
  const connectUrl = req.headers['connect-url'];
  console.log('connectUrl ', connectUrl);
  const apiKey = req.headers['api-key'];
  console.log('apiKey ', apiKey);
  if (!count) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Please provide the value for count');
  }
  if (!connectUrl) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Please provide the value for connection-url');
  }
  if (!apiKey) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Please provide the value for api-key');
  }
  const result = await defaultService.getLatestTransactions(connectUrl, apiKey, +count);
  res.send(result);
});

const validateAddress = catchAsync(async (req, res) => {
  const isValidAddress = await defaultService.validateAddress(req.params.address);
  res.send(isValidAddress);
});

module.exports = {
  createWallet,
  validateAddress,
  getLatestTransactions,
};
