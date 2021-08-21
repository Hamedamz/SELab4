const express = require('express');
const bodyParser = require('body-parser');
const { tweetRoutes } = require('./routes');
const { globalErrorHandler } = require('./middlewares/errorHandler');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.raw());

app.use(tweetRoutes);
app.use(globalErrorHandler);

module.exports = app;
