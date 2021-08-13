const bcrypt = require('bcrypt');

exports.comparePassword = (password, hashPassword) => {
  return bcrypt.compareSync(password, hashPassword);
};
