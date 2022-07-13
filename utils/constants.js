// файл с константами.
require('dotenv').config();

// константы приложения
/* const {
  PORT = 3000, JWT_SECRET, MONGOOSE_DB_URL, NODE_ENV,
} = process.env;
const MONGO_URL = MONGOOSE_DB_URL || 'mongodb://localhost:27017/moviesdb';
const JWT_SECRET_KEY = (NODE_ENV === 'production') ? JWT_SECRET : 'dev-secret'; */

const saltRound = 10;
const MONGO_DUPLICATE_KEY_CODE = 11000;

// сообщения ответов и ошибок
const SERVER_ERR_MSG = 'На сервере произошла ошибка';
const NOT_FOUND_ERR_MSG = 'Запрашиваемый ресурс не найден';
const NOT_FOUND_DATA_USER_ERR_MSG = 'Пользователь c данным id не найден';
const VALIDATION_DATA_ERR_MSG = 'Переданы некорректные данные';
const DUPLICATE_ERR_MSG = 'Пользователь с таким email уже существует';
const AUTH_ERR_MSG = 'Неправильные почта или пароль';
const NOT_FOUND_MOVIE_ERR = 'Фильм с указанным _id не найден';
const FORBIDDEN_MOVIE_ERR = 'Картина может быть удалена только создателем!';
const VALIDATION_URL_ERR_MSG = 'Неправильный формат ссылки URL';
const VALIDATION_EMAIL_ERR_MSG = 'Неправильный формат адреса электронной почты';

module.exports = {
  saltRound,
  MONGO_DUPLICATE_KEY_CODE,
  /*  MONGO_URL,
  PORT,
  NODE_ENV,
  JWT_SECRET_KEY, */
  SERVER_ERR_MSG,
  NOT_FOUND_ERR_MSG,
  NOT_FOUND_DATA_USER_ERR_MSG,
  VALIDATION_DATA_ERR_MSG,
  DUPLICATE_ERR_MSG,
  AUTH_ERR_MSG,
  NOT_FOUND_MOVIE_ERR,
  FORBIDDEN_MOVIE_ERR,
  VALIDATION_URL_ERR_MSG,
  VALIDATION_EMAIL_ERR_MSG,
};
