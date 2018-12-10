const { check } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');
const { formatResponse } = require('../utils/common');
const { signToken } = require('../utils/auth');

const checkEmail = check('email', 'That Email is not valid!')
  .isEmail().normalizeEmail({
    gmail_remove_dots: false,
    remove_extension: false,
    gmail_remove_subaddress: false,
  });

const checkPassword = check('password', 'Password cannot be blank!').not().isEmpty();

const customPasswordValidator = (value, { req }) => {
  if (value !== req.body.password) {
    throw new Error('Passwords don\'t match');
  }
  return true;
};

const validateRegister = [
  checkEmail,
  check('username', 'Username cannot be empty').not().isEmpty(),
  check('firstName', 'First name cannot be blank!').not().isEmpty(),
  sanitizeBody('firstName'),
  check('lastName', 'Last name cannot be blank!').not().isEmpty(),
  sanitizeBody('lastName'),
  checkPassword,
  check('passwordConfirm', 'Confirmed password cannot be blank!').not().isEmpty(),
  check('passwordConfirm').custom(customPasswordValidator),
];

const getUserModel = req => req.app.get('models.user');

const register = async (req, res, next) => {
  const User = getUserModel(req);
  const {
    email,
    firstName,
    lastName,
    password,
    username,
  } = req.body;
  res.locals.loggedUser = await User.query().insert({
    email,
    firstName,
    password,
    lastName,
    username,
  });
  return next();
};

const validateLogin = [
  checkEmail,
  checkPassword,
];

const prepareLogin = async (req, res, next) => {
  const User = getUserModel(req);
  const { email, password } = req.body;
  const myUser = await User.query().first().where({ email });
  if (!myUser) {
    return res.status(404).send({
      ok: false,
      type: 'WrongLogin',
      message: 'User not found',
    });
  }
  const isValid = await myUser.verifyPassword(password);
  if (!isValid) {
    return res.status(401).send({
      ok: false,
      type: 'WrongLogin',
      message: 'The password you entered is not valid',
    });
  }
  res.locals.loggedUser = myUser;
  return next();
};

const login = async (req, res) => {
  const { loggedUser } = res.locals;
  const token = await signToken(loggedUser.id);
  return res.json(formatResponse(true, { token }));
};

const passwordLost = async (req, res) => {
  const { email } = req.body;
  const UserModel = req.app.get('models.user');
  const mail = req.app.get('mail');
  const user = await UserModel.query().findOne({ email });
  await user.generateResetToken();
  await mail.send({
    email,
    subject: 'Password Reset',
    name: user.name,
    token: user.resetPasswordToken,
    filename: 'passwordReset',
  });
  return res.json('success');
};

module.exports = {
  validateRegister,
  register,
  validateLogin,
  prepareLogin,
  login,
  passwordLost,
};
