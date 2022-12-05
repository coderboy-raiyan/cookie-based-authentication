const app = require('express')();
const express = require('express');
const path = require('path');
const connectDb = require('../config/db');
const routes = require('./routes');
const middlewares = require('./middlewares');
const { notFoundErrorHandler, globalErrorHandler } = require('./error');

connectDb();

// middlewares
app.use(middlewares);

// Static file folder serve
app.use('/assets', express.static(path.join(__dirname, '..', 'assets')));

// Routes
app.use('/api', routes);

// Error Handlers
app.use([notFoundErrorHandler, globalErrorHandler]);

module.exports = app;
