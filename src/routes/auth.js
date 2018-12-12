const express = require('express');
const authController = require('../controllers/auth');
const { catchErrors } = require('../handlers/error');
const { bodyErrorsMiddleware } = require('../utils/common');

const router = express.Router();

router.post(
  '/register',
  authController.validateRegister,
  bodyErrorsMiddleware,
  catchErrors(authController.register),
  catchErrors(authController.login),
);

router.post(
  '/login',
  authController.validateLogin,
  bodyErrorsMiddleware,
  catchErrors(authController.prepareLogin),
  catchErrors(authController.login),
);

router.post(
  '/password/lost',
  authController.checkEmail,
  bodyErrorsMiddleware,
  catchErrors(authController.passwordLost),
);

router.post(
  '/password/reset',
  authController.validatePasswordReset,
  bodyErrorsMiddleware,
  catchErrors(authController.passwordReset),
);

module.exports = router;
