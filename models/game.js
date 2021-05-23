const { TABLE_NAME } = require('../const');

module.exports = (sequelize, DataTypes) => sequelize.define(TABLE_NAME.GAME, {
    title: {
        type: DataTypes.STRING(25),
        allowNull: false,
        validate: {
            notEmpty: true,
        },
    },

    ownerId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },

    studio: {
        type: DataTypes.STRING,
        allowNull: false,
    },

    esrbRating: {
        type: DataTypes.CHAR(5),
        allowNull: false,
    },

    userRating: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            len: [1, 5],
        },
    },

    havePlayed: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false,
    },
});
