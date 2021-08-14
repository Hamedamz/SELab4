const express = require('express');

const {
  getProfile,
  updateProfile,
  getAllUsers,
} = require('./profile');

const profileRoutes = express.Router();

profileRoutes.get('/profile', function (req, res, next) {
  const { role } = req.headers;

  getAllUsers(role)
    .then((users) => res.status(200).json(users))
    .catch(next);
});

profileRoutes.get('/profile/:userId', function (req, res, next) {
  const { userId } = req.params;

  getProfile(userId)
    .then((user) => res.status(200).json(user))
    .catch(next);
});

profileRoutes.put('/profile/:userId', function (req, res, next) {
  const { userId } = req.params;
  const newUser = req.body;

  updateProfile(userId, newUser)
    .then((user) => res.status(200).json(user))
    .catch(next);
});

exports.profileRoutes = profileRoutes;