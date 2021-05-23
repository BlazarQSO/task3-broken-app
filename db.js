const Sequelize = require('sequelize');
const {
    DB_PORT,
    ServerMessage,
} = require('./const');
                                //database username   password
const sequelize = new Sequelize('gamedb', 'postgres', '12345', {
    host: 'localhost',
    dialect: 'postgres',
    port: DB_PORT,
})

sequelize.authenticate().then(
    function success() {
        console.log(ServerMessage.ConnectedToDB);
    },

    function fail(err) {
        console.log(ServerMessage.WithError(err));
    }
)

module.exports = sequelize;
