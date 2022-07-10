const { celebrate, Joi } = require('celebrate');
const router = require('express').Router();
const NotFoundError = require('../errors/not-found-err');

const {
  createUser,
  login,
} = require('../controllers/users');

const { isAuthorized } = require('../middlewares/auth');

const { userRouter } = require('./users');
const { movieRouter } = require('./movies');

// проверяет переданные в теле почту и пароль  и возвращает JWT
router.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(6),
  }),
}), login);

// создаёт пользователя с переданными в теле email, password и name
router.post('/signup', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(6),
    name: Joi.string().min(2).max(30),
  }).unknown(true),
}), createUser);

// роуты защищенные авторизацией
router.use(isAuthorized, userRouter);

router.use(isAuthorized, movieRouter);

router.use('*', (req, res, next) => {
  next(new NotFoundError('Страница не найдена'));
});

module.exports = router;
