const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const passwordSalt = process.env.JWT_SALT || 'jwt_secret';

exports.comparePassword = (password, hashPassword) => {
  return bcrypt.compareSync(password, hashPassword);
};

exports.getSaltHashPassword = (password) => {
  return bcrypt.hashSync(password, 10);
};

exports.getJWTToken = (payload) => {
  return jwt.sign(payload, passwordSalt, { expiresIn: '1d' });
};

exports.passwordSalt = passwordSalt;
