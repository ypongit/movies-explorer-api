// это файл контроллеров пользователей приложения
require('dotenv').config();
const bcrypt = require('bcrypt')
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const saltRound = 10;
const { NODE_ENV, JWT_SECRET_KEY } = process.env;

const getUsers = (_, res) => {
  User.find({})
  .then((users) => res.send({ users }))
  .catch(err => res.status(500).send({ message: err.message }));
}
// обновляет информацию о пользователе (email и имя)
const updateProfile = (req, res) => {
  User.findByIdAndUpdate(req.user._id/*  req.body._id */,
    {name: req.body.name, email: req.body.email },
    {
    new: true, // обработчик then получит на вход обновлённую запись
    runValidators: true,
  })
    .then((user) => {
      if (!user) {
        return res.status(404).send({ message: 'Пользователь не найден'});
      }
      res.status(200).send({ user });
    })
    .catch((err) => res.status(500).send({ message: err.message }));
}

// возвращает информацию о пользователе (email и имя)
const getProfile = (req, res) => {
  User.findOne({ _id: req.user._id })
    .then ((user) => {
      if (!user) {
        return res.status(404).send({ message: 'Пользователь не найден'});
      }
      return res.status(200).send({
        "email": user.email,
        "name": user.name
      });
    })
    .catch((err) => res.status(500).send({ message: err.message }));
}
// Создание пользователя
const createUser = (req, res) => {
  const { email,
          password,
          name } = req.body;
    bcrypt.hash(password, saltRound)
    // записываем данные в базу
    .then((hash) =>
    User.create({
      email,
      password: hash,
      name })
      .then((user) =>{
      res.status(201).send({ "_id": user._id, "email": user.email, "name": user.name })})
      // если данные не записались, вернём ошибку
  )
  .catch((err) => res.status(400).send({ message: err.message }))
};

// контроллер аутентификации
const login = (req, res) => {
  console.log('login req.body->', req.body);
  console.log('JWT_SECRET_KEY', JWT_SECRET_KEY);

  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      console.log('login user', user);
      // аутентификация успешна! пользователь в переменной user
      const token = jwt.sign({ _id: user._id},
        JWT_SECRET_KEY,
        { expiresIn: '7d' },
        );
        console.log({token});
        res.status(200).send({ token });
    })
    .catch((err) => {
      // ошибка аутентификации
      res
        .status(401)
        .send({ message: err.message });
    })
}

module.exports = { createUser, getUsers, getProfile, updateProfile, login };