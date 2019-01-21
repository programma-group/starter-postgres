const { ValidationError } = require('objection');
const serializeError = require('serialize-error');

const sendErrorMessage = (res, status, message, type, data) => (
  res.status(status).send({
    ok: false,
    message,
    type,
    data,
  })
);

const errorHandler = (err, res) => {
  if (err instanceof ValidationError && err.type === 'ModelValidation') {
    return sendErrorMessage(res, 400, err.message, 'ModelValidation', err.data);
  }
  const errorData = process.env.NODE_ENV === 'development' ? serializeError(err) : {};
  return sendErrorMessage(res, 500, err.message, err.constructor.name || 'UnknownError', errorData);
};

// eslint-disable-next-line consistent-return
const catchErrors = fn => async (req, res, next) => {
  try {
    await fn(req, res, next);
  } catch (err) {
    return errorHandler(err, res);
  }
};

module.exports = {
  catchErrors,
};
