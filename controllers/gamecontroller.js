const router = require('express').Router();
const path = require('path');
const {
    GAME_ROUTER,
    STATUS_CODE,
    HttpMessage,
} = require('../const');
const { DataTypes } = require('sequelize');
const sequelize = require('../db');
const Game = require(path.join(__dirname, '../models/game'))(sequelize, DataTypes);

router.get(GAME_ROUTER.GET_ALL, (req, res) => {
    Game.findAll({ where: { owner_id: req.user.id } })
        .then(
            function findSuccess(data) {
                res.status(STATUS_CODE.OK).json({
                    games: data,
                    message: HttpMessage.DATA_FETCHED,
                })
            },

            function findFail() {
                res.status(STATUS_CODE.NOT_FOUND).json({
                    message: HttpMessage.DATA_NOT_FOUND,
                })
            }
        )
})

router.get(GAME_ROUTER.GET, (req, res) => {
    Game.findOne({ where: { id: req.params.id, owner_id: req.user.id } })
        .then(
            function findSuccess(game) {
                res.status(STATUS_CODE.OK).json({
                    game,
                })
            },

            function findFail() {
                res.status(STATUS_CODE.NOT_FOUND).json({
                    message: HttpMessage.DATA_NOT_FOUND,
                })
            }
        )
})

router.post(GAME_ROUTER.CREATE, (req, res) => {
    Game.create({
        title: req.body.game.title,
        owner_id: req.user.id,
        studio: req.body.game.studio,
        esrb_rating: req.body.game.esrb_rating,
        user_rating: req.body.game.user_rating,
        have_played: req.body.game.have_played
    })
        .then(
            function createSuccess(game) {
                res.status(STATUS_CODE.CREATED).json({
                    game,
                    message: HttpMessage.GAME_CREATED,
                })
            },

            function createFail(err) {
                res.status(STATUS_CODE.UNPROCESSABLE_ENTITY).send(err.message)
            }
        )
})

router.put(GAME_ROUTER.UPDATE, (req, res) => {
    Game.update({
        title: req.body.game.title,
        studio: req.body.game.studio,
        esrb_rating: req.body.game.esrb_rating,
        user_rating: req.body.game.user_rating,
        have_played: req.body.game.have_played
    },
        {
            where: {
                id: req.params.id,
                owner_id: req.user.id
            }
        })
        .then(
            function updateSuccess(game) {
                res.status(STATUS_CODE.OK).json({
                    game,
                    message: HttpMessage.UPDATED,
                })
            },

            function updateFail(err) {
                res.status(STATUS_CODE.INTERNAL_SERVER_ERROR).json({
                    message: err.message
                })
            }

        )
})

router.delete(GAME_ROUTER.REMOVE, (req, res) => {
    Game.destroy({
        where: {
            id: req.params.id,
            owner_id: req.user.id
        }
    })
    .then(
        function deleteSuccess(game) {
            res.status(STATUS_CODE.OK).json({
                game,
                message: STATUS_CODE.DELETE
            })
        },

        function deleteFail(err) {
            res.status(STATUS_CODE.INTERNAL_SERVER_ERROR).json({
                error: err.message
            })
        }
    )
})

module.exports = router;
