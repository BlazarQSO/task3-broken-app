const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { DataTypes } = require('sequelize');
const sequelize = require('../db');
const modelUser = require('../models/user');
const {
    USER_ROUTER,
    MIN_LENGTH_PASSWORD,
    BCRYPT_SALT,
    STATUS_CODE,
    JWT_MESSAGE,
    errorMessage,
    HttpMessage,
    DAY,
} = require('../const');

const User = modelUser(sequelize, DataTypes);

router.post(USER_ROUTER.SIGN_UP, (req, res) => {
    const {
        password, fullName, userName, email,
    } = req.body.user;

    if (password.length < MIN_LENGTH_PASSWORD) {
        return res.status(STATUS_CODE.UNAUTHORIZED).send(HttpMessage.ERROR_LENGTH_PASSWORD);
    }
    const passwordHash = bcrypt.hashSync(password, BCRYPT_SALT);

    User.create({
        fullName, userName, passwordHash, email,
    })
        .then((user) => {
            const token = jwt.sign({ id: user.id }, JWT_MESSAGE, { expiresIn: DAY });
            res.status(STATUS_CODE.OK).json({ user, token });
        })
        .catch((err) => res.status(STATUS_CODE.INTERNAL_SERVER_ERROR).send(err.message));
});

router.post(USER_ROUTER.SIGN_IN, (req, res) => {
    const { userName, password } = req.body.user;

    User.findOne({ where: { userName } }).then((user) => {
        if (user) {
            bcrypt.compare(password, user.passwordHash, (err, matches) => {
                if (matches) {
                    const sessionToken = jwt.sign({ id: user.id }, JWT_MESSAGE, { expiresIn: DAY });
                    const message = HttpMessage.SUCCESSFULLY;
                    return res.json({ user, message, sessionToken });
                }
                return res.status(STATUS_CODE.UNAUTHORIZED).send(errorMessage(HttpMessage.ERROR_PASSWORD));
            });
        } else {
            return res.status(STATUS_CODE.UNAUTHORIZED).send(errorMessage(HttpMessage.ERROR_LOGIN));
        }
    });
});

module.exports = router;
