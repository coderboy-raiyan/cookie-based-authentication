const authRouter = require('express').Router();
const { register, login } = require('./auth.controller');

authRouter.post('/register', register);
authRouter.post('/login', login);
authRouter.post('/logout');
authRouter.get('/refresh');

module.exports = authRouter;
