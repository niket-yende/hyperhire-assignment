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

// const getUsers = catchAsync(async (req, res) => {
//   const filter = pick(req.query, ['name', 'role']);
//   const options = pick(req.query, ['sortBy', 'limit', 'page']);
//   const result = await userService.queryUsers(filter, options);
//   res.send(result);
// });

const validateAddress = catchAsync(async (req, res) => {
  const isValidAddress = await defaultService.validateAddress(req.params.address);
  res.send(isValidAddress);
});

module.exports = {
  createWallet,
  validateAddress,
};
