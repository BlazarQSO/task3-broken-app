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
        .then(
            (data) => {
                res.status(STATUS_CODE.OK).json({
                    games: data,
                    message: HttpMessage.DATA_FETCHED,
                });
            },

            () => {
                res.status(STATUS_CODE.NOT_FOUND).json({
                    message: HttpMessage.DATA_NOT_FOUND,
                });
            },
        );
});

router.get(GAME_ROUTER.GET, (req, res) => {
    Game.findOne({ where: { id: req.params.id, owner_id: req.user.id } })
        .then(
            (game) => {
                res.status(STATUS_CODE.OK).json({
                    game,
                });
            },

            () => {
                res.status(STATUS_CODE.NOT_FOUND).json({
                    message: HttpMessage.DATA_NOT_FOUND,
                });
            },
        );
});

router.post(GAME_ROUTER.CREATE, (req, res) => {
    Game.create({
        title: req.body.game.title,
        owner_id: req.user.id,
        studio: req.body.game.studio,
        esrb_rating: req.body.game.esrb_rating,
        user_rating: req.body.game.user_rating,
        have_played: req.body.game.have_played,
    })
        .then(
            (game) => {
                res.status(STATUS_CODE.CREATED).json({
                    game,
                    message: HttpMessage.GAME_CREATED,
                });
            },

            (err) => {
                res.status(STATUS_CODE.UNPROCESSABLE_ENTITY).send(err.message);
            },
        );
});

router.put(GAME_ROUTER.UPDATE, (req, res) => {
    Game.update({
        title: req.body.game.title,
        studio: req.body.game.studio,
        esrb_rating: req.body.game.esrb_rating,
        user_rating: req.body.game.user_rating,
        have_played: req.body.game.have_played,
    },
    {
        where: {
            id: req.params.id,
            owner_id: req.user.id,
        },
    })
        .then(
            (game) => {
                res.status(STATUS_CODE.OK).json({
                    game,
                    message: HttpMessage.UPDATED,
                });
            },

            (err) => {
                res.status(STATUS_CODE.INTERNAL_SERVER_ERROR).json({
                    message: err.message,
                });
            },

        );
});

router.delete(GAME_ROUTER.REMOVE, (req, res) => {
    Game.destroy({
        where: {
            id: req.params.id,
            owner_id: req.user.id,
        },
    })
        .then(
            (game) => {
                res.status(STATUS_CODE.OK).json({
                    game,
                    message: STATUS_CODE.DELETE,
                });
            },

            (err) => {
                res.status(STATUS_CODE.INTERNAL_SERVER_ERROR).json({
                    error: err.message,
                });
            },
        );
});

module.exports = router;
