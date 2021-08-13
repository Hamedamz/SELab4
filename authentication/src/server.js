const express = require('express');
const bodyParser = require('body-parser');
const { authRoutes } = require('./routes');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.raw());

app.use(authRoutes);

module.exports = app;
