const { formatResponse } = require('../utils/common');

const getProfile = (req, res) => {
  const jsonUser = req.user.toJSON();
  return res.json(formatResponse(true, jsonUser));
};

module.exports = {
  getProfile,
};
