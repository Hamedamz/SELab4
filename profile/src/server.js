const express = require('express');
const bodyParser = require('body-parser');
const { profileRoutes } = require('./routes');
const { globalErrorHandler } = require('./middlewares/errorHandler');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.raw());

app.use(profileRoutes);
app.use(globalErrorHandler);

module.exports = app;
