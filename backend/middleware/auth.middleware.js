const jwt = require('jsonwebtoken');
const dotenv = require("dotenv").config();

module.exports = (req, res, next) => {
    const authHeader = req.headers.authorization || req.headers.Authorization;
    if (!authHeader?.startsWith('Bearer ')) return res.sendStatus(401);
    const token = authHeader.split(' ')[1];
    jwt.verify(
        token,
        process.env.SECRETKEY,
        (err, decoded) => {
            if (err) return res.sendStatus(403); //invalid token
            req.user = decoded.UserInfo.userId;
            req.roles = decoded.UserInfo.roles;
            next();
        }
    );
}