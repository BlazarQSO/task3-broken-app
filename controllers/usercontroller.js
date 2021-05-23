const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {
    USER_ROUTER,
    MIN_LENGTH_PASSWORD,
    SUCCESSFULLY,
    BCRYPT_SALT,
    STATUS_CODE,
    JWT_MESSAGE,
    errorMessage,
    HttpMessage,
    DAY,
} = require('../const');

const path = require('path');
const { DataTypes } = require('sequelize');
const sequelize = require('../db');
const User = require(path.join(__dirname, '../models/user'))(sequelize, DataTypes);

router.post(USER_ROUTER.SIGN_UP, (req, res) => {
    if (req.body.user.password.length < MIN_LENGTH_PASSWORD) {
        res.status(STATUS_CODE.UNAUTHORIZED).send(HttpMessage.ERROR_LENGTH_PASSWORD);
    }

    User.create({
        full_name: req.body.user.full_name,
        username: req.body.user.username,
        passwordHash: bcrypt.hashSync(req.body.user.password, BCRYPT_SALT),
        email: req.body.user.email,
    })
        .then(
            function signupSuccess(user) {
                const token = jwt.sign({ id: user.id }, JWT_MESSAGE, { expiresIn: DAY });
                res.status(STATUS_CODE.OK).json({
                    user,
                    token,
                });
            },

            function signupFail(err) {
                res.status(STATUS_CODE.INTERNAL_SERVER_ERROR).send(err.message);
            }
        )
})

router.post(USER_ROUTER.SIGN_IN, (req, res) => {
    User.findOne({ where: { username: req.body.user.username } }).then(user => {
        if (user) {
            bcrypt.compare(req.body.user.password, user.passwordHash, function (err, matches) {
                if (matches) {
                    const token = jwt.sign({ id: user.id }, JWT_MESSAGE, { expiresIn: DAY });
                    res.json({
                        user,
                        message: SUCCESSFULLY,
                        sessionToken: token,
                    });
                } else {
                    res.status(STATUS_CODE.UNAUTHORIZED).send(errorMessage(HttpMessage.ERROR_PASSWORD));
                }
            });
        } else {
            res.status(STATUS_CODE.UNAUTHORIZED).send(errorMessage(HttpMessage.ERROR_LOGIN));
        }

    })
})

module.exports = router;
