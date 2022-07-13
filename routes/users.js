const router = require('express').Router();
// const { celebrate, Joi } = require('celebrate');
const {
  validateSignup,
  validateSignin,
  validateUpdateUser,
  validateId,
} = require('../middlewares/reqValid');

const {
  getUsers,
  getProfile,
  updateProfile,
  createUser,
  login,
} = require('../controllers/users');

const { isAuthorized } = require('../middlewares/auth');

// проверяет переданные в теле почту и пароль  и возвращает JWT
router.post('/signin', validateSignin, login);

// создаёт пользователя с переданными в теле email, password и name
router.post('/signup', validateSignup, createUser);

// роуты защищенные авторизацией
// возвращает информацию о пользователе (email и имя)
router.get('/users/me', isAuthorized, validateId, getProfile);

// обновляет информацию о пользователе (email и имя)
router.patch('/users/me', isAuthorized, validateUpdateUser, updateProfile);

router.get('/users', getUsers);

module.exports.userRouter = router;
