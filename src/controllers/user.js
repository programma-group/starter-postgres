const User = require('../models/user');

async function postUser(req, res) {
  const user = await User.query().insert(req.body);
  return res.json({
    ok: true,
    user,
  });
}

async function getUsers(req, res) {
  const {
    username,
    email,
    firstName: firstNameQuery,
    lastName: lastNameQuery,
  } = req.query;
  const firstName = firstNameQuery ? `%${firstNameQuery}%` : undefined;
  const lastName = lastNameQuery ? `%${lastNameQuery}%` : undefined;
  const users = await User.query()
    .skipUndefined()
    .where('username', 'ilike', username)
    .where('email', email)
    .where('firstName', 'ilike', firstName)
    .where('lastName', 'ilike', lastName);
  return res.json({
    ok: true,
    users,
  });
}

module.exports = {
  getUsers,
  postUser,
};
