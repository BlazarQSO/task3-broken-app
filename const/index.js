const STATUS_CODE = {
    OK: 200,
    CREATED: 201,
    NO_CONTENT: 204,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    UNPROCESSABLE_ENTITY: 422,
    INTERNAL_SERVER_ERROR: 500,
}

const TABLE_NAME = {
    USER: 'user',
    GAME: 'game',
}

const ServerMessage = {
    ConnectedToDB: 'Connected to DB',
    WithError: (err) => `Error: ${err}`,
    WithArg: (arg) => `App is listening on ${arg}`,
}

const HttpMessage = {
    ERROR_PASSWORD: 'Passwords do not match.',
    ERROR_LENGTH_PASSWORD: 'The password must be at least 3 characters long',
    ERROR_LOGIN: 'User not found.',
    FORBIDDEN: '403 Forbidden',
    NO_TOKEN_PROVIDED: 'No token provided.',
    SUCCESSFULLY: 'Successfully authenticated.',
    UNAUTHORIZED: 'not authorized',
    DATA_FETCHED: 'Data fetched.',
    DATA_NOT_FOUND: 'Data not found',
    GAME_CREATED: 'Game created.',
    UPDATED: 'Successfully updated.',
    DELETE: 'Successfully deleted',
}

const HTTP_METHOD = {
    OPTIONS: 'OPTIONS',
}

const USER_ROUTER = {
    SIGN_UP: '/signup',
    SIGN_IN: '/signin',
}

const GAME_ROUTER = {
    GET_ALL: '/all',
    GET: '/:id',
    CREATE: '/create',
    UPDATE: '/update/:id',
    REMOVE: '/remove/:id',
}

const errorMessage = (message) => ({ error: message });

const JWT_MESSAGE = 'lets_play_sum_games_man';
const BCRYPT_SALT = 10;
const DAY = 86400;
const LOCALHOST_PORT = 4000;
const DB_PORT = 5433;
const MIN_LENGTH_PASSWORD = 3;

module.exports = {
    errorMessage,
    ServerMessage,
    HttpMessage,
    HTTP_METHOD,
    STATUS_CODE,
    LOCALHOST_PORT,
    DB_PORT,
    TABLE_NAME,
    USER_ROUTER,
    GAME_ROUTER,
    JWT_MESSAGE,
    BCRYPT_SALT,
    MIN_LENGTH_PASSWORD,
    DAY,
}
