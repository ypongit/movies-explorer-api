const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const {
  getUsers,
  getProfile,
  updateProfile,
} = require('../controllers/users');

// возвращает информацию о пользователе (email и имя)
router.get('/users/me', getProfile);

// обновляет информацию о пользователе (email и имя)
router.patch('/users/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    email: Joi.string().required().email(),
  }),
}), updateProfile);

router.get('/users', getUsers);

module.exports.userRouter = router;
