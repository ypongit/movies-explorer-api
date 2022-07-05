
const jwt = require('jsonwebtoken');
const { NODE_ENV, JWT_SECRET_KEY } = process.env;

const handleAuthError = (res) => {
  return res
    .status(401)
    .send({ "message": "Ошибка авторизации" })
};

const isAuthorized = (req, res, next) => {
  // достаём авторизационный заголовок
  const { authorization } = req.headers;

// убеждаемся, что он есть или начинается с Bearer
  if (!authorization || !authorization.startsWith('Bearer ')){
    return handleAuthError(res);
  }

  // извлечём токен
  const token = authorization.replace('Bearer ', '');
  let payload;

try {
  // верифицируем токен
  payload = jwt.verify(token, JWT_SECRET_KEY );
} catch (err) {
  // отправим ошибку, если не получилось
  return handleAuthError(res);
  }

  req.user = payload; // записываем пейлоуд в объект запроса

  next(); // пропускаем запрос дальше
};

module.exports = { isAuthorized };