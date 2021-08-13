const express = require('express');
const {registerUser} = require('./auth');

const authRoutes = express.Router();

authRoutes.post('/signup', async function (req, res, next) {
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

exports.authRoutes = authRoutes;
