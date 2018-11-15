// eslint-disable-next-line consistent-return
const wrapperAsync = fn => async (req, res, next) => {
  try {
    await fn(req, res, next);
  } catch (err) {
    return res.status(500).send({
      ok: false,
      message: 'There was an internal error',
      errors: [err.message],
    });
  }
};

module.exports = {
  wrapperAsync,
};
