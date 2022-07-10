const { celebrate, Joi } = require('celebrate');
const router = require('express').Router();
const { validateURL } = require('../middlewares/url_validator');
const { createMovie, getMovies, removeMovie } = require('../controllers/movies');

// возвращает все сохранённые текущим  пользователем фильмы.
router.get('/movies', getMovies);
// создаёт фильм
router.post('/movies', celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().integer().required(),
    year: Joi.string().min(4).max(4).required(),
    description: Joi.string().min(2).max(1000).required(),
    image: Joi.string().required().custom(validateURL),
    trailerLink: Joi.string().required().custom(validateURL),
    thumbnail: Joi.string().required().custom(validateURL),
    nameRU: Joi.string().min(2).max(100).required,
    nameEN: Joi.string().min(2).max(100).required,
  }),
}), createMovie);
// удаляет сохранённый фильм по id
router.delete('/movies/:movieId', celebrate({
  params: Joi.object().keys({
    movieId: Joi.string().length(24).hex(),
  }),
}), removeMovie);

module.exports.movieRouter = router;
