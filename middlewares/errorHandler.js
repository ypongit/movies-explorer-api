const {
  SERVER_ERR_MSG,
} = require('../utils/constants');

const errorHandler = (err, req, res, next) => {
  const { statusCode = 500, message } = err;

  res
    .status(statusCode)
    .send({
      // проверяем статус и выставляем сообщение в зависимости от него
      message: statusCode === 500
        ? SERVER_ERR_MSG
        : message,
    });
  next();
};

module.exports = { errorHandler };
