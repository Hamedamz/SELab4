const express = require('express');

const {
  getProfile,
  updateProfile,
  getAllUsers,
} = require('./profile');

const profileRoutes = express.Router();

profileRoutes.get('/', function (req, res, next) {
  const role = req.headers['user-role'];

  getAllUsers(role)
    .then((users) => res.status(200).json(users))
    .catch(next);
});

profileRoutes.get('/:userId', function (req, res, next) {
  const { userId } = req.params;

  getProfile(userId)
    .then((user) => res.status(200).json(user))
    .catch(next);
});

profileRoutes.put('/:userId', function (req, res, next) {
  const { userId } = req.params;
  const newUser = req.body;

  updateProfile(userId, newUser)
    .then((user) => res.status(200).json(user))
    .catch(next);
});

exports.profileRoutes = profileRoutes;
