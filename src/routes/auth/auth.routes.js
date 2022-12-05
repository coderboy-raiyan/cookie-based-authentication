const authRouter = require('express').Router();
const { register, login, refresh } = require('./auth.controller');

authRouter.post('/register', register);
authRouter.post('/login', login);
authRouter.post('/logout');
authRouter.get('/refresh', refresh);

module.exports = authRouter;
