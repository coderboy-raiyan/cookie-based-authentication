const jwt = require('jsonwebtoken');

function generateAccessToken(payload) {
    return jwt.sign({ payload }, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: '1d',
    });
}
function generateRefreshToken(payload) {
    return jwt.sign({ payload }, process.env.REFRESH_TOKEN_SECRET, {
        expiresIn: '30d',
    });
}

module.exports = { generateAccessToken, generateRefreshToken };
