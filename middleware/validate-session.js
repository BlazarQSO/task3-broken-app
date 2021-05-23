const jwt = require('jsonwebtoken');
const path = require('path');
const {
    HTTP_METHOD,
    STATUS_CODE,
    JWT_MESSAGE,
    errorMessage,
    HttpMessage,
} = require('../const');

const { DataTypes } = require('sequelize');
const sequelize = require('../db');
const User = require(path.join(__dirname, '../models/user'))(sequelize, DataTypes);

module.exports = function (req, res, next) {
    if (req.method === HTTP_METHOD.OPTIONS) {
        next();
    } else {
        const sessionToken = req.headers.authorization;
        if (!sessionToken) {
            return res
                .status(STATUS_CODE.UNAUTHORIZED)
                .send({ auth: false, message: HttpMessage.NO_TOKEN_PROVIDED });
        }
        else {
            jwt.verify(sessionToken, JWT_MESSAGE, (err, decoded) => {
                if (decoded) {
                    User.findOne({ where: { id: decoded.id } }).then(user => {
                        req.user = user;
                        next();
                    },
                        function () {
                            res.status(STATUS_CODE.FORBIDDEN).send(errorMessage(HttpMessage.FORBIDDEN));
                        })

                } else {
                    res.status(STATUS_CODE.UNAUTHORIZED).send(errorMessage(HttpMessage.UNAUTHORIZED));
                }
            });
        }
    }
}
