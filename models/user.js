const { TABLE_NAME } = require('../const');

module.exports = (sequelize, DataTypes) => sequelize.define(TABLE_NAME.USER, {
    fullName: {
        type: DataTypes.STRING,
        allowNull: false,
    },

    userName: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: 'userName',
        validate: {
            len: [3, 20],
        },
    },

    passwordHash: {
        type: DataTypes.STRING,
        allowNull: false,
    },

    email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isEmail: true,
        },
    },
});
