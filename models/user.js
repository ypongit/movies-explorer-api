const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const isEmail = require('validator/lib/isEmail');
const {
  VALIDATION_EMAIL_ERR_MSG,
  AUTH_ERR_MSG,
} = require('../utils/constants');

const userSchema = new mongoose.Schema({
  // email — почта пользователя, по которой он регистрируется.
  // обязательное поле, уникальное для каждого пользователя.
  // Также оно должно валидироваться на соответствие схеме электронной почты.
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (v) => isEmail(v),
      message: VALIDATION_EMAIL_ERR_MSG,
    },
  },
  // password — хеш пароля. Обязательное поле-строка.
  // Нужно задать поведение по умолчанию, чтобы база данных не возвращала это поле.
  password: {
    type: String,
    required: true,
    // select: false,
  },

  // name — имя пользователя, например: Александр или Мария.
  // Это обязательное поле-строка от 2 до 30 символов.
  name: {
    type: String,
    // required: true,
    minlength: 2,
    maxlength: 30,
    default: 'Клинт Иствуд',
  },
});

userSchema.statics.findUserByCredentials = function (email, password) {
  // попытаемся найти пользователя по почте
  return this.findOne({ email })
    .then((user) => {
      if (!user) {
        return Promise.reject(new Error(AUTH_ERR_MSG));
      }

      // нашёлся — сравниваем хеши
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          console.log(matched);
          if (!matched) {
            return Promise.reject(new Error(AUTH_ERR_MSG));
          }
          return user;
        });
    });
};

module.exports = mongoose.model('user', userSchema);
