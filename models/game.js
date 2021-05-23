const { TABLE_NAME } = require('../const');

module.exports = function (sequelize, DataTypes) {
    return sequelize.define(TABLE_NAME.GAME, {
        title: {
            type: DataTypes.STRING(25),
            allowNull: false,
            validate: {
                notEmpty: true,
            },
        },

        owner_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },

        studio: {
            type: DataTypes.STRING,
            allowNull: false,
        },

        esrb_rating: {
            type: DataTypes.CHAR(5),
            allowNull: false,
        },

        user_rating: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                len: [1, 5],
            }
        },

        have_played : {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
            allowNull: false
        }
    })
}
