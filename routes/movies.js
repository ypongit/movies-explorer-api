const router = require('express').Router();
const Movie = require('../models/movie');
const { createMovie, getMovies, removeMovie } = require('../controllers/movies');

// возвращает все сохранённые текущим  пользователем фильмы.
router.get('/', getMovies);
// создаёт фильм
router.post('/', createMovie);
// удаляет сохранённый фильм по id
router.delete('/:movieId', removeMovie)

module.exports.movieRouter = router;