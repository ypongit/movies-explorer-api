// это файл контроллеров пользователей приложения
require('dotenv').config();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

// const saltRound = 10;
const { JWT_SECRET_KEY } = require('../utils/config');
const NotFoundError = require('../errors/not-found-err');
const ValidationError = require('../errors/validation-err');
const AuthError = require('../errors/authentification-err');
const DuplicateError = require('../errors/duplicate-err');
const {
  NOT_FOUND_DATA_USER_ERR_MSG,
  VALIDATION_DATA_ERR_MSG,
  DUPLICATE_ERR_MSG,
  AUTH_ERR_MSG,
} = require('../utils/constants');

const { saltRound, MONGO_DUPLICATE_KEY_CODE } = require('../utils/constants');

const getUsers = (_, res, next) => {
  User.find({})
    .then((users) => res.send({ users }))
    .catch(next);
};

// обновляет информацию о пользователе (email и имя)
const updateProfile = (req, res, next) => {
  User.findByIdAndUpdate(
    req.user._id,
    { name: req.body.name, email: req.body.email },
    {
      new: true, // обработчик then получит на вход обновлённую запись
      runValidators: true,
    },
  )
    .then((user) => {
      if (!user) {
        throw new NotFoundError(NOT_FOUND_DATA_USER_ERR_MSG);
        // return res.status(404).send({ message: 'Пользователь не найден' });
      }
      return res.status(200).send({
        // id: user._id,
        name: user.name,
        email: user.email,
      });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new ValidationError(VALIDATION_DATA_ERR_MSG));
      }
      if (err.name === 'MongoServerError' && err.code === MONGO_DUPLICATE_KEY_CODE) {
        next(new DuplicateError(DUPLICATE_ERR_MSG));
      } else {
        next(err);
      }
    });
};

// возвращает информацию о пользователе (email и имя)
const getProfile = (req, res, next) => {
  User.findOne({ _id: req.user._id })
    .then((user) => {
      if (!user) {
        throw new NotFoundError(NOT_FOUND_DATA_USER_ERR_MSG);
        // return res.status(404).send({ message: 'Пользователь не найден' });
      }
      return res.status(200).send({
        email: user.email,
        name: user.name,
      });
    })
    .catch(next);
};

// Создание пользователя
const createUser = (req, res, next) => {
  const {
    email,
    password,
    name,
  } = req.body;
  bcrypt.hash(password, saltRound)
    // записываем данные в базу
    .then((hash) => User.create({
      email,
      password: hash,
      name,
    })
      .then((user) => {
        res.status(201).send({
          _id: user._id,
          email: user.email,
          name: user.name,
        });
      }))
    // если данные не записались, вернём ошибку
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new ValidationError(VALIDATION_DATA_ERR_MSG));
        // throw new ValidationError(err.message);
      }
      if (err.name === 'MongoServerError' && err.code === MONGO_DUPLICATE_KEY_CODE) {
        next(new DuplicateError(DUPLICATE_ERR_MSG));
        // throw new DuplicateError('Пользователь с таким email уже существует');
      } else {
        next(err);
      }
    });
};

// контроллер аутентификации
const login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      // аутентификация успешна! пользователь в переменной user
      const token = jwt.sign(
        { _id: user._id },
        JWT_SECRET_KEY,
        //  NODE_ENV === 'production' ? JWT_SECRET_KEY : 'dev-secret',
        { expiresIn: '7d' },
      );
      res.status(200).send({ token });
    })
    .catch(() => {
      // ошибка аутентификации
      next(new AuthError(AUTH_ERR_MSG));
    });
};

module.exports = {
  createUser, getUsers, getProfile, updateProfile, login,
};
