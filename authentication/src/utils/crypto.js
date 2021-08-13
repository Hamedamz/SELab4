const bcrypt = require('bcrypt');

exports.comparePassword = (password, hashPassword) => {
  return bcrypt.compareSync(password, hashPassword);
};

exports.getSaltHashPassword = (password) => {
  return bcrypt.hashSync(password, 10);
};
