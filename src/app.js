const express = require('express');
const createError = require('http-errors');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const helmet = require('helmet');
const httpStatus = require('http-status');
const { serve, setup } = require('swagger-ui-express');

const defaultRouter = require('./route/default.route');
const ccxtRouter = require('./route/ccxt.route');

const { errorConverter, errorHandler } = require('./middleware/error');
const ApiError = require('./middleware/ApiError');
const swaggerDocument = require('./docs/swagger.json');

const app = express();
const URL_PREFIX = '/api/1.0';

app.use(helmet());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(`${URL_PREFIX}/`, defaultRouter);
app.use(`${URL_PREFIX}/ccxt`, ccxtRouter);
app.use('/api-docs', serve, setup(swaggerDocument));

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError.NotFound());
});

// pass any unhandled errors to the error handler
app.use(errorHandler);

// send back a 404 error for any unknown api request
app.use((req, res, next) => {
  next(new ApiError(httpStatus.NOT_FOUND, 'Not found'));
});

// convert error to ApiError, if needed
app.use(errorConverter);

// handle error
app.use(errorHandler);

module.exports = app;
