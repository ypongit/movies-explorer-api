/*
# возвращает информацию о пользователе (email и имя)
GET /users/me

# обновляет информацию о пользователе (email и имя)
PATCH /users/me

# возвращает все сохранённые текущим  пользователем фильмы
GET /movies

# создаёт фильм с переданными в теле
# country, director, duration, year, description, image, trailer, nameRU, nameEN и thumbnail, movieId
POST /movies

# удаляет сохранённый фильм по id
DELETE /movies/_id
    всякий код для создания роутеров и т.п.
*/
const router = require('express').Router();
const User = require('../models/user');
const { createUser, getUsers, getProfile, updateProfile, login } = require('../controllers/users');

// возвращает информацию о пользователе (email и имя)
router.get('/me', getProfile);

// обновляет информацию о пользователе (email и имя)
router.patch('/me', updateProfile)

router.get('/', getUsers);

// Создание пользователя
router.post('/', createUser);



module.exports.userRouter = router;