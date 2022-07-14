// const { celebrate, Joi } = require('celebrate');
const router = require('express').Router();
const { isAuthorized } = require('../middlewares/auth');
const { validateCreateMovie, validateDeleteMovie } = require('../middlewares/reqValid');
const { createMovie, getMovies, removeMovie } = require('../controllers/movies');

// возвращает все сохранённые текущим  пользователем фильмы.
router.get('/movies', isAuthorized, getMovies);
// создаёт фильм
router.post('/movies', isAuthorized, validateCreateMovie, createMovie);
// удаляет сохранённый фильм по id
router.delete('/movies/:movieId', isAuthorized, validateDeleteMovie, removeMovie);

module.exports.movieRouter = router;
