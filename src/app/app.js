const app = require('express')();
const express = require('express');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const path = require('path');
const routes = require('../routes');
const connectDb = require('../config/db');

app.use(express.json());
app.use(cookieParser());
app.use(morgan('dev'));

connectDb();

// Static file folder serve
app.use('/assets', express.static(path.join(__dirname, '..', 'assets')));

// Routes
app.use('/api', routes);

// Error Handlers
app.use((error, req, res, _next) => {
    if (!error.statusCode) {
        error.statusCode = 500;
    }
    const { message } = error;
    res.status(error.statusCode).json({ message });
});

module.exports = app;
