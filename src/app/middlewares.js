const router = require('express').Router();
const express = require('express');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');

router.use([express.json(), cookieParser(), morgan('dev')]);

module.exports = router;
