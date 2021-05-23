const express = require('express');
const app = express();
const db = require('./db');
const user = require('./controllers/usercontroller');
const game = require('./controllers/gamecontroller')
const { ServerMessage } = require('./const');

const LOCALHOST_PORT = 4000;

db.sync();
app.use(express.json());
app.use('/api/auth', user);
app.use(require('./middleware/validate-session'))
app.use('/api/game', game);
app.listen(LOCALHOST_PORT, function() {
    console.log(ServerMessage.WithArg(LOCALHOST_PORT));
})
