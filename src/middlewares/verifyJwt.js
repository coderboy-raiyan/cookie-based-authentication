const jwt = require('jsonwebtoken');
const User = require('../models/User.model');

const verifyJwt = async (req, res, next) => {
    const authHeader = req.headers.authorization || req.headers.Authorization;

    if (!authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    const token = authHeader.split(' ')[1];

    const verifyToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    if (!verifyToken) {
        return res.status(403).json({ message: 'Forbidden' });
    }

    const findUser = await User.findOne({ _id: verifyToken._id });

    req.user = findUser._doc;
    next();
};

module.exports = verifyJwt;
