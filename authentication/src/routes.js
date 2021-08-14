const express = require('express');
const { registerUser, getTokenFromUsernameAndPassword} = require('./auth');
const {authHandler} = require('./middlewares/authHandler');

const authRoutes = express.Router();

authRoutes.get('/check-token', authHandler, function (req, res) {
  res.setHeader('Username', req.user.username);
  res.setHeader('Role', req.user.role);
  res.sendStatus(200);
});

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
