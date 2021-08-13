const { passwordSalt } = require('../utils/crypto');

const jwt = require('jsonwebtoken');

exports.authHandler = (req, res, next) => {
  const authHeader = req.headers && req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];

  jwt.verify(token, passwordSalt, (err, user) => {
    if (err) {
      return res.sendStatus(401);
    }
    req.user = user;
    next();
  });
};
