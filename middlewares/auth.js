require('dotenv').config();
const jwt = require('jsonwebtoken');
const AuthError = require('../errors/authentification-err');

const { JWT_SECRET_KEY } = require('../utils/config');

/* const handleAuthError = (res) => {
  return res
    .status(401)
    .send({ "message": "Ошибка авторизации" })
  throw new AuthError('Ошибка авторизации');
}; */

const isAuthorized = (req, res, next) => {
  // достаём авторизационный заголовок
  const { authorization } = req.headers;

  // убеждаемся, что он есть или начинается с Bearer
  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new AuthError('Ошибка авторизации');
  }

  // извлечём токен
  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    // верифицируем токен
    payload = jwt.verify(token, JWT_SECRET_KEY);
  } catch (err) {
    // отправим ошибку, если не получилось
    throw new AuthError('Ошибка авторизации');
  }

  req.user = payload; // записываем пейлоуд в объект запроса

  next(); // пропускаем запрос дальше
};

module.exports = { isAuthorized };
