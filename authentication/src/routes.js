const express = require('express');
const { registerUser, getTokenFromUsernameAndPassword} = require('./auth');

const authRoutes = express.Router();

authRoutes.post('/signup', function (req, res, next) {
  const {
    username,
    password,
    mobile,
    email,
  } = req.body;

  registerUser(username, password, mobile, email)
    .then((user) => res.status(201).json(user))
    .catch(next);
});

authRoutes.post('/login', function (req, res, next) {
  const { username, password } = req.body;

  getTokenFromUsernameAndPassword(username, password)
    .then((data) => res.status(200).json(data))
    .catch(next);
});

exports.authRoutes = authRoutes;
