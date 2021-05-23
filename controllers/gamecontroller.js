const router = require('express').Router();
const { DataTypes } = require('sequelize');
const sequelize = require('../db');
const modelGame = require('../models/game');
const {
    GAME_ROUTER,
    STATUS_CODE,
    HttpMessage,
} = require('../const');

const Game = modelGame(sequelize, DataTypes);

router.get(GAME_ROUTER.GET_ALL, (req, res) => {
    Game.findAll({ where: { owner_id: req.user.id } })
        .then((data) => {
            res.status(STATUS_CODE.OK).json({
                games: data,
                message: HttpMessage.DATA_FETCHED,
            });
        }).catch(() => {
            res.status(STATUS_CODE.NOT_FOUND).json({
                message: HttpMessage.DATA_NOT_FOUND,
            });
        });
});

router.get(GAME_ROUTER.GET, (req, res) => {
    Game.findOne({ where: { id: req.params.id, owner_id: req.user.id } })
        .then((game) => {
            res.status(STATUS_CODE.OK).json({
                game,
            });
        }).catch(() => {
            res.status(STATUS_CODE.NOT_FOUND).json({
                message: HttpMessage.DATA_NOT_FOUND,
            });
        });
});

router.post(GAME_ROUTER.CREATE, (req, res) => {
    const {
        title, studio, esrb_rating, user_rating, have_played,
    } = req.body.game;

    Game.create({
        title, studio, esrb_rating, user_rating, have_played, owner_id: req.user.id,
    })
        .then((game) => {
            res.status(STATUS_CODE.CREATED).json({
                game,
                message: HttpMessage.GAME_CREATED,
            });
        })
        .catch((err) => res
            .status(STATUS_CODE.UNPROCESSABLE_ENTITY)
            .send(err.message));
});

router.put(GAME_ROUTER.UPDATE, (req, res) => {
    const {
        title, studio, esrb_rating, user_rating, have_played,
    } = req.body.game;

    Game.update({
        title, studio, esrb_rating, user_rating, have_played,
    },
    {
        where: { id: req.params.id, owner_id: req.user.id },
    })
        .then((game) => {
            res.status(STATUS_CODE.OK).json({
                game,
                message: HttpMessage.UPDATED,
            });
        })
        .catch((err) => res.status(STATUS_CODE.INTERNAL_SERVER_ERROR).json({
            message: err.message,
        }));
});

router.delete(GAME_ROUTER.REMOVE, (req, res) => {
    const { id } = req.params;
    const { id: owner_id } = req.user;

    Game.destroy({
        where: { id, owner_id },
    })
        .then((game) => {
            res.status(STATUS_CODE.OK).json({
                game,
                message: STATUS_CODE.DELETE,
            });
        })
        .catch((err) => res.status(STATUS_CODE.INTERNAL_SERVER_ERROR).json({
            error: err.message,
        }));
});

module.exports = router;
