const { TABLE_NAME } = require('../const');

module.exports = (sequelize, DataTypes) => {
    return sequelize.define(TABLE_NAME.USER, {
        full_name: {
            type: DataTypes.STRING,
            allowNull: false
        },

        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: 'username',
            validate: {
                len: [3, 20],
            },
        },

        passwordHash: {
            type: DataTypes.STRING,
            allowNull: false
        },

        email: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isEmail: true
            }
        }
    })
}
