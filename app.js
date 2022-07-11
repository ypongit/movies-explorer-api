require('dotenv').config();
const express = require('express');
const ratelimit = require('express-rate-limit');
const mongoose = require('mongoose');
const helmet = require('helmet');

const bodyParser = require('body-parser');

const { PORT = 3000, BASE_PATH } = process.env;
const { MONGO_URL } = require('./utils/constants');
const router = require('./routes/index');

const app = express();

const limiter = ratelimit({
  windowMs: 15 * 60 * 1000, // за 15 минут
  max: 100, // можно совершить максимум 100 запросов с одного IP
});

const { requestLogger, errorLogger } = require('./middlewares/logger');

console.log(process.env.NODE_ENV);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// подключаемся к серверу mongo
mongoose.connect(MONGO_URL);

app.use(helmet());

// подключаем логгер запросов
app.use(requestLogger);
// ограничивает количество запросов с одного IP-адреса в единицу времени
app.use(limiter);

app.use('/', router);
// подключаем логгер ошибок
app.use(errorLogger);

// централизованная обработка ошибок
app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;

  res
    .status(statusCode)
    .send({
      // проверяем статус и выставляем сообщение в зависимости от него
      message: statusCode === 500
        ? 'На сервере произошла ошибка'
        : message,
    });
  next();
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
  console.log(BASE_PATH); // BASE_PATH — это URL сервера. Он хранится в переменных окружения.
});
