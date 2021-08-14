const express = require('express');
const { getProfile } = require('./profile');

const profileRoutes = express.Router();

profileRoutes.get('/profile', function (req, res, next) {
  const { username } = req.headers;

  getProfile(username)
    .then((user) => res.status(200).json(user))
    .catch(next);
});

exports.profileRoutes = profileRoutes;
