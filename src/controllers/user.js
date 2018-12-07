const { formatResponse } = require('../utils/common');

const getProfile = (req, res) => res.json(formatResponse(true, req.user.toJSON()));

module.exports = {
  getProfile,
};
