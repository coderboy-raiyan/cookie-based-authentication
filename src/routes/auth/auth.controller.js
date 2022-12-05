const jwt = require('jsonwebtoken');
const { generateAccessToken, generateRefreshToken } = require('../../lib/jwt');
const createAsyncError = require('../../middlewares/createAsyncError');
const User = require('../../models/User.model');

// @desc Register
// @route POST api/auth/register
// @access Register a user

const register = createAsyncError(async (req, res) => {
    const { name, email, password, profile } = req.body;

    if (!name || !email || !password || !profile) {
        return res.status(400).json({ message: 'All the fields are required' });
    }

    const isEmailExitsOrNot = await User.findOne({ email });

    if (isEmailExitsOrNot) {
        return res.status(500).json({ message: 'User already exists' });
    }

    const newUser = new User(req.body);

    await newUser.save();

    return res.status(200).json({ message: 'Registration successful go to Login' });
});

// @desc Login
// @route POST api/auth/login
// @access For log in a user

const login = createAsyncError(async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ message: 'All the fields are required' });
    }
    const isEmailExitsOrNot = await User.findOne({ email });

    if (!isEmailExitsOrNot) {
        return res.status(500).json({ message: 'User not exists' });
    }

    const createdAccessToken = generateAccessToken(isEmailExitsOrNot._id);
    const createdRefreshToken = generateRefreshToken(isEmailExitsOrNot._id);

    res.cookie('token', createdRefreshToken, {
        httpOnly: true,
        path: '/',
        maxAge: 7 * 24 * 60 * 60 * 1000, // for 7 days
        secure: true,
        sameSite: 'None',
    });

    return res.status(200).json({ message: 'Logged in Successfully', token: createdAccessToken });
});

// @desc Refresh
// @route Get api/auth/refresh
// @access to create new access token after expires

const refresh = createAsyncError(async (req, res) => {
    const { cookies } = req;
    if (!cookies?.token) {
        return res.status(401).json({ message: 'UnAuthorized' });
    }
    const verifyJwt = await jwt.verify(cookies.token, process.env.REFRESH_TOKEN_SECRET);

    if (!verifyJwt) {
        return res.status(403).json({ message: 'Forbidden' });
    }

    const findUser = await User.findOne({ _id: verifyJwt._id });

    if (!findUser) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    const newAccessToken = generateAccessToken(verifyJwt._id);

    res.json({ token: newAccessToken });
});

module.exports = { register, login, refresh };
