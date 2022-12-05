const authRouter = require('express').Router();
const { register, login, refresh, logout } = require('./auth.controller');

authRouter.post('/register', register);
authRouter.post('/login', login);
authRouter.post('/logout', logout);
authRouter.get('/refresh', refresh);

module.exports = authRouter;
