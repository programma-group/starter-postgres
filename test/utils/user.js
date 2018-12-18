const User = require('../../src/models/user');
const { signToken } = require('../../src/utils/auth');

const getCorrectUserData = () => ({
  username: 'inserted_user',
  password: '123456',
  passwordConfirm: '123456',
  email: 'inserted_user@admin.com',
  firstName: 'Inserted',
  lastName: 'User',
});

const getOmittedData = (field) => {
  const correctData = getCorrectUserData();
  delete correctData[field];
  return correctData;
};

const getSignedToken = async (username) => {
  const u = await User.query().where('username', username).first();
  const token = await signToken(u.id);
  return `Bearer ${token}`;
};

module.exports = {
  getCorrectUserData,
  getOmittedData,
  getSignedToken,
};
