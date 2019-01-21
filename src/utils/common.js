const { validationResult } = require('express-validator/check');

/**
 * Util that formats a data response
 * @param {Boolean} ok Boolean that indicates whether the response is succesful or not
 * @param {Object} data Any data object that comes with the response
 */
const formatResponse = (ok, data) => ({ ok, data });

const bodyErrorsMiddleware = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      ok: false,
      errors: errors.array(),
      message: 'There are validation errors',
      type: 'BodyValidationError',
    });
  }
  return next();
};

module.exports = {
  formatResponse,
  bodyErrorsMiddleware,
};
