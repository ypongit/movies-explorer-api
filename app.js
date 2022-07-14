require('dotenv').config();

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const helmet = require('helmet');
const { errors } = require('celebrate');

const bodyParser = require('body-parser');
const limiter = require('./middlewares/rateLimit');

// const { PORT = 3000, NODE_ENV, MONGOOSE_DB_URL } = process.env;
const { MONGO_URL, PORT, NODE_ENV } = require('./utils/config');
const router = require('./routes/index');

const app = express();

const { requestLogger, errorLogger } = require('./middlewares/logger');
const { errorHandler } = require('./middlewares/errorHandler');

// console.log('process.env => ', process.env);
console.log('NODE_ENV => ', NODE_ENV);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// подключаемся к серверу mongo
mongoose.connect(MONGO_URL, () => {
  console.log('Connection succesfull');
});

app.use(helmet());

// подключаем логгер запросов
app.use(requestLogger);

app.use(cors());
// ограничивает количество запросов с одного IP-адреса в единицу времени
app.use(limiter);

app.use('/', router);
// обработчики ошибок
// подключаем логгер ошибок
app.use(errorLogger);
// обработчик ошибок celebrate
app.use(errors());
// централизованная обработка ошибок
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
  // console.log(BASE_PATH); // BASE_PATH — это URL сервера. Он хранится в переменных окружения.
});
