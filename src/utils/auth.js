const jsonwebtoken = require('jsonwebtoken');

const signToken = id => new Promise((resolve, reject) => {
  jsonwebtoken.sign({ id }, process.env.SECRET, { expiresIn: '7d' }, (err, encodedString) => {
    if (err) {
      return reject(err);
    }
    return resolve(encodedString);
  });
});


module.exports = {
  signToken,
};
