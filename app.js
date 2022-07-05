require('dotenv').config();
const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { PORT = 3000, BASE_PATH } = process.env;
const app = express();
const movie = require('./models/movie');
const user = require('./models/user');
const { userRouter } = require('./routes/users');
const { movieRouter } = require('./routes/movies');
const { login, createUser } = require('./controllers/users');
const { isAuthorized } = require('./middlewares/auth');
const { requestLogger, errorLogger } = require('./middlewares/logger');

console.log(process.env.NODE_ENV);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// подключаемся к серверу mongo
mongoose.connect('mongodb://localhost:27017/movies'/*,  {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false
} */);

// подключаем логгер запросов
app.use(requestLogger);
// проверяет переданные в теле почту и пароль  и возвращает JWT
app.post('/signin', login);
// создаёт пользователя с переданными в теле email, password и name
app.post('/signup', createUser);

// роуты защищенные авторизацией
app.use('/users', isAuthorized, userRouter);

app.use('/movies', isAuthorized, movieRouter);
// подключаем логгер ошибок
app.use(errorLogger);

app.use('/', (_, res) =>
res.status(200).send({ message: 'OK! All right!' })
)

app.use(express.static(path.join(__dirname, 'public')));
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
  console.log(BASE_PATH); //BASE_PATH — это URL сервера. Он хранится в переменных окружения.
})